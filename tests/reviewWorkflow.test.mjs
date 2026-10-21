import test from "node:test";
import assert from "node:assert/strict";
import { initialReviewState, reviewReducer, SUGGESTED_DEADLINE, validateReviewDraft } from "../src/reviewWorkflow.ts";

test("rejects empty and whitespace-only dates", () => {
  assert.deepEqual(validateReviewDraft("", SUGGESTED_DEADLINE, ""), { valid: false, field: "deadline", message: "Enter a deadline before approving." });
  assert.equal(validateReviewDraft("   ", SUGGESTED_DEADLINE, "").message, "Enter a deadline before approving.");
});

test("rejects non-date values and impossible calendar dates", () => {
  assert.equal(validateReviewDraft("banana", SUGGESTED_DEADLINE, "").message, "Enter a valid calendar date.");
  assert.equal(validateReviewDraft("2027-02-29", SUGGESTED_DEADLINE, "").message, "Enter a valid calendar date.");
  assert.equal(validateReviewDraft("2027-13-01", SUGGESTED_DEADLINE, "").message, "Enter a valid calendar date.");
});

test("accepts a real leap day and the source-supported suggestion", () => {
  assert.deepEqual(validateReviewDraft("2028-02-29", "2028-02-29", ""), { valid: true, value: "2028-02-29" });
  assert.deepEqual(validateReviewDraft(SUGGESTED_DEADLINE, SUGGESTED_DEADLINE, ""), { valid: true, value: SUGGESTED_DEADLINE });
});

test("requires an explicit reason for an unsupported override", () => {
  assert.equal(validateReviewDraft("2027-10-01", SUGGESTED_DEADLINE, " ").message, "Add a reason for the override before approving.");
  assert.deepEqual(validateReviewDraft("2027-10-01", SUGGESTED_DEADLINE, "The source was corrected"), { valid: true, value: "2027-10-01" });
});

test("invalid approval leaves the record unchanged and can be corrected", () => {
  const invalid = reviewReducer(initialReviewState, { type: "edit", value: "banana" });
  const rejected = reviewReducer(invalid, { type: "approve" });
  assert.equal(rejected.recordDeadline, null);
  assert.equal(rejected.status, "proposed");
  assert.equal(rejected.error?.message, "Enter a valid calendar date.");
  const corrected = reviewReducer(rejected, { type: "edit", value: SUGGESTED_DEADLINE });
  const approved = reviewReducer(corrected, { type: "approve" });
  assert.equal(approved.recordDeadline, SUGGESTED_DEADLINE);
  assert.equal(approved.status, "approved");
});

test("editing a field clears its stale validation error and status message", () => {
  const edited = reviewReducer(initialReviewState, { type: "edit", value: "banana" });
  const errored = reviewReducer(edited, { type: "approve" });
  const corrected = reviewReducer(errored, { type: "edit", value: SUGGESTED_DEADLINE });
  assert.equal(corrected.error, null);
  assert.equal(corrected.feedback, "Proposed deadline updated. Review before approval.");
});

test("approval is undoable and duplicate approval cannot create a second event", () => {
  const approved = reviewReducer(initialReviewState, { type: "approve" });
  const duplicate = reviewReducer(approved, { type: "approve" });
  assert.equal(duplicate, approved);
  const undone = reviewReducer(approved, { type: "undo" });
  assert.equal(undone.recordDeadline, null);
  assert.equal(undone.status, "proposed");
  assert.match(undone.activity.at(-1), /Undo/);
});

test("reject preserves the original record and undo restores the previous state", () => {
  const rejected = reviewReducer(initialReviewState, { type: "reject" });
  assert.equal(rejected.recordDeadline, null);
  assert.equal(rejected.feedback, "Suggestion rejected. The original record is unchanged.");
  const undone = reviewReducer(rejected, { type: "undo" });
  assert.equal(undone.status, "proposed");
  assert.equal(undone.recordDeadline, null);
});

test("editing after approval clears the previous approval and restores the record", () => {
  const approved = reviewReducer(initialReviewState, { type: "approve" });
  const edited = reviewReducer(approved, { type: "edit", value: "2027-10-01" });
  assert.equal(edited.status, "proposed");
  assert.equal(edited.recordDeadline, null);
  assert.equal(edited.approvedValue, null);
  assert.equal(edited.undoSnapshot, null);
});

test("an override approval applies only the reviewed value and changing its reason invalidates it", () => {
  const changed = reviewReducer(initialReviewState, { type: "edit", value: "2027-10-01" });
  const reasoned = reviewReducer(changed, { type: "reason", value: "Corrected source record" });
  const approved = reviewReducer(reasoned, { type: "approve" });
  assert.equal(approved.recordDeadline, "2027-10-01");
  assert.equal(approved.approvedValue, "2027-10-01");

  const revisedReason = reviewReducer(approved, { type: "reason", value: "Updated explanation" });
  assert.equal(revisedReason.status, "proposed");
  assert.equal(revisedReason.recordDeadline, null);
  assert.equal(revisedReason.approvedValue, null);
  assert.equal(revisedReason.undoSnapshot, null);
  assert.match(revisedReason.activity.at(-1), /reason invalidated/);
});

test("reset restores the complete initial simulation state", () => {
  const edited = reviewReducer(initialReviewState, { type: "edit", value: "banana" });
  const errored = reviewReducer(edited, { type: "approve" });
  const openSource = reviewReducer(errored, { type: "source" });
  assert.deepEqual(reviewReducer(openSource, { type: "reset" }), initialReviewState);
});
