"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Star,
  Video,
  CheckCircle2,
  Layers,
  ShieldCheck,
  HardDrive,
  Lock,
  DollarSign,
  Sliders,
} from "lucide-react";

interface PillarVisualCardProps {
  pillarNumber: string;
}

export default function PillarVisualCard({ pillarNumber }: PillarVisualCardProps) {
  if (pillarNumber === "01") {
    return (
      <div className="relative rounded-2xl bg-[#0e2230] border border-white/[0.1] p-4 text-white overflow-hidden shadow-lg">
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-px edge-highlight opacity-75" />
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9cb3c3] pb-2.5 mb-3 border-b border-white/[0.08]">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="size-3.5 text-[#9cc4ff]" />
            storefront &amp; crm sync
          </span>
          <span className="text-[#4cc38a]">DNS Active</span>
        </div>

        <div className="space-y-2.5">
          {/* Mini Public Quote -> Lead */}
          <div className="rounded-lg bg-[#091823] border border-white/[0.08] p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium">Public Price Estimator</div>
              <div className="text-[10px] text-[#8ba5b8] font-mono tabular-nums">
                2,500 units → $28,500 est.
              </div>
            </div>
            <span className="rounded bg-[#0e6bfd] px-2 py-0.5 text-[9px] font-medium">
              Lead #142
            </span>
          </div>

          {/* Mini Google Meet + Reviews */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/[0.05] border border-white/[0.08] p-2.5 space-y-1">
              <Video className="size-3.5 text-[#9cc4ff]" />
              <div className="text-[10px] font-medium">Google Meet</div>
              <div className="text-[9px] text-[#8ba5b8] font-mono">Auto .ics links</div>
            </div>
            <div className="rounded-lg bg-white/[0.05] border border-white/[0.08] p-2.5 space-y-1">
              <Star className="size-3.5 text-[#fbbf24] fill-[#fbbf24]" />
              <div className="text-[10px] font-medium tabular-nums">4.9 ★ Reviews</div>
              <div className="text-[9px] text-[#8ba5b8] font-mono">Google Places</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pillarNumber === "02") {
    return (
      <div className="relative rounded-2xl bg-[#0e2230] border border-white/[0.1] p-4 text-white overflow-hidden shadow-lg">
        <div className="pointer-events-none absolute top-0 left-6 right-6 h-px edge-highlight opacity-75" />
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9cb3c3] pb-2.5 mb-3 border-b border-white/[0.08]">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5 text-[#9cc4ff]" />
            live floor &amp; task routing
          </span>
          <span className="text-[#4cc38a] tabular-nums">98.4% pass</span>
        </div>

        <div className="space-y-2.5">
          {[
            { label: "Stage 01 · Sourcing & Prep", pct: 100, done: true },
            { label: "Stage 02 · Production Line", pct: 78, done: false },
            { label: "Stage 03 · Quality & Dispatch", pct: 35, done: false },
          ].map((row, idx) => (
            <div key={row.label} className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#dbe7f0] flex items-center gap-1.5">
                  {row.done ? (
                    <CheckCircle2 className="size-3 text-[#4cc38a]" />
                  ) : (
                    <ShieldCheck className="size-3 text-[#9cc4ff]" />
                  )}
                  {row.label}
                </span>
                <span className="font-mono text-[9px] text-[#9cb3c3] tabular-nums">{row.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${row.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${row.done ? "bg-[#4cc38a]" : "bg-[#0e6bfd]"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-[#0e2230] border border-white/[0.1] p-4 text-white overflow-hidden shadow-lg">
      <div className="pointer-events-none absolute top-0 left-6 right-6 h-px edge-highlight opacity-75" />
      <div className="flex items-center justify-between text-[10px] font-mono text-[#9cb3c3] pb-2.5 mb-3 border-b border-white/[0.08]">
        <span className="inline-flex items-center gap-1.5">
          <Sliders className="size-3.5 text-[#9cc4ff]" />
          ledger, r2 vault &amp; 2fa
        </span>
        <span className="inline-flex items-center gap-1 text-[#4cc38a]">
          <Lock className="size-3" />
          Protected
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="rounded-lg bg-[#091823] border border-white/[0.08] p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="size-4 text-[#4cc38a]" />
            <div>
              <div className="text-[11px] font-medium">Net Operating Ledger</div>
              <div className="text-[9px] text-[#8ba5b8] font-mono">Payments · Payroll · Spend</div>
            </div>
          </div>
          <span className="font-mono text-xs font-semibold text-[#4cc38a] tabular-nums">
            +$34,380
          </span>
        </div>

        <div className="rounded-lg bg-white/[0.05] border border-white/[0.08] p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="size-3.5 text-[#9cc4ff]" />
            <span className="font-mono text-[10px] text-[#dbe7f0]">
              weave-private/tenants/&#123;slug&#125;/
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#9cc4ff]">R2 Vault</span>
        </div>
      </div>
    </div>
  );
}
