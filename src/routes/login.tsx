import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/site-shell";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { myProfile } from "@/lib/profile";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return (
    <Shell>
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Clients</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight">Sign in to your dashboard.</h1>
          <p className="mt-4 max-w-md text-muted">
            Returning clients sign in to see their notes. New clients complete a short verification first.
          </p>
          <Link to="/signup" className="mt-6 inline-block bg-gold px-5 py-3 text-[13px] tracking-wide text-bg uppercase">
            Sign up
          </Link>
        </div>
        <SignedIn>
          <Continue />
        </SignedIn>
        <SignedOut>{authEnabled ? <SignInForm /> : <p className="text-muted">Sign-in is disabled.</p>}</SignedOut>
      </main>
    </Shell>
  );
}

function Continue() {
  const router = useRouter();
  return (
    <div className="border border-line bg-surface p-8">
      <p className="font-serif text-2xl">You are signed in.</p>
      <button
        type="button"
        className="mt-4 text-gold"
        onClick={() => {
          void myProfile()
            .then((profile) => router.navigate({ to: profile?.verified ? "/desk" : "/signup" }))
            .catch(() => router.navigate({ to: "/signup" }));
        }}
      >
        Continue to your dashboard
      </button>
    </div>
  );
}

function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await authClient.signIn.email({ email, password, callbackURL: "/desk" });
      if (result.error) {
        setError(result.error.message ?? "Could not sign in.");
        return;
      }
      const profile = await myProfile().catch(() => null);
      await router.navigate({ to: profile?.verified ? "/desk" : "/signup" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border border-line bg-surface p-6 md:p-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm">
          <span className="text-muted">Email</span>
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border border-line bg-bg px-3 py-3 outline-none focus:border-gold" />
        </label>
        <label className="block text-sm">
          <span className="text-muted">Password</span>
          <input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border border-line bg-bg px-3 py-3 outline-none focus:border-gold" />
        </label>
        {error && <p className="text-sm text-gold">{error}</p>}
        <button type="submit" disabled={busy} className="w-full bg-gold px-4 py-3 text-bg disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
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
            onClick={() => void signIn(p.providerId, { callbackURL: "/desk" })}
            className="w-full border border-line px-4 py-3 hover:border-gold"
          >
            Continue with {p.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        New here? <Link to="/signup" className="text-gold">Create an account</Link>
      </p>
    </div>
  );
}
