"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Check,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROLE_DETAILS } from "@/data/veaveData";

const adminScreenshots = [
  {
    id: "dashboard",
    title: "Executive & CRM Overview",
    desc: "Live KPIs for monthly revenue, closed deals, inbound leads, active floor orders, and items needing attention.",
    src: "/assets/veave/admin/admin_dashboard.png",
  },
  {
    id: "website",
    title: "Visual Storefront & Theme Builder",
    desc: "Manage your public multi-page website, 12 curated themes, custom domain DNS verification, and Google Reviews.",
    src: "/assets/veave/admin/website_builder.png",
  },
  {
    id: "leads",
    title: "Inbound Leads CRM",
    desc: "Capture Contact Us and RFQ inquiries automatically with status filters (Open, Won, Lost, Dormant) and source attribution.",
    src: "/assets/veave/admin/leads.png",
  },
  {
    id: "opportunities",
    title: "Sales Opportunities & Proposals",
    desc: "Negotiate deal values, payment terms, and advances; send counter-proposals and convert won deals into orders in 1 click.",
    src: "/assets/veave/admin/opportunities.png",
  },
  {
    id: "appointments",
    title: "Google Meet & Calendar Scheduling",
    desc: "Schedule buyer meetings synced with Google Calendar OAuth2 and generate instant Google Meet video links.",
    src: "/assets/veave/admin/appointments.png",
  },
  {
    id: "floorplan",
    title: "Visual Business & Floor Plan Pipeline",
    desc: "End-to-end board showing Leads, Opportunities, Active Floor Orders, and Department / Operation progress.",
    src: "/assets/veave/admin/floor_plan.png",
  },
  {
    id: "revenue",
    title: "Financial Records & Payroll Ledger",
    desc: "Track order payments, advance collections, operating expenses, and staff payroll with CSV export.",
    src: "/assets/veave/admin/revenue.png",
  },
  {
    id: "team",
    title: "Team Directory & 12-Module Role Matrix",
    desc: "Invite staff, assign 7 role presets (Sales, Product Manager, Accountant, Merchandiser, QC), and manage 2FA policies.",
    src: "/assets/veave/admin/team.png",
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
        <section className="bg-[#122a38] text-white py-16 border-b border-white/[0.08]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#8fa9bb] mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <span className="text-[#9cc4ff]">Role workspaces</span>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <span className="text-white">Workspace Admin</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex flex-col items-start gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0d1f2b] border border-white/[0.1] px-2.5 py-1 font-mono text-xs text-[#9cc4ff]">
                    <Shield className="size-3.5 stroke-[1.5]" />
                    {adminData.badge}
                  </span>
                  <Link
                    href="/roles/dept-head"
                    className="rounded-md bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 font-mono text-xs text-[#c6d6e1]"
                  >
                    Operations Lead →
                  </Link>
                  <Link
                    href="/roles/qc"
                    className="rounded-md bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 font-mono text-xs text-[#c6d6e1]"
                  >
                    Verification Queue →
                  </Link>
                </div>

                <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-white leading-[1.12]">
                  {adminData.title}
                </h1>

                <p className="text-base text-[#c6d6e1] leading-relaxed">{adminData.overview}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-4 border-t border-white/[0.08]">
                  {adminData.metrics.map((m) => (
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
                      src={adminData.screenshot}
                      alt={adminData.title}
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

        {/* Interactive Real Screens Gallery */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-8">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs text-[#0e6bfd]">Workspace views</span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.015em] text-[#16303f]">
                Explore real Veave admin and CRM screens
              </h2>
              <p className="text-sm text-[#587080]">
                Switch tabs below to inspect how Veave organizes your public storefront, CRM leads,
                opportunities, Google Meet appointments, floor plan, and financial ledger.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {adminScreenshots.map((screen, idx) => (
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
                  <span className="size-1.5 rounded-full bg-[#16a34a]" />
                  <span>Live workspace screen</span>
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

        {/* Responsibilities & Daily Workflow */}
        <section className="py-16 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs text-[#0e6bfd]">Capabilities</span>
                <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f] mt-1">
                  Built for business owners and operations leaders
                </h2>
              </div>

              <div className="space-y-3">
                {adminData.keyResponsibilities.map((item) => (
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

            <div className="flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs text-[#0e6bfd]">Daily rhythm</span>
                <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f] mt-1">
                  A typical day in the admin workspace
                </h2>
              </div>

              <div className="space-y-3 border-l border-[#e3eaef] pl-5 ml-2">
                {adminData.dailyWorkflow.map((step) => (
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
