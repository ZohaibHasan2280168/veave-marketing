"use client";

import Link from "next/link";
import { ArrowRight, Layers, Camera, QrCode, FileSpreadsheet, MessageSquare, Database } from "lucide-react";
import { motion } from "framer-motion";

interface PartnerItem {
  name: string;
  category: string;
  badge: string;
}

const partners: PartnerItem[] = [
  { name: "Cloudinary", category: "Signed Proofs", badge: "CDN Archive" },
  { name: "Industrial CAD", category: "Design & CAD", badge: "DXF & STEP" },
  { name: "Lectra Modaris", category: "Pattern Grading", badge: "CAD Grader" },
  { name: "Optitex", category: "Marker Layout", badge: "Nesting 2D/3D" },
  { name: "CLO 3D", category: "Virtual Sampling", badge: "Tech Pack 3D" },
  { name: "Zebra Tech", category: "Shopfloor Barcodes", badge: "TC5X Scanner" },
  { name: "Honeywell", category: "Industrial Hardware", badge: "QR Travelers" },
  { name: "QuickBooks", category: "Factory Accounting", badge: "GL Sync" },
  { name: "Xero", category: "Cost Accounting", badge: "Job Costing" },
  { name: "WhatsApp Cloud", category: "Client Milestones", badge: "API Alerts" },
  { name: "Telegram Bot", category: "Executive Briefings", badge: "Daily Summary" },
  { name: "Shopify B2B", category: "Wholesale Feeds", badge: "B2B Orders" },
];

export default function EcosystemMarquee() {
  return (
    <section className="relative px-4 sm:px-6 py-14 bg-white border-b border-[#e3eaef]">
      <div className="mx-auto w-full max-w-7xl flex flex-col items-center gap-7">
        
        {/* Eyebrow Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl"
        >
          <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#587080] leading-relaxed block">
            WORKS WITH THE INDUSTRIAL CAD PATTERNS, CLOUD STORAGE, MESSAGING, HARDWARE SCANNERS &amp; ENTERPRISE TOOLS YOUR FACTORY ALREADY USES
          </span>
        </motion.div>

        {/* Integration Grid with Crisp Inset Borders */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          <ul className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px overflow-hidden rounded-xl border border-[#e3eaef] bg-[#e3eaef] shadow-xs">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="group flex flex-col h-24 sm:h-28 items-center justify-center gap-1.5 bg-white px-3 hover:bg-[#f3f6f8] transition-colors relative text-center"
              >
                <span className="text-sm font-bold text-[#16303f] tracking-tight group-hover:text-[#0e6bfd] transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0e6bfd] bg-[#0e6bfd]/10 px-2 py-0.5 rounded-full">
                  {partner.badge}
                </span>
                <span className="text-[11px] text-[#587080]">
                  {partner.category}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sub-label & Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#587080]"
        >
          <span>Plus direct industrial CSV import, REST webhooks, and custom conveyor connectors.</span>
          <Link
            href="/integrations"
            className="font-semibold text-[#0e6bfd] hover:text-[#0b5ad9] transition-colors inline-flex items-center gap-1 ml-1"
          >
            <span>See every connection</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
