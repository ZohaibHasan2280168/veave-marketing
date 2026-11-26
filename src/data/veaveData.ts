export interface WorkflowStage {
  slug: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  department: string;
  typicalTime: string;
  requiredPhotos: number;
  checkpoints: string[];
  screenshot: string;
  benefits: string[];
  metrics: { label: string; value: string }[];
}

export interface PlatformTool {
  slug: string;
  title: string;
  desc: string;
  iconName: string;
  targetRole: string;
  screenshot?: string;
  highlights?: string[];
}

export interface PlatformPillar {
  number: string;
  title: string;
  description: string;
  tools: PlatformTool[];
}

export interface RoleDetail {
  slug: string;
  roleName: string;
  title: string;
  badge: string;
  subtitle: string;
  overview: string;
  screenshot: string;
  keyResponsibilities: string[];
  dailyWorkflow: string[];
  painPointsSolved: string[];
  metrics: { label: string; value: string }[];
}

export interface ToolItem {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  formulaDescription: string;
  inputs: { name: string; label: string; defaultValue: number; unit: string }[];
  outputLabel: string;
  outputUnit: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    slug: "storefront-intake",
    stepNumber: "01",
    title: "Storefront, estimator & lead capture",
    shortDesc: "Launch your public site, instant quote matrix & inbound lead capture",
    fullDesc:
      "Every workspace includes a visual multi-page website builder on your own subdomain or verified custom domain. Publish your capabilities, completed order portfolio, verified Google Places reviews, and a category pricing matrix that captures inbound RFQs and Contact Us inquiries straight into your CRM.",
    department: "Storefront & Marketing",
    typicalTime: "Live on day 1",
    requiredPhotos: 0,
    checkpoints: [
      "Visual website builder with 6 hero layouts, 12 curated themes & 8-token color controls",
      "Custom domain connection with automated DNS TXT/CNAME verification",
      "Dynamic category pricing estimator & public RFQ intake modal",
      "Live Google Business Profile & Google Places verified reviews sync"
    ],
    screenshot: "/assets/veave/admin/website_builder.png",
    benefits: [
      "Replaces disconnected agency websites with a storefront wired directly to your CRM",
      "Captures buyer inquiries and RFQ specs automatically into the Leads pipeline",
      "Showcases real completed orders saved directly from your operations board"
    ],
    metrics: [
      { label: "Storefront themes", value: "12 presets" },
      { label: "Domain routing", value: "Custom DNS" },
      { label: "Lead ingestion", value: "Real-time" }
    ]
  },
  {
    slug: "crm-deals",
    stepNumber: "02",
    title: "CRM pipeline, meetings & proposals",
    shortDesc: "Qualify leads, schedule Google Meet calls & negotiate opportunities",
    fullDesc:
      "Manage every buyer relationship from first inquiry to signed deal. Assign leads to sales representatives, maintain a complete customer directory with communication logs, schedule Google Calendar & Google Meet calls with automatic .ics invites, and send counter-proposals with advance payment terms.",
    department: "CRM & Sales",
    typicalTime: "Continuous pipeline",
    requiredPhotos: 1,
    checkpoints: [
      "Inbound leads board with status filtering (Open, Won, Lost, Dormant) and source tracking",
      "Buyer & customer directory with full order history and communication logs",
      "Dual-mode Google Calendar & Google Meet OAuth2 scheduling with automatic email invites",
      "Opportunities pipeline with counter-proposal negotiation, advance terms & 1-click order conversion"
    ],
    screenshot: "/assets/veave/admin/opportunities.png",
    benefits: [
      "One continuous record from initial website inquiry to opportunity and active order",
      "Built-in Google Meet video links and calendar synchronization without leaving Veave",
      "Clients review counter-proposals and attach design documents from the mobile app"
    ],
    metrics: [
      { label: "Quote to order", value: "1-click convert" },
      { label: "Meetings", value: "Google Meet sync" },
      { label: "Buyer history", value: "Unified ledger" }
    ]
  },
  {
    slug: "orders-operations",
    stepNumber: "03",
    title: "Orders, floor plan & stage gates",
    shortDesc: "Route orders across configurable departments, kanban tasks & quality gates",
    fullDesc:
      "When an opportunity closes, convert it into an active order in one click. Configure custom department workflows, track every batch on the visual business and floor plan board, assign team Kanban tasks, and optionally enforce sequential operational checkpoints, R2 photographic proof, and client approvals.",
    department: "Operations & Fulfillment",
    typicalTime: "Configurable per order",
    requiredPhotos: 3,
    checkpoints: [
      "Configurable department routing and operation templates per product or service type",
      "Visual business & floor plan pipeline tracking leads, opportunities, active orders & completed runs",
      "Dedicated workspaces for Admins (/dashboard), Department Heads (/my-work) & QC (/qc-queue)",
      "Sequential completion gates: optional QC inspection -> client mobile approval -> packing & paid gate"
    ],
    screenshot: "/assets/veave/admin/floor_plan.png",
    benefits: [
      "Adapts to any workflow—use simple order tracking or multi-department stage gates",
      "Gives supervisors and inspectors clean, distraction-free queues for their exact role",
      "Stores all media, tech packs, and delivery proof in Cloudflare R2 private storage"
    ],
    metrics: [
      { label: "Workflow stages", value: "100% custom" },
      { label: "Media storage", value: "Cloudflare R2" },
      { label: "Role views", value: "7 presets" }
    ]
  },
  {
    slug: "financials-team",
    stepNumber: "04",
    title: "Financial records, team roles & vault",
    shortDesc: "Track revenue, expenses, payroll, granular permissions & compliance docs",
    fullDesc:
      "Keep your books, team, and compliance documents in the same workspace. Record order payments, advances, operating expenses, and staff payroll in the financial ledger; assign granular 12-module role permissions; collaborate in real-time Socket.IO team chat; and manage subscriptions through Paddle Billing.",
    department: "Finance, Team & Governance",
    typicalTime: "Real-time ledger",
    requiredPhotos: 0,
    checkpoints: [
      "Financial records ledger tracking order payments, advances, operating expenses & payroll",
      "12-module permission matrix with 7 role presets (Product Manager, Sales, Accountant, Merchandiser, etc.)",
      "Real-time WebSocket team chat with colleague directory and instant notifications",
      "Immutable Cloudflare R2 compliance document vault, 2FA security, audit logs & Paddle Billing"
    ],
    screenshot: "/assets/veave/admin/revenue.png",
    benefits: [
      "Eliminates spreadsheet drift between sales quotes, floor orders, and financial collections",
      "Granular module ACLs ensure each staff member only sees the modules their role requires",
      "Self-serve Paddle Billing with 14-day trials, regional pricing, and automated tax invoices"
    ],
    metrics: [
      { label: "Access matrix", value: "12 modules" },
      { label: "Security", value: "TOTP 2FA + Audit" },
      { label: "Billing engine", value: "Paddle MoR" }
    ]
  }
];

