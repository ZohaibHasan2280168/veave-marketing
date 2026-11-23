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

export interface FeatureItem {
  slug: string;
  pillar: string;
  pillarNumber: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  capabilities: string[];
  screenshot?: string;
  targetRole: string;
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
    slug: "order-intake",
    stepNumber: "01",
    title: "Order Intake & Specifications",
    shortDesc: "Digitize specifications, BOM & material allocation",
    fullDesc:
      "Every production run begins with a single digital job card. Ingest purchase orders, define product variations, assign engineering tolerance profiles, and calculate required material consumption before production begins.",
    department: "Planning & Merchandising",
    typicalTime: "1-2 Hours",
    requiredPhotos: 2,
    checkpoints: [
      "Client purchase order verification against engineering specification",
      "Digital CAD drawings and design specifications sync",
      "Raw material lot number, quality test & staging approval",
      "Bill of Materials (BOM) components and hardware reservation"
    ],
    screenshot: "/assets/veave/admin/order_details.png",
    benefits: [
      "Eliminates miscommunication between engineering and shopfloor supervisors",
      "Prevents starting production runs with unapproved material specs",
      "Generates digital QR traveler job cards for shopfloor tracking"
    ],
    metrics: [
      { label: "Spec Accuracy", value: "99.9%" },
      { label: "BOM Verification", value: "Instant" },
      { label: "CAD Sync", value: "Direct DXF/STEP" }
    ]
  },
  {
    slug: "cutting-prep",
    stepNumber: "02",
    title: "Engineering Staging & Material Prep",
    shortDesc: "Material utilization, precision prep & component staging",
    fullDesc:
      "Shopfloor prep teams stage raw stock, verify tolerances, and execute precision cutting and staging. The Department Head uploads photographic evidence of staged components before batches move to assembly.",
    department: "Preparation & Staging",
    typicalTime: "3-6 Hours",
    requiredPhotos: 3,
    checkpoints: [
      "Raw material quantity, grade, and inspection verification",
      "Material layout and cutting yield optimization standard",
      "Critical component dimension and tolerance check (+/- 0.5mm)",
      "Batch labeling with sequential QR traveler barcodes"
    ],
    screenshot: "/assets/veave/dept_head/operations_checkpoints.png",
    benefits: [
      "Reduces raw material scrap and remnant waste across bulk runs",
      "Ensures exact serialized batch tracking across departments",
      "Stops out-of-spec components before reaching assembly lines"
    ],
    metrics: [
      { label: "Material Scrap Reduction", value: "4.2%" },
      { label: "Tolerance Standard", value: "±0.5mm" },
      { label: "Batch QR Tracking", value: "100%" }
    ]
  },
  {
    slug: "embroidery-print",
    stepNumber: "03",
    title: "Specialized Processing & Surface Finish",
    shortDesc: "Surface finishing, coating, precision detailing & cure approval",
    fullDesc:
      "Components requiring specialized processing, surface coating, laser engraving, or printing advance to automated treatment stations. Supervisors verify finish consistency and color calibration under standard light booths.",
    department: "Specialized Processing",
    typicalTime: "4-8 Hours",
    requiredPhotos: 2,
    checkpoints: [
      "Initial first-piece sample signed off under standard inspection lighting",
      "Coating thickness, surface finish, and adhesion check",
      "Print / engraving cure and durability confirmation",
      "Color and finish matching against approved master standard"
    ],
    screenshot: "/assets/veave/dept_head/tasks.png",
    benefits: [
      "Guarantees first-piece sample approval before bulk processing",
      "Cuts calibration errors on multi-stage treatments",
      "Tracks equipment maintenance to prevent surface defects"
    ],
    metrics: [
      { label: "Finish Accuracy", value: "Delta E < 1.0" },
      { label: "First Piece Sign-off", value: "Mandatory" },
      { label: "Durability Standard", value: "Grade 4.5" }
    ]
  },
  {
    slug: "assembly-stitching",
    stepNumber: "04",
    title: "Assembly Line Operations",
    shortDesc: "Progressive line assembly, station cycle times & joining",
    fullDesc:
      "Assembly lines execute progressive sectional assembly: sub-assemblies and main bodies are joined using calibrated workstations. Supervisors monitor line cycle times and log active batch milestones.",
    department: "Assembly Lines",
    typicalTime: "6-18 Hours",
    requiredPhotos: 4,
    checkpoints: [
      "Critical joining tolerance verification using precision gauges",
      "Workstation cycle balance inspection under active line conditions",
      "Mechanical fastener torque and bonding strength verification",
      "Critical dimension checkpoints across primary assembly axes"
    ],
    screenshot: "/assets/veave/admin/floor_plan.png",
    benefits: [
      "Balances line bottlenecks between individual assembly operations",
      "Live operator accountability ensures mistakes are traced to individual stations",
      "Provides real-time work-in-progress (WIP) counts per line"
    ],
    metrics: [
      { label: "Line Balance Efficiency", value: "89.4%" },
      { label: "Station Consistency", value: "100% Calibrated" },
      { label: "Live WIP Tracking", value: "Real-time" }
    ]
  },
  {
    slug: "quality-control",
    stepNumber: "05",
    title: "Shopfloor QC Gate & Audit",
    shortDesc: "Independent tolerance verification, photo proof & approval",
    fullDesc:
      "Quality assurance is strictly independent: only certified QC Inspectors can sign off on finished units. Inspectors compare physical dimensions against technical specifications and capture Cloudinary signed photo proof.",
    department: "Quality Assurance",
    typicalTime: "1-3 Hours",
    requiredPhotos: 5,
    checkpoints: [
      "100% specification inspection against technical tolerance table",
      "Critical visual audit: cosmetic blemishes, surface flaws, loose fittings",
      "Symmetrical alignment and functional testing verification",
      "Cloudinary cryptographic signed photographic evidence archive"
    ],
    screenshot: "/assets/veave/qc/qc_dashboard.png",
    benefits: [
      "Zero defect escapes to client shipping cartons",
      "Defect rectification loop sends failed units back with exact notes",
      "Complete timestamped audit trail protects factory against unjustified claims"
    ],
    metrics: [
      { label: "Defect Escape Rate", value: "< 0.05%" },
      { label: "Photo Evidence", value: "Cloudinary Signed" },
      { label: "Audit Integrity", value: "100% Immutable" }
    ]
  },
  {
    slug: "finishing-packing",
    stepNumber: "06",
    title: "Final Finishing & Packaging",
    shortDesc: "Final inspection, serialized labeling, boxing & dispatch",
    fullDesc:
      "Approved units undergo final surface cleaning, protective wrapping, and custom branded labeling, followed by barcode scanning, ratio packing, and shipping carton bundling.",
    department: "Finishing & Logistics",
    typicalTime: "2-4 Hours",
    requiredPhotos: 2,
    checkpoints: [
      "Final surface cleaning and cosmetic inspection",
      "Final safety compliance and functional scan",
      "Serialized barcode SKU, custom branding, and compliance label check",
      "Carton pack ratio verification against shipping manifest"
    ],
    screenshot: "/assets/veave/admin/orders.png",
    benefits: [
      "Pristine customer-ready presentation upon final delivery",
      "100% safety and regulatory compliance for export goods",
      "Accurate packing lists eliminate carton shortages and logistics errors"
    ],
    metrics: [
      { label: "Inspection Pass", value: "100% Verified" },
      { label: "Pack Accuracy", value: "100%" },
      { label: "Shipment Readiness", value: "Automated Manifest" }
    ]
  }
];

