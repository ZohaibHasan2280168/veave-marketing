"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle, CreditCard, ShieldCheck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VEAVE_FAQS } from "@/data/veaveData";
import {
  fetchPublicPlans,
  type CommercialPlan,
  type TrialConfiguration,
} from "@/lib/veaveApi";
import { formatMoneyFromMinor, previewLocalizedPrices } from "@/lib/paddle";

const FALLBACK_PLANS: CommercialPlan[] = [
  {
    planId: "BASE",
    name: "Base",
    description:
      "Core CRM, storefront builder, order tracking, and financial records for growing businesses and workshops.",
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
      "4 Production Departments & 1 Location",
      "Up to 10 Staff Accounts with Custom Role ACLs",
      "150 Active Orders & Full CRM Leads / Customers",
      "10 GB Cloudflare R2 Private Document & Media Storage",
      "Visual Storefront Builder (3 Pages & 2 Themes)",
      "Real-Time Team Chat, Kanban Tasks & Financial Ledger",
    ],
    activeMonthlyPrice: {
      _id: "base-m",
      planId: "BASE",
      planCode: "BASE",
      version: 1,
      interval: "MONTH",
      currency: "USD",
      amountMinor: 2900,
      trialDays: 14,
      requiresCardOnTrial: true,
      isActiveForNew: true,
      overrides: [{ countryCode: "PK", currency: "USD", amountMinor: 1200 }],
    },
    activeYearlyPrice: {
      _id: "base-y",
      planId: "BASE",
      planCode: "BASE",
      version: 1,
      interval: "YEAR",
      currency: "USD",
      amountMinor: 29000,
      trialDays: 14,
      requiresCardOnTrial: true,
      isActiveForNew: true,
      overrides: [{ countryCode: "PK", currency: "USD", amountMinor: 12000 }],
    },
  },
  {
    planId: "PROFESSIONAL",
    name: "Professional",
    description:
      "Complete CRM, Google Meet & Reviews integrations, and multi-department operations for scaling companies.",
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
      "12 Production Departments & 3 Locations",
      "Up to 35 Staff Accounts & All 7 Role Presets",
      "1,000 Active Orders, Opportunities & Counter-Proposals",
      "50 GB Cloudflare R2 Private Document & Media Storage",
      "Google Calendar, Google Meet & Places Reviews Sync",
      "Website Builder: Custom Logo, 5 Pages & 6 Themes",
    ],
    activeMonthlyPrice: {
      _id: "pro-m",
      planId: "PROFESSIONAL",
      planCode: "PROFESSIONAL",
      version: 1,
      interval: "MONTH",
      currency: "USD",
      amountMinor: 7900,
      trialDays: 14,
      requiresCardOnTrial: true,
      isActiveForNew: true,
      overrides: [{ countryCode: "PK", currency: "USD", amountMinor: 2900 }],
    },
    activeYearlyPrice: {
      _id: "pro-y",
      planId: "PROFESSIONAL",
      planCode: "PROFESSIONAL",
      version: 1,
      interval: "YEAR",
      currency: "USD",
      amountMinor: 79000,
      trialDays: 14,
      requiresCardOnTrial: true,
      isActiveForNew: true,
      overrides: [{ countryCode: "PK", currency: "USD", amountMinor: 29000 }],
    },
  },
  {
    planId: "ENTERPRISE",
    name: "Enterprise",
    description:
      "High-volume multi-site operations requiring custom domains, white-labeling, and dedicated SLAs.",
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
      "Unlimited Departments, Staff & Active Orders",
      "Up to 10 Business Locations",
      "500 GB Cloudflare R2 Private Document & Media Storage",
      "Custom Domain Connection (DNS Verification) & White-Label",
      "All Storefront Themes & Unlimited Pages",
      "Dedicated Account Lead & Custom SLA",
    ],
    activeMonthlyPrice: {
      _id: "ent-m",
      planId: "ENTERPRISE",
      planCode: "ENTERPRISE",
      version: 1,
      interval: "MONTH",
      currency: "USD",
      amountMinor: 24900,
      trialDays: 14,
      requiresCardOnTrial: true,
      isActiveForNew: true,
      overrides: [{ countryCode: "PK", currency: "USD", amountMinor: 9900 }],
    },
    activeYearlyPrice: {
      _id: "ent-y",
      planId: "ENTERPRISE",
      planCode: "ENTERPRISE",
      version: 1,
      interval: "YEAR",
      currency: "USD",
      amountMinor: 249000,
      trialDays: 14,
      requiresCardOnTrial: true,
      isActiveForNew: true,
      overrides: [{ countryCode: "PK", currency: "USD", amountMinor: 99000 }],
    },
  },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<CommercialPlan[]>(FALLBACK_PLANS);
  const [trialConfig, setTrialConfig] = useState<TrialConfiguration>({
    durationDays: 14,
    maxUsers: 2,
    maxDepartments: 2,
    maxOrders: 5,
    storageMb: 250,
  });
  const [interval, setIntervalMode] = useState<"MONTH" | "YEAR">("MONTH");
  const [countryCode, setCountryCode] = useState<string>("PK");
  const [paddleFormattedMap, setPaddleFormattedMap] = useState<Record<string, string>>({});

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

  // Live Paddle.PricePreview lookup whenever plans or countryCode change
  useEffect(() => {
    let active = true;
    const priceIds = plans
      .flatMap((p) => [
        p.activeMonthlyPrice?.externalPriceId || "",
        p.activeYearlyPrice?.externalPriceId || "",
      ])
      .filter(Boolean);

    if (priceIds.length > 0) {
      previewLocalizedPrices(priceIds, countryCode).then((map) => {
        if (active) setPaddleFormattedMap(map);
      });
    }
    return () => {
      active = false;
    };
  }, [plans, countryCode]);

  const getTierDisplayPrice = (plan: CommercialPlan) => {
    const priceObj = interval === "YEAR" ? plan.activeYearlyPrice : plan.activeMonthlyPrice;
    const extId = priceObj?.externalPriceId || "";
    const baseMinor =
      priceObj?.amountMinor ??
      Math.round((interval === "YEAR" ? plan.annualPrice : plan.price) * 100);

    let effectiveMinor = baseMinor;
    if (countryCode === "PK") {
      const pkOv = (priceObj?.overrides || []).find((o) => o.countryCode === "PK");
      if (pkOv) effectiveMinor = pkOv.amountMinor;
    }

    const formatted =
      (extId && paddleFormattedMap[extId]) ||
      formatMoneyFromMinor(effectiveMinor, priceObj?.currency || "USD");

    const hasRegionalDiscount = effectiveMinor < baseMinor;
    const globalFormatted = formatMoneyFromMinor(baseMinor, priceObj?.currency || "USD");

    return { formatted, hasRegionalDiscount, globalFormatted };
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#122a38] text-white py-16 border-b border-white/[0.08]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 text-center flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/[0.1] bg-[#0d1f2b] px-3 py-1 font-mono text-xs text-[#9cc4ff]">
              <span>Paddle Billing · {trialConfig.durationDays}-day free trial on every plan</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-white leading-[1.12] max-w-3xl">
              Complete CRM, storefront and operations software on one subscription
            </h1>

            <p className="text-base text-[#c6d6e1] leading-relaxed max-w-2xl">
              Start with a {trialConfig.durationDays}-day trial ($0.00 charged today). Your selected
              plan activates automatically when the trial ends, and you can upgrade, downgrade, or
              cancel any time.
            </p>
          </div>
        </section>

        {/* Controls & Pricing Cards Grid */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl space-y-8">
            {/* Frequency Toggle & Country Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#e3eaef] rounded-xl p-4">
              <div className="inline-flex rounded-lg border border-[#e3eaef] bg-[#f3f6f8] p-1 text-xs">
                {[
                  { key: "MONTH" as const, label: "Monthly billing" },
                  { key: "YEAR" as const, label: "Annual billing (2 months free)" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setIntervalMode(opt.key)}
                    className={`px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                      interval === opt.key
                        ? "bg-[#122a38] text-white"
                        : "text-[#587080] hover:text-[#16303f]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5 text-xs">
                <span className="text-[#587080]">Billing region:</span>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-[#e3eaef] bg-[#f8fafc] text-xs font-medium text-[#16303f] focus:border-[#0e6bfd] focus:outline-hidden"
                >
                  <option value="PK">Pakistan (PK regional rate)</option>
                  <option value="US">United States / Global (Standard USD)</option>
                  <option value="GB">United Kingdom (Global USD)</option>
                  <option value="AE">United Arab Emirates (Global USD)</option>
                </select>
              </div>
            </div>

            {/* 3 Commercial Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan) => {
                const { formatted, hasRegionalDiscount, globalFormatted } =
                  getTierDisplayPrice(plan);
                return (
                  <div
                    key={plan.planId}
                    className={`relative flex flex-col justify-between rounded-2xl border p-7 bg-white ${
                      plan.popular
                        ? "border-[#0e6bfd] ring-1 ring-[#0e6bfd]/25"
                        : "border-[#e3eaef]"
                    }`}
                  >
                    <div className="space-y-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-medium text-[#16303f]">{plan.name}</h2>
                            <span className="px-2 py-0.5 rounded bg-[#f3f6f8] font-mono text-[11px] text-[#587080]">
                              {plan.planId}
                            </span>
                          </div>
                          <p className="text-xs text-[#587080] mt-1.5 leading-relaxed">
                            {plan.description}
                          </p>
                        </div>
                        {plan.popular && (
                          <span className="shrink-0 rounded-md bg-[#0e6bfd]/10 px-2.5 py-1 font-mono text-[11px] font-medium text-[#0e6bfd]">
                            Recommended
                          </span>
                        )}
                      </div>

                      <div className="pb-5 border-b border-[#e3eaef]">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-medium text-[#16303f] tracking-tight tabular-nums">
                            {formatted}
                          </span>
                          <span className="text-xs text-[#587080]">
                            {interval === "YEAR" ? "/ year" : "/ month"}
                          </span>
                        </div>
                        {hasRegionalDiscount && (
                          <div className="text-xs text-[#587080] mt-1 font-mono tabular-nums">
                            <span className="line-through mr-1.5">{globalFormatted}</span>
                            <span className="text-[#16a34a]">PK regional override applied</span>
                          </div>
                        )}
                        <div className="text-xs text-[#0e6bfd] font-mono tabular-nums mt-1.5">
                          $0.00 due today · {plan.trialDays || trialConfig.durationDays}-day trial
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <span className="font-mono text-[11px] text-[#587080] block">
                          Included quotas &amp; modules
                        </span>
                        {(plan.features || []).map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5 text-[#16303f]">
                            <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#e3eaef]">
                      <Link
                        href={`/signup?plan=${encodeURIComponent(plan.planId)}&interval=${interval}&country=${countryCode}`}
                        className={`w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors ${
                          plan.popular
                            ? "bg-[#0e6bfd] text-white hover:bg-[#0b5ad9]"
                            : "border border-[#dbe4ea] bg-[#f8fafc] text-[#16303f] hover:bg-[#eef2f5]"
                        }`}
                      >
                        <span>Start {plan.trialDays || trialConfig.durationDays}-day free trial</span>
                        <ArrowRight className="size-4 stroke-[1.5]" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trial & Paddle Billing Assurance Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#e3eaef] bg-white p-5 flex items-start gap-3">
                <Clock className="size-[18px] stroke-[1.5] text-[#0e6bfd] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-medium text-[#16303f]">
                    {trialConfig.durationDays}-day trial allowances
                  </div>
                  <p className="text-[#587080] leading-relaxed tabular-nums">
                    Trial workspaces include up to {trialConfig.maxUsers} staff,{" "}
                    {trialConfig.maxDepartments} departments, {trialConfig.maxOrders} orders, and{" "}
                    {trialConfig.storageMb} MB R2 storage. Full plan quotas unlock automatically
                    when the trial converts.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e3eaef] bg-white p-5 flex items-start gap-3">
                <CreditCard className="size-[18px] stroke-[1.5] text-[#0e6bfd] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-medium text-[#16303f]">Paddle Merchant of Record</div>
                  <p className="text-[#587080] leading-relaxed">
                    International Visa, Mastercard, and local payment methods processed by Paddle
                    with automated tax/VAT compliance and downloadable PDF receipts.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e3eaef] bg-white p-5 flex items-start gap-3">
                <ShieldCheck className="size-[18px] stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-medium text-[#16303f]">Self-serve upgrades &amp; cancellation</div>
                  <p className="text-[#587080] leading-relaxed">
                    Change plans or cancel with one click from your workspace Billing tab. Upgrades
                    prorate immediately; downgrades apply at your next billing cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing FAQ Section */}
        <section className="py-16 px-4 sm:px-6 bg-white">
          <div className="mx-auto w-full max-w-4xl flex flex-col gap-8">
            <div className="text-center flex flex-col items-center gap-2">
              <span className="font-mono text-xs text-[#0e6bfd]">Billing &amp; onboarding FAQ</span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.015em] text-[#16303f]">
                Frequently asked questions
              </h2>
            </div>

            <div className="space-y-3">
              {VEAVE_FAQS.map((faq) => (
                <div key={faq.id} className="p-5 rounded-xl border border-[#e3eaef] bg-[#f8fafc]">
                  <h3 className="text-sm font-medium text-[#16303f] flex items-center gap-2">
                    <HelpCircle className="size-4 stroke-[1.5] text-[#0e6bfd] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#587080] mt-2 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
