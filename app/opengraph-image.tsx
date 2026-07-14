import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Route metadata for the generated Open Graph card.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Theme tokens, mirrored from globals.css (Satori can't read CSS variables).
const BG = "#0a0e14";
const SURFACE = "#10151f";
const BORDER = "#1f2733";
const FOREGROUND = "#e6edf3";
const MUTED = "#8b949e";
const ACCENT = "#22d3ee";

/**
 * Dark terminal-window OG card, 1200×630, generated at build time. Uses only
 * the default embedded font (no remote fetch) and flexbox layouts, per the
 * `next/og` (Satori) constraints.
 */
export default function OpengraphImage() {
  const socials = profile.socials
    .filter((s) => s.platform !== "email")
    .map((s) => s.label.toLowerCase())
    .join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 56,
          backgroundColor: BG,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: 20,
            border: `1px solid ${BORDER}`,
            backgroundColor: SURFACE,
            overflow: "hidden",
          }}
        >
          {/* Title bar: traffic lights + prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "22px 30px",
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: 999,
                backgroundColor: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: 999,
                backgroundColor: "#febc2e",
              }}
            />
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: 999,
                backgroundColor: "#28c840",
              }}
            />
            <div style={{ display: "flex", marginLeft: 18, color: MUTED, fontSize: 24 }}>
              rohith@portfolio:~$ whoami
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              padding: "50px 60px",
            }}
          >
            <div style={{ display: "flex", fontSize: 27, marginBottom: 26 }}>
              <span style={{ color: ACCENT }}>rohith@portfolio</span>
              <span style={{ color: MUTED }}>:~$</span>
              <span style={{ color: FOREGROUND, marginLeft: 14 }}>whoami</span>
            </div>

            <div
              style={{
                display: "flex",
                color: FOREGROUND,
                fontSize: 82,
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
                color: MUTED,
                fontSize: 28,
                marginTop: 18,
              }}
            >
              {profile.role}  ·  {profile.location}
            </div>

            <div
              style={{
                display: "flex",
                color: FOREGROUND,
                fontSize: 30,
                lineHeight: 1.4,
                marginTop: 30,
                maxWidth: 920,
              }}
            >
              {profile.tagline}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 40,
                fontSize: 24,
              }}
            >
              {/* Cyan block "cursor" drawn as a div — reliable across fonts. */}
              <div style={{ display: "flex", width: 13, height: 27, backgroundColor: ACCENT }} />
              <span style={{ color: MUTED, marginLeft: 16 }}>{socials}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