export const PLATFORM_PILLARS = [
  {
    number: "01",
    title: "From Specs to Shop Floor",
    description: "Translate technical designs, specifications, and raw materials into structured shopfloor digital job cards.",
    tools: [
      {
        slug: "order-intake",
        title: "Order Intake & Specifications",
        desc: "Ingest client purchase orders, specifications, custom dimensions, and target delivery milestones in one centralized ledger.",
        icon: "/assets/inventory.svg",
        targetRole: "Admin / Operations"
      },
      {
        slug: "department-configurator",
        title: "Assembly Line Configurator",
        desc: "Drag-and-drop assembly stages: customize whether a product flows through Prep -> Processing -> Assembly -> QC -> Packaging.",
        icon: "/assets/photos-studio-360.svg",
        targetRole: "Production Head"
      },
      {
        slug: "digital-job-cards",
        title: "Digital Job Cards & QR Traveler",
        desc: "Replace lost paper job cards with waterproof QR traveler badges readable by any smartphone camera or shopfloor scanner.",
        icon: "/assets/dealership-website.svg",
        targetRole: "All Factory Staff"
      },
      {
        slug: "measurement-profiles",
        title: "Measurement Profiles & Tolerances",
        desc: "Define millimeter-accurate tolerance tables for dimensions, fit, and build with automated pass/fail limits.",
        icon: "/assets/ai-salesman-operator.svg",
        targetRole: "Design / QC"
      },
      {
        slug: "fabric-allocation",
        title: "Raw Material & Component Allocation",
        desc: "Track raw material inventory, quality test results, component lots, hardware, and subcomponent stock per production batch.",
        icon: "/assets/customers-leads.svg",
        targetRole: "Warehouse Manager"
      },
      {
        slug: "production-scheduling",
        title: "Capacity & Due Date Scheduling",
        desc: "Forward-schedule production lines against factory work capacity to guarantee on-time shipping for domestic and export orders.",
        icon: "/assets/deals-paperwork-esign.svg",
        targetRole: "Plant Manager"
      }
    ]
  },
  {
    number: "02",
    title: "Shop Floor Execution & Quality",
    description: "Empower supervisors and operators with clear checkpoint queues, camera evidence, and independent QC approvals.",
    tools: [
      {
        slug: "department-workspace",
        title: "Department Head Mobile Workspace",
        desc: "Distraction-free queue showing floor supervisors and station operators exactly which batches need their attention right now.",
        icon: "/assets/advertising-feeds.svg",
        targetRole: "Department Heads"
      },
      {
        slug: "milestone-checkpoints",
        title: "Mandatory Milestone Checkpoints",
        desc: "Enforce strict physical actions, alignment checks, and calibration tests before orders can advance.",
        icon: "/assets/recon-work-orders.svg",
        targetRole: "Floor Supervisors"
      },
      {
        slug: "photo-evidence",
        title: "Cloudinary Signed Photo Proof",
        desc: "Cryptographically signed photographic evidence uploaded directly from mobile cameras into tamper-proof cloud CDN archives.",
        icon: "/assets/payment-processing.svg",
        targetRole: "Supervisors & QC"
      },
      {
        slug: "qc-inspection-queue",
        title: "Independent QC Inspection Queue",
        desc: "Certified quality inspectors review submitted checkpoints with side-by-side spec comparison and 1-click approvals.",
        icon: "/assets/books-accounting.svg",
        targetRole: "QC Inspectors"
      },
      {
        slug: "defect-rectification",
        title: "Defect Callout & Rectification Loop",
        desc: "Instantly route rejected batches back to the responsible department with mandatory photo annotations and defect remarks.",
        icon: "/assets/buy-here-pay-here.svg",
        targetRole: "QC & Supervisors"
      },
      {
        slug: "factory-floor-plan",
        title: "Visual Factory Floor Plan",
        desc: "Interactive layout map of workstation tables, assembly lines, and finishing stations with live order status indicators.",
        icon: "/assets/floor-plan.svg",
        targetRole: "Operations Director"
      }
    ]
  },
  {
    number: "03",
    title: "Business, Teams & Intelligence",
    description: "Complete operational visibility, multi-tenant company security, and automated factory briefings.",
    tools: [
      {
        slug: "factory-analytics",
        title: "Factory Analytics & Efficiency (OEE)",
        desc: "Live KPI dashboard tracking daily finished unit output, Overall Equipment Effectiveness (OEE), cycle times, and scrap rates.",
        icon: "/assets/reporting-insights.svg",
        targetRole: "Factory Owner"
      },
      {
        slug: "team-chat",
        title: "Real-Time Shopfloor Team Chat",
        desc: "Integrated WebSocket chat linking factory owners, department heads, and QC inspectors directly inside order contexts.",
        icon: "/assets/titles-dmv.svg",
        targetRole: "All Staff"
      },
      {
        slug: "subdomain-isolation",
        title: "Subdomain Multi-Tenant Isolation",
        desc: "Each factory operates on its own dedicated subdomain (e.g. factory-name.veave.pk) with total database tenant isolation.",
        icon: "/assets/compliance.svg",
        targetRole: "Enterprise Security"
      },
      {
        slug: "role-permissions",
        title: "Role-Based Access & Audit Trails",
        desc: "Strict separation of duties ensuring assembly operators cannot approve their own quality, with immutable timestamped logs.",
        icon: "/assets/security-roles.svg",
        targetRole: "System Admin"
      },
      {
        slug: "telegram-briefings",
        title: "Telegram & WhatsApp Executive Briefings",
        desc: "Automated morning summaries delivered to owner phones: completed units, active line bottlenecks, and pending QC escalations.",
        icon: "/assets/ai-updates-telegram.svg",
        targetRole: "Executive Leadership"
      }
    ]
  }
];

