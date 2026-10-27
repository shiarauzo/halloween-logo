"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PeruFlag, PumpkinMark } from "@/components/marks";
import {
  accessoryLabel,
  defaultAccessory,
  isAccessory,
  isMode,
  MODES,
  type Accessory,
  type Mode,
} from "@/lib/accessories";
import { compose, readLogo } from "@/lib/compose";
import { makeSampleLogo } from "@/lib/sample";
import { cn } from "cn";

const PRESSED =
  "h-10 px-3 data-[state=on]:bg-foreground data-[state=on]:text-background aria-pressed:bg-foreground aria-pressed:text-background";

export function Studio() {
  const [mode, setMode] = useState<Mode>("halloween");
  const [accessory, setAccessory] = useState<Accessory>("witch");
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sampleRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const source = logo ?? (sampleRef.current ??= makeSampleLogo());
    const width = logo ? logo.naturalWidth : source.width;
    const height = logo ? logo.naturalHeight : source.height;

    compose(source, width, height, accessory)
      .then(async (canvas) => {
        if (cancelled) return;
        const url = await new Promise<string>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("No pude exportar el logo."));
              return;
            }
            resolve(URL.createObjectURL(blob));
          }, "image/png");
        });
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        if (previewRef.current) URL.revokeObjectURL(previewRef.current);
        previewRef.current = url;
        canvasRef.current = canvas;
        setPreview(url);
        setReady(true);
        setError(null);
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        setReady(false);
        setError(reason instanceof Error ? reason.message : "No pude armar el logo.");
      });

    return () => {
      cancelled = true;
    };
  }, [accessory, logo]);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  async function acceptFile(file: File | null) {
    if (!file) return;
    try {
      const image = await readLogo(file);
      setLogo(image);
      setError(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "No pude leer esa imagen.");
    }
  }

  function selectMode(next: string[]) {
    const value = next.at(-1);
    if (!value || !isMode(value)) return;
    setMode(value);
    setAccessory(defaultAccessory(value));
  }

  function selectAccessory(next: string[]) {
    const value = next.at(-1);
    if (!value || !isAccessory(value)) return;
    setAccessory(value);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "gorro.png";
    link.click();
  }

  const options = MODES[mode].accessories;
  const caption = dragging
    ? "Suelta tu logo"
    : logo
      ? "PNG con fondo transparente."
      : "Ejemplo. Sube el logo de tu marca.";

  return (
    <div className="mt-10 flex flex-col gap-5">
      <ToggleGroup
        aria-label="Fiesta"
        value={[mode]}
        onValueChange={selectMode}
        spacing={0}
        variant="outline"
        className="border bg-card"
      >
        <ToggleGroupItem value="halloween" className={PRESSED}>
          <PumpkinMark />
          Calabaza
        </ToggleGroupItem>
        <ToggleGroupItem value="criollo" className={PRESSED}>
          <PeruFlag />
          Perú
        </ToggleGroupItem>
      </ToggleGroup>

      <div
        className={cn(
          "checker flex min-h-80 items-center justify-center rounded-xl border p-6 sm:p-10",
          dragging && "border-foreground",
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void acceptFile(event.dataTransfer.files.item(0));
        }}
      >
        {preview ? (
          // Blob preview of the composited logo. next/image cannot take this URL.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={
              logo
                ? `Tu logo con ${accessoryLabel(accessory).toLowerCase()}`
                : `Ejemplo con ${accessoryLabel(accessory).toLowerCase()}`
            }
            className="max-h-80 w-auto max-w-full"
          />
        ) : (
          <div className="size-40 rounded-md bg-muted" />
        )}
      </div>

      <ToggleGroup
        key={mode}
        aria-label="Accesorio"
        value={[accessory]}
        onValueChange={selectAccessory}
        spacing={2}
        variant="outline"
        className="flex flex-wrap"
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id} className={PRESSED}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex flex-wrap gap-2">
        <label className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 cursor-pointer px-3.5")}>
          {logo ? "Cambiar logo" : "Sube tu logo"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.item(0) ?? null;
              event.target.value = "";
              void acceptFile(file);
            }}
          />
        </label>
        <Button type="button" size="lg" className="h-10 px-3.5" disabled={!ready} onClick={download}>
          Descargar
        </Button>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <p className="text-sm text-pretty text-muted-foreground">{caption}</p>
    </div>
  );
}
