"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNum: string;
  stepIndex: number;
  title: string;
  tagline: string;
  headerTag: string;
  badgeLabel: string;
  activeHeadline: string;
  description: string;
  screenshot: string;
  alt: string;
}

const steps: WorkflowStep[] = [
  {
    id: "intake",
    stepNum: "1",
    stepIndex: 1,
    title: "Order Intake",
    tagline: "Capture order & item specs",
    headerTag: "01. Order Intake",
    badgeLabel: "Step 1 of 6",
    activeHeadline: "Capture requirements instantly",
    description:
      "Integrate digital purchase orders and product specifications immediately into live production schedules. Track materials, parts, and customer approvals in one centralized view.",
    screenshot: "/assets/veave/workflows/dashboard-orderintake.jpg",
    alt: "Veave Order Intake Dashboard",
  },
  {
    id: "cutting",
    stepNum: "2",
    stepIndex: 2,
    title: "Design & Prep",
    tagline: "Precision planning & setup",
    headerTag: "02. Design & Prep",
    badgeLabel: "Step 2 of 6",
    activeHeadline: "Automate specifications & staging yields",
    description:
      "Convert digital CAD designs, technical blueprints, and specifications directly into production staging. Maximize material yield and upload photographic proof of staged components.",
    screenshot: "/assets/veave/dept_head/operations_checkpoints.png",
    alt: "Veave Design & Engineering Department Operations",
  },
  {
    id: "stitching",
    stepNum: "3",
    stepIndex: 3,
    title: "Assembly & Production",
    tagline: "Live throughput monitoring",
    headerTag: "03. Assembly & Production",
    badgeLabel: "Step 3 of 6",
    activeHeadline: "Track assembly line throughput in real time",
    description:
      "Supervisors monitor line balancing cycle times, unit throughput, and operator station progression with instant bottleneck detection across all active lines.",
    screenshot: "/assets/veave/dept_head/dept_head_dashboard.png",
    alt: "Veave Production Assembly Dashboard",
  },
  {
    id: "qc",
    stepNum: "4",
    stepIndex: 4,
    title: "Quality Control",
    tagline: "Guarantee 100% pass",
    headerTag: "04. Quality Control",
    badgeLabel: "Step 4 of 6",
    activeHeadline: "Strict quality inspection & defect tagging",
    description:
      "Inspectors audit tolerances, dimensions, and build symmetry. Log pass/fail criteria and attach high-res defect notes before batches advance.",
    screenshot: "/assets/veave/qc/qc_dashboard.png",
    alt: "Veave Quality Control Inspection Suite",
  },
  {
    id: "packaging",
    stepNum: "5",
    stepIndex: 5,
    title: "Finishing & Packaging",
    tagline: "Custom tags & bundling",
    headerTag: "05. Finishing & Packaging",
    badgeLabel: "Step 5 of 6",
    activeHeadline: "Industrial finishing, labeling & packaging",
    description:
      "Products undergo final surface finishing, safety inspections, custom branded labeling, barcode scanning, and protective batch bundling.",
    screenshot: "/assets/veave/admin/order_details.png",
    alt: "Veave Finishing & Packaging Ledger",
  },
  {
    id: "dispatch",
    stepNum: "6",
    stepIndex: 6,
    title: "Dispatch & Delivery",
    tagline: "Fleet tracking & delivery",
    headerTag: "06. Dispatch & Delivery",
    badgeLabel: "Step 6 of 6",
    activeHeadline: "Generate shipping manifests & tracking",
    description:
      "Create regulatory-compliant shipping manifests, carton barcode labels, and automated dispatch tracking notifications for global retail and B2B buyers.",
    screenshot: "/assets/veave/admin/admin_dashboard.png",
    alt: "Veave Global Dispatch & Shipment Command",
  },
];

const AUTOPLAY_INTERVAL = 4800; // 4.8 seconds per step (4-5 sec duration to comfortably read)