export const PLATFORM_PILLARS: PlatformPillar[] = [
  {
    number: "01",
    title: "Storefront, Brand & Buyer CRM",
    description:
      "Publish your commercial website, showcase verified Google reviews, estimate quotes automatically, and manage every lead and customer in one CRM.",
    tools: [
      {
        slug: "visual-website-builder",
        title: "Visual Storefront & Theme Builder",
        desc: "Multi-page visual website editor with 6 hero layouts, 12 curated themes, 8-token color palettes, profile copy generator, and portfolio publishing.",
        iconName: "Globe",
        targetRole: "Admin / Marketing",
        screenshot: "/assets/veave/admin/website_builder.png"
      },
      {
        slug: "custom-domains-seo",
        title: "Custom Domains & Automated DNS",
        desc: "Run on your free {company}.veave.systemic.pk address or connect your own custom domain with built-in DNS TXT/CNAME verification and SEO controls.",
        iconName: "Link2",
        targetRole: "Enterprise / Admin",
        screenshot: "/assets/veave/admin/website_builder.png"
      },
      {
        slug: "instant-price-estimator",
        title: "Category Price Estimator & RFQ Intake",
        desc: "Configure base unit pricing and lead-time tiers so visiting buyers can estimate project costs and submit structured RFQs straight into your pipeline.",
        iconName: "Calculator",
        targetRole: "Sales / Merchandising",
        screenshot: "/assets/veave/admin/leads.png"
      },
      {
        slug: "google-reviews-sync",
        title: "Google Business & Places Reviews",
        desc: "Connect Google Business Profile OAuth2 or Place ID to display verified Google Maps ratings and customer testimonials on your storefront.",
        iconName: "Star",
        targetRole: "Marketing Manager",
        screenshot: "/assets/veave/admin/reviews.png"
      },
      {
        slug: "crm-inbound-leads",
        title: "Inbound Leads & Outreach Pipeline",
        desc: "Centralize Contact Us inquiries, public RFQs, and direct buyer outreach with status tabs (Open, Won, Lost, Dormant) and sales rep assignment.",
        iconName: "Filter",
        targetRole: "Sales Representative",
        screenshot: "/assets/veave/admin/leads.png"
      },
      {
        slug: "customer-directory",
        title: "Customer Directory & Comms Log",
        desc: "Maintain a searchable buyer directory with brand details, location, linked deals, active orders, and timestamped client communication logs.",
        iconName: "Users",
        targetRole: "Sales / Product Manager",
        screenshot: "/assets/veave/admin/customers.png"
      }
    ]
  },
  {
    number: "02",
    title: "Deals, Orders & Operations",
    description:
      "Schedule buyer meetings on Google Meet, negotiate opportunities, convert won deals into orders, and track execution across your floor and team.",
    tools: [
      {
        slug: "opportunities-proposals",
        title: "Sales Opportunities & Counter-Proposals",
        desc: "Track deal value, volume, payment terms, and advances. Dispatch counter-proposals to buyers and convert won opportunities into orders in one click.",
        iconName: "Briefcase",
        targetRole: "Sales / Admin",
        screenshot: "/assets/veave/admin/opportunities.png"
      },
      {
        slug: "google-meet-appointments",
        title: "Google Meet & Calendar Scheduling",
        desc: "Connect Google Calendar OAuth2 to generate live Google Meet links, send RFC 5545 .ics email invites, and manage buyer appointments.",
        iconName: "Calendar",
        targetRole: "Sales / Merchandiser",
        screenshot: "/assets/veave/admin/appointments.png"
      },
      {
        slug: "orders-workflow-builder",
        title: "Order Management & Workflow Builder",
        desc: "Manage specifications, due dates, attachments, and custom department sequences for every order from intake through final delivery.",
        iconName: "ClipboardList",
        targetRole: "Admin / Product Manager",
        screenshot: "/assets/veave/admin/order_details.png"
      },
      {
        slug: "visual-floor-plan",
        title: "Visual Business & Floor Plan Pipeline",
        desc: "See the entire business pipeline (Leads -> Opportunities -> Active Floor Orders -> Completed) alongside live department and operation progress.",
        iconName: "LayoutGrid",
        targetRole: "Operations / Supervisors",
        screenshot: "/assets/veave/admin/floor_plan.png"
      },
      {
        slug: "kanban-tasks-board",
        title: "Team Kanban Tasks Board",
        desc: "Assign operational tasks linked to specific orders or leads, track due dates, and move work across To Do, In Progress, and Completed columns.",
        iconName: "CheckSquare",
        targetRole: "All Staff",
        screenshot: "/assets/veave/admin/tasks.png"
      },
      {
        slug: "checkpoints-qc-queue",
        title: "Workstation Queues & Quality Gates",
        desc: "Optional sequential operation checkpoints (/my-work) and independent QC inspection queues (/qc-queue) with R2 photo evidence and rework loops.",
        iconName: "ShieldCheck",
        targetRole: "Dept Heads & QC",
        screenshot: "/assets/veave/qc/qc_dashboard.png"
      }
    ]
  },
  {
    number: "03",
    title: "Financials, Team & Governance",
    description:
      "Control company finances, granular staff permissions, real-time messaging, private R2 document storage, and Paddle subscription billing.",
    tools: [
      {
        slug: "financial-records-ledger",
        title: "Financial Records, Expenses & Payroll",
        desc: "Track order payments, advance collections, operating expenses, and staff payroll with 6-month revenue vs. expense analytics and CSV exports.",
        iconName: "DollarSign",
        targetRole: "Admin / Accountant",
        screenshot: "/assets/veave/admin/revenue.png"
      },
      {
        slug: "custom-role-matrix",
        title: "12-Module Custom Role Permission Matrix",
        desc: "Assign 7 role presets (Product Manager, Sales, Merchandiser, Accountant, Marketing, Supervisor, QC) or build custom per-module access controls.",
        iconName: "Sliders",
        targetRole: "Workspace Admin",
        screenshot: "/assets/veave/admin/team.png"
      },
      {
        slug: "realtime-team-chat",
        title: "Real-Time Team Chat & Notifications",
        desc: "Built-in Socket.IO messaging with a searchable colleague directory, order-linked threads, and instant browser and mobile notifications.",
        iconName: "MessageSquare",
        targetRole: "All Staff",
        screenshot: "/assets/veave/admin/teamchat.png"
      },
      {
        slug: "cloudflare-r2-vault",
        title: "Cloudflare R2 Private Document Vault",
        desc: "Store trade licenses, tax registrations, tech packs, and checkpoint media in tenant-isolated Cloudflare R2 buckets with live quota meters.",
        iconName: "HardDrive",
        targetRole: "Admin / Compliance",
        screenshot: "/assets/veave/admin/admin_dashboard.png"
      },
      {
        slug: "client-mobile-portal",
        title: "Dedicated Client Mobile App Portal",
        desc: "Buyers track live order milestones, negotiate counter-proposals, approve finished stages, and submit verified reviews from the mobile app.",
        iconName: "Smartphone",
        targetRole: "B2B Buyers & Clients",
        screenshot: "/assets/veave/admin/orders.png"
      },
      {
        slug: "security-2fa-billing",
        title: "2FA Security, Audit Logs & Paddle Billing",
        desc: "Enforce Gmail OTP + Authenticator TOTP 2FA, inspect immutable audit trails, and manage 14-day trials and subscriptions via Paddle Billing.",
        iconName: "Lock",
        targetRole: "Admin / Security",
        screenshot: "/assets/veave/admin/admin_dashboard.png"
      }
    ]
  }
];

