"use client";

import { useState } from "react";
import { ScrambleText } from "../../components/visual/ScrambleText";

function MassProductionCalculator() {
  const [units, setUnits] = useState(100);
  const [weightPerUnit, setWeightPerUnit] = useState(6.5);

  const totalWeight = units * weightPerUnit;

  return (
    <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
        MASS PRODUCTION CALCULATOR
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            UNIT COUNT
          </label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value) || 0)}
            className="w-full bg-black px-3 py-2 font-mono text-sm uppercase tracking-[0.18em] text-zinc-100 outline-none ring-1 ring-zinc-800 focus:ring-red-600"
          />

          <label className="mt-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            WEIGHT PER UNIT (G)
          </label>
          <input
            type="number"
            step="0.1"
            value={weightPerUnit}
            onChange={(e) => setWeightPerUnit(Number(e.target.value) || 0)}
            className="w-full bg-black px-3 py-2 font-mono text-sm uppercase tracking-[0.18em] text-zinc-100 outline-none ring-1 ring-zinc-800 focus:ring-red-600"
          />
        </div>

        <div className="flex flex-col justify-between border border-zinc-900 bg-black/60 p-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              OUTPUT
            </p>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.22em] text-zinc-100">
              TOTAL FILAMENT:{" "}
              <span className="text-red-600">
                {totalWeight.toFixed(1)} G
              </span>
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
              EST. UNITS / KG:{" "}
              {totalWeight > 0
                ? (1000 / weightPerUnit).toFixed(1)
                : "0.0"}
            </p>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Values are indicative and tuned for PETG-CF / rCF process windows.
            For nylon or exotic blends, calibration curves are applied.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PRJ3DSPage() {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <header className="space-y-3">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.32em] text-red-600">
          [PRJ-3DS] // 3D PRINTING SERVICE
        </p>
        <ScrambleText
          text="THE FACTORY // PRECISION ADDITIVE"
          className="font-mono text-base md:text-lg uppercase tracking-[0.26em] text-zinc-100"
        />
        <p className="max-w-2xl text-sm md:text-base text-zinc-300">
          Industrial-grade printing for rCF, PETG-CF, and nylon components,
          tuned for repeatability under thermal and mechanical stress.
        </p>
      </header>

      <section className="space-y-8">
        {/* Machine specs table */}
        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            MACHINE SPECS // MATERIAL PERFORMANCE
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
              <thead>
                <tr className="bg-black/60 text-zinc-300">
                  <th className="border border-zinc-800 px-3 py-2 text-left">
                    MATERIAL
                  </th>
                  <th className="border border-zinc-800 px-3 py-2 text-left">
                    STIFFNESS
                  </th>
                  <th className="border border-zinc-800 px-3 py-2 text-left">
                    HEAT RESIST.
                  </th>
                  <th className="border border-zinc-800 px-3 py-2 text-left">
                    SURFACE
                  </th>
                </tr>
              </thead>
              <tbody className="text-zinc-200">
                <tr>
                  <td className="border border-zinc-800 px-3 py-2">
                    PETG-CF
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    HIGH
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    80–90°C
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    MATTE / TECHNICAL
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-800 px-3 py-2">
                    PETG-RCF
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    VERY HIGH
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    90–100°C
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    RAW / RECYCLED TEXTURE
                  </td>
                </tr>
                <tr>
                  <td className="border border-zinc-800 px-3 py-2">
                    NYLON
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    FLEX / TOUGH
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    100–120°C
                  </td>
                  <td className="border border-zinc-800 px-3 py-2">
                    SEMI-MATTE / TECHNICAL
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <MassProductionCalculator />

        {/* Vintage restoration comparator */}
        <div className="grid-border border border-zinc-900 bg-black/80 p-4 md:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400">
            VINTAGE RESTORATION // 3D SCAN VS PRINT
          </p>
          <p className="mt-3 text-sm text-zinc-300">
            Side-by-side inspection of scanned geometry and final printed
            output. Tolerances, wear surfaces, and mounting faces are checked
            before parts ever touch a chassis.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                3D SCAN // POINT CLOUD
              </span>
              <div className="flex h-40 items-center justify-center border border-zinc-800 bg-gradient-to-br from-emerald-800/40 via-black to-sky-900/40 text-[11px] text-emerald-200">
                POINT CLOUD PLACEHOLDER
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                FINAL PRINTED PART
              </span>
              <div className="flex h-40 items-center justify-center border border-zinc-800 bg-gradient-to-br from-zinc-800 via-black to-zinc-900 text-[11px] text-zinc-100">
                PRINTED PART PLACEHOLDER
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

