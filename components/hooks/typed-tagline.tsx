"use client";

import { useTyping } from "./use-typing";

/**
 * The block cursor blinks purely via CSS, gated behind
 * `prefers-reduced-motion: no-preference`, so it also animates for no-JS
 * visitors and stays perfectly steady for reduced-motion ones. React 19 hoists
 * and de-duplicates this `<style>` by its `href`.
 */
const CURSOR_STYLES = `
@keyframes hero-cursor-blink { 0%, 49.99% { opacity: 1 } 50%, 100% { opacity: 0 } }
@media (prefers-reduced-motion: no-preference) {
  .hero-cursor--blink { animation: hero-cursor-blink 1.05s infinite; }
}
`;

/**
 * The block cursor. Glyph + layout (the `ml-0.5 inline-block` spacing) live
 * here exactly once, shared by the layout ghost and the animated overlay;
 * callers add only color/animation via `className`.
 */
function Cursor({ className }: { className?: string }) {
  return (
    <span className={`ml-0.5 inline-block ${className ?? ""}`.trimEnd()}>
      {"▊"}
    </span>
  );
}

/** The single interactive slice of the hero: the tagline that types itself. */
export default function TypedTagline({ text }: { text: string }) {
  const { output, done } = useTyping(text);

  return (
    <span className="relative block">
      <style href="hero-cursor-blink" precedence="default">
        {CURSOR_STYLES}
      </style>

      {/* Full, stable tagline for assistive tech + crawlers. The animated copy
          beside it is decorative and hidden from the accessibility tree. */}
      <span className="sr-only">{text}</span>

      {/* Layout ghost: the complete tagline + cursor, kept in normal flow but
          made invisible. It reserves the exact final box (same wrapping context
          as the overlay), so the element's size never changes as characters are
          typed — this is what removes the hero's cumulative layout shift. */}
      <span aria-hidden="true" className="invisible">
        {text}
        <Cursor />
      </span>

      {/* Animated copy, layered exactly over the ghost and taken out of flow so
          it can't resize the box. Pre-hydration `output` is the full string, so
          the SSR / no-JS first paint shows the whole tagline right here. */}
      <span aria-hidden="true" className="absolute inset-0">
        {output}
        <Cursor className={`text-accent ${done ? "hero-cursor--blink" : ""}`.trimEnd()} />
      </span>
    </span>
  );
}
