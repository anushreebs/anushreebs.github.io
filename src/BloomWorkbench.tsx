import { useEffect, useReducer, useRef } from "react";
import { initialReviewState, reviewReducer, validateReviewDraft } from "./reviewWorkflow";
import "./bloom-workbench.css";

/** A separate instance of the existing portfolio simulation, not the Bloom application. */
export function BloomWorkbench() {
  const [state, dispatch] = useReducer(reviewReducer, initialReviewState);
  const dateRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLInputElement>(null);
  const approveRef = useRef<HTMLButtonElement>(null);
  const undoRef = useRef<HTMLButtonElement>(null);
  const edited = state.draft !== state.suggestion;
  const check = validateReviewDraft(state.draft, state.suggestion, state.reason);

  useEffect(() => {
    if (state.error) (state.error.field === "deadline" ? dateRef : reasonRef).current?.focus();
    else if (state.status !== "proposed") undoRef.current?.focus();
  }, [state.error, state.status]);

  const undo = () => {
    dispatch({ type: "undo" });
    requestAnimationFrame(() => approveRef.current?.focus());
  };

  return <section className="br-workbench" id="br-workbench" aria-labelledby="br-workbench-title">
    <header className="bw-heading"><div><span className="bw-label">Working companion / deterministic simulation</span><h4 id="br-workbench-title">The suggestion waits.<br /><em>You decide.</em></h4></div><p>Fictional research record · Predefined suggestion<br />No model call. No external submission.</p></header>
    <p className="bw-boundary">Uses the portfolio’s existing review reducer in an independent example. This demonstrates local review and undo—not Bloom Rescue’s application-recovery workflow.</p>
    <div className="bw-workspace">
      <aside className="bw-evidence" aria-label="Source context">
        <span className="bw-label">01 / Read the evidence</span><h5>A deadline, <br />with context.</h5>
        <p className="bw-record-name">RF-204<br /><strong>Community health outcomes study</strong></p>
        <button type="button" className="bw-source" data-bloom-source aria-expanded={state.sourceOpen} aria-controls="br-source" onClick={() => dispatch({ type: "source" })}>Inspect fictional source <span aria-hidden="true">{state.sourceOpen ? "−" : "+"}</span></button>
        <blockquote id="br-source" hidden={!state.sourceOpen}>“Please submit the full outcomes report by September 30, 2027, so the review panel has time to prepare.”<cite>Fictional project brief · Section 4</cite></blockquote>
        <div className="bw-source-note"><span className="bw-label">Evidence boundary</span><p>The quoted text and proposed date are predefined. Matching the date does not verify a source’s truth; an override reason records intent, not proof.</p></div>
      </aside>
      <div className="bw-proposal">
        <div className="bw-proposal-top"><span className="bw-label">02 / Review the proposal</span><span className="bw-status" data-bloom-status>{state.status === "approved" ? "Applied locally" : state.status === "rejected" ? "Rejected" : "Needs review"}</span></div>
        <h5>Set the record deadline.</h5>
        <label htmlFor="br-deadline">Proposed deadline</label>
        <input ref={dateRef} id="br-deadline" type="date" value={state.draft} aria-invalid={state.error?.field === "deadline" || undefined} aria-describedby={`br-date-help${state.error?.field === "deadline" ? " br-date-error" : ""}`} onChange={event => dispatch({ type: "edit", value: event.target.value })} />
        <p id="br-date-help" className="bw-help">{edited ? "Edited proposal. A reason is required before approval." : "Predefined suggestion: September 30, 2027."}</p>
        {state.error?.field === "deadline" && <p id="br-date-error" className="bw-error" role="alert">{state.error.message}</p>}
        {edited && <div className="bw-override"><label htmlFor="br-reason">Reason for the override <span>(required)</span></label><input ref={reasonRef} id="br-reason" type="text" value={state.reason} aria-required="true" aria-invalid={state.error?.field === "reason" || undefined} aria-describedby={state.error?.field === "reason" ? "br-reason-error" : undefined} onChange={event => dispatch({ type: "reason", value: event.target.value })} />{state.error?.field === "reason" && <p id="br-reason-error" className="bw-error" role="alert">{state.error.message}</p>}</div>}
        <div className="bw-check" data-valid={check.valid}><span aria-hidden="true">{check.valid ? "✓" : "!"}</span><div><b>{check.valid ? "Deterministic checks pass" : "A required check is unmet"}</b><p>{check.valid ? state.status === "approved" ? "Approved by you. Passing checks alone did not apply this change." : state.status === "rejected" ? "Passing checks do not override your rejection. The record is unchanged." : "Valid calendar date; override reason present when needed. Human approval is still required." : state.error ? "The proposal cannot be approved until the required input is supplied." : check.message}</p></div></div>
        <div className="bw-actions"><button ref={approveRef} className="bw-approve" data-bloom-approve type="button" disabled={state.status !== "proposed"} onClick={() => dispatch({ type: "approve" })}>Approve local change <span aria-hidden="true">↗</span></button><button data-bloom-reject type="button" disabled={state.status !== "proposed"} onClick={() => dispatch({ type: "reject" })}>Reject suggestion</button></div>
        <p className="bw-feedback" role="status" aria-live="polite" aria-atomic="true">{state.error ? "The local record is unchanged." : state.feedback}</p>
      </div>
    </div>
    <div className="bw-result"><div><span className="bw-label">03 / Observe the local result</span><div className="bw-record-value"><span>Current deadline</span><strong data-bloom-record>{state.recordDeadline ?? "No deadline"}</strong></div><p>Original record: no deadline. Editing an approved proposal clears that decision.</p></div><div className="bw-recovery">{state.undoSnapshot ? <button ref={undoRef} type="button" data-bloom-undo onClick={undo}>Undo decision <span aria-hidden="true">↶</span></button> : <span>Undo becomes available<br />after a decision.</span>}<button type="button" data-bloom-reset onClick={() => dispatch({ type: "reset" })}>Reset example</button></div></div>
    <div className="bw-history"><span className="bw-label">Activity / local memory only</span><ol data-bloom-activity aria-label="Companion activity history">{state.activity.map((entry, index) => <li key={`${index}-${entry}`}>{entry}</li>)}</ol></div>
  </section>;
}
