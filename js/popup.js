(self.webpackChunk_addoncrop_youtube_downloader = self.webpackChunk_addoncrop_youtube_downloader || []).push([
    [887],
    {
        3300: function (e, t) {
            !(function (e) {
                "use strict";
                var t, o;
                ((t = e.DebugLevel || (e.DebugLevel = {}))[(t.DEBUG = 0)] = "DEBUG"),
                    (t[(t.INFO = 1)] = "INFO"),
                    (t[(t.WARNING = 2)] = "WARNING"),
                    (t[(t.ERROR = 3)] = "ERROR"),
                    ((o = e.DownloadState || (e.DownloadState = {})).QUEUED = "queued"),
                    (o.DOWNLOADING = "downloading"),
                    (o.PAUSED = "paused"),
                    (o.PROCESSING = "processing"),
                    (o.COMPLETED = "completed"),
                    (o.CANCELED = "canceled"),
                    (o.ERROR = "error");
                const n = {
                        debug: { icon: "-", iconColor: "#666", textStyle: "color: #666" },
                        info: { icon: "ℹ", iconColor: "#1e88e5", textStyle: "color: #333" },
                        success: { icon: "✔", iconColor: "#43A047", textStyle: "color: #333" },
                        warn: { icon: "⚠", iconColor: "#f9a825", textStyle: "color: #fff; font-weight: bold; background-color: #F9A825; padding: 0.125rem 0.5rem" },
                        error: { icon: "✖", iconColor: "#e57373", textStyle: "color: #fff; font-weight: bold; background-color: #e57373; padding: 0.125rem 0.5rem" },
                    },
                    a = { debug: e.DebugLevel.DEBUG, info: e.DebugLevel.INFO, warning: e.DebugLevel.WARNING, error: e.DebugLevel.ERROR };
                class i {
                    constructor(e) {
                        this.moduleName = e;
                    }
                    static setLevel(e) {
                        window.FLIXMATE_DEBUG_LEVEL = a[e];
                    }
                    log(e, ...t) {
                        console.log(`%c${n[e].icon} %c${this.moduleName} %c${t.shift()}`, `color: ${n[e].iconColor}; font-weight: bold;`, "color: #222; font-weight: bold", n[e].textStyle, ...t);
                    }
                    debug(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= a.debug && this.log("debug", ...e);
                    }
                    info(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= a.info && this.log("info", ...e);
                    }
                    success(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= a.info && this.log("success", ...e);
                    }
                    warn(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= a.warning && this.log("warn", ...e);
                    }
                    error(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= a.error && this.log("error", ...e);
                    }
                }
                const l = new i("Flixmate"),
                    r = i.setLevel;
                /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ function s(
                    e,
                    t,
                    o,
                    n
                ) {
                    return new (o || (o = Promise))(function (a, i) {
                        function l(e) {
                            try {
                                s(n.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function r(e) {
                            try {
                                s(n.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            var t;
                            e.done
                                ? a(e.value)
                                : ((t = e.value),
                                  t instanceof o
                                      ? t
                                      : new o(function (e) {
                                            e(t);
                                        })).then(l, r);
                        }
                        s((n = n.apply(e, t || [])).next());
                    });
                }
                class d extends Error {
                    constructor() {
                        super("Flixmate is not connected"), (this.name = "ConnectionError"), Error.captureStackTrace(this, d), Object.setPrototypeOf(this, d.prototype);
                    }
                }
                class u {
                    constructor(e, t, o, n, a) {
                        (this.host = e),
                            (this.port = t),
                            (this.addonId = o),
                            (this.onConnected = n),
                            (this.onDisconnected = a),
                            (this.ws = null),
                            (this.retryCallId = null),
                            (this.messageListeners = {}),
                            (this.responseResolvers = new Map());
                    }
                    isConnected() {
                        var e;
                        return (null === (e = this.ws) || void 0 === e ? void 0 : e.readyState) === WebSocket.OPEN;
                    }
                    connect(e = 3) {
                        var t;
                        l.info("Attempting connection with Flixmate service."),
                            this.isConnected() ||
                                (null === (t = this.ws) || void 0 === t ? void 0 : t.readyState) === WebSocket.CONNECTING ||
                                ((this.ws = new WebSocket(`ws://${this.host}:${this.port}`)),
                                (this.ws.onclose = (t) => {
                                    this.onDisconnected(),
                                        (t.wasClean && 1e3 === t.code && "DISCONNECT" === t.reason) ||
                                            ((e = e < 60 ? e : 60),
                                            l.error(`Connection with Flixmate service failed. Retrying in ${e} seconds.`),
                                            (this.retryCallId = window.setTimeout(() => {
                                                (this.retryCallId = null), this.connect(e + 3);
                                            }, 1e3 * e)));
                                }),
                                (this.ws.onopen = () => {
                                    l.success("Connected to Flixmate service."), this.onConnected(), (e = 3);
                                }),
                                (this.ws.onmessage = (e) => {
                                    let t;
                                    try {
                                        t = JSON.parse(e.data);
                                    } catch (e) {
                                        return;
                                    }
                                    const { type: o, id: n, action: a } = t;
                                    if ((l.debug("Message received from Flixmate service.", { message: t }), "response" !== o || null === n)) {
                                        if ("message" === o && null !== a && void 0 !== this.messageListeners[a]) {
                                            const e = (0, this.messageListeners[a])(t.data);
                                            return e && null !== n && this.sendResponse(n, a, e), void l.info(`Callback for message listener ${a} executed.`);
                                        }
                                        l.warn(`Listener for action "${a}" not registered.`);
                                    } else {
                                        const e = this.responseResolvers.get(n);
                                        void 0 !== e && (e(t.data), this.responseResolvers.delete(n));
                                    }
                                }));
                    }
                    disconnect() {
                        var e;
                        l.success("Disconnected from Flixmate service."), this.retryCallId && clearTimeout(this.retryCallId), null === (e = this.ws) || void 0 === e || e.close(1e3, "DISCONNECT"), (this.ws = null);
                    }
                    retryConnection() {
                        l.info("Retrying connection with Flixmate."), this.retryCallId && clearTimeout(this.retryCallId), this.connect();
                    }
                    sendResponse(e, t, o) {
                        var n;
                        return s(this, void 0, void 0, function* () {
                            if (!this.isConnected()) throw new d();
                            const a = yield Promise.resolve(o),
                                i = { type: "response", addonId: this.addonId, action: t, id: e, data: a };
                            l.debug("Sending response to flixmate service.", { id: e, message: i }), null === (n = this.ws) || void 0 === n || n.send(JSON.stringify(i));
                        });
                    }
                    onMessage(e, t) {
                        (this.messageListeners[e] = t), l.info(`Listener for action "${e}" added.`);
                    }
                    sendMessage(e, t = {}) {
                        return new Promise((o, n) => {
                            var a;
                            if (!this.isConnected()) return n(new d());
                            const i = `${e}-${Date.now()}`,
                                r = { type: "message", addonId: this.addonId, id: i, action: e, data: t };
                            return l.debug("Sending message to flixmate service.", { id: i, message: r }), this.responseResolvers.set(i, o), null === (a = this.ws) || void 0 === a ? void 0 : a.send(JSON.stringify(r));
                        });
                    }
                }
                function c(e) {
                    const t = Math.floor(e / 3600),
                        o = Math.floor((e - 3600 * t) / 60);
                    let n = e - 3600 * t - 60 * o;
                    n = Math.round(100 * n) / 100;
                    let a = "";
                    return (a = `${t < 10 ? `0${t}` : t}:`), (a += `${o < 10 ? `0${o}` : o}`), (a += `:${n < 10 ? `0${n}` : n}`), a;
                }
                class m {
                    constructor(e, t) {
                        (this.socket = e),
                            (this.options = t),
                            (this.onAddedListeners = []),
                            (this.onChangeListeners = []),
                            this.socket.onMessage("downloads.changed", (e) => {
                                this.onChangeListeners.forEach((t) => {
                                    t(e);
                                });
                            });
                    }
                    add(e) {
                        var t;
                        return s(this, void 0, void 0, function* () {
                            const o = ["mp3"].includes(e.format);
                            let n = e.length,
                                { startTime: a, endTime: i } = e;
                            null === a && i && (a = 0), a && null === i && (i = e.length), null !== a && null !== i && (n = i - a);
                            const l = yield this.socket.sendMessage("downloads.add", {
                                trackUrl: e.trackUrl,
                                quality: e.quality.toLowerCase(),
                                videoUrl: o ? e.audioUrl : e.videoUrl,
                                audioUrl: o ? null : e.audioUrl,
                                startTime: a ? c(a) : "",
                                endTime: i ? c(i) : "",
                                mediaTime: c(n),
                                format: e.format,
                                title: e.title,
                                thumbnailUrl: e.thumbnailUrl,
                                avoidFilenameCollision: null !== (t = this.options.avoidFilenameCollision) && void 0 !== t && t,
                            });
                            return (
                                this.onAddedListeners.forEach((e) => {
                                    e(l);
                                }),
                                l
                            );
                        });
                    }
                    get(e, t) {
                        return this.socket.sendMessage("downloads.get", { limit: e, offset: t });
                    }
                    pause(e) {
                        return this.socket.sendMessage("downloads.pause", { id: e });
                    }
                    resume(e) {
                        return this.socket.sendMessage("downloads.resume", { id: e });
                    }
                    cancel(e) {
                        return this.socket.sendMessage("downloads.cancel", { id: e });
                    }
                    delete(e) {
                        return this.socket.sendMessage("downloads.delete", { id: e });
                    }
                    play(e) {
                        return this.socket.sendMessage("downloads.play", { id: e });
                    }
                    clear() {
                        return this.socket.sendMessage("downloads.clear");
                    }
                    showFolder() {
                        return this.socket.sendMessage("downloads.show-folder");
                    }
                    changeFolder() {
                        return this.socket.sendMessage("downloads.folder-select");
                    }
                    onAdded(e) {
                        this.onAddedListeners.push(e);
                    }
                    onChange(e) {
                        this.onChangeListeners.push(e);
                    }
                }
                class p {
                    constructor(e, t = !1) {
                        (this.isSupported = !0),
                            (this.onConnectedListeners = []),
                            (this.onDisconnectedListeners = []),
                            (this.socket = new u(
                                "localhost",
                                8999,
                                e.addonId,
                                () => {
                                    this.onConnectedListeners.forEach((e) => e());
                                },
                                () => {
                                    this.onDisconnectedListeners.forEach((e) => e());
                                }
                            )),
                            (this.downloads = new m(this.socket, e)),
                            (this.isSupported = t || window.navigator.userAgent.toLowerCase().includes("windows")),
                            this.socket.onMessage("addon.info", () => ({ id: e.addonId, name: e.addonName, version: e.addonVersion }));
                    }
                    get isConnected() {
                        return this.socket.isConnected();
                    }
                    connect() {
                        this.socket.connect();
                    }
                    disconnect() {
                        this.socket.disconnect();
                    }
                    retryConnection() {
                        return this.socket.retryConnection();
                    }
                    onConnected(e) {
                        this.onConnectedListeners.push(e);
                    }
                    onDisconnected(e) {
                        this.onDisconnectedListeners.push(e);
                    }
                    info() {
                        return this.socket.sendMessage("app.info");
                    }
                    getDownloadOptions() {
                        return this.socket.sendMessage("downloadOptions.get");
                    }
                    setDownloadOptions(e) {
                        return this.socket.sendMessage("downloadOptions.change", e);
                    }
                    onUpdateAvailable(e) {
                        this.socket.onMessage("app.update-available", e);
                    }
                    onExceptionCaught(e) {
                        this.socket.onMessage("app.exception-caught", e);
                    }
                }
                (p.setDebugLevel = r), (e.default = p), Object.defineProperty(e, "__esModule", { value: !0 });
            })(t);
        },
        7386: (e, t, o) => {    //L.A
            "use strict";
            o.d(t, { A: () => s });
            var n = o(9902),
                a = o(817),
                i = o(3300),
                l = o(5157);
            const r = (0, a.Kh)({ loading: !0, error: !1, errorMessage: null, info: null, downloadsCount: { browser: 0, flixmate: 0, total: 0 }, showRatingCard: !0 });
            l.A.message.send("background.downloads-counter.get-count").then((e) => {
                if (e && !e.error && e.data) {
                    const { browser: t, flixmate: o, total: n } = e.data;
                    (r.downloadsCount.browser = t), (r.downloadsCount.flixmate = o), (r.downloadsCount.total = n);
                }
            }),
                l.A.message.on("background.downloads-counter:updated", ({ browser: e, flixmate: t, total: o }) => {
                    (r.downloadsCount.browser = e), (r.downloadsCount.flixmate = t), (r.downloadsCount.total = o);
                });
            const s = () => {
                const e = async (e, t) => {
                    const o = await l.A.message.send("background.download", { filename: e, url: t });
                    if (!o) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                    if (o.error) throw new Error(o.errorMessage);
                };
                return {
                    ...(0, a.QW)(r),
                    fetchVideoInfo: async (e, t = null, o = null) => {
                        if (null !== r.info) return;
                        const n = await l.A.message.send("background.youtube-downloader.get-video-info", { videoId: e, playerResponse: t, playerJsUrl: o });
                        void 0 === n || n.error || void 0 === n.data
                            ? void 0 !== n && n.error
                                ? ((r.error = !0), (r.errorMessage = n.errorMessage || __t("videoInfoGenericError", "An error occurred, Please try again.")))
                                : ((r.error = !0), (r.errorMessage = __t("videoInfoGenericError", "An error occurred, Please try again.")))
                            : (({ info: r.info, showRatingCard: r.showRatingCard } = n.data), (r.info.thumbnails = r.info.thumbnails.reverse())),
                            (r.loading = !1);
                    },
                    resetVideoInfo: () => {
                        (r.error = !1), (r.errorMessage = null), (r.info = null), (r.loading = !0);
                    },
                    downloadVideo: async (t) => {
                        const o = r.info?.downloads.find((e) => e.itag === t) || r.info?.dashFormatDownloads.find((e) => e.itag === t);
                        if (void 0 === o) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        const n = new URL(o.url);
                        r.info?.id && n.searchParams.set("video_id", r.info?.id);
                        const a = `${r.info?.title || "video"}.${o.format}`;
                        await e(a, n.href);
                    },
                    generateMP3Download: async (e) => {
                        const t = await l.A.message.send("background.youtube-downloader.generate-mp3-download", e);
                        if (!t) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        if (t.error) throw new Error(t.errorMessage);
                        return t.data?.taskId;
                    },
                    generateMP4Download: async (e) => {
                        const t = await l.A.message.send("background.youtube-downloader.generate-mp4-download", e);
                        if (!t) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        if (t.error) throw new Error(t.errorMessage);
                        return t.data?.taskId;
                    },
                    getDownloadStatus: async (e) => {
                        const t = await l.A.message.send("background.youtube-downloader.download-status", { taskId: e });
                        if (!t) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        if (t.error) throw new Error(t.errorMessage);
                        if (!t.data) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        return "complete" === t.data.status.state && l.A.message.send("background.download-url", { url: t.data.status.downloadUrl }), t.data.status;
                    },
                    downloadSubtitle: async (t, o) => {
                        const a = r.info?.subtitles?.[t];
                        if (!r.info || !r.info.subtitles || !a) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        const i = `${r.info.title}.${a.languageCode}.${o}`;
                        let l;
                        if ("srt" === o) {
                            const e = new URL(a.url);
                            e.searchParams.set("fmt", "vtt");
                            const t = ((e) => {
                                    const t = e.split("\n"),
                                        o = [];
                                    let n = 0;
                                    return (
                                        t.forEach((e) => {
                                            let t = e
                                                .trim()
                                                .replace(/(WEBVTT\s*(FILE)?.*)(\r\n)*/g, "")
                                                .replace(/(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)-->(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g, "$1,$2--\x3e$3,$4")
                                                .replace(/<.+>(.+)/g, "$1")
                                                .replace(/<.+>(.+)<.+\/>/g, "$1")
                                                .trim();
                                            t && !/^Kind:|^Language:/m.test(t) && (/^[0-9]+:/m.test(t) && (t = `${0 !== n ? "\r\n" : ""}${++n}\r\n${t}`), o.push(t));
                                        }),
                                        o.join("\r\n")
                                    );
                                })((await (0, n.A)(e.href)).data),
                                o = new Blob([t], { type: "application/x-subrip" });
                            l = URL.createObjectURL(o);
                        } else {
                            const e = new URL(a.url);
                            e.searchParams.set("fmt", o), (l = e.href);
                        }
                        await e(i, l);
                    },
                    downloadThumbnail: async (t) => {
                        const o = r.info?.thumbnails[t];
                        if (!o) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        const n = `${r.info?.title} - ${o.width}x${o.height}.jpg`;
                        await e(n, o.url);
                    },
                    addFlixmateVideoDownload: async (e, t = "mp4", o = null, n = null) => {
                        if (!r.info || void 0 === r.info.flixmate.videoDownloads[e] || !r.info.flixmate.audioDownload) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        const a = r.info.flixmate.videoDownloads[e],
                            s = r.info.flixmate.audioDownload,
                            d = {
                                trackUrl: `https://www.youtube.com/watch?v=${r.info.id}`,
                                quality: r.info.flixmate.videoDownloads[e].quality,
                                videoUrl: a.url,
                                audioUrl: s.url,
                                length: r.info.length,
                                startTime: o,
                                endTime: n,
                                format: t,
                                title: r.info.title,
                                thumbnailUrl: r.info.thumbnailUrl,
                            },
                            u = {
                                id: `temp:${d.quality}:${d.title}`,
                                trackUrl: d.trackUrl,
                                title: d.title,
                                format: d.format,
                                quality: d.quality,
                                state: i.DownloadState.QUEUED,
                                progress: null,
                                size: null,
                                createdAt: Date.now(),
                                errorMessage: null,
                            },
                            c = new CustomEvent("flixmate-download-added", { detail: { download: u } });
                        document.dispatchEvent(c);
                        const m = await l.A.message.send("background.flixmate.add-download", { request: d });
                        if (!m) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        if (m.error) throw new Error(m.errorMessage);
                    },
                    addFlixmateMp3Download: async (e, t = null, o = null) => {
                        if (!r.info || !r.info.flixmate.audioDownload) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        const n = r.info.flixmate.audioDownload,
                            a = {
                                trackUrl: `https://www.youtube.com/watch?v=${r.info.id}`,
                                quality: `${e}kbps`,
                                videoUrl: null,
                                audioUrl: n.url,
                                length: r.info.length,
                                startTime: t,
                                endTime: o,
                                format: "mp3",
                                title: r.info.title,
                                thumbnailUrl: r.info.thumbnailUrl,
                            },
                            i = await l.A.message.send("background.flixmate.add-download", { request: a });
                        if (!i) throw new Error(__t("genericDownloadError", "An error occurred, Please try again."));
                        if (i.error) throw new Error(i.errorMessage);
                    },
                    openFlixmateHomepage: () => {
                        l.A.message.send("background.flixmate.open-download-page");
                    },
                    openRatingPage: () => {
                        l.A.message.send("background.open-review-page"), (r.showRatingCard = !1);
                    },
                    setRated: () => {
                        l.A.message.send("background.set-rated");
                    },
                };
            };
        },
        7200: (e, t, o) => {
            "use strict";
            var n = o(3675),
                a = o.n(n),
                i = o(7450),
                l = o(1704),
                r = o(4843),
                s = o(2525),
                d = o(7094),
                u = o(364),
                c = o(4125),
                m = o(7480),
                p = o(535),
                f = o(6638),
                h = o(4771),
                w = o(5610),
                g = o(3555),
                b = o(7745),
                v = o(3939),
                y = o(4804),
                _ = o(9398),
                x = o(3021),
                k = o(4594),
                T = o(3762),
                C = o(5157),
                E = o(7305);
            var D = o(817),
                L = o(7386),
                F = o(5916);
            const A = { class: "toolbar" },
                R = { key: 0 };
            console.log('test-->7200', {o})
            const S = {
                    homeButtonTooltip: __t("popupHomeButtonTooltip", "Go to home section"),
                    downloadsButtonTooltip: __t("popupDownloadsButtonTooltip", "Show downloads"),
                    videoButtonTooltip: __t("popupVideoButtonTooltip", "Go to video section"),
                    themeToggleButtonTooltip: __t("popupThemeToggleButtonTooltip", "Switch theme"),
                    themeMenuSystemLabel: __t("popupThemeMenuSystemLabel", "System default"),
                    themeMenuDarkLabel: __t("popupThemeMenuDarkLabel", "Dark theme"),
                    themeMenuLightLabel: __t("popupThemeMenuLightLabel", "Light theme"),
                    optionsButtonTooltip: __t("popupOptionsButtonTooltip", "Open options page"),
                },
                O = (0, E.pM)({
                    name: "Toolbar",
                    props: { activeSection: { type: String, required: !0 }, hasVideo: { type: Boolean, required: !0 }, downloadsCount: { type: Number, required: !0 } },
                    emits: ["change-section"],
                    setup() {
                        const { version: e } = a().runtime.getManifest(),
                            t = (0, D.KR)(C.A.options.theme),
                            { loading: o, error: n } = (0, L.A)(),
                            i = (0, D.KR)(null),
                            l = (0, D.KR)(!1),
                            r = (0, E.EW)(() => ("system" === t.value ? "contrast" : "dark" === t.value ? "moon" : "sunny"));
                        return {
                            locale: S,
                            version: e,
                            theme: t,
                            loadingVideo: o,
                            videoError: n,
                        };
                            // switchThemeButtonEl: i,
                            // switchThemeButtonIcon: r,
                            // switchThemeMenuOpen: l,
                            // switchTheme: function (e) {
                            //     (t.value = e), C.A.options.set("theme", e);
                            // },
                            // openOptionsPage: function () {
                            //     a().runtime.openOptionsPage();
                            // },
                    },
                });
            var U = o(3726);
            const B = (0, U.A)(O, [
                    [
                        "render",
                        function (e, t, o, n, a, l) {
                            const r = (0, E.g2)("icon"),
                                s = (0, E.g2)("dropdown-menu-item"),
                                d = (0, E.g2)("dropdown-menu"),
                                u = (0, E.gN)("tooltip");
                            return (
                                (0, E.uX)(),
                                (0, E.CE)("header", A, [
                                    (0, E.bo)((0, E.Lk)("p", { class: "toolbar__version" }, " v" + (0, F.v_)(e.version), 513), [[i.aG, "home" === e.activeSection]]),
                                    (0, E.Lk)(
                                        "ul",
                                        { class: (0, F.C4)(["toolbar__actions", { "is-light": "downloader" === e.activeSection && !e.loadingVideo && !e.videoError }]) },
                                        [
                                            e.hasVideo
                                                ? ((0, E.uX)(),
                                                  (0, E.CE)("li", R, [
                                                      (0, E.bo)(
                                                          ((0, E.uX)(),
                                                          (0, E.CE)("button", { onClick: t[0] || (t[0] = (0, i.D$)((t) => e.$emit("change-section", "home" === e.activeSection ? "downloader" : "home"), ["prevent"])) }, [
                                                              (0, E.bF)(r, { name: "home" === e.activeSection ? "videocam" : "home" }, null, 8, ["name"]),
                                                          ])),
                                                          [[u, "home" === e.activeSection ? e.locale.videoButtonTooltip : e.locale.homeButtonTooltip, void 0, { left: !0 }]]
                                                      ),
                                                  ]))
                                                : (0, E.Q3)("v-if", !0),
                                            (0, E.Lk)("li", null, [
                                                (0, E.bo)(
                                                    ((0, E.uX)(),
                                                    (0, E.CE)("button", { ref: "switchThemeButtonEl", onClick: t[1] || (t[1] = (0, i.D$)((t) => (e.switchThemeMenuOpen = !e.switchThemeMenuOpen), ["prevent"])) }, [
                                                        (0, E.bF)(r, { name: e.switchThemeButtonIcon }, null, 8, ["name"]),
                                                    ])),
                                                    [[u, e.locale.themeToggleButtonTooltip, void 0, { left: !0 }]]
                                                ),
                                                (0, E.bF)(
                                                    d,
                                                    {
                                                        modelValue: e.theme,
                                                        "onUpdate:modelValue": t[2] || (t[2] = (t) => (e.theme = t)),
                                                        direction: "left",
                                                        target: e.switchThemeButtonEl,
                                                        "is-open": e.switchThemeMenuOpen,
                                                        onChange: e.switchTheme,
                                                        onClose: t[3] || (t[3] = (t) => (e.switchThemeMenuOpen = !1)),
                                                    },
                                                    {
                                                        default: (0, E.k6)(() => [
                                                            (0, E.bF)(s, { icon: "contrast", value: "system", label: e.locale.themeMenuSystemLabel }, null, 8, ["label"]),
                                                            (0, E.bF)(s, { icon: "moon", value: "dark", label: e.locale.themeMenuDarkLabel }, null, 8, ["label"]),
                                                            (0, E.bF)(s, { icon: "sunny", value: "light", label: e.locale.themeMenuLightLabel }, null, 8, ["label"]),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    ["modelValue", "target", "is-open", "onChange"]
                                                ),
                                            ]),
                                            (0, E.Lk)("li", null, [
                                                (0, E.bo)(
                                                    ((0, E.uX)(), (0, E.CE)("button", { onClick: t[4] || (t[4] = (0, i.D$)((...t) => e.openOptionsPage && e.openOptionsPage(...t), ["prevent"])) }, [(0, E.bF)(r, { name: "settings" })])),
                                                    [[u, e.locale.optionsButtonTooltip, void 0, { left: !0 }]]
                                                ),
                                            ]),
                                        ],
                                        2
                                    ),
                                ])
                            );
                        },
                    ],
                ]),
                P = { class: "home" },
                M = { class: "home__thumbnail" },
                N = ["src"],
                q = { class: "home__title" },
                I = { class: "home__description" },
                $ = { class: "home__links" },
                X = { class: "home__link-text" },
                V = { class: "home__link-text" },
                j = { class: "home__link-text" },
                Q = { key: 0, class: "home__alerts" },
                H = ["href"];
            const W = {
                    linkHowToUseText: __t("popupHomeLinkHowToUseText", "How to Use"),
                    linkFeatureRequestText: __t("popupHomeLinkFeatureRequestText", "Feature Request"),
                    linkDownloadsText: __t("popupHomeLinkDownloadsText", "Downloads"),
                    linkReportBugText: __t("popupHomeLinkReportBugText", "Report a Bug"),
                    alertsHeading: __t("popupHomeAlertsHeading", "Recent alerts"),
                },
                K = (0, E.pM)({
                    name: "Home",
                    props: { downloadsCount: { type: Number, required: !0 } },
                    setup() {
                        const e = a().runtime.getManifest(),
                            { name: t, description: o } = e,
                            n = a().runtime.getURL("icons/icon-popup.png"),
                            i = (0, D.KR)([]),
                            l = {
                                homepage: "https://addoncrop.com/extension/?id=44",
                                howToUse: "https://addoncrop.com/help-category/youtube-video-downloader/",
                                featureRequest: "https://addoncrop.com/feature-request/?id=44",
                                bugReport: "https://addoncrop.com/contact/?source=action&addon=44#Bug-Report",
                            };
                        return (
                            C.A.message.send("background.notifications.get").then((e) => {
                                if (!e || e.error || !e.data) return;
                                i.value = e.data.notifications;
                                const t = i.value.reduce((e, t) => (t.read || e.push(t.id), e), []);
                                t.length > 0 && C.A.message.send("background.notifications.markAsRead", { readIds: t });
                            }),
                            {
                                locale: W,
                                name: t,
                                description: o,
                                thumbnailUrl: n,
                                notifications: i,
                                urls: l,
                                closeNotification: function (e) {
                                    C.A.message.send("background.notifications.close", { id: e });
                                },
                                openTab: function (e) {
                                    C.A.message.send("background.create-tab", { url: e });
                                },
                            }
                        );
                    },
                }),
                z = (0, U.A)(K, [
                    [
                        "render",
                        function (e, t, o, n, a, l) {
                            const r = (0, E.g2)("icon"),
                                s = (0, E.g2)("alert");
                            return (
                                (0, E.uX)(),
                                (0, E.CE)("section", P, [
                                    (0, E.Lk)("div", M, [(0, E.Lk)("img", { src: e.thumbnailUrl }, null, 8, N)]),
                                    (0, E.Lk)("h1", q, [(0, E.Lk)("a", { href: "#", onClick: t[0] || (t[0] = (0, i.D$)((t) => e.openTab(e.urls.homepage), ["prevent"])) }, (0, F.v_)(e.name), 1)]),
                                    (0, E.Lk)("p", I, (0, F.v_)(e.description), 1),
                                    (0, E.Lk)("ul", $, [
                                        (0, E.Lk)("li", null, [
                                            (0, E.Lk)("a", { href: "#", class: "home__link", onClick: t[1] || (t[1] = (0, i.D$)((t) => e.openTab(e.urls.howToUse), ["prevent"])) }, [
                                                (0, E.bF)(r, { name: "help-circle" }),
                                                (0, E.Lk)("span", X, (0, F.v_)(e.locale.linkHowToUseText), 1),
                                            ]),
                                        ]),
                                        (0, E.Lk)("li", null, [
                                            (0, E.Lk)("a", { href: "#", class: "home__link", onClick: t[2] || (t[2] = (0, i.D$)((t) => e.openTab(e.urls.featureRequest), ["prevent"])) }, [
                                                (0, E.bF)(r, { name: "extension-puzzle" }),
                                                (0, E.Lk)("span", V, (0, F.v_)(e.locale.linkFeatureRequestText), 1),
                                            ]),
                                        ]),
                                        (0, E.Lk)("li", null, [
                                            (0, E.Lk)("a", { href: "#", class: "home__link", onClick: t[3] || (t[3] = (0, i.D$)((t) => e.openTab(e.urls.bugReport), ["prevent"])) }, [
                                                (0, E.bF)(r, { name: "bug" }),
                                                (0, E.Lk)("span", j, (0, F.v_)(e.locale.linkReportBugText), 1),
                                            ]),
                                        ]),
                                        (0, E.Q3)(
                                            ' <li>\n                <a href="#" class="home__link" @click.prevent="openDownloadsPage">\n                    <span v-if="downloadsCount > 0" class="home__link-badge">\n                        {{ downloadsCount }}\n                    </span>\n                    <icon name="download" />\n                    <span class="home__link-text">{{ locale.linkDownloadsText }}</span>\n                </a>\n            </li> '
                                        ),
                                    ]),
                                    e.notifications.length > 0
                                        ? ((0, E.uX)(),
                                          (0, E.CE)("div", Q, [
                                              (0, E.Lk)("h5", null, (0, F.v_)(e.locale.alertsHeading), 1),
                                              ((0, E.uX)(!0),
                                              (0, E.CE)(
                                                  E.FK,
                                                  null,
                                                  (0, E.pI)(
                                                      e.notifications,
                                                      (t) => (
                                                          (0, E.uX)(),
                                                          (0, E.Wv)(
                                                              s,
                                                              {
                                                                  key: t.id,
                                                                  type: t.type,
                                                                  title: t.title,
                                                                  closable: t.closable,
                                                                  "on-close": () => {
                                                                      e.closeNotification(t.id);
                                                                  },
                                                              },
                                                              {
                                                                  default: (0, E.k6)(() => [
                                                                      (0, E.eW)((0, F.v_)(t.message) + " ", 1),
                                                                      ((0, E.uX)(!0),
                                                                      (0, E.CE)(
                                                                          E.FK,
                                                                          null,
                                                                          (0, E.pI)(t.links, (e, t) => ((0, E.uX)(), (0, E.CE)("a", { key: t, href: e.url, class: (0, F.C4)(`is-${e.type}`), target: "_blank" }, (0, F.v_)(e.label), 11, H))),
                                                                          128
                                                                      )),
                                                                  ]),
                                                                  _: 2,
                                                              },
                                                              1032,
                                                              ["type", "title", "closable", "on-close"]
                                                          )
                                                      )
                                                  ),
                                                  128
                                              )),
                                          ]))
                                        : (0, E.Q3)("v-if", !0),
                                ])
                            );
                        },
                    ],
                ]),
                G = { class: "downloader" },
                J = { key: 0, class: "downloader__loader" },
                Y = { key: 1, class: "downloader__error" },
                Z = { key: 0 },
                ee = { key: 2, class: "downloader__content" },
                te = { class: "downloader-header__title" },
                oe = { class: "downloader-header__meta" },
                ne = { key: 0 },
                ae = { key: 1 },
                ie = { key: 2 },
                le = { key: 0, class: "downloader-tabs" },
                re = { class: "downloader-tabs__buttons" },
                se = ["title"],
                de = ["title"],
                ue = ["title"],
                ce = ["title"],
                me = { class: "downloader-tabs__content" },
                pe = { key: 1, class: "downloader__unavailable" };
            var fe = o(8364),
                he = o(6219),
                we = o(2716),
                ge = o(8442),
                be = o(2344);
            const ve = {
                    loadingText: __t("popupDownloaderLoadingText", "Loading video details..."),
                    errorText: __t("popupDownloaderErrorText", "Failed to get video details"),
                    notAvailableMessage: __t("popupDownloaderNotAvailableMessage", "Downloads are not available for live or upcoming videos."),
                    tabSDLabel: __t("popupDownloaderTabSDLabel", "Downloads"),
                    tabMP3Label: __t("popupDownloaderTabMP3Label", "Convert to MP3"),
                    tabUHDLabel: __t("popupDownloaderTabUHDLabel", "Ultra HD"),
                    tabThumbnailsLabel: __t("popupDownloaderTabThumbnailsLabel", "Thumbnails"),
                    tabSubtitlesLabel: __t("popupDownloaderTabSubtitlesLabel", "Subtitles"),
                },
                ye = (0, E.pM)({
                    name: "Downloader",
                    components: { Downloads: he.A, Mp3Converter: we.A, SubtitlesDownload: ge.A, ThumbnailsDownload: be.A },
                    props: { videoId: { type: String, required: !0 } },
                    setup(e) {
                        const { fetchVideoInfo: t, loading: o, error: n, errorMessage: a, info: i } = (0, L.A)(),
                            l = (0, D.KR)(null),
                            r = (0, D.KR)(null),
                            s = (0, D.KR)("sd");
                        return (
                            t(e.videoId).then(() => {
                                null !== i.value && ((l.value = (0, fe.A)(i.value.length)), (r.value = i.value.views ? i.value.views.toLocaleString() : null));
                            }),
                            { locale: ve, loading: o, error: n, errorMessage: a, info: i, length: l, views: r, activeTab: s }
                        );
                    },
                }),
                _e = (0, U.A)(ye, [
                    [
                        "render",
                        function (e, t, o, n, a, l) {
                            const r = (0, E.g2)("loader"),
                                s = (0, E.g2)("icon"),
                                d = (0, E.g2)("downloads"),
                                u = (0, E.g2)("mp3-converter"),
                                c = (0, E.g2)("thumbnails-download"),
                                m = (0, E.g2)("subtitles-download");
                            return (
                                (0, E.uX)(),
                                (0, E.CE)("section", G, [
                                    e.loading
                                        ? ((0, E.uX)(), (0, E.CE)("div", J, [(0, E.bF)(r), (0, E.Lk)("p", null, (0, F.v_)(e.locale.loadingText), 1)]))
                                        : !e.loading && e.error
                                        ? ((0, E.uX)(),
                                          (0, E.CE)("div", Y, [
                                              (0, E.bF)(s, { name: "close-circle", type: "danger" }),
                                              (0, E.Lk)("h6", null, (0, F.v_)(e.locale.errorText), 1),
                                              null !== e.errorMessage ? ((0, E.uX)(), (0, E.CE)("p", Z, (0, F.v_)(e.errorMessage), 1)) : (0, E.Q3)("v-if", !0),
                                          ]))
                                        : e.loading || null === e.info
                                        ? (0, E.Q3)("v-if", !0)
                                        : ((0, E.uX)(),
                                          (0, E.CE)("div", ee, [
                                              (0, E.Lk)(
                                                  "header",
                                                  { class: "downloader-header", style: (0, F.Tr)(`background-image: url(${e.info.thumbnailUrl});`) },
                                                  [
                                                      (0, E.Lk)("h3", te, [(0, E.Lk)("small", null, (0, F.v_)(e.info.author), 1), (0, E.eW)(" " + (0, F.v_)(e.info.title), 1)]),
                                                      (0, E.Lk)("ul", oe, [
                                                          null !== e.info.category ? ((0, E.uX)(), (0, E.CE)("li", ne, [(0, E.bF)(s, { name: "pricetags" }), (0, E.eW)(" " + (0, F.v_)(e.info.category), 1)])) : (0, E.Q3)("v-if", !0),
                                                          (0, E.Q3)(" Checks for live or upcoming videos "),
                                                          e.info.length > 0 ? ((0, E.uX)(), (0, E.CE)("li", ae, [(0, E.bF)(s, { name: "time" }), (0, E.eW)(" " + (0, F.v_)(e.length), 1)])) : (0, E.Q3)("v-if", !0),
                                                          e.info.views && e.info.views > 0 ? ((0, E.uX)(), (0, E.CE)("li", ie, [(0, E.bF)(s, { name: "eye" }), (0, E.eW)(" " + (0, F.v_)(e.views), 1)])) : (0, E.Q3)("v-if", !0),
                                                      ]),
                                                  ],
                                                  4
                                              ),
                                              e.info.isLive || e.info.isUpcoming
                                                  ? ((0, E.uX)(), (0, E.CE)("div", pe, [(0, E.bF)(s, { name: "warning", type: "warning" }), (0, E.Lk)("p", null, (0, F.v_)(e.locale.notAvailableMessage), 1)]))
                                                  : ((0, E.uX)(),
                                                    (0, E.CE)("main", le, [
                                                        (0, E.Lk)("ul", re, [
                                                            (0, E.Lk)(
                                                                "li",
                                                                { class: (0, F.C4)({ "is-selected": "sd" === e.activeTab }) },
                                                                [
                                                                    (0, E.Lk)(
                                                                        "button",
                                                                        { title: e.locale.tabSDLabel, onClick: t[0] || (t[0] = (t) => (e.activeTab = "sd")) },
                                                                        [(0, E.bF)(s, { name: "videocam" }), (0, E.Lk)("span", null, (0, F.v_)(e.locale.tabSDLabel), 1)],
                                                                        8,
                                                                        se
                                                                    ),
                                                                ],
                                                                2
                                                            ),
                                                            (0, E.Lk)(
                                                                "li",
                                                                { class: (0, F.C4)({ "is-selected": "mp3" === e.activeTab }) },
                                                                [
                                                                    (0, E.Lk)(
                                                                        "button",
                                                                        { title: e.locale.tabMP3Label, onClick: t[1] || (t[1] = (t) => (e.activeTab = "mp3")) },
                                                                        [(0, E.bF)(s, { name: "musical-notes" }), (0, E.Lk)("span", null, (0, F.v_)(e.locale.tabMP3Label), 1)],
                                                                        8,
                                                                        de
                                                                    ),
                                                                ],
                                                                2
                                                            ),
                                                            (0, E.Q3)(
                                                                ' <li\n                        v-if="info.flixmate.isSupported"\n                        :class="{ \'is-selected\': activeTab === \'uhd\' }"\n                    >\n                        <button :title="locale.tabUHDLabel" @click="activeTab = \'uhd\'">\n                            <icon name="collection-play-fill" />\n                            <span>{{ locale.tabUHDLabel }}</span>\n                        </button>\n                    </li> '
                                                            ),
                                                            (0, E.Lk)(
                                                                "li",
                                                                { class: (0, F.C4)({ "is-selected": "thumbnails" === e.activeTab }) },
                                                                [
                                                                    (0, E.Lk)(
                                                                        "button",
                                                                        { title: e.locale.tabThumbnailsLabel, onClick: t[2] || (t[2] = (t) => (e.activeTab = "thumbnails")) },
                                                                        [(0, E.bF)(s, { name: "image" }), (0, E.Lk)("span", null, (0, F.v_)(e.locale.tabThumbnailsLabel), 1)],
                                                                        8,
                                                                        ue
                                                                    ),
                                                                ],
                                                                2
                                                            ),
                                                            (0, E.Lk)(
                                                                "li",
                                                                { class: (0, F.C4)({ "is-selected": "subtitles" === e.activeTab }) },
                                                                [
                                                                    (0, E.Lk)(
                                                                        "button",
                                                                        { title: e.locale.tabSubtitlesLabel, onClick: t[3] || (t[3] = (t) => (e.activeTab = "subtitles")) },
                                                                        [(0, E.bF)(s, { name: "logo-closed-captioning" }), (0, E.Lk)("span", null, (0, F.v_)(e.locale.tabSubtitlesLabel), 1)],
                                                                        8,
                                                                        ce
                                                                    ),
                                                                ],
                                                                2
                                                            ),
                                                        ]),
                                                        (0, E.Lk)("div", me, [
                                                            (0, E.bo)((0, E.bF)(d, null, null, 512), [[i.aG, "sd" === e.activeTab]]),
                                                            "mp3" === e.activeTab ? ((0, E.uX)(), (0, E.Wv)(u, { key: 0 })) : (0, E.Q3)("v-if", !0),
                                                            (0, E.Q3)("\n                    <flixmate-downloads v-show=\"activeTab === 'uhd'\" />\n                    "),
                                                            "thumbnails" === e.activeTab ? ((0, E.uX)(), (0, E.Wv)(c, { key: 1 })) : (0, E.Q3)("v-if", !0),
                                                            "subtitles" === e.activeTab ? ((0, E.uX)(), (0, E.Wv)(m, { key: 2 })) : (0, E.Q3)("v-if", !0),
                                                        ]),
                                                    ])),
                                          ])),
                                ])
                            );
                        },
                    ],
                ]),
                xe = (0, E.pM)({
                    name: "Popup",
                    components: { Toolbar: B, Home: z, Downloader: _e },
                    props: { videoId: { type: String, default: null } },
                    setup(e) {
                        const t = (0, D.KR)(e.videoId ? "downloader" : "home"),
                            { downloadsCount: o } = (0, L.A)();
                        return { app: C.A, activeSection: t, downloadsCount: o };
                    },
                }),
                ke = (0, U.A)(xe, [
                    [
                        "render",
                        function (e, t, o, n, a, l) {
                            const r = (0, E.g2)("toolbar"),
                                s = (0, E.g2)("home"),
                                d = (0, E.g2)("downloader");
                            return (
                                (0, E.uX)(),
                                (0, E.CE)(
                                    E.FK,
                                    null,
                                    [
                                        (0, E.bF)(
                                            r,
                                            { "active-section": e.activeSection, "downloads-count": e.downloadsCount.total, "has-video": null !== e.videoId, onChangeSection: t[0] || (t[0] = (t) => (e.activeSection = t)) },
                                            null,
                                            8,
                                            ["active-section", "downloads-count", "has-video"]
                                        ),
                                        (0, E.bo)((0, E.bF)(s, { "downloads-count": e.downloadsCount.total }, null, 8, ["downloads-count"]), [[i.aG, "home" === e.activeSection]]),
                                        e.videoId ? (0, E.bo)(((0, E.uX)(), (0, E.Wv)(d, { key: 0, "video-id": e.videoId }, null, 8, ["video-id"])), [[i.aG, "downloader" === e.activeSection]]) : (0, E.Q3)("v-if", !0),
                                    ],
                                    64
                                )
                            );
                        },
                    ],
                ]);
            (async () => {
                (0, l.localizeByAttribute)(),
                    await C.A.options.Ready,
                    await C.A.userStorage.Ready,
                    "system" !== C.A.options.theme && (document.documentElement.dataset.shardTheme = C.A.options.theme),
                    C.A.options.onChange("theme", (e) => {
                        "system" === e ? delete document.documentElement.dataset.shardTheme : (document.documentElement.dataset.shardTheme = e);
                    });
                const [e] = await a().tabs.query({ active: !0, currentWindow: !0 }),
                    t = e?.url ? T.A.extractVideoId(e.url) : null;
                (0, i.Ef)(ke, { videoId: t })
                    .use(l.localePlugin)
                    .use(r.A)
                    .use(s.A)
                    .component("row", d.A)
                    .component("column", u.A)
                    .component("icon", c.A)
                    .component("alert", m.A)
                    .component("s-button", p.A)
                    .component("loader", f.A)
                    .component("form-item", h.A)
                    .component("dropdown-menu", w.A)
                    .component("dropdown-menu-item", g.A)
                    .component("select-menu", b.A)
                    .component("select-option", v.A)
                    .component("range-slider", y.A)
                    .component("time-span", _.A)
                    .component("radio-group", x.A)
                    .component("radio", k.A)
                    .mount("#root");
            })();
        },
        7525: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => n });
            const n = {
                theme: "system",
                extensionDisplayMode: "full",
                showDownloadNotifications: !0,
                embeddedDownloadsEnabled: !0,
                downloadButtonOnUrlsEnabled: !0,
                formats: ["mp4", "m4a", "webm"],
                dashFormats: "none",
                mp3DefaultBitrate: 128,
                copyToClipboardButtonEnabled: !0,
                qrGeneratorButtonEnabled: !0,
                saveAsDialogEnabled: !1,
                flixmateEnabled: !0,
                flixmateFormats: ["mp4", "mkv", "avi"],
                flixmateUseMultithreading: !0,
                preferredVideoPlaybackQuality: "disabled",
                menuOrder: ["dark-mode", "cinema-mode", "pic-in-pic", "float-video", "looper"],
                hiddenMenuOrder: ["smart-pause", "autoplay", "mousewheel-volume-control", "video-search", "hide-comments", "options"],
                floatVideoEnabled: !1,
                smartPauseEnabled: !1,
                audioModeEnabled: !1,
                mousewheelVolumeControlEnabled: !1,
                videoSearchEnabled: !1,
                hideCommentsEnabled: !1,
            };
        },
        1032: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => n });
            const n = { mp3FlixmateAlertMinimized: !1, flixmatePromoMinimized: !1 };
        },
        5497: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => n });
            const n = (e) => {
                const t = Math.floor(Math.log(e) / Math.log(1024));
                return 0 === e ? "0 B" : `${parseFloat((e / 1024 ** t).toFixed(1))} ${["B", "KB", "MB", "GB"][t]}`;
            };
        },
        8364: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => n });
            const n = (e, t = !1) => {
                const o = Math.floor(e / 3600),
                    n = Math.floor((e % 3600) / 60),
                    a = Math.round(e - 3600 * o - 60 * n);
                let i = "";
                return (o > 0 || t) && (i = `${o < 10 ? `0${o}` : o}:`), (i += `${n < 10 ? `0${n}` : n}`), (i += `:${a < 10 ? `0${a}` : a}`), i;
            };
        },
        3762: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => i });
            const n = {
                    get(e) {
                        const t = new RegExp(`^${e}=(.*)$`),
                            o = document.cookie.split(";");
                        for (let e = 0; e < o.length; e += 1) {
                            const n = o[e].trim().match(t);
                            if (n && n[1]) return n[1];
                        }
                        return null;
                    },
                    set(e, t, o) {
                        let n = "",
                            a = "",
                            i = "";
                        if (o && o.expiresInDays) {
                            const e = new Date();
                            e.setTime(e.getTime() + 24 * o.expiresInDays * 60 * 60 * 1e3), (n = `; expires=${e.toUTCString()}`);
                        }
                        o && o.domain && (a = `; domain=${o.domain}`), o && o.secure && (i = "; secure"), (document.cookie = `${e}=${t}${n}${a}; path=/${i}`);
                    },
                },
                a = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|(?:shorts))\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                i = {
                    extractVideoId(e) {
                        const t = e.match(a);
                        return t && t[1] && "videoseries" !== t[1] && 11 === t[1].length ? t[1] : null;
                    },
                    darkMode: {
                        enabled() {
                            const e = n.get("PREF");
                            if (e) {
                                return -1 !== e.split("&").indexOf("f6=480");
                            }
                            return !1;
                        },
                        toggle: (e) =>
                            new Promise((t) => {
                                const o = n.get("PREF");
                                if (!o) return;
                                const a = o.split("&"),
                                    i = a.findIndex((e) => e.startsWith("f6="));
                                -1 !== i && a.splice(i, 1),
                                    e && a.push("f6=480"),
                                    n.set("PREF", a.join("&"), { expiresInDays: 240, domain: ".youtube.com", secure: !0 }),
                                    setTimeout(() => {
                                        window.location.reload(), t();
                                    }, 5);
                            }),
                    },
                };
        },
        5157: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => l });
            var n = o(7447),
                a = o(7525),
                i = o(1032);
            const l = { browserInfo: n.R5, message: new n.bm(), options: (0, n.JY)("__options__", "sync", a.A), userStorage: (0, n.JY)("__user_storage__", "sync", i.A) };
        },
        6219: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => Me });
            var n = o(7305),
                a = o(7450),
                i = o(5916);
            const l = { ref: "notificationsTarget", class: "downloads" },
                r = { key: 0 },
                s = { class: "downloads__heading" },
                d = ["src"],
                u = { key: 1 },
                c = { key: 5, class: "downloads__list" },
                m = { key: 1, class: "qr-code" },
                p = ["src"],
                f = { class: "qr-code__note" },
                h = { key: 2, class: "api-request-loader" };
            var w = o(817),
                g = o(3675),
                b = o.n(g),
                v = o(5157);
            var y = o(1514),
                _ = o.n(y);
            var x = o(7386);
            const k = { class: "downloads-list" },
                T = ["onClick"],
                C = { class: "download-item__format" },
                E = { key: 0, class: "download-item__type" },
                D = { key: 1, class: "download-item__type" },
                L = { class: "download-item__quality" },
                F = { key: 0, class: "download-item__attributes" },
                A = { key: 0, class: "download-item__label" },
                R = { key: 1, class: "download-item__fps" },
                S = { key: 2, class: "download-item__hdr" },
                O = { key: 1, class: "download-item__attributes" },
                U = { key: 2, class: "download-item__size" },
                B = { key: 0, class: "download-item__actions" },
                P = { key: 0 },
                M = ["onClick"],
                N = { key: 1 },
                q = ["onClick"];
            var I = o(5497);
            const $ = {
                    qrCodeButtonTooltip: __t("downloadsQrCodeButtonTooltip", "Generate QR code"),
                    copyToClipboardButtonTooltip: __t("downloadsCopyToClipboardButtonTooltip", "Copy URL to clipboard"),
                    videoOnlyTooltip: __t("downloadsVideoOnlyTooltip", "This file does not contain audio"),
                    audioOnlyTooltip: __t("downloadsAudioOnlyTooltip", "Audio only file"),
                },
                X = (0, n.pM)({ name: "DownloadsList", props: { downloads: { type: Array, required: !0 } }, emits: ["download", "copy-url", "generate-qr"], setup: () => ({ locale: $, app: v.A, formatBytes: I.A }) });
            var V = o(3726);
            const j = (0, V.A)(X, [
                    [
                        "render",
                        function (e, t, o, a, l, r) {
                            const s = (0, n.g2)("icon"),
                                d = (0, n.gN)("tooltip");
                            return (
                                (0, n.uX)(),
                                (0, n.CE)("ul", k, [
                                    ((0, n.uX)(!0),
                                    (0, n.CE)(
                                        n.FK,
                                        null,
                                        (0, n.pI)(
                                            e.downloads,
                                            (t) => (
                                                (0, n.uX)(),
                                                (0, n.CE)("li", { key: t.itag, class: "download-item" }, [
                                                    (0, n.Lk)(
                                                        "div",
                                                        { class: "download-item__button", onClick: (o) => e.$emit("download", t.itag) },
                                                        [
                                                            (0, n.Lk)("span", C, [
                                                                "videoonly" === t.type
                                                                    ? (0, n.bo)(((0, n.uX)(), (0, n.CE)("span", E, [(0, n.bF)(s, { name: "volume-mute-fill", type: "danger" })])), [[d, e.locale.videoOnlyTooltip, void 0, { right: !0 }]])
                                                                    : "audioonly" === t.type
                                                                    ? (0, n.bo)(((0, n.uX)(), (0, n.CE)("span", D, [(0, n.bF)(s, { name: "musical-note", type: "success" })])), [[d, e.locale.audioOnlyTooltip, void 0, { right: !0 }]])
                                                                    : (0, n.Q3)("v-if", !0),
                                                                (0, n.eW)(" " + (0, i.v_)(t.format), 1),
                                                            ]),
                                                            (0, n.Lk)("span", L, (0, i.v_)(t.quality), 1),
                                                            t.videoQuality
                                                                ? ((0, n.uX)(),
                                                                  (0, n.CE)("span", F, [
                                                                      "sd" !== t.videoQuality.label ? ((0, n.uX)(), (0, n.CE)("span", A, (0, i.v_)(t.videoQuality.label), 1)) : (0, n.Q3)("v-if", !0),
                                                                      t.videoQuality.fps && t.videoQuality.fps > 30 ? ((0, n.uX)(), (0, n.CE)("span", R, (0, i.v_)(t.videoQuality.fps) + "fps ", 1)) : (0, n.Q3)("v-if", !0),
                                                                      t.videoQuality.isHDR ? ((0, n.uX)(), (0, n.CE)("span", S, " HDR ")) : (0, n.Q3)("v-if", !0),
                                                                  ]))
                                                                : ((0, n.uX)(), (0, n.CE)("span", O)),
                                                            t.size ? ((0, n.uX)(), (0, n.CE)("span", U, (0, i.v_)(e.formatBytes(t.size)), 1)) : (0, n.Q3)("v-if", !0),
                                                        ],
                                                        8,
                                                        T
                                                    ),
                                                    e.app.options.copyToClipboardButtonEnabled || e.app.options.qrGeneratorButtonEnabled
                                                        ? ((0, n.uX)(),
                                                          (0, n.CE)("ul", B, [
                                                              e.app.options.copyToClipboardButtonEnabled
                                                                  ? ((0, n.uX)(),
                                                                    (0, n.CE)("li", P, [
                                                                        (0, n.bo)(((0, n.uX)(), (0, n.CE)("button", { onClick: (o) => e.$emit("copy-url", t.url) }, [(0, n.bF)(s, { name: "clipboard-fill" })], 8, M)), [
                                                                            [d, e.locale.copyToClipboardButtonTooltip, void 0, { left: !0 }],
                                                                        ]),
                                                                    ]))
                                                                  : (0, n.Q3)("v-if", !0),
                                                              e.app.options.qrGeneratorButtonEnabled
                                                                  ? ((0, n.uX)(),
                                                                    (0, n.CE)("li", N, [
                                                                        (0, n.bo)(((0, n.uX)(), (0, n.CE)("button", { onClick: (o) => e.$emit("generate-qr", t.url) }, [(0, n.bF)(s, { name: "qr-code" })], 8, q)), [
                                                                            [d, e.locale.qrCodeButtonTooltip, void 0, { left: !0 }],
                                                                        ]),
                                                                    ]))
                                                                  : (0, n.Q3)("v-if", !0),
                                                          ]))
                                                        : (0, n.Q3)("v-if", !0),
                                                ])
                                            )
                                        ),
                                        128
                                    )),
                                ])
                            );
                        },
                    ],
                ]),
                Q = { class: "downloads-list" },
                H = ["onClick"],
                W = (0, n.Lk)("span", { class: "download-item__format" }, "MP4", -1),
                K = { class: "download-item__quality" },
                z = { class: "download-item__attributes" },
                G = { key: 0, class: "download-item__label" },
                J = { key: 0, class: "download-item__size" };
            const Y = (0, n.pM)({ name: "ApiDownloadsList", props: { qualities: { type: Object, required: !0 } }, emits: ["request"], setup: (e) => ({ items: Object.keys(e.qualities), formatBytes: I.A }) }),
                Z = (0, V.A)(Y, [
                    [
                        "render",
                        function (e, t, o, a, l, r) {
                            return (
                                (0, n.uX)(),
                                (0, n.CE)("ul", Q, [
                                    ((0, n.uX)(!0),
                                    (0, n.CE)(
                                        n.FK,
                                        null,
                                        (0, n.pI)(
                                            e.items,
                                            (t) => (
                                                (0, n.uX)(),
                                                (0, n.CE)("li", { key: t, class: "download-item" }, [
                                                    (0, n.Lk)(
                                                        "div",
                                                        { class: "download-item__button", onClick: (o) => e.$emit("request", t) },
                                                        [
                                                            W,
                                                            (0, n.Lk)("span", K, (0, i.v_)(t) + "p", 1),
                                                            (0, n.Lk)("span", z, ["480" !== t ? ((0, n.uX)(), (0, n.CE)("span", G, "HD")) : (0, n.Q3)("v-if", !0)]),
                                                            e.qualities[t] ? ((0, n.uX)(), (0, n.CE)("span", J, (0, i.v_)(e.formatBytes(e.qualities[t])), 1)) : (0, n.Q3)("v-if", !0),
                                                        ],
                                                        8,
                                                        H
                                                    ),
                                                ])
                                            )
                                        ),
                                        128
                                    )),
                                ])
                            );
                        },
                    ],
                ]),
                ee = { ref: "notificationsTarget", class: "flixmate-downloads" },
                te = { class: "flixmate-promo__header" },
                oe = { class: "flixmate-promo__icon" },
                ne = ["src"],
                ae = { class: "flixmate-promo__title" },
                ie = (0, n.Lk)("h5", null, "Flixmate", -1),
                le = { class: "flixmate-promo__description" },
                re = { class: "flixmate-promo__actions" },
                se = { class: "downloads__heading", style: { "margin-top": "0" } },
                de = ["src"],
                ue = { class: "flixmate-direct-downloads" },
                ce = ["onClick"],
                me = (0, n.Lk)("span", { class: "download-item__format" }, "MP4", -1),
                pe = { class: "download-item__quality" },
                fe = { key: 0, class: "download-item__attributes" },
                he = { key: 0, class: "download-item__label" },
                we = { key: 1, class: "download-item__fps" },
                ge = { key: 2, class: "download-item__hdr" },
                be = { key: 1 };
            const ve = {
                    installAppText: __t("flixmateInstallText", "Install"),
                    appName: __t("flixmateAppName", "Flixmate Media Downloader"),
                    appTitle: __t("flixmateAppTitle", "Download Ultra HD, 4K and 8k videos"),
                    appDescription: __t("flixmateAppDescription", "Download Unlimited MP3 and HD formats including 1080p, 2k, 4K and 8K by using Flixmate Media Downloader"),
                    appDownloadButtonText: __t("flixmateAppDownloadButtonText", "Download"),
                    howToLinkText: __t("flixmateHowToLinkText", "How it works?"),
                    heading: __t("downloadsFlixmateDownloadsHeading", "Download Ultra HD with Flixmate"),
                    downloadButtonText: __t("flixmateDownloadButtonText", "Download"),
                    downloadStartedText: __t("flixmateDownloadStartedText", "Download added to Flixmate."),
                    downloadStartedSubText: __t("downloadsDownloadStartedSubText", "Click here to open downloads manager"),
                    downloadFailedText: __t("flixmateDownloadFailedText", "Download failed."),
                    flixmateNotConnectedTitle: __t("flixmateNotConnectedTitle", "Flixmate is not connected."),
                },
                ye = (0, n.pM)({
                    name: "FlixmateDownloads",
                    setup() {
                        const { info: e, addFlixmateVideoDownload: t, openFlixmateHomepage: o } = (0, x.A)(),
                            a = !!e.value?.flixmate.isConnected,
                            i = e.value?.flixmate.videoDownloads,
                            l = e.value?.flixmate.audioDownload,
                            r = (0, w.KR)([]),
                            s = e.value?.downloads.reduce((e, t) => (e.push(t.quality), e), []),
                            d = e.value?.flixmate.videoDownloads.reduce((e, t) => ("sd" === t.videoQuality?.label || s?.includes(t.quality) || e.push(t), e), []),
                            u = (0, w.KR)(v.A.userStorage.flixmatePromoMinimized),
                            c = (0, w.KR)(null),
                            m = b().runtime.getURL("images/icon-flixmate.png"),
                            p = (0, n.nI)()?.proxy;
                        return {
                            app: v.A,
                            locale: ve,
                            isConnected: a,
                            downloads: d,
                            audioDownload: l,
                            activeDownloads: r,
                            promoMinimized: u,
                            notificationsTarget: c,
                            flixmateIconUrl: m,
                            addDownload: function (e) {
                                if (r.value.includes(e)) return;
                                r.value.push(e);
                                const o = i?.findIndex((t) => t.itag === e);
                                void 0 !== o &&
                                    t(o)
                                        .then(() => {
                                            v.A.options.showDownloadNotifications && p?.$notify("success", ve.downloadStartedText, { duration: 3, target: c.value?.closest(".downloads") });
                                        })
                                        .catch((e) => {
                                            p?.$notify("danger", `${ve.downloadFailedText} ${e.message}`, { target: c.value?.closest(".downloads") });
                                        });
                            },
                            openFlixmateHomepage: o,
                            minimizePromo: function () {
                                (u.value = !u.value), v.A.userStorage.set("flixmatePromoMinimized", u.value);
                            },
                        };
                    },
                }),
                _e = (0, V.A)(ye, [
                    [
                        "render",
                        function (e, t, o, l, r, s) {
                            const d = (0, n.g2)("icon"),
                                u = (0, n.g2)("s-button");
                            return (
                                (0, n.uX)(),
                                (0, n.CE)(
                                    "div",
                                    ee,
                                    [
                                        e.isConnected
                                            ? e.downloads && e.downloads.length > 0 && e.audioDownload
                                                ? ((0, n.uX)(),
                                                  (0, n.CE)(
                                                      n.FK,
                                                      { key: 1 },
                                                      [
                                                          (0, n.Lk)("h4", se, [(0, n.Lk)("span", null, [(0, n.Lk)("img", { src: e.flixmateIconUrl }, null, 8, de), (0, n.eW)(" " + (0, i.v_)(e.locale.heading), 1)])]),
                                                          (0, n.Lk)("ul", ue, [
                                                              ((0, n.uX)(!0),
                                                              (0, n.CE)(
                                                                  n.FK,
                                                                  null,
                                                                  (0, n.pI)(
                                                                      e.downloads,
                                                                      (t) => (
                                                                          (0, n.uX)(),
                                                                          (0, n.CE)(
                                                                              "li",
                                                                              { key: t.itag, class: (0, i.C4)(["download-item__button", { "is-active": e.activeDownloads.includes(t.itag) }]), onClick: (o) => e.addDownload(t.itag) },
                                                                              [
                                                                                  me,
                                                                                  (0, n.Lk)("span", pe, (0, i.v_)(t.quality), 1),
                                                                                  !e.activeDownloads.includes(t.itag) && t.videoQuality
                                                                                      ? ((0, n.uX)(),
                                                                                        (0, n.CE)("div", fe, [
                                                                                            "sd" !== t.videoQuality.label ? ((0, n.uX)(), (0, n.CE)("span", he, (0, i.v_)(t.videoQuality.label), 1)) : (0, n.Q3)("v-if", !0),
                                                                                            t.videoQuality.fps && t.videoQuality.fps > 30
                                                                                                ? ((0, n.uX)(), (0, n.CE)("span", we, (0, i.v_)(t.videoQuality.fps) + "fps ", 1))
                                                                                                : (0, n.Q3)("v-if", !0),
                                                                                            t.videoQuality.isHDR ? ((0, n.uX)(), (0, n.CE)("span", ge, " HDR ")) : (0, n.Q3)("v-if", !0),
                                                                                        ]))
                                                                                      : ((0, n.uX)(), (0, n.CE)("div", be, " Downloading... ")),
                                                                              ],
                                                                              10,
                                                                              ce
                                                                          )
                                                                      )
                                                                  ),
                                                                  128
                                                              )),
                                                          ]),
                                                      ],
                                                      64
                                                  ))
                                                : (0, n.Q3)("v-if", !0)
                                            : ((0, n.uX)(),
                                              (0, n.CE)(
                                                  "div",
                                                  (0, n.v6)({ key: 0, class: ["flixmate-promo", { "is-minimized": e.promoMinimized }] }, (0, n.Tb)({ click: e.promoMinimized ? e.minimizePromo : null }, !0)),
                                                  [
                                                      (0, n.Lk)("header", te, [
                                                          (0, n.Lk)("button", { class: "flixmate-promo__minimize-button", onClick: t[0] || (t[0] = (...t) => e.minimizePromo && e.minimizePromo(...t)) }, [
                                                              (0, n.bF)(d, { name: e.promoMinimized ? "chevron-down" : "chevron-up" }, null, 8, ["name"]),
                                                          ]),
                                                          (0, n.Lk)("div", oe, [(0, n.Lk)("img", { src: e.flixmateIconUrl }, null, 8, ne)]),
                                                          (0, n.Lk)("div", ae, [
                                                              ie,
                                                              (0, n.bo)((0, n.Lk)("span", null, "Multimedia Toolkit", 512), [[a.aG, !e.promoMinimized]]),
                                                              (0, n.bo)((0, n.Lk)("span", null, (0, i.v_)(e.locale.flixmateNotConnectedTitle), 513), [[a.aG, e.promoMinimized]]),
                                                          ]),
                                                      ]),
                                                      (0, n.bo)(
                                                          (0, n.Lk)(
                                                              "p",
                                                              le,
                                                              [
                                                                  (0, n.Q3)(" eslint-disable-next-line max-len "),
                                                                  (0, n.eW)(" Install Flixmate with your Addoncrop YouTube Downloader to download, cut, convert or trim up to 8k videos without size and length limits "),
                                                              ],
                                                              512
                                                          ),
                                                          [[a.aG, !e.promoMinimized]]
                                                      ),
                                                      (0, n.bo)(
                                                          (0, n.Lk)(
                                                              "div",
                                                              re,
                                                              [
                                                                  (0, n.bF)(
                                                                      u,
                                                                      { icon: "logo-windows", type: "primary", round: "", onClick: (0, a.D$)(e.openFlixmateHomepage, ["prevent"]) },
                                                                      { default: (0, n.k6)(() => [(0, n.eW)((0, i.v_)(e.locale.appDownloadButtonText), 1)]), _: 1 },
                                                                      8,
                                                                      ["onClick"]
                                                                  ),
                                                              ],
                                                              512
                                                          ),
                                                          [[a.aG, !e.promoMinimized]]
                                                      ),
                                                  ],
                                                  16
                                              )),
                                    ],
                                    512
                                )
                            );
                        },
                    ],
                ]),
                xe = { ref: "notificationsTarget", class: "flixmate-advanced" },
                ke = { class: "mp3-converter__timespan" };
            var Te = o(8364);
            const Ce = {
                    selectFormatLabel: __t("flixmateSelectFormatLabel", "Select format"),
                    selectQualityLabel: __t("flixmateSelectQualityLabel", "Select quality"),
                    timeLabel: __t("flixmateTimeLabel", "Time"),
                    fromLabel: __t("flixmateFromLabel", "From"),
                    toLabel: __t("flixmateToLabel", "To"),
                    downloadButtonText: __t("flixmateDownloadButtonText", "Download"),
                    downloadStartedText: __t("flixmateDownloadStartedText", "Download added to Flixmate."),
                    downloadStartedSubText: __t("downloadsDownloadStartedSubText", "Click here to open downloads manager"),
                    downloadFailedText: __t("flixmateDownloadFailedText", "Download failed."),
                },
                Ee = (0, n.pM)({
                    name: "FlixmateAdvancedDownloads",
                    props: { showPinButton: { type: Boolean, default: !1 } },
                    emits: ["toggle-pin"],
                    setup(e, { emit: t }) {
                        const { info: o, addFlixmateVideoDownload: a } = (0, x.A)(),
                            i = o.value?.flixmate.videoDownloads,
                            l = o.value?.length || 0,
                            r = (0, w.Kh)({ format: "mp4", qualityIndex: 0, time: { from: 0, to: o.value?.length || 0 } }),
                            s = (0, w.KR)(!1),
                            d = (0, w.KR)(null),
                            u = (0, n.nI)()?.proxy;
                        return {
                            app: v.A,
                            locale: Ce,
                            videoDownloads: i,
                            maxLength: l,
                            advancedDownload: r,
                            menuPinned: s,
                            notificationsTarget: d,
                            parseVideoLength: Te.A,
                            addAdvancedDownload: function () {
                                a(r.qualityIndex, r.format, r.time.from > 0 ? r.time.from : null, r.time.to < l ? r.time.to : null)
                                    .then(() => {
                                        v.A.options.showDownloadNotifications && u?.$notify("success", Ce.downloadStartedText, { duration: 3, target: d.value?.closest(".downloads") });
                                    })
                                    .catch((e) => {
                                        u?.$notify("danger", `${Ce.downloadFailedText} ${e.message}`, { target: d.value?.closest(".downloads") });
                                    });
                            },
                            togglePin: function () {
                                (s.value = !s.value), t("toggle-pin", s.value);
                            },
                        };
                    },
                }),
                De = (0, V.A)(Ee, [
                    [
                        "render",
                        function (e, t, o, a, l, r) {
                            const s = (0, n.g2)("select-option"),
                                d = (0, n.g2)("select-menu"),
                                u = (0, n.g2)("form-item"),
                                c = (0, n.g2)("column"),
                                m = (0, n.g2)("row"),
                                p = (0, n.g2)("range-slider"),
                                f = (0, n.g2)("time-span"),
                                h = (0, n.g2)("s-button");
                            return (
                                (0, n.uX)(),
                                (0, n.CE)(
                                    "div",
                                    xe,
                                    [
                                        (0, n.bF)(m, null, {
                                            default: (0, n.k6)(() => [
                                                (0, n.bF)(
                                                    c,
                                                    { xs: 6 },
                                                    {
                                                        default: (0, n.k6)(() => [
                                                            (0, n.bF)(
                                                                u,
                                                                { label: e.locale.selectFormatLabel },
                                                                {
                                                                    default: (0, n.k6)(() => [
                                                                        (0, n.bF)(
                                                                            d,
                                                                            { modelValue: e.advancedDownload.format, "onUpdate:modelValue": t[0] || (t[0] = (t) => (e.advancedDownload.format = t)) },
                                                                            {
                                                                                default: (0, n.k6)(() => [
                                                                                    ((0, n.uX)(!0),
                                                                                    (0, n.CE)(
                                                                                        n.FK,
                                                                                        null,
                                                                                        (0, n.pI)(e.app.options.flixmateFormats, (e) => ((0, n.uX)(), (0, n.Wv)(s, { key: e, value: e, label: e.toUpperCase() }, null, 8, ["value", "label"]))),
                                                                                        128
                                                                                    )),
                                                                                ]),
                                                                                _: 1,
                                                                            },
                                                                            8,
                                                                            ["modelValue"]
                                                                        ),
                                                                    ]),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                ["label"]
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                                (0, n.bF)(
                                                    c,
                                                    { xs: 6 },
                                                    {
                                                        default: (0, n.k6)(() => [
                                                            (0, n.bF)(
                                                                u,
                                                                { label: e.locale.selectQualityLabel },
                                                                {
                                                                    default: (0, n.k6)(() => [
                                                                        (0, n.bF)(
                                                                            d,
                                                                            { modelValue: e.advancedDownload.qualityIndex, "onUpdate:modelValue": t[1] || (t[1] = (t) => (e.advancedDownload.qualityIndex = t)) },
                                                                            {
                                                                                default: (0, n.k6)(() => [
                                                                                    ((0, n.uX)(!0),
                                                                                    (0, n.CE)(
                                                                                        n.FK,
                                                                                        null,
                                                                                        (0, n.pI)(e.videoDownloads, (e, t) => ((0, n.uX)(), (0, n.Wv)(s, { key: e.itag, value: t, label: e.quality }, null, 8, ["value", "label"]))),
                                                                                        128
                                                                                    )),
                                                                                ]),
                                                                                _: 1,
                                                                            },
                                                                            8,
                                                                            ["modelValue"]
                                                                        ),
                                                                    ]),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                ["label"]
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }),
                                        (0, n.bF)(m, null, {
                                            default: (0, n.k6)(() => [
                                                (0, n.bF)(
                                                    c,
                                                    { xs: 12 },
                                                    {
                                                        default: (0, n.k6)(() => [
                                                            (0, n.bF)(
                                                                u,
                                                                { label: e.locale.timeLabel },
                                                                {
                                                                    default: (0, n.k6)(() => [
                                                                        (0, n.bF)(
                                                                            p,
                                                                            {
                                                                                modelValue: e.advancedDownload.time,
                                                                                "onUpdate:modelValue": t[2] || (t[2] = (t) => (e.advancedDownload.time = t)),
                                                                                min: 0,
                                                                                max: e.maxLength,
                                                                                "format-tooltip": e.parseVideoLength,
                                                                            },
                                                                            null,
                                                                            8,
                                                                            ["modelValue", "max", "format-tooltip"]
                                                                        ),
                                                                    ]),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                ["label"]
                                                            ),
                                                            (0, n.Lk)("div", ke, [
                                                                (0, n.bF)(
                                                                    u,
                                                                    { label: e.locale.fromLabel },
                                                                    {
                                                                        default: (0, n.k6)(() => [
                                                                            (0, n.bF)(
                                                                                f,
                                                                                {
                                                                                    modelValue: e.advancedDownload.time.from,
                                                                                    "onUpdate:modelValue": t[3] || (t[3] = (t) => (e.advancedDownload.time.from = t)),
                                                                                    min: 0,
                                                                                    max: e.advancedDownload.time.to,
                                                                                },
                                                                                null,
                                                                                8,
                                                                                ["modelValue", "max"]
                                                                            ),
                                                                        ]),
                                                                        _: 1,
                                                                    },
                                                                    8,
                                                                    ["label"]
                                                                ),
                                                                (0, n.bF)(
                                                                    u,
                                                                    { label: e.locale.toLabel },
                                                                    {
                                                                        default: (0, n.k6)(() => [
                                                                            (0, n.bF)(
                                                                                f,
                                                                                {
                                                                                    modelValue: e.advancedDownload.time.to,
                                                                                    "onUpdate:modelValue": t[4] || (t[4] = (t) => (e.advancedDownload.time.to = t)),
                                                                                    min: e.advancedDownload.time.from,
                                                                                    max: e.maxLength,
                                                                                },
                                                                                null,
                                                                                8,
                                                                                ["modelValue", "min", "max"]
                                                                            ),
                                                                        ]),
                                                                        _: 1,
                                                                    },
                                                                    8,
                                                                    ["label"]
                                                                ),
                                                            ]),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }),
                                        (0, n.Lk)(
                                            "div",
                                            { class: "has-text-right", style: (0, i.Tr)([e.showPinButton ? { "margin-top": "0.5em" } : ""]) },
                                            [
                                                e.showPinButton
                                                    ? ((0, n.uX)(),
                                                      (0, n.Wv)(
                                                          h,
                                                          {
                                                              key: 0,
                                                              type: "default",
                                                              icon: e.menuPinned ? "pin-f" : "pin",
                                                              style: (0, i.Tr)([{ "margin-right": "0.5em" }, [e.menuPinned ? { "border-color": "var(--shard-clr-primary)", color: "var(--shard-clr-primary)" } : ""]]),
                                                              onClick: e.togglePin,
                                                          },
                                                          {
                                                              default: (0, n.k6)(() => [
                                                                  e.menuPinned ? ((0, n.uX)(), (0, n.CE)(n.FK, { key: 1 }, [(0, n.eW)(" Unpin menu ")], 64)) : ((0, n.uX)(), (0, n.CE)(n.FK, { key: 0 }, [(0, n.eW)(" Pin menu ")], 64)),
                                                              ]),
                                                              _: 1,
                                                          },
                                                          8,
                                                          ["icon", "style", "onClick"]
                                                      ))
                                                    : (0, n.Q3)("v-if", !0),
                                                (0, n.bF)(h, { type: "primary", onClick: e.addAdvancedDownload }, { default: (0, n.k6)(() => [(0, n.eW)((0, i.v_)(e.locale.downloadButtonText), 1)]), _: 1 }, 8, ["onClick"]),
                                            ],
                                            4
                                        ),
                                    ],
                                    512
                                )
                            );
                        },
                    ],
                ]);
            var Le = o(8452);
            const Fe = { key: 0, class: "webstore-rating" },
                Ae = { key: 0, class: "webstore-rating__stars" },
                Re = (0, n.Lk)("p", null, "Rate YouTube Video Downloader", -1),
                Se = { key: 0, class: "webstore-rating__thank-you" },
                Oe = (0, n.Lk)("p", null, "Thank you for your feedback!", -1),
                Ue = (0, n.pM)({
                    __name: "RatingCard",
                    setup(e) {
                        const t = (0, w.KR)(null),
                            o = (0, w.KR)(!1),
                            { showRatingCard: i, openRatingPage: l, setRated: r } = (0, x.A)();
                        function s(e) {
                            t.value = e;
                        }
                        function d() {
                            t.value && t.value > 3 ? (l(), (i.value = !1)) : (o.value = !0), r();
                        }
                        function u() {
                            i.value = !1;
                        }
                        return (e, l) => {
                            const r = (0, n.g2)("s-button");
                            return (0, w.R1)(i)
                                ? ((0, n.uX)(),
                                  (0, n.CE)("div", Fe, [
                                      o.value
                                          ? (0, n.Q3)("v-if", !0)
                                          : ((0, n.uX)(),
                                            (0, n.CE)("div", Ae, [
                                                Re,
                                                (0, n.bF)(Le.A, { onChange: s }),
                                                (0, n.bF)(r, { type: "primary", disabled: null === t.value, onClick: d }, { default: (0, n.k6)(() => [(0, n.eW)(" Rate ")]), _: 1 }, 8, ["disabled"]),
                                            ])),
                                      (0, n.bF)(
                                          a.eB,
                                          { name: "fade-scale" },
                                          {
                                              default: (0, n.k6)(() => [
                                                  o.value ? ((0, n.uX)(), (0, n.CE)("div", Se, [Oe, (0, n.bF)(r, { type: "primary", onClick: u }, { default: (0, n.k6)(() => [(0, n.eW)(" Done ")]), _: 1 })])) : (0, n.Q3)("v-if", !0),
                                              ]),
                                              _: 1,
                                          }
                                      ),
                                  ]))
                                : (0, n.Q3)("v-if", !0);
                        };
                    },
                }),
                Be = {
                    flixmateNotConnectedTitle: __t("flixmateNotConnectedTitle", "Flixmate is not connected"),
                    flixmateNotConnectedText: __t("flixmateNotConnectedText", "Ultra HD (4k, 8k) downlaods are not available."),
                    flixmateNotConnectedLinkText: __t("flixmateNotConnectedLinkText", "Learn more"),
                    primaryHeading: __t("downloadsPrimaryDownloadsHeading", "Download with Addoncrop extension"),
                    apiHeading: __t("downloadsApiDownloadsHeading", "Downloads from external service"),
                    dashFormatsShowButtonText: __t("downloadsDashFormatsShowButtonText", "Dash formats"),
                    dashFormatsHideButtonText: __t("downloadsDashFormatsHideButtonText", "Hide"),
                    downloadStartedText: __t("downloadsDownloadStartedText", "Download started."),
                    downloadStartedSubText: __t("downloadsDownloadStartedSubText", "Click here to open downloads manager"),
                    downloadFailedText: __t("downloadsDownloadFailedText", "Download failed."),
                    urlCopiedToClipboard: __t("downloadsUrlCopiedToClipboard", "Download URL copied to clipboard."),
                    qrCodeNote: __t("downloadsQrCodeNote", "Scan this QR code on your device to get download URL."),
                    qrCodeButtonText: __t("downloadsQrCodeButtonText", "Close"),
                    apiRequestLoadingText: __t("downloadsApiRequestLoadingText", "Requesting download, this might take a few seconds."),
                    advancedShowButtonText: __t("flixmateAdvancedShowButtonText", "Advanced (Convert or Trim)"),
                    advancedHideButtonText: __t("flixmateAdvancedHideButtonText", "Hide"),
                },
                Pe = (0, n.pM)({
                    name: "Downloads",
                    components: { DownloadsList: j, ApiDownloadsList: Z, FlixmateDownloads: _e, FlixmateAdvancedDownloads: De, RatingCard: Ue },
                    props: { showPinButton: { type: Boolean, default: !1 } },
                    emits: ["toggle-pin"],
                    setup(e, { emit: t }) {
                        const { info: o, downloadVideo: a, generateMP4Download: i, getDownloadStatus: l, openFlixmateHomepage: r } = (0, x.A)(),
                            s = b().runtime.getURL("icons/icon-popup.png"),
                            d = o.value?.downloads,
                            u = !!o.value?.flixmate.isSupported,
                            c = !!o.value?.flixmate.isConnected,
                            m = v.A.options.flixmateEnabled,
                            p = o.value?.videoAPIQualities,
                            f = o.value?.dashFormatDownloads.filter((e, t, o) => o.findIndex((t) => t.itag === e.itag) === t),
                            h = (0, w.KR)(!1),
                            g = (0, w.KR)(null),
                            y = (0, w.KR)(!1),
                            k = (0, w.KR)(0),
                            T = (0, w.KR)(!1),
                            C = (0, w.KR)(null),
                            E = (0, n.nI)()?.proxy;
                        function D(e) {
                            t("toggle-pin", e);
                        }
                        return {
                            locale: Be,
                            extensionIconUrl: s,
                            isFlixmateSupported: u,
                            isFlixmateConnected: c,
                            isFlixmateEnabled: m,
                            primaryDownloads: d,
                            apiRequestProgress: k,
                            apiDownloadQualities: p,
                            dashFormatDownloads: f,
                            dashFormatsOpen: h,
                            qrCode: g,
                            apiRequestLoading: y,
                            advancedDownloadsVisible: T,
                            notificationsTarget: C,
                            download: function (e) {
                                a(e)
                                    .then(() => {
                                        v.A.options.showDownloadNotifications && E?.$notify("success", Be.downloadStartedText, { duration: 3, target: C.value });
                                    })
                                    .catch((e) => {
                                        E?.$notify("danger", `${Be.downloadFailedText} ${e.message}`, { target: C.value });
                                    });
                            },
                            copyUrl: function (e) {
                                ((e) => {
                                    const t = document.createElement("input");
                                    (t.style.position = "fixed"), (t.style.opacity = "0"), (t.value = e), document.body.appendChild(t), t.select(), document.execCommand("Copy"), console.log('test-->static url', e), document.body.removeChild(t);
                                })(e),
                                    E?.$notify("success", Be.urlCopiedToClipboard, { duration: 3, target: C.value });
                            },
                            generateQR: function (e) {
                                g.value = ((e) => {
                                    const t = _()(0, "L");
                                    return t.addData(e), t.make(), t.createDataURL();
                                })(e);
                            },
                            requestVideo: async function (e) {
                                let t;
                                (y.value = !0), D(!0), (k.value = 0);
                                try {
                                    t = await i({
                                        url: `https://www.youtube.com/watch?v=${o.value?.id}`,
                                        quality: e,
                                        ext: { audioUrl: o.value?.flixmate.audioDownload?.url, videoUrl: o.value?.flixmate.videoDownloads.find((t) => t.quality === `${e}p`)?.url },
                                    });
                                } catch (e) {
                                    return (y.value = !1), D(!1), void E?.$notify("danger", `${Be.downloadFailedText} ${e.message}`, { duration: 3, target: C.value });
                                }
                                !(function e() {
                                    setTimeout(async () => {
                                        const o = await l(t);
                                        "complete" === o.state
                                            ? ((y.value = !1), D(!1), (k.value = 0), E?.$notify("success", Be.downloadStartedText, { duration: 3, target: C.value }))
                                            : "failed" === o.state
                                            ? ((y.value = !1), D(!1), E?.$notify("danger", `${Be.downloadFailedText} ${o.errorMessage}`, { target: C.value }))
                                            : "in_progress" === o.state
                                            ? ((k.value = Math.floor(o.progress)), e())
                                            : e();
                                    }, 1200);
                                })();
                            },
                            openFlixmateHomepage: r,
                        };
                    },
                }),
                Me = (0, V.A)(Pe, [
                    [
                        "render",
                        function (e, t, o, w, g, b) {
                            const v = (0, n.g2)("RatingCard"),
                                y = (0, n.g2)("flixmate-downloads"),
                                _ = (0, n.g2)("downloads-list"),
                                x = (0, n.g2)("api-downloads-list"),
                                k = (0, n.g2)("icon"),
                                C = (0, n.g2)("s-button"),
                                E = (0, n.g2)("loader");
                            return (
                                (0, n.uX)(),
                                (0, n.CE)(
                                    "div",
                                    l,
                                    [
                                        (0, n.bF)(v),
                                        (0, n.Q3)(
                                            ' <alert\n            v-if="isFlixmateSupported && isFlixmateEnabled && !isFlixmateConnected"\n            type="danger"\n            :title="locale.flixmateNotConnectedTitle"\n            :closable="false"\n        >\n            {{ locale.flixmateNotConnectedText }}\n\n            <span>\n                <s-button round @click.prevent="openFlixmateHomepage">\n                    {{ locale.flixmateNotConnectedLinkText }}\n                </s-button>\n            </span>\n        </alert> '
                                        ),
                                        e.isFlixmateSupported && e.isFlixmateEnabled ? (0, n.bo)(((0, n.uX)(), (0, n.Wv)(y, { key: 0 }, null, 512)), [[a.aG, !e.qrCode && !e.apiRequestLoading]]) : (0, n.Q3)("v-if", !0),
                                        (0, n.bo)(
                                            (0, n.Lk)(
                                                "div",
                                                null,
                                                [
                                                    e.primaryDownloads && e.primaryDownloads.length > 0
                                                        ? ((0, n.uX)(),
                                                          (0, n.CE)("div", r, [
                                                              (0, n.Lk)("h4", s, [(0, n.Lk)("span", null, [(0, n.Lk)("img", { src: e.extensionIconUrl }, null, 8, d), (0, n.eW)(" " + (0, i.v_)(e.locale.primaryHeading), 1)])]),
                                                              (0, n.bF)(_, { downloads: e.primaryDownloads, onDownload: e.download, onCopyUrl: e.copyUrl, onGenerateQr: e.generateQR }, null, 8, [
                                                                  "downloads",
                                                                  "onDownload",
                                                                  "onCopyUrl",
                                                                  "onGenerateQr",
                                                              ]),
                                                          ]))
                                                        : (0, n.Q3)("v-if", !0),
                                                    !e.isFlixmateConnected && e.apiDownloadQualities && Object.keys(e.apiDownloadQualities).length > 0
                                                        ? ((0, n.uX)(), (0, n.CE)("div", u, [(0, n.bF)(x, { qualities: e.apiDownloadQualities, onRequest: e.requestVideo }, null, 8, ["qualities", "onRequest"])]))
                                                        : (0, n.Q3)("v-if", !0),
                                                    e.dashFormatDownloads && e.dashFormatDownloads.length > 0
                                                        ? ((0, n.uX)(),
                                                          (0, n.CE)("div", c, [
                                                              (0, n.bo)(
                                                                  (0, n.bF)(_, { downloads: e.dashFormatDownloads, onDownload: e.download, onCopyUrl: e.copyUrl, onGenerateQr: e.generateQR }, null, 8, [
                                                                      "downloads",
                                                                      "onDownload",
                                                                      "onCopyUrl",
                                                                      "onGenerateQr",
                                                                  ]),
                                                                  [[a.aG, e.dashFormatsOpen]]
                                                              ),
                                                          ]))
                                                        : (0, n.Q3)("v-if", !0),
                                                ],
                                                512
                                            ),
                                            [[a.aG, !e.qrCode && !e.apiRequestLoading]]
                                        ),
                                        e.qrCode
                                            ? ((0, n.uX)(),
                                              (0, n.CE)("div", m, [
                                                  (0, n.Lk)("img", { src: e.qrCode }, null, 8, p),
                                                  (0, n.Lk)("p", f, [(0, n.bF)(k, { name: "qr-scan-2-line", type: "primary" }), (0, n.eW)(" " + (0, i.v_)(e.locale.qrCodeNote), 1)]),
                                                  (0, n.bF)(C, { onClick: t[3] || (t[3] = (t) => (e.qrCode = null)) }, { default: (0, n.k6)(() => [(0, n.eW)((0, i.v_)(e.locale.qrCodeButtonText), 1)]), _: 1 }),
                                              ]))
                                            : (0, n.Q3)("v-if", !0),
                                        e.apiRequestLoading
                                            ? ((0, n.uX)(), (0, n.CE)("div", h, [(0, n.bF)(E, { progress: e.apiRequestProgress }, null, 8, ["progress"]), (0, n.Lk)("p", null, (0, i.v_)(e.locale.apiRequestLoadingText), 1)]))
                                            : (0, n.Q3)("v-if", !0),
                                    ],
                                    512
                                )
                            );
                        },
                    ],
                ]);
        },
        2716: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => y });
            var n = o(7305),
                a = o(5916),
                i = o(7450);
            const l = { ref: "notificationsTarget", class: "mp3-converter" },
                r = { key: 1 },
                s = { key: 0, class: "downloads__heading" },
                d = ["src"],
                u = { class: "mp3-converter__timespan" },
                c = { key: 2, class: "api-request-loader" };
            var m = o(817),
                p = o(3675),
                f = o.n(p),
                h = o(5157),
                w = o(7386),
                g = o(8364);
            const b = {
                    flixmateNotConnectedTitle: __t("flixmateNotConnectedTitle", "Flixmate is not Installed"),
                    flixmateNotConnectedText: __t("flixmateNotConnectedMp3Text", "MP3 downloads length will be limited."),
                    flixmateNotConnectedLinkText: __t("flixmateNotConnectedLinkText", "Learn more"),
                    flixmateHeading: __t("downloadsFlixmateMP3DownloadsHeading", "Download MP3 with Flixmate"),
                    mp3BitrateLabel: __t("mp3ConverterBitrateLabel", "Choose MP3 bitrate"),
                    timeLabel: __t("mp3ConverterTimeLabel", "Time"),
                    timeFromLabel: __t("mp3ConverterTimeFromLabel", "From"),
                    timeToLabel: __t("mp3ConverterTimeToLabel", "To"),
                    mp3DownloadButtonText: __t("mp3ConverterMp3DownloadButtonText", "Download"),
                    apiRequestLoadingText: __t("downloadsApiRequestLoadingText", "Requesting download, this might take a few seconds."),
                    downloadStartedText: __t("mp3ConverterDownloadStartedText", "Download started."),
                    downloadStartedSubText: __t("downloadsDownloadStartedSubText", "Click here to open downloads manager"),
                    downloadFailedText: __t("mp3ConverterDownloadFailedText", "Download failed."),
                    flixmateDownloadStartedText: __t("flixmateDownloadStartedText", "Download added to Flixmate."),
                },
                v = (0, n.pM)({
                    name: "Mp3Converter",
                    props: { showPinButton: { type: Boolean, default: !1 } },
                    emits: ["toggle-pin"],
                    setup(e, { emit: t }) {
                        const { info: o, generateMP3Download: a, getDownloadStatus: i, addFlixmateMp3Download: l, openFlixmateHomepage: r } = (0, w.A)(),
                            s = !!o.value?.flixmate.isSupported,
                            d = !!o.value?.flixmate.isConnected,
                            u = o.value ? o.value.length : 0,
                            c = (0, m.KR)(h.A.options.mp3DefaultBitrate),
                            p = (0, m.KR)({ from: 0, to: u }),
                            v = (0, m.KR)(!1),
                            y = (0, m.KR)(0),
                            _ = (0, m.KR)(!1),
                            x = (0, m.KR)(null),
                            k = (0, n.nI)()?.proxy,
                            T = f().runtime.getURL("images/icon-flixmate.png");
                        function C(e) {
                            (_.value = void 0 === e ? !_.value : e), t("toggle-pin", _.value);
                        }
                        return {
                            locale: b,
                            app: h.A,
                            isFlixmateSupported: s,
                            isFlixmateConnected: d,
                            max: u,
                            bitrate: c,
                            time: p,
                            apiRequestLoading: v,
                            apiRequestProgress: y,
                            menuPinned: _,
                            notificationsTarget: x,
                            flixmateIconUrl: T,
                            parseVideoLength: g.A,
                            download: async function () {
                                if (o.value?.flixmate.isConnected)
                                    return void l(c.value, p.value.from > 0 ? p.value.from : null, p.value.to < u ? p.value.to : null)
                                        .then(() => {
                                            h.A.options.showDownloadNotifications && k?.$notify("success", b.flixmateDownloadStartedText, { duration: 3, target: x.value });
                                        })
                                        .catch((e) => {
                                            k?.$notify("danger", `${b.downloadFailedText} ${e.message}`, { target: x.value });
                                        });
                                let e;
                                (v.value = !0), C(!0), (y.value = 0);
                                try {
                                    e = await a({
                                        url: `https://www.youtube.com/watch?v=${o.value?.id}`,
                                        bitrate: c.value,
                                        from: 0 === p.value.from ? null : p.value.from,
                                        to: p.value.to === o.value?.length ? null : p.value.to,
                                        ext: { audioUrl: o.value?.flixmate.audioDownload?.url },
                                    });
                                } catch (e) {
                                    return (v.value = !1), C(!1), void k?.$notify("danger", `${b.downloadFailedText} ${e.message}`, { target: x.value });
                                }
                                !(function t() {
                                    setTimeout(async () => {
                                        const o = await i(e);
                                        "complete" === o.state
                                            ? ((v.value = !1), C(!1), (y.value = 0), k?.$notify("success", b.downloadStartedText, { duration: 3, target: x.value }))
                                            : "failed" === o.state
                                            ? ((v.value = !1), C(!1), k?.$notify("danger", `${b.downloadFailedText} ${o.errorMessage}`, { target: x.value }))
                                            : "in_progress" === o.state
                                            ? ((y.value = Math.floor(o.progress)), t())
                                            : t();
                                    }, 1200);
                                })();
                            },
                            openFlixmateHomepage: r,
                            togglePin: C,
                        };
                    },
                });
            const y = (0, o(3726).A)(v, [
                [
                    "render",
                    function (e, t, o, m, p, f) {
                        const h = (0, n.g2)("s-button"),
                            w = (0, n.g2)("alert"),
                            g = (0, n.g2)("select-option"),
                            b = (0, n.g2)("select-menu"),
                            v = (0, n.g2)("form-item"),
                            y = (0, n.g2)("column"),
                            _ = (0, n.g2)("row"),
                            x = (0, n.g2)("range-slider"),
                            k = (0, n.g2)("time-span"),
                            T = (0, n.g2)("loader");
                        return (
                            (0, n.uX)(),
                            (0, n.CE)(
                                "div",
                                l,
                                [
                                    e.isFlixmateSupported && !e.isFlixmateConnected
                                        ? ((0, n.uX)(),
                                          (0, n.Wv)(
                                              w,
                                              {
                                                  key: 0,
                                                  type: "danger",
                                                  title: e.locale.flixmateNotConnectedTitle,
                                                  closable: !1,
                                                  minimizeable: !0,
                                                  "is-minimized": e.app.userStorage.mp3FlixmateAlertMinimized,
                                                  "on-minimize": (t) => e.app.userStorage.set("mp3FlixmateAlertMinimized", t),
                                              },
                                              {
                                                  default: (0, n.k6)(() => [
                                                      (0, n.eW)((0, a.v_)(e.locale.flixmateNotConnectedText) + " ", 1),
                                                      (0, n.Lk)("span", null, [
                                                          (0, n.bF)(
                                                              h,
                                                              { round: "", onClick: (0, i.D$)(e.openFlixmateHomepage, ["prevent"]) },
                                                              { default: (0, n.k6)(() => [(0, n.eW)((0, a.v_)(e.locale.flixmateNotConnectedLinkText), 1)]), _: 1 },
                                                              8,
                                                              ["onClick"]
                                                          ),
                                                      ]),
                                                  ]),
                                                  _: 1,
                                              },
                                              8,
                                              ["title", "is-minimized", "on-minimize"]
                                          ))
                                        : (0, n.Q3)("v-if", !0),
                                    e.apiRequestLoading
                                        ? ((0, n.uX)(), (0, n.CE)("div", c, [(0, n.bF)(T, { progress: e.apiRequestProgress }, null, 8, ["progress"]), (0, n.Lk)("p", null, (0, a.v_)(e.locale.apiRequestLoadingText), 1)]))
                                        : ((0, n.uX)(),
                                          (0, n.CE)("div", r, [
                                              e.isFlixmateConnected
                                                  ? ((0, n.uX)(), (0, n.CE)("h4", s, [(0, n.Lk)("span", null, [(0, n.Lk)("img", { src: e.flixmateIconUrl }, null, 8, d), (0, n.eW)(" " + (0, a.v_)(e.locale.flixmateHeading), 1)])]))
                                                  : (0, n.Q3)("v-if", !0),
                                              (0, n.bF)(_, null, {
                                                  default: (0, n.k6)(() => [
                                                      (0, n.bF)(
                                                          y,
                                                          { xs: 6 },
                                                          {
                                                              default: (0, n.k6)(() => [
                                                                  (0, n.bF)(
                                                                      v,
                                                                      { label: e.locale.mp3BitrateLabel },
                                                                      {
                                                                          default: (0, n.k6)(() => [
                                                                              (0, n.bF)(
                                                                                  b,
                                                                                  { modelValue: e.bitrate, "onUpdate:modelValue": t[0] || (t[0] = (t) => (e.bitrate = t)) },
                                                                                  {
                                                                                      default: (0, n.k6)(() => [
                                                                                          (0, n.bF)(g, { value: 64, label: "64Kbps" }),
                                                                                          (0, n.bF)(g, { value: 128, label: "128Kbps" }),
                                                                                          (0, n.bF)(g, { value: 192, label: "192Kbps" }),
                                                                                          (0, n.bF)(g, { value: 256, label: "256Kbps" }),
                                                                                          (0, n.bF)(g, { value: 320, label: "320Kbps" }),
                                                                                      ]),
                                                                                      _: 1,
                                                                                  },
                                                                                  8,
                                                                                  ["modelValue"]
                                                                              ),
                                                                          ]),
                                                                          _: 1,
                                                                      },
                                                                      8,
                                                                      ["label"]
                                                                  ),
                                                              ]),
                                                              _: 1,
                                                          }
                                                      ),
                                                  ]),
                                                  _: 1,
                                              }),
                                              (0, n.bF)(_, null, {
                                                  default: (0, n.k6)(() => [
                                                      (0, n.bF)(
                                                          y,
                                                          { xs: 12 },
                                                          {
                                                              default: (0, n.k6)(() => [
                                                                  (0, n.bF)(
                                                                      v,
                                                                      { label: e.locale.timeLabel },
                                                                      {
                                                                          default: (0, n.k6)(() => [
                                                                              (0, n.bF)(
                                                                                  x,
                                                                                  { modelValue: e.time, "onUpdate:modelValue": t[1] || (t[1] = (t) => (e.time = t)), min: 0, max: e.max, "format-tooltip": e.parseVideoLength },
                                                                                  null,
                                                                                  8,
                                                                                  ["modelValue", "max", "format-tooltip"]
                                                                              ),
                                                                          ]),
                                                                          _: 1,
                                                                      },
                                                                      8,
                                                                      ["label"]
                                                                  ),
                                                                  (0, n.Lk)("div", u, [
                                                                      (0, n.bF)(
                                                                          v,
                                                                          { label: e.locale.timeFromLabel },
                                                                          {
                                                                              default: (0, n.k6)(() => [
                                                                                  (0, n.bF)(k, { modelValue: e.time.from, "onUpdate:modelValue": t[2] || (t[2] = (t) => (e.time.from = t)), min: 0, max: e.time.to }, null, 8, [
                                                                                      "modelValue",
                                                                                      "max",
                                                                                  ]),
                                                                              ]),
                                                                              _: 1,
                                                                          },
                                                                          8,
                                                                          ["label"]
                                                                      ),
                                                                      (0, n.bF)(
                                                                          v,
                                                                          { label: e.locale.timeToLabel },
                                                                          {
                                                                              default: (0, n.k6)(() => [
                                                                                  (0, n.bF)(k, { modelValue: e.time.to, "onUpdate:modelValue": t[3] || (t[3] = (t) => (e.time.to = t)), min: e.time.from, max: e.max }, null, 8, [
                                                                                      "modelValue",
                                                                                      "min",
                                                                                      "max",
                                                                                  ]),
                                                                              ]),
                                                                              _: 1,
                                                                          },
                                                                          8,
                                                                          ["label"]
                                                                      ),
                                                                  ]),
                                                              ]),
                                                              _: 1,
                                                          }
                                                      ),
                                                  ]),
                                                  _: 1,
                                              }),
                                              (0, n.Lk)(
                                                  "div",
                                                  { class: "has-text-right", style: (0, a.Tr)([e.showPinButton ? { "margin-top": "0.5em" } : ""]) },
                                                  [
                                                      e.showPinButton
                                                          ? ((0, n.uX)(),
                                                            (0, n.Wv)(
                                                                h,
                                                                {
                                                                    key: 0,
                                                                    type: "default",
                                                                    icon: e.menuPinned ? "pin-f" : "pin",
                                                                    style: (0, a.Tr)([{ "margin-right": "0.5em" }, [e.menuPinned ? { "border-color": "var(--shard-clr-primary)", color: "var(--shard-clr-primary)" } : ""]]),
                                                                    onClick: t[4] || (t[4] = (t) => e.togglePin(void 0)),
                                                                },
                                                                {
                                                                    default: (0, n.k6)(() => [
                                                                        e.menuPinned ? ((0, n.uX)(), (0, n.CE)(n.FK, { key: 1 }, [(0, n.eW)(" Unpin menu ")], 64)) : ((0, n.uX)(), (0, n.CE)(n.FK, { key: 0 }, [(0, n.eW)(" Pin menu ")], 64)),
                                                                    ]),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                ["icon", "style"]
                                                            ))
                                                          : (0, n.Q3)("v-if", !0),
                                                      (0, n.bF)(h, { type: "primary", onClick: e.download }, { default: (0, n.k6)(() => [(0, n.eW)((0, a.v_)(e.locale.mp3DownloadButtonText), 1)]), _: 1 }, 8, ["onClick"]),
                                                  ],
                                                  4
                                              ),
                                          ])),
                                ],
                                512
                            )
                        );
                    },
                ],
            ]);
        },
        8442: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => h });
            var n = o(7305),
                a = o(5916);
            const i = { ref: "notificationsTarget", class: "subtitles" },
                l = { key: 0 },
                r = { class: "subtitles__language-note" },
                s = { class: "has-text-right" },
                d = { key: 1, class: "subtitles__unavailable" };
            var u = o(817),
                c = o(5157),
                m = o(7386);
            const p = {
                    languageLabel: __t("subtitlesLanguageLabel", "Choose language"),
                    autoGeneratedNote: __t("subtitlesAutoGeneratedNote", "Auto generated subtitles are marked with this icon."),
                    formatLabel: __t("subtitlesFormatLabel", "Select file format"),
                    downloadButtonText: __t("subtitlesDownloadButtonText", "Download"),
                    notAvailableMessage: __t("subtitlesNotAvailableMessage", "No subtitles found for this video."),
                    downloadStartedText: __t("subtitlesDownloadStartedText", "Download started."),
                    downloadFailedText: __t("subtitlesDownloadFailedText", "Download failed."),
                },
                f = (0, n.pM)({
                    name: "SubtitlesDownload",
                    setup() {
                        const { info: e, downloadSubtitle: t } = (0, m.A)(),
                            o = e.value?.subtitles,
                            a = (0, u.KR)("vtt"),
                            i = (0, u.KR)(0),
                            l = (0, u.KR)(null),
                            r = (0, n.nI)()?.proxy;
                        return {
                            locale: p,
                            subtitles: o,
                            selectedIndex: i,
                            format: a,
                            notificationsTarget: l,
                            download: function () {
                                t(i.value, a.value)
                                    .then(() => {
                                        c.A.options.showDownloadNotifications && r?.$notify("success", p.downloadStartedText, { duration: 3, target: l.value });
                                    })
                                    .catch((e) => {
                                        r?.$notify("danger", `${p.downloadFailedText} ${e.message}`, { target: l.value });
                                    });
                            },
                        };
                    },
                });
            const h = (0, o(3726).A)(f, [
                [
                    "render",
                    function (e, t, o, u, c, m) {
                        const p = (0, n.g2)("select-option"),
                            f = (0, n.g2)("select-menu"),
                            h = (0, n.g2)("form-item"),
                            w = (0, n.g2)("column"),
                            g = (0, n.g2)("row"),
                            b = (0, n.g2)("icon"),
                            v = (0, n.g2)("radio"),
                            y = (0, n.g2)("radio-group"),
                            _ = (0, n.g2)("s-button");
                        return (
                            (0, n.uX)(),
                            (0, n.CE)(
                                "div",
                                i,
                                [
                                    e.subtitles && e.subtitles.length > 0
                                        ? ((0, n.uX)(),
                                          (0, n.CE)("div", l, [
                                              (0, n.bF)(g, null, {
                                                  default: (0, n.k6)(() => [
                                                      (0, n.bF)(
                                                          w,
                                                          { xs: 8 },
                                                          {
                                                              default: (0, n.k6)(() => [
                                                                  (0, n.bF)(
                                                                      h,
                                                                      { label: e.locale.languageLabel },
                                                                      {
                                                                          default: (0, n.k6)(() => [
                                                                              (0, n.bF)(
                                                                                  f,
                                                                                  { modelValue: e.selectedIndex, "onUpdate:modelValue": t[0] || (t[0] = (t) => (e.selectedIndex = t)), "max-height": 220, filterable: "" },
                                                                                  {
                                                                                      default: (0, n.k6)((t) => [
                                                                                          ((0, n.uX)(!0),
                                                                                          (0, n.CE)(
                                                                                              n.FK,
                                                                                              null,
                                                                                              (0, n.pI)(
                                                                                                  e.subtitles,
                                                                                                  (e, o) => (
                                                                                                      (0, n.uX)(),
                                                                                                      (0, n.Wv)(
                                                                                                          p,
                                                                                                          { key: o, value: o, label: e.languageName, icon: e.autoGenerated ? "cpu-line" : null, "icon-direction": "right", filter: t.filter },
                                                                                                          null,
                                                                                                          8,
                                                                                                          ["value", "label", "icon", "filter"]
                                                                                                      )
                                                                                                  )
                                                                                              ),
                                                                                              128
                                                                                          )),
                                                                                      ]),
                                                                                      _: 1,
                                                                                  },
                                                                                  8,
                                                                                  ["modelValue"]
                                                                              ),
                                                                          ]),
                                                                          _: 1,
                                                                      },
                                                                      8,
                                                                      ["label"]
                                                                  ),
                                                              ]),
                                                              _: 1,
                                                          }
                                                      ),
                                                  ]),
                                                  _: 1,
                                              }),
                                              (0, n.Lk)("p", r, [(0, n.bF)(b, { name: "cpu-line", type: "primary" }), (0, n.eW)(" " + (0, a.v_)(e.locale.autoGeneratedNote), 1)]),
                                              (0, n.bF)(
                                                  h,
                                                  { label: e.locale.formatLabel },
                                                  {
                                                      default: (0, n.k6)(() => [
                                                          (0, n.bF)(
                                                              y,
                                                              { modelValue: e.format, "onUpdate:modelValue": t[1] || (t[1] = (t) => (e.format = t)), type: "block" },
                                                              {
                                                                  default: (0, n.k6)(() => [
                                                                      (0, n.bF)(v, { value: "srt" }, { default: (0, n.k6)(() => [(0, n.eW)(" SRT ")]), _: 1 }),
                                                                      (0, n.bF)(v, { value: "vtt" }, { default: (0, n.k6)(() => [(0, n.eW)(" WebVTT ")]), _: 1 }),
                                                                      (0, n.bF)(v, { value: "ttml" }, { default: (0, n.k6)(() => [(0, n.eW)(" TTML ")]), _: 1 }),
                                                                      (0, n.bF)(v, { value: "srv3" }, { default: (0, n.k6)(() => [(0, n.eW)(" SRV3 ")]), _: 1 }),
                                                                  ]),
                                                                  _: 1,
                                                              },
                                                              8,
                                                              ["modelValue"]
                                                          ),
                                                      ]),
                                                      _: 1,
                                                  },
                                                  8,
                                                  ["label"]
                                              ),
                                              (0, n.Lk)("div", s, [(0, n.bF)(_, { type: "primary", onClick: e.download }, { default: (0, n.k6)(() => [(0, n.eW)((0, a.v_)(e.locale.downloadButtonText), 1)]), _: 1 }, 8, ["onClick"])]),
                                          ]))
                                        : ((0, n.uX)(), (0, n.CE)("div", d, [(0, n.bF)(b, { name: "alert-circle", type: "warning" }), (0, n.Lk)("p", null, (0, a.v_)(e.locale.notAvailableMessage), 1)])),
                                ],
                                512
                            )
                        );
                    },
                ],
            ]);
        },
        2344: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => f });
            var n = o(7305),
                a = o(5916);
            const i = { key: 0, ref: "notificationsTarget", class: "thumbnails" },
                l = { class: "thumbnails__cover" },
                r = ["src"],
                s = { class: "has-text-right" };
            var d = o(817),
                u = o(5157),
                c = o(7386);
            const m = {
                    qualityLabel: __t("thumbnailsQualityLabel", "Select quality"),
                    downloadButtonText: __t("thumbnailsDownloadButtonText", "Download"),
                    downloadStartedText: __t("thumbnailsDownloadStartedText", "Download started."),
                    downloadFailedText: __t("thumbnailsDownloadFailedText", "Download failed."),
                },
                p = (0, n.pM)({
                    name: "ThumbnailsDownload",
                    setup() {
                        const { info: e, downloadThumbnail: t } = (0, c.A)(),
                            o = (0, d.KR)(0),
                            a = (0, d.KR)(null),
                            i = (0, n.nI)()?.proxy;
                        return {
                            locale: m,
                            info: e,
                            downloadQualityIndex: o,
                            notificationsTarget: a,
                            download: function () {
                                t(o.value)
                                    .then(() => {
                                        u.A.options.showDownloadNotifications && i?.$notify("success", m.downloadStartedText, { duration: 3, target: a.value });
                                    })
                                    .catch((e) => {
                                        i?.$notify("danger", `${m.downloadFailedText} ${e.message}`, { target: a.value });
                                    });
                            },
                        };
                    },
                });
            const f = (0, o(3726).A)(p, [
                [
                    "render",
                    function (e, t, o, d, u, c) {
                        const m = (0, n.g2)("select-option"),
                            p = (0, n.g2)("select-menu"),
                            f = (0, n.g2)("form-item"),
                            h = (0, n.g2)("s-button");
                        return e.info
                            ? ((0, n.uX)(),
                              (0, n.CE)(
                                  "div",
                                  i,
                                  [
                                      (0, n.Lk)("div", l, [(0, n.Lk)("img", { src: e.info.thumbnailUrl }, null, 8, r)]),
                                      (0, n.bF)(
                                          f,
                                          { label: e.locale.qualityLabel },
                                          {
                                              default: (0, n.k6)(() => [
                                                  (0, n.bF)(
                                                      p,
                                                      { modelValue: e.downloadQualityIndex, "onUpdate:modelValue": t[0] || (t[0] = (t) => (e.downloadQualityIndex = t)), position: "top" },
                                                      {
                                                          default: (0, n.k6)(() => [
                                                              ((0, n.uX)(!0),
                                                              (0, n.CE)(
                                                                  n.FK,
                                                                  null,
                                                                  (0, n.pI)(e.info.thumbnails, (e, t) => ((0, n.uX)(), (0, n.Wv)(m, { key: t, value: t, label: `${e.label} (${e.width}x${e.height})` }, null, 8, ["value", "label"]))),
                                                                  128
                                                              )),
                                                          ]),
                                                          _: 1,
                                                      },
                                                      8,
                                                      ["modelValue"]
                                                  ),
                                              ]),
                                              _: 1,
                                          },
                                          8,
                                          ["label"]
                                      ),
                                      (0, n.Lk)("p", s, [(0, n.bF)(h, { type: "primary", onClick: e.download }, { default: (0, n.k6)(() => [(0, n.eW)((0, a.v_)(e.locale.downloadButtonText), 1)]), _: 1 }, 8, ["onClick"])]),
                                  ],
                                  512
                              ))
                            : (0, n.Q3)("v-if", !0);
                    },
                ],
            ]);
        },
        9902: (e, t, o) => {
            "use strict";
            o.d(t, { A: () => kt });
            var n = {};
            function a(e, t) {
                return function () {
                    return e.apply(t, arguments);
                };
            }
            o.r(n), o.d(n, { hasBrowserEnv: () => pe, hasStandardBrowserEnv: () => fe, hasStandardBrowserWebWorkerEnv: () => we, origin: () => ge });
            const { toString: i } = Object.prototype,
                { getPrototypeOf: l } = Object,
                r =
                    ((s = Object.create(null)),
                    (e) => {
                        const t = i.call(e);
                        return s[t] || (s[t] = t.slice(8, -1).toLowerCase());
                    });
            var s;
            const d = (e) => ((e = e.toLowerCase()), (t) => r(t) === e),
                u = (e) => (t) => typeof t === e,
                { isArray: c } = Array,
                m = u("undefined");
            const p = d("ArrayBuffer");
            const f = u("string"),
                h = u("function"),
                w = u("number"),
                g = (e) => null !== e && "object" == typeof e,
                b = (e) => {
                    if ("object" !== r(e)) return !1;
                    const t = l(e);
                    return !((null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t)) || Symbol.toStringTag in e || Symbol.iterator in e);
                },
                v = d("Date"),
                y = d("File"),
                _ = d("Blob"),
                x = d("FileList"),
                k = d("URLSearchParams"),
                [T, C, E, D] = ["ReadableStream", "Request", "Response", "Headers"].map(d);
            function L(e, t, { allOwnKeys: o = !1 } = {}) {
                if (null == e) return;
                let n, a;
                if (("object" != typeof e && (e = [e]), c(e))) for (n = 0, a = e.length; n < a; n++) t.call(null, e[n], n, e);
                else {
                    const a = o ? Object.getOwnPropertyNames(e) : Object.keys(e),
                        i = a.length;
                    let l;
                    for (n = 0; n < i; n++) (l = a[n]), t.call(null, e[l], l, e);
                }
            }
            function F(e, t) {
                t = t.toLowerCase();
                const o = Object.keys(e);
                let n,
                    a = o.length;
                for (; a-- > 0; ) if (((n = o[a]), t === n.toLowerCase())) return n;
                return null;
            }
            const A = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global,
                R = (e) => !m(e) && e !== A;
            const S = ((O = "undefined" != typeof Uint8Array && l(Uint8Array)), (e) => O && e instanceof O);
            var O;
            const U = d("HTMLFormElement"),
                B = (({ hasOwnProperty: e }) => (t, o) => e.call(t, o))(Object.prototype),
                P = d("RegExp"),
                M = (e, t) => {
                    const o = Object.getOwnPropertyDescriptors(e),
                        n = {};
                    L(o, (o, a) => {
                        let i;
                        !1 !== (i = t(o, a, e)) && (n[a] = i || o);
                    }),
                        Object.defineProperties(e, n);
                },
                N = "abcdefghijklmnopqrstuvwxyz",
                q = "0123456789",
                I = { DIGIT: q, ALPHA: N, ALPHA_DIGIT: N + N.toUpperCase() + q };
            const $ = d("AsyncFunction"),
                X =
                    ((V = "function" == typeof setImmediate),
                    (j = h(A.postMessage)),
                    V
                        ? setImmediate
                        : j
                        ? ((Q = `axios@${Math.random()}`),
                          (H = []),
                          A.addEventListener(
                              "message",
                              ({ source: e, data: t }) => {
                                  e === A && t === Q && H.length && H.shift()();
                              },
                              !1
                          ),
                          (e) => {
                              H.push(e), A.postMessage(Q, "*");
                          })
                        : (e) => setTimeout(e));
            var V, j, Q, H;
            const W = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(A) : ("undefined" != typeof process && process.nextTick) || X,
                K = {
                    isArray: c,
                    isArrayBuffer: p,
                    isBuffer: function (e) {
                        return null !== e && !m(e) && null !== e.constructor && !m(e.constructor) && h(e.constructor.isBuffer) && e.constructor.isBuffer(e);
                    },
                    isFormData: (e) => {
                        let t;
                        return e && (("function" == typeof FormData && e instanceof FormData) || (h(e.append) && ("formdata" === (t = r(e)) || ("object" === t && h(e.toString) && "[object FormData]" === e.toString()))));
                    },
                    isArrayBufferView: function (e) {
                        let t;
                        return (t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && p(e.buffer)), t;
                    },
                    isString: f,
                    isNumber: w,
                    isBoolean: (e) => !0 === e || !1 === e,
                    isObject: g,
                    isPlainObject: b,
                    isReadableStream: T,
                    isRequest: C,
                    isResponse: E,
                    isHeaders: D,
                    isUndefined: m,
                    isDate: v,
                    isFile: y,
                    isBlob: _,
                    isRegExp: P,
                    isFunction: h,
                    isStream: (e) => g(e) && h(e.pipe),
                    isURLSearchParams: k,
                    isTypedArray: S,
                    isFileList: x,
                    forEach: L,
                    merge: function e() {
                        const { caseless: t } = (R(this) && this) || {},
                            o = {},
                            n = (n, a) => {
                                const i = (t && F(o, a)) || a;
                                b(o[i]) && b(n) ? (o[i] = e(o[i], n)) : b(n) ? (o[i] = e({}, n)) : c(n) ? (o[i] = n.slice()) : (o[i] = n);
                            };
                        for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && L(arguments[e], n);
                        return o;
                    },
                    extend: (e, t, o, { allOwnKeys: n } = {}) => (
                        L(
                            t,
                            (t, n) => {
                                o && h(t) ? (e[n] = a(t, o)) : (e[n] = t);
                            },
                            { allOwnKeys: n }
                        ),
                        e
                    ),
                    trim: (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")),
                    stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
                    inherits: (e, t, o, n) => {
                        (e.prototype = Object.create(t.prototype, n)), (e.prototype.constructor = e), Object.defineProperty(e, "super", { value: t.prototype }), o && Object.assign(e.prototype, o);
                    },
                    toFlatObject: (e, t, o, n) => {
                        let a, i, r;
                        const s = {};
                        if (((t = t || {}), null == e)) return t;
                        do {
                            for (a = Object.getOwnPropertyNames(e), i = a.length; i-- > 0; ) (r = a[i]), (n && !n(r, e, t)) || s[r] || ((t[r] = e[r]), (s[r] = !0));
                            e = !1 !== o && l(e);
                        } while (e && (!o || o(e, t)) && e !== Object.prototype);
                        return t;
                    },
                    kindOf: r,
                    kindOfTest: d,
                    endsWith: (e, t, o) => {
                        (e = String(e)), (void 0 === o || o > e.length) && (o = e.length), (o -= t.length);
                        const n = e.indexOf(t, o);
                        return -1 !== n && n === o;
                    },
                    toArray: (e) => {
                        if (!e) return null;
                        if (c(e)) return e;
                        let t = e.length;
                        if (!w(t)) return null;
                        const o = new Array(t);
                        for (; t-- > 0; ) o[t] = e[t];
                        return o;
                    },
                    forEachEntry: (e, t) => {
                        const o = (e && e[Symbol.iterator]).call(e);
                        let n;
                        for (; (n = o.next()) && !n.done; ) {
                            const o = n.value;
                            t.call(e, o[0], o[1]);
                        }
                    },
                    matchAll: (e, t) => {
                        let o;
                        const n = [];
                        for (; null !== (o = e.exec(t)); ) n.push(o);
                        return n;
                    },
                    isHTMLForm: U,
                    hasOwnProperty: B,
                    hasOwnProp: B,
                    reduceDescriptors: M,
                    freezeMethods: (e) => {
                        M(e, (t, o) => {
                            if (h(e) && -1 !== ["arguments", "caller", "callee"].indexOf(o)) return !1;
                            const n = e[o];
                            h(n) &&
                                ((t.enumerable = !1),
                                "writable" in t
                                    ? (t.writable = !1)
                                    : t.set ||
                                      (t.set = () => {
                                          throw Error("Can not rewrite read-only method '" + o + "'");
                                      }));
                        });
                    },
                    toObjectSet: (e, t) => {
                        const o = {},
                            n = (e) => {
                                e.forEach((e) => {
                                    o[e] = !0;
                                });
                            };
                        return c(e) ? n(e) : n(String(e).split(t)), o;
                    },
                    toCamelCase: (e) =>
                        e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, o) {
                            return t.toUpperCase() + o;
                        }),
                    noop: () => {},
                    toFiniteNumber: (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
                    findKey: F,
                    global: A,
                    isContextDefined: R,
                    ALPHABET: I,
                    generateString: (e = 16, t = I.ALPHA_DIGIT) => {
                        let o = "";
                        const { length: n } = t;
                        for (; e--; ) o += t[(Math.random() * n) | 0];
                        return o;
                    },
                    isSpecCompliantForm: function (e) {
                        return !!(e && h(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator]);
                    },
                    toJSONObject: (e) => {
                        const t = new Array(10),
                            o = (e, n) => {
                                if (g(e)) {
                                    if (t.indexOf(e) >= 0) return;
                                    if (!("toJSON" in e)) {
                                        t[n] = e;
                                        const a = c(e) ? [] : {};
                                        return (
                                            L(e, (e, t) => {
                                                const i = o(e, n + 1);
                                                !m(i) && (a[t] = i);
                                            }),
                                            (t[n] = void 0),
                                            a
                                        );
                                    }
                                }
                                return e;
                            };
                        return o(e, 0);
                    },
                    isAsyncFn: $,
                    isThenable: (e) => e && (g(e) || h(e)) && h(e.then) && h(e.catch),
                    setImmediate: X,
                    asap: W,
                };
            function z(e, t, o, n, a) {
                Error.call(this),
                    Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
                    (this.message = e),
                    (this.name = "AxiosError"),
                    t && (this.code = t),
                    o && (this.config = o),
                    n && (this.request = n),
                    a && (this.response = a);
            }
            K.inherits(z, Error, {
                toJSON: function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: K.toJSONObject(this.config),
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null,
                    };
                },
            });
            const G = z.prototype,
                J = {};
            [
                "ERR_BAD_OPTION_VALUE",
                "ERR_BAD_OPTION",
                "ECONNABORTED",
                "ETIMEDOUT",
                "ERR_NETWORK",
                "ERR_FR_TOO_MANY_REDIRECTS",
                "ERR_DEPRECATED",
                "ERR_BAD_RESPONSE",
                "ERR_BAD_REQUEST",
                "ERR_CANCELED",
                "ERR_NOT_SUPPORT",
                "ERR_INVALID_URL",
            ].forEach((e) => {
                J[e] = { value: e };
            }),
                Object.defineProperties(z, J),
                Object.defineProperty(G, "isAxiosError", { value: !0 }),
                (z.from = (e, t, o, n, a, i) => {
                    const l = Object.create(G);
                    return (
                        K.toFlatObject(
                            e,
                            l,
                            function (e) {
                                return e !== Error.prototype;
                            },
                            (e) => "isAxiosError" !== e
                        ),
                        z.call(l, e.message, t, o, n, a),
                        (l.cause = e),
                        (l.name = e.name),
                        i && Object.assign(l, i),
                        l
                    );
                });
            const Y = z;
            function Z(e) {
                return K.isPlainObject(e) || K.isArray(e);
            }
            function ee(e) {
                return K.endsWith(e, "[]") ? e.slice(0, -2) : e;
            }
            function te(e, t, o) {
                return e
                    ? e
                          .concat(t)
                          .map(function (e, t) {
                              return (e = ee(e)), !o && t ? "[" + e + "]" : e;
                          })
                          .join(o ? "." : "")
                    : t;
            }
            const oe = K.toFlatObject(K, {}, null, function (e) {
                return /^is[A-Z]/.test(e);
            });
            const ne = function (e, t, o) {
                if (!K.isObject(e)) throw new TypeError("target must be an object");
                t = t || new FormData();
                const n = (o = K.toFlatObject(o, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (e, t) {
                        return !K.isUndefined(t[e]);
                    })).metaTokens,
                    a = o.visitor || d,
                    i = o.dots,
                    l = o.indexes,
                    r = (o.Blob || ("undefined" != typeof Blob && Blob)) && K.isSpecCompliantForm(t);
                if (!K.isFunction(a)) throw new TypeError("visitor must be a function");
                function s(e) {
                    if (null === e) return "";
                    if (K.isDate(e)) return e.toISOString();
                    if (!r && K.isBlob(e)) throw new Y("Blob is not supported. Use a Buffer instead.");
                    return K.isArrayBuffer(e) || K.isTypedArray(e) ? (r && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e)) : e;
                }
                function d(e, o, a) {
                    let r = e;
                    if (e && !a && "object" == typeof e)
                        if (K.endsWith(o, "{}")) (o = n ? o : o.slice(0, -2)), (e = JSON.stringify(e));
                        else if (
                            (K.isArray(e) &&
                                (function (e) {
                                    return K.isArray(e) && !e.some(Z);
                                })(e)) ||
                            ((K.isFileList(e) || K.endsWith(o, "[]")) && (r = K.toArray(e)))
                        )
                            return (
                                (o = ee(o)),
                                r.forEach(function (e, n) {
                                    !K.isUndefined(e) && null !== e && t.append(!0 === l ? te([o], n, i) : null === l ? o : o + "[]", s(e));
                                }),
                                !1
                            );
                    return !!Z(e) || (t.append(te(a, o, i), s(e)), !1);
                }
                const u = [],
                    c = Object.assign(oe, { defaultVisitor: d, convertValue: s, isVisitable: Z });
                if (!K.isObject(e)) throw new TypeError("data must be an object");
                return (
                    (function e(o, n) {
                        if (!K.isUndefined(o)) {
                            if (-1 !== u.indexOf(o)) throw Error("Circular reference detected in " + n.join("."));
                            u.push(o),
                                K.forEach(o, function (o, i) {
                                    !0 === (!(K.isUndefined(o) || null === o) && a.call(t, o, K.isString(i) ? i.trim() : i, n, c)) && e(o, n ? n.concat(i) : [i]);
                                }),
                                u.pop();
                        }
                    })(e),
                    t
                );
            };
            function ae(e) {
                const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
                return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
                    return t[e];
                });
            }
            function ie(e, t) {
                (this._pairs = []), e && ne(e, this, t);
            }
            const le = ie.prototype;
            (le.append = function (e, t) {
                this._pairs.push([e, t]);
            }),
                (le.toString = function (e) {
                    const t = e
                        ? function (t) {
                              return e.call(this, t, ae);
                          }
                        : ae;
                    return this._pairs
                        .map(function (e) {
                            return t(e[0]) + "=" + t(e[1]);
                        }, "")
                        .join("&");
                });
            const re = ie;
            function se(e) {
                return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
            }
            function de(e, t, o) {
                if (!t) return e;
                const n = (o && o.encode) || se,
                    a = o && o.serialize;
                let i;
                if (((i = a ? a(t, o) : K.isURLSearchParams(t) ? t.toString() : new re(t, o).toString(n)), i)) {
                    const t = e.indexOf("#");
                    -1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf("?") ? "?" : "&") + i);
                }
                return e;
            }
            const ue = class {
                    constructor() {
                        this.handlers = [];
                    }
                    use(e, t, o) {
                        return this.handlers.push({ fulfilled: e, rejected: t, synchronous: !!o && o.synchronous, runWhen: o ? o.runWhen : null }), this.handlers.length - 1;
                    }
                    eject(e) {
                        this.handlers[e] && (this.handlers[e] = null);
                    }
                    clear() {
                        this.handlers && (this.handlers = []);
                    }
                    forEach(e) {
                        K.forEach(this.handlers, function (t) {
                            null !== t && e(t);
                        });
                    }
                },
                ce = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
                me = {
                    isBrowser: !0,
                    classes: { URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : re, FormData: "undefined" != typeof FormData ? FormData : null, Blob: "undefined" != typeof Blob ? Blob : null },
                    protocols: ["http", "https", "file", "blob", "url", "data"],
                },
                pe = "undefined" != typeof window && "undefined" != typeof document,
                fe = ((he = "undefined" != typeof navigator && navigator.product), pe && ["ReactNative", "NativeScript", "NS"].indexOf(he) < 0);
            var he;
            const we = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts,
                ge = (pe && window.location.href) || "http://localhost",
                be = { ...n, ...me };
            const ve = function (e) {
                function t(e, o, n, a) {
                    let i = e[a++];
                    if ("__proto__" === i) return !0;
                    const l = Number.isFinite(+i),
                        r = a >= e.length;
                    if (((i = !i && K.isArray(n) ? n.length : i), r)) return K.hasOwnProp(n, i) ? (n[i] = [n[i], o]) : (n[i] = o), !l;
                    (n[i] && K.isObject(n[i])) || (n[i] = []);
                    return (
                        t(e, o, n[i], a) &&
                            K.isArray(n[i]) &&
                            (n[i] = (function (e) {
                                const t = {},
                                    o = Object.keys(e);
                                let n;
                                const a = o.length;
                                let i;
                                for (n = 0; n < a; n++) (i = o[n]), (t[i] = e[i]);
                                return t;
                            })(n[i])),
                        !l
                    );
                }
                if (K.isFormData(e) && K.isFunction(e.entries)) {
                    const o = {};
                    return (
                        K.forEachEntry(e, (e, n) => {
                            t(
                                (function (e) {
                                    return K.matchAll(/\w+|\[(\w*)]/g, e).map((e) => ("[]" === e[0] ? "" : e[1] || e[0]));
                                })(e),
                                n,
                                o,
                                0
                            );
                        }),
                        o
                    );
                }
                return null;
            };
            const ye = {
                transitional: ce,
                adapter: ["xhr", "http", "fetch"],
                transformRequest: [
                    function (e, t) {
                        const o = t.getContentType() || "",
                            n = o.indexOf("application/json") > -1,
                            a = K.isObject(e);
                        a && K.isHTMLForm(e) && (e = new FormData(e));
                        if (K.isFormData(e)) return n ? JSON.stringify(ve(e)) : e;
                        if (K.isArrayBuffer(e) || K.isBuffer(e) || K.isStream(e) || K.isFile(e) || K.isBlob(e) || K.isReadableStream(e)) return e;
                        if (K.isArrayBufferView(e)) return e.buffer;
                        if (K.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
                        let i;
                        if (a) {
                            if (o.indexOf("application/x-www-form-urlencoded") > -1)
                                return (function (e, t) {
                                    return ne(
                                        e,
                                        new be.classes.URLSearchParams(),
                                        Object.assign(
                                            {
                                                visitor: function (e, t, o, n) {
                                                    return be.isNode && K.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments);
                                                },
                                            },
                                            t
                                        )
                                    );
                                })(e, this.formSerializer).toString();
                            if ((i = K.isFileList(e)) || o.indexOf("multipart/form-data") > -1) {
                                const t = this.env && this.env.FormData;
                                return ne(i ? { "files[]": e } : e, t && new t(), this.formSerializer);
                            }
                        }
                        return a || n
                            ? (t.setContentType("application/json", !1),
                              (function (e, t, o) {
                                  if (K.isString(e))
                                      try {
                                          return (t || JSON.parse)(e), K.trim(e);
                                      } catch (e) {
                                          if ("SyntaxError" !== e.name) throw e;
                                      }
                                  return (o || JSON.stringify)(e);
                              })(e))
                            : e;
                    },
                ],
                transformResponse: [
                    function (e) {
                        const t = this.transitional || ye.transitional,
                            o = t && t.forcedJSONParsing,
                            n = "json" === this.responseType;
                        if (K.isResponse(e) || K.isReadableStream(e)) return e;
                        if (e && K.isString(e) && ((o && !this.responseType) || n)) {
                            const o = !(t && t.silentJSONParsing) && n;
                            try {
                                return JSON.parse(e);
                            } catch (e) {
                                if (o) {
                                    if ("SyntaxError" === e.name) throw Y.from(e, Y.ERR_BAD_RESPONSE, this, null, this.response);
                                    throw e;
                                }
                            }
                        }
                        return e;
                    },
                ],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                maxBodyLength: -1,
                env: { FormData: be.classes.FormData, Blob: be.classes.Blob },
                validateStatus: function (e) {
                    return e >= 200 && e < 300;
                },
                headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } },
            };
            K.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
                ye.headers[e] = {};
            });
            const _e = ye,
                xe = K.toObjectSet([
                    "age",
                    "authorization",
                    "content-length",
                    "content-type",
                    "etag",
                    "expires",
                    "from",
                    "host",
                    "if-modified-since",
                    "if-unmodified-since",
                    "last-modified",
                    "location",
                    "max-forwards",
                    "proxy-authorization",
                    "referer",
                    "retry-after",
                    "user-agent",
                ]),
                ke = Symbol("internals");
            function Te(e) {
                return e && String(e).trim().toLowerCase();
            }
            function Ce(e) {
                return !1 === e || null == e ? e : K.isArray(e) ? e.map(Ce) : String(e);
            }
            function Ee(e, t, o, n, a) {
                return K.isFunction(n) ? n.call(this, t, o) : (a && (t = o), K.isString(t) ? (K.isString(n) ? -1 !== t.indexOf(n) : K.isRegExp(n) ? n.test(t) : void 0) : void 0);
            }
            class De {
                constructor(e) {
                    e && this.set(e);
                }
                set(e, t, o) {
                    const n = this;
                    function a(e, t, o) {
                        const a = Te(t);
                        if (!a) throw new Error("header name must be a non-empty string");
                        const i = K.findKey(n, a);
                        (!i || void 0 === n[i] || !0 === o || (void 0 === o && !1 !== n[i])) && (n[i || t] = Ce(e));
                    }
                    const i = (e, t) => K.forEach(e, (e, o) => a(e, o, t));
                    if (K.isPlainObject(e) || e instanceof this.constructor) i(e, t);
                    else if (K.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))
                        i(
                            ((e) => {
                                const t = {};
                                let o, n, a;
                                return (
                                    e &&
                                        e.split("\n").forEach(function (e) {
                                            (a = e.indexOf(":")),
                                                (o = e.substring(0, a).trim().toLowerCase()),
                                                (n = e.substring(a + 1).trim()),
                                                !o || (t[o] && xe[o]) || ("set-cookie" === o ? (t[o] ? t[o].push(n) : (t[o] = [n])) : (t[o] = t[o] ? t[o] + ", " + n : n));
                                        }),
                                    t
                                );
                            })(e),
                            t
                        );
                    else if (K.isHeaders(e)) for (const [t, n] of e.entries()) a(n, t, o);
                    else null != e && a(t, e, o);
                    return this;
                }
                get(e, t) {
                    if ((e = Te(e))) {
                        const o = K.findKey(this, e);
                        if (o) {
                            const e = this[o];
                            if (!t) return e;
                            if (!0 === t)
                                return (function (e) {
                                    const t = Object.create(null),
                                        o = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                                    let n;
                                    for (; (n = o.exec(e)); ) t[n[1]] = n[2];
                                    return t;
                                })(e);
                            if (K.isFunction(t)) return t.call(this, e, o);
                            if (K.isRegExp(t)) return t.exec(e);
                            throw new TypeError("parser must be boolean|regexp|function");
                        }
                    }
                }
                has(e, t) {
                    if ((e = Te(e))) {
                        const o = K.findKey(this, e);
                        return !(!o || void 0 === this[o] || (t && !Ee(0, this[o], o, t)));
                    }
                    return !1;
                }
                delete(e, t) {
                    const o = this;
                    let n = !1;
                    function a(e) {
                        if ((e = Te(e))) {
                            const a = K.findKey(o, e);
                            !a || (t && !Ee(0, o[a], a, t)) || (delete o[a], (n = !0));
                        }
                    }
                    return K.isArray(e) ? e.forEach(a) : a(e), n;
                }
                clear(e) {
                    const t = Object.keys(this);
                    let o = t.length,
                        n = !1;
                    for (; o--; ) {
                        const a = t[o];
                        (e && !Ee(0, this[a], a, e, !0)) || (delete this[a], (n = !0));
                    }
                    return n;
                }
                normalize(e) {
                    const t = this,
                        o = {};
                    return (
                        K.forEach(this, (n, a) => {
                            const i = K.findKey(o, a);
                            if (i) return (t[i] = Ce(n)), void delete t[a];
                            const l = e
                                ? (function (e) {
                                      return e
                                          .trim()
                                          .toLowerCase()
                                          .replace(/([a-z\d])(\w*)/g, (e, t, o) => t.toUpperCase() + o);
                                  })(a)
                                : String(a).trim();
                            l !== a && delete t[a], (t[l] = Ce(n)), (o[l] = !0);
                        }),
                        this
                    );
                }
                concat(...e) {
                    return this.constructor.concat(this, ...e);
                }
                toJSON(e) {
                    const t = Object.create(null);
                    return (
                        K.forEach(this, (o, n) => {
                            null != o && !1 !== o && (t[n] = e && K.isArray(o) ? o.join(", ") : o);
                        }),
                        t
                    );
                }
                [Symbol.iterator]() {
                    return Object.entries(this.toJSON())[Symbol.iterator]();
                }
                toString() {
                    return Object.entries(this.toJSON())
                        .map(([e, t]) => e + ": " + t)
                        .join("\n");
                }
                get [Symbol.toStringTag]() {
                    return "AxiosHeaders";
                }
                static from(e) {
                    return e instanceof this ? e : new this(e);
                }
                static concat(e, ...t) {
                    const o = new this(e);
                    return t.forEach((e) => o.set(e)), o;
                }
                static accessor(e) {
                    const t = (this[ke] = this[ke] = { accessors: {} }).accessors,
                        o = this.prototype;
                    function n(e) {
                        const n = Te(e);
                        t[n] ||
                            (!(function (e, t) {
                                const o = K.toCamelCase(" " + t);
                                ["get", "set", "has"].forEach((n) => {
                                    Object.defineProperty(e, n + o, {
                                        value: function (e, o, a) {
                                            return this[n].call(this, t, e, o, a);
                                        },
                                        configurable: !0,
                                    });
                                });
                            })(o, e),
                            (t[n] = !0));
                    }
                    return K.isArray(e) ? e.forEach(n) : n(e), this;
                }
            }
            De.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]),
                K.reduceDescriptors(De.prototype, ({ value: e }, t) => {
                    let o = t[0].toUpperCase() + t.slice(1);
                    return {
                        get: () => e,
                        set(e) {
                            this[o] = e;
                        },
                    };
                }),
                K.freezeMethods(De);
            const Le = De;
            function Fe(e, t) {
                const o = this || _e,
                    n = t || o,
                    a = Le.from(n.headers);
                let i = n.data;
                return (
                    K.forEach(e, function (e) {
                        i = e.call(o, i, a.normalize(), t ? t.status : void 0);
                    }),
                    a.normalize(),
                    i
                );
            }
            function Ae(e) {
                return !(!e || !e.__CANCEL__);
            }
            function Re(e, t, o) {
                Y.call(this, null == e ? "canceled" : e, Y.ERR_CANCELED, t, o), (this.name = "CanceledError");
            }
            K.inherits(Re, Y, { __CANCEL__: !0 });
            const Se = Re;
            function Oe(e, t, o) {
                const n = o.config.validateStatus;
                o.status && n && !n(o.status) ? t(new Y("Request failed with status code " + o.status, [Y.ERR_BAD_REQUEST, Y.ERR_BAD_RESPONSE][Math.floor(o.status / 100) - 4], o.config, o.request, o)) : e(o);
            }
            const Ue = function (e, t) {
                e = e || 10;
                const o = new Array(e),
                    n = new Array(e);
                let a,
                    i = 0,
                    l = 0;
                return (
                    (t = void 0 !== t ? t : 1e3),
                    function (r) {
                        const s = Date.now(),
                            d = n[l];
                        a || (a = s), (o[i] = r), (n[i] = s);
                        let u = l,
                            c = 0;
                        for (; u !== i; ) (c += o[u++]), (u %= e);
                        if (((i = (i + 1) % e), i === l && (l = (l + 1) % e), s - a < t)) return;
                        const m = d && s - d;
                        return m ? Math.round((1e3 * c) / m) : void 0;
                    }
                );
            };
            const Be = function (e, t) {
                    let o,
                        n,
                        a = 0,
                        i = 1e3 / t;
                    const l = (t, i = Date.now()) => {
                        (a = i), (o = null), n && (clearTimeout(n), (n = null)), e.apply(null, t);
                    };
                    return [
                        (...e) => {
                            const t = Date.now(),
                                r = t - a;
                            r >= i
                                ? l(e, t)
                                : ((o = e),
                                  n ||
                                      (n = setTimeout(() => {
                                          (n = null), l(o);
                                      }, i - r)));
                        },
                        () => o && l(o),
                    ];
                },
                Pe = (e, t, o = 3) => {
                    let n = 0;
                    const a = Ue(50, 250);
                    return Be((o) => {
                        const i = o.loaded,
                            l = o.lengthComputable ? o.total : void 0,
                            r = i - n,
                            s = a(r);
                        n = i;
                        e({ loaded: i, total: l, progress: l ? i / l : void 0, bytes: r, rate: s || void 0, estimated: s && l && i <= l ? (l - i) / s : void 0, event: o, lengthComputable: null != l, [t ? "download" : "upload"]: !0 });
                    }, o);
                },
                Me = (e, t) => {
                    const o = null != e;
                    return [(n) => t[0]({ lengthComputable: o, total: e, loaded: n }), t[1]];
                },
                Ne = (e) => (...t) => K.asap(() => e(...t)),
                qe = be.hasStandardBrowserEnv
                    ? (function () {
                          const e = /(msie|trident)/i.test(navigator.userAgent),
                              t = document.createElement("a");
                          let o;
                          function n(o) {
                              let n = o;
                              return (
                                  e && (t.setAttribute("href", n), (n = t.href)),
                                  t.setAttribute("href", n),
                                  {
                                      href: t.href,
                                      protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
                                      host: t.host,
                                      search: t.search ? t.search.replace(/^\?/, "") : "",
                                      hash: t.hash ? t.hash.replace(/^#/, "") : "",
                                      hostname: t.hostname,
                                      port: t.port,
                                      pathname: "/" === t.pathname.charAt(0) ? t.pathname : "/" + t.pathname,
                                  }
                              );
                          }
                          return (
                              (o = n(window.location.href)),
                              function (e) {
                                  const t = K.isString(e) ? n(e) : e;
                                  return t.protocol === o.protocol && t.host === o.host;
                              }
                          );
                      })()
                    : function () {
                          return !0;
                      },
                Ie = be.hasStandardBrowserEnv
                    ? {
                          write(e, t, o, n, a, i) {
                              const l = [e + "=" + encodeURIComponent(t)];
                              K.isNumber(o) && l.push("expires=" + new Date(o).toGMTString()), K.isString(n) && l.push("path=" + n), K.isString(a) && l.push("domain=" + a), !0 === i && l.push("secure"), (document.cookie = l.join("; "));
                          },
                          read(e) {
                              const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                              return t ? decodeURIComponent(t[3]) : null;
                          },
                          remove(e) {
                              this.write(e, "", Date.now() - 864e5);
                          },
                      }
                    : { write() {}, read: () => null, remove() {} };
            function $e(e, t) {
                return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
                    ? (function (e, t) {
                          return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
                      })(e, t)
                    : t;
            }
            const Xe = (e) => (e instanceof Le ? { ...e } : e);
            function Ve(e, t) {
                t = t || {};
                const o = {};
                function n(e, t, o) {
                    return K.isPlainObject(e) && K.isPlainObject(t) ? K.merge.call({ caseless: o }, e, t) : K.isPlainObject(t) ? K.merge({}, t) : K.isArray(t) ? t.slice() : t;
                }
                function a(e, t, o) {
                    return K.isUndefined(t) ? (K.isUndefined(e) ? void 0 : n(void 0, e, o)) : n(e, t, o);
                }
                function i(e, t) {
                    if (!K.isUndefined(t)) return n(void 0, t);
                }
                function l(e, t) {
                    return K.isUndefined(t) ? (K.isUndefined(e) ? void 0 : n(void 0, e)) : n(void 0, t);
                }
                function r(o, a, i) {
                    return i in t ? n(o, a) : i in e ? n(void 0, o) : void 0;
                }
                const s = {
                    url: i,
                    method: i,
                    data: i,
                    baseURL: l,
                    transformRequest: l,
                    transformResponse: l,
                    paramsSerializer: l,
                    timeout: l,
                    timeoutMessage: l,
                    withCredentials: l,
                    withXSRFToken: l,
                    adapter: l,
                    responseType: l,
                    xsrfCookieName: l,
                    xsrfHeaderName: l,
                    onUploadProgress: l,
                    onDownloadProgress: l,
                    decompress: l,
                    maxContentLength: l,
                    maxBodyLength: l,
                    beforeRedirect: l,
                    transport: l,
                    httpAgent: l,
                    httpsAgent: l,
                    cancelToken: l,
                    socketPath: l,
                    responseEncoding: l,
                    validateStatus: r,
                    headers: (e, t) => a(Xe(e), Xe(t), !0),
                };
                return (
                    K.forEach(Object.keys(Object.assign({}, e, t)), function (n) {
                        const i = s[n] || a,
                            l = i(e[n], t[n], n);
                        (K.isUndefined(l) && i !== r) || (o[n] = l);
                    }),
                    o
                );
            }
            const je = (e) => {
                    const t = Ve({}, e);
                    let o,
                        { data: n, withXSRFToken: a, xsrfHeaderName: i, xsrfCookieName: l, headers: r, auth: s } = t;
                    if (
                        ((t.headers = r = Le.from(r)),
                        (t.url = de($e(t.baseURL, t.url), e.params, e.paramsSerializer)),
                        s && r.set("Authorization", "Basic " + btoa((s.username || "") + ":" + (s.password ? unescape(encodeURIComponent(s.password)) : ""))),
                        K.isFormData(n))
                    )
                        if (be.hasStandardBrowserEnv || be.hasStandardBrowserWebWorkerEnv) r.setContentType(void 0);
                        else if (!1 !== (o = r.getContentType())) {
                            const [e, ...t] = o
                                ? o
                                      .split(";")
                                      .map((e) => e.trim())
                                      .filter(Boolean)
                                : [];
                            r.setContentType([e || "multipart/form-data", ...t].join("; "));
                        }
                    if (be.hasStandardBrowserEnv && (a && K.isFunction(a) && (a = a(t)), a || (!1 !== a && qe(t.url)))) {
                        const e = i && l && Ie.read(l);
                        e && r.set(i, e);
                    }
                    return t;
                },
                Qe =
                    "undefined" != typeof XMLHttpRequest &&
                    function (e) {
                        return new Promise(function (t, o) {
                            const n = je(e);
                            let a = n.data;
                            const i = Le.from(n.headers).normalize();
                            let l,
                                r,
                                s,
                                d,
                                u,
                                { responseType: c, onUploadProgress: m, onDownloadProgress: p } = n;
                            function f() {
                                d && d(), u && u(), n.cancelToken && n.cancelToken.unsubscribe(l), n.signal && n.signal.removeEventListener("abort", l);
                            }
                            let h = new XMLHttpRequest();
                            function w() {
                                if (!h) return;
                                const n = Le.from("getAllResponseHeaders" in h && h.getAllResponseHeaders());
                                Oe(
                                    function (e) {
                                        t(e), f();
                                    },
                                    function (e) {
                                        o(e), f();
                                    },
                                    { data: c && "text" !== c && "json" !== c ? h.response : h.responseText, status: h.status, statusText: h.statusText, headers: n, config: e, request: h }
                                ),
                                    (h = null);
                            }
                            h.open(n.method.toUpperCase(), n.url, !0),
                                (h.timeout = n.timeout),
                                "onloadend" in h
                                    ? (h.onloadend = w)
                                    : (h.onreadystatechange = function () {
                                          h && 4 === h.readyState && (0 !== h.status || (h.responseURL && 0 === h.responseURL.indexOf("file:"))) && setTimeout(w);
                                      }),
                                (h.onabort = function () {
                                    h && (o(new Y("Request aborted", Y.ECONNABORTED, e, h)), (h = null));
                                }),
                                (h.onerror = function () {
                                    o(new Y("Network Error", Y.ERR_NETWORK, e, h)), (h = null);
                                }),
                                (h.ontimeout = function () {
                                    let t = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
                                    const a = n.transitional || ce;
                                    n.timeoutErrorMessage && (t = n.timeoutErrorMessage), o(new Y(t, a.clarifyTimeoutError ? Y.ETIMEDOUT : Y.ECONNABORTED, e, h)), (h = null);
                                }),
                                void 0 === a && i.setContentType(null),
                                "setRequestHeader" in h &&
                                    K.forEach(i.toJSON(), function (e, t) {
                                        h.setRequestHeader(t, e);
                                    }),
                                K.isUndefined(n.withCredentials) || (h.withCredentials = !!n.withCredentials),
                                c && "json" !== c && (h.responseType = n.responseType),
                                p && (([s, u] = Pe(p, !0)), h.addEventListener("progress", s)),
                                m && h.upload && (([r, d] = Pe(m)), h.upload.addEventListener("progress", r), h.upload.addEventListener("loadend", d)),
                                (n.cancelToken || n.signal) &&
                                    ((l = (t) => {
                                        h && (o(!t || t.type ? new Se(null, e, h) : t), h.abort(), (h = null));
                                    }),
                                    n.cancelToken && n.cancelToken.subscribe(l),
                                    n.signal && (n.signal.aborted ? l() : n.signal.addEventListener("abort", l)));
                            const g = (function (e) {
                                const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                                return (t && t[1]) || "";
                            })(n.url);
                            g && -1 === be.protocols.indexOf(g) ? o(new Y("Unsupported protocol " + g + ":", Y.ERR_BAD_REQUEST, e)) : h.send(a || null);
                        });
                    },
                He = (e, t) => {
                    let o,
                        n = new AbortController();
                    const a = function (e) {
                        if (!o) {
                            (o = !0), l();
                            const t = e instanceof Error ? e : this.reason;
                            n.abort(t instanceof Y ? t : new Se(t instanceof Error ? t.message : t));
                        }
                    };
                    let i =
                        t &&
                        setTimeout(() => {
                            a(new Y(`timeout ${t} of ms exceeded`, Y.ETIMEDOUT));
                        }, t);
                    const l = () => {
                        e &&
                            (i && clearTimeout(i),
                            (i = null),
                            e.forEach((e) => {
                                e && (e.removeEventListener ? e.removeEventListener("abort", a) : e.unsubscribe(a));
                            }),
                            (e = null));
                    };
                    e.forEach((e) => e && e.addEventListener && e.addEventListener("abort", a));
                    const { signal: r } = n;
                    return (
                        (r.unsubscribe = l),
                        [
                            r,
                            () => {
                                i && clearTimeout(i), (i = null);
                            },
                        ]
                    );
                },
                We = function* (e, t) {
                    let o = e.byteLength;
                    if (!t || o < t) return void (yield e);
                    let n,
                        a = 0;
                    for (; a < o; ) (n = a + t), yield e.slice(a, n), (a = n);
                },
                Ke = (e, t, o, n, a) => {
                    const i = (async function* (e, t, o) {
                        for await (const n of e) yield* We(ArrayBuffer.isView(n) ? n : await o(String(n)), t);
                    })(e, t, a);
                    let l,
                        r = 0,
                        s = (e) => {
                            l || ((l = !0), n && n(e));
                        };
                    return new ReadableStream(
                        {
                            async pull(e) {
                                try {
                                    const { done: t, value: n } = await i.next();
                                    if (t) return s(), void e.close();
                                    let a = n.byteLength;
                                    if (o) {
                                        let e = (r += a);
                                        o(e);
                                    }
                                    e.enqueue(new Uint8Array(n));
                                } catch (e) {
                                    throw (s(e), e);
                                }
                            },
                            cancel: (e) => (s(e), i.return()),
                        },
                        { highWaterMark: 2 }
                    );
                },
                ze = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response,
                Ge = ze && "function" == typeof ReadableStream,
                Je = ze && ("function" == typeof TextEncoder ? ((Ye = new TextEncoder()), (e) => Ye.encode(e)) : async (e) => new Uint8Array(await new Response(e).arrayBuffer()));
            var Ye;
            const Ze = (e, ...t) => {
                    try {
                        return !!e(...t);
                    } catch (e) {
                        return !1;
                    }
                },
                et =
                    Ge &&
                    Ze(() => {
                        let e = !1;
                        const t = new Request(be.origin, {
                            body: new ReadableStream(),
                            method: "POST",
                            get duplex() {
                                return (e = !0), "half";
                            },
                        }).headers.has("Content-Type");
                        return e && !t;
                    }),
                tt = Ge && Ze(() => K.isReadableStream(new Response("").body)),
                ot = { stream: tt && ((e) => e.body) };
            var nt;
            ze &&
                ((nt = new Response()),
                ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
                    !ot[e] &&
                        (ot[e] = K.isFunction(nt[e])
                            ? (t) => t[e]()
                            : (t, o) => {
                                  throw new Y(`Response type '${e}' is not supported`, Y.ERR_NOT_SUPPORT, o);
                              });
                }));
            const at = async (e, t) => {
                    const o = K.toFiniteNumber(e.getContentLength());
                    return null == o
                        ? (async (e) =>
                              null == e
                                  ? 0
                                  : K.isBlob(e)
                                  ? e.size
                                  : K.isSpecCompliantForm(e)
                                  ? (await new Request(e).arrayBuffer()).byteLength
                                  : K.isArrayBufferView(e) || K.isArrayBuffer(e)
                                  ? e.byteLength
                                  : (K.isURLSearchParams(e) && (e += ""), K.isString(e) ? (await Je(e)).byteLength : void 0))(t)
                        : o;
                },
                it = {
                    http: null,
                    xhr: Qe,
                    fetch:
                        ze &&
                        (async (e) => {
                            let { url: t, method: o, data: n, signal: a, cancelToken: i, timeout: l, onDownloadProgress: r, onUploadProgress: s, responseType: d, headers: u, withCredentials: c = "same-origin", fetchOptions: m } = je(e);
                            d = d ? (d + "").toLowerCase() : "text";
                            let p,
                                f,
                                [h, w] = a || i || l ? He([a, i], l) : [];
                            const g = () => {
                                !p &&
                                    setTimeout(() => {
                                        h && h.unsubscribe();
                                    }),
                                    (p = !0);
                            };
                            let b;
                            try {
                                if (s && et && "get" !== o && "head" !== o && 0 !== (b = await at(u, n))) {
                                    let e,
                                        o = new Request(t, { method: "POST", body: n, duplex: "half" });
                                    if ((K.isFormData(n) && (e = o.headers.get("content-type")) && u.setContentType(e), o.body)) {
                                        const [e, t] = Me(b, Pe(Ne(s)));
                                        n = Ke(o.body, 65536, e, t, Je);
                                    }
                                }
                                K.isString(c) || (c = c ? "include" : "omit"), (f = new Request(t, { ...m, signal: h, method: o.toUpperCase(), headers: u.normalize().toJSON(), body: n, duplex: "half", credentials: c }));
                                let a = await fetch(f);
                                const i = tt && ("stream" === d || "response" === d);
                                if (tt && (r || i)) {
                                    const e = {};
                                    ["status", "statusText", "headers"].forEach((t) => {
                                        e[t] = a[t];
                                    });
                                    const t = K.toFiniteNumber(a.headers.get("content-length")),
                                        [o, n] = (r && Me(t, Pe(Ne(r), !0))) || [];
                                    a = new Response(
                                        Ke(
                                            a.body,
                                            65536,
                                            o,
                                            () => {
                                                n && n(), i && g();
                                            },
                                            Je
                                        ),
                                        e
                                    );
                                }
                                d = d || "text";
                                let l = await ot[K.findKey(ot, d) || "text"](a, e);
                                return (
                                    !i && g(),
                                    w && w(),
                                    await new Promise((t, o) => {
                                        Oe(t, o, { data: l, headers: Le.from(a.headers), status: a.status, statusText: a.statusText, config: e, request: f });
                                    })
                                );
                            } catch (t) {
                                if ((g(), t && "TypeError" === t.name && /fetch/i.test(t.message))) throw Object.assign(new Y("Network Error", Y.ERR_NETWORK, e, f), { cause: t.cause || t });
                                throw Y.from(t, t && t.code, e, f);
                            }
                        }),
                };
            K.forEach(it, (e, t) => {
                if (e) {
                    try {
                        Object.defineProperty(e, "name", { value: t });
                    } catch (e) {}
                    Object.defineProperty(e, "adapterName", { value: t });
                }
            });
            const lt = (e) => `- ${e}`,
                rt = (e) => K.isFunction(e) || null === e || !1 === e,
                st = (e) => {
                    e = K.isArray(e) ? e : [e];
                    const { length: t } = e;
                    let o, n;
                    const a = {};
                    for (let i = 0; i < t; i++) {
                        let t;
                        if (((o = e[i]), (n = o), !rt(o) && ((n = it[(t = String(o)).toLowerCase()]), void 0 === n))) throw new Y(`Unknown adapter '${t}'`);
                        if (n) break;
                        a[t || "#" + i] = n;
                    }
                    if (!n) {
                        const e = Object.entries(a).map(([e, t]) => `adapter ${e} ` + (!1 === t ? "is not supported by the environment" : "is not available in the build"));
                        let o = t ? (e.length > 1 ? "since :\n" + e.map(lt).join("\n") : " " + lt(e[0])) : "as no adapter specified";
                        throw new Y("There is no suitable adapter to dispatch the request " + o, "ERR_NOT_SUPPORT");
                    }
                    return n;
                };
            function dt(e) {
                if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new Se(null, e);
            }
            function ut(e) {
                dt(e), (e.headers = Le.from(e.headers)), (e.data = Fe.call(e, e.transformRequest)), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1);
                return st(e.adapter || _e.adapter)(e).then(
                    function (t) {
                        return dt(e), (t.data = Fe.call(e, e.transformResponse, t)), (t.headers = Le.from(t.headers)), t;
                    },
                    function (t) {
                        return Ae(t) || (dt(e), t && t.response && ((t.response.data = Fe.call(e, e.transformResponse, t.response)), (t.response.headers = Le.from(t.response.headers)))), Promise.reject(t);
                    }
                );
            }
            const ct = "1.7.3",
                mt = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
                mt[e] = function (o) {
                    return typeof o === e || "a" + (t < 1 ? "n " : " ") + e;
                };
            });
            const pt = {};
            mt.transitional = function (e, t, o) {
                function n(e, t) {
                    return "[Axios v1.7.3] Transitional option '" + e + "'" + t + (o ? ". " + o : "");
                }
                return (o, a, i) => {
                    if (!1 === e) throw new Y(n(a, " has been removed" + (t ? " in " + t : "")), Y.ERR_DEPRECATED);
                    return t && !pt[a] && ((pt[a] = !0), console.warn(n(a, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(o, a, i);
                };
            };
            const ft = {
                    assertOptions: function (e, t, o) {
                        if ("object" != typeof e) throw new Y("options must be an object", Y.ERR_BAD_OPTION_VALUE);
                        const n = Object.keys(e);
                        let a = n.length;
                        for (; a-- > 0; ) {
                            const i = n[a],
                                l = t[i];
                            if (l) {
                                const t = e[i],
                                    o = void 0 === t || l(t, i, e);
                                if (!0 !== o) throw new Y("option " + i + " must be " + o, Y.ERR_BAD_OPTION_VALUE);
                            } else if (!0 !== o) throw new Y("Unknown option " + i, Y.ERR_BAD_OPTION);
                        }
                    },
                    validators: mt,
                },
                ht = ft.validators;
            class wt {
                constructor(e) {
                    (this.defaults = e), (this.interceptors = { request: new ue(), response: new ue() });
                }
                async request(e, t) {
                    try {
                        return await this._request(e, t);
                    } catch (e) {
                        if (e instanceof Error) {
                            let t;
                            Error.captureStackTrace ? Error.captureStackTrace((t = {})) : (t = new Error());
                            const o = t.stack ? t.stack.replace(/^.+\n/, "") : "";
                            try {
                                e.stack ? o && !String(e.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (e.stack += "\n" + o) : (e.stack = o);
                            } catch (e) {}
                        }
                        throw e;
                    }
                }
                _request(e, t) {
                    "string" == typeof e ? ((t = t || {}).url = e) : (t = e || {}), (t = Ve(this.defaults, t));
                    const { transitional: o, paramsSerializer: n, headers: a } = t;
                    void 0 !== o && ft.assertOptions(o, { silentJSONParsing: ht.transitional(ht.boolean), forcedJSONParsing: ht.transitional(ht.boolean), clarifyTimeoutError: ht.transitional(ht.boolean) }, !1),
                        null != n && (K.isFunction(n) ? (t.paramsSerializer = { serialize: n }) : ft.assertOptions(n, { encode: ht.function, serialize: ht.function }, !0)),
                        (t.method = (t.method || this.defaults.method || "get").toLowerCase());
                    let i = a && K.merge(a.common, a[t.method]);
                    a &&
                        K.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e) => {
                            delete a[e];
                        }),
                        (t.headers = Le.concat(i, a));
                    const l = [];
                    let r = !0;
                    this.interceptors.request.forEach(function (e) {
                        ("function" == typeof e.runWhen && !1 === e.runWhen(t)) || ((r = r && e.synchronous), l.unshift(e.fulfilled, e.rejected));
                    });
                    const s = [];
                    let d;
                    this.interceptors.response.forEach(function (e) {
                        s.push(e.fulfilled, e.rejected);
                    });
                    let u,
                        c = 0;
                    if (!r) {
                        const e = [ut.bind(this), void 0];
                        for (e.unshift.apply(e, l), e.push.apply(e, s), u = e.length, d = Promise.resolve(t); c < u; ) d = d.then(e[c++], e[c++]);
                        return d;
                    }
                    u = l.length;
                    let m = t;
                    for (c = 0; c < u; ) {
                        const e = l[c++],
                            t = l[c++];
                        try {
                            m = e(m);
                        } catch (e) {
                            t.call(this, e);
                            break;
                        }
                    }
                    try {
                        d = ut.call(this, m);
                    } catch (e) {
                        return Promise.reject(e);
                    }
                    for (c = 0, u = s.length; c < u; ) d = d.then(s[c++], s[c++]);
                    return d;
                }
                getUri(e) {
                    return de($e((e = Ve(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer);
                }
            }
            K.forEach(["delete", "get", "head", "options"], function (e) {
                wt.prototype[e] = function (t, o) {
                    return this.request(Ve(o || {}, { method: e, url: t, data: (o || {}).data }));
                };
            }),
                K.forEach(["post", "put", "patch"], function (e) {
                    function t(t) {
                        return function (o, n, a) {
                            return this.request(Ve(a || {}, { method: e, headers: t ? { "Content-Type": "multipart/form-data" } : {}, url: o, data: n }));
                        };
                    }
                    (wt.prototype[e] = t()), (wt.prototype[e + "Form"] = t(!0));
                });
            const gt = wt;
            class bt {
                constructor(e) {
                    if ("function" != typeof e) throw new TypeError("executor must be a function.");
                    let t;
                    this.promise = new Promise(function (e) {
                        t = e;
                    });
                    const o = this;
                    this.promise.then((e) => {
                        if (!o._listeners) return;
                        let t = o._listeners.length;
                        for (; t-- > 0; ) o._listeners[t](e);
                        o._listeners = null;
                    }),
                        (this.promise.then = (e) => {
                            let t;
                            const n = new Promise((e) => {
                                o.subscribe(e), (t = e);
                            }).then(e);
                            return (
                                (n.cancel = function () {
                                    o.unsubscribe(t);
                                }),
                                n
                            );
                        }),
                        e(function (e, n, a) {
                            o.reason || ((o.reason = new Se(e, n, a)), t(o.reason));
                        });
                }
                throwIfRequested() {
                    if (this.reason) throw this.reason;
                }
                subscribe(e) {
                    this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
                }
                unsubscribe(e) {
                    if (!this._listeners) return;
                    const t = this._listeners.indexOf(e);
                    -1 !== t && this._listeners.splice(t, 1);
                }
                static source() {
                    let e;
                    const token = new bt(function (t) {
                        e = t;
                    });
                    console.log('test-->', token);
                    return {
                        token,
                        cancel: e,
                    };
                }
            }
            const vt = bt;
            const yt = {
                Continue: 100,
                SwitchingProtocols: 101,
                Processing: 102,
                EarlyHints: 103,
                Ok: 200,
                Created: 201,
                Accepted: 202,
                NonAuthoritativeInformation: 203,
                NoContent: 204,
                ResetContent: 205,
                PartialContent: 206,
                MultiStatus: 207,
                AlreadyReported: 208,
                ImUsed: 226,
                MultipleChoices: 300,
                MovedPermanently: 301,
                Found: 302,
                SeeOther: 303,
                NotModified: 304,
                UseProxy: 305,
                Unused: 306,
                TemporaryRedirect: 307,
                PermanentRedirect: 308,
                BadRequest: 400,
                Unauthorized: 401,
                PaymentRequired: 402,
                Forbidden: 403,
                NotFound: 404,
                MethodNotAllowed: 405,
                NotAcceptable: 406,
                ProxyAuthenticationRequired: 407,
                RequestTimeout: 408,
                Conflict: 409,
                Gone: 410,
                LengthRequired: 411,
                PreconditionFailed: 412,
                PayloadTooLarge: 413,
                UriTooLong: 414,
                UnsupportedMediaType: 415,
                RangeNotSatisfiable: 416,
                ExpectationFailed: 417,
                ImATeapot: 418,
                MisdirectedRequest: 421,
                UnprocessableEntity: 422,
                Locked: 423,
                FailedDependency: 424,
                TooEarly: 425,
                UpgradeRequired: 426,
                PreconditionRequired: 428,
                TooManyRequests: 429,
                RequestHeaderFieldsTooLarge: 431,
                UnavailableForLegalReasons: 451,
                InternalServerError: 500,
                NotImplemented: 501,
                BadGateway: 502,
                ServiceUnavailable: 503,
                GatewayTimeout: 504,
                HttpVersionNotSupported: 505,
                VariantAlsoNegotiates: 506,
                InsufficientStorage: 507,
                LoopDetected: 508,
                NotExtended: 510,
                NetworkAuthenticationRequired: 511,
            };
            Object.entries(yt).forEach(([e, t]) => {
                yt[t] = e;
            });
            const _t = yt;
            const xt = (function e(t) {
                const o = new gt(t),
                    n = a(gt.prototype.request, o);
                return (
                    K.extend(n, gt.prototype, o, { allOwnKeys: !0 }),
                    K.extend(n, o, null, { allOwnKeys: !0 }),
                    (n.create = function (o) {
                        return e(Ve(t, o));
                    }),
                    n
                );
            })(_e);
            (xt.Axios = gt),
                (xt.CanceledError = Se),
                (xt.CancelToken = vt),
                (xt.isCancel = Ae),
                (xt.VERSION = ct),
                (xt.toFormData = ne),
                (xt.AxiosError = Y),
                (xt.Cancel = xt.CanceledError),
                (xt.all = function (e) {
                    return Promise.all(e);
                }),
                (xt.spread = function (e) {
                    return function (t) {
                        return e.apply(null, t);
                    };
                }),
                (xt.isAxiosError = function (e) {
                    return K.isObject(e) && !0 === e.isAxiosError;
                }),
                (xt.mergeConfig = Ve),
                (xt.AxiosHeaders = Le),
                (xt.formToJSON = (e) => ve(K.isHTMLForm(e) ? new FormData(e) : e)),
                (xt.getAdapter = st),
                (xt.HttpStatusCode = _t),
                (xt.default = xt);
            const kt = xt;
        },
    },
    (e) => {
        console.log('test --> initialize', e);
        e.O(0, [], () => {
            return (t = 7200), e((e.s = t));
            var t;
        });
        e.O();
    },
]);
