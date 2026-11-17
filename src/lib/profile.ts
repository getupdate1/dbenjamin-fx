import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type Profile = {
  full_name: string;
  phone: string;
  verified: boolean;
};

function cleanPhone(raw: string) {
  const phone = raw.trim().slice(0, 24);
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) throw new Error("Enter a phone number we can reach.");
  return phone;
}

export const myProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<Profile>`
      select full_name, phone, verified from profiles where user_id = ${context.userId}
    `;
    return rows[0] ?? null;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { fullName: string; phone: string }) => {
    const fullName = String(input?.fullName ?? "").trim().slice(0, 120);
    if (fullName.split(/\s+/).length < 2) throw new Error("Enter your full name.");
    return { fullName, phone: cleanPhone(String(input?.phone ?? "")) };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into profiles (user_id, full_name, phone, verified)
      values (${context.userId}, ${data.fullName}, ${data.phone}, true)
      on conflict (user_id) do update
      set full_name = ${data.fullName}, phone = ${data.phone}, verified = true
    `;
    return { ok: true as const };
  });
