import Link from "next/link";
import { ChevronRight, ArrowRight, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INTEGRATION_CATEGORIES } from "@/data/veaveData";

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#122a38] text-white pt-20 pb-20 border-b border-white/10 relative overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative text-center flex flex-col items-center gap-4">
            <span className="font-mono text-xs text-[#9cc4ff]">
              Connected platform architecture
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-white leading-[1.12] max-w-3xl">
              Connects with Google Workspace, Cloudflare R2 &amp; Paddle Billing
            </h1>

            <p className="text-base text-[#c6d6e1] leading-relaxed max-w-2xl">
              Veave integrates directly with Google Calendar, Google Meet, Google Places Reviews,
              Cloudflare R2 private object storage, and Paddle Merchant-of-Record subscription
              billing.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INTEGRATION_CATEGORIES.map((cat, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#e3eaef] bg-white p-7 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0e6bfd]">
                      Category 0{idx + 1}
                    </span>
                    <h2 className="text-xl font-bold text-[#16303f]">{cat.name}</h2>
                    <p className="text-xs sm:text-[13px] text-[#587080] leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="pt-4 border-t border-[#e3eaef] space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#16303f] block mb-2">
                        Supported Platforms:
                      </span>
                      {cat.partners.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-[#16303f]">
                          <CheckCircle2 className="size-3.5 text-[#257a55]" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#e3eaef] text-xs font-semibold text-[#0e6bfd]">
                    Native API Integration Active
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#0f2330] text-white">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Need a custom apparel machinery or ERP integration?
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Our engineering team builds custom webhooks and REST connectors for proprietary factory machinery, automated conveyors, and legacy ERP databases.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-lg bg-[#0e6bfd] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0b5ad9] transition-colors"
              >
                Start 14-day free trial
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Log in to workspace
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

