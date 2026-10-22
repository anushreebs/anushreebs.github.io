import { useState } from "react";
import { Arrow } from "./PortfolioPrimitives";
import { ResearchFlowEvidence } from "./ResearchFlowEvidence";
import { revealHashTarget } from "./hashNavigation";
import "./researchflow.css";

const stages = [
  { id: "source", label: "Source record", note: "Keep the original context", number: "01" },
  { id: "validation", label: "Validation", note: "Separate accepted from unresolved", number: "02" },
  { id: "report", label: "Report & audit", note: "Explain what contributes", number: "03" },
] as const;
type Stage = typeof stages[number]["id"];

function RecordTrace() {
  const [stage, setStage] = useState<Stage>("validation");
  const feedback = {
    source: "The source reference keeps the finding connected to the imported record.",
    validation: "An unresolved finding remains visible for review, but cannot contribute to expenditure totals.",
    report: "The synthetic total includes five validated rows. The two open findings stay outside it.",
  };
  return <section className="rf-product" aria-labelledby="rf-product-title">
    <div className="rf-product-heading"><div><span className="rf-label">An inspectable workflow</span><h4 id="rf-product-title">Follow the record.<br /><em>Understand the number.</em></h4></div><p className="rf-reconstruction-note">Reconstructed interface · Synthetic data<br />View-only explanation. No records are changed.</p></div>
    <div className="rf-workbench">
      <div className="rf-stage-controls" role="group" aria-label="Inspect the ResearchFlow record path">
        {stages.map(item => <button key={item.id} type="button" data-rf-step={item.id} aria-pressed={stage === item.id} aria-controls="rf-stage-panel" onClick={() => setStage(item.id)}><span className="rf-step-number">{item.number}</span><span><strong>{item.label}</strong><small>{item.note}</small></span><span className="rf-step-arrow" aria-hidden="true">{stage === item.id ? "↳" : "→"}</span></button>)}
        <p className="rf-selector-hint">Select a stage to inspect<br />its role in reporting integrity.</p>
      </div>
      <div className="rf-stage" id="rf-stage-panel">
        <div className="rf-stage-topline"><span>ResearchFlow / {stages.find(item => item.id === stage)?.label}</span><span>Illustrative records</span></div>
        <div key={stage} className="rf-stage-view">
          <div className="rf-view-content" aria-hidden={stage !== "source"} inert={stage !== "source"}>
            <div className="rf-view-heading"><span className="rf-label">01 / Traceability</span><h5>A finding needs context.</h5><p>The source survives the import so a reviewer can locate the record behind a warning.</p></div>
            <div className="rf-source-document"><div><span className="rf-file-icon" aria-hidden="true">↳</span><strong>travel-costs.csv</strong><span>Source row 24</span></div><dl><div><dt>Record</dt><dd>Expense row 024</dd></div><div><dt>Finding</dt><dd>Amount requires review</dd></div><div><dt>Next action</dt><dd>Inspect, correct, and revalidate</dd></div></dl></div>
            <p className="rf-stage-footnote">Source context stays available while a record needs attention.</p>
          </div>
          <div className="rf-view-content" aria-hidden={stage !== "validation"} inert={stage !== "validation"}>
            <div className="rf-view-heading"><span className="rf-label">02 / Eligibility</span><h5>Visible is not the same as valid.</h5><p>Keep unresolved records in the workflow. Keep them out of the reported total.</p></div>
            <div className="rf-record-table" role="table" aria-label="Two illustrative expense record states">
              <div role="row" className="rf-table-head"><span role="columnheader">Expense record</span><span role="columnheader">Review state</span><span role="columnheader">Reporting</span></div>
              <div role="row"><strong role="cell">Row 018</strong><span role="cell" className="rf-valid">✓ Validated</span><span role="cell">Eligible</span></div>
              <div role="row" className="rf-held-row"><strong role="cell">Row 024</strong><span role="cell" className="rf-warning">! Needs review</span><strong role="cell">Excluded from totals</strong></div>
            </div>
            <div className="rf-exclusion"><span aria-hidden="true">↳</span><p><strong>Amount requires review</strong>travel-costs.csv · row 24</p><span className="rf-hold-label">Held for review</span></div>
            <p className="rf-stage-footnote">A correction must pass revalidation before the record becomes eligible.</p>
          </div>
          <div className="rf-view-content" aria-hidden={stage !== "report"} inert={stage !== "report"}>
            <div className="rf-view-heading"><span className="rf-label">03 / Reporting integrity</span><h5>A total with an explanation.</h5><p>Report eligible records while keeping exclusions and corrections inspectable.</p></div>
            <div className="rf-report-summary"><div><span>Recorded expenditure</span><strong>$6,171.25</strong><small>5 validated expense rows</small></div><div><span>Outside the total</span><strong>02</strong><small>Open findings · 1 error / 1 review</small></div></div>
            <div className="rf-audit-note"><span className="rf-label">Documented correction path</span><p>Correction reviewed <span aria-hidden="true">→</span> Revalidation <span aria-hidden="true">→</span> Report recalculated <span aria-hidden="true">→</span> Audit event retained</p></div>
            <p className="rf-stage-footnote">This view explains the documented workflow; it does not apply a correction or recalculate data.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="rf-behavior" role="status" aria-live="polite" aria-atomic="true"><span className="rf-label">Why it matters</span><p>{feedback[stage]}</p></div>
  </section>;
}

