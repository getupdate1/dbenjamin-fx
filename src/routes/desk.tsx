import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/site-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listInquiries, type Inquiry } from "@/lib/inquiries";
import { myProfile } from "@/lib/profile";
import { myRole } from "@/lib/roles";

export const Route = createFileRoute("/desk")({ component: DeskPage });

function DeskPage() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Inquiry[] | null>(null);
  const [role, setRole] = useState<string>("client");
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    myProfile()
      .then((profile) => {
        if (!profile?.verified) {
          navigate({ to: "/signup" });
          return;
        }
        setPhone(profile.phone);
      })
      .catch(() => navigate({ to: "/signup" }));
    listInquiries().then(setRows).catch(() => setRows([]));
    myRole().then((r) => setRole(r.role)).catch(() => setRole("client"));
  }, [user?.id]);

  if (isPending) return <Shell><p className="px-5 py-20 text-muted">Loading account…</p></Shell>;
  if (!user) return <RedirectToSignIn />;

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Client dashboard</p>
        <h1 className="mt-2 font-serif text-5xl">{user.displayName ?? "Your desk"}</h1>
        <p className="mt-2 text-muted">{user.primaryEmail}{phone ? ` · ${phone}` : ""}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Stat label="Role" value={role === "admin" ? "Admin" : "Client"} />
          <Stat label="Inquiries" value={rows ? String(rows.length) : "—"} />
          <Stat label="Status" value="Verified" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <section className="border border-line lg:col-span-8">
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-serif text-2xl">Your correspondence</h2>
              <Link to="/inquire" className="text-[12px] tracking-[0.16em] text-gold uppercase">New note</Link>
            </header>
            {rows === null ? (
              <p className="px-5 py-8 text-muted">Loading…</p>
            ) : rows.length === 0 ? (
              <p className="px-5 py-8 text-muted">No inquiries yet.</p>
            ) : (
              <ul>
                {rows.map((r) => (
                  <li key={r.id} className="border-b border-line px-5 py-4 last:border-b-0">
                    <p className="text-[11px] tracking-[0.16em] text-gold uppercase">{r.topic}</p>
                    <p className="mt-1">{r.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <aside className="border border-line bg-surface p-6 lg:col-span-4">
            <h2 className="font-serif text-2xl">Next</h2>
            <p className="mt-3 text-sm text-muted">Your name, email, and phone are on file. This dashboard is an introduction, not a trading account.</p>
            {role === "admin" && (
              <Link to="/admin" className="mt-6 inline-block bg-gold px-4 py-2 text-[12px] tracking-wide text-bg uppercase">
                Open admin desk
              </Link>
            )}
          </aside>
        </div>
      </main>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line px-5 py-4">
      <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-serif text-3xl">{value}</p>
    </div>
  );
}
