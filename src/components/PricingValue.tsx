"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  PhoneOff,
  CalendarCheck,
  FileSpreadsheet,
  Globe,
  Smartphone,
  Languages,
  Zap,
} from "lucide-react";

interface ValuePoint {
  title: string;
  description: string;
  iconSrc?: string;
  lucideIcon?: typeof Sparkles;
}

const valuePoints: ValuePoint[] = [
  {
    title: "14-day free trial",
    description: "Every plan starts with one. You test with real floor supervisors, line operators, and QC staff on one live batch before paying.",
    iconSrc: "/assets/14-day-free-trial.svg",
  },
  {
    title: "No sales call required",
    description: "Sign up online and configure your factory departments yourself. Or book our production engineers for white-glove setup.",
    lucideIcon: PhoneOff,
  },
  {
    title: "No setup fees",
    description: "You pay your straightforward monthly subscription, and absolutely nothing to get started.",
    lucideIcon: CreditCard,
  },
  {
    title: "No long-term contract",
    description: "Month-to-month by default. You can change plans or cancel before your next renewal date with zero penalties.",
    iconSrc: "/assets/cancel-any-time.svg",
  },
  {
    title: "Cancel any time",
    description: "When you leave, your data exports in clean CSV files and signed photo archives. We never hold your records hostage.",
    lucideIcon: CalendarCheck,
  },
  {
    title: "No add-on modules",
    description: "Every tool in our 17-tool platform is included in your subscription. Zero surprise micro-charges.",
    lucideIcon: Zap,
  },
  {
    title: "Live within 72 hours",
    description: "Self-serve guided onboarding gets your prep workstations, assembly lines, and QC inspectors running fast.",
    iconSrc: "/assets/day-one-ready.svg",
  },
  {
    title: "Subdomain isolation",
    description: "Each factory operates on its own dedicated subdomain (e.g. yourfactory.veave.pk) with total tenant isolation.",
    iconSrc: "/assets/day-one-website.svg",
  },
  {
    title: "Run it from mobile phones",
    description: "Fully responsive mobile web experience optimized for supervisors walking the floor and capturing camera proof.",
    lucideIcon: Smartphone,
  },
  {
    title: "Multi-language interface",
    description: "Independent language toggle for staff (English, Urdu, Spanish, Bengali) so operators work comfortably.",
    lucideIcon: Languages,
  },
  {
    title: "Bring your active orders",
    description: "Bulk CSV upload or direct specification import gets your existing production queue running immediately.",
    iconSrc: "/assets/bring-your-inventory.svg",
  },
  {
    title: "Engineered for real factories",
    description: "Engineered specifically for manufacturing plants, assembly floors, and production workshops, not generic project software.",
    iconSrc: "/assets/focused-on-dealers.svg",
  },
];

export default function PricingValue() {
  return (
    <section id="value" className="px-4 sm:px-6 py-16 lg:py-24 bg-white border-t border-[#e3eaef]">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-12 lg:gap-16">
        
        {/* Section Header */}
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
              PLATFORM PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#16303f] leading-[1.15]">
              Enterprise-class software, priced for independent dealers.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-[#587080] leading-relaxed"
          >
            A single monthly price per factory, with all seventeen tools, unlimited supervisor seats, and no surprise add-on fees.
          </motion.p>
        </div>

        {/* 12 Value Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {valuePoints.map((point, idx) => {
            const LucideIcon = point.lucideIcon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.08 }}
                className="group flex flex-col items-start justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#122a38] shadow-sm hover:border-white/20 transition-all duration-200"
              >
                <div className="space-y-3.5 w-full">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white p-2 shadow-xs shrink-0 border border-white/20">
                    {point.iconSrc ? (
                      <Image
                        src={point.iconSrc}
                        alt={point.title}
                        width={28}
                        height={28}
                        className="size-6 object-contain"
                      />
                    ) : LucideIcon ? (
                      <LucideIcon className="size-5 text-[#0e6bfd]" />
                    ) : (
                      <CheckCircle2 className="size-5 text-[#0e6bfd]" />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-[15px] font-bold text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                      {point.title}
                    </h3>
                    <p className="text-xs text-[#c6d6e1] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="rounded-2xl border border-[#e3eaef] bg-[#f8fafc] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0e6bfd]/10 text-[#0e6bfd]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#16303f] block">
                Transparent factory plans starting at $149/mo
              </span>
              <span className="text-xs text-[#587080]">
                Everything included: order intake, mobile queues, photo evidence, floor plans &amp; QC.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 rounded-[7px] border border-[#dbe4ea] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#16303f] hover:bg-[#eef2f5] hover:border-[#cbd5e1] transition-all shadow-xs"
            >
              <span>See every plan and price</span>
              <ArrowRight className="size-3.5 text-[#0e6bfd]" />
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#0e6bfd] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
            >
              <span>Start 14-day free trial</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
