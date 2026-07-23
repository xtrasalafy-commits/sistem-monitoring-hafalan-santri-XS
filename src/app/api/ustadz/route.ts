import { NextResponse } from "next/server";
import { db } from "@/db";
import { profiles, halaqah, santri } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const ustadzList = await db.select().from(profiles).where(eq(profiles.role, "ustadz"));
    const halaqahList = await db.select().from(halaqah);
    const santriList = await db.select().from(santri);

    const enriched = ustadzList.map((u) => {
      const h = halaqahList.find((item) => item.ustadzId === u.id);
      const halaqahSantri = h ? santriList.filter((s) => s.halaqahId === h.id) : [];
      return {
        ...u,
        namaHalaqah: h?.namaHalaqah || "Belum ada halaqah",
        halaqahId: h?.id || null,
        totalSantri: halaqahSantri.length,
      };
    });

    return NextResponse.json({ success: true, data: enriched });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal mengambil data ustadz" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaLengkap, email, password, noHp } = body;

    if (!namaLengkap || !email) {
      return NextResponse.json({ error: "Nama lengkap dan email wajib diisi" }, { status: 400 });
    }

    const inserted = await db
      .insert(profiles)
      .values({
        namaLengkap,
        email: email.toLowerCase().trim(),
        passwordHash: password || "password123",
        role: "ustadz",
        noHp: noHp || null,
        isActive: true,
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Email ustadz sudah digunakan" }, { status: 500 });
  }
}
