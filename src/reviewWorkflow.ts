export type ReviewError = { field: "deadline" | "reason"; message: string };
export type ReviewSnapshot = {
  status: "proposed" | "approved" | "rejected";
  draft: string;
  reason: string;
  recordDeadline: string | null;
  approvedValue: string | null;
  sourceOpen: boolean;
  feedback: string;
  activity: string[];
};
export type ReviewState = ReviewSnapshot & {
  suggestion: string;
  error: ReviewError | null;
  undoSnapshot: ReviewSnapshot | null;
};
export type ReviewAction =
  | { type: "edit"; value: string }
  | { type: "reason"; value: string }
  | { type: "source" }
  | { type: "approve" }
  | { type: "reject" }
  | { type: "undo" }
  | { type: "reset" };

export const SUGGESTED_DEADLINE = "2027-09-30";

export const initialReviewState: ReviewState = {
  status: "proposed",
  suggestion: SUGGESTED_DEADLINE,
  draft: SUGGESTED_DEADLINE,
  reason: "",
  recordDeadline: null,
  approvedValue: null,
  sourceOpen: false,
  error: null,
  feedback: "Suggested deadline ready for review.",
  activity: ["Suggested deadline ready for review"],
  undoSnapshot: null,
};

export function validateReviewDraft(value: string, suggestion: string, reason: string): { valid: true; value: string } | { valid: false; field: ReviewError["field"]; message: string } {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, field: "deadline", message: "Enter a deadline before approving." };

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (!match) return { valid: false, field: "deadline", message: "Enter a valid calendar date." };
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  if (year < 1 || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return { valid: false, field: "deadline", message: "Enter a valid calendar date." };
  }
  if (trimmed !== suggestion && !reason.trim()) {
    return { valid: false, field: "reason", message: "Add a reason for the override before approving." };
  }
  return { valid: true, value: trimmed };
}

function snapshot(state: ReviewState): ReviewSnapshot {
  return {
    status: state.status,
    draft: state.draft,
    reason: state.reason,
    recordDeadline: state.recordDeadline,
    approvedValue: state.approvedValue,
    sourceOpen: state.sourceOpen,
    feedback: state.feedback,
    activity: [...state.activity],
  };
}

export function reviewReducer(state: ReviewState, action: ReviewAction): ReviewState {
  if (action.type === "reset") return { ...initialReviewState, activity: [...initialReviewState.activity] };
  if (action.type === "source") return { ...state, sourceOpen: !state.sourceOpen };
  if (action.type === "reason") {
    if (action.value === state.reason) return state;
    const clearsError = state.error?.field === "reason";
    const wasDecided = state.status !== "proposed";
    return {
      ...state,
      reason: action.value,
      status: wasDecided ? "proposed" : state.status,
      recordDeadline: wasDecided ? state.undoSnapshot?.recordDeadline ?? null : state.recordDeadline,
      approvedValue: wasDecided ? null : state.approvedValue,
      error: clearsError ? null : state.error,
      feedback: wasDecided
        ? "The previous decision was cleared because the override reason changed. Review before approval."
        : clearsError
          ? "Override reason updated. Review before approval."
          : state.feedback,
      activity: wasDecided ? [...state.activity, "Editing the override reason invalidated the prior decision."] : state.activity,
      undoSnapshot: wasDecided ? null : state.undoSnapshot,
    };
  }

  if (action.type === "edit") {
    if (action.value === state.draft) return state;
    const wasDecided = state.status !== "proposed";
    const revertedDeadline = wasDecided ? state.undoSnapshot?.recordDeadline ?? null : state.recordDeadline;
    const activity = wasDecided ? [...state.activity, "Editing invalidated the prior decision."] : state.activity;
    return {
      ...state,
      draft: action.value,
      reason: action.value === state.suggestion ? "" : state.reason,
      status: "proposed",
      recordDeadline: revertedDeadline,
      approvedValue: null,
      error: null,
      feedback: wasDecided ? "The previous decision was cleared because the proposed value changed." : state.error ? "Proposed deadline updated. Review before approval." : state.feedback,
      activity,
      undoSnapshot: null,
    };
  }

  if (action.type === "approve") {
    if (state.status !== "proposed") return state;
    const result = validateReviewDraft(state.draft, state.suggestion, state.reason);
    if (!result.valid) return { ...state, error: { field: result.field, message: result.message }, feedback: result.message };
    const message = "Change applied to the local example.";
    const decision = state.draft === state.suggestion ? "Approved the source-supported suggestion" : `Approved user override: ${state.draft} · ${state.reason.trim()}`;
    return {
      ...state,
      status: "approved",
      recordDeadline: result.value,
      approvedValue: result.value,
      error: null,
      feedback: message,
      activity: [...state.activity, decision],
      undoSnapshot: snapshot(state),
    };
  }

  if (action.type === "reject") {
    if (state.status !== "proposed") return state;
    const message = "Suggestion rejected. The original record is unchanged.";
    return {
      ...state,
      status: "rejected",
      recordDeadline: state.undoSnapshot?.recordDeadline ?? null,
      approvedValue: null,
      error: null,
      feedback: message,
      activity: [...state.activity, "Rejected the suggestion · original record unchanged"],
      undoSnapshot: snapshot(state),
    };
  }

  if (!state.undoSnapshot) return state;
  const restored = state.undoSnapshot;
  return {
    ...state,
    ...restored,
    error: null,
    feedback: "Previous local record state restored.",
    activity: [...restored.activity, "Undo: restored the previous local record state."],
    undoSnapshot: null,
  };
}
