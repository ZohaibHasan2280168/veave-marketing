"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  BarChart3,
  Globe,
  Briefcase,
  LayoutGrid,
  Lock,
  CheckCircle2,
  Video,
  Star,
  HardDrive,
  ArrowUpRight,
  Users,
  FileCheck2,
  Pause,
  Play,
} from "lucide-react";

type HeroTabId = "crm-overview" | "storefront" | "deals" | "operations";

interface HeroTab {
  id: HeroTabId;
  label: string;
  route: string;
  icon: typeof BarChart3;
}

const HERO_TABS: HeroTab[] = [
  { id: "crm-overview", label: "Executive CRM", route: "atlas.veave.systemic.pk/dashboard", icon: BarChart3 },
  { id: "storefront", label: "Storefront", route: "atlas.veave.systemic.pk/website", icon: Globe },
  { id: "deals", label: "CRM & Meet", route: "atlas.veave.systemic.pk/opportunities", icon: Briefcase },
  { id: "operations", label: "Orders & Floor", route: "atlas.veave.systemic.pk/floor-plan", icon: LayoutGrid },
];

const STOREFRONT_THEMES = [
  { id: "slate", name: "Nordic Slate", bg: "bg-[#0f2432]", accent: "bg-[#0e6bfd]", text: "text-white" },
  { id: "cream", name: "Atelier Cream", bg: "bg-[#faf8f5]", accent: "bg-[#132938]", text: "text-[#132938]" },
  { id: "indigo", name: "Studio Cobalt", bg: "bg-[#172554]", accent: "bg-[#38bdf8]", text: "text-white" },
];

const AUTO_INTERVAL_MS = 6200;

