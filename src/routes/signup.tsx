import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/site-shell";
import { authClient, authEnabled } from "@/lib/auth/client";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { saveProfile } from "@/lib/profile";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  return (
    <Shell>
      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-gold uppercase">New client</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight">Sign up to open your dashboard.</h1>
          <p className="mt-4 max-w-md text-muted">
            We need your full name, email, and a phone number before the client desk is shown. This confirms who is writing. It does not open a trading account.
          </p>
          <p className="mt-6 text-sm text-muted">
            Already a client?{" "}
            <Link to="/login" className="text-gold">
              Sign in
            </Link>
          </p>
        </div>
        {authEnabled ? <SignupForm /> : <p className="text-muted">Sign-up is disabled.</p>}
      </main>
    </Shell>
  );
}

function SignupForm() {
  const router = useRouter();
  const { user } = useCurrentUserState();
  const [fullName, setFullName] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.primaryEmail ?? "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user?.displayName) setFullName((v) => v || user.displayName || "");
    if (user?.primaryEmail) setEmail(user.primaryEmail);
  }, [user?.id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (!user) {
        const result = await authClient.signUp.email({
          email,
          password,
          name: fullName.trim(),
          callbackURL: "/desk",
        });
        if (result.error) {
          setError(result.error.message ?? "Could not create the account.");
          return;
        }
      }
      await saveProfile({ data: { fullName, phone } });
      await router.navigate({ to: "/desk" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not finish sign-up.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 border border-line bg-surface p-6 md:p-8">
      <Label text="Full name">
        <input required autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={field} />
      </Label>
      <Label text="Email">
        <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={Boolean(user)} className={field} />
      </Label>
      <Label text="Phone">
        <input required type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="+1 212 555 0100" />
      </Label>
      <SignedOut>
        <Label text="Password">
          <input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
        </Label>
      </SignedOut>
      {error && <p className="text-sm text-gold">{error}</p>}
      <button type="submit" disabled={busy} className="w-full bg-gold px-4 py-3 text-bg disabled:opacity-60">
        {busy ? "Verifying…" : user ? "Verify and open dashboard" : "Sign up"}
      </button>
    </form>
  );
}

const field = "mt-1 w-full border border-line bg-bg px-3 py-3 outline-none focus:border-gold";

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-muted">{text}</span>
      {children}
    </label>
  );
}
