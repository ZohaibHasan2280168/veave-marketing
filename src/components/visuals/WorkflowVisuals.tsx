"use client";

import { motion } from "framer-motion";
import {
  Globe,
  CheckCircle2,
  Star,
  Video,
  ArrowRight,
  FileText,
  Layers,
  ShieldCheck,
  HardDrive,
  DollarSign,
  Users,
  Lock,
  CreditCard,
} from "lucide-react";

interface WorkflowStageVisualProps {
  stageSlug: string;
}

export default function WorkflowStageVisual({ stageSlug }: WorkflowStageVisualProps) {
  if (stageSlug === "storefront-intake") {
    return (
      <div className="rounded-xl bg-[#f8fafc] border border-white/15 p-4 sm:p-5 text-[#132938] space-y-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
        {/* Browser Chrome */}
        <div className="flex items-center justify-between border-b border-[#e2e9ef] pb-2.5">
          <div className="flex items-center gap-2">
            <Globe className="size-4 stroke-[1.5] text-[#0e6bfd]" />
            <span className="font-mono text-xs font-medium text-[#132938]">
              atlasapparel.com
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-[#e4f3ea] px-1.5 py-0.5 font-mono text-[10px] text-[#16a34a]">
              <CheckCircle2 className="size-3" />
              DNS Verified
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#556d7d]">Theme: Nordic Slate · 4/5 pages</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          {/* Left: Public Hero & Google Reviews */}
          <div className="sm:col-span-7 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl bg-[#0e2230] text-white p-4 space-y-2"
            >
              <div className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#9cc4ff]">
                Verified Manufacturer · Sialkot
              </div>
              <div className="text-sm sm:text-base font-semibold leading-snug">
                Direct private-label knitwear &amp; outerwear production
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="rounded-md bg-[#0e6bfd] px-2.5 py-1 text-[10px] font-medium">
                  Estimate order price
                </span>
                <span className="rounded-md border border-white/15 px-2.5 py-1 text-[10px] text-[#c6d6e1]">
                  View capabilities
                </span>
              </div>
            </motion.div>

            {/* Live Google Places Review */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="rounded-lg border border-[#e2e9ef] bg-white p-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#fef9c3] text-[#ca8a04]">
                  <Star className="size-4 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold tabular-nums">4.9 ★ · 128 Google Reviews</div>
                  <div className="text-[10px] text-[#556d7d]">Synced via Google Places API</div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#16a34a]">Live widget</span>
            </motion.div>
          </div>

          {/* Right: Dynamic Estimator -> Inbound Lead Capture */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="sm:col-span-5 rounded-xl border border-[#e2e9ef] bg-white p-3.5 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#132938]">Public RFQ Estimator</div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between rounded bg-[#f4f7fa] px-2.5 py-1.5">
                  <span className="text-[#556d7d]">Category</span>
                  <span className="font-medium">Heavy Fleece</span>
                </div>
                <div className="flex justify-between rounded bg-[#f4f7fa] px-2.5 py-1.5">
                  <span className="text-[#556d7d]">Quantity</span>
                  <span className="font-mono font-medium tabular-nums">2,500 units</span>
                </div>
                <div className="flex justify-between rounded bg-[#eef5ff] px-2.5 py-1.5 text-[#0e6bfd]">
                  <span>Est. Quote</span>
                  <span className="font-mono font-semibold tabular-nums">$28,500</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#e4f3ea] border border-[#bbf7d0] px-2.5 py-2 flex items-center justify-between text-[10px] text-[#15803d] font-medium">
              <span>Routed to CRM Leads</span>
              <ArrowRight className="size-3.5" />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (stageSlug === "crm-deals") {
    return (
      <div className="rounded-xl bg-[#f8fafc] border border-white/15 p-4 sm:p-5 text-[#132938] space-y-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-[#e2e9ef] pb-2.5">
          <div>
            <div className="text-xs font-semibold">Opportunity · Nordic Apparel Co (2,500u)</div>
            <div className="text-[10px] text-[#556d7d] font-mono">OPP-2026-084 · Assigned: Zainab T.</div>
          </div>
          <span className="rounded-md bg-[#eef5ff] border border-[#bfdbfe] px-2.5 py-1 font-mono text-[10px] font-medium text-[#0e6bfd] tabular-nums">
            $42,800 · Counter-proposal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
          {/* Counter-proposal Timeline */}
          <div className="sm:col-span-7 space-y-2">
            {[
              {
                title: "Buyer inquiry captured from storefront",
                meta: "Nordic Apparel Co · henrik@nordicapparel.se",
                badge: "Lead Qualified",
                tone: "bg-[#f4f7fa] text-[#556d7d]",
              },
              {
                title: "Google Meet discovery & sample review",
                meta: "meet.google.com/vve-ops-904 · .ics sent to 3 attendees",
                badge: "Google OAuth",
                tone: "bg-[#eff6ff] text-[#0e6bfd]",
              },
              {
                title: "Counter-proposal accepted by buyer",
                meta: "30% advance ($12,840) · 24-day lead time · R2 tech pack locked",
                badge: "Ready to Convert",
                tone: "bg-[#e4f3ea] text-[#16a34a]",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, delay: i * 0.08 }}
                className="rounded-lg border border-[#e2e9ef] bg-white p-2.5 flex items-start justify-between gap-2"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-semibold text-[#132938]">{item.title}</div>
                  <div className="text-[10px] text-[#556d7d] truncate">{item.meta}</div>
                </div>
                <span className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${item.tone}`}>
                  {item.badge}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right: Google Meet & 1-Click Order Conversion Card */}
          <div className="sm:col-span-5 flex flex-col justify-between gap-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.14 }}
              className="rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-3.5 space-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#132938]">
                <Video className="size-4 text-[#0e6bfd]" />
                <span>Calendar &amp; Meet Sync</span>
              </div>
              <p className="text-[10px] text-[#556d7d] leading-relaxed">
                Two-way Google Calendar sync automatically generates Google Meet URLs and delivers
                email invitations.
              </p>
              <div className="font-mono text-[10px] text-[#0e6bfd] bg-white rounded px-2 py-1 border border-[#dbeafe]">
                Today · 15:00 — Confirmed
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22 }}
              className="rounded-xl bg-[#0e2230] text-white p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#9cc4ff]">
                <span>1-click conversion</span>
                <FileText className="size-3.5" />
              </div>
              <div className="text-xs font-medium">Convert Won Deal → Active Order #410</div>
              <div className="text-[10px] text-[#c6d6e1]">
                Copies specs, buyer account, payment terms &amp; R2 attachments automatically.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (stageSlug === "orders-operations") {
    return (
      <div className="rounded-xl bg-[#f8fafc] border border-white/15 p-4 sm:p-5 text-[#132938] space-y-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between border-b border-[#e2e9ef] pb-2.5">
          <div className="flex items-center gap-2">
            <Layers className="size-4 stroke-[1.5] text-[#0e6bfd]" />
            <span className="text-xs font-semibold">Visual Business Floor Plan · ORD-410</span>
          </div>
          <span className="font-mono text-[10px] text-[#16a34a] bg-[#e4f3ea] px-2 py-0.5 rounded">
            Sequential stage gates active
          </span>
        </div>

        {/* 3 Department Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              num: "01",
              dept: "Preparation & Specs",
              status: "Completed",
              pct: 100,
              tone: "text-[#16a34a] bg-[#e4f3ea]",
              detail: "3 R2 proof photos signed",
            },
            {
              num: "02",
              dept: "Production & Assembly",
              status: "In Progress",
              pct: 74,
              tone: "text-[#0e6bfd] bg-[#eef5ff]",
              detail: "1,850 / 2,500 units complete",
            },
            {
              num: "03",
              dept: "Quality & Dispatch",
              status: "Queued",
              pct: 20,
              tone: "text-[#556d7d] bg-[#f1f5f9]",
              detail: "Awaiting QC sign-off",
            },
          ].map((stage, i) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.09 }}
              className="rounded-xl border border-[#e2e9ef] bg-white p-3 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#556d7d]">Dept {stage.num}</span>
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${stage.tone}`}>
                  {stage.status}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#132938]">{stage.dept}</div>
              <div className="h-1.5 rounded-full bg-[#edf2f7] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.pct}%` }}
                  transition={{ duration: 0.65, delay: 0.15 + i * 0.1 }}
                  className={`h-full rounded-full ${stage.pct === 100 ? "bg-[#16a34a]" : "bg-[#0e6bfd]"}`}
                />
              </div>
              <div className="font-mono text-[9px] text-[#556d7d]">{stage.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Role Portal & R2 Evidence Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="rounded-lg border border-[#e2e9ef] bg-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-[#0e6bfd]" />
              <div>
                <div className="text-[11px] font-semibold">Dedicated Role Workspaces</div>
                <div className="text-[10px] text-[#556d7d] font-mono">/dashboard · /my-work · /qc-queue</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#e2e9ef] bg-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#16a34a]" />
              <div>
                <div className="text-[11px] font-semibold">Client Mobile App Tracking</div>
                <div className="text-[10px] text-[#556d7d]">Live milestone approvals &amp; notifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Stage 04: Financials, Team Roles & Governance
  return (
    <div className="rounded-xl bg-[#f8fafc] border border-white/15 p-4 sm:p-5 text-[#132938] space-y-3.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-[#e2e9ef] pb-2.5">
        <div className="flex items-center gap-2">
          <DollarSign className="size-4 stroke-[1.5] text-[#16a34a]" />
          <span className="text-xs font-semibold">Financial Ledger, Role ACLs &amp; R2 Vault</span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#0e6bfd] bg-[#eef5ff] px-2 py-0.5 rounded">
          <CreditCard className="size-3" />
          Paddle Merchant-of-Record
        </span>
      </div>

      {/* Financial KPI Summary */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Order Payments", val: "+$48,920", tone: "text-[#16a34a]" },
          { label: "Payroll & Costs", val: "-$14,540", tone: "text-[#132938]" },
          { label: "Net Operating", val: "$34,380", tone: "text-[#0e6bfd]" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-lg border border-[#e2e9ef] bg-white p-3"
          >
            <div className="text-[10px] text-[#556d7d]">{item.label}</div>
            <div className={`text-sm sm:text-base font-semibold font-mono tabular-nums mt-0.5 ${item.tone}`}>
              {item.val}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Role Matrix + Cloudflare R2 Private Vault */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#e2e9ef] bg-white p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold">12-Module Role Matrix</span>
            <span className="font-mono text-[9px] text-[#556d7d]">7 Presets</span>
          </div>
          {[
            { role: "Accountant", scope: "Records + Payroll", granted: true },
            { role: "Sales Rep", scope: "Leads + Deals + Meet", granted: true },
            { role: "Dept Supervisor", scope: "Floor Plan + Chat", granted: true },
          ].map((r) => (
            <div key={r.role} className="flex items-center justify-between text-[10px] py-1 border-t border-[#edf2f7]">
              <span className="font-medium text-[#132938]">{r.role}</span>
              <span className="font-mono text-[9px] text-[#0e6bfd]">{r.scope}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[#0e2230] text-white p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <HardDrive className="size-3.5 text-[#9cc4ff]" />
              <span className="text-[11px] font-medium">Cloudflare R2 Private Vault</span>
            </div>
            <Lock className="size-3 text-[#4cc38a]" />
          </div>
          <div className="font-mono text-[9px] text-[#9cb3c3] bg-[#091823] rounded px-2 py-1.5 border border-white/10 truncate">
            weave-private/tenants/atlas/compliance/
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#c6d6e1] pt-0.5">
            <span>2FA TOTP &amp; Audit Logs</span>
            <span className="font-mono text-[#4cc38a]">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
