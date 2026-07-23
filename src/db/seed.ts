import { db } from "./index";
import { profiles, halaqah, santri, setoranQuran, setoranKitab, targetHafalan, pengaturanPesantren } from "./schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  console.log("Seeding database Mutaba'ah Santri...");

  // Clear existing data safely
  await db.execute(sql`TRUNCATE TABLE target_hafalan, setoran_kitab, setoran_quran, santri, halaqah, profiles, pengaturan_pesantren RESTART IDENTITY CASCADE`);

  // 1. Profiles
  const insertedProfiles = await db
    .insert(profiles)
    .values([
      {
        namaLengkap: "Ustadz Fauzan Ahmad, S.Pd.I",
        email: "admin@pondok.id",
        passwordHash: "password123",
        role: "admin",
        noHp: "0812-3456-7890",
        isActive: true,
      },
      {
        namaLengkap: "Ustadz Ahmad Al-Hafizh, Lc.",
        email: "ustadz1@pondok.id",
        passwordHash: "password123",
        role: "ustadz",
        noHp: "0813-8888-1111",
        isActive: true,
      },
      {
        namaLengkap: "Ustadz Muhammad Zaki, Al-Hafizh",
        email: "ustadz2@pondok.id",
        passwordHash: "password123",
        role: "ustadz",
        noHp: "0813-8888-2222",
        isActive: true,
      },
      {
        namaLengkap: "Bpk. Hendra Gunawan, S.T.",
        email: "wali1@pondok.id",
        passwordHash: "password123",
        role: "wali",
        noHp: "0812-9999-3333",
        isActive: true,
      },
      {
        namaLengkap: "Ibu Hj. Siti Rahma, S.Pd.",
        email: "wali2@pondok.id",
        passwordHash: "password123",
        role: "wali",
        noHp: "0812-9999-4444",
        isActive: true,
      },
      {
        namaLengkap: "K.H. Abdullah Syukri, Lc., M.A.",
        email: "pimpinan@pondok.id",
        passwordHash: "password123",
        role: "pimpinan",
        noHp: "0811-7777-5555",
        isActive: true,
      },
    ])
    .returning();

  const adminUser = insertedProfiles[0];
  const ustadz1 = insertedProfiles[1];
  const ustadz2 = insertedProfiles[2];
  const wali1 = insertedProfiles[3];
  const wali2 = insertedProfiles[4];

  // 2. Halaqah
  const insertedHalaqah = await db
    .insert(halaqah)
    .values([
      {
        namaHalaqah: "Halaqah Utsman bin Affan (Takhassus Putra)",
        ustadzId: ustadz1.id,
        jadwal: "Ba'da Subuh & Ba'da Maghrib",
        keterangan: "Fokus Ziyadah & Mutqin 30 Juz",
      },
      {
        namaHalaqah: "Halaqah Ali bin Abi Thalib (Reguler Putra)",
        ustadzId: ustadz2.id,
        jadwal: "Ba'da Subuh & Ba'da Ashar",
        keterangan: "Fokus Hafalan Juz 28 - 30 & Matan Tajwid",
      },
      {
        namaHalaqah: "Halaqah Khadijah Al-Kubra (Putri)",
        ustadzId: ustadz1.id,
        jadwal: "Ba'da Subuh & Ba'da Ashar",
        keterangan: "Fokus Tahsin dan Hafalan Juz 1 - 5",
      },
    ])
    .returning();

  const halaqah1 = insertedHalaqah[0];
  const halaqah2 = insertedHalaqah[1];
  const halaqah3 = insertedHalaqah[2];

  // 3. Santri (15 santri)
  const insertedSantri = await db
    .insert(santri)
    .values([
      {
        nis: "2024001",
        namaLengkap: "Muhammad Farhan Al-Ghifari",
        jenisKelamin: "putra",
        tanggalLahir: "2010-04-12",
        kelas: "Kelas 8 Takhassus",
        kamar: "Asrama Abu Bakar No. 03",
        halaqahId: halaqah1.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 30,
      },
      {
        nis: "2024002",
        namaLengkap: "Aisyah Zahra Al-Munawwarah",
        jenisKelamin: "putri",
        tanggalLahir: "2011-08-20",
        kelas: "Kelas 7 Putri A",
        kamar: "Asrama Aisyah No. 01",
        halaqahId: halaqah3.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 15,
      },
      {
        nis: "2024003",
        namaLengkap: "Zaid bin Tsabit Ramadhan",
        jenisKelamin: "putra",
        tanggalLahir: "2009-11-05",
        kelas: "Kelas 9 Takhassus",
        kamar: "Asrama Umar No. 02",
        halaqahId: halaqah1.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 30,
      },
      {
        nis: "2024004",
        namaLengkap: "Fathir Rasyid Robbani",
        jenisKelamin: "putra",
        tanggalLahir: "2010-01-15",
        kelas: "Kelas 8A",
        kamar: "Asrama Abu Bakar No. 05",
        halaqahId: halaqah2.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 10,
      },
      {
        nis: "2024005",
        namaLengkap: "Bilal Ihsan Maulana",
        jenisKelamin: "putra",
        tanggalLahir: "2010-06-18",
        kelas: "Kelas 8A",
        kamar: "Asrama Abu Bakar No. 02",
        halaqahId: halaqah2.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 10,
      },
      {
        nis: "2024006",
        namaLengkap: "Abdullah Faqih Syamil",
        jenisKelamin: "putra",
        tanggalLahir: "2009-03-25",
        kelas: "Kelas 9B",
        kamar: "Asrama Umar No. 07",
        halaqahId: halaqah1.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 30,
      },
      {
        nis: "2024007",
        namaLengkap: "Fatimah Az-Zahra",
        jenisKelamin: "putri",
        tanggalLahir: "2011-02-14",
        kelas: "Kelas 7 Putri B",
        kamar: "Asrama Hafshah No. 04",
        halaqahId: halaqah3.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 15,
      },
      {
        nis: "2024008",
        namaLengkap: "Salman Al-Farisi Hakim",
        jenisKelamin: "putra",
        tanggalLahir: "2010-09-10",
        kelas: "Kelas 8B",
        kamar: "Asrama Ali No. 01",
        halaqahId: halaqah2.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 10,
      },
      {
        nis: "2024009",
        namaLengkap: "Thoriq Ziyad Al-Mubarok",
        jenisKelamin: "putra",
        tanggalLahir: "2009-12-01",
        kelas: "Kelas 9 Takhassus",
        kamar: "Asrama Umar No. 04",
        halaqahId: halaqah1.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 30,
      },
      {
        nis: "2024010",
        namaLengkap: "Maryam Sholihatunnisa",
        jenisKelamin: "putri",
        tanggalLahir: "2011-05-30",
        kelas: "Kelas 7 Putri A",
        kamar: "Asrama Aisyah No. 03",
        halaqahId: halaqah3.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 15,
      },
      {
        nis: "2024011",
        namaLengkap: "Raihan Aditya Pratama",
        jenisKelamin: "putra",
        tanggalLahir: "2010-07-22",
        kelas: "Kelas 8B",
        kamar: "Asrama Ali No. 03",
        halaqahId: halaqah2.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 10,
      },
      {
        nis: "2024012",
        namaLengkap: "Khansa Nabila Zahirah",
        jenisKelamin: "putri",
        tanggalLahir: "2011-10-11",
        kelas: "Kelas 7 Putri B",
        kamar: "Asrama Hafshah No. 02",
        halaqahId: halaqah3.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 15,
      },
      {
        nis: "2024013",
        namaLengkap: "Hamzah Asadullah",
        jenisKelamin: "putra",
        tanggalLahir: "2009-08-19",
        kelas: "Kelas 9A",
        kamar: "Asrama Abu Bakar No. 06",
        halaqahId: halaqah1.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 20,
      },
      {
        nis: "2024014",
        namaLengkap: "Ibrahim Khalilullah",
        jenisKelamin: "putra",
        tanggalLahir: "2010-04-03",
        kelas: "Kelas 8A",
        kamar: "Asrama Ali No. 05",
        halaqahId: halaqah2.id,
        waliId: wali2.id,
        status: "aktif",
        targetJuz: 15,
      },
      {
        nis: "2024015",
        namaLengkap: "Naila Husna Syakira",
        jenisKelamin: "putri",
        tanggalLahir: "2011-12-25",
        kelas: "Kelas 7 Putri A",
        kamar: "Asrama Aisyah No. 05",
        halaqahId: halaqah3.id,
        waliId: wali1.id,
        status: "aktif",
        targetJuz: 10,
      },
    ])
    .returning();

  const s1 = insertedSantri[0]; // Farhan (wali 1)
  const s2 = insertedSantri[1]; // Aisyah (wali 1)
  const s3 = insertedSantri[2]; // Zaid (wali 2)
  const s4 = insertedSantri[3]; // Fathir
  const s5 = insertedSantri[4]; // Bilal

  // 4. Setoran Al-Qur'an (60+ records spanning recent dates)
  const todayStr = new Date().toISOString().split("T")[0];
  const dMinus1 = new Date(Date.now() - 86400000 * 1).toISOString().split("T")[0];
  const dMinus2 = new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0];
  const dMinus3 = new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0];
  const dMinus5 = new Date(Date.now() - 86400000 * 5).toISOString().split("T")[0];
  const dMinus10 = new Date(Date.now() - 86400000 * 10).toISOString().split("T")[0];
  const dMinus20 = new Date(Date.now() - 86400000 * 20).toISOString().split("T")[0];
  const dMinus35 = new Date(Date.now() - 86400000 * 35).toISOString().split("T")[0];
  const dMinus60 = new Date(Date.now() - 86400000 * 60).toISOString().split("T")[0];

  const quranSetorans = [
    // Farhan (Active high achiever, multiple completed juz)
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: todayStr,
      jenis: "hafalan_baru",
      nomorSurah: 78,
      namaSurah: "An-Naba'",
      ayatMulai: 1,
      ayatSelesai: 40,
      juz: 30,
      nilaiKelancaran: 95,
      nilaiTajwid: 92,
      nilaiMakhraj: 90,
      status: "lulus",
      catatan: "Alhamdulillah sangat lancar, makharijul huruf fasih.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus1,
      jenis: "hafalan_baru",
      nomorSurah: 79,
      namaSurah: "An-Nazi'at",
      ayatMulai: 1,
      ayatSelesai: 46,
      juz: 30,
      nilaiKelancaran: 92,
      nilaiTajwid: 90,
      nilaiMakhraj: 92,
      status: "lulus",
      catatan: "Bagus sekali, teruskan semangatnya.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus2,
      jenis: "hafalan_baru",
      nomorSurah: 80,
      namaSurah: "'Abasa",
      ayatMulai: 1,
      ayatSelesai: 42,
      juz: 30,
      nilaiKelancaran: 90,
      nilaiTajwid: 88,
      nilaiMakhraj: 88,
      status: "lulus",
      catatan: "Perhatikan hukum ikhfa haqiqi di ayat 15-20.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus5,
      jenis: "murajaah",
      nomorSurah: 67,
      namaSurah: "Al-Mulk",
      ayatMulai: 1,
      ayatSelesai: 30,
      juz: 29,
      nilaiKelancaran: 96,
      nilaiTajwid: 95,
      nilaiMakhraj: 94,
      status: "lulus",
      catatan: "Muraja'ah Juz 29 mutqin, siap tasmi'.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus10,
      jenis: "hafalan_baru",
      nomorSurah: 1,
      namaSurah: "Al-Fatihah",
      ayatMulai: 1,
      ayatSelesai: 7,
      juz: 1,
      nilaiKelancaran: 100,
      nilaiTajwid: 98,
      nilaiMakhraj: 98,
      status: "lulus",
      catatan: "Mumtaz jiddan.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus20,
      jenis: "hafalan_baru",
      nomorSurah: 2,
      namaSurah: "Al-Baqarah",
      ayatMulai: 1,
      ayatSelesai: 50,
      juz: 1,
      nilaiKelancaran: 88,
      nilaiTajwid: 86,
      nilaiMakhraj: 87,
      status: "lulus",
      catatan: "Lulus dengan baik, perhatikan mad thabi'i.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus35,
      jenis: "hafalan_baru",
      nomorSurah: 2,
      namaSurah: "Al-Baqarah",
      ayatMulai: 51,
      ayatSelesai: 141,
      juz: 1,
      nilaiKelancaran: 90,
      nilaiTajwid: 88,
      nilaiMakhraj: 90,
      status: "lulus",
      catatan: "Tuntas Juz 1 dengan nilai istimewa.",
    },
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus60,
      jenis: "hafalan_baru",
      nomorSurah: 2,
      namaSurah: "Al-Baqarah",
      ayatMulai: 142,
      ayatSelesai: 252,
      juz: 2,
      nilaiKelancaran: 91,
      nilaiTajwid: 89,
      nilaiMakhraj: 90,
      status: "lulus",
      catatan: "Tuntas Juz 2.",
    },

    // Aisyah Zahra (Putri, wali 1)
    {
      santriId: s2.id,
      ustadzId: ustadz1.id,
      tanggal: todayStr,
      jenis: "hafalan_baru",
      nomorSurah: 114,
      namaSurah: "An-Nas",
      ayatMulai: 1,
      ayatSelesai: 6,
      juz: 30,
      nilaiKelancaran: 98,
      nilaiTajwid: 96,
      nilaiMakhraj: 95,
      status: "lulus",
      catatan: "Bagus dan fasih sekali.",
    },
    {
      santriId: s2.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus1,
      jenis: "hafalan_baru",
      nomorSurah: 113,
      namaSurah: "Al-Falaq",
      ayatMulai: 1,
      ayatSelesai: 5,
      juz: 30,
      nilaiKelancaran: 95,
      nilaiTajwid: 94,
      nilaiMakhraj: 94,
      status: "lulus",
      catatan: "Qalqalah kubra sudah sangat tepat.",
    },
    {
      santriId: s2.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus3,
      jenis: "hafalan_baru",
      nomorSurah: 112,
      namaSurah: "Al-Ikhlash",
      ayatMulai: 1,
      ayatSelesai: 4,
      juz: 30,
      nilaiKelancaran: 100,
      nilaiTajwid: 96,
      nilaiMakhraj: 96,
      status: "lulus",
      catatan: "Sempurna.",
    },
    {
      santriId: s2.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus10,
      jenis: "hafalan_baru",
      nomorSurah: 67,
      namaSurah: "Al-Mulk",
      ayatMulai: 1,
      ayatSelesai: 30,
      juz: 29,
      nilaiKelancaran: 86,
      nilaiTajwid: 84,
      nilaiMakhraj: 85,
      status: "lulus",
      catatan: "Juz 29 berjalan lancar.",
    },

    // Zaid bin Tsabit (Wali 2, High achiever)
    {
      santriId: s3.id,
      ustadzId: ustadz1.id,
      tanggal: todayStr,
      jenis: "tasmi",
      nomorSurah: 36,
      namaSurah: "Ya Sin",
      ayatMulai: 1,
      ayatSelesai: 83,
      juz: 22,
      nilaiKelancaran: 96,
      nilaiTajwid: 94,
      nilaiMakhraj: 93,
      status: "lulus",
      catatan: "Tasmi' 1 surah penuh tanpa salah harakat.",
    },
    {
      santriId: s3.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus2,
      jenis: "hafalan_baru",
      nomorSurah: 56,
      namaSurah: "Al-Waqi'ah",
      ayatMulai: 1,
      ayatSelesai: 96,
      juz: 27,
      nilaiKelancaran: 92,
      nilaiTajwid: 90,
      nilaiMakhraj: 91,
      status: "lulus",
      catatan: "Lulus istimewa.",
    },
    {
      santriId: s3.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus10,
      jenis: "hafalan_baru",
      nomorSurah: 55,
      namaSurah: "Ar-Rahman",
      ayatMulai: 1,
      ayatSelesai: 78,
      juz: 27,
      nilaiKelancaran: 95,
      nilaiTajwid: 93,
      nilaiMakhraj: 92,
      status: "lulus",
      catatan: "Irama dan tartil sangat syahdu.",
    },

    // Fathir Rasyid (Halaqah 2 - Ustadz Zaki)
    {
      santriId: s4.id,
      ustadzId: ustadz2.id,
      tanggal: dMinus1,
      jenis: "hafalan_baru",
      nomorSurah: 87,
      namaSurah: "Al-A'la",
      ayatMulai: 1,
      ayatSelesai: 19,
      juz: 30,
      nilaiKelancaran: 82,
      nilaiTajwid: 80,
      nilaiMakhraj: 80,
      status: "lulus",
      catatan: "Lulus, perlu dilatih nafasnya.",
    },
    {
      santriId: s4.id,
      ustadzId: ustadz2.id,
      tanggal: dMinus5,
      jenis: "perbaikan",
      nomorSurah: 88,
      namaSurah: "Al-Ghasyiyah",
      ayatMulai: 1,
      ayatSelesai: 26,
      juz: 30,
      nilaiKelancaran: 70,
      nilaiTajwid: 68,
      nilaiMakhraj: 72,
      status: "mengulang",
      catatan: "Masih banyak ragu di ayat 10-16. Perlu diulang besok.",
    },

    // Bilal Ihsan (Note: Bilal hasn't setoran for 5 days -> triggers notification test!)
    {
      santriId: s5.id,
      ustadzId: ustadz2.id,
      tanggal: dMinus5,
      jenis: "hafalan_baru",
      nomorSurah: 93,
      namaSurah: "Adh-Dhuha",
      ayatMulai: 1,
      ayatSelesai: 11,
      juz: 30,
      nilaiKelancaran: 84,
      nilaiTajwid: 82,
      nilaiMakhraj: 83,
      status: "lulus",
      catatan: "Bagus, lanjutkan ke surah berikutnya.",
    },
  ];

  // Also add setoran records for other santri to give rich data
  for (let i = 5; i < insertedSantri.length; i++) {
    const santriObj = insertedSantri[i];
    const ustadzIdForSantri = santriObj.halaqahId === halaqah2.id ? ustadz2.id : ustadz1.id;
    // Alternate some dates: some today, some 4-6 days ago (so alerts trigger realistically)
    const dateToUse = i % 3 === 0 ? dMinus5 : i % 2 === 0 ? dMinus1 : todayStr;

    quranSetorans.push({
      santriId: santriObj.id,
      ustadzId: ustadzIdForSantri,
      tanggal: dateToUse,
      jenis: i % 2 === 0 ? "hafalan_baru" : "murajaah",
      nomorSurah: 78 + (i % 20),
      namaSurah: "An-Naba'",
      ayatMulai: 1,
      ayatSelesai: 20,
      juz: 30,
      nilaiKelancaran: 80 + (i % 18),
      nilaiTajwid: 82 + (i % 15),
      nilaiMakhraj: 81 + (i % 16),
      status: i === 7 ? "mengulang" : i === 11 ? "perlu_murajaah" : "lulus",
      catatan: "Setoran rutin halaqah.",
    });
  }

  await db.insert(setoranQuran).values(quranSetorans);

  // 5. Setoran Kitab
  await db.insert(setoranKitab).values([
    {
      santriId: s1.id,
      ustadzId: ustadz1.id,
      tanggal: todayStr,
      namaKitab: "Matan Al-Jazariyyah (Ilmu Tajwid)",
      bagian: "Bab Makharijul Huruf (Bait 1-17)",
      nilaiHafalan: 95,
      nilaiBacaan: 94,
      nilaiPemahaman: 90,
      status: "lulus",
      catatan: "Hafalan matan sangat mutqin, pemahaman teori fasih.",
    },
    {
      santriId: s3.id,
      ustadzId: ustadz1.id,
      tanggal: dMinus2,
      namaKitab: "Tuhfatul Athfal",
      bagian: "Ahkamun Nun As-Sakinah wat Tanwin (Bait 1-15)",
      nilaiHafalan: 92,
      nilaiBacaan: 90,
      nilaiPemahaman: 92,
      status: "lulus",
      catatan: "Sangat baik, menguasai 4 hukum nun sukun.",
    },
    {
      santriId: s4.id,
      ustadzId: ustadz2.id,
      tanggal: dMinus3,
      namaKitab: "Aqidatul Awam",
      bagian: "Sifat Wajib & Mustahil bagi Allah (Bait 1-10)",
      nilaiHafalan: 86,
      nilaiBacaan: 84,
      nilaiPemahaman: 85,
      status: "lulus",
      catatan: "Lulus, dilanjutkan ke bait berikutnya.",
    },
  ]);

  // 6. Target Hafalan
  await db.insert(targetHafalan).values([
    {
      santriId: s1.id,
      halaqahId: halaqah1.id,
      jenisTarget: "bulanan",
      deskripsiTarget: "Menyelesaikan Setoran Mutqin Juz 30 & Tasmi' Sekali Duduk",
      tanggalMulai: "2026-05-01",
      tanggalSelesai: "2026-05-31",
      status: "tercapai",
    },
    {
      santriId: s2.id,
      halaqahId: halaqah3.id,
      jenisTarget: "semester",
      deskripsiTarget: "Tuntas Hafalan Juz 30 dan Juz 29",
      tanggalMulai: "2026-01-05",
      tanggalSelesai: "2026-06-30",
      status: "berjalan",
    },
    {
      santriId: s5.id,
      halaqahId: halaqah2.id,
      jenisTarget: "bulanan",
      deskripsiTarget: "Menyelesaikan Surah Adh-Dhuha sampai An-Nas",
      tanggalMulai: "2026-05-01",
      tanggalSelesai: "2026-05-20",
      status: "tidak_tercapai",
    },
  ]);

  // 7. Pengaturan Pesantren
  await db.insert(pengaturanPesantren).values([
    {
      namaPondok: "Pondok Pesantren Tahfizh Darul Huffazh",
      alamat: "Jl. Raya Pesantren No. 99, Cisarua, Bogor, Jawa Barat",
      tahunAjaran: "2025/2026",
      semester: "Genap",
      logoText: "Mutaba'ah Santri",
    },
  ]);

  console.log("Database seeded successfully with Indonesian pesantren data!");
}
