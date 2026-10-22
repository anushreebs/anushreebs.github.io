import type { MouseEvent } from "react";
import { Arrow } from "./PortfolioPrimitives";

const projects = [
  { id: "researchflow", accent: "sage", name: "ResearchFlow", problem: "Know which expense records belong in a report.", contribution: "Interface states and traceability from source row to reported total.", decision: "Keep unresolved records visible, but outside totals." },
  { id: "collaborator", accent: "slate", name: "Research Collaborator Portal", problem: "Make the handoff from dataset discovery to access clear.", contribution: "Access-aware interfaces, request states, and API responsibility boundaries.", decision: "Check permission at delivery, not just in the interface." },
  { id: "bloom-rescue", accent: "rose", name: "Bloom Rescue", problem: "Review evidence before acting on a suggestion.", contribution: "Review flow, explicit decisions, and recovery design in a simulation.", decision: "Keep suggestions separate from human authorization." },
];

export function SelectedWorkPreview() {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    window.history.pushState(null, "", `#${id}`);
    target.setAttribute("tabindex", "-1");
    target.scrollIntoView({ block: "start" });
    target.focus({ preventScroll: true });
  };

  return <section className="section-frame work-preview" id="work" aria-labelledby="work-preview-title">
    <div className="preview-heading"><div><p className="edition-label">02 / Selected work</p><h2 id="work-preview-title">Three problems.<br /><em>Engineering you can inspect.</em></h2></div><p>Independent projects in reporting integrity, access decisions, and human review. Explore the case studies after my professional experience.</p></div>
    <div className="preview-index">{projects.map((project, index) => <a className={`preview-project preview-${project.accent}`} key={project.id} href={`#${project.id}`} onClick={event => navigate(event, project.id)} aria-labelledby={`${project.id}-preview-title ${project.id}-preview-action`}>
      <div className="preview-identity"><span className="preview-number" aria-hidden="true">0{index + 1}</span><div><h3 id={`${project.id}-preview-title`}>{project.name}</h3><p className="preview-problem">{project.problem}</p></div></div>
      <div><span className="preview-label">My contribution</span><p className="preview-contribution">{project.contribution}</p></div>
      <div><span className="preview-label">Key decision</span><p className="preview-decision">{project.decision}</p><span className="preview-link" id={`${project.id}-preview-action`}>Read case study <Arrow /></span></div>
    </a>)}</div>
  </section>;
}
