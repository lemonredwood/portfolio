import { profile } from "@/content/profile";
import LoopingGif from "./looping-gif";
import Section from "./section";

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
          {profile.skills.map((group) => (
            <div key={group.name}>
              <h3 className="mb-4 text-[15px] font-semibold text-foreground">
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[13px] text-secondary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <LoopingGif
          name="computer-vision"
          alt=""
          width={508}
          height={271}
          className="h-auto w-full max-w-md lg:max-w-none print:hidden"
        />
      </div>
    </Section>
  );
}
