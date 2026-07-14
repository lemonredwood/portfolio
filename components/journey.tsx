import Section from "./section";
import { profile } from "@/content/profile";
import type { TimelineEntry } from "@/content/types";

/**
 * Deterministic 7-char hex "commit hash" derived purely from the entry title
 * (FNV-1a, 32-bit). Being a pure function of static copy, it produces identical
 * output on the server and the client — no `Math.random`, no hydration
 * mismatch, stable across renders.
 */
function commitHash(title: string): string {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < title.length; i++) {
    hash ^= title.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime
  }
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/** Short, git-flavored tag per kind, shown muted. `next` uses the HEAD decoration instead. */
const KIND_TAG: Record<TimelineEntry["kind"], string> = {
  education: "edu",
  work: "work",
  cert: "cert",
  award: "win",
  next: "next",
};

/** The `rohith@portfolio:~$` shell prompt — echoes the hero's styling. */
function Prompt() {
  return (
    <span className="select-none">
      <span className="text-accent">rohith@portfolio</span>
      <span className="text-muted">:~$</span>
    </span>
  );
}

export default function Journey() {
  const entries = profile.timeline;

  return (
    <Section id="journey" index={5} label="journey">
      <div className="font-mono text-sm leading-relaxed">
        <p className="text-muted">
          <Prompt />{" "}
          <span className="text-foreground">git log --oneline --graph</span>
        </p>

        <ol className="mt-6">
          {entries.map((entry, i) => {
            const isHead = entry.kind === "next";
            const isLast = i === entries.length - 1;
            const hash = commitHash(entry.title);

            return (
              <li
                key={`${entry.date} ${entry.title}`}
                className="grid grid-cols-[0.75rem_1fr] gap-x-3 sm:gap-x-4"
              >
                {/* Graph gutter: the `*` node plus a rail connecting down to the
                    next commit. The last commit draws no rail below it. */}
                <div
                  aria-hidden
                  className="relative flex justify-center leading-relaxed"
                >
                  <span
                    className={`relative z-10 ${
                      isHead ? "text-accent" : "text-muted"
                    }`}
                  >
                    *
                  </span>
                  {!isLast && (
                    <span className="absolute left-1/2 top-[1.4em] bottom-[-0.25rem] w-px -translate-x-1/2 bg-border" />
                  )}
                </div>

                {/* Commit line. */}
                <div className={isLast ? "min-w-0" : "min-w-0 pb-4"}>
                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="hidden text-muted/70 sm:inline">
                      {hash}
                    </span>
                    <span className="text-accent">{entry.date}</span>
                    {isHead ? (
                      <span className="text-accent">
                        {"(HEAD -> future)"}
                      </span>
                    ) : (
                      <span className="text-muted/70">
                        {`[${KIND_TAG[entry.kind]}]`}
                      </span>
                    )}
                    <span className="text-foreground">{entry.title}</span>
                  </p>
                  {entry.detail && (
                    <p className="mt-0.5 text-xs text-muted">{entry.detail}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
