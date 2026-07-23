import { NextResponse } from "next/server";
import { db } from "@/db";
import { halaqah, profiles, santri } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const list = await db.select().from(halaqah);
    const ustadzList = await db.select().from(profiles).where(eq(profiles.role, "ustadz"));
    const santriList = await db.select().from(santri);

    const enriched = list.map((h) => {
      const u = ustadzList.find((usr) => usr.id === h.ustadzId);
      const halaqahSantri = santriList.filter((s) => s.halaqahId === h.id);
      return {
        ...h,
        namaUstadz: u?.namaLengkap || "Belum ditentukan",
        totalSantri: halaqahSantri.length,
      };
    });

    return NextResponse.json({ success: true, data: enriched });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal mengambil data halaqah" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaHalaqah, ustadzId, jadwal, keterangan } = body;

    if (!namaHalaqah) {
      return NextResponse.json({ error: "Nama halaqah wajib diisi" }, { status: 400 });
    }

    const inserted = await db
      .insert(halaqah)
      .values({
        namaHalaqah,
        ustadzId: ustadzId ? parseInt(ustadzId) : null,
        jadwal: jadwal || "Ba'da Subuh & Ba'da Ashar",
        keterangan: keterangan || "",
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal menambahkan halaqah" }, { status: 500 });
  }
}
