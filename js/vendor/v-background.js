(self.webpackChunk_addoncrop_youtube_downloader = self.webpackChunk_addoncrop_youtube_downloader || []).push([
    [360],
    {
        3300: function (e, t) {
            !(function (e) {
                "use strict";
                var t, n;
                ((t = e.DebugLevel || (e.DebugLevel = {}))[(t.DEBUG = 0)] = "DEBUG"),
                    (t[(t.INFO = 1)] = "INFO"),
                    (t[(t.WARNING = 2)] = "WARNING"),
                    (t[(t.ERROR = 3)] = "ERROR"),
                    ((n = e.DownloadState || (e.DownloadState = {})).QUEUED = "queued"),
                    (n.DOWNLOADING = "downloading"),
                    (n.PAUSED = "paused"),
                    (n.PROCESSING = "processing"),
                    (n.COMPLETED = "completed"),
                    (n.CANCELED = "canceled"),
                    (n.ERROR = "error");
                const r = {
                        debug: { icon: "-", iconColor: "#666", textStyle: "color: #666" },
                        info: { icon: "ℹ", iconColor: "#1e88e5", textStyle: "color: #333" },
                        success: { icon: "✔", iconColor: "#43A047", textStyle: "color: #333" },
                        warn: { icon: "⚠", iconColor: "#f9a825", textStyle: "color: #fff; font-weight: bold; background-color: #F9A825; padding: 0.125rem 0.5rem" },
                        error: { icon: "✖", iconColor: "#e57373", textStyle: "color: #fff; font-weight: bold; background-color: #e57373; padding: 0.125rem 0.5rem" },
                    },
                    o = { debug: e.DebugLevel.DEBUG, info: e.DebugLevel.INFO, warning: e.DebugLevel.WARNING, error: e.DebugLevel.ERROR };
                class i {
                    constructor(e) {
                        this.moduleName = e;
                    }
                    static setLevel(e) {
                        window.FLIXMATE_DEBUG_LEVEL = o[e];
                    }
                    log(e, ...t) {
                        console.log(`%c${r[e].icon} %c${this.moduleName} %c${t.shift()}`, `color: ${r[e].iconColor}; font-weight: bold;`, "color: #222; font-weight: bold", r[e].textStyle, ...t);
                    }
                    debug(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= o.debug && this.log("debug", ...e);
                    }
                    info(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= o.info && this.log("info", ...e);
                    }
                    success(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= o.info && this.log("success", ...e);
                    }
                    warn(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= o.warning && this.log("warn", ...e);
                    }
                    error(...e) {
                        window.FLIXMATE_DEBUG_LEVEL <= o.error && this.log("error", ...e);
                    }
                }
                const a = new i("Flixmate"),
                    s = i.setLevel;
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
    ***************************************************************************** */ function c(
                    e,
                    t,
                    n,
                    r
                ) {
                    return new (n || (n = Promise))(function (o, i) {
                        function a(e) {
                            try {
                                c(r.next(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function s(e) {
                            try {
                                c(r.throw(e));
                            } catch (e) {
                                i(e);
                            }
                        }
                        function c(e) {
                            var t;
                            e.done
                                ? o(e.value)
                                : ((t = e.value),
                                  t instanceof n
                                      ? t
                                      : new n(function (e) {
                                            e(t);
                                        })).then(a, s);
                        }
                        c((r = r.apply(e, t || [])).next());
                    });
                }
                class l extends Error {
                    constructor() {
                        super("Flixmate is not connected"), (this.name = "ConnectionError"), Error.captureStackTrace(this, l), Object.setPrototypeOf(this, l.prototype);
                    }
                }
                class u {
                    constructor(e, t, n, r, o) {
                        (this.host = e),
                            (this.port = t),
                            (this.addonId = n),
                            (this.onConnected = r),
                            (this.onDisconnected = o),
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
                        a.info("Attempting connection with Flixmate service."),
                            this.isConnected() ||
                                (null === (t = this.ws) || void 0 === t ? void 0 : t.readyState) === WebSocket.CONNECTING ||
                                ((this.ws = new WebSocket(`ws://${this.host}:${this.port}`)),
                                (this.ws.onclose = (t) => {
                                    this.onDisconnected(),
                                        (t.wasClean && 1e3 === t.code && "DISCONNECT" === t.reason) ||
                                            ((e = e < 60 ? e : 60),
                                            a.error(`Connection with Flixmate service failed. Retrying in ${e} seconds.`),
                                            (this.retryCallId = window.setTimeout(() => {
                                                (this.retryCallId = null), this.connect(e + 3);
                                            }, 1e3 * e)));
                                }),
                                (this.ws.onopen = () => {
                                    a.success("Connected to Flixmate service."), this.onConnected(), (e = 3);
                                }),
                                (this.ws.onmessage = (e) => {
                                    let t;
                                    try {
                                        t = JSON.parse(e.data);
                                    } catch (e) {
                                        return;
                                    }
                                    const { type: n, id: r, action: o } = t;
                                    if ((a.debug("Message received from Flixmate service.", { message: t }), "response" !== n || null === r)) {
                                        if ("message" === n && null !== o && void 0 !== this.messageListeners[o]) {
                                            const e = (0, this.messageListeners[o])(t.data);
                                            return e && null !== r && this.sendResponse(r, o, e), void a.info(`Callback for message listener ${o} executed.`);
                                        }
                                        a.warn(`Listener for action "${o}" not registered.`);
                                    } else {
                                        const e = this.responseResolvers.get(r);
                                        void 0 !== e && (e(t.data), this.responseResolvers.delete(r));
                                    }
                                }));
                    }
                    disconnect() {
                        var e;
                        a.success("Disconnected from Flixmate service."), this.retryCallId && clearTimeout(this.retryCallId), null === (e = this.ws) || void 0 === e || e.close(1e3, "DISCONNECT"), (this.ws = null);
                    }
                    retryConnection() {
                        a.info("Retrying connection with Flixmate."), this.retryCallId && clearTimeout(this.retryCallId), this.connect();
                    }
                    sendResponse(e, t, n) {
                        var r;
                        return c(this, void 0, void 0, function* () {
                            if (!this.isConnected()) throw new l();
                            const o = yield Promise.resolve(n),
                                i = { type: "response", addonId: this.addonId, action: t, id: e, data: o };
                            a.debug("Sending response to flixmate service.", { id: e, message: i }), null === (r = this.ws) || void 0 === r || r.send(JSON.stringify(i));
                        });
                    }
                    onMessage(e, t) {
                        (this.messageListeners[e] = t), a.info(`Listener for action "${e}" added.`);
                    }
                    sendMessage(e, t = {}) {
                        return new Promise((n, r) => {
                            var o;
                            if (!this.isConnected()) return r(new l());
                            const i = `${e}-${Date.now()}`,
                                s = { type: "message", addonId: this.addonId, id: i, action: e, data: t };
                            return a.debug("Sending message to flixmate service.", { id: i, message: s }), this.responseResolvers.set(i, n), null === (o = this.ws) || void 0 === o ? void 0 : o.send(JSON.stringify(s));
                        });
                    }
                }
                function d(e) {
                    const t = Math.floor(e / 3600),
                        n = Math.floor((e - 3600 * t) / 60);
                    let r = e - 3600 * t - 60 * n;
                    r = Math.round(100 * r) / 100;
                    let o = "";
                    return (o = `${t < 10 ? `0${t}` : t}:`), (o += `${n < 10 ? `0${n}` : n}`), (o += `:${r < 10 ? `0${r}` : r}`), o;
                }
                class p {
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
                        return c(this, void 0, void 0, function* () {
                            const n = ["mp3"].includes(e.format);
                            let r = e.length,
                                { startTime: o, endTime: i } = e;
                            null === o && i && (o = 0), o && null === i && (i = e.length), null !== o && null !== i && (r = i - o);
                            const a = yield this.socket.sendMessage("downloads.add", {
                                trackUrl: e.trackUrl,
                                quality: e.quality.toLowerCase(),
                                videoUrl: n ? e.audioUrl : e.videoUrl,
                                audioUrl: n ? null : e.audioUrl,
                                startTime: o ? d(o) : "",
                                endTime: i ? d(i) : "",
                                mediaTime: d(r),
                                format: e.format,
                                title: e.title,
                                thumbnailUrl: e.thumbnailUrl,
                                avoidFilenameCollision: null !== (t = this.options.avoidFilenameCollision) && void 0 !== t && t,
                            });
                            return (
                                this.onAddedListeners.forEach((e) => {
                                    e(a);
                                }),
                                a
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
                class f {
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
                            (this.downloads = new p(this.socket, e)),
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
                (f.setDebugLevel = s), (e.default = f), Object.defineProperty(e, "__esModule", { value: !0 });
            })(t);
        },
        3887: (e, t, n) => {
            "use strict";
            var r = n(6846),
                o = /[\/\?<>\\:\*\|"]/g,
                i = /[\x00-\x1f\x80-\x9f]/g,
                a = /^\.+$/,
                s = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,
                c = /[\. ]+$/;
            function l(e, t) {
                if ("string" != typeof e) throw new Error("Input must be string");
                var n = e.replace(o, t).replace(i, t).replace(a, t).replace(s, t).replace(c, t);
                return r(n, 255);
            }
            e.exports = function (e, t) {
                var n = (t && t.replacement) || "",
                    r = l(e, n);
                return "" === n ? r : l(r, "");
            };
        },
        6846: (e, t, n) => {
            "use strict";
            var r = n(8418),
                o = n(6401);
            e.exports = r.bind(null, o);
        },
        8418: (e) => {
            "use strict";
            function t(e) {
                return e >= 55296 && e <= 56319;
            }
            function n(e) {
                return e >= 56320 && e <= 57343;
            }
            e.exports = function (e, r, o) {
                if ("string" != typeof r) throw new Error("Input must be string");
                for (var i, a, s = r.length, c = 0, l = 0; l < s; l += 1) {
                    if (((i = r.charCodeAt(l)), (a = r[l]), t(i) && n(r.charCodeAt(l + 1)) && (a += r[(l += 1)]), (c += e(a)) === o)) return r.slice(0, l + 1);
                    if (c > o) return r.slice(0, l - a.length + 1);
                }
                return r;
            };
        },
        6401: (e) => {
            "use strict";
            function t(e) {
                return e >= 55296 && e <= 56319;
            }
            function n(e) {
                return e >= 56320 && e <= 57343;
            }
            e.exports = function (e) {
                if ("string" != typeof e) throw new Error("Input must be string");
                for (var r = e.length, o = 0, i = null, a = null, s = 0; s < r; s++)
                    n((i = e.charCodeAt(s))) ? (null != a && t(a) ? (o += 1) : (o += 3)) : i <= 127 ? (o += 1) : i >= 128 && i <= 2047 ? (o += 2) : i >= 2048 && i <= 65535 && (o += 3), (a = i);
                return o;
            };
        },
        1502: (e, t, n) => {
            "use strict";
            n.d(t, { A: () => $, z: () => u });
            var r = n(8529),
                o = n(9902),
                i = Object.defineProperty,
                a = (e, t, n) => ((e, t, n) => (t in e ? i(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)))(e, "symbol" != typeof t ? t + "" : t, n);
            const ClientData = class e {
                static get(t) {
                    return new Promise((n) => {
                        const r = `${e.PREFIX}:${t}`;
                        chrome.storage.local.get(r, (e) => {
                            const t = e[r];
                            typeof t > "u" ? n(null) : !t.expiresAt || t.expiresAt > Date.now() ? n(t.value) : chrome.storage.local.remove(r, () => n(null));
                        });
                    });
                }
                static set(t, n, r) {
                    return new Promise((o) => {
                        const i = `${e.PREFIX}:${t}`,
                            a = r ? Date.now() + 1e3 * Math.abs(r) : null,
                            s = { value: n, expiresAt: a };
                        chrome.storage.local.set({ [i]: s }, o);
                    });
                }
                static remove(t) {
                    return new Promise((n) => {
                        const r = `${e.PREFIX}:${t}`;
                        chrome.storage.local.remove(r, n);
                    });
                }
                static clear(t = "") {
                    return new Promise((n) => {
                        chrome.storage.local.get(null, (r) => {
                            const o = Object.keys(r).filter((n) => n.startsWith(`${e.PREFIX}:${t}`));
                            chrome.storage.local.remove(o, n);
                        });
                    });
                }
            };
            a(ClientData, "PREFIX", "md-youtube-cache");
            let c = ClientData;
            const l = (e) => {
                // Check playability status
                const playabilityStatus = e.playabilityStatus;
                if (playabilityStatus?.status === "UNPLAYABLE") {
                    const errorMsg = `Video playability status is "UNPLAYABLE". Reason: ${playabilityStatus.reason}`;
                    r.L.error(errorMsg);
                    throw new Error(errorMsg);
                }
            
                // Check for streaming data
                if (typeof e.streamingData === "undefined") {
                    r.L.error("Video streaming data not available.");
                    throw new Error("Failed to extract video streaming data.");
                }
            
                // Check for video details
                if (typeof e.videoDetails === "undefined") {
                    r.L.error("Video is not available.");
                    throw new Error("Video is not available");
                }
            
                const { videoDetails, streamingData } = e;
                let formatsList = [];
            
                // Process streaming data formats
                if (streamingData) {
                    if (streamingData.formats) {
                        formatsList = formatsList.concat(streamingData.formats);
                        r.L.success("Formats found.", { formats: streamingData.formats });
                    }
                    if (streamingData.adaptiveFormats) {
                        formatsList = formatsList.concat(streamingData.adaptiveFormats);
                        r.L.success("Adaptive formats found.", { formats: streamingData.adaptiveFormats });
                    }
                } else {
                    r.L.warn("No streaming data found.");
                }
            
                // Get captions
                const captions = getCaptions(e);
                const autoCaptions = getAutoGeneratedCaptions(e);
                const thumbnails = getThumbnails(videoDetails.videoId);
            
                return {
                    id: videoDetails.videoId,
                    url: `${r.W}?v=${videoDetails.videoId}`,
                    title: videoDetails.title,
                    description: videoDetails.shortDescription,
                    length: parseInt(videoDetails.lengthSeconds, 10),
                    author: videoDetails.author,
                    category: e.microformat ? e.microformat.playerMicroformatRenderer.category : null,
                    publishDate: e.microformat ? new Date(e.microformat.playerMicroformatRenderer.publishDate) : null,
                    rating: videoDetails.averageRating,
                    views: parseInt(videoDetails.viewCount, 10),
                    isLive: videoDetails.isLive,
                    isUpcoming: videoDetails.isUpcoming,
                    thumbnails,
                    captions,
                    autoCaptions,
                    formats: formatsList,
                };
            };
            
            // Helper functions
            const getCaptions = (e) => {
                const captionTracks = e.captions?.playerCaptionsTracklistRenderer?.captionTracks;
                if (!captionTracks) {
                    r.L.warn("Captions not found.");
                    return [];
                }
            
                const captionsList = captionTracks.map((track) => {
                    let baseUrl = track.baseUrl.startsWith("/") ? `https://www.youtube.com${track.baseUrl}` : track.baseUrl;
                    try {
                        const url = new URL(baseUrl);
                        url.searchParams.set("fmt", "vtt");
                        return {
                            languageCode: track.languageCode,
                            languageName: track.name.simpleText,
                            url: url.href,
                        };
                    } catch {
                        r.L.warn("Base url for caption is invalid.", { baseUrl });
                        return null;
                    }
                }).filter(Boolean);
            
                r.L.success("Captions found.", { captions: captionsList });
                return captionsList;
            };
            
            const getAutoGeneratedCaptions = (e) => {
                const captions = e.captions?.playerCaptionsTracklistRenderer;
                if (!captions || !captions.captionTracks) {
                    r.L.warn("Auto generated captions not found.");
                    return [];
                }
            
                const autoCaptionsList = captions.captionTracks.map((track) => {
                    let baseUrl = track.baseUrl.startsWith("/") ? `https://www.youtube.com${track.baseUrl}` : track.baseUrl;
                    try {
                        const url = new URL(baseUrl);
                        url.searchParams.set("fmt", "vtt");
                        return {
                            languageCode: track.languageCode,
                            languageName: track.name.simpleText,
                            url: url.href,
                        };
                    } catch {
                        r.L.warn("Base url for auto captions is invalid.", { baseUrl });
                        return null;
                    }
                }).filter(Boolean);
            
                r.L.success("Auto captions found.", { captions });
                return autoCaptionsList;
            };
            
            const getThumbnails = (videoId) => {
                return [
                    { label: "Normal Quality", url: `https://img.youtube.com/vi/${videoId}/default.jpg`, width: 120, height: 90 },
                    { label: "Medium Quality", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
                    { label: "High Quality", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
                    { label: "Standard Definition", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, width: 640, height: 480 },
                    { label: "Maximum Resolution", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, width: 1280, height: 720 },
                ];
            };
            var u = ((e) => ((e.AUDIO_VIDEO = "audioandvideo"), (e.AUDIO = "audioonly"), (e.VIDEO = "videoonly"), (e.IMAGE = "image"), e))(u || {});
            const getVideoInfo = async (videoId, clientVersion, identityToken, retryCallback) => {
                // Fetch video information from the watch page JSON endpoint
                let videoInfo = await (async function (id, version, token, retry) {
                    let responseData;
                    r.L.info(`Getting video information from watch page JSON endpoint for video ID "${id}"`);
            
                    const headers = {
                        "x-youtube-client-name": "1",
                        "x-youtube-client-version": version,
                    };
            
                    if (typeof token !== "undefined") {
                        headers["x-youtube-identity-token"] = token;
                    }
            
                    console.log('--> test x-youtube-identity-token', token);
            
                    try {
                        responseData = await (0, o.A)(r.W, {
                            params: { v: id, pbj: "1" },
                            headers: headers,
                        });
                    } catch (error) {
                        r.L.error("Video information request from watch page JSON endpoint failed.", { error });
                        throw new Error(`Video information request failed with status code ${error.response?.status}`);
                    }
            
                    let playerResponse;
                    if (typeof responseData.data === "string") {
                        const cleanData = responseData.data.replace(/^[)\]}'\s]+/, "");
                        try {
                            playerResponse = JSON.parse(cleanData);
                        } catch {
                            r.L.warn("Failed to parse JSON from watch page JSON endpoint.", { json: cleanData });
                            return null;
                        }
                    } else {
                        playerResponse = responseData.data;
                    }
            
                    console.log('test--> responseData', playerResponse);
            
                    if (Array.isArray(playerResponse)) {
                        return playerResponse.reduce((accumulator, current) => Object.assign(current, accumulator), {}).playerResponse ?? null;
                    } else if (playerResponse.reload === "now") {
                        r.L.warn("Client token is invalid.", { jsonResponse: playerResponse });
                        if (typeof retry !== "undefined") await retry();
                        return null;
                    }
            
                    return playerResponse.playerResponse ?? null;
                })(videoId, clientVersion, identityToken, retryCallback);
            
                if (videoInfo !== null && typeof videoInfo.streamingData !== "undefined") {
                    r.L.success("Player response extracted from JSON endpoint URL.", { playerResponse: videoInfo });
                    return l(videoInfo);
                }
            
                r.L.warn("Failed to extract player response from watch page JSON endpoint URL.");
            
                // Fetch video information from the watch page HTML endpoint
                videoInfo = await (async function (id) {
                    let response;
                    r.L.info(`Getting video information from watch page HTML endpoint for video ID "${id}"`);
            
                    try {
                        response = await (0, o.A)(r.W, {
                            params: { v: id, hl: "en", bpctr: Math.ceil(Date.now() / 1000).toString() },
                        });
                    } catch (error) {
                        r.L.error("Video information request from watch page HTML endpoint failed.", { error });
                        throw new Error(`Video information request failed with status code ${error.response?.status}`);
                    }
            
                    const playerResponseMatch = response.data.match(/ytInitialPlayerResponse\s*=\s*({.+?})\s*;/);
                    if (playerResponseMatch === null) {
                        r.L.warn("Failed to extract player response from watch page HTML endpoint.");
                        return null;
                    }
            
                    r.L.info("Player response found in initial player response.");
                    const playerResponseString = playerResponseMatch[1];
                    
                    let playerResponse;
                    try {
                        playerResponse = JSON.parse(playerResponseString);
                    } catch {
                        r.L.warn("Failed to parse player response from watch page HTML endpoint.");
                        return null;
                    }
            
                    return playerResponse;
                })(videoId);
            
                if (!videoInfo) {
                    r.L.warn("Failed to extract player response from watch page HTML endpoint URL.");
                    throw new Error("Failed to extract player response.");
                }
            
                r.L.success("Player response extracted from HTML endpoint URL.", { playerResponse: videoInfo });
                return l(videoInfo);
            },
                p = ["mp4a", "mp3", "vorbis", "aac", "opus", "flac"],
                f = ["mp4v", "avc1", "Sorenson H.283", "MPEG-4 Visual", "VP8", "VP9", "H.264"];
            function m(e) {
                var t;
                return e ? (null == (t = e.match(/codecs="(.+)"/)) ? void 0 : t[1]) ?? null : null;
            }
            function h(e) {
                const t = m(e.mimeType);
                return (e.audioBitrate || 0) + p.findIndex((e) => t && t.includes(e)) / 10;
            }
            function y(e, t) {
                const n = e.qualityLabel ? parseInt(e.qualityLabel.slice(0, -1), 10) : 0,
                    r = t.qualityLabel ? parseInt(t.qualityLabel.slice(0, -1), 10) : 0,
                    o = 2 * ~~!!n + ~~!!e.audioBitrate,
                    i = 2 * ~~!!r + ~~!!t.audioBitrate;
                if (o !== i) return i - o;
                if (n !== r) return r - n;
                const a = e.bitrate || 0,
                    s = t.bitrate || 0;
                if (a !== s) return s - a;
                const c = h(e),
                    l = h(t);
                if (c !== l) return l - c;
                const u = m(e.mimeType),
                    d = m(t.mimeType),
                    p = f.findIndex((e) => u && u.includes(e));
                return f.findIndex((e) => d && d.includes(e)) - p;
            }
            const b = `sig_functions_${r.a}`;
            const g = [
                    "\\bm=([a-zA-Z0-9$]{2,})\\(decodeURIComponent\\(h\\.s\\)\\)",
                    "\\bc&&\\(c=([a-zA-Z0-9$]{2,})\\(decodeURIComponent\\(c\\)\\)",
                    '(?:\\b|[^a-zA-Z0-9$])([a-zA-Z0-9$]{2,})\\s*=\\s*function\\(\\s*a\\s*\\)\\s*\\{\\s*a\\s*=\\s*a\\.split\\(\\s*""\\s*\\)',
                    '([\\w$]+)\\s*=\\s*function\\((\\w+)\\)\\{\\s*\\2=\\s*\\2\\.split\\(""\\)\\s*;',
                ],
                w = "[a-zA-Z_\\$][a-zA-Z_0-9]*",
                v = `\\"?${w}\\"?`,
                L = `function(?: ${w})?\\(a\\)\\{(a=a\\.split\\(""\\);\\s*((?:(?:a=)?${w}${'(?:\\[\\"|\\.)' + w + '(?:\\"\\]|)'}\\(a,\\d+\\);)+)return a\\.join\\(""\\))\\}`,
                E = `var (${w})=\\{((?:(?:${v}:function\\(a\\)\\{(?:return )?a\\.reverse\\(\\)\\}|${v}:function\\(a,b\\)\\{return a\\.slice\\(b\\)\\}|${v}:function\\(a,b\\)\\{a\\.splice\\(0,b\\)\\}|${v}:function\\(a,b\\)\\{var c=a\\[0\\];a\\[0\\]=a\\[b%a\\.length\\];a\\[b(?:%a.length|)\\]=c(?:;return a)?\\}),?\\n?)+)\\};`,
                T = "[a-zA-Z0-9$_]",
                R = `${T}+`,
                O = "\\[(\\d+)]",
                S = [
                    `${T}+="nn"\\[\\+${T}+\\.${T}+],${T}+=${T}+\\.get\\(${T}+\\)\\)&&\\(${T}+=(${T}+)\\[(\\d+)]`,
                    `${T}+="nn"\\[\\+${T}+\\.${T}+],${T}+=${T}+\\.get\\(${T}+\\)\\).+\\|\\|(${T}+)\\(""\\)`,
                    `\\(${T}=String\\.fromCharCode\\(110\\),${T}=${T}\\.get\\(${T}\\)\\)&&\\(${T}=(${R})(?:${O})?\\(${T}\\)`,
                    `\\.get\\("n"\\)\\)&&\\(${T}=(${R})(?:${O})?\\(${T}\\)`,
                    '(\\w+).length\\|\\|\\w+\\(""\\)',
                    '\\w+.length\\|\\|(\\w+)\\(""\\)',
                ];
            function A(e, t, n = 1) {
                const r = e.match(new RegExp(t, "s"));
                return Array.isArray(n) ? n.map((e) => (null == r ? void 0 : r[e]) ?? null) : (null == r ? void 0 : r[n]) ?? null;
            }
            const C = {
                    async getFunctions(e) {
                        let t = e;
                        const n = (function (e) {
                            const t = e.match(r.P);
                            return `${b}_${t ? t[1] : e}`;
                        })(e);
                        0 === e.indexOf("//") ? (t = `https://${e}`) : 0 === e.indexOf("/") && (t = `https://www.youtube.com${e}`);
                        let i,
                            a = await c.get(n);
                        if (null !== a) return r.L.success(`Functions found in cache for script url "${t}"`, { functions: a }), a;
                        r.L.info(`Functions not found in cache for script url "${t}"`);
                        try {
                            i = await (0, o.A)(t);
                        } catch (e) {
                            throw (r.L.error("Failed to get html5player source.", { error: e }), new Error("Failed to get html5player source for signature functions."));
                        }
                        if (((a = this.extractFunctions(i.data)), !a || !a.decipher)) throw (r.L.error("Failed to extract signature deciphering functions."), new Error("Failed to extract signature deciphering functions."));
                        return r.L.success("Signature deciphering functions extracted.", { url: t, functions: a }), c.set(n, a, 7200), a;
                    },
                    clearFunctions: () => c.clear(b),
                    extractFunctions(e) {
                        const t = {};
                        return (
                            (() => {
                                let n = null;
                                for (const t of g) if (((n = A(e, t)), n)) break;
                                if (!n) return;
                                const r = `${n.replace(/\$/g, "\\$")}=function\\(([a-zA-Z0-9_]+)\\)\\{(.+?)\\}`,
                                    [o, i] = A(e, r, [1, 2]);
                                if (!o || !i) return;
                                const a = A(i, ";([A-Za-z0-9_\\$]{2,})\\.\\w+\\("),
                                    s = `(var ${null == a ? void 0 : a.replace(/\$/g, "\\$")}=\\{[\\s\\S]+?\\}\\};)`,
                                    c = A(e, s);
                                !a || !c || (t.decipher = { argNames: [o], funcBody: `${c} ${i}` });
                            })(),
                            t.decipher ||
                                (() => {
                                    const n = A(e, E, 0),
                                        r = A(e, L);
                                    !n || !r || (t.decipher = { argNames: ["a"], funcBody: `${n} ${r}` });
                                })(),
                            (() => {
                                const [n, r] = A(
                                    e,
                                    'function\\(\\s*(\\w+)\\s*\\)\\s*\\{(var\\s*(?:\\w+)=(?:(?:\\w+)\\.split\\(""\\)|String\\.prototype\\.split\\.call\\((?:\\w+),""\\)),\\s*(?:\\w+)=(?:\\[.*?]);\\s*(?:\\w+)\\[\\d+](?:.*?try)(?:\\{.*?})catch\\(\\s*(?:\\w+)\\s*\\)\\s*{\\s*return"enhanced_except_(?:[A-z0-9-]+)"\\s*\\+\\s*(?:\\w+)\\s*}\\s*return\\s*(?:(?:\\w+)\\.join\\(""\\)|Array\\.prototype\\.join\\.call\\((?:\\w+),""\\)))};',
                                    [1, 2]
                                );
                                n && r && (t.nTransform = { argNames: [n], funcBody: r });
                            })(),
                            t.nTransform ||
                                (() => {
                                    let n = null;
                                    for (const t of S)
                                        if (((n = A(e, t)), n)) {
                                            n = A(e, `${null == n ? void 0 : n.replace(/\$/g, "\\$")}=\\[([a-zA-Z0-9$\\[\\]]{2,})\\]`) || n;
                                            break;
                                        }
                                    if (!n) return;
                                    const r = `(${n.replace(/\$/g, "\\$")}=\\s*function([\\S\\s]*?\\}\\s*return (([\\w$]+?\\.join\\(""\\))|(Array\\.prototype\\.join\\.call\\([\\w$]+?,[\\n\\s]*(("")|(\\("",""\\)))\\)))\\s*\\}))`,
                                        o = A(e, r);
                                    if (!o) return;
                                    const [i, a] = A(o, `${n}=\\s*function\\s*\\((\\w+)\\)\\s*{(.*)\\}`, [1, 2]);
                                    i && a && (t.nTransform = { argNames: [i], funcBody: a });
                                })(),
                            t.nTransform ||
                                (() => {
                                    let n = /(?:\.get\("n"\)\)&&\(b=|b=String\.fromCharCode\(110\),c=a\.get\(b\)\)&&\(c=)([a-zA-Z0-9$]+)(?:\[(\d+)\])?\([a-zA-Z0-9]\)/,
                                        o = e.match(n);
                                    if (!o) return void r.L.warn("Could not find ncode function name.");
                                    if (((n = new RegExp(`var ${o[1]}\\s*=\\s*\\[(.+?)\\]\\s*[,;]`)), (o = e.match(n)), !o)) return void r.L.warn("Could not find ncode function name.");
                                    const i = o[1],
                                        a = ((e, t) => {
                                            const n = new RegExp(`(?:function\\s+${t}|[{;,]\\s*${t}\\s*=\\s*function|(?:var|const|let)\\s+${t}\\s*=\\s*function)\\s*\\(([^)]*)\\)\\s*({.+})`, "s").exec(e);
                                            if (!n) return null;
                                            const r = n[1],
                                                o = n[2],
                                                i = r.split(",").map((e) => e.trim()),
                                                a = (function (e) {
                                                    let t = 0,
                                                        n = -1;
                                                    for (let r = 0; r < e.length; r += 1)
                                                        if (("{" === e[r] && (t += 1), "}" === e[r] && (t -= 1), 0 === t)) {
                                                            n = r + 1;
                                                            break;
                                                        }
                                                    return -1 === n ? e : e.substring(0, n);
                                                })(o);
                                            return { argNames: i, funcBody: a };
                                        })(e, i);
                                    a && (t.nTransform = a);
                                })(),
                            t
                        );
                    },
                    decipherFormat(e, t) {
                        const n = (e) => {
                            const n = new URL(decodeURIComponent(e)),
                                o = n.searchParams.get("n");
                            if (!o || !t || !t.nTransform) return e;
                            const { argNames: i, funcBody: a } = t.nTransform;
                            let s = o;
                            try {
                                s = new Function(i[0], a)(o);
                            } catch (e) {
                                r.L.warn(e.message);
                            }
                            return n.searchParams.set("n", s), n.href;
                        };
                        if (e.url) return n(e.url);
                        const o = e.signatureCipher || e.cipher;
                        return o
                            ? n(
                                  ((e) => {
                                      const n = (function (e) {
                                          const t = new URLSearchParams(e),
                                              n = {};
                                          for (const e of t.entries()) {
                                              const [t, r] = e;
                                              n[t] = r;
                                          }
                                          return n;
                                      })(e);
                                      if (!n.s || !t || !t.decipher) return n.url;
                                      const { argNames: o, funcBody: i } = t.decipher,
                                          a = new URL(decodeURIComponent(n.url));
                                      let s = "";
                                      try {
                                          s = new Function(o[0], i)(n.s);
                                      } catch (e) {
                                          r.L.warn(e.message);
                                      }
                                      return a.searchParams.set(n.sp ? n.sp : "signature", s), a.href;
                                  })(o)
                              )
                            : null;
                    },
                },
                B = {
                    5: { mimeType: 'video/flv; codecs="Sorenson H.283, mp3"', qualityLabel: "240p", bitrate: 25e4, audioBitrate: 64 },
                    6: { mimeType: 'video/flv; codecs="Sorenson H.263, mp3"', qualityLabel: "270p", bitrate: 8e5, audioBitrate: 64 },
                    13: { mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"', qualityLabel: null, bitrate: 5e5, audioBitrate: null },
                    17: { mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"', qualityLabel: "144p", bitrate: 5e4, audioBitrate: 24 },
                    18: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "360p", bitrate: 5e5, audioBitrate: 96 },
                    22: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "720p", bitrate: 2e6, audioBitrate: 192 },
                    34: { mimeType: 'video/flv; codecs="H.264, aac"', qualityLabel: "360p", bitrate: 5e5, audioBitrate: 128 },
                    35: { mimeType: 'video/flv; codecs="H.264, aac"', qualityLabel: "480p", bitrate: 8e5, audioBitrate: 128 },
                    36: { mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"', qualityLabel: "240p", bitrate: 175e3, audioBitrate: 32 },
                    37: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "1080p", bitrate: 3e6, audioBitrate: 192 },
                    38: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "3072p", bitrate: 35e5, audioBitrate: 192 },
                    43: { mimeType: 'video/webm; codecs="VP8, vorbis"', qualityLabel: "360p", bitrate: 5e5, audioBitrate: 128 },
                    44: { mimeType: 'video/webm; codecs="VP8, vorbis"', qualityLabel: "480p", bitrate: 1e6, audioBitrate: 128 },
                    45: { mimeType: 'video/webm; codecs="VP8, vorbis"', qualityLabel: "720p", bitrate: 2e6, audioBitrate: 192 },
                    46: { mimeType: 'audio/webm; codecs="vp8, vorbis"', qualityLabel: "1080p", bitrate: null, audioBitrate: 192 },
                    82: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "360p", bitrate: 5e5, audioBitrate: 96 },
                    83: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "240p", bitrate: 5e5, audioBitrate: 96 },
                    84: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "720p", bitrate: 2e6, audioBitrate: 192 },
                    85: { mimeType: 'video/mp4; codecs="H.264, aac"', qualityLabel: "1080p", bitrate: 3e6, audioBitrate: 192 },
                    91: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "144p", bitrate: 1e5, audioBitrate: 48 },
                    92: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "240p", bitrate: 15e4, audioBitrate: 48 },
                    93: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "360p", bitrate: 5e5, audioBitrate: 128 },
                    94: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "480p", bitrate: 8e5, audioBitrate: 128 },
                    95: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "720p", bitrate: 15e5, audioBitrate: 256 },
                    96: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "1080p", bitrate: 25e5, audioBitrate: 256 },
                    100: { mimeType: 'audio/webm; codecs="VP8, vorbis"', qualityLabel: "360p", bitrate: null, audioBitrate: 128 },
                    101: { mimeType: 'audio/webm; codecs="VP8, vorbis"', qualityLabel: "360p", bitrate: null, audioBitrate: 192 },
                    102: { mimeType: 'audio/webm; codecs="VP8, vorbis"', qualityLabel: "720p", bitrate: null, audioBitrate: 192 },
                    120: { mimeType: 'video/flv; codecs="H.264, aac"', qualityLabel: "720p", bitrate: 2e6, audioBitrate: 128 },
                    127: { mimeType: 'audio/ts; codecs="aac"', qualityLabel: null, bitrate: null, audioBitrate: 96 },
                    128: { mimeType: 'audio/ts; codecs="aac"', qualityLabel: null, bitrate: null, audioBitrate: 96 },
                    132: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "240p", bitrate: 15e4, audioBitrate: 48 },
                    133: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "240p", bitrate: 2e5, audioBitrate: null },
                    134: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "360p", bitrate: 3e5, audioBitrate: null },
                    135: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "480p", bitrate: 5e5, audioBitrate: null },
                    136: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "720p", bitrate: 1e6, audioBitrate: null },
                    137: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "1080p", bitrate: 25e5, audioBitrate: null },
                    138: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "4320p", bitrate: 135e5, audioBitrate: null },
                    139: { mimeType: 'audio/mp4; codecs="aac"', qualityLabel: null, bitrate: null, audioBitrate: 48 },
                    140: { mimeType: 'audio/m4a; codecs="aac"', qualityLabel: null, bitrate: null, audioBitrate: 128 },
                    141: { mimeType: 'audio/mp4; codecs="aac"', qualityLabel: null, bitrate: null, audioBitrate: 256 },
                    151: { mimeType: 'video/ts; codecs="H.264, aac"', qualityLabel: "720p", bitrate: 5e4, audioBitrate: 24 },
                    160: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "144p", bitrate: 1e5, audioBitrate: null },
                    171: { mimeType: 'audio/webm; codecs="vorbis"', qualityLabel: null, bitrate: null, audioBitrate: 128 },
                    172: { mimeType: 'audio/webm; codecs="vorbis"', qualityLabel: null, bitrate: null, audioBitrate: 192 },
                    242: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "240p", bitrate: 1e5, audioBitrate: null },
                    243: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "360p", bitrate: 25e4, audioBitrate: null },
                    244: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "480p", bitrate: 5e5, audioBitrate: null },
                    247: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "720p", bitrate: 7e5, audioBitrate: null },
                    248: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1080p", bitrate: 15e5, audioBitrate: null },
                    249: { mimeType: 'audio/webm; codecs="opus"', qualityLabel: null, bitrate: null, audioBitrate: 48 },
                    250: { mimeType: 'audio/webm; codecs="opus"', qualityLabel: null, bitrate: null, audioBitrate: 64 },
                    251: { mimeType: 'audio/webm; codecs="opus"', qualityLabel: null, bitrate: null, audioBitrate: 160 },
                    264: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "1440p", bitrate: 4e6, audioBitrate: null },
                    266: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "2160p", bitrate: 125e5, audioBitrate: null },
                    271: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1440p", bitrate: 9e6, audioBitrate: null },
                    272: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "4320p", bitrate: 2e7, audioBitrate: null },
                    278: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "144p 15fps", bitrate: 8e4, audioBitrate: null },
                    298: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "720p", bitrate: 3e6, audioBitrate: null },
                    299: { mimeType: 'video/mp4; codecs="H.264"', qualityLabel: "1080p", bitrate: 55e5, audioBitrate: null },
                    302: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "720p HFR", bitrate: 25e5, audioBitrate: null },
                    303: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1080p HFR", bitrate: 5e6, audioBitrate: null },
                    308: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1440p HFR", bitrate: 1e7, audioBitrate: null },
                    313: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "2160p", bitrate: 13e6, audioBitrate: null },
                    315: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "2160p HFR", bitrate: 2e7, audioBitrate: null },
                    330: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "144p HDR, HFR", bitrate: 8e4, audioBitrate: null },
                    331: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "240p HDR, HFR", bitrate: 1e5, audioBitrate: null },
                    332: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "360p HDR, HFR", bitrate: 25e4, audioBitrate: null },
                    333: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "240p HDR, HFR", bitrate: 5e5, audioBitrate: null },
                    334: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "720p HDR, HFR", bitrate: 1e6, audioBitrate: null },
                    335: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1080p HDR, HFR", bitrate: 15e5, audioBitrate: null },
                    336: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1440p HDR, HFR", bitrate: 5e6, audioBitrate: null },
                    337: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "2160p HDR, HFR", bitrate: 12e6, audioBitrate: null },
                    356: { mimeType: 'video/webm; codecs="VP9"', qualityLabel: "1080p Premium", bitrate: 5e6, audioBitrate: null },
                    394: { mimeType: 'video/mp4; codecs="av01.0.00M.08"', qualityLabel: "144p", bitrate: 82538, audioBitrate: null },
                    395: { mimeType: 'video/mp4; codecs="av01.0.00M.08"', qualityLabel: "240p", bitrate: 174957, audioBitrate: null },
                    396: { mimeType: 'video/mp4; codecs="av01.0.00M.08"', qualityLabel: "360p", bitrate: 315374, audioBitrate: null },
                    397: { mimeType: 'video/mp4; codecs="av01.0.00M.08"', qualityLabel: "480p", bitrate: 544089, audioBitrate: null },
                    398: { mimeType: 'video/mp4; codecs="av01.0.00M.08"', qualityLabel: "720p", bitrate: 1060578, audioBitrate: null },
                    399: { mimeType: 'video/mp4; codecs="av01.0.00M.08"', qualityLabel: "1080p 60fps", bitrate: 1824777, audioBitrate: null },
                    400: { mimeType: 'video/mp4; codecs="av01.0.12M.08"', qualityLabel: "1440p", bitrate: 7227650, audioBitrate: null },
                    401: { mimeType: 'video/mp4; codecs="av01.0.12M.08"', qualityLabel: "2160p", bitrate: 14534064, audioBitrate: null },
                    402: { mimeType: 'video/mp4; codecs="av01.0.16M.08"', qualityLabel: "4320p", bitrate: 20235208, audioBitrate: null },
                    571: { mimeType: 'video/mp4; codecs="av01.0.16M.08"', qualityLabel: "4320p", bitrate: 28030305, audioBitrate: null },
                    694: { mimeType: 'video/mp4; codecs="av01.0.00M.10.0.110.09.16.09.0"', qualityLabel: "144p60 HDR", bitrate: 205603, audioBitrate: null },
                    695: { mimeType: 'video/mp4; codecs="av01.0.01M.10.0.110.09.16.09.0"', qualityLabel: "240p60 HDR", bitrate: 381107, audioBitrate: null },
                    696: { mimeType: 'video/mp4; codecs="av01.0.04M.10.0.110.09.16.09.0"', qualityLabel: "360p60 HDR", bitrate: 773977, audioBitrate: null },
                    697: { mimeType: 'video/mp4; codecs="av01.0.05M.10.0.110.09.16.09.0"', qualityLabel: "480p60 HDR", bitrate: 1452899, audioBitrate: null },
                    698: { mimeType: 'video/mp4; codecs="av01.0.08M.10.0.110.09.16.09.0"', qualityLabel: "720p60 HDR", bitrate: 3971121, audioBitrate: null },
                    699: { mimeType: 'video/mp4; codecs="av01.0.09M.10.0.110.09.16.09.0"', qualityLabel: "1080p60 HDR", bitrate: 6401864, audioBitrate: null },
                    700: { mimeType: 'video/mp4; codecs="av01.0.12M.10.0.110.09.16.09.0"', qualityLabel: "1440p60 HDR", bitrate: 16530351, audioBitrate: null },
                    701: { mimeType: 'video/mp4; codecs="av01.0.13M.10.0.110.09.16.09.0"', qualityLabel: "2160p60 HDR", bitrate: 28292262, audioBitrate: null },
                    702: { mimeType: 'video/mp4; codecs="av01.0.17M.10.0.110.09.16.09.0"', qualityLabel: "4320p60 HDR", bitrate: 57074894, audioBitrate: null },
                    703: { mimeType: 'video/mp4; codecs="av01.0.17M.10.0.110.09.16.09.0"', qualityLabel: "4320p60 HDR", bitrate: 38237903, audioBitrate: null },
                },
                x = { tiny: "sd", small: "sd", medium: "sd", large: "sd", hd720: "hd", hd1080: "1080", hd1440: "2k", hd2160: "4k", highres: "8k" }; //Token - x-youtube-client-version
            const D = /(["'])ID_TOKEN\1[:,]\s?"([^"]+)"/,
                q = /(["'])INNERTUBE_CONTEXT_CLIENT_VERSION\1[:,]\s?"([^"]+)"/,
                generateTokenVersion = async (e) => {
                    var t;
                    const n = await c.get("client-data");
                    if (n) return r.L.info("Client data retrieved from cache.", n), n;
                    let i;
                    r.L.info(`Getting client data from watch page for video ID "${e}"`);
                    try {
                        i = await (0, o.A)(r.W, { params: { v: e, hl: "en", bpctr: Math.ceil(Date.now() / 1e3).toString() } });
                    } catch (e) {
                        throw (r.L.error("Client data request failed.", { error: e }), new Error(`Client data request failed with status code ${null == (t = e.response) ? void 0 : t.status}`));
                    }
                    const a = i.data;
                    // y-youtube client init version 2.20240816.01.00
                    let token,
                        version = "2.20210623.00.00",     
                        u = a.match(D);
                    return (
                        u && (([, , token] = u), ({ token } = JSON.parse(`{ "token": "${token}" }`))),
                        (u = a.match(q)),
                        u && (version = u[2]),
                        r.L.success("Client data extracted.", { version, token }),
                        c.set("client-data", { version, token }, 1800),
                        { version, token }
                    );
                };
            const N = async (e) => {
                var t;
                let n,
                    i = await c.get("player-js-url");
                if (i) return r.L.info("Using cached script URL.", { url: i }), i;
                r.L.info(`Getting script URL from watch page for video ID "${e}"`);
                try {
                    n = await (0, o.A)(r.W, { params: { v: e, hl: "en", bpctr: Math.ceil(Date.now() / 1e3).toString() } });
                } catch (e) {
                    throw (r.L.error("Script URL request failed.", { error: e }), new Error(`Script URL request failed with status code ${null == (t = e.response) ? void 0 : t.status}`));
                }
                return (
                    (i = (function (e) {
                        let t = e.match(/(['"])PLAYER_JS_URL\1\s?:\s?\1(.*?)\1/);
                        if (t) {
                            const { scriptUrl: e } = JSON.parse(`{ "scriptUrl": "${t[2]}" }`);
                            return e;
                        }
                        const n = /(['"])jsUrl\1\s?:\s?\1(.*?)\1/g;
                        for (; null !== (t = n.exec(e)); ) if (r.P.test(t[2])) return t[2];
                        return (t = e.match(/<script\s+[^>]*src="[^"]*player_ias[^"]*base\.js[^"]*"[^>]*>/)), t && ((t = t[0].match(/src="(.*?)"/)), t) ? t[1] : null;
                    })(n.data)),
                    i ? (r.L.success("Script URL retrieved.", { url: i }), c.set("player-js-url", i, 1800), i) : (r.L.error("Failed to retrieve script URL."), null)
                );
            };
            class $ {
                static enableLogging() {
                    window.MD_YOUTUBE_LOG = !0;
                }
                static getLog() {
                    return r.L.getContent();
                }
                static async getInfo(videoId, t = null, n = null) {
                    let info, i;
                    if ((r.L.flush(), r.L.info(`Retrieving video information using md-youtube (background) v${r.a}`, { videoId, playerResponse: t, playerJsUrl: n }), t)) info = l(t);
                    else {
                        const tokenVersion = await generateTokenVersion(videoId);
                        // {token:undefined, version:"2.20240816.01.00"}
                        (console.log('-->test token', {token:tokenVersion.token}));
                        info = await getVideoInfo(videoId, tokenVersion.version, tokenVersion.token, () => generateTokenVersion(videoId));
                    }
                    r.L.success("Video information retrieved.", { info: info }), n || (n = await N(e)), n && (i = await C.getFunctions(n)), info.formats.sort(y);
                    const getDownloadList = (function (formats, title, n) { // Get download info
                        const info = [];
                    
                        formats.forEach((format) => {
                            // Check for valid itag
                            if (typeof B[format.itag] === "undefined") {
                                r.L.warn(`Format info for itag "${format.itag}" not found.`, { format });
                                return;
                            }
                    
                            // Merge format details
                            format = { ...B[format.itag], ...format };
                            const decipheredUrl = C.decipherFormat(format, n);
                    
                            // Validate deciphered URL
                            if (!decipheredUrl) {
                                r.L.warn(`URL for itag "${format.itag}" not found.`, { format });
                                return;
                            }
                    
                            const decodedUrl = decodeURIComponent(decipheredUrl);
                            let url;
                    
                            // Validate URL
                            try {
                                url = new URL(decodedUrl);
                            } catch {
                                r.L.warn(`URL for itag "${format.itag}" is invalid.`, { format });
                                return;
                            }
                    
                            // Set URL parameters
                            url.searchParams.set("ratebypass", "yes");
                            url.searchParams.set("title", title);
                    
                            // Determine type
                            let type = u.AUDIO_VIDEO;
                            if (!format.audioBitrate) type = u.VIDEO;
                            if (!format.qualityLabel) type = u.AUDIO;
                    
                            // Prepare video quality details
                            let videoQuality = null;
                            if (type !== u.AUDIO) {
                                videoQuality = {
                                    label: x[format.quality],
                                    fps: format.fps,
                                    isHDR: format.qualityLabel?.includes("HDR") || false,
                                };
                            }
                    
                            // Push formatted info to the array
                            info.push({
                                itag: format.itag,
                                type,
                                format: format.mimeType ? format.mimeType.split(";")[0].split("/")[1] : null,
                                quality: format.qualityLabel ? `${parseInt(format.qualityLabel, 10)}p` : `${format.audioBitrate}Kbps`,
                                videoQuality,
                                url: url.href,
                                size: format.contentLength ? parseInt(format.contentLength, 10) : null,
                            });
                        });
                    
                        return info;
                    })(info.formats, info.title, i);

                    r.L.success("Download formats sorted and parsed.", { downloads: a });
                    const s = [];
                    
                    info.captions.forEach((e) => {
                        s.push({ languageCode: e.languageCode, languageName: e.languageName, url: e.url, autoGenerated: !1, format: "webvtt" });
                    });
                    info.autoCaptions.forEach((e) => {
                        s.push({ languageCode: e.languageCode, languageName: e.languageName, url: e.url, autoGenerated: !0, format: "webvtt" });
                    });

                    const videoInfo = {
                        id: info.id,
                        title: info.title,
                        description: info.description,
                        length: info.length,
                        author: info.author,
                        date: info.publishDate,
                        category: info.category,
                        thumbnails: info.thumbnails,
                        downloads: getDownloadList,
                        rating: info.rating,
                        views: info.views,
                        isLive: info.isLive,
                        isUpcoming: info.isUpcoming,
                        subtitles: s,
                    };
                    return r.L.success("Video information retrieved.", { video: videoInfo }), videoInfo;
                }
                static clearSignatureCache() {
                    C.clearFunctions();
                }
                static clearCache() {
                    return c.clear();
                }
            }
            a($, "chooseFormat", function (e, t) {
                const { quality: n, itag: r } = t;
                if (n)
                    switch (n) {
                        case "highest":
                            return e.find((e) => e.type === u.AUDIO_VIDEO) || null;
                        case "lowest":
                            return e.reverse().find((e) => e.type === u.AUDIO_VIDEO) || null;
                        case "highestaudio":
                            return e.find((e) => e.type === u.AUDIO) || null;
                        case "lowestaudio":
                            return e.reverse().find((e) => e.type === u.AUDIO) || null;
                        case "highestvideo":
                            return e.find((e) => e.type === u.VIDEO) || null;
                        case "lowestvideo":
                            return e.reverse().find((e) => e.type === u.VIDEO) || null;
                        default:
                            return e.find((e) => e.quality === n) || null;
                    }
                else if (r) {
                    if (!Array.isArray(r)) return e.find((e) => e.itag === r) || null;
                    {
                        const t = r;
                        for (let n = 0; n < t.length; n += 1) {
                            const r = e.find((e) => e.itag === t[n]);
                            if (r) return r;
                        }
                    }
                }
                return null;
            });
        },
        8529: (e, t, n) => {
            "use strict";
            n.d(t, { L: () => a, P: () => l, W: () => c, a: () => s });
            var r = Object.defineProperty,
                o = (e, t, n) => ((e, t, n) => (t in e ? r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n)))(e, "symbol" != typeof t ? t + "" : t, n);
            const i = class e {
                constructor() {
                    o(this, "content", []);
                }
                log(t, ...n) {
                    this.content.push(`[${t}] ${JSON.stringify(n)}`), window.MD_YOUTUBE_LOG && console.log(`%c${e.STYLES[t].icon} %c${n.shift()}`, ...e.STYLES[t].style, ...n);
                }
                info(...e) {
                    this.log("info", ...e);
                }
                success(...e) {
                    this.log("success", ...e);
                }
                warn(...e) {
                    this.log("warn", ...e);
                }
                error(...e) {
                    this.log("error", ...e);
                }
                getContent() {
                    return this.content;
                }
                flush() {
                    this.content = [];
                }
            };
            o(i, "STYLES", {
                info: { icon: "ℹ", style: ["color: #1e88e5; font-weight: bold;", "color: #666"] },
                success: { icon: "✔", style: ["color: #43A047; font-weight: bold;", "color: #333"] },
                warn: {
                    icon: "⚠",
                    style: [
                        "color: #fff; font-weight: bold; background-color: #F9A825; padding: 0.125rem 0.125rem 0.125rem 0.325rem",
                        "color: #fff; font-weight: bold; background-color: #F9A825; padding: 0.125rem 0.325rem 0.125rem 0.125rem",
                    ],
                },
                error: {
                    icon: "✖",
                    style: [
                        "color: #fff; font-weight: bold; background-color: #f44336; padding: 0.125rem 0.125rem 0.125rem 0.325rem",
                        "color: #fff; font-weight: bold; background-color: #f44336; padding: 0.125rem 0.325rem 0.125rem 0.125rem",
                    ],
                },
            });
            const a = new i(),
                s = "1.0.3",
                c = "https://www.youtube.com/watch",
                l = /([a-zA-Z0-9_-]{8,})\/player_ias\.vflset(?:\/[a-zA-Z]{2,3}_[a-zA-Z]{2,3})?\/base\.([a-z]+)$/;
        },
        577: (e, t, n) => {
            "use strict";
            n.d(t, { pe: () => i });
            var r = n(9902);
            const {
                Axios: o,
                AxiosError: i,
                CanceledError: a,
                isCancel: s,
                CancelToken: c,
                VERSION: l,
                all: u,
                Cancel: d,
                isAxiosError: p,
                spread: f,
                toFormData: m,
                AxiosHeaders: h,
                HttpStatusCode: y,
                formToJSON: b,
                getAdapter: g,
                mergeConfig: w,
            } = r.A;
        },
        9902: (e, t, n) => {
            "use strict";
            n.d(t, { A: () => Et });
            const r = {};

            function o(e, t) {
                return function () {
                    return e.apply(t, arguments);
                };
            }
            n.r(r);
            n.d(r, {
                hasBrowserEnv: () => fe,
                hasStandardBrowserEnv: () => me,
                hasStandardBrowserWebWorkerEnv: () => ye,
                origin: () => be
            });

            const {
                toString: i
            } = Object.prototype, {
                    getPrototypeOf: a
                } = Object,
                s = ((c = Object.create(null)), (e) => {
                    const t = i.call(e);
                    return c[t] || (c[t] = t.slice(8, -1).toLowerCase());
                });

            var c;

            const l = (e) => ((e = e.toLowerCase()), (t) => s(t) === e),
                u = (e) => (t) => typeof t === e,
                {
                    isArray: d
                } = Array,
                p = u("undefined");

            const f = l("ArrayBuffer");
            const m = u("string"),
                h = u("function"),
                y = u("number"),
                b = (e) => null !== e && "object" === typeof e,
                g = (e) => {
                    if ("object" !== s(e)) return !1;
                    const t = a(e);
                    return !((null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t)) || Symbol.toStringTag in e || Symbol.iterator in e);
                };

            const w = l("Date"),
                v = l("File"),
                L = l("Blob"),
                E = l("FileList"),
                T = l("URLSearchParams"),
                [R, O, S, A] = ["ReadableStream", "Request", "Response", "Headers"].map(l);

            function C(e, t, {
                allOwnKeys: n = !1
            } = {}) {
                if (null == e) return;
                let r, o;
                if (("object" != typeof e && (e = [e]), d(e))) {
                    for (r = 0, o = e.length; r < o; r++) t.call(null, e[r], r, e);
                } else {
                    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
                        i = o.length;
                    let a;
                    for (r = 0; r < i; r++)(a = o[r]), t.call(null, e[a], a, e);
                }
            }

            function B(e, t) {
                t = t.toLowerCase();
                const n = Object.keys(e);
                let r,
                    o = n.length;
                for (; o-- > 0;)
                    if (((r = n[o]), t === r.toLowerCase())) return r;
                return null;
            }

            const x = typeof globalThis !== "undefined" ? globalThis :
                typeof self !== "undefined" ? self :
                typeof window !== "undefined" ? window : global;

            const D = (e) => !p(e) && e !== x;

            const q = ((P = typeof Uint8Array !== "undefined" && a(Uint8Array)), (e) => P && e instanceof P);
            var P;

            const N = l("HTMLFormElement"),
                $ = (({
                    hasOwnProperty: e
                }) => (t, n) => e.call(t, n))(Object.prototype),
                U = l("RegExp");

            const F = (e, t) => {
                const n = Object.getOwnPropertyDescriptors(e),
                    r = {};
                C(n, (n, o) => {
                        let i;
                        !1 !== (i = t(n, o, e)) && (r[o] = i || n);
                    }),
                    Object.defineProperties(e, r);
            };
            const k = "abcdefghijklmnopqrstuvwxyz",
            _ = "0123456789",
            I = { DIGIT: _, ALPHA: k, ALPHA_DIGIT: k + k.toUpperCase() + _ };
            let H, V, z, J;
            const j = l("AsyncFunction"),
            M =
                ((H = "function" == typeof setImmediate),
                (V = h(x.postMessage)),
                H
                    ? setImmediate
                    : V
                    ? ((z = `axios@${Math.random()}`),
                        (J = []),
                        x.addEventListener(
                            "message",
                            ({ source: e, data: t }) => {
                                e === x && t === z && J.length && J.shift()();
                            },
                            !1
                        ),
                        (e) => {
                            J.push(e), x.postMessage(z, "*");
                        })
                    : (e) => setTimeout(e));
            const G = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(x) : ("undefined" != typeof process && process.nextTick) || M
                    
            // Extracting functions and keys from W object
            const isArray = d,
                isArrayBuffer = f,
                isString = m,
                isNumber = y,
                isBoolean = (e) => !0 === e || !1 === e,
                isObject = b,
                isPlainObject = g,
                isReadableStream = R,
                isRequest = O,
                isResponse = S,
                isHeaders = A,
                isUndefined = p,
                isDate = w,
                isFile = v,
                isBlob = L,
                isRegExp = U,
                isFunction = h,
                isURLSearchParams = T,
                isTypedArray = q,
                isFileList = E,
                extend = (e, t, n, {
                    allOwnKeys: r
                } = {}) => (
                    C(
                        t,
                        (t, r) => {
                            n && h(t) ? (e[r] = o(t, n)) : (e[r] = t);
                        }, {
                            allOwnKeys: r
                        }
                    ),
                    e
                ),
                trim = (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")),
                stripBOM = (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e);

            const inherits = (e, t, n, r) => {
                (e.prototype = Object.create(t.prototype, r)),
                (e.prototype.constructor = e),
                Object.defineProperty(e, "super", {
                        value: t.prototype
                    }),
                    n && Object.assign(e.prototype, n);
            };

            const toFlatObject = (e, t, n, r) => {
                let o, i, s;
                const c = {};
                if (((t = t || {}), null == e)) return t;
                do {
                    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0;) {
                        (s = o[i]),
                        (r && !r(s, e, t)) || c[s] || ((t[s] = e[s]), (c[s] = !0));
                    }
                    e = !1 !== n && a(e);
                } while (e && (!n || n(e, t)) && e !== Object.prototype);
                return t;
            };

            const kindOf = s,
                kindOfTest = l,
                endsWith = (e, t, n) => {
                    (e = String(e)),
                    (void 0 === n || n > e.length) && (n = e.length),
                    (n -= t.length);
                    const r = e.indexOf(t, n);
                    return -1 !== r && r === n;
                },
                toArray = (e) => {
                    if (!e) return null;
                    if (d(e)) return e;
                    let t = e.length;
                    if (!y(t)) return null;
                    const n = new Array(t);
                    for (; t-- > 0;) n[t] = e[t];
                    return n;
                },
                forEachEntry = (e, t) => {
                    const n = (e && e[Symbol.iterator]).call(e);
                    let r;
                    for (;
                        (r = n.next()) && !r.done;) {
                        const n = r.value;
                        t.call(e, n[0], n[1]);
                    }
                },
                matchAll = (e, t) => {
                    let n;
                    const r = [];
                    for (; null !== (n = e.exec(t));) r.push(n);
                    return r;
                },
                isHTMLForm = N,
                hasOwnProperty = $,
                hasOwnProp = $,
                reduceDescriptors = F,
                freezeMethods = (e) => {
                    F(e, (t, n) => {
                        if (h(e) && -1 !== ["arguments", "caller", "callee"].indexOf(n)) return !1;
                        const r = e[n];
                        h(r) &&
                            ((t.enumerable = !1),
                                "writable" in t ?
                                (t.writable = !1) :
                                t.set ||
                                (t.set = () => {
                                    throw Error("Cannot rewrite read-only method '" + n + "'");
                                }));
                    });
                },
                toObjectSet = (e, t) => {
                    const n = {},
                        r = (e) => {
                            e.forEach((e) => {
                                n[e] = !0;
                            });
                        };
                    return d(e) ? r(e) : r(String(e).split(t)), n;
                },
                toCamelCase = (e) =>
                e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
                    return t.toUpperCase() + n;
                }),
                noop = () => {},
                toFiniteNumber = (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
                findKey = B,
                global = x,
                isContextDefined = D,
                ALPHABET = I,
                generateString = (e = 16, t = I.ALPHA_DIGIT) => {
                    let n = "";
                    const {
                        length: r
                    } = t;
                    for (; e--;) n += t[(Math.random() * r) | 0];
                    return n;
                },
                isSpecCompliantForm = function (e) {
                    return !!(e && h(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator]);
                },
                toJSONObject = (e) => {
                    const t = new Array(10),
                        n = (e, r) => {
                            if (b(e)) {
                                if (t.indexOf(e) >= 0) return;
                                if (!("toJSON" in e)) {
                                    t[r] = e;
                                    const o = d(e) ? [] : {};
                                    return (
                                        C(e, (e, t) => {
                                            const i = n(e, r + 1);
                                            !p(i) && (o[t] = i);
                                        }),
                                        (t[r] = void 0),
                                        o
                                    );
                                }
                            }
                            return e;
                        };
                    return n(e, 0);
                },
                isAsyncFn = j,
                isThenable = (e) => e && (b(e) || h(e)) && h(e.then) && h(e.catch),
                setImmediate = M,
                asap = G;
            function K(e, t, n, r, o) {
                Error.call(this),
                    Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
                    (this.message = e),
                    (this.name = "AxiosError"),
                    t && (this.code = t),
                    n && (this.config = n),
                    r && (this.request = r),
                    o && (this.response = o);
            }
            inherits(K, Error, {
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
                        config: toJSONObject(this.config),
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null,
                    };
                },
            });
            const W = {
                isArray,
                isArrayBuffer,
                isBuffer: function (e) {
                    return null !== e && !p(e) && null !== e.constructor && !p(e.constructor) && h(e.constructor.isBuffer) && e.constructor.isBuffer(e);
                },
                isFormData: (e) => {
                    let t;
                    return e && (("function" == typeof FormData && e instanceof FormData) || (h(e.append) && ("formdata" === (t = s(e)) || ("object" === t && h(e.toString) && "[object FormData]" === e.toString()))));
                },
                isArrayBufferView: function (e) {
                    let t;
                    return (t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && f(e.buffer)), t;
                },
                isString,
                isNumber,
                isBoolean: (e) => !0 === e || !1 === e,
                isObject,
                isPlainObject,
                isReadableStream,
                isRequest,
                isResponse,
                isHeaders,
                isUndefined,
                isDate,
                isFile,
                isBlob,
                isRegExp,
                isFunction,
                isStream: (e) => isObject(e) && isFunction(e.pipe),
                isURLSearchParams,
                isTypedArray,
                isFileList,
                forEach: C,
                merge: function e() {
                    const { caseless: t } = (D(this) && this) || {},
                        n = {},
                        r = (r, o) => {
                            const i = (t && B(n, o)) || o;
                            g(n[i]) && g(r) ? (n[i] = e(n[i], r)) : g(r) ? (n[i] = e({}, r)) : d(r) ? (n[i] = r.slice()) : (n[i] = r);
                        };
                    for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && C(arguments[e], r);
                    return n;
                },
                extend,
                trim,
                stripBOM,
                inherits,
                toFlatObject,
                kindOf,
                kindOfTest,
                endsWith,
                toArray,
                forEachEntry,
                matchAll,
                isHTMLForm,
                hasOwnProperty,
                hasOwnProp,
                reduceDescriptors,
                freezeMethods,
                toObjectSet,
                toCamelCase,
                noop,
                toFiniteNumber,
                findKey,
                global,
                isContextDefined,
                ALPHABET,
                generateString,
                isSpecCompliantForm,
                toJSONObject,
                isAsyncFn,
                isThenable,
                setImmediate,
                asap,
            };
            function K(e, t, n, r, o) {
                Error.call(this),
                    Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : (this.stack = new Error().stack),
                    (this.message = e),
                    (this.name = "AxiosError"),
                    t && (this.code = t),
                    n && (this.config = n),
                    r && (this.request = r),
                    o && (this.response = o);
            }
            W.inherits(K, Error, {
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
                        config: W.toJSONObject(this.config),
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null,
                    };
                },
            });
            const X = K.prototype,
                Z = {};
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
                Z[e] = { value: e };
            }),
                Object.defineProperties(K, Z),
                Object.defineProperty(X, "isAxiosError", { value: !0 }),
                (K.from = (e, t, n, r, o, i) => {
                    const a = Object.create(X);
                    return (
                        W.toFlatObject(
                            e,
                            a,
                            function (e) {
                                return e !== Error.prototype;
                            },
                            (e) => "isAxiosError" !== e
                        ),
                        K.call(a, e.message, t, n, r, o),
                        (a.cause = e),
                        (a.name = e.name),
                        i && Object.assign(a, i),
                        a
                    );
                });
            const Y = K;
            function Q(e) {
                return W.isPlainObject(e) || W.isArray(e);
            }
            function ee(e) {
                return W.endsWith(e, "[]") ? e.slice(0, -2) : e;
            }
            function te(e, t, n) {
                return e
                    ? e
                          .concat(t)
                          .map(function (e, t) {
                              return (e = ee(e)), !n && t ? "[" + e + "]" : e;
                          })
                          .join(n ? "." : "")
                    : t;
            }
            const ne = W.toFlatObject(W, {}, null, function (e) {
                return /^is[A-Z]/.test(e);
            });
            const re = function (e, t, n) {
                if (!W.isObject(e)) throw new TypeError("target must be an object");
                t = t || new FormData();
                const r = (n = W.toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (e, t) {
                        return !W.isUndefined(t[e]);
                    })).metaTokens,
                    o = n.visitor || l,
                    i = n.dots,
                    a = n.indexes,
                    s = (n.Blob || ("undefined" != typeof Blob && Blob)) && W.isSpecCompliantForm(t);
                if (!W.isFunction(o)) throw new TypeError("visitor must be a function");
                function c(e) {
                    if (null === e) return "";
                    if (W.isDate(e)) return e.toISOString();
                    if (!s && W.isBlob(e)) throw new Y("Blob is not supported. Use a Buffer instead.");
                    return W.isArrayBuffer(e) || W.isTypedArray(e) ? (s && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e)) : e;
                }
                function l(e, n, o) {
                    let s = e;
                    if (e && !o && "object" == typeof e)
                        if (W.endsWith(n, "{}")) (n = r ? n : n.slice(0, -2)), (e = JSON.stringify(e));
                        else if (
                            (W.isArray(e) &&
                                (function (e) {
                                    return W.isArray(e) && !e.some(Q);
                                })(e)) ||
                            ((W.isFileList(e) || W.endsWith(n, "[]")) && (s = W.toArray(e)))
                        )
                            return (
                                (n = ee(n)),
                                s.forEach(function (e, r) {
                                    !W.isUndefined(e) && null !== e && t.append(!0 === a ? te([n], r, i) : null === a ? n : n + "[]", c(e));
                                }),
                                !1
                            );
                    return !!Q(e) || (t.append(te(o, n, i), c(e)), !1);
                }
                const u = [],
                    d = Object.assign(ne, { defaultVisitor: l, convertValue: c, isVisitable: Q });
                if (!W.isObject(e)) throw new TypeError("data must be an object");
                return (
                    (function e(n, r) {
                        if (!W.isUndefined(n)) {
                            if (-1 !== u.indexOf(n)) throw Error("Circular reference detected in " + r.join("."));
                            u.push(n),
                                W.forEach(n, function (n, i) {
                                    !0 === (!(W.isUndefined(n) || null === n) && o.call(t, n, W.isString(i) ? i.trim() : i, r, d)) && e(n, r ? r.concat(i) : [i]);
                                }),
                                u.pop();
                        }
                    })(e),
                    t
                );
            };
            function oe(e) {
                const t = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
                return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
                    return t[e];
                });
            }
            function ie(e, t) {
                (this._pairs = []), e && re(e, this, t);
            }
            const ae = ie.prototype;
            (ae.append = function (e, t) {
                this._pairs.push([e, t]);
            }),
                (ae.toString = function (e) {
                    const t = e
                        ? function (t) {
                              return e.call(this, t, oe);
                          }
                        : oe;
                    return this._pairs
                        .map(function (e) {
                            return t(e[0]) + "=" + t(e[1]);
                        }, "")
                        .join("&");
                });
            const se = ie;
            function ce(e) {
                return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
            }
            function le(e, t, n) {
                if (!t) return e;
                const r = (n && n.encode) || ce,
                    o = n && n.serialize;
                let i;
                if (((i = o ? o(t, n) : W.isURLSearchParams(t) ? t.toString() : new se(t, n).toString(r)), i)) {
                    const t = e.indexOf("#");
                    -1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf("?") ? "?" : "&") + i);
                }
                return e;
            }
            const InterceptorManager = class {
                constructor() {
                    this.handlers = [];
                }
            
                use(fulfilled, rejected, options) {
                    const handler = {
                        fulfilled: fulfilled,
                        rejected: rejected,
                        synchronous: !!options && options.synchronous,
                        runWhen: options ? options.runWhen : null
                    };
                    this.handlers.push(handler);
                    return this.handlers.length - 1;
                }
            
                eject(index) {
                    if (this.handlers[index]) {
                        this.handlers[index] = null;
                    }
                }
            
                clear() {
                    this.handlers = [];
                }
            
                forEach(callback) {
                    this.handlers.forEach((handler) => {
                        if (handler !== null) {
                            callback(handler);
                        }
                    });
                }
            },
                de = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
                pe = {
                    isBrowser: !0,
                    classes: { URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : se, FormData: "undefined" != typeof FormData ? FormData : null, Blob: "undefined" != typeof Blob ? Blob : null },
                    protocols: ["http", "https", "file", "blob", "url", "data"],
                },
                fe = "undefined" != typeof window && "undefined" != typeof document,
                me = ((he = "undefined" != typeof navigator && navigator.product), fe && ["ReactNative", "NativeScript", "NS"].indexOf(he) < 0);
            var he;
            const ye = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts,
                be = (fe && window.location.href) || "http://localhost",
                ge = { ...r, ...pe };
            const we = function (e) {
                function updateObject(e, value, result, index) {
                    let key = e[index++];
                
                    // Check for '__proto__' key
                    if (key === "__proto__") return true;
                
                    const isFiniteKey = Number.isFinite(+key);
                    const isEndOfArray = index >= e.length;
                
                    // Set default key if undefined
                    if (!key && W.isArray(result)) {
                        key = result.length;
                    }
                
                    // Base case: Add property to object
                    if (isEndOfArray) {
                        if (W.hasOwnProp(result, key)) {
                            result[key] = [result[key], value];
                        } else {
                            result[key] = value;
                        }
                        return !isFiniteKey;
                    }
                
                    // Ensure the property is an object or initialize it
                    if (!result[key] || !W.isObject(result[key])) {
                        result[key] = [];
                    }
                
                    // Recursive call to continue processing
                    const shouldContinue = updateObject(e, value, result[key], index);
                    
                    // Transform to plain object if it's an array
                    if (shouldContinue && W.isArray(result[key])) {
                        result[key] = convertToPlainObject(result[key]);
                    }
                
                    return !isFiniteKey;
                }
                
                // Helper function to convert array to plain object
                function convertToPlainObject(array) {
                    const plainObject = {};
                    const keys = Object.keys(array);
                    
                    for (const key of keys) {
                        plainObject[key] = array[key];
                    }
                
                    return plainObject;
                }
                if (W.isFormData(e) && W.isFunction(e.entries)) {
                    const n = {};
                    return (
                        W.forEachEntry(e, (e, r) => {
                            updateObject(
                                (function (e) {
                                    return W.matchAll(/\w+|\[(\w*)]/g, e).map((e) => ("[]" === e[0] ? "" : e[1] || e[0]));
                                })(e),
                                r,
                                n,
                                0
                            );
                        }),
                        n
                    );
                }
                return null;
            };
            const ve = {
                transitional: de,
                adapter: ["xhr", "http", "fetch"],
                transformRequest: [
                    function (data, config) {
                        const contentType = config.getContentType() || "";
                        const isJSON = contentType.includes("application/json");
                        const isObject = W.isObject(data);
            
                        // Convert HTMLForm to FormData if applicable
                        if (isObject && W.isHTMLForm(data)) {
                            data = new FormData(data);
                        }
            
                        // Handle various data types
                        if (W.isFormData(data)) {
                            return isJSON ? JSON.stringify(we(data)) : data;
                        }
                        if (W.isArrayBuffer(data) || W.isBuffer(data) || 
                            W.isStream(data) || W.isFile(data) || 
                            W.isBlob(data) || W.isReadableStream(data)) {
                            return data;
                        }
                        if (W.isArrayBufferView(data)) {
                            return data.buffer;
                        }
                        if (W.isURLSearchParams(data)) {
                            config.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
                            return data.toString();
                        }
            
                        let fileList;
                        if (isObject) {
                            if (contentType.includes("application/x-www-form-urlencoded")) {
                                return serializeFormData(data, this.formSerializer).toString();
                            }
                            if ((fileList = W.isFileList(data)) || contentType.includes("multipart/form-data")) {
                                const FormDataConstructor = this.env && this.env.FormData;
                                return serializeFormData(fileList ? { "files[]": data } : data, FormDataConstructor && new FormDataConstructor(), this.formSerializer);
                            }
                        }
            
                        return isObject || isJSON
                            ? handleJSON(data, config)
                            : data;
                    },
                ],
                transformResponse: [
                    function (response) {
                        const transitional = this.transitional || ve.transitional;
                        const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
                        const isJSONResponse = this.responseType === "json";
            
                        if (W.isResponse(response) || W.isReadableStream(response)) {
                            return response;
                        }
                        if (response && W.isString(response) && ((forcedJSONParsing && !this.responseType) || isJSONResponse)) {
                            const silentParsing = !(transitional && transitional.silentJSONParsing);
                            try {
                                return JSON.parse(response);
                            } catch (error) {
                                if (silentParsing) {
                                    if (error.name === "SyntaxError") {
                                        throw Y.from(error, Y.ERR_BAD_RESPONSE, this, null, this.response);
                                    }
                                    throw error;
                                }
                            }
                        }
                        return response;
                    },
                ],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                maxBodyLength: -1,
                env: { FormData: ge.classes.FormData, Blob: ge.classes.Blob },
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                },
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": undefined,
                    },
                },
            };
            
            // Helper function to serialize form data
            function serializeFormData(data, formDataInstance, serializer) {
                return re(data, formDataInstance, {
                    visitor: function (value, key, formData, defaultVisitor) {
                        if (ge.isNode && W.isBuffer(value)) {
                            this.append(key, value.toString("base64"));
                            return false;
                        }
                        return defaultVisitor.apply(this, arguments);
                    },
                });
            }
            
            // Helper function to handle JSON serialization
            function handleJSON(data, config) {
                config.setContentType("application/json", false);
                if (W.isString(data)) {
                    try {
                        return (config || JSON.parse)(data), W.trim(data);
                    } catch (error) {
                        if (error.name !== "SyntaxError") throw error;
                    }
                }
                return (config || JSON.stringify)(data);
            }
            ["delete", "get", "head", "post", "put", "patch"].forEach((e) => {
                ve.headers[e] = {};
            });
            const Ee = W.toObjectSet([
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
                Te = Symbol("internals");
            function Re(e) {
                return e && String(e).trim().toLowerCase();
            }
            function Oe(e) {
                return !1 === e || null == e ? e : W.isArray(e) ? e.map(Oe) : String(e);
            }
            function Se(e, t, n, r, o) {
                return W.isFunction(r) ? r.call(this, t, n) : (o && (t = n), W.isString(t) ? (W.isString(r) ? -1 !== t.indexOf(r) : W.isRegExp(r) ? r.test(t) : void 0) : void 0);
            }
            class Ae {
                constructor(e) {
                    e && this.set(e);
                }
                set(e, t, n) {
                    const r = this;
                    function o(e, t, n) {
                        const o = Re(t);
                        if (!o) throw new Error("header name must be a non-empty string");
                        const i = W.findKey(r, o);
                        (!i || void 0 === r[i] || !0 === n || (void 0 === n && !1 !== r[i])) && (r[i || t] = Oe(e));
                    }
                    const i = (e, t) => W.forEach(e, (e, n) => o(e, n, t));
                    if (W.isPlainObject(e) || e instanceof this.constructor) i(e, t);
                    else if (W.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()))
                        i(
                            ((e) => {
                                const t = {};
                                let n, r, o;
                                return (
                                    e &&
                                        e.split("\n").forEach(function (e) {
                                            (o = e.indexOf(":")),
                                                (n = e.substring(0, o).trim().toLowerCase()),
                                                (r = e.substring(o + 1).trim()),
                                                !n || (t[n] && Ee[n]) || ("set-cookie" === n ? (t[n] ? t[n].push(r) : (t[n] = [r])) : (t[n] = t[n] ? t[n] + ", " + r : r));
                                        }),
                                    t
                                );
                            })(e),
                            t
                        );
                    else if (W.isHeaders(e)) for (const [t, r] of e.entries()) o(r, t, n);
                    else null != e && o(t, e, n);
                    return this;
                }
                get(e, t) {
                    if ((e = Re(e))) {
                        const n = W.findKey(this, e);
                        if (n) {
                            const e = this[n];
                            if (!t) return e;
                            if (!0 === t)
                                return (function (e) {
                                    const t = Object.create(null),
                                        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                                    let r;
                                    for (; (r = n.exec(e)); ) t[r[1]] = r[2];
                                    return t;
                                })(e);
                            if (W.isFunction(t)) return t.call(this, e, n);
                            if (W.isRegExp(t)) return t.exec(e);
                            throw new TypeError("parser must be boolean|regexp|function");
                        }
                    }
                }
                has(e, t) {
                    if ((e = Re(e))) {
                        const n = W.findKey(this, e);
                        return !(!n || void 0 === this[n] || (t && !Se(0, this[n], n, t)));
                    }
                    return !1;
                }
                delete(e, t) {
                    const n = this;
                    let r = !1;
                    function o(e) {
                        if ((e = Re(e))) {
                            const o = W.findKey(n, e);
                            !o || (t && !Se(0, n[o], o, t)) || (delete n[o], (r = !0));
                        }
                    }
                    return W.isArray(e) ? e.forEach(o) : o(e), r;
                }
                clear(e) {
                    const t = Object.keys(this);
                    let n = t.length,
                        r = !1;
                    for (; n--; ) {
                        const o = t[n];
                        (e && !Se(0, this[o], o, e, !0)) || (delete this[o], (r = !0));
                    }
                    return r;
                }
                normalize(e) {
                    const t = this,
                        n = {};
                    return (
                        W.forEach(this, (r, o) => {
                            const i = W.findKey(n, o);
                            if (i) return (t[i] = Oe(r)), void delete t[o];
                            const a = e
                                ? (function (e) {
                                      return e
                                          .trim()
                                          .toLowerCase()
                                          .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
                                  })(o)
                                : String(o).trim();
                            a !== o && delete t[o], (t[a] = Oe(r)), (n[a] = !0);
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
                        W.forEach(this, (n, r) => {
                            null != n && !1 !== n && (t[r] = e && W.isArray(n) ? n.join(", ") : n);
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
                    const n = new this(e);
                    return t.forEach((e) => n.set(e)), n;
                }
                static accessor(e) {
                    const t = (this[Te] = this[Te] = { accessors: {} }).accessors,
                        n = this.prototype;
                    function r(e) {
                        const r = Re(e);
                        t[r] ||
                            (!(function (e, t) {
                                const n = W.toCamelCase(" " + t);
                                ["get", "set", "has"].forEach((r) => {
                                    Object.defineProperty(e, r + n, {
                                        value: function (e, n, o) {
                                            return this[r].call(this, t, e, n, o);
                                        },
                                        configurable: !0,
                                    });
                                });
                            })(n, e),
                            (t[r] = !0));
                    }
                    return W.isArray(e) ? e.forEach(r) : r(e), this;
                }
            }
            Ae.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]),
                W.reduceDescriptors(Ae.prototype, ({ value: e }, t) => {
                    let n = t[0].toUpperCase() + t.slice(1);
                    return {
                        get: () => e,
                        set(e) {
                            this[n] = e;
                        },
                    };
                }),
                W.freezeMethods(Ae);
            const Ce = Ae;
            function Be(e, t) {
                const n = this || ve,
                    r = t || n,
                    o = Ce.from(r.headers);
                let i = r.data;
                return (
                    W.forEach(e, function (e) {
                        i = e.call(n, i, o.normalize(), t ? t.status : void 0);
                    }),
                    o.normalize(),
                    i
                );
            }
            function xe(e) {
                return !(!e || !e.__CANCEL__);
            }
            function De(e, t, n) {
                Y.call(this, null == e ? "canceled" : e, Y.ERR_CANCELED, t, n), (this.name = "CanceledError");
            }
            W.inherits(De, Y, { __CANCEL__: !0 });
            const qe = De;
            function Pe(e, t, n) {
                const r = n.config.validateStatus;
                n.status && r && !r(n.status) ? t(new Y("Request failed with status code " + n.status, [Y.ERR_BAD_REQUEST, Y.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n)) : e(n);
            }
            const Ne = function (e, t) {
                e = e || 10;
                const n = new Array(e),
                    r = new Array(e);
                let o,
                    i = 0,
                    a = 0;
                return (
                    (t = void 0 !== t ? t : 1e3),
                    function (s) {
                        const c = Date.now(),
                            l = r[a];
                        o || (o = c), (n[i] = s), (r[i] = c);
                        let u = a,
                            d = 0;
                        for (; u !== i; ) (d += n[u++]), (u %= e);
                        if (((i = (i + 1) % e), i === a && (a = (a + 1) % e), c - o < t)) return;
                        const p = l && c - l;
                        return p ? Math.round((1e3 * d) / p) : void 0;
                    }
                );
            };
            const $e = function (e, t) {
                    let n,
                        r,
                        o = 0,
                        i = 1e3 / t;
                    const a = (t, i = Date.now()) => {
                        (o = i), (n = null), r && (clearTimeout(r), (r = null)), e.apply(null, t);
                    };
                    return [
                        (...e) => {
                            const t = Date.now(),
                                s = t - o;
                            s >= i
                                ? a(e, t)
                                : ((n = e),
                                  r ||
                                      (r = setTimeout(() => {
                                          (r = null), a(n);
                                      }, i - s)));
                        },
                        () => n && a(n),
                    ];
                },
                Ue = (e, t, n = 3) => {
                    let r = 0;
                    const o = Ne(50, 250);
                    return $e((n) => {
                        const i = n.loaded,
                            a = n.lengthComputable ? n.total : void 0,
                            s = i - r,
                            c = o(s);
                        r = i;
                        e({ loaded: i, total: a, progress: a ? i / a : void 0, bytes: s, rate: c || void 0, estimated: c && a && i <= a ? (a - i) / c : void 0, event: n, lengthComputable: null != a, [t ? "download" : "upload"]: !0 });
                    }, n);
                },
                Fe = (e, t) => {
                    const n = null != e;
                    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
                },
                ke = (e) => (...t) => W.asap(() => e(...t)),
                _e = ge.hasStandardBrowserEnv
                    ? (function () {
                          const e = /(msie|trident)/i.test(navigator.userAgent),
                              t = document.createElement("a");
                          let n;
                          function r(n) {
                              let r = n;
                              return (
                                  e && (t.setAttribute("href", r), (r = t.href)),
                                  t.setAttribute("href", r),
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
                              (n = r(window.location.href)),
                              function (e) {
                                  const t = W.isString(e) ? r(e) : e;
                                  return t.protocol === n.protocol && t.host === n.host;
                              }
                          );
                      })()
                    : function () {
                          return !0;
                      },
                Ie = ge.hasStandardBrowserEnv
                    ? {
                          write(e, t, n, r, o, i) {
                              const a = [e + "=" + encodeURIComponent(t)];
                              W.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), W.isString(r) && a.push("path=" + r), W.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), (document.cookie = a.join("; "));
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
            function je(e, t) {
                return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
                    ? (function (e, t) {
                          return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
                      })(e, t)
                    : t;
            }
            const Me = (e) => (e instanceof Ce ? { ...e } : e);
            function mergeOptions(defaults, options = {}) {
                const result = {};
                const isUndefined = (e) => { return typeof e === "undefined" }
                const isPlainObject = (e) => {
                    if (typeof e !== "object") {
                        return false;
                    }
                    
                    const prototype = Object.getPrototypeOf(e);
                    const isNotPlainObject = 
                        (prototype !== null && prototype !== Object.prototype) ||
                        (Symbol.toStringTag in e) ||
                        (Symbol.iterator in e);
                    
                    return !isNotPlainObject;
                }
                const isArray = (e) => {
                    return Array.isArray(e);
                }
                const merge = function e() {
                    const { caseless: t } = (D(this) && this) || {},
                        n = {},
                        r = (r, o) => {
                            const i = (t && B(n, o)) || o;
                            g(n[i]) && g(r) ? (n[i] = e(n[i], r)) : g(r) ? (n[i] = e({}, r)) : d(r) ? (n[i] = r.slice()) : (n[i] = r);
                        };
                    for (let e = 0, t = arguments.length; e < t; e++) arguments[e] && C(arguments[e], r);
                    return n;
                }

                function mergeValues(target, source, caseless) {
                    if (isPlainObject(target) && isPlainObject(source)) {
                        return merge.call({
                            caseless
                        }, target, source);
                    } else if (isPlainObject(source)) {
                        return merge({}, source);
                    } else if (isArray(source)) {
                        return source.slice();
                    }
                    return source;
                }

                function handleUndefined(target, source) {
                    return isUndefined(source) ?
                        (isUndefined(target) ? undefined : mergeValues(undefined, target)) :
                        mergeValues(target, source);
                }

                function handleOptional(target, source) {
                    if (!isUndefined(source)) {
                        return mergeValues(undefined, source);
                    }
                }

                function handleBase(target, source) {
                    return isUndefined(source) ?
                        (isUndefined(target) ? undefined : mergeValues(undefined, target)) :
                        mergeValues(undefined, source);
                }

                function validateOption(target, source, key) {
                    return key in options ?
                        mergeValues(target, source) :
                        key in defaults ?
                        mergeValues(undefined, target) :
                        undefined;
                }

                const optionHandlers = {
                    url: handleOptional,
                    method: handleOptional,
                    data: handleOptional,
                    baseURL: handleBase,
                    transformRequest: handleBase,
                    transformResponse: handleBase,
                    paramsSerializer: handleBase,
                    timeout: handleBase,
                    timeoutMessage: handleBase,
                    withCredentials: handleBase,
                    withXSRFToken: handleBase,
                    adapter: handleBase,
                    responseType: handleBase,
                    xsrfCookieName: handleBase,
                    xsrfHeaderName: handleBase,
                    onUploadProgress: handleBase,
                    onDownloadProgress: handleBase,
                    decompress: handleBase,
                    maxContentLength: handleBase,
                    maxBodyLength: handleBase,
                    beforeRedirect: handleBase,
                    transport: handleBase,
                    httpAgent: handleBase,
                    httpsAgent: handleBase,
                    cancelToken: handleBase,
                    socketPath: handleBase,
                    responseEncoding: handleBase,
                    validateStatus: validateOption,
                    headers: (baseHeaders, customHeaders) => handleUndefined(Me(baseHeaders), Me(customHeaders), true),
                };

                // Merge defaults and options
                Object.keys({ ...defaults, ...options }).forEach(function (key) {
                    const handler = optionHandlers[key] || handleUndefined;
                    const mergedValue = handler(defaults[key], options[key], key);
                
                    // Only add to result if mergedValue is not undefined
                    if (!isUndefined(mergedValue) || handler === validateOption) {
                        result[key] = mergedValue;
                    }
                });

                return result;
            }
            const Ve = (e) => {
                    const t = mergeOptions({}, e);
                    let n,
                        { data: r, withXSRFToken: o, xsrfHeaderName: i, xsrfCookieName: a, headers: s, auth: c } = t;
                    if (
                        ((t.headers = s = Ce.from(s)),
                        (t.url = le(je(t.baseURL, t.url), e.params, e.paramsSerializer)),
                        c && s.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))),
                        W.isFormData(r))
                    )
                        if (ge.hasStandardBrowserEnv || ge.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0);
                        else if (!1 !== (n = s.getContentType())) {
                            const [e, ...t] = n
                                ? n
                                      .split(";")
                                      .map((e) => e.trim())
                                      .filter(Boolean)
                                : [];
                            s.setContentType([e || "multipart/form-data", ...t].join("; "));
                        }
                    if (ge.hasStandardBrowserEnv && (o && W.isFunction(o) && (o = o(t)), o || (!1 !== o && _e(t.url)))) {
                        const e = i && a && Ie.read(a);
                        e && s.set(i, e);
                    }
                    return t;
                },
                ze =
                    "undefined" != typeof XMLHttpRequest &&
                    function (e) {
                        return new Promise(function (t, n) {
                            const r = Ve(e);
                            let o = r.data;
                            const i = Ce.from(r.headers).normalize();
                            let a,
                                s,
                                c,
                                l,
                                u,
                                { responseType: d, onUploadProgress: p, onDownloadProgress: f } = r;
                            function m() {
                                l && l(), u && u(), r.cancelToken && r.cancelToken.unsubscribe(a), r.signal && r.signal.removeEventListener("abort", a);
                            }
                            let h = new XMLHttpRequest();
                            console.log('test--> XMLHttpRequest', h);
                            function y() {
                                if (!h) return;
                                const r = Ce.from("getAllResponseHeaders" in h && h.getAllResponseHeaders());
                                Pe(
                                    function (e) {
                                        t(e), m();
                                    },
                                    function (e) {
                                        n(e), m();
                                    },
                                    { data: d && "text" !== d && "json" !== d ? h.response : h.responseText, status: h.status, statusText: h.statusText, headers: r, config: e, request: h }
                                ),
                                    (h = null);
                            }
                            h.open(r.method.toUpperCase(), r.url, !0),
                                (h.timeout = r.timeout),
                                "onloadend" in h
                                    ? (h.onloadend = y)
                                    : (h.onreadystatechange = function () {
                                          h && 4 === h.readyState && (0 !== h.status || (h.responseURL && 0 === h.responseURL.indexOf("file:"))) && setTimeout(y);
                                      }),
                                (h.onabort = function () {
                                    h && (n(new Y("Request aborted", Y.ECONNABORTED, e, h)), (h = null));
                                }),
                                (h.onerror = function () {
                                    n(new Y("Network Error", Y.ERR_NETWORK, e, h)), (h = null);
                                }),
                                (h.ontimeout = function () {
                                    let t = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
                                    const o = r.transitional || de;
                                    r.timeoutErrorMessage && (t = r.timeoutErrorMessage), n(new Y(t, o.clarifyTimeoutError ? Y.ETIMEDOUT : Y.ECONNABORTED, e, h)), (h = null);
                                }),
                                void 0 === o && i.setContentType(null),
                                "setRequestHeader" in h &&
                                    W.forEach(i.toJSON(), function (e, t) {
                                        h.setRequestHeader(t, e);
                                    }),
                                W.isUndefined(r.withCredentials) || (h.withCredentials = !!r.withCredentials),
                                d && "json" !== d && (h.responseType = r.responseType),
                                f && (([c, u] = Ue(f, !0)), h.addEventListener("progress", c)),
                                p && h.upload && (([s, l] = Ue(p)), h.upload.addEventListener("progress", s), h.upload.addEventListener("loadend", l)),
                                (r.cancelToken || r.signal) &&
                                    ((a = (t) => {
                                        h && (n(!t || t.type ? new qe(null, e, h) : t), h.abort(), (h = null));
                                    }),
                                    r.cancelToken && r.cancelToken.subscribe(a),
                                    r.signal && (r.signal.aborted ? a() : r.signal.addEventListener("abort", a)));
                            const b = (function (e) {
                                const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                                return (t && t[1]) || "";
                            })(r.url);
                            console.log('test-->', r.url);
                            b && -1 === ge.protocols.indexOf(b) ? n(new Y("Unsupported protocol " + b + ":", Y.ERR_BAD_REQUEST, e)) : h.send(o || null);
                        });
                    },
                Je = (e, t) => {
                    let n,
                        r = new AbortController();
                    const o = function (e) {
                        if (!n) {
                            (n = !0), a();
                            const t = e instanceof Error ? e : this.reason;
                            r.abort(t instanceof Y ? t : new qe(t instanceof Error ? t.message : t));
                        }
                    };
                    let i =
                        t &&
                        setTimeout(() => {
                            o(new Y(`timeout ${t} of ms exceeded`, Y.ETIMEDOUT));
                        }, t);
                    const a = () => {
                        e &&
                            (i && clearTimeout(i),
                            (i = null),
                            e.forEach((e) => {
                                e && (e.removeEventListener ? e.removeEventListener("abort", o) : e.unsubscribe(o));
                            }),
                            (e = null));
                    };
                    e.forEach((e) => e && e.addEventListener && e.addEventListener("abort", o));
                    const { signal: s } = r;
                    return (
                        (s.unsubscribe = a),
                        [
                            s,
                            () => {
                                i && clearTimeout(i), (i = null);
                            },
                        ]
                    );
                },
                Ge = function* (e, t) {
                    let n = e.byteLength;
                    if (!t || n < t) return void (yield e);
                    let r,
                        o = 0;
                    for (; o < n; ) (r = o + t), yield e.slice(o, r), (o = r);
                },
                We = (e, t, n, r, o) => {
                    const i = (async function* (e, t, n) {
                        for await (const r of e) yield* Ge(ArrayBuffer.isView(r) ? r : await n(String(r)), t);
                    })(e, t, o);
                    let a,
                        s = 0,
                        c = (e) => {
                            a || ((a = !0), r && r(e));
                        };
                    return new ReadableStream(
                        {
                            async pull(e) {
                                try {
                                    const { done: t, value: r } = await i.next();
                                    if (t) return c(), void e.close();
                                    let o = r.byteLength;
                                    if (n) {
                                        let e = (s += o);
                                        n(e);
                                    }
                                    e.enqueue(new Uint8Array(r));
                                } catch (e) {
                                    throw (c(e), e);
                                }
                            },
                            cancel: (e) => (c(e), i.return()),
                        },
                        { highWaterMark: 2 }
                    );
                },
                Ke = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response,
                Xe = Ke && "function" == typeof ReadableStream,
                Ze = Ke && ("function" == typeof TextEncoder ? ((Ye = new TextEncoder()), (e) => Ye.encode(e)) : async (e) => new Uint8Array(await new Response(e).arrayBuffer()));
            var Ye;
            const Qe = (e, ...t) => {
                    try {
                        return !!e(...t);
                    } catch (e) {
                        return !1;
                    }
                },
                et =
                    Xe &&
                    Qe(() => {
                        let e = !1;
                        const t = new Request(ge.origin, {
                            body: new ReadableStream(),
                            method: "POST",
                            get duplex() {
                                return (e = !0), "half";
                            },
                        }).headers.has("Content-Type");
                        return e && !t;
                    }),
                tt = Xe && Qe(() => W.isReadableStream(new Response("").body)),
                nt = { stream: tt && ((e) => e.body) };
            var rt;
            Ke &&
                ((rt = new Response()),
                ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
                    !nt[e] &&
                        (nt[e] = W.isFunction(rt[e])
                            ? (t) => t[e]()
                            : (t, n) => {
                                  throw new Y(`Response type '${e}' is not supported`, Y.ERR_NOT_SUPPORT, n);
                              });
                }));
            const ot = async (e, t) => {
                    const n = W.toFiniteNumber(e.getContentLength());
                    return null == n
                        ? (async (e) =>
                              null == e
                                  ? 0
                                  : W.isBlob(e)
                                  ? e.size
                                  : W.isSpecCompliantForm(e)
                                  ? (await new Request(e).arrayBuffer()).byteLength
                                  : W.isArrayBufferView(e) || W.isArrayBuffer(e)
                                  ? e.byteLength
                                  : (W.isURLSearchParams(e) && (e += ""), W.isString(e) ? (await Ze(e)).byteLength : void 0))(t)
                        : n;
                },
                it = {
                    http: null,
                    xhr: ze,
                    fetch:
                        Ke &&
                        (async (e) => {
                            let { url: t, method: n, data: r, signal: o, cancelToken: i, timeout: a, onDownloadProgress: s, onUploadProgress: c, responseType: l, headers: u, withCredentials: d = "same-origin", fetchOptions: p } = Ve(e);
                            l = l ? (l + "").toLowerCase() : "text";
                            let f,
                                m,
                                [h, y] = o || i || a ? Je([o, i], a) : [];
                            const b = () => {
                                !f &&
                                    setTimeout(() => {
                                        h && h.unsubscribe();
                                    }),
                                    (f = !0);
                            };
                            let g;
                            try {
                                if (c && et && "get" !== n && "head" !== n && 0 !== (g = await ot(u, r))) {
                                    let e,
                                        n = new Request(t, { method: "POST", body: r, duplex: "half" });
                                    if ((W.isFormData(r) && (e = n.headers.get("content-type")) && u.setContentType(e), n.body)) {
                                        const [e, t] = Fe(g, Ue(ke(c)));
                                        r = We(n.body, 65536, e, t, Ze);
                                    }
                                }
                                W.isString(d) || (d = d ? "include" : "omit"), (m = new Request(t, { ...p, signal: h, method: n.toUpperCase(), headers: u.normalize().toJSON(), body: r, duplex: "half", credentials: d }));
                                let o = await fetch(m);
                                const i = tt && ("stream" === l || "response" === l);
                                if (tt && (s || i)) {
                                    const e = {};
                                    ["status", "statusText", "headers"].forEach((t) => {
                                        e[t] = o[t];
                                    });
                                    const t = W.toFiniteNumber(o.headers.get("content-length")),
                                        [n, r] = (s && Fe(t, Ue(ke(s), !0))) || [];
                                    o = new Response(
                                        We(
                                            o.body,
                                            65536,
                                            n,
                                            () => {
                                                r && r(), i && b();
                                            },
                                            Ze
                                        ),
                                        e
                                    );
                                }
                                l = l || "text";
                                let a = await nt[W.findKey(nt, l) || "text"](o, e);
                                return (
                                    !i && b(),
                                    y && y(),
                                    await new Promise((t, n) => {
                                        Pe(t, n, { data: a, headers: Ce.from(o.headers), status: o.status, statusText: o.statusText, config: e, request: m });
                                    })
                                );
                            } catch (t) {
                                if ((b(), t && "TypeError" === t.name && /fetch/i.test(t.message))) throw Object.assign(new Y("Network Error", Y.ERR_NETWORK, e, m), { cause: t.cause || t });
                                throw Y.from(t, t && t.code, e, m);
                            }
                        }),
                };
            W.forEach(it, (e, t) => {
                if (e) {
                    try {
                        Object.defineProperty(e, "name", { value: t });
                    } catch (e) {}
                    Object.defineProperty(e, "adapterName", { value: t });
                }
            });
            const at = (e) => `- ${e}`,
                st = (e) => W.isFunction(e) || null === e || !1 === e,
                ct = (e) => {
                    e = W.isArray(e) ? e : [e];
                    const { length: t } = e;
                    let n, r;
                    const o = {};
                    for (let i = 0; i < t; i++) {
                        let t;
                        if (((n = e[i]), (r = n), !st(n) && ((r = it[(t = String(n)).toLowerCase()]), void 0 === r))) throw new Y(`Unknown adapter '${t}'`);
                        if (r) break;
                        o[t || "#" + i] = r;
                    }
                    if (!r) {
                        const e = Object.entries(o).map(([e, t]) => `adapter ${e} ` + (!1 === t ? "is not supported by the environment" : "is not available in the build"));
                        let n = t ? (e.length > 1 ? "since :\n" + e.map(at).join("\n") : " " + at(e[0])) : "as no adapter specified";
                        throw new Y("There is no suitable adapter to dispatch the request " + n, "ERR_NOT_SUPPORT");
                    }
                    return r;
                };
            function lt(e) {
                if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)) throw new qe(null, e);
            }
            function ut(e) { // Post, Put, Patch
                lt(e), (e.headers = Ce.from(e.headers)), (e.data = Be.call(e, e.transformRequest)), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1);
                console.log('test--> post request:', e);
                return ct(e.adapter || ve.adapter)(e).then(
                    function (t) {
                        return lt(e), (t.data = Be.call(e, e.transformResponse, t)), (t.headers = Ce.from(t.headers)), t;
                    },
                    function (t) {
                        return xe(t) || (lt(e), t && t.response && ((t.response.data = Be.call(e, e.transformResponse, t.response)), (t.response.headers = Ce.from(t.response.headers)))), Promise.reject(t);
                    }
                );
            }
            const dt = "1.7.3",
                pt = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
                pt[e] = function (n) {
                    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
                };
            });
            const ft = {};
            pt.transitional = function (e, t, n) {
                function r(e, t) {
                    return "[Axios v1.7.3] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
                }
                return (n, o, i) => {
                    if (!1 === e) throw new Y(r(o, " has been removed" + (t ? " in " + t : "")), Y.ERR_DEPRECATED);
                    return t && !ft[o] && ((ft[o] = !0), console.warn(r(o, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(n, o, i);
                };
            };
            const mt = {
                assertOptions: function (options, validators, allowUnknown) {
                    if (typeof options !== "object") {
                        throw new Y("options must be an object", Y.ERR_BAD_OPTION_VALUE);
                    }
            
                    const keys = Object.keys(options);
                    let keyCount = keys.length;
            
                    while (keyCount-- > 0) {
                        const key = keys[keyCount];
                        const validator = validators[key];
            
                        if (validator) {
                            const value = options[key];
                            const isValid = value === undefined || validator(value, key, options);
            
                            if (isValid !== true) {
                                throw new Y(`option ${key} must be ${isValid}`, Y.ERR_BAD_OPTION_VALUE);
                            }
                        } else if (allowUnknown !== true) {
                            throw new Y(`Unknown option ${key}`, Y.ERR_BAD_OPTION);
                        }
                    }
                },
                validators: pt,
            };
            
            const ht = mt.validators;
            class YouTube {
                constructor(config) {
                    this.defaults = config;
                    this.interceptors = {
                        request: new InterceptorManager(),
                        response: new InterceptorManager(),
                    };
                }
            
                async request(urlOrConfig, config) {
                    try {
                        return await this._request(urlOrConfig, config);
                    } catch (error) {
                        this._handleError(error);
                        throw error;
                    }
                }
            
                _handleError(error) {
                    if (error instanceof Error) {
                        let stackTrace;
                        if (Error.captureStackTrace) {
                            Error.captureStackTrace((stackTrace = {}));
                        } else {
                            stackTrace = new Error();
                        }
                        const stack = stackTrace.stack ? stackTrace.stack.replace(/^.+\n/, "") : "";
                        try {
                            if (error.stack) {
                                if (!String(error.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
                                    error.stack += "\n" + stack;
                                }
                            } else {
                                error.stack = stack;
                            }
                        } catch (e) {}
                    }
                }
            
                _request(urlOrConfig, config) {
                    // Determine request configuration
                    if (typeof urlOrConfig === "string") {
                        config = config || {};
                        config.url = urlOrConfig;
                    } else {
                        config = urlOrConfig || {};
                    }
            
                    // Merge options with defaults
                    config = mergeOptions(this.defaults, config);
                    const { transitional, paramsSerializer, headers } = config;
            
                    // Validate transitional options
                    if (transitional !== undefined) {
                        mt.assertOptions(transitional, {
                            silentJSONParsing: ht.transitional(ht.boolean),
                            forcedJSONParsing: ht.transitional(ht.boolean),
                            clarifyTimeoutError: ht.transitional(ht.boolean),
                        }, false);
                    }
            
                    // Handle paramsSerializer
                    if (paramsSerializer != null) {
                        if (W.isFunction(paramsSerializer)) {
                            config.paramsSerializer = { serialize: paramsSerializer };
                        } else {
                            mt.assertOptions(paramsSerializer, {
                                encode: ht.function,
                                serialize: ht.function,
                            }, true);
                        }
                    }
            
                    // Set request method
                    config.method = (config.method || this.defaults.method || "get").toLowerCase();
                    let mergedHeaders = headers && W.merge(headers.common, headers[config.method]);
            
                    // Clean up headers
                    if (headers) {
                        W.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
                            delete headers[method];
                        });
                        config.headers = Ce.concat(mergedHeaders, headers);
                    }
            
                    // Prepare interceptors
                    const requestInterceptors = [];
                    let isSynchronous = true;
            
                    this.interceptors.request.forEach((interceptor) => {
                        if (typeof interceptor.runWhen === "function" && !interceptor.runWhen(config)) return;
                        isSynchronous = isSynchronous && interceptor.synchronous;
                        requestInterceptors.unshift(interceptor.fulfilled, interceptor.rejected);
                    });
            
                    const responseInterceptors = [];
                    this.interceptors.response.forEach((interceptor) => {
                        responseInterceptors.push(interceptor.fulfilled, interceptor.rejected);
                    });
            
                    let promise;
                    let index = 0;
            
                    // Handle asynchronous requests
                    if (!isSynchronous) {
                        const allInterceptors = [ut.bind(this), void 0];
                        allInterceptors.unshift(...requestInterceptors);
                        allInterceptors.push(...responseInterceptors);
                        promise = Promise.resolve(config);
            
                        while (index < allInterceptors.length) {
                            promise = promise.then(allInterceptors[index++], allInterceptors[index++]);
                        }
                        return promise;
                    }
            
                    // Process synchronous interceptors
                    let processedRequest = config;
                    for (index = 0; index < requestInterceptors.length;) {
                        const fulfilled = requestInterceptors[index++];
                        const rejected = requestInterceptors[index++];
            
                        try {
                            processedRequest = fulfilled(processedRequest);
                        } catch (error) {
                            rejected.call(this, error);
                            break;
                        }
                    }
            
                    // Execute the main request
                    try {
                        promise = ut.call(this, processedRequest);
                    } catch (error) {
                        return Promise.reject(error);
                    }
            
                    // Handle response interceptors
                    for (index = 0; index < responseInterceptors.length;) {
                        promise = promise.then(responseInterceptors[index++], responseInterceptors[index++]);
                    }
            
                    return promise;
                }
            
                getUri(config) {
                    const mergedConfig = mergeOptions(this.defaults, config);
                    return le(je(mergedConfig.baseURL, mergedConfig.url), mergedConfig.params, mergedConfig.paramsSerializer);
                }
            }
            // Define HTTP methods for the prototype
            const httpMethods = ["delete", "get", "head", "options"];
            httpMethods.forEach((method) => {
                YouTube.prototype[method] = function (url, options) {
                    const mergedOptions = mergeOptions(options || {}, {
                        method: method,
                        url: url,
                        data: (options || {}).data
                    });
                    return this.request(mergedOptions);
                };
            });

            // Define request methods with support for multipart/form-data
            const dataMethods = ["post", "put", "patch"];
            dataMethods.forEach((method) => {
                const createRequestFunction = (isForm = false) => {
                    return function (url, data, options) {
                        const headers = isForm ? {
                            "Content-Type": "multipart/form-data"
                        } : {};
                        const mergedOptions = mergeOptions(options || {}, {
                            method: method,
                            headers: headers,
                            url: url,
                            data: data
                        });
                        return this.request(mergedOptions);
                    };
                };

                YouTube.prototype[method] = createRequestFunction();
                YouTube.prototype[`${method}Form`] = createRequestFunction(true);
            });
            class gt {
                constructor(e) {
                    if ("function" != typeof e) throw new TypeError("executor must be a function.");
                    let t;
                    this.promise = new Promise(function (e) {
                        t = e;
                    });
                    const n = this;
                    this.promise.then((e) => {
                        if (!n._listeners) return;
                        let t = n._listeners.length;
                        for (; t-- > 0; ) n._listeners[t](e);
                        n._listeners = null;
                    }),
                        (this.promise.then = (e) => {
                            let t;
                            const r = new Promise((e) => {
                                n.subscribe(e), (t = e);
                            }).then(e);
                            return (
                                (r.cancel = function () {
                                    n.unsubscribe(t);
                                }),
                                r
                            );
                        }),
                        e(function (e, r, o) {
                            n.reason || ((n.reason = new qe(e, r, o)), t(n.reason));
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
                    const token = new gt(function (t) {
                        e = t;
                    });
                    console.log('test--> source token', token);
                    return {
                        token,
                        cancel: e,
                    };
                }
            }
            const wt = gt;
            const HttpStatusCode = {
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
            Object.entries(HttpStatusCode).forEach(([e, t]) => {
                HttpStatusCode[t] = e;
            });
            const Et = (function e(t) {
                const n = new YouTube(t),
                    r = o(YouTube.prototype.request, n);
                return (
                    W.extend(r, YouTube.prototype, n, { allOwnKeys: !0 }),
                    W.extend(r, n, null, { allOwnKeys: !0 }),
                    (r.create = function (n) {
                        return e(mergeOptions(t, n));
                    }),
                    r
                );
            })(ve);
                (Et.Axios = YouTube),
                (Et.CanceledError = qe),
                (Et.CancelToken = wt),
                (Et.isCancel = xe),
                (Et.VERSION = dt),
                (Et.toFormData = re),
                (Et.AxiosError = Y),
                (Et.Cancel = Et.CanceledError),
                (Et.all = function (e) {
                    return Promise.all(e);
                }),
                (Et.spread = function (e) {
                    return function (t) {
                        return e.apply(null, t);
                    };
                }),
                (Et.isAxiosError = function (e) {
                    return W.isObject(e) && !0 === e.isAxiosError;
                }),
                (Et.mergeConfig = mergeOptions),
                (Et.AxiosHeaders = Ce),
                (Et.formToJSON = (e) => we(W.isHTMLForm(e) ? new FormData(e) : e)),
                (Et.getAdapter = ct),
                (Et.HttpStatusCode = HttpStatusCode),
                (Et.default = Et);
        },
    },
    (e) => {
        var t = (t) => e((e.s = t));
        t(577), t(3887)
        // t(1502), t(3300);
    },
]);
