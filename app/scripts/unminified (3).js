try {
    let e =
            "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                  ? global
                  : "undefined" != typeof globalThis
                    ? globalThis
                    : "undefined" != typeof self
                      ? self
                      : {},
        t = new e.Error().stack;
    t &&
        ((e._sentryDebugIds = e._sentryDebugIds || {}),
        (e._sentryDebugIds[t] = "839fd1bc-dee9-4d07-af4d-594dc44965a4"),
        (e._sentryDebugIdIdentifier = "sentry-dbid-839fd1bc-dee9-4d07-af4d-594dc44965a4"));
} catch (e) {}
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3373],
    {
        25566: function (e) {
            var t,
                n,
                r,
                i = (e.exports = {});
            function defaultSetTimout() {
                throw Error("setTimeout has not been defined");
            }
            function defaultClearTimeout() {
                throw Error("clearTimeout has not been defined");
            }
            function runTimeout(e) {
                if (t === setTimeout) return setTimeout(e, 0);
                if ((t === defaultSetTimout || !t) && setTimeout) return (t = setTimeout), setTimeout(e, 0);
                try {
                    return t(e, 0);
                } catch (n) {
                    try {
                        return t.call(null, e, 0);
                    } catch (n) {
                        return t.call(this, e, 0);
                    }
                }
            }
            !(function () {
                try {
                    t = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
                } catch (e) {
                    t = defaultSetTimout;
                }
                try {
                    n = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
                } catch (e) {
                    n = defaultClearTimeout;
                }
            })();
            var a = [],
                o = !1,
                s = -1;
            function cleanUpNextTick() {
                o && r && ((o = !1), r.length ? (a = r.concat(a)) : (s = -1), a.length && drainQueue());
            }
            function drainQueue() {
                if (!o) {
                    var e = runTimeout(cleanUpNextTick);
                    o = !0;
                    for (var t = a.length; t; ) {
                        for (r = a, a = []; ++s < t; ) r && r[s].run();
                        (s = -1), (t = a.length);
                    }
                    (r = null),
                        (o = !1),
                        (function (e) {
                            if (n === clearTimeout) return clearTimeout(e);
                            if ((n === defaultClearTimeout || !n) && clearTimeout)
                                return (n = clearTimeout), clearTimeout(e);
                            try {
                                n(e);
                            } catch (t) {
                                try {
                                    return n.call(null, e);
                                } catch (t) {
                                    return n.call(this, e);
                                }
                            }
                        })(e);
                }
            }
            function Item(e, t) {
                (this.fun = e), (this.array = t);
            }
            function noop() {}
            (i.nextTick = function (e) {
                var t = Array(arguments.length - 1);
                if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                a.push(new Item(e, t)), 1 !== a.length || o || runTimeout(drainQueue);
            }),
                (Item.prototype.run = function () {
                    this.fun.apply(null, this.array);
                }),
                (i.title = "browser"),
                (i.browser = !0),
                (i.env = {}),
                (i.argv = []),
                (i.version = ""),
                (i.versions = {}),
                (i.on = noop),
                (i.addListener = noop),
                (i.once = noop),
                (i.off = noop),
                (i.removeListener = noop),
                (i.removeAllListeners = noop),
                (i.emit = noop),
                (i.prependListener = noop),
                (i.prependOnceListener = noop),
                (i.listeners = function (e) {
                    return [];
                }),
                (i.binding = function (e) {
                    throw Error("process.binding is not supported");
                }),
                (i.cwd = function () {
                    return "/";
                }),
                (i.chdir = function (e) {
                    throw Error("process.chdir is not supported");
                }),
                (i.umask = function () {
                    return 0;
                });
        },
        43624: function (e, t, n) {
            "use strict";
            n.d(t, {
                X: function () {
                    return r;
                },
            });
            let r = !1;
        },
        73990: function (e, t, n) {
            "use strict";
            let r;
            n.d(t, {
                a: function () {
                    return addHistoryInstrumentationHandler;
                },
            });
            var i = n(78973),
                a = n(26365),
                o = n(59702),
                s = n(37527);
            function addHistoryInstrumentationHandler(e) {
                let t = "history";
                (0, i.Hj)(t, e), (0, i.D2)(t, instrumentHistory);
            }
            function instrumentHistory() {
                s.m.addEventListener("popstate", () => {
                    let e = s.m.location.href,
                        t = r;
                    (r = e),
                        t !== e &&
                            (0, i.rK)("history", {
                                from: t,
                                to: e,
                            });
                }),
                    (0, a.Bf)() &&
                        ((0, o.hl)(s.m.history, "pushState", historyReplacementFunction),
                        (0, o.hl)(s.m.history, "replaceState", historyReplacementFunction));
                function historyReplacementFunction(e) {
                    return function (...t) {
                        let n = t.length > 2 ? t[2] : void 0;
                        if (n) {
                            let e = r,
                                t = String(n);
                            if (((r = t), e === t)) return;
                            (0, i.rK)("history", {
                                from: e,
                                to: t,
                            });
                        }
                        return e.apply(this, t);
                    };
                }
            }
        },
        95689: function (e, t, n) {
            "use strict";
            n.d(t, {
                UK: function () {
                    return addXhrInstrumentationHandler;
                },
                xU: function () {
                    return s;
                },
            });
            var r = n(78973),
                i = n(14430),
                a = n(38660),
                o = n(37527);
            let s = "__sentry_xhr_v3__";
            function addXhrInstrumentationHandler(e) {
                (0, r.Hj)("xhr", e), (0, r.D2)("xhr", instrumentXHR);
            }
            function instrumentXHR() {
                if (!o.m.XMLHttpRequest) return;
                let e = XMLHttpRequest.prototype;
                (e.open = new Proxy(e.open, {
                    apply(e, t, n) {
                        let o = Error(),
                            c = 1e3 * (0, i.ph)(),
                            u = (0, a.HD)(n[0]) ? n[0].toUpperCase() : void 0,
                            l = (function (e) {
                                if ((0, a.HD)(e)) return e;
                                try {
                                    return e.toString();
                                } catch {}
                            })(n[1]);
                        if (!u || !l) return e.apply(t, n);
                        (t[s] = {
                            method: u,
                            url: l,
                            request_headers: {},
                        }),
                            "POST" === u && l.match(/sentry_key/) && (t.__sentry_own_request__ = !0);
                        let onreadystatechangeHandler = () => {
                            let e = t[s];
                            if (e && 4 === t.readyState) {
                                try {
                                    e.status_code = t.status;
                                } catch (e) {}
                                let n = {
                                    endTimestamp: 1e3 * (0, i.ph)(),
                                    startTimestamp: c,
                                    xhr: t,
                                    virtualError: o,
                                };
                                (0, r.rK)("xhr", n);
                            }
                        };
                        return (
                            "onreadystatechange" in t && "function" == typeof t.onreadystatechange
                                ? (t.onreadystatechange = new Proxy(t.onreadystatechange, {
                                      apply: (e, t, n) => (onreadystatechangeHandler(), e.apply(t, n)),
                                  }))
                                : t.addEventListener("readystatechange", onreadystatechangeHandler),
                            (t.setRequestHeader = new Proxy(t.setRequestHeader, {
                                apply(e, t, n) {
                                    let [r, i] = n,
                                        o = t[s];
                                    return (
                                        o && (0, a.HD)(r) && (0, a.HD)(i) && (o.request_headers[r.toLowerCase()] = i),
                                        e.apply(t, n)
                                    );
                                },
                            })),
                            e.apply(t, n)
                        );
                    },
                })),
                    (e.send = new Proxy(e.send, {
                        apply(e, t, n) {
                            let a = t[s];
                            if (!a) return e.apply(t, n);
                            void 0 !== n[0] && (a.body = n[0]);
                            let o = {
                                startTimestamp: 1e3 * (0, i.ph)(),
                                xhr: t,
                            };
                            return (0, r.rK)("xhr", o), e.apply(t, n);
                        },
                    }));
            }
        },
        37527: function (e, t, n) {
            "use strict";
            n.d(t, {
                m: function () {
                    return i;
                },
            });
            var r = n(30641);
            let i = r.GLOBAL_OBJ;
        },
        80165: function (e, t, n) {
            "use strict";
            n.d(t, {
                X: function () {
                    return r;
                },
            });
            let r = !1;
        },
        99481: function (e, t, n) {
            "use strict";
            n.d(t, {
                Wz: function () {
                    return shouldIgnoreOnError;
                },
                m9: function () {
                    return c;
                },
                re: function () {
                    return function wrap(e, t = {}) {
                        if ("function" != typeof e) return e;
                        try {
                            let t = e.__sentry_wrapped__;
                            if (t) {
                                if ("function" == typeof t) return t;
                                return e;
                            }
                            if ((0, i.HK)(e)) return e;
                        } catch (t) {
                            return e;
                        }
                        let sentryWrapped = function (...n) {
                            try {
                                let r = n.map((e) => wrap(e, t));
                                return e.apply(this, r);
                            } catch (e) {
                                throw (
                                    (u++,
                                    setTimeout(() => {
                                        u--;
                                    }),
                                    (0, a.$e)((r) => {
                                        r.addEventProcessor(
                                            (e) => (
                                                t.mechanism &&
                                                    ((0, o.Db)(e, void 0, void 0), (0, o.EG)(e, t.mechanism)),
                                                (e.extra = {
                                                    ...e.extra,
                                                    arguments: n,
                                                }),
                                                e
                                            )
                                        ),
                                            (0, s.Tb)(e);
                                    }),
                                    e)
                                );
                            }
                        };
                        try {
                            for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (sentryWrapped[t] = e[t]);
                        } catch {}
                        (0, i.$Q)(sentryWrapped, e), (0, i.xp)(e, "__sentry_wrapped__", sentryWrapped);
                        try {
                            let t = Object.getOwnPropertyDescriptor(sentryWrapped, "name");
                            t.configurable &&
                                Object.defineProperty(sentryWrapped, "name", {
                                    get: () => e.name,
                                });
                        } catch {}
                        return sentryWrapped;
                    };
                },
            });
            var r = n(30641),
                i = n(59702),
                a = n(40600),
                o = n(22473),
                s = n(88808);
            let c = r.GLOBAL_OBJ,
                u = 0;
            function shouldIgnoreOnError() {
                return u > 0;
            }
        },
        64947: function (e, t, n) {
            "use strict";
            let r, i, a, o;
            n.d(t, {
                nV: function () {
                    return getDefaultIntegrations;
                },
                S1: function () {
                    return init;
                },
                jp: function () {
                    return showReportDialog;
                },
            });
            var s = n(92543),
                c = n(96817),
                u = n(54996),
                l = n(22473),
                d = n(82314);
            function getPossibleEventMessages(e) {
                let t = [];
                e.message && t.push(e.message);
                try {
                    let n = e.exception.values[e.exception.values.length - 1];
                    n?.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
                } catch (e) {}
                return t;
            }
            let p = [
                    /^Script error\.?$/,
                    /^Javascript error: Script error\.? on line 0$/,
                    /^ResizeObserver loop completed with undelivered notifications.$/,
                    /^Cannot redefine property: googletag$/,
                    /^Can't find variable: gmo$/,
                    "undefined is not an object (evaluating 'a.L')",
                    'can\'t redefine non-configurable property "solana"',
                    "vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)",
                    "Can't find variable: _AutofillCallbackHandler",
                    /^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,
                    /^Java exception was raised during method invocation$/,
                ],
                f = (0, c._I)((e = {}) => ({
                    name: "InboundFilters",
                    processEvent(t, n, r) {
                        var i;
                        let a = r.getOptions(),
                            o = (function (e = {}, t = {}) {
                                return {
                                    allowUrls: [...(e.allowUrls || []), ...(t.allowUrls || [])],
                                    denyUrls: [...(e.denyUrls || []), ...(t.denyUrls || [])],
                                    ignoreErrors: [
                                        ...(e.ignoreErrors || []),
                                        ...(t.ignoreErrors || []),
                                        ...(e.disableErrorDefaults ? [] : p),
                                    ],
                                    ignoreTransactions: [
                                        ...(e.ignoreTransactions || []),
                                        ...(t.ignoreTransactions || []),
                                    ],
                                    ignoreInternal: void 0 === e.ignoreInternal || e.ignoreInternal,
                                };
                            })(e, a);
                        return (
                            o.ignoreInternal &&
                            (function (e) {
                                try {
                                    return "SentryError" === e.exception.values[0].type;
                                } catch (e) {}
                                return !1;
                            })(t)
                                ? (s.X &&
                                      u.kg.warn(`Event dropped due to being internal Sentry Error.
Event: ${(0, l.jH)(t)}`),
                                  0)
                                : ((i = o.ignoreErrors),
                                    !t.type &&
                                        i &&
                                        i.length &&
                                        getPossibleEventMessages(t).some((e) => (0, d.U0)(e, i)))
                                  ? (s.X &&
                                        u.kg.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${(0, l.jH)(t)}`),
                                    0)
                                  : !t.type &&
                                      t.exception?.values?.length &&
                                      !t.message &&
                                      !t.exception.values.some(
                                          (e) => e.stacktrace || (e.type && "Error" !== e.type) || e.value
                                      )
                                    ? (s.X &&
                                          u.kg
                                              .warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${(0, l.jH)(t)}`),
                                      0)
                                    : !(function (e, t) {
                                            if ("transaction" !== e.type || !t || !t.length) return !1;
                                            let n = e.transaction;
                                            return !!n && (0, d.U0)(n, t);
                                        })(t, o.ignoreTransactions)
                                      ? !(function (e, t) {
                                            if (!t?.length) return !1;
                                            let n = _getEventFilterUrl(e);
                                            return !!n && (0, d.U0)(n, t);
                                        })(t, o.denyUrls)
                                          ? (function (e, t) {
                                                if (!t?.length) return !0;
                                                let n = _getEventFilterUrl(e);
                                                return !n || (0, d.U0)(n, t);
                                            })(t, o.allowUrls) ||
                                            (s.X &&
                                                u.kg
                                                    .warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${(0, l.jH)(t)}.
Url: ${_getEventFilterUrl(t)}`),
                                            0)
                                          : (s.X &&
                                                u.kg.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${(0, l.jH)(t)}.
Url: ${_getEventFilterUrl(t)}`),
                                            0)
                                      : (s.X &&
                                            u.kg
                                                .warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${(0, l.jH)(t)}`),
                                        0)
                        )
                            ? t
                            : null;
                    },
                }));
            function _getEventFilterUrl(e) {
                try {
                    let t;
                    try {
                        t = e.exception.values[0].stacktrace.frames;
                    } catch (e) {}
                    return t
                        ? (function (e = []) {
                              for (let t = e.length - 1; t >= 0; t--) {
                                  let n = e[t];
                                  if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename)
                                      return n.filename || null;
                              }
                              return null;
                          })(t)
                        : null;
                } catch (t) {
                    return s.X && u.kg.error(`Cannot extract url for event ${(0, l.jH)(e)}`), null;
                }
            }
            var m = n(40600),
                g = n(59702);
            let h = new WeakMap(),
                _ = (0, c._I)(() => ({
                    name: "FunctionToString",
                    setupOnce() {
                        r = Function.prototype.toString;
                        try {
                            Function.prototype.toString = function (...e) {
                                let t = (0, g.HK)(this),
                                    n = h.has((0, m.s3)()) && void 0 !== t ? t : this;
                                return r.apply(n, e);
                            };
                        } catch {}
                    },
                    setup(e) {
                        h.set(e, !0);
                    },
                }));
            var v = n(15919);
            let y = (0, c._I)(() => {
                let e;
                return {
                    name: "Dedupe",
                    processEvent(t) {
                        if (t.type) return t;
                        try {
                            var n;
                            if (
                                (n = e) &&
                                ((function (e, t) {
                                    let n = e.message,
                                        r = t.message;
                                    return !!(
                                        (n || r) &&
                                        (!n || r) &&
                                        (n || !r) &&
                                        n === r &&
                                        _isSameFingerprint(e, t) &&
                                        _isSameStacktrace(e, t)
                                    );
                                })(t, n) ||
                                    (function (e, t) {
                                        let n = _getExceptionFromEvent(t),
                                            r = _getExceptionFromEvent(e);
                                        return !!(
                                            n &&
                                            r &&
                                            n.type === r.type &&
                                            n.value === r.value &&
                                            _isSameFingerprint(e, t) &&
                                            _isSameStacktrace(e, t)
                                        );
                                    })(t, n))
                            )
                                return (
                                    s.X &&
                                        u.kg.warn(
                                            "Event dropped due to being a duplicate of previously captured event."
                                        ),
                                    null
                                );
                        } catch (e) {}
                        return (e = t);
                    },
                };
            });
            function _isSameStacktrace(e, t) {
                let n = (0, v.Fr)(e),
                    r = (0, v.Fr)(t);
                if (!n && !r) return !0;
                if ((n && !r) || (!n && r) || r.length !== n.length) return !1;
                for (let e = 0; e < r.length; e++) {
                    let t = r[e],
                        i = n[e];
                    if (
                        t.filename !== i.filename ||
                        t.lineno !== i.lineno ||
                        t.colno !== i.colno ||
                        t.function !== i.function
                    )
                        return !1;
                }
                return !0;
            }
            function _isSameFingerprint(e, t) {
                let n = e.fingerprint,
                    r = t.fingerprint;
                if (!n && !r) return !0;
                if ((n && !r) || (!n && r)) return !1;
                try {
                    return !(n.join("") !== r.join(""));
                } catch (e) {
                    return !1;
                }
            }
            function _getExceptionFromEvent(e) {
                return e.exception?.values && e.exception.values[0];
            }
            var S = n(46848),
                b = n(26365),
                E = n(88808),
                T = n(99913);
            function getBaseApiEndpoint(e) {
                let t = e.protocol ? `${e.protocol}:` : "",
                    n = e.port ? `:${e.port}` : "";
                return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
            }
            var x = n(62779),
                k = n(74802),
                w = n(68712),
                I = n(16802),
                O = n(61591),
                C = n(14430);
            let SentryError = class SentryError extends Error {
                constructor(e, t = "warn") {
                    super(e), (this.message = e), (this.logLevel = t);
                }
            };
            var A = n(38660),
                P = n(9831),
                D = n(76605),
                $ = n(96519),
                L = n(28552),
                R = n(18887),
                F = n(9804);
            let N = "Not capturing exception because it's already been captured.",
                H = "Discarded session because of missing or non-string release";
            let Client = class Client {
                constructor(e) {
                    if (
                        ((this._options = e),
                        (this._integrations = {}),
                        (this._numProcessing = 0),
                        (this._outcomes = {}),
                        (this._hooks = {}),
                        (this._eventProcessors = []),
                        e.dsn
                            ? (this._dsn = (0, T.vK)(e.dsn))
                            : s.X && u.kg.warn("No DSN provided, client will not send events."),
                        this._dsn)
                    ) {
                        var t, n, r;
                        let i =
                            ((t = this._dsn),
                            (n = e.tunnel),
                            (r = e._metadata ? e._metadata.sdk : void 0),
                            n ||
                                `${getBaseApiEndpoint(t)}${t.projectId}/envelope/?${(function (e, t) {
                                    let n = {
                                        sentry_version: "7",
                                    };
                                    return (
                                        e.publicKey && (n.sentry_key = e.publicKey),
                                        t && (n.sentry_client = `${t.name}/${t.version}`),
                                        new URLSearchParams(n).toString()
                                    );
                                })(t, r)}`);
                        this._transport = e.transport({
                            tunnel: this._options.tunnel,
                            recordDroppedEvent: this.recordDroppedEvent.bind(this),
                            ...e.transportOptions,
                            url: i,
                        });
                    }
                }
                captureException(e, t, n) {
                    let r = (0, l.DM)();
                    if ((0, l.YO)(e)) return s.X && u.kg.log(N), r;
                    let i = {
                        event_id: r,
                        ...t,
                    };
                    return (
                        this._process(this.eventFromException(e, i).then((e) => this._captureEvent(e, i, n))),
                        i.event_id
                    );
                }
                captureMessage(e, t, n, r) {
                    let i = {
                            event_id: (0, l.DM)(),
                            ...n,
                        },
                        a = (0, A.Le)(e) ? e : String(e),
                        o = (0, A.pt)(e) ? this.eventFromMessage(a, t, i) : this.eventFromException(e, i);
                    return this._process(o.then((e) => this._captureEvent(e, i, r))), i.event_id;
                }
                captureEvent(e, t, n) {
                    let r = (0, l.DM)();
                    if (t?.originalException && (0, l.YO)(t.originalException)) return s.X && u.kg.log(N), r;
                    let i = {
                            event_id: r,
                            ...t,
                        },
                        a = e.sdkProcessingMetadata || {},
                        o = a.capturedSpanScope,
                        c = a.capturedSpanIsolationScope;
                    return this._process(this._captureEvent(e, i, o || n, c)), i.event_id;
                }
                captureSession(e) {
                    this.sendSession(e),
                        (0, w.CT)(e, {
                            init: !1,
                        });
                }
                getDsn() {
                    return this._dsn;
                }
                getOptions() {
                    return this._options;
                }
                getSdkMetadata() {
                    return this._options._metadata;
                }
                getTransport() {
                    return this._transport;
                }
                flush(e) {
                    let t = this._transport;
                    return t
                        ? (this.emit("flush"),
                          this._isClientDoneProcessing(e).then((n) => t.flush(e).then((e) => n && e)))
                        : (0, P.WD)(!0);
                }
                close(e) {
                    return this.flush(e).then((e) => ((this.getOptions().enabled = !1), this.emit("close"), e));
                }
                getEventProcessors() {
                    return this._eventProcessors;
                }
                addEventProcessor(e) {
                    this._eventProcessors.push(e);
                }
                init() {
                    (this._isEnabled() ||
                        this._options.integrations.some(({ name: e }) => e.startsWith("Spotlight"))) &&
                        this._setupIntegrations();
                }
                getIntegrationByName(e) {
                    return this._integrations[e];
                }
                addIntegration(e) {
                    let t = this._integrations[e.name];
                    (0, c.m7)(this, e, this._integrations), t || (0, c.uf)(this, [e]);
                }
                sendEvent(e, t = {}) {
                    this.emit("beforeSendEvent", e, t);
                    let n = (0, k.Mq)(e, this._dsn, this._options._metadata, this._options.tunnel);
                    for (let e of t.attachments || []) n = (0, O.BO)(n, (0, O.zQ)(e));
                    let r = this.sendEnvelope(n);
                    r && r.then((t) => this.emit("afterSendEvent", e, t), null);
                }
                sendSession(e) {
                    let { release: t, environment: n = x.J } = this._options;
                    if ("aggregates" in e) {
                        let r = e.attrs || {};
                        if (!r.release && !t) {
                            s.X && u.kg.warn(H);
                            return;
                        }
                        (r.release = r.release || t), (r.environment = r.environment || n), (e.attrs = r);
                    } else {
                        if (!e.release && !t) {
                            s.X && u.kg.warn(H);
                            return;
                        }
                        (e.release = e.release || t), (e.environment = e.environment || n);
                    }
                    this.emit("beforeSendSession", e);
                    let r = (0, k.Q3)(e, this._dsn, this._options._metadata, this._options.tunnel);
                    this.sendEnvelope(r);
                }
                recordDroppedEvent(e, t, n = 1) {
                    if (this._options.sendClientReports) {
                        let r = `${e}:${t}`;
                        s.X && u.kg.log(`Recording outcome: "${r}"${n > 1 ? ` (${n} times)` : ""}`),
                            (this._outcomes[r] = (this._outcomes[r] || 0) + n);
                    }
                }
                on(e, t) {
                    let n = (this._hooks[e] = this._hooks[e] || []);
                    return (
                        n.push(t),
                        () => {
                            let e = n.indexOf(t);
                            e > -1 && n.splice(e, 1);
                        }
                    );
                }
                emit(e, ...t) {
                    let n = this._hooks[e];
                    n && n.forEach((e) => e(...t));
                }
                sendEnvelope(e) {
                    return (this.emit("beforeEnvelope", e), this._isEnabled() && this._transport)
                        ? this._transport
                              .send(e)
                              .then(null, (e) => (s.X && u.kg.error("Error while sending envelope:", e), e))
                        : (s.X && u.kg.error("Transport disabled"), (0, P.WD)({}));
                }
                _setupIntegrations() {
                    let { integrations: e } = this._options;
                    (this._integrations = (0, c.q4)(this, e)), (0, c.uf)(this, e);
                }
                _updateSessionFromEvent(e, t) {
                    let n = "fatal" === t.level,
                        r = !1,
                        i = t.exception?.values;
                    if (i)
                        for (let e of ((r = !0), i)) {
                            let t = e.mechanism;
                            if (t?.handled === !1) {
                                n = !0;
                                break;
                            }
                        }
                    let a = "ok" === e.status,
                        o = (a && 0 === e.errors) || (a && n);
                    o &&
                        ((0, w.CT)(e, {
                            ...(n && {
                                status: "crashed",
                            }),
                            errors: e.errors || Number(r || n),
                        }),
                        this.captureSession(e));
                }
                _isClientDoneProcessing(e) {
                    return new P.cW((t) => {
                        let n = 0,
                            r = setInterval(() => {
                                0 == this._numProcessing
                                    ? (clearInterval(r), t(!0))
                                    : ((n += 1), e && n >= e && (clearInterval(r), t(!1)));
                            }, 1);
                    });
                }
                _isEnabled() {
                    return !1 !== this.getOptions().enabled && void 0 !== this._transport;
                }
                _prepareEvent(e, t, n, r) {
                    let i = this.getOptions(),
                        a = Object.keys(this._integrations);
                    return (
                        !t.integrations && a?.length && (t.integrations = a),
                        this.emit("preprocessEvent", e, t),
                        e.type || r.setLastEventId(e.event_id || t.event_id),
                        (0, L.R)(i, e, t, n, this, r).then((e) => {
                            if (null === e) return e;
                            this.emit("postprocessEvent", e, t),
                                (e.contexts = {
                                    trace: (0, m.XX)(n),
                                    ...e.contexts,
                                });
                            let r = (0, I.CG)(this, n);
                            return (
                                (e.sdkProcessingMetadata = {
                                    dynamicSamplingContext: r,
                                    ...e.sdkProcessingMetadata,
                                }),
                                e
                            );
                        })
                    );
                }
                _captureEvent(e, t = {}, n = (0, m.nZ)(), r = (0, m.aF)()) {
                    return (
                        s.X &&
                            isErrorEvent(e) &&
                            u.kg.log(`Captured error event \`${getPossibleEventMessages(e)[0] || "<unknown>"}\``),
                        this._processEvent(e, t, n, r).then(
                            (e) => e.event_id,
                            (e) => {
                                s.X &&
                                    (e instanceof SentryError && "log" === e.logLevel
                                        ? u.kg.log(e.message)
                                        : u.kg.warn(e));
                            }
                        )
                    );
                }
                _processEvent(e, t, n, r) {
                    let i = this.getOptions(),
                        { sampleRate: a } = i,
                        o = isTransactionEvent(e),
                        s = isErrorEvent(e),
                        c = e.type || "error",
                        u = `before send for type \`${c}\``,
                        l = void 0 === a ? void 0 : (0, $.o)(a);
                    if (s && "number" == typeof l && Math.random() > l)
                        return (
                            this.recordDroppedEvent("sample_rate", "error"),
                            (0, P.$2)(
                                new SentryError(
                                    `Discarding event because it's not included in the random sample (sampling rate = ${a})`,
                                    "log"
                                )
                            )
                        );
                    let d = "replay_event" === c ? "replay" : c;
                    return this._prepareEvent(e, t, n, r)
                        .then((e) => {
                            if (null === e)
                                throw (
                                    (this.recordDroppedEvent("event_processor", d),
                                    new SentryError("An event processor returned `null`, will not send event.", "log"))
                                );
                            let n = t.data && !0 === t.data.__sentry__;
                            if (n) return e;
                            let r = (function (e, t, n, r) {
                                let { beforeSend: i, beforeSendTransaction: a, beforeSendSpan: o } = t,
                                    s = n;
                                if (isErrorEvent(s) && i) return i(s, r);
                                if (isTransactionEvent(s)) {
                                    if (o) {
                                        let e = o(
                                            (function (e) {
                                                let {
                                                    trace_id: t,
                                                    parent_span_id: n,
                                                    span_id: r,
                                                    status: i,
                                                    origin: a,
                                                    data: o,
                                                    op: s,
                                                } = e.contexts?.trace ?? {};
                                                return (0, g.Jr)({
                                                    data: o ?? {},
                                                    description: e.transaction,
                                                    op: s,
                                                    parent_span_id: n,
                                                    span_id: r ?? "",
                                                    start_timestamp: e.start_timestamp ?? 0,
                                                    status: i,
                                                    timestamp: e.timestamp,
                                                    trace_id: t ?? "",
                                                    origin: a,
                                                    profile_id: o?.[F.p6],
                                                    exclusive_time: o?.[F.JQ],
                                                    measurements: e.measurements,
                                                    is_segment: !0,
                                                });
                                            })(s)
                                        );
                                        if (
                                            (e
                                                ? (s = (0, D.T)(
                                                      n,
                                                      (function (e) {
                                                          let t = {
                                                              type: "transaction",
                                                              timestamp: e.timestamp,
                                                              start_timestamp: e.start_timestamp,
                                                              transaction: e.description,
                                                              contexts: {
                                                                  trace: {
                                                                      trace_id: e.trace_id,
                                                                      span_id: e.span_id,
                                                                      parent_span_id: e.parent_span_id,
                                                                      op: e.op,
                                                                      status: e.status,
                                                                      origin: e.origin,
                                                                      data: {
                                                                          ...e.data,
                                                                          ...(e.profile_id && {
                                                                              [F.p6]: e.profile_id,
                                                                          }),
                                                                          ...(e.exclusive_time && {
                                                                              [F.JQ]: e.exclusive_time,
                                                                          }),
                                                                      },
                                                                  },
                                                              },
                                                              measurements: e.measurements,
                                                          };
                                                          return (0, g.Jr)(t);
                                                      })(e)
                                                  ))
                                                : (0, R.R6)(),
                                            s.spans)
                                        ) {
                                            let e = [];
                                            for (let t of s.spans) {
                                                let n = o(t);
                                                n ? e.push(n) : ((0, R.R6)(), e.push(t));
                                            }
                                            s.spans = e;
                                        }
                                    }
                                    if (a) {
                                        if (s.spans) {
                                            let e = s.spans.length;
                                            s.sdkProcessingMetadata = {
                                                ...n.sdkProcessingMetadata,
                                                spanCountBeforeProcessing: e,
                                            };
                                        }
                                        return a(s, r);
                                    }
                                }
                                return s;
                            })(0, i, e, t);
                            return (function (e, t) {
                                let n = `${t} must return \`null\` or a valid event.`;
                                if ((0, A.J8)(e))
                                    return e.then(
                                        (e) => {
                                            if (!(0, A.PO)(e) && null !== e) throw new SentryError(n);
                                            return e;
                                        },
                                        (e) => {
                                            throw new SentryError(`${t} rejected with ${e}`);
                                        }
                                    );
                                if (!(0, A.PO)(e) && null !== e) throw new SentryError(n);
                                return e;
                            })(r, u);
                        })
                        .then((i) => {
                            if (null === i) {
                                if ((this.recordDroppedEvent("before_send", d), o)) {
                                    let t = e.spans || [],
                                        n = 1 + t.length;
                                    this.recordDroppedEvent("before_send", "span", n);
                                }
                                throw new SentryError(`${u} returned \`null\`, will not send event.`, "log");
                            }
                            let a = n.getSession() || r.getSession();
                            if ((s && a && this._updateSessionFromEvent(a, i), o)) {
                                let e = i.sdkProcessingMetadata?.spanCountBeforeProcessing || 0,
                                    t = i.spans ? i.spans.length : 0,
                                    n = e - t;
                                n > 0 && this.recordDroppedEvent("before_send", "span", n);
                            }
                            let c = i.transaction_info;
                            return (
                                o &&
                                    c &&
                                    i.transaction !== e.transaction &&
                                    (i.transaction_info = {
                                        ...c,
                                        source: "custom",
                                    }),
                                this.sendEvent(i, t),
                                i
                            );
                        })
                        .then(null, (e) => {
                            if (e instanceof SentryError) throw e;
                            throw (
                                (this.captureException(e, {
                                    data: {
                                        __sentry__: !0,
                                    },
                                    originalException: e,
                                }),
                                new SentryError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${e}`))
                            );
                        });
                }
                _process(e) {
                    this._numProcessing++,
                        e.then(
                            (e) => (this._numProcessing--, e),
                            (e) => (this._numProcessing--, e)
                        );
                }
                _clearOutcomes() {
                    let e = this._outcomes;
                    return (
                        (this._outcomes = {}),
                        Object.entries(e).map(([e, t]) => {
                            let [n, r] = e.split(":");
                            return {
                                reason: n,
                                category: r,
                                quantity: t,
                            };
                        })
                    );
                }
                _flushOutcomes() {
                    s.X && u.kg.log("Flushing outcomes...");
                    let e = this._clearOutcomes();
                    if (0 === e.length) {
                        s.X && u.kg.log("No outcomes to send");
                        return;
                    }
                    if (!this._dsn) {
                        s.X && u.kg.log("No dsn provided, will not send outcomes");
                        return;
                    }
                    s.X && u.kg.log("Sending outcomes:", e);
                    let t = (function (e, t, n) {
                        let r = [
                            {
                                type: "client_report",
                            },
                            {
                                timestamp: (0, C.yW)(),
                                discarded_events: e,
                            },
                        ];
                        return (0, O.Jd)(
                            t
                                ? {
                                      dsn: t,
                                  }
                                : {},
                            [r]
                        );
                    })(e, this._options.tunnel && (0, T.RA)(this._dsn));
                    this.sendEnvelope(t);
                }
            };
            function isErrorEvent(e) {
                return void 0 === e.type;
            }
            function isTransactionEvent(e) {
                return "transaction" === e.type;
            }
            var j = n(70975);
            function addAutoIpAddressToUser(e) {
                e.user?.ip_address === void 0 &&
                    (e.user = {
                        ...e.user,
                        ip_address: "{{auto}}",
                    });
            }
            function addAutoIpAddressToSession(e) {
                "aggregates" in e
                    ? e.attrs?.ip_address === void 0 &&
                      (e.attrs = {
                          ...e.attrs,
                          ip_address: "{{auto}}",
                      })
                    : void 0 === e.ipAddress && (e.ipAddress = "{{auto}}");
            }
            var M = n(87249);
            function exceptionFromError(e, t) {
                let n = parseStackFrames(e, t),
                    r = {
                        type: (function (e) {
                            let t = e?.name;
                            if (!t && isWebAssemblyException(e)) {
                                let t = e.message && Array.isArray(e.message) && 2 == e.message.length;
                                return t ? e.message[0] : "WebAssembly.Exception";
                            }
                            return t;
                        })(t),
                        value: (function (e) {
                            let t = e?.message;
                            return isWebAssemblyException(e)
                                ? Array.isArray(e.message) && 2 == e.message.length
                                    ? e.message[1]
                                    : "wasm exception"
                                : t
                                  ? t.error && "string" == typeof t.error.message
                                      ? t.error.message
                                      : t
                                  : "No error message";
                        })(t),
                    };
                return (
                    n.length &&
                        (r.stacktrace = {
                            frames: n,
                        }),
                    void 0 === r.type && "" === r.value && (r.value = "Unrecoverable error caught"),
                    r
                );
            }
            function eventFromError(e, t) {
                return {
                    exception: {
                        values: [exceptionFromError(e, t)],
                    },
                };
            }
            function parseStackFrames(e, t) {
                let n = t.stacktrace || t.stack || "",
                    r = t && B.test(t.message) ? 1 : 0,
                    i = "number" == typeof t.framesToPop ? t.framesToPop : 0;
                try {
                    return e(n, r, i);
                } catch (e) {}
                return [];
            }
            let B = /Minified React error #\d+;/i;
            function isWebAssemblyException(e) {
                return (
                    "undefined" != typeof WebAssembly &&
                    void 0 !== WebAssembly.Exception &&
                    e instanceof WebAssembly.Exception
                );
            }
            function eventFromUnknownInput(e, t, n, r, i) {
                let a;
                if ((0, A.VW)(t) && t.error) return eventFromError(e, t.error);
                if ((0, A.TX)(t) || (0, A.fm)(t)) {
                    if ("stack" in t) a = eventFromError(e, t);
                    else {
                        let i = t.name || ((0, A.TX)(t) ? "DOMError" : "DOMException"),
                            o = t.message ? `${i}: ${t.message}` : i;
                        (a = eventFromString(e, o, n, r)), (0, l.Db)(a, o);
                    }
                    return (
                        "code" in t &&
                            (a.tags = {
                                ...a.tags,
                                "DOMException.code": `${t.code}`,
                            }),
                        a
                    );
                }
                return (0, A.VZ)(t)
                    ? eventFromError(e, t)
                    : ((0, A.PO)(t) || (0, A.cO)(t)
                          ? (a = (function (e, t, n, r) {
                                let i = (0, m.s3)(),
                                    a = i?.getOptions().normalizeDepth,
                                    o = (function (e) {
                                        for (let t in e)
                                            if (Object.prototype.hasOwnProperty.call(e, t)) {
                                                let n = e[t];
                                                if (n instanceof Error) return n;
                                            }
                                    })(t),
                                    s = {
                                        __serialized__: (0, M.Qy)(t, a),
                                    };
                                if (o)
                                    return {
                                        exception: {
                                            values: [exceptionFromError(e, o)],
                                        },
                                        extra: s,
                                    };
                                let c = {
                                    exception: {
                                        values: [
                                            {
                                                type: (0, A.cO)(t)
                                                    ? t.constructor.name
                                                    : r
                                                      ? "UnhandledRejection"
                                                      : "Error",
                                                value: (function (e, { isUnhandledRejection: t }) {
                                                    let n = (0, g.zf)(e),
                                                        r = t ? "promise rejection" : "exception";
                                                    if ((0, A.VW)(e))
                                                        return `Event \`ErrorEvent\` captured as ${r} with message \`${e.message}\``;
                                                    if ((0, A.cO)(e)) {
                                                        let t = (function (e) {
                                                            try {
                                                                let t = Object.getPrototypeOf(e);
                                                                return t ? t.constructor.name : void 0;
                                                            } catch (e) {}
                                                        })(e);
                                                        return `Event \`${t}\` (type=${e.type}) captured as ${r}`;
                                                    }
                                                    return `Object captured as ${r} with keys: ${n}`;
                                                })(t, {
                                                    isUnhandledRejection: r,
                                                }),
                                            },
                                        ],
                                    },
                                    extra: s,
                                };
                                if (n) {
                                    let t = parseStackFrames(e, n);
                                    t.length &&
                                        (c.exception.values[0].stacktrace = {
                                            frames: t,
                                        });
                                }
                                return c;
                            })(e, t, n, i))
                          : ((a = eventFromString(e, t, n, r)), (0, l.Db)(a, `${t}`, void 0)),
                      (0, l.EG)(a, {
                          synthetic: !0,
                      }),
                      a);
            }
            function eventFromString(e, t, n, r) {
                let i = {};
                if (r && n) {
                    let r = parseStackFrames(e, n);
                    r.length &&
                        (i.exception = {
                            values: [
                                {
                                    value: t,
                                    stacktrace: {
                                        frames: r,
                                    },
                                },
                            ],
                        }),
                        (0, l.EG)(i, {
                            synthetic: !0,
                        });
                }
                if ((0, A.Le)(t)) {
                    let { __sentry_template_string__: e, __sentry_template_values__: n } = t;
                    return (
                        (i.logentry = {
                            message: e,
                            params: n,
                        }),
                        i
                    );
                }
                return (i.message = t), i;
            }
            var U = n(99481);
            let BrowserClient = class BrowserClient extends Client {
                constructor(e) {
                    let t = {
                            parentSpanIsAlwaysRootSpan: !0,
                            ...e,
                        },
                        n = U.m9.SENTRY_SDK_SOURCE || "npm";
                    (0, j.V)(t, "browser", ["browser"], n),
                        super(t),
                        t.sendClientReports &&
                            U.m9.document &&
                            U.m9.document.addEventListener("visibilitychange", () => {
                                "hidden" === U.m9.document.visibilityState && this._flushOutcomes();
                            }),
                        this._options.sendDefaultPii &&
                            (this.on("postprocessEvent", addAutoIpAddressToUser),
                            this.on("beforeSendSession", addAutoIpAddressToSession));
                }
                eventFromException(e, t) {
                    return (function (e, t, n, r) {
                        let i = n?.syntheticException || void 0,
                            a = eventFromUnknownInput(e, t, i, r);
                        return (
                            (0, l.EG)(a), (a.level = "error"), n?.event_id && (a.event_id = n.event_id), (0, P.WD)(a)
                        );
                    })(this._options.stackParser, e, t, this._options.attachStacktrace);
                }
                eventFromMessage(e, t = "info", n) {
                    return (function (e, t, n = "info", r, i) {
                        let a = r?.syntheticException || void 0,
                            o = eventFromString(e, t, a, i);
                        return (o.level = n), r?.event_id && (o.event_id = r.event_id), (0, P.WD)(o);
                    })(this._options.stackParser, e, t, n, this._options.attachStacktrace);
                }
                _prepareEvent(e, t, n, r) {
                    return (e.platform = e.platform || "javascript"), super._prepareEvent(e, t, n, r);
                }
            };
            var X = n(80165),
                J = n(78973),
                G = n(37527);
            function instrumentDOM() {
                if (!G.m.document) return;
                let e = J.rK.bind(null, "dom"),
                    t = makeDOMEventHandler(e, !0);
                G.m.document.addEventListener("click", t, !1),
                    G.m.document.addEventListener("keypress", t, !1),
                    ["EventTarget", "Node"].forEach((t) => {
                        let n = G.m,
                            r = n[t]?.prototype;
                        r?.hasOwnProperty?.("addEventListener") &&
                            ((0, g.hl)(r, "addEventListener", function (t) {
                                return function (n, r, i) {
                                    if ("click" === n || "keypress" == n)
                                        try {
                                            let r = (this.__sentry_instrumentation_handlers__ =
                                                    this.__sentry_instrumentation_handlers__ || {}),
                                                a = (r[n] = r[n] || {
                                                    refCount: 0,
                                                });
                                            if (!a.handler) {
                                                let r = makeDOMEventHandler(e);
                                                (a.handler = r), t.call(this, n, r, i);
                                            }
                                            a.refCount++;
                                        } catch (e) {}
                                    return t.call(this, n, r, i);
                                };
                            }),
                            (0, g.hl)(r, "removeEventListener", function (e) {
                                return function (t, n, r) {
                                    if ("click" === t || "keypress" == t)
                                        try {
                                            let n = this.__sentry_instrumentation_handlers__ || {},
                                                i = n[t];
                                            i &&
                                                (i.refCount--,
                                                i.refCount <= 0 &&
                                                    (e.call(this, t, i.handler, r), (i.handler = void 0), delete n[t]),
                                                0 === Object.keys(n).length &&
                                                    delete this.__sentry_instrumentation_handlers__);
                                        } catch (e) {}
                                    return e.call(this, t, n, r);
                                };
                            }));
                    });
            }
            function makeDOMEventHandler(e, t = !1) {
                return (n) => {
                    if (!n || n._sentryCaptured) return;
                    let r = (function (e) {
                        try {
                            return e.target;
                        } catch (e) {
                            return null;
                        }
                    })(n);
                    if (
                        "keypress" === n.type &&
                        (!r?.tagName || ("INPUT" !== r.tagName && "TEXTAREA" !== r.tagName && !r.isContentEditable))
                    )
                        return;
                    (0, g.xp)(n, "_sentryCaptured", !0), r && !r._sentryId && (0, g.xp)(r, "_sentryId", (0, l.DM)());
                    let s = "keypress" === n.type ? "input" : n.type;
                    !(function (e) {
                        if (e.type !== a) return !1;
                        try {
                            if (!e.target || e.target._sentryId !== o) return !1;
                        } catch (e) {}
                        return !0;
                    })(n) &&
                        (e({
                            event: n,
                            name: s,
                            global: t,
                        }),
                        (a = n.type),
                        (o = r ? r._sentryId : void 0)),
                        clearTimeout(i),
                        (i = G.m.setTimeout(() => {
                            (o = void 0), (a = void 0);
                        }, 1e3));
                };
            }
            var W = n(95689),
                q = n(73990),
                V = n(30641);
            function instrumentConsole() {
                "console" in V.GLOBAL_OBJ &&
                    u.RU.forEach(function (e) {
                        e in V.GLOBAL_OBJ.console &&
                            (0, g.hl)(V.GLOBAL_OBJ.console, e, function (t) {
                                return (
                                    (u.LD[e] = t),
                                    function (...t) {
                                        (0, J.rK)("console", {
                                            args: t,
                                            level: e,
                                        });
                                        let n = u.LD[e];
                                        n?.apply(V.GLOBAL_OBJ.console, t);
                                    }
                                );
                            });
                    });
            }
            var Z = n(56772);
            function addBreadcrumb(e, t) {
                let n = (0, m.s3)(),
                    r = (0, m.aF)();
                if (!n) return;
                let { beforeBreadcrumb: i = null, maxBreadcrumbs: a = 100 } = n.getOptions();
                if (a <= 0) return;
                let o = (0, C.yW)(),
                    s = {
                        timestamp: o,
                        ...e,
                    },
                    c = i ? (0, u.Cf)(() => i(s, t)) : s;
                null !== c && (n.emit && n.emit("beforeAddBreadcrumb", c, t), r.addBreadcrumb(c, a));
            }
            function getBreadcrumbLogLevelFromHttpStatusCode(e) {
                if (void 0 !== e) return e >= 400 && e < 500 ? "warning" : e >= 500 ? "error" : void 0;
            }
            var z = n(10047);
            let K = (0, c._I)((e = {}) => {
                    let t = {
                        console: !0,
                        dom: !0,
                        fetch: !0,
                        history: !0,
                        sentry: !0,
                        xhr: !0,
                        ...e,
                    };
                    return {
                        name: "Breadcrumbs",
                        setup(e) {
                            var n;
                            t.console &&
                                (function (e) {
                                    let t = "console";
                                    (0, J.Hj)(t, e), (0, J.D2)(t, instrumentConsole);
                                })(function (t) {
                                    var n;
                                    if ((0, m.s3)() !== e) return;
                                    let r = {
                                        category: "console",
                                        data: {
                                            arguments: t.args,
                                            logger: "console",
                                        },
                                        level:
                                            "warn" === (n = t.level)
                                                ? "warning"
                                                : ["fatal", "error", "warning", "log", "info", "debug"].includes(n)
                                                  ? n
                                                  : "log",
                                        message: (0, d.nK)(t.args, " "),
                                    };
                                    if ("assert" === t.level) {
                                        if (!1 !== t.args[0]) return;
                                        (r.message = `Assertion failed: ${
                                            (0, d.nK)(t.args.slice(1), " ") || "console.assert"
                                        }`),
                                            (r.data.arguments = t.args.slice(1));
                                    }
                                    addBreadcrumb(r, {
                                        input: t.args,
                                        level: t.level,
                                    });
                                }),
                                t.dom &&
                                    ((n = t.dom),
                                    (0, J.Hj)("dom", function (t) {
                                        let r, i;
                                        if ((0, m.s3)() !== e) return;
                                        let a = "object" == typeof n ? n.serializeAttribute : void 0,
                                            o =
                                                "object" == typeof n && "number" == typeof n.maxStringLength
                                                    ? n.maxStringLength
                                                    : void 0;
                                        o &&
                                            o > 1024 &&
                                            (X.X &&
                                                u.kg.warn(
                                                    `\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`
                                                ),
                                            (o = 1024)),
                                            "string" == typeof a && (a = [a]);
                                        try {
                                            let e = t.event,
                                                n = e && e.target ? e.target : e;
                                            (r = (0, S.Rt)(n, {
                                                keyAttrs: a,
                                                maxStringLength: o,
                                            })),
                                                (i = (0, S.iY)(n));
                                        } catch (e) {
                                            r = "<unknown>";
                                        }
                                        if (0 === r.length) return;
                                        let s = {
                                            category: `ui.${t.name}`,
                                            message: r,
                                        };
                                        i &&
                                            (s.data = {
                                                "ui.component_name": i,
                                            }),
                                            addBreadcrumb(s, {
                                                event: t.event,
                                                name: t.name,
                                                global: t.global,
                                            });
                                    }),
                                    (0, J.D2)("dom", instrumentDOM)),
                                t.xhr &&
                                    (0, W.UK)(function (t) {
                                        if ((0, m.s3)() !== e) return;
                                        let { startTimestamp: n, endTimestamp: r } = t,
                                            i = t.xhr[W.xU];
                                        if (!n || !r || !i) return;
                                        let { method: a, url: o, status_code: s, body: c } = i,
                                            u = {
                                                xhr: t.xhr,
                                                input: c,
                                                startTimestamp: n,
                                                endTimestamp: r,
                                            },
                                            l = {
                                                category: "xhr",
                                                data: {
                                                    method: a,
                                                    url: o,
                                                    status_code: s,
                                                },
                                                type: "http",
                                                level: getBreadcrumbLogLevelFromHttpStatusCode(s),
                                            };
                                        e.emit("beforeOutgoingRequestBreadcrumb", l, u), addBreadcrumb(l, u);
                                    }),
                                t.fetch &&
                                    (0, Z.Uf)(function (t) {
                                        if ((0, m.s3)() !== e) return;
                                        let { startTimestamp: n, endTimestamp: r } = t;
                                        if (
                                            !(
                                                !r ||
                                                (t.fetchData.url.match(/sentry_key/) && "POST" === t.fetchData.method)
                                            )
                                        ) {
                                            if ((t.fetchData.method, t.fetchData.url, t.error)) {
                                                let i = t.fetchData,
                                                    a = {
                                                        data: t.error,
                                                        input: t.args,
                                                        startTimestamp: n,
                                                        endTimestamp: r,
                                                    },
                                                    o = {
                                                        category: "fetch",
                                                        data: i,
                                                        level: "error",
                                                        type: "http",
                                                    };
                                                e.emit("beforeOutgoingRequestBreadcrumb", o, a), addBreadcrumb(o, a);
                                            } else {
                                                let i = t.response,
                                                    a = {
                                                        ...t.fetchData,
                                                        status_code: i?.status,
                                                    };
                                                t.fetchData.request_body_size,
                                                    t.fetchData.response_body_size,
                                                    i?.status;
                                                let o = {
                                                        input: t.args,
                                                        response: i,
                                                        startTimestamp: n,
                                                        endTimestamp: r,
                                                    },
                                                    s = {
                                                        category: "fetch",
                                                        data: a,
                                                        type: "http",
                                                        level: getBreadcrumbLogLevelFromHttpStatusCode(a.status_code),
                                                    };
                                                e.emit("beforeOutgoingRequestBreadcrumb", s, o), addBreadcrumb(s, o);
                                            }
                                        }
                                    }),
                                t.history &&
                                    (0, q.a)(function (t) {
                                        if ((0, m.s3)() !== e) return;
                                        let n = t.from,
                                            r = t.to,
                                            i = (0, z.en)(U.m9.location.href),
                                            a = n ? (0, z.en)(n) : void 0,
                                            o = (0, z.en)(r);
                                        a?.path || (a = i),
                                            i.protocol === o.protocol && i.host === o.host && (r = o.relative),
                                            i.protocol === a.protocol && i.host === a.host && (n = a.relative),
                                            addBreadcrumb({
                                                category: "navigation",
                                                data: {
                                                    from: n,
                                                    to: r,
                                                },
                                            });
                                    }),
                                t.sentry &&
                                    e.on("beforeSendEvent", function (t) {
                                        (0, m.s3)() === e &&
                                            addBreadcrumb(
                                                {
                                                    category: `sentry.${"transaction" === t.type ? "transaction" : "event"}`,
                                                    event_id: t.event_id,
                                                    level: t.level,
                                                    message: (0, l.jH)(t),
                                                },
                                                {
                                                    event: t,
                                                }
                                            );
                                    });
                        },
                    };
                }),
                Y = [
                    "EventTarget",
                    "Window",
                    "Node",
                    "ApplicationCache",
                    "AudioTrackList",
                    "BroadcastChannel",
                    "ChannelMergerNode",
                    "CryptoOperation",
                    "EventSource",
                    "FileReader",
                    "HTMLUnknownElement",
                    "IDBDatabase",
                    "IDBRequest",
                    "IDBTransaction",
                    "KeyOperation",
                    "MediaController",
                    "MessagePort",
                    "ModalWindow",
                    "Notification",
                    "SVGElementInstance",
                    "Screen",
                    "SharedWorker",
                    "TextTrack",
                    "TextTrackCue",
                    "TextTrackList",
                    "WebSocket",
                    "WebSocketWorker",
                    "Worker",
                    "XMLHttpRequest",
                    "XMLHttpRequestEventTarget",
                    "XMLHttpRequestUpload",
                ],
                Q = (0, c._I)((e = {}) => {
                    let t = {
                        XMLHttpRequest: !0,
                        eventTarget: !0,
                        requestAnimationFrame: !0,
                        setInterval: !0,
                        setTimeout: !0,
                        ...e,
                    };
                    return {
                        name: "BrowserApiErrors",
                        setupOnce() {
                            t.setTimeout && (0, g.hl)(U.m9, "setTimeout", _wrapTimeFunction),
                                t.setInterval && (0, g.hl)(U.m9, "setInterval", _wrapTimeFunction),
                                t.requestAnimationFrame && (0, g.hl)(U.m9, "requestAnimationFrame", _wrapRAF),
                                t.XMLHttpRequest &&
                                    "XMLHttpRequest" in U.m9 &&
                                    (0, g.hl)(XMLHttpRequest.prototype, "send", _wrapXHR);
                            let e = t.eventTarget;
                            if (e) {
                                let t = Array.isArray(e) ? e : Y;
                                t.forEach(_wrapEventTarget);
                            }
                        },
                    };
                });
            function _wrapTimeFunction(e) {
                return function (...t) {
                    let n = t[0];
                    return (
                        (t[0] = (0, U.re)(n, {
                            mechanism: {
                                data: {
                                    function: (0, v.$P)(e),
                                },
                                handled: !1,
                                type: "instrument",
                            },
                        })),
                        e.apply(this, t)
                    );
                };
            }
            function _wrapRAF(e) {
                return function (t) {
                    return e.apply(this, [
                        (0, U.re)(t, {
                            mechanism: {
                                data: {
                                    function: "requestAnimationFrame",
                                    handler: (0, v.$P)(e),
                                },
                                handled: !1,
                                type: "instrument",
                            },
                        }),
                    ]);
                };
            }
            function _wrapXHR(e) {
                return function (...t) {
                    let n = this;
                    return (
                        ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((e) => {
                            e in n &&
                                "function" == typeof n[e] &&
                                (0, g.hl)(n, e, function (t) {
                                    let n = {
                                            mechanism: {
                                                data: {
                                                    function: e,
                                                    handler: (0, v.$P)(t),
                                                },
                                                handled: !1,
                                                type: "instrument",
                                            },
                                        },
                                        r = (0, g.HK)(t);
                                    return r && (n.mechanism.data.handler = (0, v.$P)(r)), (0, U.re)(t, n);
                                });
                        }),
                        e.apply(this, t)
                    );
                };
            }
            function _wrapEventTarget(e) {
                let t = U.m9,
                    n = t[e]?.prototype;
                n?.hasOwnProperty?.("addEventListener") &&
                    ((0, g.hl)(n, "addEventListener", function (t) {
                        return function (n, r, i) {
                            try {
                                "function" == typeof r.handleEvent &&
                                    (r.handleEvent = (0, U.re)(r.handleEvent, {
                                        mechanism: {
                                            data: {
                                                function: "handleEvent",
                                                handler: (0, v.$P)(r),
                                                target: e,
                                            },
                                            handled: !1,
                                            type: "instrument",
                                        },
                                    }));
                            } catch {}
                            return t.apply(this, [
                                n,
                                (0, U.re)(r, {
                                    mechanism: {
                                        data: {
                                            function: "addEventListener",
                                            handler: (0, v.$P)(r),
                                            target: e,
                                        },
                                        handled: !1,
                                        type: "instrument",
                                    },
                                }),
                                i,
                            ]);
                        };
                    }),
                    (0, g.hl)(n, "removeEventListener", function (e) {
                        return function (t, n, r) {
                            try {
                                let i = n.__sentry_wrapped__;
                                i && e.call(this, t, i, r);
                            } catch (e) {}
                            return e.call(this, t, n, r);
                        };
                    }));
            }
            let ee = (0, c._I)(() => ({
                name: "BrowserSession",
                setupOnce() {
                    if (void 0 === U.m9.document) {
                        X.X &&
                            u.kg.warn(
                                "Using the `browserSessionIntegration` in non-browser environments is not supported."
                            );
                        return;
                    }
                    (0, E.yj)({
                        ignoreDuration: !0,
                    }),
                        (0, E.cg)(),
                        (0, q.a)(({ from: e, to: t }) => {
                            void 0 !== e &&
                                e !== t &&
                                ((0, E.yj)({
                                    ignoreDuration: !0,
                                }),
                                (0, E.cg)());
                        });
                },
            }));
            var et = n(80398),
                en = n(30752);
            let er = (0, c._I)((e = {}) => {
                let t = {
                    onerror: !0,
                    onunhandledrejection: !0,
                    ...e,
                };
                return {
                    name: "GlobalHandlers",
                    setupOnce() {
                        Error.stackTraceLimit = 50;
                    },
                    setup(e) {
                        t.onerror &&
                            ((0, et.V)((t) => {
                                let { stackParser: n, attachStacktrace: r } = getOptions();
                                if ((0, m.s3)() !== e || (0, U.Wz)()) return;
                                let { msg: i, url: a, line: o, column: s, error: c } = t,
                                    u = (function (e, t, n, r) {
                                        let i = (e.exception = e.exception || {}),
                                            a = (i.values = i.values || []),
                                            o = (a[0] = a[0] || {}),
                                            s = (o.stacktrace = o.stacktrace || {}),
                                            c = (s.frames = s.frames || []),
                                            u = (0, A.HD)(t) && t.length > 0 ? t : (0, S.l4)();
                                        return (
                                            0 === c.length &&
                                                c.push({
                                                    colno: r,
                                                    filename: u,
                                                    function: v.Fi,
                                                    in_app: !0,
                                                    lineno: n,
                                                }),
                                            e
                                        );
                                    })(eventFromUnknownInput(n, c || i, void 0, r, !1), a, o, s);
                                (u.level = "error"),
                                    (0, E.eN)(u, {
                                        originalException: c,
                                        mechanism: {
                                            handled: !1,
                                            type: "onerror",
                                        },
                                    });
                            }),
                            globalHandlerLog("onerror")),
                            t.onunhandledrejection &&
                                ((0, en.h)((t) => {
                                    let { stackParser: n, attachStacktrace: r } = getOptions();
                                    if ((0, m.s3)() !== e || (0, U.Wz)()) return;
                                    let i = (function (e) {
                                            if ((0, A.pt)(e)) return e;
                                            try {
                                                if ("reason" in e) return e.reason;
                                                if ("detail" in e && "reason" in e.detail) return e.detail.reason;
                                            } catch {}
                                            return e;
                                        })(t),
                                        a = (0, A.pt)(i)
                                            ? {
                                                  exception: {
                                                      values: [
                                                          {
                                                              type: "UnhandledRejection",
                                                              value: `Non-Error promise rejection captured with value: ${String(i)}`,
                                                          },
                                                      ],
                                                  },
                                              }
                                            : eventFromUnknownInput(n, i, void 0, r, !0);
                                    (a.level = "error"),
                                        (0, E.eN)(a, {
                                            originalException: i,
                                            mechanism: {
                                                handled: !1,
                                                type: "onunhandledrejection",
                                            },
                                        });
                                }),
                                globalHandlerLog("onunhandledrejection"));
                    },
                };
            });
            function globalHandlerLog(e) {
                X.X && u.kg.log(`Global Handler attached: ${e}`);
            }
            function getOptions() {
                let e = (0, m.s3)(),
                    t = e?.getOptions() || {
                        stackParser: () => [],
                        attachStacktrace: !1,
                    };
                return t;
            }
            let ei = (0, c._I)(() => ({
                name: "HttpContext",
                preprocessEvent(e) {
                    if (!U.m9.navigator && !U.m9.location && !U.m9.document) return;
                    let t = e.request?.url || (0, S.l4)(),
                        { referrer: n } = U.m9.document || {},
                        { userAgent: r } = U.m9.navigator || {},
                        i = {
                            ...e.request?.headers,
                            ...(n && {
                                Referer: n,
                            }),
                            ...(r && {
                                "User-Agent": r,
                            }),
                        },
                        a = {
                            ...e.request,
                            ...(t && {
                                url: t,
                            }),
                            headers: i,
                        };
                    e.request = a;
                },
            }));
            function applyExceptionGroupFieldsForParentException(e, t) {
                (e.mechanism = e.mechanism || {
                    type: "generic",
                    handled: !0,
                }),
                    (e.mechanism = {
                        ...e.mechanism,
                        ...("AggregateError" === e.type && {
                            is_exception_group: !0,
                        }),
                        exception_id: t,
                    });
            }
            function applyExceptionGroupFieldsForChildException(e, t, n, r) {
                (e.mechanism = e.mechanism || {
                    type: "generic",
                    handled: !0,
                }),
                    (e.mechanism = {
                        ...e.mechanism,
                        type: "chained",
                        source: t,
                        exception_id: n,
                        parent_id: r,
                    });
            }
            let ea = (0, c._I)((e = {}) => {
                let t = e.limit || 5,
                    n = e.key || "cause";
                return {
                    name: "LinkedErrors",
                    preprocessEvent(e, r, i) {
                        let a = i.getOptions();
                        !(function (e, t, n = 250, r, i, a, o) {
                            if (!a.exception?.values || !o || !(0, A.V9)(o.originalException, Error)) return;
                            let s =
                                a.exception.values.length > 0
                                    ? a.exception.values[a.exception.values.length - 1]
                                    : void 0;
                            s &&
                                (a.exception.values = (function aggregateExceptionsFromError(e, t, n, r, i, a, o, s) {
                                    if (a.length >= n + 1) return a;
                                    let c = [...a];
                                    if ((0, A.V9)(r[i], Error)) {
                                        applyExceptionGroupFieldsForParentException(o, s);
                                        let a = e(t, r[i]),
                                            u = c.length;
                                        applyExceptionGroupFieldsForChildException(a, i, u, s),
                                            (c = aggregateExceptionsFromError(e, t, n, r[i], i, [a, ...c], a, u));
                                    }
                                    return (
                                        Array.isArray(r.errors) &&
                                            r.errors.forEach((r, a) => {
                                                if ((0, A.V9)(r, Error)) {
                                                    applyExceptionGroupFieldsForParentException(o, s);
                                                    let u = e(t, r),
                                                        l = c.length;
                                                    applyExceptionGroupFieldsForChildException(u, `errors[${a}]`, l, s),
                                                        (c = aggregateExceptionsFromError(
                                                            e,
                                                            t,
                                                            n,
                                                            r,
                                                            i,
                                                            [u, ...c],
                                                            u,
                                                            l
                                                        ));
                                                }
                                            }),
                                        c
                                    );
                                })(e, t, i, o.originalException, r, a.exception.values, s, 0).map(
                                    (e) => (e.value && (e.value = (0, d.$G)(e.value, n)), e)
                                ));
                        })(exceptionFromError, a.stackParser, a.maxValueLength, n, t, e, r);
                    },
                };
            });
            function createFrame(e, t, n, r) {
                let i = {
                    filename: e,
                    function: "<anonymous>" === t ? v.Fi : t,
                    in_app: !0,
                };
                return void 0 !== n && (i.lineno = n), void 0 !== r && (i.colno = r), i;
            }
            let eo = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
                es =
                    /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
                ec = /\((\S*)(?::(\d+))(?::(\d+))\)/,
                eu = [
                    30,
                    (e) => {
                        let t = eo.exec(e);
                        if (t) {
                            let [, e, n, r] = t;
                            return createFrame(e, v.Fi, +n, +r);
                        }
                        let n = es.exec(e);
                        if (n) {
                            let e = n[2] && 0 === n[2].indexOf("eval");
                            if (e) {
                                let e = ec.exec(n[2]);
                                e && ((n[2] = e[1]), (n[3] = e[2]), (n[4] = e[3]));
                            }
                            let [t, r] = extractSafariExtensionDetails(n[1] || v.Fi, n[2]);
                            return createFrame(r, t, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0);
                        }
                    },
                ],
                el =
                    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
                ed = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
                ep = [
                    50,
                    (e) => {
                        let t = el.exec(e);
                        if (t) {
                            let e = t[3] && t[3].indexOf(" > eval") > -1;
                            if (e) {
                                let e = ed.exec(t[3]);
                                e && ((t[1] = t[1] || "eval"), (t[3] = e[1]), (t[4] = e[2]), (t[5] = ""));
                            }
                            let n = t[3],
                                r = t[1] || v.Fi;
                            return (
                                ([r, n] = extractSafariExtensionDetails(r, n)),
                                createFrame(n, r, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
                            );
                        }
                    },
                ],
                ef = (0, v.pE)(...[eu, ep]),
                extractSafariExtensionDetails = (e, t) => {
                    let n = -1 !== e.indexOf("safari-extension"),
                        r = -1 !== e.indexOf("safari-web-extension");
                    return n || r
                        ? [
                              -1 !== e.indexOf("@") ? e.split("@")[0] : v.Fi,
                              n ? `safari-extension:${t}` : `safari-web-extension:${t}`,
                          ]
                        : [e, t];
                };
            var em = n(43624);
            let eg = {};
            function makeFetchTransport(
                e,
                t = (function (e) {
                    let t = eg[e];
                    if (t) return t;
                    let n = G.m[e];
                    if ((0, b.QC)(n)) return (eg[e] = n.bind(G.m));
                    let r = G.m.document;
                    if (r && "function" == typeof r.createElement)
                        try {
                            let t = r.createElement("iframe");
                            (t.hidden = !0), r.head.appendChild(t);
                            let i = t.contentWindow;
                            i?.[e] && (n = i[e]), r.head.removeChild(t);
                        } catch (t) {
                            em.X &&
                                u.kg.warn(
                                    `Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,
                                    t
                                );
                        }
                    return n ? (eg[e] = n.bind(G.m)) : n;
                })("fetch")
            ) {
                let n = 0,
                    r = 0;
                return (function (
                    e,
                    t,
                    n = (function (e) {
                        let t = [];
                        function remove(e) {
                            return t.splice(t.indexOf(e), 1)[0] || Promise.resolve(void 0);
                        }
                        return {
                            $: t,
                            add: function (n) {
                                if (!(void 0 === e || t.length < e))
                                    return (0, P.$2)(
                                        new SentryError("Not adding Promise because buffer limit was reached.")
                                    );
                                let r = n();
                                return (
                                    -1 === t.indexOf(r) && t.push(r),
                                    r.then(() => remove(r)).then(null, () => remove(r).then(null, () => {})),
                                    r
                                );
                            },
                            drain: function (e) {
                                return new P.cW((n, r) => {
                                    let i = t.length;
                                    if (!i) return n(!0);
                                    let a = setTimeout(() => {
                                        e && e > 0 && n(!1);
                                    }, e);
                                    t.forEach((e) => {
                                        (0, P.WD)(e).then(() => {
                                            --i || (clearTimeout(a), n(!0));
                                        }, r);
                                    });
                                });
                            },
                        };
                    })(e.bufferSize || 64)
                ) {
                    let r = {};
                    return {
                        send: function (i) {
                            let a = [];
                            if (
                                ((0, O.gv)(i, (t, n) => {
                                    let i = (0, O.mL)(n);
                                    (function (e, t, n = Date.now()) {
                                        return (e[t] || e.all || 0) > n;
                                    })(r, i)
                                        ? e.recordDroppedEvent("ratelimit_backoff", i)
                                        : a.push(t);
                                }),
                                0 === a.length)
                            )
                                return (0, P.WD)({});
                            let o = (0, O.Jd)(i[0], a),
                                recordEnvelopeLoss = (t) => {
                                    (0, O.gv)(o, (n, r) => {
                                        e.recordDroppedEvent(t, (0, O.mL)(r));
                                    });
                                };
                            return n
                                .add(() =>
                                    t({
                                        body: (0, O.V$)(o),
                                    }).then(
                                        (e) => (
                                            void 0 !== e.statusCode &&
                                                (e.statusCode < 200 || e.statusCode >= 300) &&
                                                s.X &&
                                                u.kg.warn(
                                                    `Sentry responded with status code ${e.statusCode} to sent event.`
                                                ),
                                            (r = (function (e, { statusCode: t, headers: n }, r = Date.now()) {
                                                let i = {
                                                        ...e,
                                                    },
                                                    a = n?.["x-sentry-rate-limits"],
                                                    o = n?.["retry-after"];
                                                if (a)
                                                    for (let e of a.trim().split(",")) {
                                                        let [t, n, , , a] = e.split(":", 5),
                                                            o = parseInt(t, 10),
                                                            s = (isNaN(o) ? 60 : o) * 1e3;
                                                        if (n)
                                                            for (let e of n.split(";"))
                                                                "metric_bucket" === e
                                                                    ? (!a || a.split(";").includes("custom")) &&
                                                                      (i[e] = r + s)
                                                                    : (i[e] = r + s);
                                                        else i.all = r + s;
                                                    }
                                                else
                                                    o
                                                        ? (i.all =
                                                              r +
                                                              (function (e, t = Date.now()) {
                                                                  let n = parseInt(`${e}`, 10);
                                                                  if (!isNaN(n)) return 1e3 * n;
                                                                  let r = Date.parse(`${e}`);
                                                                  return isNaN(r) ? 6e4 : r - t;
                                                              })(o, r))
                                                        : 429 === t && (i.all = r + 6e4);
                                                return i;
                                            })(r, e)),
                                            e
                                        ),
                                        (e) => {
                                            throw (recordEnvelopeLoss("network_error"), e);
                                        }
                                    )
                                )
                                .then(
                                    (e) => e,
                                    (e) => {
                                        if (e instanceof SentryError)
                                            return (
                                                s.X && u.kg.error("Skipped sending event because buffer is full."),
                                                recordEnvelopeLoss("queue_overflow"),
                                                (0, P.WD)({})
                                            );
                                        throw e;
                                    }
                                );
                        },
                        flush: (e) => n.drain(e),
                    };
                })(e, function (i) {
                    let a = i.body.length;
                    (n += a), r++;
                    let o = {
                        body: i.body,
                        method: "POST",
                        referrerPolicy: "strict-origin",
                        headers: e.headers,
                        keepalive: n <= 6e4 && r < 15,
                        ...e.fetchOptions,
                    };
                    if (!t) return (eg.fetch = void 0), (0, P.$2)("No fetch implementation available");
                    try {
                        return t(e.url, o).then(
                            (e) => (
                                (n -= a),
                                r--,
                                {
                                    statusCode: e.status,
                                    headers: {
                                        "x-sentry-rate-limits": e.headers.get("X-Sentry-Rate-Limits"),
                                        "retry-after": e.headers.get("Retry-After"),
                                    },
                                }
                            )
                        );
                    } catch (e) {
                        return (eg.fetch = void 0), (n -= a), r--, (0, P.$2)(e);
                    }
                });
            }
            function getDefaultIntegrations(e) {
                return [f(), _(), Q(), K(), er(), ea(), y(), ei(), ee()];
            }
            function init(e = {}) {
                let t = (function (e = {}) {
                    let t = {
                        defaultIntegrations: getDefaultIntegrations(),
                        release: "string" == typeof __SENTRY_RELEASE__ ? __SENTRY_RELEASE__ : U.m9.SENTRY_RELEASE?.id,
                        sendClientReports: !0,
                    };
                    return {
                        ...t,
                        ...(function (e) {
                            let t = {};
                            for (let n of Object.getOwnPropertyNames(e)) void 0 !== e[n] && (t[n] = e[n]);
                            return t;
                        })(e),
                    };
                })(e);
                if (
                    !t.skipBrowserExtensionCheck &&
                    (function () {
                        let e = void 0 !== U.m9.window && U.m9;
                        if (!e) return !1;
                        let t = e.chrome ? "chrome" : "browser",
                            n = e[t],
                            r = n?.runtime?.id,
                            i = (0, S.l4)() || "",
                            a =
                                !!r &&
                                U.m9 === U.m9.top &&
                                [
                                    "chrome-extension:",
                                    "moz-extension:",
                                    "ms-browser-extension:",
                                    "safari-web-extension:",
                                ].some((e) => i.startsWith(`${e}//`)),
                            o = void 0 !== e.nw;
                        return !!r && !a && !o;
                    })()
                ) {
                    X.X &&
                        (0, u.Cf)(() => {
                            console.error(
                                "[Sentry] You cannot run Sentry this way in a browser extension, check: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/"
                            );
                        });
                    return;
                }
                X.X &&
                    !(0, b.Ak)() &&
                    u.kg.warn(
                        "No Fetch API detected. The Sentry SDK requires a Fetch API compatible environment to send events. Please add a Fetch API polyfill."
                    );
                let n = {
                    ...t,
                    stackParser: (0, v.Sq)(t.stackParser || ef),
                    integrations: (0, c.m8)(t),
                    transport: t.transport || makeFetchTransport,
                };
                return (function (e, t) {
                    !0 === t.debug &&
                        (s.X
                            ? u.kg.enable()
                            : (0, u.Cf)(() => {
                                  console.warn(
                                      "[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."
                                  );
                              }));
                    let n = (0, m.nZ)();
                    n.update(t.initialScope);
                    let r = new e(t);
                    return (0, m.nZ)().setClient(r), r.init(), r;
                })(BrowserClient, n);
            }
            function showReportDialog(e = {}) {
                if (!U.m9.document) {
                    X.X && u.kg.error("Global document not defined in showReportDialog call");
                    return;
                }
                let t = (0, m.nZ)(),
                    n = t.getClient(),
                    r = n?.getDsn();
                if (!r) {
                    X.X && u.kg.error("DSN not configured for showReportDialog call");
                    return;
                }
                if (
                    (t &&
                        (e.user = {
                            ...t.getUser(),
                            ...e.user,
                        }),
                    !e.eventId)
                ) {
                    let t = (0, E.eW)();
                    t && (e.eventId = t);
                }
                let i = U.m9.document.createElement("script");
                (i.async = !0),
                    (i.crossOrigin = "anonymous"),
                    (i.src = (function (e, t) {
                        let n = (0, T.vK)(e);
                        if (!n) return "";
                        let r = `${getBaseApiEndpoint(n)}embed/error-page/`,
                            i = `dsn=${(0, T.RA)(n)}`;
                        for (let e in t)
                            if ("dsn" !== e && "onClose" !== e) {
                                if ("user" === e) {
                                    let e = t.user;
                                    if (!e) continue;
                                    e.name && (i += `&name=${encodeURIComponent(e.name)}`),
                                        e.email && (i += `&email=${encodeURIComponent(e.email)}`);
                                } else i += `&${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`;
                            }
                        return `${r}?${i}`;
                    })(r, e)),
                    e.onLoad && (i.onload = e.onLoad);
                let { onClose: a } = e;
                if (a) {
                    let reportDialogClosedMessageHandler = (e) => {
                        if ("__sentry_reportdialog_closed__" === e.data)
                            try {
                                a();
                            } finally {
                                U.m9.removeEventListener("message", reportDialogClosedMessageHandler);
                            }
                    };
                    U.m9.addEventListener("message", reportDialogClosedMessageHandler);
                }
                let o = U.m9.document.head || U.m9.document.body;
                o
                    ? o.appendChild(i)
                    : X.X && u.kg.error("Not injecting report dialog. No injection point found in HTML");
            }
        },
        19979: function (e, t, n) {
            "use strict";
            n.d(t, {
                G: function () {
                    return getAsyncContextStrategy;
                },
            });
            var r = n(3890),
                i = n(55854),
                a = n(38660);
            let AsyncContextStack = class AsyncContextStack {
                constructor(e, t) {
                    let n, r;
                    (n = e || new i.s()),
                        (r = t || new i.s()),
                        (this._stack = [
                            {
                                scope: n,
                            },
                        ]),
                        (this._isolationScope = r);
                }
                withScope(e) {
                    let t;
                    let n = this._pushScope();
                    try {
                        t = e(n);
                    } catch (e) {
                        throw (this._popScope(), e);
                    }
                    return (0, a.J8)(t)
                        ? t.then(
                              (e) => (this._popScope(), e),
                              (e) => {
                                  throw (this._popScope(), e);
                              }
                          )
                        : (this._popScope(), t);
                }
                getClient() {
                    return this.getStackTop().client;
                }
                getScope() {
                    return this.getStackTop().scope;
                }
                getIsolationScope() {
                    return this._isolationScope;
                }
                getStackTop() {
                    return this._stack[this._stack.length - 1];
                }
                _pushScope() {
                    let e = this.getScope().clone();
                    return (
                        this._stack.push({
                            client: this.getClient(),
                            scope: e,
                        }),
                        e
                    );
                }
                _popScope() {
                    return !(this._stack.length <= 1) && !!this._stack.pop();
                }
            };
            function getAsyncContextStack() {
                let e = (0, r.cu)(),
                    t = (0, r.qA)(e);
                return (t.stack =
                    t.stack ||
                    new AsyncContextStack(
                        (0, r.YO)("defaultCurrentScope", () => new i.s()),
                        (0, r.YO)("defaultIsolationScope", () => new i.s())
                    ));
            }
            function withScope(e) {
                return getAsyncContextStack().withScope(e);
            }
            function withSetScope(e, t) {
                let n = getAsyncContextStack();
                return n.withScope(() => ((n.getStackTop().scope = e), t(e)));
            }
            function withIsolationScope(e) {
                return getAsyncContextStack().withScope(() => e(getAsyncContextStack().getIsolationScope()));
            }
            function getAsyncContextStrategy(e) {
                let t = (0, r.qA)(e);
                return t.acs
                    ? t.acs
                    : {
                          withIsolationScope,
                          withScope,
                          withSetScope,
                          withSetIsolationScope: (e, t) => withIsolationScope(t),
                          getCurrentScope: () => getAsyncContextStack().getScope(),
                          getIsolationScope: () => getAsyncContextStack().getIsolationScope(),
                      };
            }
        },
        3890: function (e, t, n) {
            "use strict";
            n.d(t, {
                YO: function () {
                    return getGlobalSingleton;
                },
                cu: function () {
                    return getMainCarrier;
                },
                qA: function () {
                    return getSentryCarrier;
                },
            });
            var r = n(75474),
                i = n(30641);
            function getMainCarrier() {
                return getSentryCarrier(i.GLOBAL_OBJ), i.GLOBAL_OBJ;
            }
            function getSentryCarrier(e) {
                let t = (e.__SENTRY__ = e.__SENTRY__ || {});
                return (t.version = t.version || r.J), (t[r.J] = t[r.J] || {});
            }
            function getGlobalSingleton(e, t, n = i.GLOBAL_OBJ) {
                let a = (n.__SENTRY__ = n.__SENTRY__ || {}),
                    o = (a[r.J] = a[r.J] || {});
                return o[e] || (o[e] = t());
            }
        },
        62779: function (e, t, n) {
            "use strict";
            n.d(t, {
                J: function () {
                    return r;
                },
            });
            let r = "production";
        },
        40600: function (e, t, n) {
            "use strict";
            n.d(t, {
                $e: function () {
                    return withScope;
                },
                XX: function () {
                    return getTraceContextFromScope;
                },
                aF: function () {
                    return getIsolationScope;
                },
                lW: function () {
                    return getGlobalScope;
                },
                nZ: function () {
                    return getCurrentScope;
                },
                s3: function () {
                    return getClient;
                },
            });
            var r = n(19979),
                i = n(3890),
                a = n(55854),
                o = n(59702),
                s = n(16160);
            function getCurrentScope() {
                let e = (0, i.cu)(),
                    t = (0, r.G)(e);
                return t.getCurrentScope();
            }
            function getIsolationScope() {
                let e = (0, i.cu)(),
                    t = (0, r.G)(e);
                return t.getIsolationScope();
            }
            function getGlobalScope() {
                return (0, i.YO)("globalScope", () => new a.s());
            }
            function withScope(...e) {
                let t = (0, i.cu)(),
                    n = (0, r.G)(t);
                if (2 === e.length) {
                    let [t, r] = e;
                    return t ? n.withSetScope(t, r) : n.withScope(r);
                }
                return n.withScope(e[0]);
            }
            function getClient() {
                return getCurrentScope().getClient();
            }
            function getTraceContextFromScope(e) {
                let t = e.getPropagationContext(),
                    { traceId: n, parentSpanId: r, propagationSpanId: i } = t,
                    a = (0, o.Jr)({
                        trace_id: n,
                        span_id: i || (0, s.M)(),
                        parent_span_id: r,
                    });
                return a;
            }
        },
        92543: function (e, t, n) {
            "use strict";
            n.d(t, {
                X: function () {
                    return r;
                },
            });
            let r = !1;
        },
        74802: function (e, t, n) {
            "use strict";
            n.d(t, {
                Mq: function () {
                    return createEventEnvelope;
                },
                Q3: function () {
                    return createSessionEnvelope;
                },
                uE: function () {
                    return createSpanEnvelope;
                },
            });
            var r = n(16802),
                i = n(99913),
                a = n(61591),
                o = n(18887);
            function createSessionEnvelope(e, t, n, r) {
                let o = (0, a.HY)(n),
                    s = {
                        sent_at: new Date().toISOString(),
                        ...(o && {
                            sdk: o,
                        }),
                        ...(!!r &&
                            t && {
                                dsn: (0, i.RA)(t),
                            }),
                    },
                    c =
                        "aggregates" in e
                            ? [
                                  {
                                      type: "sessions",
                                  },
                                  e,
                              ]
                            : [
                                  {
                                      type: "session",
                                  },
                                  e.toJSON(),
                              ];
                return (0, a.Jd)(s, [c]);
            }
            function createEventEnvelope(e, t, n, r) {
                var i;
                let o = (0, a.HY)(n),
                    s = e.type && "replay_event" !== e.type ? e.type : "event";
                (i = n?.sdk) &&
                    ((e.sdk = e.sdk || {}),
                    (e.sdk.name = e.sdk.name || i.name),
                    (e.sdk.version = e.sdk.version || i.version),
                    (e.sdk.integrations = [...(e.sdk.integrations || []), ...(i.integrations || [])]),
                    (e.sdk.packages = [...(e.sdk.packages || []), ...(i.packages || [])]));
                let c = (0, a.Cd)(e, o, r, t);
                delete e.sdkProcessingMetadata;
                let u = [
                    {
                        type: s,
                    },
                    e,
                ];
                return (0, a.Jd)(c, [u]);
            }
            function createSpanEnvelope(e, t) {
                let n = (0, r.jC)(e[0]),
                    s = t?.getDsn(),
                    c = t?.getOptions().tunnel,
                    u = {
                        sent_at: new Date().toISOString(),
                        ...(!!n.trace_id &&
                            !!n.public_key && {
                                trace: n,
                            }),
                        ...(!!c &&
                            s && {
                                dsn: (0, i.RA)(s),
                            }),
                    },
                    l = t?.getOptions().beforeSendSpan,
                    d = l
                        ? (e) => {
                              let t = (0, o.XU)(e),
                                  n = l(t);
                              return n || ((0, o.R6)(), t);
                          }
                        : o.XU,
                    p = [];
                for (let t of e) {
                    let e = d(t);
                    e && p.push((0, a.KQ)(e));
                }
                return (0, a.Jd)(u, p);
            }
        },
        88808: function (e, t, n) {
            "use strict";
            n.d(t, {
                Qy: function () {
                    return addEventProcessor;
                },
                Tb: function () {
                    return captureException;
                },
                _k: function () {
                    return isEnabled;
                },
                cg: function () {
                    return captureSession;
                },
                eN: function () {
                    return captureEvent;
                },
                eW: function () {
                    return lastEventId;
                },
                v: function () {
                    return setContext;
                },
                yj: function () {
                    return startSession;
                },
            });
            var r = n(40600),
                i = n(68712),
                a = n(30641),
                o = n(28552);
            function captureException(e, t) {
                return (0, r.nZ)().captureException(e, (0, o.U0)(t));
            }
            function captureEvent(e, t) {
                return (0, r.nZ)().captureEvent(e, t);
            }
            function setContext(e, t) {
                (0, r.aF)().setContext(e, t);
            }
            function lastEventId() {
                return (0, r.aF)().lastEventId();
            }
            function isEnabled() {
                let e = (0, r.s3)();
                return e?.getOptions().enabled !== !1 && !!e?.getTransport();
            }
            function addEventProcessor(e) {
                (0, r.aF)().addEventProcessor(e);
            }
            function startSession(e) {
                let t = (0, r.aF)(),
                    n = (0, r.nZ)(),
                    { userAgent: o } = a.GLOBAL_OBJ.navigator || {},
                    s = (0, i.Hv)({
                        user: n.getUser() || t.getUser(),
                        ...(o && {
                            userAgent: o,
                        }),
                        ...e,
                    }),
                    c = t.getSession();
                return (
                    c?.status === "ok" &&
                        (0, i.CT)(c, {
                            status: "exited",
                        }),
                    endSession(),
                    t.setSession(s),
                    s
                );
            }
            function endSession() {
                let e = (0, r.aF)(),
                    t = (0, r.nZ)(),
                    n = t.getSession() || e.getSession();
                n && (0, i.RJ)(n), _sendSessionUpdate(), e.setSession();
            }
            function _sendSessionUpdate() {
                let e = (0, r.aF)(),
                    t = (0, r.s3)(),
                    n = e.getSession();
                n && t && t.captureSession(n);
            }
            function captureSession(e = !1) {
                if (e) {
                    endSession();
                    return;
                }
                _sendSessionUpdate();
            }
        },
        96817: function (e, t, n) {
            "use strict";
            n.d(t, {
                _I: function () {
                    return defineIntegration;
                },
                m7: function () {
                    return setupIntegration;
                },
                m8: function () {
                    return getIntegrationsToSetup;
                },
                q4: function () {
                    return setupIntegrations;
                },
                uf: function () {
                    return afterSetupIntegrations;
                },
            });
            var r = n(92543),
                i = n(54996);
            let a = [];
            function getIntegrationsToSetup(e) {
                let t;
                let n = e.defaultIntegrations || [],
                    r = e.integrations;
                if (
                    (n.forEach((e) => {
                        e.isDefaultInstance = !0;
                    }),
                    Array.isArray(r))
                )
                    t = [...n, ...r];
                else if ("function" == typeof r) {
                    let e = r(n);
                    t = Array.isArray(e) ? e : [e];
                } else t = n;
                return (function (e) {
                    let t = {};
                    return (
                        e.forEach((e) => {
                            let { name: n } = e,
                                r = t[n];
                            (r && !r.isDefaultInstance && e.isDefaultInstance) || (t[n] = e);
                        }),
                        Object.values(t)
                    );
                })(t);
            }
            function setupIntegrations(e, t) {
                let n = {};
                return (
                    t.forEach((t) => {
                        t && setupIntegration(e, t, n);
                    }),
                    n
                );
            }
            function afterSetupIntegrations(e, t) {
                for (let n of t) n?.afterAllSetup && n.afterAllSetup(e);
            }
            function setupIntegration(e, t, n) {
                if (n[t.name]) {
                    r.X && i.kg.log(`Integration skipped because it was already installed: ${t.name}`);
                    return;
                }
                if (
                    ((n[t.name] = t),
                    -1 === a.indexOf(t.name) && "function" == typeof t.setupOnce && (t.setupOnce(), a.push(t.name)),
                    t.setup && "function" == typeof t.setup && t.setup(e),
                    "function" == typeof t.preprocessEvent)
                ) {
                    let n = t.preprocessEvent.bind(t);
                    e.on("preprocessEvent", (t, r) => n(t, r, e));
                }
                if ("function" == typeof t.processEvent) {
                    let n = t.processEvent.bind(t),
                        r = Object.assign((t, r) => n(t, r, e), {
                            id: t.name,
                        });
                    e.addEventProcessor(r);
                }
                r.X && i.kg.log(`Integration installed: ${t.name}`);
            }
            function defineIntegration(e) {
                return e;
            }
        },
        55854: function (e, t, n) {
            "use strict";
            n.d(t, {
                s: function () {
                    return Scope;
                },
            });
            var r = n(68712),
                i = n(38660),
                a = n(54996),
                o = n(22473),
                s = n(16160),
                c = n(14430),
                u = n(76605),
                l = n(59357);
            let Scope = class Scope {
                constructor() {
                    (this._notifyingListeners = !1),
                        (this._scopeListeners = []),
                        (this._eventProcessors = []),
                        (this._breadcrumbs = []),
                        (this._attachments = []),
                        (this._user = {}),
                        (this._tags = {}),
                        (this._extra = {}),
                        (this._contexts = {}),
                        (this._sdkProcessingMetadata = {}),
                        (this._propagationContext = {
                            traceId: (0, s.H)(),
                            sampleRand: Math.random(),
                        });
                }
                clone() {
                    let e = new Scope();
                    return (
                        (e._breadcrumbs = [...this._breadcrumbs]),
                        (e._tags = {
                            ...this._tags,
                        }),
                        (e._extra = {
                            ...this._extra,
                        }),
                        (e._contexts = {
                            ...this._contexts,
                        }),
                        this._contexts.flags &&
                            (e._contexts.flags = {
                                values: [...this._contexts.flags.values],
                            }),
                        (e._user = this._user),
                        (e._level = this._level),
                        (e._session = this._session),
                        (e._transactionName = this._transactionName),
                        (e._fingerprint = this._fingerprint),
                        (e._eventProcessors = [...this._eventProcessors]),
                        (e._attachments = [...this._attachments]),
                        (e._sdkProcessingMetadata = {
                            ...this._sdkProcessingMetadata,
                        }),
                        (e._propagationContext = {
                            ...this._propagationContext,
                        }),
                        (e._client = this._client),
                        (e._lastEventId = this._lastEventId),
                        (0, l.D)(e, (0, l.Y)(this)),
                        e
                    );
                }
                setClient(e) {
                    this._client = e;
                }
                setLastEventId(e) {
                    this._lastEventId = e;
                }
                getClient() {
                    return this._client;
                }
                lastEventId() {
                    return this._lastEventId;
                }
                addScopeListener(e) {
                    this._scopeListeners.push(e);
                }
                addEventProcessor(e) {
                    return this._eventProcessors.push(e), this;
                }
                setUser(e) {
                    return (
                        (this._user = e || {
                            email: void 0,
                            id: void 0,
                            ip_address: void 0,
                            username: void 0,
                        }),
                        this._session &&
                            (0, r.CT)(this._session, {
                                user: e,
                            }),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                getUser() {
                    return this._user;
                }
                setTags(e) {
                    return (
                        (this._tags = {
                            ...this._tags,
                            ...e,
                        }),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                setTag(e, t) {
                    return (
                        (this._tags = {
                            ...this._tags,
                            [e]: t,
                        }),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                setExtras(e) {
                    return (
                        (this._extra = {
                            ...this._extra,
                            ...e,
                        }),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                setExtra(e, t) {
                    return (
                        (this._extra = {
                            ...this._extra,
                            [e]: t,
                        }),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                setFingerprint(e) {
                    return (this._fingerprint = e), this._notifyScopeListeners(), this;
                }
                setLevel(e) {
                    return (this._level = e), this._notifyScopeListeners(), this;
                }
                setTransactionName(e) {
                    return (this._transactionName = e), this._notifyScopeListeners(), this;
                }
                setContext(e, t) {
                    return (
                        null === t ? delete this._contexts[e] : (this._contexts[e] = t),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                setSession(e) {
                    return e ? (this._session = e) : delete this._session, this._notifyScopeListeners(), this;
                }
                getSession() {
                    return this._session;
                }
                update(e) {
                    if (!e) return this;
                    let t = "function" == typeof e ? e(this) : e,
                        n = t instanceof Scope ? t.getScopeData() : (0, i.PO)(t) ? e : void 0,
                        {
                            tags: r,
                            extra: a,
                            user: o,
                            contexts: s,
                            level: c,
                            fingerprint: u = [],
                            propagationContext: l,
                        } = n || {};
                    return (
                        (this._tags = {
                            ...this._tags,
                            ...r,
                        }),
                        (this._extra = {
                            ...this._extra,
                            ...a,
                        }),
                        (this._contexts = {
                            ...this._contexts,
                            ...s,
                        }),
                        o && Object.keys(o).length && (this._user = o),
                        c && (this._level = c),
                        u.length && (this._fingerprint = u),
                        l && (this._propagationContext = l),
                        this
                    );
                }
                clear() {
                    return (
                        (this._breadcrumbs = []),
                        (this._tags = {}),
                        (this._extra = {}),
                        (this._user = {}),
                        (this._contexts = {}),
                        (this._level = void 0),
                        (this._transactionName = void 0),
                        (this._fingerprint = void 0),
                        (this._session = void 0),
                        (0, l.D)(this, void 0),
                        (this._attachments = []),
                        this.setPropagationContext({
                            traceId: (0, s.H)(),
                            sampleRand: Math.random(),
                        }),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                addBreadcrumb(e, t) {
                    let n = "number" == typeof t ? t : 100;
                    if (n <= 0) return this;
                    let r = {
                        timestamp: (0, c.yW)(),
                        ...e,
                    };
                    return (
                        this._breadcrumbs.push(r),
                        this._breadcrumbs.length > n &&
                            ((this._breadcrumbs = this._breadcrumbs.slice(-n)),
                            this._client?.recordDroppedEvent("buffer_overflow", "log_item")),
                        this._notifyScopeListeners(),
                        this
                    );
                }
                getLastBreadcrumb() {
                    return this._breadcrumbs[this._breadcrumbs.length - 1];
                }
                clearBreadcrumbs() {
                    return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
                }
                addAttachment(e) {
                    return this._attachments.push(e), this;
                }
                clearAttachments() {
                    return (this._attachments = []), this;
                }
                getScopeData() {
                    return {
                        breadcrumbs: this._breadcrumbs,
                        attachments: this._attachments,
                        contexts: this._contexts,
                        tags: this._tags,
                        extra: this._extra,
                        user: this._user,
                        level: this._level,
                        fingerprint: this._fingerprint || [],
                        eventProcessors: this._eventProcessors,
                        propagationContext: this._propagationContext,
                        sdkProcessingMetadata: this._sdkProcessingMetadata,
                        transactionName: this._transactionName,
                        span: (0, l.Y)(this),
                    };
                }
                setSDKProcessingMetadata(e) {
                    return (this._sdkProcessingMetadata = (0, u.T)(this._sdkProcessingMetadata, e, 2)), this;
                }
                setPropagationContext(e) {
                    return (this._propagationContext = e), this;
                }
                getPropagationContext() {
                    return this._propagationContext;
                }
                captureException(e, t) {
                    let n = t?.event_id || (0, o.DM)();
                    if (!this._client)
                        return a.kg.warn("No client configured on scope - will not capture exception!"), n;
                    let r = Error("Sentry syntheticException");
                    return (
                        this._client.captureException(
                            e,
                            {
                                originalException: e,
                                syntheticException: r,
                                ...t,
                                event_id: n,
                            },
                            this
                        ),
                        n
                    );
                }
                captureMessage(e, t, n) {
                    let r = n?.event_id || (0, o.DM)();
                    if (!this._client) return a.kg.warn("No client configured on scope - will not capture message!"), r;
                    let i = Error(e);
                    return (
                        this._client.captureMessage(
                            e,
                            t,
                            {
                                originalException: e,
                                syntheticException: i,
                                ...n,
                                event_id: r,
                            },
                            this
                        ),
                        r
                    );
                }
                captureEvent(e, t) {
                    let n = t?.event_id || (0, o.DM)();
                    return (
                        this._client
                            ? this._client.captureEvent(
                                  e,
                                  {
                                      ...t,
                                      event_id: n,
                                  },
                                  this
                              )
                            : a.kg.warn("No client configured on scope - will not capture event!"),
                        n
                    );
                }
                _notifyScopeListeners() {
                    this._notifyingListeners ||
                        ((this._notifyingListeners = !0),
                        this._scopeListeners.forEach((e) => {
                            e(this);
                        }),
                        (this._notifyingListeners = !1));
                }
            };
        },
        9804: function (e, t, n) {
            "use strict";
            n.d(t, {
                $J: function () {
                    return a;
                },
                E1: function () {
                    return c;
                },
                JQ: function () {
                    return p;
                },
                S3: function () {
                    return o;
                },
                TE: function () {
                    return i;
                },
                Wb: function () {
                    return u;
                },
                Zj: function () {
                    return r;
                },
                ju: function () {
                    return s;
                },
                p6: function () {
                    return d;
                },
                xF: function () {
                    return l;
                },
            });
            let r = "sentry.source",
                i = "sentry.sample_rate",
                a = "sentry.op",
                o = "sentry.origin",
                s = "sentry.idle_span_finish_reason",
                c = "sentry.measurement_unit",
                u = "sentry.measurement_value",
                l = "sentry.custom_span_name",
                d = "sentry.profile_id",
                p = "sentry.exclusive_time";
        },
        68712: function (e, t, n) {
            "use strict";
            n.d(t, {
                CT: function () {
                    return updateSession;
                },
                Hv: function () {
                    return makeSession;
                },
                RJ: function () {
                    return closeSession;
                },
            });
            var r = n(59702),
                i = n(14430),
                a = n(22473);
            function makeSession(e) {
                let t = (0, i.ph)(),
                    n = {
                        sid: (0, a.DM)(),
                        init: !0,
                        timestamp: t,
                        started: t,
                        duration: 0,
                        status: "ok",
                        errors: 0,
                        ignoreDuration: !1,
                        toJSON: () =>
                            (0, r.Jr)({
                                sid: `${n.sid}`,
                                init: n.init,
                                started: new Date(1e3 * n.started).toISOString(),
                                timestamp: new Date(1e3 * n.timestamp).toISOString(),
                                status: n.status,
                                errors: n.errors,
                                did: "number" == typeof n.did || "string" == typeof n.did ? `${n.did}` : void 0,
                                duration: n.duration,
                                abnormal_mechanism: n.abnormal_mechanism,
                                attrs: {
                                    release: n.release,
                                    environment: n.environment,
                                    ip_address: n.ipAddress,
                                    user_agent: n.userAgent,
                                },
                            }),
                    };
                return e && updateSession(n, e), n;
            }
            function updateSession(e, t = {}) {
                if (
                    (!t.user ||
                        (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
                        e.did || t.did || (e.did = t.user.id || t.user.email || t.user.username)),
                    (e.timestamp = t.timestamp || (0, i.ph)()),
                    t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism),
                    t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
                    t.sid && (e.sid = 32 === t.sid.length ? t.sid : (0, a.DM)()),
                    void 0 !== t.init && (e.init = t.init),
                    !e.did && t.did && (e.did = `${t.did}`),
                    "number" == typeof t.started && (e.started = t.started),
                    e.ignoreDuration)
                )
                    e.duration = void 0;
                else if ("number" == typeof t.duration) e.duration = t.duration;
                else {
                    let t = e.timestamp - e.started;
                    e.duration = t >= 0 ? t : 0;
                }
                t.release && (e.release = t.release),
                    t.environment && (e.environment = t.environment),
                    !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
                    !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
                    "number" == typeof t.errors && (e.errors = t.errors),
                    t.status && (e.status = t.status);
            }
            function closeSession(e, t) {
                let n = {};
                t
                    ? (n = {
                          status: t,
                      })
                    : "ok" === e.status &&
                      (n = {
                          status: "exited",
                      }),
                    updateSession(e, n);
            }
        },
        16802: function (e, t, n) {
            "use strict";
            n.d(t, {
                CG: function () {
                    return getDynamicSamplingContextFromScope;
                },
                Lh: function () {
                    return freezeDscOnSpan;
                },
                jC: function () {
                    return getDynamicSamplingContextFromSpan;
                },
            });
            var r = n(62779),
                i = n(40600),
                a = n(9804),
                o = n(52512),
                s = n(59702),
                c = n(81469),
                u = n(18887),
                l = n(8201);
            let d = "_frozenDsc";
            function freezeDscOnSpan(e, t) {
                (0, s.xp)(e, d, t);
            }
            function getDynamicSamplingContextFromClient(e, t) {
                let n = t.getOptions(),
                    { publicKey: i } = t.getDsn() || {},
                    a = (0, s.Jr)({
                        environment: n.environment || r.J,
                        release: n.release,
                        public_key: i,
                        trace_id: e,
                    });
                return t.emit("createDsc", a), a;
            }
            function getDynamicSamplingContextFromScope(e, t) {
                let n = t.getPropagationContext();
                return n.dsc || getDynamicSamplingContextFromClient(n.traceId, e);
            }
            function getDynamicSamplingContextFromSpan(e) {
                let t = (0, i.s3)();
                if (!t) return {};
                let n = (0, u.Gx)(e),
                    r = (0, u.XU)(n),
                    s = r.data,
                    p = n.spanContext().traceState,
                    f = p?.get("sentry.sample_rate") ?? s[a.TE];
                function applyLocalSampleRateToDsc(e) {
                    return ("number" == typeof f || "string" == typeof f) && (e.sample_rate = `${f}`), e;
                }
                let m = n[d];
                if (m) return applyLocalSampleRateToDsc(m);
                let g = p?.get("sentry.dsc"),
                    h = g && (0, o.EN)(g);
                if (h) return applyLocalSampleRateToDsc(h);
                let _ = getDynamicSamplingContextFromClient(e.spanContext().traceId, t),
                    v = s[a.Zj],
                    y = r.description;
                return (
                    "url" !== v && y && (_.transaction = y),
                    (0, c.f)() &&
                        ((_.sampled = String((0, u.Tt)(n))),
                        (_.sample_rand =
                            p?.get("sentry.sample_rand") ??
                            l.I(n).scope?.getPropagationContext().sampleRand.toString())),
                    applyLocalSampleRateToDsc(_),
                    t.emit("createDsc", _, n),
                    _
                );
            }
        },
        62563: function (e, t, n) {
            "use strict";
            n.d(t, {
                OP: function () {
                    return i;
                },
                Q0: function () {
                    return setHttpStatus;
                },
                jt: function () {
                    return a;
                },
                pq: function () {
                    return r;
                },
            });
            let r = 0,
                i = 1,
                a = 2;
            function setHttpStatus(e, t) {
                e.setAttribute("http.response.status_code", t);
                let n = (function (e) {
                    if (e < 400 && e >= 100)
                        return {
                            code: i,
                        };
                    if (e >= 400 && e < 500)
                        switch (e) {
                            case 401:
                                return {
                                    code: a,
                                    message: "unauthenticated",
                                };
                            case 403:
                                return {
                                    code: a,
                                    message: "permission_denied",
                                };
                            case 404:
                                return {
                                    code: a,
                                    message: "not_found",
                                };
                            case 409:
                                return {
                                    code: a,
                                    message: "already_exists",
                                };
                            case 413:
                                return {
                                    code: a,
                                    message: "failed_precondition",
                                };
                            case 429:
                                return {
                                    code: a,
                                    message: "resource_exhausted",
                                };
                            case 499:
                                return {
                                    code: a,
                                    message: "cancelled",
                                };
                            default:
                                return {
                                    code: a,
                                    message: "invalid_argument",
                                };
                        }
                    if (e >= 500 && e < 600)
                        switch (e) {
                            case 501:
                                return {
                                    code: a,
                                    message: "unimplemented",
                                };
                            case 503:
                                return {
                                    code: a,
                                    message: "unavailable",
                                };
                            case 504:
                                return {
                                    code: a,
                                    message: "deadline_exceeded",
                                };
                            default:
                                return {
                                    code: a,
                                    message: "internal_error",
                                };
                        }
                    return {
                        code: a,
                        message: "unknown_error",
                    };
                })(t);
                "unknown_error" !== n.message && e.setStatus(n);
            }
        },
        8201: function (e, t, n) {
            "use strict";
            n.d(t, {
                I: function () {
                    return getCapturedScopesOnSpan;
                },
                Y: function () {
                    return setCapturedScopesOnSpan;
                },
            });
            var r = n(59702);
            let i = "_sentryScope",
                a = "_sentryIsolationScope";
            function setCapturedScopesOnSpan(e, t, n) {
                e && ((0, r.xp)(e, a, n), (0, r.xp)(e, i, t));
            }
            function getCapturedScopesOnSpan(e) {
                return {
                    scope: e[i],
                    isolationScope: e[a],
                };
            }
        },
        52512: function (e, t, n) {
            "use strict";
            n.d(t, {
                EN: function () {
                    return baggageHeaderToDynamicSamplingContext;
                },
                IQ: function () {
                    return dynamicSamplingContextToSentryBaggageHeader;
                },
                XM: function () {
                    return parseBaggageHeader;
                },
                lq: function () {
                    return o;
                },
            });
            var r = n(55181),
                i = n(38660),
                a = n(54996);
            let o = "sentry-",
                s = /^sentry-/;
            function baggageHeaderToDynamicSamplingContext(e) {
                let t = parseBaggageHeader(e);
                if (!t) return;
                let n = Object.entries(t).reduce((e, [t, n]) => {
                    if (t.match(s)) {
                        let r = t.slice(o.length);
                        e[r] = n;
                    }
                    return e;
                }, {});
                return Object.keys(n).length > 0 ? n : void 0;
            }
            function dynamicSamplingContextToSentryBaggageHeader(e) {
                if (!e) return;
                let t = Object.entries(e).reduce((e, [t, n]) => (n && (e[`${o}${t}`] = n), e), {});
                return (function (e) {
                    if (0 !== Object.keys(e).length)
                        return Object.entries(e).reduce((e, [t, n], i) => {
                            let o = `${encodeURIComponent(t)}=${encodeURIComponent(n)}`,
                                s = 0 === i ? o : `${e},${o}`;
                            return s.length > 8192
                                ? (r.X &&
                                      a.kg.warn(
                                          `Not adding key: ${t} with val: ${n} to baggage header due to exceeding baggage size limits.`
                                      ),
                                  e)
                                : s;
                        }, "");
                })(t);
            }
            function parseBaggageHeader(e) {
                return e && ((0, i.HD)(e) || Array.isArray(e))
                    ? Array.isArray(e)
                        ? e.reduce((e, t) => {
                              let n = baggageHeaderToObject(t);
                              return (
                                  Object.entries(n).forEach(([t, n]) => {
                                      e[t] = n;
                                  }),
                                  e
                              );
                          }, {})
                        : baggageHeaderToObject(e)
                    : void 0;
            }
            function baggageHeaderToObject(e) {
                return e
                    .split(",")
                    .map((e) => e.split("=").map((e) => decodeURIComponent(e.trim())))
                    .reduce((e, [t, n]) => (t && n && (e[t] = n), e), {});
            }
        },
        46848: function (e, t, n) {
            "use strict";
            n.d(t, {
                Rt: function () {
                    return htmlTreeAsString;
                },
                iY: function () {
                    return getComponentName;
                },
                l4: function () {
                    return getLocationHref;
                },
            });
            var r = n(38660),
                i = n(30641);
            let a = i.GLOBAL_OBJ;
            function htmlTreeAsString(e, t = {}) {
                if (!e) return "<unknown>";
                try {
                    let n,
                        i = e,
                        o = [],
                        s = 0,
                        c = 0,
                        u = Array.isArray(t) ? t : t.keyAttrs,
                        l = (!Array.isArray(t) && t.maxStringLength) || 80;
                    for (
                        ;
                        i &&
                        s++ < 5 &&
                        ((n = (function (e, t) {
                            let n = [];
                            if (!e?.tagName) return "";
                            if (a.HTMLElement && e instanceof HTMLElement && e.dataset) {
                                if (e.dataset.sentryComponent) return e.dataset.sentryComponent;
                                if (e.dataset.sentryElement) return e.dataset.sentryElement;
                            }
                            n.push(e.tagName.toLowerCase());
                            let i = t?.length
                                ? t.filter((t) => e.getAttribute(t)).map((t) => [t, e.getAttribute(t)])
                                : null;
                            if (i?.length)
                                i.forEach((e) => {
                                    n.push(`[${e[0]}="${e[1]}"]`);
                                });
                            else {
                                e.id && n.push(`#${e.id}`);
                                let t = e.className;
                                if (t && (0, r.HD)(t)) {
                                    let e = t.split(/\s+/);
                                    for (let t of e) n.push(`.${t}`);
                                }
                            }
                            for (let t of ["aria-label", "type", "name", "title", "alt"]) {
                                let r = e.getAttribute(t);
                                r && n.push(`[${t}="${r}"]`);
                            }
                            return n.join("");
                        })(i, u)),
                        "html" !== n && (!(s > 1) || !(c + 3 * o.length + n.length >= l)));

                    )
                        o.push(n), (c += n.length), (i = i.parentNode);
                    return o.reverse().join(" > ");
                } catch (e) {
                    return "<unknown>";
                }
            }
            function getLocationHref() {
                try {
                    return a.document.location.href;
                } catch (e) {
                    return "";
                }
            }
            function getComponentName(e) {
                if (!a.HTMLElement) return null;
                let t = e;
                for (let e = 0; e < 5 && t; e++) {
                    if (t instanceof HTMLElement) {
                        if (t.dataset.sentryComponent) return t.dataset.sentryComponent;
                        if (t.dataset.sentryElement) return t.dataset.sentryElement;
                    }
                    t = t.parentNode;
                }
                return null;
            }
        },
        55181: function (e, t, n) {
            "use strict";
            n.d(t, {
                X: function () {
                    return r;
                },
            });
            let r = !1;
        },
        99913: function (e, t, n) {
            "use strict";
            n.d(t, {
                RA: function () {
                    return dsnToString;
                },
                U4: function () {
                    return dsnFromString;
                },
                vK: function () {
                    return makeDsn;
                },
            });
            var r = n(55181),
                i = n(54996);
            let a = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
            function dsnToString(e, t = !1) {
                let { host: n, path: r, pass: i, port: a, projectId: o, protocol: s, publicKey: c } = e;
                return `${s}://${c}${t && i ? `:${i}` : ""}@${n}${a ? `:${a}` : ""}/${r ? `${r}/` : r}${o}`;
            }
            function dsnFromString(e) {
                let t = a.exec(e);
                if (!t) {
                    (0, i.Cf)(() => {
                        console.error(`Invalid Sentry Dsn: ${e}`);
                    });
                    return;
                }
                let [n, r, o = "", s = "", c = "", u = ""] = t.slice(1),
                    l = "",
                    d = u,
                    p = d.split("/");
                if ((p.length > 1 && ((l = p.slice(0, -1).join("/")), (d = p.pop())), d)) {
                    let e = d.match(/^\d+/);
                    e && (d = e[0]);
                }
                return dsnFromComponents({
                    host: s,
                    pass: o,
                    path: l,
                    projectId: d,
                    port: c,
                    protocol: n,
                    publicKey: r,
                });
            }
            function dsnFromComponents(e) {
                return {
                    protocol: e.protocol,
                    publicKey: e.publicKey || "",
                    pass: e.pass || "",
                    host: e.host,
                    port: e.port || "",
                    path: e.path || "",
                    projectId: e.projectId,
                };
            }
            function makeDsn(e) {
                let t = "string" == typeof e ? dsnFromString(e) : dsnFromComponents(e);
                if (
                    t &&
                    (function (e) {
                        if (!r.X) return !0;
                        let { port: t, projectId: n, protocol: a } = e,
                            o = ["protocol", "publicKey", "host", "projectId"].find(
                                (t) => !e[t] && (i.kg.error(`Invalid Sentry Dsn: ${t} missing`), !0)
                            );
                        return (
                            !o &&
                            (n.match(/^\d+$/)
                                ? "http" === a || "https" === a
                                    ? !(t && isNaN(parseInt(t, 10))) ||
                                      (i.kg.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1)
                                    : (i.kg.error(`Invalid Sentry Dsn: Invalid protocol ${a}`), !1)
                                : (i.kg.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), !1))
                        );
                    })(t)
                )
                    return t;
            }
        },
        61591: function (e, t, n) {
            "use strict";
            n.d(t, {
                BO: function () {
                    return addItemToEnvelope;
                },
                Cd: function () {
                    return createEventEnvelopeHeaders;
                },
                HY: function () {
                    return getSdkMetadataForEnvelopeHeader;
                },
                Jd: function () {
                    return createEnvelope;
                },
                KQ: function () {
                    return createSpanEnvelopeItem;
                },
                V$: function () {
                    return serializeEnvelope;
                },
                gv: function () {
                    return forEachEnvelopeItem;
                },
                mL: function () {
                    return envelopeItemTypeToDataCategory;
                },
                zQ: function () {
                    return createAttachmentEnvelopeItem;
                },
            });
            var r = n(3890),
                i = n(99913),
                a = n(87249),
                o = n(59702),
                s = n(30641);
            function createEnvelope(e, t = []) {
                return [e, t];
            }
            function addItemToEnvelope(e, t) {
                let [n, r] = e;
                return [n, [...r, t]];
            }
            function forEachEnvelopeItem(e, t) {
                let n = e[1];
                for (let e of n) {
                    let n = e[0].type,
                        r = t(e, n);
                    if (r) return !0;
                }
                return !1;
            }
            function encodeUTF8(e) {
                let t = (0, r.qA)(s.GLOBAL_OBJ);
                return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
            }
            function serializeEnvelope(e) {
                let [t, n] = e,
                    r = JSON.stringify(t);
                function append(e) {
                    "string" == typeof r
                        ? (r = "string" == typeof e ? r + e : [encodeUTF8(r), e])
                        : r.push("string" == typeof e ? encodeUTF8(e) : e);
                }
                for (let e of n) {
                    let [t, n] = e;
                    if (
                        (append(`
${JSON.stringify(t)}
`),
                        "string" == typeof n || n instanceof Uint8Array)
                    )
                        append(n);
                    else {
                        let e;
                        try {
                            e = JSON.stringify(n);
                        } catch (t) {
                            e = JSON.stringify((0, a.Fv)(n));
                        }
                        append(e);
                    }
                }
                return "string" == typeof r
                    ? r
                    : (function (e) {
                          let t = e.reduce((e, t) => e + t.length, 0),
                              n = new Uint8Array(t),
                              r = 0;
                          for (let t of e) n.set(t, r), (r += t.length);
                          return n;
                      })(r);
            }
            function createSpanEnvelopeItem(e) {
                return [
                    {
                        type: "span",
                    },
                    e,
                ];
            }
            function createAttachmentEnvelopeItem(e) {
                let t = "string" == typeof e.data ? encodeUTF8(e.data) : e.data;
                return [
                    (0, o.Jr)({
                        type: "attachment",
                        length: t.length,
                        filename: e.filename,
                        content_type: e.contentType,
                        attachment_type: e.attachmentType,
                    }),
                    t,
                ];
            }
            let c = {
                session: "session",
                sessions: "session",
                attachment: "attachment",
                transaction: "transaction",
                event: "error",
                client_report: "internal",
                user_report: "default",
                profile: "profile",
                profile_chunk: "profile",
                replay_event: "replay",
                replay_recording: "replay",
                check_in: "monitor",
                feedback: "feedback",
                span: "span",
                raw_security: "security",
            };
            function envelopeItemTypeToDataCategory(e) {
                return c[e];
            }
            function getSdkMetadataForEnvelopeHeader(e) {
                if (!e?.sdk) return;
                let { name: t, version: n } = e.sdk;
                return {
                    name: t,
                    version: n,
                };
            }
            function createEventEnvelopeHeaders(e, t, n, r) {
                let a = e.sdkProcessingMetadata?.dynamicSamplingContext;
                return {
                    event_id: e.event_id,
                    sent_at: new Date().toISOString(),
                    ...(t && {
                        sdk: t,
                    }),
                    ...(!!n &&
                        r && {
                            dsn: (0, i.RA)(r),
                        }),
                    ...(a && {
                        trace: (0, o.Jr)({
                            ...a,
                        }),
                    }),
                };
            }
        },
        56772: function (e, t, n) {
            "use strict";
            n.d(t, {
                Uf: function () {
                    return addFetchInstrumentationHandler;
                },
                cf: function () {
                    return addFetchEndInstrumentationHandler;
                },
            });
            var r = n(38660),
                i = n(59702),
                a = n(26365),
                o = n(14430),
                s = n(30641),
                c = n(78973);
            function addFetchInstrumentationHandler(e, t) {
                let n = "fetch";
                (0, c.Hj)(n, e), (0, c.D2)(n, () => instrumentFetch(void 0, t));
            }
            function addFetchEndInstrumentationHandler(e) {
                let t = "fetch-body-resolved";
                (0, c.Hj)(t, e), (0, c.D2)(t, () => instrumentFetch(streamHandler));
            }
            function instrumentFetch(e, t = !1) {
                (!t || (0, a.t$)()) &&
                    (0, i.hl)(s.GLOBAL_OBJ, "fetch", function (t) {
                        return function (...n) {
                            let a = Error(),
                                { method: u, url: l } = (function (e) {
                                    if (0 === e.length)
                                        return {
                                            method: "GET",
                                            url: "",
                                        };
                                    if (2 === e.length) {
                                        let [t, n] = e;
                                        return {
                                            url: getUrlFromResource(t),
                                            method: hasProp(n, "method") ? String(n.method).toUpperCase() : "GET",
                                        };
                                    }
                                    let t = e[0];
                                    return {
                                        url: getUrlFromResource(t),
                                        method: hasProp(t, "method") ? String(t.method).toUpperCase() : "GET",
                                    };
                                })(n),
                                d = {
                                    args: n,
                                    fetchData: {
                                        method: u,
                                        url: l,
                                    },
                                    startTimestamp: 1e3 * (0, o.ph)(),
                                    virtualError: a,
                                };
                            return (
                                e ||
                                    (0, c.rK)("fetch", {
                                        ...d,
                                    }),
                                t.apply(s.GLOBAL_OBJ, n).then(
                                    async (t) => (
                                        e
                                            ? e(t)
                                            : (0, c.rK)("fetch", {
                                                  ...d,
                                                  endTimestamp: 1e3 * (0, o.ph)(),
                                                  response: t,
                                              }),
                                        t
                                    ),
                                    (e) => {
                                        throw (
                                            ((0, c.rK)("fetch", {
                                                ...d,
                                                endTimestamp: 1e3 * (0, o.ph)(),
                                                error: e,
                                            }),
                                            (0, r.VZ)(e) &&
                                                void 0 === e.stack &&
                                                ((e.stack = a.stack), (0, i.xp)(e, "framesToPop", 1)),
                                            e)
                                        );
                                    }
                                )
                            );
                        };
                    });
            }
            async function resolveResponse(e, t) {
                if (e?.body) {
                    let n = e.body,
                        r = n.getReader(),
                        i = setTimeout(() => {
                            n.cancel().then(null, () => {});
                        }, 9e4),
                        a = !0;
                    for (; a; ) {
                        let e;
                        try {
                            e = setTimeout(() => {
                                n.cancel().then(null, () => {});
                            }, 5e3);
                            let { done: i } = await r.read();
                            clearTimeout(e), i && (t(), (a = !1));
                        } catch (e) {
                            a = !1;
                        } finally {
                            clearTimeout(e);
                        }
                    }
                    clearTimeout(i), r.releaseLock(), n.cancel().then(null, () => {});
                }
            }
            function streamHandler(e) {
                let t;
                try {
                    t = e.clone();
                } catch {
                    return;
                }
                resolveResponse(t, () => {
                    (0, c.rK)("fetch-body-resolved", {
                        endTimestamp: 1e3 * (0, o.ph)(),
                        response: e,
                    });
                });
            }
            function hasProp(e, t) {
                return !!e && "object" == typeof e && !!e[t];
            }
            function getUrlFromResource(e) {
                return "string" == typeof e ? e : e ? (hasProp(e, "url") ? e.url : e.toString ? e.toString() : "") : "";
            }
        },
        80398: function (e, t, n) {
            "use strict";
            n.d(t, {
                V: function () {
                    return addGlobalErrorInstrumentationHandler;
                },
            });
            var r = n(30641),
                i = n(78973);
            let a = null;
            function addGlobalErrorInstrumentationHandler(e) {
                let t = "error";
                (0, i.Hj)(t, e), (0, i.D2)(t, instrumentError);
            }
            function instrumentError() {
                (a = r.GLOBAL_OBJ.onerror),
                    (r.GLOBAL_OBJ.onerror = function (e, t, n, r, o) {
                        return (
                            (0, i.rK)("error", {
                                column: r,
                                error: o,
                                line: n,
                                msg: e,
                                url: t,
                            }),
                            !!a && a.apply(this, arguments)
                        );
                    }),
                    (r.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = !0);
            }
        },
        30752: function (e, t, n) {
            "use strict";
            n.d(t, {
                h: function () {
                    return addGlobalUnhandledRejectionInstrumentationHandler;
                },
            });
            var r = n(30641),
                i = n(78973);
            let a = null;
            function addGlobalUnhandledRejectionInstrumentationHandler(e) {
                let t = "unhandledrejection";
                (0, i.Hj)(t, e), (0, i.D2)(t, instrumentUnhandledRejection);
            }
            function instrumentUnhandledRejection() {
                (a = r.GLOBAL_OBJ.onunhandledrejection),
                    (r.GLOBAL_OBJ.onunhandledrejection = function (e) {
                        return (0, i.rK)("unhandledrejection", e), !a || a.apply(this, arguments);
                    }),
                    (r.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0);
            }
        },
        78973: function (e, t, n) {
            "use strict";
            n.d(t, {
                D2: function () {
                    return maybeInstrument;
                },
                Hj: function () {
                    return addHandler;
                },
                rK: function () {
                    return triggerHandlers;
                },
            });
            var r = n(55181),
                i = n(54996),
                a = n(15919);
            let o = {},
                s = {};
            function addHandler(e, t) {
                (o[e] = o[e] || []), o[e].push(t);
            }
            function maybeInstrument(e, t) {
                if (!s[e]) {
                    s[e] = !0;
                    try {
                        t();
                    } catch (t) {
                        r.X && i.kg.error(`Error while instrumenting ${e}`, t);
                    }
                }
            }
            function triggerHandlers(e, t) {
                let n = e && o[e];
                if (n)
                    for (let o of n)
                        try {
                            o(t);
                        } catch (t) {
                            r.X &&
                                i.kg.error(
                                    `Error while triggering instrumentation handler.
Type: ${e}
Name: ${(0, a.$P)(o)}
Error:`,
                                    t
                                );
                        }
            }
        },
        38660: function (e, t, n) {
            "use strict";
            n.d(t, {
                Cy: function () {
                    return isSyntheticEvent;
                },
                HD: function () {
                    return isString;
                },
                J8: function () {
                    return isThenable;
                },
                Kj: function () {
                    return isRegExp;
                },
                Le: function () {
                    return isParameterizedString;
                },
                PO: function () {
                    return isPlainObject;
                },
                TX: function () {
                    return isDOMError;
                },
                V9: function () {
                    return isInstanceOf;
                },
                VW: function () {
                    return isErrorEvent;
                },
                VZ: function () {
                    return isError;
                },
                cO: function () {
                    return isEvent;
                },
                fm: function () {
                    return isDOMException;
                },
                kK: function () {
                    return isElement;
                },
                pt: function () {
                    return isPrimitive;
                },
                y1: function () {
                    return isVueViewModel;
                },
            });
            let r = Object.prototype.toString;
            function isError(e) {
                switch (r.call(e)) {
                    case "[object Error]":
                    case "[object Exception]":
                    case "[object DOMException]":
                    case "[object WebAssembly.Exception]":
                        return !0;
                    default:
                        return isInstanceOf(e, Error);
                }
            }
            function isBuiltin(e, t) {
                return r.call(e) === `[object ${t}]`;
            }
            function isErrorEvent(e) {
                return isBuiltin(e, "ErrorEvent");
            }
            function isDOMError(e) {
                return isBuiltin(e, "DOMError");
            }
            function isDOMException(e) {
                return isBuiltin(e, "DOMException");
            }
            function isString(e) {
                return isBuiltin(e, "String");
            }
            function isParameterizedString(e) {
                return (
                    "object" == typeof e &&
                    null !== e &&
                    "__sentry_template_string__" in e &&
                    "__sentry_template_values__" in e
                );
            }
            function isPrimitive(e) {
                return null === e || isParameterizedString(e) || ("object" != typeof e && "function" != typeof e);
            }
            function isPlainObject(e) {
                return isBuiltin(e, "Object");
            }
            function isEvent(e) {
                return "undefined" != typeof Event && isInstanceOf(e, Event);
            }
            function isElement(e) {
                return "undefined" != typeof Element && isInstanceOf(e, Element);
            }
            function isRegExp(e) {
                return isBuiltin(e, "RegExp");
            }
            function isThenable(e) {
                return !!(e?.then && "function" == typeof e.then);
            }
            function isSyntheticEvent(e) {
                return isPlainObject(e) && "nativeEvent" in e && "preventDefault" in e && "stopPropagation" in e;
            }
            function isInstanceOf(e, t) {
                try {
                    return e instanceof t;
                } catch (e) {
                    return !1;
                }
            }
            function isVueViewModel(e) {
                return !!("object" == typeof e && null !== e && (e.__isVue || e._isVue));
            }
        },
        54996: function (e, t, n) {
            "use strict";
            n.d(t, {
                Cf: function () {
                    return consoleSandbox;
                },
                LD: function () {
                    return s;
                },
                RU: function () {
                    return o;
                },
                kg: function () {
                    return c;
                },
            });
            var r = n(3890),
                i = n(55181),
                a = n(30641);
            let o = ["debug", "info", "warn", "error", "log", "assert", "trace"],
                s = {};
            function consoleSandbox(e) {
                if (!("console" in a.GLOBAL_OBJ)) return e();
                let t = a.GLOBAL_OBJ.console,
                    n = {},
                    r = Object.keys(s);
                r.forEach((e) => {
                    let r = s[e];
                    (n[e] = t[e]), (t[e] = r);
                });
                try {
                    return e();
                } finally {
                    r.forEach((e) => {
                        t[e] = n[e];
                    });
                }
            }
            let c = (0, r.YO)("logger", function () {
                let e = !1,
                    t = {
                        enable: () => {
                            e = !0;
                        },
                        disable: () => {
                            e = !1;
                        },
                        isEnabled: () => e,
                    };
                return (
                    i.X
                        ? o.forEach((n) => {
                              t[n] = (...t) => {
                                  e &&
                                      consoleSandbox(() => {
                                          a.GLOBAL_OBJ.console[n](`Sentry Logger [${n}]:`, ...t);
                                      });
                              };
                          })
                        : o.forEach((e) => {
                              t[e] = () => void 0;
                          }),
                    t
                );
            });
        },
        22473: function (e, t, n) {
            "use strict";
            n.d(t, {
                DM: function () {
                    return uuid4;
                },
                Db: function () {
                    return addExceptionTypeValue;
                },
                EG: function () {
                    return addExceptionMechanism;
                },
                YO: function () {
                    return checkOrSetAlreadyCaught;
                },
                jH: function () {
                    return getEventDescription;
                },
            });
            var r = n(59702),
                i = n(30641);
            function uuid4() {
                let e = i.GLOBAL_OBJ,
                    t = e.crypto || e.msCrypto,
                    getRandomByte = () => 16 * Math.random();
                try {
                    if (t?.randomUUID) return t.randomUUID().replace(/-/g, "");
                    t?.getRandomValues &&
                        (getRandomByte = () => {
                            let e = new Uint8Array(1);
                            return t.getRandomValues(e), e[0];
                        });
                } catch (e) {}
                return "10000000100040008000100000000000".replace(/[018]/g, (e) =>
                    (e ^ ((15 & getRandomByte()) >> (e / 4))).toString(16)
                );
            }
            function getFirstException(e) {
                return e.exception?.values?.[0];
            }
            function getEventDescription(e) {
                let { message: t, event_id: n } = e;
                if (t) return t;
                let r = getFirstException(e);
                return r
                    ? r.type && r.value
                        ? `${r.type}: ${r.value}`
                        : r.type || r.value || n || "<unknown>"
                    : n || "<unknown>";
            }
            function addExceptionTypeValue(e, t, n) {
                let r = (e.exception = e.exception || {}),
                    i = (r.values = r.values || []),
                    a = (i[0] = i[0] || {});
                a.value || (a.value = t || ""), a.type || (a.type = n || "Error");
            }
            function addExceptionMechanism(e, t) {
                let n = getFirstException(e);
                if (!n) return;
                let r = n.mechanism;
                if (
                    ((n.mechanism = {
                        type: "generic",
                        handled: !0,
                        ...r,
                        ...t,
                    }),
                    t && "data" in t)
                ) {
                    let e = {
                        ...r?.data,
                        ...t.data,
                    };
                    n.mechanism.data = e;
                }
            }
            function checkOrSetAlreadyCaught(e) {
                if (
                    (function (e) {
                        try {
                            return e.__sentry_captured__;
                        } catch {}
                    })(e)
                )
                    return !0;
                try {
                    (0, r.xp)(e, "__sentry_captured__", !0);
                } catch (e) {}
                return !1;
            }
        },
        87249: function (e, t, n) {
            "use strict";
            n.d(t, {
                Fv: function () {
                    return normalize;
                },
                Qy: function () {
                    return function normalizeToSize(e, t = 3, n = 102400) {
                        let r = normalize(e, t);
                        return ~-encodeURI(JSON.stringify(r)).split(/%..|./).length > n
                            ? normalizeToSize(e, t - 1, n)
                            : r;
                    };
                },
            });
            var r = n(38660),
                i = n(59702),
                a = n(15919);
            function normalize(e, t = 100, n = Infinity) {
                try {
                    return (function visit(
                        e,
                        t,
                        n = Infinity,
                        o = Infinity,
                        s = (function () {
                            let e = new WeakSet();
                            return [
                                function (t) {
                                    return !!e.has(t) || (e.add(t), !1);
                                },
                                function (t) {
                                    e.delete(t);
                                },
                            ];
                        })()
                    ) {
                        let [c, u] = s;
                        if (
                            null == t ||
                            ["boolean", "string"].includes(typeof t) ||
                            ("number" == typeof t && Number.isFinite(t))
                        )
                            return t;
                        let l = (function (e, t) {
                            try {
                                if ("domain" === e && t && "object" == typeof t && t._events) return "[Domain]";
                                if ("domainEmitter" === e) return "[DomainEmitter]";
                                if ("undefined" != typeof global && t === global) return "[Global]";
                                if ("undefined" != typeof window && t === window) return "[Window]";
                                if ("undefined" != typeof document && t === document) return "[Document]";
                                if ((0, r.y1)(t)) return "[VueViewModel]";
                                if ((0, r.Cy)(t)) return "[SyntheticEvent]";
                                if ("number" == typeof t && !Number.isFinite(t)) return `[${t}]`;
                                if ("function" == typeof t) return `[Function: ${(0, a.$P)(t)}]`;
                                if ("symbol" == typeof t) return `[${String(t)}]`;
                                if ("bigint" == typeof t) return `[BigInt: ${String(t)}]`;
                                let n = (function (e) {
                                    let t = Object.getPrototypeOf(e);
                                    return t ? t.constructor.name : "null prototype";
                                })(t);
                                if (/^HTML(\w*)Element$/.test(n)) return `[HTMLElement: ${n}]`;
                                return `[object ${n}]`;
                            } catch (e) {
                                return `**non-serializable** (${e})`;
                            }
                        })(e, t);
                        if (!l.startsWith("[object ")) return l;
                        if (t.__sentry_skip_normalization__) return t;
                        let d =
                            "number" == typeof t.__sentry_override_normalization_depth__
                                ? t.__sentry_override_normalization_depth__
                                : n;
                        if (0 === d) return l.replace("object ", "");
                        if (c(t)) return "[Circular ~]";
                        if (t && "function" == typeof t.toJSON)
                            try {
                                let e = t.toJSON();
                                return visit("", e, d - 1, o, s);
                            } catch (e) {}
                        let p = Array.isArray(t) ? [] : {},
                            f = 0,
                            m = (0, i.Sh)(t);
                        for (let e in m) {
                            if (!Object.prototype.hasOwnProperty.call(m, e)) continue;
                            if (f >= o) {
                                p[e] = "[MaxProperties ~]";
                                break;
                            }
                            let t = m[e];
                            (p[e] = visit(e, t, d - 1, o, s)), f++;
                        }
                        return u(t), p;
                    })("", e, t, n);
                } catch (e) {
                    return {
                        ERROR: `**non-serializable** (${e})`,
                    };
                }
            }
        },
        59702: function (e, t, n) {
            "use strict";
            n.d(t, {
                $Q: function () {
                    return markFunctionWrapped;
                },
                HK: function () {
                    return getOriginalFunction;
                },
                Jr: function () {
                    return dropUndefinedKeys;
                },
                Sh: function () {
                    return convertToPlainObject;
                },
                hl: function () {
                    return fill;
                },
                xp: function () {
                    return addNonEnumerableProperty;
                },
                zf: function () {
                    return extractExceptionKeysForMessage;
                },
            });
            var r = n(46848),
                i = n(55181),
                a = n(38660),
                o = n(54996),
                s = n(82314);
            function fill(e, t, n) {
                if (!(t in e)) return;
                let r = e[t],
                    a = n(r);
                "function" == typeof a && markFunctionWrapped(a, r);
                try {
                    e[t] = a;
                } catch {
                    i.X && o.kg.log(`Failed to replace method "${t}" in object`, e);
                }
            }
            function addNonEnumerableProperty(e, t, n) {
                try {
                    Object.defineProperty(e, t, {
                        value: n,
                        writable: !0,
                        configurable: !0,
                    });
                } catch (n) {
                    i.X && o.kg.log(`Failed to add non-enumerable property "${t}" to object`, e);
                }
            }
            function markFunctionWrapped(e, t) {
                try {
                    let n = t.prototype || {};
                    (e.prototype = t.prototype = n), addNonEnumerableProperty(e, "__sentry_original__", t);
                } catch (e) {}
            }
            function getOriginalFunction(e) {
                return e.__sentry_original__;
            }
            function convertToPlainObject(e) {
                if ((0, a.VZ)(e))
                    return {
                        message: e.message,
                        name: e.name,
                        stack: e.stack,
                        ...getOwnProperties(e),
                    };
                if (!(0, a.cO)(e)) return e;
                {
                    let t = {
                        type: e.type,
                        target: serializeEventTarget(e.target),
                        currentTarget: serializeEventTarget(e.currentTarget),
                        ...getOwnProperties(e),
                    };
                    return "undefined" != typeof CustomEvent && (0, a.V9)(e, CustomEvent) && (t.detail = e.detail), t;
                }
            }
            function serializeEventTarget(e) {
                try {
                    return (0, a.kK)(e) ? (0, r.Rt)(e) : Object.prototype.toString.call(e);
                } catch (e) {
                    return "<unknown>";
                }
            }
            function getOwnProperties(e) {
                if ("object" != typeof e || null === e) return {};
                {
                    let t = {};
                    for (let n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t;
                }
            }
            function extractExceptionKeysForMessage(e, t = 40) {
                let n = Object.keys(convertToPlainObject(e));
                n.sort();
                let r = n[0];
                if (!r) return "[object has no keys]";
                if (r.length >= t) return (0, s.$G)(r, t);
                for (let e = n.length; e > 0; e--) {
                    let r = n.slice(0, e).join(", ");
                    if (!(r.length > t)) {
                        if (e === n.length) return r;
                        return (0, s.$G)(r, t);
                    }
                }
                return "";
            }
            function dropUndefinedKeys(e) {
                let t = new Map();
                return (function _dropUndefinedKeys(e, t) {
                    if (
                        (function (e) {
                            if (!(0, a.PO)(e)) return !1;
                            try {
                                let t = Object.getPrototypeOf(e).constructor.name;
                                return !t || "Object" === t;
                            } catch {
                                return !0;
                            }
                        })(e)
                    ) {
                        let n = t.get(e);
                        if (void 0 !== n) return n;
                        let r = {};
                        for (let n of (t.set(e, r), Object.getOwnPropertyNames(e)))
                            void 0 !== e[n] && (r[n] = _dropUndefinedKeys(e[n], t));
                        return r;
                    }
                    if (Array.isArray(e)) {
                        let n = t.get(e);
                        if (void 0 !== n) return n;
                        let r = [];
                        return (
                            t.set(e, r),
                            e.forEach((e) => {
                                r.push(_dropUndefinedKeys(e, t));
                            }),
                            r
                        );
                    }
                    return e;
                })(e, t);
            }
        },
        16160: function (e, t, n) {
            "use strict";
            n.d(t, {
                H: function () {
                    return generateTraceId;
                },
                M: function () {
                    return generateSpanId;
                },
            });
            var r = n(22473);
            function generateTraceId() {
                return (0, r.DM)();
            }
            function generateSpanId() {
                return (0, r.DM)().substring(16);
            }
        },
        15919: function (e, t, n) {
            "use strict";
            n.d(t, {
                $P: function () {
                    return getFunctionName;
                },
                Fi: function () {
                    return r;
                },
                Fr: function () {
                    return getFramesFromEvent;
                },
                Sq: function () {
                    return stackParserFromStackParserOptions;
                },
                pE: function () {
                    return createStackParser;
                },
            });
            let r = "?",
                i = /\(error: (.*)\)/,
                a = /captureMessage|captureException/;
            function createStackParser(...e) {
                let t = e.sort((e, t) => e[0] - t[0]).map((e) => e[1]);
                return (e, n = 0, o = 0) => {
                    let s = [],
                        c = e.split("\n");
                    for (let e = n; e < c.length; e++) {
                        let n = c[e];
                        if (n.length > 1024) continue;
                        let r = i.test(n) ? n.replace(i, "$1") : n;
                        if (!r.match(/\S*Error: /)) {
                            for (let e of t) {
                                let t = e(r);
                                if (t) {
                                    s.push(t);
                                    break;
                                }
                            }
                            if (s.length >= 50 + o) break;
                        }
                    }
                    return (function (e) {
                        if (!e.length) return [];
                        let t = Array.from(e);
                        return (
                            /sentryWrapped/.test(getLastStackFrame(t).function || "") && t.pop(),
                            t.reverse(),
                            a.test(getLastStackFrame(t).function || "") &&
                                (t.pop(), a.test(getLastStackFrame(t).function || "") && t.pop()),
                            t.slice(0, 50).map((e) => ({
                                ...e,
                                filename: e.filename || getLastStackFrame(t).filename,
                                function: e.function || r,
                            }))
                        );
                    })(s.slice(o));
                };
            }
            function stackParserFromStackParserOptions(e) {
                return Array.isArray(e) ? createStackParser(...e) : e;
            }
            function getLastStackFrame(e) {
                return e[e.length - 1] || {};
            }
            let o = "<anonymous>";
            function getFunctionName(e) {
                try {
                    if (!e || "function" != typeof e) return o;
                    return e.name || o;
                } catch (e) {
                    return o;
                }
            }
            function getFramesFromEvent(e) {
                let t = e.exception;
                if (t) {
                    let e = [];
                    try {
                        return (
                            t.values.forEach((t) => {
                                t.stacktrace.frames && e.push(...t.stacktrace.frames);
                            }),
                            e
                        );
                    } catch (e) {}
                }
            }
        },
        82314: function (e, t, n) {
            "use strict";
            n.d(t, {
                $G: function () {
                    return truncate;
                },
                U0: function () {
                    return stringMatchesSomePattern;
                },
                nK: function () {
                    return safeJoin;
                },
            });
            var r = n(38660);
            function truncate(e, t = 0) {
                return "string" != typeof e || 0 === t ? e : e.length <= t ? e : `${e.slice(0, t)}...`;
            }
            function safeJoin(e, t) {
                if (!Array.isArray(e)) return "";
                let n = [];
                for (let t = 0; t < e.length; t++) {
                    let i = e[t];
                    try {
                        (0, r.y1)(i) ? n.push("[VueViewModel]") : n.push(String(i));
                    } catch (e) {
                        n.push("[value cannot be serialized]");
                    }
                }
                return n.join(t);
            }
            function stringMatchesSomePattern(e, t = [], n = !1) {
                return t.some((t) =>
                    (function (e, t, n = !1) {
                        return (
                            !!(0, r.HD)(e) &&
                            ((0, r.Kj)(t) ? t.test(e) : !!(0, r.HD)(t) && (n ? e === t : e.includes(t)))
                        );
                    })(e, t, n)
                );
            }
        },
        26365: function (e, t, n) {
            "use strict";
            n.d(t, {
                Ak: function () {
                    return supportsFetch;
                },
                Bf: function () {
                    return supportsHistory;
                },
                QC: function () {
                    return isNativeFunction;
                },
                t$: function () {
                    return supportsNativeFetch;
                },
            });
            var r = n(55181),
                i = n(54996),
                a = n(30641);
            let o = a.GLOBAL_OBJ;
            function supportsHistory() {
                return "history" in o;
            }
            function supportsFetch() {
                if (!("fetch" in o)) return !1;
                try {
                    return new Headers(), new Request("http://www.example.com"), new Response(), !0;
                } catch (e) {
                    return !1;
                }
            }
            function isNativeFunction(e) {
                return e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString());
            }
            function supportsNativeFetch() {
                if ("string" == typeof EdgeRuntime) return !0;
                if (!supportsFetch()) return !1;
                if (isNativeFunction(o.fetch)) return !0;
                let e = !1,
                    t = o.document;
                if (t && "function" == typeof t.createElement)
                    try {
                        let n = t.createElement("iframe");
                        (n.hidden = !0),
                            t.head.appendChild(n),
                            n.contentWindow?.fetch && (e = isNativeFunction(n.contentWindow.fetch)),
                            t.head.removeChild(n);
                    } catch (e) {
                        r.X &&
                            i.kg.warn(
                                "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                                e
                            );
                    }
                return e;
            }
        },
        9831: function (e, t, n) {
            "use strict";
            n.d(t, {
                $2: function () {
                    return rejectedSyncPromise;
                },
                WD: function () {
                    return resolvedSyncPromise;
                },
                cW: function () {
                    return SyncPromise;
                },
            });
            var r,
                i,
                a = n(38660);
            function resolvedSyncPromise(e) {
                return new SyncPromise((t) => {
                    t(e);
                });
            }
            function rejectedSyncPromise(e) {
                return new SyncPromise((t, n) => {
                    n(e);
                });
            }
            ((r = i || (i = {}))[(r.PENDING = 0)] = "PENDING"),
                (r[(r.RESOLVED = 1)] = "RESOLVED"),
                (r[(r.REJECTED = 2)] = "REJECTED");
            let SyncPromise = class SyncPromise {
                constructor(e) {
                    (this._state = i.PENDING), (this._handlers = []), this._runExecutor(e);
                }
                then(e, t) {
                    return new SyncPromise((n, r) => {
                        this._handlers.push([
                            !1,
                            (t) => {
                                if (e)
                                    try {
                                        n(e(t));
                                    } catch (e) {
                                        r(e);
                                    }
                                else n(t);
                            },
                            (e) => {
                                if (t)
                                    try {
                                        n(t(e));
                                    } catch (e) {
                                        r(e);
                                    }
                                else r(e);
                            },
                        ]),
                            this._executeHandlers();
                    });
                }
                catch(e) {
                    return this.then((e) => e, e);
                }
                finally(e) {
                    return new SyncPromise((t, n) => {
                        let r, i;
                        return this.then(
                            (t) => {
                                (i = !1), (r = t), e && e();
                            },
                            (t) => {
                                (i = !0), (r = t), e && e();
                            }
                        ).then(() => {
                            if (i) {
                                n(r);
                                return;
                            }
                            t(r);
                        });
                    });
                }
                _executeHandlers() {
                    if (this._state === i.PENDING) return;
                    let e = this._handlers.slice();
                    (this._handlers = []),
                        e.forEach((e) => {
                            e[0] ||
                                (this._state === i.RESOLVED && e[1](this._value),
                                this._state === i.REJECTED && e[2](this._value),
                                (e[0] = !0));
                        });
                }
                _runExecutor(e) {
                    let setResult = (e, t) => {
                            if (this._state === i.PENDING) {
                                if ((0, a.J8)(t)) {
                                    t.then(resolve, reject);
                                    return;
                                }
                                (this._state = e), (this._value = t), this._executeHandlers();
                            }
                        },
                        resolve = (e) => {
                            setResult(i.RESOLVED, e);
                        },
                        reject = (e) => {
                            setResult(i.REJECTED, e);
                        };
                    try {
                        e(resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }
            };
        },
        14430: function (e, t, n) {
            "use strict";
            let r;
            n.d(t, {
                Z1: function () {
                    return browserPerformanceTimeOrigin;
                },
                ph: function () {
                    return a;
                },
                yW: function () {
                    return dateTimestampInSeconds;
                },
            });
            var i = n(30641);
            function dateTimestampInSeconds() {
                return Date.now() / 1e3;
            }
            let a = (function () {
                let { performance: e } = i.GLOBAL_OBJ;
                if (!e?.now) return dateTimestampInSeconds;
                let t = Date.now() - e.now(),
                    n = void 0 == e.timeOrigin ? t : e.timeOrigin;
                return () => (n + e.now()) / 1e3;
            })();
            function browserPerformanceTimeOrigin() {
                return (
                    r ||
                        (r = (function () {
                            let { performance: e } = i.GLOBAL_OBJ;
                            if (!e?.now) return [void 0, "none"];
                            let t = e.now(),
                                n = Date.now(),
                                r = e.timeOrigin ? Math.abs(e.timeOrigin + t - n) : 36e5,
                                a = e.timing?.navigationStart,
                                o = "number" == typeof a ? Math.abs(a + t - n) : 36e5;
                            return r < 36e5 || o < 36e5
                                ? r <= o
                                    ? [e.timeOrigin, "timeOrigin"]
                                    : [a, "navigationStart"]
                                : [n, "dateNow"];
                        })()),
                    r[0]
                );
            }
        },
        38719: function (e, t, n) {
            "use strict";
            n.d(t, {
                $p: function () {
                    return generateSentryTraceHeader;
                },
                Ke: function () {
                    return o;
                },
                pT: function () {
                    return propagationContextFromHeaders;
                },
            });
            var r = n(96519),
                i = n(52512),
                a = n(16160);
            let o = RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
            function propagationContextFromHeaders(e, t) {
                let n = (function (e) {
                        let t;
                        if (!e) return;
                        let n = e.match(o);
                        if (n)
                            return (
                                "1" === n[3] ? (t = !0) : "0" === n[3] && (t = !1),
                                {
                                    traceId: n[1],
                                    parentSampled: t,
                                    parentSpanId: n[2],
                                }
                            );
                    })(e),
                    s = (0, i.EN)(t);
                if (!n?.traceId)
                    return {
                        traceId: (0, a.H)(),
                        sampleRand: Math.random(),
                    };
                let c = (function (e, t) {
                    let n = (0, r.o)(t?.sample_rand);
                    if (void 0 !== n) return n;
                    let i = (0, r.o)(t?.sample_rate);
                    return i && e?.parentSampled !== void 0
                        ? e.parentSampled
                            ? Math.random() * i
                            : i + Math.random() * (1 - i)
                        : Math.random();
                })(n, s);
                s && (s.sample_rand = c.toString());
                let { traceId: u, parentSpanId: l, parentSampled: d } = n;
                return {
                    traceId: u,
                    parentSpanId: l,
                    sampled: d,
                    dsc: s || {},
                    sampleRand: c,
                };
            }
            function generateSentryTraceHeader(e = (0, a.H)(), t = (0, a.M)(), n) {
                let r = "";
                return void 0 !== n && (r = n ? "-1" : "-0"), `${e}-${t}${r}`;
            }
        },
        10047: function (e, t, n) {
            "use strict";
            function parseUrl(e) {
                if (!e) return {};
                let t = e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
                if (!t) return {};
                let n = t[6] || "",
                    r = t[8] || "";
                return {
                    host: t[4],
                    path: t[5],
                    protocol: t[2],
                    search: n,
                    hash: r,
                    relative: t[5] + n + r,
                };
            }
            function stripUrlQueryAndFragment(e) {
                return e.split(/[?#]/, 1)[0];
            }
            n.d(t, {
                en: function () {
                    return parseUrl;
                },
                rt: function () {
                    return stripUrlQueryAndFragment;
                },
            });
        },
        75474: function (e, t, n) {
            "use strict";
            n.d(t, {
                J: function () {
                    return r;
                },
            });
            let r = "9.2.0";
        },
        30641: function (e, t, n) {
            "use strict";
            n.d(t, {
                GLOBAL_OBJ: function () {
                    return r;
                },
            });
            let r = globalThis;
        },
        81469: function (e, t, n) {
            "use strict";
            n.d(t, {
                f: function () {
                    return hasSpansEnabled;
                },
            });
            var r = n(40600);
            function hasSpansEnabled(e) {
                if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__) return !1;
                let t = e || r.s3()?.getOptions();
                return !!t && (null != t.tracesSampleRate || !!t.tracesSampler);
            }
        },
        76605: function (e, t, n) {
            "use strict";
            n.d(t, {
                T: function () {
                    return function merge(e, t, n = 2) {
                        if (!t || "object" != typeof t || n <= 0) return t;
                        if (e && 0 === Object.keys(t).length) return e;
                        let r = {
                            ...e,
                        };
                        for (let e in t)
                            Object.prototype.hasOwnProperty.call(t, e) && (r[e] = merge(r[e], t[e], n - 1));
                        return r;
                    };
                },
            });
        },
        96519: function (e, t, n) {
            "use strict";
            function parseSampleRate(e) {
                if ("boolean" == typeof e) return Number(e);
                let t = "string" == typeof e ? parseFloat(e) : e;
                if (!("number" != typeof t || isNaN(t)) && !(t < 0) && !(t > 1)) return t;
            }
            n.d(t, {
                o: function () {
                    return parseSampleRate;
                },
            });
        },
        28552: function (e, t, n) {
            "use strict";
            let r, i, a;
            n.d(t, {
                U0: function () {
                    return parseEventHintOrCaptureContext;
                },
                R: function () {
                    return prepareEvent;
                },
            });
            var o = n(62779),
                s = n(40600),
                c = n(92543),
                u = n(38660),
                l = n(54996),
                d = n(9831),
                p = n(55854),
                f = n(30641),
                m = n(22473),
                g = n(87249),
                h = n(82314),
                _ = n(14430),
                v = n(16802),
                y = n(59702),
                S = n(76605),
                b = n(18887);
            function mergeScopeData(e, t) {
                let {
                    extra: n,
                    tags: r,
                    user: i,
                    contexts: a,
                    level: o,
                    sdkProcessingMetadata: s,
                    breadcrumbs: c,
                    fingerprint: u,
                    eventProcessors: l,
                    attachments: d,
                    propagationContext: p,
                    transactionName: f,
                    span: m,
                } = t;
                mergeAndOverwriteScopeData(e, "extra", n),
                    mergeAndOverwriteScopeData(e, "tags", r),
                    mergeAndOverwriteScopeData(e, "user", i),
                    mergeAndOverwriteScopeData(e, "contexts", a),
                    (e.sdkProcessingMetadata = (0, S.T)(e.sdkProcessingMetadata, s, 2)),
                    o && (e.level = o),
                    f && (e.transactionName = f),
                    m && (e.span = m),
                    c.length && (e.breadcrumbs = [...e.breadcrumbs, ...c]),
                    u.length && (e.fingerprint = [...e.fingerprint, ...u]),
                    l.length && (e.eventProcessors = [...e.eventProcessors, ...l]),
                    d.length && (e.attachments = [...e.attachments, ...d]),
                    (e.propagationContext = {
                        ...e.propagationContext,
                        ...p,
                    });
            }
            function mergeAndOverwriteScopeData(e, t, n) {
                e[t] = (0, S.T)(e[t], n, 1);
            }
            function prepareEvent(e, t, n, S, E, T) {
                let { normalizeDepth: x = 3, normalizeMaxBreadth: k = 1e3 } = e,
                    w = {
                        ...t,
                        event_id: t.event_id || n.event_id || (0, m.DM)(),
                        timestamp: t.timestamp || (0, _.yW)(),
                    },
                    I = n.integrations || e.integrations.map((e) => e.name);
                (function (e, t) {
                    let { environment: n, release: r, dist: i, maxValueLength: a = 250 } = t;
                    (e.environment = e.environment || n || o.J),
                        !e.release && r && (e.release = r),
                        !e.dist && i && (e.dist = i),
                        e.message && (e.message = (0, h.$G)(e.message, a));
                    let s = e.exception?.values?.[0];
                    s?.value && (s.value = (0, h.$G)(s.value, a));
                    let c = e.request;
                    c?.url && (c.url = (0, h.$G)(c.url, a));
                })(w, e),
                    I.length > 0 &&
                        ((w.sdk = w.sdk || {}), (w.sdk.integrations = [...(w.sdk.integrations || []), ...I])),
                    E && E.emit("applyFrameMetadata", t),
                    void 0 === t.type &&
                        (function (e, t) {
                            let n = (function (e) {
                                let t = f.GLOBAL_OBJ._sentryDebugIds;
                                if (!t) return {};
                                let n = Object.keys(t);
                                return a && n.length === i
                                    ? a
                                    : ((i = n.length),
                                      (a = n.reduce((n, i) => {
                                          r || (r = {});
                                          let a = r[i];
                                          if (a) n[a[0]] = a[1];
                                          else {
                                              let a = e(i);
                                              for (let e = a.length - 1; e >= 0; e--) {
                                                  let o = a[e],
                                                      s = o?.filename,
                                                      c = t[i];
                                                  if (s && c) {
                                                      (n[s] = c), (r[i] = [s, c]);
                                                      break;
                                                  }
                                              }
                                          }
                                          return n;
                                      }, {})));
                            })(t);
                            e.exception?.values?.forEach((e) => {
                                e.stacktrace?.frames?.forEach((e) => {
                                    e.filename && (e.debug_id = n[e.filename]);
                                });
                            });
                        })(w, e.stackParser);
                let O = (function (e, t) {
                    if (!t) return e;
                    let n = e ? e.clone() : new p.s();
                    return n.update(t), n;
                })(S, n.captureContext);
                n.mechanism && (0, m.EG)(w, n.mechanism);
                let C = E ? E.getEventProcessors() : [],
                    A = (0, s.lW)().getScopeData();
                if (T) {
                    let e = T.getScopeData();
                    mergeScopeData(A, e);
                }
                if (O) {
                    let e = O.getScopeData();
                    mergeScopeData(A, e);
                }
                let P = [...(n.attachments || []), ...A.attachments];
                P.length && (n.attachments = P),
                    (function (e, t) {
                        let { fingerprint: n, span: r, breadcrumbs: i, sdkProcessingMetadata: a } = t;
                        (function (e, t) {
                            let { extra: n, tags: r, user: i, contexts: a, level: o, transactionName: s } = t,
                                c = (0, y.Jr)(n);
                            Object.keys(c).length &&
                                (e.extra = {
                                    ...c,
                                    ...e.extra,
                                });
                            let u = (0, y.Jr)(r);
                            Object.keys(u).length &&
                                (e.tags = {
                                    ...u,
                                    ...e.tags,
                                });
                            let l = (0, y.Jr)(i);
                            Object.keys(l).length &&
                                (e.user = {
                                    ...l,
                                    ...e.user,
                                });
                            let d = (0, y.Jr)(a);
                            Object.keys(d).length &&
                                (e.contexts = {
                                    ...d,
                                    ...e.contexts,
                                }),
                                o && (e.level = o),
                                s && "transaction" !== e.type && (e.transaction = s);
                        })(e, t),
                            r &&
                                (function (e, t) {
                                    (e.contexts = {
                                        trace: (0, b.wy)(t),
                                        ...e.contexts,
                                    }),
                                        (e.sdkProcessingMetadata = {
                                            dynamicSamplingContext: (0, v.jC)(t),
                                            ...e.sdkProcessingMetadata,
                                        });
                                    let n = (0, b.Gx)(t),
                                        r = (0, b.XU)(n).description;
                                    r && !e.transaction && "transaction" === e.type && (e.transaction = r);
                                })(e, r),
                            (e.fingerprint = e.fingerprint
                                ? Array.isArray(e.fingerprint)
                                    ? e.fingerprint
                                    : [e.fingerprint]
                                : []),
                            n && (e.fingerprint = e.fingerprint.concat(n)),
                            e.fingerprint.length || delete e.fingerprint,
                            (function (e, t) {
                                let n = [...(e.breadcrumbs || []), ...t];
                                e.breadcrumbs = n.length ? n : void 0;
                            })(e, i),
                            (e.sdkProcessingMetadata = {
                                ...e.sdkProcessingMetadata,
                                ...a,
                            });
                    })(w, A);
                let D = [...C, ...A.eventProcessors],
                    $ = (function notifyEventProcessors(e, t, n, r = 0) {
                        return new d.cW((i, a) => {
                            let o = e[r];
                            if (null === t || "function" != typeof o) i(t);
                            else {
                                let s = o(
                                    {
                                        ...t,
                                    },
                                    n
                                );
                                c.X && o.id && null === s && l.kg.log(`Event processor "${o.id}" dropped event`),
                                    (0, u.J8)(s)
                                        ? s.then((t) => notifyEventProcessors(e, t, n, r + 1).then(i)).then(null, a)
                                        : notifyEventProcessors(e, s, n, r + 1)
                                              .then(i)
                                              .then(null, a);
                            }
                        });
                    })(D, w, n);
                return $.then((e) =>
                    (e &&
                        (function (e) {
                            let t = {};
                            if (
                                (e.exception?.values?.forEach((e) => {
                                    e.stacktrace?.frames?.forEach((e) => {
                                        e.debug_id &&
                                            (e.abs_path
                                                ? (t[e.abs_path] = e.debug_id)
                                                : e.filename && (t[e.filename] = e.debug_id),
                                            delete e.debug_id);
                                    });
                                }),
                                0 === Object.keys(t).length)
                            )
                                return;
                            (e.debug_meta = e.debug_meta || {}), (e.debug_meta.images = e.debug_meta.images || []);
                            let n = e.debug_meta.images;
                            Object.entries(t).forEach(([e, t]) => {
                                n.push({
                                    type: "sourcemap",
                                    code_file: e,
                                    debug_id: t,
                                });
                            });
                        })(e),
                    "number" == typeof x && x > 0)
                        ? (function (e, t, n) {
                              if (!e) return null;
                              let r = {
                                  ...e,
                                  ...(e.breadcrumbs && {
                                      breadcrumbs: e.breadcrumbs.map((e) => ({
                                          ...e,
                                          ...(e.data && {
                                              data: (0, g.Fv)(e.data, t, n),
                                          }),
                                      })),
                                  }),
                                  ...(e.user && {
                                      user: (0, g.Fv)(e.user, t, n),
                                  }),
                                  ...(e.contexts && {
                                      contexts: (0, g.Fv)(e.contexts, t, n),
                                  }),
                                  ...(e.extra && {
                                      extra: (0, g.Fv)(e.extra, t, n),
                                  }),
                              };
                              return (
                                  e.contexts?.trace &&
                                      r.contexts &&
                                      ((r.contexts.trace = e.contexts.trace),
                                      e.contexts.trace.data &&
                                          (r.contexts.trace.data = (0, g.Fv)(e.contexts.trace.data, t, n))),
                                  e.spans &&
                                      (r.spans = e.spans.map((e) => ({
                                          ...e,
                                          ...(e.data && {
                                              data: (0, g.Fv)(e.data, t, n),
                                          }),
                                      }))),
                                  e.contexts?.flags &&
                                      r.contexts &&
                                      (r.contexts.flags = (0, g.Fv)(e.contexts.flags, 3, n)),
                                  r
                              );
                          })(e, x, k)
                        : e
                );
            }
            function parseEventHintOrCaptureContext(e) {
                return e
                    ? e instanceof p.s || "function" == typeof e || Object.keys(e).some((e) => E.includes(e))
                        ? {
                              captureContext: e,
                          }
                        : e
                    : void 0;
            }
            let E = ["user", "level", "extra", "contexts", "tags", "fingerprint", "propagationContext"];
        },
        70975: function (e, t, n) {
            "use strict";
            n.d(t, {
                V: function () {
                    return applySdkMetadata;
                },
            });
            var r = n(75474);
            function applySdkMetadata(e, t, n = [t], i = "npm") {
                let a = e._metadata || {};
                a.sdk ||
                    (a.sdk = {
                        name: `sentry.javascript.${t}`,
                        packages: n.map((e) => ({
                            name: `${i}:@sentry/${e}`,
                            version: r.J,
                        })),
                        version: r.J,
                    }),
                    (e._metadata = a);
            }
        },
        59357: function (e, t, n) {
            "use strict";
            n.d(t, {
                D: function () {
                    return _setSpanForScope;
                },
                Y: function () {
                    return _getSpanForScope;
                },
            });
            var r = n(59702);
            let i = "_sentrySpan";
            function _setSpanForScope(e, t) {
                t ? (0, r.xp)(e, i, t) : delete e[i];
            }
            function _getSpanForScope(e) {
                return e[i];
            }
        },
        18887: function (e, t, n) {
            "use strict";
            n.d(t, {
                $k: function () {
                    return spanTimeInputToSeconds;
                },
                Dp: function () {
                    return getSpanDescendants;
                },
                FF: function () {
                    return convertSpanLinksForEnvelope;
                },
                Gx: function () {
                    return getRootSpan;
                },
                HN: function () {
                    return getActiveSpan;
                },
                HR: function () {
                    return spanToTransactionTraceContext;
                },
                Hb: function () {
                    return spanToTraceHeader;
                },
                R6: function () {
                    return showSpanDropWarning;
                },
                Tt: function () {
                    return spanIsSampled;
                },
                XU: function () {
                    return spanToJSON;
                },
                _4: function () {
                    return getStatusMessage;
                },
                ed: function () {
                    return removeChildSpanFromSpan;
                },
                i0: function () {
                    return h;
                },
                j5: function () {
                    return addChildSpanToSpan;
                },
                ve: function () {
                    return g;
                },
                wy: function () {
                    return spanToTraceContext;
                },
            });
            var r = n(19979),
                i = n(3890),
                a = n(40600),
                o = n(9804),
                s = n(62563),
                c = n(8201),
                u = n(54996),
                l = n(59702),
                d = n(16160),
                p = n(14430),
                f = n(38719),
                m = n(59357);
            let g = 0,
                h = 1,
                _ = !1;
            function spanToTransactionTraceContext(e) {
                let { spanId: t, traceId: n } = e.spanContext(),
                    { data: r, op: i, parent_span_id: a, status: o, origin: s, links: c } = spanToJSON(e);
                return (0, l.Jr)({
                    parent_span_id: a,
                    span_id: t,
                    trace_id: n,
                    data: r,
                    op: i,
                    status: o,
                    origin: s,
                    links: c,
                });
            }
            function spanToTraceContext(e) {
                let { spanId: t, traceId: n, isRemote: r } = e.spanContext(),
                    i = r ? t : spanToJSON(e).parent_span_id,
                    a = (0, c.I)(e).scope,
                    o = r ? a?.getPropagationContext().propagationSpanId || (0, d.M)() : t;
                return (0, l.Jr)({
                    parent_span_id: i,
                    span_id: o,
                    trace_id: n,
                });
            }
            function spanToTraceHeader(e) {
                let { traceId: t, spanId: n } = e.spanContext(),
                    r = spanIsSampled(e);
                return (0, f.$p)(t, n, r);
            }
            function convertSpanLinksForEnvelope(e) {
                return e && e.length > 0
                    ? e.map(({ context: { spanId: e, traceId: t, traceFlags: n, ...r }, attributes: i }) => ({
                          span_id: e,
                          trace_id: t,
                          sampled: n === h,
                          attributes: i,
                          ...r,
                      }))
                    : void 0;
            }
            function spanTimeInputToSeconds(e) {
                return "number" == typeof e
                    ? ensureTimestampInSeconds(e)
                    : Array.isArray(e)
                      ? e[0] + e[1] / 1e9
                      : e instanceof Date
                        ? ensureTimestampInSeconds(e.getTime())
                        : (0, p.ph)();
            }
            function ensureTimestampInSeconds(e) {
                return e > 9999999999 ? e / 1e3 : e;
            }
            function spanToJSON(e) {
                if ("function" == typeof e.getSpanJSON) return e.getSpanJSON();
                let { spanId: t, traceId: n } = e.spanContext();
                if (e.attributes && e.startTime && e.name && e.endTime && e.status) {
                    let { attributes: r, startTime: i, name: a, endTime: s, parentSpanId: c, status: u, links: d } = e;
                    return (0, l.Jr)({
                        span_id: t,
                        trace_id: n,
                        data: r,
                        description: a,
                        parent_span_id: c,
                        start_timestamp: spanTimeInputToSeconds(i),
                        timestamp: spanTimeInputToSeconds(s) || void 0,
                        status: getStatusMessage(u),
                        op: r[o.$J],
                        origin: r[o.S3],
                        links: convertSpanLinksForEnvelope(d),
                    });
                }
                return {
                    span_id: t,
                    trace_id: n,
                    start_timestamp: 0,
                    data: {},
                };
            }
            function spanIsSampled(e) {
                let { traceFlags: t } = e.spanContext();
                return t === h;
            }
            function getStatusMessage(e) {
                return e && e.code !== s.pq ? (e.code === s.OP ? "ok" : e.message || "unknown_error") : void 0;
            }
            let v = "_sentryChildSpans",
                y = "_sentryRootSpan";
            function addChildSpanToSpan(e, t) {
                let n = e[y] || e;
                (0, l.xp)(t, y, n), e[v] ? e[v].add(t) : (0, l.xp)(e, v, new Set([t]));
            }
            function removeChildSpanFromSpan(e, t) {
                e[v] && e[v].delete(t);
            }
            function getSpanDescendants(e) {
                let t = new Set();
                return (
                    !(function addSpanChildren(e) {
                        if (!t.has(e) && spanIsSampled(e)) {
                            t.add(e);
                            let n = e[v] ? Array.from(e[v]) : [];
                            for (let e of n) addSpanChildren(e);
                        }
                    })(e),
                    Array.from(t)
                );
            }
            function getRootSpan(e) {
                return e[y] || e;
            }
            function getActiveSpan() {
                let e = (0, i.cu)(),
                    t = (0, r.G)(e);
                return t.getActiveSpan ? t.getActiveSpan() : (0, m.Y)((0, a.nZ)());
            }
            function showSpanDropWarning() {
                _ ||
                    ((0, u.Cf)(() => {
                        console.warn(
                            "[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly."
                        );
                    }),
                    (_ = !0));
            }
        },
        56047: function (e, t, n) {
            "use strict";
            let r, i, a, o, s, c, u, l;
            n.d(t, {
                S1: function () {
                    return client_init;
                },
            });
            var d = n(30641),
                p = n(70975),
                f = n(88808),
                m = n(64947),
                g = n(2265),
                h = n(25566),
                _ = n(38660),
                v = n(14430),
                y = n(18887),
                S = n(9804),
                b = n(46848),
                E = n(92543),
                T = n(54996);
            function timedEventsToMeasurements(e) {
                if (!e || 0 === e.length) return;
                let t = {};
                return (
                    e.forEach((e) => {
                        let n = e.attributes || {},
                            r = n[S.E1],
                            i = n[S.Wb];
                        "string" == typeof r &&
                            "number" == typeof i &&
                            (t[e.name] = {
                                value: i,
                                unit: r,
                            });
                    }),
                    t
                );
            }
            var x = n(10047),
                k = n(37527),
                w = n(40600),
                I = n(59702),
                O = n(43624),
                C = n(15919);
            let getRating = (e, t) => (e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good"),
                bindReporter = (e, t, n, r) => {
                    let i, a;
                    return (o) => {
                        t.value >= 0 &&
                            (o || r) &&
                            ((a = t.value - (i || 0)) || void 0 === i) &&
                            ((i = t.value), (t.delta = a), (t.rating = getRating(t.value, n)), e(t));
                    };
                },
                generateUniqueID = () => `v4-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`,
                getNavigationEntry = (e = !0) => {
                    let t = k.m.performance?.getEntriesByType?.("navigation")[0];
                    if (!e || (t && t.responseStart > 0 && t.responseStart < performance.now())) return t;
                },
                getActivationStart = () => {
                    let e = getNavigationEntry();
                    return e?.activationStart || 0;
                },
                initMetric = (e, t) => {
                    let n = getNavigationEntry(),
                        r = "navigate";
                    return (
                        n &&
                            (k.m.document?.prerendering || getActivationStart() > 0
                                ? (r = "prerender")
                                : k.m.document?.wasDiscarded
                                  ? (r = "restore")
                                  : n.type && (r = n.type.replace(/_/g, "-"))),
                        {
                            name: e,
                            value: void 0 === t ? -1 : t,
                            rating: "good",
                            delta: 0,
                            entries: [],
                            id: generateUniqueID(),
                            navigationType: r,
                        }
                    );
                },
                observe = (e, t, n) => {
                    try {
                        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                            let r = new PerformanceObserver((e) => {
                                Promise.resolve().then(() => {
                                    t(e.getEntries());
                                });
                            });
                            return (
                                r.observe(
                                    Object.assign(
                                        {
                                            type: e,
                                            buffered: !0,
                                        },
                                        n || {}
                                    )
                                ),
                                r
                            );
                        }
                    } catch (e) {}
                },
                onHidden = (e) => {
                    let onHiddenOrPageHide = (t) => {
                        ("pagehide" === t.type || k.m.document?.visibilityState === "hidden") && e(t);
                    };
                    k.m.document &&
                        (addEventListener("visibilitychange", onHiddenOrPageHide, !0),
                        addEventListener("pagehide", onHiddenOrPageHide, !0));
                },
                runOnce = (e) => {
                    let t = !1;
                    return () => {
                        t || (e(), (t = !0));
                    };
                },
                A = -1,
                initHiddenTime = () =>
                    "hidden" !== k.m.document.visibilityState || k.m.document.prerendering ? 1 / 0 : 0,
                onVisibilityUpdate = (e) => {
                    "hidden" === k.m.document.visibilityState &&
                        A > -1 &&
                        ((A = "visibilitychange" === e.type ? e.timeStamp : 0), removeChangeListeners());
                },
                addChangeListeners = () => {
                    addEventListener("visibilitychange", onVisibilityUpdate, !0),
                        addEventListener("prerenderingchange", onVisibilityUpdate, !0);
                },
                removeChangeListeners = () => {
                    removeEventListener("visibilitychange", onVisibilityUpdate, !0),
                        removeEventListener("prerenderingchange", onVisibilityUpdate, !0);
                },
                getVisibilityWatcher = () => (
                    k.m.document && A < 0 && ((A = initHiddenTime()), addChangeListeners()),
                    {
                        get firstHiddenTime() {
                            return A;
                        },
                    }
                ),
                whenActivated = (e) => {
                    k.m.document?.prerendering ? addEventListener("prerenderingchange", () => e(), !0) : e();
                },
                P = [1800, 3e3],
                onFCP = (e, t = {}) => {
                    whenActivated(() => {
                        let n;
                        let r = getVisibilityWatcher(),
                            i = initMetric("FCP"),
                            a = observe("paint", (e) => {
                                e.forEach((e) => {
                                    "first-contentful-paint" === e.name &&
                                        (a.disconnect(),
                                        e.startTime < r.firstHiddenTime &&
                                            ((i.value = Math.max(e.startTime - getActivationStart(), 0)),
                                            i.entries.push(e),
                                            n(!0)));
                                });
                            });
                        a && (n = bindReporter(e, i, P, t.reportAllChanges));
                    });
                },
                D = [0.1, 0.25],
                onCLS = (e, t = {}) => {
                    onFCP(
                        runOnce(() => {
                            let n;
                            let r = initMetric("CLS", 0),
                                i = 0,
                                a = [],
                                handleEntries = (e) => {
                                    e.forEach((e) => {
                                        if (!e.hadRecentInput) {
                                            let t = a[0],
                                                n = a[a.length - 1];
                                            i &&
                                            t &&
                                            n &&
                                            e.startTime - n.startTime < 1e3 &&
                                            e.startTime - t.startTime < 5e3
                                                ? ((i += e.value), a.push(e))
                                                : ((i = e.value), (a = [e]));
                                        }
                                    }),
                                        i > r.value && ((r.value = i), (r.entries = a), n());
                                },
                                o = observe("layout-shift", handleEntries);
                            o &&
                                ((n = bindReporter(e, r, D, t.reportAllChanges)),
                                onHidden(() => {
                                    handleEntries(o.takeRecords()), n(!0);
                                }),
                                setTimeout(n, 0));
                        })
                    );
                },
                $ = [100, 300],
                onFID = (e, t = {}) => {
                    whenActivated(() => {
                        let n;
                        let r = getVisibilityWatcher(),
                            i = initMetric("FID"),
                            handleEntry = (e) => {
                                e.startTime < r.firstHiddenTime &&
                                    ((i.value = e.processingStart - e.startTime), i.entries.push(e), n(!0));
                            },
                            handleEntries = (e) => {
                                e.forEach(handleEntry);
                            },
                            a = observe("first-input", handleEntries);
                        (n = bindReporter(e, i, $, t.reportAllChanges)),
                            a &&
                                onHidden(
                                    runOnce(() => {
                                        handleEntries(a.takeRecords()), a.disconnect();
                                    })
                                );
                    });
                },
                L = 0,
                R = 1 / 0,
                F = 0,
                updateEstimate = (e) => {
                    e.forEach((e) => {
                        e.interactionId &&
                            ((R = Math.min(R, e.interactionId)),
                            (L = (F = Math.max(F, e.interactionId)) ? (F - R) / 7 + 1 : 0));
                    });
                },
                getInteractionCount = () => (r ? L : performance.interactionCount || 0),
                initInteractionCountPolyfill = () => {
                    "interactionCount" in performance ||
                        r ||
                        (r = observe("event", updateEstimate, {
                            type: "event",
                            buffered: !0,
                            durationThreshold: 0,
                        }));
                },
                N = [],
                H = new Map(),
                getInteractionCountForNavigation = () => getInteractionCount() - 0,
                estimateP98LongestInteraction = () => {
                    let e = Math.min(N.length - 1, Math.floor(getInteractionCountForNavigation() / 50));
                    return N[e];
                },
                j = [],
                processInteractionEntry = (e) => {
                    if ((j.forEach((t) => t(e)), !(e.interactionId || "first-input" === e.entryType))) return;
                    let t = N[N.length - 1],
                        n = H.get(e.interactionId);
                    if (n || N.length < 10 || (t && e.duration > t.latency)) {
                        if (n)
                            e.duration > n.latency
                                ? ((n.entries = [e]), (n.latency = e.duration))
                                : e.duration === n.latency &&
                                  e.startTime === n.entries[0]?.startTime &&
                                  n.entries.push(e);
                        else {
                            let t = {
                                id: e.interactionId,
                                latency: e.duration,
                                entries: [e],
                            };
                            H.set(t.id, t), N.push(t);
                        }
                        N.sort((e, t) => t.latency - e.latency),
                            N.length > 10 && N.splice(10).forEach((e) => H.delete(e.id));
                    }
                },
                whenIdle = (e) => {
                    let t = k.m.requestIdleCallback || k.m.setTimeout,
                        n = -1;
                    return (
                        (e = runOnce(e)),
                        k.m.document?.visibilityState === "hidden" ? e() : ((n = t(e)), onHidden(e)),
                        n
                    );
                },
                M = [200, 500],
                onINP = (e, t = {}) => {
                    "PerformanceEventTiming" in k.m &&
                        "interactionId" in PerformanceEventTiming.prototype &&
                        whenActivated(() => {
                            let n;
                            initInteractionCountPolyfill();
                            let r = initMetric("INP"),
                                handleEntries = (e) => {
                                    whenIdle(() => {
                                        e.forEach(processInteractionEntry);
                                        let t = estimateP98LongestInteraction();
                                        t &&
                                            t.latency !== r.value &&
                                            ((r.value = t.latency), (r.entries = t.entries), n());
                                    });
                                },
                                i = observe("event", handleEntries, {
                                    durationThreshold: null != t.durationThreshold ? t.durationThreshold : 40,
                                });
                            (n = bindReporter(e, r, M, t.reportAllChanges)),
                                i &&
                                    (i.observe({
                                        type: "first-input",
                                        buffered: !0,
                                    }),
                                    onHidden(() => {
                                        handleEntries(i.takeRecords()), n(!0);
                                    }));
                        });
                },
                B = [2500, 4e3],
                U = {},
                onLCP = (e, t = {}) => {
                    whenActivated(() => {
                        let n;
                        let r = getVisibilityWatcher(),
                            i = initMetric("LCP"),
                            handleEntries = (e) => {
                                t.reportAllChanges || (e = e.slice(-1)),
                                    e.forEach((e) => {
                                        e.startTime < r.firstHiddenTime &&
                                            ((i.value = Math.max(e.startTime - getActivationStart(), 0)),
                                            (i.entries = [e]),
                                            n());
                                    });
                            },
                            a = observe("largest-contentful-paint", handleEntries);
                        if (a) {
                            n = bindReporter(e, i, B, t.reportAllChanges);
                            let r = runOnce(() => {
                                U[i.id] || (handleEntries(a.takeRecords()), a.disconnect(), (U[i.id] = !0), n(!0));
                            });
                            ["keydown", "click"].forEach((e) => {
                                k.m.document &&
                                    addEventListener(e, () => whenIdle(r), {
                                        once: !0,
                                        capture: !0,
                                    });
                            }),
                                onHidden(r);
                        }
                    });
                },
                X = [800, 1800],
                whenReady = (e) => {
                    k.m.document?.prerendering
                        ? whenActivated(() => whenReady(e))
                        : k.m.document?.readyState !== "complete"
                          ? addEventListener("load", () => whenReady(e), !0)
                          : setTimeout(e, 0);
                },
                onTTFB = (e, t = {}) => {
                    let n = initMetric("TTFB"),
                        r = bindReporter(e, n, X, t.reportAllChanges);
                    whenReady(() => {
                        let e = getNavigationEntry();
                        e &&
                            ((n.value = Math.max(e.responseStart - getActivationStart(), 0)), (n.entries = [e]), r(!0));
                    });
                },
                J = {},
                G = {};
            function addClsInstrumentationHandler(e, t = !1) {
                return addMetricObserver("cls", e, instrumentCls, i, t);
            }
            function addPerformanceInstrumentationHandler(e, t) {
                return (
                    addHandler(e, t),
                    G[e] ||
                        ((function (e) {
                            let t = {};
                            "event" === e && (t.durationThreshold = 0),
                                observe(
                                    e,
                                    (t) => {
                                        triggerHandlers(e, {
                                            entries: t,
                                        });
                                    },
                                    t
                                );
                        })(e),
                        (G[e] = !0)),
                    getCleanupCallback(e, t)
                );
            }
            function triggerHandlers(e, t) {
                let n = J[e];
                if (n?.length)
                    for (let r of n)
                        try {
                            r(t);
                        } catch (t) {
                            O.X &&
                                T.kg.error(
                                    `Error while triggering instrumentation handler.
Type: ${e}
Name: ${(0, C.$P)(r)}
Error:`,
                                    t
                                );
                        }
            }
            function instrumentCls() {
                return onCLS(
                    (e) => {
                        triggerHandlers("cls", {
                            metric: e,
                        }),
                            (i = e);
                    },
                    {
                        reportAllChanges: !0,
                    }
                );
            }
            function instrumentFid() {
                return onFID((e) => {
                    triggerHandlers("fid", {
                        metric: e,
                    }),
                        (a = e);
                });
            }
            function instrumentLcp() {
                return onLCP(
                    (e) => {
                        triggerHandlers("lcp", {
                            metric: e,
                        }),
                            (o = e);
                    },
                    {
                        reportAllChanges: !0,
                    }
                );
            }
            function instrumentTtfb() {
                return onTTFB((e) => {
                    triggerHandlers("ttfb", {
                        metric: e,
                    }),
                        (s = e);
                });
            }
            function instrumentInp() {
                return onINP((e) => {
                    triggerHandlers("inp", {
                        metric: e,
                    }),
                        (c = e);
                });
            }
            function addMetricObserver(e, t, n, r, i = !1) {
                let a;
                return (
                    addHandler(e, t),
                    G[e] || ((a = n()), (G[e] = !0)),
                    r &&
                        t({
                            metric: r,
                        }),
                    getCleanupCallback(e, t, i ? a : void 0)
                );
            }
            function addHandler(e, t) {
                (J[e] = J[e] || []), J[e].push(t);
            }
            function getCleanupCallback(e, t, n) {
                return () => {
                    n && n();
                    let r = J[e];
                    if (!r) return;
                    let i = r.indexOf(t);
                    -1 !== i && r.splice(i, 1);
                };
            }
            var W = n(3890),
                q = n(19979),
                V = n(81469),
                Z = n(96519),
                z = n(59357),
                K = n(16802),
                Y = n(16160);
            let sentryNonRecordingSpan_SentryNonRecordingSpan = class sentryNonRecordingSpan_SentryNonRecordingSpan {
                constructor(e = {}) {
                    (this._traceId = e.traceId || (0, Y.H)()), (this._spanId = e.spanId || (0, Y.M)());
                }
                spanContext() {
                    return {
                        spanId: this._spanId,
                        traceId: this._traceId,
                        traceFlags: y.ve,
                    };
                }
                end(e) {}
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                isRecording() {
                    return !1;
                }
                addEvent(e, t, n) {
                    return this;
                }
                addLink(e) {
                    return this;
                }
                addLinks(e) {
                    return this;
                }
                recordException(e, t) {}
            };
            var Q = n(74802),
                ee = n(8201);
            let SentrySpan = class SentrySpan {
                constructor(e = {}) {
                    (this._traceId = e.traceId || (0, Y.H)()),
                        (this._spanId = e.spanId || (0, Y.M)()),
                        (this._startTime = e.startTimestamp || (0, v.ph)()),
                        (this._links = e.links),
                        (this._attributes = {}),
                        this.setAttributes({
                            [S.S3]: "manual",
                            [S.$J]: e.op,
                            ...e.attributes,
                        }),
                        (this._name = e.name),
                        e.parentSpanId && (this._parentSpanId = e.parentSpanId),
                        "sampled" in e && (this._sampled = e.sampled),
                        e.endTimestamp && (this._endTime = e.endTimestamp),
                        (this._events = []),
                        (this._isStandaloneSpan = e.isStandalone),
                        this._endTime && this._onSpanEnded();
                }
                addLink(e) {
                    return this._links ? this._links.push(e) : (this._links = [e]), this;
                }
                addLinks(e) {
                    return this._links ? this._links.push(...e) : (this._links = e), this;
                }
                recordException(e, t) {}
                spanContext() {
                    let { _spanId: e, _traceId: t, _sampled: n } = this;
                    return {
                        spanId: e,
                        traceId: t,
                        traceFlags: n ? y.i0 : y.ve,
                    };
                }
                setAttribute(e, t) {
                    return void 0 === t ? delete this._attributes[e] : (this._attributes[e] = t), this;
                }
                setAttributes(e) {
                    return Object.keys(e).forEach((t) => this.setAttribute(t, e[t])), this;
                }
                updateStartTime(e) {
                    this._startTime = (0, y.$k)(e);
                }
                setStatus(e) {
                    return (this._status = e), this;
                }
                updateName(e) {
                    return (this._name = e), this.setAttribute(S.Zj, "custom"), this;
                }
                end(e) {
                    this._endTime ||
                        ((this._endTime = (0, y.$k)(e)),
                        (function (e) {
                            if (!E.X) return;
                            let { description: t = "< unknown name >", op: n = "< unknown op >" } = (0, y.XU)(e),
                                { spanId: r } = e.spanContext(),
                                i = (0, y.Gx)(e),
                                a = i === e,
                                o = `[Tracing] Finishing "${n}" ${a ? "root " : ""}span "${t}" with ID ${r}`;
                            T.kg.log(o);
                        })(this),
                        this._onSpanEnded());
                }
                getSpanJSON() {
                    return (0, I.Jr)({
                        data: this._attributes,
                        description: this._name,
                        op: this._attributes[S.$J],
                        parent_span_id: this._parentSpanId,
                        span_id: this._spanId,
                        start_timestamp: this._startTime,
                        status: (0, y._4)(this._status),
                        timestamp: this._endTime,
                        trace_id: this._traceId,
                        origin: this._attributes[S.S3],
                        profile_id: this._attributes[S.p6],
                        exclusive_time: this._attributes[S.JQ],
                        measurements: timedEventsToMeasurements(this._events),
                        is_segment: (this._isStandaloneSpan && (0, y.Gx)(this) === this) || void 0,
                        segment_id: this._isStandaloneSpan ? (0, y.Gx)(this).spanContext().spanId : void 0,
                        links: (0, y.FF)(this._links),
                    });
                }
                isRecording() {
                    return !this._endTime && !!this._sampled;
                }
                addEvent(e, t, n) {
                    E.X && T.kg.log("[Tracing] Adding an event to span:", e);
                    let r = isSpanTimeInput(t) ? t : n || (0, v.ph)(),
                        i = isSpanTimeInput(t) ? {} : t || {},
                        a = {
                            name: e,
                            time: (0, y.$k)(r),
                            attributes: i,
                        };
                    return this._events.push(a), this;
                }
                isStandaloneSpan() {
                    return !!this._isStandaloneSpan;
                }
                _onSpanEnded() {
                    let e = (0, w.s3)();
                    e && e.emit("spanEnd", this);
                    let t = this._isStandaloneSpan || this === (0, y.Gx)(this);
                    if (!t) return;
                    if (this._isStandaloneSpan) {
                        this._sampled
                            ? (function (e) {
                                  let t = (0, w.s3)();
                                  if (!t) return;
                                  let n = e[1];
                                  if (!n || 0 === n.length) {
                                      t.recordDroppedEvent("before_send", "span");
                                      return;
                                  }
                                  t.sendEnvelope(e);
                              })((0, Q.uE)([this], e))
                            : (E.X &&
                                  T.kg.log(
                                      "[Tracing] Discarding standalone span because its trace was not chosen to be sampled."
                                  ),
                              e && e.recordDroppedEvent("sample_rate", "span"));
                        return;
                    }
                    let n = this._convertSpanToTransaction();
                    if (n) {
                        let e = (0, ee.I)(this).scope || (0, w.nZ)();
                        e.captureEvent(n);
                    }
                }
                _convertSpanToTransaction() {
                    if (!isFullFinishedSpan((0, y.XU)(this))) return;
                    this._name ||
                        (E.X && T.kg.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
                        (this._name = "<unlabeled transaction>"));
                    let { scope: e, isolationScope: t } = (0, ee.I)(this);
                    if (!0 !== this._sampled) return;
                    let n = (0, y.Dp)(this).filter(
                            (e) => e !== this && !(e instanceof SentrySpan && e.isStandaloneSpan())
                        ),
                        r = n.map((e) => (0, y.XU)(e)).filter(isFullFinishedSpan),
                        i = this._attributes[S.Zj];
                    delete this._attributes[S.xF],
                        r.forEach((e) => {
                            delete e.data[S.xF];
                        });
                    let a = {
                            contexts: {
                                trace: (0, y.HR)(this),
                            },
                            spans:
                                r.length > 1e3
                                    ? r.sort((e, t) => e.start_timestamp - t.start_timestamp).slice(0, 1e3)
                                    : r,
                            start_timestamp: this._startTime,
                            timestamp: this._endTime,
                            transaction: this._name,
                            type: "transaction",
                            sdkProcessingMetadata: {
                                capturedSpanScope: e,
                                capturedSpanIsolationScope: t,
                                ...(0, I.Jr)({
                                    dynamicSamplingContext: (0, K.jC)(this),
                                }),
                            },
                            ...(i && {
                                transaction_info: {
                                    source: i,
                                },
                            }),
                        },
                        o = timedEventsToMeasurements(this._events),
                        s = o && Object.keys(o).length;
                    return (
                        s &&
                            (E.X &&
                                T.kg.log(
                                    "[Measurements] Adding measurements to transaction event",
                                    JSON.stringify(o, void 0, 2)
                                ),
                            (a.measurements = o)),
                        a
                    );
                }
            };
            function isSpanTimeInput(e) {
                return (e && "number" == typeof e) || e instanceof Date || Array.isArray(e);
            }
            function isFullFinishedSpan(e) {
                return !!e.start_timestamp && !!e.timestamp && !!e.span_id && !!e.trace_id;
            }
            let et = "__SENTRY_SUPPRESS_TRACING__";
            function startInactiveSpan(e) {
                let t = getAcs();
                if (t.startInactiveSpan) return t.startInactiveSpan(e);
                let n = (function (e) {
                        let t = e.experimental || {},
                            n = {
                                isStandalone: t.standalone,
                                ...e,
                            };
                        if (e.startTime) {
                            let t = {
                                ...n,
                            };
                            return (t.startTimestamp = (0, y.$k)(e.startTime)), delete t.startTime, t;
                        }
                        return n;
                    })(e),
                    { forceTransaction: r, parentSpan: i } = e,
                    a = e.scope
                        ? (t) => (0, w.$e)(e.scope, t)
                        : void 0 !== i
                          ? (e) => withActiveSpan(i, e)
                          : (e) => e();
                return a(() => {
                    let t = (0, w.nZ)(),
                        i = (function (e) {
                            let t = (0, z.Y)(e);
                            if (!t) return;
                            let n = (0, w.s3)(),
                                r = n ? n.getOptions() : {};
                            return r.parentSpanIsAlwaysRootSpan ? (0, y.Gx)(t) : t;
                        })(t),
                        a = e.onlyIfParent && !i;
                    return a
                        ? new sentryNonRecordingSpan_SentryNonRecordingSpan()
                        : (function ({ parentSpan: e, spanArguments: t, forceTransaction: n, scope: r }) {
                              let i;
                              if (!(0, V.f)()) {
                                  let r = new sentryNonRecordingSpan_SentryNonRecordingSpan();
                                  if (n || !e) {
                                      let e = {
                                          sampled: "false",
                                          sample_rate: "0",
                                          transaction: t.name,
                                          ...(0, K.jC)(r),
                                      };
                                      (0, K.Lh)(r, e);
                                  }
                                  return r;
                              }
                              let a = (0, w.aF)();
                              if (e && !n)
                                  (i = (function (e, t, n) {
                                      let { spanId: r, traceId: i } = e.spanContext(),
                                          a = !t.getScopeData().sdkProcessingMetadata[et] && (0, y.Tt)(e),
                                          o = a
                                              ? new SentrySpan({
                                                    ...n,
                                                    parentSpanId: r,
                                                    traceId: i,
                                                    sampled: a,
                                                })
                                              : new sentryNonRecordingSpan_SentryNonRecordingSpan({
                                                    traceId: i,
                                                });
                                      (0, y.j5)(e, o);
                                      let s = (0, w.s3)();
                                      return s && (s.emit("spanStart", o), n.endTimestamp && s.emit("spanEnd", o)), o;
                                  })(e, r, t)),
                                      (0, y.j5)(e, i);
                              else if (e) {
                                  let n = (0, K.jC)(e),
                                      { traceId: a, spanId: o } = e.spanContext(),
                                      s = (0, y.Tt)(e);
                                  (i = _startRootSpan(
                                      {
                                          traceId: a,
                                          parentSpanId: o,
                                          ...t,
                                      },
                                      r,
                                      s
                                  )),
                                      (0, K.Lh)(i, n);
                              } else {
                                  let {
                                      traceId: e,
                                      dsc: n,
                                      parentSpanId: o,
                                      sampled: s,
                                  } = {
                                      ...a.getPropagationContext(),
                                      ...r.getPropagationContext(),
                                  };
                                  (i = _startRootSpan(
                                      {
                                          traceId: e,
                                          parentSpanId: o,
                                          ...t,
                                      },
                                      r,
                                      s
                                  )),
                                      n && (0, K.Lh)(i, n);
                              }
                              return (
                                  !(function (e) {
                                      if (!E.X) return;
                                      let {
                                              description: t = "< unknown name >",
                                              op: n = "< unknown op >",
                                              parent_span_id: r,
                                          } = (0, y.XU)(e),
                                          { spanId: i } = e.spanContext(),
                                          a = (0, y.Tt)(e),
                                          o = (0, y.Gx)(e),
                                          s = o === e,
                                          c = `[Tracing] Starting ${a ? "sampled" : "unsampled"} ${s ? "root " : ""}span`,
                                          u = [`op: ${n}`, `name: ${t}`, `ID: ${i}`];
                                      if ((r && u.push(`parent ID: ${r}`), !s)) {
                                          let { op: e, description: t } = (0, y.XU)(o);
                                          u.push(`root ID: ${o.spanContext().spanId}`),
                                              e && u.push(`root op: ${e}`),
                                              t && u.push(`root description: ${t}`);
                                      }
                                      T.kg.log(`${c}
  ${u.join("\n  ")}`);
                                  })(i),
                                  (0, ee.Y)(i, r, a),
                                  i
                              );
                          })({
                              parentSpan: i,
                              spanArguments: n,
                              forceTransaction: r,
                              scope: t,
                          });
                });
            }
            function withActiveSpan(e, t) {
                let n = getAcs();
                return n.withActiveSpan ? n.withActiveSpan(e, t) : (0, w.$e)((n) => ((0, z.D)(n, e || void 0), t(n)));
            }
            function getAcs() {
                let e = (0, W.cu)();
                return (0, q.G)(e);
            }
            function _startRootSpan(e, t, n) {
                let r = (0, w.s3)(),
                    i = r?.getOptions() || {},
                    { name: a = "", attributes: o } = e,
                    s = t.getPropagationContext(),
                    [c, u, l] = t.getScopeData().sdkProcessingMetadata[et]
                        ? [!1]
                        : (function (e, t, n) {
                              let r, i;
                              if (!(0, V.f)(e)) return [!1];
                              "function" == typeof e.tracesSampler
                                  ? ((r = e.tracesSampler({
                                        ...t,
                                        inheritOrSampleWith: (e) =>
                                            "number" == typeof t.parentSampleRate
                                                ? t.parentSampleRate
                                                : "boolean" == typeof t.parentSampled
                                                  ? Number(t.parentSampled)
                                                  : e,
                                    })),
                                    (i = !0))
                                  : void 0 !== t.parentSampled
                                    ? (r = t.parentSampled)
                                    : void 0 !== e.tracesSampleRate && ((r = e.tracesSampleRate), (i = !0));
                              let a = (0, Z.o)(r);
                              if (void 0 === a)
                                  return (
                                      E.X &&
                                          T.kg.warn(
                                              `[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(r)} of type ${JSON.stringify(typeof r)}.`
                                          ),
                                      [!1]
                                  );
                              if (!a)
                                  return (
                                      E.X &&
                                          T.kg.log(
                                              `[Tracing] Discarding transaction because ${"function" == typeof e.tracesSampler ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
                                          ),
                                      [!1, a, i]
                                  );
                              let o = n < a;
                              return (
                                  !o &&
                                      E.X &&
                                      T.kg.log(
                                          `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(r)})`
                                      ),
                                  [o, a, i]
                              );
                          })(
                              i,
                              {
                                  name: a,
                                  parentSampled: n,
                                  attributes: o,
                                  parentSampleRate: (0, Z.o)(s.dsc?.sample_rate),
                              },
                              s.sampleRand
                          ),
                    d = new SentrySpan({
                        ...e,
                        attributes: {
                            [S.Zj]: "custom",
                            [S.TE]: void 0 !== u && l ? u : void 0,
                            ...e.attributes,
                        },
                        sampled: c,
                    });
                return (
                    !c &&
                        r &&
                        (E.X &&
                            T.kg.log("[Tracing] Discarding root span because its trace was not chosen to be sampled."),
                        r.recordDroppedEvent("sample_rate", "transaction")),
                    r && r.emit("spanStart", d),
                    d
                );
            }
            function isMeasurementValue(e) {
                return "number" == typeof e && isFinite(e);
            }
            function startAndEndSpan(e, t, n, { ...r }) {
                let i = (0, y.XU)(e).start_timestamp;
                return (
                    i && i > t && "function" == typeof e.updateStartTime && e.updateStartTime(t),
                    withActiveSpan(e, () => {
                        let e = startInactiveSpan({
                            startTime: t,
                            ...r,
                        });
                        return e && e.end(n), e;
                    })
                );
            }
            function startStandaloneWebVitalSpan(e) {
                let t;
                let n = (0, w.s3)();
                if (!n) return;
                let { name: r, transaction: i, attributes: a, startTime: o } = e,
                    { release: s, environment: c, sendDefaultPii: u } = n.getOptions(),
                    l = n.getIntegrationByName("Replay"),
                    d = l?.getReplayId(),
                    p = (0, w.nZ)(),
                    f = p.getUser(),
                    m = void 0 !== f ? f.email || f.id || f.ip_address : void 0;
                try {
                    t = p.getScopeData().contexts.profile.profile_id;
                } catch {}
                let g = {
                    release: s,
                    environment: c,
                    user: m || void 0,
                    profile_id: t || void 0,
                    replay_id: d || void 0,
                    transaction: i,
                    "user_agent.original": k.m.navigator?.userAgent,
                    "client.address": u ? "{{auto}}" : void 0,
                    ...a,
                };
                return startInactiveSpan({
                    name: r,
                    attributes: g,
                    startTime: o,
                    experimental: {
                        standalone: !0,
                    },
                });
            }
            function getBrowserPerformanceAPI() {
                return k.m.addEventListener && k.m.performance;
            }
            function msToSec(e) {
                return e / 1e3;
            }
            function extractNetworkProtocol(e) {
                let t = "unknown",
                    n = "unknown",
                    r = "";
                for (let i of e) {
                    if ("/" === i) {
                        [t, n] = e.split("/");
                        break;
                    }
                    if (!isNaN(Number(i))) {
                        (t = "h" === r ? "http" : r), (n = e.split(r)[1]);
                        break;
                    }
                    r += i;
                }
                return (
                    r === e && (t = r),
                    {
                        name: t,
                        version: n,
                    }
                );
            }
            let en = 0,
                er = {};
            function _addPerformanceNavigationTiming(e, t, n, r, i = n) {
                let a = "secureConnection" === n ? "connectEnd" : "fetch" === n ? "domainLookupStart" : `${n}End`,
                    o = t[a],
                    s = t[`${n}Start`];
                s &&
                    o &&
                    startAndEndSpan(e, r + msToSec(s), r + msToSec(o), {
                        op: `browser.${i}`,
                        name: t.name,
                        attributes: {
                            [S.S3]: "auto.ui.browser.metrics",
                        },
                    });
            }
            function setResourceEntrySizeData(e, t, n, r) {
                let i = t[n];
                null != i && i < 2147483647 && (e[r] = i);
            }
            let ei = [],
                ea = new Map(),
                eo = {
                    click: "click",
                    pointerdown: "click",
                    pointerup: "click",
                    mousedown: "click",
                    mouseup: "click",
                    touchstart: "click",
                    touchend: "click",
                    mouseover: "hover",
                    mouseout: "hover",
                    mouseenter: "hover",
                    mouseleave: "hover",
                    pointerover: "hover",
                    pointerout: "hover",
                    pointerenter: "hover",
                    pointerleave: "hover",
                    dragstart: "drag",
                    dragend: "drag",
                    drag: "drag",
                    dragenter: "drag",
                    dragleave: "drag",
                    dragover: "drag",
                    drop: "drag",
                    keydown: "press",
                    keyup: "press",
                    keypress: "press",
                    input: "press",
                };
            var es = n(73990),
                ec = n(62563);
            let eu = {
                idleTimeout: 1e3,
                finalTimeout: 3e4,
                childSpanTimeout: 15e3,
            };
            function startIdleSpan(e, t = {}) {
                let n;
                let r = new Map(),
                    i = !1,
                    a = "externalFinish",
                    o = !t.disableAutoFinish,
                    s = [],
                    {
                        idleTimeout: c = eu.idleTimeout,
                        finalTimeout: u = eu.finalTimeout,
                        childSpanTimeout: l = eu.childSpanTimeout,
                        beforeSpanEnd: d,
                    } = t,
                    p = (0, w.s3)();
                if (!p || !(0, V.f)()) {
                    let e = new sentryNonRecordingSpan_SentryNonRecordingSpan(),
                        t = {
                            sample_rate: "0",
                            sampled: "false",
                            ...(0, K.jC)(e),
                        };
                    return (0, K.Lh)(e, t), e;
                }
                let f = (0, w.nZ)(),
                    m = (0, y.HN)(),
                    g = (function (e) {
                        let t = startInactiveSpan(e);
                        return (0, z.D)((0, w.nZ)(), t), E.X && T.kg.log("[Tracing] Started span is an idle span"), t;
                    })(e);
                function _cancelIdleTimeout() {
                    n && (clearTimeout(n), (n = void 0));
                }
                function _restartIdleTimeout(e) {
                    _cancelIdleTimeout(),
                        (n = setTimeout(() => {
                            !i && 0 === r.size && o && ((a = "idleTimeout"), g.end(e));
                        }, c));
                }
                function _restartChildSpanTimeout(e) {
                    n = setTimeout(() => {
                        !i && o && ((a = "heartbeatFailed"), g.end(e));
                    }, l);
                }
                function onIdleSpanEnded(e) {
                    (i = !0), r.clear(), s.forEach((e) => e()), (0, z.D)(f, m);
                    let t = (0, y.XU)(g),
                        { start_timestamp: n } = t;
                    if (!n) return;
                    let o = t.data;
                    o[S.ju] || g.setAttribute(S.ju, a), T.kg.log(`[Tracing] Idle span "${t.op}" finished`);
                    let l = (0, y.Dp)(g).filter((e) => e !== g),
                        d = 0;
                    l.forEach((t) => {
                        t.isRecording() &&
                            (t.setStatus({
                                code: ec.jt,
                                message: "cancelled",
                            }),
                            t.end(e),
                            E.X &&
                                T.kg.log(
                                    "[Tracing] Cancelling span since span ended early",
                                    JSON.stringify(t, void 0, 2)
                                ));
                        let n = (0, y.XU)(t),
                            { timestamp: r = 0, start_timestamp: i = 0 } = n,
                            a = i <= e,
                            o = (u + c) / 1e3,
                            s = r - i <= o;
                        if (E.X) {
                            let e = JSON.stringify(t, void 0, 2);
                            a
                                ? s ||
                                  T.kg.log(
                                      "[Tracing] Discarding span since it finished after idle span final timeout",
                                      e
                                  )
                                : T.kg.log(
                                      "[Tracing] Discarding span since it happened after idle span was finished",
                                      e
                                  );
                        }
                        (!s || !a) && ((0, y.ed)(g, t), d++);
                    }),
                        d > 0 && g.setAttribute("sentry.idle_span_discarded_spans", d);
                }
                return (
                    (g.end = new Proxy(g.end, {
                        apply(e, t, n) {
                            if ((d && d(g), t instanceof sentryNonRecordingSpan_SentryNonRecordingSpan)) return;
                            let [r, ...i] = n,
                                a = r || (0, v.ph)(),
                                o = (0, y.$k)(a),
                                s = (0, y.Dp)(g).filter((e) => e !== g);
                            if (!s.length) return onIdleSpanEnded(o), Reflect.apply(e, t, [o, ...i]);
                            let c = s.map((e) => (0, y.XU)(e).timestamp).filter((e) => !!e),
                                l = c.length ? Math.max(...c) : void 0,
                                p = (0, y.XU)(g).start_timestamp,
                                f = Math.min(p ? p + u / 1e3 : 1 / 0, Math.max(p || -1 / 0, Math.min(o, l || 1 / 0)));
                            return onIdleSpanEnded(f), Reflect.apply(e, t, [f, ...i]);
                        },
                    })),
                    s.push(
                        p.on("spanStart", (e) => {
                            if (i || e === g || (0, y.XU)(e).timestamp) return;
                            let t = (0, y.Dp)(g);
                            t.includes(e) &&
                                (function (e) {
                                    _cancelIdleTimeout(), r.set(e, !0);
                                    let t = (0, v.ph)();
                                    _restartChildSpanTimeout(t + l / 1e3);
                                })(e.spanContext().spanId);
                        })
                    ),
                    s.push(
                        p.on("spanEnd", (e) => {
                            i ||
                                (function (e) {
                                    if ((r.has(e) && r.delete(e), 0 === r.size)) {
                                        let e = (0, v.ph)();
                                        _restartIdleTimeout(e + c / 1e3);
                                    }
                                })(e.spanContext().spanId);
                        })
                    ),
                    s.push(
                        p.on("idleSpanEnableAutoFinish", (e) => {
                            e === g && ((o = !0), _restartIdleTimeout(), r.size && _restartChildSpanTimeout());
                        })
                    ),
                    t.disableAutoFinish || _restartIdleTimeout(),
                    setTimeout(() => {
                        i ||
                            (g.setStatus({
                                code: ec.jt,
                                message: "deadline_exceeded",
                            }),
                            (a = "finalTimeout"),
                            g.end());
                    }, u),
                    g
                );
            }
            var el = n(80398),
                ed = n(30752);
            let ep = !1;
            function errorCallback() {
                let e = (0, y.HN)(),
                    t = e && (0, y.Gx)(e);
                if (t) {
                    let e = "internal_error";
                    E.X && T.kg.log(`[Tracing] Root span: ${e} -> Global error occurred`),
                        t.setStatus({
                            code: ec.jt,
                            message: e,
                        });
                }
            }
            errorCallback.tag = "sentry_tracingErrorCallback";
            var ef = n(38719),
                em = n(80165),
                eg = n(99481),
                eh = n(95689),
                e_ = n(56772),
                ev = n(52512);
            function getTraceData(e = {}) {
                let t = (0, w.s3)();
                if (!(0, f._k)() || !t) return {};
                let n = (0, W.cu)(),
                    r = (0, q.G)(n);
                if (r.getTraceData) return r.getTraceData(e);
                let i = (0, w.nZ)(),
                    a = e.span || (0, y.HN)(),
                    o = a
                        ? (0, y.Hb)(a)
                        : (function (e) {
                              let { traceId: t, sampled: n, propagationSpanId: r } = e.getPropagationContext();
                              return (0, ef.$p)(t, r, n);
                          })(i),
                    s = a ? (0, K.jC)(a) : (0, K.CG)(t, i),
                    c = (0, ev.IQ)(s),
                    u = ef.Ke.test(o);
                return u
                    ? {
                          "sentry-trace": o,
                          baggage: c,
                      }
                    : (T.kg.warn("Invalid sentry-trace data. Cannot generate trace data"), {});
            }
            function stripBaggageHeaderOfSentryBaggageValues(e) {
                return e
                    .split(",")
                    .filter((e) => !e.split("=")[0].startsWith(ev.lq))
                    .join(",");
            }
            var ey = n(82314);
            let eS = new WeakMap(),
                eb = new Map(),
                eE = {
                    traceFetch: !0,
                    traceXHR: !0,
                    enableHTTPTimings: !0,
                    trackFetchStreamPerformance: !1,
                };
            function addHTTPTimings(e) {
                let { url: t } = (0, y.XU)(e).data;
                if (!t || "string" != typeof t) return;
                let n = addPerformanceInstrumentationHandler("resource", ({ entries: r }) => {
                    r.forEach((r) => {
                        if (
                            "resource" === r.entryType &&
                            "initiatorType" in r &&
                            "string" == typeof r.nextHopProtocol &&
                            ("fetch" === r.initiatorType || "xmlhttprequest" === r.initiatorType) &&
                            r.name.endsWith(t)
                        ) {
                            let t = (function (e) {
                                let { name: t, version: n } = extractNetworkProtocol(e.nextHopProtocol),
                                    r = [];
                                return (r.push(["network.protocol.version", n], ["network.protocol.name", t]),
                                (0, v.Z1)())
                                    ? [
                                          ...r,
                                          ["http.request.redirect_start", getAbsoluteTime(e.redirectStart)],
                                          ["http.request.fetch_start", getAbsoluteTime(e.fetchStart)],
                                          ["http.request.domain_lookup_start", getAbsoluteTime(e.domainLookupStart)],
                                          ["http.request.domain_lookup_end", getAbsoluteTime(e.domainLookupEnd)],
                                          ["http.request.connect_start", getAbsoluteTime(e.connectStart)],
                                          [
                                              "http.request.secure_connection_start",
                                              getAbsoluteTime(e.secureConnectionStart),
                                          ],
                                          ["http.request.connection_end", getAbsoluteTime(e.connectEnd)],
                                          ["http.request.request_start", getAbsoluteTime(e.requestStart)],
                                          ["http.request.response_start", getAbsoluteTime(e.responseStart)],
                                          ["http.request.response_end", getAbsoluteTime(e.responseEnd)],
                                      ]
                                    : r;
                            })(r);
                            t.forEach((t) => e.setAttribute(...t)), setTimeout(n);
                        }
                    });
                });
            }
            function getAbsoluteTime(e = 0) {
                return (((0, v.Z1)() || performance.timeOrigin) + e) / 1e3;
            }
            function request_getFullURL(e) {
                try {
                    let t = new URL(e, eg.m9.location.origin);
                    return t.href;
                } catch {
                    return;
                }
            }
            let eT = {
                    ...eu,
                    instrumentNavigation: !0,
                    instrumentPageLoad: !0,
                    markBackgroundSpan: !0,
                    enableLongTask: !0,
                    enableLongAnimationFrame: !0,
                    enableInp: !0,
                    _experiments: {},
                    ...eE,
                },
                browserTracingIntegration = (e = {}) => {
                    let t = eg.m9.document;
                    ep || ((ep = !0), (0, el.V)(errorCallback), (0, ed.h)(errorCallback));
                    let {
                            enableInp: n,
                            enableLongTask: r,
                            enableLongAnimationFrame: i,
                            _experiments: { enableInteractions: p, enableStandaloneClsSpans: f },
                            beforeStartSpan: m,
                            idleTimeout: g,
                            finalTimeout: h,
                            childSpanTimeout: C,
                            markBackgroundSpan: A,
                            traceFetch: P,
                            traceXHR: D,
                            trackFetchStreamPerformance: $,
                            shouldCreateSpanForRequest: L,
                            enableHTTPTimings: R,
                            instrumentPageLoad: F,
                            instrumentNavigation: N,
                        } = {
                            ...eT,
                            ...e,
                        },
                        H = (function ({ recordClsStandaloneSpans: e }) {
                            let t = getBrowserPerformanceAPI();
                            if (t && (0, v.Z1)()) {
                                t.mark && k.m.performance.mark("sentry-tracing-init");
                                let n = addMetricObserver(
                                        "fid",
                                        ({ metric: e }) => {
                                            let t = e.entries[e.entries.length - 1];
                                            if (!t) return;
                                            let n = msToSec((0, v.Z1)()),
                                                r = msToSec(t.startTime);
                                            (er.fid = {
                                                value: e.value,
                                                unit: "millisecond",
                                            }),
                                                (er["mark.fid"] = {
                                                    value: n + r,
                                                    unit: "second",
                                                });
                                        },
                                        instrumentFid,
                                        a
                                    ),
                                    r = (function (e, t = !1) {
                                        return addMetricObserver("lcp", e, instrumentLcp, o, t);
                                    })(({ metric: e }) => {
                                        let t = e.entries[e.entries.length - 1];
                                        t &&
                                            ((er.lcp = {
                                                value: e.value,
                                                unit: "millisecond",
                                            }),
                                            (u = t));
                                    }, !0),
                                    i = addMetricObserver(
                                        "ttfb",
                                        ({ metric: e }) => {
                                            let t = e.entries[e.entries.length - 1];
                                            t &&
                                                (er.ttfb = {
                                                    value: e.value,
                                                    unit: "millisecond",
                                                });
                                        },
                                        instrumentTtfb,
                                        s
                                    ),
                                    c = e
                                        ? (function () {
                                              let e,
                                                  t,
                                                  n = 0;
                                              if (
                                                  !(function () {
                                                      try {
                                                          return PerformanceObserver.supportedEntryTypes.includes(
                                                              "layout-shift"
                                                          );
                                                      } catch {
                                                          return !1;
                                                      }
                                                  })()
                                              )
                                                  return;
                                              let r = !1;
                                              function _collectClsOnce() {
                                                  r ||
                                                      ((r = !0),
                                                      t &&
                                                          (function (e, t, n) {
                                                              O.X && T.kg.log(`Sending CLS span (${e})`);
                                                              let r = msToSec(((0, v.Z1)() || 0) + (t?.startTime || 0)),
                                                                  i = (0, w.nZ)().getScopeData().transactionName,
                                                                  a = t
                                                                      ? (0, b.Rt)(t.sources[0]?.node)
                                                                      : "Layout shift",
                                                                  o = (0, I.Jr)({
                                                                      [S.S3]: "auto.http.browser.cls",
                                                                      [S.$J]: "ui.webvital.cls",
                                                                      [S.JQ]: t?.duration || 0,
                                                                      "sentry.pageload.span_id": n,
                                                                  }),
                                                                  s = startStandaloneWebVitalSpan({
                                                                      name: a,
                                                                      transaction: i,
                                                                      attributes: o,
                                                                      startTime: r,
                                                                  });
                                                              s &&
                                                                  (s.addEvent("cls", {
                                                                      [S.E1]: "",
                                                                      [S.Wb]: e,
                                                                  }),
                                                                  s.end(r));
                                                          })(n, e, t),
                                                      i());
                                              }
                                              let i = addClsInstrumentationHandler(({ metric: t }) => {
                                                  let r = t.entries[t.entries.length - 1];
                                                  r && ((n = t.value), (e = r));
                                              }, !0);
                                              onHidden(() => {
                                                  _collectClsOnce();
                                              }),
                                                  setTimeout(() => {
                                                      let e = (0, w.s3)();
                                                      if (!e) return;
                                                      let n = e.on("startNavigationSpan", () => {
                                                              _collectClsOnce(), n?.();
                                                          }),
                                                          r = (0, y.HN)();
                                                      if (r) {
                                                          let e = (0, y.Gx)(r),
                                                              n = (0, y.XU)(e);
                                                          "pageload" === n.op && (t = e.spanContext().spanId);
                                                      }
                                                  }, 0);
                                          })()
                                        : addClsInstrumentationHandler(({ metric: e }) => {
                                              let t = e.entries[e.entries.length - 1];
                                              t &&
                                                  ((er.cls = {
                                                      value: e.value,
                                                      unit: "",
                                                  }),
                                                  (l = t));
                                          }, !0);
                                return () => {
                                    n(), r(), i(), c?.();
                                };
                            }
                            return () => void 0;
                        })({
                            recordClsStandaloneSpans: f || !1,
                        });
                    n &&
                        (function () {
                            let e = getBrowserPerformanceAPI();
                            if (e && (0, v.Z1)()) {
                                let e = addMetricObserver(
                                    "inp",
                                    ({ metric: e }) => {
                                        if (void 0 == e.value) return;
                                        let t = e.entries.find((t) => t.duration === e.value && eo[t.name]);
                                        if (!t) return;
                                        let { interactionId: n } = t,
                                            r = eo[t.name],
                                            i = msToSec((0, v.Z1)() + t.startTime),
                                            a = msToSec(e.value),
                                            o = (0, y.HN)(),
                                            s = o ? (0, y.Gx)(o) : void 0,
                                            c = null != n ? ea.get(n) : void 0,
                                            u = c || s,
                                            l = u
                                                ? (0, y.XU)(u).description
                                                : (0, w.nZ)().getScopeData().transactionName,
                                            d = (0, b.Rt)(t.target),
                                            p = (0, I.Jr)({
                                                [S.S3]: "auto.http.browser.inp",
                                                [S.$J]: `ui.interaction.${r}`,
                                                [S.JQ]: t.duration,
                                            }),
                                            f = startStandaloneWebVitalSpan({
                                                name: d,
                                                transaction: l,
                                                attributes: p,
                                                startTime: i,
                                            });
                                        f &&
                                            (f.addEvent("inp", {
                                                [S.E1]: "millisecond",
                                                [S.Wb]: e.value,
                                            }),
                                            f.end(i + a));
                                    },
                                    instrumentInp,
                                    c
                                );
                            }
                        })(),
                        i &&
                        d.GLOBAL_OBJ.PerformanceObserver &&
                        PerformanceObserver.supportedEntryTypes &&
                        PerformanceObserver.supportedEntryTypes.includes("long-animation-frame")
                            ? (function () {
                                  let e = new PerformanceObserver((e) => {
                                      let t = (0, y.HN)();
                                      if (t)
                                          for (let n of e.getEntries()) {
                                              if (!n.scripts[0]) continue;
                                              let e = msToSec((0, v.Z1)() + n.startTime),
                                                  { start_timestamp: r, op: i } = (0, y.XU)(t);
                                              if ("navigation" === i && r && e < r) continue;
                                              let a = msToSec(n.duration),
                                                  o = {
                                                      [S.S3]: "auto.ui.browser.metrics",
                                                  },
                                                  s = n.scripts[0],
                                                  {
                                                      invoker: c,
                                                      invokerType: u,
                                                      sourceURL: l,
                                                      sourceFunctionName: d,
                                                      sourceCharPosition: p,
                                                  } = s;
                                              (o["browser.script.invoker"] = c),
                                                  (o["browser.script.invoker_type"] = u),
                                                  l && (o["code.filepath"] = l),
                                                  d && (o["code.function"] = d),
                                                  -1 !== p && (o["browser.script.source_char_position"] = p),
                                                  startAndEndSpan(t, e, e + a, {
                                                      name: "Main UI thread blocked",
                                                      op: "ui.long-animation-frame",
                                                      attributes: o,
                                                  });
                                          }
                                  });
                                  e.observe({
                                      type: "long-animation-frame",
                                      buffered: !0,
                                  });
                              })()
                            : r &&
                              addPerformanceInstrumentationHandler("longtask", ({ entries: e }) => {
                                  let t = (0, y.HN)();
                                  if (!t) return;
                                  let { op: n, start_timestamp: r } = (0, y.XU)(t);
                                  for (let i of e) {
                                      let e = msToSec((0, v.Z1)() + i.startTime),
                                          a = msToSec(i.duration);
                                      ("navigation" === n && r && e < r) ||
                                          startAndEndSpan(t, e, e + a, {
                                              name: "Main UI thread blocked",
                                              op: "ui.long-task",
                                              attributes: {
                                                  [S.S3]: "auto.ui.browser.metrics",
                                              },
                                          });
                                  }
                              }),
                        p &&
                            addPerformanceInstrumentationHandler("event", ({ entries: e }) => {
                                let t = (0, y.HN)();
                                if (t) {
                                    for (let n of e)
                                        if ("click" === n.name) {
                                            let e = msToSec((0, v.Z1)() + n.startTime),
                                                r = msToSec(n.duration),
                                                i = {
                                                    name: (0, b.Rt)(n.target),
                                                    op: `ui.interaction.${n.name}`,
                                                    startTime: e,
                                                    attributes: {
                                                        [S.S3]: "auto.ui.browser.metrics",
                                                    },
                                                },
                                                a = (0, b.iY)(n.target);
                                            a && (i.attributes["ui.component_name"] = a),
                                                startAndEndSpan(t, e, e + r, i);
                                        }
                                }
                            });
                    let j = {
                        name: void 0,
                        source: void 0,
                    };
                    function _createRouteSpan(e, n) {
                        let r = "pageload" === n.op,
                            i = m ? m(n) : n,
                            a = i.attributes || {};
                        n.name !== i.name && ((a[S.Zj] = "custom"), (i.attributes = a)),
                            (j.name = i.name),
                            (j.source = a[S.Zj]);
                        let o = startIdleSpan(i, {
                            idleTimeout: g,
                            finalTimeout: h,
                            childSpanTimeout: C,
                            disableAutoFinish: r,
                            beforeSpanEnd: (t) => {
                                H(),
                                    (function (e, t) {
                                        let n = getBrowserPerformanceAPI(),
                                            r = (0, v.Z1)();
                                        if (!n?.getEntries || !r) return;
                                        let i = msToSec(r),
                                            a = n.getEntries(),
                                            { op: o, start_timestamp: s } = (0, y.XU)(e);
                                        if (
                                            (a.slice(en).forEach((t) => {
                                                let n = msToSec(t.startTime),
                                                    r = msToSec(Math.max(0, t.duration));
                                                if ("navigation" !== o || !s || !(i + n < s))
                                                    switch (t.entryType) {
                                                        case "navigation":
                                                            [
                                                                "unloadEvent",
                                                                "redirect",
                                                                "domContentLoadedEvent",
                                                                "loadEvent",
                                                                "connect",
                                                            ].forEach((n) => {
                                                                _addPerformanceNavigationTiming(e, t, n, i);
                                                            }),
                                                                _addPerformanceNavigationTiming(
                                                                    e,
                                                                    t,
                                                                    "secureConnection",
                                                                    i,
                                                                    "TLS/SSL"
                                                                ),
                                                                _addPerformanceNavigationTiming(
                                                                    e,
                                                                    t,
                                                                    "fetch",
                                                                    i,
                                                                    "cache"
                                                                ),
                                                                _addPerformanceNavigationTiming(
                                                                    e,
                                                                    t,
                                                                    "domainLookup",
                                                                    i,
                                                                    "DNS"
                                                                ),
                                                                (function (e, t, n) {
                                                                    let r = n + msToSec(t.requestStart),
                                                                        i = n + msToSec(t.responseEnd),
                                                                        a = n + msToSec(t.responseStart);
                                                                    t.responseEnd &&
                                                                        (startAndEndSpan(e, r, i, {
                                                                            op: "browser.request",
                                                                            name: t.name,
                                                                            attributes: {
                                                                                [S.S3]: "auto.ui.browser.metrics",
                                                                            },
                                                                        }),
                                                                        startAndEndSpan(e, a, i, {
                                                                            op: "browser.response",
                                                                            name: t.name,
                                                                            attributes: {
                                                                                [S.S3]: "auto.ui.browser.metrics",
                                                                            },
                                                                        }));
                                                                })(e, t, i);
                                                            break;
                                                        case "mark":
                                                        case "paint":
                                                        case "measure": {
                                                            (function (e, t, n, r, i) {
                                                                let a = getNavigationEntry(!1),
                                                                    o = msToSec(a ? a.requestStart : 0),
                                                                    s = i + Math.max(n, o),
                                                                    c = i + n,
                                                                    u = c + r,
                                                                    l = {
                                                                        [S.S3]: "auto.resource.browser.metrics",
                                                                    };
                                                                s !== c &&
                                                                    ((l[
                                                                        "sentry.browser.measure_happened_before_request"
                                                                    ] = !0),
                                                                    (l["sentry.browser.measure_start_time"] = s)),
                                                                    s <= u &&
                                                                        startAndEndSpan(e, s, u, {
                                                                            name: t.name,
                                                                            op: t.entryType,
                                                                            attributes: l,
                                                                        });
                                                            })(e, t, n, r, i);
                                                            let a = getVisibilityWatcher(),
                                                                o = t.startTime < a.firstHiddenTime;
                                                            "first-paint" === t.name &&
                                                                o &&
                                                                (er.fp = {
                                                                    value: t.startTime,
                                                                    unit: "millisecond",
                                                                }),
                                                                "first-contentful-paint" === t.name &&
                                                                    o &&
                                                                    (er.fcp = {
                                                                        value: t.startTime,
                                                                        unit: "millisecond",
                                                                    });
                                                            break;
                                                        }
                                                        case "resource":
                                                            (function (e, t, n, r, i, a) {
                                                                if (
                                                                    "xmlhttprequest" === t.initiatorType ||
                                                                    "fetch" === t.initiatorType
                                                                )
                                                                    return;
                                                                let o = (0, x.en)(n),
                                                                    s = {
                                                                        [S.S3]: "auto.resource.browser.metrics",
                                                                    };
                                                                setResourceEntrySizeData(
                                                                    s,
                                                                    t,
                                                                    "transferSize",
                                                                    "http.response_transfer_size"
                                                                ),
                                                                    setResourceEntrySizeData(
                                                                        s,
                                                                        t,
                                                                        "encodedBodySize",
                                                                        "http.response_content_length"
                                                                    ),
                                                                    setResourceEntrySizeData(
                                                                        s,
                                                                        t,
                                                                        "decodedBodySize",
                                                                        "http.decoded_response_content_length"
                                                                    );
                                                                let c = t.deliveryType;
                                                                null != c && (s["http.response_delivery_type"] = c);
                                                                let u = t.renderBlockingStatus;
                                                                u && (s["resource.render_blocking_status"] = u),
                                                                    o.protocol &&
                                                                        (s["url.scheme"] = o.protocol.split(":").pop()),
                                                                    o.host && (s["server.address"] = o.host),
                                                                    (s["url.same_origin"] = n.includes(
                                                                        k.m.location.origin
                                                                    ));
                                                                let { name: l, version: d } = extractNetworkProtocol(
                                                                    t.nextHopProtocol
                                                                );
                                                                (s["network.protocol.name"] = l),
                                                                    (s["network.protocol.version"] = d);
                                                                let p = a + r,
                                                                    f = p + i;
                                                                startAndEndSpan(e, p, f, {
                                                                    name: n.replace(k.m.location.origin, ""),
                                                                    op: t.initiatorType
                                                                        ? `resource.${t.initiatorType}`
                                                                        : "resource.other",
                                                                    attributes: s,
                                                                });
                                                            })(e, t, t.name, n, r, i);
                                                    }
                                            }),
                                            (en = Math.max(a.length - 1, 0)),
                                            (function (e) {
                                                let t = k.m.navigator;
                                                if (!t) return;
                                                let n = t.connection;
                                                n &&
                                                    (n.effectiveType &&
                                                        e.setAttribute("effectiveConnectionType", n.effectiveType),
                                                    n.type && e.setAttribute("connectionType", n.type),
                                                    isMeasurementValue(n.rtt) &&
                                                        (er["connection.rtt"] = {
                                                            value: n.rtt,
                                                            unit: "millisecond",
                                                        })),
                                                    isMeasurementValue(t.deviceMemory) &&
                                                        e.setAttribute("deviceMemory", `${t.deviceMemory} GB`),
                                                    isMeasurementValue(t.hardwareConcurrency) &&
                                                        e.setAttribute(
                                                            "hardwareConcurrency",
                                                            String(t.hardwareConcurrency)
                                                        );
                                            })(e),
                                            "pageload" === o)
                                        ) {
                                            (function (e) {
                                                let t = getNavigationEntry(!1);
                                                if (!t) return;
                                                let { responseStart: n, requestStart: r } = t;
                                                r <= n &&
                                                    (e["ttfb.requestTime"] = {
                                                        value: n - r,
                                                        unit: "millisecond",
                                                    });
                                            })(er);
                                            let n = er["mark.fid"];
                                            n &&
                                                er.fid &&
                                                (startAndEndSpan(e, n.value, n.value + msToSec(er.fid.value), {
                                                    name: "first input delay",
                                                    op: "ui.action",
                                                    attributes: {
                                                        [S.S3]: "auto.ui.browser.metrics",
                                                    },
                                                }),
                                                delete er["mark.fid"]),
                                                ("fcp" in er && t.recordClsOnPageloadSpan) || delete er.cls,
                                                Object.entries(er).forEach(([e, t]) => {
                                                    !(function (e, t, n, r = (0, y.HN)()) {
                                                        let i = r && (0, y.Gx)(r);
                                                        i &&
                                                            (E.X &&
                                                                T.kg.log(
                                                                    `[Measurement] Setting measurement on root span: ${e} = ${t} ${n}`
                                                                ),
                                                            i.addEvent(e, {
                                                                [S.Wb]: t,
                                                                [S.E1]: n,
                                                            }));
                                                    })(e, t.value, t.unit);
                                                }),
                                                e.setAttribute("performance.timeOrigin", i),
                                                e.setAttribute("performance.activationStart", getActivationStart()),
                                                u &&
                                                    (u.element && e.setAttribute("lcp.element", (0, b.Rt)(u.element)),
                                                    u.id && e.setAttribute("lcp.id", u.id),
                                                    u.url && e.setAttribute("lcp.url", u.url.trim().slice(0, 200)),
                                                    null != u.loadTime && e.setAttribute("lcp.loadTime", u.loadTime),
                                                    null != u.renderTime &&
                                                        e.setAttribute("lcp.renderTime", u.renderTime),
                                                    e.setAttribute("lcp.size", u.size)),
                                                l?.sources &&
                                                    l.sources.forEach((t, n) =>
                                                        e.setAttribute(`cls.source.${n + 1}`, (0, b.Rt)(t.node))
                                                    );
                                        }
                                        (u = void 0), (l = void 0), (er = {});
                                    })(t, {
                                        recordClsOnPageloadSpan: !f,
                                    }),
                                    (0, I.xp)(e, ex, void 0);
                                let n = (0, w.nZ)(),
                                    r = n.getPropagationContext();
                                n.setPropagationContext({
                                    ...r,
                                    traceId: o.spanContext().traceId,
                                    sampled: (0, y.Tt)(o),
                                    dsc: (0, K.jC)(t),
                                });
                            },
                        });
                        function emitFinish() {
                            t &&
                                ["interactive", "complete"].includes(t.readyState) &&
                                e.emit("idleSpanEnableAutoFinish", o);
                        }
                        (0, I.xp)(e, ex, o),
                            r &&
                                t &&
                                (t.addEventListener("readystatechange", () => {
                                    emitFinish();
                                }),
                                emitFinish());
                    }
                    return {
                        name: "BrowserTracing",
                        afterAllSetup(e) {
                            let t = (0, b.l4)();
                            function maybeEndActiveSpan() {
                                let t = e[ex];
                                t &&
                                    !(0, y.XU)(t).timestamp &&
                                    (em.X &&
                                        T.kg.log(`[Tracing] Finishing current active span with op: ${(0, y.XU)(t).op}`),
                                    t.end());
                            }
                            if (
                                (e.on("startNavigationSpan", (t) => {
                                    (0, w.s3)() === e &&
                                        (maybeEndActiveSpan(),
                                        (0, w.aF)().setPropagationContext({
                                            traceId: (0, Y.H)(),
                                            sampleRand: Math.random(),
                                        }),
                                        (0, w.nZ)().setPropagationContext({
                                            traceId: (0, Y.H)(),
                                            sampleRand: Math.random(),
                                        }),
                                        _createRouteSpan(e, {
                                            op: "navigation",
                                            ...t,
                                        }));
                                }),
                                e.on("startPageLoadSpan", (t, n = {}) => {
                                    if ((0, w.s3)() !== e) return;
                                    maybeEndActiveSpan();
                                    let r = n.sentryTrace || getMetaContent("sentry-trace"),
                                        i = n.baggage || getMetaContent("baggage"),
                                        a = (0, ef.pT)(r, i);
                                    (0, w.nZ)().setPropagationContext(a),
                                        _createRouteSpan(e, {
                                            op: "pageload",
                                            ...t,
                                        });
                                }),
                                eg.m9.location)
                            ) {
                                if (F) {
                                    let t = (0, v.Z1)();
                                    startBrowserTracingPageLoadSpan(e, {
                                        name: eg.m9.location.pathname,
                                        startTime: t ? t / 1e3 : void 0,
                                        attributes: {
                                            [S.Zj]: "url",
                                            [S.S3]: "auto.pageload.browser",
                                        },
                                    });
                                }
                                N &&
                                    (0, es.a)(({ to: n, from: r }) => {
                                        if (void 0 === r && t?.indexOf(n) !== -1) {
                                            t = void 0;
                                            return;
                                        }
                                        r !== n &&
                                            ((t = void 0),
                                            startBrowserTracingNavigationSpan(e, {
                                                name: eg.m9.location.pathname,
                                                attributes: {
                                                    [S.Zj]: "url",
                                                    [S.S3]: "auto.navigation.browser",
                                                },
                                            }));
                                    });
                            }
                            A &&
                                (eg.m9.document
                                    ? eg.m9.document.addEventListener("visibilitychange", () => {
                                          let e = (0, y.HN)();
                                          if (!e) return;
                                          let t = (0, y.Gx)(e);
                                          if (eg.m9.document.hidden && t) {
                                              let e = "cancelled",
                                                  { op: n, status: r } = (0, y.XU)(t);
                                              em.X &&
                                                  T.kg.log(
                                                      `[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${n}`
                                                  ),
                                                  r ||
                                                      t.setStatus({
                                                          code: ec.jt,
                                                          message: e,
                                                      }),
                                                  t.setAttribute("sentry.cancellation_reason", "document.hidden"),
                                                  t.end();
                                          }
                                      })
                                    : em.X &&
                                      T.kg.warn(
                                          "[Tracing] Could not set up background tab detection due to lack of global document"
                                      )),
                                p &&
                                    (function (e, t, n, r, i) {
                                        let a;
                                        let o = eg.m9.document;
                                        o &&
                                            addEventListener(
                                                "click",
                                                () => {
                                                    let o = "ui.action.click",
                                                        s = e[ex];
                                                    if (s) {
                                                        let e = (0, y.XU)(s).op;
                                                        if (["navigation", "pageload"].includes(e)) {
                                                            em.X &&
                                                                T.kg.warn(
                                                                    `[Tracing] Did not create ${o} span because a pageload or navigation span is in progress.`
                                                                );
                                                            return;
                                                        }
                                                    }
                                                    if (
                                                        (a &&
                                                            (a.setAttribute(S.ju, "interactionInterrupted"),
                                                            a.end(),
                                                            (a = void 0)),
                                                        !i.name)
                                                    ) {
                                                        em.X &&
                                                            T.kg.warn(
                                                                `[Tracing] Did not create ${o} transaction because _latestRouteName is missing.`
                                                            );
                                                        return;
                                                    }
                                                    a = startIdleSpan(
                                                        {
                                                            name: i.name,
                                                            op: o,
                                                            attributes: {
                                                                [S.Zj]: i.source || "url",
                                                            },
                                                        },
                                                        {
                                                            idleTimeout: t,
                                                            finalTimeout: n,
                                                            childSpanTimeout: r,
                                                        }
                                                    );
                                                },
                                                {
                                                    once: !1,
                                                    capture: !0,
                                                }
                                            );
                                    })(e, g, h, C, j),
                                n &&
                                    (function () {
                                        let handleEntries = ({ entries: e }) => {
                                            let t = (0, y.HN)(),
                                                n = t && (0, y.Gx)(t);
                                            e.forEach((e) => {
                                                if (!("duration" in e) || !n) return;
                                                let t = e.interactionId;
                                                if (!(null == t || ea.has(t))) {
                                                    if (ei.length > 10) {
                                                        let e = ei.shift();
                                                        ea.delete(e);
                                                    }
                                                    ei.push(t), ea.set(t, n);
                                                }
                                            });
                                        };
                                        addPerformanceInstrumentationHandler("event", handleEntries),
                                            addPerformanceInstrumentationHandler("first-input", handleEntries);
                                    })(),
                                (function (e, t) {
                                    let {
                                            traceFetch: n,
                                            traceXHR: r,
                                            trackFetchStreamPerformance: i,
                                            shouldCreateSpanForRequest: a,
                                            enableHTTPTimings: o,
                                            tracePropagationTargets: s,
                                        } = {
                                            traceFetch: eE.traceFetch,
                                            traceXHR: eE.traceXHR,
                                            trackFetchStreamPerformance: eE.trackFetchStreamPerformance,
                                            ...t,
                                        },
                                        c = "function" == typeof a ? a : (e) => !0,
                                        shouldAttachHeadersWithTargets = (e) =>
                                            (function (e, t) {
                                                let n = (0, b.l4)();
                                                if (n) {
                                                    let r, i;
                                                    try {
                                                        (r = new URL(e, n)), (i = new URL(n).origin);
                                                    } catch (e) {
                                                        return !1;
                                                    }
                                                    let a = r.origin === i;
                                                    return t
                                                        ? (0, ey.U0)(r.toString(), t) ||
                                                              (a && (0, ey.U0)(r.pathname, t))
                                                        : a;
                                                }
                                                {
                                                    let n = !!e.match(/^\/(?!\/)/);
                                                    return t ? (0, ey.U0)(e, t) : n;
                                                }
                                            })(e, s),
                                        u = {};
                                    n &&
                                        (e.addEventProcessor(
                                            (e) => (
                                                "transaction" === e.type &&
                                                    e.spans &&
                                                    e.spans.forEach((e) => {
                                                        if ("http.client" === e.op) {
                                                            let t = eb.get(e.span_id);
                                                            t && ((e.timestamp = t / 1e3), eb.delete(e.span_id));
                                                        }
                                                    }),
                                                e
                                            )
                                        ),
                                        i &&
                                            (0, e_.cf)((e) => {
                                                if (e.response) {
                                                    let t = eS.get(e.response);
                                                    t && e.endTimestamp && eb.set(t, e.endTimestamp);
                                                }
                                            }),
                                        (0, e_.Uf)((e) => {
                                            let t = (function (e, t, n, r, i = "auto.http.browser") {
                                                if (!e.fetchData) return;
                                                let { method: a, url: o } = e.fetchData,
                                                    s = (0, V.f)() && t(o);
                                                if (e.endTimestamp && s) {
                                                    let t = e.fetchData.__span;
                                                    if (!t) return;
                                                    let n = r[t];
                                                    n &&
                                                        ((function (e, t) {
                                                            if (t.response) {
                                                                (0, ec.Q0)(e, t.response.status);
                                                                let n =
                                                                    t.response?.headers &&
                                                                    t.response.headers.get("content-length");
                                                                if (n) {
                                                                    let t = parseInt(n);
                                                                    t > 0 &&
                                                                        e.setAttribute(
                                                                            "http.response_content_length",
                                                                            t
                                                                        );
                                                                }
                                                            } else
                                                                t.error &&
                                                                    e.setStatus({
                                                                        code: ec.jt,
                                                                        message: "internal_error",
                                                                    });
                                                            e.end();
                                                        })(n, e),
                                                        delete r[t]);
                                                    return;
                                                }
                                                let c = (function (e) {
                                                        try {
                                                            let t = new URL(e);
                                                            return t.href;
                                                        } catch {
                                                            return;
                                                        }
                                                    })(o),
                                                    u = c ? (0, x.en)(c) : (0, x.en)(o),
                                                    l = !!(0, y.HN)(),
                                                    d =
                                                        s && l
                                                            ? startInactiveSpan({
                                                                  name: `${a} ${(0, x.rt)(o)}`,
                                                                  attributes: {
                                                                      url: o,
                                                                      type: "fetch",
                                                                      "http.method": a,
                                                                      "http.url": c,
                                                                      "server.address": u?.host,
                                                                      [S.S3]: i,
                                                                      [S.$J]: "http.client",
                                                                      ...(u?.search && {
                                                                          "http.query": u?.search,
                                                                      }),
                                                                      ...(u?.hash && {
                                                                          "http.fragment": u?.hash,
                                                                      }),
                                                                  },
                                                              })
                                                            : new sentryNonRecordingSpan_SentryNonRecordingSpan();
                                                if (
                                                    ((e.fetchData.__span = d.spanContext().spanId),
                                                    (r[d.spanContext().spanId] = d),
                                                    n(e.fetchData.url))
                                                ) {
                                                    let t = e.args[0],
                                                        n = e.args[1] || {},
                                                        r = (function (e, t, n) {
                                                            let r = getTraceData({
                                                                    span: n,
                                                                }),
                                                                i = r["sentry-trace"],
                                                                a = r.baggage;
                                                            if (!i) return;
                                                            let o =
                                                                t.headers ||
                                                                ("undefined" != typeof Request && (0, _.V9)(e, Request)
                                                                    ? e.headers
                                                                    : void 0);
                                                            if (!o)
                                                                return {
                                                                    ...r,
                                                                };
                                                            if (
                                                                "undefined" != typeof Headers &&
                                                                (0, _.V9)(o, Headers)
                                                            ) {
                                                                let e = new Headers(o);
                                                                if ((e.set("sentry-trace", i), a)) {
                                                                    let t = e.get("baggage");
                                                                    if (t) {
                                                                        let n =
                                                                            stripBaggageHeaderOfSentryBaggageValues(t);
                                                                        e.set("baggage", n ? `${n},${a}` : a);
                                                                    } else e.set("baggage", a);
                                                                }
                                                                return e;
                                                            }
                                                            if (Array.isArray(o)) {
                                                                let e = [
                                                                    ...o
                                                                        .filter(
                                                                            (e) =>
                                                                                !(
                                                                                    Array.isArray(e) &&
                                                                                    "sentry-trace" === e[0]
                                                                                )
                                                                        )
                                                                        .map((e) => {
                                                                            if (
                                                                                !Array.isArray(e) ||
                                                                                "baggage" !== e[0] ||
                                                                                "string" != typeof e[1]
                                                                            )
                                                                                return e;
                                                                            {
                                                                                let [t, n, ...r] = e;
                                                                                return [
                                                                                    t,
                                                                                    stripBaggageHeaderOfSentryBaggageValues(
                                                                                        n
                                                                                    ),
                                                                                    ...r,
                                                                                ];
                                                                            }
                                                                        }),
                                                                    ["sentry-trace", i],
                                                                ];
                                                                return a && e.push(["baggage", a]), e;
                                                            }
                                                            {
                                                                let e = "baggage" in o ? o.baggage : void 0,
                                                                    t = [];
                                                                return (
                                                                    Array.isArray(e)
                                                                        ? (t = e
                                                                              .map((e) =>
                                                                                  "string" == typeof e
                                                                                      ? stripBaggageHeaderOfSentryBaggageValues(
                                                                                            e
                                                                                        )
                                                                                      : e
                                                                              )
                                                                              .filter((e) => "" === e))
                                                                        : e &&
                                                                          t.push(
                                                                              stripBaggageHeaderOfSentryBaggageValues(e)
                                                                          ),
                                                                    a && t.push(a),
                                                                    {
                                                                        ...o,
                                                                        "sentry-trace": i,
                                                                        baggage: t.length > 0 ? t.join(",") : void 0,
                                                                    }
                                                                );
                                                            }
                                                        })(t, n, (0, V.f)() && l ? d : void 0);
                                                    r && ((e.args[1] = n), (n.headers = r));
                                                }
                                                let p = (0, w.s3)();
                                                if (p) {
                                                    let t = {
                                                        input: e.args,
                                                        response: e.response,
                                                        startTimestamp: e.startTimestamp,
                                                        endTimestamp: e.endTimestamp,
                                                    };
                                                    p.emit("beforeOutgoingRequestSpan", d, t);
                                                }
                                                return d;
                                            })(e, c, shouldAttachHeadersWithTargets, u);
                                            if (
                                                (e.response &&
                                                    e.fetchData.__span &&
                                                    eS.set(e.response, e.fetchData.__span),
                                                t)
                                            ) {
                                                let n = request_getFullURL(e.fetchData.url),
                                                    r = n ? (0, x.en)(n).host : void 0;
                                                t.setAttributes({
                                                    "http.url": n,
                                                    "server.address": r,
                                                });
                                            }
                                            o && t && addHTTPTimings(t);
                                        })),
                                        r &&
                                            (0, eh.UK)((e) => {
                                                let t = (function (e, t, n, r) {
                                                    let i = e.xhr,
                                                        a = i?.[eh.xU];
                                                    if (!i || i.__sentry_own_request__ || !a) return;
                                                    let { url: o, method: s } = a,
                                                        c = (0, V.f)() && t(o);
                                                    if (e.endTimestamp && c) {
                                                        let e = i.__sentry_xhr_span_id__;
                                                        if (!e) return;
                                                        let t = r[e];
                                                        t &&
                                                            void 0 !== a.status_code &&
                                                            ((0, ec.Q0)(t, a.status_code), t.end(), delete r[e]);
                                                        return;
                                                    }
                                                    let u = request_getFullURL(o),
                                                        l = u ? (0, x.en)(u) : (0, x.en)(o),
                                                        d = (0, x.rt)(o),
                                                        p = !!(0, y.HN)(),
                                                        f =
                                                            c && p
                                                                ? startInactiveSpan({
                                                                      name: `${s} ${d}`,
                                                                      attributes: {
                                                                          url: o,
                                                                          type: "xhr",
                                                                          "http.method": s,
                                                                          "http.url": u,
                                                                          "server.address": l?.host,
                                                                          [S.S3]: "auto.http.browser",
                                                                          [S.$J]: "http.client",
                                                                          ...(l?.search && {
                                                                              "http.query": l?.search,
                                                                          }),
                                                                          ...(l?.hash && {
                                                                              "http.fragment": l?.hash,
                                                                          }),
                                                                      },
                                                                  })
                                                                : new sentryNonRecordingSpan_SentryNonRecordingSpan();
                                                    (i.__sentry_xhr_span_id__ = f.spanContext().spanId),
                                                        (r[i.__sentry_xhr_span_id__] = f),
                                                        n(o) &&
                                                            (function (e, t) {
                                                                let { "sentry-trace": n, baggage: r } = getTraceData({
                                                                    span: t,
                                                                });
                                                                n &&
                                                                    (function (e, t, n) {
                                                                        try {
                                                                            e.setRequestHeader("sentry-trace", t),
                                                                                n && e.setRequestHeader("baggage", n);
                                                                        } catch (e) {}
                                                                    })(e, n, r);
                                                            })(i, (0, V.f)() && p ? f : void 0);
                                                    let m = (0, w.s3)();
                                                    return m && m.emit("beforeOutgoingRequestSpan", f, e), f;
                                                })(e, c, shouldAttachHeadersWithTargets, u);
                                                o && t && addHTTPTimings(t);
                                            });
                                })(e, {
                                    traceFetch: P,
                                    traceXHR: D,
                                    trackFetchStreamPerformance: $,
                                    tracePropagationTargets: e.getOptions().tracePropagationTargets,
                                    shouldCreateSpanForRequest: L,
                                    enableHTTPTimings: R,
                                });
                        },
                    };
                };
            function startBrowserTracingPageLoadSpan(e, t, n) {
                return e.emit("startPageLoadSpan", t, n), (0, w.nZ)().setTransactionName(t.name), e[ex];
            }
            function startBrowserTracingNavigationSpan(e, t) {
                return e.emit("startNavigationSpan", t), (0, w.nZ)().setTransactionName(t.name), e[ex];
            }
            function getMetaContent(e) {
                let t = eg.m9.document,
                    n = t?.querySelector(`meta[name=${e}]`);
                return n?.getAttribute("content") || void 0;
            }
            let ex = "_sentry_idleSpan",
                ek = "incomplete-app-router-transaction",
                ew = d.GLOBAL_OBJ;
            function transactionNameifyRouterArgument(e) {
                try {
                    return new URL(e, "http://example.com/").pathname;
                } catch {
                    return "/";
                }
            }
            var eI = n(6543);
            let eO = eI.events ? eI : eI.default,
                eC = eg.m9;
            var eA = n(96817);
            let eP = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
            function resolve(...e) {
                let t = "",
                    n = !1;
                for (let r = e.length - 1; r >= -1 && !n; r--) {
                    let i = r >= 0 ? e[r] : "/";
                    i && ((t = `${i}/${t}`), (n = "/" === i.charAt(0)));
                }
                return (
                    (t = (function (e, t) {
                        let n = 0;
                        for (let t = e.length - 1; t >= 0; t--) {
                            let r = e[t];
                            "." === r
                                ? e.splice(t, 1)
                                : ".." === r
                                  ? (e.splice(t, 1), n++)
                                  : n && (e.splice(t, 1), n--);
                        }
                        if (t) for (; n--; n) e.unshift("..");
                        return e;
                    })(
                        t.split("/").filter((e) => !!e),
                        !n
                    ).join("/")),
                    (n ? "/" : "") + t || "."
                );
            }
            function trim(e) {
                let t = 0;
                for (; t < e.length && "" === e[t]; t++);
                let n = e.length - 1;
                for (; n >= 0 && "" === e[n]; n--);
                return t > n ? [] : e.slice(t, n - t + 1);
            }
            let eD = (0, eA._I)((e = {}) => {
                    let t = e.root,
                        n = e.prefix || "app:///",
                        r = "window" in d.GLOBAL_OBJ && !!d.GLOBAL_OBJ.window,
                        i =
                            e.iteratee ||
                            (function ({ isBrowser: e, root: t, prefix: n }) {
                                return (r) => {
                                    if (!r.filename) return r;
                                    let i =
                                            /^[a-zA-Z]:\\/.test(r.filename) ||
                                            (r.filename.includes("\\") && !r.filename.includes("/")),
                                        a = /^\//.test(r.filename);
                                    if (e) {
                                        if (t) {
                                            let e = r.filename;
                                            0 === e.indexOf(t) && (r.filename = e.replace(t, n));
                                        }
                                    } else if (i || a) {
                                        var o;
                                        let e;
                                        let a = i
                                                ? r.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/")
                                                : r.filename,
                                            s = t
                                                ? (function (e, t) {
                                                      (e = resolve(e).slice(1)), (t = resolve(t).slice(1));
                                                      let n = trim(e.split("/")),
                                                          r = trim(t.split("/")),
                                                          i = Math.min(n.length, r.length),
                                                          a = i;
                                                      for (let e = 0; e < i; e++)
                                                          if (n[e] !== r[e]) {
                                                              a = e;
                                                              break;
                                                          }
                                                      let o = [];
                                                      for (let e = a; e < n.length; e++) o.push("..");
                                                      return (o = o.concat(r.slice(a))).join("/");
                                                  })(t, a)
                                                : ((e =
                                                      (function (e) {
                                                          let t = e.length > 1024 ? `<truncated>${e.slice(-1024)}` : e,
                                                              n = eP.exec(t);
                                                          return n ? n.slice(1) : [];
                                                      })(a)[2] || ""),
                                                  o &&
                                                      e.slice(-1 * o.length) === o &&
                                                      (e = e.slice(0, e.length - o.length)),
                                                  e);
                                        r.filename = `${n}${s}`;
                                    }
                                    return r;
                                };
                            })({
                                isBrowser: r,
                                root: t,
                                prefix: n,
                            });
                    return {
                        name: "RewriteFrames",
                        processEvent(e) {
                            let t = e;
                            return (
                                e.exception &&
                                    Array.isArray(e.exception.values) &&
                                    (t = (function (e) {
                                        try {
                                            return {
                                                ...e,
                                                exception: {
                                                    ...e.exception,
                                                    values: e.exception.values.map((e) => {
                                                        var t;
                                                        return {
                                                            ...e,
                                                            ...(e.stacktrace && {
                                                                stacktrace: {
                                                                    ...(t = e.stacktrace),
                                                                    frames: t?.frames && t.frames.map((e) => i(e)),
                                                                },
                                                            }),
                                                        };
                                                    }),
                                                },
                                            };
                                        } catch (t) {
                                            return e;
                                        }
                                    })(t)),
                                t
                            );
                        },
                    };
                }),
                e$ = (0, eA._I)(
                    ({
                        assetPrefix: e,
                        basePath: t,
                        rewriteFramesAssetPrefixPath: n,
                        experimentalThirdPartyOriginStackFrames: r,
                    }) => {
                        let i = eD({
                            iteratee: (i) => {
                                if (r) {
                                    let n =
                                        "undefined" != typeof window && window.location ? window.location.origin : "";
                                    if (i.filename?.startsWith(n) && !i.filename.endsWith(".js")) return i;
                                    if (e) i.filename?.startsWith(e) && (i.filename = i.filename.replace(e, "app://"));
                                    else if (t)
                                        try {
                                            let { origin: e } = new URL(i.filename);
                                            e === n && (i.filename = i.filename?.replace(e, "app://").replace(t, ""));
                                        } catch (e) {}
                                } else
                                    try {
                                        let { origin: e } = new URL(i.filename);
                                        i.filename = i.filename?.replace(e, "app://").replace(n, "");
                                    } catch (e) {}
                                return (
                                    r
                                        ? (i.filename?.includes("/_next") && (i.filename = decodeURI(i.filename)),
                                          i.filename?.match(
                                              /\/_next\/static\/chunks\/(main-|main-app-|polyfills-|webpack-|framework-|framework\.)[0-9a-f]+\.js$/
                                          ) && (i.in_app = !1))
                                        : (i.filename?.startsWith("app:///_next") &&
                                              (i.filename = decodeURI(i.filename)),
                                          i.filename?.match(
                                              /^app:\/\/\/_next\/static\/chunks\/(main-|main-app-|polyfills-|webpack-|framework-|framework\.)[0-9a-f]+\.js$/
                                          ) && (i.in_app = !1)),
                                    i
                                );
                            },
                        });
                        return {
                            ...i,
                            name: "NextjsClientStackFrameNormalization",
                        };
                    }
                );
            var eL = n(99913),
                eR = n(25566);
            let eF = d.GLOBAL_OBJ;
            var eN = n(25566);
            let eH = d.GLOBAL_OBJ;
            function client_init(e) {
                let t = {
                    environment:
                        (function (e) {
                            let t = e ? h.env.NEXT_PUBLIC_VERCEL_ENV : h.env.VERCEL_ENV;
                            return t ? `vercel-${t}` : void 0;
                        })(!0) || "production",
                    defaultIntegrations: (function (e) {
                        let t = (0, m.nV)(e);
                        ("undefined" == typeof __SENTRY_TRACING__ || __SENTRY_TRACING__) &&
                            t.push(
                                (function (e = {}) {
                                    let t = browserTracingIntegration({
                                            ...e,
                                            instrumentNavigation: !1,
                                            instrumentPageLoad: !1,
                                        }),
                                        { instrumentPageLoad: n = !0, instrumentNavigation: r = !0 } = e;
                                    return {
                                        ...t,
                                        afterAllSetup(e) {
                                            r &&
                                                (function (e) {
                                                    let t = !eg.m9.document.getElementById("__NEXT_DATA__");
                                                    t
                                                        ? !(function (e) {
                                                              let t;
                                                              eg.m9.addEventListener("popstate", () => {
                                                                  t?.isRecording()
                                                                      ? (t.updateName(eg.m9.location.pathname),
                                                                        t.setAttribute(S.Zj, "url"))
                                                                      : (t = startBrowserTracingNavigationSpan(e, {
                                                                            name: eg.m9.location.pathname,
                                                                            attributes: {
                                                                                [S.$J]: "navigation",
                                                                                [S.S3]: "auto.navigation.nextjs.app_router_instrumentation",
                                                                                [S.Zj]: "url",
                                                                                "navigation.type": "browser.popstate",
                                                                            },
                                                                        }));
                                                              });
                                                              let n = !1,
                                                                  r = 0,
                                                                  i = setInterval(() => {
                                                                      r++;
                                                                      let a = ew?.next?.router ?? ew?.nd?.router;
                                                                      n || r > 500
                                                                          ? clearInterval(i)
                                                                          : a &&
                                                                            (clearInterval(i),
                                                                            (n = !0),
                                                                            [
                                                                                "back",
                                                                                "forward",
                                                                                "push",
                                                                                "replace",
                                                                            ].forEach((n) => {
                                                                                a?.[n] &&
                                                                                    (a[n] = new Proxy(a[n], {
                                                                                        apply(r, i, a) {
                                                                                            let o =
                                                                                                startBrowserTracingNavigationSpan(
                                                                                                    e,
                                                                                                    {
                                                                                                        name: ek,
                                                                                                        attributes: {
                                                                                                            [S.$J]: "navigation",
                                                                                                            [S.S3]: "auto.navigation.nextjs.app_router_instrumentation",
                                                                                                            [S.Zj]: "url",
                                                                                                        },
                                                                                                    }
                                                                                                );
                                                                                            return (
                                                                                                (t = o),
                                                                                                "push" === n
                                                                                                    ? (o?.updateName(
                                                                                                          transactionNameifyRouterArgument(
                                                                                                              a[0]
                                                                                                          )
                                                                                                      ),
                                                                                                      o?.setAttribute(
                                                                                                          S.Zj,
                                                                                                          "url"
                                                                                                      ),
                                                                                                      o?.setAttribute(
                                                                                                          "navigation.type",
                                                                                                          "router.push"
                                                                                                      ))
                                                                                                    : "replace" === n
                                                                                                      ? (o?.updateName(
                                                                                                            transactionNameifyRouterArgument(
                                                                                                                a[0]
                                                                                                            )
                                                                                                        ),
                                                                                                        o?.setAttribute(
                                                                                                            S.Zj,
                                                                                                            "url"
                                                                                                        ),
                                                                                                        o?.setAttribute(
                                                                                                            "navigation.type",
                                                                                                            "router.replace"
                                                                                                        ))
                                                                                                      : "back" === n
                                                                                                        ? o?.setAttribute(
                                                                                                              "navigation.type",
                                                                                                              "router.back"
                                                                                                          )
                                                                                                        : "forward" ===
                                                                                                              n &&
                                                                                                          o?.setAttribute(
                                                                                                              "navigation.type",
                                                                                                              "router.forward"
                                                                                                          ),
                                                                                                r.apply(i, a)
                                                                                            );
                                                                                        },
                                                                                    }));
                                                                            }));
                                                                  }, 20);
                                                          })(e)
                                                        : eO.events.on("routeChangeStart", (t) => {
                                                              let n, r;
                                                              let i = (0, x.rt)(t),
                                                                  a = (function (e) {
                                                                      let t = eC.__BUILD_MANIFEST?.sortedPages;
                                                                      if (t)
                                                                          return t.find((t) => {
                                                                              let n = (function (e) {
                                                                                  let t = e.split("/"),
                                                                                      n = "";
                                                                                  t[t.length - 1]?.match(
                                                                                      /^\[\[\.\.\..+\]\]$/
                                                                                  ) && (t.pop(), (n = "(?:/(.+?))?"));
                                                                                  let r = t
                                                                                      .map((e) =>
                                                                                          e
                                                                                              .replace(
                                                                                                  /^\[\.\.\..+\]$/,
                                                                                                  "(.+?)"
                                                                                              )
                                                                                              .replace(
                                                                                                  /^\[.*\]$/,
                                                                                                  "([^/]+?)"
                                                                                              )
                                                                                      )
                                                                                      .join("/");
                                                                                  return RegExp(`^${r}${n}(?:/)?$`);
                                                                              })(t);
                                                                              return e.match(n);
                                                                          });
                                                                  })(i);
                                                              a ? ((n = a), (r = "route")) : ((n = i), (r = "url")),
                                                                  startBrowserTracingNavigationSpan(e, {
                                                                      name: n,
                                                                      attributes: {
                                                                          [S.$J]: "navigation",
                                                                          [S.S3]: "auto.navigation.nextjs.pages_router_instrumentation",
                                                                          [S.Zj]: r,
                                                                      },
                                                                  });
                                                          });
                                                })(e),
                                                t.afterAllSetup(e),
                                                n &&
                                                    (function (e) {
                                                        let t = !eg.m9.document.getElementById("__NEXT_DATA__");
                                                        t
                                                            ? (function (e) {
                                                                  let t = (0, v.Z1)();
                                                                  startBrowserTracingPageLoadSpan(e, {
                                                                      name: eg.m9.location.pathname,
                                                                      startTime: t ? t / 1e3 : void 0,
                                                                      attributes: {
                                                                          [S.$J]: "pageload",
                                                                          [S.S3]: "auto.pageload.nextjs.app_router_instrumentation",
                                                                          [S.Zj]: "url",
                                                                      },
                                                                  });
                                                              })(e)
                                                            : (function (e) {
                                                                  let {
                                                                          route: t,
                                                                          params: n,
                                                                          sentryTrace: r,
                                                                          baggage: i,
                                                                      } = (function () {
                                                                          let e;
                                                                          let t =
                                                                              eC.document.getElementById(
                                                                                  "__NEXT_DATA__"
                                                                              );
                                                                          if (t?.innerHTML)
                                                                              try {
                                                                                  e = JSON.parse(t.innerHTML);
                                                                              } catch (e) {}
                                                                          if (!e) return {};
                                                                          let n = {},
                                                                              { page: r, query: i, props: a } = e;
                                                                          return (
                                                                              (n.route = r),
                                                                              (n.params = i),
                                                                              a?.pageProps &&
                                                                                  ((n.sentryTrace =
                                                                                      a.pageProps._sentryTraceData),
                                                                                  (n.baggage =
                                                                                      a.pageProps._sentryBaggage)),
                                                                              n
                                                                          );
                                                                      })(),
                                                                      a = (0, ev.XM)(i),
                                                                      o = t || eC.location.pathname;
                                                                  a?.["sentry-transaction"] &&
                                                                      "/_error" === o &&
                                                                      (o = (o = a["sentry-transaction"]).replace(
                                                                          /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\s+/i,
                                                                          ""
                                                                      ));
                                                                  let s = (0, v.Z1)();
                                                                  startBrowserTracingPageLoadSpan(
                                                                      e,
                                                                      {
                                                                          name: o,
                                                                          startTime: s ? s / 1e3 : void 0,
                                                                          attributes: {
                                                                              [S.$J]: "pageload",
                                                                              [S.S3]: "auto.pageload.nextjs.pages_router_instrumentation",
                                                                              [S.Zj]: t ? "route" : "url",
                                                                              ...(n &&
                                                                                  e.getOptions().sendDefaultPii && {
                                                                                      ...n,
                                                                                  }),
                                                                          },
                                                                      },
                                                                      {
                                                                          sentryTrace: r,
                                                                          baggage: i,
                                                                      }
                                                                  );
                                                              })(e);
                                                    })(e);
                                        },
                                    };
                                })()
                            );
                        let n = eN.env._sentryBasePath || eH._sentryBasePath,
                            r =
                                "true" === eN.env._experimentalThirdPartyOriginStackFrames ||
                                "true" === eH._experimentalThirdPartyOriginStackFrames;
                        return (
                            t.push(
                                e$({
                                    assetPrefix: "/main-static/web-futures/v3.5.74",
                                    basePath: n,
                                    rewriteFramesAssetPrefixPath: "/main-static/web-futures/v3.5.74",
                                    experimentalThirdPartyOriginStackFrames: r,
                                })
                            ),
                            t
                        );
                    })(e),
                    ...e,
                };
                !(function (e) {
                    let t = eR.env._sentryRewritesTunnelPath || eF._sentryRewritesTunnelPath;
                    if (t && e.dsn) {
                        let n = (0, eL.U4)(e.dsn);
                        if (!n) return;
                        let r = n.host.match(/^o(\d+)\.ingest(?:\.([a-z]{2}))?\.sentry\.io$/);
                        if (r) {
                            let i = r[1],
                                a = r[2],
                                o = `${t}?o=${i}&p=${n.projectId}`;
                            a && (o += `&r=${a}`), (e.tunnel = o);
                        }
                    }
                })(t),
                    (0, p.V)(t, "nextjs", ["nextjs", "react"]);
                let n = (function (e) {
                        let t = {
                            ...e,
                        };
                        return (
                            (0, p.V)(t, "react"),
                            (0, f.v)("react", {
                                version: g.version,
                            }),
                            (0, m.S1)(t)
                        );
                    })(t),
                    filterTransactions = (e) => ("transaction" === e.type && "/404" === e.transaction ? null : e);
                (filterTransactions.id = "NextClient404Filter"), (0, f.Qy)(filterTransactions);
                let filterIncompleteNavigationTransactions = (e) =>
                    "transaction" === e.type && e.transaction === ek ? null : e;
                (filterIncompleteNavigationTransactions.id = "IncompleteTransactionFilter"),
                    (0, f.Qy)(filterIncompleteNavigationTransactions);
                let filterNextRedirectError = (e, t) => {
                    var n;
                    return ((n = t?.originalException),
                    (0, _.VZ)(n) && "string" == typeof n.digest && n.digest.startsWith("NEXT_REDIRECT;"))
                        ? null
                        : e;
                };
                return (filterNextRedirectError.id = "NextRedirectErrorFilter"), (0, f.Qy)(filterNextRedirectError), n;
            }
        },
        24677: function (e, t, n) {
            "use strict";
            function _class_private_field_loose_base(e, t) {
                if (!Object.prototype.hasOwnProperty.call(e, t))
                    throw TypeError("attempted to use private field on non-instance");
                return e;
            }
            n.r(t),
                n.d(t, {
                    _: function () {
                        return _class_private_field_loose_base;
                    },
                    _class_private_field_loose_base: function () {
                        return _class_private_field_loose_base;
                    },
                });
        },
        6249: function (e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, {
                    _: function () {
                        return _class_private_field_loose_key;
                    },
                    _class_private_field_loose_key: function () {
                        return _class_private_field_loose_key;
                    },
                });
            var r = 0;
            function _class_private_field_loose_key(e) {
                return "__private_" + r++ + "_" + e;
            }
        },
        21024: function (e, t, n) {
            "use strict";
            function _interop_require_default(e) {
                return e && e.__esModule
                    ? e
                    : {
                          default: e,
                      };
            }
            n.r(t),
                n.d(t, {
                    _: function () {
                        return _interop_require_default;
                    },
                    _interop_require_default: function () {
                        return _interop_require_default;
                    },
                });
        },
        68533: function (e, t, n) {
            "use strict";
            function _getRequireWildcardCache(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap(),
                    n = new WeakMap();
                return (_getRequireWildcardCache = function (e) {
                    return e ? n : t;
                })(e);
            }
            function _interop_require_wildcard(e, t) {
                if (!t && e && e.__esModule) return e;
                if (null === e || ("object" != typeof e && "function" != typeof e))
                    return {
                        default: e,
                    };
                var n = _getRequireWildcardCache(t);
                if (n && n.has(e)) return n.get(e);
                var r = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var a in e)
                    if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
                        var o = i ? Object.getOwnPropertyDescriptor(e, a) : null;
                        o && (o.get || o.set) ? Object.defineProperty(r, a, o) : (r[a] = e[a]);
                    }
                return (r.default = e), n && n.set(e, r), r;
            }
            n.r(t),
                n.d(t, {
                    _: function () {
                        return _interop_require_wildcard;
                    },
                    _interop_require_wildcard: function () {
                        return _interop_require_wildcard;
                    },
                });
        },
    },
]);
