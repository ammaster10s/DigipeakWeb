<?php
$pageTitle = "DIGIPEAK OPS // HOME";
$pageDescription = "Defense-tech interface for high-precision drone engineering.";
include __DIR__ . "/php/partials/header.php";
?>

<div class="grid h-[80vh] grid-cols-1 gap-4 p-4 md:grid-cols-4 md:grid-rows-2">
  <a
    href="/prj-gt.php"
    class="group relative col-span-1 overflow-hidden border border-zinc-800 bg-zinc-900 transition-colors hover:border-red-600 md:col-span-2 md:row-span-2"
  >
    <div class="absolute inset-0 bg-[url('/public/GhostTracker_Render.png')] bg-cover bg-center opacity-40 grayscale transition-all group-hover:opacity-60 group-hover:grayscale-0"></div>
    <div class="absolute bottom-4 left-4">
      <p class="font-mono text-xs text-red-500">[PRJ-GT]</p>
      <h2 class="text-3xl font-bold text-white">GHOST TRACKER</h2>
      <p class="mt-2 font-mono text-sm text-zinc-400">GPS-DENIED INTERCEPTOR</p>
    </div>
  </a>

  <a
    href="/prj-cl.php"
    class="group relative col-span-1 overflow-hidden border border-zinc-800 bg-zinc-900 transition-colors hover:border-yellow-500 md:col-span-2"
  >
    <!-- Work in Progress Banner -->
    <div class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 px-12 py-2 font-mono text-sm font-bold uppercase tracking-widest text-black shadow-lg">
      Work in Progress
    </div>
    
    <div class="p-6">
      <div class="absolute right-4 top-4 bg-white px-2 py-1 font-mono text-xs text-black">LATE 2026</div>
      <h2 class="text-2xl font-bold text-white group-hover:text-zinc-200">[PRJ-CL] CODELIFT</h2>
      <p class="mt-2 max-w-md text-sm text-zinc-400">
        Modular educational platform. Impact-resistant monocoque architecture.
      </p>
    </div>
  </a>

  <a
    href="/prj-3ds.php"
    class="group relative col-span-1 overflow-hidden border border-zinc-800 bg-zinc-900 transition-colors hover:border-white"
  >
    <div class="absolute inset-0 bg-[url('/public/Kaiklom_3D_printing_2.png')] bg-cover bg-center opacity-20 grayscale transition-all group-hover:opacity-30 group-hover:grayscale-0"></div>
    <div class="relative p-4">
      <h3 class="font-mono text-xs text-zinc-500">FACTORY_FLOOR</h3>
      <div class="mt-4 text-xl font-bold">3D PRINTING</div>
      <div class="mt-2 font-mono text-xs text-zinc-400">PETG-CF / NYLON</div>
    </div>
  </a>

  <a
    href="/prj-mrt.php"
    class="group relative col-span-1 overflow-hidden border border-zinc-800 bg-zinc-900 transition-colors hover:border-white"
  >
    <div class="absolute inset-0 bg-[url('/public/Morintha_Render.png')] bg-cover bg-center opacity-20 grayscale transition-all group-hover:opacity-30 group-hover:grayscale-0"></div>
    <div class="relative p-4">
      <h3 class="font-mono text-xs text-zinc-500">DATA_LOG</h3>
      <div class="mt-4 text-xl font-bold">MORINTHA AI</div>
      <div class="mt-2 font-mono text-xs text-zinc-400">VISUAL SORTING</div>
    </div>
  </a>
</div>

<?php include __DIR__ . "/php/partials/footer.php"; ?>