"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Lock } from "lucide-react";

const SAMPLE_WORKSPACES = [
  "atlas-apparel.veave.systemic.pk",
  "meridian-studio.veave.systemic.pk",
  "nordic-craft.veave.systemic.pk",
  "crescent-textiles.veave.systemic.pk",
];

export default function FinalCta() {
  const [hostIdx, setHostIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHostIdx((prev) => (prev + 1) % SAMPLE_WORKSPACES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#0e2230] text-white py-20 sm:py-24 border-t border-white/[0.08] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-1/4 right-1/4 h-px edge-highlight" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        {/* Animated Subdomain Preview Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-[#091823] px-4 py-2 font-mono text-xs text-[#c6d6e1] shadow-md"
        >
          <Lock className="size-3.5 text-[#4cc38a] shrink-0" />
          <span className="text-[#8ba5b8]">https://</span>
          <div className="relative h-5 flex items-center overflow-hidden min-w-[245px] text-left">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={SAMPLE_WORKSPACES[hostIdx]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="block leading-none text-white"
              >
                {SAMPLE_WORKSPACES[hostIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <Globe className="size-3.5 text-[#9cc4ff] shrink-0 hidden sm:block" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-[-0.025em] text-white leading-[1.1] max-w-2xl"
        >
          Launch your isolated business workspace today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-[15px] sm:text-base text-[#c6d6e1] max-w-xl leading-relaxed"
        >
          Claim your subdomain, enter your business profile and compliance documents, and activate
          your 14-day trial on Base, Professional, or Enterprise via Paddle Billing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
        >
          <Link
            href="/signup"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] text-white font-medium text-sm px-6 shadow-[0_12px_28px_-6px_rgba(14,107,253,0.55)] transition-all active:scale-[0.98]"
          >
            <span>Start 14-day free trial</span>
            <ArrowRight className="size-4 stroke-[1.5] transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.16] bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-sm px-6 transition-colors"
          >
            <span>Log in to workspace</span>
          </Link>
        </motion.div>

        <div className="font-mono text-xs text-[#8ba5b8] tabular-nums pt-1">
          $0.00 charged today · Automatic plan activation after 14-day trial · Cancel any time
        </div>
      </div>
    </section>
  );
}
