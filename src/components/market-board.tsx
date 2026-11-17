import { useEffect, useState } from "react";
import { marketBoard, type Quote } from "@/lib/quotes";

function formatPx(label: string, price: number) {
  const digits = label.includes("JPY") ? 2 : label === "GOLD" || label === "BTC/USD" || label === "S&P 500" || label === "WTI" ? 2 : 4;
  return price.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function MarketBoard({ layout = "strip" }: { layout?: "strip" | "table" }) {
  const [rows, setRows] = useState<Quote[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let live = true;
    async function load() {
      try {
        const data = await marketBoard();
        if (!live) return;
        setRows(data.rows);
        setUpdatedAt(data.updatedAt);
        setError(false);
      } catch {
        if (live) setError(true);
      }
    }
    void load();
    const id = window.setInterval(load, 30_000);
    return () => {
      live = false;
      window.clearInterval(id);
    };
  }, []);

  const stamp = updatedAt
    ? new Date(updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "—";

  if (layout === "strip") {
    return (
      <section className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-5 py-3">
          <p className="shrink-0 text-[11px] tracking-[0.2em] text-gold uppercase">Live</p>
          {rows === null && !error && <p className="text-sm text-muted">Loading quotes…</p>}
          {error && rows === null && <p className="text-sm text-muted">Quotes unavailable.</p>}
          {rows?.map((q) => (
            <p key={q.symbol} className="flex shrink-0 items-baseline gap-2 text-sm">
              <span className="text-muted">{q.label}</span>
              <span className="font-medium tabular-nums">{formatPx(q.label, q.price)}</span>
              <span className={q.changePct < 0 ? "text-muted tabular-nums" : "text-gold tabular-nums"}>
                {q.changePct > 0 ? "+" : ""}
                {q.changePct.toFixed(2)}%
              </span>
            </p>
          ))}
          <p className="ml-auto shrink-0 text-[11px] tracking-wide text-muted">{stamp}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-3xl">Indicative board</h2>
        <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Refreshes every 30s · {stamp}</p>
      </div>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-line text-[11px] tracking-[0.16em] text-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Pair</th>
              <th className="px-4 py-3 font-medium">Last</th>
              <th className="px-4 py-3 font-medium">Day</th>
              <th className="px-4 py-3 font-medium">Low</th>
              <th className="px-4 py-3 font-medium">High</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((q) => (
              <tr key={q.symbol} className="border-b border-line last:border-b-0">
                <td className="px-4 py-3">{q.label}</td>
                <td className="px-4 py-3 tabular-nums">{formatPx(q.label, q.price)}</td>
                <td className={`px-4 py-3 tabular-nums ${q.changePct < 0 ? "text-muted" : "text-gold"}`}>
                  {q.changePct > 0 ? "+" : ""}
                  {q.changePct.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-muted tabular-nums">{q.low == null ? "—" : formatPx(q.label, q.low)}</td>
                <td className="px-4 py-3 text-muted tabular-nums">{q.high == null ? "—" : formatPx(q.label, q.high)}</td>
              </tr>
            ))}
            {rows === null && (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={5}>
                  {error ? "The quote feed did not answer." : "Loading the board…"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Indicative prices from the public market feed. Not a dealing rate and not an offer.</p>
    </section>
  );
}
