"use client";

import React, { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import {
  Award,
  Users,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  AlertTriangle,
  Trophy,
  Printer,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PimpinanPage() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStatsData(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data pimpinan:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col">
      <HeaderNav
        user={{
          namaLengkap: "K.H. Abdullah Syukri, Lc., M.A.",
          email: "pimpinan@pondok.id",
          role: "pimpinan",
        }}
        overdueCount={statsData?.overdueCount || 0}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Leadership Header Banner */}
        <div className="bg-gradient-to-r from-[#1B5E43] to-[#206f4f] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
              Laporan Eksekutif Mudir Pondok
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-0.5">
              Statistik Global Tahfizh Pesantren
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Ringkasan performa seluruh halaqah dan kemajuan hafalan Al-Qur'an santri
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-5 py-3 rounded-2xl font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rekap Eksekutif</span>
          </button>
        </div>

        {/* 4 Global Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Total Santri Aktif</p>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E43] mt-1">
                {statsData?.totalSantri || 15}
              </h3>
              <span className="text-[11px] text-emerald-700 font-medium">100% Mukim</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Total Setoran Bulan Ini</p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
                {statsData?.totalSetoranQuran || 65}
              </h3>
              <span className="text-[11px] text-amber-800 font-medium">Al-Qur'an & Kitab</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Rata-Rata Nilai Pondok</p>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">91.8 / 100</h3>
              <span className="text-[11px] text-emerald-700 font-medium">Kategori Mumtaz</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Kelompok Halaqah</p>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E43] mt-1">
                {statsData?.totalHalaqah || 3}
              </h3>
              <span className="text-[11px] text-emerald-700 font-medium">Aktif Terbina</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 6-Month Trend Chart */}
        <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h3 className="font-bold text-zinc-900 text-base">
                Tren Setoran Hafalan 6 Bulan Terakhir
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Kenaikan jumlah setoran seiring peningkatan disiplin mutaba'ah
              </p>
            </div>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
              Pertumbuhan Stabil
            </span>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData?.monthlyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1B5E43",
                    color: "#fff",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="#1B5E43" radius={[8, 8, 0, 0]} name="Jumlah Setoran" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2 Grid Sections: Ranking Halaqah & Santri Tertinggal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ranking Halaqah */}
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
              <Trophy className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-bold text-sm text-zinc-900">
                  Peringkat Keaktifan Halaqah
                </h3>
                <p className="text-[11px] text-zinc-500">Berdasarkan total setoran tuntas</p>
              </div>
            </div>

            <div className="space-y-3">
              {statsData?.halaqahRanking?.map((h: any, idx: number) => (
                <div
                  key={h.id}
                  className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#1B5E43] text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-zinc-900">{h.namaHalaqah}</div>
                      <div className="text-[11px] text-zinc-500">
                        Pembimbing: <strong>{h.namaUstadz}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full text-xs">
                      {h.totalSetoran} Setoran
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Santri Tertinggal Target */}
          <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-amber-100 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-bold text-sm">Santri Butuh Bimbingan Khusus</h3>
                <p className="text-[11px] text-zinc-500">Santri yang belum menyetor dalam 3+ hari</p>
              </div>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {statsData?.overdueSantri?.map((od: any) => (
                <div
                  key={od.id}
                  className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-amber-950">{od.namaLengkap}</div>
                    <div className="text-[11px] text-zinc-500">
                      {od.kelas} • {od.namaHalaqah}
                    </div>
                  </div>
                  <span className="bg-rose-100 text-rose-900 font-bold px-2.5 py-1 rounded-md text-[10px]">
                    {od.hariTanpaSetoran}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
