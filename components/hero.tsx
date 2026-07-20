import { profile } from "@/content/profile";

/** Down-into-tray arrow for the resume download button. */
function DownloadArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        d="M8 2.5V9.5M8 9.5 5 6.5M8 9.5 11 6.5M3 13h10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Up-right arrow marking a link that opens in a new tab. */
function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="size-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        d="M3.5 8.5 8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Content-first hero. On desktop it splits into two columns: the narrative
 * (name, role, status, lede, intro, credentials, actions) on the left and a
 * quiet "Focus areas" stack on the right. Below `lg` it collapses to a single
 * column, the focus stack falling in after the actions. Fully static server
 * component.
 */
export default function Hero() {
  return (
    <section id="home" className="flex min-h-svh scroll-mt-24 items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid lg:grid-cols-[1fr_20rem] lg:gap-16">
          {/* LEFT: narrative + actions. */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-balance text-foreground sm:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 text-xl font-medium text-accent">
              {profile.role}
            </p>
            <p className="mt-1 text-base text-muted">{profile.location}</p>

            <p className="mt-6 flex items-baseline gap-2.5 text-base text-secondary">
              <span
                aria-hidden
                className="size-2 shrink-0 self-center rounded-full bg-accent"
              />
              {profile.status}
            </p>

            {/* Tagline promoted to the lede. */}
            <p className="mt-6 max-w-prose font-serif text-xl text-pretty text-foreground sm:text-2xl">
              {profile.tagline}
            </p>

            <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-secondary">
              {profile.intro}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {profile.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] text-secondary"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Resume is the single primary; the rest are quiet text links. */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent/85"
              >
                <DownloadArrow />
                Resume (PDF)
              </a>
              {profile.socials.map((social) => {
                const isExternal = social.href.startsWith("http");
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-accent"
                  >
                    {social.label}
                    {isExternal && <ExternalArrow />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT: quiet, borderless focus-areas stack (top rules only). */}
          <div className="mt-12 lg:mt-0">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Focus areas
            </h2>
            <div className="mt-4 space-y-4">
              {profile.focusAreas.map((area) => (
                <div
                  key={area.title}
                  className="border-t border-border pt-4"
                >
                  <h3 className="text-[15px] font-semibold text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">{area.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
