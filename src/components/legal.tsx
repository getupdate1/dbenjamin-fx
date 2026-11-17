import { Shell } from "@/components/site-shell";

export function Legal({ title, body }: { title: string; body: string[] }) {
  return (
    <Shell>
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="font-display text-5xl font-semibold">{title}</h1>
        <div className="mt-6 space-y-4 text-muted">
          {body.map((p) => <p key={p}>{p}</p>)}
        </div>
      </main>
    </Shell>
  );
}
