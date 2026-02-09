import { ScrambleText } from "../../components/visual/ScrambleText";

export default function PRJMRTPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          [PRJ-MRT] // MORINTHA LOG
        </p>
        <ScrambleText
          text="ADVANCED INTELLIGENCE // DEFECT SORTING"
          className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
        />
        <p className="max-w-2xl text-sm md:text-base text-zinc-300">
          Morintha Log documents the entire reasoning chain of our coffee-bean
          inspection AI, from raw sensor input to hardened accept/reject
          decisions.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="space-y-6">
          {/* Flowchart */}
          <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              AI PIPELINE // FLOWCHART
            </p>
            <div className="mt-4 grid gap-3 text-xs md:text-sm text-zinc-200">
              {[
                "CAMERA FEED INGEST",
                "FRAME NORMALIZATION & WHITE-BALANCE",
                "BEAN SEGMENTATION & SHAPE FILTERING",
                "DEFECT CLASSIFICATION (CRACK / COLOR / MOLD)",
                "REJECT / ACCEPT ROUTING",
                "BATCH LOGGING & METRIC EXPORT",
              ].map((step, idx) => (
                <div
                  key={step}
                  className="flex items-center gap-3 border border-zinc-800 bg-black/60 px-3 py-2"
                >
                  <span className="font-mono text-[11px] text-red-600">
                    [{(idx + 1).toString().padStart(2, "0")}]
                  </span>
                  <span className="font-mono uppercase tracking-[0.18em]">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech advisory */}
          <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              TECH ADVISORY // SYSTEM UPGRADE PROPOSAL
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              Morintha extends beyond coffee. The same inspection stack can be
              repurposed for manufacturing lines, warehouse QA, and logistics.
            </p>
            <ul className="mt-3 list-none space-y-2 text-sm text-zinc-300">
              <li>
                <span className="font-mono text-xs text-red-600">[A]</span>{" "}
                Website rebuild with telemetry-grade dashboards instead of
                marketing pages.
              </li>
              <li>
                <span className="font-mono text-xs text-red-600">[B]</span>{" "}
                Process automation hooks into ERP / MES to close the loop from
                detection to action.
              </li>
              <li>
                <span className="font-mono text-xs text-red-600">[C]</span>{" "}
                Advisory on sensor selection, lighting, and mechanical fixturing
                for robust computer vision.
              </li>
            </ul>
          </div>
        </div>

        {/* Live data feed mock */}
        <div className="space-y-4">
          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              LIVE DATA FEED // BOUNDING BOXES
            </p>
            <div className="mt-4 grid h-64 grid-cols-6 gap-2 bg-zinc-950 p-3">
              {Array.from({ length: 24 }).map((_, idx) => {
                const rejected = idx % 7 === 0;
                return (
                  <div
                    key={idx}
                    className="relative flex items-center justify-center bg-zinc-900"
                  >
                    <div className="h-4 w-4 bg-zinc-700" />
                    <div
                      className={`absolute inset-[2px] border text-[8px] font-mono uppercase tracking-[0.14em] ${
                        rejected
                          ? "border-red-600 text-red-500"
                          : "border-emerald-500 text-emerald-400"
                      }`}
                    >
                      <span className="absolute bottom-0 left-0 bg-black/80 px-0.5">
                        {rejected ? "REJECT" : "ACCEPT"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid-border border border-zinc-900 bg-black/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
              STREAM LOG // REAL-TIME EVENTS
            </p>
            <div className="mt-3 h-32 overflow-hidden bg-black/80 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              <div className="space-y-1">
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
  );
}

