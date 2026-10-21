import type { ReactNode } from "react";

type DiagramProps = {
  title: string;
  description: string;
  items: { title: string; note?: string; layer?: string }[];
  className?: string;
  id?: string;
};

export function FlowDiagram({ title, description, items, className = "", id }: DiagramProps) {
  return <figure id={id} className={`flow-diagram ${className}`} aria-label={`${title}. ${description}`}>
    <figcaption><span className="eyebrow">{title}</span><p>{description}</p></figcaption>
    <ol>{items.map((item, index) => <li key={`${item.title}-${index}`} className={item.layer ? `layer-${item.layer}` : undefined}>
      <span className="diagram-number">{String(index + 1).padStart(2, "0")}</span>
      <div><b>{item.title}</b>{item.note && <small>{item.note}</small>}</div>
      {index < items.length - 1 && <span className="diagram-arrow" aria-hidden="true">↓</span>}
    </li>)}</ol>
    <p className="diagram-alt">Diagram in reading order: {items.map((item) => item.title).join(" → ")}.</p>
  </figure>;
}

export function StateTrack({ title, items }: { title: string; items: string[] }) {
  return <div className="state-track"><h4>{title}</h4><ol>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div>;
}

export function EvidenceDisclosure({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return <details className="interview-panel" id={id}><summary>{title}<span aria-hidden="true">+</span></summary><div>{children}</div></details>;
}

export function Walkthrough({ children }: { children: ReactNode }) {
  return <details className="walkthrough"><summary><span><i className="eyebrow">Optional</i> Interview Walkthrough</span><span aria-hidden="true">+</span></summary><div>{children}</div></details>;
}
