# Portfolio Site — Build Plan

**Owner:** Rohith Anand (`lemonredwood`) · **Created:** 2026-07-09
**Execution model:** Fable 5 orchestrates · Opus 4.8 writes the code
**Status:** In build — all §9 items resolved 2026-07-09; Phase 0 dispatched

---

## 1. Goal & locked decisions

A personal portfolio site for Rohith Anand.

| Decision | Choice |
|---|---|
| Aesthetic | **Dark techy** — near-black, glowing accents, terminal motifs |
| Stack | **Next.js 15** (App Router) + TypeScript + Tailwind CSS |
| Hosting | **Vercel** (auto-deploy from GitHub `main`) |
| Sections | Hero · About + Skills · Experience · Projects · Contact |
| Repo root | `~/Projects/portfolio/` (this folder becomes the Next.js app + git repo) |

This `docs/` folder is intentionally the only content here — `create-next-app`
whitelists `docs/` in an otherwise-empty directory, so Phase 0 scaffolds in place.

---

## 2. Content inventory (source of truth: `~/Downloads/Resume.pdf`, July 2026)

### Identity
- **Rohith Anand** — AI Research Associate @ Stryker Global Technology Center (SGTC), Bangalore
- BTech CS, spec. AI/ML @ VIT Chennai, CGPA 8.96, Sept 2022 – July 2026
- Email `therohithanand@gmail.com` · GitHub `lemonredwood` · LinkedIn `linkedin.com/in/lemonredwood`
- LeetCode `leetcode.com/u/lemonredwood` · Kaggle slug assumed `lemonredwood` (verify at QA)
- **Hero tagline (final):** *"I build ML systems that ship — deep learning, computer vision, and NLP, from research to production."* — general ML framing, do **not** pitch healthcare-only.
- ⚠️ **Privacy rule: the phone number on the resume must NOT appear anywhere on the site.**

### Experience — Stryker SGTC, AI Research Associate (Feb 2025 – Present)
Three workstreams, rendered as sub-cards under one role:
1. **Battery Prognostics (Li-ion health forecasting)** — Physics-Informed Neural
   Networks in PyTorch with electrochemical constraints; **0.0301 MAE** on RUL
   prediction; regression/polynomial-fit lifecycle analysis.
2. **Procuity (pressure-injury reduction)** — owned ML pipeline inception →
   feasibility exit; sensor-based pose estimation + ensemble of 4 deep models +
   CatBoost, **96.24% posture-classification accuracy**; 75+ spatial/temporal/
   respiratory features via dual-window processing.
3. **Hospital Status Automation & Archer** — orchestrated large-scale biomedical
   data annotation; high-fidelity CV dataset of live surgical workflows.

### Projects (showcase order)
1. **The Grind** — live multiplayer LeetCode tracker. Supabase realtime,
   GitHub Pages. Repo `lemonredwood/the-grind`. **Deployed + live** → featured
   first with a `LIVE` badge → `https://lemonredwood.github.io/the-grind/`.
2. **DraupECHO** — real-time audio danger detection (Intel GenAI Hackathon).
   AssemblyAI STT + HF Transformers emotion/tone classification (**93.4%**),
   keyword risk pipelines, Twilio + geolocation emergency alerts.
3. **Spatial Speak** — voice assistant for space-agriculture research (Cosmonova
   Hackathon). Next.js + Python, AssemblyAI, **RAG with LLaMA 3 8B via Ollama**
   over NASA/Scholar datasets.

### Achievements / badges
Kaggle **Expert** · **400+** LeetCode solved · 2nd runner-up Hacktomania (IEEE
COMPSOC) · 4 hackathons (Cosmonova, Intel GenAI, Brighter India, V-Strykathon)

### Skills (grouped for the grid)
- **Languages:** Python, Java, Kotlin, C/C++, SQL
- **ML/DL:** PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, OpenCV
- **Domains:** Computer Vision, NLP, Explainable AI, Deep Learning
- **Other:** Android dev, MySQL, front-end web

### Certificates
Android Dev Masterclass (Udemy, 2024) · ML Specialization (DeepLearning.AI,
2024) · DL Fundamentals (NVIDIA, 2024)

### Education + societies (compact footer-adjacent section)
VIT Chennai (as above); DPS Nalco. Microsoft Innovators Club (competitive
programming), Ops Lead Hindi Literary Association, AR/VR Club, Linux Club.

