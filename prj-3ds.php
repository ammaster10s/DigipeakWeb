<?php
$pageTitle = "DIGIPEAK OPS // PRJ-3DS";
$pageDescription = "Industrial-grade 3D printing services for high-strength composites.";
include __DIR__ . "/php/partials/header.php";
?>

<div class="flex flex-col gap-10 md:gap-14">
  <header class="space-y-3">
    <p class="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-orange-500">
      [KAIKLOM PRINTING] // 3D PRINTING SERVICE
    </p>
    <p
      class="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
      data-scramble
      data-scramble-speed="0.8"
    >
      SERVICE SPECIFICATIONS
    </p>
    <p class="max-w-2xl text-sm md:text-base text-zinc-300">
      Professional 3D printing services with a full range of materials from PLA to carbon fiber composites.
      Submit your files, receive expert consultation, and get high-quality parts delivered to your door.
    </p>
  </header>

  <section class="space-y-8">
    <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
      <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
        SERVICE SPECIFICATIONS // MATERIAL OPTIONS
      </p>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full border-collapse font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
          <thead>
            <tr class="bg-black/60 text-zinc-300">
              <th class="border border-zinc-800 px-3 py-2 text-left">MATERIAL</th>
              <th class="border border-zinc-800 px-3 py-2 text-left">PROPERTIES</th>
              <th class="border border-zinc-800 px-3 py-2 text-left">PRICE</th>
              <th class="border border-zinc-800 px-3 py-2 text-left">USE CASE</th>
            </tr>
          </thead>
          <tbody class="text-zinc-200">
            <tr>
              <td class="border border-zinc-800 px-3 py-2">PLA</td>
              <td class="border border-zinc-800 px-3 py-2">High-detail visual models</td>
              <td class="border border-zinc-800 px-3 py-2 text-orange-500">3 ฿/G</td>
              <td class="border border-zinc-800 px-3 py-2">Prototypes, Display</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">PETG</td>
              <td class="border border-zinc-800 px-3 py-2">Durable, UV-stable outdoor ready</td>
              <td class="border border-zinc-800 px-3 py-2 text-orange-500">2.5 ฿/G</td>
              <td class="border border-zinc-800 px-3 py-2">Outdoor, Functional</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">ABS / ASA</td>
              <td class="border border-zinc-800 px-3 py-2">Heat-resistant industrial</td>
              <td class="border border-zinc-800 px-3 py-2 text-orange-500">4 ฿/G</td>
              <td class="border border-zinc-800 px-3 py-2">High-temp, Automotive</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">CF-INFUSED</td>
              <td class="border border-zinc-800 px-3 py-2">Ultra-stiff, lightweight</td>
              <td class="border border-zinc-800 px-3 py-2 text-orange-500">8 ฿/G</td>
              <td class="border border-zinc-800 px-3 py-2">Aerospace, Racing</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">TPU</td>
              <td class="border border-zinc-800 px-3 py-2">Flexible, shock-absorbing parts</td>
              <td class="border border-zinc-800 px-3 py-2 text-orange-500">4 ฿/G</td>
              <td class="border border-zinc-800 px-3 py-2">Gaskets, Dampeners</td>
            </tr>
            <tr>
              <td class="border border-zinc-800 px-3 py-2">MULTI-COLOR</td>
              <td class="border border-zinc-800 px-3 py-2">Up to 4 colors in a single print</td>
              <td class="border border-zinc-800 px-3 py-2 text-orange-500">4 ฿/G</td>
              <td class="border border-zinc-800 px-3 py-2">Branding, Art</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-6 space-y-2 border-t border-zinc-800 pt-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-orange-500">How to Order?</p>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <p class="font-mono text-[11px] text-zinc-300"><span class="text-orange-500">Submit:</span> Send your .STL / .STEP files via QR Code</p>
            <p class="font-mono text-[11px] text-zinc-300"><span class="text-orange-500">Consult:</span> Receive material recommendation and price quote</p>
          </div>
          <div>
            <p class="font-mono text-[11px] text-zinc-300"><span class="text-orange-500">Print:</span> High-speed production using OUR industrial tech</p>
            <p class="font-mono text-[11px] text-zinc-300"><span class="text-orange-500">Ship:</span> Secure packaging and rapid delivery to your door</p>
          </div>
        </div>
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
        KAIKLOM PROJECT // DESIGN SHOWCASE
      </p>
      <div class="mt-4 grid gap-4 md:grid-cols-2">
        <div class="overflow-hidden border border-zinc-800">
          <img src="/public/Poster_Kaiklom_1.png" alt="Kaiklom Design Poster 1" class="w-full h-auto object-cover transition-transform hover:scale-105" />
        </div>
        <div class="overflow-hidden border border-zinc-800">
          <img src="/public/Poster_Kaiklom_2.png" alt="Kaiklom Design Poster 2" class="w-full h-auto object-cover transition-transform hover:scale-105" />
        </div>
      </div>
    </div>
  </section>
</div>

<?php include __DIR__ . "/php/partials/footer.php"; ?>