export default function UnifiedWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const activeStep = steps[activeStepIndex];

  // Auto-advance callback
  const handleNextStep = useCallback(() => {
    setActiveStepIndex((prev) => (prev + 1) % steps.length);
  }, []);

  // Auto-rotate left to right every ~4.8 seconds unless paused by user interaction
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNextStep();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, handleNextStep, activeStepIndex]);

  return (
    <section
      id="workflow"
      className="bg-gradient-to-tr from-slate-50 via-white to-slate-50 border-y border-slate-100/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-8">
        
        {/* Part 1: The Header & Value Proposition */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-5 sm:mb-5">
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-1">
              THE PRODUCTION PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-slate-900 leading-tight tracking-tight">
              One unified workflow, from order to dispatch.
            </h2>
          </div>

          {/* Right Column */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed lg:max-w-sm">
            Streamline your entire production lifecycle. Each step carries exact data forward
            seamlessly, so you&apos;re always tracking live progress.
          </p>
        </div>

        {/* Part 2: The Horizontal Process Timeline (6-Steps with Left-to-Right Animation) */}
        <div 
          className="relative mb-5 sm:mb-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Base Continuous Connector Track Line */}
          <div
            className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-slate-200 z-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Animated Active Connector Line (Progresses Left to Right) */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] z-0 pointer-events-none">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              initial={false}
              animate={{
                width: `${(activeStepIndex / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* 6 Steps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-2.5 relative z-10">
            {steps.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setActiveStepIndex(index);
                  }}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-hidden"
                >
                  {/* Icon Card - Compact with animated shift & lift */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      y: isActive ? -3 : 0,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-xl sm:rounded-2xl flex items-center justify-center relative transition-colors duration-200 ${
                      isActive
                        ? "bg-white border-2 border-blue-600 shadow-[0_12px_28px_rgba(14,107,253,0.22)] ring-4 ring-blue-500/15"
                        : "bg-white border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    {/* Animated Step Highlight Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineGlow"
                        className="absolute -inset-1 rounded-2xl bg-blue-500/20 -z-10 blur-[2px]"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}

                    {/* Step SVG Icon */}
                    {step.id === "intake" && (
                      <svg
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/80 group-hover:text-blue-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                        <path d="M9 12h6" />
                        <path d="M9 16h6" />
                        <path d="M9 8h6" />
                      </svg>
                    )}

                    {step.id === "cutting" && (
                      <svg
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/80 group-hover:text-blue-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="13" height="15" rx="1.5" strokeDasharray="2.5 2.5" />
                        <circle cx="15.5" cy="18.5" r="2.5" />
                        <circle cx="19.5" cy="14.5" r="2.5" />
                        <path d="M14 16.5l4-5" />
                        <path d="M17.5 13l-5.5-5.5" />
                      </svg>
                    )}

                    {step.id === "stitching" && (
                      <svg
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/80 group-hover:text-blue-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 19h18" strokeWidth="2" />
                        <path d="M5 19V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12" />
                        <path d="M19 11h-7a2 2 0 0 0-2 2v2" />
                        <path d="M10 16v3" />
                        <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                      </svg>
                    )}

                    {step.id === "qc" && (
                      <svg
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/80 group-hover:text-blue-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 3a2 2 0 0 1-4 0H5l-3 4 3 2v10a1 1 0 0 0 1 1h7" />
                        <path d="M19 7l3-4h-5" />
                        <circle cx="16" cy="15" r="4.5" strokeWidth="2" />
                        <path d="M19.5 18.5l3 3" strokeWidth="2" />
                        <path d="M14.5 15l1 1 2-2" strokeWidth="1.75" />
                      </svg>
                    )}

                    {step.id === "packaging" && (
                      <svg
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/80 group-hover:text-blue-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                        <path d="m8 5 8 4" strokeWidth="1.5" />
                      </svg>
                    )}

                    {step.id === "dispatch" && (
                      <svg
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors ${
                          isActive ? "text-blue-600" : "text-blue-500/80 group-hover:text-blue-600"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 17h4V5H2v12h3" />
                        <path d="M20 17h2v-3.34a2 2 0 0 0-.59-1.42L18.4 9.24A2 2 0 0 0 17 8.66H14V17h1" />
                        <circle cx="7.5" cy="17.5" r="2.5" />
                        <circle cx="17.5" cy="17.5" r="2.5" />
                        <path d="M14 9h3.5l2.5 3H14" />
                      </svg>
                    )}

                    {/* Circular Blue Badge (1 to 6) */}
                    <span className="absolute -top-1.5 -right-1.5 size-5 sm:size-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white shadow-sm">
                      {step.stepNum}
                    </span>
                  </motion.div>

                  {/* Step Titles */}
                  <span
                    className={`text-xs sm:text-[13px] font-bold mt-1.5 text-center leading-tight transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-900 group-hover:text-blue-600"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-500 max-w-[110px] text-center mt-0.5 leading-tight">
                    {step.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Part 3: The Detailed Active Workflow Box (Hero Dark Navy Theme with White Dashboard Pic) */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-2xl sm:rounded-3xl bg-[#122a38] border border-white/10 shadow-[0_20px_50px_rgba(18,42,56,0.32)] p-4 sm:p-5 lg:p-6 overflow-hidden"
        >
          {/* Subtle Ambient Radial Glows (matching Hero section theme) */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#0e6bfd]/20 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 w-80 h-80 rounded-full bg-[#0e6bfd]/15 blur-[90px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
            
            {/* Left Column (Grid Span 5): Blue Theme Content */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col items-start"
                >
                  {/* Flex-row Header Tag */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {activeStep.headerTag}
                    </span>
                    <span className="bg-white/10 text-slate-300 border border-white/15 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                      {activeStep.badgeLabel}
                    </span>
                  </div>

                  {/* Substantial Heading */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 sm:mt-2.5 leading-snug tracking-tight">
                    {activeStep.activeHeadline}
                  </h3>

                  {/* Descriptive Paragraph */}
                  <p className="text-[#c6d6e1] text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed">
                    {activeStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0e6bfd] hover:bg-blue-600 text-white font-semibold text-xs px-4 py-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Next Workflow Step</span>
                  <ArrowRight className="size-3.5" />
                </button>
                <Link
                  href={`/workflows/${activeStep.id === "intake" ? "order-intake" : activeStep.id === "cutting" ? "cutting-prep" : activeStep.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 hover:border-white/35 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs px-3.5 py-2 transition-colors"
                >
                  <span>Inspect Full Stage Details</span>
                </Link>
              </div>
            </div>

            {/* Right Column (Grid Span 7): White-Themed Dashboard Picture */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.35)] overflow-hidden bg-white p-1 sm:p-1.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative w-full aspect-[16/10] max-h-[340px] rounded-lg overflow-hidden bg-white"
                  >
                    <Image
                      src={activeStep.screenshot}
                      alt={activeStep.alt}
                      fill
                      className="object-cover object-top"
                      priority
                      style={{
                        imageRendering: "-webkit-optimize-contrast",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