---

## 3. Design direction — "dark techy"

- **Palette:** bg `#0A0E14`, raised surface `#10151F`, border `#1F2733`,
  text `#E6EDF3`, muted `#8B949E`, accent **electric cyan `#22D3EE`** with glow
  (`box-shadow` halos on hover/focus). Dark-only in v1 — commit to the aesthetic.
- **Type:** Geist Sans for body, **Geist Mono** for section labels, tags, and
  the hero terminal (both via `next/font`, zero external requests).
- **Motifs:** hero rendered as a terminal window (`$ whoami` → typed tagline,
  blinking block cursor); numbered mono section labels (`01 // about`);
  subtle background grid; scanline-thin section dividers; tech tags as
  mono chips; glowing card borders on hover.
- **Motion:** CSS-first — typing effect, scroll-reveal via one small
  IntersectionObserver hook. **`prefers-reduced-motion` fully honored**
  (typing renders instantly, reveals become static). No animation libraries.
- **A11y:** WCAG AA contrast on every text/bg pair, visible focus rings,
  semantic landmarks, keyboard-navigable throughout.

---

## 4. Technical architecture

```
portfolio/                     ← repo root, Next.js app root
├── docs/PLAN.md               ← this file (ships with repo)
├── app/
│   ├── layout.tsx             ← fonts, metadata, JSON-LD Person schema
│   ├── page.tsx               ← composes all sections (single page, anchors)
│   ├── globals.css            ← design tokens as CSS vars + Tailwind
│   ├── opengraph-image.tsx    ← generated OG card (terminal-styled)
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── nav.tsx                ← sticky, anchor links, active-section highlight
│   ├── section.tsx            ← shared shell (numbered mono label)
│   ├── hero.tsx  about.tsx  skills.tsx
│   ├── experience.tsx  projects.tsx  contact.tsx
│   └── hooks/use-in-view.ts  use-typing.ts
├── content/
│   ├── types.ts               ← Profile/Role/Project interfaces
│   └── profile.ts             ← ALL site copy, populated from §2
└── public/resume.pdf          ← downloadable resume
```

Principles:
- **Content lives only in `content/profile.ts`** — components never hard-code
  copy; future edits touch one typed file.
- No CMS, no DB, no env vars. Static-first; Vercel builds on push to `main`.
- SEO: Metadata API, generated OG image, sitemap, robots, JSON-LD `Person`.

---

## 5. Orchestration model — Fable 5 × Opus 4.8

**Fable 5 (orchestrator, this session):**
- Decomposes phases into self-contained task briefs; spawns workers via the
  Agent tool with **`model: "opus"`** (→ Opus 4.8).
- Reviews every worker diff before the next phase; runs build/lint/verify;
  resolves integration issues; talks to Rohith; owns all git/deploy gates.
- Never lets a worker commit, push, or deploy.

**Opus 4.8 (workers):** one per task brief; codes exactly the brief's scope;
reports files created + how acceptance criteria were verified.

**Rules of engagement**
1. Sequential phases; parallel workers only when file sets are disjoint (Phase 2).
2. Every brief carries: scope, files owned, design tokens, acceptance criteria,
   and "do not touch" list.
3. Worker output is reviewed + build-tested by Fable 5 before merge into the
   next phase's baseline.
4. Deploy requires Rohith's explicit OK (matches existing push-to-main-after-
   confirmation workflow).

**Worker brief template**
```md
## Task: <name>            ## Model: opus
**Own these files:** <paths>   **Do not touch:** <paths>
**Context:** stack, tokens (§3), data model (content/types.ts)
**Build:** <exact requirements>
**Acceptance:** `npm run build` clean · no placeholder copy ·
responsive 360–1440px · reduced-motion honored · report back file list + notes
```

> ⚙️ Session-model gotcha: `/model` set Fable 5 as the default, but
> `.claude/settings.json` pins **Opus 4.8 on restart**. To keep Fable 5 as
> orchestrator across restarts, update the `model` pin in settings.json
> (or re-run `/model claude-fable-5` per session).

---

## 6. Phase plan

