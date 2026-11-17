import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as SignInGate, t as Shell } from "./site-shell-DSSgQGB9.mjs";
import { t as authMiddleware } from "./middleware-Ccf_kUnK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquire-BICHs7EY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TOPICS$1 = [
	"Private mandate",
	"Portfolio review",
	"Partnership",
	"General"
];
var listInquiries = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ebddca36431063dc306836f66691a026dbe418c36d9a221ad24101f534a22ede"));
var submitInquiry = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const name = String(input?.name ?? "").trim().slice(0, 80);
	const topic = String(input?.topic ?? "").trim();
	const message = String(input?.message ?? "").trim().slice(0, 2e3);
	if (name.length < 2) throw new Error("Please add your name.");
	if (!TOPICS$1.includes(topic)) throw new Error("Choose a topic.");
	if (message.length < 12) throw new Error("Tell us a little more — at least a sentence.");
	return {
		name,
		topic,
		message
	};
}).handler(createSsrRpc("c794bfa45c1ca23f10271cd63a2895fd3e759a488431673f10971312fefab8b0"));
var TOPICS = [
	"Private mandate",
	"Portfolio review",
	"Partnership",
	"General"
];
function InquirePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-14 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] text-gold-deep uppercase",
				children: "Support"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-5xl",
				children: "Write to the partnership."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-xl text-muted",
				children: "Registered clients and prospective partners can leave a note here. We reply by email."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterPrompt, {}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryDesk, {})
				})
			})
		]
	}) });
}
function RegisterPrompt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md rounded-2xl border border-line bg-surface p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl",
				children: "Register to send a note."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Your messages stay attached to your account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/login",
				className: "mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-bg",
				children: "Create an account"
			})
		]
	});
}
function InquiryDesk() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [topic, setTopic] = (0, import_react.useState)(TOPICS[0]);
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function refresh() {
		try {
			setRows(await listInquiries());
		} catch {
			setRows([]);
		}
	}
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			await submitInquiry({ data: {
				name,
				topic,
				message
			} });
			setMessage("");
			await refresh();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not send.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4 rounded-2xl border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Topic"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: topic,
						onChange: (e) => setTopic(e.target.value),
						className: "mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold",
						children: TOPICS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						rows: 6,
						value: message,
						onChange: (e) => setMessage(e.target.value),
						className: "mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold",
						placeholder: "What would you like us to know?"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gold-deep",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "rounded-full bg-ink px-5 py-3 text-bg disabled:opacity-60",
					children: busy ? "Sending…" : "Send inquiry"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl",
			children: "Your notes"
		}), rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: "Loading…"
		}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: "Nothing sent yet. The first note starts the conversation."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-gold-deep uppercase",
						children: r.topic
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-medium",
						children: r.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: r.message
					})
				]
			}, r.id))
		})] })]
	});
}
//#endregion
export { InquirePage as component };
