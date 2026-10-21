import { useEffect, useRef, useState } from "react";
import { experiences, toolkit } from "./content";
import { EvidenceDisclosure, FlowDiagram, StateTrack, Walkthrough } from "./ProjectEvidence";

type DemoStatus = "proposed" | "approved" | "rejected";
const EMAIL = "anushreebs6@gmail.com";
const RESUME = `${import.meta.env.BASE_URL}Anushree-BS-Resume.pdf`;

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

function HiringPath({ compact = false }: { compact?: boolean }) {
  return <div className={`hiring-path${compact ? " hiring-path-compact" : ""}`}>
    <div className="hiring-copy"><p className="eyebrow accent">A useful fit for</p><h2>Looking for a frontend-heavy<br className="desktop-break" /> full-stack developer?</h2></div>
    <ul aria-label="What I bring"><li>React interfaces and complex product workflows</li><li>Backend-connected data systems with clear state and validation</li><li>Carefully scoped AI with human review</li><li>Product decisions translated into usable interfaces</li></ul>
    <div className="hiring-actions"><a className="button button-primary" href={`mailto:${EMAIL}`}>Contact Anushree <Arrow /></a><a className="text-link" href={RESUME} target="_blank" rel="noreferrer">View résumé <Arrow /></a></div>
  </div>;
}

function ProductPreview({ compact = false }: { compact?: boolean }) {
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = preview.getBoundingClientRect();
        const offset = Math.max(-8, Math.min(8, (bounds.top + bounds.height / 2 - window.innerHeight / 2) * -0.018));
        preview.style.setProperty("--preview-parallax", `${offset}px`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { window.removeEventListener("scroll", update); cancelAnimationFrame(frame); };
  }, []);
  return <div ref={previewRef} className={`product-preview${compact ? " product-preview-compact" : " hero-preview"}`} role="img" aria-label="ResearchFlow synthetic interface preview showing validated expenditure, open findings, reporting activity, and a rule that excludes unresolved findings from totals">
    <div className="preview-chrome"><span className="preview-logo">RF</span><span>ResearchFlow</span><span className="preview-chip">Synthetic workspace</span></div>
    <div className="preview-body"><div className="preview-sidebar"><span>OVERVIEW</span><b>Research projects</b><span>Awards & deadlines</span><span>Data quality</span><span>Reporting</span><span>Audit history</span></div><div className="preview-main"><div className="preview-kicker">RESEARCH OFFICE / OVERVIEW</div><h3>Research operations</h3><p>See which expenses are ready to report, fix the records that are not, and trace every total to its source row.</p><div className="preview-stats"><div><span>Recorded expenditure</span><b>$6,171.25</b><small>5 validated expense rows</small></div><div><span>Open findings</span><b>2</b><small>1 error · 1 review</small></div></div><div className="preview-chart"><div className="chart-label">Validated expense activity <span>FY 2026 · Q3</span></div><div className="bars"><i style={{ height: "25%" }} /><i style={{ height: "25%" }} /><i style={{ height: "82%" }} /></div><div className="chart-axis"><span>Jul</span><span>Aug</span><span>Sep</span></div></div><div className="preview-note"><span className="note-dot" /> Findings stay out of totals until reviewed.</div></div></div>
    <p className="preview-annotation"><span>↳</span> Make the rule behind a number inspectable.</p>
  </div>;
}

function ResearchFlowGallery() {
  return <div className="product-gallery research-gallery" aria-label="ResearchFlow product visuals, all showing synthetic prototype data">
    <figure className="gallery-main"><ProductPreview compact /><figcaption><span>01 / Overview</span>Trace the number back to its source.</figcaption></figure>
    <figure className="gallery-state" role="img" aria-label="Synthetic validation preview: a valid record, a warning requiring review, a source row reference, and a correction action">
      <div className="visual-window-head"><span>02 / Data quality</span><span className="synthetic-tag">Prototype data</span></div>
      <div className="validation-row valid"><b>✓</b><span>Expense row 018</span><strong>Validated</strong></div>
      <div className="validation-row finding"><b>!</b><span>Expense row 024</span><strong>Needs review</strong></div>
      <div className="source-reference"><span>Source</span><b>travel-costs.csv · row 24</b></div>
      <div className="visual-action">Inspect finding <span aria-hidden="true">↗</span></div>
      <figcaption>Unresolved findings stay out of totals.</figcaption>
    </figure>
    <figure className="gallery-audit" role="img" aria-label="Synthetic audit trail: source row imported, validation finding recorded, correction reviewed, report recalculated, audit event retained">
      <div className="visual-window-head"><span>03 / Audit history</span><span className="synthetic-tag">Prototype data</span></div>
      <ol className="audit-trail"><li><i /> <span><b>Source row imported</b><small>travel-costs.csv · row 24</small></span></li><li><i /> <span><b>Validation finding</b><small>Amount requires review</small></span></li><li><i /> <span><b>Correction reviewed</b><small>Previous value retained</small></span></li><li><i /> <span><b>Report recalculated</b><small>Audit event recorded</small></span></li></ol>
      <figcaption>Corrections leave an audit trail.</figcaption>
    </figure>
  </div>;
}

