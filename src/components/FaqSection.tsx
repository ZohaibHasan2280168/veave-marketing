"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";
import { VEAVE_FAQS } from "@/data/veaveData";

const categories = [
  "All",
  "Getting started",
  "CRM & Storefront",
  "Operations & Roles",
  "Security & Billing",
];

export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const filteredFaqs =
    selectedCategory === "All"
      ? VEAVE_FAQS
      : VEAVE_FAQS.filter((f) => f.category === selectedCategory);

  return (
    <section id="faq" className="px-4 sm:px-6 py-16 lg:py-24 bg-white border-b border-[#e2e9ef]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-start gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Left Column: Heading & Animated Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24"
          >
            <span className="font-mono text-xs text-[#0e6bfd]">Common questions</span>

            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#132938] leading-[1.15]">
              Before you launch your workspace
            </h2>

            <p className="text-sm text-[#556d7d] leading-relaxed">
              Straight answers on onboarding, CRM and storefront features, role permissions,
              Cloudflare R2 document storage, and Paddle subscription billing.
            </p>

            {/* Category Filter Buttons with layoutId Spring Pill */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isSelected ? "text-white" : "bg-[#f4f7fa] text-[#556d7d] hover:text-[#132938]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="faqCategoryPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-[#0e2230]"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Direct Action Card */}
            <div className="mt-4 rounded-xl border border-[#e2e9ef] bg-[#f4f7fa] p-5 flex flex-col gap-2.5">
              <div className="text-xs font-semibold text-[#132938]">
                Ready to set up your company workspace?
              </div>
              <p className="text-xs text-[#556d7d] leading-relaxed">
                Complete self-serve onboarding in 4 steps and start your 14-day trial with $0.00 due
                today.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0e6bfd] hover:underline"
                >
                  <span>Start 14-day trial</span>
                  <ArrowRight className="size-3.5 stroke-[1.5]" />
                </Link>
                <span className="text-[#cbd5e1]">·</span>
                <Link
                  href="/login"
                  className="text-xs font-medium text-[#556d7d] hover:text-[#132938]"
                >
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Animated Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-colors overflow-hidden ${
                    isOpen
                      ? "border-[#0e6bfd]/35 bg-white shadow-[0_8px_24px_-12px_rgba(14,107,253,0.14)]"
                      : "border-[#e2e9ef] bg-white hover:border-[#cbd5e1]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left cursor-pointer transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-semibold text-[#0e6bfd] tabular-nums shrink-0 mt-0.5">
                        {String(faq.id).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="font-mono text-[11px] text-[#556d7d] block mb-0.5">
                          {faq.category}
                        </span>
                        <span className="text-[15px] font-medium text-[#132938] leading-snug">
                          {faq.question}
                        </span>
                      </div>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isOpen
                          ? "bg-[#0e6bfd] text-white"
                          : "bg-[#f4f7fa] text-[#556d7d]"
                      }`}
                    >
                      <Plus className="size-3.5 stroke-[1.75]" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#edf2f7] px-5 pt-3.5 pb-5 text-xs sm:text-sm text-[#556d7d] leading-relaxed bg-[#f8fafc]">
                          <p className="pl-7">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
