import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Contact</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">Write to the desk.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Research & clients", "Questions about the notes, the academy, or opening an account."],
            ["Partnerships", "Data, media, and distribution. Tell us who you are and what you want to publish."],
            ["Support", "Account access and correspondence already on file."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-2xl border border-line bg-raised p-6">
              <h2 className="font-display text-2xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-muted">London and New York, by appointment. Messages are kept on your account.</p>
        <Link to="/inquire" className="mt-6 inline-block rounded-full bg-gold px-5 py-3 text-sm font-medium text-bg">Send a message</Link>
      </main>
    </Shell>
  );
}
