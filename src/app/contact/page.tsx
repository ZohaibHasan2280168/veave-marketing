"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, MessageSquare, Building2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    factoryName: "",
    email: "",
    phone: "",
    sewingLines: "1-5",
    currentPainPoint: "paper-job-cards",
    message: ""
  });

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
              SCHEDULE A FACTORY WALKTHROUGH
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl">
              See Veave in Action on Your Apparel Assembly Lines
            </h1>

            <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
              Connect with our apparel production engineers. We will demonstrate how sequential checkpoints, mobile supervisor queues, and cryptographic photo evidence deploy in your factory in under 72 hours.
            </p>
          </div>
        </section>

        {/* Contact Form & Office Info */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form */}
            <div className="lg:col-span-7 rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-12">
                  <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#16303f]">Factory Demo Scheduled!</h2>
                  <p className="text-sm text-[#587080] max-w-md leading-relaxed">
                    Thank you, {formData.name}. Our textile systems specialist will reach out to <strong>{formData.email}</strong> within 4 business hours to arrange your customized walkthrough for {formData.factoryName}.
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
                  <div className="border-b border-[#e3eaef] pb-4">
                    <h2 className="text-xl font-bold text-[#16303f]">Book a 1-on-1 Factory Consultation</h2>
                    <p className="text-xs text-[#587080] mt-1">
                      Fill out your factory details below to tailor the demonstration to your garments and fabric types.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#16303f]">Your Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Master Tariq Mahmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#16303f]">Factory / Atelier Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Artisan Garments Ltd."
                        value={formData.factoryName}
                        onChange={(e) => setFormData({ ...formData, factoryName: e.target.value })}
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
                        placeholder="e.g. production@artisangarments.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#16303f]">Direct Mobile / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="e.g. +92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#16303f]">Active Sewing Lines / Tables</label>
                      <select
                        value={formData.sewingLines}
                        onChange={(e) => setFormData({ ...formData, sewingLines: e.target.value })}
                        className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      >
                        <option value="1-3">1 to 3 Tables (Boutique Atelier)</option>
                        <option value="4-10">4 to 10 Lines (Production Factory)</option>
                        <option value="11-25">11 to 25 Lines (Export House)</option>
                        <option value="25+">25+ Lines (Multi-Plant Enterprise)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#16303f]">Primary Production Challenge</label>
                      <select
                        value={formData.currentPainPoint}
                        onChange={(e) => setFormData({ ...formData, currentPainPoint: e.target.value })}
                        className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      >
                        <option value="paper-job-cards">Lost / Damaged Paper Job Cards</option>
                        <option value="qc-escapes">Defect Escapes to Client Cartons</option>
                        <option value="fabric-wastage">Excess Fabric Wastage &amp; Remnants</option>
                        <option value="bottlenecks">Sewing Line Bottlenecks &amp; Delays</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#16303f]">Additional Notes (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the garments you manufacture (e.g. woven trousers, tailored blazers, knitwear)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 py-2.5 text-sm font-medium text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#0e6bfd] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
                  >
                    <span>Confirm Factory Walkthrough Request</span>
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                <h3 className="text-base font-bold text-[#16303f] border-b border-[#e3eaef] pb-3">
                  Direct Factory Support Desk
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Mail className="size-4 text-[#0e6bfd] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#16303f] block">Email Us</span>
                      <a href="mailto:info@veave.pk" className="text-[#587080] hover:text-[#0e6bfd] transition-colors">
                        info@veave.pk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="size-4 text-[#0e6bfd] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#16303f] block">Direct Factory Phone</span>
                      <a href="tel:+14074098383" className="text-[#587080] hover:text-[#0e6bfd] transition-colors">
                        (407) 409-8383
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="size-4 text-[#257a55] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#16303f] block">WhatsApp Business Emergency Line</span>
                      <span className="text-[#587080]">Available for active factory floor emergencies 24/7</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="size-4 text-[#0e6bfd] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#16303f] block">Operating Shifts Supported</span>
                      <span className="text-[#587080]">Monday through Saturday, 08:00 AM - 08:00 PM PKT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Pill */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-6 flex flex-col gap-2 text-xs">
                <span className="font-bold text-emerald-800">Guaranteed Data Confidentiality</span>
                <p className="text-emerald-700 leading-relaxed">
                  We sign bilateral Non-Disclosure Agreements (NDAs) with all apparel clients to protect your proprietary pattern grading, tech packs, and customer buyer records.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