| # | Phase | Owner | Deliverable |
|---|---|---|---|
| 0 | Scaffold & theme | Opus W0 | create-next-app (TS/Tailwind/App Router) in repo root; Geist fonts; §3 tokens in `globals.css`; dark `<html>`; nav + empty section shells. **AC:** clean build, dark page renders. |
| 1 | Content model | Opus W1 | `content/types.ts` + `profile.ts` fully populated from §2 verbatim. **AC:** typecheck passes, zero placeholders, phone number absent. |
| 2a | Hero/About/Skills | Opus W2a ∥ | Terminal hero with typing tagline, About, Skills grid. Files disjoint from W2b. |
| 2b | Exp/Projects/Contact | Opus W2b ∥ | Experience timeline (3 Stryker sub-cards), Projects grid (The Grind first, LIVE badge), Contact + footer. **AC (both):** real content renders, anchors work, responsive. |
| 3 | Polish & SEO | Opus W3 | Scroll-reveal, hover glows, grid bg, focus states; metadata + OG image + sitemap + robots + JSON-LD; `public/resume.pdf` + download button. **AC:** Lighthouse ≥95 all four categories (mobile). |
| 4 | QA & review | **Fable 5** | `/code-review` on full diff; verify pass (drive the real site); §7 checklist; fix-ups as micro-briefs to Opus. |
| 5 | Ship | **Fable 5** + Rohith | git init → push → Vercel → live. Runbook in §8. |

Estimated: one focused session for Phases 0–3, then QA + ship.

---

## 7. QA checklist (Phase 4 gate)

- [ ] `npm run build` — zero errors/warnings that matter
- [ ] Lighthouse mobile ≥95: Performance / Accessibility / Best Practices / SEO
- [ ] Responsive at 360 / 768 / 1024 / 1440 px — no horizontal scroll
- [ ] Keyboard-only pass: nav, anchors, all links reachable, focus visible
- [ ] `prefers-reduced-motion`: no typing animation, no reveals, content intact
- [ ] Every external link resolves (The Grind live, repos, LinkedIn, Kaggle, LeetCode)
- [ ] Resume PDF downloads; **contains no… actually it does contain the phone — see §9 Q7**
- [ ] Phone number absent from HTML source (grep the digits → no hits)
- [ ] OG image renders (check via social-preview tool)
- [ ] Favicon + tab title correct

---

## 8. Deployment runbook (Phase 5)

Constraint from setup: **no `gh` CLI/token locally; SSH auth works.**

1. Rohith creates an empty repo `lemonredwood/portfolio` on github.com
   (no README — keeps first push clean).
2. Fable 5: `git init && git add -A && git commit` → remote
   `git@github.com:lemonredwood/portfolio.git` → push `main`
   (after explicit OK, per existing workflow).
3. Rohith imports the repo at vercel.com/new (one-time GitHub OAuth; framework
   auto-detected). Alternative: `npx vercel login` + `npx vercel --prod` via
   `!` command in-session.
4. Smoke test the `*.vercel.app` URL against §7.
5. Optional: attach custom domain (§9 Q6); Vercel handles DNS + TLS.
6. Ongoing: every push to `main` auto-deploys — same confirm-then-push
   convention as The Grind.

---

## 9. Decisions from Rohith — resolved 2026-07-09

1. **LinkedIn:** `https://www.linkedin.com/in/lemonredwood`
2. **The Grind live URL:** `https://lemonredwood.github.io/the-grind/`
3. **Headshot:** text-only v1 (no photo).
4. **Tagline (final):** *"I build ML systems that ship — deep learning,
   computer vision, and NLP, from research to production."*
   Rohith's direction: general ML-systems positioning, **not** healthcare-limited.
5. **Profile links:** yes to both — `leetcode.com/u/lemonredwood` +
   Kaggle (`kaggle.com/therohithanand`, verified 200).
6. **Domain:** ship on the Vercel URL; custom domain later.
7. **Resume PDF:** generate a phone-free version for the download button;
   Rohith reviews it before ship.

---

## 10. Risks & notes

- **Vercel account** — needed at Phase 5; if none exists, sign up with GitHub (free Hobby tier).
- **create-next-app drift** — pin behavior by passing explicit flags
  (`--ts --tailwind --app --eslint --no-src-dir --import-alias "@/*"`).
- **Scope discipline** — v1 is a single page + PDF. Blog, dark/light toggle,
  i18n, CMS: all explicitly out of scope until v1 is live.
- Plan doc ships with the repo (`docs/PLAN.md`) as living documentation;
  update it as decisions land.
