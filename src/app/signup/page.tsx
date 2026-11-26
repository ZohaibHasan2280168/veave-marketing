"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Globe,
  Building2,
  FileText,
  CreditCard,
  Upload,
  Lock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchPublicPlans,
  checkSubdomainAvailability,
  startOnboarding,
  uploadOnboardingDocument,
  prepareOnboardingPaddleCheckout,
  fetchOnboardingStatus,
  buildWorkspaceUrl,
  getDisplayRootDomain,
  type CommercialPlan,
  type TrialConfiguration,
  type OnboardingDocumentEntry,
} from "@/lib/veaveApi";
import {
  formatMoneyFromMinor,
  previewLocalizedPrices,
  openTrialCheckout,
} from "@/lib/paddle";

const DEFAULT_PLANS: CommercialPlan[] = [
  {
    planId: "BASE",
    name: "Base",
    description: "Core CRM, storefront builder, order tracking, and financial records.",
    price: 29,
    annualPrice: 290,
    trialDays: 14,
    departmentsLimit: 4,
    usersLimit: 10,
    ordersLimit: 150,
    storageQuotaGb: 10,
    locationsLimit: 1,
    websitePagesLimit: 3,
    themesLimit: 2,
    popular: false,
    features: [
      "4 Production Departments",
      "Up to 10 Staff Accounts",
      "150 Active Orders & Full CRM",
      "10 GB Cloudflare R2 Storage",
      "Storefront Builder (3 Pages)",
    ],
  },
  {
    planId: "PROFESSIONAL",
    name: "Professional",
    description: "Complete CRM, Google Meet & Reviews integrations, and multi-line operations.",
    price: 79,
    annualPrice: 790,
    trialDays: 14,
    departmentsLimit: 12,
    usersLimit: 35,
    ordersLimit: 1000,
    storageQuotaGb: 50,
    locationsLimit: 3,
    websitePagesLimit: 5,
    themesLimit: 6,
    popular: true,
    features: [
      "12 Departments & 3 Locations",
      "Up to 35 Staff Accounts",
      "1,000 Active Orders & Quotes",
      "50 GB Cloudflare R2 Storage",
      "Google Calendar, Meet & Reviews",
    ],
  },
  {
    planId: "ENTERPRISE",
    name: "Enterprise",
    description: "Multi-site operations requiring custom domains, white-labeling, and SLAs.",
    price: 249,
    annualPrice: 2490,
    trialDays: 14,
    departmentsLimit: -1,
    usersLimit: -1,
    ordersLimit: -1,
    storageQuotaGb: 500,
    locationsLimit: 10,
    websitePagesLimit: -1,
    themesLimit: 20,
    popular: false,
    features: [
      "Unlimited Departments, Staff & Orders",
      "Up to 10 Business Locations",
      "500 GB Cloudflare R2 Storage",
      "Custom Domain & White-Label",
      "All Storefront Themes & SLA",
    ],
  },
];

const STEPS = [
  { num: 1, title: "Account & subdomain", icon: Globe },
  { num: 2, title: "Business profile", icon: Building2 },
  { num: 3, title: "Documents vault", icon: FileText },
  { num: 4, title: "Plan & Paddle trial", icon: CreditCard },
];

