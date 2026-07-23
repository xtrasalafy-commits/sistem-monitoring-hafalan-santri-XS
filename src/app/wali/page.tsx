"use client";

import React, { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import PetaHafalanGrid from "@/components/PetaHafalanGrid";
import { formatTanggalIndonesia } from "@/lib/format";
import {
  BookOpen,
  Award,
  CalendarCheck,
  TrendingUp,
  Printer,
  Heart,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WaliPage() {
  const [santriList, setSantriList] = useState<any[]>([]);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [setoranList, setSetoranList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [resSantri, resSetoran] = await Promise.all([
        fetch("/api/santri?waliId=4").then((r) => r.json()), // Wali 1 (Bpk Hendra Gunawan)
        fetch("/api/setoran-quran").then((r) => r.json()),
      ]);

      if (resSantri.success && resSantri.data?.length > 0) {
        setSantriList(resSantri.data);
      }
      if (resSetoran.success) {
        setSetoranList(resSetoran.data || []);
      }
    } catch (e) {
      console.error("Gagal memuat data wali:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeChild = santriList[selectedChildIndex] || santriList[0];
  const childSetoran = activeChild
    ? setoranList.filter((s) => s.santriId === activeChild.id)
    : [];

  const completedJuzCount = activeChild?.juzTuntas || 3;

  // Chart data for monthly child progress
  const chartData = [
    { bulan: "Jan", nilai: 85, setoran: 4 },
    { bulan: "Feb", nilai: 88, setoran: 6 },
    { bulan: "Mar", nilai: 90, setoran: 8 },
    { bulan: "Apr", nilai: 92, setoran: 9 },
    { bulan: "Mei", nilai: 95, setoran: 12 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col">
      <HeaderNav
        user={{
          namaLengkap: "Bpk. Hendra Gunawan, S.T.",
          email: "wali1@pondok.id",
          role: "wali",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Banner with Print button */}
        <div className="bg-gradient-to-r from-[#1B5E43] to-[#206f4f] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
              Portal Khusus Wali Santri
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-0.5">
              Perkembangan Hafalan Ananda
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Pantau kemajuan hafalan Al-Qur'an dan bimbingan akhlak dari rumah
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-5 py-3 rounded-2xl font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Unduh Laporan PDF</span>
          </button>
        </div>

        {/* Pilihan Anak (Child Switcher Tabs if multiple children) */}
        {santriList.length > 1 && (
          <div className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-zinc-500 px-2">Pilih Ananda:</span>
            {santriList.map((child, idx) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  selectedChildIndex === idx
                    ? "bg-[#1B5E43] text-white shadow-sm"
                    : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>{child.namaLengkap}</span>
                <span className="text-[10px] opacity-80">({child.kelas})</span>
              </button>
            ))}
          </div>
        )}

        {activeChild && (
          <>
            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Total Capaian Hafalan</p>
                  <h3 className="text-2xl font-black text-[#1B5E43] mt-1">
                    {completedJuzCount} / 30 Juz
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {activeChild.namaHalaqah}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Setoran Bulan Ini</p>
                  <h3 className="text-2xl font-black text-amber-600 mt-1">
                    {childSetoran.length} Kali Setoran
                  </h3>
                  <span className="text-[11px] text-amber-800 font-medium">Aktif & Disiplin</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Rata-Rata Nilai Kelancaran</p>
                  <h3 className="text-2xl font-black text-emerald-800 mt-1">94.8 / 100</h3>
                  <span className="text-[11px] text-emerald-700 font-medium">Predikat: Mumtaz</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* PETA HAFALAN 30 JUZ VISUAL COMPONENT */}
            <PetaHafalanGrid
              namaSantri={activeChild.namaLengkap}
              setoranList={childSetoran}
            />

            {/* Monthly Progress Line Chart */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div>
                  <h3 className="font-bold text-zinc-900 text-base">
                    Grafik Perkembangan Hafalan Bulanan
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Rata-rata nilai kelancaran dan tajwid ananda per bulan
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
                  Tren Sangat Baik
                </span>
              </div>

              <div className="h-60 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="bulan" stroke="#64748B" fontSize={12} />
                    <YAxis domain={[60, 100]} stroke="#64748B" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1B5E43",
                        color: "#fff",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="nilai"
                      stroke="#1B5E43"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#D4AF37" }}
                      name="Nilai Rata-rata"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Riwayat Setoran Terbaru (10 Terakhir) Beserta Catatan Ustadz */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1B5E43]">
                    Catatan Riwayat Setoran Terbaru & Nasehat Ustadz
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Berikut 10 catatan setoran terakhir ananda beserta bimbingan ustadz
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {childSetoran.slice(0, 10).map((sq) => (
                  <div
                    key={sq.id}
                    className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-zinc-500">
                          {formatTanggalIndonesia(sq.tanggal)}
                        </span>
                        <span className="font-bold text-sm text-zinc-900">
                          Surah {sq.namaSurah} (Ayat {sq.ayatMulai} - {sq.ayatSelesai})
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                          Juz {sq.juz}
                        </span>
                      </div>

                      {sq.catatan && (
                        <div className="mt-2 text-xs text-emerald-950 flex items-start gap-1.5 bg-white p-2.5 rounded-xl border border-emerald-100">
                          <MessageSquare className="w-3.5 h-3.5 text-[#1B5E43] mt-0.5 shrink-0" />
                          <span>
                            <strong>Nasehat Ustadz:</strong> {sq.catatan}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-zinc-500">Nilai Kelancaran</div>
                        <div className="font-black text-base text-[#1B5E43]">
                          {sq.nilaiKelancaran} / 100
                        </div>
                      </div>
                      <span className="bg-emerald-600 text-white font-bold text-[11px] px-3 py-1 rounded-full">
                        {sq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