export default function HeroWorkspaceStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeTab = HERO_TABS[activeIndex];
  const activeTheme = STOREFRONT_THEMES[themeIdx];

  // Auto-tour across all 4 pillars unless user hovers or pauses
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_TABS.length);
    }, AUTO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Subtle 3D mouse-driven perspective tilt (smooth springs, no jank)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.4, -2.4]), { stiffness: 160, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.8, 2.8]), { stiffness: 160, damping: 24 });
  const calloutShiftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 22 });
  const calloutShiftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), { stiffness: 140, damping: 22 });

  // Scroll-linked parallax for layered callout cards (replaces cheap infinite bounce)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const topCardScrollY = useTransform(scrollYProgress, [0, 1], [14, -22]);
  const bottomLeftScrollY = useTransform(scrollYProgress, [0, 1], [-12, 24]);
  const bottomRightScrollY = useTransform(scrollYProgress, [0, 1], [18, -16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={stageRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-8 pb-6 sm:px-3"
      style={{ perspective: 1400 }}
    >
      {/* Floating Context Card 1: Inbound RFQ Notification (Top-Right) */}
      <motion.div
        initial={{ opacity: 0, y: -14, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: topCardScrollY, x: calloutShiftX }}
        className="hidden sm:flex items-center gap-2.5 absolute -top-5 right-2 lg:-right-4 z-30 rounded-xl border border-[#e2e9ef] bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-10px_rgba(7,19,29,0.5)]"
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#e4f3ea] text-[#16a34a] shrink-0">
          <FileCheck2 className="size-4 stroke-[1.5]" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#132938] leading-none">
              New inbound RFQ
            </span>
            <span className="size-1.5 rounded-full bg-[#16a34a]" />
          </div>
          <div className="text-[10px] text-[#556d7d] font-mono tabular-nums mt-1">
            Nordic Apparel · $42,800
          </div>
        </div>
      </motion.div>

      {/* Main 3D Tilted Browser Stage */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/[0.14] bg-[#091823] p-2.5 sm:p-3.5 shadow-[0_32px_70px_-16px_rgba(4,12,19,0.8)]"
      >
        {/* Specular Top Edge Highlight */}
        <div className="pointer-events-none absolute top-0 left-8 right-8 h-px edge-highlight" />

        {/* Browser Header Bar + Interactive Spring Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-1 flex-wrap">
            {HERO_TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 sm:px-3 text-[11px] sm:text-xs font-medium transition-colors cursor-pointer ${
                    isSelected ? "text-white" : "text-[#9cb3c3] hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="heroTabPill"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-[#0e6bfd] shadow-sm shadow-[#0e6bfd]/40"
                    />
                  )}
                  <Icon className="relative z-10 size-3.5 stroke-[1.5]" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-[#0e2230] px-2.5 py-1 font-mono text-[10px] text-[#9cb3c3]">
              <Lock className="size-3 stroke-[1.5] text-[#4cc38a]" />
              <span>{activeTab.route}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Resume showcase tour" : "Pause showcase tour"}
              className="inline-flex size-7 items-center justify-center rounded-md border border-white/[0.08] bg-[#0e2230] text-[#9cb3c3] hover:text-white transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="size-3 stroke-[1.5]" /> : <Pause className="size-3 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Crisp Interactive Application Viewport */}
        <div className="relative rounded-xl border border-white/[0.09] bg-[#f8fafc] overflow-hidden min-h-[370px] sm:min-h-[395px] text-[#132938]">
          {/* Subtle Auto-Tour Progress Line at top of canvas */}
          <div className="h-[2px] w-full bg-[#e2e9ef] overflow-hidden">
            {!isPaused && (
              <motion.div
                key={`progress-${activeIndex}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_INTERVAL_MS / 1000, ease: "linear" }}
                className="h-full bg-[#0e6bfd]"
              />
            )}
          </div>

          <AnimatePresence mode="wait">
            {activeTab.id === "crm-overview" && (
              <motion.div
                key="crm-overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-12 h-full"
              >
                {/* Authentic Veave Mini Sidebar */}
                <div className="hidden sm:flex col-span-3 flex-col justify-between border-r border-[#e2e9ef] bg-white p-3">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#edf2f7]">
                      <div className="flex size-6 items-center justify-center rounded-md bg-[#0e6bfd] text-white text-[10px] font-semibold">
                        A
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold truncate">Atlas Apparel</div>
                        <div className="text-[9px] text-[#556d7d] font-mono">Admin · Trial</div>
                      </div>
                    </div>

                    <div className="space-y-0.5 text-[10px] font-medium">
                      {[
                        { label: "Dashboard", active: true },
                        { label: "Records & Ledger", active: false },
                        { label: "Leads & CRM", active: false },
                        { label: "Opportunities", active: false },
                        { label: "Appointments", active: false },
                        { label: "Orders & Floor", active: false },
                        { label: "Storefront Site", active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
                            item.active
                              ? "bg-[#eef5ff] text-[#0e6bfd]"
                              : "text-[#556d7d]"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.active && <span className="size-1.5 rounded-full bg-[#0e6bfd]" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#f4f7fa] border border-[#e2e9ef] p-2">
                    <div className="text-[9px] font-mono text-[#556d7d]">R2 Vault Quota</div>
                    <div className="mt-1 h-1.5 rounded-full bg-[#e2e9ef] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "38%" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="h-full rounded-full bg-[#0e6bfd]"
                      />
                    </div>
                    <div className="mt-1 text-[9px] font-mono text-[#132938] tabular-nums">
                      19.2 GB / 50 GB
                    </div>
                  </div>
                </div>

                {/* Main Executive CRM Content */}
                <div className="col-span-12 sm:col-span-9 p-3.5 sm:p-4 space-y-3 bg-[#f8fafc]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[#132938]">
                        Executive workspace overview
                      </div>
                      <div className="text-[10px] text-[#556d7d]">
                        Storefront leads, buyer deals, active orders &amp; ledger
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#0e6bfd] px-2.5 py-1 text-[10px] font-medium text-white">
                      <span>+ New opportunity</span>
                    </span>
                  </div>

                  {/* 4 Crisp Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: "Revenue (30d)", val: "$48,920", delta: "+24.8%", positive: true },
                      { label: "Active leads", val: "38", delta: "+12 this wk", positive: true },
                      { label: "Open deals", val: "14", delta: "$142k pipe", positive: true },
                      { label: "Active orders", val: "19", delta: "98.4% SLA", positive: true },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="rounded-lg border border-[#e2e9ef] bg-white p-2.5"
                      >
                        <div className="text-[9px] text-[#556d7d]">{stat.label}</div>
                        <div className="text-sm font-semibold text-[#132938] tabular-nums mt-0.5">
                          {stat.val}
                        </div>
                        <div className="text-[9px] font-mono text-[#16a34a] tabular-nums mt-0.5">
                          {stat.delta}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Revenue & Throughput Area Chart */}
                  <div className="rounded-lg border border-[#e2e9ef] bg-white p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-[#132938]">
                        Sales &amp; order revenue velocity
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#556d7d]">
                        <span className="px-1.5 py-0.5 rounded bg-[#eef5ff] text-[#0e6bfd]">Revenue</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#f4f7fa]">Orders</span>
                      </div>
                    </div>

                    <svg viewBox="0 0 360 88" className="w-full h-[80px] overflow-visible">
                      <defs>
                        <linearGradient id="veaveHeroChartFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0e6bfd" stopOpacity="0.24" />
                          <stop offset="100%" stopColor="#0e6bfd" stopOpacity="0.01" />
                        </linearGradient>
                      </defs>
                      {[22, 46, 70].map((y) => (
                        <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="#edf2f7" strokeWidth="1" />
                      ))}
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        d="M 0 72 C 42 66, 68 58, 108 50 C 148 42, 182 48, 224 30 C 266 14, 308 22, 360 8 L 360 86 L 0 86 Z"
                        fill="url(#veaveHeroChartFill)"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        d="M 0 72 C 42 66, 68 58, 108 50 C 148 42, 182 48, 224 30 C 266 14, 308 22, 360 8"
                        fill="none"
                        stroke="#0e6bfd"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      {[
                        { x: 108, y: 50 },
                        { x: 224, y: 30 },
                        { x: 360, y: 8 },
                      ].map((pt, i) => (
                        <motion.circle
                          key={i}
                          cx={pt.x}
                          cy={pt.y}
                          r="3.2"
                          fill="#ffffff"
                          stroke="#0e6bfd"
                          strokeWidth="2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.35 + i * 0.12 }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Live Pipeline Rows */}
                  <div className="rounded-lg border border-[#e2e9ef] bg-white overflow-hidden">
                    <div className="grid grid-cols-12 px-3 py-1.5 bg-[#f4f7fa] border-b border-[#e2e9ef] text-[9px] font-mono text-[#556d7d]">
                      <span className="col-span-5">Account / Order</span>
                      <span className="col-span-4">Stage</span>
                      <span className="col-span-3 text-right">Value</span>
                    </div>
                    {[
                      { acct: "Nordic Apparel Co", stage: "Proposal · Meet", badge: "bg-[#eef5ff] text-[#0e6bfd]", val: "$42,800" },
                      { acct: "Meridian Textiles", stage: "Assembly · 78%", badge: "bg-[#e4f3ea] text-[#16a34a]", val: "$18,450" },
                      { acct: "Horizon Retail UK", stage: "Paid · Dispatch", badge: "bg-[#f1f5f9] text-[#132938]", val: "$29,600" },
                    ].map((row) => (
                      <div
                        key={row.acct}
                        className="grid grid-cols-12 items-center px-3 py-2 border-b last:border-b-0 border-[#edf2f7] text-[10px]"
                      >
                        <span className="col-span-5 font-medium text-[#132938] truncate">{row.acct}</span>
                        <span className="col-span-4">
                          <span className={`inline-flex rounded px-1.5 py-0.5 text-[9px] font-medium ${row.badge}`}>
                            {row.stage}
                          </span>
                        </span>
                        <span className="col-span-3 text-right font-mono font-medium tabular-nums">
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab.id === "storefront" && (
              <motion.div
                key="storefront"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 space-y-3 bg-[#f8fafc]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-[#132938]">
                      Visual Storefront Builder &amp; Custom Domain
                    </div>
                    <div className="text-[10px] text-[#556d7d]">
                      Click a theme preset to preview live · Wired straight to CRM Leads
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {STOREFRONT_THEMES.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setThemeIdx(idx)}
                        className={`rounded-md px-2 py-1 text-[10px] font-medium border transition-all cursor-pointer ${
                          themeIdx === idx
                            ? "border-[#0e6bfd] bg-[#eef5ff] text-[#0e6bfd]"
                            : "border-[#e2e9ef] bg-white text-[#556d7d] hover:text-[#132938]"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Themeable Public Storefront Preview */}
                <motion.div
                  layout
                  className={`rounded-xl border border-[#d5dfe7] p-4 sm:p-5 transition-colors duration-300 ${activeTheme.bg} ${activeTheme.text}`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-current/10 text-[10px]">
                    <span className="font-semibold tracking-tight">ATLAS APPAREL EXPORTS</span>
                    <div className="flex items-center gap-2 font-mono opacity-80">
                      <span>Capabilities</span>
                      <span>Estimator</span>
                      <span className={`rounded px-2 py-0.5 text-white ${activeTheme.accent}`}>
                        Request quote
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-7 space-y-2">
                      <div className="inline-flex items-center gap-1.5 rounded bg-current/10 px-2 py-0.5 font-mono text-[9px]">
                        <CheckCircle2 className="size-3 text-[#16a34a]" />
                        <span>atlasapparel.com · DNS Verified</span>
                      </div>
                      <div className="text-base sm:text-lg font-semibold leading-tight">
                        Direct B2B manufacturing with instant tier pricing
                      </div>
                      <p className="text-[11px] opacity-75 leading-relaxed">
                        Every public quote request writes directly into your Veave CRM leads queue.
                      </p>
                    </div>

                    {/* Embedded Category Price Estimator */}
                    <div className="sm:col-span-5 rounded-lg bg-white text-[#132938] p-3 border border-[#e2e9ef] space-y-2">
                      <div className="text-[10px] font-semibold">Category price estimator</div>
                      <div className="flex justify-between text-[10px] text-[#556d7d]">
                        <span>Heavy Fleece Hoodie · 1,500 pcs</span>
                      </div>
                      <div className="flex items-baseline justify-between pt-1 border-t border-[#edf2f7]">
                        <span className="text-[9px] text-[#556d7d]">Estimated FOB</span>
                        <span className="text-sm font-semibold text-[#0e6bfd] font-mono tabular-nums">
                          $11.40 / unit
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Google Places Verified Reviews Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="rounded-lg border border-[#e2e9ef] bg-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#fef9c3] text-[#ca8a04]">
                        <Star className="size-4 fill-current" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#132938] tabular-nums">
                          4.9 / 5.0 Google Places
                        </div>
                        <div className="text-[10px] text-[#556d7d]">
                          Auto-synced verified buyer reviews
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#16a34a]">Live sync</span>
                  </div>

                  <div className="rounded-lg border border-[#e2e9ef] bg-white p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-[#132938]">Multi-page CMS</div>
                      <div className="text-[10px] text-[#556d7d]">
                        Home, Capabilities, Portfolio, Contact
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#0e6bfd]">12 themes</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab.id === "deals" && (
              <motion.div
                key="deals"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 space-y-3 bg-[#f8fafc]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-[#132938]">
                      CRM Opportunities, Proposals &amp; Google Meet
                    </div>
                    <div className="text-[10px] text-[#556d7d]">
                      Qualify buyers, schedule Meet calls, negotiate advance terms &amp; convert in 1 click
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#d5dfe7] bg-white px-2.5 py-1 text-[10px] font-medium text-[#132938]">
                    <Video className="size-3 text-[#0e6bfd]" />
                    <span>Google Meet Connected</span>
                  </span>
                </div>

                {/* 3-Column Interactive Deal Board */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      col: "Qualification",
                      count: 6,
                      cards: [
                        { title: "Knit Polo Capsule", buyer: "Alder & Pine UK", val: "$19,200", tag: "Web RFQ" },
                        { title: "Workwear Uniforms", buyer: "Vanguard Logistics", val: "$31,500", tag: "Call booked" },
                      ],
                    },
                    {
                      col: "Counter-proposal",
                      count: 4,
                      cards: [
                        { title: "French Terry 2,500u", buyer: "Nordic Apparel Co", val: "$42,800", tag: "30% advance" },
                        { title: "Organic Tote Run", buyer: "Studio Kopenhagen", val: "$14,600", tag: "Sample sent" },
                      ],
                    },
                    {
                      col: "Won → Active Order",
                      count: 4,
                      cards: [
                        { title: "Denim Outerwear", buyer: "Meridian Group", val: "$64,000", tag: "Order #408" },
                        { title: "Custom Packaging", buyer: "Solace Roasters", val: "$11,900", tag: "Order #409" },
                      ],
                    },
                  ].map((lane, laneIdx) => (
                    <div
                      key={lane.col}
                      className="rounded-lg border border-[#e2e9ef] bg-[#f4f7fa] p-2.5 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#132938]">
                        <span>{lane.col}</span>
                        <span className="font-mono text-[9px] text-[#556d7d] bg-white px-1.5 py-0.5 rounded border border-[#e2e9ef] tabular-nums">
                          {lane.count}
                        </span>
                      </div>
                      {lane.cards.map((c, ci) => (
                        <motion.div
                          key={c.title}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: laneIdx * 0.08 + ci * 0.06 }}
                          className="rounded-lg border border-[#e2e9ef] bg-white p-2.5 space-y-1.5 shadow-2xs"
                        >
                          <div className="text-[11px] font-semibold text-[#132938] leading-snug">
                            {c.title}
                          </div>
                          <div className="text-[9px] text-[#556d7d]">{c.buyer}</div>
                          <div className="flex items-center justify-between pt-1 border-t border-[#edf2f7]">
                            <span className="font-mono text-[10px] font-semibold text-[#132938] tabular-nums">
                              {c.val}
                            </span>
                            <span className="rounded bg-[#eef5ff] px-1.5 py-0.5 text-[9px] font-medium text-[#0e6bfd]">
                              {c.tag}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Live Google Meet Banner */}
                <div className="rounded-lg border border-[#dbeafe] bg-[#eff6ff] px-3.5 py-2.5 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 text-[#132938]">
                    <Video className="size-3.5 text-[#0e6bfd]" />
                    <span className="font-medium">Sample review call · Nordic Apparel Co</span>
                    <span className="text-[#556d7d] hidden sm:inline">· Today 15:00 PKT</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#0e6bfd]">Auto .ics invited</span>
                </div>
              </motion.div>
            )}

            {activeTab.id === "operations" && (
              <motion.div
                key="operations"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 space-y-3 bg-[#f8fafc]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-[#132938]">
                      Visual Business Floor Plan &amp; Configurable Workflows
                    </div>
                    <div className="text-[10px] text-[#556d7d]">
                      Orders advance across custom departments with Kanban tasks &amp; optional R2 checkpoints
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#16a34a] bg-[#e4f3ea] px-2 py-1 rounded-md">
                    98.4% pass rate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      stage: "Stage 01",
                      dept: "Sourcing & Prep",
                      lead: "Usman Tariq",
                      orders: 7,
                      pct: 92,
                      batch: "ORD-408 · Material staged",
                    },
                    {
                      stage: "Stage 02",
                      dept: "Production & Assembly",
                      lead: "Sana Khalid",
                      orders: 8,
                      pct: 76,
                      batch: "ORD-405 · Line 2 active",
                    },
                    {
                      stage: "Stage 03",
                      dept: "Quality & Dispatch",
                      lead: "Bilal Ahmed",
                      orders: 4,
                      pct: 100,
                      batch: "ORD-401 · R2 Proof Verified",
                    },
                  ].map((st, i) => (
                    <motion.div
                      key={st.stage}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-lg border border-[#e2e9ef] bg-white p-3 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#0e6bfd]">{st.stage}</span>
                        <span className="rounded bg-[#e4f3ea] px-1.5 py-0.5 text-[9px] font-medium text-[#16a34a]">
                          Active
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#132938]">{st.dept}</div>
                        <div className="text-[10px] text-[#556d7d] flex items-center gap-1 mt-0.5">
                          <Users className="size-3" />
                          <span>Lead: {st.lead}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono text-[#556d7d] tabular-nums">
                          <span>{st.orders} active orders</span>
                          <span>{st.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#edf2f7] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${st.pct}%` }}
                            transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
                            className="h-full rounded-full bg-[#0e6bfd]"
                          />
                        </div>
                      </div>
                      <div className="rounded bg-[#f4f7fa] border border-[#edf2f7] px-2 py-1.5 font-mono text-[9px] text-[#132938]">
                        {st.batch}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Role Workspace Switcher Strip */}
                <div className="rounded-lg border border-[#e2e9ef] bg-white px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="font-medium text-[#132938]">Dedicated role portals:</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="rounded bg-[#eef5ff] text-[#0e6bfd] px-2 py-0.5">/dashboard</span>
                    <span className="rounded bg-[#f4f7fa] text-[#132938] px-2 py-0.5">/my-work</span>
                    <span className="rounded bg-[#f4f7fa] text-[#132938] px-2 py-0.5">/qc-queue</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating Context Card 2: Cloudflare R2 & Role Matrix (Bottom-Left) */}
      <motion.div
        initial={{ opacity: 0, x: -16, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: bottomLeftScrollY, x: calloutShiftY }}
        className="hidden md:flex items-center gap-2.5 absolute -bottom-5 -left-4 z-30 rounded-xl border border-white/[0.14] bg-[#0e2230] px-3.5 py-2.5 text-white shadow-[0_18px_36px_-10px_rgba(4,12,19,0.7)]"
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#0e6bfd]/20 text-[#9cc4ff] border border-[#0e6bfd]/30 shrink-0">
          <HardDrive className="size-4 stroke-[1.5]" />
        </div>
        <div>
          <div className="text-[11px] font-medium leading-none">Cloudflare R2 Private Vault</div>
          <div className="text-[10px] font-mono text-[#8ba5b8] mt-1">
            Isolated per tenant · 12-module ACL
          </div>
        </div>
      </motion.div>

      {/* Floating Context Card 3: Live Paddle & Revenue Momentum (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, x: 16, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: bottomRightScrollY, x: calloutShiftX }}
        className="hidden sm:flex items-center gap-3 absolute -bottom-5 right-2 lg:-right-3 z-30 rounded-xl border border-[#e2e9ef] bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-10px_rgba(7,19,29,0.5)]"
      >
        <div>
          <div className="text-[10px] text-[#556d7d] leading-none">Revenue &amp; ledger</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-semibold text-[#132938] font-mono tabular-nums">
              +24.8%
            </span>
            <ArrowUpRight className="size-3 text-[#16a34a]" />
          </div>
        </div>
        <div className="flex items-end gap-1 h-7">
          {[35, 52, 46, 68, 84, 100].map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 4 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.55, delay: 0.55 + i * 0.06, ease: "easeOut" }}
              className={`w-1.5 rounded-t-xs ${i === 5 ? "bg-[#0e6bfd]" : "bg-[#bfd7fe]"}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
