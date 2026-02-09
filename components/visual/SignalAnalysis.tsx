"use client";

import { useEffect, useRef, useState } from "react";

export function SignalAnalysis() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [amplitude, setAmplitude] = useState(12);
  const [frequency, setFrequency] = useState(1.4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let phase = 0;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = "rgba(26,26,26,0.9)";
      ctx.lineWidth = 0.5;
      const gridSize = 18;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }

      // Sine wave
      ctx.beginPath();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "#FF0000";

      const centerY = height / 2;
      const amp = amplitude;
      const freq = frequency;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * Math.PI * 2 * freq;
        const y = centerY + Math.sin(t + phase) * amp;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      phase += 0.06;
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [amplitude, frequency]);

  useEffect(() => {
    const handleScroll = () => {
      const maxFreq = 2.2;
      const minFreq = 0.9;
      const scrollY =
        typeof window !== "undefined" ? window.scrollY || 0 : 0;
      const normalized = Math.min(1, scrollY / 600);
      setFrequency(minFreq + (maxFreq - minFreq) * normalized);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative h-40 w-full cursor-crosshair border border-zinc-900 bg-black/80"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const y = e.clientY - rect.top;
        const normalized = 1 - y / rect.height;
        const amp = 6 + normalized * 18;
        setAmplitude(amp);
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        width={640}
        height={160}
      />
      <div className="pointer-events-none absolute inset-0 flex items-start justify-between p-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
        <span>WAVEFORM: SIN / LOCKED</span>
        <span>INPUT: SCROLL / CURSOR</span>
      </div>
    </div>
  );
}

