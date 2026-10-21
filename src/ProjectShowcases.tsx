import { useEffect, useRef, useState } from "react";
import { EvidenceDisclosure, FlowDiagram } from "./ProjectEvidence";
import { Arrow, ConceptChips } from "./PortfolioPrimitives";
import { revealHashTarget } from "./hashNavigation";

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
    const target = revealHashTarget(href);
    const focusTarget = target?.closest("details");
    if (focusTarget) requestAnimationFrame(() => (focusTarget as HTMLElement).focus({ preventScroll: true }));
  };
  return <div className="case-actions" aria-label="Project actions">{actions.map((action) => <a className={action.primary || action.external ? "case-action-primary" : undefined} key={action.label} href={action.href} target={action.external ? "_blank" : undefined} rel={action.external ? "noreferrer" : undefined} onClick={() => revealDetails(action.href)}>{action.label} <Arrow /></a>)}</div>;
}

export { ResearchFlowCase } from "./ResearchFlowCase";

export function CollaboratorCase() {
  return <article className="case-study major-case reveal" id="collaborator" aria-labelledby="collaborator-title">
    <div className="case-index">02 / 03</div><div className="case-body">
      <div className="project-overline"><p className="eyebrow accent">Dataset discovery and access approval</p><span>Independent prototype · Synthetic data · Simplified demonstration roles</span></div>
      <div className="case-heading"><h3 id="collaborator-title">Research Collaborator Portal</h3></div>
      <p className="case-summary">An independent prototype for discovering shared research data, requesting access, handling approval decisions, and delivering an authorized file.</p>
      <p className="case-intro">A dataset-access workflow that connects discovery, metadata inspection, access requests, an administrator’s decision, and authorized CSV delivery.</p>
      <div className="case-decision-grid portal-decision-grid">
        <section><span className="eyebrow">The problem · collaboration</span><p>Finding a dataset does not establish permission to download it. Requesters need understandable access states, and the system needs to enforce the decision when a file is requested.</p></section>
        <section><span className="eyebrow">Roles</span><p>A requester discovers, inspects, and asks for access; a simplified demonstration administrator makes the decision. These roles do not represent institutional identity.</p></section>
        <section><span className="eyebrow">My focus</span><p>I focused on the access-aware collaboration experience: how roles, permissions, request states, and authorized delivery are represented in the interface and underlying workflow.</p></section>
        <section><span className="eyebrow">Important decision</span><p>A visible download button is not the permission boundary. The API must check authorization when the file is requested.</p></section>
      </div>
      <PortalGallery />
      <ConceptChips label="Application concepts" items={["Server-side authorization", "Access-request states", "GraphQL", "Duplicate prevention", "Authorized delivery"]} />
      <WorkflowOutline id="portal-workflow-preview" className="portal-outline" label="Access handoff · requester to authorized delivery" steps={["Discover dataset", "Inspect metadata", "Request access", "Admin decision", "Authorized CSV"]} />
      <ProjectActions actions={[{ label: "View access workflow diagram", href: "#portal-workflow-evidence", primary: true }, { label: "Read authorization rules", href: "#portal-role-boundary" }, { label: "View system architecture", href: "#portal-architecture" }, { label: "Read prototype limitations", href: "#portal-limitations" }]} />
      <details className="engineering-shell" id="portal-evidence" tabIndex={-1}><summary><span><b>Project notes and evidence</b><small>Workflow · role boundaries · authorization · limits</small></span><i aria-hidden="true">+</i></summary><div className="engineering-evidence"><p className="evidence-note">Technical details below are reported in project notes; they are not an independent verification of the implementation or a production claim.</p>
        <EvidenceDisclosure id="portal-workflow-evidence" title="Workflow and failure paths"><FlowDiagram className="workflow-flow portal-workflow" title="Dataset access workflow" description="Each request handoff has an explicit requester or administrator state." items={[
          { title: "Discover dataset", note: "Requester searches and filters synthetic metadata" }, { title: "Inspect metadata", note: "Dataset details are available before a request" }, { title: "Request access", note: "A duplicate request is documented as prevented" }, { title: "Request pending", note: "The requester sees a distinct pending state" }, { title: "Administrator decision", note: "A demonstration admin approves or rejects" }, { title: "Authorized CSV", note: "The API checks access at download time" },
        ]} /></EvidenceDisclosure>
        <EvidenceDisclosure id="portal-architecture" title="Components and enforcement boundaries"><div className="diagram-pair"><FlowDiagram className="architecture-flow" title="Data-access request path" description="A system boundary schematic. The local demonstration uses PGlite; PostgreSQL-compatible deployment is a separate option." items={[
          { title: "Requester or demo administrator", note: "Simplified demonstration roles", layer: "user" }, { title: "React interface", note: "React · TypeScript · search, metadata, request states", layer: "interface" }, { title: "GraphQL operation", note: "Dataset query, access request, decision, or download", layer: "interface" }, { title: "GraphQL Yoga API", note: "Request and decision handlers", layer: "api" }, { title: "Server-side role and access checks", note: "Protected operations decide eligibility, not just UI visibility", layer: "application" }, { title: "PGlite demonstration storage", note: "Storage used by the local demonstration", layer: "storage" }, { title: "Dataset/request state → authorized CSV", note: "Delivery follows an authorization check", layer: "output" },
        ]} /><div className="role-boundary"><span className="eyebrow">Access boundary</span><p id="portal-role-boundary">Requesters can discover metadata, inspect details, and submit requests. A demonstration admin can decide a pending request. The API checks authorization again before returning a CSV. The interface explains eligibility; it is not the permission boundary.</p></div></div></EvidenceDisclosure>
        <EvidenceDisclosure title="Frontend states and handoffs"><div className="portal-states"><span className="eyebrow">Interface states</span><div className="state-tags">{["Search + filters", "Loading", "Empty", "Error + retry", "Request pending", "Approved", "Rejected", "Detail drawer", "Typed messages"].map((item) => <span key={item}>{item}</span>)}</div><p>The interface includes dataset detail inspection, request feedback, and a keyboard-operable drawer.</p></div></EvidenceDisclosure>
        <EvidenceDisclosure id="portal-limitations" title="Checks and known limits"><p><b>Stack:</b> React · TypeScript · GraphQL Yoga · PGlite demonstration storage. PostgreSQL-compatible deployment is a separate option.</p><p>Server-side role checks protect request decisions and CSV delivery. The repository includes API tests for approval-before-download, role boundaries, duplicate requests, and access outcomes.</p><p><b>Evidence and limits:</b> Independent prototype using synthetic data and simplified demonstration roles. Institutional identity, live institutional use, and production security have not been established. The source repository is private; no public source or test link is available.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="Guided walkthrough"><ol className="walkthrough-steps"><li>Discover a synthetic dataset and inspect its metadata.</li><li>Submit a request and show its pending state.</li><li>Switch to the demonstration admin decision.</li><li>Approve or reject, then inspect the requester-facing state.</li><li>Explain why the CSV operation checks authorization again.</li><li>Clarify the demonstration-role and synthetic-data boundaries.</li></ol></EvidenceDisclosure>
      </div></details>
    </div>
  </article>;
}

