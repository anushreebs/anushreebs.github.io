import { useState } from "react";
import { Arrow } from "./PortfolioPrimitives";

function ResearchStudy() {
  const [view, setView] = useState<"overview" | "finding">("overview");
  return <figure className="research-study">
    <figcaption className="study-caption"><span className="edition-label">01 / Interactive preview</span><span>Try both views ↓</span></figcaption>
    <div className="study-paper">
      <div className="study-masthead"><span className="study-mark" aria-hidden="true">rf.</span><div><strong>ResearchFlow</strong><span>Research operations</span></div><span className="study-data-label">Synthetic data</span></div>
      <div className="study-switch" role="group" aria-label="Explore the ResearchFlow interface study">
        <button type="button" aria-controls="study-content" aria-pressed={view === "overview"} onClick={() => setView("overview")}><span>Overview</span><span className="study-selection" aria-hidden="true">{view === "overview" ? "✓" : "↗"}</span></button>
        <button type="button" aria-controls="study-content" aria-pressed={view === "finding"} onClick={() => setView("finding")}><span>Review a finding</span><span className="study-selection" aria-hidden="true">{view === "finding" ? "✓" : "↗"}</span></button>
      </div>
      <div className="study-content" id="study-content">
        {view === "overview" ? <div key="overview" className="study-view">
          <p className="study-eyebrow">Recorded expenditure</p>
          <p className="study-amount"><span>$</span>6,171<span>.25</span></p>
          <p className="study-description">Only validated rows contribute to this total.</p>
          <div className="study-ledger"><div><span>Validated expense rows</span><strong>05</strong></div><div><span>Open findings</span><strong>02 <small>Excluded from totals</small></strong></div></div>
          <div className="study-record"><span className="study-status-dot" aria-hidden="true" /><span>Expense row 018</span><strong>Validated</strong></div>
        </div> : <div key="finding" className="study-view">
          <p className="study-eyebrow">Data quality / Expense row 024</p>
          <h2 className="study-finding-title">Flagged for review.<br /><em>Excluded from totals.</em></h2>
          <p className="study-description">An unresolved amount keeps this row out.</p>
          <div className="study-source"><span>Source reference</span><strong>travel-costs.csv · row 24</strong></div>
          <div className="study-record"><span className="study-status-dot needs-review" aria-hidden="true" /><span>Needs review</span><strong>Excluded from totals</strong></div>
        </div>}
      </div>
      <div className="study-paper-footer"><span>Reported total <strong>$6,171.25</strong></span><span>{view === "finding" ? "Unchanged" : "Validated rows only"}</span></div>
    </div>
    <div className="study-rule" role="status" aria-live="polite" aria-atomic="true"><span className="study-rule-marker" aria-hidden="true">↳</span><p key={view} className="study-feedback"><strong>{view === "overview" ? "5 validated rows → reported total" : "Unresolved amount → row excluded"}</strong>{view === "overview" ? "Switch to the finding to see why a row stays out." : "You’re inspecting a finding. The total stays unchanged; no record has been edited."}</p></div>
    <p className="study-boundary">Synthetic interface study · No records changed</p>
    <a className="edition-text-link study-case-link" href="#researchflow">Explore the engineering decisions <Arrow /></a>
  </figure>;
}

export function Hero({ resume }: { resume: string }) {
  return <section className="edition-hero" id="top" aria-labelledby="edition-title">
    <div className="edition-hero-meta"><span className="edition-label">Portfolio / Engineering & product</span><span className="edition-location">Dallas, TX <span aria-hidden="true">↗</span></span></div>
    <div className="edition-hero-grid">
      <div className="edition-intro">
        <p className="edition-label edition-role">Frontend-heavy full-stack engineer</p>
        <h1 id="edition-title">Clarity,<br /><em>engineered.</em></h1>
        <a className="edition-proof" href="#experience"><span>Professional experience at<strong>ZEE · Straumann · Virtusa</strong></span><Arrow /></a>
        <p className="edition-deck">React & TypeScript.<br />Complex production interfaces.</p>
        <p className="edition-summary">I build component architecture, API-connected workflows, and accessible interfaces—with validation and recovery designed around the user’s next action.</p>
        <p className="edition-practice">Independent projects explore AI-assisted workflows with explicit evidence checks and human review.</p>
        <div className="edition-actions"><a className="edition-button edition-button-primary" href="#work">Explore my work <Arrow /></a><a className="edition-button edition-button-secondary" href={resume} target="_blank" rel="noreferrer">View résumé <Arrow /></a></div>
        <div className="edition-availability"><span aria-hidden="true" /><p>Seeking Summer 2027 internships<span>MS Information Technology & Management · UT Dallas</span></p></div>
      </div>
      <ResearchStudy />
    </div>
    <div className="edition-credentials" aria-label="Professional engineering experience">
      <div className="edition-credentials-label"><span className="edition-label">Built on experience</span><a href="#experience">Professional work <span aria-hidden="true">↓</span></a></div>
      <div className="edition-employer"><strong>ZEE<span> Entertainment</span></strong><span>Streaming discovery<br />React state · APIs · Remote navigation</span></div>
      <div className="edition-employer"><strong>Straumann<span> Group</span></strong><span>Order workflows<br />TypeScript · Forms · Validation</span></div>
      <div className="edition-employer"><strong>Virtusa</strong><span>Healthcare reporting<br />Redux · API integration · Exports</span></div>
    </div>
    <div className="edition-bottom-line"><span>Code & professional profile</span><a className="edition-text-link" href="https://github.com/anushreebs" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a className="edition-text-link" href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div>
  </section>;
}
