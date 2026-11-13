import { profile } from "@/content/profile";
import LoopingGif from "./looping-gif";
import Section from "./section";

export default function About() {
  return (
    <Section id="about" label="About">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
        <LoopingGif
          name="ai-workflow"
          alt="Illustration of a developer at a laptop wiring data, a model, and deployment into one workflow"
          width={720}
          height={237}
          className="h-auto w-full rounded-xl border border-border print:hidden"
        />
      </div>
    </Section>
  );
}
