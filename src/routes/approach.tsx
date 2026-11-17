import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/approach")({ component: Approach });

const steps = [
  { n: "I", title: "Listen", body: "We start with the constraint: liquidity, time horizon, what must not be lost." },
  { n: "II", title: "Design", body: "A written mandate — what we own, what we refuse, and how we report." },
  { n: "III", title: "Hold", body: "We underwrite slowly and sell for reasons we can put in a letter." },
];

function Approach() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Approach</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight">Fewer decisions. Better ones.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Aether is not a product shelf. We run a small number of strategies for people who prefer
          a named partner to a call center.
        </p>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-serif text-gold-deep">{s.n}</p>
              <h2 className="mt-3 font-serif text-2xl">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <section className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">What we will not do</h2>
            <ul className="mt-4 space-y-3 text-muted">
              <li>Promise a return, a ranking, or a “guaranteed” outcome.</li>
              <li>Sell products we do not underwrite ourselves.</li>
              <li>Hide fees inside a performance footnote.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-ink p-8 text-bg">
            <p className="font-serif text-2xl leading-snug">If the fit is right, the next step is a short written inquiry.</p>
            <Link to="/inquire" className="mt-6 inline-flex rounded-full bg-bg px-5 py-3 text-ink">
              Write to the partnership
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
