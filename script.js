const u = (e) => (t) => typeof t === e, {isArray: d} = Array;

const h = u("function")
function Cf(e, t, {
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

function o(e, t) {
    return function () {
        return e.apply(t, arguments);
    };
}
const extend = (e, t, n, {
        allOwnKeys: r
    } = {}) => (
        Cf(
            t,
            (t, r) => {
                n && h(t) ? (e[r] = o(t, n)) : (e[r] = t);
            }, {
                allOwnKeys: r
            }
        ),
        e
    )

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
}

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
            if (isFunction(paramsSerializer)) {
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
        let mergedHeaders = headers && merge(headers.common, headers[config.method]);

        // Clean up headers
        if (headers) {
            forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
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

const ce = function (e, t, n) {
    if (!isObject(e)) throw new TypeError("target must be an object");
    t = t || new FormData();
    const r = (n = toFlatObject(n, { metaTokens: !0, dots: !1, indexes: !1 }, !1, function (e, t) {
            return !isUndefined(t[e]);
        })).metaTokens,
        o = n.visitor || l,
        i = n.dots,
        a = n.indexes,
        s = (n.Blob || ("undefined" != typeof Blob && Blob)) && isSpecCompliantForm(t);
    if (!isFunction(o)) throw new TypeError("visitor must be a function");
    function c(e) {
        if (null === e) return "";
        if (isDate(e)) return e.toISOString();
        if (!s && isBlob(e)) throw new Y("Blob is not supported. Use a Buffer instead.");
        return isArrayBuffer(e) || isTypedArray(e) ? (s && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e)) : e;
    }
    function l(e, n, o) {
        let s = e;
        if (e && !o && "object" == typeof e)
            if (endsWith(n, "{}")) (n = r ? n : n.slice(0, -2)), (e = JSON.stringify(e));
            else if (
                (isArray(e) &&
                    (function (e) {
                        return isArray(e) && !e.some(Q);
                    })(e)) ||
                ((isFileList(e) || endsWith(n, "[]")) && (s = toArray(e)))
            )
                return (
                    (n = ee(n)),
                    s.forEach(function (e, r) {
                        !isUndefined(e) && null !== e && t.append(!0 === a ? te([n], r, i) : null === a ? n : n + "[]", c(e));
                    }),
                    !1
                );
        return !!Q(e) || (t.append(te(o, n, i), c(e)), !1);
    }
    const u = [],
        d = Object.assign(ne, { defaultVisitor: l, convertValue: c, isVisitable: Q });
    if (!isObject(e)) throw new TypeError("data must be an object");
    return (
        (function e(n, r) {
            if (!isUndefined(n)) {
                if (-1 !== u.indexOf(n)) throw Error("Circular reference detected in " + r.join("."));
                u.push(n),
                    forEach(n, function (n, i) {
                        !0 === (!(isUndefined(n) || null === n) && o.call(t, n, isString(i) ? i.trim() : i, r, d)) && e(n, r ? r.concat(i) : [i]);
                    }),
                    u.pop();
            }
        })(e),
        t
    );
};
const de = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
};
function ie(e, t) {
    (this._pairs = []), e && ce(e, this, t);
}
const pe = {
    isBrowser: true,
    classes: {
        URLSearchParams: typeof URLSearchParams !== "undefined" ? URLSearchParams : se,
        FormData: typeof FormData !== "undefined" ? FormData : null,
        Blob: typeof Blob !== "undefined" ? Blob : null,
    },
    protocols: ["http", "https", "file", "blob", "url", "data"],
};

const fe = typeof window !== "undefined" && typeof document !== "undefined";

const he = typeof navigator !== "undefined" ? navigator.product : null;
const me = fe && !["ReactNative", "NativeScript", "NS"].includes(he);

const ye = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";

const be = (fe && window.location.href) || "http://localhost";

const re = {
    hasBrowserEnv: () => fe,
    hasStandardBrowserEnv: () => me,
    hasStandardBrowserWebWorkerEnv: () => ye,
    origin: () => be
}
const ge = { ...re, ...pe };

const ve = {
    transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [
        function (data, config) {
            const contentType = config.getContentType() || "";
            const isJSON = contentType.includes("application/json");
            const isObject = isObject(data);

            // Convert HTMLForm to FormData if applicable
            if (isObject && isHTMLForm(data)) {
                data = new FormData(data);
            }

            // Handle various data types
            if (isFormData(data)) {
                return isJSON ? JSON.stringify(we(data)) : data;
            }
            if (isArrayBuffer(data) || isBuffer(data) || 
                isStream(data) || isFile(data) || 
                isBlob(data) || isReadableStream(data)) {
                return data;
            }
            if (isArrayBufferView(data)) {
                return data.buffer;
            }
            if (isURLSearchParams(data)) {
                config.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
                return data.toString();
            }

            let fileList;
            if (isObject) {
                if (contentType.includes("application/x-www-form-urlencoded")) {
                    return serializeFormData(data, this.formSerializer).toString();
                }
                if ((fileList = isFileList(data)) || contentType.includes("multipart/form-data")) {
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

            if (isResponse(response) || isReadableStream(response)) {
                return response;
            }
            if (response && isString(response) && ((forcedJSONParsing && !this.responseType) || isJSONResponse)) {
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
function applyFunc(e, t) {
    return function () {
        return e.apply(t, arguments);
    };
}
const Et = (function e(t) {
    const n = new YouTube(t),
        r = applyFunc(YouTube.prototype.request, n);
    return (
        extend(r, YouTube.prototype, n, { allOwnKeys: !0 }),
        extend(r, n, null, { allOwnKeys: !0 }),
        (r.create = function (n) {
            return e(mergeOptions(t, n));
        }),
        r
    );
})(ve);
    (Et.Axios = YouTube),
    (Et.default = Et);


    
const defineProperty = Object.defineProperty;

const assignProperty = (obj, key, value) => {
    const propKey = typeof key !== "symbol" ? key + "" : key;
    if (propKey in obj) {
        defineProperty(obj, propKey, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value,
        });
    } else {
        obj[propKey] = value;
    }
};


const ClientData = class e{
    static get(key) {
        const storageKey = `${e.PREFIX}:${key}`;
        const result = localStorage.getItem(storageKey);
        if(!result) return null;

        const item = result[storageKey];

        if (typeof item === "undefined") {
            return null;
        } else if (!item.expiresAt || item.expiresAt > Date.now()) {
            return item.value;
        } else {
            localStorage.removeItem(storageKey);
            return null
        }
    }

    static set(key, value, expiry) {
        const storageKey = `${e.PREFIX}:${key}`;
        const expiresAt = expiry ? Date.now() + 1000 * Math.abs(expiry) : null;
        const data = { value: value, expiresAt: expiresAt };
        localStorage.setItem({ [storageKey]: data }, resolve);
   }

    static remove(key) {
        const storageKey = `${e.PREFIX}:${key}`;
        localStorage.removeItem(storageKey);
    }

    static clear(prefix = "") {
        const result = localStorage.getItem(null);
        const keysToRemove = Object.keys(result).filter((key) => key.startsWith(`${e.PREFIX}:${prefix}`));
        localStorage.removeItem(keysToRemove);
    }
};

assignProperty(ClientData, "PREFIX", "md-youtube-cache");
let clientData = ClientData;

const logConsole = (type, args) => {
    console.log(type, args);
}
const logHist = {
    log: (...args) => {logConsole('n', args)},
    info: (...args) => {logConsole('info', args)},
    success: (...args) => {logConsole('success', args)},
    warn: (...args) => {logConsole('warn', args)},
    error: (...args) => {logConsole('error', args)},
}


const generateTokenVersion = async (videoId) => {
    let response;

    const cachedData = await clientData.get("client-data");
    if (cachedData) {
        logHist.info("Client data retrieved from cache.", cachedData);
        return cachedData;
    }

    logHist.info(`Getting client data from watch page for video ID "${videoId}"`);
    try {
        response = await Et(videoId, {
            params: {
                v: videoId,
                hl: "en",
                bpctr: Math.ceil(Date.now() / 1000).toString()
            }
        });
    } catch (error) {
        logHist.error("Client data request failed.", { error });
        throw new Error(`Client data request failed with status code ${error.response?.status}`);
    }

    const responseData = response.data;
    let token, version = "2.20210623.00.00";

    const tokenMatch = responseData.match(ID_TOKEN_REGEX);
    if (tokenMatch) {
        [, , token] = tokenMatch;
        token = JSON.parse(`{ "token": "${token}" }`).token;
    }

    const versionMatch = responseData.match(INNERTUBE_CONTEXT_VERSION_REGEX);
    if (versionMatch) {
        version = versionMatch[2];
    }

    logHist.success("Client data extracted.", { version, token });
    clientData.set("client-data", { version, token }, 1800);

    return { version, token };
};

const getVideoInfo =  async (videoId, t = null, n = null) => {
    let info, i;
    // if ((logHist.flush(), logHist.info(`Retrieving video information using md-youtube (background) v${r.a}`, { videoId, playerResponse: t, playerJsUrl: n }), t)) info = l(t);
    // else {
        const tokenVersion = await generateTokenVersion(videoId);
        // {token:undefined, version:"2.20240816.01.00"}
        (console.log('-->test token', {token:tokenVersion.token}));
        info = await getInfo(videoId, tokenVersion.version, tokenVersion.token, () => generateTokenVersion(videoId));
    // }
    logHist.success("Video information retrieved.", { info: info }), n || (n = await N(e)), n && (i = await getFunctions(n)), info.formats.sort(y);
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

    const decipherFormat = (input, transformations) => {
        const decodeUrl = (url) => {
            const decodedUrl = new URL(decodeURIComponent(url));
            const signature = decodedUrl.searchParams.get("n");
    
            if (!signature || !transformations || !transformations.nTransform) {
                return url;
            }
    
            const { argNames, funcBody } = transformations.nTransform;
            let transformedSignature = signature;
    
            try {
                transformedSignature = new Function(argNames[0], funcBody)(signature);
            } catch (error) {
                logHist.warn(error.message);
            }
    
            decodedUrl.searchParams.set("n", transformedSignature);
            return decodedUrl.href;
        };
    
        if (input.url) {
            return decodeUrl(input.url);
        }
    
        const cipher = input.signatureCipher || input.cipher;
    
        return cipher ? decodeCipher(cipher) : null;
    
        function decodeCipher(cipher) {
            const params = parseUrlParams(cipher);
    
            if (!params.s || !transformations || !transformations.decipher) {
                return params.url;
            }
    
            const { argNames, funcBody } = transformations.decipher;
            const decodedUrl = new URL(decodeURIComponent(params.url));
            let transformedSignature = "";
    
            try {
                transformedSignature = new Function(argNames[0], funcBody)(params.s);
            } catch (error) {
                logHist.warn(error.message);
            }
    
            decodedUrl.searchParams.set(params.sp || "signature", transformedSignature);
            return decodedUrl.href;
        }
    
        function parseUrlParams(url) {
            const searchParams = new URLSearchParams(url);
            const paramsObj = {};
    
            for (const [key, value] of searchParams.entries()) {
                paramsObj[key] = value;
            }
    
            return paramsObj;
        }
    };
    const getFunctions = async (url) => {
        let adjustedUrl = url;
    
        const cacheKey = (function (input) {
            const match = input.match(r.P);
            return `${b}_${match ? match[1] : input}`;
        })(url);
    
        if (url.startsWith("//")) {
            adjustedUrl = `https://${url}`;
        } else if (url.startsWith("/")) {
            adjustedUrl = `https://www.youtube.com${url}`;
        }
    
        let functionsCache = await ClientData.get(cacheKey);
    
        if (functionsCache !== null) {
            logHist.success(`Functions found in cache for script url "${adjustedUrl}"`, { functions: functionsCache });
            return functionsCache;
        }
    
        logHist.info(`Functions not found in cache for script url "${adjustedUrl}"`);
    
        let html5PlayerSource;
    
        try {
            html5PlayerSource = await (0, o.A)(adjustedUrl);
        } catch (error) {
            logHist.error("Failed to get html5player source.", { error });
            throw new Error("Failed to get html5player source for signature functions.");
        }
    
        const extractedFunctions = this.extractFunctions(html5PlayerSource.data);
    
        if (!extractedFunctions || !extractedFunctions.decipher) {
            logHist.error("Failed to extract signature deciphering functions.");
            throw new Error("Failed to extract signature deciphering functions.");
        }
    
        logHist.success("Signature deciphering functions extracted.", { url: adjustedUrl, functions: extractedFunctions });
        clientData.set(cacheKey, extractedFunctions, 7200);
    
        return extractedFunctions;
    }

    const N = async (e) => {
        var t;
        let n,
            i = await c.get("player-js-url");
        if (i) return logHist.info("Using cached script URL.", { url: i }), i;
        logHist.info(`Getting script URL from watch page for video ID "${e}"`);
        try {
            n = await (0, o.A)(r.W, { params: { v: e, hl: "en", bpctr: Math.ceil(Date.now() / 1e3).toString() } });
        } catch (e) {
            throw (logHist.error("Script URL request failed.", { error: e }), new Error(`Script URL request failed with status code ${null == (t = e.response) ? void 0 : t.status}`));
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
            i ? (logHist.success("Script URL retrieved.", { url: i }), c.set("player-js-url", i, 1800), i) : (logHist.error("Failed to retrieve script URL."), null)
        );
    };
    
    const mediaType = {
        AUDIO_VIDEO: "audioandvideo",
        AUDIO: "audioonly",
        VIDEO: "videoonly",
        IMAGE: "image"
    };
    const iURL = await getFunctions(url)
    const getDownloadList = (function (formats, title, n) { // Get download info
        const info = [];
    
        formats.forEach((format) => {
            // Check for valid itag
            if (typeof B[format.itag] === "undefined") {
                logHist.warn(`Format info for itag "${format.itag}" not found.`, { format });
                return;
            }
    
            // Merge format details
            format = { ...B[format.itag], ...format };
            const decipheredUrl = decipherFormat(format, n);
    
            // Validate deciphered URL
            if (!decipheredUrl) {
                logHist.warn(`URL for itag "${format.itag}" not found.`, { format });
                return;
            }
    
            const decodedUrl = decodeURIComponent(decipheredUrl);
            let url;
    
            // Validate URL
            try {
                url = new URL(decodedUrl);
            } catch {
                logHist.warn(`URL for itag "${format.itag}" is invalid.`, { format });
                return;
            }
    
            // Set URL parameters
            url.searchParams.set("ratebypass", "yes");
            url.searchParams.set("title", title);
    
            // Determine type
            let type = mediaType.AUDIO_VIDEO;
            if (!format.audioBitrate) type = mediaType.VIDEO;
            if (!format.qualityLabel) type = mediaType.AUDIO;
    
            // Prepare video quality details
            let videoQuality = null;
            if (type !== mediaType.AUDIO) {
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
    })(info.formats, info.title, iURL);

    logHist.success("Download formats sorted and parsed.", { downloads: a });
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
    return logHist.success("Video information retrieved.", { videoInfo }), videoInfo;
}

// const getVideoInfo = async (videoId) => {
//     const info = await getInfomation(videoId);
//     return info;
// } 