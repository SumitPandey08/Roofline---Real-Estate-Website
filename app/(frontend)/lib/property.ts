import { PropertyDTO } from "@/app/(frontend)/types/property";

export async function fetchPropertyById(
  id: string
): Promise<PropertyDTO | null> {
  if (!id) return null;

  // ✅ Build absolute URL for SERVER
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/property/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API ERROR:", res.status, errorText);
    throw new Error("Failed to fetch property");
  }

  const json = await res.json();
  return json.data as PropertyDTO;
}
