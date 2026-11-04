import Link from "next/link";
import { notFound } from "next/navigation";
import { getSql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false } };

const TZ = "Asia/Colombo";
const RANGES = [7, 30, 90];

type Row = { label: string; views: number };

function countryName(code: string | null) {
  if (!code || code === "unknown") return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

function fmtDay(day: string) {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

function fmtTime(value: string | Date) {
  return new Date(value).toLocaleString("en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function BarList({ rows, total }: { rows: Row[]; total: number }) {
  if (rows.length === 0) return <p className="an-empty">No data yet</p>;
  return (
    <ul className="an-list">
      {rows.map((r) => {
        const pct = total ? (r.views / total) * 100 : 0;
        return (
          <li key={r.label}>
            <div className="an-row">
              <span className="an-label" title={r.label}>
                {r.label}
              </span>
              <span className="an-num">
                {r.views} <em>{pct.toFixed(0)}%</em>
              </span>
            </div>
            <div className="an-track">
              <div className="an-fill" style={{ width: `${Math.max(pct, 2)}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; range?: string }>;
}) {
  const { key, range } = await searchParams;
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) notFound();

  const days = RANGES.includes(Number(range)) ? Number(range) : 30;
  const sql = getSql();

  const [daily, totals, sources, countries, pages, devices, recent] = await Promise.all([
    // One row per day in the range, including days with zero views
    sql`
      select to_char(g.d, 'YYYY-MM-DD') as day, coalesce(v.views, 0)::int as views
      from generate_series(
        ((now() at time zone 'Asia/Colombo')::date - (${days}::int - 1))::timestamp,
        (now() at time zone 'Asia/Colombo')::date::timestamp,
        interval '1 day'
      ) as g(d)
      left join (
        select (created_at at time zone 'Asia/Colombo')::date as day, count(*) as views
        from visits
        where created_at > now() - make_interval(days => ${days}::int + 1)
        group by 1
      ) v on v.day = g.d::date
      order by g.d`,
    sql`
      select
        count(*)::int as total,
        count(*) filter (
          where (created_at at time zone 'Asia/Colombo')::date = (now() at time zone 'Asia/Colombo')::date
        )::int as today,
        count(distinct country)::int as countries,
        count(*) filter (where device = 'mobile')::int as mobile
      from visits
      where (created_at at time zone 'Asia/Colombo')::date > (now() at time zone 'Asia/Colombo')::date - ${days}::int`,
    sql`
      select coalesce(utm_source, referrer, 'direct') as label, count(*)::int as views
      from visits
      where (created_at at time zone 'Asia/Colombo')::date > (now() at time zone 'Asia/Colombo')::date - ${days}::int
      group by 1 order by 2 desc limit 8`,
    sql`
      select coalesce(country, 'unknown') as label, count(*)::int as views
      from visits
      where (created_at at time zone 'Asia/Colombo')::date > (now() at time zone 'Asia/Colombo')::date - ${days}::int
      group by 1 order by 2 desc limit 8`,
    sql`
      select path as label, count(*)::int as views
      from visits
      where (created_at at time zone 'Asia/Colombo')::date > (now() at time zone 'Asia/Colombo')::date - ${days}::int
      group by 1 order by 2 desc limit 8`,
    sql`
      select coalesce(device, 'unknown') as label, count(*)::int as views
      from visits
      where (created_at at time zone 'Asia/Colombo')::date > (now() at time zone 'Asia/Colombo')::date - ${days}::int
      group by 1 order by 2 desc`,
    sql`
      select created_at, path, coalesce(utm_source, referrer, 'direct') as source, country, city, device
      from visits
      order by created_at desc
      limit 25`,
  ]);

  const total: number = totals[0]?.total ?? 0;
  const mobilePct = total ? Math.round((totals[0].mobile / total) * 100) : 0;
  const max = Math.max(1, ...daily.map((d) => d.views as number));
  const showCounts = days <= 14;

  const countryRows: Row[] = countries.map((c) => ({
    label: countryName(c.label),
    views: c.views,
  }));

  return (
    <div className="an">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="an-in">
        <header className="an-head">
          <div>
            <h1>Portfolio analytics</h1>
            <p className="an-sub">Times shown in Sri Lanka time</p>
          </div>
          <nav className="an-range">
            {RANGES.map((r) => (
              <Link
                key={r}
                href={`?key=${encodeURIComponent(key ?? "")}&range=${r}`}
                className={r === days ? "on" : ""}
              >
                {r}d
              </Link>
            ))}
          </nav>
        </header>

        <section className="an-cards">
          <div className="an-card">
            <span>Views (last {days} days)</span>
            <strong>{total}</strong>
          </div>
          <div className="an-card">
            <span>Today</span>
            <strong>{totals[0]?.today ?? 0}</strong>
          </div>
          <div className="an-card">
            <span>Countries</span>
            <strong>{totals[0]?.countries ?? 0}</strong>
          </div>
          <div className="an-card">
            <span>On mobile</span>
            <strong>{mobilePct}%</strong>
          </div>
        </section>

        <section className="an-panel">
          <h2>Views per day</h2>
          <div className="an-chart" style={{ gap: showCounts ? 8 : 3 }}>
            {daily.map((d) => (
              <div
                key={d.day}
                className="an-col"
                title={`${fmtDay(d.day)}: ${d.views} view${d.views === 1 ? "" : "s"}`}
              >
                {showCounts && <span className="an-val">{d.views || ""}</span>}
                <div
                  className="an-bar"
                  style={{
                    height: `calc((100% - 20px) * ${d.views / max})`,
                    opacity: d.views ? 1 : 0.2,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="an-axis">
            <span>{daily.length ? fmtDay(daily[0].day) : ""}</span>
            <span>{daily.length ? fmtDay(daily[Math.floor(daily.length / 2)].day) : ""}</span>
            <span>{daily.length ? fmtDay(daily[daily.length - 1].day) : ""}</span>
          </div>
        </section>

        <div className="an-grid">
          <section className="an-panel">
            <h2>Where visitors come from</h2>
            <BarList rows={sources as Row[]} total={total} />
          </section>
          <section className="an-panel">
            <h2>Countries</h2>
            <BarList rows={countryRows} total={total} />
          </section>
          <section className="an-panel">
            <h2>Pages</h2>
            <BarList rows={pages as Row[]} total={total} />
          </section>
          <section className="an-panel">
            <h2>Devices</h2>
            <BarList rows={devices as Row[]} total={total} />
          </section>
        </div>

        <section className="an-panel">
          <h2>Recent visits</h2>
          <div className="an-scroll">
            <table className="an-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Page</th>
                  <th>Source</th>
                  <th>Location</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 && (
                  <tr>
                    <td colSpan={5} className="an-empty">
                      No visits yet
                    </td>
                  </tr>
                )}
                {recent.map((r, i) => (
                  <tr key={i}>
                    <td>{fmtTime(r.created_at)}</td>
                    <td>{r.path}</td>
                    <td>{r.source}</td>
                    <td>
                      {[r.city, r.country ? countryName(r.country) : null]
                        .filter(Boolean)
                        .join(", ") || "Unknown"}
                    </td>
                    <td>{r.device ?? "unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

const css = `
.an{min-height:100vh;background:#0a0e13;color:#e6edf3;padding:32px 16px 64px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.4}
.an *{box-sizing:border-box}
.an-in{max-width:1000px;margin:0 auto;display:flex;flex-direction:column;gap:16px}
.an-head{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;flex-wrap:wrap}
.an h1{margin:0;font-size:24px;font-weight:650}
.an h2{margin:0 0 14px;font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8b98a9}
.an-sub{margin:4px 0 0;font-size:13px;color:#8b98a9}
.an-range{display:flex;gap:4px;background:#11161d;border:1px solid #1f2733;border-radius:10px;padding:4px}
.an-range a{padding:6px 14px;border-radius:7px;font-size:13px;color:#8b98a9;text-decoration:none}
.an-range a.on{background:#6366f1;color:#fff}
.an-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.an-card{background:#11161d;border:1px solid #1f2733;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:6px}
.an-card span{font-size:12px;color:#8b98a9}
.an-card strong{font-size:30px;font-weight:650;font-variant-numeric:tabular-nums}
.an-panel{background:#11161d;border:1px solid #1f2733;border-radius:12px;padding:18px;min-width:0}
.an-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.an-chart{display:flex;align-items:flex-end;height:200px;border-bottom:1px solid #1f2733}
.an-col{flex:1;height:100%;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
.an-val{height:20px;line-height:20px;font-size:11px;color:#8b98a9}
.an-bar{width:100%;min-height:3px;background:linear-gradient(180deg,#818cf8,#6366f1);border-radius:4px 4px 0 0}
.an-axis{display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:#8b98a9}
.an-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.an-row{display:flex;justify-content:space-between;gap:12px;font-size:14px;margin-bottom:5px}
.an-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.an-num{font-variant-numeric:tabular-nums;white-space:nowrap}
.an-num em{font-style:normal;color:#8b98a9;margin-left:6px;font-size:12px}
.an-track{height:6px;background:#1a2230;border-radius:99px;overflow:hidden}
.an-fill{height:100%;background:#6366f1;border-radius:99px}
.an-empty{color:#8b98a9;font-size:14px;margin:0}
.an-scroll{overflow-x:auto}
.an-table{width:100%;border-collapse:collapse;font-size:13px;white-space:nowrap}
.an-table th{text-align:left;font-weight:600;color:#8b98a9;padding:8px 12px;border-bottom:1px solid #1f2733}
.an-table td{padding:9px 12px;border-bottom:1px solid #161d28}
.an-table tbody tr:last-child td{border-bottom:0}
`;
