"use client";

import React, { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import PetaHafalanGrid from "@/components/PetaHafalanGrid";
import { QURAN_SURAHS, getSurahByNumber } from "@/lib/quranData";
import { formatTanggalIndonesia } from "@/lib/format";
import {
  BookOpen,
  PlusCircle,
  CheckCircle,
  Users,
  Award,
  Calendar,
  Sparkles,
  Sliders,
  History,
  Trash2,
  Eye,
} from "lucide-react";

export default function UstadzPage() {
  const [santriList, setSantriList] = useState<any[]>([]);
  const [setoranQuranList, setSetoranQuranList] = useState<any[]>([]);
  const [setoranKitabList, setSetoranKitabList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertSuccess, setAlertSuccess] = useState("");

  // Modal / Form input setoran
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [inputTab, setInputTab] = useState<"quran" | "kitab">("quran");

  // Selected santri for Detail Modal
  const [selectedSantriDetail, setSelectedSantriDetail] = useState<any | null>(null);

  // Form states for Qur'an
  const [formQuran, setFormQuran] = useState({
    santriId: "",
    jenis: "hafalan_baru",
    nomorSurah: 78,
    namaSurah: "An-Naba'",
    ayatMulai: 1,
    ayatSelesai: 40,
    juz: 30,
    nilaiKelancaran: 90,
    nilaiTajwid: 88,
    nilaiMakhraj: 88,
    status: "lulus",
    catatan: "",
    tanggal: new Date().toISOString().split("T")[0],
  });

  // Form states for Kitab
  const [formKitab, setFormKitab] = useState({
    santriId: "",
    namaKitab: "Matan Al-Jazariyyah",
    bagian: "Bab Makharijul Huruf",
    nilaiHafalan: 90,
    nilaiBacaan: 88,
    nilaiPemahaman: 88,
    status: "lulus",
    catatan: "",
    tanggal: new Date().toISOString().split("T")[0],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [resSantri, resQ, resK] = await Promise.all([
        fetch("/api/santri").then((r) => r.json()),
        fetch("/api/setoran-quran").then((r) => r.json()),
        fetch("/api/setoran-kitab").then((r) => r.json()),
      ]);

      if (resSantri.success) {
        setSantriList(resSantri.data || []);
        if (resSantri.data?.length > 0 && !formQuran.santriId) {
          setFormQuran((prev) => ({ ...prev, santriId: String(resSantri.data[0].id) }));
          setFormKitab((prev) => ({ ...prev, santriId: String(resSantri.data[0].id) }));
        }
      }
      if (resQ.success) setSetoranQuranList(resQ.data || []);
      if (resK.success) setSetoranKitabList(resK.data || []);
    } catch (e) {
      console.error("Gagal memuat data ustadz:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const triggerAlert = (msg: string) => {
    setAlertSuccess(msg);
    setTimeout(() => setAlertSuccess(""), 4000);
  };

  // Surah selection change handler (Auto fill verses and Juz)
  const handleSurahChange = (surahNumStr: string) => {
    const num = parseInt(surahNumStr);
    const found = getSurahByNumber(num);
    if (found) {
      setFormQuran((prev) => ({
        ...prev,
        nomorSurah: found.nomor,
        namaSurah: found.nama,
        ayatMulai: 1,
        ayatSelesai: found.jumlahAyat,
        juz: found.juzAwal,
      }));
    }
  };

  // Submit Quran setoran
  const handleSubmitQuran = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/setoran-quran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formQuran,
          ustadzId: 2, // Ustadz Ahmad session
        }),
      });

      if (res.ok) {
        setIsInputOpen(false);
        triggerAlert("Alhamdulillah, setoran Al-Qur'an santri berhasil disimpan!");
        loadData();
      }
    } catch {
      alert("Gagal menyimpan setoran");
    }
  };

  // Submit Kitab setoran
  const handleSubmitKitab = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/setoran-kitab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formKitab,
          ustadzId: 2,
        }),
      });

      if (res.ok) {
        setIsInputOpen(false);
        triggerAlert("Alhamdulillah, setoran kitab santri berhasil disimpan!");
        loadData();
      }
    } catch {
      alert("Gagal menyimpan setoran");
    }
  };

  const handleDeleteQuran = async (id: number) => {
    if (confirm("Hapus catatan setoran ini?")) {
      await fetch(`/api/setoran-quran?id=${id}`, { method: "DELETE" });
      triggerAlert("Catatan setoran berhasil dihapus.");
      loadData();
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const setoranHariIniCount = setoranQuranList.filter((s) => s.tanggal === todayStr).length;

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col">
      <HeaderNav
        user={{
          namaLengkap: "Ustadz Ahmad Al-Hafizh, Lc.",
          email: "ustadz1@pondok.id",
          role: "ustadz",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Banner with Big Input Button */}
        <div className="bg-gradient-to-r from-[#1B5E43] to-[#206f4f] text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
              Halaqah Utsman bin Affan
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-0.5">
              Portal Penilaian & Setoran Ustadz
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Catat setoran hafalan Al-Qur'an dan mutaba'ah kitab santri binaan Anda
            </p>
          </div>

          <button
            onClick={() => setIsInputOpen(true)}
            className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-6 py-3.5 rounded-2xl font-black text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ Input Setoran Santri</span>
          </button>
        </div>

        {/* Alert success */}
        {alertSuccess && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-semibold rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#1B5E43]" />
            <span>{alertSuccess}</span>
          </div>
        )}

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Santri Bimbingan</p>
              <h3 className="text-2xl font-black text-[#1B5E43] mt-1">{santriList.length} Santri</h3>
              <span className="text-[11px] text-emerald-700 font-medium">Halaqah Aktif</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Setoran Masuk Hari Ini</p>
              <h3 className="text-2xl font-black text-amber-600 mt-1">{setoranHariIniCount} Setoran</h3>
              <span className="text-[11px] text-amber-800 font-medium">Tercatat dinilai</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 font-semibold">Rata-Rata Nilai Kelancaran</p>
              <h3 className="text-2xl font-black text-emerald-800 mt-1">91.4 / 100</h3>
              <span className="text-[11px] text-emerald-700 font-medium">Kategori Mumtaz</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1B5E43] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Daftar Santri Bimbingan & Progress Bar */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1B5E43]">Daftar Santri Bimbingan</h3>
              <p className="text-xs text-zinc-500">
                Pantau capaian dan klik tombol detail untuk melihat peta hafalan santri
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {santriList.map((s) => (
              <div
                key={s.id}
                className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-white text-zinc-600 px-2 py-0.5 rounded border">
                      {s.nis}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {s.kelas}
                    </span>
                  </div>
                  <h4 className="font-bold text-zinc-900 text-sm mt-2">{s.namaLengkap}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Terakhir: {s.lastSetoranSurah ? `${s.lastSetoranSurah}` : "Belum ada setoran"}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-950 mb-1">
                    <span>Progress Hafalan</span>
                    <span>{s.juzTuntas || 0} / 30 Juz</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1B5E43] h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, ((s.juzTuntas || 0) / 30) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSantriDetail(s)}
                  className="w-full py-2 bg-white hover:bg-emerald-100 text-[#1B5E43] border border-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Peta Hafalan Santri</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Setoran Ustadz */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#1B5E43]">Riwayat Setoran Terbaru</h3>
              <p className="text-xs text-zinc-500">Daftar setoran yang baru saja Anda input dan nilai</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-50 text-emerald-950 font-bold">
                <tr>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Santri</th>
                  <th className="p-3">Surah & Ayat</th>
                  <th className="p-3 text-center">Kelancaran</th>
                  <th className="p-3 text-center">Tajwid</th>
                  <th className="p-3 text-center">Makhraj</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {setoranQuranList.slice(0, 10).map((sq) => (
                  <tr key={sq.id} className="hover:bg-zinc-50">
                    <td className="p-3 font-mono">{formatTanggalIndonesia(sq.tanggal)}</td>
                    <td className="p-3 font-semibold text-zinc-900">{sq.namaSantri}</td>
                    <td className="p-3">
                      <strong className="text-emerald-900">{sq.namaSurah}</strong> (Ayat {sq.ayatMulai} - {sq.ayatSelesai})
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-800">{sq.nilaiKelancaran}</td>
                    <td className="p-3 text-center font-bold text-zinc-700">{sq.nilaiTajwid}</td>
                    <td className="p-3 text-center font-bold text-zinc-700">{sq.nilaiMakhraj}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          sq.status === "lulus"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {sq.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteQuran(sq.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                        title="Hapus Catatan"
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
      </div>

      {/* MODAL INPUT SETORAN (SEDERHANA, MAKSIMAL 1 HALAMAN) */}
      {isInputOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 my-8 border border-emerald-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-black text-[#1B5E43]">Input Setoran Santri</h3>
                <p className="text-xs text-zinc-500">Form penilaian hafalan Al-Qur'an dan Kitab</p>
              </div>
              <button
                onClick={() => setIsInputOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Toggle Quran vs Kitab */}
            <div className="flex rounded-xl bg-zinc-100 p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setInputTab("quran")}
                className={`flex-1 py-2 rounded-lg transition ${
                  inputTab === "quran" ? "bg-[#1B5E43] text-white shadow-sm" : "text-zinc-600"
                }`}
              >
                Setoran Al-Qur'an
              </button>
              <button
                type="button"
                onClick={() => setInputTab("kitab")}
                className={`flex-1 py-2 rounded-lg transition ${
                  inputTab === "kitab" ? "bg-[#1B5E43] text-white shadow-sm" : "text-zinc-600"
                }`}
              >
                Setoran Kitab
              </button>
            </div>

            {inputTab === "quran" ? (
              <form onSubmit={handleSubmitQuran} className="space-y-4 text-xs">
                {/* Pilih Santri */}
                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Pilih Santri Bimbingan</label>
                  <select
                    value={formQuran.santriId}
                    onChange={(e) => setFormQuran({ ...formQuran, santriId: e.target.value })}
                    className="w-full p-2.5 border rounded-xl font-semibold bg-white text-zinc-900"
                  >
                    {santriList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.namaLengkap} ({s.kelas})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Jenis Setoran */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1 text-zinc-700">Jenis Setoran</label>
                    <select
                      value={formQuran.jenis}
                      onChange={(e) => setFormQuran({ ...formQuran, jenis: e.target.value })}
                      className="w-full p-2.5 border rounded-xl bg-white text-zinc-900 font-medium"
                    >
                      <option value="hafalan_baru">Hafalan Baru (Ziyadah)</option>
                      <option value="murajaah">Muraja'ah (Pengulangan)</option>
                      <option value="tasmi">Tasmi' (Sekali Duduk)</option>
                      <option value="perbaikan">Perbaikan (Tahsin)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-zinc-700">Tanggal Setoran</label>
                    <input
                      type="date"
                      value={formQuran.tanggal}
                      onChange={(e) => setFormQuran({ ...formQuran, tanggal: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-zinc-900"
                    />
                  </div>
                </div>

                {/* 114 Surah Selector (Auto fill juz & ayat) */}
                <div>
                  <label className="font-bold block mb-1 text-zinc-700">
                    Pilih Surah Al-Qur'an (114 Surah)
                  </label>
                  <select
                    value={formQuran.nomorSurah}
                    onChange={(e) => handleSurahChange(e.target.value)}
                    className="w-full p-2.5 border rounded-xl bg-emerald-50/50 font-bold text-emerald-950"
                  >
                    {QURAN_SURAHS.map((s) => (
                      <option key={s.nomor} value={s.nomor}>
                        {s.nomor}. {s.nama} ({s.namaArab}) - {s.jumlahAyat} Ayat [Juz {s.juzAwal}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ayat Mulai & Selesai */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold block mb-1 text-zinc-700">Ayat Mulai</label>
                    <input
                      type="number"
                      min={1}
                      value={formQuran.ayatMulai}
                      onChange={(e) => setFormQuran({ ...formQuran, ayatMulai: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-zinc-700">Ayat Selesai</label>
                    <input
                      type="number"
                      min={1}
                      value={formQuran.ayatSelesai}
                      onChange={(e) => setFormQuran({ ...formQuran, ayatSelesai: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1 text-zinc-700">Nomor Juz</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={formQuran.juz}
                      onChange={(e) => setFormQuran({ ...formQuran, juz: parseInt(e.target.value) || 30 })}
                      className="w-full p-2.5 border rounded-xl font-bold bg-zinc-100"
                    />
                  </div>
                </div>

                {/* Sliders Nilai (Kelancaran, Tajwid, Makhraj) */}
                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-3">
                  <div>
                    <div className="flex justify-between font-bold text-zinc-800 mb-1">
                      <span>Nilai Kelancaran</span>
                      <span className="text-[#1B5E43] font-black">{formQuran.nilaiKelancaran} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={formQuran.nilaiKelancaran}
                      onChange={(e) => setFormQuran({ ...formQuran, nilaiKelancaran: parseInt(e.target.value) })}
                      className="w-full accent-[#1B5E43]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-zinc-800 mb-1">
                      <span>Nilai Tajwid</span>
                      <span className="text-[#1B5E43] font-black">{formQuran.nilaiTajwid} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={formQuran.nilaiTajwid}
                      onChange={(e) => setFormQuran({ ...formQuran, nilaiTajwid: parseInt(e.target.value) })}
                      className="w-full accent-[#1B5E43]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-zinc-800 mb-1">
                      <span>Nilai Makhraj</span>
                      <span className="text-[#1B5E43] font-black">{formQuran.nilaiMakhraj} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={formQuran.nilaiMakhraj}
                      onChange={(e) => setFormQuran({ ...formQuran, nilaiMakhraj: parseInt(e.target.value) })}
                      className="w-full accent-[#1B5E43]"
                    />
                  </div>
                </div>

                {/* Status Lulus / Mengulang */}
                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Status Penilaian</label>
                  <select
                    value={formQuran.status}
                    onChange={(e) => setFormQuran({ ...formQuran, status: e.target.value })}
                    className="w-full p-2.5 border rounded-xl font-bold bg-white text-emerald-950"
                  >
                    <option value="lulus">Lulus (Tuntas)</option>
                    <option value="mengulang">Mengulang</option>
                    <option value="perlu_murajaah">Perlu Muraja'ah Tambahan</option>
                  </select>
                </div>

                {/* Catatan Ustadz */}
                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Catatan & Nasehat Ustadz (Opsional)</label>
                  <input
                    type="text"
                    placeholder="contoh: Bacaan sangat fasih, perhatikan mad jaiz munfashil..."
                    value={formQuran.catatan}
                    onChange={(e) => setFormQuran({ ...formQuran, catatan: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsInputOpen(false)}
                    className="px-4 py-2.5 border rounded-xl font-bold text-zinc-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1B5E43] hover:bg-[#154a34] text-white px-6 py-2.5 rounded-xl font-black text-xs shadow-md"
                  >
                    Simpan Setoran
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitKitab} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Pilih Santri Bimbingan</label>
                  <select
                    value={formKitab.santriId}
                    onChange={(e) => setFormKitab({ ...formKitab, santriId: e.target.value })}
                    className="w-full p-2.5 border rounded-xl font-semibold bg-white"
                  >
                    {santriList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.namaLengkap} ({s.kelas})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Nama Kitab</label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: Matan Al-Jazariyyah, Tuhfatul Athfal"
                    value={formKitab.namaKitab}
                    onChange={(e) => setFormKitab({ ...formKitab, namaKitab: e.target.value })}
                    className="w-full p-2.5 border rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-zinc-700">Bagian / Bab / Bait</label>
                  <input
                    type="text"
                    required
                    placeholder="contoh: Fasal Hukum Nun Sukun (Bait 1-10)"
                    value={formKitab.bagian}
                    onChange={(e) => setFormKitab({ ...formKitab, bagian: e.target.value })}
                    className="w-full p-2.5 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold block mb-1">Nilai Hafalan</label>
                    <input
                      type="number"
                      value={formKitab.nilaiHafalan}
                      onChange={(e) => setFormKitab({ ...formKitab, nilaiHafalan: parseInt(e.target.value) || 85 })}
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Nilai Bacaan</label>
                    <input
                      type="number"
                      value={formKitab.nilaiBacaan}
                      onChange={(e) => setFormKitab({ ...formKitab, nilaiBacaan: parseInt(e.target.value) || 85 })}
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Pemahaman</label>
                    <input
                      type="number"
                      value={formKitab.nilaiPemahaman}
                      onChange={(e) => setFormKitab({ ...formKitab, nilaiPemahaman: parseInt(e.target.value) || 85 })}
                      className="w-full p-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsInputOpen(false)}
                    className="px-4 py-2.5 border rounded-xl font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1B5E43] text-white px-6 py-2.5 rounded-xl font-bold"
                  >
                    Simpan Setoran Kitab
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DETAIL SANTRI & 30 JUZ MAP MODAL */}
      {selectedSantriDetail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-5 my-8 border border-emerald-200 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-lg font-black text-[#1B5E43]">
                  Detail Profil & Peta Hafalan Santri
                </h3>
                <p className="text-xs text-zinc-600">
                  {selectedSantriDetail.namaLengkap} (NIS: {selectedSantriDetail.nis}) • {selectedSantriDetail.kelas}
                </p>
              </div>
              <button
                onClick={() => setSelectedSantriDetail(null)}
                className="text-zinc-400 hover:text-zinc-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Peta Hafalan Grid Component */}
            <PetaHafalanGrid
              namaSantri={selectedSantriDetail.namaLengkap}
              setoranList={setoranQuranList.filter((sq) => sq.santriId === selectedSantriDetail.id)}
            />

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSantriDetail(null)}
                className="bg-[#1B5E43] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