export function BloomCase() {
  return <article className="case-study supporting-case reveal" id="bloom-rescue" aria-labelledby="bloom-title"><div className="case-index">03 / 03</div><div className="case-body"><div className="project-overline"><p className="eyebrow accent">AI workflow and product judgment</p><span>Local simulation · Fictional data · Human approval required</span></div><div className="case-heading"><h3 id="bloom-title">Bloom Rescue</h3><span className="muted-label">Supporting project</span></div><p className="case-summary">A simulated AI workflow where evidence is checked, a suggestion is reviewed by a person, and the change can be approved or rejected.</p><p className="case-intro">Bloom Rescue explores an application workflow in which an answer needs supporting evidence or a submission’s outcome is uncertain.</p>
    <div className="bloom-summary-grid"><section><h4>The problem</h4><p>Automatically filling an unsupported answer can create an incorrect submission. Retrying after an uncertain result can create a duplicate. The workflow needs to distinguish missing evidence from an action that may already have succeeded.</p></section><section><h4>My focus</h4><p>I explored the review flow: presenting evidence, separating suggestions from decisions, obtaining approval, and reconciling an uncertain outcome before retrying.</p></section><section><h4>Important decision</h4><p>A suggestion does not authorize an action. Evidence review and an explicit decision come before a simulated submission.</p></section></div>
    <BloomFlow />
    <ConceptChips label="Workflow concepts · Simulated model behavior" items={["Evidence retrieval", "Structured outputs", "Data provenance", "Human-in-the-loop (HITL)", "Failure recovery", "Uncertainty handling"]} />
    <ProjectActions actions={[{ label: "Read workflow notes", href: "#bloom-project-notes" }, { label: "See AI boundary", href: "#bloom-ai-boundary" }]} />
    <div className="bloom-evidence"><EvidenceDisclosure id="bloom-project-notes" title="Workflow implementation notes"><p>Project notes describe an implementation that retrieves relevant evidence, prepares structured suggestions, checks source IDs and quotations, requires human review before approval, and records local simulated submissions. It also reconciles uncertain outcomes before a retry.</p><p><b>Evidence and limits:</b> Independent local simulation with fictional candidates and companies. The demonstration uses deterministic behavior. Project notes describe an optional model integration that has not been live-verified. Model behavior has not been independently evaluated; no production AI performance is claimed. The source repository is private and has no public code link.</p></EvidenceDisclosure><EvidenceDisclosure id="bloom-ai-boundary" title="AI boundary and limitations"><p>Project notes describe an optional API path using structured output and application checks for provenance; those checks do not establish source truth or general semantic entailment. Neither deterministic nor API mode can approve or submit on a user’s behalf. A live model call has not been demonstrated.</p></EvidenceDisclosure></div>
  </div></article>;
}
