import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLATFORM_PILLARS } from "@/data/veaveData";

export default function FeaturesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#122a38] text-white pt-20 pb-20 border-b border-white/10 relative overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8fa9bb] mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-white">Platform Features</span>
            </div>

            <div className="max-w-3xl flex flex-col items-start gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9cc4ff]">
                THE VEAVE APPAREL OS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                Seventeen Integrated Tools for Garment Factories
              </h1>
              <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed">
                From initial client tech packs to the final packing manifest—explore how every tool shares the same order, department, and QC records under subdomain-isolated multi-tenancy.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Pillars & 17 Tools */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-16">
            {PLATFORM_PILLARS.map((pillar) => (
              <div key={pillar.number} className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e3eaef] pb-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0e6bfd]">
                      <span>Pillar {pillar.number}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                      {pillar.title}
                    </h2>
                    <p className="text-sm text-[#587080] max-w-xl">{pillar.description}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#587080]">
                    {pillar.tools.length} Specialized Modules
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pillar.tools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/features/${tool.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-[#e3eaef] bg-white p-6 hover:border-[#0e6bfd]/40 hover:bg-[#f8fafc] hover:shadow-md transition-all duration-200"
                    >
                      <div className="space-y-4">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-[#f3f6f8] p-2.5 group-hover:bg-[#0e6bfd]/10 transition-colors">
                          <Image
                            src={tool.icon}
                            alt={tool.title}
                            width={40}
                            height={40}
                            className="size-7 object-contain"
                          />
                        </div>

                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0e6bfd] block mb-1">
                            {tool.targetRole}
                          </span>
                          <h3 className="text-base font-bold text-[#16303f] group-hover:text-[#0e6bfd] transition-colors">
                            {tool.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-[13px] text-[#587080] leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#e3eaef] flex items-center justify-between text-xs font-semibold text-[#0e6bfd]">
                        <span>View specifications</span>
                        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#0f2330] text-white">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              All 17 tools included standard in every factory plan.
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Zero module surcharges, zero per-garment taxes, and unlimited mobile supervisor accounts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all"
              >
                Start 14-Day Free Trial
              </Link>
              <Link
                href="/pricing"
                className="rounded-[7px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Compare Pricing Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