function PortalGallery() {
  const steps = ["Discover dataset", "Inspect metadata", "Request pending", "Admin decision", "Authorized CSV"];
  return <figure className="product-gallery portal-gallery" role="img" aria-label="Research Collaborator Portal synthetic workflow showing dataset discovery, metadata inspection, pending access, demonstration admin decision, and authorized CSV delivery">
    <div className="visual-window-head"><span>Access handoff / demonstration</span><span className="synthetic-tag">Synthetic records</span></div>
    <ol className="portal-visual-flow">{steps.map((step, index) => <li key={step} className={index === 2 ? "is-pending" : index === 4 ? "is-authorized" : ""}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b>{index < steps.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol>
    <div className="portal-roles"><span>Collaborator</span><span>Request state</span><span>Demo admin</span><span>Access checked again at download</span></div>
    <figcaption>Access is a handoff, not just a button.</figcaption>
  </figure>;
}

function BloomFlow() {
  const steps = ["Evidence retrieval", "Structured suggestion", "Provenance check", "Human review", "Approve or reject", "Local result"];
  return <figure className="bloom-flow" aria-labelledby="bloom-flow-title">
    <figcaption id="bloom-flow-title"><span className="eyebrow accent">A narrow, reviewable decision path</span><span className="synthetic-tag">Local simulation</span></figcaption>
    <ol>{steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b></li>)}</ol>
  </figure>;
}

function WorkflowOutline({ id, label, steps, className = "" }: { id: string; label: string; steps: string[]; className?: string }) {
  const [activeStep, setActiveStep] = useState(-1);
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const steps = Array.from(list.children);
    if (!("IntersectionObserver" in window)) {
      steps.forEach((step) => step.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = steps.indexOf(entry.target as HTMLLIElement);
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          setActiveStep(index);
        }
      });
    }, { threshold: 0.5, rootMargin: "-25% 0px -35% 0px" });
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return <div className={`workflow-outline ${className}`} id={id}>
    <span className="eyebrow">{label}</span>
    <ol ref={listRef} aria-label={label}>{steps.map((step, index) => <li key={step} className={activeStep === index ? "is-current" : undefined} aria-current={activeStep === index ? "step" : undefined}><span className="workflow-number">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
  </div>;
}

function ProjectActions({ actions }: { actions: { label: string; href: string; external?: boolean; primary?: boolean }[] }) {
  const revealDetails = (href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    let details = target?.closest("details") as HTMLDetailsElement | null;
    while (details) {
      details.open = true;
      details = details.parentElement?.closest("details") as HTMLDetailsElement | null;
    }
  };
  return <div className="case-actions" aria-label="Project actions">{actions.map((action) => <a className={action.primary || action.external ? "case-action-primary" : undefined} key={action.label} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined} onClick={() => revealDetails(action.href)}>{action.label} <Arrow /></a>)}</div>;
}