export const ROLE_DETAILS: Record<string, RoleDetail> = {
  admin: {
    slug: "admin",
    roleName: "Workspace Admin",
    title: "Executive CRM, Storefront & Operations Command Center",
    badge: "Full Workspace Control",
    subtitle:
      "Manage your public storefront, CRM deals, production orders, financial ledger, custom staff roles, and Paddle billing from one dashboard.",
    overview:
      "The Workspace Admin console brings every commercial and operational record together. Launch your brand storefront, track inbound leads and Google Meet appointments, convert opportunities into orders, monitor the visual floor plan, audit financial records, and configure granular 12-module permissions for your team.",
    screenshot: "/assets/veave/admin/admin_dashboard.png",
    keyResponsibilities: [
      "Storefront website builder, custom domain DNS, Google Reviews & category price estimator setup",
      "CRM oversight across inbound leads, customer accounts, Google Meet appointments & sales opportunities",
      "Order intake, custom department workflow routing, visual floor plan monitoring & final completion approval",
      "Financial records ledger (order payments, advances, expenses, payroll) & Paddle subscription management",
      "Staff invitations, 12-module custom role matrix (Sales, Product Manager, Accountant, etc.) & 2FA policies"
    ],
    dailyWorkflow: [
      "09:00 AM: Review dashboard KPIs—monthly revenue, won opportunities, new website leads, and items needing attention",
      "10:15 AM: Join a scheduled Google Meet call from Appointments and send a counter-proposal on an open opportunity",
      "11:30 AM: Convert a won deal into an active order and assign tasks on the Kanban board",
      "02:30 PM: Check the visual floor plan pipeline and approve a completed order to publish to the storefront portfolio",
      "05:00 PM: Record received advance payments in Financial Records and review the workspace audit log"
    ],
    painPointsSolved: [
      "Replaces 5 separate tools (website builder, CRM, meeting scheduler, floor tracker, and accounting sheet) with one system",
      "Ensures every quote, order, customer communication, and payment reads from the same database record",
      "Protects company data with strict subdomain isolation, Cloudflare R2 private storage, and 2FA enforcement"
    ],
    metrics: [
      { label: "Integrated modules", value: "18 tools" },
      { label: "Role presets", value: "7 templates" },
      { label: "Trial period", value: "14 days" },
      { label: "Tenant isolation", value: "100% subdomain" }
    ]
  },
  "dept-head": {
    slug: "dept-head",
    roleName: "Operations & Department Lead",
    title: "Department Head & Role-Scoped Operational Workspace",
    badge: "Operations & Execution",
    subtitle:
      "Focused workspaces for Department Heads, Product Managers, Floor Supervisors, and Sales Representatives.",
    overview:
      "With Veave's 12-module permission matrix, each team lead gets a workspace tailored to their responsibilities. Department Heads manage active operations in /my-work, Product Managers coordinate client logs and order timelines, and Sales Representatives manage leads, appointments, and opportunities.",
    screenshot: "/assets/veave/dept_head/dept_head_dashboard.png",
    keyResponsibilities: [
      "Managing assigned orders and sequential operations in the dedicated /my-work queue",
      "Updating stage progress, attaching Cloudflare R2 evidence files, and logging operational notes",
      "Coordinating across the visual floor plan board and team Kanban task list",
      "Communicating with admins, sales reps, and quality inspectors in real-time Socket.IO team chat",
      "Resolving flagged rework items with full visibility into order specifications and due dates"
    ],
    dailyWorkflow: [
      "08:30 AM: Open /my-work to see active orders and operations routed to the department",
      "10:00 AM: Complete an operation checkpoint and upload signed evidence to Cloudflare R2",
      "01:00 PM: Receive an instant notification if an item requires adjustment, with clear inspector notes",
      "02:15 PM: Coordinate timeline updates with the Product Manager in Team Chat",
      "04:30 PM: Mark assigned Kanban tasks complete and advance the batch to the next stage"
    ],
    painPointsSolved: [
      "Eliminates scattered WhatsApp messages and paper job travelers",
      "Shows staff only the modules enabled for their custom role preset",
      "Keeps every file attachment and status change permanently linked to the order record"
    ],
    metrics: [
      { label: "Workspace route", value: "/my-work" },
      { label: "Custom presets", value: "7 roles" },
      { label: "File storage", value: "Cloudflare R2" },
      { label: "Team messaging", value: "Live Socket.IO" }
    ]
  },
  qc: {
    slug: "qc",
    roleName: "Quality & Verification Lead",
    title: "Quality Assurance & Stage Verification Queue",
    badge: "Independent Verification",
    subtitle:
      "Structured review queue for verifying submitted checkpoints before client approval and dispatch.",
    overview:
      "For businesses that enable quality gates on their workflows, the /qc-queue workspace provides an independent verification step. Inspectors review submitted checkpoints, preview high-resolution R2 attachments, and either approve the stage (advancing it toward client mobile approval) or request rework with structured notes.",
    screenshot: "/assets/veave/qc/qc_dashboard.png",
    keyResponsibilities: [
      "Reviewing pending checkpoint submissions across active orders in /qc-queue",
      "Inspecting attached photos and specification documents in the built-in file previewer",
      "Approving verified stages to unlock client mobile approval and final packing gates",
      "Issuing structured rework requests with mandatory notes when tolerances are missed",
      "Tracking historical pass rates and inspection audit trails across departments"
    ],
    dailyWorkflow: [
      "09:00 AM: Open /qc-queue and filter pending checkpoint submissions by due date",
      "10:30 AM: Inspect uploaded R2 proof against order specifications and approve compliant batches",
      "12:00 PM: Flag a non-conforming item with detailed defect notes, automatically alerting the department lead",
      "03:00 PM: Verify resubmitted rectification proof and clear the order for client approval",
      "04:45 PM: Review daily quality throughput on the floor plan pipeline"
    ],
    painPointsSolved: [
      "Prevents unverified work from reaching clients when quality gates are enabled",
      "Creates a timestamped audit trail of every approval and rework decision",
      "Connects directly to the sequential client approval and paid-order completion gates"
    ],
    metrics: [
      { label: "Queue route", value: "/qc-queue" },
      { label: "Evidence vault", value: "Private R2" },
      { label: "Stage gating", value: "Sequential" },
      { label: "Audit trail", value: "Immutable" }
    ]
  }
};

