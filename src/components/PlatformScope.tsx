"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Link2,
  Calculator,
  Star,
  Filter,
  Users,
  Briefcase,
  Calendar,
  ClipboardList,
  LayoutGrid,
  CheckSquare,
  ShieldCheck,
  DollarSign,
  Sliders,
  MessageSquare,
  HardDrive,
  Smartphone,
  Lock,
} from "lucide-react";
import { PLATFORM_PILLARS } from "@/data/veaveData";
import PillarVisualCard from "@/components/visuals/PillarVisuals";

const ICON_MAP: Record<string, typeof Globe> = {
  Globe,
  Link2,
  Calculator,
  Star,
  Filter,
  Users,
  Briefcase,
  Calendar,
  ClipboardList,
  LayoutGrid,
  CheckSquare,
  ShieldCheck,
  DollarSign,
  Sliders,
  MessageSquare,
  HardDrive,
  Smartphone,
  Lock,
};

export default function PlatformScope() {
  return (
    <section id="platform" className="px-4 sm:px-6 py-16 lg:py-24 bg-white border-b border-[#e2e9ef]">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-16">
        {/* Top Header Section */}
        <div className="grid items-end gap-x-12 gap-y-4 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col gap-2"
          >
            <span className="font-mono text-xs text-[#0e6bfd]">Complete business platform</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#132938] leading-[1.13]">
              Run your commercial, operational and financial work from one workspace
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-5 text-[15px] text-[#556d7d] leading-relaxed"
          >
            Eighteen connected modules across your public website, buyer CRM, Google Meet calendar,
            order pipeline, team permissions, private Cloudflare R2 vault, and Paddle subscription
            billing.
          </motion.p>
        </div>

        {/* 3 Major Pillars with Visual Bento Anchors */}
        <div className="flex flex-col gap-16">
          {PLATFORM_PILLARS.map((pillar) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="border-t border-[#e2e9ef] pt-10 sm:pt-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Sticky Pillar Intro + Live Visual Card */}
                <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#556d7d]">
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#eef5ff] border border-[#bfdbfe] text-[#0e6bfd] font-semibold tabular-nums">
                      {pillar.number}
                    </span>
                    <span>Pillar {pillar.number}</span>
                    <span className="text-[#cbd5e1]">·</span>
                    <span className="text-[#0e6bfd] tabular-nums">
                      {pillar.tools.length} modules
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.015em] text-[#132938]">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#556d7d] leading-relaxed">{pillar.description}</p>

                  {/* Signature Dark Interactive Visual Preview */}
                  <div className="pt-1">
                    <PillarVisualCard pillarNumber={pillar.number} />
                  </div>
                </div>

                {/* Pillar Right Tools Grid */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pillar.tools.map((tool, toolIdx) => {
                      const Icon = ICON_MAP[tool.iconName] || Globe;
                      return (
                        <motion.div
                          key={tool.slug}
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.4, delay: (toolIdx % 2) * 0.06 }}
                        >
                          <Link
                            href={`/features/${tool.slug}`}
                            className="group h-full flex flex-col justify-between rounded-xl bg-white hover:bg-[#f8fafc] border border-[#e2e9ef] hover:border-[#0e6bfd]/40 p-5 shadow-[0_2px_8px_rgba(19,41,56,0.03)] hover:shadow-[0_14px_30px_-10px_rgba(14,107,253,0.16)] hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-[#f4f7fa] group-hover:bg-[#0e6bfd] border border-[#e2e9ef] group-hover:border-[#0e6bfd] text-[#132938] group-hover:text-white transition-colors duration-200">
                                  <Icon className="size-[18px] stroke-[1.5]" />
                                </div>
                                <span className="rounded-md bg-[#f4f7fa] px-2 py-0.5 font-mono text-[10px] text-[#556d7d]">
                                  {tool.targetRole}
                                </span>
                              </div>

                              <h4 className="text-[15px] font-semibold text-[#132938] group-hover:text-[#0e6bfd] transition-colors">
                                {tool.title}
                              </h4>

                              <p className="text-xs text-[#556d7d] leading-relaxed">{tool.desc}</p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#edf2f7] flex items-center justify-between text-xs font-medium text-[#132938] group-hover:text-[#0e6bfd]">
                              <span>Inspect module</span>
                              <ArrowRight className="size-3.5 stroke-[1.5] transition-transform group-hover:translate-x-1" />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Architectural Reassurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative rounded-2xl border border-white/[0.1] bg-[#0e2230] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden shadow-lg"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" aria-hidden="true" />
          <div className="relative z-10">
            <div className="text-base font-semibold text-white">
              All 18 modules are included in one multi-tenant workspace
            </div>
            <div className="text-xs sm:text-sm text-[#c6d6e1] mt-1">
              Assign 7 role presets or customize access across the 12-module permission matrix with
              zero per-module add-on fees.
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/features"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.16] bg-white/[0.06] hover:bg-white/[0.12] px-4 text-xs font-medium text-white transition-colors"
            >
              <span>Explore all modules</span>
            </Link>
            <Link
              href="/signup"
              className="group inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-5 text-xs font-medium text-white shadow-md shadow-[#0e6bfd]/30 transition-all"
            >
              <span>Start 14-day free trial</span>
              <ArrowRight className="size-3.5 stroke-[1.5] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
