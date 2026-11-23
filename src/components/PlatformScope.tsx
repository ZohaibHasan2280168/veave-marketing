"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PLATFORM_PILLARS } from "@/data/veaveData";

export default function PlatformScope() {
  return (
    <section id="platform" className="px-4 sm:px-6 py-16 lg:py-24 bg-white border-t border-[#e3eaef]">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-16 lg:gap-20">
        
        {/* Top Header Section */}
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
              EVERYTHING IN ONE PLACE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#16303f] leading-[1.15]">
              Run your factory&apos;s day-to-day production from one system.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-[#587080] leading-relaxed"
          >
            Seventeen tools, from initial order specifications to the final shipping manifest. They all read the same product, department, and QC records, so you enter an order once and material prep, assembly lines, QC, and client billing all work from that record.
          </motion.p>
        </div>

        {/* The 3 Major Pillars */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {PLATFORM_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="border-t border-[#e3eaef] pt-10 sm:pt-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Pillar Left Intro (Sticky on desktop) */}
                <div className="lg:col-span-4 flex flex-col gap-3 lg:sticky lg:top-24">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-md bg-[#eef2f5] text-xs font-bold text-[#0e6bfd]">
                      {pillar.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#587080]">
                      Pillar {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#587080] leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="pt-2 text-xs font-semibold text-[#0e6bfd]">
                    {pillar.tools.length} integrated factory modules
                  </div>
                </div>

                {/* Pillar Right Tools Grid */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pillar.tools.map((tool) => (
                      <div
                        key={tool.title}
                        className="flex flex-col justify-between rounded-xl bg-[#122a38] border border-white/10 p-5 shadow-sm"
                      >
                        <div className="space-y-3">
                          <div className="flex size-12 sm:size-13 items-center justify-center rounded-xl bg-white p-2 shadow-xs">
                            <Image
                              src={tool.icon}
                              alt={tool.title}
                              width={40}
                              height={40}
                              className="size-8 sm:size-9 object-contain"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] block mb-1">
                              {tool.targetRole}
                            </span>
                            <h4 className="text-[15px] font-bold text-white">
                              {tool.title}
                            </h4>
                          </div>

                          <p className="text-xs sm:text-[13px] text-[#c6d6e1] leading-relaxed">
                            {tool.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#e3eaef] bg-[#f8fafc] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0e6bfd]/10 text-[#0e6bfd]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#16303f]">
                All 17 factory and production tools included standard in one monthly subscription
              </div>
              <div className="text-xs text-[#587080]">
                No costly add-on modules, no hidden integration charges, and unlimited supervisor mobile seats.
              </div>
            </div>
          </div>

          <Link
            href="/signup"
            className="shrink-0 inline-flex items-center gap-2 rounded-[7px] bg-[#0e6bfd] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
          >
            <span>Start 14-day free trial</span>
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
