# AGENTS.md — compa-precio (read this first)

> **DRAFT (2026-09-25), written by Claude from the code and README. To be confirmed with Victor in
> an interview.** Until then, anything marked "draft" below is a proposal, not a decision.

Vendor-neutral briefing for any AI agent working on this repo (Claude, ChatGPT/Codex, Gemini,
Grok, or a local model). `CLAUDE.md` just imports it. Whoever changes direction or architecture
updates this file and `ROADMAP.md`.

## Owner and working rules (from Victor's HQ, 2026-09-29)
Owner: Victor (github.com/vdm285). Stage: learning, portfolio and open source; not commercial.
- **Replies:** checklist first (what's done, what needs Victor), then short details, in plain language.
- **Language:** English with AIs; products for Victor's close circle start in Spanish.
- **Who decides:** technical calls (tools, code, tests, free installs, pushes, `main` included) are the
  agent's; tell Victor after. Design, direction and business: discuss first, Victor decides. A suggested
  default may apply after 7 days of silence for technical choices only. Always ask first: force pushes,
  deleting his data, anything posted or sent in his name, logins and passwords.
- **Pushback:** on logic or design flaws and untested claims (not caution or licence caveats).
- **Test it ourselves:** when a claim is thin or contested, run a small test: pass mark first, plus a
  control that can fail.
- **Brief card:** before any unattended agent run, Victor approves a one-screen card (goal, will / won't
  do, what he will see, budget and stop rule).
- **Checkpoints:** show what works, a live preview and "how to try it on your phone"; numbered steps
  whenever his hands are needed.
- **Locked prototype skeleton:** a `prototype` branch, locked on GitHub, holds only the data the app
  keeps and the rules it enforces.
- **Look:** plain by default (bare wireframe first); polish is an opt-in layer where the visuals are
  the product.
- **To-dos:** one dated list per project, in its `ROADMAP.md`.

Personal context: in Claude's per-project memory, outside git.

## Mission (as far as the README and code show it)
**Know in seconds, at the shelf, whether a price is good.** A phone web app that records the
physical prices you see in the supermarket and compares like with like ("peras con peras"): per
100 g / 100 ml, against the average or the cheapest of the same kind of product. The benchmark is
the README's **"spreadsheet test"**: every feature must beat typing it into Google Sheets. It will
probably merge with ListoLista (Victor's shared shopping list, `~/projects/listolista`) later.

Rollout by checkpoints (draft, see `ROADMAP.md`): 1) Victor's household, in its own stores;
2) friends and family; 3) free public open-source app.

## Design principles (Victor's, for all projects, plus this README's)
1. **Fricción Cero / zero-click start:** recording a price must take under 5 seconds in the aisle;
   open straight into the current store, ready to type. Cut every predictable click and field.
2. **Few clear choices:** one obvious action (record a price); the rest in one labelled menu.
3. **Pay for what you use:** the bare core loads first; photos, reference data (e.g. PROFECO),
   sync load only when used.
4. **Soberanía de datos / no accounts:** your records live on your phone and you can trust them;
   no login walls (at most "Sign in with Google", and only if a feature truly needs it). Export anytime.
5. **Optionality:** dead-simple default; power features are opt-in switches.
6. **Windows Notepad benchmark:** instant, plain, what you type is what you see.
7. **Zero running cost** for Victor. Free software.
8. **Hard code in production, AI in the workshop** ("El Herrero y la Espada",
   `Filosofía de Arquitectura_ Código vs IA.md`): regex, maths and dictionaries run in the app;
   AI only helps build them (tagging, de-duplication) and never runs in production.
9. **Spanish first** for Mexican users (English when it goes public).

## Current state (2026-09-25)
- `main` = the prototype from 2026-03-28/29, live on GitHub Pages: one `index.html` (Tailwind and
  Phosphor icons from CDNs), 8 mock records, one hard-coded store (Walmart Patio Santa Fe, CP 01210).
  **Nothing is saved** (in memory only), no offline/PWA files, location filter is a placeholder.
- `HTML-to-JSON (Walmart)` + `- Zipper`: Colab cells that turn hand-saved Walmart category pages
  into JSON. Their output does not fit the app yet.
- Full readout with bugs (file:line), merge paths and next steps: `docs/READOUT-2026-09-25.md`.
  Top issues: HTML injection via `innerHTML`; unpinned CDN scripts; categories and sizes mis-parsed
  ("Jabón Zote" → Bebidas, "12 latas 355 ml" → 12 litres); new records never compared; same web
  origin as ListoLista.
- No tests, no build step yet.

## Rules inherited from the README (in force until Victor decides otherwise)
The README's "Guía para IAs Copiloto" says: keep the Tailwind CDN and a single functional file (no
bundlers unless Victor asks); **don't change the maths in `procesarDatos()` (grouping by
`subtipo_calculo`) without asking him**; no `alert()`, use DOM modals; modals animate
`modal-enter` → `modal-enter-active` after 10 ms. The readout proposes changing the first two
(decisions D4 and D5 in `ROADMAP.md`): ask before acting on them.

## How to work here
- Read this file, then `ROADMAP.md`, then the readout. Ask at critical checkpoints and push back
  when something doesn't make sense.
- **Branch per piece of work**; `main` is the live site: merge only tested work.
- Proposed structure (draft, copy from ListoLista `design/checkpoint-1`): edit `src/` and `data/`,
  build one `index.html` with `python3 tools/build.py`; pure logic (size parser, statistics,
  category matcher) tested headless with macOS `jsc` via `sh tests/run.sh` (nothing to install);
  UI checked in a browser and on Victor's phone.
- **Tests before features; tests are protected** (don't weaken them to make code pass).
- Every text that comes from data (names, brands, notes, store names) goes into the page as text
  (`textContent`), never as HTML.
- No new third-party scripts or CDNs; if a library is unavoidable, pin the version and self-host it.
- Local juniors (via `~/local-ai/scripts/delegate.sh`) get bounded chores with a pass/fail command.
- Research lives in `docs/research/` (dated, fact-checked; sources with dates).
- Reuse before writing: ListoLista already has a tested aisle matcher + Mexican dictionary, merge,
  encrypted sync, PWA files and build/test tools.
