"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BootLoader } from "./boot/BootLoader";

export function RootShell({ children }: { children: React.ReactNode }) {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence>
        {!bootComplete && (
          <BootLoader onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>

      <div className="relative flex min-h-screen flex-col">
        {/* HUD Navigation */}
        <motion.header
          className="fixed inset-x-0 top-0 z-30 border-b border-zinc-900/80 bg-black/80 backdrop-blur-sm"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "linear" }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm md:text-base tracking-[0.22em]">
            <div className="font-mono uppercase text-zinc-200">
              DIGIPEAK // OPS-HUD
            </div>
            <nav className="flex gap-6 font-mono text-xs md:text-sm uppercase">
              {[
                { label: "SYS_GO", href: "/" },
                { label: "PRJ_CL", href: "/prj-cl" },
                { label: "LOG_3DS", href: "/prj-3ds" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative overflow-hidden text-zinc-400 transition-colors duration-150"
                >
                  <span className="group inline-flex items-center gap-1">
                    <span className="mr-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      [
                    </span>
                    <span className="group-hover:text-red-600">
                      {item.label}
                    </span>
                    <span className="ml-1 text-red-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      ]
                    </span>
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-20 pb-10 text-sm md:text-base md:pt-24">
          {children}
        </main>

        {/* Status Footer */}
        <footer className="border-t border-zinc-900 bg-black/90">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-4 text-xs md:text-sm font-mono uppercase text-zinc-500 md:grid-cols-3">
            <div className="grid-border flex items-center border-r border-zinc-900/60 pr-4">
              <span className="text-zinc-400">COORDS:</span>
              <span className="ml-2 text-zinc-200">
                NANG LAE, CHIANG RAI
              </span>
            </div>
            <div className="grid-border flex items-center border-r border-zinc-900/60 pr-4">
              <span className="mr-2 status-dot" />
              <span className="text-zinc-400">STATUS:</span>
              <span className="ml-2 text-red-600">SYSTEM_ARMED</span>
            </div>
            <div className="flex flex-col justify-center gap-1 md:items-end">
              <div className="text-zinc-400">
                © 202X DIGIPEAK OPS. ALL SYSTEMS HARDENED.
              </div>
              <div className="text-[10px] md:text-xs normal-case text-zinc-500">
                237/4 หมู่ 5 ตำบล ริมกก อำเภอ เมืองเชียงราย จังหวัด เชียงราย 57100
              </div>
              <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs normal-case text-zinc-500">
                <span>email: digipeak.co@gmail.com</span>
                <span className="hidden text-zinc-700 md:inline">|</span>
                <nav className="flex gap-3 uppercase">
                  <a
                    href="/privacy"
                    className="text-zinc-500 hover:text-red-600"
                  >
                    PRIVACY
                  </a>
                  <a href="/tos" className="text-zinc-500 hover:text-red-600">
                    TOS
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

