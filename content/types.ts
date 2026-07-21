/**
 * Typed content model for the portfolio.
 *
 * Every interface is immutable-friendly (`readonly` fields, `readonly` arrays)
 * so `content/profile.ts` can be treated as a single frozen source of truth and
 * components never mutate site copy. All copy lives in `profile.ts`; components
 * import these shapes, never hard-coded strings.
 */

/** A labeled hyperlink — the canonical `{ label, href }` shape used everywhere. */
export interface Link {
  readonly label: string;
  readonly href: string;
}

/** Known social/contact platforms, used by the UI to pick the right icon. */
export type SocialPlatform =
  | "github"
  | "linkedin"
  | "leetcode"
  | "kaggle"
  | "email";

/** A social or contact link, tagged with its platform for icon rendering. */
export interface SocialLink extends Link {
  readonly platform: SocialPlatform;
}

/** A titled cluster of skills, rendered as one cell of the skills grid. */
export interface SkillGroup {
  /** Group heading, e.g. "Languages" or "ML / DL". */
  readonly name: string;
  /** Individual skills within the group. */
  readonly skills: readonly string[];
}

/**
 * One focused body of work inside a {@link Role}. Rendered as a sub-card so a
 * single job can surface several distinct efforts, each with its own metrics.
 */
export interface Workstream {
  /** Short workstream name, e.g. "Battery Prognostics". */
  readonly name: string;
  /** Optional one-line descriptor shown under the name. */
  readonly summary?: string;
  /** Optional one-line headline metric, rendered bold under the workstream title. */
  readonly result?: string;
  /** Metric-bearing accomplishment bullets. */
  readonly bullets: readonly string[];
}

/** A position held, composed of one or more {@link Workstream}s. */
export interface Role {
  /** Employer / organization. */
  readonly company: string;
  /** Position title. */
  readonly title: string;
  /** Optional location, e.g. "Bangalore, India". */
  readonly location?: string;
  /** Human-readable tenure, e.g. "Feb 2025 – Present". */
  readonly period: string;
  /** The distinct efforts owned in this role. */
  readonly workstreams: readonly Workstream[];
}

/** A showcased project card. */
export interface Project {
  /** Project name. */
  readonly name: string;
  /** One-line tagline / blurb. */
  readonly blurb: string;
  /** Highlight bullets (typically 3–4). */
  readonly bullets: readonly string[];
  /**
   * Additional detail shown behind a disclosure ("more detail"). Omit the field
   * entirely for projects with nothing further to add.
   */
  readonly moreBullets?: readonly string[];
  /** Tech-stack tags rendered as mono chips. */
  readonly stack: readonly string[];
  /** Optional pill, e.g. "LIVE" or "Intel GenAI Hackathon". */
  readonly badge?: string;
  /** Optional link to the deployed project. */
  readonly live?: Link;
  /** Optional link to the source repository. */
  readonly repo?: Link;
}

/** A completed certification / course. */
export interface Certificate {
  /** Certificate name. */
  readonly name: string;
  /** Issuing organization. */
  readonly issuer: string;
  /** Year awarded. */
  readonly year: number;
}

/** An education entry. Only `institution` is required; the rest are optional. */
export interface Education {
  /** School / university name. */
  readonly institution: string;
  /** Optional degree or program. */
  readonly degree?: string;
  /** Optional detail line, e.g. "CGPA 8.96". */
  readonly detail?: string;
  /** Optional tenure, e.g. "Sept 2022 – July 2026". */
  readonly period?: string;
  /**
   * Marks a program not yet started (an incoming enrollment). Excluded from
   * schema.org `alumniOf` since the person is not yet an alumnus of it.
   */
  readonly status?: "incoming";
}

/** A club/society membership. */
export interface Society {
  /** Society name. */
  readonly name: string;
  /** Optional role or focus, e.g. "Operations Lead". */
  readonly role?: string;
}

/**
 * One point on the career/education timeline, rendered as one row of the
 * journey section's vertical timeline.
 */
export interface TimelineEntry {
  /** Human-readable date, e.g. "Sept 2026" or "Sep–Oct 2024". */
  readonly date: string;
  /** The headline event. */
  readonly title: string;
  /** Optional supporting detail, shown beneath the title. */
  readonly detail?: string;
  /** Category; `next` marks the upcoming entry for restrained emphasis. */
  readonly kind: "education" | "work" | "cert" | "award" | "next";
}

/** A hero focus-area card — a titled area of work with a one-line blurb. */
export interface FocusArea {
  /** Focus-area heading, e.g. "ML Systems & MLOps". */
  readonly title: string;
  /** One-line description of the work in this area. */
  readonly blurb: string;
}

/** The complete, typed content model for the site. Populated in `profile.ts`. */
export interface Profile {
  /** Full name. */
  readonly name: string;
  /** Current headline position, e.g. "AI Research Associate @ Stryker". */
  readonly role: string;
  /** City / country. */
  readonly location: string;
  /** Primary contact email (bare address, no `mailto:`). */
  readonly email: string;
  /** Hero tagline. */
  readonly tagline: string;
  /** One-line current status, shown as a status line in the hero. */
  readonly status: string;
  /** Hero intro paragraph — a longer narrative shown below the tagline. */
  readonly intro: string;
  /** Hero highlight chips — short credential badges. */
  readonly highlights: readonly string[];
  /** Hero focus areas, rendered as a small grid of cards. */
  readonly focusAreas: readonly FocusArea[];
  /** About section — one entry per paragraph. */
  readonly about: readonly string[];
  /** Social + contact links, in display order. */
  readonly socials: readonly SocialLink[];
  /** Grouped skills for the skills grid. */
  readonly skills: readonly SkillGroup[];
  /** Work history. */
  readonly experience: readonly Role[];
  /** Showcased projects, in display order. */
  readonly projects: readonly Project[];
  /** Certifications. */
  readonly certificates: readonly Certificate[];
  /** Education history. */
  readonly education: readonly Education[];
  /** Club / society memberships. */
  readonly societies: readonly Society[];
  /** Career/education timeline, newest first, for the journey section. */
  readonly timeline: readonly TimelineEntry[];
  /** Path to the downloadable resume PDF. */
  readonly resumeUrl: string;
}
