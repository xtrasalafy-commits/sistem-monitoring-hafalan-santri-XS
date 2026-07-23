import { NextResponse } from "next/server";
import { db } from "@/db";
import { santri, halaqah, profiles, setoranQuran } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const halaqahIdParam = searchParams.get("halaqahId");
    const waliIdParam = searchParams.get("waliId");

    const santriList = await db.select().from(santri).orderBy(santri.namaLengkap);
    const halaqahList = await db.select().from(halaqah);
    const profilesList = await db.select().from(profiles);
    const allSetoran = await db
      .select()
      .from(setoranQuran)
      .orderBy(desc(setoranQuran.tanggal), desc(setoranQuran.id));

    // Combine enriched data
    const enriched = santriList.map((s) => {
      const h = halaqahList.find((item) => item.id === s.halaqahId);
      const w = profilesList.find((item) => item.id === s.waliId);
      const u = h ? profilesList.find((item) => item.id === h.ustadzId) : null;

      const santriSetoran = allSetoran.filter((sq) => sq.santriId === s.id);
      const lastSetoran = santriSetoran[0] || null;

      // Unique completed juz from 'hafalan_baru' or 'lulus'
      const completedJuzSet = new Set(
        santriSetoran
          .filter((sq) => sq.status === "lulus")
          .map((sq) => sq.juz)
      );

      return {
        ...s,
        namaHalaqah: h?.namaHalaqah || "Belum ditentukan",
        namaWali: w?.namaLengkap || "Belum ditentukan",
        namaUstadz: u?.namaLengkap || "Belum ditentukan",
        ustadzId: u?.id || null,
        totalSetoran: santriSetoran.length,
        juzTuntas: completedJuzSet.size,
        lastSetoranTanggal: lastSetoran?.tanggal || null,
        lastSetoranSurah: lastSetoran?.namaSurah || null,
      };
    });

    let filtered = enriched;
    if (halaqahIdParam) {
      filtered = filtered.filter((s) => s.halaqahId === parseInt(halaqahIdParam));
    }
    if (waliIdParam) {
      filtered = filtered.filter((s) => s.waliId === parseInt(waliIdParam));
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (err: unknown) {
    console.error("Error fetching santri:", err);
    return NextResponse.json(
      { error: "Gagal mengambil data santri" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nis,
      namaLengkap,
      jenisKelamin,
      tanggalLahir,
      kelas,
      kamar,
      halaqahId,
      waliId,
      targetJuz,
    } = body;

    if (!nis || !namaLengkap || !jenisKelamin || !kelas) {
      return NextResponse.json(
        { error: "Mohon lengkapi data wajib (NIS, Nama Lengkap, Jenis Kelamin, Kelas)" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(santri)
      .values({
        nis,
        namaLengkap,
        jenisKelamin,
        tanggalLahir: tanggalLahir || null,
        kelas,
        kamar: kamar || null,
        halaqahId: halaqahId ? parseInt(halaqahId) : null,
        waliId: waliId ? parseInt(waliId) : null,
        targetJuz: targetJuz ? parseInt(targetJuz) : 30,
        status: "aktif",
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    console.error("Error creating santri:", err);
    return NextResponse.json(
      { error: "Gagal menambahkan santri. Pastikan NIS belum terdaftar." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nis, namaLengkap, jenisKelamin, tanggalLahir, kelas, kamar, halaqahId, waliId, status, targetJuz } = body;

    if (!id) {
      return NextResponse.json({ error: "ID santri diperlukan" }, { status: 400 });
    }

    const updated = await db
      .update(santri)
      .set({
        nis,
        namaLengkap,
        jenisKelamin,
        tanggalLahir: tanggalLahir || null,
        kelas,
        kamar: kamar || null,
        halaqahId: halaqahId ? parseInt(halaqahId) : null,
        waliId: waliId ? parseInt(waliId) : null,
        status: status || "aktif",
        targetJuz: targetJuz ? parseInt(targetJuz) : 30,
      })
      .where(eq(santri.id, parseInt(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (err: unknown) {
    console.error("Error updating santri:", err);
    return NextResponse.json({ error: "Gagal memperbarui data santri" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID santri diperlukan" }, { status: 400 });
    }

    await db.delete(santri).where(eq(santri.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error deleting santri:", err);
    return NextResponse.json({ error: "Gagal menghapus santri" }, { status: 500 });
  }
}
