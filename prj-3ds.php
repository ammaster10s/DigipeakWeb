<?php
$pageTitle = "DIGIPEAK OPS // PRJ-3DS";
$pageDescription = "Industrial-grade 3D printing services for high-strength composites.";
include __DIR__ . "/php/partials/header.php";
?>

<div class="flex flex-col gap-10 md:gap-14">
  <header class="space-y-3">
    <p class="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
      [PRJ-3DS] // 3D PRINTING SERVICE
    </p>
    <p
      class="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
      data-scramble
      data-scramble-speed="0.8"
    >
      THE FACTORY // PRECISION ADDITIVE
    </p>
    <p class="max-w-2xl text-sm md:text-base text-zinc-300">
      Industrial-grade printing for rCF, PETG-CF, and nylon components, tuned for repeatability
      under thermal and mechanical stress.
    </p>
  </header>

  <section class="space-y-8">
    <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
      <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
        MACHINE SPECS // MATERIAL PERFORMANCE
      </p>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full border-collapse font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
          <thead>
            <tr class="bg-black/60 text-zinc-300">
              <th class="border border-zinc-800 px-3 py-2 text-left">MATERIAL</th>
              <th class="border border-zinc-800 px-3 py-2 text-left">STIFFNESS</th>
              <th class="border border-zinc-800 px-3 py-2 text-left">HEAT RESIST.</th>
              <th class="border border-zinc-800 px-3 py-2 text-left">SURFACE</th>
            </tr>
          </thead>
          <tbody class="text-zinc-200">
            <tr>
              <td class="border border-zinc-800 px-3 py-2">PETG-CF</td>
              <td class="border border-zinc-800 px-3 py-2">HIGH</td>
              <td class="border border-zinc-800 px-3 py-2">80–90°C</td>
              <td class="border border-zinc-800 px-3 py-2">MATTE / TECHNICAL</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">PETG-RCF</td>
              <td class="border border-zinc-800 px-3 py-2">VERY HIGH</td>
              <td class="border border-zinc-800 px-3 py-2">90–100°C</td>
              <td class="border border-zinc-800 px-3 py-2">RAW / RECYCLED TEXTURE</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">NYLON</td>
              <td class="border border-zinc-800 px-3 py-2">FLEX / TOUGH</td>
              <td class="border border-zinc-800 px-3 py-2">100–120°C</td>
              <td class="border border-zinc-800 px-3 py-2">SEMI-MATTE / TECHNICAL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
      <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
        MASS PRODUCTION CALCULATOR
      </p>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="space-y-3">
          <label class="block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">UNIT COUNT</label>
          <input
            id="units-input"
            type="number"
            value="100"
            class="w-full bg-black px-3 py-2 font-mono text-sm uppercase tracking-[0.18em] text-zinc-100 outline-none ring-1 ring-zinc-800 focus:ring-red-600"
          />

          <label class="mt-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            WEIGHT PER UNIT (G)
          </label>
          <input
            id="weight-input"
            type="number"
            step="0.1"
            value="6.5"
            class="w-full bg-black px-3 py-2 font-mono text-sm uppercase tracking-[0.18em] text-zinc-100 outline-none ring-1 ring-zinc-800 focus:ring-red-600"
          />
        </div>

        <div class="flex flex-col justify-between border border-zinc-900 bg-black/60 p-4">
          <div>
            <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">OUTPUT</p>
            <p class="mt-3 font-mono text-sm uppercase tracking-[0.22em] text-zinc-100">
              TOTAL FILAMENT: <span id="total-output" class="text-red-600">0.0 G</span>
            </p>
            <p class="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
              EST. UNITS / KG: <span id="units-per-kg-output">0.0</span>
            </p>
          </div>
          <p class="mt-4 text-xs text-zinc-500">
            Values are indicative and tuned for PETG-CF / rCF process windows. For nylon or exotic blends,
            calibration curves are applied.
          </p>
        </div>
      </div>
    </div>

    <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
      <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
        VINTAGE RESTORATION // 3D SCAN VS PRINT
      </p>
      <p class="mt-3 text-sm text-zinc-300">
        Side-by-side inspection of scanned geometry and final printed output. Tolerances, wear surfaces,
        and mounting faces are checked before parts ever touch a chassis.
      </p>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="flex flex-col gap-2">
          <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            3D SCAN // POINT CLOUD
          </span>
          <div class="flex h-40 items-center justify-center border border-zinc-800 bg-gradient-to-br from-emerald-800/40 via-black to-sky-900/40 text-[11px] text-emerald-200">
            POINT CLOUD PLACEHOLDER
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            FINAL PRINTED PART
          </span>
          <div class="flex h-40 items-center justify-center border border-zinc-800 bg-gradient-to-br from-zinc-800 via-black to-zinc-900 text-[11px] text-zinc-100">
            PRINTED PART PLACEHOLDER
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<?php include __DIR__ . "/php/partials/footer.php"; ?>