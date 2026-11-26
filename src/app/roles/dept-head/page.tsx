"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Check,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROLE_DETAILS } from "@/data/veaveData";

const deptScreenshots = [
  {
    id: "dashboard",
    title: "Department Lead Workspace (/my-work)",
    desc: "Focused operational queue showing active orders, assigned stages, and submission status.",
    src: "/assets/veave/dept_head/dept_head_dashboard.png",
  },
  {
    id: "checkpoints",
    title: "Operations & Stage Checkpoints",
    desc: "Step-by-step operational requirements and Cloudflare R2 file attachment uploads.",
    src: "/assets/veave/dept_head/operations_checkpoints.png",
  },
  {
    id: "tasks",
    title: "Team Tasks & Handoffs",
    desc: "Track completed and pending operational tasks with real-time notifications.",
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
        <section className="bg-[#122a38] text-white py-16 border-b border-white/[0.08]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#8fa9bb] mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <Link href="/roles/admin" className="text-[#9cc4ff] hover:text-white">
                Role workspaces
              </Link>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <span className="text-white">Operations &amp; Department Lead</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex flex-col items-start gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0d1f2b] border border-white/[0.1] px-2.5 py-1 font-mono text-xs text-[#9cc4ff]">
                    <Smartphone className="size-3.5 stroke-[1.5]" />
                    {deptData.badge}
                  </span>
                  <Link
                    href="/roles/admin"
                    className="rounded-md bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 font-mono text-xs text-[#c6d6e1]"
                  >
                    ← Workspace Admin
                  </Link>
                  <Link
                    href="/roles/qc"
                    className="rounded-md bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 font-mono text-xs text-[#c6d6e1]"
                  >
                    Verification Queue →
                  </Link>
                </div>

                <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-white leading-[1.12]">
                  {deptData.title}
                </h1>

                <p className="text-base text-[#c6d6e1] leading-relaxed">{deptData.overview}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-white/[0.08]">
                  {deptData.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-xl font-medium text-white tabular-nums">{m.value}</span>
                      <span className="text-xs text-[#8fa9bb]">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/signup"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] px-5 text-sm font-medium text-white hover:bg-[#0b5ad9] transition-colors"
                  >
                    <span>Start 14-day free trial</span>
                    <ArrowRight className="size-4 stroke-[1.5]" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.14] bg-[#1a3546] px-5 text-sm font-medium text-white hover:bg-[#214156] transition-colors"
                  >
                    <span>Log in to workspace</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl border border-white/[0.1] bg-[#0d1f2b] p-3">
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-white border border-white/[0.08]">
                    <Image
                      src={deptData.screenshot}
                      alt={deptData.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-8">
            <div className="flex flex-wrap gap-2">
              {deptScreenshots.map((screen, idx) => (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    activeScreenIndex === idx
                      ? "bg-[#122a38] text-white"
                      : "bg-white text-[#587080] border border-[#e3eaef] hover:text-[#16303f]"
                  }`}
                >
                  {screen.title}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e3eaef] pb-4">
                <div>
                  <h3 className="text-base font-medium text-[#16303f]">{currentScreen.title}</h3>
                  <p className="text-xs text-[#587080] mt-0.5">{currentScreen.desc}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-[#f3f6f8] px-2.5 py-1 font-mono text-xs text-[#16303f]">
                  Cloudflare R2 storage
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#e3eaef] bg-[#f8fafc]">
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

        <section className="py-16 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f]">
                Role responsibilities
              </h2>
              <div className="space-y-3">
                {deptData.keyResponsibilities.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl border border-[#e3eaef] bg-[#f8fafc]"
                  >
                    <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#16303f] leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f]">
                Daily workflow
              </h2>
              <div className="space-y-3 border-l border-[#e3eaef] pl-5 ml-2">
                {deptData.dailyWorkflow.map((step) => (
                  <div key={step} className="relative py-2">
                    <span className="absolute -left-[25px] top-3.5 size-2.5 rounded-full bg-[#0e6bfd]" />
                    <p className="text-xs sm:text-sm text-[#16303f] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
