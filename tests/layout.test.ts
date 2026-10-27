import { describe, expect, test } from "bun:test";
import { ACCESSORIES } from "../lib/accessories";
import { contentBounds } from "../lib/bounds";
import { layout } from "../lib/layout";

function pixel(width: number, height: number): Uint8ClampedArray {
  return new Uint8ClampedArray(width * height * 4);
}

function fill(
  data: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
  channels: [number, number, number, number],
) {
  const index = (y * width + x) * 4;
  data[index] = channels[0];
  data[index + 1] = channels[1];
  data[index + 2] = channels[2];
  data[index + 3] = channels[3];
}

describe("contentBounds", () => {
  test("keeps a white mark on a transparent canvas", () => {
    const data = pixel(6, 6);
    fill(data, 6, 2, 3, [255, 255, 255, 255]);
    expect(contentBounds(data, 6, 6)).toEqual({ x: 2, y: 3, width: 1, height: 1 });
  });

  test("trims a white margin from an opaque photo", () => {
    const data = pixel(5, 4);
    data.fill(255);
    fill(data, 5, 2, 1, [0, 0, 0, 255]);
    expect(contentBounds(data, 5, 4)).toEqual({ x: 2, y: 1, width: 1, height: 1 });
  });
});

describe("layout", () => {
  test("keeps every accessory inside the canvas", () => {
    for (const accessory of ACCESSORIES) {
      const placed = layout(420, 280, accessory);
      for (const rect of [placed.logo, placed.decor]) {
        expect(rect.x).toBeGreaterThanOrEqual(0);
        expect(rect.y).toBeGreaterThanOrEqual(0);
        expect(rect.x + rect.w).toBeLessThanOrEqual(placed.width + 1);
        expect(rect.y + rect.h).toBeLessThanOrEqual(placed.height + 1);
      }
    }
  });

  test("sits the witch hat on top of the logo", () => {
    const placed = layout(400, 400, "witch");
    expect(placed.decor.y).toBeLessThan(placed.logo.y);
    expect(placed.decor.y + placed.decor.h).toBeGreaterThan(placed.logo.y);
  });

  test("places the clay pot beside the logo", () => {
    const placed = layout(360, 300, "olla");
    expect(placed.decor.x).toBeGreaterThanOrEqual(placed.logo.x + placed.logo.w);
    expect(Math.abs(placed.decor.y + placed.decor.h - (placed.logo.y + placed.logo.h))).toBeLessThanOrEqual(1);
  });
});
