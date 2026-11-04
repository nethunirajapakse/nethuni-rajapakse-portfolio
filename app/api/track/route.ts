import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.json({ ok: true });
  }

  const sql = getSql();
  const { path, referrer, utm } = await req.json();
  const ua = req.headers.get("user-agent") ?? "";
  if (/bot|crawl|spider|preview/i.test(ua)) return NextResponse.json({ ok: true });

  let ref: string | null = null;
  try {
    const host = new URL(referrer).hostname;
    if (host !== req.nextUrl.hostname) ref = host;
  } catch {}

  const country = req.headers.get("x-vercel-ip-country");
  const cityRaw = req.headers.get("x-vercel-ip-city");
  const city = cityRaw ? decodeURIComponent(cityRaw) : null;
  const device = /mobile/i.test(ua) ? "mobile" : "desktop";

  await sql`
    insert into visits (path, referrer, utm_source, country, city, device)
    values (${path}, ${ref}, ${utm ?? null}, ${country}, ${city}, ${device})`;

  return NextResponse.json({ ok: true });
}
