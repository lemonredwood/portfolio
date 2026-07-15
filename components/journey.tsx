import Section from "./section";
import { profile } from "@/content/profile";

/**
 * Career and education timeline as a clean vertical rail: dot + date + title
 * per entry, newest first. The upcoming Trinity College Dublin entry gets an
 * accent dot, semibold title, and a small "Upcoming" pill; everything else
 * stays quiet and readable.
 */
export default function Journey() {
  const entries = profile.timeline;

  return (
    <Section id="journey" label="Journey">
      <div className="relative max-w-3xl">
        <span
          aria-hidden
          className="absolute left-2 top-2 bottom-2 w-px -translate-x-1/2 bg-border"
        />
        <ol className="space-y-8">
          {entries.map((entry) => {
            const isUpcoming = entry.kind === "next";
            return (
              <li
                key={`${entry.date} ${entry.title}`}
                className="relative pl-10"
              >
                <span
                  aria-hidden
                  className={`absolute left-2 top-1 size-3 -translate-x-1/2 rounded-full border-2 bg-background ${
                    isUpcoming ? "border-accent" : "border-border"
                  }`}
                />
                <p className="text-xs uppercase tracking-wider text-muted">
                  {entry.date}
                </p>
                <p
                  className={`mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-foreground ${
                    isUpcoming ? "font-semibold" : "font-medium"
                  }`}
                >
                  {entry.title}
                  {isUpcoming && (
                    <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                      Upcoming
                    </span>
                  )}
                </p>
                {entry.detail && (
                  <p className="mt-1 text-sm text-secondary">{entry.detail}</p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
