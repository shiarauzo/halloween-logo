import type { Accessory } from "@/lib/accessories";
import { contentBounds } from "@/lib/bounds";
import { DECORATIONS } from "@/lib/decorations";
import { layout } from "@/lib/layout";

const SOURCE_CAP = 1400;
const OUTPUT_LONG_EDGE = 900;

function canvasContext(
  width: number,
  height: number,
  read: boolean,
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", read ? { willReadFrequently: true } : undefined);
  if (!ctx) throw new Error("No pude preparar el lienzo.");
  return { canvas, ctx };
}

function loadSvg(svg: string): Promise<{ image: HTMLImageElement; url: string }> {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.onload = () => resolve({ image, url });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No pude dibujar el accesorio."));
    };
    image.src = url;
  });
}

export async function compose(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  accessory: Accessory,
): Promise<HTMLCanvasElement> {
  const ratio = Math.min(1, SOURCE_CAP / Math.max(sourceWidth, sourceHeight));
  const sw = Math.max(1, Math.round(sourceWidth * ratio));
  const sh = Math.max(1, Math.round(sourceHeight * ratio));
  const analysis = canvasContext(sw, sh, true);
  analysis.ctx.drawImage(source, 0, 0, sw, sh);
  const pixels = analysis.ctx.getImageData(0, 0, sw, sh);
  const bounds = contentBounds(pixels.data, sw, sh);
  const longEdge = Math.max(bounds.width, bounds.height);
  const scale = OUTPUT_LONG_EDGE / longEdge;
  const logoW = Math.max(1, Math.round(bounds.width * scale));
  const logoH = Math.max(1, Math.round(bounds.height * scale));
  const placed = layout(logoW, logoH, accessory);
  const output = canvasContext(placed.width, placed.height, false);
  output.ctx.imageSmoothingEnabled = true;
  output.ctx.imageSmoothingQuality = "high";
  output.ctx.drawImage(
    analysis.canvas,
    bounds.x,
    bounds.y,
    bounds.width,
    bounds.height,
    placed.logo.x,
    placed.logo.y,
    placed.logo.w,
    placed.logo.h,
  );

  const decoration = await loadSvg(DECORATIONS[accessory].svg);
  try {
    output.ctx.drawImage(
      decoration.image,
      placed.decor.x,
      placed.decor.y,
      placed.decor.w,
      placed.decor.h,
    );
  } finally {
    URL.revokeObjectURL(decoration.url);
  }

  return output.canvas;
}

export function readLogo(file: File): Promise<HTMLImageElement> {
  const name = file.name.toLowerCase();
  const isImage = file.type.startsWith("image/") || name.endsWith(".svg");
  if (!isImage) {
    return Promise.reject(new Error("Sube un PNG, JPG, WEBP o SVG."));
  }
  if (file.size > 8 * 1024 * 1024) {
    return Promise.reject(new Error("El archivo pasa de 8 MB."));
  }

  const url = URL.createObjectURL(file);
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.onload = () => {
      URL.revokeObjectURL(url);
      if (!image.naturalWidth || !image.naturalHeight) {
        reject(new Error("No pude leer esa imagen."));
        return;
      }
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No pude leer esa imagen."));
    };
    image.src = url;
  });
}