export const ROLE_DETAILS: Record<string, RoleDetail> = {
  admin: {
    slug: "admin",
    roleName: "Factory Admin",
    title: "Factory Owner & General Manager Command Center",
    badge: "Full Production Control",
    subtitle: "Complete bird's-eye visibility across commercial orders, department assembly lines, revenues, and quality escapes.",
    overview:
      "The Factory Admin workspace is designed for owners, managing directors, and plant heads who need total command over their manufacturing business. View all active production orders, configure dynamic department sequences, balance assembly lines, manage staff roles, and track revenue and margins in real-time.",
    screenshot: "/assets/veave/admin/admin_dashboard.png",
    keyResponsibilities: [
      "Order intake, technical specification verification & delivery milestone commitments",
      "Department assembly sequence configuration & operation checkpoint rules",
      "Staff account approvals, department head assignments & QC inspector badges",
      "Factory revenue tracking, order pricing, invoice generation & QuickBooks sync",
      "Global QC oversight, inspection logs, defect escape audits & customer portal access"
    ],
    dailyWorkflow: [
      "08:00 AM: Review morning automated Telegram executive briefing on overnight output",
      "09:30 AM: Ingest 3 new client purchase orders and assign sequential department routes",
      "11:00 AM: Check visual floor plan to rebalance assembly line 4 experiencing bottleneck",
      "02:00 PM: Review escalated QC defect reports with engineering supervisor in team chat",
      "05:00 PM: Audit completed orders moving to packaging and export daily shipping manifest"
    ],
    painPointsSolved: [
      "Replaces scattered messaging updates with one unified real-time factory ledger",
      "Stops unexpected shipping delays through automated capacity and due date forecasting",
      "Protects proprietary designs and client specs with strict role-based access control"
    ],
    metrics: [
      { label: "Active Orders", value: "248 Units" },
      { label: "On-Time Dispatch", value: "98.7%" },
      { label: "OEE Efficiency", value: "84.2%" },
      { label: "Data Isolation", value: "100% Subdomain" }
    ]
  },
  "dept-head": {
    slug: "dept-head",
    roleName: "Department Head",
    title: "Department Supervisor & Shopfloor Workspace",
    badge: "Shopfloor Execution",
    subtitle: "A mobile-first, high-contrast queue engineered for department heads and line supervisors on the shop floor.",
    overview:
      "Shopfloor supervisors do not need complex financial charts or marketing analytics. They need an uncluttered, high-contrast task queue showing: 'What production batches are at my station right now, what actions must I verify, and what photo proof is required?' Veave delivers this directly to their smartphones or tablet workstations.",
    screenshot: "/assets/veave/dept_head/dept_head_dashboard.png",
    keyResponsibilities: [
      "Receiving incoming production batches through QR barcode scans",
      "Executing required physical operations and adhering to step-by-step checkpoints",
      "Capturing and uploading high-resolution Cloudinary signed photographic evidence",
      "Reviewing instant QC rejection notifications and defect tolerance remarks",
      "Executing rectification work and resubmitting batches for quality re-clearance"
    ],
    dailyWorkflow: [
      "08:15 AM: Scan incoming raw material lots and log inspection test results in Staging",
      "10:30 AM: Upload photo of component nesting layout showing 92.4% material utilization",
      "01:00 PM: Receive high-contrast red alert: QC rejected seam on batch #44 due to tolerance discrepancy",
      "01:45 PM: Re-align affected component, capture replacement photo, and resubmit for review",
      "04:30 PM: Sign off on completed 150-piece batch and hand off to main assembly line"
    ],
    painPointsSolved: [
      "Eliminates lost or illegible paper job travelers stained on the shopfloor",
      "Prevents supervisor disputes by clearly logging who performed which operation",
      "Ensures clear defect feedback from QC rather than vague verbal complaints"
    ],
    metrics: [
      { label: "Active Task Queue", value: "18 Batches" },
      { label: "Avg Handoff Speed", value: "4.5 Mins" },
      { label: "Photo Proof Uploads", value: "100% Signed" },
      { label: "Rectification Time", value: "< 35 Mins" }
    ]
  },
  qc: {
    slug: "qc",
    roleName: "QC Inspector",
    title: "Quality Assurance & Inspection Command Queue",
    badge: "Independent Verification",
    subtitle: "Certified quality inspectors verify physical units against millimeter technical tolerances with photographic proof.",
    overview:
      "Quality cannot be certified by the same person who performed the work. Veave strictly separates production from quality control: only certified QC staff can sign off on finished operations. With high-resolution photo lightboxes and 1-click approvals, inspectors ensure zero defect escapes to clients.",
    screenshot: "/assets/veave/qc/qc_dashboard.png",
    keyResponsibilities: [
      "Reviewing pending inspection queues from all active factory departments",
      "Inspecting high-resolution photos in zoomable lightboxes for defects, blemishes & alignment",
      "Verifying physical dimensions against digital technical tolerance tables",
      "Executing 1-click approvals to advance units to the next assembly department",
      "Issuing 1-click rejections with mandatory defect notes and photo annotations"
    ],
    dailyWorkflow: [
      "08:30 AM: Open QC Inspector Queue and review 12 pending staging batches",
      "09:15 AM: Verify sub-assembly symmetry in lightbox; approve batch #108 to main line",
      "11:30 AM: Measure critical dimension: identify 4mm excess over +/- 1.5mm tolerance",
      "11:35 AM: Click 'Reject with Notes', enter tolerance discrepancy, and assign back to prep",
      "03:00 PM: Conduct final 100% AQL inspection on finished batch prior to packaging release"
    ],
    painPointsSolved: [
      "Stops defect escapes before products are boxed and shipped to clients",
      "Creates an unalterable photographic record of quality at every stage of assembly",
      "Prevents shopfloor pressure from forcing substandard products through the line"
    ],
    metrics: [
      { label: "Pending Reviews", value: "6 Checkpoints" },
      { label: "Escape Rate", value: "< 0.05%" },
      { label: "Approval Latency", value: "8.2 Mins" },
      { label: "Audit Integrity", value: "Cryptographic" }
    ]
  }
};

