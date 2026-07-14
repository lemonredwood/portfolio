"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * `useLayoutEffect` runs before the browser paints, which lets us reset the
 * text to empty *before* the first client frame — no flash of the full string
 * before the animation replays. It warns when run during SSR, so on the server
 * we fall back to `useEffect` (which never fires there anyway).
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type UseTypingOptions = {
  /** Delay between characters, in milliseconds. */
  readonly speedMs?: number;
};

type UseTypingResult = {
  /** The portion of `text` that should currently be visible. */
  readonly output: string;
  /** True once the full string is shown (drives the blinking cursor). */
  readonly done: boolean;
};

/**
 * Progressive-enhancement typing effect.
 *
 * The hook is seeded with the *complete* string so the server-rendered HTML and
 * the first client render both contain the full text (SEO + no-JS + zero
 * hydration mismatch). After hydration it rewinds to empty and types the string
 * back out. When the user prefers reduced motion, no animation runs and the
 * full text stays put.
 */
export function useTyping(
  text: string,
  { speedMs = 22 }: UseTypingOptions = {},
): UseTypingResult {
  const [count, setCount] = useState(text.length);
  const [done, setDone] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCount(text.length);
      setDone(true);
      return;
    }

    setCount(0);
    setDone(false);

    let shown = 0;
    const timer = window.setInterval(() => {
      shown += 1;
      setCount(shown);
      if (shown >= text.length) {
        window.clearInterval(timer);
        setDone(true);
      }
    }, speedMs);

    return () => window.clearInterval(timer);
  }, [text, speedMs]);

  return { output: text.slice(0, count), done };
}
