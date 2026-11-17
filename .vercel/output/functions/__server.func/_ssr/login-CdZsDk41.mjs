import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, b as useRouter, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { t as GROK_PROVIDERS } from "./server-BgpQwi85.mjs";
import { i as SignedOut, r as SignedIn, t as Shell } from "./site-shell-DSSgQGB9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CdZsDk41.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-gold-deep uppercase",
					children: "Register"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-serif text-5xl leading-tight",
					children: "Introduce yourself."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-muted",
					children: "An account lets you write to the partnership and keep a record of the conversation. We do not open an investment account from this page."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-surface p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-2xl",
					children: "You are signed in."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/inquire",
					className: "mt-4 inline-flex text-gold-deep underline-offset-4 hover:underline",
					children: "Continue to your inquiry"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOutPanel, {}) })
		]
	}) });
}
function SignedOutPanel() {
	const router = useRouter();
	const [mode, setMode] = (0, import_react.useState)("register");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			const result = mode === "register" ? await authClient.signUp.email({
				email,
				password,
				name,
				callbackURL: "/inquire"
			}) : await authClient.signIn.email({
				email,
				password,
				callbackURL: "/inquire"
			});
			if (result.error) {
				setError(result.error.message ?? "Could not complete that request.");
				return;
			}
			await router.navigate({ to: "/inquire" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface p-6 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode("register"),
					className: `rounded-full px-4 py-2 ${mode === "register" ? "bg-ink text-bg" : "text-muted"}`,
					children: "Create account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode("signin"),
					className: `rounded-full px-4 py-2 ${mode === "signin" ? "bg-ink text-bg" : "text-muted"}`,
					children: "Sign in"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-4",
				children: [
					mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						value: name,
						onChange: setName,
						autoComplete: "name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						type: "email",
						value: email,
						onChange: setEmail,
						autoComplete: "email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						type: "password",
						value: password,
						onChange: setPassword,
						autoComplete: mode === "register" ? "new-password" : "current-password"
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-gold-deep",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "w-full rounded-full bg-ink px-4 py-3 text-bg disabled:opacity-60",
						children: busy ? "Working…" : mode === "register" ? "Register" : "Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 flex items-center gap-3 text-xs tracking-wide text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
					" or ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void signIn(p.providerId, { callbackURL: "/inquire" }),
					className: "w-full rounded-full border border-line px-4 py-3 hover:bg-bg",
					children: ["Continue with ", p.label]
				}, p.providerId))
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			required: true,
			minLength: type === "password" ? 8 : void 0,
			type,
			autoComplete,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 w-full rounded-xl border border-line bg-bg px-3 py-3 outline-none focus:border-gold"
		})]
	});
}
//#endregion
export { LoginPage as component };
