"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills", compactHidden: true },
  { href: "#experience", label: "experience", compactHidden: true },
  { href: "#projects", label: "projects" },
  { href: "#journey", label: "journey", compactHidden: true },
  { href: "#contact", label: "contact" },
];

// Every section the spy watches (brand prompt links to #home).
const sectionIds = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "journey",
  "contact",
];

/**
 * Scroll-spy: highlights the nav link for the section currently crossing a thin
 * band near the top-third of the viewport. This is a pure enhancement — the
 * links are ordinary in-page anchors and work fully without JS (nothing is
 * highlighted until the observer runs).
 */
function useActiveSection(): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Activate a section as it passes through a band ~40–55% down the viewport.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Nav() {
  const active = useActiveSection();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#home"
          className="whitespace-nowrap font-mono text-[13px] text-foreground transition-colors hover:text-accent sm:text-sm"
        >
          rohith@portfolio:~$
        </a>
        <ul className="flex items-center gap-3 font-mono text-xs sm:gap-6 sm:text-sm">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li
                key={link.href}
                className={link.compactHidden ? "hidden sm:list-item" : undefined}
              >
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`whitespace-nowrap transition-colors hover:text-accent ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
