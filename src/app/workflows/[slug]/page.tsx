import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WORKFLOW_STAGES } from "@/data/veaveData";

export function generateStaticParams() {
  return WORKFLOW_STAGES.map((s) => ({ slug: s.slug }));
}

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stage = WORKFLOW_STAGES.find((s) => s.slug === slug) || WORKFLOW_STAGES[0];

  if (!stage) {
    notFound();
  }

  const currentIndex = WORKFLOW_STAGES.findIndex((s) => s.slug === stage.slug);
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
        <section className="bg-[#122a38] text-white py-16 border-b border-white/[0.08]">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#8fa9bb] mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <Link href="/workflows" className="hover:text-white transition-colors">
                How it works
              </Link>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <span className="text-white">
                Step {stage.stepNumber}: {stage.title}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-2 rounded-md bg-[#0d1f2b] border border-white/[0.1] px-3 py-1 font-mono text-xs text-[#9cc4ff]">
                  Step {stage.stepNumber} · {stage.department}
                </span>

                <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-white leading-[1.12]">
                  {stage.title}
                </h1>

                <p className="text-base text-[#c6d6e1] leading-relaxed">{stage.fullDesc}</p>

                <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-white/[0.08]">
                  {stage.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-lg font-medium text-white tabular-nums">{m.value}</span>
                      <span className="text-xs text-[#8fa9bb]">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl border border-white/[0.1] bg-[#0d1f2b] p-3">
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-white border border-white/[0.08]">
                    <Image
                      src={stage.screenshot}
                      alt={stage.title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Capabilities & Benefits */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs text-[#0e6bfd]">Stage capabilities</span>
                <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f] mt-1">
                  What happens in Step {stage.stepNumber}
                </h2>
              </div>

              <div className="space-y-3">
                {stage.checkpoints.map((cp, idx) => (
                  <div
                    key={cp}
                    className="flex items-start gap-3.5 p-5 rounded-xl border border-[#e3eaef] bg-white"
                  >
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#f3f6f8] text-[#0e6bfd] font-mono text-xs font-medium tabular-nums shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-[#16303f]">{cp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="rounded-xl border border-[#e3eaef] bg-white p-6 flex flex-col gap-4">
                <h3 className="text-base font-medium text-[#16303f]">Operational benefits</h3>
                <div className="space-y-2.5">
                  {stage.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2.5 text-xs text-[#587080]">
                      <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#e3eaef] bg-white p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#16303f]">
                  <ShieldCheck className="size-4 stroke-[1.5] text-[#0e6bfd]" />
                  <span>Connected to Cloudflare R2 &amp; Paddle Billing</span>
                </div>
                <p className="text-xs text-[#587080] leading-relaxed">
                  All records, documents, and attachments in this stage are scoped to your tenant
                  subdomain and protected by role-based access control.
                </p>
                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] text-white text-xs font-medium hover:bg-[#0b5ad9] transition-colors mt-1"
                >
                  <span>Start 14-day free trial</span>
                  <ArrowRight className="size-3.5 stroke-[1.5]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Previous / Next Navigation */}
        <section className="py-8 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevStage ? (
              <Link
                href={`/workflows/${prevStage.slug}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#587080] hover:text-[#0e6bfd]"
              >
                <ArrowLeft className="size-3.5 stroke-[1.5]" />
                <span>
                  Previous: Step {prevStage.stepNumber} · {prevStage.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link href="/workflows" className="font-mono text-xs text-[#0e6bfd] hover:underline">
              All 4 lifecycle stages
            </Link>

            {nextStage ? (
              <Link
                href={`/workflows/${nextStage.slug}`}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#16303f] hover:text-[#0e6bfd]"
              >
                <span>
                  Next: Step {nextStage.stepNumber} · {nextStage.title}
                </span>
                <ArrowRight className="size-3.5 stroke-[1.5]" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
