"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "/features" },
  { label: "How it works", href: "/workflows" },
  { label: "Pricing", href: "/pricing" },
  { label: "Role workspaces", href: "/roles/admin" },
  { label: "Free tools", href: "/tools" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e3eaef] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left — Brand Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 py-2" aria-label="Veave home">
          <Image
            src="/assets/veave/brand/veave-lockup-primary.svg"
            alt="Veave"
            width={128}
            height={28}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center — Quiet Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-normal text-[#587080]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#16303f] transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — Quiet Log in text link + One primary button (unslop Rule 6) */}
        <div className="hidden lg:flex items-center gap-5">
          <Link
            href="/login"
            className="text-[14px] font-medium text-[#587080] hover:text-[#16303f] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#0e6bfd] hover:bg-[#0b5ad9] px-4 text-[14px] font-medium text-white transition-colors"
          >
            <span>Start free trial</span>
            <ArrowRight className="size-4 stroke-[1.5]" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/login"
            className="text-xs font-medium text-[#587080] hover:text-[#16303f]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-8 items-center justify-center rounded-lg bg-[#0e6bfd] px-3 text-xs font-medium text-white"
          >
            Start trial
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#587080] hover:bg-[#f3f6f8] hover:text-[#16303f]"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5 stroke-[1.5]" />
            ) : (
              <Menu className="size-5 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#e3eaef] bg-white px-4 pt-2 pb-5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 text-[14px] font-medium text-[#16303f] hover:text-[#0e6bfd] border-b border-[#f3f6f8] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-3 mt-1">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-[#16303f] bg-[#f3f6f8] rounded-lg transition-colors"
              >
                Log in to workspace
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium text-white bg-[#0e6bfd] hover:bg-[#0b5ad9] rounded-lg transition-colors"
              >
                Start 14-day free trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
