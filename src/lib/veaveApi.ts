export interface PriceOverride {
  countryCode: string;
  currency: string;
  amountMinor: number;
}

export interface PlanPriceRecord {
  _id: string;
  planId: string;
  planCode: string;
  version: number;
  interval: "MONTH" | "YEAR";
  currency: string;
  amountMinor: number;
  trialDays: number;
  requiresCardOnTrial: boolean;
  isActiveForNew: boolean;
  overrides: PriceOverride[];
  externalPriceId?: string;
}

export interface CommercialPlan {
  _id?: string;
  planId: "BASE" | "PROFESSIONAL" | "ENTERPRISE" | string;
  name: string;
  description: string;
  price: number;
  annualPrice: number;
  cadence?: string;
  trialDays: number;
  departmentsLimit: number;
  usersLimit: number;
  ordersLimit: number;
  storageQuotaGb: number;
  locationsLimit: number;
  websitePagesLimit: number;
  themesLimit: number;
  supportTier?: string;
  popular?: boolean;
  features: string[];
  activeMonthlyPrice?: PlanPriceRecord | null;
  activeYearlyPrice?: PlanPriceRecord | null;
}

export interface TrialConfiguration {
  durationDays: number;
  maxUsers: number;
  maxDepartments: number;
  maxOrders: number;
  storageMb: number;
}

export interface PublicBillingConfig {
  success: boolean;
  environment: "sandbox" | "production";
  clientToken: string;
  configured: boolean;
  trialDays: number;
  requiresCardOnTrial: boolean;
  rootDomain: string;
}

export interface OnboardingStartPayload {
  companyName: string;
  desiredSlug: string;
  ownerName: string;
  ownerEmail: string;
  password: string;
  phone?: string;
  location: string;
  countryCode: string;
  companyType: string;
  employeesCount: number;
  foundedDate?: string;
  address?: string;
  taxId?: string;
  exportLicenseNo?: string;
  chamberRegNo?: string;
  selectedPlanCode: string;
  selectedInterval: "MONTH" | "YEAR";
  notes?: string;
}

export interface OnboardingDocumentEntry {
  storageObjectId: string;
  fileName: string;
  docCategory: string;
  mimeType: string;
  sizeBytes: number;
  issuedDate?: string;
  expiryDate?: string;
  uploadedAt?: string;
}

export function getApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api").replace(/\/+$/, "");
}

export function getDisplayRootDomain(): string {
  if (typeof window !== "undefined") {
    const h = window.location.hostname.toLowerCase();
    if (h.endsWith("veave.systemic.pk")) return "veave.systemic.pk";
    if (h.endsWith("systemic.pk")) return "veave.systemic.pk";
    if (h.endsWith("veave.pk")) return "veave.pk";
  }
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN || "veave.systemic.pk";
}

export function buildWorkspaceUrl(slug: string, path = "/login"): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const cleanSlug = slug.trim().toLowerCase();

  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost")) {
      const workspacePort = process.env.NEXT_PUBLIC_WORKSPACE_PORT || "3000";
      return `http://${cleanSlug}.localhost:${workspacePort}${cleanPath}`;
    }
  }

  const root = getDisplayRootDomain();
  return `https://${cleanSlug}.${root}${cleanPath}`;
}

export async function fetchPublicBillingConfig(): Promise<PublicBillingConfig | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/billing/public-config`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchPublicPlans(): Promise<{
  plans: CommercialPlan[];
  trialConfig: TrialConfiguration;
} | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/billing/public-plans`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const tierOrder: Record<string, number> = { BASE: 1, PROFESSIONAL: 2, ENTERPRISE: 3 };
    const sortedPlans: CommercialPlan[] = Array.isArray(data?.plans)
      ? [...data.plans].sort(
          (a: CommercialPlan, b: CommercialPlan) =>
            (tierOrder[a.planId] ?? 99) - (tierOrder[b.planId] ?? 99) ||
            (a.price || 0) - (b.price || 0)
        )
      : [];
    return {
      plans: sortedPlans,
      trialConfig: data?.trialConfig || {
        durationDays: 14,
        maxUsers: 2,
        maxDepartments: 2,
        maxOrders: 5,
        storageMb: 250,
      },
    };
  } catch {
    return null;
  }
}

export async function checkSubdomainAvailability(slug: string): Promise<{
  available: boolean;
  slug: string;
  reason?: string;
}> {
  const clean = slug.trim().toLowerCase();
  if (clean.length < 3) {
    return { available: false, slug: clean, reason: "Use at least 3 characters" };
  }
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/public/check-slug?slug=${encodeURIComponent(clean)}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { available: true, slug: clean };
    return await res.json();
  } catch {
    return { available: true, slug: clean };
  }
}

export async function resolveWorkspace(identifier: string): Promise<{
  success: boolean;
  type?: "TENANT" | "SUPER_ADMIN";
  slug?: string;
  name?: string;
  status?: string;
  onboardingStatus?: string;
  email?: string;
  message?: string;
}> {
  const res = await fetch(`${getApiBaseUrl()}/public/resolve-workspace`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Could not locate workspace");
  }
  return data;
}

export async function startOnboarding(payload: OnboardingStartPayload) {
  const res = await fetch(`${getApiBaseUrl()}/public/onboarding/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Could not create workspace profile");
  }
  return data;
}

export async function uploadOnboardingDocument(
  accessToken: string,
  file: File,
  docCategory: string,
  issuedDate = "",
  expiryDate = ""
): Promise<{
  success: boolean;
  document: OnboardingDocumentEntry;
  onboardingDocuments: OnboardingDocumentEntry[];
}> {
  const formData = new FormData();
  formData.append("document", file);
  formData.append("docCategory", docCategory);
  if (issuedDate) formData.append("issuedDate", issuedDate);
  if (expiryDate) formData.append("expiryDate", expiryDate);

  const res = await fetch(`${getApiBaseUrl()}/public/onboarding/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Failed to upload onboarding document");
  }
  return data;
}

export async function prepareOnboardingPaddleCheckout(
  accessToken: string,
  params: { planId?: string; planCode?: string; interval: "MONTH" | "YEAR" }
) {
  const res = await fetch(`${getApiBaseUrl()}/public/onboarding/checkout-prepare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || "Could not prepare Paddle Checkout");
  }
  return data;
}

export async function fetchOnboardingStatus(accessToken: string) {
  const res = await fetch(`${getApiBaseUrl()}/public/onboarding/status`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return await res.json();
}
