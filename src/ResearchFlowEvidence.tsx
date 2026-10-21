import { EvidenceDisclosure, FlowDiagram } from "./ProjectEvidence";

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

export function ResearchFlowEvidence() {
  return <details className="engineering-shell" id="rf-evidence" tabIndex={-1}><summary><span><b>Project notes and evidence</b><small>Workflow · components · data rules · checks · limits</small></span><i aria-hidden="true">+</i></summary><div className="engineering-evidence"><p className="evidence-note">Technical details below are reported in project notes; they are not an independent verification of the implementation or a production claim.</p>
        <EvidenceDisclosure id="rf-workflow-evidence" title="Workflow and failure paths"><FlowDiagram className="workflow-flow" title="Expense record workflow" description="Each stage is a distinct user action, visible state, data change, and rule." items={[
          { title: "Import expense records", note: "Select an input file; source rows are retained for traceability" },
          { title: "Validate records", note: "API validation separates accepted rows from findings" },
          { title: "Review findings", note: "The user inspects errors and warnings; unresolved rows stay outside totals" },
          { title: "Correct and revalidate", note: "A correction is checked against record version and validation rules" },
          { title: "Recalculate reporting", note: "Only eligible records contribute; report snapshots retain selected records and filters" },
          { title: "Inspect audit history", note: "Corrections and finding updates are associated with history events" },
        ]} /></EvidenceDisclosure>
        <EvidenceDisclosure id="rf-architecture" title="Components and enforcement boundaries"><div className="diagram-pair">
          <FlowDiagram className="architecture-flow" title="Request and persistence path" description="React Router stays inside the interface; the diagram separates the client, API, and storage responsibilities." items={[
            { title: "User action", note: "Import, review a finding, correct a record, or request a report", layer: "user" },
            { title: "React interface", note: "React · TypeScript · Material UI; route and component state present results", layer: "interface" },
            { title: "HTTP request / response", note: "The interface submits a change and renders the API result", layer: "interface" },
            { title: "Node.js API", note: "Validation and correction rules are enforced at the API boundary", layer: "api" },
            { title: "SQLite", note: "Stores records, versions, report snapshots, and history", layer: "storage" },
            { title: "Report + audit response", note: "Eligible records form report totals; history keeps changes inspectable", layer: "output" },
          ]} />
          <FlowDiagram className="data-flow" title="Record-to-report data flow" description="Unresolved findings remain out of expenditure totals until reviewed." items={[
            { title: "Imported source row" }, { title: "Parsed record" }, { title: "Validation rules" }, { title: "Validated or needs review" }, { title: "User correction" }, { title: "Recalculated total" }, { title: "Audit event" }, { title: "Report snapshot" },
          ]} />
          <p className="evidence-note">The interface submits changes; the API enforces validation and correction rules. Reporting uses records eligible under the same server-side rules.</p>
        </div></EvidenceDisclosure>
        <EvidenceDisclosure title="States and allowed transitions"><StateBranches /></EvidenceDisclosure>
        <EvidenceDisclosure title="Decisions and alternatives"><ul className="evidence-list"><li>Money values are represented in integer cents for expenditure calculations.</li><li>Corrections include a record version; stale versions are rejected by the API.</li><li>Corrections, finding updates, history, and audit events are committed in a database transaction.</li><li>Report snapshots preserve the selected records and filters.</li></ul></EvidenceDisclosure>
        <EvidenceDisclosure title="Checks and known limits"><p><b>Stack:</b> React 19 · TypeScript · Vite · React Router · Material UI · Node.js HTTP API · SQLite.</p><p>The repository includes checks for import formats, validation rules, workspace separation, correction and undo, stale-version rejection, report snapshots, and audit behavior. These are project test cases, not a production reliability assessment.</p><p><b>Evidence and limits:</b> Independent prototype using synthetic records and temporary demo workspaces. Validation rules are illustrative. Institutional use, concurrent-writer safety, and production reliability have not been established. The source repository is private; public evidence is available through the demo and implementation notes.</p></EvidenceDisclosure>
        <EvidenceDisclosure title="Guided walkthrough"><ol className="walkthrough-steps"><li>Import a synthetic expense file.</li><li>Inspect validation findings and source context.</li><li>Correct a record and note its version and revalidation.</li><li>Compare the report total before and after eligible records change.</li><li>Trace a row into the audit history and snapshot.</li><li>Explain deterministic validation and the limitations of the demo.</li></ol></EvidenceDisclosure>
        <EvidenceDisclosure title="Next validation"><p>I would observe research-operations users reviewing an import, correcting a finding, and tracing a reported total. The questions are whether exclusions are understandable, the next action is clear, and a reported number can be traced to its source. No user validation or institutional adoption is claimed.</p></EvidenceDisclosure>
      </div></details>;
}
