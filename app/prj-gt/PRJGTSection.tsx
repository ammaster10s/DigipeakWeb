"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/app/visual/ScrambleText";

export function PRJGTSection() {
  return (
    <motion.section
      id="prj-gt"
      className="grid gap-8 md:grid-cols-[1.3fr_minmax(0,1fr)]"
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

      {/* Right: Surveillance / radar visual */}
      <div className="relative flex min-h-[320px] flex-col gap-3 text-sm md:text-base">
        <div className="radar-background grid-border relative flex-1 border border-zinc-900">
          <div className="radar-sweep" />

          {/* Radar rings */}
          <div className="pointer-events-none absolute inset-4 flex items-center justify-center">
            <div className="h-full w-full border border-zinc-800/80">
              <div className="flex h-full w-full items-center justify-center border border-zinc-900/80">
                <div className="h-1/2 w-1/2 border border-zinc-900/80" />
              </div>
            </div>
          </div>

          {/* Drone silhouette */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-1 opacity-90">
              <div className="h-8 w-16 border border-zinc-800 bg-zinc-900/40" />
              <div className="h-10 w-24 border border-zinc-700 bg-zinc-900/60" />
              <div className="h-8 w-16 border border-zinc-800 bg-zinc-900/40" />
              <div className="h-6 w-20 border border-zinc-800 bg-zinc-900/50" />
              <div className="h-8 w-24 border border-zinc-700 bg-zinc-900/70" />
              <div className="h-6 w-20 border border-zinc-800 bg-zinc-900/50" />
            </div>
          </div>

          {/* Telemetry overlay */}
          <div className="pointer-events-none absolute inset-3 flex flex-col justify-between font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-zinc-200">
            <div className="flex justify-between">
              <span>ALT: 0042.3M</span>
              <span>&nbsp;</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>SIGNAL: -58DBM</span>
              <span className="text-red-600">TARGET LOCK: ACQUIRED</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs md:text-sm text-zinc-300">
          <div className="grid-border border border-zinc-900 bg-black/80 p-2 font-mono uppercase tracking-[0.14em]">
            <div className="flex items-center justify-between">
              <span>RADAR_SWEEP</span>
              <span className="text-red-600">ACTIVE</span>
            </div>
          </div>
          <div className="grid-border border border-zinc-900 bg-black/80 p-2 font-mono uppercase tracking-[0.14em]">
            <div className="flex items-center justify-between">
              <span>LINK_STATUS</span>
              <span className="text-zinc-300">ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

