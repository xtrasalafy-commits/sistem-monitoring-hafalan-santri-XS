import { NextResponse } from "next/server";
import { db } from "@/db";
import { profiles, santri } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const waliList = await db.select().from(profiles).where(eq(profiles.role, "wali"));
    const santriList = await db.select().from(santri);

    const enriched = waliList.map((w) => {
      const anakList = santriList.filter((s) => s.waliId === w.id);
      return {
        ...w,
        daftarAnak: anakList.map((a) => a.namaLengkap).join(", "),
        totalAnak: anakList.length,
      };
    });

    return NextResponse.json({ success: true, data: enriched });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Gagal mengambil data wali santri" }, { status: 500 });
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
        role: "wali",
        noHp: noHp || null,
        isActive: true,
      })
      .returning();

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Email wali santri sudah digunakan" }, { status: 500 });
  }
}
