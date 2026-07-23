import { NextResponse } from "next/server";
import { db } from "@/db";
import { setoranQuran, santri, profiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const santriId = searchParams.get("santriId");
    const ustadzId = searchParams.get("ustadzId");

    const query = db.select().from(setoranQuran).orderBy(desc(setoranQuran.tanggal), desc(setoranQuran.id));
    const allSetoran = await query;
    const allSantri = await db.select().from(santri);
    const allProfiles = await db.select().from(profiles);

    const enriched = allSetoran.map((sq) => {
      const s = allSantri.find((item) => item.id === sq.santriId);
      const u = allProfiles.find((item) => item.id === sq.ustadzId);
      return {
        ...sq,
        namaSantri: s?.namaLengkap || "Santri",
        nis: s?.nis || "",
        kelas: s?.kelas || "",
        namaUstadz: u?.namaLengkap || "Ustadz",
      };
    });

    let filtered = enriched;
    if (santriId) {
      filtered = filtered.filter((item) => item.santriId === parseInt(santriId));
    }
    if (ustadzId) {
      filtered = filtered.filter((item) => item.ustadzId === parseInt(ustadzId));
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (err: unknown) {
    console.error("Error fetching setoran quran:", err);
    return NextResponse.json({ error: "Gagal mengambil data setoran" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      santriId,
      ustadzId,
      tanggal,
      jenis,
      nomorSurah,
      namaSurah,
      ayatMulai,
      ayatSelesai,
      juz,
      nilaiKelancaran,
      nilaiTajwid,
      nilaiMakhraj,
      status,
      catatan,
    } = body;

    if (!santriId || !ustadzId || !nomorSurah || !namaSurah) {
      return NextResponse.json(
        { error: "Mohon lengkapi santri, surah, dan pembimbing" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(setoranQuran)
      .values({
        santriId: parseInt(santriId),
        ustadzId: parseInt(ustadzId),
        tanggal: tanggal || new Date().toISOString().split("T")[0],
        jenis: jenis || "hafalan_baru",
        nomorSurah: parseInt(nomorSurah),
        namaSurah,
        ayatMulai: parseInt(ayatMulai) || 1,
        ayatSelesai: parseInt(ayatSelesai) || 1,
        juz: parseInt(juz) || 30,
        nilaiKelancaran: parseInt(nilaiKelancaran) || 85,
        nilaiTajwid: parseInt(nilaiTajwid) || 85,
        nilaiMakhraj: parseInt(nilaiMakhraj) || 85,
        status: status || "lulus",
        catatan: catatan || "",
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    console.error("Error inserting setoran quran:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan setoran Al-Qur'an" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });

    await db.delete(setoranQuran).where(eq(setoranQuran.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal menghapus setoran" }, { status: 500 });
  }
}
