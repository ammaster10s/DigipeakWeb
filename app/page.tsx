import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid h-[80vh] grid-cols-1 gap-4 p-4 md:grid-cols-4 md:grid-rows-2">
      <Link
        href="/prj-gt"
        className="group relative col-span-1 overflow-hidden border border-zinc-800 bg-zinc-900 transition-colors hover:border-red-600 md:col-span-2 md:row-span-2"
      >
        <div className="absolute inset-0 bg-[url('/drone-ghost-ortho.png')] opacity-40 grayscale transition-all group-hover:grayscale-0" />
        <div className="absolute bottom-4 left-4">
          <p className="font-mono text-xs text-red-500">[PRJ-GT]</p>
          <h2 className="text-3xl font-bold text-white">GHOST TRACKER</h2>
          <p className="mt-2 font-mono text-sm text-zinc-400">
            GPS-DENIED INTERCEPTOR
          </p>
        </div>
      </Link>

      <Link
        href="/prj-cl"
        className="group relative col-span-1 border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-white md:col-span-2"
      >
        <div className="absolute right-4 top-4 bg-white px-2 py-1 font-mono text-xs text-black">
          LATE 2026
        </div>
        <h2 className="text-2xl font-bold text-white group-hover:text-zinc-200">
          [PRJ-CL] CODELIFT
        </h2>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          Modular educational platform. Impact-resistant monocoque
          architecture.
        </p>
      </Link>

      <Link
        href="/prj-3ds"
        className="col-span-1 border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-white"
      >
        <h3 className="font-mono text-xs text-zinc-500">FACTORY_FLOOR</h3>
        <div className="mt-4 text-xl font-bold">3D PRINTING</div>
        <div className="mt-2 font-mono text-xs text-zinc-400">
          PETG-CF / NYLON
        </div>
      </Link>

      <Link
        href="/prj-mrt"
        className="col-span-1 border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-white"
      >
        <h3 className="font-mono text-xs text-zinc-500">DATA_LOG</h3>
        <div className="mt-4 text-xl font-bold">MORINTHA AI</div>
        <div className="mt-2 font-mono text-xs text-zinc-400">
          VISUAL SORTING
        </div>
      </Link>
    </div>
  );
}

