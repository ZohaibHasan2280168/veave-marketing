import { fetchPublicBillingConfig } from "./veaveApi";

export interface PaddlePricePreviewLineItem {
  price: {
    id: string;
    trialPeriod?: { interval: string; frequency: number } | null;
  };
  formattedTotals: {
    total: string;
    subtotal: string;
    tax: string;
  };
  totals: {
    total: string;
    subtotal: string;
    tax: string;
  };
}

export interface PaddlePricePreviewResponse {
  data: {
    currencyCode: string;
    details: {
      lineItems: PaddlePricePreviewLineItem[];
    };
  };
}

export interface PaddleBrowserSDK {
  Environment: {
    set: (env: "sandbox" | "production") => void;
  };
  Initialize: (options: {
    token: string;
    eventCallback?: (event: {
      name?: string;
      type?: string;
      code?: string;
      detail?: string;
      data?: unknown;
    }) => void;
  }) => void;
  PricePreview: (params: {
    items: { priceId: string; quantity: number }[];
    address?: { countryCode: string };
  }) => Promise<PaddlePricePreviewResponse>;
  Checkout: {
    open: (options: {
      items?: { priceId: string; quantity: number }[];
      transactionId?: string;
      customer?: { email?: string; id?: string; address?: { countryCode?: string } };
      customData?: Record<string, string>;
      settings?: {
        displayMode?: "overlay" | "inline";
        variant?: "one-page" | "multi-page";
        theme?: "light" | "dark";
        allowLogout?: boolean;
        successUrl?: string;
      };
    }) => void;
  };
}

declare global {
  interface Window {
    Paddle?: PaddleBrowserSDK;
  }
}

let scriptPromise: Promise<PaddleBrowserSDK | null> | null = null;
let initializedKey = "";

function loadPaddleScript(): Promise<PaddleBrowserSDK | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Paddle) return Promise.resolve(window.Paddle);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const existing = document.getElementById("paddle-v2-sdk") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Paddle || null), { once: true });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "paddle-v2-sdk";
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => resolve(window.Paddle || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function getPaddleInstance(overrides?: {
  environment?: string;
  clientToken?: string;
}): Promise<PaddleBrowserSDK | null> {
  if (typeof window === "undefined") return null;

  let env =
    overrides?.environment ||
    process.env.NEXT_PUBLIC_PADDLE_ENV ||
    "";
  let token =
    overrides?.clientToken ||
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ||
    "";

  if (!token) {
    const cfg = await fetchPublicBillingConfig();
    if (!env && cfg?.environment) env = cfg.environment;
    if (!token && cfg?.clientToken) token = cfg.clientToken;
  }

  const cleanToken = String(token || "").trim();
  if (!cleanToken) return null;

  const cleanEnv: "sandbox" | "production" =
    String(env || "sandbox").toLowerCase() === "production" ? "production" : "sandbox";

  const paddle = await loadPaddleScript();
  if (!paddle) return null;

  const key = `${cleanEnv}:${cleanToken.slice(-10)}`;
  if (initializedKey !== key) {
    paddle.Environment.set(cleanEnv);
    paddle.Initialize({
      token: cleanToken,
      eventCallback: (event) => {
        if (event?.name === "checkout.completed") {
          window.dispatchEvent(
            new CustomEvent("veave:paddle-checkout-completed", { detail: event })
          );
        } else if (event?.name === "checkout.closed") {
          window.dispatchEvent(
            new CustomEvent("veave:paddle-checkout-closed", { detail: event })
          );
        } else if (event?.type === "checkout.warning") {
          console.warn("[Paddle]", event.detail);
        } else if (event?.name === "checkout.error" || event?.name === "checkout.payment.error") {
          console.error("[Paddle]", event.name, event.code, event.detail);
        }
      },
    });
    initializedKey = key;
  }

  return paddle;
}

export function convertAmountFromLowestUnit(amount: string | number, currency = "USD"): number {
  const num = typeof amount === "number" ? amount : parseFloat(String(amount || "0"));
  switch (currency.toUpperCase()) {
    case "JPY":
    case "KRW":
    case "VND":
    case "CLP":
      return num;
    default:
      return num / 100;
  }
}

export function formatMoneyFromMinor(amountMinor: number | string, currency = "USD"): string {
  const value = convertAmountFromLowestUnit(amountMinor, currency);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export async function previewLocalizedPrices(
  priceIds: string[],
  countryCode = "PK"
): Promise<Record<string, string>> {
  const validIds = priceIds.filter((id) => Boolean(id && id.startsWith("pri_")));
  if (validIds.length === 0) return {};

  const paddle = await getPaddleInstance();
  if (!paddle) return {};

  try {
    const response = await paddle.PricePreview({
      items: validIds.map((priceId) => ({ priceId, quantity: 1 })),
      ...(countryCode && countryCode !== "OTHERS" ? { address: { countryCode } } : {}),
    });
    const map: Record<string, string> = {};
    for (const item of response?.data?.details?.lineItems || []) {
      if (item?.price?.id && item?.formattedTotals?.total) {
        map[item.price.id] = item.formattedTotals.total;
      }
    }
    return map;
  } catch {
    return {};
  }
}

export async function openTrialCheckout(options: {
  externalPriceId: string;
  customerEmail?: string;
  countryCode?: string;
  customData: {
    tenantId: string;
    planId: string;
    planPriceId: string;
  };
  environment?: string;
  clientToken?: string;
  theme?: "light" | "dark";
}) {
  const paddle = await getPaddleInstance({
    environment: options.environment,
    clientToken: options.clientToken,
  });
  if (!paddle) {
    throw new Error(
      "Paddle client token is not configured. Check Paddle gateway settings in Super Admin."
    );
  }

  paddle.Checkout.open({
    items: [{ priceId: options.externalPriceId, quantity: 1 }],
    ...(options.customerEmail
      ? {
          customer: {
            email: options.customerEmail,
            ...(options.countryCode && options.countryCode !== "OTHERS"
              ? { address: { countryCode: options.countryCode } }
              : {}),
          },
        }
      : {}),
    customData: {
      tenantId: String(options.customData.tenantId),
      planId: String(options.customData.planId),
      planPriceId: String(options.customData.planPriceId),
    },
    settings: {
      displayMode: "overlay",
      variant: "one-page",
      theme: options.theme || "light",
      allowLogout: false,
    },
  });
}
