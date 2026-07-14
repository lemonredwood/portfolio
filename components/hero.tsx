import { profile } from "@/content/profile";
import TypedTagline from "./hooks/typed-tagline";

/** The `rohith@portfolio:~$` shell prompt, reused before every command line. */
function Prompt() {
  return (
    <span className="select-none">
      <span className="text-accent">rohith@portfolio</span>
      <span className="text-muted">:~$</span>
    </span>
  );
}

export default function Hero() {
  // Everything except email belongs in the hero; email lives in the contact
  // section. GitHub + LinkedIn lead the list in `profile.socials`.
  const socials = profile.socials.filter(
    (social) => social.platform !== "email",
  );

  return (
    <section id="home" className="flex min-h-svh scroll-mt-24 items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[0_0_120px_-30px_rgba(34,211,238,0.25)]">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
            <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
            <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
          </div>

          <div className="min-h-[45vh] space-y-8 p-6 font-mono text-sm leading-relaxed sm:p-8">
            {/* whoami → identity */}
            <div className="space-y-3">
              <p className="text-muted">
                <Prompt /> <span className="text-foreground">whoami</span>
              </p>
              <div className="space-y-1">
                <h1 className="font-sans text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl">
                  {profile.name}
                </h1>
                <p className="text-muted">
                  {profile.role}
                  <span aria-hidden className="mx-2 text-muted/40">
                    ·
                  </span>
                  {profile.location}
                </p>
              </div>
            </div>

            {/* cat tagline.txt → the typed tagline */}
            <div className="space-y-3">
              <p className="text-muted">
                <Prompt />{" "}
                <span className="text-foreground">cat tagline.txt</span>
              </p>
              <p className="max-w-2xl text-pretty text-foreground">
                <TypedTagline text={profile.tagline} />
              </p>
            </div>

            {/* cat status.txt → current status, static (no typing → no CLS) */}
            <div className="space-y-3">
              <p className="text-muted">
                <Prompt />{" "}
                <span className="text-foreground">cat status.txt</span>
              </p>
              <p className="max-w-2xl text-pretty text-foreground">
                <span aria-hidden className="text-accent">
                  →
                </span>{" "}
                {profile.status}
              </p>
            </div>

            {/* ls links/ → socials + scroll hint */}
            <div className="space-y-3">
              <p className="text-muted">
                <Prompt /> <span className="text-foreground">ls links/</span>
              </p>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted">
                {socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {social.label}
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="pt-1 text-muted" data-print-hide>
                <span className="select-none">{"# scroll"}</span>{" "}
                <span
                  aria-hidden
                  className="inline-block motion-safe:animate-bounce"
                >
                  ↓
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
