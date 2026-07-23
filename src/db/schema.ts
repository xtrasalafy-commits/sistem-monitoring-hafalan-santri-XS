import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  namaLengkap: text("nama_lengkap").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(), // 'admin' | 'ustadz' | 'wali' | 'pimpinan'
  noHp: text("no_hp"),
  isActive: boolean("is_active").default(true),
  fotoUrl: text("foto_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const halaqah = pgTable("halaqah", {
  id: serial("id").primaryKey(),
  namaHalaqah: text("nama_halaqah").notNull(),
  ustadzId: integer("ustadz_id").references(() => profiles.id),
  jadwal: text("jadwal"),
  keterangan: text("keterangan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const santri = pgTable("santri", {
  id: serial("id").primaryKey(),
  nis: text("nis").notNull().unique(),
  namaLengkap: text("nama_lengkap").notNull(),
  jenisKelamin: text("jenis_kelamin").notNull(), // 'putra' | 'putri'
  tanggalLahir: text("tanggal_lahir"),
  kelas: text("kelas").notNull(),
  kamar: text("kamar"),
  halaqahId: integer("halaqah_id").references(() => halaqah.id),
  waliId: integer("wali_id").references(() => profiles.id),
  status: text("status").notNull().default("aktif"), // 'aktif' | 'lulus' | 'keluar'
  fotoUrl: text("foto_url"),
  targetJuz: integer("target_juz").default(30),
  createdAt: timestamp("created_at").defaultNow(),
});

export const setoranQuran = pgTable("setoran_quran", {
  id: serial("id").primaryKey(),
  santriId: integer("santri_id").notNull().references(() => santri.id),
  ustadzId: integer("ustadz_id").notNull().references(() => profiles.id),
  tanggal: text("tanggal").notNull(), // YYYY-MM-DD
  jenis: text("jenis").notNull(), // 'hafalan_baru' | 'murajaah' | 'tasmi' | 'perbaikan'
  nomorSurah: integer("nomor_surah").notNull(),
  namaSurah: text("nama_surah").notNull(),
  ayatMulai: integer("ayat_mulai").notNull(),
  ayatSelesai: integer("ayat_selesai").notNull(),
  juz: integer("juz").notNull(),
  nilaiKelancaran: integer("nilai_kelancaran").notNull().default(85),
  nilaiTajwid: integer("nilai_tajwid").notNull().default(85),
  nilaiMakhraj: integer("nilai_makhraj").notNull().default(85),
  status: text("status").notNull().default("lulus"), // 'lulus' | 'mengulang' | 'perlu_murajaah'
  catatan: text("catatan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const setoranKitab = pgTable("setoran_kitab", {
  id: serial("id").primaryKey(),
  santriId: integer("santri_id").notNull().references(() => santri.id),
  ustadzId: integer("ustadz_id").notNull().references(() => profiles.id),
  tanggal: text("tanggal").notNull(),
  namaKitab: text("nama_kitab").notNull(),
  bagian: text("bagian").notNull(),
  nilaiHafalan: integer("nilai_hafalan").notNull().default(85),
  nilaiBacaan: integer("nilai_bacaan").notNull().default(85),
  nilaiPemahaman: integer("nilai_pemahaman").notNull().default(85),
  status: text("status").notNull().default("lulus"), // 'lulus' | 'mengulang'
  catatan: text("catatan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const targetHafalan = pgTable("target_hafalan", {
  id: serial("id").primaryKey(),
  santriId: integer("santri_id").references(() => santri.id),
  halaqahId: integer("halaqah_id").references(() => halaqah.id),
  jenisTarget: text("jenis_target").notNull(), // 'mingguan' | 'bulanan' | 'semester'
  deskripsiTarget: text("deskripsi_target").notNull(),
  tanggalMulai: text("tanggal_mulai").notNull(),
  tanggalSelesai: text("tanggal_selesai").notNull(),
  status: text("status").notNull().default("berjalan"), // 'berjalan' | 'tercapai' | 'tidak_tercapai'
  createdAt: timestamp("created_at").defaultNow(),
});

export const pengaturanPesantren = pgTable("pengaturan_pesantren", {
  id: serial("id").primaryKey(),
  namaPondok: text("nama_pondok").notNull().default("Pondok Pesantren Tahfizh Darul Huffazh"),
  alamat: text("alamat").default("Jl. Raya Pesantren KM 7, Cisarua, Bogor, Jawa Barat"),
  tahunAjaran: text("tahun_ajaran").default("2025/2026"),
  semester: text("semester").default("Genap"),
  logoText: text("logo_text").default("Mutaba'ah Santri"),
});
