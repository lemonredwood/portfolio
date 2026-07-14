import Section from "./section";
import { profile } from "@/content/profile";

export default function Experience() {
  return (
    <Section id="experience" index={3} label="experience">
      <div className="space-y-16">
        {profile.experience.map((role) => (
          <article key={`${role.company} ${role.title}`}>
            {/* Role header: company + title prominent, meta right-aligned on desktop. */}
            <header className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {role.company}
                </h3>
                <p className="mt-1 text-base font-medium text-accent">
                  {role.title}
                </p>
              </div>
              <div className="shrink-0 font-mono text-xs text-muted md:text-right">
                <p>{role.period}</p>
                {role.location && <p className="mt-0.5">{role.location}</p>}
              </div>
            </header>

            {/* Headline metrics — bare KPI tiles (glance) sitting above the
                workstream bullets (context). Numbers wear text tokens, not the
                accent, per the dataviz spec; a single accent tick decorates. */}
            {role.metrics && role.metrics.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {role.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="relative overflow-hidden rounded-lg border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_-16px_rgba(34,211,238,0.4)]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-5 top-0 h-0.5 w-6 bg-accent"
                    />
                    <div className="text-5xl font-semibold tracking-tight tabular-nums text-foreground">
                      {metric.value}
                    </div>
                    <div className="mt-2 font-mono text-xs leading-relaxed text-muted">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Workstreams as sub-cards along an accent-marked timeline rail. */}
            <div className="relative mt-8">
              <span
                aria-hidden
                className="absolute left-2 top-3 bottom-3 w-px -translate-x-1/2 bg-border"
              />
              <ol className="space-y-5">
                {role.workstreams.map((ws) => (
                  <li key={ws.name} className="relative pl-10">
                    <span
                      aria-hidden
                      className="absolute left-2 top-6 size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background"
                    />
                    <div className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/30">
                      <h4 className="font-semibold text-foreground">
                        {ws.name}
                      </h4>
                      {ws.summary && (
                        <p className="mt-0.5 font-mono text-xs text-muted">
                          {ws.summary}
                        </p>
                      )}
                      <ul className="mt-3 space-y-2">
                        {ws.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-accent/60"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
