/**
 * Canonical absolute base URL for the site.
 *
 * Setting `metadataBase` (in `app/layout.tsx`) to this URL — rather than
 * leaving it unset — means *every* URL-based metadata field (canonical,
 * `og:url`, `og:image`, sitemap, robots) resolves against the same base and no
 * "metadataBase is not set" build warning is emitted.
 *
 * Resolution order:
 * 1. `SITE_URL` — explicit escape hatch. Set this to the full origin (e.g.
 *    `https://example.com`) to pin the base anywhere: a non-Vercel host, a CI
 *    job, or a custom domain that differs from the Vercel production URL.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — on Vercel this holds the stable
 *    production hostname (mirrors Next's own metadata-base resolution, see
 *    `resolve-url.js`).
 * 3. Neither set on CI or Vercel → throw. A localhost base silently baked
 *    into production metadata (canonical/OG/sitemap) is an SEO bug; fail the
 *    build instead. The gate is `CI`/`VERCEL` rather than `NODE_ENV` because
 *    `next build` always sets NODE_ENV=production — keying on it would break
 *    plain local builds, which must keep working.
 * 4. Local dev / local build → warn once and fall back to
 *    `http://localhost:PORT`.
 */
function resolveSiteUrl(): URL {
  if (process.env.SITE_URL) {
    return new URL(process.env.SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  const message =
    "Set SITE_URL or deploy on Vercel — refusing to emit localhost URLs in production metadata";
  if (process.env.CI || process.env.VERCEL) {
    throw new Error(message);
  }

  const fallback = `http://localhost:${process.env.PORT ?? 3000}`;
  console.warn(`site-url: ${message}; falling back to ${fallback}`);
  return new URL(fallback);
}

export const siteUrl = resolveSiteUrl();
