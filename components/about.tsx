import { profile } from "@/content/profile";
import Section from "./section";

export default function About() {
  return (
    <Section id="about" label="About">
      {/* Prose measure; the lead paragraph sits at full foreground, the rest
          settle back one step for a readable emphasis hierarchy. */}
      <div className="max-w-prose space-y-5 text-pretty">
        {profile.about.map((paragraph, index) => (
          <p
            key={index}
            className={`text-[17px] leading-relaxed ${
              index === 0 ? "text-foreground" : "text-secondary"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap gap-3">
        {profile.achievements.map((achievement) => {
          const chip =
            "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-[13px] text-foreground";
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
