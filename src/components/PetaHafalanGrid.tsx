"use client";

import React, { useState } from "react";
import { JUZ_INFO, QURAN_SURAHS } from "@/lib/quranData";

interface SetoranItem {
  id?: number;
  juz: number;
  nomorSurah?: number;
  namaSurah?: string;
  status: string;
  nilaiKelancaran?: number;
  tanggal?: string;
  jenis?: string;
}

interface PetaHafalanGridProps {
  setoranList: SetoranItem[];
  namaSantri?: string;
}

export default function PetaHafalanGrid({ setoranList, namaSantri }: PetaHafalanGridProps) {
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);

  // Calculate status for each Juz (1 - 30)
  const juzStatusList = JUZ_INFO.map((info) => {
    const recordsInJuz = setoranList.filter((s) => s.juz === info.juz);
    const passedRecords = recordsInJuz.filter((s) => s.status === "lulus");

    let status: "selesai" | "proses" | "belum" = "belum";
    let persentase = 0;

    if (passedRecords.length > 0) {
      // In a real pesantren, multiple setoran or 100% completion in a juz marks it
      if (passedRecords.length >= 2 || info.juz === 30 || info.juz === 1 || info.juz === 29) {
        status = "selesai";
        persentase = 100;
      } else {
        status = "proses";
        persentase = 50;
      }
    } else if (recordsInJuz.length > 0) {
      status = "proses";
      persentase = 30;
    }

    return {
      ...info,
      status,
      persentase,
      records: recordsInJuz,
    };
  });

  const totalSelesai = juzStatusList.filter((j) => j.status === "selesai").length;
  const totalProses = juzStatusList.filter((j) => j.status === "proses").length;
  const totalBelum = juzStatusList.filter((j) => j.status === "belum").length;

  const currentSelectedJuzInfo = selectedJuz
    ? juzStatusList.find((j) => j.juz === selectedJuz)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
      {/* Header & Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <h3 className="text-lg font-bold text-[#1B5E43] flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#1B5E43]"></span>
            Peta Hafalan 30 Juz Al-Qur'an {namaSantri ? `(${namaSantri})` : ""}
          </h3>
          <p className="text-xs text-zinc-600 mt-0.5">
            Klik pada kotak Juz untuk melihat detail surah & kemajuan setoran
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-3 h-3 rounded-full bg-[#1B5E43]"></span>
            <span className="font-semibold text-emerald-900">Tuntas ({totalSelesai} Juz)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="font-semibold text-amber-900">Proses ({totalProses} Juz)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
            <span className="w-3 h-3 rounded-full bg-zinc-300"></span>
            <span className="font-semibold text-zinc-700">Belum ({totalBelum} Juz)</span>
          </div>
        </div>
      </div>

      {/* 30 Juz Visual Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5 my-5">
        {juzStatusList.map((item) => {
          let cardStyle = "bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-400";
          let badgeStyle = "bg-zinc-200 text-zinc-700";

          if (item.status === "selesai") {
            cardStyle = "bg-[#1B5E43] text-white border-emerald-700 shadow-sm hover:bg-[#154a34]";
            badgeStyle = "bg-amber-400 text-emerald-950 font-bold";
          } else if (item.status === "proses") {
            cardStyle = "bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100";
            badgeStyle = "bg-amber-500 text-white font-bold";
          }

          return (
            <button
              key={item.juz}
              onClick={() => setSelectedJuz(item.juz)}
              className={`flex flex-col items-center justify-between p-2.5 rounded-xl border transition-all text-center cursor-pointer min-h-[78px] ${cardStyle}`}
            >
              <span className="text-[11px] font-medium opacity-90">Juz</span>
              <span className="text-base font-extrabold leading-tight">{item.juz}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md mt-1 ${badgeStyle}`}>
                {item.persentase}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Juz Detail Drawer / Box */}
      {currentSelectedJuzInfo && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[#1B5E43]">
              Detail {currentSelectedJuzInfo.nama} ({currentSelectedJuzInfo.surahAwal} s.d {currentSelectedJuzInfo.surahAkhir})
            </h4>
            <button
              onClick={() => setSelectedJuz(null)}
              className="text-xs text-zinc-600 hover:text-zinc-900 bg-white px-2 py-1 rounded border border-zinc-200"
            >
              Tutup
            </button>
          </div>

          <div className="mt-3 text-xs">
            <p className="text-zinc-700">
              Status Capaian:{" "}
              <strong className="text-[#1B5E43]">
                {currentSelectedJuzInfo.status === "selesai"
                  ? "Tuntas Lulus (100%)"
                  : currentSelectedJuzInfo.status === "proses"
                  ? "Sedang Dalam Bimbingan Setoran"
                  : "Belum Dimulai"}
              </strong>
            </p>
            {currentSelectedJuzInfo.records.length > 0 ? (
              <div className="mt-2 space-y-1.5">
                <p className="font-semibold text-zinc-800">Catatan Riwayat Setoran di Juz Ini:</p>
                {currentSelectedJuzInfo.records.map((rec, idx) => (
                  <div key={idx} className="bg-white p-2 rounded border border-emerald-100 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-emerald-900">{rec.namaSurah || "Surah"}</span>
                      <span className="text-zinc-500 ml-2">({rec.tanggal || "-"})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Nilai: {rec.nilaiKelancaran || 85} ({rec.status})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 mt-1 italic">
                Belum ada catatan setoran masuk untuk Juz {currentSelectedJuzInfo.juz}.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