export const FREE_TOOLS: ToolItem[] = [
  {
    slug: "fabric-consumption",
    title: "Material Consumption & Yield Calculator",
    tagline: "Calculate exact material required per batch based on dimensions, scrap %, and staging waste.",
    category: "Material & Yield",
    description: "Determine exact linear meters, square footage, or raw stock required for bulk production orders based on component surface area, stock unit size, safety allowance, and process scrap.",
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
    title: "Production SAM (Standard Allowed Minute) & SMV Calculator",
    tagline: "Estimate line capacity, cycle times, and labor cost per unit.",
    category: "Industrial Engineering",
    description: "Standard Allowed Minute (SAM) measures the exact time needed for a qualified worker to complete an operation at standard performance with relaxation allowances.",
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
    description: "Acceptable Quality Limit (AQL) 2.5 Normal Level II dictates how many units an inspector must examine and the maximum defects allowed before batch rejection.",
    formulaDescription: "Calculated based on ISO 2859-1 / ANSI/ASQ Z1.4 sampling tables for industrial inspection.",
    inputs: [
      { name: "batchSize", label: "Total Production Lot Size", defaultValue: 1200, unit: "units" },
      { name: "inspectionLevel", label: "Inspection Strictness Level (1: Low, 2: Normal, 3: Tight)", defaultValue: 2, unit: "level" }
    ],
    outputLabel: "Recommended Sample Inspection Size",
    outputUnit: "pieces to inspect (Max Acceptable Defects: 5)"
  },
  {
    slug: "line-balancing",
    title: "Line Balancing & Pitch Time Estimator",
    tagline: "Calculate operator distribution, pitch time, and line efficiency %.",
    category: "Factory Operations",
    description: "Balance assembly lines by distributing individual operations evenly across workstations to eliminate bottleneck pile-ups and idle operator times.",
    formulaDescription: "Pitch Time = Total Unit SAM / Number of Operators on Line",
    inputs: [
      { name: "totalSam", label: "Total Unit SAM", defaultValue: 24.2, unit: "minutes" },
      { name: "operators", label: "Total Assembly Line Operators", defaultValue: 32, unit: "workers" },
      { name: "dailyHours", label: "Working Shift Duration", defaultValue: 8, unit: "hours" }
    ],
    outputLabel: "Target Pitch Time per Workstation",
    outputUnit: "minutes per piece"
  },
  {
    slug: "thread-consumption",
    title: "Hardware & Consumables Usage Calculator",
    tagline: "Calculate assembly fasteners, bonding agents, and consumable quantities per unit.",
    category: "Costing & Materials",
    description: "Accurately forecast consumable hardware requirements to avoid costly stockouts during bulk production runs.",
    formulaDescription: "Consumable Quantity = (Units * Rate per Unit) * (1 + Wastage %)",
    inputs: [
      { name: "lockstitchSeam", label: "Primary Joint Fasteners / Length", defaultValue: 4.8, unit: "units/m" },
      { name: "overlockSeam", label: "Secondary Joint Fasteners / Length", defaultValue: 8.5, unit: "units/m" },
      { name: "threadWastage", label: "Process Allowance & Scrap", defaultValue: 15, unit: "%" }
    ],
    outputLabel: "Total Consumables per Batch",
    outputUnit: "units of consumables"
  },
  {
    slug: "tolerance-checker",
    title: "Component & Build Tolerance Checker",
    tagline: "Validate measured component specs against engineering rules with pass/fail boundaries.",
    category: "QC & Tolerances",
    description: "Enter technical target dimensions and allowed tolerances to immediately verify if a manufactured component passes factory inspection standards.",
    formulaDescription: "Status = (Actual >= Target - Tolerance && Actual <= Target + Tolerance) ? PASS : REJECT",
    inputs: [
      { name: "targetMeasurement", label: "Specification Target Dimension", defaultValue: 54.0, unit: "mm/cm" },
      { name: "allowedTolerance", label: "Allowed Tolerance (+/-)", defaultValue: 1.0, unit: "mm/cm" },
      { name: "actualMeasurement", label: "Physical Measured Value", defaultValue: 54.4, unit: "mm/cm" }
    ],
    outputLabel: "Tolerance Deviation Status",
    outputUnit: "PASS (+0.4mm within ±1.0mm limit)"
  }
];

