import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { myRole } from "@/lib/roles";

const links = [
  { to: "/markets", label: "Markets" },
  { to: "/research", label: "Research" },
  { to: "/calendar", label: "Calendar" },
  { to: "/academy", label: "Academy" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { user, isPending } = useCurrentUserState();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setRole(null);
      return;
    }
    let live = true;
    myRole()
      .then((r) => {
        if (live) setRole(r.role);
      })
      .catch(() => {
        if (live) setRole("client");
      });
    return () => {
      live = false;
    };
  }, [user?.id]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-10 w-16 object-contain" />
          <span className="font-display text-[11px] tracking-[0.22em] uppercase">D.BENJAMIN FX</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] tracking-wide text-muted lg:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-gold" activeProps={{ className: "text-gold" }}>
              {l.label}
            </Link>
          ))}
          {role === "admin" && (
            <Link to="/admin" className="hover:text-gold" activeProps={{ className: "text-gold" }}>
              Admin
            </Link>
          )}
          {user && (
            <Link to="/desk" className="hover:text-gold" activeProps={{ className: "text-gold" }}>
              Account
            </Link>
          )}
        </nav>
        <div className="flex min-h-9 items-center gap-3 text-sm">
          {isPending ? (
            <span className="h-8 w-24 animate-pulse rounded-sm bg-raised" />
          ) : user ? (
            <UserButton />
          ) : (
            <>
              <Link to="/login" className="border border-line px-4 py-2 text-[13px] tracking-wide uppercase hover:border-gold">
                Sign in
              </Link>
              <Link to="/signup" className="bg-gold px-4 py-2 text-[13px] tracking-wide text-bg uppercase">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-line px-5 py-2 text-[13px] text-muted lg:hidden">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="shrink-0 hover:text-gold">
            {l.label}
          </Link>
        ))}
        {user && (
          <Link to="/desk" className="shrink-0 hover:text-gold">
            Account
          </Link>
        )}
        {role === "admin" && (
          <Link to="/admin" className="shrink-0 hover:text-gold">
            Admin
          </Link>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 text-sm text-muted md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg tracking-[0.18em]">D.BENJAMIN FX</p>
          <p className="mt-3 max-w-sm text-muted">Global market intelligence. Research, education, and a disciplined reading of price — not a brokerage and not a fund.</p>
        </div>
        <div>
          <Link to="/privacy" className="hover:text-gold">Privacy</Link>
          <Link to="/terms" className="mt-1 block hover:text-gold">Terms</Link>
          <Link to="/risk" className="mt-1 block hover:text-gold">Risk disclosure</Link>
        </div>
        <p className="leading-relaxed">
          Informational only. Not an offer to deal in investments or FX contracts, and not a solicitation. Relationships begin with a written agreement.
        </p>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
