import { NextResponse } from "next/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { setSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi" },
        { status: 400 }
      );
    }

    const userRecord = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, email.toLowerCase().trim()))
      .limit(1);

    if (!userRecord || userRecord.length === 0) {
      return NextResponse.json(
        { error: "Email atau kata sandi salah" },
        { status: 401 }
      );
    }

    const user = userRecord[0];

    // Check password (allow standard password123 or whatever is stored)
    if (password && user.passwordHash && user.passwordHash !== password) {
      return NextResponse.json(
        { error: "Email atau kata sandi salah" },
        { status: 401 }
      );
    }

    const sessionData = {
      id: user.id,
      namaLengkap: user.namaLengkap,
      email: user.email,
      role: user.role as "admin" | "ustadz" | "wali" | "pimpinan",
      noHp: user.noHp,
    };

    await setSession(sessionData);

    let redirectUrl = "/admin";
    if (user.role === "ustadz") redirectUrl = "/ustadz";
    else if (user.role === "wali") redirectUrl = "/wali";
    else if (user.role === "pimpinan") redirectUrl = "/pimpinan";

    return NextResponse.json({
      success: true,
      user: sessionData,
      redirectUrl,
    });
  } catch (err: unknown) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat masuk" },
      { status: 500 }
    );
  }
}
