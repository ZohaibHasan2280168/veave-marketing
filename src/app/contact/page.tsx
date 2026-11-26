"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Check, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    topic: "onboarding",
    message: "",
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
        <section className="bg-[#122a38] text-white py-16 border-b border-white/[0.08]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 text-center flex flex-col items-center gap-3">
            <span className="font-mono text-xs text-[#9cc4ff]">Support &amp; enterprise inquiries</span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-white leading-[1.12] max-w-3xl">
              Contact the Veave team
            </h1>

            <p className="text-base text-[#c6d6e1] leading-relaxed max-w-2xl">
              Need help migrating existing CRM records, configuring custom domain DNS, or setting up
              multi-location Enterprise plans? Send us a message or launch your self-serve trial
              directly.
            </p>
          </div>
        </section>

        {/* Contact Form & Direct Onboarding Shortcuts */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-4 py-10">
                  <div className="size-12 rounded-xl bg-[#e4f3ea] text-[#16a34a] flex items-center justify-center">
                    <Check className="size-6 stroke-[1.5]" />
                  </div>
                  <h2 className="text-xl font-medium text-[#16303f]">Message received</h2>
                  <p className="text-sm text-[#587080] max-w-md leading-relaxed">
                    Thank you, {formData.name}. Our support specialists will reply to{" "}
                    <strong className="text-[#16303f]">{formData.email}</strong> shortly.
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <Link
                      href="/signup"
                      className="rounded-lg bg-[#0e6bfd] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#0b5ad9] transition-colors"
                    >
                      Start 14-day free trial
                    </Link>
                    <Link
                      href="/"
                      className="rounded-lg border border-[#dbe4ea] px-5 py-2.5 text-xs font-medium text-[#16303f] hover:bg-[#f3f6f8] transition-colors"
                    >
                      Return home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="border-b border-[#e3eaef] pb-4">
                    <h2 className="text-lg font-medium text-[#16303f]">Send a support or sales message</h2>
                    <p className="text-xs text-[#587080] mt-1">
                      Want to start using Veave right away? You can provision your workspace online
                      without waiting on a call via{" "}
                      <Link href="/signup" className="text-[#0e6bfd] hover:underline font-medium">
                        self-serve onboarding
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#16303f]">Full name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Tariq Mahmood"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#16303f]">Company name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Crescent Mills Ltd."
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#16303f]">Work email *</label>
                      <input
                        required
                        type="email"
                        placeholder="ops@crescentmills.pk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-[#16303f]">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#16303f]">Topic</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="h-10 rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden"
                    >
                      <option value="onboarding">Self-serve onboarding &amp; 14-day trial</option>
                      <option value="migration">CRM, customer &amp; order data migration</option>
                      <option value="enterprise">Enterprise plan, custom domain &amp; SLA</option>
                      <option value="billing">Paddle Billing &amp; tax invoices</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#16303f]">Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="How can we help your team?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-lg border border-[#e3eaef] bg-[#f8fafc] p-3.5 text-sm text-[#16303f] focus:border-[#0e6bfd] focus:bg-white focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] px-6 text-sm font-medium text-white hover:bg-[#0b5ad9] transition-colors cursor-pointer"
                  >
                    <span>Send message</span>
                    <ArrowRight className="size-4 stroke-[1.5]" />
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 flex flex-col gap-4">
                <h3 className="text-base font-medium text-[#16303f] border-b border-[#e3eaef] pb-3">
                  Instant self-serve access
                </h3>
                <p className="text-xs text-[#587080] leading-relaxed">
                  You don&apos;t need to wait for a sales call to launch Veave. Provision your
                  subdomain, upload compliance documents, and start your 14-day trial right now.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/signup"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] text-white text-xs font-medium hover:bg-[#0b5ad9] transition-colors"
                  >
                    <span>Start 14-day free trial</span>
                    <ArrowRight className="size-3.5 stroke-[1.5]" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dbe4ea] bg-white text-[#16303f] text-xs font-medium hover:bg-[#f3f6f8] transition-colors"
                  >
                    <span>Log in to existing workspace</span>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="size-4 stroke-[1.5] text-[#0e6bfd] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#16303f] block">Email support</span>
                    <a href="mailto:info@veave.pk" className="text-[#587080] hover:text-[#0e6bfd]">
                      info@veave.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-4 stroke-[1.5] text-[#0e6bfd] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#16303f] block">Support hours</span>
                    <span className="text-[#587080]">Monday – Saturday · 08:00 AM – 08:00 PM PKT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#16303f] block">Tenant data privacy</span>
                    <span className="text-[#587080]">
                      Strict subdomain isolation and encrypted Cloudflare R2 private document vaults.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
