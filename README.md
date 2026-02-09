# DIGIPEAK V1.0 – Anduril-Inspired Interface

Ultra-dark, defense-tech landing interface for DIGIPEAK, built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (JetBrains Mono + Inter via `next/font`)
- **Animation**: Framer Motion
- **Icons / Visuals**: Lucide React (ready to be wired where needed)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Current Features

- **Boot-up Loader**: Fullscreen black boot sequence with scrolling hex codes, linear red progress bar, and curtain/glitch-inspired exit. Unmounts after completion.
- **HUD Navigation**: Fixed ultra-dark top bar with code-name links: `[SYS_GO]`, `[PRJ_CL]`, `[LOG_3DS]`.
- **Status Footer**: Grid-based footer with location, pulsing **SYSTEM_ARMED** indicator, and hardened copyright line.
- **Hero / [PRJ-GT] GHOST TRACKER**:
  - Radar-style surveillance background with rotating sweep.
  - Monochrome drone silhouette and telemetry overlay.
  - **Signal Analysis** canvas rendering a red sine wave that reacts to scroll (frequency) and mouse movement (amplitude).
  - Scramble-text effect on mission headers.

## Next Steps

- Implement additional modules:
  - `[PRJ-CL] CODELIFT` (Blueprint / Exploded View SVG)
  - `[PRJ-3DS] THE FACTORY` (Mass production calculator + comparator slider)
  - `[PRJ-MRT] MORINTHA LOG` (AI inspection / defect tagging)
- Build the **CLI-style contact interface** with encrypted-response feedback.

