/**
 * Tiny client-side event layer shared by the interactive pieces
 * (background, boot sequence, command palette, resilience demo).
 */

export type FxEvent =
  | { type: "pulse"; x?: number; y?: number }
  | { type: "warp" }
  | { type: "fail" }
  | { type: "calm"; value: boolean };

/** How many nodes "inject failure" takes down, and how long until they heal (s). */
export const FAIL_COUNT = 5;
export const FAIL_SECONDS = 3.2;

export const fx = (detail: FxEvent) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<FxEvent>("fx", { detail }));
};

/** Calm mode persists per-browser; always wrapped, storage can throw. */
export const readCalm = () => {
  try {
    return localStorage.getItem("fx-calm") === "1";
  } catch {
    return false;
  }
};
export const writeCalm = (v: boolean) => {
  try {
    localStorage.setItem("fx-calm", v ? "1" : "0");
  } catch {
    /* ignore */
  }
};
