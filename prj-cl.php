<?php
$pageTitle = "DIGIPEAK OPS // PRJ-CL";
$pageDescription = "Codelift structural drone blueprint and education platform.";
include __DIR__ . "/php/partials/header.php";
?>

<div class="flex flex-col gap-10 md:gap-14">
  <header class="space-y-3">
    <p class="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
      [PRJ-CL] // CODELIFT
    </p>
    <p
      class="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
      data-scramble
      data-scramble-speed="0.8"
    >
      THE DRONE LAB // STRUCTURAL BLUEPRINTS
    </p>
    <p class="max-w-2xl text-sm md:text-base text-zinc-300">
      Codelift exposes the structural logic behind a 10-inch performance frame, from carbon fiber
      spars to control silicon. Built for engineers, not spectators.
    </p>
  </header>

  <section class="grid gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
    <div class="space-y-6">
      <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
        <h2 class="font-mono text-sm md:text-base uppercase tracking-[0.22em] text-zinc-200">
          THE AGGRESSIVE BLUEPRINT
        </h2>
        <p class="mt-3 text-sm md:text-base text-zinc-300">
          A monochrome CAD-style wireframe outlines the 10" airframe and 12mm carbon fiber tubing.
          Every line respects structural loads and mounting geometry, not aesthetics.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="grid-border border border-zinc-900 bg-black/80 p-4">
          <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            HOTSPOTS // ESP32-S3
          </p>
          <p class="mt-2 text-sm text-zinc-300">
            Red markers highlight the compute core, I/O breakout, and isolation zones. This is where
            telemetry, control, and over-the-air updates converge.
          </p>
        </div>
        <div class="grid-border border border-zinc-900 bg-black/80 p-4">
          <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            HOTSPOTS // MOTOR MOUNTS
          </p>
          <p class="mt-2 text-sm text-zinc-300">
            Stress-critical motor mounts are called out for torque, vibration, and crash energy paths.
            Red overlays indicate magnetic assembly interfaces.
          </p>
        </div>
      </div>

      <div class="grid-border border border-zinc-900 bg-black/80 p-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          EDUCATION LOGIC // COURSE SYLLABUS
        </p>
        <ul class="mt-3 list-none space-y-2 text-sm text-zinc-300">
          <li><span class="font-mono text-xs text-red-600">[01]</span> Airframe geometry, center of gravity, and moment arms.</li>
          <li><span class="font-mono text-xs text-red-600">[02]</span> Motor / prop pairing, thrust curves, and efficiency envelopes.</li>
          <li><span class="font-mono text-xs text-red-600">[03]</span> Power system design, harness routing, and failure isolation.</li>
          <li><span class="font-mono text-xs text-red-600">[04]</span> Flight controller tuning, sensor fusion, and log analysis.</li>
          <li><span class="font-mono text-xs text-red-600">[05]</span> Field validation, crash forensics, and iterative redesign.</li>
        </ul>
      </div>
    </div>

    <div class="space-y-4">
      <div class="grid-border relative border border-zinc-900 bg-black/80 p-4">
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          WIREFRAME // TOP VIEW
        </p>
        <div class="relative h-64 w-full border border-zinc-900 bg-black">
          <div class="absolute inset-8 border border-zinc-500"></div>
          <div class="absolute left-1/2 top-3 h-10 w-[1px] -translate-x-1/2 bg-zinc-500"></div>
          <div class="absolute bottom-3 left-1/2 h-10 w-[1px] -translate-x-1/2 bg-zinc-500"></div>
          <div class="absolute left-3 top-1/2 h-[1px] w-10 -translate-y-1/2 bg-zinc-500"></div>
          <div class="absolute right-3 top-1/2 h-[1px] w-10 -translate-y-1/2 bg-zinc-500"></div>

          <?php
            $hotspots = [
              ["top" => "18%", "left" => "50%"],
              ["top" => "50%", "left" => "24%"],
              ["top" => "50%", "left" => "76%"],
            ];
          ?>
          <?php foreach ($hotspots as $pos): ?>
            <div
              class="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2"
              style="top: <?php echo $pos['top']; ?>; left: <?php echo $pos['left']; ?>;"
            >
              <div class="absolute inset-1 border border-red-600"></div>
              <div class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-red-600"></div>
              <div class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-red-600"></div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="grid-border border border-zinc-900 bg-black/80 p-4">
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          MAGNETIC ASSEMBLY // EXPLODED VIEW
        </p>
        <div class="relative h-56 overflow-hidden">
          <div class="absolute inset-x-10 top-6 h-10 border border-zinc-600 inview-target" data-inview></div>
          <div class="absolute inset-x-6 top-20 h-10 border border-zinc-600 inview-target" data-inview></div>
          <div class="absolute inset-x-4 top-32 h-10 border border-zinc-600 inview-target" data-inview></div>
          <div class="absolute inset-x-2 top-40 h-10 border border-zinc-600 inview-target" data-inview></div>
        </div>
      </div>
    </div>
  </section>
</div>

<?php include __DIR__ . "/php/partials/footer.php"; ?>