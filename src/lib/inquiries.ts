import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type Inquiry = {
  id: number;
  name: string;
  topic: string;
  message: string;
  created_at: string;
};

const TOPICS = ["Private mandate", "Portfolio review", "Partnership", "General"] as const;

export const listInquiries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<Inquiry>`
      select id, name, topic, message, created_at
      from inquiries
      where user_id = ${context.userId}
      order by id desc
    `;
  });

export const submitInquiry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; topic: string; message: string }) => {
    const name = String(input?.name ?? "").trim().slice(0, 80);
    const topic = String(input?.topic ?? "").trim();
    const message = String(input?.message ?? "").trim().slice(0, 2000);
    if (name.length < 2) throw new Error("Please add your name.");
    if (!TOPICS.includes(topic as (typeof TOPICS)[number])) throw new Error("Choose a topic.");
    if (message.length < 12) throw new Error("Tell us a little more — at least a sentence.");
    return { name, topic, message };
  })
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into inquiries (user_id, name, topic, message)
      values (${context.userId}, ${data.name}, ${data.topic}, ${data.message})
    `;
    return { ok: true as const };
  });
