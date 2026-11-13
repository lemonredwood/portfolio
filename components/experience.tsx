import LoopingGif from "./looping-gif";
import Section from "./section";
import { profile } from "@/content/profile";

export default function Experience() {
  return (
    <Section id="experience" label="Experience">
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
              <div className="shrink-0 text-sm text-muted md:text-right">
                <p>{role.period}</p>
                {role.location && <p className="mt-0.5">{role.location}</p>}
              </div>
            </header>

            {/* Cropped to the GIF's centre band, where the pipeline sits. */}
            <LoopingGif
              name="ml-pipeline"
              alt=""
              width={800}
              height={450}
              className="mt-8 aspect-[5/1] w-full max-w-2xl rounded-xl border border-border object-cover print:hidden"
            />

            {/* Flattened workstreams along a neutral timeline rail. */}
            <div className="relative mt-8">
              <span
                aria-hidden
                className="absolute left-2 top-3 bottom-3 w-px -translate-x-1/2 bg-border"
              />
              <ol className="space-y-8">
                {role.workstreams.map((ws) => (
                  <li key={ws.name} className="relative pl-10">
                    <span
                      aria-hidden
                      className="absolute left-2 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-border bg-background"
                    />
                    <h4 className="font-semibold text-foreground">
                      {ws.name}
                    </h4>
                    {ws.summary && (
                      <p className="mt-0.5 text-sm text-muted">{ws.summary}</p>
                    )}
                    {ws.result && (
                      <p className="mt-1 text-[15px] font-semibold text-foreground">
                        {ws.result}
                      </p>
                    )}
                    <ul className="mt-3 space-y-2">
                      {ws.bullets.map((bullet) => (
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
