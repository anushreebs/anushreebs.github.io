export const experiences = [
  {
    period: "Jan 2025 — Jun 2026",
    company: "ZEE Entertainment",
    role: "Senior Software Engineer, Frontend",
    body: "Contributed to React interfaces for streaming search and recommendations, reusable TV rails, subscription flows, and remote spatial navigation. Also worked on schema-driven telemetry, GraphQL request fallbacks, and frontend testing.",
    tags: ["Telemetry payloads −35%", "Coverage 58% → 82%", "React · Jest · RTL · Cypress"],
  },
  {
    period: "Aug 2023 — Sep 2024",
    company: "Straumann Group",
    role: "Software Engineer, React",
    body: "Built React and TypeScript order interfaces with a configurable form engine and validation. Led a micro-frontend migration, introduced self-service localization, and established frontend performance guardrails.",
    tags: ["Load time −25%", "Localization across 6+ markets", "React · TypeScript"],
  },
  {
    period: "Nov 2021 — Aug 2023",
    company: "Virtusa",
    role: "Associate Engineer, Technology",
    body: "Worked on React healthcare and reporting interfaces, including accessibility across multiple applications, rendering-path improvements, analytics-enabled onboarding, document exports, and AI-assisted rich-text editing with Grammarly and live scoring.",
    tags: ["FCP ~20% · LCP ~18%", "WCAG across 3+ apps", "React · Redux"],
  },
];

export const toolkit = [
  { label: "Frontend in production", items: ["React", "TypeScript", "JavaScript", "Redux", "Responsive CSS"], context: "Streaming discovery and subscriptions; enterprise order flows; healthcare reporting." },
  { label: "Backend and APIs", items: ["Node.js", "REST", "GraphQL", "Axios", "API integration", "Request and error states"], context: "ResearchFlow API-backed review and reporting; Portal GraphQL access requests and authorization checks." },
  { label: "Data and workflow systems", items: ["SQLite", "PGlite", "Validation", "Audit history", "State modeling", "Data traceability"], context: "ResearchFlow connects source rows, review decisions, reports, and audit events; Portal models access-request state." },
  { label: "AI product workflows", items: ["Evidence retrieval", "Structured outputs", "Provenance checks", "Human approval", "Deterministic fallback", "Visible uncertainty"], context: "Bloom Rescue demonstrates a simulated, reviewable flow; live model behavior is unverified." },
  { label: "Testing and quality", items: ["Jest", "React Testing Library", "Cypress", "Accessibility", "Core Web Vitals"], context: "Testing and quality practices drawn from verified experience and project evidence." },
];
