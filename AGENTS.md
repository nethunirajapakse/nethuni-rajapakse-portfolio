<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent rules for this repository

Personal developer portfolio for Nethuni Rajapakse. Next.js 16, React 19, Tailwind CSS 4, framer-motion. These rules apply to any AI agent editing this repo.

## Workflow

1. Read a file before editing it. The owner edits files by hand between sessions, so the copy on disk is the truth. Never revert or "tidy" her changes.
2. Make only the change that was asked for. No unrequested redesigns, refactors, renames or new dependencies.
3. Before finishing, run `npx tsc --noEmit` and `npm run lint`, and fix every error you introduced.
4. A full `npm run build` needs network access for Google Fonts. If it fails only for that reason, say so and rely on tsc and lint.
5. When reporting back, list the exact files changed and where they go. Do not hand back the whole project when a few files changed.
6. If a request is ambiguous and a wrong guess is costly, ask one short question. Otherwise pick the sensible reading and say which one you took.

## Content rules

7. NEVER invent or inflate achievements, metrics, dates, awards, GPA or job details. Use only what Nethuni has stated. If a fact is missing, ask.
8. Do not add participation-only events. Hackathons and competitions are listed only for real placements or substantial work.
9. Keep hackathons and volunteering low-key: small photos, no big numbers, no tag or badge chips, no team lists. This is a developer portfolio, and software work comes first.
10. Write plain sentences in CV and experience bullets. No colon-style phrasing such as "Built X: ...". For projects, first say plainly what it does, then what she built.
11. Fix typos in text you write. Flag typos you notice in her text instead of silently changing it.

## Keep these in sync

12. Sections are listed in four places, and all four must match `app/page.tsx` (order and ids):
    - `app/components/Navbar.tsx`
    - `app/components/ScrollUI.tsx` (right-hand rail)
    - `app/components/CommandPalette.tsx` (Ctrl K)
    - the section's own `id` attribute

    Current order: hero, about, skills, experience, projects, competitions, volunteering, contact.
13. Content belongs in data files where one exists: `app/data/projects.ts`, `app/data/skills.ts`, `app/data/community.ts`. Experience entries are inline in `Experience.tsx`.
14. The sphere's `TECH` list in `Skillspace.tsx` is separate from `skills.ts`. If you change one, ask whether the other should change too.

## Code rules

15. Use theme tokens (`bg-surface`, `bg-panel`, `text-heading`, `text-body`, `text-accent`, `text-amber`, `--radius-card`) and never raw colours, except per-category colours in the sphere.
16. New sections follow the existing pattern: mono eyebrow, `ScrambleText` heading, short muted intro, `useInView` + `animate-reveal`, cards in `TiltCard`.
17. `next/image` sources must start with `/` or `https://`. Event photos live in `public/community/`. Match file-name case exactly, since Linux hosts are case-sensitive and Windows is not.
18. Never render `position: fixed` overlays inside a `TiltCard`. Its transform traps them, so use `createPortal` to `document.body`.
19. Do not read refs during render or call `setState` directly in an effect (lint forbids it). Derive values with `useMemo` or do the work in callbacks.
20. Per-frame animation (the sphere, the background) must move elements with `transform`, never `left/top/width`, and must not put CSS transitions on properties that change every frame. Otherwise it shivers.
21. Do not bring back the failure-injection / circuit-breaker background simulation. The background is floating nodes plus the grid.
22. Bootstrap Icons and devicon logos load from CDNs. Do not vendor them or add an icon library.

## Never

- Never commit, push or deploy unless asked.
- Never delete `public/` assets, `resume.pdf` or the contact API route without being asked.
- Never put secrets or the Resend API key in source files. Use environment variables.
