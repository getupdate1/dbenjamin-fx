import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

const events = [
  ["High", "United States", "Employment situation", "First Friday, 13:30 London"],
  ["High", "United States", "CPI", "Mid-month, 13:30 London"],
  ["High", "Euro area", "ECB policy decision", "Scheduled council dates"],
  ["High", "United States", "FOMC decision", "Scheduled meeting dates"],
  ["Medium", "United Kingdom", "CPI", "Mid-month, 07:00 London"],
  ["Medium", "Japan", "BoJ policy statement", "Scheduled meeting dates"],
];

function CalendarPage() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Economic calendar</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">What can move the week.</h1>
        <p className="mt-4 max-w-2xl text-muted">A standing watchlist of releases that matter to the book. Times follow the usual schedule. Confirm the official release before you rely on it. No forecast or actual figures are shown here.</p>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {events.map(([impact, region, title, when]) => (
            <li key={title + region} className="rounded-2xl border border-line bg-raised p-5">
              <p className="text-[11px] tracking-[0.16em] text-gold uppercase">{impact} · {region}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted">{when}</p>
            </li>
          ))}
        </ul>
      </main>
    </Shell>
  );
}
