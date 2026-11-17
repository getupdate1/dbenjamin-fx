import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketBoard } from "@/components/market-board";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/approach")({ component: Markets });

const rows = [
  ["Majors", "EUR, GBP, JPY, CHF, CAD, AUD — expressed as spot or short-dated forwards."],
  ["Selective EM", "Only where we can name the liquidity and the exit. No basket products."],
  ["Capital", "Reserves and a short list of holdings. Concentration is a feature, not a lapse."],
];

function Markets() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">The book</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight md:text-6xl">What the desk will and will not touch.</h1>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {rows.map(([title, body]) => (
            <div key={title} className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline">
              <h2 className="font-serif text-3xl md:col-span-4">{title}</h2>
              <p className="text-muted md:col-span-8">{body}</p>
            </div>
          ))}
        </div>
        <MarketBoard layout="table" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="border border-line p-8">
            <h2 className="font-serif text-3xl">Refusals</h2>
            <ul className="mt-4 space-y-2 text-muted">
              <li>No guaranteed rates, pips targets, or “signals.”</li>
              <li>No leveraged products sold as income.</li>
              <li>No anonymous chat-room execution.</li>
            </ul>
          </div>
          <div className="bg-gold p-8 text-bg">
            <p className="font-serif text-3xl leading-snug">If the mandate fits, the next step is a registered inquiry.</p>
            <Link to="/inquire" className="mt-6 inline-block bg-bg px-5 py-3 text-[13px] tracking-wide text-ink uppercase">
              Write to the desk
            </Link>
          </div>
        </div>
      </main>
    </Shell>
  );
}
