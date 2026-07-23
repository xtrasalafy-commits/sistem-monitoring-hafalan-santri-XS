import { NextResponse } from "next/server";
import { db } from "@/db";
import { targetHafalan, santri, halaqah } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(targetHafalan).orderBy(desc(targetHafalan.id));
    const santriList = await db.select().from(santri);
    const halaqahList = await db.select().from(halaqah);

    const enriched = list.map((t) => {
      const s = santriList.find((item) => item.id === t.santriId);
      const h = halaqahList.find((item) => item.id === t.halaqahId);
      return {
        ...t,
        namaSantri: s?.namaLengkap || "Semua Santri Halaqah",
        namaHalaqah: h?.namaHalaqah || "-",
      };
    });

    return NextResponse.json({ success: true, data: enriched });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal mengambil target hafalan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { santriId, halaqahId, jenisTarget, deskripsiTarget, tanggalMulai, tanggalSelesai, status } = body;

    if (!deskripsiTarget || !tanggalMulai || !tanggalSelesai) {
      return NextResponse.json({ error: "Deskripsi target dan tanggal wajib diisi" }, { status: 400 });
    }

    const inserted = await db
      .insert(targetHafalan)
      .values({
        santriId: santriId ? parseInt(santriId) : null,
        halaqahId: halaqahId ? parseInt(halaqahId) : null,
        jenisTarget: jenisTarget || "bulanan",
        deskripsiTarget,
        tanggalMulai,
        tanggalSelesai,
        status: status || "berjalan",
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal menambahkan target hafalan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ error: "ID dan status wajib" }, { status: 400 });

    const updated = await db
      .update(targetHafalan)
      .set({ status })
      .where(eq(targetHafalan.id, parseInt(id)))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal mengubah target" }, { status: 500 });
  }
}
