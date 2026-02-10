<?php
$pageTitle = "DIGIPEAK OPS // PRJ-GT";
$pageDescription = "Ghost Tracker Beta 1.0 tactical drone platform.";
include __DIR__ . "/php/partials/header.php";
?>

<div class="flex flex-col gap-10 md:gap-14">
  <header class="space-y-3">
    <p class="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
      [PRJ-GT] // GHOST TRACKER BETA 1.0
    </p>
    <p
      class="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
      data-scramble
      data-scramble-speed="0.8"
    >
      THE SILENT PREDATOR: AUTONOMOUS THERMAL PURSUIT & TACTICAL SUPERIORITY
    </p>
    <p class="max-w-3xl text-sm md:text-base text-zinc-300">
      Redefining tactical autonomy in contested electronic warfare environments.
    </p>
  </header>

  <section class="grid gap-8 md:grid-cols-[1.1fr_minmax(0,1fr)]">
    <div class="space-y-6">
      <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
        <h2 class="font-mono text-sm md:text-base uppercase tracking-[0.22em] text-zinc-200">
          THE GHOST TRACKER BETA 1.0
        </h2>
        <p class="mt-3 text-sm md:text-base text-zinc-300">
          The Ghost Tracker Beta 1.0 is a next-generation Unmanned Aerial System (UAS)
          engineered for high-stakes operations in contested electronic warfare (EW)
          environments. Leveraging an advanced Edge AI Processing architecture, the
          system maintains mission integrity and decision-making capabilities even when
          completely severed from Remote Control (RC) links and Global Positioning Systems (GPS).
        </p>
      </div>

      <div class="grid-border border border-zinc-900 bg-black/80 p-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          CORE TACTICAL CAPABILITIES
        </p>
        <div class="mt-3 space-y-3 text-sm text-zinc-300">
          <p>
            <span class="text-zinc-100">Autonomous Terminal Homing (ATH):</span>
            The onboard AI logic enables the system to lock onto and prosecute targets
            independently during the final approach phase, ensuring mission success without
            human intervention.
          </p>
          <p>
            <span class="text-zinc-100">Electronic Warfare Resilience:</span>
            Designed for total signal denial, the system transitions into "Ghost Mode" upon
            detecting interference, utilizing on-board processing to bypass traditional jamming methods.
          </p>
          <p>
            <span class="text-zinc-100">Multi-Spectral Target Acquisition:</span>
            By fusing high-definition visual optics with high-sensitivity thermal sensors, the
            Ghost Tracker identifies heat signatures through total darkness, smoke, or camouflage.
          </p>
          <p>
            <span class="text-zinc-100">Dual-Mission Versatility:</span>
            A modular payload system allows operators to toggle between Reusable Mode (tactical
            drop and return) and Expendable Mode (direct kinetic impact) based on mission requirements.
          </p>
        </div>
      </div>

      <div class="grid-border border border-zinc-900 bg-black/80 p-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          ENGINEERING & TECHNICAL INTEGRATION
        </p>
        <div class="mt-3 space-y-3 text-sm text-zinc-300">
          <p>
            <span class="text-zinc-100">High-Performance Avionics:</span>
            Powered by the most powerful flight controller, supporting the professional ecosystem
            for industrial-grade reliability.
          </p>
          <p>
            <span class="text-zinc-100">GPS-Denied Navigation:</span>
            Integrated with the Optical Flow & LiDAR sensor suite, enabling precise position hold
            and altitude stability in signal-denied theaters.
          </p>
          <p>
            <span class="text-zinc-100">Lightweight Durability & Versatility:</span>
            The airframe is optimized for weight-sensitive operations, utilizing an AIO board that
            weighs only 10 grams to maximize payload capacity for tactical loads.
          </p>
          <p>
            <span class="text-zinc-100">Universal Peripheral Support:</span>
            The architecture features 7 UART ports, supporting a wide variety of equipment and
            mission-specific sensors, ensuring the platform can be adapted for diverse tactical requirements.
          </p>
        </div>
      </div>

      <div class="grid-border border border-red-900/60 bg-black/80 p-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-red-500">DISCLAIMER</p>
        <p class="mt-2 text-sm text-zinc-300">
          Product Development Statement: The technical specifications, autonomous functionalities,
          and operational capabilities described herein represent the strategic engineering objectives
          and product development milestones targeted for full realization by 2027. Current iterations
          serve as Beta prototypes intended for research, iterative testing, and technological validation.
        </p>
      </div>
    </div>

    <div class="space-y-6">
      <section id="prj-gt" class="grid gap-8">
        <div class="flex flex-col gap-6 text-sm md:text-base">
          <div class="space-y-2">
            <p class="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
              [PRJ-GT] // GHOST TRACKER
            </p>
            <p class="font-mono text-sm md:text-base uppercase tracking-[0.26em] text-zinc-200">
              MISSION CONTROL // OBSTACLE AVOIDANCE
            </p>
          </div>

          <div class="grid-border border border-zinc-900 bg-black/70 p-4">
            <div class="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">
              <span>OBSTACLE AVOIDANCE LOGIC // ACTIVE</span>
              <span class="text-zinc-500">PID_TUNING_MODE: LOCKED</span>
            </div>
          </div>

          <div class="grid gap-3 text-sm text-zinc-200 md:grid-cols-2">
            <div class="grid-border border border-zinc-900 bg-black/70 p-3">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">SENSOR STACK</p>
              <p class="mt-1">
                Stereo depth cameras, mmWave radar, and inertial fusion are synchronized at
                sub-millisecond latency for threat prediction.
              </p>
            </div>
            <div class="grid-border border border-zinc-900 bg-black/70 p-3">
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">GHOST CORRIDORS</p>
              <p class="mt-1">
                Dynamic flight corridors are carved in real time, guaranteeing hard-constraint
                avoidance even in dense industrial clutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="grid gap-4">
        <button
          type="button"
          data-gallery-item
          data-src="/public/drone-ghost-ortho.png"
          data-alt="High-contrast orthographic views of the DIGIPEAK ghost-tracker drone."
          data-label="HIGH-CONTRAST DRONE // ORTHO VIEWS"
          class="grid-border border border-zinc-900 bg-black/80 p-4 text-left transition hover:border-red-900/70"
        >
          <p class="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            HIGH-CONTRAST DRONE // ORTHO VIEWS
          </p>
          <div class="relative aspect-[16/9] w-full bg-black">
            <img
              src="/public/drone-ghost-ortho.png"
              alt="High-contrast orthographic views of the DIGIPEAK ghost-tracker drone."
              class="h-full w-full object-contain"
            />
          </div>
        </button>

        <button
          type="button"
          data-gallery-item
          data-src="/public/drone-ghost-perspective.png"
          data-alt="Perspective render of the DIGIPEAK ghost-tracker drone with antennas and carbon-fiber props."
          data-label="HIGH-CONTRAST DRONE // PERSPECTIVE"
          class="grid-border border border-zinc-900 bg-black/80 p-4 text-left transition hover:border-red-900/70"
        >
          <p class="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            HIGH-CONTRAST DRONE // PERSPECTIVE
          </p>
          <div class="relative aspect-[16/9] w-full bg-black">
            <img
              src="/public/drone-ghost-perspective.png"
              alt="Perspective render of the DIGIPEAK ghost-tracker drone with antennas and carbon-fiber props."
              class="h-full w-full object-contain"
            />
          </div>
        </button>
      </div>
    </div>
  </section>

  <div
    id="gallery-modal"
    class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 p-6"
  >
    <div
      class="relative w-full max-w-5xl overflow-hidden border border-zinc-800 bg-black/90"
    >
      <button
        id="gallery-modal-close"
        type="button"
        class="absolute right-3 top-3 z-10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-red-400"
      >
        Close
      </button>
      <div class="px-4 pt-4">
        <p
          id="gallery-modal-label"
          class="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400"
        ></p>
      </div>
      <div class="relative aspect-[16/9] w-full">
        <img id="gallery-modal-image" src="" alt="" class="h-full w-full object-contain" />
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . "/php/partials/footer.php"; ?>