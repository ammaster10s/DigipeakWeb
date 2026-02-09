export default function TermsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          LEGAL // OPERATING TERMS
        </p>
        <h1 className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100">
          TERMS OF SERVICE
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-zinc-300">
          These terms govern use of DIGIPEAK interfaces, services, and related
          operational tooling.
        </p>
      </header>

      <section className="space-y-6 text-sm md:text-base text-zinc-300">
        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            01 // SCOPE OF USE
          </h2>
          <p className="mt-3">
            Access is provided for evaluation, operations, or partnership
            purposes as agreed in writing. Unauthorized use, reverse
            engineering, or redeployment is prohibited.
          </p>
        </div>

        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            02 // NO WARRANTIES
          </h2>
          <p className="mt-3">
            DIGIPEAK systems are provided &quot;as is&quot; for demonstration
            and contracted use. To the maximum extent permitted by law, we
            disclaim all implied warranties.
          </p>
        </div>

        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            03 // LIMITATION OF LIABILITY
          </h2>
          <p className="mt-3">
            DIGIPEAK is not liable for indirect, incidental, or consequential
            damages arising from use of the interface or underlying systems.
          </p>
        </div>

        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            04 // MODIFICATIONS
          </h2>
          <p className="mt-3">
            We may update these terms as systems evolve. Continued use after
            changes are published constitutes acceptance of the updated terms.
          </p>
        </div>
      </section>
    </div>
  );
}

