"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "../visual/ScrambleText";

export function PRJGTSection() {
  return (
    <motion.section
      id="prj-gt"
      className="grid gap-8"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      {/* Left: Mission copy + signal analysis */}
      <div className="flex flex-col gap-6 text-sm md:text-base">
        <div className="space-y-2">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
            [PRJ-GT] // GHOST TRACKER
          </p>
          <ScrambleText
            text="MISSION CONTROL // OBSTACLE AVOIDANCE"
            className="font-mono text-sm md:text-base uppercase tracking-[0.26em] text-zinc-200"
          />
        </div>

        <div className="grid-border border border-zinc-900 bg-black/70 p-4">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">
            <span>OBSTACLE AVOIDANCE LOGIC // ACTIVE</span>
            <span className="text-zinc-500">PID_TUNING_MODE: LOCKED</span>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-zinc-200 md:grid-cols-2">
          <div className="grid-border border border-zinc-900 bg-black/70 p-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              SENSOR STACK
            </p>
            <p className="mt-1">
              Stereo depth cameras, mmWave radar, and inertial fusion are
              synchronized at sub-millisecond latency for threat prediction.
            </p>
          </div>
          <div className="grid-border border border-zinc-900 bg-black/70 p-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              GHOST CORRIDORS
            </p>
            <p className="mt-1">
              Dynamic flight corridors are carved in real time, guaranteeing
              hard-constraint avoidance even in dense industrial clutter.
            </p>
          </div>
        </div>
      </div>

    </motion.section>
  );
}

