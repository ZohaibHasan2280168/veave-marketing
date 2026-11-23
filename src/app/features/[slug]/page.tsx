import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  Users,
  Settings,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLATFORM_PILLARS } from "@/data/veaveData";

export function generateStaticParams() {
  const allTools = PLATFORM_PILLARS.flatMap((p) => p.tools);
  return allTools.map((t) => ({ slug: t.slug }));
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let currentTool = null;
  let currentPillar = null;

  for (const pillar of PLATFORM_PILLARS) {
    const found = pillar.tools.find((t) => t.slug === slug);
    if (found) {
      currentTool = found;
      currentPillar = pillar;
      break;
    }
  }

  if (!currentTool || !currentPillar) {
    notFound();
  }

  const relatedTools = currentPillar.tools
    .filter((t) => t.slug !== slug)
    .slice(0, 3);

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
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-[#9cc4ff]">Pillar {currentPillar.number}: {currentPillar.title}</span>
              <ChevronRight className="size-3.5" />
              <span className="text-white">{currentTool.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 flex flex-col items-start gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3 py-1 text-xs font-bold text-[#9cc4ff]">
                    Pillar {currentPillar.number} Module
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                    <Users className="size-3 text-[#9cc4ff]" />
                    {currentTool.targetRole}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                  {currentTool.title}
                </h1>

                <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed max-w-2xl">
                  {currentTool.desc}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-[7px] bg-[#0e6bfd] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b5ad9] transition-all shadow-xs"
                  >
                    <span>Request Feature Walkthrough</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-[7px] border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    <span>Included in All Plans</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="size-32 sm:size-40 rounded-3xl bg-white/5 border border-white/15 p-6 flex items-center justify-center backdrop-blur-md shadow-2xl">
                  <Image
                    src={currentTool.icon}
                    alt={currentTool.title}
                    width={80}
                    height={80}
                    className="size-20 object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Capabilities & Specs */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Deep Capabilities */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
                  ENGINEERED SPECIFICATIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#16303f]">
                  How {currentTool.title} Operates
                </h2>
                <p className="text-sm text-[#587080]">
                  Deep integration with the centralized garment database ensures immediate synchronization across all departments.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl border border-[#e3eaef] bg-white shadow-xs flex items-start gap-3.5">
                  <CheckCircle2 className="size-5 text-[#257a55] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#16303f]">Real-Time Shopfloor Synchronization</h3>
                    <p className="text-xs text-[#587080] mt-1 leading-relaxed">
                      All state changes propagate via low-latency WebSockets directly to the factory floor plan, supervisor queues, and owner dashboard.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-[#e3eaef] bg-white shadow-xs flex items-start gap-3.5">
                  <CheckCircle2 className="size-5 text-[#257a55] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#16303f]">Immutable Audit Logging</h3>
                    <p className="text-xs text-[#587080] mt-1 leading-relaxed">
                      Every modification, photo upload, and checkpoint sign-off is logged with cryptographic hashes, operator IDs, and precise timestamps.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-[#e3eaef] bg-white shadow-xs flex items-start gap-3.5">
                  <CheckCircle2 className="size-5 text-[#257a55] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#16303f]">Role-Based Boundary Protection</h3>
                    <p className="text-xs text-[#587080] mt-1 leading-relaxed">
                      Secured by tenant company boundaries and role permissions—ensuring operators only execute approved departmental tasks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Technical Metadata Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-base font-bold text-[#16303f] border-b border-[#e3eaef] pb-3">
                  Module Architecture
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Pillar:</span>
                    <strong className="text-[#16303f] font-semibold">{currentPillar.title}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Primary Role:</span>
                    <strong className="text-[#0e6bfd] font-semibold">{currentTool.targetRole}</strong>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Multi-Tenant Isolation:</span>
                    <strong className="text-emerald-600 font-semibold">Subdomain Scoped</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#587080]">Cloud Storage:</span>
                    <strong className="text-[#16303f] font-semibold">Cloudinary Signed CDN</strong>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#16303f]">
                  Related {currentPillar.title} Tools
                </h3>
                <div className="space-y-2">
                  {relatedTools.map((rt) => (
                    <Link
                      key={rt.slug}
                      href={`/features/${rt.slug}`}
                      className="group flex items-center justify-between p-3 rounded-lg border border-[#e3eaef] hover:border-[#0e6bfd]/40 hover:bg-[#f8fafc] transition-all text-xs"
                    >
                      <span className="font-semibold text-[#16303f] group-hover:text-[#0e6bfd] transition-colors">
                        {rt.title}
                      </span>
                      <ArrowRight className="size-3 text-[#587080] group-hover:text-[#0e6bfd] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex items-center justify-between text-xs font-semibold">
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 text-[#587080] hover:text-[#0e6bfd] transition-colors"
            >
              &larr; Back to All 17 Tools
            </Link>
            <Link
              href="/pricing"
              className="text-[#0e6bfd] hover:underline"
            >
              View Factory Pricing Plans &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
