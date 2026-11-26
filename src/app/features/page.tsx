import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Globe,
  Link2,
  Calculator,
  Star,
  Filter,
  Users,
  Briefcase,
  Calendar,
  ClipboardList,
  LayoutGrid,
  CheckSquare,
  ShieldCheck,
  DollarSign,
  Sliders,
  MessageSquare,
  HardDrive,
  Smartphone,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLATFORM_PILLARS } from "@/data/veaveData";

const ICON_MAP: Record<string, typeof Globe> = {
  Globe,
  Link2,
  Calculator,
  Star,
  Filter,
  Users,
  Briefcase,
  Calendar,
  ClipboardList,
  LayoutGrid,
  CheckSquare,
  ShieldCheck,
  DollarSign,
  Sliders,
  MessageSquare,
  HardDrive,
  Smartphone,
  Lock,
};

export default function FeaturesIndexPage() {
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
              <span className="text-white">Platform modules</span>
            </div>

            <div className="max-w-3xl flex flex-col items-start gap-3">
              <span className="font-mono text-xs text-[#9cc4ff]">Complete business OS</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-white leading-[1.12]">
                Eighteen connected modules for storefront, CRM, operations and books
              </h1>
              <p className="text-base text-[#c6d6e1] leading-relaxed">
                Every module reads from the same workspace database under subdomain-isolated
                multi-tenancy—from public website and lead capture to Google Meet scheduling, order
                pipelines, financial records, and Paddle Billing.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Pillars & 18 Modules */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8]">
          <div className="mx-auto w-full max-w-7xl flex flex-col gap-16">
            {PLATFORM_PILLARS.map((pillar) => (
              <div key={pillar.number} className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e3eaef] pb-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-[#0e6bfd]">Pillar {pillar.number}</span>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.015em] text-[#16303f]">
                      {pillar.title}
                    </h2>
                    <p className="text-sm text-[#587080] max-w-2xl">{pillar.description}</p>
                  </div>
                  <span className="font-mono text-xs text-[#587080] tabular-nums">
                    {pillar.tools.length} modules
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pillar.tools.map((tool) => {
                    const Icon = ICON_MAP[tool.iconName] || Globe;
                    return (
                      <Link
                        key={tool.slug}
                        href={`/features/${tool.slug}`}
                        className="group flex flex-col justify-between rounded-xl border border-[#e3eaef] bg-white p-6 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-[#f3f6f8] border border-[#e3eaef] text-[#587080] group-hover:text-[#0e6bfd] transition-colors">
                              <Icon className="size-[18px] stroke-[1.5]" />
                            </div>
                            <span className="font-mono text-[11px] text-[#587080]">
                              {tool.targetRole}
                            </span>
                          </div>

                          <h3 className="text-base font-medium text-[#16303f] group-hover:text-[#0e6bfd] transition-colors">
                            {tool.title}
                          </h3>

                          <p className="text-xs sm:text-[13px] text-[#587080] leading-relaxed">
                            {tool.desc}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#e3eaef] flex items-center justify-between text-xs font-medium text-[#16303f] group-hover:text-[#0e6bfd]">
                          <span>Inspect module</span>
                          <ArrowRight className="size-3.5 stroke-[1.5]" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 bg-[#122a38] text-white border-t border-white/[0.08]">
          <div className="mx-auto w-full max-w-4xl text-center flex flex-col items-center gap-5">
            <h2 className="text-2xl sm:text-3xl font-medium">
              All 18 modules included in one multi-tenant workspace
            </h2>
            <p className="text-sm text-[#c6d6e1] max-w-xl">
              Start your 14-day free trial via Paddle Billing ($0.00 due today) or sign in to an
              existing workspace.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex h-10 items-center rounded-lg bg-[#0e6bfd] px-5 text-sm font-medium text-white hover:bg-[#0b5ad9] transition-colors"
              >
                Start 14-day free trial
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-10 items-center rounded-lg border border-white/[0.14] bg-[#1a3546] px-5 text-sm font-medium text-white hover:bg-[#214156] transition-colors"
              >
                Compare pricing plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
