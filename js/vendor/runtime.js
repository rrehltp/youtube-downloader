(() => {
    "use strict";
    var e,
        r = {},
        o = {};
    function t(e) {
        var n = o[e];
        if (void 0 !== n) return n.exports;
        var a = (o[e] = { exports: {} });
        return r[e].call(a.exports, a, a.exports, t), a.exports;
    }
    (t.m = r),
        (e = []),
        (t.O = (r, o, n, a) => {
            if (!o) {
                var i = 1 / 0;
                for (f = 0; f < e.length; f++) {
                    for (var [o, n, a] = e[f], l = !0, u = 0; u < o.length; u++) (!1 & a || i >= a) && Object.keys(t.O).every((e) => t.O[e](o[u])) ? o.splice(u--, 1) : ((l = !1), a < i && (i = a));
                    if (l) {
                        e.splice(f--, 1);
                        var d = n();
                        void 0 !== d && (r = d);
                    }
                }
                return r;
            }
            a = a || 0;
            for (var f = e.length; f > 0 && e[f - 1][2] > a; f--) e[f] = e[f - 1];
            e[f] = [o, n, a];
        }),
        (t.n = (e) => {
            var r = e && e.__esModule ? () => e.default : () => e;
            return t.d(r, { a: r }), r;
        }),
        (t.d = (e, r) => {
            for (var o in r) t.o(r, o) && !t.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: r[o] });
        }),
        (t.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        })()),
        (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
        (t.r = (e) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (() => {
            var e = { 344: 0 };
            t.O.j = (r) => 0 === e[r];
            var r = (r, o) => {
                    var n,
                        a,
                        [i, l, u] = o,
                        d = 0;
                    if (i.some((r) => 0 !== e[r])) {
                        for (n in l) t.o(l, n) && (t.m[n] = l[n]);
                        if (u) var f = u(t);
                    }
                    for (r && r(o); d < i.length; d++) (a = i[d]), t.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
                    return t.O(f);
                },
                o = (self.webpackChunk_addoncrop_youtube_downloader = self.webpackChunk_addoncrop_youtube_downloader || []);
            o.forEach(r.bind(null, 0)), (o.push = r.bind(null, o.push.bind(o)));
        })();
})();
