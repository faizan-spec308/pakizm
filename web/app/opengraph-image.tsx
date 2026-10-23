import { ImageResponse } from "next/og";

export const alt = "Pakizm — Orthopedic Surgical Instruments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9a9a93",
          }}
        >
          Orthopedic Instruments · Since 2005
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 700,
              letterSpacing: -4,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Pakizm
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#c9c9c2", marginTop: 20 }}>
            Precision surgical stainless-steel instruments.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#9a9a93",
          }}
        >
          <span>Worldwide export</span>
          <span>pakizm.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
