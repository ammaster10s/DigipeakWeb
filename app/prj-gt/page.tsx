import Image from "next/image";
import { PRJGTSection } from "../../components/sections/PRJGTSection";
import { ScrambleText } from "../../components/visual/ScrambleText";

export default function PRJGTPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          [PRJ-GT] // GHOST TRACKER
        </p>
        <ScrambleText
          text="TACTICAL MISSION CONTROL INTERFACE"
          className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
        />
        <p className="max-w-2xl text-sm md:text-base text-zinc-300">
          Ghost Tracker is the primary mission interface for tracking, obstacle
          avoidance, and secure surveillance of high-speed autonomous drones in
          dense industrial environments.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
            <h2 className="font-mono text-sm md:text-base uppercase tracking-[0.22em] text-zinc-200">
              MISSION PROFILE // TACTICAL MAP
            </h2>
            <p className="mt-3 text-sm md:text-base text-zinc-300">
              The interface renders live ghost tracks of all airborne assets
              over a minimal tactical map. Every plotted point is time-stamped,
              encrypted, and cross-checked against obstacle fields in real time.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid-border border border-zinc-900 bg-black/80 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
                TECHNICAL SHOWCASE // SIGNAL ANALYSIS
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                High-contrast red frequency lines expose latency, jitter, and
                interference across the control link. Operators see failure
                modes before they materialize in the field.
              </p>
            </div>
            <div className="grid-border border border-zinc-900 bg-black/80 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
                OBSTACLE AVOIDANCE LOGIC
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                A full halo of virtual sensors wraps the drone, simulating
                LIDAR, radar, and optical feeds. Each sector reports risk,
                clearance, and escape vectors in real time.
              </p>
            </div>
          </div>

          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              MATERIAL VISUALS // PETG-RCF
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              The chassis render emphasizes the raw texture of recycled
              carbon-fiber-reinforced PETG. The visual language is matte,
              hostile, and unapologetically industrial.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <PRJGTSection />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid-border border border-zinc-900 bg-black/80 p-3">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                HIGH-CONTRAST DRONE // ORTHO VIEWS
              </p>
              <div className="relative aspect-[4/3] w-full bg-black">
                <Image
                  src="/drone-ghost-ortho.jpeg"
                  alt="High-contrast orthographic views of the DIGIPEAK ghost-tracker drone."
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>

            <div className="grid-border border border-zinc-900 bg-black/80 p-3">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                HIGH-CONTRAST DRONE // PERSPECTIVE
              </p>
              <div className="relative aspect-[4/3] w-full bg-black">
                <Image
                  src="/drone-ghost-perspective.jpeg"
                  alt="Perspective render of the DIGIPEAK ghost-tracker drone with antennas and carbon-fiber props."
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