export const FREE_TOOLS: ToolItem[] = [
  {
    slug: "fabric-consumption",
    title: "Material Consumption & Yield Calculator",
    tagline: "Calculate exact material required per batch based on dimensions, scrap %, and staging waste.",
    category: "Material & Yield",
    description:
      "Determine exact linear meters, square footage, or raw stock required for bulk production orders based on component surface area, stock unit size, safety allowance, and process scrap.",
    formulaDescription: "Total Material Required = (Unit Area / Material Width) * Total Units * (1 + Scrap% + Wastage%)",
    inputs: [
      { name: "units", label: "Order Quantity (Pieces)", defaultValue: 500, unit: "pcs" },
      { name: "surfaceArea", label: "Estimated Pattern Area per Piece", defaultValue: 1.45, unit: "sq meters" },
      { name: "fabricWidth", label: "Usable Material Width / Size", defaultValue: 1.48, unit: "meters" },
      { name: "shrinkage", label: "Material Relaxation Allowance", defaultValue: 3.5, unit: "%" },
      { name: "wastage", label: "Staging Scrap & Cut Wastage", defaultValue: 7.0, unit: "%" }
    ],
    outputLabel: "Estimated Total Material Required",
    outputUnit: "meters"
  },
  {
    slug: "sam-calculator",
    title: "Production SAM (Standard Allowed Minute) & Cost Calculator",
    tagline: "Estimate line capacity, cycle times, and labor cost per unit.",
    category: "Operations & Costing",
    description:
      "Standard Allowed Minute (SAM) measures the time needed for a qualified operator to complete an operation at standard performance with relaxation allowances.",
    formulaDescription: "SAM = Basic Minute * (1 + Rating / 100) * (1 + Allowance / 100)",
    inputs: [
      { name: "basicMinutes", label: "Observed Basic Cycle Time", defaultValue: 18.5, unit: "mins" },
      { name: "operatorRating", label: "Operator Performance Rating", defaultValue: 95, unit: "%" },
      { name: "allowance", label: "Fatigue & Machine Delay Allowance", defaultValue: 12, unit: "%" },
      { name: "hourlyRate", label: "Operator Hourly Wage", defaultValue: 4.5, unit: "$/hr" }
    ],
    outputLabel: "Calculated Production SAM",
    outputUnit: "minutes per unit"
  },
  {
    slug: "aql-calculator",
    title: "AQL 2.5 Sampling & Inspection Table Calculator",
    tagline: "Determine required sample sizes and acceptable defect limits per ISO 2859-1 standards.",
    category: "Quality Assurance",
    description:
      "Acceptable Quality Limit (AQL) 2.5 Normal Level II dictates how many units an inspector examines and the maximum defects allowed before batch rework.",
    formulaDescription: "Calculated based on ISO 2859-1 / ANSI/ASQ Z1.4 sampling tables.",
    inputs: [
      { name: "batchSize", label: "Total Order Lot Size", defaultValue: 1200, unit: "units" },
      { name: "inspectionLevel", label: "Inspection Strictness Level (1: Low, 2: Normal, 3: Tight)", defaultValue: 2, unit: "level" }
    ],
    outputLabel: "Recommended Sample Inspection Size",
    outputUnit: "pieces to inspect (Max Acceptable Defects: 5)"
  },
  {
    slug: "line-balancing",
    title: "Line Balancing & Pitch Time Estimator",
    tagline: "Calculate staff distribution, pitch time, and throughput efficiency.",
    category: "Capacity Planning",
    description:
      "Balance workstations by distributing operations evenly across staff to eliminate bottlenecks and idle time.",
    formulaDescription: "Pitch Time = Total Unit SAM / Number of Active Staff",
    inputs: [
      { name: "totalSam", label: "Total Unit SAM", defaultValue: 24.2, unit: "minutes" },
      { name: "operators", label: "Total Active Operators", defaultValue: 32, unit: "workers" },
      { name: "dailyHours", label: "Working Shift Duration", defaultValue: 8, unit: "hours" }
    ],
    outputLabel: "Target Pitch Time per Workstation",
    outputUnit: "minutes per piece"
  },
  {
    slug: "thread-consumption",
    title: "Quote Margin & Advance Payment Calculator",
    tagline: "Calculate unit selling price, gross margin, and required advance deposit.",
    category: "CRM & Deal Desking",
    description:
      "Forecast order profitability and upfront advance payment requirements before sending a counter-proposal in Veave CRM.",
    formulaDescription: "Gross Total = (Units * Unit Cost) * (1 + Target Margin %)",
    inputs: [
      { name: "lockstitchSeam", label: "Material Cost per Unit", defaultValue: 12.5, unit: "$" },
      { name: "overlockSeam", label: "Labor & Overhead per Unit", defaultValue: 6.5, unit: "$" },
      { name: "threadWastage", label: "Target Profit Margin", defaultValue: 28, unit: "%" }
    ],
    outputLabel: "Recommended Quote Price Index",
    outputUnit: "index units"
  },
  {
    slug: "tolerance-checker",
    title: "Specification Tolerance Checker",
    tagline: "Validate measured dimensions against target specifications with pass/fail bounds.",
    category: "Specifications",
    description:
      "Enter target dimensions and allowed tolerances to verify whether a sample meets client specifications.",
    formulaDescription: "Status = (Actual >= Target - Tolerance && Actual <= Target + Tolerance) ? PASS : REJECT",
    inputs: [
      { name: "targetMeasurement", label: "Specification Target Dimension", defaultValue: 54.0, unit: "mm/cm" },
      { name: "allowedTolerance", label: "Allowed Tolerance (+/-)", defaultValue: 1.0, unit: "mm/cm" },
      { name: "actualMeasurement", label: "Physical Measured Value", defaultValue: 54.4, unit: "mm/cm" }
    ],
    outputLabel: "Tolerance Deviation Status",
    outputUnit: "PASS (+0.4 within ±1.0 limit)"
  }
];

