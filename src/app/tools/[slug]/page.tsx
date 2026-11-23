import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FREE_TOOLS } from "@/data/veaveData";
import CalculatorClient from "./CalculatorClient";

export function generateStaticParams() {
  return FREE_TOOLS.map((t) => ({ slug: t.slug }));
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = FREE_TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

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
              <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-[#9cc4ff]">{tool.category}</span>
              <ChevronRight className="size-3.5" />
              <span className="text-white">{tool.title}</span>
            </div>

            <div className="max-w-3xl flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0e6bfd]/20 border border-[#0e6bfd]/30 px-3.5 py-1 text-xs font-bold text-[#9cc4ff]">
                Free Garment Tool &bull; {tool.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                {tool.title}
              </h1>

              <p className="text-base sm:text-lg text-[#c6d6e1] leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>
        </section>

        {/* Live Interactive Calculator Section */}
        <section className="py-20 px-4 sm:px-6 bg-[#f3f6f8] border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-5xl">
            <CalculatorClient tool={tool} />
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 px-4 sm:px-6 bg-white border-b border-[#e3eaef]">
          <div className="mx-auto w-full max-w-7xl flex items-center justify-between text-xs font-semibold">
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-[#587080] hover:text-[#0e6bfd] transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to All Free Tools</span>
            </Link>
            <Link
              href="/signup"
              className="text-[#0e6bfd] hover:underline"
            >
              Automate this on your factory lines with Veave &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
