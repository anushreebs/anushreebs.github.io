import { useEffect, useRef, useState } from "react";
import { Arrow } from "./PortfolioPrimitives";

export function SiteHeader({ resume }: { resume: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 801px)");
    const closeOnResize = () => setOpen(false);
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    desktop.addEventListener("change", closeOnResize);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      desktop.removeEventListener("change", closeOnResize);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  const navigate = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      const destination = document.getElementById(id);
      destination?.setAttribute("tabindex", "-1");
      destination?.focus({ preventScroll: true });
    });
  };

  return <header className="edition-header" ref={headerRef} onKeyDown={(event) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggleRef.current?.focus();
    }
  }} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }}>
    <div className="edition-header-inner">
      <a className="edition-brand" href="#top" onClick={() => navigate("top")} aria-label="Anushree B S home">
        <span className="edition-monogram" aria-hidden="true">a<span>.</span></span>
        <span>Anushree B S<span className="edition-brand-note">Software engineer</span></span>
      </a>
      <button className="edition-menu" ref={toggleRef} type="button" aria-expanded={open} aria-controls="edition-navigation" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}<span className={open ? "menu-lines is-open" : "menu-lines"} aria-hidden="true"><i /><i /></span>
      </button>
      <nav className={`edition-navigation${open ? " is-open" : ""}`} id="edition-navigation" aria-label="Primary navigation">
        {[["work", "Selected work"], ["experience", "Experience"], ["about", "About"], ["contact", "Contact"]].map(([id, label]) =>
          <a key={id} href={`#${id}`} onClick={() => navigate(id)}>{label}</a>
        )}
        <a className="edition-resume" href={resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé <Arrow /></a>
      </nav>
    </div>
  </header>;
}
