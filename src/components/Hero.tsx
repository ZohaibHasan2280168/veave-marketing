"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import HeroWorkspaceStage from "@/components/visuals/HeroWorkspaceStage";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0e2230] text-white border-b border-white/[0.08] py-12 sm:py-16 lg:py-20">
      {/* Architectural Blueprint Grid + Crisp Top Specular Edge */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-75" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px edge-highlight opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#091823]/70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Value Proposition & Conversion Actions */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
            {/* Signature Monospace Tenant Host Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#091823]/90 px-3.5 py-1.5 font-mono text-xs text-[#c6d6e1] mb-6"
            >
              <span className="size-2 rounded-full bg-[#4cc38a]" />
              <span>{`{company}.veave.systemic.pk`}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] text-white leading-[1.09] mb-4"
            >
              Run your storefront, buyer CRM, orders and books from one system
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
              className="text-[15px] sm:text-[16px] text-[#c6d6e1] leading-relaxed mb-7 max-w-lg"
            >
              Publish your public website, capture leads, meet buyers on Google Meet, negotiate
              opportunities, route orders across configurable departments, and manage financial
              records inside your own isolated workspace.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <Link
                href="/signup"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] text-white font-medium text-[14px] px-5 shadow-[0_10px_24px_-6px_rgba(14,107,253,0.55)] transition-all active:scale-[0.98]"
              >
                <span>Start 14-day free trial</span>
                <ArrowRight className="size-4 stroke-[1.5] transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.06] hover:bg-white/[0.11] text-white font-medium text-[14px] px-5 transition-all active:scale-[0.98]"
              >
                <span>Log in to workspace</span>
              </Link>
            </motion.div>

            {/* Trial Terms Reassurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-4 flex items-center gap-2 text-xs text-[#9cb3c3] font-mono tabular-nums"
            >
              <CheckCircle2 className="size-3.5 stroke-[1.5] text-[#4cc38a] shrink-0" />
              <span>14-day trial via Paddle Billing · $0.00 due today · Cancel any time</span>
            </motion.div>

            {/* Concrete System Facts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: EASE_OUT }}
              className="mt-8 pt-6 border-t border-white/[0.1] w-full grid grid-cols-3 gap-4"
            >
              <div>
                <div className="text-base sm:text-lg font-semibold text-white tabular-nums">
                  18 modules
                </div>
                <div className="text-xs text-[#8ba5b8] mt-0.5">CRM, site, orders &amp; ledger</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-semibold text-white tabular-nums">
                  7 role presets
                </div>
                <div className="text-xs text-[#8ba5b8] mt-0.5">12-module ACL matrix</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-semibold text-white tabular-nums">
                  500 GB R2
                </div>
                <div className="text-xs text-[#8ba5b8] mt-0.5">Private document vault</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Layered Workspace Stage */}
          <div className="lg:col-span-7 relative z-10">
            <HeroWorkspaceStage />
          </div>
        </div>
      </div>
    </section>
  );
}
