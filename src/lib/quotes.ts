import { createServerFn } from "@tanstack/react-start";

const PAIRS = [
  ["EURUSD=X", "EUR/USD"],
  ["GBPUSD=X", "GBP/USD"],
  ["USDJPY=X", "USD/JPY"],
  ["GC=F", "GOLD"],
  ["BTC-USD", "BTC/USD"],
  ["ES=F", "S&P 500"],
  ["CL=F", "WTI"],
] as const;

export type Quote = {
  symbol: string;
  label: string;
  price: number;
  changePct: number;
  high: number | null;
  low: number | null;
};

export const marketBoard = createServerFn({ method: "GET" }).handler(async () => {
  const settled = await Promise.all(
    PAIRS.map(async ([symbol, label]) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1m&range=1d`;
        const res = await fetch(url, { headers: { "user-agent": "DBenjaminFX/1.0" } });
        if (!res.ok) return null;
        const body = (await res.json()) as {
          chart?: { result?: Array<{ meta?: Record<string, number> }> };
        };
        const meta = body.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice;
        if (typeof price !== "number") return null;
        const changePct = typeof meta?.regularMarketChangePercent === "number" ? meta.regularMarketChangePercent : 0;
        const quote: Quote = {
          symbol,
          label,
          price,
          changePct,
          high: typeof meta?.regularMarketDayHigh === "number" ? meta.regularMarketDayHigh : null,
          low: typeof meta?.regularMarketDayLow === "number" ? meta.regularMarketDayLow : null,
        };
        return quote;
      } catch {
        return null;
      }
    }),
  );
  const rows = settled.filter((row): row is Quote => row !== null);
  if (rows.length === 0) throw new Error("No quotes");
  return { updatedAt: new Date().toISOString(), rows };
});
