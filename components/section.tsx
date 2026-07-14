import type { ReactNode } from "react";
import Reveal from "./reveal";

type SectionProps = {
  id: string;
  index: number;
  label: string;
  children: ReactNode;
};

export default function Section({ id, index, label, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <h2 className="mb-10 font-mono text-sm text-muted">
            {String(index).padStart(2, "0")}{" "}
            <span className="text-accent">{"//"}</span> {label}
          </h2>
        </Reveal>
        <Reveal delayMs={80}>{children}</Reveal>
      </div>
    </section>
  );
}
