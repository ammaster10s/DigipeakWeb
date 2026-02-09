"use client";

import Image from "next/image";
import { useState } from "react";

interface DroneImage {
  src: string;
  alt: string;
  label: string;
}

interface DroneImageGalleryProps {
  images: DroneImage[];
}

export function DroneImageGallery({ images }: DroneImageGalleryProps) {
  const [active, setActive] = useState<DroneImage | null>(null);

  return (
    <div className="grid gap-4">
      {images.map((image) => (
        <button
          key={image.src}
          type="button"
          onClick={() => setActive(image)}
          className="grid-border border border-zinc-900 bg-black/80 p-4 text-left transition hover:border-red-900/70"
        >
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            {image.label}
          </p>
          <div className="relative aspect-[16/9] w-full bg-black">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </button>
      ))}

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden border border-zinc-800 bg-black/90"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-red-400"
            >
              Close
            </button>
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
