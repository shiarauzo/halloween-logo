"use client";

import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  accessoryLabel,
  isAccessory,
  MODES,
  type Accessory,
} from "@/lib/accessories";
import { compose, readLogo } from "@/lib/compose";
import { cn } from "cn";

const PRESSED =
  "h-10 px-3 data-[state=on]:bg-foreground data-[state=on]:text-background aria-pressed:bg-foreground aria-pressed:text-background";

const STYLES = MODES.halloween.accessories;

type Preview = {
  url: string;
  width: number;
  height: number;
  label: string;
};

export function Studio() {
  const [accessory, setAccessory] = useState<Accessory>("witch");
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [converting, setConverting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const sourceUrlRef = useRef<string | null>(null);
  const requestRef = useRef(0);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
    };
  }, []);

  function clearPreview() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    setPreview(null);
  }

  async function acceptFile(file: File | null) {
    if (!file) return;
    try {
      const image = await readLogo(file);
      const url = URL.createObjectURL(file);
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current);
      sourceUrlRef.current = url;
      setLogo(image);
      setSourceUrl(url);
      clearPreview();
      setError(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Could not read that image.");
    }
  }

  function selectAccessory(next: string[]) {
    const value = next.at(-1);
    if (!value || !isAccessory(value)) return;
    setAccessory(value);
  }

  async function convert() {
    if (!logo) {
      setError("Upload a logo first.");
      return;
    }
    const request = requestRef.current + 1;
    requestRef.current = request;
    setConverting(true);
    setError(null);
    try {
      const canvas = await compose(logo, logo.naturalWidth, logo.naturalHeight, accessory);
      const url = await new Promise<string>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Could not export the logo."));
            return;
          }
          resolve(URL.createObjectURL(blob));
        }, "image/png");
      });
      if (request !== requestRef.current) {
        URL.revokeObjectURL(url);
        return;
      }
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      previewRef.current = url;
      setPreview({
        url,
        width: canvas.width,
        height: canvas.height,
        label: accessoryLabel(accessory),
      });
    } catch (reason: unknown) {
      if (request !== requestRef.current) return;
      setError(reason instanceof Error ? reason.message : "Could not build the logo.");
    } finally {
      if (request === requestRef.current) setConverting(false);
    }
  }

  const uploadCaption = dragging
    ? "Drop your logo"
    : logo
      ? "PNG, JPG, WEBP, or SVG."
      : "Drop your logo, or choose a file.";

  return (
    <div id="studio" className="mt-10 grid items-start gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <label
          className={cn(
            "surface flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl p-6",
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
          {logo && sourceUrl ? (
            // The upload is a local file, so next/image cannot take this URL.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sourceUrl}
              width={logo.naturalWidth}
              height={logo.naturalHeight}
              alt="Your logo"
              className="max-h-40 w-auto max-w-full outline -outline-offset-1 outline-black/10"
            />
          ) : (
            <span className="text-sm text-pretty text-muted-foreground">
              {uploadCaption}
            </span>
          )}
          <span className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-3.5")}>
            {logo ? "Change logo" : "Upload your logo"}
          </span>
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
        {logo ? (
          <p className="text-sm text-pretty text-muted-foreground">{uploadCaption}</p>
        ) : null}

        <ToggleGroup
          aria-label="Style"
          value={[accessory]}
          onValueChange={selectAccessory}
          spacing={2}
          variant="outline"
          className="flex flex-wrap"
        >
          {STYLES.map((style) => (
            <ToggleGroupItem key={style.id} value={style.id} className={PRESSED}>
              {style.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Button
          type="button"
          size="lg"
          className="h-10 w-fit px-4"
          disabled={converting}
          onClick={() => void convert()}
        >
          {converting ? "Converting…" : "Convert"}
        </Button>
        {error ? (
          <p className="text-sm text-destructive" aria-live="polite">
            {error}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "surface flex min-h-80 flex-col items-center justify-center gap-5 rounded-xl p-6 sm:p-10",
          preview && "checker",
        )}
        aria-live="polite"
      >
        {converting ? (
          <p className="text-sm text-pretty text-muted-foreground">Converting…</p>
        ) : preview ? (
          <>
            {/* next/image rejects blob URLs, so the converted PNG stays a plain img. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.url}
              width={preview.width}
              height={preview.height}
              alt={`Your logo with a ${preview.label.toLowerCase()}`}
              className="max-h-80 w-auto max-w-full outline -outline-offset-1 outline-black/10"
            />
            <a
              href={preview.url}
              download="halloween-logo.png"
              className={cn(buttonVariants({ size: "lg" }), "h-10 w-fit px-4")}
            >
              Download
            </a>
          </>
        ) : (
          <p className="max-w-xs text-center text-sm text-pretty text-muted-foreground">
            Your result will show up here.
          </p>
        )}
      </div>
    </div>
  );
}
