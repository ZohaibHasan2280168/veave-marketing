"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Briefcase,
  LayoutGrid,
  DollarSign,
  Check,
  Pause,
  Play,
} from "lucide-react";
import { WORKFLOW_STAGES } from "@/data/veaveData";
import WorkflowStageVisual from "@/components/visuals/WorkflowVisuals";

const STAGE_ICONS = [Globe, Briefcase, LayoutGrid, DollarSign];
const AUTOPLAY_MS = 5400;

export default function UnifiedWorkflow() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const activeStage = WORKFLOW_STAGES[activeIndex] || WORKFLOW_STAGES[0];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % WORKFLOW_STAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, activeIndex]);

  const progressPct =
    WORKFLOW_STAGES.length > 1 ? (activeIndex / (WORKFLOW_STAGES.length - 1)) * 100 : 0;

  return (
    <section
      id="workflow"
      className="relative bg-[#f4f7fa] border-b border-[#e2e9ef] py-16 lg:py-24 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="font-mono text-xs text-[#0e6bfd] mb-2">
              End-to-end business lifecycle
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#132938] leading-[1.12]">
              One record follows every customer from inquiry to payment
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3"
          >
            <p className="text-[15px] text-[#556d7d] leading-relaxed">
              Your storefront website, buyer CRM, Google Meet calendar, order pipeline, and financial
              records share one database. Enter a lead or quote once and every downstream workspace
              updates automatically.
            </p>
          </motion.div>
        </div>

        {/* Restored Animated Horizontal Process Timeline */}
        <div
          className="relative mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Base Continuous Connector Track Line */}
          <div
            className="hidden lg:block absolute top-[30px] left-[12%] right-[12%] h-[2px] bg-[#d5dfe7] z-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Animated Active Connector Beam (Progresses Left to Right) */}
          <div className="hidden lg:block absolute top-[30px] left-[12%] right-[12%] h-[2px] z-0 pointer-events-none">
            <motion.div
              className="h-full bg-[#0e6bfd] rounded-full shadow-[0_0_12px_rgba(14,107,253,0.45)]"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* 4 Interactive Stage Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const Icon = STAGE_ICONS[idx % STAGE_ICONS.length];
              const isSelected = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={stage.slug}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="group flex flex-col items-start lg:items-center text-left lg:text-center cursor-pointer focus:outline-hidden"
                >
                  {/* Animated Icon Tile */}
                  <motion.div
                    animate={{
                      y: isSelected ? -4 : 0,
                      scale: isSelected ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className={`relative flex size-[60px] items-center justify-center rounded-2xl border transition-colors ${
                      isSelected
                        ? "bg-[#0e2230] border-[#0e6bfd] text-white shadow-[0_14px_28px_-6px_rgba(14,107,253,0.38)]"
                        : isPassed
                          ? "bg-white border-[#0e6bfd]/40 text-[#0e6bfd] shadow-xs"
                          : "bg-white border-[#d5dfe7] text-[#556d7d] group-hover:border-[#0e6bfd]/50 group-hover:text-[#0e6bfd]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="workflowNodeRing"
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="absolute -inset-1.5 rounded-[20px] border-2 border-[#0e6bfd]/30 pointer-events-none"
                      />
                    )}
                    <Icon className="size-6 stroke-[1.5]" />
                    <span
                      className={`absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full font-mono text-[10px] font-semibold ring-2 ring-[#f4f7fa] tabular-nums ${
                        isSelected || isPassed
                          ? "bg-[#0e6bfd] text-white"
                          : "bg-[#132938] text-white"
                      }`}
                    >
                      {stage.stepNumber}
                    </span>
                  </motion.div>

                  <div className="mt-3.5 max-w-[230px]">
                    <div
                      className={`text-sm font-semibold leading-snug transition-colors ${
                        isSelected ? "text-[#0e6bfd]" : "text-[#132938] group-hover:text-[#0e6bfd]"
                      }`}
                    >
                      {stage.title}
                    </div>
                    <div className="text-xs text-[#556d7d] mt-1 leading-relaxed">
                      {stage.shortDesc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dark Architectural Active Stage Showcase Box (Restored high-contrast rhythm) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-2xl sm:rounded-3xl bg-[#0e2230] border border-white/[0.12] p-6 sm:p-8 lg:p-10 shadow-[0_28px_64px_-16px_rgba(9,24,35,0.45)] overflow-hidden"
        >
          {/* Crisp Top Edge Highlight + Blueprint Texture */}
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-45" aria-hidden="true" />
          <div className="pointer-events-none absolute top-0 left-12 right-12 h-px edge-highlight" aria-hidden="true" />

          {/* Subtle Autoplay Status Bar */}
          <div className="relative z-10 flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5 font-mono text-xs text-[#c6d6e1]">
              <span className="rounded bg-[#0e6bfd] px-2 py-0.5 text-white font-semibold tabular-nums">
                Step {activeStage.stepNumber} / 04
              </span>
              <span>{activeStage.department}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.1] px-2.5 font-mono text-[11px] text-[#c6d6e1] transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="size-3" /> : <Pause className="size-3" />}
                <span>{isPaused ? "Resume tour" : "Auto-playing"}</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-7 items-center gap-1 rounded-md bg-white/[0.08] hover:bg-white/[0.15] px-2.5 font-mono text-[11px] text-white transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="size-3" />
              </button>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Stage Details */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full space-y-4"
                >
                  <h3 className="text-2xl sm:text-[26px] font-semibold tracking-[-0.015em] text-white leading-snug">
                    {activeStage.title}
                  </h3>

                  <p className="text-sm text-[#c6d6e1] leading-relaxed">{activeStage.fullDesc}</p>

                  {/* Capabilities Checklist */}
                  <div className="space-y-2 pt-3 border-t border-white/[0.1]">
                    {activeStage.checkpoints.map((cp) => (
                      <div key={cp} className="flex items-start gap-2.5 text-xs text-[#dbe7f0]">
                        <Check className="size-4 stroke-[1.75] text-[#4cc38a] shrink-0 mt-0.5" />
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.1]">
                    {activeStage.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-sm font-semibold text-white tabular-nums">{m.value}</div>
                        <div className="text-[11px] text-[#8ba5b8]">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-6">
                <Link
                  href={`/workflows/${activeStage.slug}`}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-4 text-xs font-medium text-white shadow-md shadow-[#0e6bfd]/30 transition-all active:scale-[0.98]"
                >
                  <span>Inspect stage details</span>
                  <ArrowRight className="size-3.5 stroke-[1.5]" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.16] bg-white/[0.06] hover:bg-white/[0.12] px-4 text-xs font-medium text-white transition-colors"
                >
                  <span>Start 14-day free trial</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Rich Animated Stage Visual */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.slug}
                  initial={{ opacity: 0, scale: 0.98, x: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: -12 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <WorkflowStageVisual stageSlug={activeStage.slug} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
