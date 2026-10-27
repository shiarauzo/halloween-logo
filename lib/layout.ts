import type { Accessory } from "@/lib/accessories";

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Placement = {
  width: number;
  height: number;
  logo: Rect;
  decor: Rect;
};

const PAD = 48;

type AboveSpec = {
  anchor: "above";
  widthFraction: number;
  maxHeightTimes: number;
  aspect: number;
  overlap: number;
};

type SideSpec = {
  anchor: "side";
  heightFraction: number;
  aspect: number;
  gap: number;
};

type CornerSpec = {
  anchor: "corner";
  widthFraction: number;
  maxHeightTimes: number;
  aspect: number;
  overlapX: number;
  overlapY: number;
};

const SPECS: Record<Accessory, AboveSpec | SideSpec | CornerSpec> = {
  witch: {
    anchor: "above",
    widthFraction: 0.78,
    maxHeightTimes: 1.2,
    aspect: 200 / 240,
    overlap: 0.2,
  },
  pumpkin: {
    anchor: "above",
    widthFraction: 0.5,
    maxHeightTimes: 0.72,
    aspect: 170 / 180,
    overlap: 0.26,
  },
  broom: {
    anchor: "side",
    heightFraction: 1.12,
    aspect: 300 / 140,
    gap: 0.08,
  },
  bat: {
    anchor: "above",
    widthFraction: 0.92,
    maxHeightTimes: 0.7,
    aspect: 140 / 220,
    overlap: 0.18,
  },
  ghost: {
    anchor: "side",
    heightFraction: 1.05,
    aspect: 220 / 160,
    gap: 0.1,
  },
  olla: {
    anchor: "side",
    heightFraction: 0.84,
    aspect: 220 / 200,
    gap: 0.12,
  },
  guitar: {
    anchor: "side",
    heightFraction: 1.08,
    aspect: 280 / 120,
    gap: 0.1,
  },
  bow: {
    anchor: "corner",
    widthFraction: 0.62,
    maxHeightTimes: 1,
    aspect: 180 / 220,
    overlapX: 0.42,
    overlapY: 0.42,
  },
};

function roundRect(rect: Rect): Rect {
  const x = Math.round(rect.x);
  const y = Math.round(rect.y);
  return {
    x,
    y,
    w: Math.max(1, Math.round(rect.x + rect.w) - x),
    h: Math.max(1, Math.round(rect.y + rect.h) - y),
  };
}

function cappedWidth(
  logoW: number,
  logoH: number,
  widthFraction: number,
  maxHeightTimes: number,
  aspect: number,
): { w: number; h: number } {
  const w = Math.max(8, Math.min(logoW * widthFraction, logoH * maxHeightTimes));
  return { w, h: w * aspect };
}

export function layout(
  logoW: number,
  logoH: number,
  accessory: Accessory,
): Placement {
  const spec = SPECS[accessory];
  let logo: Rect;
  let decor: Rect;
  let groupW: number;
  let groupH: number;

  if (spec.anchor === "above") {
    const size = cappedWidth(
      logoW,
      logoH,
      spec.widthFraction,
      spec.maxHeightTimes,
      spec.aspect,
    );
    const overlap = size.h * spec.overlap;
    groupW = Math.max(logoW, size.w);
    groupH = size.h + logoH - overlap;
    logo = { x: (groupW - logoW) / 2, y: size.h - overlap, w: logoW, h: logoH };
    decor = { x: (groupW - size.w) / 2, y: 0, w: size.w, h: size.h };
  } else if (spec.anchor === "side") {
    const h = Math.max(8, logoH * spec.heightFraction);
    const w = h / spec.aspect;
    const gap = logoH * spec.gap;
    groupW = logoW + gap + w;
    groupH = Math.max(logoH, h);
    logo = { x: 0, y: groupH - logoH, w: logoW, h: logoH };
    decor = { x: logoW + gap, y: groupH - h, w, h };
  } else {
    const size = cappedWidth(
      logoW,
      logoH,
      spec.widthFraction,
      spec.maxHeightTimes,
      spec.aspect,
    );
    const overlapX = size.w * spec.overlapX;
    const overlapY = size.h * spec.overlapY;
    groupW = logoW + size.w - overlapX;
    groupH = logoH + size.h - overlapY;
    logo = { x: 0, y: size.h - overlapY, w: logoW, h: logoH };
    decor = { x: logoW - overlapX, y: 0, w: size.w, h: size.h };
  }

  const placedLogo = roundRect({
    x: logo.x + PAD,
    y: logo.y + PAD,
    w: logo.w,
    h: logo.h,
  });
  const placedDecor = roundRect({
    x: decor.x + PAD,
    y: decor.y + PAD,
    w: decor.w,
    h: decor.h,
  });

  return {
    width: Math.round(groupW + PAD * 2),
    height: Math.round(groupH + PAD * 2),
    logo: placedLogo,
    decor: placedDecor,
  };
}
