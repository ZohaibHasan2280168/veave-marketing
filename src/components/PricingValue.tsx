"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  ShieldCheck,
  HardDrive,
  Sliders,
  Smartphone,
  Lock,
  CheckCircle2,
  Globe,
  FileCheck2,
} from "lucide-react";
import { fetchPublicPlans, type CommercialPlan } from "@/lib/veaveApi";
import { formatMoneyFromMinor } from "@/lib/paddle";

interface PlanSummary {
  code: string;
  name: string;
  globalMinor: number;
  pkMinor: number;
  highlight?: boolean;
}

const DEFAULT_SUMMARIES: PlanSummary[] = [
  { code: "BASE", name: "Base", globalMinor: 2900, pkMinor: 1200 },
  { code: "PROFESSIONAL", name: "Professional", globalMinor: 7900, pkMinor: 3900, highlight: true },
  { code: "ENTERPRISE", name: "Enterprise", globalMinor: 24900, pkMinor: 12900 },
];

export default function PricingValue() {
  const [region, setRegion] = useState<"GLOBAL" | "PK">("GLOBAL");
  const [plans, setPlans] = useState<PlanSummary[]>(DEFAULT_SUMMARIES);

  useEffect(() => {
    let mounted = true;
    fetchPublicPlans()
      .then((res) => {
        if (!mounted || !res?.plans?.length) return;
        const tierOrder: Record<string, number> = { BASE: 1, PROFESSIONAL: 2, ENTERPRISE: 3 };
        const mapped = res.plans
          .map((p: CommercialPlan) => {
            const monthly = p.activeMonthlyPrice;
            const pkOverride = monthly?.overrides?.find((o) => o.countryCode === "PK");
            return {
              code: p.planId,
              name: p.name,
              globalMinor: monthly?.amountMinor ?? Math.round((p.price || 29) * 100),
              pkMinor: pkOverride?.amountMinor ?? Math.round((p.price || 29) * 50),
              highlight: p.planId === "PROFESSIONAL" || Boolean(p.popular),
            };
          })
          .sort(
            (a: PlanSummary, b: PlanSummary) =>
              (tierOrder[a.code] ?? 99) - (tierOrder[b.code] ?? 99) ||
              a.globalMinor - b.globalMinor
          );
        if (mapped.length > 0) setPlans(mapped);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="value"
      className="relative px-4 sm:px-6 py-16 lg:py-24 bg-[#f4f7fa] border-b border-[#e2e9ef] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-55" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl flex flex-col gap-12">
        {/* Section Header */}
        <div className="grid items-end gap-x-12 gap-y-4 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-2"
          >
            <span className="font-mono text-xs text-[#0e6bfd]">Transparent subscription billing</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#132938] leading-[1.13]">
              Enterprise-grade CRM and operations software, priced for growing businesses
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-5 text-[15px] text-[#556d7d] leading-relaxed"
          >
            One predictable subscription powered by Paddle Billing. Start with a 14-day trial ($0.00
            charged today) and scale across Base, Professional, or Enterprise tiers as your team
            grows.
          </motion.p>
        </div>

        {/* Asymmetric Pinterest-Style Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Bento Card 1 (Span 7): Live Regional Paddle Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 rounded-2xl bg-[#0e2230] border border-white/[0.1] p-6 sm:p-7 text-white flex flex-col justify-between gap-6 shadow-[0_20px_50px_-15px_rgba(9,24,35,0.35)] relative overflow-hidden"
          >
            <div className="pointer-events-none absolute top-0 left-8 right-8 h-px edge-highlight opacity-80" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#9cc4ff]">
                  <CreditCard className="size-3.5 stroke-[1.5]" />
                  <span>Paddle Billing · Live regional catalog</span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  14-day trial ($0.00 due today) with automatic regional pricing
                </h3>
              </div>

              {/* Interactive Region Switcher */}
              <div className="inline-flex rounded-lg bg-[#091823] border border-white/[0.1] p-1 text-xs font-medium">
                {(["GLOBAL", "PK"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRegion(r)}
                    className={`relative rounded-md px-3 py-1 transition-colors cursor-pointer ${
                      region === r ? "text-white" : "text-[#8ba5b8] hover:text-white"
                    }`}
                  >
                    {region === r && (
                      <motion.span
                        layoutId="bentoRegionPill"
                        transition={{ type: "spring", stiffness: 360, damping: 28 }}
                        className="absolute inset-0 rounded-md bg-[#0e6bfd]"
                      />
                    )}
                    <span className="relative z-10">
                      {r === "GLOBAL" ? "Global USD" : "Pakistan (PK)"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Live Commercial Plan Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plans.map((p) => {
                const minor = region === "PK" ? p.pkMinor : p.globalMinor;
                return (
                  <Link
                    key={p.code}
                    href={`/signup?plan=${p.code}&interval=MONTH`}
                    className={`rounded-xl p-4 border transition-all hover:-translate-y-0.5 ${
                      p.highlight
                        ? "bg-white/[0.08] border-[#0e6bfd] shadow-md shadow-[#0e6bfd]/15"
                        : "bg-[#091823] border-white/[0.1] hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#c6d6e1]">{p.name}</span>
                      {p.highlight && (
                        <span className="rounded bg-[#0e6bfd] px-1.5 py-0.5 font-mono text-[9px] text-white">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-semibold font-mono tabular-nums text-white">
                        {formatMoneyFromMinor(minor, "USD")}
                      </span>
                      <span className="text-xs text-[#8ba5b8]">/mo</span>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-[#4cc38a]">
                      $0.00 today · 14d trial
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.08] text-xs">
              <span className="text-[#9cb3c3]">
                Save 2 months on annual billing · Tax-compliant invoices via Paddle Customer Portal
              </span>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 font-medium text-[#9cc4ff] hover:text-white transition-colors"
              >
                <span>Compare full tiers</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bento Card 2 (Span 5): 4-Step Self-Serve Onboarding Visual */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5 rounded-2xl bg-white border border-[#e2e9ef] p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-[0_6px_24px_-12px_rgba(19,41,56,0.08)]"
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#0e6bfd]">
                <FileCheck2 className="size-3.5 stroke-[1.5]" />
                <span>Self-serve provisioning</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-[#132938]">
                Live isolated workspace in 4 guided steps
              </h3>
              <p className="text-xs text-[#556d7d] leading-relaxed">
                No sales gatekeepers. Claim your subdomain, verify business profile &amp; compliance
                documents, and activate your 14-day Paddle trial immediately.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { num: "01", label: "Identity & dedicated subdomain", tag: "{company}.veave.systemic.pk" },
                { num: "02", label: "Business profile, employees & Tax IDs", tag: "NTN / EIN" },
                { num: "03", label: "Compliance documents in Cloudflare R2", tag: "Encrypted" },
                { num: "04", label: "Select plan & authorize $0.00 Paddle trial", tag: "Instant access" },
              ].map((s) => (
                <div
                  key={s.num}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#e2e9ef] bg-[#f8fafc] px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-[10px] font-semibold text-[#0e6bfd] bg-[#eef5ff] px-1.5 py-0.5 rounded tabular-nums">
                      {s.num}
                    </span>
                    <span className="font-medium text-[#132938] truncate">{s.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#556d7d] shrink-0 hidden sm:inline">
                    {s.tag}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/signup"
              className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] text-xs font-medium text-white transition-colors"
            >
              <span>Launch 4-step workspace onboarding</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Bento Card 3 (Span 3): Private Cloudflare R2 Vault */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.04 }}
            className="lg:col-span-3 rounded-2xl bg-white border border-[#e2e9ef] p-5 flex flex-col justify-between gap-4 hover:border-[#0e6bfd]/35 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0e6bfd]">
                <HardDrive className="size-5 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#132938]">Cloudflare R2 Vault</h3>
              <p className="text-xs text-[#556d7d] leading-relaxed">
                Store trade licenses, tax registrations, tech packs, and operational evidence in
                tenant-isolated R2 buckets.
              </p>
            </div>
            <div className="rounded-lg bg-[#f4f7fa] border border-[#e2e9ef] px-2.5 py-2 font-mono text-[10px] text-[#132938] truncate">
              tenants/&#123;slug&#125;/vault/
            </div>
          </motion.div>

          {/* Bento Card 4 (Span 3): 12-Module Role ACL Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-3 rounded-2xl bg-white border border-[#e2e9ef] p-5 flex flex-col justify-between gap-4 hover:border-[#0e6bfd]/35 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0e6bfd]">
                <Sliders className="size-5 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#132938]">12-Module Role Matrix</h3>
              <p className="text-xs text-[#556d7d] leading-relaxed">
                7 role presets (Sales, Accountant, Merchandiser, Supervisor, QC) with granular
                module access controls.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]">
              <span className="rounded bg-[#e4f3ea] text-[#16a34a] px-2 py-0.5">CRM: Write</span>
              <span className="rounded bg-[#eef5ff] text-[#0e6bfd] px-2 py-0.5">Books: Read</span>
            </div>
          </motion.div>

          {/* Bento Card 5 (Span 3): Two-Step 2FA Security */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="lg:col-span-3 rounded-2xl bg-white border border-[#e2e9ef] p-5 flex flex-col justify-between gap-4 hover:border-[#0e6bfd]/35 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0e6bfd]">
                <Lock className="size-5 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#132938]">2FA &amp; Tenant Isolation</h3>
              <p className="text-xs text-[#556d7d] leading-relaxed">
                RFC 6238 Authenticator TOTP, Gmail OTP, single-use recovery codes, and strict
                subdomain tenant isolation.
              </p>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#0e2230] px-3 py-1.5 font-mono text-xs text-white tracking-widest tabular-nums">
              <span>842 916</span>
              <ShieldCheck className="size-3.5 text-[#4cc38a]" />
            </div>
          </motion.div>

          {/* Bento Card 6 (Span 3): Client Mobile App + Storefront */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="lg:col-span-3 rounded-2xl bg-white border border-[#e2e9ef] p-5 flex flex-col justify-between gap-4 hover:border-[#0e6bfd]/35 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0e6bfd]">
                <Smartphone className="size-5 stroke-[1.5]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#132938]">Client Portal &amp; Site</h3>
              <p className="text-xs text-[#556d7d] leading-relaxed">
                Public custom-domain website plus dedicated client mobile app for quote approvals
                and live order milestones.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#16a34a]">
              <CheckCircle2 className="size-3.5" />
              <span>Included on all plans</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Compact Capabilities Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e2e9ef] bg-white px-5 py-4 text-xs text-[#556d7d]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[#132938] font-medium">
              <Globe className="size-3.5 text-[#0e6bfd]" />
              12 Storefront Themes
            </span>
            <span>Zero add-on module fees</span>
            <span>Month-to-month or annual</span>
            <span>Cancel any time in Paddle Portal</span>
          </div>
          <Link
            href="/login"
            className="font-medium text-[#0e6bfd] hover:underline shrink-0"
          >
            Already have a workspace? Log in →
          </Link>
        </div>
      </div>
    </section>
  );
}
