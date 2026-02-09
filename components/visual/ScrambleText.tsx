"use client";

import { useEffect, useState } from "react";

const GLYPHS = "#$%&*+<>?/\\0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function ScrambleText({ text, className, speed = 0.8 }: ScrambleTextProps) {
  const [output, setOutput] = useState(text.replace(/./g, " "));

  useEffect(() => {
    let frameId: number;
    const chars = text.split("");
    const total = chars.length;
    let frame = 0;
    const clampedSpeed = Math.max(0.1, speed);

    const step = () => {
      const progress = Math.min(1, frame / (total + 8));
      const revealed = Math.floor(progress * total);

      const next = chars.map((ch, idx) => {
        if (idx < revealed || ch === " ") return ch;
        if (Math.random() < 0.5) {
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        return ch;
      });

      setOutput(next.join(""));
      frame += clampedSpeed;

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [text]);

  return <p className={className}>{output}</p>;
}

