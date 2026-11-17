import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/site-shell";
import { SignInGate } from "@/lib/auth/gates";
import { listInquiries, submitInquiry, type Inquiry } from "@/lib/inquiries";

export const Route = createFileRoute("/inquire")({ component: InquirePage });

const TOPICS = ["Private mandate", "Portfolio review", "Partnership", "General"];

function InquirePage() {
  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Support</p>
        <h1 className="mt-3 font-serif text-5xl">Write to the partnership.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Registered clients and prospective partners can leave a note here. We reply by email.
        </p>
        <div className="mt-10">
          <SignInGate fallback={<RegisterPrompt />}>
            <InquiryDesk />
          </SignInGate>
        </div>
      </main>
    </Shell>
  );
}

function RegisterPrompt() {
  return (
    <div className="max-w-md rounded-2xl border border-line bg-surface p-8">
      <p className="font-serif text-2xl">Register to send a note.</p>
      <p className="mt-2 text-muted">Your messages stay attached to your account.</p>
      <a href="/login" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-bg">
        Create an account
      </a>
    </div>
  );
}

function InquiryDesk() {
  const [rows, setRows] = useState<Inquiry[] | null>(null);
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    try {
      setRows(await listInquiries());
    } catch {
      setRows([]);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await submitInquiry({ data: { name, topic, message } });
      setMessage("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-6">
        <label className="block text-sm">
          <span className="text-muted">Your name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold"
          >
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-muted">Message</span>
          <textarea
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold"
            placeholder="What would you like us to know?"
          />
        </label>
        {error && <p className="text-sm text-gold-deep">{error}</p>}
        <button type="submit" disabled={busy} className="rounded-full bg-ink px-5 py-3 text-bg disabled:opacity-60">
          {busy ? "Sending…" : "Send inquiry"}
        </button>
      </form>
      <section>
        <h2 className="font-serif text-2xl">Your notes</h2>
        {rows === null ? (
          <p className="mt-4 text-muted">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mt-4 text-muted">Nothing sent yet. The first note starts the conversation.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {rows.map((r) => (
              <li key={r.id} className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs tracking-wide text-gold-deep uppercase">{r.topic}</p>
                <p className="mt-1 font-medium">{r.name}</p>
                <p className="mt-2 text-sm text-muted">{r.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
