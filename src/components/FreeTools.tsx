"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scissors,
  Gauge,
  ShieldCheck,
  Sliders,
  Ruler,
  Calculator,
  ArrowRight,
} from "lucide-react";
import { FREE_TOOLS } from "@/data/veaveData";

const toolIcons = [Scissors, Gauge, ShieldCheck, Sliders, Ruler, Calculator];

export default function FreeTools() {
  return (
    <section id="free-tools" className="px-4 sm:px-6 py-14 sm:py-16 bg-[#f3f6f8] border-t border-[#e3eaef]">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex max-w-2xl flex-col gap-2.5"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
            FREE TOOLS
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#16303f]">
            Try a tool before you sign up.
          </h2>
          <p className="text-sm sm:text-base text-[#587080]">
            Each one is free and opens without a login. Test our industrial engineering and production calculations on real batches.
          </p>
        </motion.div>

        {/* Free Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 border-t border-[#e3eaef] pt-8">
          {FREE_TOOLS.map((tool, idx) => {
            const IconComp = toolIcons[idx % toolIcons.length];
            return (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group relative flex flex-col justify-between rounded-xl border border-[#e3eaef] bg-white p-5 hover:border-[#0e6bfd]/40 hover:bg-[#f8fafc] hover:shadow-xs transition-all duration-200 h-full"
                >
                  <div className="space-y-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#eef2f5] text-[#0e6bfd] group-hover:bg-[#0e6bfd] group-hover:text-white transition-colors">
                      <IconComp className="size-5" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0e6bfd]">
                        {tool.category}
                      </span>
                      <h3 className="text-sm sm:text-[15px] font-bold text-[#16303f] group-hover:text-[#0e6bfd] transition-colors leading-snug">
                        {tool.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#587080] leading-relaxed line-clamp-2">
                      {tool.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e3eaef] flex items-center justify-between text-xs font-semibold text-[#0e6bfd]">
                    <span>Open calculator</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Hub Link */}
        <div className="flex justify-center pt-2">
          <Link
            href="/tools"
            className="text-xs font-semibold text-[#587080] hover:text-[#0e6bfd] transition-colors inline-flex items-center gap-1"
          >
            <span>View all production engineering utilities</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