function OnboardingWizardContent() {
  const searchParams = useSearchParams();
  const initialPlan = (searchParams.get("plan") || "PROFESSIONAL").toUpperCase();
  const initialInterval =
    (searchParams.get("interval") || "MONTH").toUpperCase() === "YEAR" ? "YEAR" : "MONTH";
  const initialCountry = (searchParams.get("country") || "PK").toUpperCase();

  const rootDomain = getDisplayRootDomain();

  const [step, setStep] = useState<number>(1);
  const [plans, setPlans] = useState<CommercialPlan[]>(DEFAULT_PLANS);
  const [trialConfig, setTrialConfig] = useState<TrialConfiguration>({
    durationDays: 14,
    maxUsers: 2,
    maxDepartments: 2,
    maxOrders: 5,
    storageMb: 250,
  });
  const [interval, setIntervalMode] = useState<"MONTH" | "YEAR">(initialInterval);
  const [paddlePrices, setPaddlePrices] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    companyName: "",
    desiredSlug: "",
    slugTouched: false,
    ownerName: "",
    ownerEmail: "",
    password: "",
    phone: "",
    companyType: "Apparel & Garment Manufacturing",
    employeesCount: 25,
    countryCode: initialCountry,
    location: initialCountry === "PK" ? "Lahore, PK" : "New York, US",
    foundedDate: "2020",
    address: "",
    taxId: "",
    exportLicenseNo: "",
    chamberRegNo: "",
    selectedPlanCode: ["BASE", "PROFESSIONAL", "ENTERPRISE"].includes(initialPlan)
      ? initialPlan
      : "PROFESSIONAL",
    notes: "",
  });

  const [slugState, setSlugState] = useState<{
    checking: boolean;
    available: boolean | null;
    reason?: string;
  }>({ checking: false, available: null });

  const [accessToken, setAccessToken] = useState<string>("");
  const [uploadedDocs, setUploadedDocs] = useState<OnboardingDocumentEntry[]>([]);
  const [docCategory, setDocCategory] = useState<string>("Trade License");
  const [issuedDate, setIssuedDate] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [uploadingDoc, setUploadingDoc] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [checkoutPolling, setCheckoutPolling] = useState<boolean>(false);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);

  // Fetch live plans from backend
  useEffect(() => {
    let active = true;
    fetchPublicPlans().then((res) => {
      if (!active || !res) return;
      if (res.plans.length > 0) setPlans(res.plans);
      if (res.trialConfig) setTrialConfig(res.trialConfig);
    });
    return () => {
      active = false;
    };
  }, []);

  // Fetch localized Paddle PricePreview
  useEffect(() => {
    let active = true;
    const priceIds = plans
      .flatMap((p) => [
        p.activeMonthlyPrice?.externalPriceId || "",
        p.activeYearlyPrice?.externalPriceId || "",
      ])
      .filter(Boolean);
    if (priceIds.length > 0) {
      previewLocalizedPrices(priceIds, form.countryCode).then((map) => {
        if (active) setPaddlePrices(map);
      });
    }
    return () => {
      active = false;
    };
  }, [plans, form.countryCode]);

  // Debounced subdomain availability check
  useEffect(() => {
    const clean = form.desiredSlug.trim().toLowerCase();
    if (!clean || clean.length < 3) {
      setSlugState({ checking: false, available: null });
      return;
    }
    setSlugState((prev) => ({ ...prev, checking: true }));
    const timer = setTimeout(() => {
      checkSubdomainAvailability(clean).then((res) => {
        setSlugState({
          checking: false,
          available: res.available,
          reason: res.reason,
        });
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [form.desiredSlug]);

  // Listen for Paddle checkout.completed event -> poll backend until webhook confirms TRIALING/ACTIVE
  useEffect(() => {
    const handleCheckoutCompleted = () => {
      if (!accessToken) {
        setOnboardingComplete(true);
        return;
      }
      setCheckoutPolling(true);
      let attempts = 0;
      const timer = setInterval(async () => {
        attempts += 1;
        const statusRes = await fetchOnboardingStatus(accessToken);
        const subStatus = statusRes?.entitlements?.subscriptionStatus;
        if (subStatus === "TRIALING" || subStatus === "ACTIVE" || attempts >= 12) {
          clearInterval(timer);
          setCheckoutPolling(false);
          setOnboardingComplete(true);
        }
      }, 2000);
    };

    const handleCheckoutClosed = () => {
      setSubmitting(false);
    };

    window.addEventListener("veave:paddle-checkout-completed", handleCheckoutCompleted);
    window.addEventListener("veave:paddle-checkout-closed", handleCheckoutClosed);
    return () => {
      window.removeEventListener("veave:paddle-checkout-completed", handleCheckoutCompleted);
      window.removeEventListener("veave:paddle-checkout-closed", handleCheckoutClosed);
    };
  }, [accessToken]);

  const updateField = (name: string, value: string | number) => {
    setErrorMsg("");
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "companyName" && !prev.slugTouched) {
        next.desiredSlug = String(value)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 40);
      }
      if (name === "desiredSlug") {
        next.slugTouched = true;
        next.desiredSlug = String(value)
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "")
          .slice(0, 40);
      }
      if (name === "countryCode") {
        if (value === "PK" && !prev.location.includes("PK")) next.location = "Lahore, PK";
        if (value === "US" && prev.location.includes("PK")) next.location = "New York, US";
        if (value === "GB" && prev.location.includes("PK")) next.location = "London, UK";
        if (value === "AE" && prev.location.includes("PK")) next.location = "Dubai, UAE";
      }
      return next;
    });
  };

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (form.desiredSlug.length < 3) {
      setErrorMsg("Subdomain must be at least 3 characters.");
      return;
    }
    if (slugState.available === false) {
      setErrorMsg(slugState.reason || "That subdomain is not available.");
      return;
    }
    if (form.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);
    try {
      const res = await startOnboarding({
        companyName: form.companyName.trim(),
        desiredSlug: form.desiredSlug.trim(),
        ownerName: form.ownerName.trim(),
        ownerEmail: form.ownerEmail.trim(),
        password: form.password,
        phone: form.phone.trim(),
        location: form.location.trim(),
        countryCode: form.countryCode,
        companyType: form.companyType,
        employeesCount: Number(form.employeesCount) || 1,
        foundedDate: form.foundedDate.trim(),
        address: form.address.trim(),
        taxId: form.taxId.trim(),
        exportLicenseNo: form.exportLicenseNo.trim(),
        chamberRegNo: form.chamberRegNo.trim(),
        selectedPlanCode: form.selectedPlanCode,
        selectedInterval: interval,
        notes: form.notes.trim(),
      });
      if (res?.accessToken) {
        setAccessToken(res.accessToken);
      }
      if (Array.isArray(res?.company?.onboardingDocuments)) {
        setUploadedDocs(res.company.onboardingDocuments);
      }
      setStep(3);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Could not save business profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !accessToken) return;
    setErrorMsg("");
    setUploadingDoc(true);
    try {
      for (const file of files) {
        const res = await uploadOnboardingDocument(
          accessToken,
          file,
          docCategory,
          issuedDate,
          expiryDate
        );
        if (Array.isArray(res?.onboardingDocuments)) {
          setUploadedDocs(res.onboardingDocuments);
        }
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to upload document.");
    } finally {
      setUploadingDoc(false);
      e.target.value = "";
    }
  };

  const handleStartPaddleCheckout = async () => {
    setErrorMsg("");
    setSubmitting(true);
    try {
      const prepared = await prepareOnboardingPaddleCheckout(accessToken, {
        planCode: form.selectedPlanCode,
        interval,
      });
      await openTrialCheckout({
        externalPriceId: prepared.externalPriceId,
        customerEmail: prepared.customerEmail || form.ownerEmail,
        countryCode: form.countryCode,
        customData: {
          tenantId: prepared.customData.tenantId,
          planId: prepared.customData.planId,
          planPriceId: prepared.customData.planPriceId,
        },
        environment: prepared.environment,
        clientToken: prepared.clientToken,
        theme: "light",
      });
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Could not open Paddle Checkout. You can also authorize your card inside your workspace Billing tab."
      );
      setSubmitting(false);
    }
  };

  const getPlanPriceDisplay = (plan: CommercialPlan) => {
    const priceObj = interval === "YEAR" ? plan.activeYearlyPrice : plan.activeMonthlyPrice;
    const extId = priceObj?.externalPriceId || "";
    const baseMinor =
      priceObj?.amountMinor ??
      Math.round((interval === "YEAR" ? plan.annualPrice : plan.price) * 100);
    let effectiveMinor = baseMinor;
    if (form.countryCode === "PK") {
      const pkOv = (priceObj?.overrides || []).find((o) => o.countryCode === "PK");
      if (pkOv) effectiveMinor = pkOv.amountMinor;
    } else if (form.countryCode === "PK" && !priceObj) {
      if (plan.planId === "BASE") effectiveMinor = interval === "YEAR" ? 12000 : 1200;
      if (plan.planId === "PROFESSIONAL") effectiveMinor = interval === "YEAR" ? 29000 : 2900;
      if (plan.planId === "ENTERPRISE") effectiveMinor = interval === "YEAR" ? 99000 : 9900;
    }

    const formatted =
      (extId && paddlePrices[extId]) ||
      formatMoneyFromMinor(effectiveMinor, priceObj?.currency || "USD");
    const globalFormatted = formatMoneyFromMinor(baseMinor, priceObj?.currency || "USD");
    const hasDiscount = effectiveMinor < baseMinor;

    return { formatted, globalFormatted, hasDiscount };
  };

  const workspaceLoginUrl = buildWorkspaceUrl(form.desiredSlug || "alpha-tailors", `/login?email=${encodeURIComponent(form.ownerEmail)}`);
  const workspaceBillingUrl = buildWorkspaceUrl(form.desiredSlug || "alpha-tailors", "/billing");

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* 4-Step Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isCurrent = step === s.num && !onboardingComplete;
          const isDone = step > s.num || onboardingComplete;
          return (
            <div
              key={s.num}
              className={`rounded-xl border p-3.5 flex items-center gap-3 transition-colors ${
                isCurrent
                  ? "bg-[#122a38] border-[#122a38] text-white"
                  : isDone
                  ? "bg-white border-[#16a34a]/40 text-[#16303f]"
                  : "bg-white border-[#e3eaef] text-[#587080]"
              }`}
            >
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-medium tabular-nums ${
                  isCurrent
                    ? "bg-[#0e6bfd] text-white"
                    : isDone
                    ? "bg-[#e4f3ea] text-[#16a34a]"
                    : "bg-[#f3f6f8] text-[#587080]"
                }`}
              >
                {isDone ? <Check className="size-3.5 stroke-[2]" /> : s.num}
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] opacity-75">Step 0{s.num}</div>
                <div className="text-xs font-medium truncate">{s.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 flex items-start gap-3 text-xs text-rose-700">
          <AlertCircle className="size-4 stroke-[1.5] shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Webhook Polling Screen */}
      {checkoutPolling && (
        <div className="rounded-2xl border border-[#e3eaef] bg-white p-10 text-center space-y-4">
          <RefreshCw className="size-6 stroke-[1.5] text-[#0e6bfd] animate-spin mx-auto" />
          <h2 className="text-xl font-medium text-[#16303f]">
            Confirming your {trialConfig.durationDays}-day trial with Paddle Billing
          </h2>
          <p className="text-xs text-[#587080] max-w-md mx-auto leading-relaxed">
            Your $0.00 card authorization succeeded. Waiting for signed webhook confirmation before
            opening your workspace...
          </p>
        </div>
      )}

      {/* Final Completion Screen */}
      {!checkoutPolling && onboardingComplete && (
        <div className="rounded-2xl border border-[#e3eaef] bg-white p-8 sm:p-10 text-center space-y-5">
          <div className="size-12 rounded-xl bg-[#e4f3ea] text-[#16a34a] flex items-center justify-center mx-auto">
            <Check className="size-6 stroke-[1.5]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-medium text-[#16303f]">
              {form.companyName} is ready on Veave
            </h2>
            <p className="text-sm text-[#587080] max-w-lg mx-auto leading-relaxed">
              Your isolated workspace at{" "}
              <strong className="font-mono text-[#16303f]">
                https://{form.desiredSlug}.{rootDomain}
              </strong>{" "}
              has been provisioned under the <strong>{form.selectedPlanCode}</strong> plan.
            </p>
          </div>

          <div className="max-w-md mx-auto rounded-xl border border-[#e3eaef] bg-[#f8fafc] p-4 text-left space-y-2 text-xs text-[#587080]">
            <div className="flex justify-between">
              <span>Workspace URL</span>
              <span className="font-mono text-[#16303f]">
                {form.desiredSlug}.{rootDomain}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Admin account</span>
              <span className="font-mono text-[#16303f]">{form.ownerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span>Uploaded vault documents</span>
              <span className="font-mono text-[#16303f] tabular-nums">
                {uploadedDocs.length} stored in R2
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={workspaceLoginUrl}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-6 text-sm font-medium text-white transition-colors"
            >
              <span>Open your workspace portal</span>
              <ArrowRight className="size-4 stroke-[1.5]" />
            </a>
            <a
              href={workspaceBillingUrl}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#dbe4ea] bg-white hover:bg-[#f3f6f8] px-5 text-sm font-medium text-[#16303f] transition-colors"
            >
              <span>Manage subscription &amp; billing</span>
            </a>
          </div>
        </div>
      )}

      {/* STEP 1: Account & Subdomain Identity */}
      {!checkoutPolling && !onboardingComplete && step === 1 && (
        <form
          onSubmit={handleStep1Continue}
          className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 space-y-6"
        >
          <div className="border-b border-[#e3eaef] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs text-[#0e6bfd]">Step 01 of 04</span>
              <h2 className="text-xl font-medium text-[#16303f] mt-0.5">
                Claim your subdomain &amp; administrator account
              </h2>
            </div>
            <Link href="/login" className="text-xs font-medium text-[#587080] hover:text-[#0e6bfd]">
              Already have a workspace? Log in →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">
                Business / company name *
              </label>
              <input
                required
                type="text"
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Crescent Knitwear Mills"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Workspace subdomain *</label>
              <div className="flex items-center h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 focus-within:border-[#0e6bfd] focus-within:bg-white">
                <Globe className="size-4 stroke-[1.5] text-[#587080] shrink-0 mr-2" />
                <input
                  required
                  type="text"
                  value={form.desiredSlug}
                  onChange={(e) => updateField("desiredSlug", e.target.value)}
                  placeholder="crescent-knitwear"
                  className="w-full bg-transparent font-mono text-xs text-[#16303f] focus:outline-hidden"
                />
                <span className="font-mono text-xs text-[#587080] shrink-0">.{rootDomain}</span>
              </div>
              {form.desiredSlug.length >= 3 && (
                <div className="font-mono text-[11px]">
                  {slugState.checking ? (
                    <span className="text-[#587080]">Checking availability...</span>
                  ) : slugState.available ? (
                    <span className="text-[#16a34a]">
                      Available: https://{form.desiredSlug}.{rootDomain}
                    </span>
                  ) : (
                    <span className="text-rose-600">{slugState.reason}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Your full name *</label>
              <input
                required
                type="text"
                value={form.ownerName}
                onChange={(e) => updateField("ownerName", e.target.value)}
                placeholder="Tariq Mahmood"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Work email *</label>
              <input
                required
                type="email"
                value={form.ownerEmail}
                onChange={(e) => updateField("ownerEmail", e.target.value)}
                placeholder="ops@crescentmills.pk"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Phone / WhatsApp *</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+92 300 1234567"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">
                Administrator password (min 8 chars) *
              </label>
              <input
                required
                minLength={8}
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="••••••••••••"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e3eaef]">
            <span className="text-xs text-[#587080]">
              100% database tenant isolation per workspace subdomain.
            </span>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-5 text-sm font-medium text-white transition-colors cursor-pointer"
            >
              <span>Continue to business profile</span>
              <ArrowRight className="size-4 stroke-[1.5]" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Business Profile, Location, Employees & Tax/Registration IDs */}
      {!checkoutPolling && !onboardingComplete && step === 2 && (
        <form
          onSubmit={handleStep2Submit}
          className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 space-y-6"
        >
          <div className="border-b border-[#e3eaef] pb-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-[#0e6bfd]">Step 02 of 04</span>
              <h2 className="text-xl font-medium text-[#16303f] mt-0.5">
                Business profile, headcount &amp; registration details
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#587080] hover:text-[#16303f] cursor-pointer"
            >
              <ArrowLeft className="size-3.5 stroke-[1.5]" />
              <span>Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Industry / business type *</label>
              <select
                value={form.companyType}
                onChange={(e) => updateField("companyType", e.target.value)}
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              >
                <option value="Apparel & Garment Manufacturing">
                  Apparel &amp; Garment Manufacturing
                </option>
                <option value="Textiles, Denim & Knitwear">Textiles, Denim &amp; Knitwear</option>
                <option value="Custom Manufacturing & Fabrication">
                  Custom Manufacturing &amp; Fabrication
                </option>
                <option value="Wholesale, Export & B2B Trade">
                  Wholesale, Export &amp; B2B Trade
                </option>
                <option value="Commercial Workshop & Studio">
                  Commercial Workshop &amp; Studio
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Total employees *</label>
              <input
                required
                type="number"
                min={1}
                max={100000}
                value={form.employeesCount}
                onChange={(e) => updateField("employeesCount", parseInt(e.target.value, 10) || 1)}
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] tabular-nums focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Founded year</label>
              <input
                type="text"
                value={form.foundedDate}
                onChange={(e) => updateField("foundedDate", e.target.value)}
                placeholder="2018"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] tabular-nums focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Country *</label>
              <select
                value={form.countryCode}
                onChange={(e) => updateField("countryCode", e.target.value)}
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              >
                <option value="PK">Pakistan (PK regional pricing)</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="AE">United Arab Emirates</option>
                <option value="DE">Germany / European Union</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">City &amp; location *</label>
              <input
                required
                type="text"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Lahore, PK"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#16303f]">
              Facility / headquarters street address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Plot 42, Industrial Area / Commercial Zone"
              className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">
                Tax ID / NTN / EIN (optional)
              </label>
              <input
                type="text"
                value={form.taxId}
                onChange={(e) => updateField("taxId", e.target.value)}
                placeholder="NTN-4829104-7"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 font-mono text-xs text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">
                Export license no. (optional)
              </label>
              <input
                type="text"
                value={form.exportLicenseNo}
                onChange={(e) => updateField("exportLicenseNo", e.target.value)}
                placeholder="EXP-2026-991"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 font-mono text-xs text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">
                Chamber / trade reg. (optional)
              </label>
              <input
                type="text"
                value={form.chamberRegNo}
                onChange={(e) => updateField("chamberRegNo", e.target.value)}
                placeholder="LCCI-88210"
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 font-mono text-xs text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#e3eaef]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#dbe4ea] bg-white px-4 text-xs font-medium text-[#16303f] hover:bg-[#f3f6f8] cursor-pointer"
            >
              <ArrowLeft className="size-3.5 stroke-[1.5]" />
              <span>Previous step</span>
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-5 text-sm font-medium text-white transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>
                {submitting ? "Provisioning workspace..." : "Save profile & continue to documents"}
              </span>
              <ArrowRight className="size-4 stroke-[1.5]" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Compliance & Business Documents (Private Cloudflare R2 Vault) */}
      {!checkoutPolling && !onboardingComplete && step === 3 && (
        <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#e3eaef] pb-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-[#0e6bfd]">Step 03 of 04</span>
              <h2 className="text-xl font-medium text-[#16303f] mt-0.5">
                Upload business &amp; compliance documents
              </h2>
              <p className="text-xs text-[#587080] mt-1">
                Files are encrypted and stored in your tenant-isolated Cloudflare R2 private vault (
                <code className="font-mono">
                  weave-private/tenants/{form.desiredSlug}/company-document/
                </code>
                ).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#587080] hover:text-[#16303f] cursor-pointer"
            >
              <ArrowLeft className="size-3.5 stroke-[1.5]" />
              <span>Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Document category</label>
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value)}
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 text-xs font-medium text-[#16303f]"
              >
                <option value="Trade License">Trade License / Incorporation</option>
                <option value="Tax Registration / NTN">Tax Registration / NTN</option>
                <option value="Compliance Certificate">ISO / Quality Compliance Certificate</option>
                <option value="Export License">Export / Chamber Certificate</option>
                <option value="Agreement / SLA">Service Agreement / DPA</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Issued date (optional)</label>
              <input
                type="date"
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 text-xs text-[#16303f]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#16303f]">Expiry date (optional)</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 text-xs text-[#16303f]"
              />
            </div>
          </div>

          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] hover:bg-[#eef2f5] p-8 cursor-pointer transition-colors">
            <Upload className="size-6 stroke-[1.5] text-[#0e6bfd]" />
            <span className="text-sm font-medium text-[#16303f]">
              {uploadingDoc
                ? "Uploading to Cloudflare R2 private vault..."
                : "Click to attach PDF, PNG, JPG or DOCX document"}
            </span>
            <span className="text-xs text-[#587080]">
              Up to 15 MB per document · Stored with immutable onboarding audit lock
            </span>
            <input
              type="file"
              multiple
              disabled={uploadingDoc}
              accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {uploadedDocs.length > 0 && (
            <div className="space-y-2">
              <div className="font-mono text-xs text-[#587080]">
                Uploaded vault documents ({uploadedDocs.length})
              </div>
              {uploadedDocs.map((doc, idx) => (
                <div
                  key={`${doc.storageObjectId || doc.fileName}-${idx}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-4 py-2.5 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Lock className="size-3.5 stroke-[1.5] text-[#16a34a] shrink-0" />
                    <div className="truncate">
                      <span className="font-medium text-[#16303f]">{doc.fileName}</span>
                      <span className="text-[#587080] ml-2">
                        ({doc.docCategory} · {((doc.sizeBytes || 0) / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-[#16a34a] shrink-0">Stored in R2</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#e3eaef]">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="text-xs font-medium text-[#587080] hover:text-[#16303f] cursor-pointer"
            >
              Skip documents for now (upload later in Settings) →
            </button>

            <button
              type="button"
              onClick={() => setStep(4)}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-5 text-sm font-medium text-white transition-colors cursor-pointer"
            >
              <span>Continue to plan &amp; trial activation</span>
              <ArrowRight className="size-4 stroke-[1.5]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Plan Selection & Live Paddle 14-Day Trial Checkout */}
      {!checkoutPolling && !onboardingComplete && step === 4 && (
        <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#e3eaef] pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono text-xs text-[#0e6bfd]">Step 04 of 04</span>
              <h2 className="text-xl font-medium text-[#16303f] mt-0.5">
                Select your plan &amp; start your {trialConfig.durationDays}-day free trial
              </h2>
              <p className="text-xs text-[#587080] mt-1">
                $0.00 is charged today. Your chosen subscription plan activates automatically on Day{" "}
                {trialConfig.durationDays} unless you cancel or switch plans first.
              </p>
            </div>

            <div className="inline-flex rounded-lg border border-[#e3eaef] bg-[#f3f6f8] p-1 text-xs">
              {[
                { key: "MONTH" as const, label: "Monthly" },
                { key: "YEAR" as const, label: "Annual (2 months free)" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setIntervalMode(opt.key)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    interval === opt.key
                      ? "bg-[#122a38] text-white"
                      : "text-[#587080] hover:text-[#16303f]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const isSelected = form.selectedPlanCode === plan.planId;
              const { formatted, globalFormatted, hasDiscount } = getPlanPriceDisplay(plan);

              return (
                <button
                  key={plan.planId}
                  type="button"
                  onClick={() => updateField("selectedPlanCode", plan.planId)}
                  className={`text-left rounded-xl border p-5 flex flex-col justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[#0e6bfd] bg-[#f8fafc] ring-1 ring-[#0e6bfd]/25"
                      : "border-[#e3eaef] bg-white hover:border-[#cbd5e1]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-medium text-[#16303f]">{plan.name}</span>
                      <span className="px-2 py-0.5 rounded bg-[#f3f6f8] font-mono text-[11px] text-[#587080]">
                        {plan.planId}
                      </span>
                    </div>
                    <p className="text-xs text-[#587080] leading-relaxed">{plan.description}</p>

                    <div className="pt-2 border-t border-[#e3eaef]">
                      <div className="text-2xl font-medium text-[#16303f] tabular-nums">
                        {formatted}
                        <span className="text-xs font-normal text-[#587080]">
                          {interval === "YEAR" ? " / yr" : " / mo"}
                        </span>
                      </div>
                      {hasDiscount && (
                        <div className="font-mono text-[11px] text-[#16a34a] tabular-nums">
                          <span className="line-through text-[#587080] mr-1">{globalFormatted}</span>
                          PK rate
                        </div>
                      )}
                      <div className="font-mono text-[11px] text-[#0e6bfd] mt-1">
                        $0.00 due today · {plan.trialDays || trialConfig.durationDays}-day trial
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#e3eaef] text-xs text-[#16303f]">
                      {(plan.features || []).slice(0, 5).map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <Check className="size-3.5 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e3eaef] text-xs font-medium text-[#0e6bfd]">
                    {isSelected ? "Selected for after trial" : "Select this plan"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Checkout Action Bar */}
          <div className="rounded-xl border border-[#e3eaef] bg-[#f8fafc] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="font-medium text-[#16303f]">
                Workspace:{" "}
                <span className="font-mono text-[#0e6bfd]">
                  {form.desiredSlug}.{rootDomain}
                </span>{" "}
                · Plan: <strong>{form.selectedPlanCode}</strong> (
                {interval === "YEAR" ? "Annual" : "Monthly"})
              </div>
              <div className="text-[#587080]">
                Authorize your payment card ($0.00 today) via Paddle Billing to unlock your{" "}
                {trialConfig.durationDays}-day trial immediately.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleStartPaddleCheckout}
                disabled={submitting}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-5 text-sm font-medium text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <CreditCard className="size-4 stroke-[1.5]" />
                <span>
                  {submitting
                    ? "Opening Paddle Checkout..."
                    : `Authorize card & start ${trialConfig.durationDays}-day trial ($0.00)`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOnboardingComplete(true)}
                className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-[#dbe4ea] bg-white hover:bg-[#f3f6f8] px-4 text-xs font-medium text-[#16303f] transition-colors cursor-pointer"
              >
                <span>Complete checkout inside workspace →</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f8]">
      <Navbar />

      <main className="flex-1">
        <section className="bg-[#122a38] text-white py-12 border-b border-white/[0.08]">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 flex flex-col items-start gap-2">
            <span className="font-mono text-xs text-[#9cc4ff]">
              Self-serve workspace onboarding · Paddle Billing
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.02em] text-white">
              Set up your Veave workspace and start your 14-day free trial
            </h1>
            <p className="text-sm text-[#c6d6e1] max-w-2xl">
              Complete your company profile, attach compliance documents to your private Cloudflare
              R2 vault, and choose the plan that will apply after your trial ends.
            </p>
          </div>
        </section>

        <section className="py-10 px-4 sm:px-6">
          <Suspense
            fallback={
              <div className="mx-auto max-w-5xl rounded-2xl border border-[#e3eaef] bg-white p-10 text-center text-xs text-[#587080]">
                Loading onboarding wizard...
              </div>
            }
          >
            <OnboardingWizardContent />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
