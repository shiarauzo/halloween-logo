export function makeSampleLogo(): HTMLCanvasElement {
  const size = 720;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No pude preparar el ejemplo.");

  ctx.strokeStyle = "#1c1917";
  ctx.lineWidth = 28;
  ctx.beginPath();
  ctx.roundRect(36, 36, size - 72, size - 72, 72);
  ctx.stroke();

  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.arc(size / 2, 280, 92, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "500 96px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("norte", size / 2, 500);
  return canvas;
}
