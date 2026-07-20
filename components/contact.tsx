import Section from "./section";
import { profile } from "@/content/profile";

/** Down-into-tray arrow for the résumé download button. */
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

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      {/* Invitation — the email is the accent centrepiece. */}
      <div>
        <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Let&apos;s build something.
        </h3>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-block break-all font-sans text-2xl font-semibold text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent sm:text-3xl"
        >
          {profile.email}
        </a>
      </div>

      {/* Social + contact links. */}
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        {profile.socials.map((social) => {
          const isExternal = social.href.startsWith("http");
          return (
            <li key={social.platform}>
              <a
                href={social.href}
                {...(isExternal
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="text-secondary transition-colors hover:text-accent"
              >
                {social.label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Résumé download (PDF is added in a later phase; link 404s in dev). */}
      <div className="mt-8">
        <a
          href={profile.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <DownloadArrow />
          Resume (PDF)
        </a>
      </div>

      {/* Footer — education, certificates, societies. Small and muted. */}
      <footer className="mt-20 border-t border-border pt-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Education
            </h4>
            <ul className="mt-4 space-y-3">
              {profile.education.map((entry) => {
                const meta = [
                  entry.detail,
                  entry.period,
                  entry.status === "incoming" ? "incoming" : null,
                ].filter(Boolean);
                return (
                  <li key={entry.institution}>
                    <p className="text-[15px] text-foreground">
                      {entry.institution}
                    </p>
                    {entry.degree && (
                      <p className="mt-0.5 text-sm text-secondary">
                        {entry.degree}
                      </p>
                    )}
                    {meta.length > 0 && (
                      <p className="mt-0.5 font-mono text-xs text-muted">
                        {meta.join(" · ")}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Certifications
            </h4>
            <ul className="mt-4 space-y-2">
              {profile.certificates.map((cert) => (
                <li key={cert.name} className="text-[15px] text-secondary">
                  <span className="text-foreground">{cert.name}</span>
                  {" · "}
                  {cert.issuer}, {cert.year}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Societies
            </h4>
            <ul className="mt-4 space-y-2">
              {profile.societies.map((society) => (
                <li key={society.name} className="text-sm text-secondary">
                  {society.name}
                  {society.role && (
                    <span className="text-muted"> · {society.role}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Colophon. */}
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {profile.name}</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </footer>
    </Section>
  );
}
