"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** Fraction of the element that must be visible to trigger. */
  readonly threshold?: number;
  /** Observer root margin; a negative bottom holds the reveal until the
   *  element is comfortably inside the viewport rather than grazing its edge. */
  readonly rootMargin?: string;
};

/**
 * - `"idle"`     — natural, fully visible (SSR, no-JS, reduced-motion, or the
 *                  element was already on screen when JS mounted).
 * - `"pending"`  — JS confirmed the element is off-screen; it may now be held
 *                  in its pre-reveal (hidden) state.
 * - `"revealed"` — the element has scrolled into view; play the entrance.
 */
export type RevealPhase = "idle" | "pending" | "revealed";

type UseInViewResult<T extends HTMLElement> = {
  /** Attach to the element whose entrance should be observed. */
  readonly ref: React.RefObject<T | null>;
  /** Current reveal phase (latches at `"revealed"`, one-shot). */
  readonly phase: RevealPhase;
};

/**
 * Evenly spaced observer thresholds from 0 up to `threshold` (inclusive).
 *
 * IntersectionObserver only fires when a *listed* ratio is crossed, and a very
 * tall element (think a full section at 200–400% zoom) may max out below
 * `threshold` — observed with just `[0, threshold]` it would get callbacks
 * only as its edges graze the root (intersection height ≈ 0 both times), so
 * the fill-half-the-root reveal below would never even be evaluated. The
 * dense ramp keeps callbacks coming as the element scrolls through the root.
 */
function thresholdRamp(threshold: number): number[] {
  const steps = 15;
  return Array.from({ length: steps + 1 }, (_, i) => (i * threshold) / steps);
}

/**
 * Progressive-enhancement scroll-reveal primitive.
 *
 * The element renders in its natural, fully-visible state on the server and on
 * the first client paint — there is never an `opacity-0` in the SSR HTML, so
 * content is intact with JS disabled. After mount (motion permitting), an
 * IntersectionObserver's guaranteed initial callback decides what happens: an
 * element at least partially inside the real viewport stays `"idle"` forever
 * (no hiding, no flash, no movement), while an element entirely below the
 * viewport is parked at `"pending"` and flipped to `"revealed"` when it first
 * scrolls into view — at `threshold` visibility, or once it fills half the
 * root, whichever comes first (elements much taller than the viewport can
 * never reach the ratio).
 *
 * State updates only ever happen inside the observer callback, and when the
 * user prefers reduced motion — or the browser lacks IntersectionObserver —
 * no observer is created at all, leaving the content still and visible.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<RevealPhase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // No animation for reduced-motion users or browsers without IO support:
    // leave the element exactly as server-rendered (visible, unmoved).
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    let sawInitialEntry = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!sawInitialEntry) {
            // The spec guarantees one initial callback per observed target.
            // Decide against the REAL viewport, not the rootMargin-shrunken
            // root: with the -10% bottom margin, content already visible in
            // the bottom tenth of the screen reports "not intersecting" here,
            // and parking it would blank visible content on hydration. Only
            // an element entirely below the viewport may be hidden unseen.
            sawInitialEntry = true;
            if (entry.boundingClientRect.top >= window.innerHeight) {
              // Fully below the fold: safe to park in the pre-reveal state.
              setPhase("pending");
            } else {
              // At least partially on screen at mount — never hide or
              // animate it.
              observer.disconnect();
            }
            continue;
          }
          // Reveal at `threshold` visibility — or, for elements too tall to
          // ever reach that ratio (a section body >1/threshold× the root),
          // once they fill half the (possibly zoom-shrunken) root. And if a
          // fast scroll skipped the element entirely between observer samples
          // (the coalesced entry reports it already above the root), reveal
          // rather than leave passed-by content invisible.
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
          const rootTop = entry.rootBounds?.top ?? 0;
          if (
            entry.intersectionRatio >= threshold ||
            entry.intersectionRect.height >= 0.5 * rootHeight ||
            entry.boundingClientRect.bottom <= rootTop
          ) {
            setPhase("revealed");
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: thresholdRamp(threshold), rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, phase };
}
