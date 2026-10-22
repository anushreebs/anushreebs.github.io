import { useEffect, useState } from "react";
import { experiences, toolkit } from "./content";
import { Arrow } from "./PortfolioPrimitives";
import { revealHashTarget } from "./hashNavigation";
import { ResearchFlowCase, CollaboratorCase, BloomCase } from "./ProjectShowcases";
import { InterfaceStudy } from "./InterfaceStudy";
import { SiteHeader } from "./SiteHeader";
import { Hero } from "./Hero";
import { SelectedWorkPreview } from "./SelectedWorkPreview";

const EMAIL = "anushreebs6@gmail.com";
const RESUME = `${import.meta.env.BASE_URL}Anushree-BS-Resume-Software-Engineer.pdf`;

function App() {
  const [copyState, setCopyState] = useState<"copied" | "unavailable" | null>(null);
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { elements.forEach((element) => element.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const revealCurrentHash = () => {
      const focusTarget = revealHashTarget(window.location.hash)?.closest("details");
      if (focusTarget) requestAnimationFrame(() => (focusTarget as HTMLElement).focus({ preventScroll: true }));
    };
    revealCurrentHash();
    window.addEventListener("hashchange", revealCurrentHash);
    return () => window.removeEventListener("hashchange", revealCurrentHash);
  }, []);
  const copyEmail = async () => { try { await navigator.clipboard.writeText(EMAIL); setCopyState("copied"); } catch { setCopyState("unavailable"); } window.setTimeout(() => setCopyState(null), 2200); };
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader resume={RESUME} />
    <main id="main-content" tabIndex={-1}>
      <Hero resume={RESUME} />
      <SelectedWorkPreview />
      <section className="section-frame professional-experience" id="experience"><div className="section-label">03 — Professional experience</div><div className="experience-intro"><h2>Frontend engineering,<br /><em>across product contexts.</em></h2><p>My professional work spans streaming discovery, enterprise ordering, and healthcare reporting.</p></div><div className="timeline">{experiences.map((item) => <article className="timeline-row reveal" key={item.company}><div className="timeline-date">{item.period}</div><div className="timeline-role"><p className="eyebrow accent">{item.company}</p><h3>{item.role}</h3><p>{item.body}</p><div className="experience-evidence"><span>{item.practiceLabel}</span><p>{item.practice}</p></div><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>
      <section className="section-frame work-section case-studies-section" id="case-studies" aria-labelledby="case-studies-title"><div className="case-studies-heading"><div><p className="edition-label">04 / Engineering case studies</p><h2 id="case-studies-title">The decisions<br /><em>behind the interface.</em></h2></div><p>Inspect the problem, my contribution, and the implementation decisions. Each independent prototype includes its scope and evidence.</p></div>
        <ResearchFlowCase /><CollaboratorCase /><BloomCase />
        <details className="optional-study" id="additional-interface-study" tabIndex={-1}><summary><span><b>Optional interface study</b><small>Explore the original deadline-review exercise</small></span><span aria-hidden="true">+</span></summary><InterfaceStudy /></details>
      </section>
      <section className="section-frame approach-section" id="approach"><div className="section-label">05 — How I work</div><div className="approach-layout reveal"><div><p className="eyebrow accent">How I work</p><h2>Start with the task.<br /><em>Make the rules explicit.</em></h2></div><div className="approach-intro"><p>I begin with the user’s task, the information and decisions it involves, and the workflow rules. I model interface and data states, then connect the interface to APIs and data.</p><p>I separate interface feedback from enforcement. A disabled button explains an action’s availability; server-side checks determine whether the action is permitted.</p><p>I consider failure states alongside the successful path: invalid input, stale data, failed requests, rejected decisions, and recovery. I validate the result and improve the workflow using feedback and evidence.</p><p>When AI is involved, I distinguish suggestions from accepted facts and authorized actions. The model may suggest; the application validates against deterministic rules, and a person approves important changes. Uncertainty stays visible, and rejection and revision remain possible. I choose a deterministic solution when it is more reliable.</p></div></div></section>
      <section className="section-frame toolkit-section" id="toolkit"><div className="section-label">06 — Technical foundation and project practice</div><div className="toolkit-layout reveal"><div><p className="eyebrow accent">Technical foundation and project practice</p><h2>Engineering skills.<br /><em>Grounded in the work.</em></h2></div><div className="toolkit-grid">{toolkit.map((group) => <div className="toolkit-group" key={group.label}><p className="eyebrow">{group.label}</p><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div><p className="toolkit-context">{group.context}</p></div>)}</div></div></section>
      <section className="section-frame initiative-section"><div className="section-label">07 — Team initiative</div><div className="initiative-layout reveal"><div><p className="eyebrow accent">Straumann Inno Week</p><h2>Smart Treatment<br /><em>Plans.</em></h2></div><div><p>I proposed and prototyped an Implant Success Predictor concept as part of the team behind Smart Treatment Plans, which won during Straumann Inno Week.</p><p className="muted-copy">My contribution was the proposal and prototype. Predictive accuracy, clinical validity, and a deployed medical capability were not established.</p></div></div></section>
      <section className="section-frame about-section" id="about"><div className="section-label">08 — About</div><div className="about-layout reveal"><div><h2>Curious about<br /><em>the whole product.</em></h2></div><div className="about-copy"><p>I’m Anushree B S, a software engineer and user-centric product builder with frontend systems expertise, backend and API knowledge, practical AI skills, and product judgment. I’m pursuing an MS in Information Technology and Management at The University of Texas at Dallas.</p><p>My professional foundation is frontend engineering. I enjoy work that requires understanding more than the screen: the API contract, the underlying data, the permission boundary, and the user’s next action.</p><p>My independent projects give me room to explore those connections and practical AI workflows while keeping prototype limitations explicit.</p><div className="education"><div><span>Started August 2026</span><p><b>MS Information Technology and Management</b><br />The University of Texas at Dallas</p></div><div><span>Visvesvaraya Technological University</span><p><b>BE Computer Science</b></p></div><div><span>Certified</span><p><b>Oracle Certified Associate</b><br />Java SE 8 Programmer</p></div></div></div></div></section>
      <section className="section-frame contact-section" id="contact"><div className="section-label">09 — Contact</div><div className="contact-layout reveal"><div><p className="eyebrow accent">Let’s connect</p><h2>Open to Summer 2027<br /><em>software engineering internships.</em></h2><p className="contact-intro">I’m based in Dallas and pursuing my MS at UT Dallas. I’m seeking Summer 2027 software engineering internships where I can contribute across interfaces, APIs, and product workflows.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${EMAIL}`}>Contact me <Arrow /></a><button className="copy-button" onClick={copyEmail}>{copyState === "copied" ? "Copied" : copyState === "unavailable" ? "Copy unavailable" : "Copy email"}</button><span className="sr-status" role="status" aria-live="polite">{copyState === "copied" ? "Email address copied" : copyState === "unavailable" ? "Copy is unavailable. Use the email link instead." : ""}</span></div></div><div className="contact-details"><a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL} <Arrow /></a><a href={RESUME} target="_blank" rel="noreferrer">View résumé <Arrow /></a><a href="https://github.com/anushreebs" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/anushree-bs/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><span>Dallas, TX · United States</span></div></div></section>
    </main><footer className="site-footer"><span>© {new Date().getFullYear()} Anushree B S</span><a href="#top">Back to top</a></footer>
  </div>;
}

export default App;
