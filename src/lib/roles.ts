import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

/** Desk principals. Register with one of these emails to open the admin desk. */
export const ADMIN_EMAILS = ["desk@dbenjamin.fx"];

async function resolveRole(userId: string): Promise<"admin" | "client"> {
  const sql = await getSql();
  const users = await sql<{ email: string }>`select email from "user" where id = ${userId}`;
  const email = (users[0]?.email ?? "").toLowerCase();
  const role = ADMIN_EMAILS.includes(email) ? "admin" : "client";
  await sql`
    insert into staff (user_id, role) values (${userId}, ${role})
    on conflict (user_id) do update set role = ${role}
  `;
  return role;
}

export const myRole = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await resolveRole(context.userId);
    return { role };
  });

export async function assertAdmin(userId: string) {
  const role = await resolveRole(userId);
  if (role !== "admin") throw new Error("Admin only");
}

export type DeskUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  active: boolean;
  inquiries: number;
};

export type DeskInquiry = {
  id: number;
  name: string;
  topic: string;
  message: string;
  created_at: string;
  email: string;
};

export const adminOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const sql = await getSql();
    const users = await sql<DeskUser>`
      select u.id, u.name, u.email,
             coalesce(s.role, 'client') as role,
             p.phone as phone,
             coalesce(p.verified, false) as active,
             (select count(*) from inquiries i where i.user_id = u.id) as inquiries
      from "user" u
      left join staff s on s.user_id = u.id
      left join profiles p on p.user_id = u.id
      order by u."createdAt" desc
    `;
    const inquiries = await sql<DeskInquiry>`
      select i.id, i.name, i.topic, i.message, i.created_at, u.email
      from inquiries i
      join "user" u on u.id = i.user_id
      order by i.id desc
    `;
    return { users, inquiries };
  });
