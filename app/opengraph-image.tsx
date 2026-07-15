import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Route metadata for the generated Open Graph card.
export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Theme tokens, mirrored from globals.css (Satori can't read CSS variables).
const BG = "#0a0e14";
const FOREGROUND = "#e6edf3";
const SECONDARY = "#b6c2cf";
const MUTED = "#8b949e";
const ACCENT = "#22d3ee";

/**
 * Clean, professional OG card, 1200x630, generated at build time: name very
 * large over a barely-there grid, a thin accent rule, role and location
 * beneath. Uses only the default embedded font and flexbox layouts, per the
 * `next/og` (Satori) constraints.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          backgroundColor: BG,
          backgroundImage:
            "linear-gradient(to right, rgba(31,39,51,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,39,51,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: FOREGROUND,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            marginTop: 34,
            backgroundColor: ACCENT,
          }}
        />

        <div
          style={{
            display: "flex",
            color: SECONDARY,
            fontSize: 34,
            lineHeight: 1.3,
            marginTop: 34,
            maxWidth: 980,
          }}
        >
          {profile.role}
        </div>

        <div
          style={{
            display: "flex",
            color: MUTED,
            fontSize: 26,
            marginTop: 18,
          }}
        >
          {profile.location}
        </div>
      </div>
    ),
    { ...size },
  );
}
