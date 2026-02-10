<?php
$pageTitle = "DIGIPEAK OPS // PRJ-MRT";
$pageDescription = "Morintha Log AI inspection system overview.";
include __DIR__ . "/php/partials/header.php";
?>

<div class="flex flex-col gap-10 md:gap-14">
  <header class="space-y-3">
    <p class="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
      [PRJ-MRT] // MORINTHA LOG
    </p>
    <p
      class="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
      data-scramble
      data-scramble-speed="0.8"
    >
      ADVANCED INTELLIGENCE // DEFECT SORTING
    </p>
    <p class="max-w-2xl text-sm md:text-base text-zinc-300">
      Morintha Log documents the entire reasoning chain of our coffee-bean inspection AI, from raw
      sensor input to hardened accept/reject decisions.
    </p>
  </header>

  <section class="grid gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
    <div class="space-y-6">
      <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          AI PIPELINE // FLOWCHART
        </p>
        <div class="mt-4 grid gap-3 text-xs md:text-sm text-zinc-200">
          <?php
            $steps = [
              "CAMERA FEED INGEST",
              "FRAME NORMALIZATION & WHITE-BALANCE",
              "BEAN SEGMENTATION & SHAPE FILTERING",
              "DEFECT CLASSIFICATION (CRACK / COLOR / MOLD)",
              "REJECT / ACCEPT ROUTING",
              "BATCH LOGGING & METRIC EXPORT",
            ];
          ?>
          <?php foreach ($steps as $idx => $step): ?>
            <div class="flex items-center gap-3 border border-zinc-800 bg-black/60 px-3 py-2">
              <span class="font-mono text-[11px] text-red-600">[<?php echo str_pad($idx + 1, 2, "0", STR_PAD_LEFT); ?>]</span>
              <span class="font-mono uppercase tracking-[0.18em]"><?php echo htmlspecialchars($step, ENT_QUOTES); ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          TECH ADVISORY // SYSTEM UPGRADE PROPOSAL
        </p>
        <p class="mt-3 text-sm text-zinc-300">
          Morintha extends beyond coffee. The same inspection stack can be repurposed for manufacturing
          lines, warehouse QA, and logistics.
        </p>
        <ul class="mt-3 list-none space-y-2 text-sm text-zinc-300">
          <li><span class="font-mono text-xs text-red-600">[A]</span> Website rebuild with telemetry-grade dashboards instead of marketing pages.</li>
          <li><span class="font-mono text-xs text-red-600">[B]</span> Process automation hooks into ERP / MES to close the loop from detection to action.</li>
          <li><span class="font-mono text-xs text-red-600">[C]</span> Advisory on sensor selection, lighting, and mechanical fixturing for robust computer vision.</li>
        </ul>
      </div>
    </div>

    <div class="space-y-4">
      <div class="grid-border border border-zinc-900 bg-black/80 p-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          LIVE DATA FEED // BOUNDING BOXES
        </p>
        <div class="mt-4 grid h-64 grid-cols-6 gap-2 bg-zinc-950 p-3">
          <?php for ($i = 0; $i < 24; $i++): ?>
            <?php $rejected = $i % 7 === 0; ?>
            <div class="relative flex items-center justify-center bg-zinc-900">
              <div class="h-4 w-4 bg-zinc-700"></div>
              <div
                class="absolute inset-[2px] border text-[8px] font-mono uppercase tracking-[0.14em] <?php echo $rejected ? "border-red-600 text-red-500" : "border-emerald-500 text-emerald-400"; ?>"
              >
                <span class="absolute bottom-0 left-0 bg-black/80 px-0.5">
                  <?php echo $rejected ? "REJECT" : "ACCEPT"; ?>
                </span>
              </div>
            </div>
          <?php endfor; ?>
        </div>
      </div>

      <div class="grid-border border border-zinc-900 bg-black/80 p-4">
        <p class="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
          STREAM LOG // REAL-TIME EVENTS
        </p>
        <div class="mt-3 h-32 overflow-hidden bg-black/80 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          <div class="space-y-1">
            <p>PROCESSING ID_9920... DETECTED DEFECT... SORTING</p>
            <p>PROCESSING ID_9921... ACCEPT... ROUTE_BIN_ALPHA</p>
            <p>PROCESSING ID_9922... DETECTED DISCOLORATION... REJECT</p>
            <p>PROCESSING ID_9923... ACCEPT... ROUTE_BIN_BETA</p>
            <p>PROCESSING ID_9924... SURFACE CRACK... REJECT</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<?php include __DIR__ . "/php/partials/footer.php"; ?>