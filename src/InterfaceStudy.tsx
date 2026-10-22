import { useEffect, useReducer, useRef } from "react";
import { initialReviewState, reviewReducer } from "./reviewWorkflow";
import { Arrow, ConceptChips } from "./PortfolioPrimitives";

function WorkflowExample() {
  const [state, dispatch] = useReducer(reviewReducer, initialReviewState);
  const dateRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLInputElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const undoRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (state.error) (state.error.field === "deadline" ? dateRef : reasonRef).current?.focus();
    else if (state.status !== "proposed") undoRef.current?.focus();
  }, [state.error, state.status]);
  const recover = (type: "undo" | "reset") => {
    dispatch({ type });
    requestAnimationFrame(() => approveRef.current?.focus());
  };
  const edited = state.draft !== state.suggestion;
  return <div className="review-card" role="group" aria-label="Deterministic interface simulation with a fictional research record">
    <div className="review-card-top"><span className="eyebrow">Example record / RF-204</span><span className={`status-pill ${state.status}`}>{state.status === "proposed" ? "Needs review" : state.status === "approved" ? "Applied locally" : "Rejected"}</span></div>
    <div className="record-title"><span className="record-dot" /> Community health outcomes study</div>
    <div className="record-line"><span>Current record deadline</span><strong>{state.recordDeadline ? state.recordDeadline : "No deadline"}</strong></div>
    <div className="suggestion-box">
      <div className="suggestion-head"><span className="eyebrow">Suggested change</span><span className="status-pill">Source-backed example</span></div>
      <label htmlFor="deadline-input">Proposed deadline</label>
      <input ref={dateRef} id="deadline-input" type="date" value={state.draft} aria-invalid={state.error?.field === "deadline" ? "true" : undefined} aria-describedby={`deadline-help${state.error?.field === "deadline" ? " deadline-error" : ""}`} onChange={(event) => dispatch({ type: "edit", value: event.target.value })} />
      <p id="deadline-help" className="edit-note">{edited ? "Edited value — confirm the source or provide a reason for the override." : "Suggested value from the example source"}</p>
      {edited && <div className="override-reason"><label htmlFor="override-reason">Reason for the override</label><input ref={reasonRef} id="override-reason" type="text" value={state.reason} aria-required="true" aria-invalid={state.error?.field === "reason" ? "true" : undefined} aria-describedby={state.error?.field === "reason" ? "reason-error" : undefined} onChange={(event) => dispatch({ type: "reason", value: event.target.value })} />{state.error?.field === "reason" && <p id="reason-error" className="field-error" role="alert">{state.error.message}</p>}</div>}
      {state.error?.field === "deadline" && <p id="deadline-error" className="field-error" role="alert">{state.error.message}</p>}
      <button className="source-toggle" type="button" onClick={() => dispatch({ type: "source" })} aria-expanded={state.sourceOpen} aria-controls="example-source">Inspect example source <span aria-hidden="true">{state.sourceOpen ? "−" : "+"}</span></button>
      <blockquote id="example-source" hidden={!state.sourceOpen}>“Please submit the full outcomes report by September 30, 2027, so the review panel has time to prepare.”<cite>— fictional project brief, section 4</cite></blockquote>
      <div className="review-actions"><button ref={approveRef} className="button button-primary small" type="button" disabled={state.status !== "proposed"} onClick={() => dispatch({ type: "approve" })}>Approve change <Arrow /></button><button className="text-button" type="button" disabled={state.status !== "proposed"} onClick={() => dispatch({ type: "reject" })}>Reject suggestion</button></div>
      <p className="review-feedback" role="status" aria-live="polite">{state.feedback}</p>
    </div>
    <div className="decision-panel"><span>Original record: no deadline. {state.status === "approved" ? "The proposed value is applied only in this local example." : state.status === "rejected" ? "The suggestion was rejected; the original record is unchanged." : "No change is applied until approval."}</span>{state.undoSnapshot && <button ref={undoRef} className="undo-button" type="button" onClick={() => recover("undo")}>Undo change</button>}</div>
    <div className="activity-row"><span className="eyebrow">Activity</span><ol aria-label="Activity log">{state.activity.map((entry, index) => <li key={`${index}-${entry}`}>{entry}</li>)}</ol></div>
    <button className="reset-button" type="button" onClick={() => recover("reset")}>Reset example</button>
  </div>;
}

export function InterfaceStudy() {
  return <section className="section-frame interface-study-section" id="interface-study" aria-labelledby="interface-study-title"><div className="section-label">Interface study</div><div className="interface-study-layout"><div className="interface-study-copy"><p className="eyebrow accent">Deterministic interface simulation</p><h2 id="interface-study-title">Review a suggestion<br /><em>before changing a record.</em></h2><p>This standalone interaction demonstrates source inspection, editing, approval, rejection, and undo using a fictional research record.</p><p>The suggestion is predefined. No model is called, and this interaction does not demonstrate Bloom Rescue’s application-recovery workflow.</p><ConceptChips label="AI concepts in this interface" items={["Human-in-the-loop (HITL)", "Output validation", "Approval workflows"]} /><p className="permanent-disclosure">Local simulation · No model call · No external submission</p></div><WorkflowExample /></div></section>;
}
