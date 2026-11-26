"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Globe } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { label: "Storefront & Website Builder", href: "/features/visual-website-builder" },
    { label: "Buyer CRM & Opportunities", href: "/features/opportunities-proposals" },
    { label: "Google Meet & Reviews Sync", href: "/features/google-meet-appointments" },
    { label: "Orders & Visual Floor Plan", href: "/features/visual-floor-plan" },
    { label: "Financial Records & Role Matrix", href: "/features/financial-records-ledger" },
    { label: "Cloudflare R2 Document Vault", href: "/features/cloudflare-r2-vault" },
  ];

  const workspaceLinks = [
    { label: "Start 14-day free trial", href: "/signup" },
    { label: "Log in to workspace", href: "/login" },
    { label: "Pricing & Paddle plans", href: "/pricing" },
    { label: "Workspace Admin console", href: "/roles/admin" },
    { label: "Operations & Dept Lead view", href: "/roles/dept-head" },
    { label: "Quality verification queue", href: "/roles/qc" },
  ];

  const resourceLinks = [
    { label: "End-to-end lifecycle", href: "/workflows" },
    { label: "Integrations & architecture", href: "/integrations" },
    { label: "Free production calculators", href: "/tools" },
    { label: "Contact & support", href: "/contact" },
  ];

  return (
    <footer id="site-footer" className="bg-[#0f2330] text-[#c6d6e1] border-t border-white/[0.08]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1 — Brand & Signature */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <Link href="/" className="inline-block" aria-label="Veave home">
              <Image
                src="/assets/veave/brand/veave-lockup-reversed.svg"
                alt="Veave"
                width={140}
                height={30}
                className="h-7 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-[#8fa9bb] leading-relaxed max-w-sm">
              The complete multi-tenant CRM, storefront website builder, order pipeline, and
              financial ledger for modern manufacturing businesses and workshops.
            </p>

            <div className="inline-flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#122a38] px-2.5 py-1 font-mono text-[11px] text-[#c6d6e1]">
              <span className="size-1.5 rounded-full bg-[#4cc38a]" />
              <span>veave.systemic.pk · Multi-tenant cloud</span>
            </div>

            <div className="flex flex-col gap-2 pt-1 text-xs text-[#8fa9bb]">
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 stroke-[1.5] text-[#9cc4ff] shrink-0" />
                <a href="mailto:info@veave.pk" className="hover:text-white transition-colors">
                  info@veave.pk
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="size-3.5 stroke-[1.5] text-[#9cc4ff] shrink-0" />
                <span>Subdomain &amp; custom domain isolation</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Platform Modules */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="font-medium text-white text-xs">Platform modules</h3>
            <ul className="space-y-2.5 text-xs">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#8fa9bb] hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Onboarding & Access */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="font-medium text-white text-xs">Onboarding &amp; workspaces</h3>
            <ul className="space-y-2.5 text-xs">
              {workspaceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#8fa9bb] hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Resources */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h3 className="font-medium text-white text-xs">Resources</h3>
            <ul className="space-y-2.5 text-xs">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#8fa9bb] hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 mt-10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#8fa9bb] gap-4">
          <p>&copy; 2026 Veave Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hover:text-white transition-colors">
              Workspace login
            </Link>
            <span>·</span>
            <Link href="/signup" className="hover:text-white transition-colors">
              Start free trial
            </Link>
            <span>·</span>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Paddle Billing terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
