import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/academy")({ component: Academy });

const modules = [
  ["01", "How a quote is made", "Bid, offer, spread, and why a chart is not a dealing price."],
  ["02", "Risk before return", "Position size, gaps, and the difference between a view and a mandate."],
  ["03", "Reading a release", "What CPI and payrolls measure, and what they do not."],
  ["04", "Keeping a journal", "A written process so a good week does not become a method."],
];

function Academy() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Academy</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight">Financial literacy, not a signal room.</h1>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {modules.map(([n, title, body]) => (
            <li key={n} className="rounded-2xl border border-line p-6">
              <p className="font-mono text-gold">{n}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ol>
        <Link to="/signup" className="mt-10 inline-block rounded-full bg-gold px-5 py-3 text-sm font-medium text-bg">Open a research account</Link>
      </main>
    </Shell>
  );
}
