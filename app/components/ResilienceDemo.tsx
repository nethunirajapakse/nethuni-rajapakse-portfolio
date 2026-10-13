"use client";

import { useEffect, useRef, useState } from "react";
import { FAIL_COUNT, FAIL_SECONDS, fx } from "../lib/fx";

type State = "idle" | "down" | "healed";

/**
 * ResilienceDemo — the thesis, as a toy. The background is a small service
 * mesh; this takes some of its nodes down and shows traffic rerouting and the
 * nodes recovering. Same idea the hero line claims: systems that stay up.
 */
export default function ResilienceDemo() {
  const [state, setState] = useState<State>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const inject = () => {
    if (state === "down") return;
    timers.current.forEach(clearTimeout);
    setState("down");
    fx({ type: "fail" });
    timers.current = [
      setTimeout(() => setState("healed"), FAIL_SECONDS * 1000 + 100),
      setTimeout(() => setState("idle"), FAIL_SECONDS * 1000 + 5000),
    ];
  };

  return (
    <div className="panel mt-5 w-full px-4 py-3.5 font-mono text-[0.75rem] leading-relaxed">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-body/60">
          <span className={`status-dot ${state === "down" ? "amber" : ""}`} />
          {"// resilience"}
        </span>
        <button
          type="button"
          onClick={inject}
          disabled={state === "down"}
          className="rounded-full border px-3 py-1 text-accent transition hover:bg-[color-mix(in_srgb,var(--color-accent),transparent_90%)] disabled:cursor-wait disabled:opacity-50"
          style={{ borderColor: "color-mix(in srgb, var(--color-accent), transparent 60%)" }}
        >
          inject failure
        </button>
      </div>
      <p className="mt-2.5 min-h-[2.6em] text-body/70" aria-live="polite">
        {state === "idle" && "The background is a small service mesh. Try to break it."}
        {state === "down" && (
          <span className="text-amber">
            {FAIL_COUNT} nodes down · circuit open · rerouting traffic…
          </span>
        )}
        {state === "healed" && (
          <span className="text-accent">
            all nodes recovered — the system stayed up.
          </span>
        )}
      </p>
    </div>
  );
}
