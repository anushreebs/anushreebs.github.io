import { useEffect, useReducer, useRef, useState } from "react";
import { experiences, toolkit } from "./content";
import { EvidenceDisclosure, FlowDiagram } from "./ProjectEvidence";
import { initialReviewState, reviewReducer } from "./reviewWorkflow";

const EMAIL = "anushreebs6@gmail.com";
const RESUME = `${import.meta.env.BASE_URL}Anushree-BS-Resume-Software-Engineer.pdf`;

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

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
  return <div className="product-gallery research-gallery" role="group" aria-label="ResearchFlow product visuals, all showing synthetic prototype data">
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
  const stages = [
    { title: "Discover", body: "Dataset list", note: "Search · filters" },
    { title: "Inspect", body: "Dataset metadata", note: "Details · eligibility" },
    { title: "Request", body: "Access pending", note: "Duplicate request prevented" },
    { title: "Decide", body: "Demonstration admin", note: "Approve · reject" },
    { title: "Deliver", body: "Authorized CSV", note: "Permission checked again" },
  ];
  return <figure className="product-gallery portal-gallery" role="img" aria-label="Synthetic Research Collaborator Portal interface study: dataset discovery, metadata inspection, pending request, demonstration admin approval or rejection, and an authorized CSV download. Roles are simplified and do not represent production identity.">
    <div className="visual-window-head"><span>Access handoff / demonstration</span><span className="synthetic-tag">Synthetic records · simplified roles</span></div>
    <ol className="portal-visual-flow">{stages.map((stage, index) => <li key={stage.title} className={`portal-stage portal-stage-${index + 1}`}><span className="portal-stage-no">{String(index + 1).padStart(2, "0")} / {stage.title}</span><b>{stage.body}</b><small>{stage.note}</small></li>)}</ol>
    <figcaption>ResearchFlow follows records into reports; the Portal makes access and delivery boundaries explicit.</figcaption>
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
  const [state, dispatch] = useReducer(reviewReducer, initialReviewState);
  const edited = state.draft !== state.suggestion;
  return <div className="review-card" role="group" aria-label="Deterministic interface simulation with a fictional research record">
    <div className="review-card-top"><span className="eyebrow">Example record / RF-204</span><span className={`status-pill ${state.status}`}>{state.status === "proposed" ? "Needs review" : state.status === "approved" ? "Applied locally" : "Rejected"}</span></div>
    <div className="record-title"><span className="record-dot" /> Community health outcomes study</div>
    <div className="record-line"><span>Current record deadline</span><strong>{state.recordDeadline ? state.recordDeadline : "No deadline"}</strong></div>
    <div className="suggestion-box">
      <div className="suggestion-head"><span className="eyebrow">Suggested change</span><span className="status-pill">Source-backed example</span></div>
      <label htmlFor="deadline-input">Proposed deadline</label>
      <input id="deadline-input" type="date" value={state.draft} aria-invalid={state.error?.field === "deadline" ? "true" : undefined} aria-describedby={`deadline-help${state.error?.field === "deadline" ? " deadline-error" : ""}`} onChange={(event) => dispatch({ type: "edit", value: event.target.value })} />
      <p id="deadline-help" className="edit-note">{edited ? "Edited value — confirm the source or provide a reason for the override." : "Suggested value from the example source"}</p>
      {edited && <div className="override-reason"><label htmlFor="override-reason">Reason for the override</label><input id="override-reason" type="text" value={state.reason} aria-required="true" aria-invalid={state.error?.field === "reason" ? "true" : undefined} aria-describedby={state.error?.field === "reason" ? "reason-error" : undefined} onChange={(event) => dispatch({ type: "reason", value: event.target.value })} />{state.error?.field === "reason" && <p id="reason-error" className="field-error" role="alert">{state.error.message}</p>}</div>}
      {state.error?.field === "deadline" && <p id="deadline-error" className="field-error" role="alert">{state.error.message}</p>}
      <button className="source-toggle" type="button" onClick={() => dispatch({ type: "source" })} aria-expanded={state.sourceOpen} aria-controls="example-source">Inspect example source <span aria-hidden="true">{state.sourceOpen ? "−" : "+"}</span></button>
      <blockquote id="example-source" hidden={!state.sourceOpen}>“Please submit the full outcomes report by September 30, 2027, so the review panel has time to prepare.”<cite>— fictional project brief, section 4</cite></blockquote>
      <div className="review-actions"><button className="button button-primary small" type="button" disabled={state.status !== "proposed"} onClick={() => dispatch({ type: "approve" })}>Approve change <Arrow /></button><button className="text-button" type="button" disabled={state.status !== "proposed"} onClick={() => dispatch({ type: "reject" })}>Reject suggestion</button></div>
      <p className="review-feedback" role="status" aria-live="polite">{state.feedback}</p>
    </div>
    <div className="decision-panel"><span>Original record: no deadline. {state.status === "approved" ? "The proposed value is applied only in this local example." : state.status === "rejected" ? "The suggestion was rejected; the original record is unchanged." : "No change is applied until approval."}</span>{state.undoSnapshot && <button className="undo-button" type="button" onClick={() => dispatch({ type: "undo" })}>Undo change</button>}</div>
    <div className="activity-row"><span className="eyebrow">Activity</span><ol aria-label="Activity log">{state.activity.map((entry, index) => <li key={`${index}-${entry}`}>{entry}</li>)}</ol></div>
    <button className="reset-button" type="button" onClick={() => dispatch({ type: "reset" })}>Reset example</button>
  </div>;
}

