import { notFound } from "next/navigation";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) notFound();

  const sql = getSql();

  const perDay = await sql`
    select created_at::date as day, count(*)::int as views
    from visits where created_at > now() - interval '30 days'
    group by 1 order by 1`;
  const sources = await sql`
    select coalesce(utm_source, referrer, 'direct') as label, count(*)::int as views
    from visits group by 1 order by 2 desc limit 10`;
  const countries = await sql`
    select coalesce(country, 'unknown') as label, count(*)::int as views
    from visits group by 1 order by 2 desc limit 10`;

  const max = Math.max(1, ...perDay.map((d) => d.views));

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 16 }}>
      <h1>Portfolio analytics</h1>

      <h2>Views per day (30 days)</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 160 }}>
        {perDay.map((d) => (
          <div
            key={String(d.day)}
            title={`${d.day}: ${d.views}`}
            style={{ flex: 1, height: `${(d.views / max) * 100}%`, background: "#6366f1" }}
          />
        ))}
      </div>

      <h2>Top sources</h2>
      <ul>{sources.map((s) => <li key={s.label}>{s.label}: {s.views}</li>)}</ul>

      <h2>Top countries</h2>
      <ul>{countries.map((c) => <li key={c.label}>{c.label}: {c.views}</li>)}</ul>
    </main>
  );
}
