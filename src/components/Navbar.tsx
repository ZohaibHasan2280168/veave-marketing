"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Workflows", href: "/workflows" },
    { label: "Pricing", href: "/pricing" },
    { label: "Free Tools", href: "/tools" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 sm:h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Left — Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 py-2" aria-label="Veave home">
          <Image
            src="/assets/veave/brand/veave-lockup-primary.svg"
            alt="Veave The Apparel Manufacturing & Factory OS"
            width={132}
            height={30}
            className="h-7 sm:h-[30px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Center — 4 Core High-Intent Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[14px] font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-slate-900 transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right — Focused Conversion Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="text-[14px] font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors"
          >
            Book Demo
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0e6bfd] hover:bg-[#0b5ad9] px-5 py-2.5 text-[14px] font-semibold text-white shadow-xs hover:shadow transition-all active:scale-[0.98]"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-[#0e6bfd] px-3.5 py-1.5 text-xs font-semibold text-white"
          >
            Free Trial
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-slate-100 bg-white px-5 pt-3 pb-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-3 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 text-[15px] font-semibold text-slate-700 hover:text-[#0e6bfd] border-b border-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-2.5 pt-3 mt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 rounded-lg transition-colors"
                >
                  Book Demo
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#0e6bfd] hover:bg-[#0b5ad9] rounded-full shadow-xs transition-colors"
                >
                  Start Free Trial →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
