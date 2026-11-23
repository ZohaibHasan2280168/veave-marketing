"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus, ArrowRight, MessageSquare, HelpCircle } from "lucide-react";
import { VEAVE_FAQS } from "@/data/veaveData";

export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const categories = [
    "All",
    "Getting started",
    "Shopfloor & Workflows",
    "Quality Control (QC)",
    "Multi-Tenancy & Security",
  ];

  const filteredFaqs =
    selectedCategory === "All"
      ? VEAVE_FAQS
      : VEAVE_FAQS.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="relative overflow-hidden px-4 sm:px-6 py-16 lg:py-24 bg-[#122a38] text-white border-t border-white/10">
      {/* Ambient Theme Blue Glow Orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#0e6bfd]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#0e6bfd]/15 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl z-10">
        <div className="grid items-start gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          
          {/* Left Column: Sticky Heading & Filter Pills */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
              A FEW GOOD QUESTIONS
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
              Before you make the move.
            </h2>

            <p className="text-sm sm:text-base text-[#c6d6e1] leading-relaxed">
              Everything you need to know about switching your production operations to Veave.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0e6bfd] text-white shadow-xs"
                      : "bg-white text-[#16303f] hover:bg-slate-100 shadow-2xs"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Direct Factory Support Box */}
            <div className="mt-4 rounded-xl bg-white p-5 flex flex-col gap-3 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-[#16303f]">
                <MessageSquare className="size-4 text-[#0e6bfd]" />
                <span>Have a factory-specific question?</span>
              </div>
              <p className="text-xs text-[#587080] leading-relaxed">
                Our production engineering specialists are available to walk through your factory layout, CAD specifications, or line balancing setup.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e6bfd] hover:underline pt-1"
              >
                <span>Talk with a factory specialist</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion List (Crisp White Cards) */}
          <div className="flex flex-col gap-3.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-white transition-all overflow-hidden shadow-md hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="group flex w-full items-start justify-between gap-4 p-5 text-left focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-[#0e6bfd] shrink-0 mt-0.5">
                        {String(faq.id).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#587080] block mb-0.5">
                          {faq.category}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#16303f] group-hover:text-[#0e6bfd] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </div>
                    </div>

                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#f3f6f8] text-[#587080] group-hover:bg-[#0e6bfd] group-hover:text-white transition-colors">
                      {isOpen ? (
                        <Minus className="size-3.5 text-[#0e6bfd] group-hover:text-white" />
                      ) : (
                        <Plus className="size-3.5" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="border-t border-[#e3eaef] px-5 pt-3 pb-5 text-xs sm:text-sm text-[#587080] leading-relaxed bg-[#f8fafc]">
                          <p className="pl-6">{faq.answer}</p>
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
