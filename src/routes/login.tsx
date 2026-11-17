import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/site-shell";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { SignedIn, SignedOut } from "@/lib/auth/gates";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return (
    <Shell>
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs tracking-[0.22em] text-gold-deep uppercase">Register</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight">Introduce yourself.</h1>
          <p className="mt-4 max-w-md text-muted">
            An account lets you write to the partnership and keep a record of the conversation.
            We do not open an investment account from this page.
          </p>
        </div>
        <SignedIn>
          <div className="rounded-2xl border border-line bg-surface p-8">
            <p className="font-serif text-2xl">You are signed in.</p>
            <a href="/inquire" className="mt-4 inline-flex text-gold-deep underline-offset-4 hover:underline">
              Continue to your inquiry
            </a>
          </div>
        </SignedIn>
        <SignedOut>
          <SignedOutPanel />
        </SignedOut>
      </main>
    </Shell>
  );
}

function SignedOutPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<"register" | "signin">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result =
        mode === "register"
          ? await authClient.signUp.email({ email, password, name, callbackURL: "/inquire" })
          : await authClient.signIn.email({ email, password, callbackURL: "/inquire" });
      if (result.error) {
        setError(result.error.message ?? "Could not complete that request.");
        return;
      }
      await router.navigate({ to: "/inquire" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (!authEnabled) {
    return <p className="text-muted">Sign-in is disabled.</p>;
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
      <div className="mb-6 flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`rounded-full px-4 py-2 ${mode === "register" ? "bg-ink text-bg" : "text-muted"}`}
        >
          Create account
        </button>
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`rounded-full px-4 py-2 ${mode === "signin" ? "bg-ink text-bg" : "text-muted"}`}
        >
          Sign in
        </button>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {mode === "register" && (
          <Field label="Name" value={name} onChange={setName} autoComplete="name" />
        )}
        <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete={mode === "register" ? "new-password" : "current-password"}
        />
        {error && <p className="text-sm text-gold-deep">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-ink px-4 py-3 text-bg disabled:opacity-60"
        >
          {busy ? "Working…" : mode === "register" ? "Register" : "Sign in"}
        </button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs tracking-wide text-muted uppercase">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>
      <div className="space-y-2">
        {GROK_PROVIDERS.map((p) => (
          <button
            key={p.providerId}
            type="button"
            onClick={() => void signIn(p.providerId, { callbackURL: "/inquire" })}
            className="w-full rounded-full border border-line px-4 py-3 hover:bg-bg"
          >
            Continue with {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <input
        required
        minLength={type === "password" ? 8 : undefined}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold"
      />
    </label>
  );
}
