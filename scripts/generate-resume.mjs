// Generates public/resume.pdf from the typed content model (content/profile.ts).
//
// Runs on plain Node (no tsx): Node's native TypeScript type-stripping lets us
// import the profile directly, keeping a single source of truth. The resume is
// built as self-contained, print-styled HTML and rendered to a single A4 page
// with Playwright's page.pdf().
//
// HARD RULE: no phone number may ever appear in the resume. Rather than hard-code
// the private number (a secret in source is itself a leak), we scan for the SHAPE
// of a phone number — any run of 10+ digits separated only by phone punctuation
// (spaces, dots, dashes, parens, +, /) — in both the built HTML's text content and
// the Playwright-rendered text, and abort if one is found. Legit resume content
// (years, CGPA, "96.24%", "400+") never forms such a run because letters / · / –
// sit between the number groups and break it.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { profile } from "../content/profile.ts";

// A run of 10+ digits separated only by characters that appear *inside* a phone
// number: spaces, tabs, dots, hyphens, parens, +, /. Letters, ·, – and newlines
// are NOT separators, so distinct facts ("CGPA 8.96 · … July 2026") never merge
// into a false-positive run. Catches every common phone shape — a bare 10-digit
// run, dashed/dotted 3-3-4 groupings, "(NNN) NNN-NNNN", "+CC NNNNN NNNNN" — with
// no secret stored in source.
const PHONE_LIKE_RUN = /\d(?:[ \t.()+\/-]*\d){9,}/;

/** Human-readable text of the built HTML: drop the <style> block and all tags. */
function htmlToText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const outPath = join(projectRoot, "public", "resume.pdf");

/** Minimal HTML escaping for text drawn from the content model. */
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Strip protocol / trailing slash for compact link display. */
function displayUrl(href) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function bySocial(platform) {
  return profile.socials.find((s) => s.platform === platform);
}

function renderContactHeader() {
  const email = profile.email;
  const github = bySocial("github");
  const linkedin = bySocial("linkedin");
  const parts = [
    esc(email),
    github ? esc(displayUrl(github.href)) : null,
    linkedin ? esc(displayUrl(linkedin.href)) : null,
  ].filter(Boolean);
  return parts.join(' <span class="sep">·</span> ');
}

function renderEducation() {
  const items = profile.education
    .map((e) => {
      const meta = [e.detail, e.period].filter(Boolean).map(esc).join(" · ");
      return `
        <div class="entry">
          <div class="entry-title">${esc(e.institution)}</div>
          ${e.degree ? `<div class="entry-sub">${esc(e.degree)}</div>` : ""}
          ${meta ? `<div class="entry-meta">${meta}</div>` : ""}
        </div>`;
    })
    .join("");
  return section("Education", items);
}

function renderExperience() {
  const roles = profile.experience
    .map((role) => {
      const workstreams = role.workstreams
        .map(
          (ws) => `
          <div class="ws">
            <div class="ws-head">
              <span class="ws-name">${esc(ws.name)}</span>
              ${ws.summary ? `<span class="ws-summary">${esc(ws.summary)}</span>` : ""}
            </div>
            <ul>${ws.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          </div>`,
        )
        .join("");
      return `
        <div class="entry">
          <div class="role-head">
            <div>
              <span class="entry-title">${esc(role.company)}</span>
              <span class="role-title">${esc(role.title)}</span>
            </div>
            <div class="entry-meta">${esc(role.period)}${role.location ? ` · ${esc(role.location)}` : ""}</div>
          </div>
          ${workstreams}
        </div>`;
    })
    .join("");
  return section("Experience", roles);
}

function renderProjects() {
  const items = profile.projects
    .map(
      (p) => `
        <div class="entry">
          <div class="proj-head">
            <span class="entry-title">${esc(p.name)}</span>
            ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
          </div>
          <div class="entry-sub">${esc(p.blurb)}</div>
          <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          <div class="stack">${p.stack.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>`,
    )
    .join("");
  return section("Projects", items);
}

function renderSkills() {
  const items = profile.skills
    .map(
      (g) => `
        <div class="skill-group">
          <div class="skill-name">${esc(g.name)}</div>
          <div class="skill-list">${g.skills.map(esc).join(", ")}</div>
        </div>`,
    )
    .join("");
  return section("Skills", items);
}

function renderCertificates() {
  const items = profile.certificates
    .map(
      (c) =>
        `<div class="line"><span class="strong">${esc(c.name)}</span> — ${esc(c.issuer)}, ${esc(c.year)}</div>`,
    )
    .join("");
  return section("Certifications", items);
}

function renderAchievements() {
  const items = profile.achievements
    .map((a) => {
      const detail = a.detail ? ` <span class="muted">· ${esc(a.detail)}</span>` : "";
      return `<div class="line">${esc(a.label)}${detail}</div>`;
    })
    .join("");
  return section("Achievements", items);
}

function section(title, inner) {
  return `<section><h2>${esc(title)}</h2>${inner}</section>`;
}

function buildHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name)} — Résumé</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: -apple-system, "Helvetica Neue", Arial, sans-serif;
    color: #111;
    background: #fff;
    font-size: 10.2px;
    line-height: 1.34;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  header { border-bottom: 1.5px solid #111; padding-bottom: 8px; margin-bottom: 12px; }
  h1 { font-size: 23px; margin: 0 0 2px; letter-spacing: -0.4px; }
  .role { font-size: 11px; font-weight: 600; color: #222; }
  .contact { margin-top: 5px; font-size: 9.6px; color: #333; }
  .contact .sep { color: #999; }

  .grid { display: grid; grid-template-columns: 1.85fr 1fr; gap: 22px; }
  .col { min-width: 0; }

  section { margin-bottom: 12px; break-inside: avoid; }
  h2 {
    font-size: 9.4px; text-transform: uppercase; letter-spacing: 1px;
    color: #000; margin: 0 0 6px; padding-bottom: 2px;
    border-bottom: 0.8px solid #bbb;
  }

  .entry { margin-bottom: 9px; }
  .entry-title { font-weight: 700; font-size: 11px; }
  .entry-sub { font-style: italic; color: #333; margin-top: 1px; }
  .entry-meta { color: #555; font-size: 9.2px; margin-top: 1px; }

  .role-head, .proj-head, .ws-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .role-title { font-weight: 600; color: #222; margin-left: 6px; }
  .proj-head { align-items: center; }

  .ws { margin-top: 5px; padding-left: 9px; border-left: 2px solid #ddd; }
  .ws-head { justify-content: flex-start; gap: 7px; align-items: baseline; }
  .ws-name { font-weight: 600; }
  .ws-summary { color: #666; font-size: 9px; }

  ul { margin: 3px 0 0; padding-left: 15px; }
  li { margin-bottom: 1.5px; }

  .badge {
    font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    color: #0a6; border: 1px solid #0a6; border-radius: 999px; padding: 1px 6px;
  }
  .stack { margin-top: 3px; color: #444; font-size: 8.8px; }
  .stack span { display: inline-block; border: 1px solid #ccc; border-radius: 3px; padding: 0.5px 4px; margin: 2px 3px 0 0; }

  .skill-group { margin-bottom: 5px; }
  .skill-name { font-weight: 700; font-size: 9.4px; }
  .skill-list { color: #333; }

  .line { margin-bottom: 3px; }
  .strong { font-weight: 700; }
  .muted { color: #777; }
</style>
</head>
<body>
  <header>
    <h1>${esc(profile.name)}</h1>
    <div class="role">${esc(profile.role)} · ${esc(profile.location)}</div>
    <div class="contact">${renderContactHeader()}</div>
  </header>
  <div class="grid">
    <div class="col">
      ${renderExperience()}
      ${renderProjects()}
    </div>
    <div class="col">
      ${renderEducation()}
      ${renderSkills()}
      ${renderCertificates()}
      ${renderAchievements()}
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const html = buildHtml();

  // Guard 1: the HTML's text content (from which the PDF is generated)
  // contains nothing phone-shaped.
  const htmlHit = htmlToText(html).match(PHONE_LIKE_RUN);
  if (htmlHit) {
    throw new Error(
      `Phone-like digit run "${htmlHit[0]}" found in resume HTML text content.`,
    );
  }

  await mkdir(dirname(outPath), { recursive: true });

  // A4 @96dpi is 794×1123px; subtract the pdf margins below to get the usable
  // content box. Measuring at this exact width makes the single-page check in
  // the log meaningful.
  const A4_USABLE_WIDTH = 794 - 2 * 53; // 14mm left + right
  const A4_USABLE_HEIGHT = 1123 - 49 - 45; // 13mm top, 12mm bottom

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: A4_USABLE_WIDTH, height: 200 },
    });
    await page.setContent(html, { waitUntil: "networkidle" });

    // Guard 2: the rendered text (what a reader/extractor sees) is phone-free.
    const renderedText = await page.evaluate(() => document.body.innerText);
    const renderedHit = renderedText.match(PHONE_LIKE_RUN);
    if (renderedHit) {
      throw new Error(
        `Phone-like digit run "${renderedHit[0]}" found in rendered resume text.`,
      );
    }

    // Report content height vs. one A4 page so single-page fit can be
    // confirmed from the run log (and fail loudly if it ever overflows).
    const contentHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(
      `Content height at print width: ${contentHeight}px (one A4 page holds ${A4_USABLE_HEIGHT}px)`,
    );
    if (contentHeight > A4_USABLE_HEIGHT) {
      throw new Error(
        `Resume overflows one A4 page (${contentHeight}px > ${A4_USABLE_HEIGHT}px). Tighten the layout.`,
      );
    }

    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "13mm", bottom: "12mm", left: "14mm", right: "14mm" },
    });
    console.log(`Wrote ${outPath}`);
    console.log(
      "Phone-free verified: no phone-like digit run (10+ digits) in the HTML text content or rendered text.",
    );
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
