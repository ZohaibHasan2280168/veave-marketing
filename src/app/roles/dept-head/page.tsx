"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Camera,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  ListChecks,
  Clock,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROLE_DETAILS } from "@/data/veaveData";

const deptScreenshots = [
  {
    id: "checkpoints",
    title: "Operations & Checkpoints Queue",
    desc: "Mobile-first step-by-step required operational actions, measurement guidelines, and mandatory photo uploads.",
    src: "/assets/veave/dept_head/operations_checkpoints.png",
  },
  {
    id: "dashboard",
    title: "Department Supervisor Dashboard",
    desc: "Uncluttered active order queue: shows incoming garment bundles, priority tags, and QC review status.",
    src: "/assets/veave/dept_head/dept_head_dashboard.png",
  },
  {
    id: "tasks",
    title: "Station Tasks & Work-in-Progress",
    desc: "Track completed vs pending cut stacks or sewing bundles with real-time handoff alerts.",
    src: "/assets/veave/dept_head/tasks.png",
  },
];

export default function DeptHeadRolePage() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const deptData = ROLE_DETAILS["dept-head"];
  const currentScreen = deptScreenshots[activeScreenIndex];

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
              <span className="text-white">Department Head</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3 py-1 text-xs font-bold text-[#9cc4ff]">
                  <Smartphone className="size-3.5" />
                  {deptData.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  {deptData.title}
                </h1>

                <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
                  {deptData.overview}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-white/10">
                  {deptData.metrics.map((m, i) => (
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
                    <span>Request Shopfloor Demo</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    <span>Start Free Trial</span>
                  </Link>
                </div>
              </div>

              {/* Main Screenshot Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/15 bg-[#0f2330] p-3 shadow-2xl overflow-hidden">
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                    <Image
                      src={deptData.screenshot}
                      alt={deptData.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="p-3 text-xs text-[#c6d6e1] flex items-center justify-between">
                    <span className="font-semibold text-white">Veave Department Supervisor Mobile Hub</span>
                    <span className="text-emerald-400 font-semibold">100% Mobile Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Screenshots Gallery */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                OPERATIONS &amp; TASKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                Engineered for Shopfloor Clarity
              </h2>
              <p className="text-sm sm:text-base text-[#587080]">
                Supervisors holding fabric can easily verify checkpoints, submit camera photos, and resolve defect alerts without desktop clutter.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex flex-wrap gap-2 border-b border-[#e3eaef] pb-4">
              {deptScreenshots.map((screen, idx) => (
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
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-[#0e6bfd]">
                  Cloudinary Signed Uploads
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

        {/* Feature Highlights */}
        <section className="py-20 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Responsibilities */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  SHOPFLOOR PROCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  How Supervisors Execute Daily Work
                </h2>
                <p className="text-sm text-[#587080]">
                  Structured physical checkpoints guarantee high yield and consistent seam quality.
                </p>
              </div>

              <div className="space-y-4">
                {deptData.keyResponsibilities.map((item, idx) => (
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
                  A SUPERVISOR&apos;S DAY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  Fast Handoffs, Zero Confusion
                </h2>
                <p className="text-sm text-[#587080]">
                  How cutting and sewing department heads coordinate seamlessly across shifts.
                </p>
              </div>

              <div className="space-y-3 border-l-2 border-[#0e6bfd]/30 pl-4 ml-2">
                {deptData.dailyWorkflow.map((step, idx) => (
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
              Give your shopfloor supervisors the digital tools they deserve.
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Eliminate stained paper job travelers and WhatsApp confusion with real-time mobile queues.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all"
              >
                Schedule Mobile Walkthrough
              </Link>
              <Link
                href="/roles/qc"
                className="rounded-[7px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Explore QC Inspector Role →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

