"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Bell, LogOut, UserCheck } from "lucide-react";

interface HeaderNavProps {
  user: {
    namaLengkap: string;
    email: string;
    role: string;
  };
  overdueCount?: number;
}

export default function HeaderNav({ user, overdueCount = 0 }: HeaderNavProps) {
  const router = useRouter();
  const [showNotif, setShowNotif] = useState(false);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator Pondok";
      case "ustadz":
        return "Ustadz Pembimbing";
      case "wali":
        return "Wali Santri";
      case "pimpinan":
        return "Pimpinan Pesantren";
      default:
        return "Pengguna";
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  return (
    <header className="bg-[#1B5E43] text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight flex items-center gap-1.5 text-white">
              Mutaba'ah Santri
              <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-1.5 py-0.5 rounded">
                PESANTREN
              </span>
            </span>
            <p className="text-[11px] text-emerald-100/80 leading-none hidden sm:block">
              Sistem Monitoring Hafalan Al-Qur'an & Kitab
            </p>
          </div>
        </div>

        {/* User Role Badge & Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="p-2 rounded-lg hover:bg-emerald-800 transition relative"
              title="Notifikasi Santri"
            >
              <Bell className="w-5 h-5 text-emerald-100" />
              {overdueCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#1B5E43]">
                  {overdueCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-zinc-800 rounded-xl shadow-xl border border-zinc-200 p-4 z-50">
                <h4 className="font-bold text-sm text-[#1B5E43] border-b pb-2 flex items-center justify-between">
                  <span>Pemberitahuan Santri</span>
                  <span className="text-xs font-normal text-zinc-500">
                    {overdueCount} perlu perhatian
                  </span>
                </h4>
                <div className="mt-3 text-xs space-y-2 max-h-60 overflow-y-auto">
                  {overdueCount > 0 ? (
                    <p className="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      Ada <strong>{overdueCount} santri</strong> yang belum menyetorkan hafalan lebih dari 3 hari terakhir.
                    </p>
                  ) : (
                    <p className="text-zinc-500 text-center py-2">
                      Alhamdulillah, semua santri aktif menyetor tepat waktu.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-white leading-tight">
              {user.namaLengkap}
            </div>
            <div className="text-[11px] text-amber-300 font-medium">
              {getRoleLabel(user.role)}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-emerald-800/80 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition border border-emerald-700/50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