function WorkflowExample() {
  const [status, setStatus] = useState<DemoStatus>("proposed");
  const [suggestion, setSuggestion] = useState("30 September 2027");
  const [draft, setDraft] = useState("30 September 2027");
  const [sourceOpen, setSourceOpen] = useState(false);
  const [activity, setActivity] = useState(["Suggested deadline ready for review"]);
  const [edited, setEdited] = useState(false);
  const [previous, setPrevious] = useState<{ status: DemoStatus; suggestion: string; edited: boolean } | null>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const lastStatus = useRef(status);
  useEffect(() => { if (lastStatus.current !== status) statusRef.current?.focus(); lastStatus.current = status; }, [status]);
  const reset = () => { setStatus("proposed"); setSuggestion("30 September 2027"); setDraft("30 September 2027"); setSourceOpen(false); setActivity(["Suggested deadline ready for review"]); setEdited(false); setPrevious(null); };
  const apply = (nextStatus: DemoStatus, nextSuggestion: string, nextActivity: string) => { setPrevious({ status, suggestion, edited }); setStatus(nextStatus); setSuggestion(nextSuggestion); setActivity((items) => [...items, nextActivity]); };
  const approve = () => { const value = draft.trim() || suggestion; apply("approved", value, `Approved deadline: ${value}${edited ? " · edited before approval" : ""}`); };
  const reject = () => apply("rejected", suggestion, "Rejected suggested deadline · original record unchanged");
  const undo = () => { if (!previous) return; setStatus(previous.status); setSuggestion(previous.suggestion); setEdited(previous.edited); setActivity((items) => [...items, `Undo: restored the ${previous.status} state`]); setPrevious(null); };
  return <div className="review-card" aria-label="Interactive workflow example with simulated data">
    <div className="review-card-top"><span className="eyebrow">Project record / RF-204</span><span ref={statusRef} tabIndex={-1} className={`status-pill ${status}`}>{status === "proposed" ? "Needs review" : status === "approved" ? "Applied locally" : "Rejected"}</span></div>
    <div className="record-title"><span className="record-dot" /> Community health outcomes study <span className="record-arrow">↗</span></div>
    <div className="record-line"><span>Deadline</span><strong>{status === "approved" ? suggestion : "No deadline"}</strong></div>
    {status === "proposed" ? <div className="suggestion-box"><div className="suggestion-head"><span className="eyebrow">Suggested change</span><span className="ai-mark">AI</span></div><label htmlFor="deadline-input">Proposed deadline</label><input id="deadline-input" value={draft} onChange={(event) => { setDraft(event.target.value); setEdited(true); }} onKeyDown={(event) => event.key === "Enter" && approve()} /><p className="edit-note" aria-live="polite">{edited ? "Edited locally · review before applying" : "Suggested value · editable"}</p><button className="source-toggle" onClick={() => setSourceOpen((open) => !open)} aria-expanded={sourceOpen} aria-controls="evidence-panel">Inspect source <span>{sourceOpen ? "−" : "+"}</span></button><blockquote id="evidence-panel" hidden={!sourceOpen}>“Please submit the full outcomes report by September 30, 2027, so the review panel has time to prepare.”<cite>— project brief, section 4</cite></blockquote><div className="review-actions"><button className="button button-primary small" onClick={approve}>Approve <Arrow /></button><button className="text-button" onClick={reject}>Reject</button></div></div> : <div className="decision-panel"><span>{status === "approved" ? "Approved value applied to the local simulated record." : "Suggestion rejected. The original record remains unchanged."}</span><button className="reset-button" onClick={reset}>Reset example</button></div>}
    <div className="activity-row"><span className="eyebrow">Activity</span><ol aria-label="Activity history">{activity.slice(-3).map((entry, index) => <li key={`${entry}-${activity.length - 3 + index}`}>{entry}</li>)}</ol>{previous && <button className="undo-button" onClick={undo}>Undo</button>}</div><p className="sr-status" role="status" aria-live="polite">{activity[activity.length - 1]}</p>
  </div>;
}

