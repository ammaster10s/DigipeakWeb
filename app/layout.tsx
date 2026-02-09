import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { RootShell } from "../components/RootShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DIGIPEAK OPS // GHOST TRACKER",
  description: "Defense-tech interface for high-precision drone engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-black text-white antialiased`}
      >
        <div className="noise-overlay pointer-events-none fixed inset-0 z-[-1]" />
        <div className="scanlines pointer-events-none fixed inset-0 z-[-1]" />
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}