function StateBranches() {
  const paths = [
    { title: "Accepted record", states: ["Imported", "Validating", "Validated", "Eligible for reporting"] },
    { title: "Record requiring attention", states: ["Imported", "Validating", "Needs review", "Excluded from totals"] },
  ];
  return <div className="branch-model" role="group" aria-label="State paths: accepted records become eligible for reporting; records needing review are excluded; corrected records are revalidated and either become eligible or remain excluded.">
    {paths.map((path) => <section className="branch-path" key={path.title}><h4>{path.title}</h4><ol>{path.states.map((state, index) => <li key={state}><span>{String(index + 1).padStart(2, "0")}</span><b>{state}</b></li>)}</ol></section>)}
    <section className="branch-path correction-path"><h4>Correction and revalidation</h4><ol>{["Needs review", "Correction submitted", "Revalidated"].map((state, index) => <li key={state}><span>{String(index + 1).padStart(2, "0")}</span><b>{state}</b></li>)}</ol><div className="state-outcomes"><span className="outcome-label">Revalidated outcome branches</span><div><p><b>Validated</b><i aria-hidden="true">→</i> Eligible for reporting</p><p><b>Needs review</b><i aria-hidden="true">→</i> Excluded from totals</p></div></div></section>
  </div>;
}

function ConceptChips({ label, items }: { label: string; items: string[] }) {
  return <div className="concept-group"><span className="eyebrow">{label}</span><ul className="concept-chips">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function ResearchFlowCase() {
  return <article className="case-study flagship reveal" id="researchflow" aria-labelledby="researchflow-title">
    <div className="case-index">01 / 03</div><div className="case-body">
      <div className="project-overline"><p className="eyebrow accent">Research operations and reporting</p><span>Independent prototype · Synthetic data</span></div>
      <div className="case-heading"><h3 id="researchflow-title">ResearchFlow</h3><span className="muted-label">Flagship data workflow</span></div>
      <p className="case-summary">Turning complex research operations into a usable, traceable end-to-end workflow.</p>
      <p className="case-intro">ResearchFlow moves expense records through import, validation, correction, reporting, and audit history. It preserves source context so a reviewer can understand which records contributed to a total and which still require attention.</p>
      <div className="case-decision-grid rf-decision-grid">
        <section><span className="eyebrow">The problem</span><p>A total is difficult to assess when the underlying records, exclusions, and corrections are hidden. This prototype explores how a research administrator could review those details before using a report.</p></section>
        <section><span className="eyebrow">My focus</span><p>I worked on the review workflow, interface states, data presentation, and the relationship between a source record, a correction, and a reported total.</p></section>
        <section><span className="eyebrow">Important decision</span><p>Records with unresolved findings stay out of expenditure totals. They remain visible for review rather than disappearing from the workflow.</p></section>
      </div>
      <ResearchFlowGallery />
      <ConceptChips label="Engineering concepts · described in project notes; source is not included here" items={["Deterministic validation", "Optimistic concurrency", "Transactions", "Data traceability", "Report snapshots"]} />
      <div className="evidence-scope"><b>Current status</b><span>Independent prototype with synthetic records. Technical details below are attributed to project notes, not independently confirmed against source in this portfolio repository.</span></div>
      <ProjectActions actions={[{ label: "Try ResearchFlow", href: "https://researchflow-demo.onrender.com/", external: true, primary: true }, { label: "Read implementation notes", href: "https://researchflow-demo.onrender.com/about", external: true }, { label: "Inspect the workflow", href: "#rf-workflow-evidence" }, { label: "Inspect system boundaries", href: "#rf-architecture" }, { label: "Implementation and verification", href: "#rf-evidence" }]} />
      <details className="engineering-shell" id="rf-evidence"><summary><span><b>Implementation and verification</b><small>Workflow · components · data rules · checks · limits</small></span><i aria-hidden="true">+</i></summary><div className="engineering-evidence">
        <EvidenceDisclosure id="rf-workflow-evidence" title="Workflow and failure paths"><FlowDiagram className="workflow-flow" title="Expense record workflow" description="Project notes describe each stage as a distinct user action, visible state, data change, and rule." items={[
          { title: "Import expense records", note: "Select an input file; source rows are retained for traceability" },
          { title: "Validate records", note: "API validation separates accepted rows from findings" },
          { title: "Review findings", note: "The user inspects errors and warnings; unresolved rows stay outside totals" },
          { title: "Correct and revalidate", note: "A correction is checked against record version and validation rules" },
          { title: "Recalculate reporting", note: "Only eligible records contribute; report snapshots retain selected records and filters" },
          { title: "Inspect audit history", note: "Corrections and finding updates are associated with history events" },
        ]} /><p className="evidence-note">The workflow and checks above are described in project notes. Source code for this project is not included in the current portfolio repository.</p></EvidenceDisclosure>
        <EvidenceDisclosure id="rf-architecture" title="Components and enforcement boundaries"><div className="diagram-pair">
          <FlowDiagram className="architecture-flow" title="Request and persistence path" description="A component schematic from the documented implementation; React Router is part of the interface, not a separate service." items={[
            { title: "User action", note: "Import, review a finding, correct a record, or request a report", layer: "user" },
            { title: "React interface", note: "React · TypeScript · Material UI; route and component state present results", layer: "interface" },
            { title: "HTTP request / response", note: "The interface submits a change and renders the API result", layer: "interface" },
            { title: "Node.js API", note: "Validation and correction rules are enforced at the API boundary", layer: "api" },
            { title: "SQLite", note: "Project notes describe records, versions, snapshots, and history", layer: "storage" },
            { title: "Report + audit response", note: "Eligible records form report totals; history keeps changes inspectable", layer: "output" },
          ]} />
          <FlowDiagram className="data-flow" title="Record-to-report data flow" description="Unresolved findings remain out of expenditure totals until reviewed." items={[
            { title: "Imported source row" }, { title: "Parsed record" }, { title: "Validation rules" }, { title: "Validated or needs review" }, { title: "User correction" }, { title: "Recalculated total" }, { title: "Audit event" }, { title: "Report snapshot" },
          ]} />
          <p className="evidence-note">The interface submits the request; the API applies the documented business rules. Reports use eligible records rather than calculating eligibility independently in the interface.</p>
        </div></EvidenceDisclosure>
        <EvidenceDisclosure title="States and allowed transitions"><StateBranches /></EvidenceDisclosure>
        <EvidenceDisclosure title="Decisions and alternatives"><ul className="evidence-list"><li>Project notes describe integer cents for money amounts, avoiding floating-point summation for reported expenditure.</li><li>Corrections carry a record version; the API is documented to reject stale corrections.</li><li>Correction, finding update, history, and audit events are described as one database transaction.</li><li>Report snapshots preserve their selected records and filters. These are documented implementation choices, not an independent reliability assessment.</li></ul></EvidenceDisclosure>
        <EvidenceDisclosure title="Checks and known limits"><p><b>Stack described in project notes:</b> React 19 · TypeScript · Vite · React Router · Material UI · Node.js HTTP API · SQLite.</p><p>Project notes document checks for import formats, validation rules, workspace separation, correction and undo, stale-version rejection, report snapshots, and audit behavior. These are recorded project checks; they were not rerun against the unavailable project source during this portfolio update.</p><p>This independent prototype uses fictional records and temporary demo workspaces. Its validation rules are illustrative, not institutional policy. User adoption, regulated-data suitability, concurrent-writer safety, and production reliability have not been established.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="Guided walkthrough"><ol className="walkthrough-steps"><li>Import a synthetic expense file.</li><li>Inspect validation findings and source context.</li><li>Correct a record and note its version and revalidation.</li><li>Compare the report total before and after eligible records change.</li><li>Trace a row into the audit history and snapshot.</li><li>Explain deterministic validation and the limitations of the demo.</li></ol></EvidenceDisclosure>
        <EvidenceDisclosure title="Next validation"><p>I would observe research-operations users reviewing an import, correcting a finding, and tracing a reported total. I would ask whether exclusions are understandable, the next action is clear, and a reported number can be traced back to its source. No user validation or institutional adoption is claimed.</p></EvidenceDisclosure>
      </div></details>
      <div className="case-footer"><span>Deterministic validation · synthetic data · temporary demo workspaces</span></div>
    </div>
  </article>;
}

function CollaboratorCase() {
  return <article className="case-study major-case reveal" id="collaborator" aria-labelledby="collaborator-title">
    <div className="case-index">02 / 03</div><div className="case-body">
      <div className="project-overline"><p className="eyebrow accent">Dataset discovery and access approval</p><span>Independent prototype · Synthetic data · Simplified demonstration roles</span></div>
      <div className="case-heading"><h3 id="collaborator-title">Research Collaborator Portal</h3></div>
      <p className="case-summary">Designing collaboration around roles, permissions, access boundaries, and trust.</p>
      <p className="case-intro">A dataset-access workflow that connects discovery, metadata inspection, access requests, an administrator’s decision, and authorized CSV delivery.</p>
      <div className="case-decision-grid portal-decision-grid">
        <section><span className="eyebrow">The problem · collaboration</span><p>Finding a dataset does not establish permission to download it. Requesters need understandable access states, and the system needs to enforce the decision when a file is requested.</p></section>
        <section><span className="eyebrow">Roles</span><p>A requester discovers, inspects, and asks for access; a simplified demonstration administrator makes the decision. These roles do not represent institutional identity.</p></section>
        <section><span className="eyebrow">My focus</span><p>I focused on the access-aware collaboration experience: how roles, permissions, request states, and authorized delivery are represented in the interface and underlying workflow.</p></section>
        <section><span className="eyebrow">Important decision</span><p>Approval changes request state, but download authorization is checked again by the API. A visible download control is not the permission boundary.</p></section>
      </div>
      <PortalGallery />
      <ConceptChips label="Application concepts · described in project notes; source is not included here" items={["Server-side authorization", "Access-request states", "GraphQL", "Duplicate prevention", "Authorized delivery"]} />
      <WorkflowOutline id="portal-workflow-preview" className="portal-outline" label="Access handoff · requester to authorized delivery" steps={["Discover dataset", "Inspect metadata", "Request access", "Admin decision", "Authorized CSV"]} />
      <ProjectActions actions={[{ label: "View access workflow diagram", href: "#portal-workflow-evidence", primary: true }, { label: "Read authorization rules", href: "#portal-role-boundary" }, { label: "View system architecture", href: "#portal-architecture" }, { label: "Read prototype limitations", href: "#portal-limitations" }]} />
      <details className="engineering-shell" id="portal-evidence"><summary><span><b>Implementation and verification</b><small>Workflow · role boundaries · authorization · limits</small></span><i aria-hidden="true">+</i></summary><div className="engineering-evidence">
        <EvidenceDisclosure id="portal-workflow-evidence" title="Workflow and failure paths"><FlowDiagram className="workflow-flow portal-workflow" title="Dataset access workflow" description="The project description distinguishes each request handoff and the state shown to its users." items={[
          { title: "Discover dataset", note: "Requester searches and filters synthetic metadata" }, { title: "Inspect metadata", note: "Dataset details are available before a request" }, { title: "Request access", note: "A duplicate request is documented as prevented" }, { title: "Request pending", note: "The requester sees a distinct pending state" }, { title: "Administrator decision", note: "A demonstration admin approves or rejects" }, { title: "Authorized CSV", note: "The API checks access at download time" },
        ]} /><p className="evidence-note">The source code is not present in this portfolio repository. These implementation claims are attributed to supplied project documentation.</p></EvidenceDisclosure>
        <EvidenceDisclosure id="portal-architecture" title="Components and enforcement boundaries"><div className="diagram-pair"><FlowDiagram className="architecture-flow" title="Documented request path" description="A system boundary schematic. The public demonstration is described as using PGlite; a PostgreSQL-compatible deployment is a separate option." items={[
          { title: "Requester or demo administrator", note: "Simplified demonstration roles", layer: "user" }, { title: "React interface", note: "React · TypeScript · search, metadata, request states", layer: "interface" }, { title: "GraphQL operation", note: "Dataset query, access request, decision, or download", layer: "interface" }, { title: "GraphQL Yoga API", note: "Request and decision handlers", layer: "api" }, { title: "Server-side role and access checks", note: "Protected operations decide eligibility, not just UI visibility", layer: "application" }, { title: "PGlite demonstration storage", note: "Local demo state; PostgreSQL-compatible storage is not claimed as the public runtime", layer: "storage" }, { title: "Dataset/request state → authorized CSV", note: "Delivery follows an authorization check", layer: "output" },
        ]} /><div className="role-boundary"><span className="eyebrow">Access boundary</span><p id="portal-role-boundary">Requesters can discover metadata, inspect details, and submit requests. A demonstration admin can decide a pending request. The documented API checks authorization again before returning a CSV. The interface explains eligibility; it is not the permission boundary.</p></div></div></EvidenceDisclosure>
        <EvidenceDisclosure title="Frontend states and handoffs"><div className="portal-states"><span className="eyebrow">Project description lists</span><div className="state-tags">{["Search + filters", "Loading", "Empty", "Error + retry", "Request pending", "Approved", "Rejected", "Detail drawer", "Typed messages"].map((item) => <span key={item}>{item}</span>)}</div><p>The documented interface includes dataset detail inspection, request feedback, and an accessible drawer. These behaviors are not source-inspected in this portfolio repository.</p></div></EvidenceDisclosure>
        <EvidenceDisclosure id="portal-limitations" title="Checks and known limits"><p>The project description identifies React, TypeScript, GraphQL Yoga, a PostgreSQL-compatible storage option, and PGlite for local demonstration. It describes server-side access checks, duplicate-request prevention, and authorized CSV delivery; source and negative authorization tests are not available here for independent inspection.</p><p>Synthetic data and simplified demo roles are used. Production identity, institutional permissions, S3, QuickSight, and live institutional data are not implied. Public demonstration storage is described as PGlite; a PostgreSQL deployment option is distinct.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="Guided walkthrough"><ol className="walkthrough-steps"><li>Discover a synthetic dataset and inspect its metadata.</li><li>Submit a request and show its pending state.</li><li>Switch to the demonstration admin decision.</li><li>Approve or reject, then inspect the requester-facing state.</li><li>Explain why the CSV operation checks authorization again.</li><li>Clarify simplified roles and source-inspection limits.</li></ol></EvidenceDisclosure>
      </div></details>
      <div className="case-footer"><span>Synthetic data · simplified roles · authorization behavior documented, not independently source-checked</span></div>
    </div>
  </article>;
}

function BloomCase() {
  return <article className="case-study supporting-case reveal" id="bloom-rescue" aria-labelledby="bloom-title"><div className="case-index">03 / 03</div><div className="case-body"><div className="project-overline"><p className="eyebrow accent">AI workflow and product judgment</p><span>Independent prototype · Local simulation</span></div><div className="case-heading"><h3 id="bloom-title">Bloom Rescue</h3><span className="muted-label">Supporting project</span></div><p className="case-summary">A focused example of applying AI where reviewability and human approval matter.</p><p className="case-intro">Bloom Rescue explores an application workflow in which an answer needs supporting evidence or a submission’s outcome is uncertain.</p>
    <div className="bloom-summary-grid"><section><h4>The problem</h4><p>Automatically filling an unsupported answer can create an incorrect submission. Retrying after an uncertain result can create a duplicate. The workflow needs to distinguish missing evidence from an action that may already have succeeded.</p></section><section><h4>My focus</h4><p>I explored the review flow: presenting evidence, separating suggestions from decisions, obtaining approval, and reconciling an uncertain outcome before retrying.</p></section><section><h4>Important decision</h4><p>A suggestion does not authorize an action. Evidence review and an explicit decision come before a simulated submission.</p></section></div>
    <BloomFlow />
    <ConceptChips label="Workflow concepts · Simulated model behavior" items={["Evidence retrieval", "Structured outputs", "Data provenance", "Human-in-the-loop (HITL)", "Failure recovery", "Uncertainty handling"]} />
    <ProjectActions actions={[{ label: "View interaction", href: "#interface-study", primary: true }, { label: "Read project notes", href: "#bloom-project-notes" }, { label: "See AI boundary", href: "#bloom-ai-boundary" }]} />
    <div className="bloom-evidence"><EvidenceDisclosure id="bloom-project-notes" title="Workflow implementation notes"><p>Project materials describe evidence retrieval, structured answer selection, provenance checks, human review, optional consent to reuse answers, a simulated local ATS submission, and duplicate-prevention behavior. The project source is not included in this portfolio repository, so those implementation details are attributed to documentation rather than independently inspected here.</p></EvidenceDisclosure><EvidenceDisclosure id="bloom-ai-boundary" title="AI boundary and limitations"><p>The public demonstration uses deterministic local behavior. Project materials document an optional OpenAI Responses API path, but a live model call, output quality, latency, cost, and reliability have not been evaluated here. Candidates and companies are fictional. This is not an official Bloom integration or an autonomous application service; uncertain outcomes require reconciliation before retry.</p></EvidenceDisclosure></div>
    <div className="case-footer"><span>Local simulation · model behavior not evaluated · fictional candidates and companies</span></div>
  </div></article>;
}

function InterfaceStudy() {
  return <section className="section-frame interface-study-section" id="interface-study" aria-labelledby="interface-study-title"><div className="section-label">Interface study</div><div className="interface-study-layout"><div className="interface-study-copy"><p className="eyebrow accent">Deterministic interface simulation</p><h2 id="interface-study-title">Review a suggestion<br /><em>before changing a record.</em></h2><p>This standalone interaction demonstrates source inspection, editing, approval, rejection, and undo using a fictional research record.</p><p>The suggestion is predefined. No model is called, and this interaction does not demonstrate Bloom Rescue’s application-recovery workflow.</p><ConceptChips label="AI concepts in this interface" items={["Human-in-the-loop (HITL)", "Output validation", "Approval workflows"]} /><p className="permanent-disclosure">Local simulation · No model call · No external submission</p></div><WorkflowExample /></div></section>;
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
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="site-header"><a className="wordmark" href="#top" onClick={closeMenu} aria-label="Anushree B S home"><span className="wordmark-mark">ABS</span><span>Anushree B S</span></a><button ref={menuButtonRef} className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuButtonRef.current?.focus(); } }} aria-expanded={menuOpen} aria-controls="primary-navigation"><span>{menuOpen ? "Close" : "Menu"}</span><i aria-hidden="true" /></button><nav id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation" onKeyDown={(event) => { if (event.key === "Escape") { closeMenu(); menuButtonRef.current?.focus(); } }}>{["Work", "Experience", "Approach", "About", "Contact"].map((item) => <a href={`#${item.toLowerCase()}`} key={item} onClick={closeMenu}>{item}</a>)}<a className="nav-index" href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer" onClick={closeMenu}>LinkedIn <Arrow /></a></nav></header>
    <main id="main-content">
      <section className="hero section-frame" id="top"><div className="hero-meta eyebrow"><span>SOFTWARE ENGINEER · REACT &amp; TYPESCRIPT</span><span>Dallas, TX · United States</span></div><div className="hero-grid"><div className="hero-content"><p className="hero-kicker">Frontend depth. Backend-connected work.<br />Practical AI, with product judgment.</p><h1>Frontend depth.<br /><em>From interface to API.</em></h1><p className="hero-descriptor">I’m Anushree, a software engineer with professional experience building React and TypeScript interfaces across streaming, healthcare, and enterprise applications.</p><div className="hero-foot"><p>I like turning complicated workflows into calm, usable software.</p><div className="hero-actions"><div className="hero-cta-row"><a className="button button-primary" href="#work">Explore my work <Arrow /></a><a className="button button-secondary" href={RESUME} target="_blank" rel="noreferrer">View résumé <Arrow /></a></div><div className="hero-cta-row"><a className="text-link" href={`mailto:${EMAIL}`}>Contact me <Arrow /></a><a className="text-link" href="https://github.com/anushreebs" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div><div className="social-links"><a href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div></div><p className="hero-descriptor hero-descriptor-secondary">My independent projects extend that foundation into APIs, data validation, access control, and AI-assisted workflows. I focus on how the whole task works: what users see, what the system permits, and what happens when something goes wrong.</p><p className="hero-availability">Open to Summer 2027 software engineering internships and part-time development opportunities.</p></div><ProductPreview /></div><p className="hero-support">Based in the Dallas area and pursuing an MS in Information Technology and Management at UT Dallas.</p></section>
      <section className="section-frame work-section" id="work"><div className="section-label">02 — Selected work</div><div className="work-lead reveal"><div><p className="eyebrow accent">Selected work</p><h2>Three projects.<br /><em>Three different problems.</em></h2></div><p className="work-lead-copy">ResearchFlow explores reporting integrity. Research Collaborator Portal explores authorization across an access-request workflow. Bloom Rescue explores evidence-backed suggestions and recovery from uncertain outcomes.<br /><br />Each project is an independent prototype. The descriptions distinguish implemented or documented behavior from capabilities that have not been evaluated.</p></div>
        <div className="ai-concepts-intro"><span className="eyebrow accent">AI concepts in practice</span><p>The projects below distinguish deterministic application behavior from simulated model behavior. Concept labels identify the workflow being explored; they do not imply evaluated model performance.</p></div>
        <ResearchFlowCase /><CollaboratorCase /><BloomCase />
      </section>
      <InterfaceStudy />
      <section className="section-frame" id="experience"><div className="section-label">04 — Experience</div><div className="experience-intro"><h2>Frontend engineering,<br /><em>across product contexts.</em></h2><p>Professional work in React interfaces for discovery, ordering, and healthcare reporting. The details below use the titles and dates in my résumé.</p></div><div className="timeline">{experiences.map((item) => <article className="timeline-row reveal" key={item.company}><div className="timeline-date">{item.period}</div><div className="timeline-role"><p className="eyebrow accent">{item.company}</p><h3>{item.role}</h3><p>{item.body}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
      <section className="section-frame approach-section" id="approach"><div className="section-label">05 — How I work</div><div className="approach-layout reveal"><div><p className="eyebrow accent">How I work</p><h2>Start with the task.<br /><em>Make the rules explicit.</em></h2></div><div className="approach-intro"><p>I begin by identifying what the user needs to complete, what information the system needs, and what must remain true throughout the workflow.</p><p>I separate interface feedback from enforcement. A disabled button explains an action’s availability; server-side checks determine whether the action is permitted.</p><p>I consider failure states alongside the successful path: invalid input, stale data, interrupted requests, rejected decisions, and recovery.</p><p>When AI is involved, I distinguish suggestions from accepted facts and authorized actions. I use deterministic rules where the behavior needs to be predictable, and evaluate model behavior separately from the surrounding application.</p></div></div></section>
      <section className="section-frame toolkit-section" id="toolkit"><div className="section-label">06 — Technical foundation and project practice</div><div className="toolkit-layout reveal"><div><p className="eyebrow accent">Technical foundation and project practice</p><h2>Frontend depth.<br /><em>Whole-product context.</em></h2></div><div className="toolkit-grid">{toolkit.map((group) => <div className="toolkit-group" key={group.label}><p className="eyebrow">{group.label}</p><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div><p className="toolkit-context">{group.context}</p></div>)}</div></div></section>
      <section className="section-frame initiative-section"><div className="section-label">07 — Team initiative</div><div className="initiative-layout reveal"><div><p className="eyebrow accent">Straumann Inno Week</p><h2>Smart Treatment<br /><em>Plans.</em></h2></div><div><p>I proposed and prototyped an Implant Success Predictor concept as part of the team behind Smart Treatment Plans, which won during Straumann Inno Week.</p><p className="muted-copy">My contribution was the proposal and prototype. Predictive accuracy, clinical validity, and a deployed medical capability were not established.</p></div></div></section>
      <section className="section-frame about-section" id="about"><div className="section-label">08 — About</div><div className="about-layout reveal"><div><h2>Curious about<br /><em>the whole product.</em></h2></div><div className="about-copy"><p>I’m Anushree, a software engineer pursuing an MS in Information Technology and Management at The University of Texas at Dallas.</p><p>My professional foundation is frontend engineering. I enjoy work that requires understanding more than the screen: the API contract, the underlying data, the permission boundary, and the user’s next action.</p><p>My independent projects give me room to explore those connections and practical AI workflows while keeping prototype limitations explicit.</p><div className="education"><div><span>Started August 2026</span><p><b>MS Information Technology and Management</b><br />The University of Texas at Dallas</p></div><div><span>Canara Engineering College · VTU</span><p><b>BE Computer Science and Engineering</b></p></div><div><span>Certified</span><p><b>Oracle Certified Associate</b><br />Java SE 8 Programmer</p></div></div></div></div></section>
      <section className="section-frame contact-section" id="contact"><div className="section-label">09 — Contact</div><div className="contact-layout reveal"><div><p className="eyebrow accent">Let’s connect</p><h2>Open to Summer 2027<br /><em>internships and part-time development opportunities.</em></h2><p className="contact-intro">I’m interested in software engineering work involving React and TypeScript, complex interfaces, APIs, data workflows, and practical AI integration.</p><p className="contact-intro">Based in the Dallas area. Open to discussing Dallas–Fort Worth, remote, and relocation opportunities.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${EMAIL}`}>Contact me <Arrow /></a><button className="copy-button" onClick={copyEmail}>{copyState === "copied" ? "Copied" : "Copy email"}</button><span className="sr-status" role="status" aria-live="polite">{copyState === "copied" ? "Email address copied" : copyState === "unavailable" ? "Copy is unavailable. Use the email link instead." : ""}</span></div></div><div className="contact-details"><a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL} <Arrow /></a><a href={RESUME} target="_blank" rel="noreferrer">View résumé <Arrow /></a><a href="https://github.com/anushreebs" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><span>Dallas, TX · United States</span></div></div></section>
    </main><footer className="site-footer"><span>© {new Date().getFullYear()} Anushree B S</span><a href="#top">Back to top</a></footer>
  </div>;
}

export default App;
