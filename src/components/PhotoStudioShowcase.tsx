"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  RotateCw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  Eye,
  ShieldCheck,
  CheckSquare,
  AlertTriangle,
  ZoomIn,
} from "lucide-react";

interface InspectionAngle {
  id: string;
  angleLabel: string;
  angleDegrees: string;
  title: string;
  desc: string;
  src: string;
  toleranceStatus: "PASS" | "NEEDS RECTIFICATION";
}

const inspectionViews: InspectionAngle[] = [
  {
    id: "queue",
    angleLabel: "QC Queue",
    angleDegrees: "Queue",
    title: "Pending Inspection Queue",
    desc: "Live list of production batches awaiting quality clearance from staging, assembly, and finishing stations.",
    src: "/assets/veave/qc/qc_dashboard.png",
    toleranceStatus: "PASS",
  },
  {
    id: "lightbox",
    angleLabel: "Lightbox",
    angleDegrees: "Inspect",
    title: "Detailed Inspection Lightbox & Defect Annotation",
    desc: "Examine high-resolution surface finishes, verify millimeter build tolerances, and attach defect notes.",
    src: "/assets/veave/qc/qc_inspection_task.png",
    toleranceStatus: "NEEDS RECTIFICATION",
  },
  {
    id: "checkpoints",
    angleLabel: "Checkpoints",
    angleDegrees: "Steps",
    title: "Department Supervisor Checkpoints Queue",
    desc: "Mobile-first operational tasks: department supervisors verify checkpoints and upload photographic proof.",
    src: "/assets/veave/dept_head/operations_checkpoints.png",
    toleranceStatus: "PASS",
  },
  {
    id: "floorplan",
    angleLabel: "Floor Plan",
    angleDegrees: "Lines",
    title: "Interactive Factory Floor Plan & WIP",
    desc: "Bird's-eye view of prep workstations, assembly lines, and finishing stations with live batch progress.",
    src: "/assets/veave/admin/floor_plan.png",
    toleranceStatus: "PASS",
  },
];

export default function PhotoStudioShowcase() {
  const [activeViewIndex, setActiveViewIndex] = useState<number>(0);
  const [isEvidenceMode, setIsEvidenceMode] = useState<boolean>(true);

  const currentView = inspectionViews[activeViewIndex];

  return (
    <section id="studio" className="px-4 sm:px-6 py-16 lg:py-24 bg-[#f3f6f8] border-t border-[#e3eaef]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
          
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
              THE PHOTO STUDIO
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-[#16303f] leading-[1.15]">
              Your inventory. Shown at its best.
            </h2>

            <p className="text-base sm:text-lg text-[#587080] leading-relaxed">
              Guide the audit, create a consistent lightbox standard and bring inspection photos and buyer proofs together on your factory portal.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3 pt-2 w-full text-xs sm:text-sm text-[#16303f]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#257a55] shrink-0" />
                <span>Zero defect escapes: mandatory certified QC inspector verification</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#257a55] shrink-0" />
                <span>Cryptographically signed Cloudinary photo evidence for every operation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#257a55] shrink-0" />
                <span>Defect rectification loop with photo annotations and tolerance callouts</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/roles/qc"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[7px] text-sm font-semibold border border-[#dbe4ea] bg-white text-[#16303f] hover:bg-[#eef2f5] hover:border-[#cbd5e1] h-11 px-5 transition-all shadow-xs active:scale-[0.98]"
              >
                <span>Explore the photo editor</span>
                <ArrowRight className="size-4 text-[#0e6bfd]" />
              </Link>
              <Link
                href="/features/photo-evidence"
                className="text-xs font-semibold text-[#0e6bfd] hover:underline"
              >
                Learn about Signed Photo Proof &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Real QC Workspace Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-2xl border border-[#e3eaef] bg-white p-5 sm:p-6 shadow-sm overflow-hidden">
              
              {/* Studio Toolbar & Mode Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3eaef] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-[#0e6bfd]/10 text-[#0e6bfd]">
                    <ShieldCheck className="size-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#16303f] block leading-tight">
                      Quality Inspection &amp; Evidence Lightbox
                    </span>
                    <span className="text-[11px] text-[#587080]">Real Veave Production System</span>
                  </div>
                </div>

                {/* Mode Toggle */}
                <div className="inline-flex rounded-lg border border-[#e3eaef] bg-[#f8fafc] p-1 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setIsEvidenceMode(false)}
                    className={`rounded-md px-3 py-1 transition-all ${
                      !isEvidenceMode
                        ? "bg-white font-semibold text-[#16303f] shadow-xs"
                        : "text-[#587080] hover:text-[#16303f]"
                    }`}
                  >
                    Original Lot
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEvidenceMode(true)}
                    className={`rounded-md px-3 py-1 transition-all ${
                      isEvidenceMode
                        ? "bg-[#0e6bfd] font-semibold text-white shadow-xs"
                        : "text-[#587080] hover:text-[#16303f]"
                    }`}
                  >
                    AI Studio
                  </button>
                </div>
              </div>

              {/* View Title & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#16303f]">{currentView.title}</h3>
                  <p className="text-xs text-[#587080]">{currentView.desc}</p>
                </div>
                <span
                  className={`self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    currentView.toleranceStatus === "PASS"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      currentView.toleranceStatus === "PASS" ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  {currentView.toleranceStatus}
                </span>
              </div>

              {/* Real UI Screenshot Display */}
              <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden border border-[#e3eaef] bg-slate-900 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentView.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentView.src}
                      alt={currentView.title}
                      fill
                      className="object-contain object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 4 Interactive View Selector Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#e3eaef]">
                {inspectionViews.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveViewIndex(idx)}
                    className={`rounded-lg py-2 px-1 text-center transition-all ${
                      activeViewIndex === idx
                        ? "bg-[#0e6bfd] text-white font-bold shadow-xs"
                        : "bg-[#f3f6f8] text-[#587080] hover:bg-[#eef2f5] hover:text-[#16303f] font-semibold"
                    }`}
                  >
                    <span className="block text-xs leading-tight">
                      {idx === 0 ? "045°" : idx === 1 ? "315°" : idx === 2 ? "225°" : "135°"}
                    </span>
                    <span className="text-[10px] opacity-80 font-normal hidden sm:block mt-0.5">
                      {v.angleLabel}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
