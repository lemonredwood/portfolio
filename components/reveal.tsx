"use client";

import type { ReactNode } from "react";
import { useInView } from "./hooks/use-in-view";

type RevealProps = {
  children: ReactNode;
  /** Extra classes for the wrapper (layout, spacing, etc.). */
  className?: string;
  /** Stagger the reveal by this many milliseconds. */
  delayMs?: number;
};

/**
 * Tasteful, reduced-motion-safe scroll reveal.
 *
 * Renders its children in a plain block that is fully visible on the server,
 * with JS disabled, and for reduced-motion users. Once JS mounts, only
 * elements confirmed to be *off-screen* are parked at `opacity-0
 * translate-y-2` (applied without a transition, so nothing visibly
 * disappears); entering the viewport then fades and lifts them up — ≤8px
 * over 500ms. Content already on screen at mount is left completely alone.
 */
export default function Reveal({
  children,
  className = "",
  delayMs = 0,
}: RevealProps) {
  const { ref, phase } = useInView<HTMLDivElement>();

  const motion =
    phase === "pending"
      ? "translate-y-2 opacity-0"
      : phase === "revealed"
        ? "translate-y-0 opacity-100 transition duration-500 ease-out"
        : "";

  return (
    <div
      ref={ref}
      className={`${className} ${motion}`.trim()}
      style={
        delayMs && phase === "revealed"
          ? { transitionDelay: `${delayMs}ms` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
