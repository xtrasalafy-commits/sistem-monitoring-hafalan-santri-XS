import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import TrakteerWidget from "@/components/TrakteerWidget";

export const metadata: Metadata = {
  title: "Mutaba'ah Santri - Sistem Monitoring Hafalan Al-Qur'an & Kitab",
  description: "Sistem monitoring hafalan santri pondok pesantren. Gratis, bebas iklan, open source.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#F8FAF7] text-slate-900 antialiased min-h-screen flex flex-col">
        {children}
        <footer className="mt-auto py-4 px-4 text-center text-[11px] text-zinc-500 border-t border-zinc-200 bg-white/60">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              Open Source oleh{" "}
              <span className="font-bold text-[#1B5E43]">MZF</span> - 2026
            </p>
            <a
              href="https://github.com/xtrasalafy/sistem-monitoring-hafalan-santri-XS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#1B5E43] hover:text-[#154a34] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Source Code
            </a>
          </div>
        </footer>
        <TrakteerWidget />
      </body>
    </html>
  );
}
