import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const links = [
  { to: "/", label: "Home" },
  { to: "/approach", label: "Approach" },
  { to: "/inquire", label: "Inquire" },
] as const;

export function SiteHeader() {
  const { user, isPending } = useCurrentUserState();
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-2 font-serif text-lg tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-gold text-xs text-gold-deep">Æ</span>
          Aether Capital
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-ink" activeProps={{ className: "text-ink" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex min-h-9 items-center gap-3 text-sm">
          {isPending ? (
            <span className="h-8 w-24 animate-pulse rounded-full bg-line" />
          ) : user ? (
            <UserButton />
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-ink px-4 py-2 text-bg hover:opacity-90"
            >
              Register
            </Link>
          )}
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-line px-5 py-2 text-sm text-muted sm:hidden">
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="shrink-0 hover:text-ink">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted md:grid-cols-3">
        <div>
          <p className="font-serif text-base text-ink">Aether Capital</p>
          <p className="mt-2 max-w-xs">Clarity in every decision. Strength in every portfolio.</p>
        </div>
        <div>
          <p className="text-ink">Office</p>
          <p className="mt-2">New York · by appointment</p>
          <p>support@aethercapital.example</p>
        </div>
        <p className="leading-relaxed">
          This site is an informational introduction. It is not an offer to sell securities,
          investment advice, or a solicitation. Any relationship begins only after a written agreement.
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