export const INTEGRATION_CATEGORIES = [
  {
    name: "CAD/CAM & Technical Engineering",
    description: "Direct import of technical drawings, DXF/STEP patterns, specifications, and machine files.",
    partners: ["AutoCAD / SolidWorks", "Gerber Technology", "Lectra Modaris", "Siemens NX", "Fusion 360"]
  },
  {
    name: "Cloud Evidence & CDN",
    description: "Cryptographically signed high-res photographic evidence for every production checkpoint.",
    partners: ["Cloudinary", "AWS S3 Enterprise", "Google Cloud Storage", "Cloudflare Images"]
  },
  {
    name: "Shopfloor Barcode & Hardware",
    description: "Seamless scanning with industrial handhelds, tablet cameras, and automated conveyor eyes.",
    partners: ["Zebra Technologies", "Honeywell Industrial", "Datalogic", "Brother RFID Scanners"]
  },
  {
    name: "ERP, Invoicing & Payroll",
    description: "Sync job costing, bill of materials, contractor payments, and double-entry general ledger.",
    partners: ["QuickBooks Online", "Xero Accounting", "SAP Business One", "Oracle NetSuite"]
  },
  {
    name: "B2B Brand Feeds & eCommerce",
    description: "Ingest client wholesale orders directly from retail portals, ERPs, and custom storefronts.",
    partners: ["Shopify B2B", "WooCommerce Wholesale", "Joor Wholesale", "NuORDER by Lightspeed"]
  },
  {
    name: "Real-Time Factory Messaging",
    description: "Instant shopfloor escalation alerts, daily executive morning briefs, and automated milestone texts.",
    partners: ["WhatsApp Business API", "Telegram Bot API", "Slack Enterprise", "Twilio SMS"]
  }
];

