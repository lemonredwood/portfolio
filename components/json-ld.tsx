import { profile } from "@/content/profile";
import { siteUrl } from "@/app/site-url";

/**
 * `Person` structured data (schema.org / JSON-LD), built entirely from the
 * content model. Rendered as a `<script type="application/ld+json">` so search
 * engines can attach the name, role, contact, social profiles and education to
 * a single entity.
 */
export default function JsonLd() {
  // Job title + employer come from the structured experience model (first
  // entry = current role), not from parsing the display string in
  // `profile.role`.
  const currentRole = profile.experience[0];

  // `sameAs` = the four public web profiles (everything but the mailto: link).
  const sameAs = profile.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href);

  // Alma maters = every education entry with a completed degree program
  // (schooling entries without a degree aren't useful as `alumniOf` nodes, and
  // not-yet-started programs marked `status: "incoming"` are excluded because
  // the person isn't an alumnus of them yet).
  const almaMaters = profile.education.filter(
    (entry) => entry.degree && entry.status !== "incoming",
  );

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl.href,
    jobTitle: currentRole.title,
    worksFor: {
      "@type": "Organization",
      name: currentRole.company,
    },
    email: `mailto:${profile.email}`,
    sameAs,
    ...(almaMaters.length > 0
      ? {
          alumniOf: almaMaters.map((entry) => ({
            "@type": "CollegeOrUniversity",
            name: entry.institution,
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // The payload is derived from static, trusted site content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
    />
  );
}
