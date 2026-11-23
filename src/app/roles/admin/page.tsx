"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Layers,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Grid3X3,
  DollarSign,
  Building,
  Sliders,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROLE_DETAILS } from "@/data/veaveData";

const adminScreenshots = [
  {
    id: "dashboard",
    title: "Executive Command Dashboard",
    desc: "Live KPI cards for active production orders, pending QC reviews, bottleneck stages & revenue metrics.",
    src: "/assets/veave/admin/admin_dashboard.png",
  },
  {
    id: "orders",
    title: "Order Intake & Master Schedule",
    desc: "Comprehensive order catalog with client details, garment silhouettes, delivery due dates and live stage status.",
    src: "/assets/veave/admin/orders.png",
  },
  {
    id: "details",
    title: "Granular Order Detail & BOM",
    desc: "Deep view of size breakdown curves, millimeter tech pack measurements, fabric lots, and sequential department assignments.",
    src: "/assets/veave/admin/order_details.png",
  },
  {
    id: "departments",
    title: "Department & Checkpoint Configurator",
    desc: "Customize the physical assembly line: define sequential department routing and mandatory photo proof rules.",
    src: "/assets/veave/admin/departments.png",
  },
  {
    id: "floorplan",
    title: "Interactive Factory Floor Plan",
    desc: "Visual representation of physical cutting tables, sewing lines, and finishing stations with live work-in-progress.",
    src: "/assets/veave/admin/floor_plan.png",
  },
  {
    id: "revenue",
    title: "Production Financials & Revenue",
    desc: "Track margin per garment, contractor piece rates, invoice balances, and automated QuickBooks general ledger postings.",
    src: "/assets/veave/admin/revenue.png",
  },
];

export default function AdminRolePage() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const adminData = ROLE_DETAILS["admin"];
  const currentScreen = adminScreenshots[activeScreenIndex];

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
              <span className="text-white">Factory Admin</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3 py-1 text-xs font-bold text-[#9cc4ff]">
                  <Shield className="size-3.5" />
                  {adminData.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  {adminData.title}
                </h1>

                <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
                  {adminData.overview}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-white/10">
                  {adminData.metrics.map((m, i) => (
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
                    <span>Schedule Admin Walkthrough</span>
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
                      src={adminData.screenshot}
                      alt={adminData.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="p-3 text-xs text-[#c6d6e1] flex items-center justify-between">
                    <span className="font-semibold text-white">Veave Factory Admin Command</span>
                    <span className="text-[#9cc4ff]">Production Live v2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Real Screens Gallery */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                PRODUCTION SCREENS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                Explore Real Veave Admin Workspaces
              </h2>
              <p className="text-sm sm:text-base text-[#587080]">
                Click any operational view below to inspect how Veave organizes orders, assembly lines, floor plans, and financial reports.
              </p>
            </div>

            {/* View Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#e3eaef] pb-4">
              {adminScreenshots.map((screen, idx) => (
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

            {/* Active Screen Display */}
            <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e3eaef] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#16303f]">{currentScreen.title}</h3>
                  <p className="text-xs text-[#587080] mt-1">{currentScreen.desc}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Factory View
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

        {/* Responsibilities & Workflow */}
        <section className="py-20 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Key Responsibilities */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  SYSTEM CAPABILITIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  Built for Manufacturing Leaders
                </h2>
                <p className="text-sm text-[#587080]">
                  Everything a plant general manager or factory owner needs to supervise production and enforce accountability.
                </p>
              </div>

              <div className="space-y-4">
                {adminData.keyResponsibilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-[#e3eaef] bg-[#f8fafc]">
                    <CheckCircle2 className="size-5 text-[#257a55] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#16303f] font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Daily Workflow Timeline */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  DAILY TIMELINE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  A Typical Day on Veave
                </h2>
                <p className="text-sm text-[#587080]">
                  How production heads run high-volume output with zero paper friction.
                </p>
              </div>

              <div className="space-y-3 border-l-2 border-[#0e6bfd]/30 pl-4 ml-2">
                {adminData.dailyWorkflow.map((step, idx) => (
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

        {/* Bottom CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#0f2330] text-white">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to modernise your garment factory command center?
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Experience the multi-tenant architecture, real-time floor plans, and sequential department workflows in action.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all"
              >
                Book Plant Walkthrough
              </Link>
              <Link
                href="/pricing"
                className="rounded-[7px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                View Factory Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

