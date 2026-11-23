"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Bot,
  Scissors,
  Layers,
  Users,
  Grid3X3,
  Sliders,
  Camera,
  Check,
  Cpu,
} from "lucide-react";

interface AiScenario {
  id: string;
  stepNum: string;
  title: string;
  icon: string;
  userPrompt: string;
  aiResponse: string;
  actionSummary: string;
  previewImage?: string;
  batchName?: string;
  needsApproval: boolean;
  approvalType: string;
}

const scenarios: AiScenario[] = [
  {
    id: "yield",
    stepNum: "01 / 08",
    title: "Material Yield",
    icon: "/assets/inventory.svg",
    userPrompt: "Optimize component nesting layout for Order #ORD-2049 across raw sheet inventory.",
    aiResponse:
      "Calculated nested component layout. Optimized component nesting rotation to achieve 92.4% material utilization (saving 31.8 square meters of stock valued at $940).",
    actionSummary: "Staged optimized nesting plot export to fabrication cutter",
    batchName: "Order #ORD-2049 — Custom Engineered Batch (250 Units)",
    previewImage: "/assets/veave/dept_head/operations_checkpoints.png",
    needsApproval: true,
    approvalType: "Approve Nesting Layout & Send to Machine",
  },
  {
    id: "balancing",
    stepNum: "02 / 08",
    title: "Line Balance",
    icon: "/assets/photos-studio-360.svg",
    userPrompt: "Detect assembly line bottlenecks on Line 04 assembling precision units.",
    aiResponse:
      "Identified 4.2-minute cycle delay at Station 06 (Sub-Assembly). Recommends temporarily re-assigning Assistant Operator Ahmed from Line 02 to balance workstation flow.",
    actionSummary: "Line rebalance proposal staged: cycle time drops from 4.2m to 2.1m",
    batchName: "Assembly Line 04 — Station 06 Bottleneck Detection",
    previewImage: "/assets/veave/admin/floor_plan.png",
    needsApproval: true,
    approvalType: "Approve Operator Reallocation",
  },
  {
    id: "qc-escapes",
    stepNum: "03 / 08",
    title: "QC Escapes",
    icon: "/assets/dealership-website.svg",
    userPrompt: "Audit recent defect patterns in the Primary Assembly checkpoint.",
    aiResponse:
      "Flagged 3 consecutive calibration tolerance rejections on Station #14. Recommend alignment tool replacement and torque recalibration before approving next batch.",
    actionSummary: "Preventative maintenance alert dispatched to chief technician",
    batchName: "Assembly Station #14 — Defect Prevention Alert",
    previewImage: "/assets/veave/qc/qc_dashboard.png",
    needsApproval: false,
    approvalType: "Acknowledge Quality Warning",
  },
  {
    id: "milestones",
    stepNum: "04 / 08",
    title: "Client WhatsApp",
    icon: "/assets/customers-leads.svg",
    userPrompt: "Draft milestone update text for client regarding Production Batch #2049.",
    aiResponse:
      "Drafted message: 'Hi Arthur! Your 250-piece production order has successfully passed fabrication and assembly checkpoints with zero defects. Attaching 3 approved QC photos.'",
    actionSummary: "WhatsApp Business Cloud message staged with approved photo proofs",
    batchName: "Client Portal Sync — Enterprise Merchandising",
    needsApproval: true,
    approvalType: "Approve & Dispatch WhatsApp",
  },
  {
    id: "due-dates",
    stepNum: "05 / 08",
    title: "Due Date Risk",
    icon: "/assets/deals-paperwork-esign.svg",
    userPrompt: "Forecast delivery timeline for Order #ORD-1082 based on current capacity.",
    aiResponse:
      "Forecasted on-time completion in 4.5 days. Current line velocity is 12 units/hr, exceeding the required 10 units/hr threshold. Shipping carton readiness confirmed.",
    actionSummary: "Production schedule timeline updated with green on-time indicator",
    batchName: "Order #ORD-1082 — 250 Units Assembly Batch",
    previewImage: "/assets/veave/admin/orders.png",
    needsApproval: false,
    approvalType: "Confirm Timeline Update",
  },
  {
    id: "briefings",
    stepNum: "06 / 08",
    title: "Telegram Brief",
    icon: "/assets/ai-updates-telegram.svg",
    userPrompt: "Prepare morning executive summary for factory owner Tariq Mehmood.",
    aiResponse:
      "Summary ready: 'Yesterday: 420 units completed, 2 defects rectified, 99.4% QC pass rate. Today: Order #ORD-2049 enters main assembly lines. All 6 lines operational.'",
    actionSummary: "Scheduled for 08:00 AM delivery to Tariq's Telegram",
    batchName: "Executive Morning Intelligence Dispatch",
    needsApproval: true,
    approvalType: "Approve Daily Dispatch Schedule",
  },
  {
    id: "shortage",
    stepNum: "07 / 08",
    title: "BOM Shortage",
    icon: "/assets/books-accounting.svg",
    userPrompt: "Verify component inventory for upcoming week's production schedule.",
    aiResponse:
      "Shortage warning: Fastener hardware stock (SKU HW-442) is 340 pieces below required BOM for Order #ORD-301. Supplier lead time is 48 hours.",
    actionSummary: "Purchase requisition staged to Hardware Supplier with pre-filled specs",
    batchName: "BOM Inventory Alert — Hardware SKU HW-442",
    needsApproval: true,
    approvalType: "Approve Requisition PO",
  },
  {
    id: "rectify",
    stepNum: "08 / 08",
    title: "Defect Loop",
    icon: "/assets/recon-work-orders.svg",
    userPrompt: "Route rejected batch #44 back to prep supervisor with defect notes.",
    aiResponse:
      "Staged high-contrast rectification ticket: 'Mounting bracket offset by 1.8mm at left flange. Re-align and replace affected component using staged stock lot #ST-12.'",
    actionSummary: "Batch locked; mobile alert dispatched to Station Supervisor Tariq",
    batchName: "Rectification Ticket #RT-881 — Batch #44",
    previewImage: "/assets/veave/qc/qc_inspection_task.png",
    needsApproval: true,
    approvalType: "Authorize Rectification Ticket",
  },
];

