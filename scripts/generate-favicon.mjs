// Generates public/favicon.ico from app/icon.svg.
//
// Next.js serves app/icon.svg as the modern `<link rel="icon">`, but Safari
// ignores SVG favicons and many agents (old browsers, crawlers, RSS readers)
// request the bare /favicon.ico path directly — without this file those
// requests 404. We render the SVG with Playwright's Chromium at 32×32 and
// 16×16, then wrap the two PNGs in a hand-rolled ICO container. PNG-in-ICO
// has been valid since Vista and is parsed by every modern consumer,
// including Safari.
//
// Regenerate after changing app/icon.svg:  npm run generate:favicon

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const svgPath = join(projectRoot, "app", "icon.svg");
const outPath = join(projectRoot, "public", "favicon.ico");

/** Icon sizes to embed, in the conventional ascending order. */
const SIZES = [16, 32];

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Screenshot the SVG at an exact pixel size, preserving transparency. */
async function renderPng(browser, svg, size) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  try {
    // The SVG is vector, so one source renders crisply at every target size.
    await page.setContent(
      `<!doctype html>
       <style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>
       ${svg}`,
    );
    // omitBackground keeps the rounded corners of the icon transparent.
    const png = await page.screenshot({ type: "png", omitBackground: true });
    if (!png.subarray(0, 8).equals(PNG_SIGNATURE)) {
      throw new Error(`Rendered ${size}×${size} image is not a valid PNG.`);
    }
    return png;
  } finally {
    await page.close();
  }
}

/**
 * Pack PNG images into a valid ICO container:
 *   ICONDIR (6 bytes)            — reserved=0, type=1 (icon), image count
 *   ICONDIRENTRY (16 bytes each) — dimensions, planes, bpp, size, offset
 *   image payloads               — the PNG bytes, verbatim
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved, must be 0
  header.writeUInt16LE(1, 2); // resource type: 1 = icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width  (0 means 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height (0 means 256)
    entry.writeUInt8(0, 2); // palette colors: 0 = no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel (RGBA PNG)
    entry.writeUInt32LE(data.length, 8); // payload byte length
    entry.writeUInt32LE(offset, 12); // payload offset from file start
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  const svg = await readFile(svgPath, "utf8");

  const browser = await chromium.launch();
  let images;
  try {
    images = [];
    for (const size of SIZES) {
      const data = await renderPng(browser, svg, size);
      images.push({ size, data });
      console.log(`Rendered ${size}×${size} PNG (${data.length} bytes)`);
    }
  } finally {
    await browser.close();
  }

  const ico = buildIco(images);
  await writeFile(outPath, ico);
  console.log(`Wrote ${outPath} (${ico.length} bytes, ${images.length} images)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
