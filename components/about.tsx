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
    </Section>
  );
}