function ResearchFlowCase() {
  return <article className="case-study flagship reveal" id="researchflow" aria-labelledby="researchflow-title">
    <div className="case-index">01 / 03</div><div className="case-body">
      <div className="project-overline"><p className="eyebrow accent">Flagship data workflow</p><span>Working prototype · synthetic data</span></div>
      <div className="case-heading"><h3 id="researchflow-title">ResearchFlow</h3></div>
      <p className="case-summary">Turning complex research operations into a usable, traceable end-to-end workflow.</p>
      <p className="case-intro">An independent prototype that moves synthetic expense imports through validation, review, reporting, and audit history—while keeping each reported number connected to its source.</p>
      <div className="case-decision-grid rf-decision-grid">
        <section><span className="eyebrow">The problem · for whom</span><p>Research operations teams can lose confidence in totals when it is hard to see which records counted, which were excluded, or why a correction happened.</p></section>
        <section><span className="eyebrow">My contribution</span><p>I focused on the workflow and interface direction for a research-operations workspace: the interaction model, data presentation, review states, and boundary between deterministic validation and unsupported automation.</p></section>
        <section><span className="eyebrow">Key product decision</span><p>Keep unresolved findings out of totals, and make the rule behind a number inspectable before someone acts on it.</p></section>
        <section><span className="eyebrow">What this demonstrates</span><p>This work demonstrates how I translate a complex operational process into a navigable product workflow while keeping data, validation, and state changes understandable.</p></section>
      </div>
      <ResearchFlowGallery />
      <WorkflowOutline id="rf-workflow" label="Workflow · import through traceability" steps={["Import", "Validate", "Review findings", "Report", "Trace decisions"]} />
      <ProjectActions actions={[{ label: "Open live demo", href: "https://researchflow-demo.onrender.com/", external: true }, { label: "Read engineering notes", href: "https://researchflow-demo.onrender.com/about", external: true }, { label: "View workflow", href: "#rf-workflow-evidence" }, { label: "View architecture", href: "#rf-architecture" }, { label: "View engineering evidence", href: "#rf-evidence" }]} />
      <details className="engineering-shell" id="rf-evidence"><summary><span><b>Engineering Evidence</b><small>Workflow · architecture · state · tradeoffs</small></span><i aria-hidden="true">+</i></summary><div className="engineering-evidence">
        <EvidenceDisclosure id="rf-workflow-evidence" title="How the workflow works"><FlowDiagram className="workflow-flow" title="User workflow" description="Each stage leaves an understandable state and a traceable result." items={[
          { title: "Import expense records", note: "Select CSV or visible XLSX sheet · import state + source rows retained" },
          { title: "Validate records", note: "API checks fields and rules · valid rows and findings separated" },
          { title: "Identify findings", note: "Inspect errors and warnings · unresolved records excluded from totals" },
          { title: "Review or correct", note: "Edit with source context · revalidation and correction history" },
          { title: "Recalculate reports", note: "Eligible records form totals · snapshots preserve filters and sources" },
          { title: "Inspect audit history", note: "See what changed, when, and why · events accompany corrections" },
        ]} /></EvidenceDisclosure>
        <EvidenceDisclosure id="rf-architecture" title="Architecture and data flow"><div className="diagram-pair">
          <FlowDiagram className="architecture-flow" title="Frontend architecture schematic" description="Verified components and boundaries in the live implementation." items={[
            { title: "User", note: "Reviews imported records and report definitions", layer: "user" },
            { title: "React interface", note: "React 19 · TypeScript · Material UI", layer: "interface" },
            { title: "React Router", note: "Route-level workflow surfaces", layer: "interface" },
            { title: "Component state + validation feedback", note: "Explicit loading, empty, error, review states", layer: "application" },
            { title: "Node.js HTTP API", note: "Request handling and deterministic rules", layer: "api" },
            { title: "SQLite persistence", note: "Temporary visitor workspaces in demo", layer: "storage" },
            { title: "Reports + audit history", note: "Traceable totals and recorded decisions", layer: "output" },
          ]} />
          <FlowDiagram className="data-flow" title="Data flow" description="Unresolved findings remain out of reporting totals until reviewed." items={[
            { title: "Imported source row" }, { title: "Parsed record" }, { title: "Validation rules" }, { title: "Valid / finding" }, { title: "User correction" }, { title: "Recalculated total" }, { title: "Audit event" }, { title: "Report output" },
          ]} />
        </div></EvidenceDisclosure>
        <EvidenceDisclosure title="State model"><div className="state-model"><StateTrack title="Included path" items={["Imported", "Validating", "Validated", "Needs review", "Corrected", "Included in report"]} /><StateTrack title="Excluded path" items={["Needs review", "Rejected or unresolved", "Excluded from report"]} /></div></EvidenceDisclosure>
        <EvidenceDisclosure title="Engineering tradeoffs"><p>Deterministic validation keeps report calculations predictable. Synthetic workspaces demonstrate the workflow without exposing confidential records, and unresolved findings stay out of totals instead of being silently included.</p><p>These choices describe this prototype; they do not establish institutional policy or production readiness.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="Technical evidence"><div className="technical-strip"><span>Verified live stack</span><p>React 19 · TypeScript · Vite · React Router · Material UI · Node.js HTTP API · SQLite</p></div><p>Project notes describe automated coverage for import, validation, correction and undo, stale-version conflicts, workspace separation, report snapshots, and audit behavior. These are recorded project results, not tests rerun for this portfolio update.</p></EvidenceDisclosure>
        <EvidenceDisclosure id="rf-interview" title="Interview view"><p>Frame the reporting-trust problem, follow a synthetic import into validation findings, correct a record, then inspect how reports exclude unresolved data and preserve row-level history.</p><p>The interface and API keep reporting rules deterministic. The demo uses synthetic data and temporary workspaces; concurrent writers, multi-process operation, regulated-data suitability, institutional integration, and LLM reporting are not established.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="What I would validate next"><p>With research-operations users, I would check whether finding language makes the next action clear, whether source-to-total traceability answers their audit questions, and whether correction history is understandable without training. No user validation or institutional adoption is claimed.</p></EvidenceDisclosure>
        <Walkthrough><ol><li>Frame the reporting trust problem.</li><li>Import a synthetic expense file.</li><li>Inspect validation findings and source context.</li><li>Correct or review a record, then explain revalidation.</li><li>Show unresolved findings remain outside totals.</li><li>Open the architecture and data-flow diagrams.</li><li>Explain deterministic validation and the limits of the demo.</li><li>Finish with audit history and row-level traceability.</li></ol></Walkthrough>
      </div></details>
      <div className="case-footer"><span>Deterministic validation · temporary demo workspaces</span></div>
    </div>
  </article>;
}

