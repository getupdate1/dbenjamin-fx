import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Shell } from "./site-shell-DSSgQGB9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approach-D4JctyoR.js
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		n: "I",
		title: "Listen",
		body: "We start with the constraint: liquidity, time horizon, what must not be lost."
	},
	{
		n: "II",
		title: "Design",
		body: "A written mandate — what we own, what we refuse, and how we report."
	},
	{
		n: "III",
		title: "Hold",
		body: "We underwrite slowly and sell for reasons we can put in a letter."
	}
];
function Approach() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-14 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.22em] text-gold-deep uppercase",
				children: "Approach"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 max-w-3xl font-serif text-5xl leading-tight",
				children: "Fewer decisions. Better ones."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-2xl text-lg text-muted",
				children: "Aether is not a product shelf. We run a small number of strategies for people who prefer a named partner to a call center."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-line bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-gold-deep",
							children: s.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-serif text-2xl",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted",
							children: s.body
						})
					]
				}, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-3xl",
					children: "What we will not do"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Promise a return, a ranking, or a “guaranteed” outcome." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sell products we do not underwrite ourselves." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hide fees inside a performance footnote." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-ink p-8 text-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-2xl leading-snug",
						children: "If the fit is right, the next step is a short written inquiry."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/inquire",
						className: "mt-6 inline-flex rounded-full bg-bg px-5 py-3 text-ink",
						children: "Write to the partnership"
					})]
				})]
			})
		]
	}) });
}
//#endregion
export { Approach as component };
