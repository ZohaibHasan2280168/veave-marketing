import Link from "next/link";
import { ChevronRight, ArrowRight, Calculator, Sliders, Scissors, Ruler, ShieldCheck, Gauge } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FREE_TOOLS } from "@/data/veaveData";

const toolIcons = [Scissors, Gauge, ShieldCheck, Sliders, Ruler, Calculator];

export default function ToolsIndexPage() {
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
              <span className="text-white">Free Garment Utility Tools</span>
            </div>

            <div className="max-w-3xl flex flex-col items-start gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9cc4ff]">
                FREE TEXTILE &amp; APPAREL UTILITIES
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                Professional Garment Production Calculators
              </h1>
              <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed">
                Free tools built for master cutters, pattern makers, industrial engineers, and quality assurance inspectors. Calculate fabric yardage, garment SAM, AQL 2.5 sample sizes, and pitch times without creating an account.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FREE_TOOLS.map((tool, idx) => {
                const IconComponent = toolIcons[idx % toolIcons.length];
                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-7 hover:border-[#0e6bfd]/40 hover:bg-[#f8fafc] hover:shadow-md transition-all duration-200"
                  >
                    <div className="space-y-4">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[#0e6bfd]/10 text-[#0e6bfd] group-hover:scale-105 transition-transform">
                        <IconComponent className="size-6" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0e6bfd]">
                          {tool.category}
                        </span>
                        <h2 className="text-lg font-bold text-[#16303f] group-hover:text-[#0e6bfd] transition-colors leading-snug">
                          {tool.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-[13px] text-[#587080] leading-relaxed">
                        {tool.tagline}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#e3eaef] flex items-center justify-between text-xs font-semibold text-[#0e6bfd]">
                      <span>Open Interactive Calculator</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#0f2330] text-white">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Want these calculations automated across all your orders?
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Veave embeds fabric yield calculations, SAM tracking, and tolerance verifications directly into your factory assembly lines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all"
              >
                Start 14-Day Free Trial
              </Link>
              <Link
                href="/contact"
                className="rounded-[7px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Schedule Factory Walkthrough
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