export const INTEGRATION_CATEGORIES = [
  {
    name: "Google Workspace & Meetings",
    description: "Native OAuth2 connection for Google Calendar scheduling, automatic Google Meet video links, and .ics email invites.",
    partners: ["Google Calendar API v3", "Google Meet Video", "Gmail SMTP / RFC 5545 .ics", "Google Sign-In (GSI)"]
  },
  {
    name: "Google Business & Storefront SEO",
    description: "Sync live Google Maps ratings and customer reviews directly onto your public Veave storefront.",
    partners: ["Google Places API (New)", "Google Business Profile OAuth2", "Custom DNS (TXT / CNAME)", "OpenGraph & SEO Meta"]
  },
  {
    name: "Paddle Billing & Global Tax MoR",
    description: "Merchant-of-Record subscription billing, 14-day card-authorized trials, regional pricing overrides, and automated tax invoices.",
    partners: ["Paddle Billing v2", "Paddle.js Overlay Checkout", "Paddle PricePreview", "Paddle Customer Portal"]
  },
  {
    name: "Cloudflare R2 & Private Document Vault",
    description: "Presigned upload/download streams, immutable onboarding compliance vaults, and per-tenant storage quota enforcement.",
    partners: ["Cloudflare R2 Object Storage", "Presigned S3-Compatible URLs", "Antivirus & Magic-Byte Scan", "Per-Tier Quota Meters"]
  },
  {
    name: "Security, 2FA & Multi-Tenant Governance",
    description: "Subdomain isolation, two-step authentication, support impersonation handoffs, and immutable audit trails.",
    partners: ["RFC 6238 Authenticator TOTP", "Sequential Email OTP + Recovery Codes", "JWT Refresh Rotation", "Scoped Support Impersonation"]
  },
  {
    name: "Real-Time Messaging & Mobile Client App",
    description: "WebSocket notifications for staff and a dedicated mobile app for buyers to track orders and approve proposals.",
    partners: ["Socket.IO Real-Time Gateway", "Veave Mobile Client App", "Firebase Cloud Messaging (FCM)", "CSV Ledger Exports"]
  }
];

