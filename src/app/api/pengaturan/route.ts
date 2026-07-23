import { NextResponse } from "next/server";
import { db } from "@/db";
import { pengaturanPesantren } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(pengaturanPesantren).limit(1);
    if (list.length === 0) {
      return NextResponse.json({
        namaPondok: "Pondok Pesantren Tahfizh Darul Huffazh",
        alamat: "Jl. Raya Pesantren No. 99, Cisarua, Bogor, Jawa Barat",
        tahunAjaran: "2025/2026",
        semester: "Genap",
        logoText: "Mutaba'ah Santri",
      });
    }
    return NextResponse.json(list[0]);
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal memuat pengaturan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaPondok, alamat, tahunAjaran, semester, logoText } = body;

    const list = await db.select().from(pengaturanPesantren).limit(1);
    if (list.length === 0) {
      const inserted = await db
        .insert(pengaturanPesantren)
        .values({ namaPondok, alamat, tahunAjaran, semester, logoText })
        .returning();
      return NextResponse.json({ success: true, data: inserted[0] });
    } else {
      const updated = await db
        .update(pengaturanPesantren)
        .set({ namaPondok, alamat, tahunAjaran, semester, logoText })
        .where(eq(pengaturanPesantren.id, list[0].id))
        .returning();
      return NextResponse.json({ success: true, data: updated[0] });
    }
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal menyimpan pengaturan" }, { status: 500 });
  }
}
