"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ShieldCheck, UserCheck, HeartHandshake, Award, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Email atau kata sandi salah");
        setLoading(false);
        return;
      }

      router.push(data.redirectUrl || "/admin");
      router.refresh();
    } catch {
      setErrorMsg("Terjadi gangguan koneksi. Silakan coba lagi.");
      setLoading(false);
    }
  };

  const handleQuickLogin = async (quickEmail: string, quickPass: string) => {
    setEmail(quickEmail);
    setPassword(quickPass);
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: quickEmail, password: quickPass }),
      });

      const data = await res.json();
      if (res.ok && data.redirectUrl) {
        router.push(data.redirectUrl);
        router.refresh();
      } else {
        setErrorMsg(data.error || "Gagal masuk");
        setLoading(false);
      }
    } catch {
      setErrorMsg("Gagal melakukan login cepat");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col justify-center selection:bg-emerald-200 p-4">
      {/* Top Bar Banner */}
      <div className="bg-[#1B5E43] text-white py-2.5 px-4 text-center text-xs font-medium border-b border-emerald-800">
         بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • Sistem Monitoring Hafalan Al-Qur&apos;an & Kitab Pondok Pesantren
      </div>

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Card Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 border border-emerald-100">
            {/* Logo & Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[#1B5E43] flex items-center justify-center shadow-lg shadow-emerald-900/20 text-amber-300">
                <BookOpen className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-[#1B5E43] tracking-tight pt-2">
                Mutaba&apos;ah Santri
              </h1>
              <p className="text-xs text-zinc-600">
                Silakan masuk dengan akun pesantren Anda
              </p>
            </div>

            {/* Error Message in Indonesian */}
            {errorMsg && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                  Alamat Email Akun
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh: ustadz1@pondok.id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E43] text-sm text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E43] text-sm text-zinc-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#1B5E43] hover:bg-[#154a34] text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Memproses Masuk...</span>
                ) : (
                  <>
                    <span>Masuk ke Dasbor</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Switcher */}
            <div className="mt-8 pt-6 border-t border-zinc-100">
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  ⚡ Masuk Cepat Akun Demo (1 Klik)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-left">
                {/* Admin */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin@pondok.id", "password123")}
                  className="p-2.5 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition text-left group"
                >
                  <div className="flex items-center gap-1.5 text-[#1B5E43] font-bold text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 truncate">admin@pondok.id</p>
                </button>

                {/* Ustadz */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("ustadz1@pondok.id", "password123")}
                  className="p-2.5 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition text-left group"
                >
                  <div className="flex items-center gap-1.5 text-[#1B5E43] font-bold text-xs">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Ustadz</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 truncate">ustadz1@pondok.id</p>
                </button>

                {/* Wali */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("wali1@pondok.id", "password123")}
                  className="p-2.5 bg-amber-50/70 hover:bg-amber-100 rounded-xl border border-amber-200 transition text-left group"
                >
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Wali Santri</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 truncate">wali1@pondok.id</p>
                </button>

                {/* Pimpinan */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin("pimpinan@pondok.id", "password123")}
                  className="p-2.5 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition text-left group"
                >
                  <div className="flex items-center gap-1.5 text-[#1B5E43] font-bold text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>Pimpinan</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5 truncate">pimpinan@pondok.id</p>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 text-center">
                <Link
                  href="/docs"
                  className="text-[11px] font-bold text-[#1B5E43] hover:text-[#154a34] inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg border border-emerald-200 transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Dokumentasi & Bantuan
                </Link>
              </div>
            </div>
          </div>
        </div>
       </main>
     </div>
   );
 }
