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

const ve = {
    transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
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