import type { ReactNode } from "react";
import Reveal from "./reveal";

type SectionProps = {
  id: string;
  label: string;
  children: ReactNode;
};

export default function Section({ id, label, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {label}
          </h2>
          <span aria-hidden className="mt-3 mb-10 block h-0.5 w-12 bg-accent" />
        </Reveal>
        <Reveal delayMs={80}>{children}</Reveal>
      </div>
    </section>
  );
}
