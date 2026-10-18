"use client";

import { useEffect, useRef } from "react";
import { FAIL_COUNT, FAIL_SECONDS, readCalm, writeCalm, type FxEvent } from "../lib/fx";

/**
 * LiveBackground — a living service mesh.
 *
 * Nodes drift and link up; "request" packets hop along the links; every so
 * often a node degrades (amber), swallows packets, then recovers — the
 * reliability story in motion. The cursor is itself a node (nearby nodes
 * are nudged and linked to it), clicks send a shockwave, scrolling gives
 * parallax depth, and `fx` events (command palette, boot, konami) can burst
 * or warp the whole field. Calm mode and prefers-reduced-motion dial it down.
 */

type N = {
  x: number; y: number; vx: number; vy: number;
  kx: number; ky: number; z: number; fail: number; flash: number;
  healed: number; // seconds left to show the "recovered" label
};
type P = { a: number; b: number; t: number; speed: number; hops: number; amber: boolean };
type Ring = { x: number; y: number; r: number; max: number; amber: boolean; push: boolean };

const MINT = "0,229,160";
const AMBER = "255,180,84";

export default function LiveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, LINK = 135;
    const nodes: N[] = [];
    const packets: P[] = [];
    const rings: Ring[] = [];
    let calm = readCalm();
    let warp = 0;
    let nextFail = 3;
    let clock = 0;
    let scrollY = window.scrollY;
    let raf = 0;
    let last = performance.now();
    let hidden = document.hidden;
    const mouse = { x: -9999, y: -9999, on: false };
    const adj: number[][] = [];
    const px: number[] = [];
    const py: number[] = [];

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      LINK = W < 640 ? 105 : 135;
      const target = Math.round(
        Math.min(90, Math.max(26, (W * H) / (W < 640 ? 17000 : 15000)))
      );
      while (nodes.length < target)
        nodes.push({
          x: rnd(0, W), y: rnd(0, H),
          vx: rnd(-14, 14), vy: rnd(-14, 14),
          kx: 0, ky: 0, z: rnd(0.25, 1), fail: 0, flash: 0, healed: 0,
        });
      if (nodes.length > target) {
        // Shrinking: drop everything that references removed node indices,
        // otherwise in-flight packets / stale adjacency rows point at nodes
        // that no longer exist and crash the frame loop.
        nodes.length = target;
        px.length = Math.min(px.length, target);
        py.length = Math.min(py.length, target);
        adj.length = Math.min(adj.length, target);
        for (const row of adj) row.length = 0; // rebuilt on the next frame
        for (let k = packets.length - 1; k >= 0; k--) {
          if (packets[k].a >= target || packets[k].b >= target) packets.splice(k, 1);
        }
      }
      if (reduced) frame(0);
    };

    const burst = (x: number, y: number, amber = false, push = true, max = 320) =>
      rings.push({ x, y, r: 0, max, amber, push });

    const failNode = (i: number, secs: number) => {
      const n = nodes[i];
      if (!n || n.fail > 0) return;
      n.fail = secs;
      n.healed = 0;
      burst(n.x, (py[i] ?? n.y), true, false, 90);
    };

    const spawnPacket = (from?: number) => {
      if (!nodes.length) return;
      const a = from ?? Math.floor(Math.random() * nodes.length);
      if (!nodes[a] || nodes[a].fail > 0) return;
      const nb = (adj[a] || []).filter((q) => nodes[q] && nodes[q].fail <= 0);
      if (!nb.length) return;
      const b = nb[Math.floor(Math.random() * nb.length)];
      packets.push({
        a, b, t: 0, speed: rnd(0.9, 1.7) * (warp > 0.2 ? 2.2 : 1),
        hops: Math.floor(rnd(3, 7)), amber: false,
      });
    };

    const frame = (dt: number) => {
      clock += dt;
      const speedMul = (calm ? 0.35 : 1) * (1 + warp * 5);
      warp = Math.max(0, warp - dt * 0.7);

      /* ---- rings (shockwaves) ---- */
      for (let i = rings.length - 1; i >= 0; i--) {
        const g = rings[i];
        g.r += (g.push ? 420 : 140) * dt;
        if (g.r > g.max) rings.splice(i, 1);
      }

      /* ---- nodes ---- */
      const para = scrollY * 0.12;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += (n.vx + n.kx) * dt * speedMul;
        n.y += (n.vy + n.ky) * dt * speedMul;
        const damp = Math.pow(0.05, dt);
        n.kx *= damp; n.ky *= damp;
        if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20;
        if (n.fail > 0) {
          n.fail = Math.max(0, n.fail - dt);
          if (n.fail === 0) {
            n.healed = 1.6;
            n.flash = 1;
            burst(n.x, n.y - para * n.z, false, false, 70);
          }
        }
        if (n.healed > 0) n.healed = Math.max(0, n.healed - dt);
        if (n.flash > 0) n.flash = Math.max(0, n.flash - dt * 1.4);

        const ry = n.y - para * n.z;
        // cursor nudge
        if (mouse.on && !calm) {
          const dx = n.x - mouse.x, dy = ry - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 170 * 170 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / 170) * 90 * dt;
            n.kx += (dx / d) * f; n.ky += (dy / d) * f;
          }
        }
        // shockwaves
        for (const g of rings) {
          if (!g.push) continue;
          const dx = n.x - g.x, dy = ry - g.y;
          const d = Math.hypot(dx, dy) || 1;
          const band = Math.abs(d - g.r);
          if (band < 46) {
            const f = (1 - band / 46) * (1 - g.r / g.max) * 520 * dt;
            n.kx += (dx / d) * f; n.ky += (dy / d) * f;
            n.flash = 1;
          }
        }
        px[i] = n.x;
        py[i] = ry;
      }

      /* ---- node degradation / recovery ---- */
      if (!calm && !reduced) {
        nextFail -= dt;
        if (nextFail <= 0) {
          nextFail = rnd(5, 9);
          failNode(Math.floor(Math.random() * nodes.length), 2.6);
        }
      }

      /* ---- links ---- */
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) (adj[i] ||= []).length = 0;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = px[i] - px[j], dy = py[i] - py[j];
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          adj[i].push(j); adj[j].push(i);
          const d = Math.sqrt(d2);
          const a = (1 - d / LINK) * 0.24 * ((nodes[i].z + nodes[j].z) / 2 + 0.2);
          const bad = nodes[i].fail > 0 || nodes[j].fail > 0;
          ctx.strokeStyle = `rgba(${bad ? AMBER : MINT},${bad ? a * 1.6 : a})`;
          ctx.beginPath();
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      /* ---- cursor links ---- */
      if (mouse.on && !calm) {
        for (let i = 0; i < nodes.length; i++) {
          const d = Math.hypot(px[i] - mouse.x, py[i] - mouse.y);
          if (d < 170) {
            ctx.strokeStyle = `rgba(${MINT},${(1 - d / 170) * 0.55})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(px[i], py[i]);
            ctx.stroke();
          }
        }
      }

      /* ---- nodes ---- */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const bad = n.fail > 0;
        const col = bad ? AMBER : MINT;
        const pulse = bad ? 0.65 + 0.35 * Math.sin(clock * 14) : 1;
        const r = 1.1 + n.z * 1.7 + n.flash * 1.5;
        if (n.z > 0.65 || bad || n.flash > 0.1) {
          ctx.fillStyle = `rgba(${col},${(bad ? 0.2 : 0.08) + n.flash * 0.2})`;
          ctx.beginPath();
          ctx.arc(px[i], py[i], r * (bad ? 5 : 3.6), 0, 6.283);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${col},${(0.35 + n.z * 0.55) * pulse})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], r, 0, 6.283);
        ctx.fill();
      }

      /* ---- status labels (circuit open / recovered) ---- */
      ctx.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.fail > 0) {
          ctx.fillStyle = `rgba(${AMBER},${0.55 + 0.35 * Math.sin(clock * 10)})`;
          ctx.fillText("circuit open", px[i] + 9, py[i] - 9);
        } else if (n.healed > 0) {
          ctx.fillStyle = `rgba(${MINT},${Math.min(1, n.healed / 0.8) * 0.9})`;
          ctx.fillText("recovered", px[i] + 9, py[i] - 9);
        }
      }

      /* ---- packets ---- */
      const maxPackets = calm ? 3 : 14;
      if (!reduced && packets.length < maxPackets && Math.random() < dt * (warp > 0.2 ? 16 : 2.2)) {
        spawnPacket();
      }
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.t += p.speed * dt * speedMul;
        // Guard against packets referencing nodes that no longer exist
        // (e.g. after a resize shrank the node list).
        if (!nodes[p.a] || !nodes[p.b]) { packets.splice(k, 1); continue; }
        const ax = px[p.a], ay = py[p.a], bx = px[p.b], by = py[p.b];
        if (ax === undefined || bx === undefined) { packets.splice(k, 1); continue; }
        const t = Math.min(p.t, 1);
        const x = ax + (bx - ax) * t, y = ay + (by - ay) * t;
        const t0 = Math.max(0, t - 0.22);
        const col = p.amber ? AMBER : MINT;
        const grad = ctx.createLinearGradient(ax + (bx - ax) * t0, ay + (by - ay) * t0, x, y);
        grad.addColorStop(0, `rgba(${col},0)`);
        grad.addColorStop(1, `rgba(${col},0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ax + (bx - ax) * t0, ay + (by - ay) * t0);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${col},1)`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 6.283);
        ctx.fill();
        if (p.t >= 1) {
          if (nodes[p.b].fail > 0) {
            // circuit open: retry via another healthy neighbour, else drop
            const alt = (adj[p.a] || []).filter((q) => q !== p.b && nodes[q] && nodes[q].fail <= 0);
            if (alt.length) {
              p.b = alt[Math.floor(Math.random() * alt.length)];
              p.t = 0;
              p.amber = false;
            } else {
              packets.splice(k, 1);
            }
            continue;
          }
          nodes[p.b].flash = Math.max(nodes[p.b].flash, 0.6);
          p.hops--;
          const nb = (adj[p.b] || []).filter((q) => q !== p.a && nodes[q] && nodes[q].fail <= 0);
          if (p.hops <= 0 || !nb.length) { packets.splice(k, 1); continue; }
          p.a = p.b;
          p.b = nb[Math.floor(Math.random() * nb.length)];
          p.t = 0;
        }
      }
      ctx.lineWidth = 1;

      /* ---- rings ---- */
      for (const g of rings) {
        const a = (1 - g.r / g.max) * (g.push ? 0.45 : 0.6);
        ctx.strokeStyle = `rgba(${g.amber ? AMBER : MINT},${a})`;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, 6.283);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (hidden) { last = now; return; }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      frame(dt);
    };

    /* ---- listeners ---- */
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
    };
    const onLeave = () => { mouse.on = false; };
    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      if (!px.length) return; // first frame hasn't populated positions yet
      const t = e.target as Element | null;
      if (t?.closest?.("a,button,input,textarea,select,label,[role=dialog],[role=button]")) return;
      burst(e.clientX, e.clientY);
      const near = nodes
        .map((_, i) => i)
        .sort((a, b) => Math.hypot(px[a] - e.clientX, py[a] - e.clientY) - Math.hypot(px[b] - e.clientX, py[b] - e.clientY))
        .slice(0, 3);
      near.forEach((i) => spawnPacket(i));
    };
    const onScroll = () => { scrollY = window.scrollY; };
    const onVis = () => { hidden = document.hidden; };
    const onFx = (e: Event) => {
      const d = (e as CustomEvent<FxEvent>).detail;
      if (d.type === "pulse") {
        burst(d.x ?? W / 2, d.y ?? H / 2, false, true, 520);
        for (let i = 0; i < 5; i++) spawnPacket();
      } else if (d.type === "warp") {
        warp = 1;
        burst(W / 2, H / 2, false, true, Math.hypot(W, H) / 1.6);
      } else if (d.type === "fail") {
        // take down nodes in the middle of the screen so it's actually seen
        const order = nodes
          .map((_, i) => i)
          .sort((a, b) =>
            Math.hypot(px[a] - W / 2, py[a] - H / 2) - Math.hypot(px[b] - W / 2, py[b] - H / 2)
          )
          .slice(0, 14);
        order.sort(() => Math.random() - 0.5).slice(0, FAIL_COUNT).forEach((i) => failNode(i, FAIL_SECONDS));
        for (let i = 0; i < 8; i++) spawnPacket();
      } else if (d.type === "calm") {
        calm = d.value;
        writeCalm(calm);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("fx", onFx);
      raf = requestAnimationFrame(loop);
    } else {
      window.addEventListener("fx", onFx);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("fx", onFx);
    };
  }, []);

  return (
    <div aria-hidden className="live-bg">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <canvas ref={ref} />
    </div>
  );
}
