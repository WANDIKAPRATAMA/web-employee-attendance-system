/**
 * Memotong teks jika melebihi batas karakter dan menambahkan "..." di akhir.
 * @param text Teks yang akan dipotong.
 * @param maxLength Batas maksimum karakter.
 * @returns Teks yang telah dipotong.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + "...";
}

export function defaultText(
  text: string | null | undefined,
  defaultText: string
): string {
  if (!text) {
    return defaultText;
  }
  return text;
}

/**
 * Mengembalikan nilai awal jika nilai awal bukan string atau string kosong.
 * Jika nilai awal memenuhi syarat, maka akan mengembalikan nilai awal.
 * @param value Nilai awal yang akan di cek.
 * @param fallback Nilai fallback yang akan di gunakan jika nilai awal tidak memenuhi syarat.
 * @returns Nilai yang akan di kembalikan.
 */
export const fallbackString = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim() !== "" ? value : fallback;

/**
 * Menghapus spasi di awal dan akhir teks.
 * @param text Teks yang akan diproses.
 * @returns Teks tanpa spasi di awal dan akhir.
 */
export function trimText(text: string): string {
  return text.trim();
}
/**
 * Menghitung jumlah kata dalam teks.
 * @param text Teks yang akan dihitung.
 * @returns Jumlah kata dalam teks.
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}
/**
 * Mengonversi teks menjadi kapital semua huruf.
 * @param text Teks yang akan diubah.
 * @returns Teks dalam huruf kapital.
 */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}
/**
 * Mengonversi teks menjadi huruf kecil semua.
 * @param text Teks yang akan diubah.
 * @returns Teks dalam huruf kecil.
 */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function splitName(name?: string): string {
  if (!name) return "AV";
  return name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

export const trimUnderScore = (text: string): string => text.replace(/_/g, " ");

export function toNumber(value: string | number): number {
  return typeof value === "string" ? Number(value) : value;
}
