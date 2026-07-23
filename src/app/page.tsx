import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getSession();

  if (session) {
    if (session.role === "ustadz") redirect("/ustadz");
    if (session.role === "wali") redirect("/wali");
    if (session.role === "pimpinan") redirect("/pimpinan");
    redirect("/admin");
  }

  redirect("/login");
}
