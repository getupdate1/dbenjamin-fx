import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/site-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { adminOverview, type DeskInquiry, type DeskUser } from "@/lib/roles";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  const [notice, setNotice] = useState<string | null>(null);
  const seen = useState(() => new Set<string>())[0];
  const primed = useState({ current: false })[0];
  const [state, setState] = useState<"load" | "deny" | "ok">("load");
  const [users, setUsers] = useState<DeskUser[]>([]);
  const [inquiries, setInquiries] = useState<DeskInquiry[]>([]);

  useEffect(() => {
    if (!user) return;
    let live = true;
    async function pull() {
      try {
        const data = await adminOverview();
        if (!live) return;
        const fresh = data.users.filter((u) => u.active && !seen.has(u.id));
        if (primed.current && fresh.length) {
          const line = fresh.map((u) => u.name || u.email).join(", ");
          setNotice(`${fresh.length === 1 ? "New client" : "New clients"}: ${line}`);
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("D Benjamin FX", { body: `New client registered: ${line}` });
          }
        }
        for (const u of data.users) if (u.active) seen.add(u.id);
        primed.current = true;
        setUsers(data.users);
        setInquiries(data.inquiries);
        setState("ok");
      } catch {
        if (live) setState("deny");
      }
    }
    void pull();
    const id = window.setInterval(pull, 15000);
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      void Notification.requestPermission();
    }
    return () => {
      live = false;
      window.clearInterval(id);
    };
  }, [user?.id]);

  if (isPending) return <Shell><p className="px-5 py-20 text-muted">Loading…</p></Shell>;
  if (!user) return <RedirectToSignIn />;

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">Admin desk</p>
        <h1 className="mt-2 font-serif text-5xl">Partnership view</h1>
        {state === "deny" && (
          <p className="mt-8 max-w-lg border border-line p-6 text-muted">
            This desk is limited to desk@dbenjamin.fx. Sign in with that account to review clients and inquiries.
          </p>
        )}
        {state === "load" && <p className="mt-8 text-muted">Checking access…</p>}
        {state === "ok" && (
          <div className="mt-10 space-y-10">
            {notice && (
              <p className="border border-gold bg-surface px-5 py-4 text-gold">{notice}</p>
            )}
            <section>
              <h2 className="font-serif text-3xl">Active clients</h2>
              <p className="mt-2 text-sm text-muted">Verified accounts. This desk checks for new registrations every 15 seconds and can raise a browser notification.</p>
              <div className="mt-4 overflow-x-auto border border-line">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead className="border-b border-line text-[11px] tracking-[0.16em] text-muted uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Phone</th>
                      <th className="px-4 py-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((u) => u.active && u.role !== "admin").length === 0 && (
                      <tr><td className="px-4 py-6 text-muted" colSpan={4}>No verified clients yet.</td></tr>
                    )}
                    {users.filter((u) => u.active && u.role !== "admin").map((u) => (
                      <tr key={u.id} className="border-b border-line last:border-b-0">
                        <td className="px-4 py-3">{u.name}</td>
                        <td className="px-4 py-3 text-muted">{u.email}</td>
                        <td className="px-4 py-3">{u.phone ?? "—"}</td>
                        <td className="px-4 py-3">{u.inquiries}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-3xl">All accounts</h2>
              <div className="mt-4 overflow-x-auto border border-line">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead className="border-b border-line text-[11px] tracking-[0.16em] text-muted uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-line last:border-b-0">
                        <td className="px-4 py-3">{u.name}</td>
                        <td className="px-4 py-3 text-muted">{u.email}</td>
                        <td className="px-4 py-3 text-gold">{u.role}</td>
                        <td className="px-4 py-3">{u.inquiries}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="font-serif text-3xl">All inquiries</h2>
              <ul className="mt-4 divide-y divide-line border border-line">
                {inquiries.length === 0 && <li className="px-5 py-6 text-muted">None yet.</li>}
                {inquiries.map((i) => (
                  <li key={i.id} className="grid gap-2 px-5 py-4 md:grid-cols-12">
                    <div className="md:col-span-3">
                      <p className="text-[11px] tracking-[0.16em] text-gold uppercase">{i.topic}</p>
                      <p className="mt-1 text-sm text-muted">{i.email}</p>
                    </div>
                    <p className="md:col-span-9">{i.message}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
    </Shell>
  );
}
