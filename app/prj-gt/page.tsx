import { PRJGTSection } from "../../components/sections/PRJGTSection";
import { DroneImageGallery } from "../../components/visual/DroneImageGallery";
import { ScrambleText } from "../../components/visual/ScrambleText";

export default function PRJGTPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          [PRJ-GT] // GHOST TRACKER BETA 1.0
        </p>
        <ScrambleText
          text="THE SILENT PREDATOR: AUTONOMOUS THERMAL PURSUIT & TACTICAL SUPERIORITY"
          className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
        />
        <p className="max-w-3xl text-sm md:text-base text-zinc-300">
          Redefining tactical autonomy in contested electronic warfare
          environments.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
            <h2 className="font-mono text-sm md:text-base uppercase tracking-[0.22em] text-zinc-200">
              THE GHOST TRACKER BETA 1.0
            </h2>
            <p className="mt-3 text-sm md:text-base text-zinc-300">
              The Ghost Tracker Beta 1.0 is a next-generation Unmanned Aerial
              System (UAS) engineered for high-stakes operations in contested
              electronic warfare (EW) environments. Leveraging an advanced Edge
              AI Processing architecture, the system maintains mission
              integrity and decision-making capabilities even when completely
              severed from Remote Control (RC) links and Global Positioning
              Systems (GPS).
            </p>
          </div>

          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              CORE TACTICAL CAPABILITIES
            </p>
            <div className="mt-3 space-y-3 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-100">
                  Autonomous Terminal Homing (ATH):
                </span>{" "}
                The onboard AI logic enables the system to lock onto and
                prosecute targets independently during the final approach
                phase, ensuring mission success without human intervention.
              </p>
              <p>
                <span className="text-zinc-100">
                  Electronic Warfare Resilience:
                </span>{" "}
                Designed for total signal denial, the system transitions into
                "Ghost Mode" upon detecting interference, utilizing on-board
                processing to bypass traditional jamming methods.
              </p>
              <p>
                <span className="text-zinc-100">
                  Multi-Spectral Target Acquisition:
                </span>{" "}
                By fusing high-definition visual optics with high-sensitivity
                thermal sensors, the Ghost Tracker identifies heat signatures
                through total darkness, smoke, or camouflage.
              </p>
              <p>
                <span className="text-zinc-100">
                  Dual-Mission Versatility:
                </span>{" "}
                A modular payload system allows operators to toggle between
                Reusable Mode (tactical drop and return) and Expendable Mode
                (direct kinetic impact) based on mission requirements.
              </p>
            </div>
          </div>

          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              ENGINEERING & TECHNICAL INTEGRATION
            </p>
            <div className="mt-3 space-y-3 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-100">High-Performance Avionics:</span>{" "}
                Powered by the most powerful flight controller, supporting the
                professional ecosystem for industrial-grade reliability.
              </p>
              <p>
                <span className="text-zinc-100">GPS-Denied Navigation:</span>{" "}
                Integrated with the Optical Flow & LiDAR sensor suite, enabling
                precise position hold and altitude stability in signal-denied
                theaters.
              </p>
              <p>
                <span className="text-zinc-100">
                  Lightweight Durability & Versatility:
                </span>{" "}
                The airframe is optimized for weight-sensitive operations,
                utilizing an AIO board that weighs only 10 grams to maximize
                payload capacity for tactical loads.
              </p>
              <p>
                <span className="text-zinc-100">Universal Peripheral Support:</span>{" "}
                The architecture features 7 UART ports, supporting a wide
                variety of equipment and mission-specific sensors, ensuring the
                platform can be adapted for diverse tactical requirements.
              </p>
            </div>
          </div>

          <div className="grid-border border border-red-900/60 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-red-500">
              DISCLAIMER
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Product Development Statement: The technical specifications,
              autonomous functionalities, and operational capabilities
              described herein represent the strategic engineering objectives
              and product development milestones targeted for full realization
              by 2027. Current iterations serve as Beta prototypes intended for
              research, iterative testing, and technological validation.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <PRJGTSection />

          <DroneImageGallery
            images={[
              {
                src: "/drone-ghost-ortho.png",
                alt: "High-contrast orthographic views of the DIGIPEAK ghost-tracker drone.",
                label: "HIGH-CONTRAST DRONE // ORTHO VIEWS",
              },
              {
                src: "/drone-ghost-perspective.png",
                alt: "Perspective render of the DIGIPEAK ghost-tracker drone with antennas and carbon-fiber props.",
                label: "HIGH-CONTRAST DRONE // PERSPECTIVE",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

