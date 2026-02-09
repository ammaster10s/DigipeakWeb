"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "../../components/visual/ScrambleText";

export default function PRJCLPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          [PRJ-CL] // CODELIFT
        </p>
        <ScrambleText
          text="THE DRONE LAB // STRUCTURAL BLUEPRINTS"
          className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
        />
        <p className="max-w-2xl text-sm md:text-base text-zinc-300">
          Codelift exposes the structural logic behind a 10-inch performance
          frame, from carbon fiber spars to control silicon. Built for
          engineers, not spectators.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
            <h2 className="font-mono text-sm md:text-base uppercase tracking-[0.22em] text-zinc-200">
              THE AGGRESSIVE BLUEPRINT
            </h2>
            <p className="mt-3 text-sm md:text-base text-zinc-300">
              A monochrome CAD-style wireframe outlines the 10&quot; airframe
              and 12mm carbon fiber tubing. Every line respects structural
              loads and mounting geometry, not aesthetics.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid-border border border-zinc-900 bg-black/80 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
                HOTSPOTS // ESP32-S3
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Red markers highlight the compute core, I/O breakout, and
                isolation zones. This is where telemetry, control, and
                over-the-air updates converge.
              </p>
            </div>
            <div className="grid-border border border-zinc-900 bg-black/80 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
                HOTSPOTS // MOTOR MOUNTS
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                Stress-critical motor mounts are called out for torque,
                vibration, and crash energy paths. Red overlays indicate
                magnetic assembly interfaces.
              </p>
            </div>
          </div>

          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              EDUCATION LOGIC // COURSE SYLLABUS
            </p>
            <ul className="mt-3 list-none space-y-2 text-sm text-zinc-300">
              <li>
                <span className="font-mono text-xs text-red-600">[01]</span>{" "}
                Airframe geometry, center of gravity, and moment arms.
              </li>
              <li>
                <span className="font-mono text-xs text-red-600">[02]</span>{" "}
                Motor / prop pairing, thrust curves, and efficiency envelopes.
              </li>
              <li>
                <span className="font-mono text-xs text-red-600">[03]</span>{" "}
                Power system design, harness routing, and failure isolation.
              </li>
              <li>
                <span className="font-mono text-xs text-red-600">[04]</span>{" "}
                Flight controller tuning, sensor fusion, and log analysis.
              </li>
              <li>
                <span className="font-mono text-xs text-red-600">[05]</span>{" "}
                Field validation, crash forensics, and iterative redesign.
              </li>
            </ul>
          </div>
        </div>

        {/* Wireframe + exploded view */}
        <div className="space-y-4">
          <div className="grid-border relative border border-zinc-900 bg-black/80 p-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              WIREFRAME // TOP VIEW
            </p>
            <div className="relative h-64 w-full border border-zinc-900 bg-black">
              {/* Main frame outline */}
              <div className="absolute inset-8 border border-zinc-500" />

              {/* Arms */}
              <div className="absolute left-1/2 top-3 h-10 w-[1px] -translate-x-1/2 bg-zinc-500" />
              <div className="absolute bottom-3 left-1/2 h-10 w-[1px] -translate-x-1/2 bg-zinc-500" />
              <div className="absolute left-3 top-1/2 h-[1px] w-10 -translate-y-1/2 bg-zinc-500" />
              <div className="absolute right-3 top-1/2 h-[1px] w-10 -translate-y-1/2 bg-zinc-500" />

              {/* Hotspots as red plus markers */}
              {[
                { top: "18%", left: "50%" },
                { top: "50%", left: "24%" },
                { top: "50%", left: "76%" },
              ].map((pos, idx) => (
                <div
                  key={idx}
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="absolute inset-1 border border-red-600" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-red-600" />
                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-red-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              MAGNETIC ASSEMBLY // EXPLODED VIEW
            </p>
            <div className="relative h-56 overflow-hidden">
              <motion.div
                className="absolute inset-x-10 top-6 h-10 border border-zinc-600"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-x-6 top-20 h-10 border border-zinc-600"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-x-4 top-32 h-10 border border-zinc-600"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-x-2 top-40 h-10 border border-zinc-600"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

