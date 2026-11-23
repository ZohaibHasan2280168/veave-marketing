"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#122a38] text-white py-16 sm:py-20 lg:py-24 border-t border-white/10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-60" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-[#0e6bfd]/15 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9cc4ff] backdrop-blur-md"
        >
          <Sparkles className="size-3.5 text-[#9cc4ff]" />
          <span>EVERY RECORD. A CLEARER NEXT STEP.</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-white leading-[1.15] max-w-2xl"
        >
          Move your factory operations forward.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-base sm:text-lg text-[#c6d6e1] max-w-xl leading-relaxed"
        >
          A connected system for the work that matters every day. Run your inventory, website, CRM, deals, payments and books from one platform.
        </motion.p>

        {/* Dual Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
        >
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#0e6bfd] hover:bg-[#0b5ad9] text-white font-semibold text-base px-7 py-3.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all active:scale-[0.98]"
          >
            <span>Start free trial</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-white/20 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-base px-6 py-3.5 backdrop-blur-md transition-all active:scale-[0.98]"
          >
            <span>Schedule demo</span>
          </Link>
        </motion.div>

        {/* Reassurance Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex items-center gap-2 text-xs text-[#8fa9bb] pt-2"
        >
          <CheckCircle2 className="size-4 text-[#5fb58a]" />
          <span>14-day production trial. Dedicated subdomain. No setup fees.</span>
        </motion.div>

      </div>
    </section>
  );
}
