import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";
import { MarketBoard } from "@/components/market-board";

export const Route = createFileRoute("/markets")({ component: Markets });

const books = [
  ["Foreign exchange", "Majors and a short list of crosses. We write about price, liquidity, and what the calendar can do to a pair."],
  ["Indices", "US and European benchmarks as context for risk appetite, not as a product shelf."],
  ["Commodities", "Gold and crude as macro instruments. Levels are discussed; orders are not taken."],
  ["Digital assets", "Bitcoin as a liquidity proxy. Coverage stays narrow on purpose."],
];

function Markets() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Global markets</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight">The book we actually follow.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {books.map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-line bg-raised p-6">
              <h2 className="font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-muted">{body}</p>
            </article>
          ))}
        </div>
        <MarketBoard layout="table" />
        <section className="mt-12">
          <h2 className="font-display text-3xl font-semibold">EUR/USD chart</h2>
          <p className="mt-2 text-sm text-muted">Chart supplied by TradingView. Indicative only.</p>
          <iframe
            title="EUR/USD chart"
            src="https://s.tradingview.com/widgetembed/?symbol=FX%3AEURUSD&interval=60&theme=dark&style=1&locale=en&hideideas=1"
            className="mt-4 h-[480px] w-full rounded-2xl border border-line"
          />
        </section>
      </main>
    </Shell>
  );
}