export const VEAVE_FAQS = [
  {
    id: 1,
    category: "Getting started",
    question: "Is Veave built for all types of factories and manufacturing industries?",
    answer:
      "Yes. Veave is engineered specifically for modern production factories, assembly plants, fabrication facilities, and specialized manufacturing workshops—from 20-worker boutique facilities to 500-operator multi-line production plants across electronics, hardware, consumer goods, furniture, textiles, and packaging. It replaces paper job travelers and disjointed messaging chats with structured sequential assembly workflows."
  },
  {
    id: 2,
    category: "Getting started",
    question: "How long does factory onboarding and setup take?",
    answer:
      "Most manufacturing facilities are live within 48 to 72 hours. You configure your factory departments (e.g. Prep -> Staging -> Assembly -> QC -> Packaging), import active orders via CSV or direct entry, and assign mobile accounts to department heads. Self-serve onboarding is supported by our dedicated engineering team."
  },
  {
    id: 3,
    category: "Getting started",
    question: "Does Veave work on mobile phones and shopfloor tablets?",
    answer:
      "Yes. The Department Head and QC Inspector interfaces are designed specifically for smartphones and tablets. Operators on the factory floor can scan QR traveler codes with their device camera, view checkpoints, and upload photo evidence with zero software installation required."
  },
  {
    id: 4,
    category: "Getting started",
    question: "Can our factory operators use the app in multiple languages?",
    answer:
      "Yes. Every staff member can toggle their interface language independently (e.g. English, Urdu, Spanish, Bengali). A line supervisor can view instructions in Urdu while your quality head reviews specs in English."
  },
  {
    id: 5,
    category: "Shopfloor & Workflows",
    question: "How do sequential departmental checkpoints work?",
    answer:
      "Veave digitizes the physical assembly line. An order cannot skip a department or be marked completed until the department supervisor logs the required checkpoints (e.g. material yield, dimension tolerance, bonding strength test) and uploads photographic evidence."
  },
  {
    id: 6,
    category: "Shopfloor & Workflows",
    question: "What happens when QC rejects a production batch?",
    answer:
      "If a QC Inspector rejects an inspection checkpoint, the batch status instantly switches to high-contrast red. The assigned department supervisor receives an immediate notification with the inspector's exact remarks (e.g., 'Tolerance mismatch of 1.8mm at sub-assembly'). The batch is locked until rectification photos are uploaded and re-approved."
  },
  {
    id: 7,
    category: "Shopfloor & Workflows",
    question: "Can we customize the sequence of departments per product or order?",
    answer:
      "Yes. A standard component might flow through Prep -> Assembly -> QC -> Packaging, while a complex custom assembly might flow through Fabrication -> Surface Treatment -> Sub-Assembly -> Final Assembly -> QC -> Finishing. Factory admins have drag-and-drop freedom to customize the stage path for every product line."
  },
  {
    id: 8,
    category: "Quality Control (QC)",
    question: "Are photographic evidence uploads cryptographically secured?",
    answer:
      "Yes. All checkpoint photos uploaded by supervisors are signed cryptographically and stored in tamper-proof Cloudinary CDN archives with unalterable timestamps, operator IDs, and GPS/device metadata. This protects your factory against client claims of defect-laden shipments."
  },
  {
    id: 9,
    category: "Quality Control (QC)",
    question: "Can assembly operators approve their own work?",
    answer:
      "No. Veave enforces strict separation of duties. Only certified QC staff assigned the QC Inspector role have permission to sign off on quality checkpoints. Operators and department heads can only submit evidence; they cannot approve it."
  },
  {
    id: 10,
    category: "Multi-Tenancy & Security",
    question: "How is our factory data isolated from competitors?",
    answer:
      "Veave utilizes a strict Subdomain Multi-Tenant architecture (e.g. yourfactory.veave.pk). Your database queries are scoped by unique tenant company IDs at the middleware level. Factory A cannot view Factory B's specs, order counts, product pictures, or client pricing under any circumstances."
  },
  {
    id: 11,
    category: "Multi-Tenancy & Security",
    question: "Can clients and brand buyers track their orders?",
    answer:
      "Yes. You can grant brand clients read-only access to their specific order milestone tracker. They see real-time progress percentages and approved QC photos without needing to call your merchandisers."
  },
  {
    id: 12,
    category: "Integrations & Hardware",
    question: "Does Veave integrate with QuickBooks and our accounting software?",
    answer:
      "Yes. Veave links directly with QuickBooks Online and Xero. When an order is completed and dispatched, customer invoices, material cost allocations, and labor expenditures sync automatically to your chart of accounts."
  }
];

