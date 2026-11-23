"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  Camera,
  QrCode,
  DollarSign,
  Globe,
  Bot,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ConnectionCategory {
  title: string;
  description: string;
  partners: string[];
  icon: typeof Layers;
}

const connectionCategories: ConnectionCategory[] = [
  {
    title: "Industrial CAD & Tech Specs",
    description:
      "Direct import of technical drawings, DXF/STEP patterns, specification curves, and machine files without manual conversion.",
    partners: ["AutoCAD / SolidWorks", "Gerber Technology", "Lectra Modaris", "Siemens NX"],
    icon: Layers,
  },
  {
    title: "Cloud Evidence & CDN",
    description:
      "Cryptographically signed high-res photographic evidence for every production checkpoint stored in tamper-proof archives.",
    partners: ["Cloudinary", "AWS S3 Enterprise", "Google Cloud Storage"],
    icon: Camera,
  },
  {
    title: "Shopfloor Barcode Hardware",
    description:
      "Seamless scanning of waterproof QR traveler job cards using industrial handhelds, tablet cameras, and conveyor eyes.",
    partners: ["Zebra Technologies", "Honeywell Industrial", "Brother RFID"],
    icon: QrCode,
  },
  {
    title: "ERP, Invoicing & Payroll",
    description:
      "Post job costing, bill of materials consumption, contractor payments, and double-entry general ledger to QuickBooks.",
    partners: ["QuickBooks® Online", "Xero Accounting", "SAP Business One"],
    icon: DollarSign,
  },
  {
    title: "B2B Brand Feeds & eCommerce",
    description:
      "Ingest client wholesale purchase orders and specification profiles directly from retail portals, ERPs, and custom storefronts.",
    partners: ["Shopify B2B", "WooCommerce Wholesale", "Joor Wholesale"],
    icon: Globe,
  },
  {
    title: "Real-Time Factory Messaging",
    description:
      "Instant shopfloor escalation alerts, daily executive morning briefs, and automated milestone texts dispatched to client phones.",
    partners: ["Telegram Bot", "WhatsApp Business API", "Twilio SMS"],
    icon: Bot,
  },
];

export default function ConnectionsShowcase() {
  return (
    <section id="connections" className="px-4 sm:px-6 py-16 lg:py-24 bg-white border-t border-[#e3eaef]">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-12 lg:gap-14">
        
        {/* Section Header */}
        <div className="grid items-end gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0e6bfd]">
              YOUR FACTORY ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#16303f] leading-[1.15]">
              Keep the connections you rely on.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-start gap-2"
          >
            <p className="text-base sm:text-lg text-[#587080] leading-relaxed">
              CAD files, Cloudinary photographic archives, barcode scanners, and accounting connections. Keep your existing machines and vendor accounts intact.
            </p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {connectionCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#e3eaef] bg-white p-6 sm:p-7 hover:border-[#0e6bfd]/40 hover:bg-[#f8fafc] hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#eef2f5] text-[#0e6bfd] group-hover:bg-[#0e6bfd] group-hover:text-white transition-colors">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#16303f] group-hover:text-[#0e6bfd] transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#587080] leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#e3eaef]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#16303f] block mb-2">
                    Key Platforms Supported:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.partners.map((partner) => (
                      <span
                        key={partner}
                        className="rounded-md bg-[#eef2f5] px-2.5 py-1 text-xs font-semibold text-[#16303f] group-hover:bg-white group-hover:border group-hover:border-[#e3eaef] transition-colors"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-2xl border border-[#e3eaef] bg-[#f8fafc] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-6 text-[#257a55] shrink-0" />
            <div className="text-xs sm:text-sm text-[#16303f]">
              <strong className="font-semibold text-[#16303f]">Direct Hardware &amp; Webhook Integration:</strong>{" "}
              Veave provides documented REST APIs and WebSocket endpoints for custom conveyor eyes and workstation line sensors.
            </div>
          </div>

          <Link
            href="/integrations"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-[7px] border border-[#dbe4ea] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#16303f] hover:bg-[#eef2f5] hover:border-[#cbd5e1] transition-all shadow-xs"
          >
            <span>Explore All Connectors</span>
            <ArrowRight className="size-4 text-[#0e6bfd]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
