import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo";
import { DATE_LABEL, HEADLINE, SITE_NAME, TITLE } from "@/lib/copy";

export const alt = TITLE;
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
        <div style={{ display: "flex", alignItems: "center", fontSize: 32 }}>
          <LogoMark size={40} />
          <div style={{ display: "flex", marginLeft: 16 }}>{SITE_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05 }}>{HEADLINE}</div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#78716c" }}>
            {DATE_LABEL}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