export const VEAVE_FAQS = [
  {
    id: 1,
    category: "Getting started",
    question: "Is Veave only for QC workflows, or is it a complete CRM and business platform?",
    answer:
      "Veave is a complete multi-tenant Business OS and CRM. It includes a public Storefront & Visual Website Builder, Inbound Leads, Customer Directory, Google Calendar & Meet scheduling, Sales Opportunities & Counter-Proposals, Order Management, a Visual Floor Plan board, Kanban Tasks, Financial Records & Payroll, Real-Time Team Chat, a Cloudflare R2 Document Vault, and optional QC checkpoints."
  },
  {
    id: 2,
    category: "Getting started",
    question: "How does the self-serve onboarding and 14-day free trial work?",
    answer:
      "Click 'Start free trial' to complete our 4-step onboarding wizard: (1) claim your subdomain and create your admin account, (2) enter your business profile, employee count, and tax/registration details, (3) upload compliance documents to your private Cloudflare R2 vault, and (4) choose your plan (Base, Professional, or Enterprise) and authorize your card for $0.00 via Paddle Billing. Your 14-day trial activates immediately and converts to your chosen plan only after the trial ends."
  },
  {
    id: 3,
    category: "Getting started",
    question: "How do existing team members log in to their workspace?",
    answer:
      "Click 'Log in' in the top navigation bar and enter your work email or workspace subdomain. Veave locates your isolated tenant portal (e.g. yourcompany.veave.systemic.pk) and routes you directly to your sign-in screen."
  },
  {
    id: 4,
    category: "CRM & Storefront",
    question: "Is a public website and quote estimator included with my workspace?",
    answer:
      "Yes. Every workspace includes a multi-page storefront on your subdomain (plus custom domain support on Enterprise). You can customize 6 hero layouts, 12 visual themes, colors, business hours, live Google Reviews, and a category price estimator that feeds inquiries straight into your CRM Leads tab."
  },
  {
    id: 5,
    category: "CRM & Storefront",
    question: "How do Google Meet appointments and sales opportunities work?",
    answer:
      "From any lead or customer record, you can schedule a meeting synced with Google Calendar that automatically generates a Google Meet link and emails an .ics invite. When you send a quote or counter-proposal under Opportunities, won deals convert into active orders in one click with advance payment terms tracked automatically."
  },
  {
    id: 6,
    category: "Operations & Roles",
    question: "Can we customize workflows and staff roles for different departments?",
    answer:
      "Yes. You define the exact departments and operations an order flows through, and you can assign staff to 7 built-in role presets (Product Manager, Sales Representative, Merchandiser, Accountant, Marketing Manager, Floor Supervisor, QC Inspector) or toggle access across 12 workspace modules."
  },
  {
    id: 7,
    category: "Operations & Roles",
    question: "How do clients track orders and approve proposals?",
    answer:
      "Buyers receive access to the Veave Client Mobile App, where they can review counter-proposals, attach design specifications, track live order stage progress, approve completed milestones, and submit verified reviews after delivery."
  },
  {
    id: 8,
    category: "Security & Billing",
    question: "How are our business documents and billing handled?",
    answer:
      "Onboarding and compliance documents are stored in an encrypted, tenant-isolated Cloudflare R2 private vault. Subscriptions are processed by Paddle Billing (our Merchant of Record), supporting international Visa/Mastercard, regional pricing overrides, automatic tax compliance, and 1-click plan upgrades, downgrades, or cancellation from your Billing tab."
  }
];

