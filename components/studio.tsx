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
  const [preview, setPreview] = useState<{
    url: string;
    width: number;
    height: number;
  } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
              reject(new Error("Could not export the logo."));
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
        setPreview({ url, width: canvas.width, height: canvas.height });
        setError(null);
      })
      .catch((reason: unknown) => {
        if (cancelled) return;
        setError(reason instanceof Error ? reason.message : "Could not build the logo.");
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
      setError(reason instanceof Error ? reason.message : "Could not read that image.");
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

  const options = MODES[mode].accessories;
  const caption = dragging
    ? "Drop your logo"
    : logo
      ? "Transparent PNG."
      : "Sample. Upload your brand logo.";

  return (
    <div id="studio" className="mt-10 flex flex-col gap-5">
      <ToggleGroup
        aria-label="Look"
        value={[mode]}
        onValueChange={selectMode}
        spacing={0}
        variant="outline"
        className="border bg-card"
      >
        <ToggleGroupItem value="halloween" className={cn(PRESSED, "pl-2.5 pr-3")}>
          <PumpkinMark />
          {MODES.halloween.label}
        </ToggleGroupItem>
        <ToggleGroupItem value="criollo" className={cn(PRESSED, "pl-2.5 pr-3")}>
          <PeruFlag />
          {MODES.criollo.label}
        </ToggleGroupItem>
      </ToggleGroup>

      <div
        className={cn(
          "checker surface flex min-h-80 items-center justify-center rounded-xl p-6 sm:p-10",
          dragging && "surface-strong select-none",
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
          // next/image rejects blob URLs, so the composited PNG stays a plain img.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview.url}
            width={preview.width}
            height={preview.height}
            alt={
              logo
                ? `Your logo with a ${accessoryLabel(accessory).toLowerCase()}`
                : `Sample with a ${accessoryLabel(accessory).toLowerCase()}`
            }
            className="max-h-80 w-auto max-w-full outline -outline-offset-1 outline-black/10"
          />
        ) : (
          <div className="size-40 rounded-md bg-muted" />
        )}
      </div>

      {preview ? (
        <a
          href={preview.url}
          download="halloween-logo.png"
          className={cn(buttonVariants({ size: "lg" }), "h-10 w-fit px-4")}
        >
          Download
        </a>
      ) : (
        <Button type="button" size="lg" className="h-10 w-fit px-4" disabled>
          Download
        </Button>
      )}

      <ToggleGroup
        key={mode}
        aria-label="Accessory"
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
          {logo ? "Change logo" : "Upload your logo"}
          <input
            type="file"
            name="logo"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.item(0) ?? null;
              event.target.value = "";
              void acceptFile(file);
            }}
          />
        </label>
      </div>

      {error ? (
        <p className="text-sm text-destructive" aria-live="polite">
          {error}
        </p>
      ) : null}
      <p className="text-sm text-pretty text-muted-foreground">{caption}</p>
    </div>
  );
}