const decisions = [
  { title: "Exclude unresolved findings", choice: "Records with unresolved findings stay outside expenditure totals, while remaining visible for review.", implication: "The reporting view must explain exclusions as clearly as it explains the total. A clean-looking number is not enough." },
  { title: "Check the record version", choice: "Project notes describe versioned corrections and API rejection of stale versions.", implication: "A conflicting correction cannot silently overwrite the newer record. The conflict needs resolution before the change can succeed." },
  { title: "Keep a correction together", choice: "Project notes describe a transaction for corrections, finding updates, history, and audit events.", implication: "The transaction boundary couples those writes so the record and its history can be treated as one change. Concurrent-writer safety is not established." },
  { title: "Preserve the report’s context", choice: "Money is represented in integer cents. Report snapshots preserve selected records and filters.", implication: "Calculations use an explicit money representation; a saved report retains its selected context rather than representing a continuously changing view." },
];

export function ResearchFlowCase() {
  const openEvidence = (hash: string) => {
    const target = revealHashTarget(hash);
    const details = target?.closest("details");
    if (details) requestAnimationFrame(() => details.focus({ preventScroll: true }));
  };
  return <article className="rf-showcase" id="researchflow" aria-labelledby="researchflow-title">
    <header className="rf-heading">
      <div className="rf-kicker"><span className="rf-label">01 / Selected engineering</span><span className="rf-label">Research operations & reporting</span></div>
      <div className="rf-title-row"><h3 id="researchflow-title">ResearchFlow<span aria-hidden="true">.</span></h3><p>Independent prototype<br />Synthetic data · Temporary demo workspace</p></div>
      <div className="rf-introduction"><h4>A report is only as reliable<br />as <em>the rows behind it.</em></h4><p>An expense-review workflow connecting import, validation, correction, and reporting. Trace what a total includes, what it excludes, and why.</p></div>
      <div className="rf-actions"><a className="edition-button edition-button-primary" href="https://researchflow-demo.onrender.com/" target="_blank" rel="noreferrer">Try ResearchFlow <Arrow /></a><a className="edition-text-link" href="https://researchflow-demo.onrender.com/about" target="_blank" rel="noreferrer">Implementation notes <Arrow /></a><a className="edition-text-link" href="#rf-architecture" onClick={() => openEvidence("#rf-architecture")}>Read local implementation evidence <Arrow /></a></div>
      <nav className="rf-local-nav" aria-label="ResearchFlow case study"><a href="#rf-context">Problem & contribution</a><a href="#rf-decisions">Engineering decisions</a><a href="#rf-architecture" onClick={() => openEvidence("#rf-architecture")}>Architecture <span aria-hidden="true">↗</span></a><a href="#rf-limits">Evidence & limits</a></nav>
    </header>
    <RecordTrace />
    <section className="rf-context" id="rf-context" aria-label="Problem and contribution">
      <div><span className="rf-label">The user & problem</span><h4>Review the record.<br />Trust the report?</h4><p>A research administrator needs to assess imported expenses before using a report. Hidden exclusions and corrections make a total difficult to evaluate.</p></div>
      <div><span className="rf-label">My contribution</span><h4>The review workflow,<br />from row to report.</h4><p>I worked on interface states, data presentation, and the relationship between a source record, a correction, and a reported total.</p></div>
    </section>
    <section className="rf-decisions" id="rf-decisions" aria-labelledby="rf-decisions-title">
      <div className="rf-section-heading"><div><span className="rf-label">Engineering decisions</span><h4 id="rf-decisions-title">Rules that shape<br /><em>the experience.</em></h4></div><p>Inspect the documented choices and their implications for the review workflow.</p></div>
      <div className="rf-decision-list">{decisions.map((decision, index) => <details className="rf-decision" key={decision.title}><summary><span className="rf-label">0{index + 1}</span><strong>{decision.title}</strong><span className="rf-disclosure-icon" aria-hidden="true">+</span></summary><div><p><b>Documented choice</b>{decision.choice}</p><p><b>Design implication</b>{decision.implication}</p></div></details>)}</div>
    </section>
    <section className="rf-system" aria-label="Architecture overview">
      <div className="rf-section-heading"><div><span className="rf-label">Documented architecture</span><h4>The interface explains.<br /><em>The API enforces.</em></h4></div><p>The client presents states and submits changes. Validation and correction rules belong at the API boundary.</p></div>
      <ol className="rf-system-path"><li><span className="rf-label">01 / Interface</span><strong>React + TypeScript</strong><p>Material UI · React Router<br />Review states & user actions</p></li><li><span className="rf-label">02 / Enforcement</span><strong>Node.js HTTP API</strong><p>Validation · Version checks<br />Correction rules</p></li><li><span className="rf-label">03 / Persistence</span><strong>SQLite</strong><p>Records · History<br />Report snapshots</p></li></ol>
      <a className="edition-text-link" href="#rf-architecture" onClick={() => openEvidence("#rf-architecture")}>Inspect the full request and data paths <Arrow /></a>
    </section>
    <section className="rf-limits" id="rf-limits" aria-label="Evidence and limitations"><span className="rf-label">Available evidence / Honest boundaries</span><div><h4>A prototype you can inspect.<br /><em>Not a production claim.</em></h4><p>Inspect the public demo or the local project notes below. Source is private; the demo uses synthetic records, temporary workspaces, and illustrative validation rules.</p><p>Institutional use, concurrent-writer safety, and production reliability have not been established. Project test cases are described in the notes; they are not a production reliability assessment.</p><p><b>Next validation:</b> Observe research-operations users correcting a finding and tracing a total. Are exclusions understandable, and is the next action clear? No user validation or institutional adoption is claimed.</p></div></section>
    <ResearchFlowEvidence />
  </article>;
}
