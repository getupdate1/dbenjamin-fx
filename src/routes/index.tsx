import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/")({ component: Home });

const pillars = [
  {
    kicker: "01",
    title: "Public markets",
    body: "Concentrated equity and credit sleeves built around cash flow, not noise.",
  },
  {
    kicker: "02",
    title: "Private opportunities",
    body: "Selective access to operating businesses and real assets, sized to the mandate.",
  },
  {
    kicker: "03",
    title: "Stewardship",
    body: "Reporting you can read in one sitting, and a partner who answers the phone.",
  },
];

function Home() {
  return (
    <Shell>
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-8">
            <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Private investment partnership</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] font-medium tracking-tight md:text-7xl">
              Capital with a longer memory.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Aether Capital works with families and founders who want a calm, high-conviction approach —
              fewer positions, clearer reporting, and decisions you can explain.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-bg">
                Open an account inquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/approach" className="inline-flex items-center rounded-full border border-line bg-surface px-5 py-3">
                How we invest
              </Link>
            </div>
          </div>
          <aside className="flex flex-col justify-end border-t border-line pt-6 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <p className="font-serif text-2xl leading-snug">Clarity in every decision. Strength in every portfolio.</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="text-muted">Established</dt>
                <dd className="mt-1 font-serif text-2xl">2014</dd>
              </div>
              <div>
                <dt className="text-muted">Clients</dt>
                <dd className="mt-1 font-serif text-2xl">By introduction</dd>
              </div>
              <div>
                <dt className="text-muted">Focus</dt>
                <dd className="mt-1">Long-only & private</dd>
              </div>
              <div>
                <dt className="text-muted">Base</dt>
                <dd className="mt-1">New York</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.kicker} className="border-b border-line p-8 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
                <p className="text-xs tracking-[0.18em] text-gold-deep">{p.kicker}</p>
                <h2 className="mt-3 font-serif text-2xl">{p.title}</h2>
                <p className="mt-3 text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <h2 className="font-serif text-4xl leading-tight">A conversation, not a form letter.</h2>
            <p className="text-muted">
              Register so we know who is writing. Then send a note about the mandate, the timeline, and
              what a good outcome looks like. A member of the partnership replies personally.
            </p>
          </div>
          <Link to="/inquire" className="mt-8 inline-flex items-center gap-2 text-gold-deep underline-offset-4 hover:underline">
            Contact support <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </Shell>
  );
}
