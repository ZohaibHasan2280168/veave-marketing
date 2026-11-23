"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, ArrowRight, Building2, Globe, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const [subdomain, setSubdomain] = useState("alpha-tailors");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#122a38] text-white pt-20 pb-20 border-b border-white/10 relative overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative text-center flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3.5 py-1 text-xs font-bold text-[#9cc4ff]">
              14-DAY FACTORY PRODUCTION TRIAL
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl">
              Claim Your Dedicated Factory Subdomain
            </h1>

            <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
              Experience zero-friction sequential assembly workflows, mobile supervisor queues, and cryptographic photo evidence on your factory lines.
            </p>
          </div>
        </section>

        {/* Form Container */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-8">
                <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Check className="size-8" />
                </div>
                <h2 className="text-2xl font-bold text-[#16303f]">Factory Subdomain Provisioned!</h2>
                <p className="text-sm text-[#587080] max-w-md leading-relaxed">
                  Your tenant instance at <strong className="text-[#0e6bfd]">https://{subdomain}.veave.pk</strong> has been reserved. Check your email for your activation link and one-click admin credentials.
                </p>
                <Link
                  href="/"
                  className="mt-4 rounded-[7px] bg-[#0e6bfd] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#0b5ad9] transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold text-[#16303f]">Start 14-Day Free Factory Trial</h2>
                  <p className="text-xs text-[#587080] mt-1">
                    No credit card required. Full access to all 17 tools, unlimited mobile supervisor seats, and 1 QC Inspector seat.
                  </p>
                </div>

                {/* Subdomain Input with Live Preview */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#16303f]">
                    Choose Your Factory Subdomain *
                  </label>
                  <div className="flex items-center rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 py-2 text-sm focus-within:border-[#0e6bfd] focus-within:bg-white transition-all">
                    <Globe className="size-4 text-[#587080] shrink-0 mr-2" />
                    <input
                      type="text"
                      required
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                      placeholder="your-factory-name"
                      className="w-full bg-transparent font-semibold text-[#16303f] focus:outline-hidden"
                    />
                    <span className="text-[#587080] font-medium shrink-0">.veave.pk</span>
                  </div>
                  <span className="text-[11px] text-[#587080]">
                    Your isolated tenant portal: <strong>https://{subdomain || "your-factory"}.veave.pk</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#16303f]">Factory Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Master Tailoring &amp; Co"
                      className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#16303f]">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Tariq Mehmood"
                      className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#16303f]">Work Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="tariq@mastertailoring.com"
                      className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#16303f]">Admin Password *</label>
                    <input
                      required
                      type="password"
                      placeholder="••••••••••••"
                      className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#587080]">
                  <ShieldCheck className="size-4 text-[#257a55]" />
                  <span>100% database tenant isolation. Your data is strictly inaccessible to any other factory.</span>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#0e6bfd] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
                >
                  <span>Provision My Factory Instance</span>
                  <ArrowRight className="size-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

