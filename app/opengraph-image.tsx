import { ImageResponse } from "next/og";
import { HEADLINE, SITE_NAME } from "@/lib/copy";

export const alt = "Gorro. Tu logo para el 31";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ee",
          color: "#1c1917",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 32 }}>{SITE_NAME}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05 }}>{HEADLINE}</div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#78716c" }}>
            31 de octubre
          </div>
        </div>
      </div>
    ),
    size,
  );
}
