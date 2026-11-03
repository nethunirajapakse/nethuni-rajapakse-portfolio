"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fx, readCalm } from "../lib/fx";

type Cmd = {
  id: string;
  label: string;
  group: string;
  icon: string;
  keywords?: string;
  hint?: string;
  run: () => void;
};

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const go = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

/**
 * CommandPalette — Ctrl/⌘+K (or "/") to jump anywhere, open links, or play
 * with the background. Also hosts the Konami easter egg.
 */
export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [calm, setCalm] = useState(false);
  const [mac, setMac] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setIdx(0);
    returnFocus.current?.focus?.();
  }, []);

  const cmds = useMemo<Cmd[]>(
    () => [
      { id: "home", group: "Navigate", icon: "bi-house", label: "Go to Home", run: go("hero") },
      { id: "about", group: "Navigate", icon: "bi-person", label: "Go to About", run: go("about") },
      { id: "skills", group: "Navigate", icon: "bi-stack", label: "Go to Skills", keywords: "stack tech tools", run: go("skills") },
      { id: "experience", group: "Navigate", icon: "bi-briefcase", label: "Go to Experience", run: go("experience") },
      { id: "projects", group: "Navigate", icon: "bi-grid", label: "Go to Projects", run: go("projects") },
      { id: "competitions", group: "Navigate", icon: "bi-trophy", label: "Go to Hackathons", keywords: "competitions contests designathon coding", run: go("competitions") },
      { id: "volunteering", group: "Navigate", icon: "bi-heart", label: "Go to Volunteering", keywords: "ieee leo events community", run: go("volunteering") },
      { id: "contact", group: "Navigate", icon: "bi-envelope", label: "Go to Contact", run: go("contact") },
      { id: "cv", group: "Links", icon: "bi-file-earmark-person", label: "Open résumé", keywords: "cv resume pdf", run: open("/resume.pdf") },
      { id: "gh", group: "Links", icon: "bi-github", label: "GitHub", run: open("https://github.com/nethunirajapakse") },
      { id: "li", group: "Links", icon: "bi-linkedin", label: "LinkedIn", run: open("https://linkedin.com/in/nethuni-rajapakse/") },
      { id: "md", group: "Links", icon: "bi-medium", label: "Medium articles", keywords: "blog writing", run: open("https://medium.com/@nethunirajapakse/activity") },
      {
        id: "pulse", group: "Background", icon: "bi-broadcast", label: "Send a pulse", keywords: "shockwave ping",
        hint: "shockwave through the mesh",
        run: () => { fx({ type: "pulse" }); },
      },
      {
        id: "warp", group: "Background", icon: "bi-lightning-charge", label: "Engage warp", keywords: "speed fast",
        hint: "↑↑↓↓←→←→BA also works",
        run: () => { fx({ type: "warp" }); },
      },
      {
        id: "calm", group: "Background", icon: calm ? "bi-toggle-on" : "bi-toggle-off",
        label: calm ? "Calm mode: on — turn off" : "Calm mode: off — turn on", keywords: "reduce motion quiet",
        hint: "slows the background, remembers your choice",
        run: () => {
          const v = !calm;
          setCalm(v);
          fx({ type: "calm", value: v });
        },
      },
      {
        id: "replay", group: "Background", icon: "bi-arrow-repeat", label: "Replay boot sequence", keywords: "intro reload",
        run: () => {
          try { sessionStorage.removeItem("boot-seen"); } catch { /* ignore */ }
          window.scrollTo({ top: 0 });
          location.reload();
        },
      },
    ],
    [calm]
  );

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cmds;
    return cmds.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(s));
  }, [cmds, q]);

  const exec = (c?: Cmd) => {
    if (!c) return;
    close();
    // let focus restore first, then run
    setTimeout(() => {
      c.run();
    }, 30);
  };

  /* keyboard shortcuts and the konami easter egg */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMac(/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent));
    setCalm(readCalm());
    let seq = 0;
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.("input,textarea,select,[contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement;
        setOpen((o) => !o);
        return;
      }
      if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement;
        setOpen(true);
        return;
      }
      if (typing) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      seq = k === KONAMI[seq] ? seq + 1 : k === KONAMI[0] ? 1 : 0;
      if (seq === KONAMI.length) {
        seq = 0;
        fx({ type: "warp" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => input.current?.focus());
  }, [isOpen]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIdx(0), [q]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => (i + 1) % Math.max(1, results.length)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => (i - 1 + results.length) % Math.max(1, results.length)); }
    else if (e.key === "Enter") { e.preventDefault(); exec(results[idx]); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") e.preventDefault();
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          returnFocus.current = e.currentTarget;
          setOpen(true);
        }}
        aria-label="Open command palette"
        className="fixed bottom-5 left-5 z-[900] inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[0.72rem] text-body/70 backdrop-blur transition hover:border-accent hover:text-accent"
        style={{
          borderColor: "color-mix(in srgb, var(--color-body), transparent 82%)",
          background: "color-mix(in srgb, var(--color-surface), transparent 20%)",
        }}
      >
        <i className="bi bi-command" aria-hidden />
        <span className="hidden sm:inline">commands</span>
        <kbd className="rounded border px-1.5 text-[0.66rem] text-body/50" style={{ borderColor: "color-mix(in srgb, var(--color-body), transparent 82%)" }}>
          {mac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-start justify-center px-4 pt-[14vh]"
            style={{ background: "rgba(3,7,10,0.62)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onPointerDown={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="panel w-full max-w-lg overflow-hidden shadow-2xl"
              style={{ background: "var(--color-surface)" }}
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            >
              <div className="flex items-center gap-3 border-b px-4 py-3.5" style={{ borderColor: "var(--color-line)" }}>
                <span className="font-mono text-accent" aria-hidden>&gt;</span>
                <input
                  ref={input}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="type a command…  (try “warp”)"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="cmd-list"
                  aria-activedescendant={results[idx] ? `cmd-${results[idx].id}` : undefined}
                  className="w-full bg-transparent font-mono text-sm text-heading placeholder:text-body/40"
                  style={{ outline: "none" }}
                />
                <kbd className="font-mono text-[0.66rem] text-body/40">esc</kbd>
              </div>

              <ul id="cmd-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center font-mono text-sm text-body/50">
                    no match for “{q}”
                  </li>
                )}
                {results.map((c, i) => {
                  const newGroup = i === 0 || results[i - 1].group !== c.group;
                  return (
                    <li key={c.id} role="presentation">
                      {newGroup && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[0.66rem] uppercase tracking-widest text-body/40">
                          {c.group}
                        </p>
                      )}
                      <div
                        id={`cmd-${c.id}`}
                        role="option"
                        aria-selected={i === idx}
                        onMouseMove={() => setIdx(i)}
                        onClick={() => exec(c)}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          i === idx ? "text-heading" : "text-body/80"
                        }`}
                        style={{
                          background: i === idx ? "color-mix(in srgb, var(--color-accent), transparent 88%)" : "transparent",
                        }}
                      >
                        <i className={`bi ${c.icon} ${i === idx ? "text-accent" : "text-body/50"}`} aria-hidden />
                        <span className="flex-1">{c.label}</span>
                        {c.hint && <span className="hidden font-mono text-[0.68rem] text-body/40 sm:inline">{c.hint}</span>}
                        {i === idx && <span className="font-mono text-[0.68rem] text-accent">↵</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
