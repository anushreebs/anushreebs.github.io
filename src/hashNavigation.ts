

export function revealHashTarget(hash: string): HTMLElement | null {
  if (!hash.startsWith("#")) return null;
  let id = hash.slice(1);
  try { id = decodeURIComponent(id); } catch { return null; }
  const target = document.getElementById(id);
  if (!target) return null;
  let details = target.closest("details") as HTMLDetailsElement | null;
  while (details) {
    details.open = true;
    details = details.parentElement?.closest("details") as HTMLDetailsElement | null;
  }
  return target;
}
