"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Bell, MessageSquare, MoreHorizontal, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#122a38] text-white py-4 sm:py-6 lg:py-6 min-h-[calc(100vh-76px)] flex items-center">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-80" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-[#0e6bfd]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-[#0e6bfd]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start lg:items-center">
          
          {/* Left Column: Core Value Proposition & Headings */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left z-10">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-semibold tracking-tight text-white leading-[1.14] mb-3 sm:mb-3.5 max-w-xl"
            >
              The Production Management System for Modern Factories &amp; Workshops
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#c6d6e1] leading-relaxed max-w-lg mb-5 sm:mb-5"
            >
              Run the physical factory floor from one system. Track preparation, assembly,
              finishing, and packaging through sequential departmental checkpoints, Cloudinary signed
              photographic proof, and independent QC verification.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#0e6bfd] hover:bg-[#0b5ad9] text-white font-semibold text-[14px] sm:text-[15px] px-5 py-3 sm:px-6 sm:py-3.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all active:scale-[0.98]"
              >
                <span>Start free trial</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-white/20 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-[14px] sm:text-[15px] px-5 py-3 sm:px-6 sm:py-3.5 backdrop-blur-md transition-all active:scale-[0.98]"
              >
                <span>Book factory walkthrough</span>
              </Link>
            </motion.div>

            {/* Reassurance Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-3 flex items-center gap-2 text-xs text-[#8fa9bb]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#5fb58a]" />
              <span>14-day production trial. Subdomain isolated. No credit card required.</span>
            </motion.div>

            {/* Fast Ecosystem Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-white/10 w-full grid grid-cols-3 gap-3 text-xs text-[#c6d6e1]"
            >
              <div>
                <span className="block font-semibold text-white text-[13px] sm:text-sm">17 Production Tools</span>
                <span className="text-[#8fa9bb] text-[11px] sm:text-xs">Zero add-on fees</span>
              </div>
              <div>
                <span className="block font-semibold text-white text-[13px] sm:text-sm">Dedicated Subdomain</span>
                <span className="text-[#8fa9bb] text-[11px] sm:text-xs">{`{factory}.veave.pk`}</span>
              </div>
              <div>
                <span className="block font-semibold text-white text-[13px] sm:text-sm">Cryptographic Proof</span>
                <span className="text-[#8fa9bb] text-[11px] sm:text-xs">Signed Cloudinary CDN</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Prominent Tilted Dashboard Mockup */}
          <div className="lg:col-span-7 xl:col-span-7 relative z-10 flex items-center justify-center lg:justify-end overflow-visible -mt-2 sm:-mt-4 lg:-mt-5 lg:-translate-y-2.5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative w-full max-w-[560px] sm:max-w-[640px] lg:max-w-[720px] xl:max-w-[760px] flex items-center justify-center lg:justify-end overflow-visible"
            >
              {/* Soft ambient dark-theme glow behind dashboard */}
              <div
                className="pointer-events-none absolute -inset-6 sm:-inset-10 rounded-full bg-[#0e6bfd]/20 blur-[80px] sm:blur-[100px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-[#9cc4ff]/10 blur-[60px]"
                aria-hidden="true"
              />

              {/* Angled Tilted Dashboard Card Container - Unclipped with generous breathing padding */}
              <div className="relative group transition-transform duration-500 ease-out hover:scale-[1.01] p-2 sm:p-4 overflow-visible w-full">
                <Image
                  src="/assets/veave/veave_tilted_dashboard.png"
                  alt="Veave Garatex Master Admin Production Dashboard"
                  width={752}
                  height={567}
                  priority
                  className="w-full h-auto max-w-[540px] sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[760px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] drop-shadow-[0_10px_25px_rgba(14,107,253,0.22)]"
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                    transform: "translateZ(0)",
                  }}
                />

                {/* Floating Antigravity Micro-Widgets & Small Cards (Rotated 11deg Clockwise to match dashboard slope) */}
                
                {/* 1. Top Document & Bell Dual Notification with Hand Cursor (top: -22px; right: 34%) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [-2, 2, -2]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 0.35 },
                    scale: { duration: 0.5, delay: 0.35 },
                    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                  }}
                  style={{
                    top: "12px",
                    right: "34%",
                    transform: "rotate(11deg)",
                  }}
                  className="absolute z-30 pointer-events-auto cursor-pointer group/card hover:scale-110 transition-transform"
                >
                  <div className="flex items-center gap-1.5 relative">
                    {/* Left: Document tile */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border border-slate-100 border-b-[2.5px] border-b-slate-200/90 flex items-center justify-center relative">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                    </div>

                    {/* Right: Bell tile */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] border border-slate-100 border-b-[2.5px] border-b-slate-200/90 flex items-center justify-center relative">
                      <Bell className="w-4 h-4 text-slate-700" />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white font-bold text-[8px] flex items-center justify-center ring-2 ring-white">
                        1
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* 2. "Active Revenue" Wave Card (top: 19%; right: -32px; w-[140px]) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [-3, 3, -3]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.4 },
                    x: { duration: 0.6, delay: 0.4 },
                    y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  style={{
                    top: "19%",
                    right: "-32px",
                    transform: "rotate(11deg)",
                  }}
                  className="hidden sm:block absolute z-20 w-[140px] pointer-events-auto cursor-pointer group/card hover:scale-105 transition-transform"
                >
                  <div className="bg-white rounded-xl shadow-[0_20px_35px_-8px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.1)] border border-slate-100 border-b-[3px] border-b-slate-200/90 p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-800 tracking-tight">Active Revenue</span>
                      <span className="text-[8px] text-slate-400 font-bold tracking-widest leading-none">•••</span>
                    </div>
                    <svg viewBox="0 0 100 36" className="w-full h-7 overflow-visible">
                      <defs>
                        <linearGradient id="activeRevGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 28 Q 18 28 28 20 T 55 22 T 80 12 T 100 4 L 100 36 L 0 36 Z" fill="url(#activeRevGrad)" />
                      <path d="M 0 28 Q 18 28 28 20 T 55 22 T 80 12 T 100 4" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>

                {/* 3. "Revenue" & "Retine-care" Twin Bar Charts (bottom: 28%; left: -46px) */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ 
                    opacity: 1, 
                    y: [-3, 3, -3]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.45 },
                    y: { duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
                  }}
                  style={{
                    bottom: "34%",
                    left: "-46px",
                    transform: "rotate(11deg)",
                  }}
                  className="hidden sm:block absolute z-20 pointer-events-auto cursor-pointer group/card hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-1.5">
                    {/* Left: Revenue */}
                    <div className="bg-white rounded-xl shadow-[0_20px_35px_-8px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.1)] border border-slate-100 border-b-[3px] border-b-slate-200/90 p-2 w-[96px]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-slate-800">Revenue</span>
                        <span className="text-[8px] text-slate-400 font-bold tracking-widest leading-none">•••</span>
                      </div>
                      <div className="flex items-end justify-between h-7 pt-1 px-0.5">
                        <span className="w-1.5 h-3 rounded-t-sm bg-blue-200" />
                        <span className="w-1.5 h-2 rounded-t-sm bg-blue-300" />
                        <span className="w-1.5 h-4 rounded-t-sm bg-blue-300" />
                        <span className="w-1.5 h-5 rounded-t-sm bg-blue-400" />
                        <span className="w-1.5 h-3.5 rounded-t-sm bg-indigo-400" />
                        <span className="w-1.5 h-7 rounded-t-sm bg-blue-600" />
                      </div>
                    </div>

                    {/* Right: Retine-care */}
                    <div className="bg-white rounded-xl shadow-[0_20px_35px_-8px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.1)] border border-slate-100 border-b-[3px] border-b-slate-200/90 p-2 w-[104px]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-slate-800">Retine-care</span>
                        <span className="text-[8px] text-slate-400 font-bold tracking-widest leading-none">•••</span>
                      </div>
                      <div className="flex items-end justify-between h-7 pt-1 px-0.5">
                        <span className="w-1.5 h-3.5 rounded-t-sm bg-blue-200" />
                        <span className="w-1.5 h-2.5 rounded-t-sm bg-blue-300" />
                        <span className="w-1.5 h-4 rounded-t-sm bg-blue-300" />
                        <span className="w-1.5 h-5 rounded-t-sm bg-blue-400" />
                        <span className="w-1.5 h-4 rounded-t-sm bg-indigo-400" />
                        <span className="w-1.5 h-7 rounded-t-sm bg-blue-600" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 4. "Tariq Reha / Workspace" Profile Stack (bottom: 10%; left: -52px) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [3, -3, 3]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.5 },
                    x: { duration: 0.6, delay: 0.5 },
                    y: { duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1.1 }
                  }}
                  style={{
                    bottom: "16%",
                    left: "-52px",
                    transform: "rotate(11deg)",
                  }}
                  className="hidden md:block absolute z-20 pointer-events-auto cursor-pointer group/card hover:scale-105 transition-transform"
                >
                  <div className="relative">
                    {/* 3D stacked deck under-layer */}
                    <div className="absolute inset-0 bg-slate-200/90 rounded-xl translate-y-1.5 translate-x-1 -z-10 shadow-sm" />
                    <div className="absolute inset-0 bg-slate-100 rounded-xl translate-y-0.5 translate-x-0.5 -z-10" />

                    <div className="bg-white rounded-xl shadow-[0_20px_35px_-8px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.1)] border border-slate-100 border-b-[3px] border-b-slate-200/90 px-3 py-2 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center text-white text-[10px] font-bold shrink-0 ring-1 ring-slate-200 relative">
                        TR
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[11px] font-bold text-slate-900 leading-tight">Tariq Reha</span>
                        <span className="text-[9px] font-medium text-slate-500 leading-tight">Workspace</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 5. "UI Revenue" Wave Card (bottom: -16px; left: 12%; w-[135px]) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: [3, -3, 3]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.55 },
                    y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }
                  }}
                  style={{
                    bottom: "12px",
                    left: "12%",
                    transform: "rotate(11deg)",
                  }}
                  className="hidden md:block absolute z-20 w-[135px] pointer-events-auto cursor-pointer group/card hover:scale-105 transition-transform"
                >
                  <div className="bg-white rounded-xl shadow-[0_20px_35px_-8px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.1)] border border-slate-100 border-b-[3px] border-b-slate-200/90 p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-800 tracking-tight">UI Revenue</span>
                    </div>
                    <svg viewBox="0 0 100 36" className="w-full h-7 overflow-visible">
                      <defs>
                        <linearGradient id="uiRevGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 28 Q 18 28 28 20 T 55 24 T 80 12 T 100 4 L 100 36 L 0 36 Z" fill="url(#uiRevGrad)" />
                      <path d="M 0 28 Q 18 28 28 20 T 55 24 T 80 12 T 100 4" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </motion.div>

                {/* 6. "Chat tabs" Floating Pill (bottom: 12%; right: -26px; w-[160px]) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [-3, 3, -3]
                  }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: 0.6 },
                    x: { duration: 0.6, delay: 0.6 },
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }
                  }}
                  style={{
                    bottom: "18%",
                    right: "-26px",
                    transform: "rotate(11deg)",
                  }}
                  className="hidden sm:block absolute z-20 w-[160px] pointer-events-auto cursor-pointer group/card hover:scale-105 transition-transform"
                >
                  <div className="bg-white rounded-xl shadow-[0_20px_35px_-8px_rgba(0,0,0,0.32),0_4px_10px_rgba(0,0,0,0.1)] border border-slate-100 border-b-[3px] border-b-slate-200/90 px-3 py-2 flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[11px] font-bold text-slate-900 leading-tight">Chat tabs</span>
                        <span className="text-[8px] text-slate-400 leading-tight">Active floor chat</span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 shrink-0" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
