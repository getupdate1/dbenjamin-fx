import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/research")({ component: Research });

const notes = [
  ["Monday note", "What the week’s data can actually move", "Rates, labour, and the two pairs most exposed to the release order."],
  ["Technical", "Levels, not predictions", "Where liquidity sat last week, and what would invalidate the map."],
  ["Macro", "The policy path in one page", "Central-bank language translated into what it does to real yields."],
];

function Research() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Research & insights</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Notes you can argue with.</h1>
        <p className="mt-4 max-w-2xl text-muted">Outlooks are opinion and method. They are not advice, signals, or an invitation to deal.</p>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {notes.map(([kicker, title, body]) => (
            <li key={title} className="grid gap-2 py-6 md:grid-cols-12">
              <p className="text-[11px] tracking-[0.16em] text-gold uppercase md:col-span-3">{kicker}</p>
              <div className="md:col-span-9">
                <h2 className="font-display text-2xl font-semibold">{title}</h2>
                <p className="mt-2 text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Shell>
  );
}
