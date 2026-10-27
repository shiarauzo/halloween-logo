export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const ALPHA_MIN = 16;
const WHITE_MIN = 246;

function isNearWhite(data: Uint8ClampedArray, index: number): boolean {
  return (
    data[index] > WHITE_MIN &&
    data[index + 1] > WHITE_MIN &&
    data[index + 2] > WHITE_MIN
  );
}

export function contentBounds(
  data: Uint8ClampedArray,
  width: number,
  height: number,
): Bounds {
  let transparent = false;

  for (let index = 3; index < data.length; index += 4) {
    if (data[index] < 250) {
      transparent = true;
      break;
    }
  }

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const alpha = data[index + 3];
      if (alpha <= ALPHA_MIN) continue;
      if (!transparent && isNearWhite(data, index)) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return { x: 0, y: 0, width, height };
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}
