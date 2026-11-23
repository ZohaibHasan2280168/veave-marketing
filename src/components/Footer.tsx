"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { label: "Order Intake & BOM", href: "/features/order-intake" },
    { label: "Production Workflows", href: "/workflows" },
    { label: "Independent QC & Proof", href: "/features/photo-evidence" },
    { label: "Role Workspaces", href: "/roles/admin" },
    { label: "Integrations", href: "/integrations" },
  ];

  const resourceLinks = [
    { label: "Free Factory Calculators", href: "/tools" },
    { label: "Pricing Plans", href: "/pricing" },
    { label: "Client Order Tracking", href: "/signup" },
    { label: "Documentation / Knowledge Base", href: "/contact" },
  ];

  const companyLinks = [
    { label: "About Veave", href: "/contact" },
    { label: "Schedule a Walkthrough", href: "/contact" },
    { label: "Contact Support", href: "mailto:info@veave.pk" },
    { label: "Security & Data Privacy", href: "/features/subdomain-isolation" },
  ];

  return (
    <footer id="site-footer" className="bg-[#0F2439] text-slate-300 border-t border-slate-800/80">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        
        {/* Main 4-Column Consolidated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Column 1 — Brand & Direct Contact (Wider Span: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <Link href="/" className="inline-block" aria-label="Veave home">
              <Image
                src="/assets/veave/brand/veave-lockup-reversed.svg"
                alt="Veave The Apparel Manufacturing & Factory OS"
                width={150}
                height={32}
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm mt-1">
              The Production Management System for Garment Factories &amp; Ateliers. Track every order from intake to dispatch with verified QC.
            </p>

            {/* Clean Contact Details */}
            <div className="flex flex-col gap-2.5 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-[#0e6bfd] shrink-0" />
                <a href="mailto:info@veave.pk" className="hover:text-white transition-colors">
                  info@veave.pk
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-[#0e6bfd] shrink-0" />
                <a href="tel:+14074098383" className="hover:text-white transition-colors">
                  (407) 409-8383
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 — Product (2 or 3 cols) */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-4">
            <h3 className="font-semibold text-white text-sm tracking-tight">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources & Tools (2 or 3 cols) */}
          <div className="lg:col-span-3 sm:col-span-1 flex flex-col gap-4">
            <h3 className="font-semibold text-white text-sm tracking-tight">
              Resources &amp; Tools
            </h3>
            <ul className="space-y-3 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company & Support (2 cols) */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-4">
            <h3 className="font-semibold text-white text-sm tracking-tight">
              Company &amp; Support
            </h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 mt-10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>&copy; 2026 Veave Technologies LLC. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <Link href="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
