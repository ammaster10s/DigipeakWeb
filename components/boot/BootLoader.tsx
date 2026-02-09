"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface BootLoaderProps {
  onComplete: () => void;
}

// Static hex lines to keep SSR and client renders identical.
// Visual noise is preserved without runtime randomness.
const HEX_LINES = [
  "E5A7E67CF31888AC622D34E9",
  "A1671E5926375E65F66352CA",
  "9B3C7A12F4D8610E2C7B9F3D",
  "7FC2A9D1846B3E5F2A9C7D1E",
  "3D9F6A5C2E7B1A8D4C6F2B9E",
  "F1A3C79E5D2B8460C7E9A3F1",
  "2B7E5C9A1D4F8E6A3C9B7D2F",
  "C8F2A1D7E4B9630F1A7C9E3B",
  "6A3D9F2C7E1B5D8C4A9F2E7B",
  "D1F7A9C3E5B2846F0A3D7C9E",
  "4E9B2C7A1F5D8E3C6A9B2F7D",
  "B3E7C1A9D5F2846C0E3A7D9F",
];

export function BootLoader({ onComplete }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);

  const handleSkip = () => {
    onComplete();
  };

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 2200;

    const loop = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t; // linear, mechanical
      const value = Math.round(eased * 100);
      setProgress(value);

      if (t < 1) {
        frame = requestAnimationFrame(loop);
      } else {
        // small delay for glitch exit
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.45, ease: "linear" },
        }}
      >
        {/* Vertical split mask for subtle curtain effect */}
        <div className="pointer-events-none absolute inset-0 flex">
          <motion.div
            className="h-full w-1/2 bg-black"
            initial={{ x: 0 }}
            animate={{ x: "-10%" }}
            transition={{ duration: 0.8, ease: "linear" }}
          />
          <motion.div
            className="h-full w-1/2 bg-black"
            initial={{ x: 0 }}
            animate={{ x: "10%" }}
            transition={{ duration: 0.8, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 flex max-w-md flex-col items-center gap-6 px-6">
          <div className="grid-border w-full border border-zinc-900 bg-black/80 p-4">
            <div className="mb-3 text-center font-mono text-[11px] tracking-[0.25em] text-zinc-400">
              DIGIPEAK // SYSTEM BOOT
            </div>
            <div className="h-40 overflow-hidden bg-black/80">
              <motion.div
                className="flex flex-col gap-1 font-mono text-[10px] leading-tight text-zinc-500"
                animate={{ y: ["0%", "-25%"] }}
                transition={{
                  duration: 2.2,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {HEX_LINES.map((line, i) => (
                  <div key={i} className="flex justify-center gap-2">
                    <span className="text-red-600">0x</span>
                    <span>{line}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <span>SYSTEM_INITIALIZING...</span>
              <span className="text-red-600">[{progress}%]</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-zinc-900">
              <motion.div
                className="h-full bg-red-600 shadow-red-glow"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="mt-3 flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 hover:text-red-500"
            >
              <span>MANUAL OVERRIDE AVAILABLE</span>
              <span className="text-red-600 hover:text-red-400">
                CLICK TO SKIP BOOT
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

