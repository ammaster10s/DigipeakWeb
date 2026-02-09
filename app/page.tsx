import { PRJGTSection } from "../components/sections/PRJGTSection";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <section className="space-y-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          DIGIPEAK // DEFENSE-TECH INTERFACE
        </p>
        <h1 className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-300">
          PRIMARY OPS CONSOLE
        </h1>
      </section>

      <PRJGTSection />
    </div>
  );
}

