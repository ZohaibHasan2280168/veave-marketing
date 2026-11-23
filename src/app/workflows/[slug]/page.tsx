import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Camera,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WORKFLOW_STAGES, WorkflowStage } from "@/data/veaveData";

export function generateStaticParams() {
  return WORKFLOW_STAGES.map((s) => ({ slug: s.slug }));
}

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stage = WORKFLOW_STAGES.find((s) => s.slug === slug);

  if (!stage) {
    notFound();
  }

  const currentIndex = WORKFLOW_STAGES.findIndex((s) => s.slug === slug);
  const prevStage = currentIndex > 0 ? WORKFLOW_STAGES[currentIndex - 1] : null;
  const nextStage =
    currentIndex < WORKFLOW_STAGES.length - 1
      ? WORKFLOW_STAGES[currentIndex + 1]
      : null;

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
              <Link href="/workflows" className="hover:text-white transition-colors">Workflows</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-white">Stage {stage.stepNumber}: {stage.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3.5 py-1 text-xs font-bold text-[#9cc4ff]">
                  Stage {stage.stepNumber} &bull; {stage.department}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  {stage.title}
                </h1>

                <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed">
                  {stage.fullDesc}
                </p>

                <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-white/10">
                  {stage.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{m.value}</span>
                      <span className="text-xs text-[#8fa9bb]">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/15 bg-[#0f2330] p-3 shadow-2xl overflow-hidden">
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                    <Image
                      src={stage.screenshot}
                      alt={stage.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  <div className="p-3 text-xs text-[#c6d6e1] flex items-center justify-between">
                    <span className="font-semibold text-white">Veave Assembly Stage {stage.stepNumber}</span>
                    <span className="text-emerald-400 font-semibold">{stage.requiredPhotos} Photo Proofs Required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Checkpoints & Benefits */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Checkpoints */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  MANDATORY STAGE CHECKPOINTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  Actions Required Before Handoff
                </h2>
                <p className="text-sm text-[#587080]">
                  Supervisors must execute and verify each physical checkpoint in their mobile queue before the garment bundle can advance.
                </p>
              </div>

              <div className="space-y-4">
                {stage.checkpoints.map((cp, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-5 rounded-xl border border-[#e3eaef] bg-white shadow-xs">
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#0e6bfd]/10 text-[#0e6bfd] font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#16303f]">{cp}</span>
                      <span className="text-xs text-[#587080] mt-0.5">
                        Logged in supervisor mobile app with operator timestamp
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stage Benefits & Specs */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-lg font-bold text-[#16303f]">Stage Execution Parameters</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Owning Department:</span>
                    <strong className="text-[#16303f] font-semibold">{stage.department}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Typical Batch Cycle:</span>
                    <strong className="text-[#16303f] font-semibold">{stage.typicalTime}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Required Photo Evidence:</span>
                    <strong className="text-[#0e6bfd] font-semibold">{stage.requiredPhotos} Signed Images</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#587080]">QC Verification Gate:</span>
                    <strong className="text-emerald-600 font-semibold">Mandatory Sign-off</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e3eaef]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#16303f] mb-3">
                    Factory Quality Impact
                  </h4>
                  <div className="space-y-2">
                    {stage.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#587080]">
                        <CheckCircle2 className="size-4 text-[#257a55] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#0e6bfd]/20 bg-[#0e6bfd]/5 p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0e6bfd]">
                  <ShieldCheck className="size-4" />
                  <span>TAMPER-PROOF AUDIT PROOF</span>
                </div>
                <p className="text-xs text-[#587080] leading-relaxed">
                  Every photo submitted at this stage is signed with SHA-256 cryptographic hashes and stored on Cloudinary CDN, guaranteeing unalterable proof of workmanship.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Previous / Next Stage Navigation */}
        <section className="py-12 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
            {prevStage ? (
              <Link
                href={`/workflows/${prevStage.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#587080] hover:text-[#0e6bfd] transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span>Previous: Stage {prevStage.stepNumber} - {prevStage.title}</span>
              </Link>
            ) : <div />}

            <Link
              href="/workflows"
              className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd] hover:underline"
            >
              All 6 Workflows
            </Link>

            {nextStage ? (
              <Link
                href={`/workflows/${nextStage.slug}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#16303f] hover:text-[#0e6bfd] transition-colors"
              >
                <span>Next: Stage {nextStage.stepNumber} - {nextStage.title}</span>
                <ArrowRight className="size-4" />
              </Link>
            ) : <div />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
