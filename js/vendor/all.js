(self.webpackChunk_addoncrop_youtube_downloader = self.webpackChunk_addoncrop_youtube_downloader || []).push([
    [597],
    {
        1704: function (e, r) {
            !(function (e) {
                "use strict";
                const r = (e, r = "", s) => {
                        const n = ("undefined" != typeof browser ? browser : chrome).i18n.getMessage(e, s);
                        return "" === n ? (console.warn(`Translation for message name "${e}" is missing.`), r) : n;
                    },
                    s = {
                        install(e) {
                            parseInt(e.version, 10) >= 3 ? (e.config.globalProperties.$t = r) : (e.prototype.$t = r);
                        },
                    };
                (window.__t = r),
                    (e.localePlugin = s),
                    (e.localizeByAttribute = function (e = "data-localize") {
                        let s = document.querySelectorAll(`[${e}]`);
                        s.forEach((s) => {
                            const n = s.getAttribute(e);
                            if (!n || "" === n) return;
                            const t = r(n);
                            "" !== t && (s.innerText = t);
                        }),
                            (s = document.querySelectorAll(`[${e}\\:attr]`)),
                            s.forEach((s) => {
                                const n = s.getAttribute(e + ":attr");
                                n &&
                                    "" !== n &&
                                    n.split(",").forEach((e) => {
                                        const [n, t] = e.split(":");
                                        if (!t) return;
                                        const o = r(t);
                                        "" !== o && s.setAttribute(n, o);
                                    });
                            });
                    }),
                    Object.defineProperty(e, "__esModule", { value: !0 });
            })(r);
        },
        3156: function (e, r, s) {
            var n, t;
            !(function () {
                "use strict";
                (n = function () {
                    var e = function () {},
                        r = "undefined",
                        s = typeof window !== r && typeof window.navigator !== r && /Trident\/|MSIE /.test(window.navigator.userAgent),
                        n = ["trace", "debug", "info", "warn", "error"],
                        t = {},
                        o = null;
                    function g(e, r) {
                        var s = e[r];
                        if ("function" == typeof s.bind) return s.bind(e);
                        try {
                            return Function.prototype.bind.call(s, e);
                        } catch (r) {
                            return function () {
                                return Function.prototype.apply.apply(s, [e, arguments]);
                            };
                        }
                    }
                    function a() {
                        console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
                    }
                    function i(n) {
                        return "debug" === n && (n = "log"), typeof console !== r && ("trace" === n && s ? a : void 0 !== console[n] ? g(console, n) : void 0 !== console.log ? g(console, "log") : e);
                    }
                    function m() {
                        for (var s = this.getLevel(), t = 0; t < n.length; t++) {
                            var o = n[t];
                            this[o] = t < s ? e : this.methodFactory(o, s, this.name);
                        }
                        if (((this.log = this.debug), typeof console === r && s < this.levels.SILENT)) return "No console available for logging";
                    }
                    function l(e) {
                        return function () {
                            typeof console !== r && (m.call(this), this[e].apply(this, arguments));
                        };
                    }
                    function A(e, r, s) {
                        return i(e) || l.apply(this, arguments);
                    }
                    function c(e, s) {
                        var g,
                            a,
                            i,
                            l = this,
                            c = "loglevel";
                        function u(e) {
                            var s = (n[e] || "silent").toUpperCase();
                            if (typeof window !== r && c) {
                                try {
                                    return void (window.localStorage[c] = s);
                                } catch (e) {}
                                try {
                                    window.document.cookie = encodeURIComponent(c) + "=" + s + ";";
                                } catch (e) {}
                            }
                        }
                        function x() {
                            var e;
                            if (typeof window !== r && c) {
                                try {
                                    e = window.localStorage[c];
                                } catch (e) {}
                                if (typeof e === r)
                                    try {
                                        var s = window.document.cookie,
                                            n = encodeURIComponent(c),
                                            t = s.indexOf(n + "=");
                                        -1 !== t && (e = /^([^;]+)/.exec(s.slice(t + n.length + 1))[1]);
                                    } catch (e) {}
                                return void 0 === l.levels[e] && (e = void 0), e;
                            }
                        }
                        function d() {
                            if (typeof window !== r && c) {
                                try {
                                    window.localStorage.removeItem(c);
                                } catch (e) {}
                                try {
                                    window.document.cookie = encodeURIComponent(c) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                                } catch (e) {}
                            }
                        }
                        function f(e) {
                            var r = e;
                            if (("string" == typeof r && void 0 !== l.levels[r.toUpperCase()] && (r = l.levels[r.toUpperCase()]), "number" == typeof r && r >= 0 && r <= l.levels.SILENT)) return r;
                            throw new TypeError("log.setLevel() called with invalid level: " + e);
                        }
                        "string" == typeof e ? (c += ":" + e) : "symbol" == typeof e && (c = void 0),
                            (l.name = e),
                            (l.levels = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4, SILENT: 5 }),
                            (l.methodFactory = s || A),
                            (l.getLevel = function () {
                                return null != i ? i : null != a ? a : g;
                            }),
                            (l.setLevel = function (e, r) {
                                return (i = f(e)), !1 !== r && u(i), m.call(l);
                            }),
                            (l.setDefaultLevel = function (e) {
                                (a = f(e)), x() || l.setLevel(e, !1);
                            }),
                            (l.resetLevel = function () {
                                (i = null), d(), m.call(l);
                            }),
                            (l.enableAll = function (e) {
                                l.setLevel(l.levels.TRACE, e);
                            }),
                            (l.disableAll = function (e) {
                                l.setLevel(l.levels.SILENT, e);
                            }),
                            (l.rebuild = function () {
                                if ((o !== l && (g = f(o.getLevel())), m.call(l), o === l)) for (var e in t) t[e].rebuild();
                            }),
                            (g = f(o ? o.getLevel() : "WARN"));
                        var p = x();
                        null != p && (i = f(p)), m.call(l);
                    }
                    (o = new c()).getLogger = function (e) {
                        if (("symbol" != typeof e && "string" != typeof e) || "" === e) throw new TypeError("You must supply a name when creating a logger.");
                        var r = t[e];
                        return r || (r = t[e] = new c(e, o.methodFactory)), r;
                    };
                    var u = typeof window !== r ? window.log : void 0;
                    return (
                        (o.noConflict = function () {
                            return typeof window !== r && window.log === o && (window.log = u), o;
                        }),
                        (o.getLoggers = function () {
                            return t;
                        }),
                        (o.default = o),
                        o
                    );
                }),
                    void 0 === (t = "function" == typeof n ? n.call(r, s, r, e) : n) || (e.exports = t);
            })();
        },
        3675: function (e, r) {
            var s, n, t;
            "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self && self,
                (n = [e]),
                (s = function (e) {
                    "use strict";
                    if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) throw new Error("This script should only be loaded in a browser extension.");
                    if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id) e.exports = globalThis.browser;
                    else {
                        const r = "The message port closed before a response was received.",
                            s = (e) => {
                                const s = {
                                    alarms: { clear: { minArgs: 0, maxArgs: 1 }, clearAll: { minArgs: 0, maxArgs: 0 }, get: { minArgs: 0, maxArgs: 1 }, getAll: { minArgs: 0, maxArgs: 0 } },
                                    bookmarks: {
                                        create: { minArgs: 1, maxArgs: 1 },
                                        get: { minArgs: 1, maxArgs: 1 },
                                        getChildren: { minArgs: 1, maxArgs: 1 },
                                        getRecent: { minArgs: 1, maxArgs: 1 },
                                        getSubTree: { minArgs: 1, maxArgs: 1 },
                                        getTree: { minArgs: 0, maxArgs: 0 },
                                        move: { minArgs: 2, maxArgs: 2 },
                                        remove: { minArgs: 1, maxArgs: 1 },
                                        removeTree: { minArgs: 1, maxArgs: 1 },
                                        search: { minArgs: 1, maxArgs: 1 },
                                        update: { minArgs: 2, maxArgs: 2 },
                                    },
                                    browserAction: {
                                        disable: { minArgs: 0, maxArgs: 1, fallbackToNoCallback: !0 },
                                        enable: { minArgs: 0, maxArgs: 1, fallbackToNoCallback: !0 },
                                        getBadgeBackgroundColor: { minArgs: 1, maxArgs: 1 },
                                        getBadgeText: { minArgs: 1, maxArgs: 1 },
                                        getPopup: { minArgs: 1, maxArgs: 1 },
                                        getTitle: { minArgs: 1, maxArgs: 1 },
                                        openPopup: { minArgs: 0, maxArgs: 0 },
                                        setBadgeBackgroundColor: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        setBadgeText: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        setIcon: { minArgs: 1, maxArgs: 1 },
                                        setPopup: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        setTitle: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                    },
                                    browsingData: {
                                        remove: { minArgs: 2, maxArgs: 2 },
                                        removeCache: { minArgs: 1, maxArgs: 1 },
                                        removeCookies: { minArgs: 1, maxArgs: 1 },
                                        removeDownloads: { minArgs: 1, maxArgs: 1 },
                                        removeFormData: { minArgs: 1, maxArgs: 1 },
                                        removeHistory: { minArgs: 1, maxArgs: 1 },
                                        removeLocalStorage: { minArgs: 1, maxArgs: 1 },
                                        removePasswords: { minArgs: 1, maxArgs: 1 },
                                        removePluginData: { minArgs: 1, maxArgs: 1 },
                                        settings: { minArgs: 0, maxArgs: 0 },
                                    },
                                    commands: { getAll: { minArgs: 0, maxArgs: 0 } },
                                    contextMenus: { remove: { minArgs: 1, maxArgs: 1 }, removeAll: { minArgs: 0, maxArgs: 0 }, update: { minArgs: 2, maxArgs: 2 } },
                                    cookies: { get: { minArgs: 1, maxArgs: 1 }, getAll: { minArgs: 1, maxArgs: 1 }, getAllCookieStores: { minArgs: 0, maxArgs: 0 }, remove: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } },
                                    devtools: {
                                        inspectedWindow: { eval: { minArgs: 1, maxArgs: 2, singleCallbackArg: !1 } },
                                        panels: { create: { minArgs: 3, maxArgs: 3, singleCallbackArg: !0 }, elements: { createSidebarPane: { minArgs: 1, maxArgs: 1 } } },
                                    },
                                    downloads: {
                                        cancel: { minArgs: 1, maxArgs: 1 },
                                        download: { minArgs: 1, maxArgs: 1 },
                                        erase: { minArgs: 1, maxArgs: 1 },
                                        getFileIcon: { minArgs: 1, maxArgs: 2 },
                                        open: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        pause: { minArgs: 1, maxArgs: 1 },
                                        removeFile: { minArgs: 1, maxArgs: 1 },
                                        resume: { minArgs: 1, maxArgs: 1 },
                                        search: { minArgs: 1, maxArgs: 1 },
                                        show: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                    },
                                    extension: { isAllowedFileSchemeAccess: { minArgs: 0, maxArgs: 0 }, isAllowedIncognitoAccess: { minArgs: 0, maxArgs: 0 } },
                                    history: {
                                        addUrl: { minArgs: 1, maxArgs: 1 },
                                        deleteAll: { minArgs: 0, maxArgs: 0 },
                                        deleteRange: { minArgs: 1, maxArgs: 1 },
                                        deleteUrl: { minArgs: 1, maxArgs: 1 },
                                        getVisits: { minArgs: 1, maxArgs: 1 },
                                        search: { minArgs: 1, maxArgs: 1 },
                                    },
                                    i18n: { detectLanguage: { minArgs: 1, maxArgs: 1 }, getAcceptLanguages: { minArgs: 0, maxArgs: 0 } },
                                    identity: { launchWebAuthFlow: { minArgs: 1, maxArgs: 1 } },
                                    idle: { queryState: { minArgs: 1, maxArgs: 1 } },
                                    management: { get: { minArgs: 1, maxArgs: 1 }, getAll: { minArgs: 0, maxArgs: 0 }, getSelf: { minArgs: 0, maxArgs: 0 }, setEnabled: { minArgs: 2, maxArgs: 2 }, uninstallSelf: { minArgs: 0, maxArgs: 1 } },
                                    notifications: {
                                        clear: { minArgs: 1, maxArgs: 1 },
                                        create: { minArgs: 1, maxArgs: 2 },
                                        getAll: { minArgs: 0, maxArgs: 0 },
                                        getPermissionLevel: { minArgs: 0, maxArgs: 0 },
                                        update: { minArgs: 2, maxArgs: 2 },
                                    },
                                    pageAction: {
                                        getPopup: { minArgs: 1, maxArgs: 1 },
                                        getTitle: { minArgs: 1, maxArgs: 1 },
                                        hide: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        setIcon: { minArgs: 1, maxArgs: 1 },
                                        setPopup: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        setTitle: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                        show: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: !0 },
                                    },
                                    permissions: { contains: { minArgs: 1, maxArgs: 1 }, getAll: { minArgs: 0, maxArgs: 0 }, remove: { minArgs: 1, maxArgs: 1 }, request: { minArgs: 1, maxArgs: 1 } },
                                    runtime: {
                                        getBackgroundPage: { minArgs: 0, maxArgs: 0 },
                                        getPlatformInfo: { minArgs: 0, maxArgs: 0 },
                                        openOptionsPage: { minArgs: 0, maxArgs: 0 },
                                        requestUpdateCheck: { minArgs: 0, maxArgs: 0 },
                                        sendMessage: { minArgs: 1, maxArgs: 3 },
                                        sendNativeMessage: { minArgs: 2, maxArgs: 2 },
                                        setUninstallURL: { minArgs: 1, maxArgs: 1 },
                                    },
                                    sessions: { getDevices: { minArgs: 0, maxArgs: 1 }, getRecentlyClosed: { minArgs: 0, maxArgs: 1 }, restore: { minArgs: 0, maxArgs: 1 } },
                                    storage: {
                                        local: { clear: { minArgs: 0, maxArgs: 0 }, get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 }, remove: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } },
                                        managed: { get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 } },
                                        sync: { clear: { minArgs: 0, maxArgs: 0 }, get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 }, remove: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } },
                                    },
                                    tabs: {
                                        captureVisibleTab: { minArgs: 0, maxArgs: 2 },
                                        create: { minArgs: 1, maxArgs: 1 },
                                        detectLanguage: { minArgs: 0, maxArgs: 1 },
                                        discard: { minArgs: 0, maxArgs: 1 },
                                        duplicate: { minArgs: 1, maxArgs: 1 },
                                        executeScript: { minArgs: 1, maxArgs: 2 },
                                        get: { minArgs: 1, maxArgs: 1 },
                                        getCurrent: { minArgs: 0, maxArgs: 0 },
                                        getZoom: { minArgs: 0, maxArgs: 1 },
                                        getZoomSettings: { minArgs: 0, maxArgs: 1 },
                                        goBack: { minArgs: 0, maxArgs: 1 },
                                        goForward: { minArgs: 0, maxArgs: 1 },
                                        highlight: { minArgs: 1, maxArgs: 1 },
                                        insertCSS: { minArgs: 1, maxArgs: 2 },
                                        move: { minArgs: 2, maxArgs: 2 },
                                        query: { minArgs: 1, maxArgs: 1 },
                                        reload: { minArgs: 0, maxArgs: 2 },
                                        remove: { minArgs: 1, maxArgs: 1 },
                                        removeCSS: { minArgs: 1, maxArgs: 2 },
                                        sendMessage: { minArgs: 2, maxArgs: 3 },
                                        setZoom: { minArgs: 1, maxArgs: 2 },
                                        setZoomSettings: { minArgs: 1, maxArgs: 2 },
                                        update: { minArgs: 1, maxArgs: 2 },
                                    },
                                    topSites: { get: { minArgs: 0, maxArgs: 0 } },
                                    webNavigation: { getAllFrames: { minArgs: 1, maxArgs: 1 }, getFrame: { minArgs: 1, maxArgs: 1 } },
                                    webRequest: { handlerBehaviorChanged: { minArgs: 0, maxArgs: 0 } },
                                    windows: {
                                        create: { minArgs: 0, maxArgs: 1 },
                                        get: { minArgs: 1, maxArgs: 2 },
                                        getAll: { minArgs: 0, maxArgs: 1 },
                                        getCurrent: { minArgs: 0, maxArgs: 1 },
                                        getLastFocused: { minArgs: 0, maxArgs: 1 },
                                        remove: { minArgs: 1, maxArgs: 1 },
                                        update: { minArgs: 2, maxArgs: 2 },
                                    },
                                };
                                if (0 === Object.keys(s).length) throw new Error("api-metadata.json has not been included in browser-polyfill");
                                class n extends WeakMap {
                                    constructor(e, r = void 0) {
                                        super(r), (this.createItem = e);
                                    }
                                    get(e) {
                                        return this.has(e) || this.set(e, this.createItem(e)), super.get(e);
                                    }
                                }
                                const t = (e) => e && "object" == typeof e && "function" == typeof e.then,
                                    o = (r, s) => (...n) => {
                                        e.runtime.lastError ? r.reject(new Error(e.runtime.lastError.message)) : s.singleCallbackArg || (n.length <= 1 && !1 !== s.singleCallbackArg) ? r.resolve(n[0]) : r.resolve(n);
                                    },
                                    g = (e) => (1 == e ? "argument" : "arguments"),
                                    a = (e, r) =>
                                        function (s, ...n) {
                                            if (n.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);
                                            if (n.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);
                                            return new Promise((t, g) => {
                                                if (r.fallbackToNoCallback)
                                                    try {
                                                        s[e](...n, o({ resolve: t, reject: g }, r));
                                                    } catch (o) {
                                                        console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, o),
                                                            s[e](...n),
                                                            (r.fallbackToNoCallback = !1),
                                                            (r.noCallback = !0),
                                                            t();
                                                    }
                                                else r.noCallback ? (s[e](...n), t()) : s[e](...n, o({ resolve: t, reject: g }, r));
                                            });
                                        },
                                    i = (e, r, s) => new Proxy(r, { apply: (r, n, t) => s.call(n, e, ...t) });
                                let m = Function.call.bind(Object.prototype.hasOwnProperty);
                                const l = (e, r = {}, s = {}) => {
                                        let n = Object.create(null),
                                            t = {
                                                has: (r, s) => s in e || s in n,
                                                get(t, o, g) {
                                                    if (o in n) return n[o];
                                                    if (!(o in e)) return;
                                                    let A = e[o];
                                                    if ("function" == typeof A)
                                                        if ("function" == typeof r[o]) A = i(e, e[o], r[o]);
                                                        else if (m(s, o)) {
                                                            let r = a(o, s[o]);
                                                            A = i(e, e[o], r);
                                                        } else A = A.bind(e);
                                                    else if ("object" == typeof A && null !== A && (m(r, o) || m(s, o))) A = l(A, r[o], s[o]);
                                                    else {
                                                        if (!m(s, "*"))
                                                            return (
                                                                Object.defineProperty(n, o, {
                                                                    configurable: !0,
                                                                    enumerable: !0,
                                                                    get: () => e[o],
                                                                    set(r) {
                                                                        e[o] = r;
                                                                    },
                                                                }),
                                                                A
                                                            );
                                                        A = l(A, r[o], s["*"]);
                                                    }
                                                    return (n[o] = A), A;
                                                },
                                                set: (r, s, t, o) => (s in n ? (n[s] = t) : (e[s] = t), !0),
                                                defineProperty: (e, r, s) => Reflect.defineProperty(n, r, s),
                                                deleteProperty: (e, r) => Reflect.deleteProperty(n, r),
                                            },
                                            o = Object.create(e);
                                        return new Proxy(o, t);
                                    },
                                    A = (e) => ({
                                        addListener(r, s, ...n) {
                                            r.addListener(e.get(s), ...n);
                                        },
                                        hasListener: (r, s) => r.hasListener(e.get(s)),
                                        removeListener(r, s) {
                                            r.removeListener(e.get(s));
                                        },
                                    }),
                                    c = new n((e) =>
                                        "function" != typeof e
                                            ? e
                                            : function (r) {
                                                  const s = l(r, {}, { getContent: { minArgs: 0, maxArgs: 0 } });
                                                  e(s);
                                              }
                                    ),
                                    u = new n((e) =>
                                        "function" != typeof e
                                            ? e
                                            : function (r, s, n) {
                                                  let o,
                                                      g,
                                                      a = !1,
                                                      i = new Promise((e) => {
                                                          o = function (r) {
                                                              (a = !0), e(r);
                                                          };
                                                      });
                                                  try {
                                                      g = e(r, s, o);
                                                  } catch (e) {
                                                      g = Promise.reject(e);
                                                  }
                                                  const m = !0 !== g && t(g);
                                                  if (!0 !== g && !m && !a) return !1;
                                                  const l = (e) => {
                                                      e.then(
                                                          (e) => {
                                                              n(e);
                                                          },
                                                          (e) => {
                                                              let r;
                                                              (r = e && (e instanceof Error || "string" == typeof e.message) ? e.message : "An unexpected error occurred"), n({ __mozWebExtensionPolyfillReject__: !0, message: r });
                                                          }
                                                      ).catch((e) => {
                                                          console.error("Failed to send onMessage rejected reply", e);
                                                      });
                                                  };
                                                  return l(m ? g : i), !0;
                                              }
                                    ),
                                    x = ({ reject: s, resolve: n }, t) => {
                                        e.runtime.lastError ? (e.runtime.lastError.message === r ? n() : s(new Error(e.runtime.lastError.message))) : t && t.__mozWebExtensionPolyfillReject__ ? s(new Error(t.message)) : n(t);
                                    },
                                    d = (e, r, s, ...n) => {
                                        if (n.length < r.minArgs) throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);
                                        if (n.length > r.maxArgs) throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);
                                        return new Promise((e, r) => {
                                            const t = x.bind(null, { resolve: e, reject: r });
                                            n.push(t), s.sendMessage(...n);
                                        });
                                    },
                                    f = {
                                        devtools: { network: { onRequestFinished: A(c) } },
                                        runtime: { onMessage: A(u), onMessageExternal: A(u), sendMessage: d.bind(null, "sendMessage", { minArgs: 1, maxArgs: 3 }) },
                                        tabs: { sendMessage: d.bind(null, "sendMessage", { minArgs: 2, maxArgs: 3 }) },
                                    },
                                    p = { clear: { minArgs: 1, maxArgs: 1 }, get: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } };
                                return (s.privacy = { network: { "*": p }, services: { "*": p }, websites: { "*": p } }), l(e, f, s);
                            };
                        e.exports = s(chrome);
                    }
                }),
                void 0 === (t = "function" == typeof s ? s.apply(r, n) : s) || (e.exports = t);
        },
    },
    (e) => {
        var r = (r) => e((e.s = r));
        r(3675), r(1704), r(3156);
    },
]);
