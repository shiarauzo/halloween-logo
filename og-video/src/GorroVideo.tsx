import { loadFont } from "@remotion/google-fonts/Newsreader";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

const { fontFamily } = loadFont("normal", {
  weights: ["500"],
  subsets: ["latin"],
});

function WitchHat() {
  return (
    <svg width="200" height="166" viewBox="0 0 240 200" aria-hidden="true">
      <ellipse cx="120" cy="168" rx="108" ry="22" fill="#1c1917" />
      <path
        fill="#1c1917"
        d="M122 34c10 22 16 52 20 78 6 32 20 50 48 56H54c26-6 40-24 46-56 4-26 10-56 22-78z"
      />
      <path
        fill="#1c1917"
        d="M118 36c28-16 58-4 54 16-16-4-34-2-48 8 0-10-2-18-6-24z"
      />
      <path
        fill="#c4551a"
        d="M78 122c22-14 62-14 84 0 6 10-10 20-42 20s-48-10-42-20z"
      />
    </svg>
  );
}

function ClayPot() {
  return (
    <svg width="210" height="230" viewBox="0 0 200 220" aria-hidden="true">
      <path
        d="M58 108c-24 2-34 24-24 40 8 12 22 8 28-4"
        fill="none"
        stroke="#a8643c"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d="M142 108c24 2 34 24 24 40-8 12-22 8-28-4"
        fill="none"
        stroke="#a8643c"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        fill="#c4784a"
        d="M46 112c-8 22-2 58 18 78 22 22 62 22 86 4 24-18 32-52 24-80-8-6-20-2-30 8-10 8-22 12-44 12s-34-4-44-12c-10-10-18-14-10-10z"
      />
      <path
        fill="#b86b42"
        d="M62 112c8 18 68 18 76 0l8-22c-12 14-80 14-92 0z"
      />
      <ellipse cx="100" cy="86" rx="50" ry="16" fill="#9a5636" />
      <ellipse cx="100" cy="84" rx="34" ry="10" fill="#5c3318" />
    </svg>
  );
}

export const GorroVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hatY = interpolate(frame, [8, 28], [-90, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const hatOpacity = interpolate(frame, [46, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const potX = interpolate(frame, [56, 80], [70, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const potOpacity = interpolate(frame, [56, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(frame, [96, 114], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#f6f3ee",
        color: "#1c1917",
        fontFamily,
      }}
    >
      <div style={{ position: "absolute", top: 64, left: 80, fontSize: 36 }}>
        Gorro
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 210,
          display: "flex",
          alignItems: "flex-end",
          opacity: logoOpacity,
        }}
      >
        <div style={{ position: "relative", width: 560, height: 340 }}>
          <div
            style={{
              position: "absolute",
              left: 170,
              top: 52 + hatY,
              opacity: hatOpacity,
            }}
          >
            <WitchHat />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              fontSize: 132,
              lineHeight: 1,
            }}
          >
            MARCA
          </div>
        </div>
        <div style={{ opacity: potOpacity, transform: `translateX(${potX}px)` }}>
          <ClayPot />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 64,
          fontSize: 42,
          opacity: captionOpacity,
        }}
      >
        Tu logo, de fiesta.
      </div>
    </AbsoluteFill>
  );
};
