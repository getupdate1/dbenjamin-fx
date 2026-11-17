import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight">A research brand with a narrow book.</h1>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="space-y-4 text-muted md:col-span-7">
            <p>D.BENJAMIN FX publishes market intelligence: foreign exchange, indices, commodities, and a limited look at digital assets.</p>
            <p>The work is written for people who want a named point of view and a method they can inspect. We do not manage money, custody assets, or operate a brokerage.</p>
            <p>If that changes, the site will say so only when the relevant permissions exist. Until then, every page is research and education.</p>
          </div>
          <dl className="grid grid-cols-2 gap-4 md:col-span-5">
            {[
              ["Focus", "Research"],
              ["Coverage", "Global markets"],
              ["Base", "London · New York"],
              ["Clients", "By introduction"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-line p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">{k}</dt>
                <dd className="mt-2 font-display text-xl font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </Shell>
  );
}
