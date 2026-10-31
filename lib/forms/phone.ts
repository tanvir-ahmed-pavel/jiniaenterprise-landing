/**
 * Bangladeshi mobiles are written 01XXXXXXXXX, +8801XXXXXXXXX or
 * 8801XXXXXXXXX, often with spaces or dashes. Foreign numbers (embassy and
 * visiting clients) are accepted in international +country form.
 */
const BD_MOBILE = /^(?:\+?88)?(01[3-9]\d{8})$/;
const INTERNATIONAL = /^\+[1-9]\d{6,14}$/;

function compact(input: string): string {
  return input.replace(/[\s\-().]/g, "");
}

/** "+8801XXXXXXXXX" for Bangladeshi mobiles, the compact +number otherwise, or null. */
export function normalizePhone(input: string): string | null {
  const value = compact(input);
  const bd = value.match(BD_MOBILE);
  if (bd) return `+88${bd[1]}`;
  if (INTERNATIONAL.test(value)) return value;
  return null;
}

export function isValidPhone(input: string): boolean {
  return normalizePhone(input) !== null;
}

export const PHONE_HINT = "01XXXXXXXXX or +8801XXXXXXXXX";
export const PHONE_ERROR = `Enter a mobile number like ${PHONE_HINT} (or +country code if you are abroad).`;
