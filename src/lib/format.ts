export const BULAN_INDONESIA = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const HARI_INDONESIA = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
];

export function formatTanggalIndonesia(dateStr?: string | null): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      // Try YYYY-MM-DD split
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const y = parseInt(parts[0]);
        const m = parseInt(parts[1]) - 1;
        const day = parseInt(parts[2]);
        return `${day} ${BULAN_INDONESIA[m] || ""} ${y}`;
      }
      return dateStr;
    }
    const day = d.getDate();
    const month = BULAN_INDONESIA[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

export function formatTanggalLengkap(dateStr?: string | null): string {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return formatTanggalIndonesia(dateStr);
    const dayName = HARI_INDONESIA[d.getDay()];
    const day = d.getDate();
    const month = BULAN_INDONESIA[d.getMonth()];
    const year = d.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}

export function selisihHariDariSekarang(dateStr?: string | null): number {
  if (!dateStr) return 999;
  try {
    const target = new Date(dateStr).getTime();
    const now = new Date().getTime();
    const diffMs = now - target;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  } catch {
    return 999;
  }
}
