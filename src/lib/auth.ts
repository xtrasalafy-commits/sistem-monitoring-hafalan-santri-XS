import { cookies } from "next/headers";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface UserSession {
  id: number;
  namaLengkap: string;
  email: string;
  role: "admin" | "ustadz" | "wali" | "pimpinan";
  noHp?: string | null;
}

const COOKIE_NAME = "mutabaah_session";

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const data = JSON.parse(sessionCookie.value) as UserSession;
    return data;
  } catch {
    return null;
  }
}

export async function setSession(user: UserSession) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, JSON.stringify(user), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(profiles).where(eq(profiles.email, email)).limit(1);
  return result[0] || null;
}
