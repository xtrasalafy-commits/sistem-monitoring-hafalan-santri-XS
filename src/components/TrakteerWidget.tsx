"use client";

import React, { useState, useMemo } from "react";
import QRCode from "qrcode";

const TRAKTEER_URL = "https://trakteer.id/perpus_opera/";

const DONATION_OPTIONS = [6000, 12000, 18000, 24000, 36000, 60000];

export default function TrakteerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setSelectedAmount(null);
      generateQR(TRAKTEER_URL);
    }
  };

  const handleSelectAmount = async (amount: number) => {
    setSelectedAmount(amount);
    const targetUrl = `${TRAKTEER_URL}?amount=${amount}`;
    await generateQR(targetUrl);
  };

  const generateQR = async (text: string) => {
    try {
      const url = await QRCode.toDataURL(text, {
        width: 200,
        margin: 2,
        color: {
          dark: "#1B5E43",
          light: "#FFFFFF",
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error("Failed to generate QR code:", err);
    }
  };

  const formattedAmount = selectedAmount
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(selectedAmount)
    : null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 w-80 sm:w-96 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#1B5E43]">
                Traktir Kopi untuk Tim Pengembang
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Dukung biaya server & pengembangan lebih lanjut
              </p>
            </div>
            <button
              onClick={handleToggle}
              className="text-zinc-400 hover:text-zinc-700 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-zinc-700">Pilih Nominal:</p>
            <div className="grid grid-cols-3 gap-2">
              {DONATION_OPTIONS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    selectedAmount === amount
                      ? "bg-[#1B5E43] text-white border-[#1B5E43] shadow-sm"
                      : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  Rp{amount.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </div>

          {formattedAmount && (
            <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <p className="text-[11px] text-amber-800 font-semibold">
                Nominal terpilih:
              </p>
              <p className="text-lg font-black text-[#1B5E43]">
                {formattedAmount}
              </p>
            </div>
          )}

          <div className="flex flex-col items-center gap-2 pt-2 border-t border-zinc-100">
            {qrDataUrl ? (
              <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                  src={qrDataUrl}
                  alt="QR Code Trakteer"
                  className="w-48 h-48 object-contain"
                />
              </div>
            ) : (
              <div className="w-48 h-48 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-center">
                <span className="text-[11px] text-zinc-400">Memuat QR Code...</span>
              </div>
            )}
            <p className="text-[10px] text-zinc-500 text-center">
              Scan QR Code dengan aplikasi pembayaran Anda
            </p>
          </div>

          <div className="text-center pt-1">
            <a
              href={selectedAmount ? `${TRAKTEER_URL}?amount=${selectedAmount}` : TRAKTEER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1B5E43] hover:text-[#154a34] bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200 transition"
            >
              Buka di Trakteer
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 shadow-lg border transition-all duration-200 cursor-pointer ${
          isOpen
              ? "bg-white text-[#1B5E43] border-emerald-200 rounded-full px-4 py-2"
              : "bg-[#1B5E43] text-white border-[#1B5E43] rounded-full pl-5 pr-2 py-2"
            }`}
      >
        {isOpen ? (
          <>
            <span className="text-xs font-bold">Tutup</span>
            <span className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          </>
        ) : (
          <>
            <span className="text-sm font-bold max-w-[220px] text-left leading-tight">
              Web app ini gratis & bebas iklan. Traktir kopi untuk bantu biaya
              server?
            </span>
            <span className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 14v.5M8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v3" />
                <path d="M16 14h.5a2 2 0 0 0 0-4H16" />
                <path d="M16 14v3" />
                <path d="M12 12V9.5a2.5 2.5 0 0 0-5 0V12" />
                <path d="M12 12v7" />
                <path d="M8 18h8" />
              </svg>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
