import Link from "next/link";
import { Check, ShieldCheck, ChevronRight, ArrowRight, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRICING_TIERS, VEAVE_FAQS } from "@/data/veaveData";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#122a38] text-white pt-20 pb-20 border-b border-white/10 relative overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative text-center flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3.5 py-1 text-xs font-bold text-[#9cc4ff]">
              TRANSPARENT FACTORY PRICING
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15] max-w-3xl">
              Enterprise Apparel Software, Priced for Independent Factories
            </h1>

            <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
              A single predictable monthly plan based on active production lines—unlimited department users, unlimited QC inspectors, and zero per-garment taxes.
            </p>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative flex flex-col justify-between rounded-2xl border p-8 transition-all ${
                    tier.popular
                      ? "border-[#0e6bfd] bg-white shadow-xl ring-2 ring-[#0e6bfd]/20"
                      : "border-[#e3eaef] bg-white shadow-sm"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0e6bfd] px-3.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
                      Most Popular for Factories
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-[#16303f]">{tier.name}</h2>
                      <p className="text-xs text-[#587080] mt-1.5 leading-relaxed">{tier.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1.5 pb-6 border-b border-[#e3eaef]">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#16303f] tracking-tight">{tier.price}</span>
                      <span className="text-xs text-[#587080] font-medium">{tier.period}</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <span className="font-bold uppercase tracking-wider text-[#16303f] block text-[11px]">
                        What&apos;s Included:
                      </span>
                      {tier.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-[#16303f]">
                          <Check className="size-4 text-[#257a55] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-[#e3eaef]">
                    <Link
                      href={tier.id === "enterprise" ? "/contact" : "/signup"}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-[7px] py-3 text-sm font-semibold transition-all ${
                        tier.popular
                          ? "bg-[#0e6bfd] text-white hover:bg-[#0b5ad9] shadow-sm"
                          : "border border-[#dbe4ea] bg-[#f8fafc] text-[#16303f] hover:bg-white hover:border-[#0e6bfd]/40"
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise Assurance Banner */}
            <div className="mt-16 rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#16303f]">
                    Zero Risk 14-Day Production Trial
                  </h3>
                  <p className="text-xs text-[#587080] mt-0.5">
                    Test Veave with your actual cutting, stitching, and QC staff on 1 production batch. No credit card required to start.
                  </p>
                </div>
              </div>
              <Link
                href="/signup"
                className="shrink-0 inline-flex items-center gap-2 rounded-[7px] bg-[#0e6bfd] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
              >
                <span>Launch Trial in 2 Minutes</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing FAQ Section */}
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="mx-auto w-full max-w-4xl flex flex-col gap-10">
            <div className="text-center flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                PRICING CLARIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                Frequently Asked Pricing Questions
              </h2>
            </div>

            <div className="space-y-4">
              {VEAVE_FAQS.slice(0, 6).map((faq) => (
                <div key={faq.id} className="p-5 rounded-xl border border-[#e3eaef] bg-[#f8fafc]">
                  <h3 className="text-sm font-bold text-[#16303f] flex items-center gap-2">
                    <HelpCircle className="size-4 text-[#0e6bfd] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#587080] mt-2 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

