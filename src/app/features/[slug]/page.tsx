import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Check,
  Users,
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

  // Fallback for legacy bookmark slugs
  if (!currentTool) {
    currentPillar = PLATFORM_PILLARS[0];
    currentTool = PLATFORM_PILLARS[0].tools[0];
  }

  if (!currentTool || !currentPillar) {
    notFound();
  }

  const relatedTools = currentPillar.tools
    .filter((t) => t.slug !== currentTool.slug)
    .slice(0, 3);

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
              <Link href="/features" className="hover:text-white transition-colors">
                Platform modules
              </Link>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <span className="text-[#9cc4ff]">
                Pillar {currentPillar.number}: {currentPillar.title}
              </span>
              <ChevronRight className="size-3.5 stroke-[1.5]" />
              <span className="text-white">{currentTool.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex flex-col items-start gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-[#0d1f2b] border border-white/[0.1] px-2.5 py-1 font-mono text-xs text-[#9cc4ff]">
                    Pillar {currentPillar.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.08] px-2.5 py-1 font-mono text-xs text-white">
                    <Users className="size-3.5 stroke-[1.5] text-[#9cc4ff]" />
                    {currentTool.targetRole}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-white leading-[1.12]">
                  {currentTool.title}
                </h1>

                <p className="text-base text-[#c6d6e1] leading-relaxed">{currentTool.desc}</p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/signup"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0e6bfd] px-5 text-sm font-medium text-white hover:bg-[#0b5ad9] transition-colors"
                  >
                    <span>Start 14-day free trial</span>
                    <ArrowRight className="size-4 stroke-[1.5]" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.14] bg-[#1a3546] px-5 text-sm font-medium text-white hover:bg-[#214156] transition-colors"
                  >
                    <span>Compare plans</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-xl border border-white/[0.1] bg-[#0d1f2b] p-3">
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-white border border-white/[0.08]">
                    <Image
                      src={currentTool.screenshot || "/assets/veave/admin/admin_dashboard.png"}
                      alt={currentTool.title}
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

        {/* Feature Capabilities & Architecture */}
        <section className="py-16 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <span className="font-mono text-xs text-[#0e6bfd]">Operational design</span>
                <h2 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f] mt-1">
                  How {currentTool.title} works inside Veave
                </h2>
                <p className="text-sm text-[#587080] mt-1">
                  Shared data across CRM, storefront, operations, and financial records means zero
                  duplicate entry.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-5 rounded-xl border border-[#e3eaef] bg-white flex items-start gap-3">
                  <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#16303f]">
                      Unified workspace database &amp; real-time sync
                    </h3>
                    <p className="text-xs text-[#587080] mt-1 leading-relaxed">
                      Every record update propagates immediately across the admin dashboard,
                      visual floor plan, and role workspaces via Socket.IO.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-[#e3eaef] bg-white flex items-start gap-3">
                  <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#16303f]">
                      12-module permission matrix &amp; role presets
                    </h3>
                    <p className="text-xs text-[#587080] mt-1 leading-relaxed">
                      Grant or restrict access to this module per staff member using 7 built-in role
                      presets or custom module permissions.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-[#e3eaef] bg-white flex items-start gap-3">
                  <Check className="size-4 stroke-[1.5] text-[#16a34a] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-[#16303f]">
                      Subdomain isolation &amp; Cloudflare R2 storage
                    </h3>
                    <p className="text-xs text-[#587080] mt-1 leading-relaxed">
                      Scoped strictly by tenant company ID at the middleware layer, with all files
                      and documents stored in isolated Cloudflare R2 buckets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="rounded-xl border border-[#e3eaef] bg-white p-6 flex flex-col gap-4">
                <h3 className="text-sm font-medium text-[#16303f] border-b border-[#e3eaef] pb-3">
                  Module summary
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Pillar</span>
                    <span className="text-[#16303f] font-medium">{currentPillar.title}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Primary roles</span>
                    <span className="text-[#0e6bfd] font-medium">{currentTool.targetRole}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#e3eaef]">
                    <span className="text-[#587080]">Tenant isolation</span>
                    <span className="text-[#16a34a] font-medium">Subdomain scoped</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#587080]">Object storage</span>
                    <span className="text-[#16303f] font-medium">Cloudflare R2 Vault</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#e3eaef] bg-white p-6 flex flex-col gap-3">
                <h3 className="text-xs font-medium text-[#587080]">
                  Other modules in {currentPillar.title}
                </h3>
                <div className="space-y-2">
                  {relatedTools.map((rt) => (
                    <Link
                      key={rt.slug}
                      href={`/features/${rt.slug}`}
                      className="group flex items-center justify-between p-3 rounded-lg border border-[#e3eaef] hover:bg-[#f3f6f8] transition-colors text-xs"
                    >
                      <span className="font-medium text-[#16303f] group-hover:text-[#0e6bfd]">
                        {rt.title}
                      </span>
                      <ArrowRight className="size-3.5 stroke-[1.5] text-[#587080] group-hover:text-[#0e6bfd]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