function CollaboratorCase() {
  return <article className="case-study major-case reveal" id="collaborator" aria-labelledby="collaborator-title">
    <div className="case-index">02 / 03</div><div className="case-body">
      <div className="project-overline"><p className="eyebrow accent">Data access and collaboration</p><span>Role-aware prototype · synthetic data</span></div>
      <div className="case-heading"><h3 id="collaborator-title">Research Collaborator Portal</h3></div>
      <p className="case-summary">Designing collaboration around roles, permissions, access boundaries, and trust.</p>
      <p className="case-intro">A data-access workflow: discover a dataset, inspect its details, request access, receive an admin decision, and download an authorized synthetic CSV.</p>
      <div className="case-decision-grid portal-decision-grid">
        <section><span className="eyebrow">The problem · shared research</span><p>Finding useful data is only part of collaboration. People also need clear expectations about who can inspect metadata, request access, decide, and receive a file.</p></section>
        <section><span className="eyebrow">Roles in this demonstration</span><p>Collaborator-role visitors can discover, inspect, and request. A demonstration admin can approve or reject. Roles are simplified and do not represent institutional identity.</p></section>
        <section><span className="eyebrow">My contribution</span><p>I focused on the access-aware collaboration experience: how roles, permissions, request states, and authorized delivery are represented in the interface and underlying workflow.</p></section>
        <section><span className="eyebrow">Key access decision</span><p>Approval changes request state, but the API checks authorization again when a CSV is requested; duplicate access requests are prevented.</p></section>
        <section><span className="eyebrow">What this demonstrates</span><p>This work demonstrates how I design collaboration around role boundaries and access decisions rather than treating permissions as an afterthought.</p></section>
      </div>
      <PortalGallery />
      <WorkflowOutline id="portal-workflow" className="portal-outline" label="Access handoff · request to delivery" steps={["Discover", "Inspect", "Request", "Admin decision", "Authorized download"]} />
      <ProjectActions actions={[{ label: "Open access workflow", href: "#portal-workflow", primary: true }, { label: "Inspect access boundary", href: "#portal-role-boundary" }, { label: "Open system schematic", href: "#portal-architecture" }, { label: "Read interview evidence", href: "#portal-interview" }]} />
      <details className="engineering-shell" id="portal-evidence"><summary><span><b>Engineering Evidence</b><small>Access workflow · architecture · roles · interface states</small></span><i aria-hidden="true">+</i></summary><div className="engineering-evidence">
        <EvidenceDisclosure title="How access moves"><FlowDiagram className="workflow-flow portal-workflow" title="Access workflow" description="A request progresses through explicit user-facing states before a download is available." items={[
          { title: "Dataset list", note: "Search and filter available metadata" }, { title: "Inspect metadata", note: "Open accessible detail drawer" }, { title: "Request access", note: "Submit once; prevent duplicate requests" }, { title: "Request pending", note: "Show status and next step" }, { title: "Admin decision", note: "Approved or rejected state" }, { title: "Authorized CSV", note: "Download only after access check" },
        ]} /></EvidenceDisclosure>
        <EvidenceDisclosure title="Architecture and system boundary"><div className="diagram-pair"><FlowDiagram id="portal-architecture" className="architecture-flow" title="System architecture schematic" description="Documented demonstration path; production identity and external services are not implied." items={[
          { title: "User", note: "Collaborator or demonstration administrator", layer: "user" }, { title: "React interface", note: "React · TypeScript · URL-backed filters", layer: "interface" }, { title: "GraphQL request", note: "Typed interface messages and request states", layer: "interface" }, { title: "GraphQL Yoga API", note: "Request and decision operations", layer: "api" }, { title: "Role + access checks", note: "Server-side authorization boundary", layer: "application" }, { title: "PostgreSQL-compatible store / PGlite demo", note: "Persistent deployment option / local demonstration storage", layer: "storage" }, { title: "Dataset + request state", note: "Metadata and approval decision", layer: "output" }, { title: "Authorized CSV download", note: "Only after server-side access check", layer: "output" },
        ]} /><div className="role-boundary" id="portal-role-boundary"><span className="eyebrow">Access boundary</span><p>Collaborator-role visitors can discover synthetic dataset metadata, inspect details, and create a request. The demonstration admin role can decide a pending request. The API checks access again before CSV download. Production identity and institutional permissions are not represented.</p></div></div></EvidenceDisclosure>
        <EvidenceDisclosure title="Request states and frontend"><div className="portal-states"><span className="eyebrow">Interface states</span><div className="state-tags">{["Search + filters", "Loading", "Empty", "Error + retry", "Request pending", "Approved", "Rejected", "Responsive detail drawer", "Typed messages"].map((item) => <span key={item}>{item}</span>)}</div><p>Dataset details use an accessible drawer. Duplicate requests are prevented; request submission, approval, rejection, and download eligibility have distinct feedback states.</p></div></EvidenceDisclosure>
        <EvidenceDisclosure id="portal-interview" title="Interview view"><p>Follow one dataset from discovery through metadata inspection and request submission. Switch to the demonstration admin decision, then explain why the download is checked again at the API boundary.</p><p>Roles are simplified for the prototype. They do not establish production authentication or institutional permissions.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="Technical evidence and limitations"><p>Project documentation describes React and TypeScript, GraphQL Yoga, PostgreSQL-compatible storage, and PGlite for local demonstration. The Portal source is not included in this portfolio checkout, so these details reflect supplied project documentation rather than a fresh source audit.</p><p>Only synthetic data is used. No live institutional data, production identity system, S3, or QuickSight operation is represented. Recommendation output may use metadata-grounded model output or a labeled deterministic fallback; live model operation is unverified.</p></EvidenceDisclosure>
        <Walkthrough><ol><li>Search the dataset list and open one record.</li><li>Inspect metadata in the detail drawer.</li><li>Submit an access request and show the pending state.</li><li>Use a demonstration admin role to approve or reject.</li><li>Show the authorized-download state after approval.</li><li>Explain duplicate prevention and server-side checks.</li><li>Open the system diagram and clarify demo role limits.</li></ol></Walkthrough>
      </div></details>
      <div className="case-footer"><span>Synthetic records · simplified demonstration roles</span></div>
    </div>
  </article>;
}

