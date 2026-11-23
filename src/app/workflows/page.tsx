import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, CheckCircle2, Clock, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WORKFLOW_STAGES } from "@/data/veaveData";

export default function WorkflowsIndexPage() {
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
              <span className="text-white">Garment Assembly Workflows</span>
            </div>

            <div className="max-w-3xl flex flex-col items-start gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9cc4ff]">
                THE SEQUENTIAL PRODUCTION PIPELINE
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                One Digital Job Card Follows Every Garment
              </h1>
              <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed">
                From initial client tech pack intake to final polybagging—discover how Veave ensures strict departmental handoffs, mandatory physical checkpoints, and cryptographic photographic proof at every stage.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Stages List */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-12">
            {WORKFLOW_STAGES.map((stage, idx) => (
              <div
                key={stage.slug}
                className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row gap-8 items-center"
              >
                <div className="flex-1 flex flex-col gap-4 items-start">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#0e6bfd] text-white text-sm font-bold shadow-xs">
                      {stage.stepNumber}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#587080]">
                      {stage.department}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                    {stage.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#587080] leading-relaxed">
                    {stage.fullDesc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#587080] pt-2 border-t border-[#e3eaef] w-full">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5 text-[#0e6bfd]" />
                      Typical: <strong>{stage.typicalTime}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Camera className="size-3.5 text-[#0e6bfd]" />
                      Required Evidence: <strong>{stage.requiredPhotos} Photos</strong>
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 w-full">
                    {stage.checkpoints.slice(0, 3).map((cp, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-[#16303f]">
                        <CheckCircle2 className="size-3.5 text-[#257a55] shrink-0 mt-0.5" />
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/workflows/${stage.slug}`}
                    className="inline-flex items-center gap-2 rounded-[7px] bg-[#0e6bfd] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs mt-3"
                  >
                    <span>Inspect Stage Details &amp; Checkpoints</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div className="w-full lg:w-[420px] shrink-0">
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-[#e3eaef] bg-slate-100 shadow-xs">
                    <Image
                      src={stage.screenshot}
                      alt={stage.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#0f2330] text-white">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to configure your garment assembly line?
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Customize sequential department stages and mandatory photo evidence rules tailored to your factory.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all"
              >
                Schedule Factory Walkthrough
              </Link>
              <Link
                href="/pricing"
                className="rounded-[7px] border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Explore Pricing Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

