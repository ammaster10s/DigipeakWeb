<?php include __DIR__ . "/head.php"; ?>
  <body class="bg-black text-white antialiased">
    <div class="noise-overlay pointer-events-none fixed inset-0 z-[-1]"></div>
    <div class="scanlines pointer-events-none fixed inset-0 z-[-1]"></div>

    <div
      id="boot-loader"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-[450ms]"
    >
      <div class="pointer-events-none absolute inset-0 flex">
        <div class="h-full w-1/2 bg-black"></div>
        <div class="h-full w-1/2 bg-black"></div>
      </div>

      <div class="relative z-10 flex max-w-md flex-col items-center gap-6 px-6">
        <div class="grid-border w-full border border-zinc-900 bg-black/80 p-4">
          <div class="mb-3 text-center font-mono text-[11px] tracking-[0.25em] text-zinc-400">
            DIGIPEAK // SYSTEM BOOT
          </div>
          <div class="h-40 overflow-hidden bg-black/80">
            <div class="boot-lines flex flex-col gap-1 font-mono text-[10px] leading-tight text-zinc-500">
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>E5A7E67CF31888AC622D34E9</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>A1671E5926375E65F66352CA</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>9B3C7A12F4D8610E2C7B9F3D</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>7FC2A9D1846B3E5F2A9C7D1E</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>3D9F6A5C2E7B1A8D4C6F2B9E</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>F1A3C79E5D2B8460C7E9A3F1</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>2B7E5C9A1D4F8E6A3C9B7D2F</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>C8F2A1D7E4B9630F1A7C9E3B</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>6A3D9F2C7E1B5D8C4A9F2E7B</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>D1F7A9C3E5B2846F0A3D7C9E</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>4E9B2C7A1F5D8E3C6A9B2F7D</span></div>
              <div class="flex justify-center gap-2"><span class="text-red-600">0x</span><span>B3E7C1A9D5F2846C0E3A7D9F</span></div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="mb-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            <span>SYSTEM_INITIALIZING...</span>
            <span id="boot-progress-value" class="text-red-600">[0%]</span>
          </div>
          <div class="h-[2px] w-full overflow-hidden bg-zinc-900">
            <div
              id="boot-progress-bar"
              class="h-full bg-red-600 shadow-red-glow"
              style="width: 0%"
            ></div>
          </div>
          <button
            id="boot-skip"
            type="button"
            class="mt-3 flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 hover:text-red-500"
          >
            <span>MANUAL OVERRIDE AVAILABLE</span>
            <span class="text-red-600 hover:text-red-400">CLICK TO SKIP BOOT</span>
          </button>
        </div>
      </div>
    </div>

    <div class="relative flex min-h-screen flex-col">
      <header
        class="fixed inset-x-0 top-0 z-30 border-b border-zinc-900/80 bg-black/80 backdrop-blur-sm"
      >
        <div
          class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm md:text-base tracking-[0.22em]"
        >
          <a
            href="/index.php"
            class="font-mono uppercase text-zinc-200 transition-colors hover:text-red-300"
          >
            DIGIPEAK // OPS-HUD
          </a>
          <nav class="flex gap-6 font-mono text-xs md:text-sm uppercase">
            <a
              href="/prj-gt.php"
              class="relative overflow-hidden text-zinc-400 transition-colors duration-150"
            >
              <span class="group inline-flex items-center gap-1">
                <span class="mr-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">[</span>
                <span class="group-hover:text-red-600">PRJ_GT</span>
                <span class="ml-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">]</span>
              </span>
            </a>
            <a
              href="/prj-cl.php"
              class="relative overflow-hidden text-zinc-400 transition-colors duration-150"
            >
              <span class="group inline-flex items-center gap-1">
                <span class="mr-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">[</span>
                <span class="group-hover:text-red-600">PRJ_CL</span>
                <span class="ml-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">]</span>
              </span>
            </a>
            <a
              href="/prj-mrt.php"
              class="relative overflow-hidden text-zinc-400 transition-colors duration-150"
            >
              <span class="group inline-flex items-center gap-1">
                <span class="mr-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">[</span>
                <span class="group-hover:text-red-600">MOR_AI</span>
                <span class="ml-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">]</span>
              </span>
            </a>
            <a
              href="/prj-3ds.php"
              class="relative overflow-hidden text-zinc-400 transition-colors duration-150"
            >
              <span class="group inline-flex items-center gap-1">
                <span class="mr-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">[</span>
                <span class="group-hover:text-red-600">LOG_3DS</span>
                <span class="ml-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">]</span>
              </span>
            </a>
          </nav>
        </div>
      </header>

      <main class="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-20 pb-10 text-sm md:text-base md:pt-24">