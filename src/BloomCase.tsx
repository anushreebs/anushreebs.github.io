import type { MouseEvent } from "react";
import { BloomEvidence } from "./BloomEvidence";
import { BloomWorkbench } from "./BloomWorkbench";
import { ConceptChips } from "./PortfolioPrimitives";
import { revealHashTarget } from "./hashNavigation";
import "./bloom.css";

const decisions = [
  { title: "A suggestion is not permission", choice: "The documented workflow separates a structured suggestion from an explicit human decision. Neither deterministic nor optional API mode can approve or submit on a user’s behalf.", implication: "The review interface must make the proposed change and its evidence inspectable before asking for a decision." },
  { title: "Provenance checks have a boundary", choice: "Project notes describe checks for source IDs and quotations. These checks do not establish that a source is true or that it supports every interpretation of an answer.", implication: "Deterministic checks can reject a malformed or unsupported reference; they cannot replace a person’s judgment about the evidence." },
  { title: "Uncertain is different from failed", choice: "Project notes describe reconciling an uncertain simulated submission outcome before a retry, so a possible success is not treated as a confirmed failure.", implication: "Recovery needs to resolve what happened before offering another attempt. The local deadline exercise above demonstrates undo, not this submission-reconciliation behavior." },
];

export function BloomCase() {
  const openEvidence = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = revealHashTarget(hash);
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", hash);
    target.setAttribute("tabindex", "-1");
    requestAnimationFrame(() => { target.scrollIntoView({ block: "start" }); target.focus({ preventScroll: true }); });
  };
  return <article className="br-showcase" id="bloom-rescue" aria-labelledby="bloom-title">
    <header className="br-heading">
      <div className="br-kicker"><span className="br-label">03 / Selected engineering</span><span className="br-label">Evidence · Judgment · Recovery</span></div>
      <div className="br-title-grid"><div><span className="br-edition">A study in human authority</span><h3 id="bloom-title">Bloom<br /><em>Rescue.</em></h3></div><div className="br-opening"><span className="br-label">AI-assisted workflows</span><h4>Evidence informs. <br /><em>People authorize.</em></h4><p>A simulated application workflow for decisions that need supporting evidence—and actions whose outcomes may be uncertain.</p><p className="br-status">Independent local simulation · Fictional data<br />Optional model integration not live-verified</p></div></div>
      <nav className="br-local-nav" aria-label="Bloom Rescue case study"><a href="#br-workbench" onClick={event => openEvidence(event, "#br-workbench")}>Try the review exercise ↘</a><a href="#br-decisions" onClick={event => openEvidence(event, "#br-decisions")}>Inspect the decisions</a><a href="#bloom-project-notes" onClick={event => openEvidence(event, "#bloom-project-notes")}>Workflow notes ↗</a><a href="#bloom-ai-boundary" onClick={event => openEvidence(event, "#bloom-ai-boundary")}>AI boundary ↗</a></nav>
    </header>
    <BloomWorkbench />
    <section className="br-context" aria-label="Problem and contribution"><div><span className="br-label">The user & problem</span><h4>A plausible answer<br /><em>can still be wrong.</em></h4><p>A person reviewing an application needs to know whether an answer has supporting evidence. If a submission’s outcome is uncertain, retrying too quickly can create a duplicate.</p></div><div><span className="br-label">My contribution</span><h4>Make the decision<br /><em>reviewable.</em></h4><p>I explored the review flow: presenting evidence, separating suggestions from decisions, obtaining approval, and reconciling an uncertain outcome before retrying.</p></div></section>
    <section className="br-decisions" id="br-decisions" aria-labelledby="br-decisions-title"><div className="br-section-heading"><span className="br-label">Engineering decisions</span><h4 id="br-decisions-title">Build around<br /><em>the decision.</em></h4><p>Inspect the choices in the project notes and the limits of what each choice establishes.</p></div><div className="br-decision-list">{decisions.map((decision, index) => <details className="br-decision" key={decision.title}><summary><span className="br-label">0{index + 1}</span><strong>{decision.title}</strong><span aria-hidden="true">+</span></summary><div><p><b>Documented choice</b>{decision.choice}</p><p><b>Product implication</b>{decision.implication}</p></div></details>)}</div></section>
    <section className="br-architecture" aria-labelledby="br-architecture-title"><div className="br-section-heading"><span className="br-label">Architecture / Two evidence boundaries</span><h4 id="br-architecture-title">What is described.<br /><em>What you can test.</em></h4></div><div className="br-architecture-columns"><section><span className="br-label">Bloom / Project notes</span><h5>Evidence before action.</h5><ol><li>Retrieve relevant evidence; prepare a structured suggestion.</li><li>Check source IDs and quotations.</li><li>Require human review and approval or rejection.</li><li>Record a local simulated result; reconcile uncertainty before retrying.</li></ol><p>Private source. These notes describe Bloom’s workflow; the portfolio does not run its backend or optional model path.</p></section><section><span className="br-label">Portfolio / Working exercise</span><h5>A decision you can inspect.</h5><ol><li>React presents a predefined fictional deadline suggestion.</li><li>The existing reducer validates edits and override justification.</li><li>Your decision updates a local record and activity history.</li><li>Undo or reset restores local state.</li></ol><p>The deadline exercise has independent local state. No submission or model call occurs.</p></section></div></section>
    <section className="br-limits" aria-label="Evidence and limitations"><span className="br-label">Evidence / Honest boundaries</span><div><h4>Human authority is a requirement.<br /><em>AI performance is not a claim.</em></h4><p>Bloom’s demonstration uses deterministic behavior with fictional candidates and companies. Project notes describe an optional API path using structured output; a live model call has not been demonstrated or independently evaluated.</p><p>The review exercise is a separate fictional deadline scenario. It makes validation, explicit decisions, and local undo testable; it does not verify Bloom’s evidence retrieval or uncertain-submission reconciliation.</p></div></section>
    <ConceptChips label="Workflow concepts · Simulated model behavior" items={["Evidence retrieval", "Structured outputs", "Data provenance", "Human-in-the-loop (HITL)", "Failure recovery", "Uncertainty handling"]} />
    <BloomEvidence />
  </article>;
}
