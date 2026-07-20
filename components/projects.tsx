import Section from "./section";
import { profile } from "@/content/profile";
import type { Link } from "@/content/types";

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

function ProjectLink({ link }: { link: Link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
    >
      {link.label}
      <ExternalArrow />
    </a>
  );
}

function Badge({ label }: { label: string }) {
  // "LIVE" reads as an accent pill with a pulsing dot; everything else
  // (hackathon labels) is a neutral pill.
  if (label === "LIVE") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted">
      {label}
    </span>
  );
}

export default function Projects() {
  return (
    <Section id="projects" label="Projects">
      {/* Four cards laid out 2×2 (from `sm` up) so the grid never orphans a
          lone card in a trailing row. */}
      <div className="grid gap-6 sm:grid-cols-2">
        {profile.projects.map((project) => (
          <article
            key={project.name}
            className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {project.name}
              </h3>
              {project.badge && <Badge label={project.badge} />}
            </div>

            <p className="mt-2 text-[15px] leading-relaxed text-secondary">
              {project.blurb}
            </p>

            <ul className="mt-4 space-y-2">
              {project.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-[15px] leading-relaxed text-secondary"
                >
                  <span
                    aria-hidden
                    className="mt-[0.5625rem] size-1 shrink-0 rounded-full bg-border"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Stack chips + links pinned to the card foot so cards align. */}
            <div className="mt-auto pt-5">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-border bg-background px-2 py-1 font-mono text-[13px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {(project.live || project.repo) && (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm font-medium">
                  {project.live && <ProjectLink link={project.live} />}
                  {project.repo && <ProjectLink link={project.repo} />}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Slim full-width card: the grid is a curated few; the rest lives on
          GitHub. */}
      <a
        href="https://github.com/lemonredwood"
        target="_blank"
        rel="noreferrer"
        className="group mt-6 flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-6 py-5 transition-colors hover:border-accent/40"
      >
        <span className="text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
          See more of my work on GitHub
        </span>
        <span
          aria-hidden
          className="text-accent transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </Section>
  );
}
