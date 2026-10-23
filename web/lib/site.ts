/** Canonical site URL. Set NEXT_PUBLIC_BASE_URL in the environment for production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://pakizm.com"
).replace(/\/$/, "");

export const SITE_NAME = "Pakizm";
export const SITE_DESCRIPTION =
  "Manufacturer of precision orthopedic, dental and general surgery instruments in surgical stainless steel. OEM and custom manufacturing, worldwide export since 2005.";
