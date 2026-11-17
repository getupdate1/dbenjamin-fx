import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";
import { MarketBoard } from "@/components/market-board";

export const Route = createFileRoute("/")({ component: Home });

const lenses = [
  { k: "Forex", title: "EUR/USD", note: "Currency markets" },
  { k: "Commodities", title: "Gold", note: "Precious metals" },
  { k: "Equities", title: "S&P 500", note: "Global indices" },
  { k: "Crypto", title: "BTC/USD", note: "Digital assets" },
];

function SessionClocks() {
  const now = new Date();
  const sessions = [
    ["Sydney", "Australia/Sydney"],
    ["Tokyo", "Asia/Tokyo"],
    ["London", "Europe/London"],
    ["New York", "America/New_York"],
  ] as const;
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4">
      {sessions.map(([city, zone]) => (
        <li key={city}>
          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{city}</p>
          <p className="mt-1 font-mono text-2xl">
            {new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: zone }).format(now)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Home() {
  return (
    <Shell>
      <MarketBoard />
      <main>
        <section className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/70" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-7">
              <p className="text-[11px] tracking-[0.32em] text-gold uppercase">Global market intelligence</p>
              <h1 className="mt-5 font-display text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl">
                Navigate markets.<br />Build with precision.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                Intelligent market research and a disciplined reading of global price. D.BENJAMIN FX publishes analysis. It does not hold client funds or execute trades.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/markets" className="rounded-full bg-gold px-5 py-3 text-sm font-medium text-bg">Explore markets</Link>
                <Link to="/research" className="rounded-full border border-line px-5 py-3 text-sm hover:border-gold">Our research</Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-line bg-raised p-6 md:col-span-5">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Global market watch</p>
              <SessionClocks />
              <p className="mt-6 text-xs text-muted">Session clocks are local exchange hours, not a trading venue.</p>
            </aside>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-px bg-line md:grid-cols-4">
          {lenses.map((item) => (
            <article key={item.k} className="bg-bg px-5 py-8">
              <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{item.k}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
            </article>
          ))}
        </section>
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-7xl items-end gap-8 px-5 py-16 md:grid-cols-12">
            <h2 className="font-display text-4xl font-semibold md:col-span-7">A research desk, written in public.</h2>
            <p className="text-muted md:col-span-5">Daily notes, an economic calendar, and an academy for people who want the method — not a signal service.</p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