export const PRICING_TIERS = [
  {
    id: "BASE",
    name: "Base",
    price: "$29",
    pkPrice: "$12",
    annualPrice: "$290",
    pkAnnualPrice: "$120",
    period: "per month",
    description: "Core CRM, storefront builder, order tracking, and financial records for growing businesses and workshops.",
    features: [
      "Up to 4 Production Departments & 1 Location",
      "Up to 10 Staff Accounts with Custom Role ACLs",
      "150 Active Orders & Full CRM Leads / Customers",
      "10 GB Cloudflare R2 Private Document & Media Storage",
      "Visual Storefront Builder (3 Pages & 2 Themes)",
      "Real-Time Team Chat, Kanban Tasks & Financial Ledger",
      "14-day free trial via Paddle ($0.00 due today)"
    ],
    ctaText: "Start 14-day free trial",
    popular: false
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: "$79",
    pkPrice: "$29",
    annualPrice: "$790",
    pkAnnualPrice: "$290",
    period: "per month",
    description: "Complete CRM, Google Meet & Reviews integrations, and multi-line operations for scaling companies.",
    features: [
      "Up to 12 Departments & 3 Business Locations",
      "Up to 35 Staff Accounts & All 7 Role Presets",
      "1,000 Active Orders, Opportunities & Counter-Proposals",
      "50 GB Cloudflare R2 Private Document & Media Storage",
      "Google Calendar, Google Meet & Google Places Reviews Sync",
      "Visual Storefront Builder (5 Pages & 6 Curated Themes)",
      "Priority Chat & Email Support"
    ],
    ctaText: "Start 14-day free trial",
    popular: true
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: "$249",
    pkPrice: "$99",
    annualPrice: "$2,490",
    pkAnnualPrice: "$990",
    period: "per month",
    description: "High-volume multi-site operations requiring custom domains, white-label branding, and maximum capacity.",
    features: [
      "Unlimited Departments, Staff Accounts & Active Orders",
      "Up to 10 Business Locations",
      "500 GB Cloudflare R2 Private Document & Media Storage",
      "Custom Domain Connection (DNS Verification) & Custom Logo",
      "All 12+ Storefront Themes & Unlimited Pages",
      "Enforced Workspace 2FA, Full Audit Logs & SLA Readiness",
      "Dedicated Account Lead"
    ],
    ctaText: "Start 14-day free trial",
    popular: false
  }
];
