"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { EMPTY_LOG, getLog, subscribeLog, type LogEntry } from "../lib/fx";

const mmss = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

/**
 * SessionLog — a live readout of what *you* are doing on the page
 * (sections visited, filters, commands). Real events, not fake telemetry.
 */
export default function SessionLog() {
  const log = useSyncExternalStore(subscribeLog, getLog, () => EMPTY_LOG);
  const [t0, setT0] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const start = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setT0(start);
    setNow(start);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const rows: LogEntry[] = log.slice(-4);

  return (
    <div
      className="panel mt-5 w-full px-4 py-3 font-mono text-[0.72rem] leading-relaxed"
      aria-label="Session log"
    >
      <div className="mb-2 flex items-center justify-between text-body/50">
        <span className="inline-flex items-center gap-2">
          <span className="status-dot" /> session
        </span>
        <span>uptime {t0 ? mmss(now - t0) : "00:00"}</span>
      </div>
      <ul className="min-h-[4.6em] space-y-0.5">
        {rows.length === 0 && <li className="text-body/40">{"// waiting for input…"}</li>}
        {rows.map((r) => (
          <li key={r.id} className="log-line flex gap-2 truncate">
            <span className="text-body/40">+{t0 ? mmss(r.t - t0) : "00:00"}</span>
            <span
              className={
                r.kind === "ok" ? "text-accent" : r.kind === "warn" ? "text-amber" : "text-body/80"
              }
            >
              {r.msg}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
