import Link from "next/link";
import {
  BookOpen,
  Server,
  Database,
  ShieldCheck,
  Users,
  GraduationCap,
  Monitor,
  Download,
  ExternalLink,
  Heart,
  Code2,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF7] flex flex-col">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B5E43] to-[#247c59] text-white rounded-3xl p-8 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                Mutaba&apos;ah Santri
              </h1>
              <p className="text-emerald-100 text-sm">
                Dokumentasi Lengkap Sistem Monitoring Hafalan
              </p>
            </div>
          </div>
          <p className="text-emerald-50 text-sm max-w-3xl leading-relaxed">
            Sistem monitoring hafalan Al-Qur&apos;an dan kitab pondok pesantren yang
            gratis, bebas iklan, dan sepenuhnya open source. Dikembangkan untuk
            membina disiplin santri dalam mengejar hafalan Qur&apos;an.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold bg-emerald-800/40 text-amber-200 px-3 py-1 rounded-full border border-emerald-600/40">
              Next.js 16
            </span>
            <span className="text-[10px] font-bold bg-emerald-800/40 text-amber-200 px-3 py-1 rounded-full border border-emerald-600/40">
              React 19
            </span>
            <span className="text-[10px] font-bold bg-emerald-800/40 text-amber-200 px-3 py-1 rounded-full border border-emerald-600/40">
              TypeScript
            </span>
            <span className="text-[10px] font-bold bg-emerald-800/40 text-amber-200 px-3 py-1 rounded-full border border-emerald-600/40">
              PostgreSQL
            </span>
            <span className="text-[10px] font-bold bg-emerald-800/40 text-amber-200 px-3 py-1 rounded-full border border-emerald-600/40">
              Drizzle ORM
            </span>
            <span className="text-[10px] font-bold bg-emerald-800/40 text-amber-200 px-3 py-1 rounded-full border border-emerald-600/40">
              Tailwind CSS
            </span>
          </div>
        </div>

        {/* Download CTA */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1B5E43] flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Source Code
            </h2>
            <p className="text-xs text-zinc-600 mt-1">
              Repositori ini bersifat open source. Silakan clone, fork, atau
              distribusi sesuai kebutuhan pondok pesantren Anda.
            </p>
          </div>
          <a
            href="https://github.com/xtrasalafy-commits/sistem-monitoring-hafalan-santri-XS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1B5E43] hover:bg-[#154a34] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-md cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            Kunjungi Repository
          </a>
        </div>

        {/* Main Documentation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Main Docs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fitur Utama */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#1B5E43] flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Fitur Utama
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: <Users className="w-4 h-4" />,
                    title: "Multi-Role Access",
                    desc: "Admin, Ustadz, Wali Santri, dan Pimpinan dengan dashboard masing-masing.",
                  },
                  {
                    icon: <GraduationCap className="w-4 h-4" />,
                    title: "Manajemen Santri",
                    desc: "CRUD data santri, halaqah, dan wali santri.",
                  },
                  {
                    icon: <BookOpen className="w-4 h-4" />,
                    title: "Setoran Al-Qur&apos;an & Kitab",
                    desc: "Input hafalan baru, muraja&apos;ah, tasmi&apos;, dan setoran kitab.",
                  },
                  {
                    icon: <Database className="w-4 h-4" />,
                    title: "Database PostgreSQL",
                    desc: "Penyimpanan data terstruktur dengan Drizzle ORM.",
                  },
                  {
                    icon: <ShieldCheck className="w-4 h-4" />,
                    title: "Autentikasi & Session",
                    desc: "Login berbasis cookie dengan role-based access.",
                  },
                  {
                    icon: <Monitor className="w-4 h-4" />,
                    title: "Dashboard Statistik",
                    desc: "Grafik tren setoran, peringkat halaqah, dan notifikasi overdue.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 space-y-1"
                  >
                    <div className="flex items-center gap-2 text-[#1B5E43]">
                      {item.icon}
                      <h4 className="text-xs font-bold">{item.title}</h4>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Struktur Proyek */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#1B5E43] flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Struktur Proyek
              </h3>
              <div className="bg-zinc-900 text-emerald-100 rounded-2xl p-4 text-xs font-mono overflow-x-auto space-y-1">
                <p>sistem-monitoring-hafalan-santri-XS/</p>
                <p className="pl-4 text-zinc-400">.env</p>
                <p className="pl-4 text-zinc-400">drizzle.config.json</p>
                <p className="pl-4 text-zinc-400">next.config.ts</p>
                <p className="pl-4 text-zinc-400">package.json</p>
                <p className="pl-4 text-zinc-400">tsconfig.json</p>
                <p className="mt-2">src/</p>
                <p className="pl-4">app/</p>
                <p className="pl-8 text-zinc-400">layout.tsx</p>
                <p className="pl-8 text-zinc-400">page.tsx</p>
                <p className="pl-8 text-zinc-400">login/page.tsx</p>
                <p className="pl-8 text-zinc-400">admin/page.tsx</p>
                <p className="pl-8 text-zinc-400">ustadz/page.tsx</p>
                <p className="pl-8 text-zinc-400">wali/page.tsx</p>
                <p className="pl-8 text-zinc-400">pimpinan/page.tsx</p>
                <p className="pl-8 text-zinc-400">api/</p>
                <p className="pl-8 text-zinc-400">(semua route handler)</p>
                <p className="pl-4">components/</p>
                <p className="pl-8 text-zinc-400">HeaderNav.tsx</p>
                <p className="pl-8 text-zinc-400">PetaHafalanGrid.tsx</p>
                <p className="pl-8 text-zinc-400">TrakteerWidget.tsx</p>
                <p className="pl-4">db/</p>
                <p className="pl-8 text-zinc-400">schema.ts</p>
                <p className="pl-8 text-zinc-400">index.ts</p>
                <p className="pl-8 text-zinc-400">seed.ts</p>
                <p className="pl-4">lib/</p>
                <p className="pl-8 text-zinc-400">auth.ts</p>
                <p className="pl-8 text-zinc-400">format.ts</p>
                <p className="pl-8 text-zinc-400">quranData.ts</p>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#1B5E43] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Daftar API Endpoints
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { method: "POST", path: "/api/auth/login", desc: "Login user" },
                  { method: "GET", path: "/api/auth/me", desc: "Get current session" },
                  { method: "POST", path: "/api/auth/logout", desc: "Logout user" },
                  { method: "GET", path: "/api/stats", desc: "Statistik global" },
                  { method: "GET", path: "/api/santri", desc: "List santri" },
                  { method: "POST", path: "/api/santri", desc: "Tambah santri" },
                  { method: "PUT", path: "/api/santri", desc: "Update santri" },
                  { method: "DELETE", path: "/api/santri", desc: "Hapus santri" },
                  { method: "GET", path: "/api/ustadz", desc: "List ustadz" },
                  { method: "POST", path: "/api/ustadz", desc: "Tambah ustadz" },
                  { method: "GET", path: "/api/wali", desc: "List wali santri" },
                  { method: "POST", path: "/api/wali", desc: "Tambah wali" },
                  { method: "GET", path: "/api/halaqah", desc: "List halaqah" },
                  { method: "POST", path: "/api/halaqah", desc: "Tambah halaqah" },
                  { method: "GET", path: "/api/target", desc: "List target hafalan" },
                  { method: "POST", path: "/api/target", desc: "Tambah target" },
                  { method: "PUT", path: "/api/target", desc: "Update target" },
                  { method: "GET", path: "/api/setoran-quran", desc: "List setoran Quran" },
                  { method: "POST", path: "/api/setoran-quran", desc: "Tambah setoran" },
                  { method: "DELETE", path: "/api/setoran-quran", desc: "Hapus setoran" },
                  { method: "GET", path: "/api/setoran-kitab", desc: "List setoran kitab" },
                  { method: "POST", path: "/api/setoran-kitab", desc: "Tambah setoran kitab" },
                  { method: "GET", path: "/api/pengaturan", desc: "Pengaturan pesantren" },
                  { method: "POST", path: "/api/pengaturan", desc: "Update pengaturan" },
                  { method: "GET", path: "/api/health", desc: "Health check DB" },
                ].map((api, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 bg-zinc-50"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          api.method === "GET"
                            ? "bg-emerald-100 text-emerald-800"
                            : api.method === "POST"
                            ? "bg-blue-100 text-blue-800"
                            : api.method === "PUT"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {api.method}
                      </span>
                      <code className="text-[11px] font-mono text-zinc-700">
                        {api.path}
                      </code>
                    </div>
                    <span className="text-[11px] text-zinc-500 hidden sm:inline">
                      {api.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cara Menjalankan */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#1B5E43] flex items-center gap-2">
                <Server className="w-5 h-5" />
                Cara Menjalankan Aplikasi
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-zinc-900 text-emerald-100 rounded-2xl font-mono space-y-1">
                  <p># 1. Clone repository</p>
                  <p className="text-zinc-400">git clone https://github.com/xtrasalafy-commits/sistem-monitoring-hafalan-santri-XS.git</p>
                  <p className="mt-2"># 2. Masuk direktori</p>
                  <p className="text-zinc-400">cd sistem-monitoring-hafalan-santri-XS</p>
                  <p className="mt-2"># 3. Install dependencies</p>
                  <p className="text-zinc-400">bun install</p>
                  <p className="mt-2"># 4. Setup environment</p>
                  <p className="text-zinc-400">cp .env.example .env  # lalu isi DATABASE_URL</p>
                  <p className="mt-2"># 5. Push schema database</p>
                  <p className="text-zinc-400">bunx drizzle-kit push</p>
                  <p className="mt-2"># 6. Seed data awal (opsional)</p>
                  <p className="text-zinc-400">bun run src/db/runSeed.ts</p>
                  <p className="mt-2"># 7. Jalankan dev server</p>
                  <p className="text-zinc-400">bun run dev</p>
                  <p className="mt-2 text-amber-200"># Buka http://localhost:3000</p>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  Pastikan PostgreSQL sudah berjalan dan dapat diakses via
                  DATABASE_URL. Untuk database produksi, disarankan menggunakan
                  Neon, Supabase, atau server PostgreSQL sendiri.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="space-y-6">
            {/* Akun Demo */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#1B5E43] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Akun Demo
              </h3>
              <div className="space-y-2 text-[11px]">
                {[
                  { role: "Admin", email: "admin@pondok.id" },
                  { role: "Ustadz", email: "ustadz1@pondok.id" },
                  { role: "Wali", email: "wali1@pondok.id" },
                  { role: "Pimpinan", email: "pimpinan@pondok.id" },
                ].map((acc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl border border-zinc-200 bg-zinc-50"
                  >
                    <span className="font-bold text-zinc-700">{acc.role}</span>
                    <code className="text-zinc-600">{acc.email}</code>
                  </div>
                ))}
                <p className="text-zinc-500 pt-1">Password untuk semua akun: password123</p>
              </div>
            </div>

            {/* Teknologi */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#1B5E43] flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Teknologi
              </h3>
              <div className="space-y-2 text-[11px]">
                {[
                  { name: "Next.js 16", desc: "React framework" },
                  { name: "React 19", desc: "UI library" },
                  { name: "TypeScript", desc: "Type safety" },
                  { name: "PostgreSQL", desc: "Database" },
                  { name: "Drizzle ORM", desc: "Database toolkit" },
                  { name: "Tailwind CSS", desc: "Styling" },
                  { name: "Recharts", desc: "Data visualization" },
                  { name: "Lucide React", desc: "Icons" },
                ].map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl border border-zinc-200"
                  >
                    <span className="font-bold text-zinc-800">{tech.name}</span>
                    <span className="text-zinc-500">{tech.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kontribusi */}
            <div className="bg-gradient-to-br from-[#1B5E43] to-[#247c59] rounded-3xl p-5 text-white space-y-3 shadow-md">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-300" />
                Dukung Pengembangan
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Aplikasi ini sepenuhnya gratis dan bebas iklan. Jika Anda merasa
                terbantu, Anda bisa mensupport pengembangan selanjutnya dengan
                menekan widget traktir kopi di pojok kanan bawah layar.
              </p>
              <a
                href="https://trakteer.id/perpus_opera/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-4 py-2 rounded-xl text-xs font-bold transition w-full justify-center"
              >
                Traktir Kopi
              </a>
            </div>

            {/* License */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-[#1B5E43]">Lisensi & Atribusi</h3>
              <p className="text-[11px] text-zinc-600 leading-relaxed">
                Open Source oleh <strong>MZF</strong> - 2026. Dilisensikan untuk
                penggunaan pondok pesantren dan pendidikan Islam. Silakan
                dimodifikasi dan disebarkan dengan tetap mencantumkan atribusi
                asli.
              </p>
              <div className="pt-2 border-t border-zinc-100">
                <Link
                  href="/"
                  className="text-[11px] font-bold text-[#1B5E43] hover:text-[#154a34] flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Kembali ke Aplikasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