export default function AiAssistantShowcase() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [approvedState, setApprovedState] = useState<Record<string, boolean>>({});

  const current = scenarios[activeScenarioIndex];
  const isApproved = approvedState[current.id] || false;

  const handleApprove = () => {
    setApprovedState((prev) => ({ ...prev, [current.id]: true }));
  };

  return (
    <section id="ai" className="relative px-4 sm:px-6 py-16 lg:py-24 bg-[#0d1f2b] text-white overflow-hidden border-t border-white/10">
      {/* Ambient Radial Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#0e6bfd]/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-[#0e6bfd]/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-7xl flex flex-col gap-12 sm:gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9cc4ff]">
            <Sparkles className="size-3.5 text-[#9cc4ff]" />
            <span>PROACTIVE FACTORY INTELLIGENCE &amp; SAFETY GUARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-white leading-[1.15]">
            Your entire factory floor, connected to one AI assistant.
          </h2>

          <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
            Veave proactively detects production bottlenecks, calculates material yield, flags overdue assembly steps, and summarizes morning shopfloor priorities—always waiting for manager approval before applying line rebalancing.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3 text-[#9cc4ff]" />
                  <span>Pause animation</span>
                </>
              ) : (
                <>
                  <Play className="size-3 text-[#9cc4ff]" />
                  <span>Auto play scenarios</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 8 Scenario Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-black/40 p-2 rounded-2xl border border-white/10">
          {scenarios.map((sc, idx) => {
            const isActive = idx === activeScenarioIndex;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setActiveScenarioIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-bold transition-all text-center gap-1 ${
                  isActive
                    ? "bg-[#0e6bfd] text-white shadow-md shadow-blue-500/25"
                    : "text-[#8fa9bb] hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-[10px] opacity-75 font-mono">{sc.stepNum.split(" ")[0]}</span>
                <span className="truncate w-full">{sc.title}</span>
              </button>
            );
          })}
        </div>

        {/* The AI Board: Interactive Prompt + Action Staging */}
        <div className="rounded-2xl border border-white/15 bg-[#122a38]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Conversational Interaction & Staged Action */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Scenario Eyebrow */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9cc4ff]">
                    Scenario {current.stepNum}: {current.title}
                  </span>
                </div>
                <span className="text-xs text-[#8fa9bb] font-mono">
                  Veave Intelligence Engine
                </span>
              </div>

              {/* User Command Box */}
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/10 bg-white/[0.04]">
                <div className="flex items-center gap-2 text-xs text-[#8fa9bb] font-semibold">
                  <Users className="size-3.5 text-[#0e6bfd]" />
                  <span>Factory Manager Instruction:</span>
                </div>
                <p className="text-sm sm:text-base font-medium text-white italic">
                  &ldquo;{current.userPrompt}&rdquo;
                </p>
              </div>

              {/* AI Draft & Analysis */}
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-[#0e6bfd]/30 bg-[#0e6bfd]/10">
                <div className="flex items-center gap-2 text-xs text-[#9cc4ff] font-semibold">
                  <Bot className="size-3.5 text-[#0e6bfd]" />
                  <span>Veave Operational Analysis:</span>
                </div>
                <p className="text-xs sm:text-sm text-[#c6d6e1] leading-relaxed">
                  {current.aiResponse}
                </p>
              </div>

              {/* Action Summary & Safety Guard Badge */}
              <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/10 bg-black/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#8fa9bb] font-semibold">Staged Execution Action:</span>
                  
                  {/* The Needs Approval Safety Badge */}
                  {current.needsApproval && !isApproved ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 text-xs font-bold text-amber-300">
                      <AlertCircle className="size-3 text-amber-300" />
                      Needs approval
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="size-3 text-emerald-300" />
                      Approved &amp; Executed
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-white">
                  {current.actionSummary}
                </p>

                {/* Manager Action Execution Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={isApproved}
                    className={`inline-flex items-center gap-2 rounded-[7px] px-5 py-2.5 text-xs font-semibold transition-all shadow-xs ${
                      isApproved
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-[#0e6bfd] text-white hover:bg-[#0b5ad9] active:scale-[0.98]"
                    }`}
                  >
                    {isApproved ? (
                      <>
                        <Check className="size-3.5" />
                        <span>Action Confirmed</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-3.5" />
                        <span>{current.approvalType}</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/roles/admin"
                    className="inline-flex items-center gap-1.5 rounded-[7px] border border-white/15 bg-white/[0.06] hover:bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                  >
                    <span>Inspect In Admin View</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Preview Card */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-xl border border-white/10 bg-slate-950 p-4 flex flex-col gap-3 shadow-xl">
                <div className="flex items-center justify-between text-xs text-[#8fa9bb] border-b border-white/10 pb-2">
                  <span className="font-semibold text-white truncate max-w-[240px]">
                    {current.batchName || "Active Factory Batch"}
                  </span>
                  <span className="text-[#9cc4ff] shrink-0 font-mono">LIVE PREVIEW</span>
                </div>

                <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden border border-white/10 bg-slate-900">
                  <Image
                    src={current.previewImage || "/assets/veave/admin/admin_dashboard.png"}
                    alt={current.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="text-[11px] text-[#8fa9bb] leading-relaxed">
                  Veave operates on human-in-the-loop verification: AI suggests optimal nesting, detected seam tolerances, and line rebalances, but never alters production orders without human authorization.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
