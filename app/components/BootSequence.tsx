"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fx } from "../lib/fx";

/**
 * BootSequence — the first thing a visitor sees. A short terminal boot,
 * "HEALTHY — IT STAYS UP", then a scan-line wipe reveals the page while the
 * background warps. Plays once per browser session, is skippable (click or
 * any key), and is never shown to reduced-motion visitors. The inline script
 * in layout.tsx sets <html data-boot="running|done"> before first paint so
 * there is no flash either way.
 */

/**
 * The boot is a readiness probe for the portfolio-as-a-system, in the same
 */
const LINES: { key: string; text: string }[] = [
  { key: "who", text: "nethuni · final-year IT, moratuwa" },
  { key: "builds", text: "backend services that don't fall over" },
  { key: "ships", text: "pipelines that deploy without drama" },
  { key: "writes", text: "what I learn, on medium" },
  { key: "status", text: "open to work, say hi below" },
];

const STEP_MS = 230;
const START_MS = 450;

export default function BootSequence() {
  const [phase, setPhase] = useState<"boot" | "exit" | "gone">("boot");
  const [shown, setShown] = useState(0);
  const [granted, setGranted] = useState(false);
  const finished = useRef(false);

  const exit = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setShown(LINES.length);
    setGranted(true);
    setPhase("exit");
    try {
      sessionStorage.setItem("boot-seen", "1");
    } catch {
      /* ignore */
    }
    // reveal the page + kick the background
    document.documentElement.dataset.boot = "done";
    window.dispatchEvent(new Event("bootdone"));
    fx({ type: "warp" });
    setTimeout(() => setPhase("gone"), 1000);
  }, []);

  useEffect(() => {
    if (document.documentElement.dataset.boot !== "running") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("gone");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) =>
      timers.push(setTimeout(() => setShown(i + 1), START_MS + i * STEP_MS))
    );
    const doneAt = START_MS + LINES.length * STEP_MS + 250;
    timers.push(setTimeout(() => setGranted(true), doneAt));
    timers.push(setTimeout(() => exit(), doneAt + 750));

    const skip = () => exit();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [exit]);

  if (phase === "gone") return null;

  const pct = Math.round((shown / LINES.length) * 100);

  return (
    <div
      className={`boot ${phase === "exit" ? "boot-exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="boot-edge" aria-hidden />
      <div className="boot-inner">
        <p className="font-mono text-[0.78rem] tracking-widest text-accent">
          $ healthcheck nethuni.dev
        </p>

        <ul className="mt-6 space-y-1.5 font-mono text-[0.85rem]">
          {LINES.slice(0, shown).map((l) => (
            <li key={l.key} className="log-line flex items-baseline gap-3">
              <span className="text-accent">[ ok ]</span>
              <span className="w-[4.6rem] shrink-0 text-body/50">{l.key}</span>
              <span className="text-body/85">{l.text}</span>
            </li>
          ))}
          {phase === "boot" && !granted && <li className="caret h-5" aria-hidden />}
        </ul>

        <div
          className="mt-8 h-[3px] w-full overflow-hidden rounded-full"
          style={{ background: "color-mix(in srgb, var(--color-body), transparent 88%)" }}
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%`, boxShadow: "0 0 12px var(--color-accent)" }}
          />
        </div>

        <div className="mt-6 flex h-10 items-center justify-between font-mono text-xs">
          <span
            className={`font-display text-base font-semibold tracking-wide sm:text-lg transition-all duration-300 ${
              granted ? "translate-y-0 text-accent opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            HEALTHY — IT STAYS UP
          </span>
          <span className="text-body/40">{pct}% · any key to skip</span>
        </div>
      </div>
    </div>
  );
}
