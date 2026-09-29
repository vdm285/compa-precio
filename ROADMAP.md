# compa-precio roadmap (single source of truth) — DRAFT

Updated: 2026-09-29. Owner: Victor. **Everything here is a draft written by Claude from the code
and README, to be confirmed in an interview with Victor.** Any AI working on this repo reads
`AGENTS.md`, then this file, and updates both when something changes. Details and evidence:
`docs/READOUT-2026-09-25.md`.

Legend: ✅ done · 🔨 in progress · ⏳ waiting on Victor · 🔜 next · 💤 later · 🚩 flag (known limit)

---

## Where we are, in one line
**A March 2026 prototype (one page, mock data, nothing saved) is live on GitHub Pages. Next: the
interview, a safety patch, then a rebuild on ListoLista's tested parts.**

---

## The horizon (checkpoints, not calendar dates) — draft
Each checkpoint starts only when Victor is comfortable with the previous one.

| # | Checkpoint | Who uses it | Goal | Status |
|---|---|---|---|---|
| 0 | Safety patch | the live prototype | No HTML injection, no unpinned CDN scripts, no false "Reporte enviado" (or take the page offline) | 🔜 |
| 1 | **My prices, my stores** | Victor's close circle | Record a shelf price in under 5 s; per-100 g/ml comparison that is right; saved on the phone; offline; installable; "Mis tiendas"; export | 💤 after the interview |
| 2 | Friends and family | ~10-20 people | Feedback; optional PROFECO reference prices; maybe share a price log between two phones (ListoLista's encrypted sync) | 💤 |
| 3 | Public, open source | anyone | English, contribution rules, maybe community prices (with protection against bad data) | 💤 |
| — | Merge with ListoLista | — | "Precios" as an opt-in switch inside ListoLista (price chip in aisle view), or stay sister apps | 💤 decide after ListoLista checkpoint 1 is live |

---

## What exists (✅) and what is left — draft

### Done (prototype, 2026-03-28/29)
- ✅ README philosophy, tech decisions and data model (Product + dated price events).
- ✅ Architecture essay: hard code in production, AI only in the workshop.
- ✅ `index.html` prototype: cards, two switches (label vs per-100 g/ml; average vs cheapest),
  search, "+" modal with camera, update/report modal, category hint, location placeholder.
- ✅ Walmart HTML → JSON extractor + zipper (Colab).
- ✅ Readout, AGENTS.md, this roadmap (2026-09-25; merged into `main` 2026-09-29, readout branch deleted).

### Next, in order (effort in senior hours; "junior" = delegable with a pass/fail test)
1. ⏳ **Interview** (20 min) → confirm the decisions table below.
2. 🔜 **Checkpoint 0 safety patch** on the live page (2 h, junior-able), or take it offline.
3. 🔜 Rebuild on ListoLista's skeleton: `src/`, `tools/build.py`, `tests/run.sh` (jsc), plain CSS,
   inline SVG icons, scripts moved to `tools/*.py` (3-4 h).
4. 🔜 Engine as a tested module `src/precio.js`: size parser (word boundaries, multipacks,
   decimal comma, pieces), groups by (subtipo, unit, store scope), median, latest price per
   product per store; 60+ real product names as a test table (5-6 h).
5. 🔜 Categories + `subtipo` from ListoLista's matcher and dictionary (+ synonyms) (2 h).
6. 🔜 Local price log in IndexedDB (append-only events), `storage.persist()`, Export/Import
   JSON + CSV; photos shrunk or dropped (4-5 h).
7. 🔜 "Mis tiendas" (pick the store in one tap; remember the last one) (2-3 h).
8. 🔜 PWA (manifest + service worker) on its own web address (1-2 h + one Cloudflare step by Victor).
9. 💤 PROFECO "Quién es Quién en los Precios" spike: CDMX subset, size, freshness (2 h).
10. 💤 Merge prototype with ListoLista (1 day, after ListoLista checkpoint 1 is live).

---

## Decisions waiting on Victor (priority order) — defaults are drafts
These are design and direction calls: a suggested default is a proposal and waits for Victor's answer
(silence is not a yes). Only purely technical choices may take their default after 7 days.

| # | Decision | Why it matters | Suggested default (needs Victor) |
|---|---|---|---|
| D1 | **Merge path with ListoLista:** A) sister apps sharing parts, B) "Precios" switch inside ListoLista, C) full merge now | Where the code lives; what gets built first | A now, B as the target; decide after ListoLista checkpoint 1 |
| D2 | **Web address:** stay on vdm285.github.io (shares storage with ListoLista) or own address (e.g. free Cloudflare name) | Separate apps must not share one storage box; changing later resets installs | Own address before anything is saved; if D1 = B, it lives wherever ListoLista lives |
| D3 | **The one job at the shelf:** vs my past prices / cheapest size here / cheapest store for my list | Decides the main screen | Cheapest per 100 g/ml among what I recorded in *this* store, plus "last time $X" |
| D4 | **Tailwind CDN rule** (README): keep, or allow plain CSS + inline icons | Today ≈ 640 KB of downloads from 3 outside hosts for a 43 KB app; no offline | Plain CSS + inline SVG icons (no bundler) |
| D5 | **Engine changes** (README says ask first): median instead of mean; compare only same unit and same store scope; `subtipo` from the dictionary | Today's colours can mislead (see readout B3) | Yes to all three, with a test table you can read |
| D6 | **Data sources:** own records only / + PROFECO open data as reference / keep the Walmart scraper | Legal and trust questions; Walmart's terms forbid robots | Own records at checkpoint 1; PROFECO spike later; scraper private, output never committed |
| D7 | **Location:** "Mis tiendas" list vs postal-code radius | CP digits are not distances | "Mis tiendas" for checkpoint 1 |
| D8 | **Photos** in checkpoint 1? | Storage, speed, friction | Off by default (opt-in switch), shrunk to ~800 px, never shared |
| D9 | **The live prototype:** patch now or take offline until checkpoint 1 | It is public and has an injection hole | Patch (checkpoint 0) |
| D10 | Name: "compa-precio" or "Comparador de Precios CDMX" | Titles, icon, address | Decide at checkpoint 2 |

## 🚩 Known limits (flags)
- iPhone deletes a site's data after 7 days of Safari use without a visit unless the app is on the
  Home Screen: a long price history needs install + export.
- Shelf prices change and promotions hide the base price; one record is a snapshot with a date,
  not the truth. Show the date.
- Per-100 g comparison only works when the size is in the name or entered; "pieces" need their
  own unit (per piece, per roll, per sheet).

## Log (newest first)
- 2026-09-29: working rules from Victor's HQ in `AGENTS.md`; personal details removed from the docs;
  decision column renamed "Suggested default (needs Victor)".
- 2026-09-25: repo read in full; engine and scraper tested with jsc/Python; readout, AGENTS.md,
  CLAUDE.md and this draft roadmap (merged into `main` and pushed 2026-09-29; readout branch deleted).
- 2026-03-28/29: prototype, README, architecture essay and Walmart extractor published (GitHub web editor).
