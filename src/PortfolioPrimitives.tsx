

export function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

export function ConceptChips({ label, items }: { label: string; items: string[] }) {
  return <div className="concept-group"><span className="eyebrow">{label}</span><ul className="concept-chips">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