export const PRICING_TIERS = [
  {
    id: "atelier",
    name: "Workshop & Studio",
    price: "$149",
    period: "per month",
    description: "Engineered for specialized manufacturing workshops, fabrication studios, and assembly teams.",
    features: [
      "Up to 3 active production departments",
      "Up to 100 active monthly production units",
      "Unlimited Department Head mobile accounts",
      "1 Certified QC Inspector seat",
      "Cloudinary signed photo evidence (10GB)",
      "Digital QR traveler job cards",
      "Subdomain multi-tenant isolation",
      "Email & WhatsApp chat support"
    ],
    ctaText: "Start 14-Day Free Trial",
    popular: false
  },
  {
    id: "factory",
    name: "Production Factory",
    price: "$349",
    period: "per month",
    description: "The complete platform for manufacturing facilities running multiple active assembly lines.",
    features: [
      "Unlimited custom department sequences",
      "Up to 1,500 active monthly production units",
      "Unlimited Department Heads & line supervisors",
      "5 Certified QC Inspector seats",
      "Cloudinary signed photo evidence (100GB)",
      "Interactive visual factory floor plan",
      "Defect callout & rectification loops",
      "Daily Telegram morning executive briefings",
      "QuickBooks Online & Xero accounting sync",
      "Client order tracking portal with photo proof",
      "Priority 24/7 technical support"
    ],
    ctaText: "Start 14-Day Production Trial",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise Multi-Plant",
    price: "$799",
    period: "per month",
    description: "For multi-site manufacturers and enterprises managing multiple physical plants.",
    features: [
      "Multi-factory plant management under SuperAdmin",
      "Unlimited production volume & runs",
      "Unlimited Department Heads & QC Inspector seats",
      "Unlimited Cloudinary photographic evidence storage",
      "Custom industrial CAD/CAM integrations",
      "Industrial barcode scanner & hardware API connectors",
      "Custom SLA with 99.99% uptime guarantee",
      "Dedicated solutions engineer & on-site training"
    ],
    ctaText: "Contact Enterprise Sales",
    popular: false
  }
];

