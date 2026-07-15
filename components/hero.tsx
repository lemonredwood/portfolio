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
 * Clean, content-first hero: name, role, location, current status, tagline,
 * and a row of clearly labeled links. Fully static server component.
 */
export default function Hero() {
  const button =
    "inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent";

  return (
    <section id="home" className="flex min-h-svh scroll-mt-24 items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-balance text-foreground sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 text-xl font-medium text-accent">{profile.role}</p>
          <p className="mt-1 text-base text-muted">{profile.location}</p>

          <p className="mt-6 flex items-baseline gap-2.5 text-base text-secondary">
            <span
              aria-hidden
              className="size-2 shrink-0 self-center rounded-full bg-accent"
            />
            {profile.status}
          </p>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-pretty text-secondary sm:text-xl">
            {profile.tagline}
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {profile.socials.map((social) => {
              const isExternal = social.href.startsWith("http");
              return (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className={button}
                  >
                    {social.label}
                    {isExternal && <ExternalArrow />}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={profile.resumeUrl} download className={button}>
                <DownloadArrow />
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
