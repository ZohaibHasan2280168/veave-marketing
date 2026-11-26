import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WORKFLOW_STAGES } from "@/data/veaveData";

export default function WorkflowsIndexPage() {
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
              <span className="text-white">End-to-end lifecycle</span>
            </div>

            <div className="max-w-3xl flex flex-col items-start gap-3">
              <span className="font-mono text-xs text-[#9cc4ff]">Complete business lifecycle</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-white leading-[1.12]">
                One record follows every customer from storefront inquiry to payment
              </h1>
              <p className="text-base text-[#c6d6e1] leading-relaxed">
                See how Veave connects your public website, buyer CRM, Google Meet appointments,
                sales opportunities, order pipeline, and financial ledger into one continuous flow.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Stages List */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-8">
            {WORKFLOW_STAGES.map((stage) => (
              <div
                key={stage.slug}
                className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center"
              >
                <div className="flex-1 flex flex-col gap-4 items-start">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-[#0e6bfd] text-white font-mono text-xs font-medium tabular-nums">
                      {stage.stepNumber}
                    </span>
                    <span className="font-mono text-xs text-[#587080]">{stage.department}</span>
                  </div>

                  <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f]">
                    {stage.title}
                  </h2>

                  <p className="text-sm text-[#587080] leading-relaxed">{stage.fullDesc}</p>

                  <div className="space-y-2 pt-2 border-t border-[#e3eaef] w-full">
                    {stage.checkpoints.map((cp) => (
                      <div key={cp} className="flex items-start gap-2.5 text-xs text-[#16303f]">
                        <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/workflows/${stage.slug}`}
                      className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#0e6bfd] px-4 text-xs font-medium text-white hover:bg-[#0b5ad9] transition-colors"
                    >
                      <span>Inspect stage details</span>
                      <ArrowRight className="size-3.5 stroke-[1.5]" />
                    </Link>
                    <Link
                      href="/signup"
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dbe4ea] bg-white px-4 text-xs font-medium text-[#16303f] hover:bg-[#f3f6f8] transition-colors"
                    >
                      <span>Start 14-day free trial</span>
                    </Link>
                  </div>
                </div>

                <div className="w-full lg:w-[440px] shrink-0">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#e3eaef] bg-[#f3f6f8]">
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
        <section className="py-16 px-4 sm:px-6 bg-[#122a38] text-white border-t border-white/[0.08]">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-5">
            <h2 className="text-2xl sm:text-3xl font-medium">
              Ready to run your entire business on one platform?
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Launch your subdomain workspace in minutes and start your 14-day trial via Paddle
              Billing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center rounded-lg bg-[#0e6bfd] px-5 text-sm font-medium text-white hover:bg-[#0b5ad9] transition-colors"
              >
                Start 14-day free trial
              </Link>
              <Link
                href="/login"
                className="inline-flex h-10 items-center rounded-lg border border-white/[0.14] bg-[#1a3546] px-5 text-sm font-medium text-white hover:bg-[#214156] transition-colors"
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
