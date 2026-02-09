export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          PRIVACY // DATA HANDLING
        </p>
        <h1 className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100">
          PRIVACY POLICY
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-zinc-300">
          This page outlines how DIGIPEAK collects, processes, and protects
          information across operational systems and this website.
        </p>
      </header>

      <section className="space-y-6 text-sm md:text-base text-zinc-300">
        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            01 // DATA WE COLLECT
          </h2>
          <p className="mt-3">
            We collect limited technical metadata such as browser type, device
            information, and anonymized usage analytics for security and system
            tuning. Operational data from deployed systems is processed under
            specific project agreements.
          </p>
        </div>

        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            02 // USE OF INFORMATION
          </h2>
          <p className="mt-3">
            Data is used to maintain platform security, improve performance, and
            deliver contracted services. We do not sell personal data to third
            parties.
          </p>
        </div>

        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            03 // STORAGE & SECURITY
          </h2>
          <p className="mt-3">
            Access to operational and customer data is restricted and logged.
            Encryption is enforced in transit and, where applicable, at rest.
          </p>
        </div>

        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-200">
            04 // CONTACT
          </h2>
          <p className="mt-3">
            For privacy questions or data requests, contact the DIGIPEAK
            operations team using the secure contact channel published on the
            main interface.
          </p>
        </div>
      </section>
    </div>
  );
}

