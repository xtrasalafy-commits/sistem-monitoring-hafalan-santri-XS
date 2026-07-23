import { NextResponse } from "next/server";
import { db } from "@/db";
import { setoranKitab, santri, profiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const santriId = searchParams.get("santriId");

    const allRecords = await db.select().from(setoranKitab).orderBy(desc(setoranKitab.tanggal), desc(setoranKitab.id));
    const allSantri = await db.select().from(santri);
    const allProfiles = await db.select().from(profiles);

    const enriched = allRecords.map((sk) => {
      const s = allSantri.find((item) => item.id === sk.santriId);
      const u = allProfiles.find((item) => item.id === sk.ustadzId);
      return {
        ...sk,
        namaSantri: s?.namaLengkap || "Santri",
        namaUstadz: u?.namaLengkap || "Ustadz",
      };
    });

    let filtered = enriched;
    if (santriId) {
      filtered = filtered.filter((item) => item.santriId === parseInt(santriId));
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (err: unknown) {
    console.error("Error fetching setoran kitab:", err);
    return NextResponse.json({ error: "Gagal mengambil data setoran kitab" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { santriId, ustadzId, tanggal, namaKitab, bagian, nilaiHafalan, nilaiBacaan, nilaiPemahaman, status, catatan } = body;

    if (!santriId || !ustadzId || !namaKitab || !bagian) {
      return NextResponse.json({ error: "Mohon lengkapi nama kitab dan bagian/bab" }, { status: 400 });
    }

    const inserted = await db
      .insert(setoranKitab)
      .values({
        santriId: parseInt(santriId),
        ustadzId: parseInt(ustadzId),
        tanggal: tanggal || new Date().toISOString().split("T")[0],
        namaKitab,
        bagian,
        nilaiHafalan: parseInt(nilaiHafalan) || 85,
        nilaiBacaan: parseInt(nilaiBacaan) || 85,
        nilaiPemahaman: parseInt(nilaiPemahaman) || 85,
        status: status || "lulus",
        catatan: catatan || "",
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    console.error("Error creating setoran kitab:", err);
    return NextResponse.json({ error: "Gagal menyimpan setoran kitab" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID diperlukan" }, { status: 400 });

    await db.delete(setoranKitab).where(eq(setoranKitab.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal menghapus setoran kitab" }, { status: 500 });
  }
}
