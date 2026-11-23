"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckSquare,
  ShieldCheck,
  Eye,
  AlertOctagon,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  FileCheck,
  Scale,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROLE_DETAILS } from "@/data/veaveData";

const qcscreenshots = [
  {
    id: "dashboard",
    title: "Pending Inspection Queue",
    desc: "Live list of garment bundles submitted by cutting, embroidery, and sewing lines awaiting quality clearance.",
    src: "/assets/veave/qc/qc_dashboard.png",
  },
  {
    id: "inspection",
    title: "Detailed Inspection Lightbox & Defect Form",
    desc: "Zoom in on seam alignment, verify measurements against tech pack tolerance tables, and approve or reject with mandatory remarks.",
    src: "/assets/veave/qc/qc_inspection_task.png",
  },
];

export default function QcRolePage() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const qcData = ROLE_DETAILS["qc"];
  const currentScreen = qcscreenshots[activeScreenIndex];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#122a38] text-white pt-20 pb-24 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0e6bfd]/15 via-transparent to-transparent pointer-events-none" />

          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8fa9bb] mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="size-3.5" />
              <Link href="/roles/admin" className="text-[#9cc4ff]">Roles</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-white">QC Inspector</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-300">
                  <ShieldCheck className="size-3.5" />
                  {qcData.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  {qcData.title}
                </h1>

                <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
                  {qcData.overview}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-white/10">
                  {qcData.metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-2xl font-bold text-white tracking-tight">{m.value}</span>
                      <span className="text-xs text-[#8fa9bb]">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
                  >
                    <span>Request Quality Audit Demo</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    <span>Start 14-Day Free Trial</span>
                  </Link>
                </div>
              </div>

              {/* Main Screenshot Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/15 bg-[#0f2330] p-3 shadow-2xl overflow-hidden">
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                    <Image
                      src={qcData.screenshot}
                      alt={qcData.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="p-3 text-xs text-[#c6d6e1] flex items-center justify-between">
                    <span className="font-semibold text-white">Veave QC Inspector Queue</span>
                    <span className="text-emerald-400 font-semibold">Zero Defect Escape Engine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real QC Screens Gallery */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                INSPECTION WORKSPACE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                Independent Quality Verification
              </h2>
              <p className="text-sm sm:text-base text-[#587080]">
                Inspect high-resolution photo evidence, compare millimeter tolerances against tech packs, and execute approvals or rejections with full accountability.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex flex-wrap gap-2 border-b border-[#e3eaef] pb-4">
              {qcscreenshots.map((screen, idx) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                    activeScreenIndex === idx
                      ? "bg-[#0e6bfd] text-white shadow-sm"
                      : "bg-white text-[#587080] border border-[#e3eaef] hover:border-[#cbd5e1] hover:text-[#16303f]"
                  }`}
                >
                  {screen.title}
                </button>
              ))}
            </div>

            {/* Display Card */}
            <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e3eaef] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#16303f]">{currentScreen.title}</h3>
                  <p className="text-xs text-[#587080] mt-1">{currentScreen.desc}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Mandatory Approval Gate
                </span>
              </div>

              <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden border border-[#e3eaef] bg-slate-50">
                <Image
                  src={currentScreen.src}
                  alt={currentScreen.title}
                  fill
                  className="object-contain object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Responsibilities & Daily Timeline */}
        <section className="py-20 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Responsibilities */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  STANDARDS &amp; AUDITS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  How QC Protects Factory Integrity
                </h2>
                <p className="text-sm text-[#587080]">
                  Strict quality barriers prevent damaged or out-of-tolerance garments from being packaged.
                </p>
              </div>

              <div className="space-y-4">
                {qcData.keyResponsibilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-[#e3eaef] bg-[#f8fafc]">
                    <CheckCircle2 className="size-5 text-[#257a55] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#16303f] font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Workflow */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  DAILY INSPECTION LOG
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  A Day in Quality Assurance
                </h2>
                <p className="text-sm text-[#587080]">
                  How certified QC officers audit cut stacks, sewing lines, and final shipments.
                </p>
              </div>

              <div className="space-y-3 border-l-2 border-[#0e6bfd]/30 pl-4 ml-2">
                {qcData.dailyWorkflow.map((step, idx) => (
                  <div key={idx} className="relative py-2">
                    <span className="absolute -left-[23px] top-3.5 size-3 rounded-full bg-[#0e6bfd] ring-4 ring-[#0e6bfd]/20" />
                    <p className="text-xs sm:text-sm text-[#16303f] leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#0f2330] text-white">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Eliminate client defect complaints forever.
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Equip your quality team with cryptographic photo evidence and digital measurement tolerance tables.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all"
              >
                Schedule Factory Quality Walkthrough
              </Link>
              <Link
                href="/workflows"
                className="rounded-[7px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                View Full Assembly Workflows →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

