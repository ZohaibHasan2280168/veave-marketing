"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Lock, AlertCircle, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  resolveWorkspace,
  buildWorkspaceUrl,
  getDisplayRootDomain,
} from "@/lib/veaveApi";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resolved, setResolved] = useState<{
    type: "TENANT" | "SUPER_ADMIN";
    slug: string;
    name: string;
    email?: string;
    targetUrl: string;
  } | null>(null);

  const rootDomain = getDisplayRootDomain();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = identifier.trim();
    if (!clean) return;

    setLoading(true);
    setErrorMsg("");
    setResolved(null);

    try {
      const res = await resolveWorkspace(clean);
      const slug = res.slug || "alpha-tailors";
      const isSuperAdmin = res.type === "SUPER_ADMIN";
      const targetPath = isSuperAdmin
        ? "/super-admin-login"
        : `/login${res.email ? `?email=${encodeURIComponent(res.email)}` : ""}`;
      const targetUrl = buildWorkspaceUrl(slug, targetPath);

      setResolved({
        type: isSuperAdmin ? "SUPER_ADMIN" : "TENANT",
        slug,
        name: res.name || slug,
        email: res.email,
        targetUrl,
      });

      window.location.href = targetUrl;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not find a workspace matching that input.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLaunch = (slug: string, path = "/login") => {
    window.location.href = buildWorkspaceUrl(slug, path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6f8]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-14">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#f3f6f8] border border-[#e3eaef] px-2.5 py-1 font-mono text-xs text-[#587080] mb-4">
              <Lock className="size-3.5 stroke-[1.5] text-[#0e6bfd]" />
              <span>Subdomain-isolated sign-in</span>
            </div>

            <h1 className="text-2xl font-medium tracking-[-0.015em] text-[#16303f]">
              Log in to your Veave workspace
            </h1>
            <p className="text-xs text-[#587080] mt-1.5 leading-relaxed">
              Enter your work email or workspace subdomain and we will route you directly to your
              isolated company portal.
            </p>

            {errorMsg && (
              <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 flex items-start gap-2.5 text-xs text-rose-700">
                <AlertCircle className="size-4 stroke-[1.5] shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {resolved && (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 space-y-2 text-xs text-emerald-800">
                <div className="flex items-center gap-2 font-medium">
                  <Check className="size-4 stroke-[1.5] text-emerald-600" />
                  <span>Found {resolved.name}</span>
                </div>
                <div className="font-mono text-[11px] text-emerald-700">
                  Redirecting to {resolved.slug}.{rootDomain}...
                </div>
                <a
                  href={resolved.targetUrl}
                  className="inline-flex items-center gap-1 font-medium text-[#0e6bfd] hover:underline"
                >
                  <span>Click here if not redirected automatically</span>
                  <ArrowRight className="size-3 stroke-[1.5]" />
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="workspace-identifier"
                  className="block text-xs font-medium text-[#16303f] mb-1.5"
                >
                  Work email or workspace subdomain
                </label>
                <div className="flex items-center rounded-lg border border-[#e3eaef] bg-[#f8fafc] px-3 h-10 focus-within:border-[#0e6bfd] focus-within:bg-white transition-colors">
                  <Globe className="size-4 stroke-[1.5] text-[#587080] shrink-0 mr-2" />
                  <input
                    id="workspace-identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="you@company.com or your-company"
                    className="w-full bg-transparent text-sm text-[#16303f] focus:outline-hidden"
                  />
                </div>
                <span className="block font-mono text-[11px] text-[#587080] mt-1.5">
                  Format: {`{company}.${rootDomain}`}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? "Locating workspace..." : "Continue to workspace sign-in"}</span>
                <ArrowRight className="size-4 stroke-[1.5]" />
              </button>
            </form>

            {/* Quick Workspace Shortcuts */}
            <div className="mt-6 pt-5 border-t border-[#e3eaef] space-y-2.5">
              <div className="font-mono text-[11px] text-[#587080]">Direct portal access</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLaunch("alpha-tailors", "/login")}
                  className="h-9 px-3 rounded-lg border border-[#e3eaef] bg-[#f8fafc] hover:bg-[#eef2f5] text-xs font-medium text-[#16303f] text-left truncate cursor-pointer"
                >
                  alpha-tailors portal →
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLaunch("admin", "/super-admin-login")}
                  className="h-9 px-3 rounded-lg border border-[#e3eaef] bg-[#f8fafc] hover:bg-[#eef2f5] text-xs font-medium text-[#16303f] text-left truncate cursor-pointer"
                >
                  Super Admin console →
                </button>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#e3eaef] flex items-center justify-between text-xs">
              <span className="text-[#587080]">New to Veave?</span>
              <Link href="/signup" className="font-medium text-[#0e6bfd] hover:underline">
                Start 14-day free trial →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
