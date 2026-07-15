import { profile } from "@/content/profile";
import Section from "./section";

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <div
            key={group.name}
            className="group rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_-14px_rgba(34,211,238,0.45)]"
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[13px] text-secondary transition-colors group-hover:text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
