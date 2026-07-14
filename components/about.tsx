import { profile } from "@/content/profile";
import Section from "./section";

export default function About() {
  return (
    <Section id="about" index={1} label="about">
      {/* ~65ch measure; the lead paragraph sits at full foreground, the rest
          settle back to muted for a readable emphasis hierarchy. */}
      <div className="max-w-[65ch] space-y-5 text-pretty">
        {profile.about.map((paragraph, index) => (
          <p
            key={index}
            className={`leading-relaxed ${
              index === 0 ? "text-foreground" : "text-muted"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap gap-3">
        {profile.achievements.map((achievement) => {
          const chip =
            "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-foreground";
          const body = (
            <>
              {achievement.label}
              {achievement.detail ? (
                <span className="text-muted">
                  {"· "}
                  {achievement.detail}
                </span>
              ) : null}
            </>
          );

          return (
            <li key={achievement.label}>
              {achievement.href ? (
                <a
                  href={achievement.href}
                  target="_blank"
                  rel="noreferrer"
                  title={achievement.detail}
                  className={`${chip} transition-colors hover:border-accent hover:text-accent`}
                >
                  {body}
                  <span aria-hidden className="text-accent">
                    ↗
                  </span>
                </a>
              ) : (
                <span className={chip} title={achievement.detail}>
                  {body}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
