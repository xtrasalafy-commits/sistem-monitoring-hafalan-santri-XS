"use client";

import React, { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import {
  Users,
  GraduationCap,
  Layers,
  CalendarCheck,
  AlertTriangle,
  Plus,
  Search,
  Printer,
  Download,
  FileSpreadsheet,
  Settings,
  CheckCircle,
  Clock,
  Target,
  Edit2,
  Trash2,
  UserPlus,
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
import { formatTanggalIndonesia } from "@/lib/format";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "dasbor" | "santri" | "ustadz" | "wali" | "halaqah" | "target" | "laporan" | "pengaturan"
  >("dasbor");

  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);
  const [santriList, setSantriList] = useState<any[]>([]);
  const [ustadzList, setUstadzList] = useState<any[]>([]);
  const [waliList, setWaliList] = useState<any[]>([]);
  const [halaqahList, setHalaqahList] = useState<any[]>([]);
  const [targetList, setTargetList] = useState<any[]>([]);
  const [setoranList, setSetoranList] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({
    namaPondok: "Pondok Pesantren Tahfizh Darul Huffazh",
    alamat: "Jl. Raya Pesantren No. 99, Cisarua, Bogor",
    tahunAjaran: "2025/2026",
    semester: "Genap",
  });

  // Filter & Search states
  const [searchSantri, setSearchSantri] = useState("");
  const [filterHalaqah, setFilterHalaqah] = useState("");
  const [alertSuccess, setAlertSuccess] = useState("");

  // Modals for CRUD
  const [modalSantriOpen, setModalSantriOpen] = useState(false);
  const [modalUstadzOpen, setModalUstadzOpen] = useState(false);
  const [modalWaliOpen, setModalWaliOpen] = useState(false);
  const [modalHalaqahOpen, setModalHalaqahOpen] = useState(false);
  const [modalTargetOpen, setModalTargetOpen] = useState(false);

  // Form states
  const [formSantri, setFormSantri] = useState({
    nis: "",
    namaLengkap: "",
    jenisKelamin: "putra",
    tanggalLahir: "2010-01-01",
    kelas: "Kelas 7A",
    kamar: "Asrama Abu Bakar",
    halaqahId: "",
    waliId: "",
    targetJuz: "30",
  });

  const [formUstadz, setFormUstadz] = useState({
    namaLengkap: "",
    email: "",
    password: "password123",
    noHp: "",
  });

  const [formWali, setFormWali] = useState({
    namaLengkap: "",
    email: "",
    password: "password123",
    noHp: "",
  });

  const [formHalaqah, setFormHalaqah] = useState({
    namaHalaqah: "",
    ustadzId: "",
    jadwal: "Ba'da Subuh & Ba'da Ashar",
    keterangan: "",
  });

  const [formTarget, setFormTarget] = useState({
    santriId: "",
    halaqahId: "",
    jenisTarget: "bulanan",
    deskripsiTarget: "",
    tanggalMulai: "2026-05-01",
    tanggalSelesai: "2026-05-31",
  });

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [resStats, resSantri, resUstadz, resWali, resHalaqah, resTarget, resSetoran, resSet] =
        await Promise.all([
          fetch("/api/stats").then((r) => r.json()),
          fetch("/api/santri").then((r) => r.json()),
          fetch("/api/ustadz").then((r) => r.json()),
          fetch("/api/wali").then((r) => r.json()),
          fetch("/api/halaqah").then((r) => r.json()),
          fetch("/api/target").then((r) => r.json()),
          fetch("/api/setoran-quran").then((r) => r.json()),
          fetch("/api/pengaturan").then((r) => r.json()),
        ]);

      if (resStats.success) setStatsData(resStats.stats);
      if (resSantri.success) setSantriList(resSantri.data || []);
      if (resUstadz.success) setUstadzList(resUstadz.data || []);
      if (resWali.success) setWaliList(resWali.data || []);
      if (resHalaqah.success) setHalaqahList(resHalaqah.data || []);
      if (resTarget.success) setTargetList(resTarget.data || []);
      if (resSetoran.success) setSetoranList(resSetoran.data || []);
      if (resSet) setSettings(resSet);
    } catch (e) {
      console.error("Gagal memuat data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const triggerAlert = (msg: string) => {
    setAlertSuccess(msg);
    setTimeout(() => setAlertSuccess(""), 4000);
  };

  // Handlers for Add
  const handleSaveSantri = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/santri", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formSantri),
    });
    if (res.ok) {
      setModalSantriOpen(false);
      triggerAlert("Data santri berhasil ditambahkan!");
      loadAllData();
    }
  };

  const handleSaveUstadz = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/ustadz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formUstadz),
    });
    if (res.ok) {
      setModalUstadzOpen(false);
      triggerAlert("Akun ustadz berhasil dibuat!");
      loadAllData();
    }
  };

  const handleSaveWali = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/wali", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formWali),
    });
    if (res.ok) {
      setModalWaliOpen(false);
      triggerAlert("Akun wali santri berhasil dibuat!");
      loadAllData();
    }
  };

  const handleSaveHalaqah = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/halaqah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formHalaqah),
    });
    if (res.ok) {
      setModalHalaqahOpen(false);
      triggerAlert("Data halaqah berhasil ditambahkan!");
      loadAllData();
    }
  };

  const handleSaveTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/target", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formTarget),
    });
    if (res.ok) {
      setModalTargetOpen(false);
      triggerAlert("Target hafalan berhasil ditambahkan!");
      loadAllData();
    }
  };

  const handleDeleteSantri = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data santri ini?")) {
      await fetch(`/api/santri?id=${id}`, { method: "DELETE" });
      triggerAlert("Data santri berhasil dihapus.");
      loadAllData();
    }
  };

  // CSV Export for Indonesian Pesantren Reports
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Tanggal,Nama Santri,NIS,Kelas,Surah,Ayat,Juz,Nilai Kelancaran,Status\n";

    setoranList.forEach((row) => {
      csvContent += `"${row.tanggal}","${row.namaSantri}","${row.nis}","${row.kelas}","${row.namaSurah}","${row.ayatMulai}-${row.ayatSelesai}","${row.juz}","${row.nilaiKelancaran}","${row.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Setoran_Mutabaah_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Santri
  const filteredSantri = santriList.filter((s) => {
    const matchSearch =
      s.namaLengkap.toLowerCase().includes(searchSantri.toLowerCase()) ||
      s.nis.includes(searchSantri);
    const matchHalaqah = filterHalaqah ? s.halaqahId === parseInt(filterHalaqah) : true;
    return matchSearch && matchHalaqah;
  });

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col">
      <HeaderNav
        user={{
          namaLengkap: "Ustadz Fauzan Ahmad, S.Pd.I",
          email: "admin@pondok.id",
          role: "admin",
        }}
        overdueCount={statsData?.overdueCount || 0}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Pesantren Title Banner */}
        <div className="bg-gradient-to-r from-[#1B5E43] to-[#247c59] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
              Panel Pengelola Utama
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-0.5">
              Dasbor Administrasi Pesantren
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              {settings.namaPondok} • Tahun Ajaran {settings.tahunAjaran} ({settings.semester})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Halaman</span>
            </button>
          </div>
        </div>

        {/* Alert notification banner */}
        {alertSuccess && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-semibold rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1B5E43]" />
            <span>{alertSuccess}</span>
          </div>
        )}

        {/* Navigation Tabs (100% Bahasa Indonesia) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-200 text-xs sm:text-sm font-bold">
          {[
            { id: "dasbor", label: "Dasbor Utama" },
            { id: "santri", label: "Data Santri" },
            { id: "ustadz", label: "Data Ustadz" },
            { id: "wali", label: "Data Wali Santri" },
            { id: "halaqah", label: "Halaqah" },
            { id: "target", label: "Target Hafalan" },
            { id: "laporan", label: "Rekap & Laporan" },
            { id: "pengaturan", label: "Pengaturan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#1B5E43] text-white shadow-sm"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DASBOR UTAMA */}
        {activeTab === "dasbor" && (
          <div className="space-y-6">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Total Santri</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E43] mt-1">
                    {statsData?.totalSantri || santriList.length}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium">Santri Aktif</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Total Ustadz</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E43] mt-1">
                    {statsData?.totalUstadz || ustadzList.length}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium">Pembimbing</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Total Halaqah</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B5E43] mt-1">
                    {statsData?.totalHalaqah || halaqahList.length}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium">Kelompok Belajar</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 font-semibold">Setoran Hari Ini</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
                    {statsData?.setoranHariIni || 3}
                  </h3>
                  <span className="text-[11px] text-amber-800 font-medium">Tercatat di sistem</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Bar Chart: Jumlah Setoran per Bulan */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-base">
                      Grafik Setoran Hafalan (6 Bulan Terakhir)
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Jumlah kumulatif setoran Al-Qur'an santri per bulan
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
                    Aktifitas Positif
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
                      <Bar dataKey="count" fill="#1B5E43" radius={[8, 8, 0, 0]} name="Setoran" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Santri Belum Setoran (≥ 3 Hari) - Alert Section */}
              <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-amber-100 text-amber-900">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-sm">Santri Butuh Perhatian</h3>
                  </div>
                  <p className="text-xs text-zinc-600 mt-2">
                    Daftar santri yang belum menyetor hafalan dalam 3 hari terakhir:
                  </p>

                  <div className="mt-4 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {statsData?.overdueSantri?.map((od: any) => (
                      <div
                        key={od.id}
                        className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-amber-950">{od.namaLengkap}</div>
                          <div className="text-[11px] text-zinc-500">
                            {od.kelas} • {od.namaHalaqah}
                          </div>
                        </div>
                        <span className="bg-amber-200 text-amber-900 font-bold px-2 py-1 rounded-md text-[10px]">
                          {od.hariTanpaSetoran}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 text-center">
                  Otomatis terdeteksi oleh sistem mutaba'ah
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATA SANTRI (CRUD) */}
        {activeTab === "santri" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E43]">Kelola Data Santri</h3>
                <p className="text-xs text-zinc-500">
                  Total {santriList.length} santri terdaftar di pondok pesantren
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchSantri}
                    onChange={(e) => setSearchSantri(e.target.value)}
                    placeholder="Cari nama atau NIS santri..."
                    className="pl-9 pr-3 py-2 rounded-xl border border-zinc-200 text-xs w-52 sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#1B5E43]"
                  />
                </div>

                <button
                  onClick={() => setModalSantriOpen(true)}
                  className="bg-[#1B5E43] hover:bg-[#154a34] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Santri</span>
                </button>
              </div>
            </div>

            {/* Santri Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50/70 text-emerald-950 uppercase font-bold border-b border-emerald-200">
                  <tr>
                    <th className="p-3">NIS</th>
                    <th className="p-3">Nama Santri</th>
                    <th className="p-3">Kelas & Kamar</th>
                    <th className="p-3">Halaqah</th>
                    <th className="p-3">Wali Santri</th>
                    <th className="p-3 text-center">Juz Tuntas</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredSantri.map((s) => (
                    <tr key={s.id} className="hover:bg-zinc-50 transition">
                      <td className="p-3 font-mono font-bold text-zinc-700">{s.nis}</td>
                      <td className="p-3 font-semibold text-zinc-900">{s.namaLengkap}</td>
                      <td className="p-3 text-zinc-600">
                        {s.kelas} <br />
                        <span className="text-[10px] text-zinc-400">{s.kamar || "-"}</span>
                      </td>
                      <td className="p-3 text-zinc-700">{s.namaHalaqah}</td>
                      <td className="p-3 text-zinc-700">{s.namaWali}</td>
                      <td className="p-3 text-center font-bold text-[#1B5E43]">
                        <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full text-[11px]">
                          {s.juzTuntas} / 30 Juz
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteSantri(s.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DATA USTADZ */}
        {activeTab === "ustadz" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E43]">Data Ustadz Pembimbing</h3>
                <p className="text-xs text-zinc-500">
                  Daftar ustadz dan akun login penginput setoran hafalan
                </p>
              </div>
              <button
                onClick={() => setModalUstadzOpen(true)}
                className="bg-[#1B5E43] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Tambah Ustadz</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ustadzList.map((u) => (
                <div key={u.id} className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">{u.namaLengkap}</h4>
                    <p className="text-xs text-zinc-500 font-mono mt-0.5">{u.email}</p>
                    <div className="mt-2 text-xs text-emerald-800 font-semibold">
                      {u.namaHalaqah} • {u.totalSantri || 0} Santri Bimbingan
                    </div>
                  </div>
                  <span className="bg-[#1B5E43] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Ustadz Aktif
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DATA WALI SANTRI */}
        {activeTab === "wali" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E43]">Data Wali Santri</h3>
                <p className="text-xs text-zinc-500">
                  Akun login wali untuk memantau perkembangan hafalan putra-putri
                </p>
              </div>
              <button
                onClick={() => setModalWaliOpen(true)}
                className="bg-[#1B5E43] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Tambah Wali</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {waliList.map((w) => (
                <div key={w.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40">
                  <h4 className="font-bold text-amber-950 text-sm">{w.namaLengkap}</h4>
                  <p className="text-xs text-zinc-500 font-mono">{w.email}</p>
                  <p className="text-xs text-zinc-700 font-semibold mt-2">
                    Santri: <span className="text-emerald-900">{w.daftarAnak || "Belum dihubungkan"}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: HALAQAH */}
        {activeTab === "halaqah" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E43]">Kelompok Halaqah</h3>
                <p className="text-xs text-zinc-500">Pengelompokan santri dan penugasan ustadz pembimbing</p>
              </div>
              <button
                onClick={() => setModalHalaqahOpen(true)}
                className="bg-[#1B5E43] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Halaqah</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {halaqahList.map((h) => (
                <div key={h.id} className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                  <h4 className="font-bold text-emerald-950 text-sm">{h.namaHalaqah}</h4>
                  <p className="text-xs text-zinc-600">Pembimbing: <strong>{h.namaUstadz}</strong></p>
                  <p className="text-xs text-zinc-500">Jadwal: {h.jadwal}</p>
                  <span className="inline-block bg-emerald-200 text-emerald-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {h.totalSantri} Santri
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TARGET HAFALAN */}
        {activeTab === "target" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E43]">Target Hafalan Santri</h3>
                <p className="text-xs text-zinc-500">Target mingguan, bulanan, dan semester</p>
              </div>
              <button
                onClick={() => setModalTargetOpen(true)}
                className="bg-[#1B5E43] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Target</span>
              </button>
            </div>

            <div className="space-y-3">
              {targetList.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm">{t.deskripsiTarget}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Untuk: <strong>{t.namaSantri}</strong> • Periode: {formatTanggalIndonesia(t.tanggalMulai)} s.d {formatTanggalIndonesia(t.tanggalSelesai)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.status === "tercapai"
                        ? "bg-emerald-100 text-emerald-800"
                        : t.status === "tidak_tercapai"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {t.status === "tercapai" ? "Tercapai" : t.status === "tidak_tercapai" ? "Tidak Tercapai" : "Sedang Berjalan"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: REKAP & LAPORAN (PDF PRINT & EXCEL CSV) */}
        {activeTab === "laporan" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E43]">Laporan Rekapitulasi Setoran</h3>
                <p className="text-xs text-zinc-500">
                  Data rekaman setoran Al-Qur'an pondok pesantren
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Unduh Excel / CSV</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak PDF</span>
                </button>
              </div>
            </div>

            {/* Setoran Report Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-emerald-50 text-emerald-950 font-bold">
                  <tr>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Nama Santri</th>
                    <th className="p-3">Surah & Ayat</th>
                    <th className="p-3 text-center">Juz</th>
                    <th className="p-3 text-center">Kelancaran</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {setoranList.slice(0, 15).map((sq) => (
                    <tr key={sq.id} className="hover:bg-zinc-50">
                      <td className="p-3 font-mono">{formatTanggalIndonesia(sq.tanggal)}</td>
                      <td className="p-3 font-semibold">{sq.namaSantri}</td>
                      <td className="p-3">
                        {sq.namaSurah} (Ayat {sq.ayatMulai} - {sq.ayatSelesai})
                      </td>
                      <td className="p-3 text-center font-bold">Juz {sq.juz}</td>
                      <td className="p-3 text-center font-bold text-emerald-800">{sq.nilaiKelancaran}</td>
                      <td className="p-3 text-center">
                        <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {sq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: PENGATURAN */}
        {activeTab === "pengaturan" && (
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm max-w-xl space-y-4">
            <h3 className="text-lg font-bold text-[#1B5E43]">Pengaturan Identitas Pesantren</h3>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Nama Pondok</label>
              <input
                type="text"
                value={settings.namaPondok}
                onChange={(e) => setSettings({ ...settings, namaPondok: e.target.value })}
                className="w-full p-2.5 border rounded-xl text-xs font-semibold text-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">Alamat Pondok</label>
              <input
                type="text"
                value={settings.alamat}
                onChange={(e) => setSettings({ ...settings, alamat: e.target.value })}
                className="w-full p-2.5 border rounded-xl text-xs text-zinc-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Tahun Ajaran</label>
                <input
                  type="text"
                  value={settings.tahunAjaran}
                  onChange={(e) => setSettings({ ...settings, tahunAjaran: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Semester</label>
                <input
                  type="text"
                  value={settings.semester}
                  onChange={(e) => setSettings({ ...settings, semester: e.target.value })}
                  className="w-full p-2.5 border rounded-xl text-xs text-zinc-900"
                />
              </div>
            </div>
            <button
              onClick={async () => {
                await fetch("/api/pengaturan", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(settings),
                });
                triggerAlert("Pengaturan pesantren berhasil disimpan!");
              }}
              className="mt-2 bg-[#1B5E43] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
            >
              Simpan Pengaturan
            </button>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH SANTRI */}
      {modalSantriOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4">
            <h3 className="font-bold text-base text-[#1B5E43]">Tambah Data Santri Baru</h3>
            <form onSubmit={handleSaveSantri} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">NIS (Nomor Induk Santri)</label>
                <input
                  type="text"
                  required
                  placeholder="contoh: 2024099"
                  value={formSantri.nis}
                  onChange={(e) => setFormSantri({ ...formSantri, nis: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Nama Lengkap Santri</label>
                <input
                  type="text"
                  required
                  placeholder="contoh: Muhammad Rayhan"
                  value={formSantri.namaLengkap}
                  onChange={(e) => setFormSantri({ ...formSantri, namaLengkap: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Jenis Kelamin</label>
                  <select
                    value={formSantri.jenisKelamin}
                    onChange={(e) => setFormSantri({ ...formSantri, jenisKelamin: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="putra">Putra</option>
                    <option value="putri">Putri</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Kelas</label>
                  <input
                    type="text"
                    value={formSantri.kelas}
                    onChange={(e) => setFormSantri({ ...formSantri, kelas: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalSantriOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#1B5E43] text-white px-5 py-2 rounded-xl font-bold"
                >
                  Simpan Santri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH USTADZ */}
      {modalUstadzOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-bold text-base text-[#1B5E43]">Tambah Akun Ustadz Pembimbing</h3>
            <form onSubmit={handleSaveUstadz} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nama Lengkap Ustadz</label>
                <input
                  type="text"
                  required
                  placeholder="contoh: Ustadz Ridwan Malik, Lc."
                  value={formUstadz.namaLengkap}
                  onChange={(e) => setFormUstadz({ ...formUstadz, namaLengkap: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Email Akun</label>
                <input
                  type="email"
                  required
                  placeholder="contoh: ridwan@pondok.id"
                  value={formUstadz.email}
                  onChange={(e) => setFormUstadz({ ...formUstadz, email: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalUstadzOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#1B5E43] text-white px-5 py-2 rounded-xl font-bold"
                >
                  Buat Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
