(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/visual/ScrambleText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrambleText",
    ()=>ScrambleText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const GLYPHS = "#$%&*+<>?/\\0123456789";
function ScrambleText({ text, className, speed = 0.8 }) {
    _s();
    const [output, setOutput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(text.replace(/./g, " "));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleText.useEffect": ()=>{
            let frameId;
            const chars = text.split("");
            const total = chars.length;
            let frame = 0;
            const clampedSpeed = Math.max(0.1, speed);
            const step = {
                "ScrambleText.useEffect.step": ()=>{
                    const progress = Math.min(1, frame / (total + 8));
                    const revealed = Math.floor(progress * total);
                    const next = chars.map({
                        "ScrambleText.useEffect.step.next": (ch, idx)=>{
                            if (idx < revealed || ch === " ") return ch;
                            if (Math.random() < 0.5) {
                                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                            }
                            return ch;
                        }
                    }["ScrambleText.useEffect.step.next"]);
                    setOutput(next.join(""));
                    frame += clampedSpeed;
                    if (progress < 1) {
                        frameId = requestAnimationFrame(step);
                    }
                }
            }["ScrambleText.useEffect.step"];
            frameId = requestAnimationFrame(step);
            return ({
                "ScrambleText.useEffect": ()=>cancelAnimationFrame(frameId)
            })["ScrambleText.useEffect"];
        }
    }["ScrambleText.useEffect"], [
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: className,
        children: output
    }, void 0, false, {
        fileName: "[project]/components/visual/ScrambleText.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_s(ScrambleText, "KLVysZNy4J5n7hLhhAC6uHwU3n0=");
_c = ScrambleText;
var _c;
__turbopack_context__.k.register(_c, "ScrambleText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_visual_ScrambleText_tsx_104a8155._.js.map