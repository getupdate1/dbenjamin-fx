import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-5sS0Qw08.mjs";
import { t as authMiddleware } from "./middleware-Ccf_kUnK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries-CsM4jdTU.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TOPICS = [
	"Private mandate",
	"Portfolio review",
	"Partnership",
	"General"
];
var listInquiries_createServerFn_handler = createServerRpc({
	id: "ebddca36431063dc306836f66691a026dbe418c36d9a221ad24101f534a22ede",
	name: "listInquiries",
	filename: "src/lib/inquiries.ts"
}, (opts) => listInquiries.__executeServer(opts));
var listInquiries = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listInquiries_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select id, name, topic, message, created_at
      from inquiries
      where user_id = ${context.userId}
      order by id desc
    `;
});
var submitInquiry_createServerFn_handler = createServerRpc({
	id: "c794bfa45c1ca23f10271cd63a2895fd3e759a488431673f10971312fefab8b0",
	name: "submitInquiry",
	filename: "src/lib/inquiries.ts"
}, (opts) => submitInquiry.__executeServer(opts));
var submitInquiry = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const name = String(input?.name ?? "").trim().slice(0, 80);
	const topic = String(input?.topic ?? "").trim();
	const message = String(input?.message ?? "").trim().slice(0, 2e3);
	if (name.length < 2) throw new Error("Please add your name.");
	if (!TOPICS.includes(topic)) throw new Error("Choose a topic.");
	if (message.length < 12) throw new Error("Tell us a little more — at least a sentence.");
	return {
		name,
		topic,
		message
	};
}).handler(submitInquiry_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into inquiries (user_id, name, topic, message)
      values (${context.userId}, ${data.name}, ${data.topic}, ${data.message})
    `;
	return { ok: true };
});
//#endregion
export { listInquiries_createServerFn_handler, submitInquiry_createServerFn_handler };