function BloomCase() {
  return <article className="case-study supporting-case reveal" id="bloom-rescue" aria-labelledby="bloom-title"><div className="case-index">03 / 03</div><div className="case-body"><div className="project-overline"><p className="eyebrow accent">AI workflow and product judgment</p><span>Independent prototype · simulated workflow</span></div><div className="case-heading"><h3 id="bloom-title">Bloom Rescue</h3><span className="muted-label">Supporting project</span></div><p className="case-summary">A focused example of applying AI where reviewability and human approval matter.</p><div className="bloom-summary-grid" id="bloom-project-notes"><div><h4>The problem</h4><p>How should an interrupted application recover when an answer needs evidence—or a submission may already have succeeded?</p></div><div><h4>My contribution</h4><p>I explored the product and review workflow, with explicit boundaries around what the simulated AI experience can and cannot claim.</p></div><div><h4>Workflow and what stays human</h4><p>Evidence retrieval, structured answer selection, provenance checks, and human review precede any simulated local submission. Uncertain outcomes are reconciled before retry; answers are reused only with consent.</p></div><div><h4>What this demonstrates</h4><p>Evidence-backed suggestions, visible uncertainty, deterministic fallback behavior, and a human decision at the point of change.</p></div></div><BloomFlow /><ProjectActions actions={[{ label: "View interaction", href: "#bloom-workflow", primary: true }, { label: "Read project notes", href: "#bloom-project-notes" }, { label: "See AI boundary", href: "#bloom-ai-boundary" }]} /><div className="interview-view"><EvidenceDisclosure id="bloom-ai-boundary" title="AI boundary and limitations"><p>Credential-free deterministic mode is the reliable path. An optional OpenAI Responses API path is documented, but a live model call has not been demonstrated and the public deterministic demo does not enable it. Candidates and companies are fictional. This is not an official Bloom integration; the workflow is local simulation, not an autonomous application service.</p></EvidenceDisclosure></div><div id="bloom-workflow" className="bloom-demo"><div className="workflow-copy"><p className="eyebrow accent">Interactive workflow example · simulated data</p><h4>Review before you apply.</h4><p>Inspect the source, edit the suggestion, then approve or reject it. The local preview records the decision.</p></div><WorkflowExample /></div><div className="case-footer"><span>Local simulation · model behavior unverified · fictional candidates and companies</span></div></div></article>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<"copied" | "unavailable" | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { elements.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => { try { await navigator.clipboard.writeText(EMAIL); setCopyState("copied"); } catch { setCopyState("unavailable"); } window.setTimeout(() => setCopyState(null), 2200); };
  return <div className="site-shell">
    <header className="site-header"><a className="wordmark" href="#top" onClick={closeMenu} aria-label="Anushree B S home"><span className="wordmark-mark">ABS</span><span>Anushree B S</span></a><button ref={menuButtonRef} className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuButtonRef.current?.focus(); } }} aria-expanded={menuOpen} aria-controls="primary-navigation"><span>{menuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" /></button><nav id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation" onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuButtonRef.current?.focus(); } }}>{["Work", "Experience", "Approach", "About", "Contact"].map((item) => <a href={`#${item.toLowerCase()}`} key={item} onClick={closeMenu}>{item}</a>)}<a className="nav-index" href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer" onClick={closeMenu}>LinkedIn <Arrow /></a></nav></header>
    <main id="top">
      <section className="hero section-frame"><div className="hero-meta eyebrow"><span>01 — Software Engineer</span><span>Dallas, TX · United States</span></div><div className="hero-grid"><div className="hero-content"><p className="hero-kicker">Frontend depth. Full-stack delivery.<br />Thoughtful AI.</p><h1>Useful products,<br /><em>thoughtfully built.</em></h1><p className="hero-descriptor">Frontend-focused full-stack software engineer building React and TypeScript products, backend-connected data workflows, and carefully scoped AI experiences.</p><div className="hero-foot"><p>I like turning complicated workflows into calm, usable software.</p><div className="hero-actions"><div className="hero-cta-row"><a className="button button-primary" href="#researchflow">Explore ResearchFlow <Arrow /></a><a className="button button-secondary" href={RESUME} target="_blank" rel="noreferrer">View résumé <Arrow /></a></div><a className="text-link" href={`mailto:${EMAIL}`}>Contact Anushree <Arrow /></a><div className="social-links"><a href="https://github.com/anushreebs" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div></div><p className="hero-availability">Open to Summer 2027 software engineering internships and part-time development opportunities.</p></div><ProductPreview /></div><p className="hero-support">Production frontend experience across streaming, healthcare, and enterprise applications. Currently pursuing my master’s at UT Dallas.</p></section>
      <section className="section-frame hiring-section"><HiringPath /></section>
      <section className="section-frame work-section" id="work"><div className="section-label">02 — Selected work</div><div className="work-lead reveal"><div><p className="eyebrow accent">Product builder’s field notes</p><h2>Complete workflows,<br /><em>made inspectable.</em></h2></div><p className="work-lead-copy">Complete workflows where the interface, data, and product decisions need to remain understandable.</p></div>
        <ResearchFlowCase /><CollaboratorCase /><BloomCase />
      </section>
      <section className="section-frame" id="experience"><div className="section-label">03 — Experience</div><div className="timeline">{experiences.map((item) => <article className="timeline-row reveal" key={item.company}><div className="timeline-date">{item.period}</div><div className="timeline-role"><p className="eyebrow accent">{item.company}</p><h3>{item.role}</h3><p>{item.body}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="timeline-mark" aria-hidden="true">↗</span></article>)}</div></section>
      <section className="section-frame approach-section" id="approach"><div className="section-label">04 — Approach</div><div className="approach-layout reveal"><div><h2>Make the next<br /><em>right thing clear.</em></h2><div className="approach-intro"><p>I’m drawn to products where the hard part is not adding more features, but deciding what should be clear, what should be constrained, and what should earn the user’s trust.</p><p>I care about the details people feel: sensible states, readable information, honest feedback, and interfaces that do not make users carry the system’s complexity in their heads.</p></div></div><ol className="process-list">{["Understand the user and task.", "Define a focused workflow.", "Build clear interfaces and state transitions.", "Connect APIs and data.", "Handle failures and edge cases.", "Evaluate whether AI improves the task.", "Test, gather feedback, and refine."].map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></div><div className="ai-principles"><span className="eyebrow accent">When AI is involved</span><div><p><b>The model suggests.</b> It offers a possible answer.</p><p><b>Application code validates.</b> Rules define what is accepted.</p><p><b>The user approves.</b> A person chooses what changes.</p><p><b>Uncertainty stays visible.</b> Rejection and revision remain available.</p></div></div></section>
      <section className="section-frame toolkit-section" id="toolkit"><div className="section-label">05 — Skills by evidence</div><div className="toolkit-layout reveal"><div><h2>Frontend depth.<br /><em>Whole-product thinking.</em></h2><p>My foundation is React and TypeScript; project work extends through APIs, data behavior, validation, and carefully bounded AI workflows.</p></div><div className="toolkit-grid">{toolkit.map((group) => <div className="toolkit-group" key={group.label}><p className="eyebrow">{group.label}</p><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div><p className="toolkit-context">{group.context}</p></div>)}</div></div></section>
      <section className="section-frame initiative-section"><div className="section-label">06 — Product initiative</div><div className="initiative-layout reveal"><div><p className="eyebrow accent">Straumann Inno Week</p><h2>Smart Treatment<br /><em>Plans.</em></h2></div><div><p>I proposed the Implant Success Predictor idea and developed its frontend as part of a team during Straumann Inno Week; the team won for Smart Treatment Plans.</p><p className="muted-copy">I did not train a predictive model, clinically validate it, or deploy a medical product.</p></div></div></section>
      <section className="section-frame about-section" id="about"><div className="section-label">07 — About</div><div className="about-layout reveal"><div><h2>Curious about<br /><em>the whole product.</em></h2></div><div className="about-copy"><p>I’m a software engineer with strong frontend depth who likes the point where product decisions become real interactions. React and TypeScript are my professional foundation; my independent work lets me connect interfaces to APIs and data, and explore practical AI workflows. I enjoy complex workflows, but care most about making their rules, states, and outcomes clear enough to trust.</p><p>Currently, I’m pursuing an MS in Information Technology and Management at The University of Texas at Dallas.</p><div className="education"><div><span>Aug 2026 – present</span><p><b>MS Information Technology and Management</b><br />The University of Texas at Dallas</p></div><div><span>Jul 2017 – Aug 2021</span><p><b>BE Computer Science and Engineering</b><br />Canara Engineering College · VTU</p></div><div><span>Certified</span><p><b>Oracle Certified Associate</b><br />Java SE 8 Programmer</p></div></div></div></div></section>
      <section className="section-frame studio-teaser"><div className="section-label">08 — Currently exploring</div><div className="studio-note"><p className="eyebrow accent">New work should leave evidence.</p><p>A future private workflow could turn approved project updates into evidence-backed case-study drafts before anything is published.</p></div></section>
      <section className="section-frame contact-section" id="contact"><div className="section-label">09 — Contact</div><div className="contact-layout reveal"><div><p className="eyebrow accent">Summer 2027 · part-time development</p><h2>Have a product or workflow<br /><em>that needs clarity?</em></h2><p className="contact-intro">I’m interested in frontend-heavy product work where thoughtful interaction design and solid engineering need to meet.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${EMAIL}`}>Contact Anushree <Arrow /></a><button className="copy-button" onClick={copyEmail}>{copyState === "copied" ? "Copied" : "Copy email"}</button><span className="sr-status" role="status" aria-live="polite">{copyState === "copied" ? "Email address copied" : copyState === "unavailable" ? "Copy is unavailable. Use the email link instead." : ""}</span></div></div><div className="contact-details"><a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL} <Arrow /></a><a href="https://github.com/anushreebs" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><span>Dallas, TX · open to Dallas–Fort Worth, remote, and relocation opportunities.</span><a className="resume-link" href={RESUME} target="_blank" rel="noreferrer">View résumé <Arrow /></a></div></div></section>
    </main><footer className="site-footer"><span>© {new Date().getFullYear()} Anushree B S</span><span>Built with intent, not templates.</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}

export default App;
