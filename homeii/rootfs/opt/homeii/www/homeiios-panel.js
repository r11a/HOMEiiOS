//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ee = Object.prototype.hasOwnProperty;
	function T(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function E(e, t) {
		return T(e.type, t, e.props);
	}
	function D(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function te(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ne = /\/+/g;
	function O(e, t) {
		return typeof e == "object" && e && e.key != null ? te("" + e.key) : t.toString(36);
	}
	function re(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ie(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ie(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + O(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ne, "$&/") + "/"), ie(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = E(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ne, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + O(a, u), c += ie(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + O(a, u++), c += ie(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ie(re(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ae(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ie(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function oe(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var k = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, A = {
		map: ae,
		forEach: function(e, t, n) {
			ae(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ae(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ae(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = A, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ee.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return T(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ee.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return T(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = D, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: oe
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, k);
		} catch (e) {
			k(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.8";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, D());
			else {
				var t = n(l);
				t !== null && O(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function T() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function E() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && T());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && O(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? D() : S = !1;
			}
		}
	}
	var D;
	if (typeof y == "function") D = function() {
		y(E);
	};
	else if (typeof MessageChannel < "u") {
		var te = new MessageChannel(), ne = te.port2;
		te.port1.onmessage = E, D = function() {
			ne.postMessage(null);
		};
	} else D = function() {
		_(E, 0);
	};
	function O(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, O(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, D()))), r;
	}, e.unstable_shouldYield = T, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = c(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = c(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), te = Symbol.for("react.activity"), ne = Symbol.for("react.memo_cache_sentinel"), O = Symbol.iterator;
	function re(e) {
		return typeof e != "object" || !e ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ie = Symbol.for("react.client.reference");
	function ae(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ie ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ee: return "Suspense";
			case T: return "SuspenseList";
			case te: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case E: return t = e.displayName || null, t === null ? ae(e.type) || "Memo" : t;
			case D:
				t = e._payload, e = e._init;
				try {
					return ae(e(t));
				} catch {}
		}
		return null;
	}
	var oe = Array.isArray, k = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ce = [], le = -1;
	function ue(e) {
		return { current: e };
	}
	function j(e) {
		0 > le || (e.current = ce[le], ce[le] = null, le--);
	}
	function M(e, t) {
		le++, ce[le] = e.current, e.current = t;
	}
	var de = ue(null), fe = ue(null), pe = ue(null), me = ue(null);
	function N(e, t) {
		switch (M(pe, t), M(fe, e), M(de, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		j(de), M(de, e);
	}
	function he() {
		j(de), j(fe), j(pe);
	}
	function ge(e) {
		e.memoizedState !== null && M(me, e);
		var t = de.current, n = Hd(t, e.type);
		t !== n && (M(fe, e), M(de, n));
	}
	function _e(e) {
		fe.current === e && (j(de), j(fe)), me.current === e && (j(me), Qf._currentValue = se);
	}
	var ve, ye;
	function be(e) {
		if (ve === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ve = t && t[1] || "", ye = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ve + e + ye;
	}
	var xe = !1;
	function Se(e, t) {
		if (!e || xe) return "";
		xe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			xe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? be(n) : "";
	}
	function Ce(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return be(e.type);
			case 16: return be("Lazy");
			case 13: return e.child !== t && t !== null ? be("Suspense Fallback") : be("Suspense");
			case 19: return be("SuspenseList");
			case 0:
			case 15: return Se(e.type, !1);
			case 11: return Se(e.type.render, !1);
			case 1: return Se(e.type, !0);
			case 31: return be("Activity");
			default: return "";
		}
	}
	function we(e) {
		try {
			var t = "", n = null;
			do
				t += Ce(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var P = Object.prototype.hasOwnProperty, Te = t.unstable_scheduleCallback, Ee = t.unstable_cancelCallback, De = t.unstable_shouldYield, Oe = t.unstable_requestPaint, ke = t.unstable_now, Ae = t.unstable_getCurrentPriorityLevel, je = t.unstable_ImmediatePriority, Me = t.unstable_UserBlockingPriority, Ne = t.unstable_NormalPriority, Pe = t.unstable_LowPriority, Fe = t.unstable_IdlePriority, Ie = t.log, Le = t.unstable_setDisableYieldValue, Re = null, F = null;
	function ze(e) {
		if (typeof Ie == "function" && Le(e), F && typeof F.setStrictMode == "function") try {
			F.setStrictMode(Re, e);
		} catch {}
	}
	var Be = Math.clz32 ? Math.clz32 : I, Ve = Math.log, He = Math.LN2;
	function I(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ve(e) / He | 0) | 0;
	}
	var Ue = 256, We = 262144, Ge = 4194304;
	function Ke(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ke(n))) : i = Ke(o) : i = Ke(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ke(n))) : i = Ke(o)) : i = Ke(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Je(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ye(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Xe() {
		var e = Ge;
		return Ge <<= 1, !(Ge & 62914560) && (Ge = 4194304), e;
	}
	function Ze(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Qe(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function $e(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Be(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && et(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function et(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Be(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function tt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Be(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function nt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : rt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function rt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function it(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function at() {
		var e = A.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ot(e, t) {
		var n = A.p;
		try {
			return A.p = e, t();
		} finally {
			A.p = n;
		}
	}
	var st = Math.random().toString(36).slice(2), L = "__reactFiber$" + st, ct = "__reactProps$" + st, lt = "__reactContainer$" + st, ut = "__reactEvents$" + st, dt = "__reactListeners$" + st, ft = "__reactHandles$" + st, pt = "__reactResources$" + st, mt = "__reactMarker$" + st;
	function ht(e) {
		delete e[L], delete e[ct], delete e[ut], delete e[dt], delete e[ft];
	}
	function gt(e) {
		var t = e[L];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[lt] || n[L]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[L]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function _t(e) {
		if (e = e[L] || e[lt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function vt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function yt(e) {
		var t = e[pt];
		return t ||= e[pt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function bt(e) {
		e[mt] = !0;
	}
	var xt = /* @__PURE__ */ new Set(), St = {};
	function Ct(e, t) {
		wt(e, t), wt(e + "Capture", t);
	}
	function wt(e, t) {
		for (St[e] = t, e = 0; e < t.length; e++) xt.add(t[e]);
	}
	var Tt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Et = {}, Dt = {};
	function Ot(e) {
		return P.call(Dt, e) ? !0 : P.call(Et, e) ? !1 : Tt.test(e) ? Dt[e] = !0 : (Et[e] = !0, !1);
	}
	function kt(e, t, n) {
		if (Ot(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, "" + n);
			}
		}
	}
	function At(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function jt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Mt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Nt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Pt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Ft(e) {
		if (!e._valueTracker) {
			var t = Nt(e) ? "checked" : "value";
			e._valueTracker = Pt(e, t, "" + e[t]);
		}
	}
	function It(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Nt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Lt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Rt = /[\n"\\]/g;
	function zt(e) {
		return e.replace(Rt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Bt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Mt(t)) : e.value !== "" + Mt(t) && (e.value = "" + Mt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ht(e, o, Mt(n)) : Ht(e, o, Mt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Mt(s) : e.removeAttribute("name");
	}
	function Vt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ft(e);
				return;
			}
			n = n == null ? "" : "" + Mt(n), t = t == null ? n : "" + Mt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ft(e);
	}
	function Ht(e, t, n) {
		t === "number" && Lt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Ut(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Mt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Wt(e, t, n) {
		if (t != null && (t = "" + Mt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Mt(n);
	}
	function Gt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (oe(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Mt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ft(e);
	}
	function Kt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var qt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Jt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || qt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Yt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Jt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Jt(e, o, t[o]);
	}
	function Xt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Zt = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Qt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function $t(e) {
		return Qt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function en() {}
	var tn = null;
	function nn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var rn = null, an = null;
	function on(e) {
		var t = _t(e);
		if (t && (e = t.stateNode)) {
			var n = e[ct] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Bt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + zt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[ct] || null;
								if (!a) throw Error(i(90));
								Bt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && It(r);
					}
					break a;
				case "textarea":
					Wt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Ut(e, !!n.multiple, t, !1);
			}
		}
	}
	var sn = !1;
	function cn(e, t, n) {
		if (sn) return e(t, n);
		sn = !0;
		try {
			return e(t);
		} finally {
			if (sn = !1, (rn !== null || an !== null) && (bu(), rn && (t = rn, e = an, an = rn = null, on(t), e))) for (t = 0; t < e.length; t++) on(e[t]);
		}
	}
	function ln(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ct] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var un = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), dn = !1;
	if (un) try {
		var fn = {};
		Object.defineProperty(fn, "passive", { get: function() {
			dn = !0;
		} }), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn);
	} catch {
		dn = !1;
	}
	var pn = null, mn = null, hn = null;
	function gn() {
		if (hn) return hn;
		var e, t = mn, n = t.length, r, i = "value" in pn ? pn.value : pn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return hn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function _n(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function vn() {
		return !0;
	}
	function yn() {
		return !1;
	}
	function bn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? vn : yn, this.isPropagationStopped = yn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = vn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = vn);
			},
			persist: function() {},
			isPersistent: vn
		}), t;
	}
	var xn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Sn = bn(xn), Cn = h({}, xn, {
		view: 0,
		detail: 0
	}), wn = bn(Cn), Tn, En, Dn, On = h({}, Cn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: zn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Dn && (Dn && e.type === "mousemove" ? (Tn = e.screenX - Dn.screenX, En = e.screenY - Dn.screenY) : En = Tn = 0, Dn = e), Tn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : En;
		}
	}), kn = bn(On), An = bn(h({}, On, { dataTransfer: 0 })), jn = bn(h({}, Cn, { relatedTarget: 0 })), Mn = bn(h({}, xn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Nn = bn(h({}, xn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Pn = bn(h({}, xn, { data: 0 })), Fn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, In = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Ln = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Rn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Ln[e]) ? !!t[e] : !1;
	}
	function zn() {
		return Rn;
	}
	var Bn = bn(h({}, Cn, {
		key: function(e) {
			if (e.key) {
				var t = Fn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = _n(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? In[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: zn,
		charCode: function(e) {
			return e.type === "keypress" ? _n(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? _n(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Vn = bn(h({}, On, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Hn = bn(h({}, Cn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: zn
	})), Un = bn(h({}, xn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Wn = bn(h({}, On, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Gn = bn(h({}, xn, {
		newState: 0,
		oldState: 0
	})), Kn = [
		9,
		13,
		27,
		32
	], qn = un && "CompositionEvent" in window, Jn = null;
	un && "documentMode" in document && (Jn = document.documentMode);
	var Yn = un && "TextEvent" in window && !Jn, Xn = un && (!qn || Jn && 8 < Jn && 11 >= Jn), Zn = " ", Qn = !1;
	function $n(e, t) {
		switch (e) {
			case "keyup": return Kn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function er(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var tr = !1;
	function nr(e, t) {
		switch (e) {
			case "compositionend": return er(t);
			case "keypress": return t.which === 32 ? (Qn = !0, Zn) : null;
			case "textInput": return e = t.data, e === Zn && Qn ? null : e;
			default: return null;
		}
	}
	function rr(e, t) {
		if (tr) return e === "compositionend" || !qn && $n(e, t) ? (e = gn(), hn = mn = pn = null, tr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Xn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var ir = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function ar(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!ir[e.type] : t === "textarea";
	}
	function or(e, t, n, r) {
		rn ? an ? an.push(r) : an = [r] : rn = r, t = Ed(t, "onChange"), 0 < t.length && (n = new Sn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var sr = null, cr = null;
	function lr(e) {
		yd(e, 0);
	}
	function ur(e) {
		if (It(vt(e))) return e;
	}
	function dr(e, t) {
		if (e === "change") return t;
	}
	var fr = !1;
	if (un) {
		var pr;
		if (un) {
			var mr = "oninput" in document;
			if (!mr) {
				var hr = document.createElement("div");
				hr.setAttribute("oninput", "return;"), mr = typeof hr.oninput == "function";
			}
			pr = mr;
		} else pr = !1;
		fr = pr && (!document.documentMode || 9 < document.documentMode);
	}
	function gr() {
		sr && (sr.detachEvent("onpropertychange", _r), cr = sr = null);
	}
	function _r(e) {
		if (e.propertyName === "value" && ur(cr)) {
			var t = [];
			or(t, cr, e, nn(e)), cn(lr, t);
		}
	}
	function vr(e, t, n) {
		e === "focusin" ? (gr(), sr = t, cr = n, sr.attachEvent("onpropertychange", _r)) : e === "focusout" && gr();
	}
	function yr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ur(cr);
	}
	function br(e, t) {
		if (e === "click") return ur(t);
	}
	function xr(e, t) {
		if (e === "input" || e === "change") return ur(t);
	}
	function Sr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Cr = typeof Object.is == "function" ? Object.is : Sr;
	function wr(e, t) {
		if (Cr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!P.call(t, i) || !Cr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Tr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Er(e, t) {
		var n = Tr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Tr(n);
		}
	}
	function Dr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Dr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Or(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Lt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Lt(e.document);
		}
		return t;
	}
	function kr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Ar = un && "documentMode" in document && 11 >= document.documentMode, jr = null, Mr = null, Nr = null, Pr = !1;
	function Fr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Pr || jr == null || jr !== Lt(r) || (r = jr, "selectionStart" in r && kr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Nr && wr(Nr, r) || (Nr = r, r = Ed(Mr, "onSelect"), 0 < r.length && (t = new Sn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = jr)));
	}
	function Ir(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Lr = {
		animationend: Ir("Animation", "AnimationEnd"),
		animationiteration: Ir("Animation", "AnimationIteration"),
		animationstart: Ir("Animation", "AnimationStart"),
		transitionrun: Ir("Transition", "TransitionRun"),
		transitionstart: Ir("Transition", "TransitionStart"),
		transitioncancel: Ir("Transition", "TransitionCancel"),
		transitionend: Ir("Transition", "TransitionEnd")
	}, Rr = {}, zr = {};
	un && (zr = document.createElement("div").style, "AnimationEvent" in window || (delete Lr.animationend.animation, delete Lr.animationiteration.animation, delete Lr.animationstart.animation), "TransitionEvent" in window || delete Lr.transitionend.transition);
	function Br(e) {
		if (Rr[e]) return Rr[e];
		if (!Lr[e]) return e;
		var t = Lr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in zr) return Rr[e] = t[n];
		return e;
	}
	var Vr = Br("animationend"), Hr = Br("animationiteration"), Ur = Br("animationstart"), Wr = Br("transitionrun"), Gr = Br("transitionstart"), Kr = Br("transitioncancel"), qr = Br("transitionend"), Jr = /* @__PURE__ */ new Map(), Yr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Yr.push("scrollEnd");
	function Xr(e, t) {
		Jr.set(e, t), Ct(t, [e]);
	}
	var Zr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Qr = [], $r = 0, ei = 0;
	function ti() {
		for (var e = $r, t = ei = $r = 0; t < e;) {
			var n = Qr[t];
			Qr[t++] = null;
			var r = Qr[t];
			Qr[t++] = null;
			var i = Qr[t];
			Qr[t++] = null;
			var a = Qr[t];
			if (Qr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ai(n, i, a);
		}
	}
	function ni(e, t, n, r) {
		Qr[$r++] = e, Qr[$r++] = t, Qr[$r++] = n, Qr[$r++] = r, ei |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ri(e, t, n, r) {
		return ni(e, t, n, r), oi(e);
	}
	function ii(e, t) {
		return ni(e, null, null, t), oi(e);
	}
	function ai(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Be(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function oi(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var si = {};
	function ci(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function li(e, t, n, r) {
		return new ci(e, t, n, r);
	}
	function ui(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function di(e, t) {
		var n = e.alternate;
		return n === null ? (n = li(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function fi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function pi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ui(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, de.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case te: return e = li(31, n, t, a), e.elementType = te, e.lanes = o, e;
			case y: return mi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = li(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ee: return e = li(13, n, t, a), e.elementType = ee, e.lanes = o, e;
			case T: return e = li(19, n, t, a), e.elementType = T, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case E:
						s = 14;
						break a;
					case D:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = li(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function mi(e, t, n, r) {
		return e = li(7, e, r, t), e.lanes = n, e;
	}
	function hi(e, t, n) {
		return e = li(6, e, null, t), e.lanes = n, e;
	}
	function gi(e) {
		var t = li(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function _i(e, t, n) {
		return t = li(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var vi = /* @__PURE__ */ new WeakMap();
	function yi(e, t) {
		if (typeof e == "object" && e) {
			var n = vi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: we(t)
			}, vi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: we(t)
		};
	}
	var bi = [], xi = 0, Si = null, Ci = 0, wi = [], Ti = 0, Ei = null, Di = 1, Oi = "";
	function ki(e, t) {
		bi[xi++] = Ci, bi[xi++] = Si, Si = e, Ci = t;
	}
	function Ai(e, t, n) {
		wi[Ti++] = Di, wi[Ti++] = Oi, wi[Ti++] = Ei, Ei = e;
		var r = Di;
		e = Oi;
		var i = 32 - Be(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Be(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Di = 1 << 32 - Be(t) + i | n << i | r, Oi = a + e;
		} else Di = 1 << a | n << i | r, Oi = e;
	}
	function ji(e) {
		e.return !== null && (ki(e, 1), Ai(e, 1, 0));
	}
	function Mi(e) {
		for (; e === Si;) Si = bi[--xi], bi[xi] = null, Ci = bi[--xi], bi[xi] = null;
		for (; e === Ei;) Ei = wi[--Ti], wi[Ti] = null, Oi = wi[--Ti], wi[Ti] = null, Di = wi[--Ti], wi[Ti] = null;
	}
	function Ni(e, t) {
		wi[Ti++] = Di, wi[Ti++] = Oi, wi[Ti++] = Ei, Di = t.id, Oi = t.overflow, Ei = e;
	}
	var Pi = null, R = null, z = !1, Fi = null, Ii = !1, Li = Error(i(519));
	function Ri(e) {
		throw Wi(yi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Li;
	}
	function zi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[L] = e, t[ct] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Vt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Gt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = en), t = !0) : t = !1, t || Ri(e, !0);
	}
	function Bi(e) {
		for (Pi = e.return; Pi;) switch (Pi.tag) {
			case 5:
			case 31:
			case 13:
				Ii = !1;
				return;
			case 27:
			case 3:
				Ii = !0;
				return;
			default: Pi = Pi.return;
		}
	}
	function Vi(e) {
		if (e !== Pi) return !1;
		if (!z) return Bi(e), z = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && R && Ri(e), Bi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			R = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			R = uf(e);
		} else t === 27 ? (t = R, Zd(e.type) ? (e = lf, lf = null, R = e) : R = t) : R = Pi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Hi() {
		R = Pi = null, z = !1;
	}
	function Ui() {
		var e = Fi;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Fi = null), e;
	}
	function Wi(e) {
		Fi === null ? Fi = [e] : Fi.push(e);
	}
	var Gi = ue(null), Ki = null, qi = null;
	function Ji(e, t, n) {
		M(Gi, t._currentValue), t._currentValue = n;
	}
	function Yi(e) {
		e._currentValue = Gi.current, j(Gi);
	}
	function Xi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Zi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Xi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Xi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Qi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Cr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === me.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Zi(t, e, n, r), t.flags |= 262144;
	}
	function $i(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Cr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ea(e) {
		Ki = e, qi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ta(e) {
		return ra(Ki, e);
	}
	function na(e, t) {
		return Ki === null && ea(e), ra(e, t);
	}
	function ra(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, qi === null) {
			if (e === null) throw Error(i(308));
			qi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else qi = qi.next = t;
		return n;
	}
	var ia = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, aa = t.unstable_scheduleCallback, oa = t.unstable_NormalPriority, sa = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ca() {
		return {
			controller: new ia(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function la(e) {
		e.refCount--, e.refCount === 0 && aa(oa, function() {
			e.controller.abort();
		});
	}
	var ua = null, da = 0, fa = 0, pa = null;
	function ma(e, t) {
		if (ua === null) {
			var n = ua = [];
			da = 0, fa = dd(), pa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return da++, t.then(ha, ha), t;
	}
	function ha() {
		if (--da === 0 && ua !== null) {
			pa !== null && (pa.status = "fulfilled");
			var e = ua;
			ua = null, fa = 0, pa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ga(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var _a = k.S;
	k.S = function(e, t) {
		eu = ke(), typeof t == "object" && t && typeof t.then == "function" && ma(e, t), _a !== null && _a(e, t);
	};
	var va = ue(null);
	function ya() {
		var e = va.current;
		return e === null ? K.pooledCache : e;
	}
	function ba(e, t) {
		t === null ? M(va, va.current) : M(va, t.pool);
	}
	function xa() {
		var e = ya();
		return e === null ? null : {
			parent: sa._currentValue,
			pool: e
		};
	}
	var Sa = Error(i(460)), Ca = Error(i(474)), wa = Error(i(542)), Ta = { then: function() {} };
	function Ea(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Da(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(en, en), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ja(e), e;
			default:
				if (typeof t.status == "string") t.then(en, en);
				else {
					if (e = K, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ja(e), e;
				}
				throw ka = t, Sa;
		}
	}
	function Oa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ka = e, Sa) : e;
		}
	}
	var ka = null;
	function Aa() {
		if (ka === null) throw Error(i(459));
		var e = ka;
		return ka = null, e;
	}
	function ja(e) {
		if (e === Sa || e === wa) throw Error(i(483));
	}
	var Ma = null, Na = 0;
	function Pa(e) {
		var t = Na;
		return Na += 1, Ma === null && (Ma = []), Da(Ma, e, t);
	}
	function Fa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ia(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function La(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = di(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = hi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === D && Oa(i) === t.type) ? (t = a(t, n.props), Fa(t, n), t.return = e, t) : (t = pi(n.type, n.key, n.props, null, e.mode, r), Fa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = _i(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = mi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = hi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = pi(t.type, t.key, t.props, null, e.mode, n), Fa(n, t), n.return = e, n;
					case v: return t = _i(t, e.mode, n), t.return = e, t;
					case D: return t = Oa(t), f(e, t, n);
				}
				if (oe(t) || re(t)) return t = mi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Pa(t), n);
				if (t.$$typeof === C) return f(e, na(e, t), n);
				Ia(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case D: return n = Oa(n), p(e, t, n, r);
				}
				if (oe(n) || re(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Pa(n), r);
				if (n.$$typeof === C) return p(e, t, na(e, n), r);
				Ia(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case D: return r = Oa(r), m(e, t, n, r, i);
				}
				if (oe(r) || re(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Pa(r), i);
				if (r.$$typeof === C) return m(e, t, n, na(t, r), i);
				Ia(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), z && ki(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return z && ki(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), z && ki(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), z && ki(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return z && ki(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), z && ki(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === D && Oa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Fa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = mi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = pi(o.type, o.key, o.props, null, e.mode, c), Fa(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = _i(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case D: return o = Oa(o), b(e, r, o, c);
				}
				if (oe(o)) return h(e, r, o, c);
				if (re(o)) {
					if (l = re(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Pa(o), c);
				if (o.$$typeof === C) return b(e, r, na(e, o), c);
				Ia(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = hi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Na = 0;
				var i = b(e, t, n, r);
				return Ma = null, i;
			} catch (t) {
				if (t === Sa || t === wa) throw t;
				var a = li(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ra = La(!0), za = La(!1), Ba = !1;
	function Va(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ha(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ua(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Wa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = oi(e), ai(e, null, n), t;
		}
		return ni(e, r, t, n), oi(e);
	}
	function Ga(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
		}
	}
	function Ka(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var qa = !1;
	function Ja() {
		if (qa) {
			var e = pa;
			if (e !== null) throw e;
		}
	}
	function Ya(e, t, n, r) {
		qa = !1;
		var i = e.updateQueue;
		Ba = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === fa && (qa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ba = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Xa(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Za(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Xa(n[e], t);
	}
	var Qa = ue(null), $a = ue(0);
	function eo(e, t) {
		e = Wl, M($a, e), M(Qa, t), Wl = e | t.baseLanes;
	}
	function to() {
		M($a, Wl), M(Qa, Qa.current);
	}
	function no() {
		Wl = $a.current, j(Qa), j($a);
	}
	var ro = ue(null), io = null;
	function ao(e) {
		var t = e.alternate;
		M(uo, uo.current & 1), M(ro, e), io === null && (t === null || Qa.current !== null || t.memoizedState !== null) && (io = e);
	}
	function oo(e) {
		M(uo, uo.current), M(ro, e), io === null && (io = e);
	}
	function so(e) {
		e.tag === 22 ? (M(uo, uo.current), M(ro, e), io === null && (io = e)) : co(e);
	}
	function co() {
		M(uo, uo.current), M(ro, ro.current);
	}
	function lo(e) {
		j(ro), io === e && (io = null), j(uo);
	}
	var uo = ue(0);
	function fo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var po = 0, B = null, V = null, mo = null, ho = !1, go = !1, _o = !1, vo = 0, yo = 0, bo = null, xo = 0;
	function H() {
		throw Error(i(321));
	}
	function So(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Cr(e[n], t[n])) return !1;
		return !0;
	}
	function Co(e, t, n, r, i, a) {
		return po = a, B = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? Bs : Vs, _o = !1, a = n(r, i), _o = !1, go && (a = To(t, n, r, i)), wo(e), a;
	}
	function wo(e) {
		k.H = zs;
		var t = V !== null && V.next !== null;
		if (po = 0, mo = V = B = null, ho = !1, yo = 0, bo = null, t) throw Error(i(300));
		e === null || ic || (e = e.dependencies, e !== null && $i(e) && (ic = !0));
	}
	function To(e, t, n, r) {
		B = e;
		var a = 0;
		do {
			if (go && (bo = null), yo = 0, go = !1, 25 <= a) throw Error(i(301));
			if (a += 1, mo = V = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			k.H = Hs, o = t(n, r);
		} while (go);
		return o;
	}
	function Eo() {
		var e = k.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? No(t) : t, e = e.useState()[0], (V === null ? null : V.memoizedState) !== e && (B.flags |= 1024), t;
	}
	function Do() {
		var e = vo !== 0;
		return vo = 0, e;
	}
	function Oo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function ko(e) {
		if (ho) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			ho = !1;
		}
		po = 0, mo = V = B = null, go = !1, yo = vo = 0, bo = null;
	}
	function Ao() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return mo === null ? B.memoizedState = mo = e : mo = mo.next = e, mo;
	}
	function jo() {
		if (V === null) {
			var e = B.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = V.next;
		var t = mo === null ? B.memoizedState : mo.next;
		if (t !== null) mo = t, V = e;
		else {
			if (e === null) throw B.alternate === null ? Error(i(467)) : Error(i(310));
			V = e, e = {
				memoizedState: V.memoizedState,
				baseState: V.baseState,
				baseQueue: V.baseQueue,
				queue: V.queue,
				next: null
			}, mo === null ? B.memoizedState = mo = e : mo = mo.next = e;
		}
		return mo;
	}
	function Mo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function No(e) {
		var t = yo;
		return yo += 1, bo === null && (bo = []), e = Da(bo, e, t), t = B, (mo === null ? t.memoizedState : mo.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? Bs : Vs), e;
	}
	function Po(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return No(e);
			if (e.$$typeof === C) return ta(e);
		}
		throw Error(i(438, String(e)));
	}
	function Fo(e) {
		var t = null, n = B.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = B.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Mo(), B.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ne;
		return t.index++, n;
	}
	function Io(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Lo(e) {
		return Ro(jo(), V, e);
	}
	function Ro(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (po & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === fa && (d = !0);
					else if ((po & p) === p) {
						u = u.next, p === fa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, B.lanes |= p, Gl |= p;
					f = u.action, _o && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, B.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Cr(o, e.memoizedState) && (ic = !0, d && (n = pa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function zo(e) {
		var t = jo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Cr(o, t.memoizedState) || (ic = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Bo(e, t, n) {
		var r = B, a = jo(), o = z;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Cr((V || a).memoizedState, n);
		if (s && (a.memoizedState = n, ic = !0), a = a.queue, ds(Uo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || mo !== null && mo.memoizedState.tag & 1) {
			if (r.flags |= 2048, os(9, { destroy: void 0 }, Ho.bind(null, r, a, n, t), null), K === null) throw Error(i(349));
			o || po & 127 || Vo(r, t, n);
		}
		return n;
	}
	function Vo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = B.updateQueue, t === null ? (t = Mo(), B.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ho(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Wo(t) && Go(e);
	}
	function Uo(e, t, n) {
		return n(function() {
			Wo(t) && Go(e);
		});
	}
	function Wo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Cr(e, n);
		} catch {
			return !0;
		}
	}
	function Go(e) {
		var t = ii(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Ko(e) {
		var t = Ao();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), _o) {
				ze(!0);
				try {
					n();
				} finally {
					ze(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Io,
			lastRenderedState: e
		}, t;
	}
	function qo(e, t, n, r) {
		return e.baseState = n, Ro(e, V, typeof r == "function" ? r : Io);
	}
	function Jo(e, t, n, r, a) {
		if (Is(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			k.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Yo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Yo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = k.T, o = {};
			k.T = o;
			try {
				var s = n(i, r), c = k.S;
				c !== null && c(o, s), Xo(e, t, s);
			} catch (n) {
				Qo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), k.T = a;
			}
		} else try {
			a = n(i, r), Xo(e, t, a);
		} catch (n) {
			Qo(e, t, n);
		}
	}
	function Xo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Zo(e, t, n);
		}, function(n) {
			return Qo(e, t, n);
		}) : Zo(e, t, n);
	}
	function Zo(e, t, n) {
		t.status = "fulfilled", t.value = n, $o(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Yo(e, n)));
	}
	function Qo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, $o(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function $o(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function es(e, t) {
		return t;
	}
	function ts(e, t) {
		if (z) {
			var n = K.formState;
			if (n !== null) {
				a: {
					var r = B;
					if (z) {
						if (R) {
							b: {
								for (var i = R, a = Ii; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								R = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ri(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Ao(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: es,
			lastRenderedState: t
		}, n.queue = r, n = Ns.bind(null, B, r), r.dispatch = n, r = Ko(!1), a = Fs.bind(null, B, !1, r.queue), r = Ao(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Jo.bind(null, B, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ns(e) {
		return rs(jo(), V, e);
	}
	function rs(e, t, n) {
		if (t = Ro(e, t, es)[0], e = Lo(Io)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = No(t);
		} catch (e) {
			throw e === Sa ? wa : e;
		}
		else r = t;
		t = jo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (B.flags |= 2048, os(9, { destroy: void 0 }, is.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function is(e, t) {
		e.action = t;
	}
	function as(e) {
		var t = jo(), n = V;
		if (n !== null) return rs(t, n, e);
		jo(), t = t.memoizedState, n = jo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function os(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = B.updateQueue, t === null && (t = Mo(), B.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ss() {
		return jo().memoizedState;
	}
	function cs(e, t, n, r) {
		var i = Ao();
		B.flags |= e, i.memoizedState = os(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ls(e, t, n, r) {
		var i = jo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		V !== null && r !== null && So(r, V.memoizedState.deps) ? i.memoizedState = os(t, a, n, r) : (B.flags |= e, i.memoizedState = os(1 | t, a, n, r));
	}
	function us(e, t) {
		cs(8390656, 8, e, t);
	}
	function ds(e, t) {
		ls(2048, 8, e, t);
	}
	function fs(e) {
		B.flags |= 4;
		var t = B.updateQueue;
		if (t === null) t = Mo(), B.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ps(e) {
		var t = jo().memoizedState;
		return fs({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ms(e, t) {
		return ls(4, 2, e, t);
	}
	function hs(e, t) {
		return ls(4, 4, e, t);
	}
	function gs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function _s(e, t, n) {
		n = n == null ? null : n.concat([e]), ls(4, 4, gs.bind(null, t, e), n);
	}
	function vs() {}
	function ys(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && So(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function bs(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && So(t, r[1])) return r[0];
		if (r = e(), _o) {
			ze(!0);
			try {
				e();
			} finally {
				ze(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function xs(e, t, n) {
		return n === void 0 || po & 1073741824 && !(J & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), B.lanes |= e, Gl |= e, n);
	}
	function Ss(e, t, n, r) {
		return Cr(n, t) ? n : Qa.current === null ? !(po & 42) || po & 1073741824 && !(J & 261930) ? (ic = !0, e.memoizedState = n) : (e = mu(), B.lanes |= e, Gl |= e, t) : (e = xs(e, n, r), Cr(e, t) || (ic = !0), e);
	}
	function Cs(e, t, n, r, i) {
		var a = A.p;
		A.p = a !== 0 && 8 > a ? a : 8;
		var o = k.T, s = {};
		k.T = s, Fs(e, !1, t, n);
		try {
			var c = i(), l = k.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ps(e, t, ga(c, r), pu(e)) : Ps(e, t, r, pu(e));
		} catch (n) {
			Ps(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			A.p = a, o !== null && s.types !== null && (o.types = s.types), k.T = o;
		}
	}
	function ws() {}
	function Ts(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Es(e).queue;
		Cs(e, a, t, se, n === null ? ws : function() {
			return Ds(e), n(r);
		});
	}
	function Es(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: se,
			baseState: se,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Io,
				lastRenderedState: se
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Io,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ds(e) {
		var t = Es(e);
		t.next === null && (t = e.alternate.memoizedState), Ps(e, t.next.queue, {}, pu());
	}
	function Os() {
		return ta(Qf);
	}
	function ks() {
		return jo().memoizedState;
	}
	function As() {
		return jo().memoizedState;
	}
	function js(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Ua(n);
					var r = Wa(t, e, n);
					r !== null && (hu(r, t, n), Ga(r, t, n)), t = { cache: ca() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ms(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Is(e) ? Ls(t, n) : (n = ri(e, t, n, r), n !== null && (hu(n, e, r), Rs(n, t, r)));
	}
	function Ns(e, t, n) {
		Ps(e, t, n, pu());
	}
	function Ps(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Is(e)) Ls(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Cr(s, o)) return ni(e, t, i, 0), K === null && ti(), !1;
			} catch {}
			if (n = ri(e, t, i, r), n !== null) return hu(n, e, r), Rs(n, t, r), !0;
		}
		return !1;
	}
	function Fs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Is(e)) {
			if (t) throw Error(i(479));
		} else t = ri(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Is(e) {
		var t = e.alternate;
		return e === B || t !== null && t === B;
	}
	function Ls(e, t) {
		go = ho = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Rs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
		}
	}
	var zs = {
		readContext: ta,
		use: Po,
		useCallback: H,
		useContext: H,
		useEffect: H,
		useImperativeHandle: H,
		useLayoutEffect: H,
		useInsertionEffect: H,
		useMemo: H,
		useReducer: H,
		useRef: H,
		useState: H,
		useDebugValue: H,
		useDeferredValue: H,
		useTransition: H,
		useSyncExternalStore: H,
		useId: H,
		useHostTransitionStatus: H,
		useFormState: H,
		useActionState: H,
		useOptimistic: H,
		useMemoCache: H,
		useCacheRefresh: H
	};
	zs.useEffectEvent = H;
	var Bs = {
		readContext: ta,
		use: Po,
		useCallback: function(e, t) {
			return Ao().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ta,
		useEffect: us,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), cs(4194308, 4, gs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return cs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			cs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Ao();
			t = t === void 0 ? null : t;
			var r = e();
			if (_o) {
				ze(!0);
				try {
					e();
				} finally {
					ze(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Ao();
			if (n !== void 0) {
				var i = n(t);
				if (_o) {
					ze(!0);
					try {
						n(t);
					} finally {
						ze(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ms.bind(null, B, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Ao();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ko(e);
			var t = e.queue, n = Ns.bind(null, B, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			return xs(Ao(), e, t);
		},
		useTransition: function() {
			var e = Ko(!1);
			return e = Cs.bind(null, B, e.queue, !0, !1), Ao().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = B, a = Ao();
			if (z) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), K === null) throw Error(i(349));
				J & 127 || Vo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, us(Uo.bind(null, r, o, e), [e]), r.flags |= 2048, os(9, { destroy: void 0 }, Ho.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Ao(), t = K.identifierPrefix;
			if (z) {
				var n = Oi, r = Di;
				n = (r & ~(1 << 32 - Be(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = vo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = xo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Os,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e) {
			var t = Ao();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Fs.bind(null, B, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Fo,
		useCacheRefresh: function() {
			return Ao().memoizedState = js.bind(null, B);
		},
		useEffectEvent: function(e) {
			var t = Ao(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Vs = {
		readContext: ta,
		use: Po,
		useCallback: ys,
		useContext: ta,
		useEffect: ds,
		useImperativeHandle: _s,
		useInsertionEffect: ms,
		useLayoutEffect: hs,
		useMemo: bs,
		useReducer: Lo,
		useRef: ss,
		useState: function() {
			return Lo(Io);
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			return Ss(jo(), V.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Lo(Io)[0], t = jo().memoizedState;
			return [typeof e == "boolean" ? e : No(e), t];
		},
		useSyncExternalStore: Bo,
		useId: ks,
		useHostTransitionStatus: Os,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			return qo(jo(), V, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: As
	};
	Vs.useEffectEvent = ps;
	var Hs = {
		readContext: ta,
		use: Po,
		useCallback: ys,
		useContext: ta,
		useEffect: ds,
		useImperativeHandle: _s,
		useInsertionEffect: ms,
		useLayoutEffect: hs,
		useMemo: bs,
		useReducer: zo,
		useRef: ss,
		useState: function() {
			return zo(Io);
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			var n = jo();
			return V === null ? xs(n, e, t) : Ss(n, V.memoizedState, e, t);
		},
		useTransition: function() {
			var e = zo(Io)[0], t = jo().memoizedState;
			return [typeof e == "boolean" ? e : No(e), t];
		},
		useSyncExternalStore: Bo,
		useId: ks,
		useHostTransitionStatus: Os,
		useFormState: as,
		useActionState: as,
		useOptimistic: function(e, t) {
			var n = jo();
			return V === null ? (n.baseState = e, [e, n.queue.dispatch]) : qo(n, V, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: As
	};
	Hs.useEffectEvent = ps;
	function Us(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ws = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ua(r);
			i.payload = t, n != null && (i.callback = n), t = Wa(e, i, r), t !== null && (hu(t, e, r), Ga(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ua(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Wa(e, i, r), t !== null && (hu(t, e, r), Ga(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Ua(n);
			r.tag = 2, t != null && (r.callback = t), t = Wa(e, r, n), t !== null && (hu(t, e, n), Ga(t, e, n));
		}
	};
	function Gs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !wr(n, r) || !wr(i, a) : !0;
	}
	function Ks(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ws.enqueueReplaceState(t, t.state, null);
	}
	function qs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Js(e) {
		Zr(e);
	}
	function Ys(e) {
		console.error(e);
	}
	function Xs(e) {
		Zr(e);
	}
	function Zs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Qs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function $s(e, t, n) {
		return n = Ua(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Zs(e, t);
		}, n;
	}
	function ec(e) {
		return e = Ua(e), e.tag = 3, e;
	}
	function tc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Qs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Qs(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function nc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Qi(t, n, a, !0), n = ro.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return io === null ? Du() : n.alternate === null && X === 0 && (X = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ta ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ta ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (z) return t = ro.current, t === null ? (r !== Li && (t = Error(i(423), { cause: r }), Wi(yi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = yi(r, n), a = $s(e.stateNode, r, a), Ka(e, a), X !== 4 && (X = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Li && (e = Error(i(422), { cause: r }), Wi(yi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = yi(o, n), Xl === null ? Xl = [o] : Xl.push(o), X !== 4 && (X = 2), t === null) return !0;
		r = yi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = $s(n.stateNode, r, e), Ka(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = ec(a), tc(a, e, n, r), Ka(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var rc = Error(i(461)), ic = !1;
	function ac(e, t, n, r) {
		t.child = e === null ? za(t, null, n, r) : Ra(t, e.child, n, r);
	}
	function oc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ea(t), r = Co(e, t, n, o, a, i), s = Do(), e !== null && !ic ? (Oo(e, t, i), Ac(e, t, i)) : (z && s && ji(t), t.flags |= 1, ac(e, t, r, i), t.child);
	}
	function sc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ui(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, cc(e, t, a, r, i)) : (e = pi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !jc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? wr : n, n(o, r) && e.ref === t.ref) return Ac(e, t, i);
		}
		return t.flags |= 1, e = di(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function cc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (wr(a, r) && e.ref === t.ref) {
				if (ic = !1, t.pendingProps = r = a, jc(e, i)) e.flags & 131072 && (ic = !0);
				else return t.lanes = e.lanes, Ac(e, t, i);
			}
		}
		return gc(e, t, n, r, i);
	}
	function lc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return dc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ba(t, a === null ? null : a.cachePool), a === null ? to() : eo(t, a), so(t);
			else return r = t.lanes = 536870912, dc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ba(t, null), to(), co(t)) : (ba(t, a.cachePool), eo(t, a), co(t), t.memoizedState = null);
		return ac(e, t, i, n), t.child;
	}
	function uc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function dc(e, t, n, r, i) {
		var a = ya();
		return a = a === null ? null : {
			parent: sa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ba(t, null), to(), so(t), e !== null && Qi(e, t, r, !0), t.childLanes = i, null;
	}
	function fc(e, t) {
		return t = Tc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function pc(e, t, n) {
		return Ra(t, e.child, null, n), e = fc(t, t.pendingProps), e.flags |= 2, lo(t), t.memoizedState = null, e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (z) {
				if (r.mode === "hidden") return e = fc(t, r), t.lanes = 536870912, uc(null, e);
				if (oo(t), (e = R) ? (e = rf(e, Ii), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ei === null ? null : {
						id: Di,
						overflow: Oi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = gi(e), n.return = t, t.child = n, Pi = t, R = null)) : e = null, e === null) throw Ri(t);
				return t.lanes = 536870912, null;
			}
			return fc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (oo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = pc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (ic || Qi(e, t, n, !1), a = (n & e.childLanes) !== 0, ic || a) {
				if (r = K, r !== null && (s = nt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ii(e, s), hu(r, e, s), rc;
				Du(), t = pc(e, t, n);
			} else e = o.treeContext, R = cf(s.nextSibling), Pi = t, z = !0, Fi = null, Ii = !1, e !== null && Ni(t, e), t = fc(t, r), t.flags |= 4096;
			return t;
		}
		return e = di(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function hc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function gc(e, t, n, r, i) {
		return ea(t), n = Co(e, t, n, r, void 0, i), r = Do(), e !== null && !ic ? (Oo(e, t, i), Ac(e, t, i)) : (z && r && ji(t), t.flags |= 1, ac(e, t, n, i), t.child);
	}
	function _c(e, t, n, r, i, a) {
		return ea(t), t.updateQueue = null, n = To(t, r, n, i), wo(e), r = Do(), e !== null && !ic ? (Oo(e, t, a), Ac(e, t, a)) : (z && r && ji(t), t.flags |= 1, ac(e, t, n, a), t.child);
	}
	function vc(e, t, n, r, i) {
		if (ea(t), t.stateNode === null) {
			var a = si, o = n.contextType;
			typeof o == "object" && o && (a = ta(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ws, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Va(t), o = n.contextType, a.context = typeof o == "object" && o ? ta(o) : si, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Us(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ws.enqueueReplaceState(a, a.state, null), Ya(t, r, a, i), Ja(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = qs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = si, typeof u == "object" && u && (o = ta(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ks(t, a, r, o), Ba = !1;
			var f = t.memoizedState;
			a.state = f, Ya(t, r, a, i), Ja(), l = t.memoizedState, s || f !== l || Ba ? (typeof d == "function" && (Us(t, n, d, r), l = t.memoizedState), (c = Ba || Gs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ha(e, t), o = t.memoizedProps, u = qs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = si, typeof l == "object" && l && (c = ta(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ks(t, a, r, c), Ba = !1, f = t.memoizedState, a.state = f, Ya(t, r, a, i), Ja();
			var p = t.memoizedState;
			o !== d || f !== p || Ba || e !== null && e.dependencies !== null && $i(e.dependencies) ? (typeof s == "function" && (Us(t, n, s, r), p = t.memoizedState), (u = Ba || Gs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && $i(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, hc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ra(t, e.child, null, i), t.child = Ra(t, null, n, i)) : ac(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ac(e, t, i), e;
	}
	function yc(e, t, n, r) {
		return Hi(), t.flags |= 256, ac(e, t, n, r), t.child;
	}
	var bc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function xc(e) {
		return {
			baseLanes: e,
			cachePool: xa()
		};
	}
	function Sc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function Cc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(uo.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (z) {
				if (a ? ao(t) : co(t), (e = R) ? (e = rf(e, Ii), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ei === null ? null : {
						id: Di,
						overflow: Oi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = gi(e), n.return = t, t.child = n, Pi = t, R = null)) : e = null, e === null) throw Ri(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (co(t), a = t.mode, c = Tc({
				mode: "hidden",
				children: c
			}, a), r = mi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, s, n), t.memoizedState = bc, uc(null, r)) : (ao(t), wc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (ao(t), t.flags &= -257, t = Ec(e, t, n)) : t.memoizedState === null ? (co(t), c = r.fallback, a = t.mode, r = Tc({
				mode: "visible",
				children: r.children
			}, a), c = mi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ra(t, e.child, null, n), r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, s, n), t.memoizedState = bc, t = uc(null, r)) : (co(t), t.child = e.child, t.flags |= 128, t = null);
			else if (ao(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Wi({
					value: r,
					source: null,
					stack: null
				}), t = Ec(e, t, n);
			} else if (ic || Qi(e, t, n, !1), s = (n & e.childLanes) !== 0, ic || s) {
				if (s = K, s !== null && (r = nt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ii(e, r), hu(s, e, r), rc;
				af(c) || Du(), t = Ec(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, R = cf(c.nextSibling), Pi = t, z = !0, Fi = null, Ii = !1, e !== null && Ni(t, e), t = wc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (co(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = di(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = mi(c, a, n, null), c.flags |= 2) : c = di(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, uc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = xc(n) : (a = c.cachePool, a === null ? a = xa() : (l = sa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Sc(e, s, n), t.memoizedState = bc, uc(e.child, r)) : (ao(t), n = e.child, e = n.sibling, n = di(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function wc(e, t) {
		return t = Tc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Tc(e, t) {
		return e = li(22, e, null, t), e.lanes = 0, e;
	}
	function Ec(e, t, n) {
		return Ra(t, e.child, null, n), e = wc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Dc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Xi(e.return, t, n);
	}
	function Oc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function kc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = uo.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, M(uo, o), ac(e, t, r, n), r = z ? Ci : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Dc(e, n, t);
			else if (e.tag === 19) Dc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && fo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Oc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && fo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Oc(t, !0, n, null, a, r);
				break;
			case "together":
				Oc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ac(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Qi(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = di(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = di(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function jc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && $i(e)));
	}
	function Mc(e, t, n) {
		switch (t.tag) {
			case 3:
				N(t, t.stateNode.containerInfo), Ji(t, sa, e.memoizedState.cache), Hi();
				break;
			case 27:
			case 5:
				ge(t);
				break;
			case 4:
				N(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ji(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, oo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ao(t), e = Ac(e, t, n), e === null ? null : e.sibling) : Cc(e, t, n) : (ao(t), t.flags |= 128, null);
				ao(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (Qi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return kc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), M(uo, uo.current), r) break;
				return null;
			case 22: return t.lanes = 0, lc(e, t, n, t.pendingProps);
			case 24: Ji(t, sa, e.memoizedState.cache);
		}
		return Ac(e, t, n);
	}
	function Nc(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) ic = !0;
			else {
				if (!jc(e, n) && !(t.flags & 128)) return ic = !1, Mc(e, t, n);
				ic = !!(e.flags & 131072);
			}
		} else ic = !1, z && t.flags & 1048576 && Ai(t, Ci, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Oa(t.elementType), t.type = e, typeof e == "function") ui(e) ? (r = qs(e, r), t.tag = 1, t = vc(null, t, e, r, n)) : (t.tag = 0, t = gc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = oc(null, t, e, r, n);
								break a;
							}
							if (a === E) {
								t.tag = 14, t = sc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ae(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return gc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = qs(r, t.pendingProps), vc(e, t, r, a, n);
			case 3:
				a: {
					if (N(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ha(e, t), Ya(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ji(t, sa, r), r !== o.cache && Zi(t, [sa], n, !0), Ja(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = yc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = yi(Error(i(424)), t), Wi(a), t = yc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (R = cf(e.firstChild), Pi = t, z = !0, Fi = null, Ii = !0, n = za(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Hi(), r === a) {
							t = Ac(e, t, n);
							break a;
						}
						ac(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return hc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : z || (n = t.type, e = t.pendingProps, r = Bd(pe.current).createElement(n), r[L] = t, r[ct] = e, Pd(r, n, e), bt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ge(t), e === null && z && (r = t.stateNode = ff(t.type, t.pendingProps, pe.current), Pi = t, Ii = !0, a = R, Zd(t.type) ? (lf = a, R = cf(r.firstChild)) : R = a), ac(e, t, t.pendingProps.children, n), hc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && z && ((a = r = R) && (r = tf(r, t.type, t.pendingProps, Ii), r === null ? a = !1 : (t.stateNode = r, Pi = t, R = cf(r.firstChild), Ii = !1, a = !0)), a || Ri(t)), ge(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Co(e, t, Eo, null, null, n), Qf._currentValue = a), hc(e, t), ac(e, t, r, n), t.child;
			case 6: return e === null && z && ((e = n = R) && (n = nf(n, t.pendingProps, Ii), n === null ? e = !1 : (t.stateNode = n, Pi = t, R = null, e = !0)), e || Ri(t)), null;
			case 13: return Cc(e, t, n);
			case 4: return N(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ra(t, null, r, n) : ac(e, t, r, n), t.child;
			case 11: return oc(e, t, t.type, t.pendingProps, n);
			case 7: return ac(e, t, t.pendingProps, n), t.child;
			case 8: return ac(e, t, t.pendingProps.children, n), t.child;
			case 12: return ac(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ji(t, t.type, r.value), ac(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, ea(t), a = ta(a), r = r(a), t.flags |= 1, ac(e, t, r, n), t.child;
			case 14: return sc(e, t, t.type, t.pendingProps, n);
			case 15: return cc(e, t, t.type, t.pendingProps, n);
			case 19: return kc(e, t, n);
			case 31: return mc(e, t, n);
			case 22: return lc(e, t, n, t.pendingProps);
			case 24: return ea(t), r = ta(sa), e === null ? (a = ya(), a === null && (a = K, o = ca(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Va(t), Ji(t, sa, a)) : ((e.lanes & n) !== 0 && (Ha(e, t), Ya(t, null, null, n), Ja()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ji(t, sa, r), r !== a.cache && Zi(t, [sa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ji(t, sa, r))), ac(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Pc(e) {
		e.flags |= 4;
	}
	function Fc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (wu()) e.flags |= 8192;
				else throw ka = Ta, Ca;
			}
		} else e.flags &= -16777217;
	}
	function Ic(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) {
			if (wu()) e.flags |= 8192;
			else throw ka = Ta, Ca;
		}
	}
	function Lc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Xe(), e.lanes |= t, Yl |= t);
	}
	function Rc(e, t) {
		if (!z) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function U(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function zc(e, t, n) {
		var r = t.pendingProps;
		switch (Mi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return U(t), null;
			case 1: return U(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Yi(sa), he(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Vi(t) ? Pc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ui())), U(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Pc(t), o === null ? (U(t), Fc(t, a, null, r, n)) : (U(t), Ic(t, o))) : o ? o === e.memoizedState ? (U(t), t.flags &= -16777217) : (Pc(t), U(t), Ic(t, o)) : (e = e.memoizedProps, e !== r && Pc(t), U(t), Fc(t, a, e, r, n)), null;
			case 27:
				if (_e(t), n = pe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return U(t), null;
					}
					e = de.current, Vi(t) ? zi(t, e) : (e = ff(a, r, n), t.stateNode = e, Pc(t));
				}
				return U(t), null;
			case 5:
				if (_e(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return U(t), null;
					}
					if (o = de.current, Vi(t)) zi(t, o);
					else {
						var s = Bd(pe.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[L] = t, o[ct] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Pc(t);
					}
				}
				return U(t), Fc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = pe.current, Vi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Pi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[L] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ri(t, !0);
					} else e = Bd(e).createTextNode(r), e[L] = t, t.stateNode = e;
				}
				return U(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Vi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[L] = t;
						} else Hi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), e = !1;
					} else n = Ui(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (lo(t), t) : (lo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return U(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Vi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[L] = t;
						} else Hi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), a = !1;
					} else a = Ui(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (lo(t), t) : (lo(t), null);
				}
				return lo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Lc(t, t.updateQueue), U(t), null);
			case 4: return he(), e === null && Sd(t.stateNode.containerInfo), U(t), null;
			case 10: return Yi(t.type), U(t), null;
			case 19:
				if (j(uo), r = t.memoizedState, r === null) return U(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) Rc(r, !1);
					else {
						if (X !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = fo(e), o !== null) {
								for (t.flags |= 128, Rc(r, !1), e = o.updateQueue, t.updateQueue = e, Lc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) fi(n, e), n = n.sibling;
								return M(uo, uo.current & 1 | 2), z && ki(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && ke() > tu && (t.flags |= 128, a = !0, Rc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = fo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Lc(t, e), Rc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !z) return U(t), null;
						} else 2 * ke() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Rc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (U(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ke(), e.sibling = null, n = uo.current, M(uo, a ? n & 1 | 2 : n & 1), z && ki(t, r.treeForkCount), e);
			case 22:
			case 23: return lo(t), no(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (U(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : U(t), n = t.updateQueue, n !== null && Lc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && j(va), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Yi(sa), U(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Bc(e, t) {
		switch (Mi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Yi(sa), he(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return _e(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (lo(t), t.alternate === null) throw Error(i(340));
					Hi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (lo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Hi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return j(uo), null;
			case 4: return he(), null;
			case 10: return Yi(t.type), null;
			case 22:
			case 23: return lo(t), no(), e !== null && j(va), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Yi(sa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Vc(e, t) {
		switch (Mi(t), t.tag) {
			case 3:
				Yi(sa), he();
				break;
			case 26:
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				he();
				break;
			case 31:
				t.memoizedState !== null && lo(t);
				break;
			case 13:
				lo(t);
				break;
			case 19:
				j(uo);
				break;
			case 10:
				Yi(t.type);
				break;
			case 22:
			case 23:
				lo(t), no(), e !== null && j(va);
				break;
			case 24: Yi(sa);
		}
	}
	function Hc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Uc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Wc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Za(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Gc(e, t, n) {
		n.props = qs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Kc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function qc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Jc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[ct] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Xc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Zc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Xc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = en));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null;) $c(e, t, n), e = e.sibling;
	}
	function el(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[L] = e, t[ct] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var tl = !1, nl = !1, rl = !1, il = typeof WeakSet == "function" ? WeakSet : Set, al = null;
	function ol(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Or(e), kr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, al = t; al !== null;) if (t = al, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, al = e;
		else for (; al !== null;) {
			switch (t = al, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = qs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, al = e;
				break;
			}
			al = t.return;
		}
	}
	function sl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Hc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = qs(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Wc(n), r & 512 && Kc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Za(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && el(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && Jc(n), r & 512 && Kc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || tl, !r) {
					t = t !== null && t.memoizedState !== null || nl, i = tl;
					var a = nl;
					tl = r, (nl = t) && !a ? Cl(e, n, !!(n.subtreeFlags & 8772)) : xl(e, n), tl = i, nl = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function cl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, cl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ht(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var W = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (F && typeof F.onCommitFiberUnmount == "function") try {
			F.onCommitFiberUnmount(Re, n);
		} catch {}
		switch (n.tag) {
			case 26:
				nl || qc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				nl || qc(n, t);
				var r = W, i = ll;
				Zd(n.type) && (W = n.stateNode, ll = !1), ul(e, t, n), pf(n.stateNode), W = r, ll = i;
				break;
			case 5: nl || qc(n, t);
			case 6:
				if (r = W, i = ll, W = null, ul(e, t, n), W = r, ll = i, W !== null) {
					if (ll) try {
						(W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						W.removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				W !== null && (ll ? (e = W, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(W, n.stateNode));
				break;
			case 4:
				r = W, i = ll, W = n.stateNode.containerInfo, ll = !0, ul(e, t, n), W = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Uc(2, n, t), nl || Uc(4, n, t), ul(e, t, n);
				break;
			case 1:
				nl || (qc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Gc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				nl = (r = nl) || n.memoizedState !== null, ul(e, t, n), nl = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new il()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new il()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							W = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						W = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						W = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (W === null) throw Error(i(160));
			dl(o, s, a), W = null, ll = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Uc(3, e, e.return), Hc(3, e), Uc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 64 && tl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = _l;
				if (gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
									b: switch (r) {
										case "title":
											o = a.getElementsByTagName("title")[0], (!o || o[mt] || o[L] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[L] = e, bt(o), r = o;
											break a;
										case "link":
											var s = Vf("link", "href", a).get(r + (n.href || ""));
											if (s) {
												for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
											break;
										case "meta":
											if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
												for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
											break;
										default: throw Error(i(468, r));
									}
									o[L] = e, bt(o), r = o;
								}
								e.stateNode = r;
							} else Hf(a, e.type, e.stateNode);
						} else e.stateNode = If(a, r, e.memoizedProps);
					} else o === r ? r === null && e.stateNode !== null && Yc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), n !== null && r & 4 && Yc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Kt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Yc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (rl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = _l, _l = gf(t.containerInfo), gl(t, e), _l = a, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				rl && (rl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = gf(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = ke()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = tl, d = nl;
				if (tl = u || a, nl = d || l, gl(t, e), nl = d, tl = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || tl || nl || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Xc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						$c(e, Zc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Kt(o, ""), n.flags &= -33), $c(e, Zc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Qc(e, Zc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) sl(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Uc(4, t, t.return), Sl(t);
					break;
				case 1:
					qc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Gc(t, t.return, n), Sl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					qc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Hc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Xa(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Wc(a), Kc(a, a.return);
					break;
				case 27: el(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && Jc(a), Kc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), Kc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && la(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && la(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Hc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && la(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Hc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && Gf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = gf(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Uc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; al !== null;) {
			var n = al;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: la(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, al = r;
			else a: for (n = e; al !== null;) {
				r = al;
				var i = r.sibling, a = r.return;
				if (cl(r), r === n) {
					al = null;
					break a;
				}
				if (i !== null) {
					i.return = a, al = i;
					break a;
				}
				al = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = ta(sa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ta(sa).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, X = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return G & 2 && J !== 0 ? J & -J : k.T === null ? at() : dd();
	}
	function mu() {
		if (Jl === 0) {
			if (!(J & 536870912) || z) {
				var e = We;
				We <<= 1, !(We & 3932160) && (We = 262144), Jl = e;
			} else Jl = 536870912;
		}
		return e = ro.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === K && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, J, Jl, !1)), Qe(e, n), (!(G & 2) || e !== K) && (e === K && (!(G & 2) && (Kl |= n), X === 4 && yu(e, J, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (G & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Je(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !vu(n)) {
				a = Ou(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Xl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
							if (Ul && !l) {
								c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
								break a;
							}
							o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Su(e, 0), yu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						yu(r, t, Jl, !Vl);
						break a;
					case 2:
						Zl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = $l + 300 - ke(), 10 < a)) {
					if (yu(r, t, Jl, !Vl), qe(r, 0, !0) !== 0) break a;
					su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, o, "Throttled", -0, 0), a);
					break a;
				}
				_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, o, null, -0, 0);
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: en
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? $l - ke() : (a & 4194048) === a ? eu - ke() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Cr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Be(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && et(e, n, t);
	}
	function bu() {
		return G & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, qi = Ki = null, ko(e), Ma = null, Na = 0, e = q;
			for (; e !== null;) Vc(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), K = e, q = n = di(e.current, null), J = t, Y = 0, Bl = null, Vl = !1, Hl = Je(e, t), Ul = !1, Yl = Jl = ql = Kl = Gl = X = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Be(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, ti(), n;
	}
	function Cu(e, t) {
		B = null, k.H = zs, t === Sa || t === wa ? (t = Aa(), Y = 3) : t === Ca ? (t = Aa(), Y = 4) : Y = t === rc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, q === null && (X = 1, Zs(e, yi(t, e.current)));
	}
	function wu() {
		var e = ro.current;
		return e === null ? !0 : (J & 4194048) === J ? io === null : (J & 62914560) === J || J & 536870912 ? e === io : !1;
	}
	function Tu() {
		var e = k.H;
		return k.H = zs, e === null ? zs : e;
	}
	function Eu() {
		var e = k.A;
		return k.A = Rl, e;
	}
	function Du() {
		X = 4, Vl || (J & 4194048) !== J && ro.current !== null || (Hl = !0), !(Gl & 134217727) && !(Kl & 134217727) || K === null || yu(K, J, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = G;
		G |= 2;
		var i = Tu(), a = Eu();
		(K !== e || J !== t) && (nu = null, Su(e, t)), t = !1;
		var o = X;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = Bl;
					switch (Y) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							ro.current === null && (t = !0);
							var l = Y;
							if (Y = 0, Bl = null, Pu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, Bl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = X;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, qi = Ki = null, G = r, k.H = i, k.A = a, q === null && (K = null, J = 0, ti()), o;
	}
	function ku() {
		for (; q !== null;) Mu(q);
	}
	function Au(e, t) {
		var n = G;
		G |= 2;
		var r = Tu(), a = Eu();
		K !== e || J !== t ? (nu = null, tu = ke() + 500, Su(e, t)) : Hl = Je(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var o = Bl;
					b: switch (Y) {
						case 1:
							Y = 0, Bl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ea(o)) {
								Y = 0, Bl = null, Nu(t);
								break;
							}
							t = function() {
								Y !== 2 && Y !== 9 || K !== e || (Y = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							Ea(o) ? (Y = 0, Bl = null, Nu(t)) : (Y = 0, Bl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (q.tag) {
								case 26: s = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (s ? Wf(s) : c.stateNode.complete) {
										Y = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, Fu(u));
										}
										break b;
									}
							}
							Y = 0, Bl = null, Pu(e, t, o, 5);
							break;
						case 6:
							Y = 0, Bl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), X = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return qi = Ki = null, k.H = r, k.A = a, G = n, q === null ? (K = null, J = 0, ti(), X) : 0;
	}
	function ju() {
		for (; q !== null && !De();) Mu(q);
	}
	function Mu(e) {
		var t = Nc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = _c(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = _c(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5: ko(t);
			default: Vc(n, t), t = q = fi(t, Wl), t = Nc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Pu(e, t, n, r) {
		qi = Ki = null, ko(t), Ma = null, Na = 0;
		var i = t.return;
		try {
			if (nc(e, i, t, n, J)) {
				X = 1, Zs(e, yi(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			X = 1, Zs(e, yi(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (z || r === 1 ? e = !0 : Hl || J & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = ro.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Vl);
				return;
			}
			e = t.return;
			var n = zc(t.alternate, t, Wl);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		X === 0 && (X = 5);
	}
	function Iu(e, t) {
		do {
			var n = Bc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		X = 6, q = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (G & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ei, $e(e, n, o, s, c, l), e === K && (q = K = null, J = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Ne, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = k.T, k.T = null, a = A.p, A.p = 2, s = G, G |= 4;
				try {
					ol(e, t, n);
				} finally {
					G = s, A.p = a, k.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = k.T, k.T = null;
				var r = A.p;
				A.p = 2;
				var i = G;
				G |= 4;
				try {
					vl(t, e);
					var a = zd, o = Or(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Dr(s.ownerDocument.documentElement, s)) {
						if (c !== null && kr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Er(s, h), v = Er(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					G = i, A.p = r, k.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = k.T, k.T = null;
				var r = A.p;
				A.p = 2;
				var i = G;
				G |= 4;
				try {
					sl(e, t.alternate, t);
				} finally {
					G = i, A.p = r, k.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Oe();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), it(n), t = t.stateNode, F && typeof F.onCommitFiberRoot == "function") try {
				F.onCommitFiberRoot(Re, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = k.T, i = A.p, A.p = 2, k.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					k.T = t, A.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, la(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = it(su), r = k.T, a = A.p;
		try {
			A.p = 32 > n ? 32 : n, k.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, G & 6) throw Error(i(331));
			var c = G;
			if (G |= 4, Fl(o.current), Dl(o, o.current, s, n), G = c, id(0, !1), F && typeof F.onPostCommitFiberRoot == "function") try {
				F.onPostCommitFiberRoot(Re, o);
			} catch {}
			return !0;
		} finally {
			A.p = a, k.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = yi(n, t), t = $s(e.stateNode, t, 2), e = Wa(e, t, 2), e !== null && (Qe(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = yi(n, e), n = ec(2), r = Wa(t, n, 2), r !== null && (tc(n, r, t, e), Qe(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, K === e && (J & n) === n && (X === 4 || X === 3 && (J & 62914560) === J && 300 > ke() - $l ? !(G & 2) && Su(e, 0) : ql |= n, Yl === J && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Xe()), e = ii(e, t), e !== null && (Qe(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return Te(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Be(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, ld(r, a));
						} else a = J, a = qe(r, r === K ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Je(r, a) || (n = !0, ld(r, a));
					}
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = ke(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Be(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ye(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = K, n = J, n = qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ee(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Je(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ee(r), it(n)) {
				case 2:
				case 8:
					n = Me;
					break;
				case 32:
					n = Ne;
					break;
				case 268435456:
					n = Fe;
					break;
				default: n = Ne;
			}
			return r = cd.bind(null, e), n = Te(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ee(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = J;
		return r = qe(e, e === K ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, ke()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			G & 6 ? Te(je, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = fa;
			e === 0 && (e = Ue, Ue <<= 1, !(Ue & 261888) && (Ue = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : $t("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[ct] || null).action), o = r.submitter;
			o && (t = (t = o[ct] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Sn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Ts(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Ts(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < Yr.length; hd++) {
		var gd = Yr[hd];
		Xr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Xr(Vr, "onAnimationEnd"), Xr(Hr, "onAnimationIteration"), Xr(Ur, "onAnimationStart"), Xr("dblclick", "onDoubleClick"), Xr("focusin", "onFocus"), Xr("focusout", "onBlur"), Xr(Wr, "onTransitionRun"), Xr(Gr, "onTransitionStart"), Xr(Kr, "onTransitionCancel"), Xr(qr, "onTransitionEnd"), wt("onMouseEnter", ["mouseout", "mouseover"]), wt("onMouseLeave", ["mouseout", "mouseover"]), wt("onPointerEnter", ["pointerout", "pointerover"]), wt("onPointerLeave", ["pointerout", "pointerover"]), Ct("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ct("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ct("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ct("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ct("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ct("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Zr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Zr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[ut];
		n === void 0 && (n = t[ut] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, xt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !dn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = gt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		cn(function() {
			var r = a, i = nn(n), s = [];
			a: {
				var c = Jr.get(e);
				if (c !== void 0) {
					var l = Sn, u = e;
					switch (e) {
						case "keypress": if (_n(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Bn;
							break;
						case "focusin":
							u = "focus", l = jn;
							break;
						case "focusout":
							u = "blur", l = jn;
							break;
						case "beforeblur":
						case "afterblur":
							l = jn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = kn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = An;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Hn;
							break;
						case Vr:
						case Hr:
						case Ur:
							l = Mn;
							break;
						case qr:
							l = Un;
							break;
						case "scroll":
						case "scrollend":
							l = wn;
							break;
						case "wheel":
							l = Wn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Nn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Vn;
							break;
						case "toggle":
						case "beforetoggle": l = Gn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = ln(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== tn && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[lt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? gt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = kn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Vn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : vt(l), h = u == null ? c : vt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, gt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = dr;
					else if (ar(c)) {
						if (fr) v = xr;
						else {
							v = yr;
							var y = vr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Xt(r.elementType) && (v = dr) : v = br;
					if (v &&= v(e, r)) {
						or(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ht(c, "number", c.value);
				}
				switch (y = r ? vt(r) : window, e) {
					case "focusin":
						(ar(y) || y.contentEditable === "true") && (jr = y, Mr = r, Nr = null);
						break;
					case "focusout":
						Nr = Mr = jr = null;
						break;
					case "mousedown":
						Pr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Pr = !1, Fr(s, n, i);
						break;
					case "selectionchange": if (Ar) break;
					case "keydown":
					case "keyup": Fr(s, n, i);
				}
				var b;
				if (qn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else tr ? $n(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Xn && n.locale !== "ko" && (tr || x !== "onCompositionStart" ? x === "onCompositionEnd" && tr && (b = gn()) : (pn = i, mn = "value" in pn ? pn.value : pn.textContent, tr = !0)), y = Ed(r, x), 0 < y.length && (x = new Pn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = er(n), b !== null && (x.data = b)))), (b = Yn ? nr(e, n) : rr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Pn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = ln(e, n), i != null && r.unshift(Td(e, i, a)), i = ln(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = ln(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = ln(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Kt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Kt(e, "" + r);
				break;
			case "className":
				At(e, "class", r);
				break;
			case "tabIndex":
				At(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				At(e, n, r);
				break;
			case "style":
				Yt(e, r, o);
				break;
			case "data": if (t !== "object") {
				At(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = $t("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = $t("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = en);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = $t("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), kt(e, "popover", r);
				break;
			case "xlinkActuate":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				kt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Zt.get(n) || n, kt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Yt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Kt(e, r) : (typeof r == "number" || typeof r == "bigint") && Kt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = en);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!St.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[ct] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : kt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Vt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Ut(e, !!r, n, !0) : Ut(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				Gt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (Xt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Bt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Ut(e, !!n, n ? [] : "", !1) : Ut(e, !!n, t, !0)) : Ut(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				Wt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (Xt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Np(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") pf(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, pf(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[mt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && pf(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), ht(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[mt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		ht(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = A.d;
	A.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = _t(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ds(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = zt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + zt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + zt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + zt(n.imageSizes) + "\"]")) : i += "[href=\"" + zt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + zt(r) + "\"][href=\"" + zt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), bt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = yt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					bt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), bt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), bt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = pe.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = yt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = yt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = yt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + zt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), bt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + zt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + zt(n.href) + "\"]");
				if (r) return t.instance = r, bt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), bt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, bt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), bt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, bt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), bt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[mt] || a[L] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, bt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), bt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: se,
		_currentValue2: se,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = li(3, null, null, t), e.current = a, a.stateNode = e, t = ca(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Va(a), e;
	}
	function tp(e) {
		return e ? (e = si, e) : si;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ua(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Wa(e, r, t), n !== null && (hu(n, e, t), Ga(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ii(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = rt(t);
			var n = ii(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = A.p;
		try {
			A.p = 2, up(e, t, n, r);
		} finally {
			A.p = a, k.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = A.p;
		try {
			A.p = 8, up(e, t, n, r);
		} finally {
			A.p = a, k.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = _t(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ke(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Be(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(G & 6) && (tu = ke() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ii(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = nn(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = gt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ae()) {
				case je: return 2;
				case Me: return 8;
				case Ne:
				case Pe: return 32;
				case Fe: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = _t(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = gt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ot(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ot(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				tn = r, n.target.dispatchEvent(r), tn = null;
			} else return t = _t(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = _t(n);
				a !== null && (e.splice(t, 3), t -= 3, Ts(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ct] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ct] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[lt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = at();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.8") throw Error(i(527, Lp, "19.2.8"));
	A.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: k,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Re = zp.inject(Rp), F = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Js, s = Ys, c = Xs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[lt] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ c(u(), 1), v = g(), y = {
	homeTitle: "הבית שלנו",
	dashboardPath: "/homeiios",
	legacyDashboardPath: "/dashboard-clean",
	branding: {
		logo: "/local/homeiios/homeiios-logo-v2.png",
		animation: "spin",
		action: {
			type: "view",
			target: "home"
		}
	},
	backgrounds: { home: "/local/homeiios/homeiios-livingroom-warm.png" },
	timeBackgrounds: {
		morning: "/local/homeiios/homeiios-livingroom-morning.png",
		day: "/local/homeiios/homeiios-livingroom-day.png",
		evening: "/local/homeiios/homeiios-livingroom-evening.png",
		night: "/local/homeiios/homeiios-livingroom-night.png"
	},
	backgroundPresets: [
		{
			id: "automatic",
			name: "אוטומטי",
			image: ""
		},
		{
			id: "mineral",
			name: "זכוכית מינרלית",
			image: "/local/homeiios/background-mineral-glass.png"
		},
		{
			id: "smoke",
			name: "כחול עשן",
			image: "/local/homeiios/background-smoke-blue.png"
		},
		{
			id: "silk",
			name: "משי כהה",
			image: "/local/homeiios/background-dark-silk.png"
		},
		{
			id: "sage",
			name: "מרווה וברונזה",
			image: "/local/homeiios/background-sage-bronze.png"
		},
		{
			id: "vivid-cobalt",
			name: "קובלט וקורל",
			image: "/local/homeiios/background-vivid-cobalt-coral.png"
		},
		{
			id: "vivid-emerald",
			name: "אמרלד וענבר",
			image: "/local/homeiios/background-vivid-emerald-amber.png"
		},
		{
			id: "calm-stone",
			name: "אבן רגועה",
			image: "/local/homeiios/background-calm-stone.png"
		}
	],
	entities: {
		temperature: "sensor.ims_temperature",
		weather: "weather.ims_weather",
		power: "sensor.shelly_power_1",
		intercomCount: "sensor.intercom_person_count",
		nightMode: "input_boolean.night_mode",
		kiosk: "input_boolean.kiosk_full",
		allLights: "group.all_lights",
		restoreScene: "scene.restor"
	},
	rooms: [],
	roomDefinitions: {},
	secondary: [],
	appearance: {
		themeMode: "system",
		densityMode: "comfort",
		highContrast: !1,
		accent: "#f6bd72",
		coolAccent: "#a8ceff",
		sectionColor: "#111825",
		tileColor: "#202a3a",
		background: "",
		backgroundDim: 22,
		surfaceOpacity: 64,
		tileOpacity: 58,
		darkPalette: "granite",
		lightPalette: "ivory",
		textColor: "#f5f5f4",
		sidebarAccent: "#7fb6ff",
		sidebarIconColor: "#cfe6ff",
		blur: 24,
		radius: 26
	}
}, b = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), x = (/* @__PURE__ */ o(((e, t) => {
	t.exports = b();
})))();
function S({ name: e, className: t = "" }) {
	let n = {
		home: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "m4 11 8-6.5 8 6.5" }), /* @__PURE__ */ (0, x.jsx)("path", { d: "M6.5 10v9h11v-9M10 19v-5h4v5" })] }),
		living: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M5 12V9.5a2.5 2.5 0 0 1 5 0V12h4V9.5a2.5 2.5 0 0 1 5 0V12" }), /* @__PURE__ */ (0, x.jsx)("path", { d: "M4 12h16v6H4zM6 18v2M18 18v2" })] }),
		dining: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M7 4v7M4.5 4v4.5A2.5 2.5 0 0 0 7 11v9M9.5 4v4.5A2.5 2.5 0 0 1 7 11" }), /* @__PURE__ */ (0, x.jsx)("path", { d: "M16 4v16M16 4c3 1.5 4 5 0 8" })] }),
		bedroom: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M4 12h16v6H4zM5 12V7h6a3 3 0 0 1 3 3v2M4 18v2M20 18v2" }), /* @__PURE__ */ (0, x.jsx)("path", { d: "M7 9h3" })] }),
		office: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("rect", {
			x: "5",
			y: "5",
			width: "14",
			height: "9",
			rx: "2"
		}), /* @__PURE__ */ (0, x.jsx)("path", { d: "M12 14v3M8 19h8M8 17h8" })] }),
		bath: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM7 19v1M17 19v1" }), /* @__PURE__ */ (0, x.jsx)("path", { d: "M7 11V6a2 2 0 0 1 4 0" })] }),
		outdoor: /* @__PURE__ */ (0, x.jsx)(x.Fragment, { children: /* @__PURE__ */ (0, x.jsx)("path", { d: "M12 4v16M5 9c2-4 5-4 7 0M19 9c-2-4-5-4-7 0M6 14c2-3 4-3 6 0M18 14c-2-3-4-3-6 0" }) }),
		light: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M8 14a6 6 0 1 1 8 0c-1.2.9-1.5 1.7-1.5 2.5h-5C9.5 15.7 9.2 15 8 14Z" }), /* @__PURE__ */ (0, x.jsx)("path", { d: "M9.5 19h5M10.5 21h3" })] }),
		climate: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M7 9h10M9 6h6" }), /* @__PURE__ */ (0, x.jsx)("path", {
			className: "hi-motion",
			d: "M6 14c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2"
		})] }),
		media: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("rect", {
			x: "4",
			y: "6",
			width: "16",
			height: "12",
			rx: "3"
		}), /* @__PURE__ */ (0, x.jsx)("path", { d: "m10 10 5 2-5 2v-4Z" })] }),
		people: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "9",
				cy: "9",
				r: "3"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "17",
				cy: "10",
				r: "2"
			}),
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M3.5 19c.5-4 10.5-4 11 0M14 16c3-1 6 .5 6.5 3" })
		] }),
		settings: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M5 7h14M5 17h14M5 12h14" }),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "9",
				cy: "7",
				r: "2"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "15",
				cy: "12",
				r: "2"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "11",
				cy: "17",
				r: "2"
			})
		] }),
		more: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "6",
				cy: "6",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "12",
				cy: "6",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "18",
				cy: "6",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "6",
				cy: "12",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "18",
				cy: "12",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "6",
				cy: "18",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "12",
				cy: "18",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, x.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "1.5"
			})
		] }),
		cinema: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("rect", {
			x: "4",
			y: "7",
			width: "16",
			height: "12",
			rx: "3"
		}), /* @__PURE__ */ (0, x.jsx)("path", { d: "m10 11 5 2-5 2v-4ZM6 4l2 3M12 4l2 3M18 4l2 3" })] }),
		away: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "m3.5 11 8-6.5 8 6.5M6 10v9h7" }), /* @__PURE__ */ (0, x.jsx)("path", {
			className: "hi-motion",
			d: "M12 15h8m-3-3 3 3-3 3"
		})] })
	};
	return /* @__PURE__ */ (0, x.jsx)("svg", {
		className: `homeii-icon ${t}`,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.65",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: n[e]
	});
}
function C(e, t) {
	let n = `${e} ${t}`.toLowerCase();
	return /living|סלון/.test(n) ? "living" : /dining|kitchen|מטבח|אוכל/.test(n) ? "dining" : /bed|שינה|אגם|ליעד/.test(n) ? "bedroom" : /office|משרד/.test(n) ? "office" : /bath|מקלחת|אמבט/.test(n) ? "bath" : /out|חוץ|מרפסת|גג/.test(n) ? "outdoor" : "home";
}
//#endregion
//#region src/ui/RoomView.tsx
var w = ({ icon: e }) => _.createElement("ha-icon", { icon: e });
function ee({ name: e }) {
	let t = {
		climate: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("path", { d: "M7 10.5h10M9 7.5h6M10.5 4.5h3" }), /* @__PURE__ */ (0, x.jsx)("path", {
			className: "glyph-motion",
			d: "M8 14c1.4 0 1.4 2 2.8 2s1.4-2 2.8-2 1.4 2 2.8 2"
		})] }),
		ceiling: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M5 11h14L16 6H8l-3 5Z" }),
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M8 14c1.5 1.4 2.8 2 4 2s2.5-.6 4-2" }),
			/* @__PURE__ */ (0, x.jsx)("path", {
				className: "glyph-glow",
				d: "M7 19h10"
			})
		] }),
		floor: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M12 4v15M8 20h8" }),
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M8 5h8l-2 6h-4L8 5Z" }),
			/* @__PURE__ */ (0, x.jsx)("path", {
				className: "glyph-glow",
				d: "M9.5 13.5h5"
			})
		] }),
		lamp: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M7 12h10l-2-7H9l-2 7Z" }),
			/* @__PURE__ */ (0, x.jsx)("path", { d: "M12 12v7M8.5 20h7" }),
			/* @__PURE__ */ (0, x.jsx)("path", {
				className: "glyph-glow",
				d: "M9 14.5h6"
			})
		] }),
		ambient: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("rect", {
			x: "4",
			y: "5",
			width: "16",
			height: "12",
			rx: "3"
		}), /* @__PURE__ */ (0, x.jsx)("path", {
			className: "glyph-glow",
			d: "M8 20h8M8 10h8"
		})] }),
		media: /* @__PURE__ */ (0, x.jsx)(x.Fragment, { children: /* @__PURE__ */ (0, x.jsx)("path", { d: "M5 9v6M9 6v12M13 4v16M17 7v10M21 10v4" }) })
	};
	return /* @__PURE__ */ (0, x.jsx)("svg", {
		className: `homeii-glyph glyph-${e}`,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: t[e]
	});
}
var T = (e, t) => t ? e?.states[t] : void 0, E = (e, t = 0) => typeof e == "number" ? e : Number(e) || t, D = (e) => !!(e && !["unknown", "unavailable"].includes(e.state));
function te({ room: e, definition: t, areaEntities: n, hass: r, isAdmin: i, intent: a, onHome: o }) {
	let [s, c] = (0, _.useState)(a === "cinema" && t.media ? "media" : t.climate ? "climate" : "lights"), [l, u] = (0, _.useState)(null), [d, f] = (0, _.useState)(!1), [p, m] = (0, _.useState)(0), [h, g] = (0, _.useState)(!1), [v, y] = (0, _.useState)(null), [b, C] = (0, _.useState)([]), [E, te] = (0, _.useState)(() => {
		try {
			let n = localStorage.getItem(`homeii-status-${e.id}`);
			return n ? JSON.parse(n) : t.statusDomains || [
				"light",
				"climate",
				"media_player",
				"security"
			];
		} catch {
			return t.statusDomains || [
				"light",
				"climate",
				"media_player",
				"security"
			];
		}
	}), [O, re] = (0, _.useState)(() => {
		try {
			let t = localStorage.getItem(`homeii-zones-${e.id}`);
			return t ? JSON.parse(t) : [
				"lights",
				"climate",
				"media",
				"security",
				"scenes"
			];
		} catch {
			return [
				"lights",
				"climate",
				"media",
				"security",
				"scenes"
			];
		}
	}), le = (0, _.useRef)(void 0), ue = (e, t = "working") => {
		window.clearTimeout(le.current), u({
			message: e,
			tone: t
		}), le.current = window.setTimeout(() => u(null), t === "error" ? 3600 : 1900);
	};
	(0, _.useEffect)(() => () => window.clearTimeout(le.current), []), (0, _.useEffect)(() => {
		a === "cinema" && t.media && c("media"), a === "climate" && t.climate && c("climate");
	}, [
		a,
		t.climate,
		t.media
	]);
	let j = T(r, t.temperature), M = T(r, t.humidity), de = T(r, t.climate), fe = n || {
		light: t.lights.map((e) => e.entity),
		climate: t.climate ? [t.climate] : [],
		media_player: t.media ? [t.media] : [],
		security: [],
		person: []
	}, pe = fe.light.filter((e) => T(r, e)?.state === "on").length;
	fe.climate.filter((e) => {
		let t = T(r, e);
		return D(t) && t?.state !== "off";
	}).length, fe.media_player.filter((e) => [
		"playing",
		"paused",
		"buffering"
	].includes(T(r, e)?.state || "")).length;
	let me = fe.security.filter((e) => {
		let t = T(r, e), n = e.split(".", 1)[0], i = String(t?.attributes.device_class || "");
		return [
			"camera",
			"lock",
			"alarm_control_panel"
		].includes(n) || [
			"door",
			"window",
			"opening",
			"motion",
			"occupancy",
			"smoke",
			"gas",
			"moisture",
			"tamper",
			"problem",
			"safety"
		].includes(i);
	}), N = Math.max(1, Math.ceil(t.lights.length / 9)), he = t.lights.slice(p * 9, (p + 1) * 9), ge = new Set(E), _e = (t) => {
		let n = E.includes(t) ? E.filter((e) => e !== t) : [...E, t];
		te(n), localStorage.setItem(`homeii-status-${e.id}`, JSON.stringify(n));
	}, ve = (t) => {
		let n = O.includes(t) ? O.filter((e) => e !== t) : [...O, t];
		re(n), localStorage.setItem(`homeii-zones-${e.id}`, JSON.stringify(n));
	}, ye = async (e) => {
		ue(`מפעיל אווירת ${e.name}`);
		try {
			await r?.callService("scene", "turn_on", {}, { entity_id: e.entity }), ue(`אווירת ${e.name} הופעלה`, "success");
		} catch {
			ue(`הפעלת ${e.name} נכשלה`, "error");
		}
	};
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: `room-view ${a ? `intent-${a}` : ""}`,
		children: [
			/* @__PURE__ */ (0, x.jsxs)("header", {
				className: "room-hero",
				children: [
					/* @__PURE__ */ (0, x.jsx)("div", { className: "room-hero-shade" }),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "room-hero-actions",
						children: [/* @__PURE__ */ (0, x.jsxs)("button", {
							className: "room-back glass-soft",
							onClick: o,
							children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:arrow-right" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "מסך הבית" })]
						}), i && /* @__PURE__ */ (0, x.jsx)("button", {
							className: "room-status-settings glass-soft",
							onClick: () => g((e) => !e),
							"aria-label": "הגדרת החדר",
							children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:tune-variant" })
						})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "room-identity",
						children: [/* @__PURE__ */ (0, x.jsx)("h1", { children: e.name }), /* @__PURE__ */ (0, x.jsx)("p", { children: e.subtitle })]
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "room-metrics glass-soft",
						children: [/* @__PURE__ */ (0, x.jsx)(ne, {
							icon: "mdi:thermometer",
							value: j?.state || String(de?.attributes.current_temperature ?? "—"),
							suffix: "°"
						}), /* @__PURE__ */ (0, x.jsx)(ne, {
							icon: "mdi:water-percent",
							value: M?.state || "—",
							suffix: "%"
						})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: `room-flow-launcher ${d ? "open" : ""}`,
						children: [/* @__PURE__ */ (0, x.jsxs)("button", {
							className: "room-flow-trigger glass-soft",
							onClick: () => f((e) => !e),
							children: [
								/* @__PURE__ */ (0, x.jsx)(S, { name: "cinema" }),
								/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEii Flow" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: "מה עושים בחדר?" })] }),
								/* @__PURE__ */ (0, x.jsx)(w, { icon: d ? "mdi:chevron-up" : "mdi:chevron-down" })
							]
						}), d && /* @__PURE__ */ (0, x.jsxs)("nav", {
							className: "room-flow glass-soft",
							"aria-label": "פעולות בחדר",
							children: [
								t.media && /* @__PURE__ */ (0, x.jsxs)("button", {
									onClick: () => {
										c("media"), f(!1);
									},
									children: [/* @__PURE__ */ (0, x.jsx)(S, { name: "cinema" }), /* @__PURE__ */ (0, x.jsx)("b", { children: "צפייה" })]
								}),
								t.climate && /* @__PURE__ */ (0, x.jsxs)("button", {
									onClick: () => {
										c("climate"), f(!1);
									},
									children: [/* @__PURE__ */ (0, x.jsx)(S, { name: "climate" }), /* @__PURE__ */ (0, x.jsx)("b", { children: "נוחות" })]
								}),
								/* @__PURE__ */ (0, x.jsxs)("button", {
									onClick: () => {
										c("lights"), f(!1);
									},
									children: [/* @__PURE__ */ (0, x.jsx)(S, { name: "light" }), /* @__PURE__ */ (0, x.jsx)("b", { children: "תאורה" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, x.jsx)(ie, {
						domains: ge,
						entities: fe,
						securityEntities: me,
						hass: r,
						onOpen: (e, t) => {
							y(e), C(t);
						}
					}),
					h && /* @__PURE__ */ (0, x.jsxs)("div", {
						className: "room-status-config glass",
						children: [/* @__PURE__ */ (0, x.jsxs)("section", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: "מה יוצג ב־Status?" }), [
							["light", "תאורה"],
							["climate", "אקלים"],
							["media_player", "מדיה"],
							["security", "ביטחון"]
						].map(([e, t]) => /* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: t }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "checkbox",
							checked: E.includes(e),
							onChange: () => _e(e)
						})] }, e))] }), /* @__PURE__ */ (0, x.jsxs)("section", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: "דומיינים בבורר החדר" }), [
							["lights", "תאורה"],
							["climate", "אקלים"],
							["media", "מדיה"],
							["security", "ביטחון"],
							["scenes", "אווירה"]
						].map(([e, t]) => /* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: t }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "checkbox",
							checked: O.includes(e),
							onChange: () => ve(e)
						})] }, e))] })]
					})
				]
			}),
			l && /* @__PURE__ */ (0, x.jsxs)("div", {
				className: `feedback-island ${l.tone}`,
				role: "status",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, x.jsx)("span", {
					className: "feedback-symbol",
					children: l.tone === "working" ? /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
						/* @__PURE__ */ (0, x.jsx)("i", {}),
						/* @__PURE__ */ (0, x.jsx)("i", {}),
						/* @__PURE__ */ (0, x.jsx)("i", {})
					] }) : /* @__PURE__ */ (0, x.jsx)(w, { icon: l.tone === "success" ? "mdi:check" : "mdi:alert-circle-outline" })
				}), /* @__PURE__ */ (0, x.jsx)("strong", { children: l.message })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("nav", {
				className: "room-zones glass-soft",
				"aria-label": "אזורי שליטה בחדר",
				children: [
					O.includes("lights") && /* @__PURE__ */ (0, x.jsxs)("button", {
						className: s === "lights" ? "active" : "",
						onClick: () => c("lights"),
						children: [/* @__PURE__ */ (0, x.jsx)(ee, { name: "ceiling" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "תאורה" })]
					}),
					O.includes("climate") && t.climate && /* @__PURE__ */ (0, x.jsxs)("button", {
						className: s === "climate" ? "active" : "",
						onClick: () => c("climate"),
						children: [/* @__PURE__ */ (0, x.jsx)(ee, { name: "climate" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "אקלים" })]
					}),
					O.includes("media") && t.media && /* @__PURE__ */ (0, x.jsxs)("button", {
						className: s === "media" ? "active" : "",
						onClick: () => c("media"),
						children: [/* @__PURE__ */ (0, x.jsx)(ee, { name: "media" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "מדיה" })]
					}),
					O.includes("security") && !!me.length && /* @__PURE__ */ (0, x.jsxs)("button", {
						className: s === "security" ? "active" : "",
						onClick: () => c("security"),
						children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:shield-home-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "ביטחון" })]
					}),
					O.includes("scenes") && !!t.scenes?.length && /* @__PURE__ */ (0, x.jsxs)("button", {
						className: s === "scenes" ? "active" : "",
						onClick: () => c("scenes"),
						children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:creation-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "אווירה" })]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: `room-layout zone-${s}`,
				children: [
					t.climate && /* @__PURE__ */ (0, x.jsx)("div", {
						className: `room-zone room-zone-climate ${s === "climate" ? "selected" : ""}`,
						children: /* @__PURE__ */ (0, x.jsx)(k, {
							entityId: t.climate,
							temperatureEntity: t.temperature,
							hass: r,
							onFeedback: ue
						})
					}),
					/* @__PURE__ */ (0, x.jsxs)("section", {
						className: `room-zone room-zone-lights device-panel glass ${s === "lights" ? "selected" : ""}`,
						children: [
							/* @__PURE__ */ (0, x.jsxs)("header", {
								className: "widget-heading",
								children: [
									/* @__PURE__ */ (0, x.jsx)("span", {
										className: "widget-glyph light-widget-glyph",
										children: /* @__PURE__ */ (0, x.jsx)(ee, { name: "ceiling" })
									}),
									/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "תאורה בחדר" }), /* @__PURE__ */ (0, x.jsx)("h2", { children: pe ? `${pe} מוקדים פעילים` : "כל התאורה כבויה" })] }),
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: `state-pill ${pe ? "active" : "off"}`,
										children: [/* @__PURE__ */ (0, x.jsx)("i", {}), pe ? "פעילה" : "כבויה"]
									})
								]
							}),
							/* @__PURE__ */ (0, x.jsx)("div", {
								className: "light-grid",
								children: he.map((e) => /* @__PURE__ */ (0, x.jsx)(A, {
									device: e,
									hass: r,
									onFeedback: ue
								}, e.entity))
							}),
							N > 1 && /* @__PURE__ */ (0, x.jsxs)("nav", {
								className: "widget-pagination",
								"aria-label": "עמודי תאורה",
								children: [
									/* @__PURE__ */ (0, x.jsx)("button", {
										disabled: p === 0,
										onClick: () => m((e) => e - 1),
										children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:chevron-right" })
									}),
									/* @__PURE__ */ (0, x.jsxs)("span", { children: [
										p + 1,
										" / ",
										N
									] }),
									/* @__PURE__ */ (0, x.jsx)("button", {
										disabled: p >= N - 1,
										onClick: () => m((e) => e + 1),
										children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:chevron-left" })
									})
								]
							})
						]
					}),
					!!t.curtains?.length && /* @__PURE__ */ (0, x.jsxs)("section", {
						className: "curtain-panel glass",
						children: [/* @__PURE__ */ (0, x.jsx)(oe, {
							title: "וילונות",
							subtitle: "שליטה חזותית במצב הפתיחה",
							icon: "mdi:curtains"
						}), t.curtains.map((e) => /* @__PURE__ */ (0, x.jsx)(se, {
							device: e,
							hass: r
						}, e.entity))]
					}),
					t.media && /* @__PURE__ */ (0, x.jsx)("div", {
						className: `room-zone room-zone-media ${s === "media" ? "selected" : ""}`,
						children: /* @__PURE__ */ (0, x.jsx)(ce, {
							entityId: t.media,
							hass: r,
							onFeedback: ue
						})
					}),
					!!me.length && /* @__PURE__ */ (0, x.jsxs)("section", {
						className: `room-zone room-zone-security security-panel glass ${s === "security" ? "selected" : ""}`,
						children: [/* @__PURE__ */ (0, x.jsx)(oe, {
							title: "ביטחון",
							subtitle: "חיישנים ומצב האזור",
							icon: "mdi:shield-home-outline"
						}), /* @__PURE__ */ (0, x.jsx)("div", {
							className: "security-grid",
							children: me.slice(0, 9).map((e) => {
								let t = T(r, e), n = D(t) && ![
									"off",
									"closed",
									"locked",
									"idle",
									"standby"
								].includes(t?.state || "");
								return /* @__PURE__ */ (0, x.jsxs)("article", {
									className: n ? "alert" : "safe",
									children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: n ? "mdi:alert-circle-outline" : "mdi:check-circle-outline" }), /* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: String(t?.attributes.friendly_name || e) }), /* @__PURE__ */ (0, x.jsx)("small", { children: D(t) ? n ? "דורש בדיקה" : "תקין" : "לא זמין" })] })]
								}, e);
							})
						})]
					}),
					!!t.scenes?.length && /* @__PURE__ */ (0, x.jsxs)("section", {
						className: `room-zone room-zone-scenes scene-panel glass ${s === "scenes" ? "selected" : ""}`,
						children: [/* @__PURE__ */ (0, x.jsx)(oe, {
							title: "אווירה",
							subtitle: "סצנות מוכנות בלחיצה אחת",
							icon: "mdi:creation-outline"
						}), /* @__PURE__ */ (0, x.jsx)("div", {
							className: "scene-row",
							children: t.scenes.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
								onClick: () => ye(e),
								children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: e.icon }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.name })]
							}, e.entity))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsx)(ae, {
				domain: v,
				ids: b,
				hass: r,
				onClose: () => y(null)
			})
		]
	});
}
function ne({ icon: e, value: t, suffix: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: e }), /* @__PURE__ */ (0, x.jsxs)("strong", { children: [t, t === "—" ? "" : n] })] });
}
var O = {
	light: {
		label: "תאורה",
		icon: "mdi:lightbulb-group",
		active: "מוקדים פעילים",
		empty: "הכול כבוי"
	},
	climate: {
		label: "אקלים",
		icon: "mdi:snowflake-thermometer",
		active: "מזגנים פעילים",
		empty: "הכול כבוי"
	},
	media_player: {
		label: "מדיה",
		icon: "mdi:play-circle",
		active: "נגנים פעילים",
		empty: "אין נגינה"
	},
	security: {
		label: "ביטחון",
		icon: "mdi:shield-home",
		active: "דורשים בדיקה",
		empty: "הכול תקין"
	}
};
function re(e, t) {
	return D(t) ? e === "light" ? t?.state === "on" : e === "climate" ? t?.state !== "off" : e === "media_player" ? [
		"playing",
		"paused",
		"buffering"
	].includes(t?.state || "") : ![
		"off",
		"closed",
		"locked",
		"idle",
		"standby"
	].includes(t?.state || "") : !1;
}
function ie({ domains: e, entities: t, securityEntities: n, hass: r, onOpen: i }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "room-status-cards status-carousel",
		"aria-label": "מצב החדר",
		children: [
			"light",
			"climate",
			"media_player",
			"security"
		].filter((t) => e.has(t)).map((e) => {
			let a = e === "security" ? n : t[e];
			if (!a.length) return null;
			let o = a.filter((t) => re(e, T(r, t))), s = O[e];
			return /* @__PURE__ */ (0, x.jsxs)("button", {
				className: `status-card status-${e} ${o.length ? "active" : "idle"}`,
				onClick: () => i(e, o),
				children: [
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: "status-card-icon",
						children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: s.icon }), /* @__PURE__ */ (0, x.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: s.label }), /* @__PURE__ */ (0, x.jsx)("strong", { children: o.length ? `${o.length} ${s.active}` : s.empty })] }),
					/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:chevron-left" })
				]
			}, e);
		})
	});
}
function ae({ domain: e, ids: t, hass: n, onClose: r }) {
	if (!e) return null;
	let i = O[e];
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "status-dialog-layer",
		onMouseDown: (e) => e.target === e.currentTarget && r(),
		children: /* @__PURE__ */ (0, x.jsxs)("section", {
			className: `status-dialog status-${e}`,
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ (0, x.jsxs)("header", { children: [
				/* @__PURE__ */ (0, x.jsx)("span", {
					className: "status-dialog-icon",
					children: /* @__PURE__ */ (0, x.jsx)(w, { icon: i.icon })
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "פעיל כעת בחדר" }), /* @__PURE__ */ (0, x.jsx)("h2", { children: i.label })] }),
				/* @__PURE__ */ (0, x.jsx)("button", {
					onClick: r,
					"aria-label": "סגירה",
					children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:close" })
				})
			] }), /* @__PURE__ */ (0, x.jsx)("div", {
				className: "status-entity-list",
				children: t.length ? t.map((e) => {
					let t = T(n, e);
					return /* @__PURE__ */ (0, x.jsxs)("article", {
						className: "active",
						children: [
							/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(w, { icon: i.icon }) }),
							/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: String(t?.attributes.friendly_name || e) }), /* @__PURE__ */ (0, x.jsx)("small", { children: "פעיל עכשיו" })] }),
							/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => n?.callService("homeassistant", "toggle", {}, { entity_id: e }),
								"aria-label": "שינוי מצב",
								children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:power" })
							})
						]
					}, e);
				}) : /* @__PURE__ */ (0, x.jsxs)("div", {
					className: "status-empty",
					children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:check-circle-outline" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: i.empty })]
				})
			})]
		})
	});
}
function oe({ title: e, subtitle: t, icon: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("header", {
		className: "panel-title",
		children: [/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(w, { icon: n }) }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: e }), /* @__PURE__ */ (0, x.jsx)("p", { children: t })] })]
	});
}
function k({ entityId: e, temperatureEntity: t, hass: n, onFeedback: r }) {
	let i = T(n, e), a = E(i?.attributes.temperature, 24), o = E(i?.attributes.current_temperature, a), s = E(i?.attributes.min_temp, 16), c = E(i?.attributes.max_temp, 30), l = D(i) && i?.state !== "off", u = String(i?.attributes.hvac_action || (l ? "idle" : "off")), d = u === "cooling" ? "cool" : u === "heating" ? "heat" : u === "drying" ? "dry" : u === "fan" ? "fan_only" : i?.state || "off", f = M(u, i?.state || "off"), p = pe(n, t || e, !!t), m = Array.isArray(i?.attributes.hvac_modes) ? i.attributes.hvac_modes : [
		"off",
		"cool",
		"heat",
		"fan_only"
	], h = async (t) => {
		r(`מעדכן יעד ל־${t}°`);
		try {
			await n?.callService("climate", "set_temperature", { temperature: t }, { entity_id: e }), r("טמפרטורת היעד עודכנה", "success");
		} catch {
			r("עדכון הטמפרטורה נכשל", "error");
		}
	}, g = async (t) => {
		r(`מעביר למצב ${le(t)}`);
		try {
			await n?.callService("climate", "set_hvac_mode", { hvac_mode: t }, { entity_id: e }), r(`מצב ${le(t)} הופעל`, "success");
		} catch {
			r("שינוי מצב המזגן נכשל", "error");
		}
	}, _ = Math.max(0, Math.min(1, (a - s) / (c - s))), v = Math.max(0, Math.min(1, (o - s) / (c - s)));
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: `thermostat widget-shell glass mode-${d} action-${u} ${l ? "active" : ""}`,
		children: [
			/* @__PURE__ */ (0, x.jsxs)("header", {
				className: "widget-heading",
				children: [
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: "widget-glyph",
						children: /* @__PURE__ */ (0, x.jsx)(w, { icon: ue(d) })
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "אקלים בחדר" }), /* @__PURE__ */ (0, x.jsx)("h2", { children: f })] }),
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: `state-pill ${l ? "active" : "off"}`,
						children: [/* @__PURE__ */ (0, x.jsx)("i", {}), l ? le(i?.state || "") : "כבוי"]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "thermostat-stage",
				style: {
					"--thermo-progress": `${_ * 360}deg`,
					"--current-progress": `${v * 360}deg`
				},
				children: [
					/* @__PURE__ */ (0, x.jsx)("i", { className: "temperature-ring target-ring" }),
					/* @__PURE__ */ (0, x.jsx)("i", { className: "temperature-ring current-ring" }),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "airflow",
						children: [
							/* @__PURE__ */ (0, x.jsx)("i", {}),
							/* @__PURE__ */ (0, x.jsx)("i", {}),
							/* @__PURE__ */ (0, x.jsx)("i", {})
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "thermostat-dial",
						children: [
							/* @__PURE__ */ (0, x.jsx)("small", { children: "בחדר" }),
							/* @__PURE__ */ (0, x.jsxs)("strong", { children: [o.toFixed(1), "°"] }),
							/* @__PURE__ */ (0, x.jsxs)("span", {
								className: "target-label",
								children: ["יעד ", /* @__PURE__ */ (0, x.jsxs)("b", { children: [a.toFixed(1), "°"] })]
							}),
							/* @__PURE__ */ (0, x.jsx)("span", { children: de(o, a) })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsx)(me, { values: p }),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "temperature-stepper",
				children: [
					/* @__PURE__ */ (0, x.jsx)("button", {
						"aria-label": "הורדת טמפרטורה",
						disabled: !D(i) || a <= s,
						onClick: () => h(a - .5),
						children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:minus" })
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", { children: [
						s,
						"°—",
						c,
						"°"
					] }),
					/* @__PURE__ */ (0, x.jsx)("button", {
						"aria-label": "העלאת טמפרטורה",
						disabled: !D(i) || a >= c,
						onClick: () => h(a + .5),
						children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:plus" })
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsx)("div", {
				className: "mode-row",
				children: m.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
					className: i?.state === e ? "active" : "",
					onClick: () => g(e),
					children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: ue(e) }), /* @__PURE__ */ (0, x.jsx)("span", { children: le(e) })]
				}, e))
			})
		]
	});
}
function A({ device: e, hass: t, onFeedback: n }) {
	let r = T(t, e.entity), i = r?.state === "on", a = Math.round(E(r?.attributes.brightness, i ? 255 : 0) / 2.55), o = (Array.isArray(r?.attributes.supported_color_modes) ? r.attributes.supported_color_modes : []).some((e) => e !== "onoff") || typeof r?.attributes.brightness == "number", [s, c] = (0, _.useState)(null), [l, u] = (0, _.useState)(null), d = (0, _.useRef)({
		startX: 0,
		moved: !1
	}), f = s ?? i, p = l ?? (s === !0 && !i ? 100 : a);
	(0, _.useEffect)(() => {
		c(null), u(null);
	}, [r?.state, r?.attributes.brightness]);
	let m = async () => {
		if (!(!t || !D(r))) {
			c(!f), n(`${f ? "מכבה" : "מדליק"} ${e.name}`);
			try {
				await t.callService("light", "toggle", {}, { entity_id: e.entity }), n(`${e.name} ${f ? "כובתה" : "הופעלה"}`, "success");
			} catch {
				c(null), n(`הפעולה ב־${e.name} נכשלה`, "error");
			}
		}
	}, h = (e) => {
		let t = e.currentTarget.getBoundingClientRect();
		return Math.max(1, Math.min(100, Math.round((t.right - e.clientX) / t.width * 100)));
	};
	return /* @__PURE__ */ (0, x.jsxs)("article", {
		className: `light-control ${f ? "active" : ""} ${o ? "dimmable" : "binary"}`,
		style: {
			"--light-level": p / 100,
			"--light-percent": `${p}%`
		},
		onPointerDown: (e) => {
			!o || !D(r) || (d.current = {
				startX: e.clientX,
				moved: !1
			}, e.currentTarget.setPointerCapture(e.pointerId));
		},
		onPointerMove: (e) => {
			!o || !e.currentTarget.hasPointerCapture(e.pointerId) || (Math.abs(e.clientX - d.current.startX) > 5 && (d.current.moved = !0), d.current.moved && (c(!0), u(h(e))));
		},
		onPointerUp: async (i) => {
			if (!o || !D(r) || !d.current.moved) return m();
			let a = h(i);
			c(!0), u(a), n(`${e.name} · ${a}%`);
			try {
				await t?.callService("light", "turn_on", { brightness_pct: a }, { entity_id: e.entity }), n(`עוצמת ${e.name} עודכנה`, "success");
			} catch {
				c(null), u(null), n(`עדכון ${e.name} נכשל`, "error");
			}
		},
		children: [/* @__PURE__ */ (0, x.jsxs)("button", {
			className: "light-main",
			onClick: (e) => {
				e.preventDefault();
			},
			disabled: !D(r),
			"aria-pressed": f,
			children: [
				/* @__PURE__ */ (0, x.jsx)("span", {
					className: "light-orb",
					children: /* @__PURE__ */ (0, x.jsx)(ee, { name: j(e) })
				}),
				/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, x.jsx)("small", { children: D(r) ? f ? o ? `פעילה · ${p}%` : "פעילה" : "כבויה" : "לא זמין" })] }),
				/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:power" })
			]
		}), o && /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "swipe-hint",
			children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "החלק לעמעום" }), /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:gesture-swipe-horizontal" })]
		})]
	});
}
function se({ device: e, hass: t }) {
	let n = T(t, e.entity), r = n?.state === "on";
	return /* @__PURE__ */ (0, x.jsxs)("button", {
		className: `curtain-control ${r ? "open" : "closed"}`,
		disabled: !D(n),
		onClick: () => t?.callService("homeassistant", "toggle", {}, { entity_id: e.entity }),
		children: [
			/* @__PURE__ */ (0, x.jsxs)("span", {
				className: "curtain-window",
				children: [
					/* @__PURE__ */ (0, x.jsx)("i", {}),
					/* @__PURE__ */ (0, x.jsx)("i", {}),
					/* @__PURE__ */ (0, x.jsx)("b", { children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:weather-sunny" }) })
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, x.jsx)("small", { children: D(n) ? r ? "פתוח" : "סגור" : "לא זמין" })] }),
			/* @__PURE__ */ (0, x.jsx)(w, { icon: r ? "mdi:curtains" : "mdi:curtains-closed" })
		]
	});
}
function ce({ entityId: e, hass: t, onFeedback: n }) {
	let r = T(t, e), i = r?.state === "playing", a = String(r?.attributes.media_title || r?.attributes.friendly_name || "נגן מדיה"), o = String(r?.attributes.media_artist || (D(r) ? r?.state : "לא זמין")), s = typeof r?.attributes.entity_picture == "string" ? r.attributes.entity_picture : "", c = E(r?.attributes.media_position, 0), l = E(r?.attributes.media_duration, 0), u = l > 0 ? Math.min(100, c / l * 100) : 0, d = Math.round(E(r?.attributes.volume_level, 0) * 100), f = async (r, i) => {
		n(i);
		try {
			await t?.callService("media_player", r, {}, { entity_id: e }), n("פקודת המדיה בוצעה", "success");
		} catch {
			n("פקודת המדיה נכשלה", "error");
		}
	}, p = async (r) => {
		n(`עוצמת שמע ${r}%`);
		try {
			await t?.callService("media_player", "volume_set", { volume_level: r / 100 }, { entity_id: e });
		} catch {
			n("שינוי עוצמת השמע נכשל", "error");
		}
	};
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: `media-control widget-shell glass media-${r?.state || "unavailable"} ${i ? "playing" : ""}`,
		children: [
			/* @__PURE__ */ (0, x.jsxs)("header", {
				className: "widget-heading",
				children: [
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: "widget-glyph",
						children: /* @__PURE__ */ (0, x.jsx)(ee, { name: "media" })
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "מדיה בחדר" }), /* @__PURE__ */ (0, x.jsx)("h2", { children: i ? "מתנגן עכשיו" : r?.state === "paused" ? "הנגינה מושהית" : r?.state === "off" ? "הנגן כבוי" : "הנגן מוכן" })] }),
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: `state-pill ${i ? "active" : "off"}`,
						children: [/* @__PURE__ */ (0, x.jsx)("i", {}), i ? "מנגן" : r?.state === "paused" ? "מושהה" : "לא פעיל"]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "now-playing",
				children: [
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: "album-art",
						style: s ? { backgroundImage: `linear-gradient(rgba(4,7,12,.05),rgba(4,7,12,.18)),url(${s})` } : void 0,
						children: !s && /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:music" })
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: a }), /* @__PURE__ */ (0, x.jsx)("small", { children: o })] }),
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: "equalizer",
						children: [
							/* @__PURE__ */ (0, x.jsx)("i", {}),
							/* @__PURE__ */ (0, x.jsx)("i", {}),
							/* @__PURE__ */ (0, x.jsx)("i", {}),
							/* @__PURE__ */ (0, x.jsx)("i", {})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsx)("div", {
				className: "media-progress",
				"aria-label": "התקדמות הנגינה",
				children: /* @__PURE__ */ (0, x.jsx)("i", { style: { width: `${u}%` } })
			}),
			l > 0 && /* @__PURE__ */ (0, x.jsxs)("div", {
				className: "media-times",
				children: [/* @__PURE__ */ (0, x.jsx)("span", { children: fe(c) }), /* @__PURE__ */ (0, x.jsx)("span", { children: fe(l) })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "transport",
				children: [
					/* @__PURE__ */ (0, x.jsx)("button", {
						onClick: () => f("media_previous_track", "חוזר לרצועה הקודמת"),
						children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:skip-previous" })
					}),
					/* @__PURE__ */ (0, x.jsx)("button", {
						className: "play",
						onClick: () => f("media_play_pause", i ? "משהה את הנגינה" : "מתחיל לנגן"),
						children: /* @__PURE__ */ (0, x.jsx)(w, { icon: i ? "mdi:pause" : "mdi:play" })
					}),
					/* @__PURE__ */ (0, x.jsx)("button", {
						onClick: () => f("media_next_track", "עובר לרצועה הבאה"),
						children: /* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:skip-next" })
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("label", {
				className: "volume-control",
				children: [
					/* @__PURE__ */ (0, x.jsx)(w, { icon: d === 0 ? "mdi:volume-off" : "mdi:volume-high" }),
					/* @__PURE__ */ (0, x.jsx)("input", {
						type: "range",
						min: "0",
						max: "100",
						value: d,
						disabled: !D(r),
						onChange: (e) => p(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, x.jsxs)("strong", { children: [d, "%"] })
				]
			})
		]
	});
}
function le(e) {
	return {
		off: "כבוי",
		cool: "קירור",
		heat: "חימום",
		fan_only: "אוורור",
		dry: "ייבוש",
		auto: "אוטומטי",
		heat_cool: "חימום וקירור"
	}[e] || e;
}
function ue(e) {
	return {
		off: "mdi:power",
		cool: "mdi:snowflake",
		heat: "mdi:fire",
		fan_only: "mdi:fan",
		dry: "mdi:water-percent",
		auto: "mdi:autorenew",
		heat_cool: "mdi:sun-snowflake-variant"
	}[e] || "mdi:circle-outline";
}
function j(e) {
	let t = `${e.entity} ${e.name}`.toLowerCase();
	return t.includes("floor") || t.includes("רצפה") ? "floor" : t.includes("tv") || t.includes("screen") || t.includes("מסך") || t.includes("וילון") ? "ambient" : t.includes("ceiling") || t.includes("תקרה") || t.includes("ראשית") || t.includes("מרכז") ? "ceiling" : "lamp";
}
function M(e, t) {
	return {
		cooling: "מקרר עכשיו",
		heating: "מחמם עכשיו",
		drying: "מייבש את האוויר",
		fan: "מאוורר את החדר",
		idle: t === "off" ? "המזגן כבוי" : "ממתין לטמפרטורת היעד",
		off: "המזגן כבוי"
	}[e] || le(t);
}
function de(e, t) {
	let n = e - t;
	return Math.abs(n) < .2 ? "בדיוק ביעד" : `${Math.abs(n).toFixed(1)}° ${n > 0 ? "מעל היעד" : "מתחת ליעד"}`;
}
function fe(e) {
	let t = Math.max(0, Math.floor(e));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function pe(e, t, n) {
	let [r, i] = (0, _.useState)([]);
	return (0, _.useEffect)(() => {
		if (!e?.callApi || !t) return;
		let r = (/* @__PURE__ */ new Date(Date.now() - 216e5)).toISOString();
		e.callApi("GET", `history/period/${r}?filter_entity_id=${encodeURIComponent(t)}`).then((e) => {
			let t = (e?.[0] || []).map((e) => Number(n ? e.state : e.attributes?.current_temperature)).filter(Number.isFinite);
			i(t.slice(-32));
		}).catch(() => i([]));
	}, [
		e?.callApi,
		t,
		n
	]), r;
}
function me({ values: e }) {
	if (e.length < 2) return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "temperature-history empty",
		children: [/* @__PURE__ */ (0, x.jsx)(w, { icon: "mdi:chart-line" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "גרף הטמפרטורה יופיע כשנתוני ההיסטוריה זמינים" })]
	});
	let t = Math.min(...e), n = Math.max(...e), r = Math.max(.5, n - t), i = e.map((n, i) => `${i / (e.length - 1) * 100},${32 - (n - t) / r * 26}`).join(" ");
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "temperature-history",
		children: [/* @__PURE__ */ (0, x.jsxs)("header", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "6 שעות אחרונות" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: e.at(-1) >= e[0] ? "מגמת עלייה" : "מגמת ירידה" })] }), /* @__PURE__ */ (0, x.jsxs)("svg", {
			viewBox: "0 0 100 36",
			preserveAspectRatio: "none",
			role: "img",
			"aria-label": "גרף טמפרטורה בשש השעות האחרונות",
			children: [
				/* @__PURE__ */ (0, x.jsx)("defs", { children: /* @__PURE__ */ (0, x.jsxs)("linearGradient", {
					id: "temp-area",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, x.jsx)("stop", {
						offset: "0",
						stopColor: "var(--mode-color)",
						stopOpacity: ".34"
					}), /* @__PURE__ */ (0, x.jsx)("stop", {
						offset: "1",
						stopColor: "var(--mode-color)",
						stopOpacity: "0"
					})]
				}) }),
				/* @__PURE__ */ (0, x.jsx)("polygon", {
					points: `0,36 ${i} 100,36`,
					fill: "url(#temp-area)"
				}),
				/* @__PURE__ */ (0, x.jsx)("polyline", {
					points: i,
					fill: "none",
					stroke: "var(--mode-color)",
					strokeWidth: "1.8",
					vectorEffect: "non-scaling-stroke"
				})
			]
		})]
	});
}
//#endregion
//#region src/ui/SpecialView.tsx
var N = ({ icon: e }) => _.createElement("ha-icon", { icon: e }), he = (e) => e.split(".", 1)[0], ge = (e) => String(e.attributes.friendly_name || e.entity_id), _e = (e) => !["unknown", "unavailable"].includes(e.state), ve = (e, t) => Object.values(e?.states || {}).filter((e) => t.includes(he(e.entity_id)) && _e(e)), ye = (e) => window.dispatchEvent(new CustomEvent("hass-more-info", {
	detail: { entityId: e },
	bubbles: !0,
	composed: !0
})), be = (e, t = "info") => window.dispatchEvent(new CustomEvent("homeii-feedback", { detail: {
	message: e,
	type: t
} }));
async function xe(e, t, n, r, i) {
	if (!e) {
		be("אין חיבור ל־Home Assistant", "error");
		return;
	}
	be("מבצע פעולה…");
	try {
		await e.callService(t, n, r, { entity_id: i }), be("הפעולה בוצעה", "success");
	} catch {
		be("הפעולה נכשלה", "error");
	}
}
var Se = class extends _.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e) {
		console.error("HOMEii widget failed", e);
	}
	render() {
		return this.state.failed ? /* @__PURE__ */ (0, x.jsx)(P, {
			icon: "mdi:alert-circle-outline",
			text: "הרכיב לא הצליח להיטען"
		}) : this.props.children;
	}
};
function Ce({ item: e, hass: t, legacyDashboardPath: n, cameraSelection: r, onHome: i }) {
	let a = we(e, t, n, r);
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: `special-view special-${e.id}`,
		children: [/* @__PURE__ */ (0, x.jsxs)("header", {
			className: "special-header glass",
			children: [
				/* @__PURE__ */ (0, x.jsxs)("button", {
					className: "special-back",
					onClick: i,
					children: [/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:arrow-right" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "מסך הבית" })]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEii Collection" }), /* @__PURE__ */ (0, x.jsx)("h1", { children: e.name })] }),
				/* @__PURE__ */ (0, x.jsx)("span", {
					className: "special-title-icon",
					children: /* @__PURE__ */ (0, x.jsx)(N, { icon: e.icon })
				})
			]
		}), /* @__PURE__ */ (0, x.jsx)("div", {
			className: "special-content",
			children: /* @__PURE__ */ (0, x.jsx)(Se, { children: a })
		})]
	});
}
function we(e, t, n, r) {
	return e.id === "security" ? /* @__PURE__ */ (0, x.jsx)(Te, {
		hass: t,
		cameraSelection: r
	}) : e.id === "intercom" ? /* @__PURE__ */ (0, x.jsx)(Pe, { hass: t }) : e.id === "weather" ? /* @__PURE__ */ (0, x.jsx)(De, { hass: t }) : e.id === "power" ? /* @__PURE__ */ (0, x.jsx)(Oe, {
		item: e,
		legacyPath: n
	}) : e.id === "vacuum" ? /* @__PURE__ */ (0, x.jsx)(Ae, { hass: t }) : e.id === "lights" ? /* @__PURE__ */ (0, x.jsx)(je, { hass: t }) : e.id === "resources" ? /* @__PURE__ */ (0, x.jsx)(Ne, { hass: t }) : e.id === "media" ? /* @__PURE__ */ (0, x.jsx)(ke, { hass: t }) : ["media-players", "advanced-media"].includes(e.id) ? /* @__PURE__ */ (0, x.jsx)(Me, { hass: t }) : /* @__PURE__ */ (0, x.jsx)("section", {
		className: "legacy-widget glass",
		children: /* @__PURE__ */ (0, x.jsx)("iframe", {
			title: e.name,
			src: `${n}/${e.legacyPath}?kiosk`,
			allow: "autoplay; fullscreen; microphone"
		})
	});
}
function P({ icon: e, text: t }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "special-empty glass",
		children: [
			/* @__PURE__ */ (0, x.jsx)(N, { icon: e }),
			/* @__PURE__ */ (0, x.jsx)("strong", { children: t }),
			/* @__PURE__ */ (0, x.jsx)("small", { children: "הכרטיס יופיע אוטומטית כשישות מתאימה תהיה זמינה ב־HA" })
		]
	});
}
function Te({ hass: e, cameraSelection: t }) {
	let n = [
		"camera.intercom",
		"camera.entrance",
		"camera.a8105_e_0"
	], r = ve(e, ["camera"]), i = [...n.filter((t) => e?.states[t]), ...r.map((e) => e.entity_id).filter((e) => !n.includes(e))], a = t == null ? i : t.filter((t) => e?.states[t]);
	return a.length ? /* @__PURE__ */ (0, x.jsx)("div", {
		className: "camera-grid",
		children: a.map((t) => /* @__PURE__ */ (0, x.jsx)(Ee, {
			entityId: t,
			hass: e
		}, t))
	}) : /* @__PURE__ */ (0, x.jsx)(P, {
		icon: "mdi:cctv",
		text: "לא נבחרו מצלמות להצגה"
	});
}
function Ee({ entityId: e, hass: t }) {
	let n = (0, _.useRef)(null);
	return (0, _.useEffect)(() => {
		let r = !1;
		return customElements.whenDefined("advanced-camera-card").then(() => {
			if (r) return;
			let i = n.current;
			i && (i.setConfig?.({
				type: "custom:advanced-camera-card",
				cameras: [{
					camera_entity: e,
					live_provider: "go2rtc",
					go2rtc: { modes: ["webrtc", "mse"] }
				}],
				view: { default: "live" },
				menu: {
					style: "outside",
					position: "bottom"
				},
				live: { auto_play: ["visible", "selected"] }
			}), i.hass = t);
		}), () => {
			r = !0;
		};
	}, [e, t]), /* @__PURE__ */ (0, x.jsx)("article", {
		className: "camera-card advanced-camera-shell glass",
		children: _.createElement("advanced-camera-card", { ref: n })
	});
}
function De({ hass: e }) {
	let t = ve(e, ["weather"])[0];
	if (!t) return /* @__PURE__ */ (0, x.jsx)(P, {
		icon: "mdi:weather-partly-cloudy",
		text: "אין נתוני מזג אוויר"
	});
	let n = Array.isArray(t.attributes.forecast) ? t.attributes.forecast.slice(0, 5) : [];
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "weather-layout",
		children: [/* @__PURE__ */ (0, x.jsxs)("article", {
			className: "weather-now glass",
			children: [
				/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:weather-partly-cloudy" }),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [
					/* @__PURE__ */ (0, x.jsx)("small", { children: ge(t) }),
					/* @__PURE__ */ (0, x.jsxs)("strong", { children: [String(t.attributes.temperature ?? "—"), "°"] }),
					/* @__PURE__ */ (0, x.jsx)("span", { children: t.state })
				] }),
				/* @__PURE__ */ (0, x.jsxs)("dl", { children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("dt", { children: "לחות" }), /* @__PURE__ */ (0, x.jsxs)("dd", { children: [String(t.attributes.humidity ?? "—"), "%"] })] }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("dt", { children: "רוח" }), /* @__PURE__ */ (0, x.jsx)("dd", { children: String(t.attributes.wind_speed ?? "—") })] })] })
			]
		}), /* @__PURE__ */ (0, x.jsx)("section", {
			className: "forecast-strip glass",
			children: n.length ? n.map((e, t) => /* @__PURE__ */ (0, x.jsxs)("article", { children: [
				/* @__PURE__ */ (0, x.jsx)("small", { children: new Date(String(e.datetime)).toLocaleDateString("he-IL", { weekday: "short" }) }),
				/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:weather-partly-cloudy" }),
				/* @__PURE__ */ (0, x.jsxs)("strong", { children: [String(e.temperature ?? "—"), "°"] })
			] }, t)) : /* @__PURE__ */ (0, x.jsx)("span", { children: "תחזית תוצג כאשר האינטגרציה תספק נתונים" })
		})]
	});
}
function Oe({ item: e, legacyPath: t }) {
	return /* @__PURE__ */ (0, x.jsx)("section", {
		className: "legacy-widget energy-legacy glass",
		children: /* @__PURE__ */ (0, x.jsx)("iframe", {
			title: e.name,
			src: `${t}/${e.legacyPath}?kiosk`,
			allow: "fullscreen"
		})
	});
}
function ke({ hass: e }) {
	let t = (0, _.useRef)(null);
	return (0, _.useEffect)(() => {
		let n = t.current;
		n && (n.hass = e, n.setConfig?.({
			type: "custom:homeii-music-flow",
			rtl: !0,
			language: "he",
			show_ma_button: !1,
			ma_interface_url: "/d5369777_music_assistant_beta",
			music_assistant_timeout_ms: 12e3,
			homeii_engine_mode: "required",
			discovery_mode_enabled: !0,
			player_sort_mode: "custom",
			player_order_entities: [
				"media_player.computer_2",
				"media_player.bedroom_2",
				"media_player.bathroom_2",
				"media_player.kitchen_2",
				"media_player.livingroom_2"
			],
			use_mass_queue_send_command: !0,
			mobile_liked_mode: "ma",
			screensaver_controls_enabled: !0
		}));
	}, [e]), /* @__PURE__ */ (0, x.jsxs)("section", {
		className: "music-flow-host glass",
		children: [/* @__PURE__ */ (0, x.jsxs)("div", {
			className: "music-flow-intro",
			children: [
				/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:waveform" }) }),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEii" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: "MUSIC FLOW" })] }),
				/* @__PURE__ */ (0, x.jsx)("i", {})
			]
		}), _.createElement("homeii-music-flow", { ref: t })]
	});
}
function Ae({ hass: e }) {
	let t = ve(e, ["vacuum"]);
	return t.length ? /* @__PURE__ */ (0, x.jsx)("div", {
		className: "device-widget-grid",
		children: t.map((t) => {
			let n = ["cleaning", "returning"].includes(t.state);
			return /* @__PURE__ */ (0, x.jsxs)("article", {
				className: `vacuum-widget glass ${n ? "active" : ""}`,
				children: [
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "vacuum-orbit",
						children: [/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:robot-vacuum" }), /* @__PURE__ */ (0, x.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, x.jsx)("h2", { children: ge(t) }),
					/* @__PURE__ */ (0, x.jsx)("p", { children: n ? "מנקה עכשיו" : t.state === "docked" ? "בעמדת הטעינה" : t.state }),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "widget-actions",
						children: [
							/* @__PURE__ */ (0, x.jsxs)("button", {
								onClick: () => xe(e, "vacuum", "start", {}, t.entity_id),
								children: [/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:play" }), "ניקוי"]
							}),
							/* @__PURE__ */ (0, x.jsxs)("button", {
								onClick: () => xe(e, "vacuum", "pause", {}, t.entity_id),
								children: [/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:pause" }), "השהיה"]
							}),
							/* @__PURE__ */ (0, x.jsxs)("button", {
								onClick: () => xe(e, "vacuum", "return_to_base", {}, t.entity_id),
								children: [/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:home-map-marker" }), "חזרה"]
							})
						]
					})
				]
			}, t.entity_id);
		})
	}) : /* @__PURE__ */ (0, x.jsx)(P, {
		icon: "mdi:robot-vacuum",
		text: "לא נמצא שואב"
	});
}
function je({ hass: e }) {
	let t = ve(e, ["light"]);
	return t.length ? /* @__PURE__ */ (0, x.jsx)("div", {
		className: "special-entity-grid",
		children: t.map((t) => {
			let n = t.state === "on", r = Math.round(Number(t.attributes.brightness || 0) / 2.55);
			return /* @__PURE__ */ (0, x.jsxs)("article", {
				className: `entity-widget glass ${n ? "active" : ""}`,
				children: [/* @__PURE__ */ (0, x.jsxs)("button", {
					className: "entity-main",
					onClick: () => xe(e, "light", n ? "turn_off" : "turn_on", {}, t.entity_id),
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:lightbulb" }) }),
						/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: ge(t) }), /* @__PURE__ */ (0, x.jsx)("small", { children: n ? `${r || 100}% · דולקת` : "כבויה" })] }),
						/* @__PURE__ */ (0, x.jsx)("i", {})
					]
				}), n && t.attributes.brightness !== void 0 && /* @__PURE__ */ (0, x.jsx)("input", {
					"aria-label": `עוצמת ${ge(t)}`,
					type: "range",
					min: "1",
					max: "100",
					value: r || 1,
					onChange: (n) => xe(e, "light", "turn_on", { brightness_pct: Number(n.target.value) }, t.entity_id)
				})]
			}, t.entity_id);
		})
	}) : /* @__PURE__ */ (0, x.jsx)(P, {
		icon: "mdi:lightbulb-group",
		text: "לא נמצאה תאורה"
	});
}
function Me({ hass: e }) {
	let t = ve(e, ["media_player"]);
	return t.length ? /* @__PURE__ */ (0, x.jsx)("div", {
		className: "media-widget-grid",
		children: t.map((t) => {
			let n = t.state === "playing";
			return /* @__PURE__ */ (0, x.jsxs)("article", {
				className: `media-widget glass ${n ? "active" : ""}`,
				children: [
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "media-cover",
						style: t.attributes.entity_picture ? { backgroundImage: `url(${String(t.attributes.entity_picture)})` } : void 0,
						children: /* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:music-note" })
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "media-meta",
						children: [
							/* @__PURE__ */ (0, x.jsx)("small", { children: ge(t) }),
							/* @__PURE__ */ (0, x.jsx)("strong", { children: String(t.attributes.media_title || t.state) }),
							/* @__PURE__ */ (0, x.jsx)("span", { children: String(t.attributes.media_artist || "") })
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "media-buttons",
						children: [
							/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => xe(e, "media_player", "media_previous_track", {}, t.entity_id),
								children: /* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:skip-previous" })
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "primary",
								onClick: () => xe(e, "media_player", "media_play_pause", {}, t.entity_id),
								children: /* @__PURE__ */ (0, x.jsx)(N, { icon: n ? "mdi:pause" : "mdi:play" })
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => xe(e, "media_player", "media_next_track", {}, t.entity_id),
								children: /* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:skip-next" })
							})
						]
					})
				]
			}, t.entity_id);
		})
	}) : /* @__PURE__ */ (0, x.jsx)(P, {
		icon: "mdi:speaker-multiple",
		text: "לא נמצאו נגני מדיה"
	});
}
function Ne({ hass: e }) {
	let t = /(processor|memory|disk|cpu|storage|uptime|temperature)/i, n = ve(e, ["sensor", "update"]).filter((e) => t.test(`${e.entity_id} ${e.attributes.friendly_name || ""} ${e.attributes.device_class || ""}`)).slice(0, 12);
	return n.length ? /* @__PURE__ */ (0, x.jsx)("div", {
		className: "resource-grid",
		children: n.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
			className: "resource-row glass",
			onClick: () => ye(e.entity_id),
			children: [
				/* @__PURE__ */ (0, x.jsx)(N, { icon: he(e.entity_id) === "update" ? "mdi:update" : "mdi:memory" }),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: ge(e) }), /* @__PURE__ */ (0, x.jsx)("small", { children: he(e.entity_id) === "update" ? "רכיב מערכת" : "מדד חי" })] }),
				/* @__PURE__ */ (0, x.jsxs)("b", { children: [
					e.state,
					" ",
					String(e.attributes.unit_of_measurement || "")
				] })
			]
		}, e.entity_id))
	}) : /* @__PURE__ */ (0, x.jsx)(P, {
		icon: "mdi:cpu-64-bit",
		text: "לא נמצאו חיישני מערכת"
	});
}
function Pe({ hass: e }) {
	let t = [
		"camera.intercom",
		"camera.entrance",
		"sensor.intercom_person_count",
		"binary_sensor.intercom_motion"
	], n = [...t.map((t) => e?.states[t]).filter(Boolean), ...Object.values(e?.states || {}).filter((e) => /(doorbell|intercom|כניסה|פעמון)/i.test(`${e.entity_id} ${e.attributes.friendly_name || ""}`) && !t.includes(e.entity_id))], r = n.filter((e) => he(e.entity_id) === "camera");
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "intercom-layout",
		children: [r.length ? /* @__PURE__ */ (0, x.jsx)(Te, { hass: {
			...e,
			states: Object.fromEntries(r.map((e) => [e.entity_id, e]))
		} }) : /* @__PURE__ */ (0, x.jsx)(P, {
			icon: "mdi:doorbell-video",
			text: "לא נמצאה מצלמת אינטרקום"
		}), /* @__PURE__ */ (0, x.jsx)("div", {
			className: "resource-grid",
			children: n.filter((e) => he(e.entity_id) !== "camera").slice(0, 8).map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
				className: "resource-row glass",
				onClick: () => ye(e.entity_id),
				children: [
					/* @__PURE__ */ (0, x.jsx)(N, { icon: "mdi:doorbell-video" }),
					/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: ge(e) }), /* @__PURE__ */ (0, x.jsx)("small", { children: "אינטרקום" })] }),
					/* @__PURE__ */ (0, x.jsx)("b", { children: e.state })
				]
			}, e.entity_id))
		})]
	});
}
//#endregion
//#region src/ui/ControlCenter.tsx
var Fe = ({ icon: e }) => _.createElement("ha-icon", { icon: e }), Ie = [
	{
		id: "light",
		label: "תאורה",
		icon: "mdi:lightbulb-group"
	},
	{
		id: "climate",
		label: "אקלים",
		icon: "mdi:thermostat"
	},
	{
		id: "media_player",
		label: "מדיה",
		icon: "mdi:speaker-multiple"
	},
	{
		id: "security",
		label: "ביטחון",
		icon: "mdi:shield-home"
	}
], Le = (e, t) => String(e?.attributes.friendly_name || t);
function Re({ hass: e, rooms: t, roomEntities: n, hiddenByRoom: r, cameraSelection: i, onHiddenChange: a, onCameraChange: o }) {
	let [s, c] = (0, _.useState)(t[0]?.id || ""), [l, u] = (0, _.useState)("rooms"), [d, f] = (0, _.useState)(""), p = t.find((e) => e.id === s), m = new Set(r[s] || []), h = Object.keys(e?.states || {}).filter((e) => e.startsWith("camera.")), g = new Set(i === null ? h : i), v = Object.values(e?.states || {}).filter((e) => ["unknown", "unavailable"].includes(e.state)).length, y = (t) => !d.trim() || `${t} ${Le(e?.states[t], t)}`.toLocaleLowerCase("he").includes(d.trim().toLocaleLowerCase("he")), b = (e) => {
		let t = new Set(m);
		t.has(e) ? t.delete(e) : t.add(e), a(s, [...t]);
	}, S = (e) => {
		let t = new Set(g);
		t.has(e) ? t.delete(e) : t.add(e), o([...t]);
	};
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: "control-center",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("header", {
				className: "control-center-title",
				children: [/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:tune-vertical-variant" }) }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEii Control Center" }), /* @__PURE__ */ (0, x.jsx)("h3", { children: "ניהול תוכן" })] })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "control-center-tabs",
				children: [/* @__PURE__ */ (0, x.jsxs)("button", {
					className: l === "rooms" ? "selected" : "",
					onClick: () => u("rooms"),
					children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:floor-plan" }), "חדרים"]
				}), /* @__PURE__ */ (0, x.jsxs)("button", {
					className: l === "cameras" ? "selected" : "",
					onClick: () => u("cameras"),
					children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:cctv" }), "מצלמות"]
				})]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "manager-health",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: e ? "healthy" : "issue",
						children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: e ? "mdi:check-network-outline" : "mdi:lan-disconnect" }), /* @__PURE__ */ (0, x.jsx)("b", { children: e ? "HA מחובר" : "מנותק" })]
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: v ? "warning" : "healthy",
						children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:heart-pulse" }), /* @__PURE__ */ (0, x.jsxs)("b", { children: [v, " לא זמינות"] })]
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:home-map-marker" }), /* @__PURE__ */ (0, x.jsxs)("b", { children: [t.length, " חדרים"] })] })
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("label", {
				className: "manager-search",
				children: [
					/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:magnify" }),
					/* @__PURE__ */ (0, x.jsx)("input", {
						value: d,
						onChange: (e) => f(e.target.value),
						placeholder: "חיפוש ישות בשם או Entity ID"
					}),
					/* @__PURE__ */ (0, x.jsx)("button", {
						onClick: () => f(""),
						"aria-label": "ניקוי",
						children: /* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:close" })
					})
				]
			}),
			l === "rooms" ? /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
				/* @__PURE__ */ (0, x.jsx)("div", {
					className: "room-picker",
					"aria-label": "בחירת חדר",
					children: t.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
						className: e.id === s ? "selected" : "",
						onClick: () => c(e.id),
						children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: e.icon }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.name })]
					}, e.id))
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "manager-summary",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: p?.name }), /* @__PURE__ */ (0, x.jsxs)("small", { children: [Object.values(n[s] || {}).flat().length - m.size, " ישויות מוצגות"] })] }), /* @__PURE__ */ (0, x.jsx)("button", {
						onClick: () => a(s, []),
						children: "הצג הכול"
					})]
				}),
				/* @__PURE__ */ (0, x.jsx)("div", {
					className: "manager-groups",
					children: Ie.map((t) => {
						let r = n[s]?.[t.id] || [], i = r.filter(y);
						return i.length ? /* @__PURE__ */ (0, x.jsxs)("section", { children: [/* @__PURE__ */ (0, x.jsxs)("header", { children: [
							/* @__PURE__ */ (0, x.jsx)(Fe, { icon: t.icon }),
							/* @__PURE__ */ (0, x.jsx)("strong", { children: t.label }),
							/* @__PURE__ */ (0, x.jsxs)("small", { children: [
								r.filter((e) => !m.has(e)).length,
								"/",
								r.length
							] }),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "group-bulk",
								children: [/* @__PURE__ */ (0, x.jsx)("button", {
									onClick: () => a(s, [...m].filter((e) => !r.includes(e))),
									"aria-label": `הצגת כל ${t.label}`,
									children: /* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:eye-outline" })
								}), /* @__PURE__ */ (0, x.jsx)("button", {
									onClick: () => a(s, [.../* @__PURE__ */ new Set([...m, ...r])]),
									"aria-label": `הסתרת כל ${t.label}`,
									children: /* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:eye-off-outline" })
								})]
							})
						] }), /* @__PURE__ */ (0, x.jsx)("div", { children: i.map((t) => /* @__PURE__ */ (0, x.jsxs)("label", {
							className: m.has(t) ? "disabled" : "enabled",
							children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: Le(e?.states[t], t) }), /* @__PURE__ */ (0, x.jsx)("small", { children: t })] }), /* @__PURE__ */ (0, x.jsx)("input", {
								type: "checkbox",
								checked: !m.has(t),
								onChange: () => b(t)
							})]
						}, t)) })] }, t.id) : null;
					})
				})
			] }) : /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "manager-summary",
				children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: "מצלמות בפאנל" }), /* @__PURE__ */ (0, x.jsxs)("small", { children: [
					g.size,
					" מתוך ",
					h.length,
					" מוצגות"
				] })] }), /* @__PURE__ */ (0, x.jsx)("button", {
					onClick: () => o(h),
					children: "הצג הכול"
				})]
			}), /* @__PURE__ */ (0, x.jsx)("div", {
				className: "camera-picker",
				children: h.length ? h.filter(y).map((t) => /* @__PURE__ */ (0, x.jsxs)("label", {
					className: g.has(t) ? "enabled" : "disabled",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", {
							className: "camera-picker-icon",
							children: /* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:cctv" })
						}),
						/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: Le(e?.states[t], t) }), /* @__PURE__ */ (0, x.jsx)("small", { children: t })] }),
						/* @__PURE__ */ (0, x.jsx)("input", {
							type: "checkbox",
							checked: g.has(t),
							onChange: () => S(t)
						})
					]
				}, t)) : /* @__PURE__ */ (0, x.jsxs)("div", {
					className: "manager-empty",
					children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:camera-off-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "לא נמצאו ישויות camera ב־HA" })]
				})
			})] }),
			/* @__PURE__ */ (0, x.jsxs)("p", {
				className: "manager-note",
				children: [/* @__PURE__ */ (0, x.jsx)(Fe, { icon: "mdi:shield-lock-outline" }), "ההגדרות זמינות למנהל בלבד ומוחלות מיד על HOMEii."]
			})
		]
	});
}
//#endregion
//#region src/ui/Studio.tsx
var F = ({ icon: e }) => _.createElement("ha-icon", { icon: e });
async function ze(e, t = {}) {
	let n = await fetch(`./api/${e}`, {
		cache: "no-store",
		...t,
		headers: {
			"Content-Type": "application/json",
			...t.headers || {}
		}
	});
	if (!n.ok) throw Error(`${n.status} ${await n.text()}`);
	return n.json();
}
var Be = {
	light: {
		label: "תאורה",
		icon: "mdi:lightbulb-group"
	},
	climate: {
		label: "אקלים",
		icon: "mdi:thermostat"
	},
	media_player: {
		label: "מדיה",
		icon: "mdi:speaker-multiple"
	},
	camera: {
		label: "מצלמה",
		icon: "mdi:cctv"
	},
	cover: {
		label: "כיסוי",
		icon: "mdi:curtains"
	},
	lock: {
		label: "נעילה",
		icon: "mdi:shield-lock-outline"
	},
	vacuum: {
		label: "שואב",
		icon: "mdi:robot-vacuum"
	},
	sensor: {
		label: "מידע",
		icon: "mdi:chart-line"
	},
	"ha-card": {
		label: "כרטיס HA",
		icon: "mdi:view-dashboard-outline"
	}
}, Ve = {
	balanced: {
		label: "מאוזן",
		icon: "mdi:view-dashboard-variant-outline",
		domains: [
			"light",
			"climate",
			"media_player",
			"camera",
			"lock",
			"sensor"
		]
	},
	comfort: {
		label: "נוחות",
		icon: "mdi:sofa-outline",
		domains: [
			"climate",
			"light",
			"cover",
			"sensor",
			"media_player"
		]
	},
	media: {
		label: "קולנוע",
		icon: "mdi:movie-open-outline",
		domains: [
			"media_player",
			"light",
			"climate",
			"sensor"
		]
	},
	security: {
		label: "ביטחון",
		icon: "mdi:shield-home-outline",
		domains: [
			"camera",
			"lock",
			"sensor",
			"light"
		]
	}
};
function He({ hass: e, onClose: t }) {
	let [n, r] = (0, _.useState)(null), [i, a] = (0, _.useState)(null), [o, s] = (0, _.useState)(""), [c, l] = (0, _.useState)(null), [u, d] = (0, _.useState)("layout"), [f, p] = (0, _.useState)("desktop"), [m, h] = (0, _.useState)(""), [g, v] = (0, _.useState)(null), [y, b] = (0, _.useState)("טוען את HOMEii Studio…");
	(0, _.useEffect)(() => {
		Promise.all([ze("project"), ze("discovery")]).then(([e, t]) => {
			r(e), a(t), s(Object.keys(e.areas)[0] || ""), b("");
		}).catch((e) => b(`טעינת Studio נכשלה: ${e.message}`));
	}, []);
	let S = n?.areas[o], C = (0, _.useMemo)(() => [...S?.widgets || []].sort((e, t) => e.order - t.order), [S]), w = C.find((e) => e.id === c), ee = (e) => r((t) => t && {
		...t,
		status: "draft",
		areas: {
			...t.areas,
			[o]: e(t.areas[o])
		}
	}), T = (e, t) => ee((n) => ({
		...n,
		widgets: n.widgets.map((n) => n.id === e ? {
			...n,
			...t
		} : n)
	})), E = (e, t) => ee((n) => {
		let r = [...n.widgets].sort((e, t) => e.order - t.order), i = r.findIndex((t) => t.id === e), a = r.findIndex((e) => e.id === t);
		if (i < 0 || a < 0) return n;
		let [o] = r.splice(i, 1);
		return r.splice(a, 0, o), {
			...n,
			widgets: r.map((e, t) => ({
				...e,
				order: t
			}))
		};
	}), D = (e) => ee((t) => {
		let n = i?.areas.find((e) => e.id === o)?.domains[e] || [], r = {
			id: `${o}-${e}-${Date.now()}`,
			type: e,
			title: Be[e]?.label || e,
			entityIds: n,
			size: "regular",
			order: t.widgets.length,
			visible: !0,
			settings: e === "ha-card" ? { card: {
				type: "tile",
				entity: n[0] || ""
			} } : {}
		};
		return l(r.id), {
			...t,
			widgets: [...t.widgets, r]
		};
	}), te = (e) => ee((t) => {
		let n = i?.areas.find((e) => e.id === o), r = new Map(t.widgets.map((e) => [e.type, e])), a = Ve[e].domains.flatMap((e) => {
			let t = n?.domains[e] || [];
			if (!t.length) return [];
			let i = r.get(e);
			return [{
				id: i?.id || `${o}-${e}`,
				type: e,
				title: i?.title || Be[e]?.label || e,
				entityIds: i?.entityIds?.length ? i.entityIds : t,
				size: i?.size || (e === "climate" || e === "media_player" ? "expanded" : "regular"),
				order: 0,
				visible: i?.visible ?? !0,
				settings: i?.settings || {}
			}];
		}).map((e, t) => ({
			...e,
			order: t
		}));
		return {
			...t,
			template: e,
			widgets: a
		};
	}), ne = (e, t) => T(e.id, { entityIds: e.entityIds.includes(t) ? e.entityIds.filter((e) => e !== t) : [...e.entityIds, t] }), O = async (e = !1) => {
		if (n) {
			b(e ? "מפרסם לכל המכשירים…" : "שומר טיוטה…");
			try {
				let t = await ze("project", {
					method: "PUT",
					body: JSON.stringify({
						...n,
						status: e ? "published" : "draft"
					})
				});
				r(t), b(e ? "הגרסה פורסמה לכל המכשירים" : "הטיוטה נשמרה"), e && window.dispatchEvent(new CustomEvent("homeii-project-published", { detail: t }));
			} catch (e) {
				b(`השמירה נכשלה: ${e.message}`);
			}
		}
	};
	return n ? /* @__PURE__ */ (0, x.jsxs)("section", {
		className: `studio studio-${f}`,
		dir: "rtl",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("header", {
				className: "studio-topbar",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "studio-brand",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:view-dashboard-outline" }) }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEiiOS" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: "Studio" })] })]
					}),
					/* @__PURE__ */ (0, x.jsx)("nav", { children: [
						"layout",
						"theme",
						"migration"
					].map((e) => /* @__PURE__ */ (0, x.jsx)("button", {
						className: u === e ? "active" : "",
						onClick: () => d(e),
						children: e === "layout" ? "מבנה" : e === "theme" ? "עיצוב" : "המרה"
					}, e)) }),
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "studio-actions",
						children: [
							/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => O(!1),
								children: "שמור טיוטה"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "publish",
								onClick: () => O(!0),
								children: "פרסם"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								"aria-label": "סגירה",
								onClick: t,
								children: /* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:close" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "studio-body",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("aside", {
						className: "studio-library",
						children: [
							/* @__PURE__ */ (0, x.jsx)("h3", { children: "Areas" }),
							/* @__PURE__ */ (0, x.jsx)("div", {
								className: "studio-areas",
								children: Object.values(n.areas).map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
									className: o === e.id ? "active" : "",
									onClick: () => {
										s(e.id), l(null);
									},
									children: [/* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:home-map-marker" }), /* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, x.jsxs)("small", { children: [e.widgets.length, " Widgets"] })] })]
								}, e.id))
							}),
							/* @__PURE__ */ (0, x.jsx)("h3", { children: "תבנית חדר" }),
							/* @__PURE__ */ (0, x.jsx)("div", {
								className: "template-library",
								children: Object.entries(Ve).map(([e, t]) => /* @__PURE__ */ (0, x.jsxs)("button", {
									className: S?.template === e ? "active" : "",
									onClick: () => te(e),
									children: [/* @__PURE__ */ (0, x.jsx)(F, { icon: t.icon }), /* @__PURE__ */ (0, x.jsx)("span", { children: t.label })]
								}, e))
							}),
							/* @__PURE__ */ (0, x.jsx)("h3", { children: "ספריית Widgets" }),
							/* @__PURE__ */ (0, x.jsx)("div", {
								className: "widget-library",
								children: Object.entries(Be).map(([e, t]) => /* @__PURE__ */ (0, x.jsxs)("button", {
									onClick: () => D(e),
									children: [
										/* @__PURE__ */ (0, x.jsx)(F, { icon: t.icon }),
										/* @__PURE__ */ (0, x.jsx)("span", { children: t.label }),
										/* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:plus" })
									]
								}, e))
							})
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("main", {
						className: "studio-workspace",
						children: [
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "viewport-switch",
								children: [[
									"mobile",
									"tablet",
									"desktop"
								].map((e) => /* @__PURE__ */ (0, x.jsx)("button", {
									className: f === e ? "active" : "",
									onClick: () => p(e),
									children: e
								}, e)), /* @__PURE__ */ (0, x.jsxs)("span", { children: [
									i?.counts.areas || 0,
									" Areas · ",
									i?.counts.entities || 0,
									" Entities"
								] })]
							}),
							u === "layout" && /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "studio-device",
								children: [/* @__PURE__ */ (0, x.jsxs)("header", {
									style: S?.picture ? { backgroundImage: `linear-gradient(#07101a66,#07101acc),url(${S.picture})` } : void 0,
									children: [/* @__PURE__ */ (0, x.jsx)("small", { children: S?.template }), /* @__PURE__ */ (0, x.jsx)("h1", { children: S?.name || "בחר Area" })]
								}), /* @__PURE__ */ (0, x.jsx)("div", {
									className: "studio-grid",
									children: C.map((t) => {
										let n = Be[t.type] || {
											label: t.type,
											icon: "mdi:view-dashboard-outline"
										}, r = t.entityIds.map((t) => e?.states[t]).filter(Boolean).filter((e) => ![
											"off",
											"idle",
											"standby",
											"unavailable",
											"unknown"
										].includes(e.state)).length;
										return /* @__PURE__ */ (0, x.jsxs)("article", {
											draggable: !0,
											className: `studio-widget size-${t.size} domain-${t.type} ${r ? "live" : ""} ${c === t.id ? "selected" : ""} ${t.visible ? "" : "hidden"}`,
											onDragStart: (e) => e.dataTransfer.setData("text/widget", t.id),
											onDragOver: (e) => e.preventDefault(),
											onDrop: (e) => E(e.dataTransfer.getData("text/widget"), t.id),
											onClick: () => l(t.id),
											children: [
												/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(F, { icon: n.icon }) }),
												/* @__PURE__ */ (0, x.jsxs)("div", { children: [
													/* @__PURE__ */ (0, x.jsx)("small", { children: n.label }),
													/* @__PURE__ */ (0, x.jsx)("strong", { children: t.title }),
													/* @__PURE__ */ (0, x.jsxs)("em", { children: [
														t.entityIds.length,
														" ישויות · ",
														r,
														" פעילות"
													] })
												] }),
												/* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:drag" })
											]
										}, t.id);
									})
								})]
							}),
							u === "theme" && /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "studio-theme",
								children: [
									/* @__PURE__ */ (0, x.jsx)("h2", { children: "Design Tokens" }),
									/* @__PURE__ */ (0, x.jsx)("p", { children: "שינויים גלובליים החלים על Dashboard, Widgets וחלונות קופצים." }),
									[
										[
											"accent",
											"צבע הדגשה",
											"#75b8ff"
										],
										[
											"surface",
											"צבע משטח",
											"#171d27"
										],
										[
											"text",
											"צבע טקסט",
											"#f7f8fb"
										]
									].map(([e, t, i]) => /* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: t }), /* @__PURE__ */ (0, x.jsx)("input", {
										type: "color",
										value: String(n.theme.tokens[e] || i),
										onChange: (t) => r({
											...n,
											status: "draft",
											theme: {
												...n.theme,
												tokens: {
													...n.theme.tokens,
													[e]: t.target.value
												}
											}
										})
									})] }, e))
								]
							}),
							u === "migration" && /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "studio-migration",
								children: [
									/* @__PURE__ */ (0, x.jsx)("h2", { children: "המרת Lovelace YAML" }),
									/* @__PURE__ */ (0, x.jsx)("p", { children: "המקור נשאר ללא שינוי. HOMEiiOS מציג Preview ודוח תאימות לפני יצירת Widgets." }),
									/* @__PURE__ */ (0, x.jsx)("textarea", {
										value: m,
										onChange: (e) => h(e.target.value),
										placeholder: "הדבק כאן YAML של דשבורד קיים"
									}),
									/* @__PURE__ */ (0, x.jsx)("button", {
										onClick: async () => {
											b("מנתח Lovelace YAML…");
											try {
												let e = await ze("migration/preview", {
													method: "POST",
													body: JSON.stringify({ yaml: m })
												});
												v(e), b("הניתוח הושלם ללא שינוי הדשבורד המקורי");
											} catch (e) {
												b(`הייבוא נכשל: ${e.message}`);
											}
										},
										children: "נתח דשבורד"
									}),
									g && /* @__PURE__ */ (0, x.jsx)("pre", { children: JSON.stringify(g, null, 2) })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("aside", {
						className: "studio-inspector",
						children: [/* @__PURE__ */ (0, x.jsx)("h3", { children: "Inspector" }), w ? /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
							/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "כותרת" }), /* @__PURE__ */ (0, x.jsx)("input", {
								value: w.title,
								onChange: (e) => T(w.id, { title: e.target.value })
							})] }),
							/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "גודל" }), /* @__PURE__ */ (0, x.jsxs)("select", {
								value: w.size,
								onChange: (e) => T(w.id, { size: e.target.value }),
								children: [
									/* @__PURE__ */ (0, x.jsx)("option", {
										value: "compact",
										children: "Compact"
									}),
									/* @__PURE__ */ (0, x.jsx)("option", {
										value: "regular",
										children: "Regular"
									}),
									/* @__PURE__ */ (0, x.jsx)("option", {
										value: "expanded",
										children: "Expanded"
									})
								]
							})] }),
							/* @__PURE__ */ (0, x.jsxs)("label", {
								className: "studio-check",
								children: [/* @__PURE__ */ (0, x.jsx)("input", {
									type: "checkbox",
									checked: w.visible,
									onChange: (e) => T(w.id, { visible: e.target.checked })
								}), /* @__PURE__ */ (0, x.jsx)("span", { children: "מוצג בדשבורד" })]
							}),
							w.type === "ha-card" && /* @__PURE__ */ (0, x.jsxs)("label", { children: [
								/* @__PURE__ */ (0, x.jsx)("span", { children: "הגדרת כרטיס HA ‏(JSON)" }),
								/* @__PURE__ */ (0, x.jsx)("textarea", {
									className: "ha-card-config",
									value: JSON.stringify(w.settings.card || {}, null, 2),
									onChange: (e) => {
										try {
											T(w.id, { settings: {
												...w.settings,
												card: JSON.parse(e.target.value)
											} });
										} catch {}
									}
								}),
								/* @__PURE__ */ (0, x.jsx)("small", { children: "הרינדור המלא יופעל ב־HA Panel Runtime." })
							] }),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "inspector-entities",
								children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: "ישויות ב־Area" }), (i?.areas.find((e) => e.id === o)?.entities || []).filter((e) => w.type === "ha-card" || e.domain === w.type).map((t) => /* @__PURE__ */ (0, x.jsxs)("label", {
									className: "entity-choice",
									children: [/* @__PURE__ */ (0, x.jsx)("input", {
										type: "checkbox",
										checked: w.entityIds.includes(t.entity_id),
										onChange: () => ne(w, t.entity_id)
									}), /* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("b", { children: t.name }), /* @__PURE__ */ (0, x.jsxs)("small", { children: [
										t.entity_id,
										" · ",
										e?.states[t.entity_id]?.state || t.state || "—"
									] })] })]
								}, t.entity_id))]
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "danger",
								onClick: () => {
									ee((e) => ({
										...e,
										widgets: e.widgets.filter((e) => e.id !== w.id).map((e, t) => ({
											...e,
											order: t
										}))
									})), l(null);
								},
								children: "הסר Widget"
							})
						] }) : /* @__PURE__ */ (0, x.jsx)("p", { children: "בחר Widget ב־Canvas כדי לערוך אותו." })]
					})
				]
			}),
			y && /* @__PURE__ */ (0, x.jsxs)("footer", {
				className: "studio-notice",
				children: [/* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:information-outline" }), y]
			})
		]
	}) : /* @__PURE__ */ (0, x.jsxs)("section", {
		className: "studio-loading",
		children: [/* @__PURE__ */ (0, x.jsx)(F, { icon: "mdi:progress-clock" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: y })]
	});
}
//#endregion
//#region src/ui/HomeOSApp.tsx
var I = ({ icon: e }) => _.createElement("ha-icon", { icon: e });
function Ue(e) {
	return e < 5 ? "לילה טוב" : e < 12 ? "בוקר טוב" : e < 17 ? "צהריים טובים" : e < 21 ? "ערב טוב" : "לילה טוב";
}
function We(e, t) {
	return t ? e?.states[t] : void 0;
}
function Ge(e, t = "") {
	return !e || ["unknown", "unavailable"].includes(e.state) ? "—" : `${e.state}${t}`;
}
async function Ke() {
	try {
		let e = location.pathname.includes("/api/hassio_ingress/"), t = location.port === "5173" ? "/config.json" : e ? "./assets/config.json" : "/local/homeiios-app/config.json", n = await fetch(`${t}?t=${Date.now()}`, { cache: "no-store" });
		if (!n.ok) throw Error(String(n.status));
		let r = await n.json();
		if (e) {
			let e = (e) => e.replace(/^\/local\/homeiios(?:-app)?\//, "./assets/");
			r.branding.logo = e(r.branding.logo), Object.keys(r.backgrounds).forEach((t) => r.backgrounds[t] = e(r.backgrounds[t])), Object.keys(r.timeBackgrounds).forEach((t) => r.timeBackgrounds[t] = e(r.timeBackgrounds[t])), r.backgroundPresets.forEach((t) => t.image = e(t.image));
		}
		return {
			...y,
			...r
		};
	} catch {
		return y;
	}
}
function qe(e) {
	return {
		light: "mdi:lightbulb-group",
		climate: "mdi:thermostat",
		media_player: "mdi:speaker-multiple",
		camera: "mdi:cctv",
		lock: "mdi:shield-lock-outline",
		cover: "mdi:blinds",
		vacuum: "mdi:robot-vacuum"
	}[e] || "mdi:home-outline";
}
function Je(e, t, n) {
	if (t.schemaVersion !== 2 || t.status !== "published") return e;
	let r = Object.values(t.areas || {}), i = r.map((e) => {
		let t = [...new Set(e.widgets.filter((e) => e.visible).map((e) => e.type))];
		return {
			id: e.id,
			areaIds: [e.id],
			name: e.name,
			icon: qe(t[0] || ""),
			subtitle: t.map((e) => e.replace("media_player", "מדיה").replace("climate", "אקלים").replace("light", "תאורה")).join(" · "),
			legacyPath: e.id
		};
	}), a = {}, o = { ...e.backgrounds };
	for (let e of r) {
		let t = [...e.widgets].filter((e) => e.visible).sort((e, t) => e.order - t.order), r = (e) => t.filter((t) => t.type === e).flatMap((e) => e.entityIds || []), i = r("light").map((e) => ({
			entity: e,
			name: String(n?.states[e]?.attributes.friendly_name || e.split(".")[1]?.replaceAll("_", " ") || e),
			icon: "mdi:lightbulb-outline"
		}));
		a[e.id] = {
			climate: r("climate")[0],
			media: r("media_player")[0],
			lights: i,
			curtains: r("cover").map((e) => ({
				entity: e,
				name: String(n?.states[e]?.attributes.friendly_name || e),
				icon: "mdi:blinds",
				kind: "curtain"
			})),
			statusDomains: [
				"light",
				"climate",
				"media_player",
				"security"
			].filter((e) => e === "security" ? t.some((e) => [
				"camera",
				"lock",
				"alarm_control_panel",
				"binary_sensor"
			].includes(e.type)) : r(e).length > 0)
		}, e.picture && (o[e.id] = e.picture);
	}
	let s = t.theme?.tokens || {};
	return {
		...e,
		rooms: i,
		roomDefinitions: a,
		backgrounds: o,
		appearance: {
			...e.appearance,
			...typeof s.accent == "string" ? {
				accent: s.accent,
				sidebarAccent: s.accent
			} : {},
			...typeof s.surface == "string" ? {
				sectionColor: s.surface,
				tileColor: s.surface
			} : {},
			...typeof s.text == "string" ? { textColor: s.text } : {}
		}
	};
}
async function Ye() {
	if (!location.pathname.includes("/api/hassio_ingress/")) return null;
	try {
		let e = await fetch(`./api/runtime-project?t=${Date.now()}`, { cache: "no-store" });
		return e.ok ? await e.json() : null;
	} catch {
		return null;
	}
}
function Xe({ hass: e, narrow: t }) {
	let [n, r] = (0, _.useState)(y), [i, a] = (0, _.useState)(null), [o, s] = (0, _.useState)(/* @__PURE__ */ new Date()), [c, l] = (0, _.useState)(!1), [u, d] = (0, _.useState)("home"), [f, p] = (0, _.useState)(y.appearance), [m, h] = (0, _.useState)(!1), [g, v] = (0, _.useState)(null), [b, S] = (0, _.useState)({}), [C, w] = (0, _.useState)({}), [ee, T] = (0, _.useState)(null), [E, D] = (0, _.useState)({}), [ne, O] = (0, _.useState)({}), [re, ie] = (0, _.useState)(null), [ae, oe] = (0, _.useState)(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? !0), [k, A] = (0, _.useState)(() => new URLSearchParams(location.search).has("kiosk")), [se, ce] = (0, _.useState)(() => {
		try {
			return JSON.parse(localStorage.getItem("homeii-hidden-by-room") || "{}");
		} catch {
			return {};
		}
	}), [le, ue] = (0, _.useState)(() => {
		try {
			let e = localStorage.getItem("homeii-camera-selection");
			return e === null ? null : JSON.parse(e);
		} catch {
			return null;
		}
	}), [j, M] = (0, _.useState)(null);
	(0, _.useEffect)(() => {
		Promise.all([Ke(), Ye()]).then(([t, n]) => {
			let i = n ? Je(t, n, e) : t;
			r(i);
			let a = localStorage.getItem("homeiios-appearance");
			p(a ? {
				...i.appearance,
				...JSON.parse(a)
			} : i.appearance);
		});
	}, [!!e]), (0, _.useEffect)(() => {
		let t = () => Promise.all([Ke(), Ye()]).then(([t, n]) => r(n ? Je(t, n, e) : t));
		return window.addEventListener("homeii-project-published", t), () => window.removeEventListener("homeii-project-published", t);
	}, [!!e]), (0, _.useEffect)(() => {
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => oe(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []), (0, _.useEffect)(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 3e4);
		return () => window.clearInterval(e);
	}, []), (0, _.useEffect)(() => {
		let e = () => {
			!document.fullscreenElement && k && A(!1);
		};
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, [k]), (0, _.useEffect)(() => {
		let e = 0, t = (t) => {
			let n = t.detail;
			M(n), window.clearTimeout(e), e = window.setTimeout(() => M(null), 2600);
		};
		return window.addEventListener("homeii-feedback", t), () => {
			window.removeEventListener("homeii-feedback", t), window.clearTimeout(e);
		};
	}, []), (0, _.useEffect)(() => {
		if (!e?.callWS) return;
		let t = !1;
		return Promise.all([
			e.callWS({ type: "config/area_registry/list" }),
			e.callWS({ type: "config/entity_registry/list" }),
			e.callWS({ type: "config/device_registry/list" })
		]).then(([e, r, i]) => {
			if (t) return;
			let a = new Set(e.map((e) => e.area_id)), o = new Map(i.map((e) => [e.id, e.area_id || null])), s = {
				light: [],
				climate: [],
				media_player: [],
				security: [],
				person: []
			}, c = {}, l = {};
			e.forEach((e) => {
				c[e.area_id] = {
					light: [],
					climate: [],
					media_player: [],
					security: [],
					person: []
				}, l[e.area_id] = {
					temperature: [],
					humidity: []
				};
			}), r.forEach((e) => {
				let t = e.area_id || (e.device_id ? o.get(e.device_id) : null);
				if (!t || !a.has(t) || e.disabled_by) return;
				let n = e.entity_id.split(".", 1)[0];
				n === "sensor" && e.original_device_class === "temperature" && l[t].temperature.push(e.entity_id), n === "sensor" && e.original_device_class === "humidity" && l[t].humidity.push(e.entity_id);
				let r = [
					"binary_sensor",
					"camera",
					"lock",
					"alarm_control_panel"
				].includes(n) ? "security" : n;
				r in s && (s[r].push(e.entity_id), c[t][r].push(e.entity_id));
			}), T(s);
			let u = (e) => e.toLocaleLowerCase("he").replace(/[\s_-]+/g, ""), d = {}, f = {};
			n.rooms.forEach((t) => {
				let n = e.filter((e) => t.areaIds?.includes(e.area_id) || [
					t.id,
					t.legacyPath,
					t.name
				].some((t) => u(t) === u(e.area_id) || u(t) === u(e.name)));
				if (!n.length) return;
				let r = {
					light: [],
					climate: [],
					media_player: [],
					security: [],
					person: []
				};
				n.forEach((e) => Object.keys(r).forEach((t) => r[t].push(...c[e.area_id][t]))), Object.keys(r).forEach((e) => r[e] = [...new Set(r[e])]), d[t.id] = r, f[t.id] = {
					temperature: n.flatMap((e) => l[e.area_id].temperature)[0],
					humidity: n.flatMap((e) => l[e.area_id].humidity)[0]
				};
			}), D(d), O(f);
		}).catch(() => T(null)), () => {
			t = !0;
		};
	}, [e?.callWS, n.rooms]);
	let de = !!e?.user?.is_admin, fe = o.getHours(), pe = fe < 6 ? "night" : fe < 12 ? "morning" : fe < 18 ? "day" : "evening", me = We(e, n.entities.temperature), N = We(e, n.entities.power), he = We(e, n.entities.intercomCount), ge = We(e, n.entities.nightMode), _e = We(e, n.entities.allLights), ve = e?.user?.name?.split(" ")[0] || "", ye = n.timeBackgrounds?.[pe], be = (u === "home" || u === "livingroom") && ye || n.backgrounds[u] || n.backgrounds.home || y.backgrounds.home, xe = location.port === "5173" ? `/homeiios-livingroom-${pe}.png` : be, Se = f.background || xe, we = (t) => {
		a(null), e?.navigate ? e.navigate(t) : history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed"));
	}, P = (e) => {
		ie(null), d(e), a(null), l(!1), window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, Te = (e) => {
		p(e), localStorage.setItem("homeiios-appearance", JSON.stringify(e));
	}, Ee = (e, t) => ce((n) => {
		let r = {
			...n,
			[e]: t
		};
		return localStorage.setItem("homeii-hidden-by-room", JSON.stringify(r)), r;
	}), De = (e) => {
		ue(e), localStorage.setItem("homeii-camera-selection", JSON.stringify(e));
	}, Oe = () => {
		let e = {
			schema: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			appearance: f,
			hiddenByRoom: se,
			cameraSelection: le,
			roomStatus: Object.fromEntries(n.rooms.map((e) => [e.id, {
				status: JSON.parse(localStorage.getItem(`homeii-status-${e.id}`) || "null"),
				zones: JSON.parse(localStorage.getItem(`homeii-zones-${e.id}`) || "null")
			}]))
		}, t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), r = URL.createObjectURL(t), i = document.createElement("a");
		i.href = r, i.download = `homeii-profile-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, i.click(), URL.revokeObjectURL(r);
	}, ke = () => {
		let e = document.createElement("input");
		e.type = "file", e.accept = "application/json", e.onchange = async () => {
			let t = e.files?.[0];
			if (t) try {
				let e = JSON.parse(await t.text());
				if (e.schema !== 1 || typeof e.hiddenByRoom != "object") throw Error("invalid");
				e.appearance && Te({
					...f,
					...e.appearance
				}), ce(e.hiddenByRoom), localStorage.setItem("homeii-hidden-by-room", JSON.stringify(e.hiddenByRoom)), Array.isArray(e.cameraSelection) && De(e.cameraSelection), e.roomStatus && Object.entries(e.roomStatus).forEach(([e, t]) => {
					t.status && localStorage.setItem(`homeii-status-${e}`, JSON.stringify(t.status)), t.zones && localStorage.setItem(`homeii-zones-${e}`, JSON.stringify(t.zones));
				}), window.dispatchEvent(new CustomEvent("homeii-feedback", { detail: {
					message: "פרופיל HOMEii יובא בהצלחה",
					type: "success"
				} }));
			} catch {
				window.dispatchEvent(new CustomEvent("homeii-feedback", { detail: {
					message: "קובץ הפרופיל אינו תקין",
					type: "error"
				} }));
			}
		}, e.click();
	}, Ae = async () => {
		let t = n.branding || y.branding;
		t.animation === "spin" && (h(!1), requestAnimationFrame(() => h(!0)), window.setTimeout(() => h(!1), 720));
		let r = t.action;
		if (r.type === "view" && P(r.target), r.type === "navigate" && we(r.target), r.type === "service" && e) {
			let [t, n] = r.target.split(".", 2);
			t && n && await e.callService(t, n, r.data || {}, r.entityId ? { entity_id: r.entityId } : void 0);
		}
	}, je = async () => {
		if (k) {
			A(!1), document.fullscreenElement && await document.exitFullscreen?.();
			return;
		}
		A(!0);
		try {
			await document.documentElement.requestFullscreen?.();
		} catch {}
	}, Me = async (t) => {
		!e || !t || await e.callService("homeassistant", "toggle", {}, { entity_id: t });
	}, Ne = async () => {
		!e || !n.entities.restoreScene || await e.callService("scene", "turn_on", {}, { entity_id: n.entities.restoreScene });
	}, Pe = (0, _.useMemo)(() => n.secondary.filter((e) => ["media"].includes(e.id)), [n]), Fe = (0, _.useMemo)(() => n.secondary.filter((e) => ["security", "intercom"].includes(e.id)), [n]), Ie = (0, _.useMemo)(() => n.secondary.filter((e) => e.id !== "media"), [n]), Le = n.rooms.find((e) => e.id === u), F = n.secondary.find((e) => e.id === u), ze = Le || F, Be = f.themeMode === "system" ? ae ? "dark" : "light" : f.themeMode, Ve = (0, _.useMemo)(() => it(n.roomDefinitions || {}), [n.roomDefinitions]), qe = ee || Ve, Xe = Le ? at(E[Le.id], se[Le.id] || []) : void 0, L = Le ? n.roomDefinitions?.[Le.id] || st(E[Le.id], ne[Le.id], e) : void 0, ct = Le && L ? ot(L, se[Le.id] || []) : void 0;
	return /* @__PURE__ */ (0, x.jsxs)("main", {
		className: `app ${k ? "kiosk-mode" : ""} theme-${Be} palette-${Be === "dark" ? f.darkPalette : f.lightPalette} density-${f.densityMode} ${f.highContrast ? "high-contrast" : ""} view-${u} period-${pe} ${t ? "ha-narrow" : ""}`,
		dir: "rtl",
		style: {
			"--hero-image": `url(${xe})`,
			"--app-background-image": `url(${Se})`,
			"--accent": f.accent,
			"--cool": f.coolAccent,
			"--section-color": f.sectionColor,
			"--tile-color": f.tileColor,
			"--surface-alpha": f.surfaceOpacity / 100,
			"--tile-alpha": f.tileOpacity / 100,
			"--text": f.textColor,
			"--rail-accent": f.sidebarAccent,
			"--rail-icon": f.sidebarIconColor,
			"--background-dim": f.backgroundDim / 100,
			"--glass-blur": `${f.blur}px`,
			"--panel-radius": `${f.radius}px`
		},
		children: [
			/* @__PURE__ */ (0, x.jsx)(Ze, {
				rooms: n.rooms,
				activeView: u,
				temperature: Ge(me, "°"),
				power: Ge(N, " W"),
				lightsActive: _e?.state === "on",
				connected: !!e,
				isAdmin: de,
				logo: (n.branding || y.branding).logo,
				spinning: m,
				onBrand: Ae,
				onSettings: () => l(!0),
				onRoom: (e) => P(e.id),
				onHome: () => P("home"),
				onMore: () => a("more")
			}),
			!k && /* @__PURE__ */ (0, x.jsxs)("button", {
				className: "kiosk-fab glass-soft",
				onClick: je,
				"aria-label": "מצב מסך מלא",
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:fullscreen" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "מסך מלא" })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("section", {
				className: "content-shell",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("header", {
						className: "topbar",
						children: [/* @__PURE__ */ (0, x.jsxs)("button", {
							className: "brand",
							onClick: Ae,
							"aria-label": "HOMEii",
							children: [/* @__PURE__ */ (0, x.jsx)("span", {
								className: `brand-mark ${m ? "is-spinning" : ""}`,
								children: /* @__PURE__ */ (0, x.jsx)("img", {
									src: (n.branding || y.branding).logo,
									alt: ""
								})
							}), /* @__PURE__ */ (0, x.jsx)("span", { children: "HOMEii" })]
						}), /* @__PURE__ */ (0, x.jsxs)("div", {
							className: "topbar-actions",
							children: [
								/* @__PURE__ */ (0, x.jsx)("button", {
									className: "icon-button kiosk-toggle",
									"aria-label": k ? "ביטול קיוסק" : "מצב מסך מלא",
									onClick: je,
									children: /* @__PURE__ */ (0, x.jsx)(I, { icon: k ? "mdi:fullscreen-exit" : "mdi:fullscreen" })
								}),
								/* @__PURE__ */ (0, x.jsx)("span", {
									className: `connection ${e ? "online" : "offline"}`,
									children: e ? "מחובר" : "ממתין ל־HA"
								}),
								de && /* @__PURE__ */ (0, x.jsx)("button", {
									className: "icon-button admin-only",
									"aria-label": "ניהול",
									onClick: () => l((e) => !e),
									children: /* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:tune-variant" })
								})
							]
						})]
					}),
					k && /* @__PURE__ */ (0, x.jsxs)("button", {
						className: "kiosk-exit glass-soft",
						onClick: je,
						"aria-label": "יציאה ממצב קיוסק",
						children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:fullscreen-exit" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "יציאה מקיוסק" })]
					}),
					c && de && /* @__PURE__ */ (0, x.jsxs)("aside", {
						className: "admin-menu glass",
						"aria-label": "כלי מנהל",
						children: [
							/* @__PURE__ */ (0, x.jsxs)("header", {
								className: "admin-menu-head",
								children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEii Studio" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: "הגדרות הממשק" })] }), /* @__PURE__ */ (0, x.jsx)("button", {
									className: "admin-close",
									onClick: () => l(!1),
									"aria-label": "סגירת הגדרות",
									children: /* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:close" })
								})]
							}),
							/* @__PURE__ */ (0, x.jsx)("p", { children: "עריכת המבנה נעשית בקובץ config.json. משתמשים רגילים אינם רואים תפריט זה." }),
							/* @__PURE__ */ (0, x.jsxs)("button", {
								className: "studio-launch",
								onClick: () => {
									l(!1), d("studio");
								},
								children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:view-dashboard-outline" }), " פתיחת HOMEii Studio"]
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => we("/config/dashboard"),
								children: "ניהול דשבורדים"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => Ke().then(r),
								children: "טעינה מחדש של התצורה"
							}),
							/* @__PURE__ */ (0, x.jsxs)("button", {
								onClick: je,
								children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:fullscreen" }), " מצב מסך מלא · Kiosk"]
							}),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "profile-actions",
								children: [/* @__PURE__ */ (0, x.jsxs)("button", {
									onClick: Oe,
									children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:tray-arrow-down" }), "ייצוא פרופיל"]
								}), /* @__PURE__ */ (0, x.jsxs)("button", {
									onClick: ke,
									children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:tray-arrow-up" }), "ייבוא פרופיל"]
								})]
							}),
							/* @__PURE__ */ (0, x.jsx)(rt, {
								value: f,
								presets: n.backgroundPresets || y.backgroundPresets || [],
								onChange: Te
							}),
							/* @__PURE__ */ (0, x.jsx)(Re, {
								hass: e,
								rooms: n.rooms,
								roomEntities: E,
								hiddenByRoom: se,
								cameraSelection: le,
								onHiddenChange: Ee,
								onCameraChange: De
							})
						]
					}),
					u === "studio" ? /* @__PURE__ */ (0, x.jsx)(He, {
						hass: e,
						onClose: () => P("home")
					}) : u === "home" ? /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsxs)("section", {
						className: "hero",
						"aria-label": "מצב הבית",
						children: [
							/* @__PURE__ */ (0, x.jsx)("div", { className: "hero-overlay" }),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "hero-copy",
								children: [
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: "eyebrow",
										children: [Ue(fe), ve ? `, ${ve}` : ""]
									}),
									/* @__PURE__ */ (0, x.jsx)("h1", { children: n.homeTitle }),
									/* @__PURE__ */ (0, x.jsx)("p", { children: new Intl.DateTimeFormat("he-IL", {
										weekday: "long",
										day: "numeric",
										month: "long"
									}).format(o) })
								]
							}),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "hero-time",
								children: [/* @__PURE__ */ (0, x.jsx)("time", { children: new Intl.DateTimeFormat("he-IL", {
									hour: "2-digit",
									minute: "2-digit",
									hour12: !1
								}).format(o) }), /* @__PURE__ */ (0, x.jsxs)("span", { children: [
									/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:weather-partly-cloudy" }),
									" ",
									Ge(me, "°")
								] })]
							}),
							/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "hero-status glass-soft",
								children: [
									/* @__PURE__ */ (0, x.jsx)(pt, {
										icon: "mdi:lightbulb-group",
										label: "תאורה",
										value: _e?.state === "on" ? "פעילה" : "כבויה",
										active: _e?.state === "on"
									}),
									/* @__PURE__ */ (0, x.jsx)(pt, {
										icon: "mdi:flash",
										label: "צריכה",
										value: Ge(N, " W")
									}),
									/* @__PURE__ */ (0, x.jsx)(pt, {
										icon: "mdi:doorbell-video",
										label: "כניסה",
										value: Ge(he)
									})
								]
							}),
							/* @__PURE__ */ (0, x.jsx)(lt, {
								hass: e,
								areaEntities: qe,
								open: g,
								snapshot: b,
								onOpen: (e, t) => {
									S((n) => ({
										...n,
										[e]: t.length
									})), w((n) => ({
										...n,
										[e]: t
									})), v(e);
								}
							}),
							/* @__PURE__ */ (0, x.jsx)(dt, {
								onCinema: () => {
									ie("cinema"), d("livingroom");
								},
								onClimate: () => {
									ie("climate"), d("livingroom");
								},
								onAway: () => a("security")
							})
						]
					}), /* @__PURE__ */ (0, x.jsxs)("section", {
						className: "control-grid",
						children: [/* @__PURE__ */ (0, x.jsxs)("section", {
							className: "quick-panel glass",
							children: [/* @__PURE__ */ (0, x.jsx)(ft, {
								title: "פעולות מהירות",
								subtitle: "הפעולות היומיומיות במקום אחד"
							}), /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "quick-actions",
								children: [
									/* @__PURE__ */ (0, x.jsx)(mt, {
										icon: "mdi:weather-night",
										label: "מצב לילה",
										active: ge?.state === "on",
										onClick: () => Me(n.entities.nightMode)
									}),
									/* @__PURE__ */ (0, x.jsx)(mt, {
										icon: "mdi:lightbulb-group",
										label: "כל התאורה",
										active: _e?.state === "on",
										onClick: () => Me(n.entities.allLights)
									}),
									/* @__PURE__ */ (0, x.jsx)(mt, {
										icon: "mdi:restore",
										label: "שחזור",
										onClick: Ne
									}),
									/* @__PURE__ */ (0, x.jsx)(mt, {
										icon: "mdi:cctv",
										label: "מצלמות",
										onClick: () => a("security")
									})
								]
							})]
						}), /* @__PURE__ */ (0, x.jsxs)("section", {
							className: "context-panel glass",
							children: [/* @__PURE__ */ (0, x.jsx)(ft, {
								title: "עכשיו בבית",
								subtitle: "מידע שדורש תשומת לב"
							}), /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "context-list",
								children: [
									/* @__PURE__ */ (0, x.jsx)(ht, {
										icon: "mdi:thermometer",
										label: "טמפרטורה בחוץ",
										value: Ge(me, "°")
									}),
									/* @__PURE__ */ (0, x.jsx)(ht, {
										icon: "mdi:flash",
										label: "צריכה נוכחית",
										value: Ge(N, " W")
									}),
									/* @__PURE__ */ (0, x.jsx)(ht, {
										icon: "mdi:doorbell-video",
										label: "זוהו בכניסה",
										value: Ge(he)
									})
								]
							})]
						})]
					})] }) : Le && ct ? /* @__PURE__ */ (0, x.jsx)(te, {
						room: Le,
						definition: ct,
						areaEntities: Xe,
						hass: e,
						isAdmin: de,
						intent: re,
						onHome: () => P("home")
					}) : ze ? F ? /* @__PURE__ */ (0, x.jsx)(Ce, {
						item: F,
						hass: e,
						legacyDashboardPath: n.legacyDashboardPath,
						cameraSelection: le,
						onHome: () => P("home")
					}) : /* @__PURE__ */ (0, x.jsx)(nt, {
						item: ze,
						legacyDashboardPath: n.legacyDashboardPath,
						onHome: () => P("home")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, x.jsx)(Qe, {
				activeView: u,
				onHome: () => P("home"),
				onSelect: a
			}),
			/* @__PURE__ */ (0, x.jsxs)($e, {
				title: i === "rooms" ? "חדרים" : i === "media" ? "מדיה" : i === "security" ? "אבטחה" : "עוד",
				open: i !== null,
				onClose: () => a(null),
				children: [
					i === "rooms" && /* @__PURE__ */ (0, x.jsx)(et, {
						rooms: n.rooms,
						onSelect: (e) => P(e.id)
					}),
					i === "media" && /* @__PURE__ */ (0, x.jsx)(tt, {
						links: Pe,
						onSelect: (e) => P(e.id)
					}),
					i === "security" && /* @__PURE__ */ (0, x.jsx)(tt, {
						links: Fe,
						onSelect: (e) => P(e.id)
					}),
					i === "more" && /* @__PURE__ */ (0, x.jsx)(tt, {
						links: Ie,
						onSelect: (e) => P(e.id)
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsx)(ut, {
				domain: g,
				hass: e,
				entityIds: g && C[g] || [],
				onClose: () => v(null)
			}),
			j && /* @__PURE__ */ (0, x.jsxs)("div", {
				className: `global-feedback ${j.type}`,
				role: "status",
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: j.type === "success" ? "mdi:check-circle" : j.type === "error" ? "mdi:alert-circle" : "mdi:progress-clock" }), /* @__PURE__ */ (0, x.jsx)("span", { children: j.message })]
			})
		]
	});
}
function Ze({ rooms: e, activeView: t, temperature: n, power: r, lightsActive: i, connected: a, isAdmin: o, logo: s, spinning: c, onBrand: l, onSettings: u, onRoom: d, onHome: f, onMore: p }) {
	return /* @__PURE__ */ (0, x.jsxs)("nav", {
		className: "desktop-rail glass",
		"aria-label": "ניווט ראשי",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("button", {
				className: `rail-brand ${t === "home" ? "active" : ""}`,
				onClick: () => {
					f(), l();
				},
				"aria-label": "HOMEii · מסך הבית",
				children: [/* @__PURE__ */ (0, x.jsx)("span", {
					className: `brand-mark ${c ? "is-spinning" : ""}`,
					children: /* @__PURE__ */ (0, x.jsx)("img", {
						src: s,
						alt: ""
					})
				}), /* @__PURE__ */ (0, x.jsx)("strong", { children: "HOMEii" })]
			}),
			/* @__PURE__ */ (0, x.jsx)("div", { className: "rail-divider" }),
			/* @__PURE__ */ (0, x.jsx)("span", {
				className: "rail-label",
				children: "חדרים"
			}),
			/* @__PURE__ */ (0, x.jsx)("div", {
				className: "rail-rooms",
				children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
					className: t === e.id ? "active" : "",
					onClick: () => d(e),
					title: e.subtitle,
					children: [/* @__PURE__ */ (0, x.jsx)(S, { name: C(e.id, e.name) }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.name })]
				}, e.id))
			}),
			/* @__PURE__ */ (0, x.jsxs)("section", {
				className: "rail-live",
				"aria-label": "מצב הבית עכשיו",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: "rail-weather",
						children: [
							/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:weather-partly-cloudy" }),
							/* @__PURE__ */ (0, x.jsx)("b", { children: n }),
							/* @__PURE__ */ (0, x.jsx)("small", { children: "בחוץ" })
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: "rail-power",
						children: [
							/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:flash" }),
							/* @__PURE__ */ (0, x.jsx)("b", { children: r }),
							/* @__PURE__ */ (0, x.jsx)("small", { children: "צריכה" })
						]
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: `rail-lights ${i ? "is-on" : ""}`,
						children: [
							/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:lightbulb-group" }),
							/* @__PURE__ */ (0, x.jsx)("b", { children: i ? "פעיל" : "כבוי" }),
							/* @__PURE__ */ (0, x.jsx)("small", { children: "תאורה" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "rail-system",
				children: [
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: a ? "online" : "offline",
						title: a ? "מחובר" : "לא מחובר",
						children: /* @__PURE__ */ (0, x.jsx)("i", {})
					}),
					o && /* @__PURE__ */ (0, x.jsx)("button", {
						onClick: u,
						"aria-label": "הגדרות",
						children: /* @__PURE__ */ (0, x.jsx)(S, { name: "settings" })
					}),
					/* @__PURE__ */ (0, x.jsx)("button", {
						onClick: p,
						"aria-label": "אפשרויות נוספות",
						children: /* @__PURE__ */ (0, x.jsx)(S, { name: "more" })
					})
				]
			})
		]
	});
}
function Qe({ activeView: e, onHome: t, onSelect: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("nav", {
		className: "mobile-nav glass",
		"aria-label": "ניווט לנייד",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("button", {
				className: e === "home" ? "active" : "",
				onClick: t,
				children: [/* @__PURE__ */ (0, x.jsx)(S, { name: "home" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "בית" })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("button", {
				onClick: () => n("rooms"),
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:floor-plan" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "חדרים" })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("button", {
				onClick: () => n("media"),
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:play-circle-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "מדיה" })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("button", {
				onClick: () => n("security"),
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:shield-home-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "אבטחה" })]
			}),
			/* @__PURE__ */ (0, x.jsxs)("button", {
				onClick: () => n("more"),
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:dots-horizontal-circle-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "עוד" })]
			})
		]
	});
}
function $e({ title: e, open: t, onClose: n, children: r }) {
	return t ? /* @__PURE__ */ (0, x.jsx)("div", {
		className: "sheet-layer",
		role: "presentation",
		onMouseDown: (e) => e.target === e.currentTarget && n(),
		children: /* @__PURE__ */ (0, x.jsxs)("section", {
			className: "bottom-sheet glass",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": e,
			children: [
				/* @__PURE__ */ (0, x.jsx)("div", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, x.jsxs)("header", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: e }), /* @__PURE__ */ (0, x.jsx)("button", {
					className: "icon-button",
					onClick: n,
					"aria-label": "סגירה",
					children: /* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:close" })
				})] }),
				r
			]
		})
	}) : null;
}
function et({ rooms: e, onSelect: t }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "sheet-grid",
		children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
			className: "sheet-item",
			onClick: () => t(e),
			children: [
				/* @__PURE__ */ (0, x.jsx)("span", {
					className: "sheet-icon",
					children: /* @__PURE__ */ (0, x.jsx)(I, { icon: e.icon })
				}),
				/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, x.jsx)("small", { children: e.subtitle })] }),
				/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:chevron-left" })
			]
		}, e.id))
	});
}
function tt({ links: e, onSelect: t }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "sheet-grid",
		children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
			className: "sheet-item",
			onClick: () => t(e),
			children: [
				/* @__PURE__ */ (0, x.jsx)("span", {
					className: "sheet-icon",
					children: /* @__PURE__ */ (0, x.jsx)(I, { icon: e.icon })
				}),
				/* @__PURE__ */ (0, x.jsx)("strong", { children: e.name }),
				/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:chevron-left" })
			]
		}, e.id))
	});
}
function nt({ item: e, legacyDashboardPath: t, onHome: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: "workspace-view",
		children: [/* @__PURE__ */ (0, x.jsxs)("header", {
			className: "workspace-header glass",
			children: [/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "workspace-title",
				children: [/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(I, { icon: e.icon }) }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEiiOS" }), /* @__PURE__ */ (0, x.jsx)("h1", { children: e.name })] })]
			}), /* @__PURE__ */ (0, x.jsxs)("button", {
				className: "home-return",
				onClick: n,
				children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:home-rounded" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "חזרה לבית" })]
			})]
		}), /* @__PURE__ */ (0, x.jsx)("div", {
			className: "workspace-frame glass",
			children: /* @__PURE__ */ (0, x.jsx)("iframe", {
				title: e.name,
				src: `${t}/${e.legacyPath}?kiosk`,
				loading: "lazy",
				allow: "autoplay; fullscreen; microphone"
			})
		})]
	});
}
function rt({ value: e, presets: t, onChange: n }) {
	let r = (t, r) => n({
		...e,
		[t]: r
	});
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: "appearance-editor",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "appearance-group",
				children: [
					/* @__PURE__ */ (0, x.jsx)("h3", { children: "תצוגה ונגישות" }),
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "appearance-segments",
						"aria-label": "ערכת צבע",
						children: [
							"system",
							"dark",
							"light"
						].map((t) => /* @__PURE__ */ (0, x.jsx)("button", {
							className: e.themeMode === t ? "selected" : "",
							onClick: () => r("themeMode", t),
							children: t === "system" ? "מערכת" : t === "dark" ? "כהה" : "בהירה"
						}, t))
					}),
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: "setting-caption",
						children: "גווני ערכה כהה"
					}),
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "appearance-segments palette-segments",
						children: [
							[
								"rich-brown",
								"חום עשיר",
								"#241914",
								"#3a2921",
								"#fff8f2",
								"#e6a96f",
								"#efb478",
								"#8fbef5"
							],
							[
								"night-blue",
								"כחול לילה",
								"#111c2e",
								"#1d2b42",
								"#f4f8ff",
								"#83bfff",
								"#e8b875",
								"#82bfff"
							],
							[
								"granite",
								"גרניט",
								"#1a1c20",
								"#292c31",
								"#f5f5f4",
								"#c4ccd8",
								"#e2b67c",
								"#a9c7ed"
							]
						].map(([t, r, i, a, o, s, c, l]) => /* @__PURE__ */ (0, x.jsx)("button", {
							className: e.darkPalette === t ? "selected" : "",
							onClick: () => n({
								...e,
								themeMode: "dark",
								darkPalette: t,
								sectionColor: i,
								tileColor: a,
								textColor: o,
								sidebarAccent: s,
								sidebarIconColor: o,
								accent: c,
								coolAccent: l
							}),
							children: r
						}, t))
					}),
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: "setting-caption",
						children: "גווני ערכה בהירה"
					}),
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "appearance-segments palette-segments",
						children: [
							[
								"bright-white",
								"לבן",
								"#ffffff",
								"#e9eef5",
								"#111827",
								"#3978c5",
								"#b87528",
								"#3978c5"
							],
							[
								"cream",
								"שמנת",
								"#fffaf1",
								"#eae0d1",
								"#302820",
								"#a66f3f",
								"#b87831",
								"#4d7fac"
							],
							[
								"ivory",
								"אייבורי",
								"#faf7ed",
								"#e5dfd2",
								"#292722",
								"#8a744c",
								"#a77431",
								"#517da6"
							],
							[
								"mocha",
								"מוקה",
								"#f3e9df",
								"#d9c9bb",
								"#332923",
								"#9b684e",
								"#a6633e",
								"#607c9a"
							]
						].map(([t, r, i, a, o, s, c, l]) => /* @__PURE__ */ (0, x.jsx)("button", {
							className: e.lightPalette === t ? "selected" : "",
							onClick: () => n({
								...e,
								themeMode: "light",
								lightPalette: t,
								sectionColor: i,
								tileColor: a,
								textColor: o,
								sidebarAccent: s,
								sidebarIconColor: o,
								accent: c,
								coolAccent: l
							}),
							children: r
						}, t))
					}),
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "appearance-segments",
						"aria-label": "צפיפות",
						children: ["comfort", "compact"].map((t) => /* @__PURE__ */ (0, x.jsx)("button", {
							className: e.densityMode === t ? "selected" : "",
							onClick: () => r("densityMode", t),
							children: t === "comfort" ? "נוחה" : "קומפקטית"
						}, t))
					}),
					/* @__PURE__ */ (0, x.jsxs)("label", {
						className: "contrast-toggle",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "ניגודיות מוגברת" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "checkbox",
							checked: e.highContrast,
							onChange: (e) => r("highContrast", e.target.checked)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "appearance-group",
				children: [/* @__PURE__ */ (0, x.jsx)("h3", { children: "צבעי הממשק" }), /* @__PURE__ */ (0, x.jsxs)("div", {
					className: "color-fields",
					children: [
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "צבע חם" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.accent,
							onChange: (e) => r("accent", e.target.value)
						})] }),
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "צבע משני" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.coolAccent,
							onChange: (e) => r("coolAccent", e.target.value)
						})] }),
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "רקע Sections" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.sectionColor,
							onChange: (e) => r("sectionColor", e.target.value)
						})] }),
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "צבע אריחים" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.tileColor,
							onChange: (e) => r("tileColor", e.target.value)
						})] }),
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "צבע טקסט" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.textColor,
							onChange: (e) => r("textColor", e.target.value)
						})] }),
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "הדגשה בסרגל" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.sidebarAccent,
							onChange: (e) => r("sidebarAccent", e.target.value)
						})] }),
						/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "אייקונים בסרגל" }), /* @__PURE__ */ (0, x.jsx)("input", {
							type: "color",
							value: e.sidebarIconColor,
							onChange: (e) => r("sidebarIconColor", e.target.value)
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "appearance-group",
				children: [
					/* @__PURE__ */ (0, x.jsx)("h3", { children: "זכוכית ומשטחים" }),
					/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: [
						"שקיפות משטחים · ",
						e.surfaceOpacity,
						"%"
					] }), /* @__PURE__ */ (0, x.jsx)("input", {
						type: "range",
						min: "20",
						max: "96",
						value: e.surfaceOpacity,
						onChange: (e) => r("surfaceOpacity", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: [
						"שקיפות אריחים · ",
						e.tileOpacity,
						"%"
					] }), /* @__PURE__ */ (0, x.jsx)("input", {
						type: "range",
						min: "12",
						max: "100",
						value: e.tileOpacity,
						onChange: (e) => r("tileOpacity", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: [
						"כהות רקע הממשק · ",
						e.backgroundDim,
						"%"
					] }), /* @__PURE__ */ (0, x.jsx)("input", {
						type: "range",
						min: "0",
						max: "80",
						value: e.backgroundDim,
						onChange: (e) => r("backgroundDim", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: [
						"טשטוש · ",
						e.blur,
						"px"
					] }), /* @__PURE__ */ (0, x.jsx)("input", {
						type: "range",
						min: "0",
						max: "40",
						value: e.blur,
						onChange: (e) => r("blur", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: [
						"עיגול פינות · ",
						e.radius,
						"px"
					] }), /* @__PURE__ */ (0, x.jsx)("input", {
						type: "range",
						min: "8",
						max: "38",
						value: e.radius,
						onChange: (e) => r("radius", Number(e.target.value))
					})] })
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "appearance-group",
				children: [
					/* @__PURE__ */ (0, x.jsx)("h3", { children: "רקע המערכת" }),
					/* @__PURE__ */ (0, x.jsxs)("label", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "תמונת רקע או נתיב `/local`" }), /* @__PURE__ */ (0, x.jsx)("input", {
						className: "text-input",
						type: "text",
						value: e.background,
						placeholder: "/local/homeiios/my-background.webp",
						onChange: (e) => r("background", e.target.value)
					})] }),
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "background-presets",
						"aria-label": "רקעים מוכנים",
						children: t.map((t) => /* @__PURE__ */ (0, x.jsx)("button", {
							className: e.background === t.image ? "selected" : "",
							style: t.image ? { backgroundImage: `linear-gradient(rgba(4,7,12,.18),rgba(4,7,12,.35)),url(${t.image})` } : void 0,
							onClick: () => r("background", t.image),
							children: /* @__PURE__ */ (0, x.jsx)("span", { children: t.name })
						}, t.id))
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsx)("button", {
				onClick: () => n(y.appearance),
				children: "איפוס עיצוב במכשיר זה"
			}),
			/* @__PURE__ */ (0, x.jsx)("small", { children: "השינויים נשמרים מקומית בדפדפן. שמירה מערכתית תתווסף לעורך המרכזי." })
		]
	});
}
function it(e) {
	let t = (e) => [...new Set(e.filter(Boolean))], n = Object.values(e);
	return {
		light: t(n.flatMap((e) => e.lights.map((e) => e.entity))),
		climate: t(n.map((e) => e.climate)),
		media_player: t(n.map((e) => e.media)),
		security: [],
		person: []
	};
}
function at(e, t) {
	if (!e) return;
	let n = new Set(t);
	return Object.fromEntries(Object.keys(e).map((t) => [t, e[t].filter((e) => !n.has(e))]));
}
function ot(e, t) {
	let n = new Set(t);
	return {
		...e,
		climate: e.climate && !n.has(e.climate) ? e.climate : void 0,
		temperature: e.temperature && !n.has(e.temperature) ? e.temperature : void 0,
		humidity: e.humidity && !n.has(e.humidity) ? e.humidity : void 0,
		lights: e.lights.filter((e) => !n.has(e.entity)),
		curtains: e.curtains?.filter((e) => !n.has(e.entity)),
		media: e.media && !n.has(e.media) ? e.media : void 0
	};
}
function st(e, t, n) {
	if (e) return {
		climate: e.climate[0],
		temperature: t?.temperature,
		humidity: t?.humidity,
		lights: e.light.map((e) => ({
			entity: e,
			name: String(n?.states[e]?.attributes.friendly_name || e),
			icon: "mdi:lightbulb-outline"
		})),
		media: e.media_player[0],
		scenes: [],
		statusDomains: [
			"light",
			"climate",
			"media_player",
			"security"
		].filter((t) => e[t].length)
	};
}
var L = {
	light: {
		label: "תאורה",
		icon: "mdi:lightbulb-group",
		active: "מוקדים פעילים",
		empty: "הכול כבוי"
	},
	climate: {
		label: "אקלים",
		icon: "mdi:snowflake-thermometer",
		active: "מזגנים פעילים",
		empty: "הכול כבוי"
	},
	media_player: {
		label: "מדיה",
		icon: "mdi:play-circle",
		active: "נגנים פעילים",
		empty: "אין נגינה"
	},
	security: {
		label: "ביטחון",
		icon: "mdi:shield-home",
		active: "פריטים דורשים בדיקה",
		empty: "הכול תקין"
	},
	person: {
		label: "בבית",
		icon: "mdi:account-group",
		active: "אנשים בבית",
		empty: "הבית ריק"
	}
};
function ct(e, t) {
	return !t || ["unknown", "unavailable"].includes(t.state) ? !1 : e === "light" ? t.state === "on" : e === "climate" ? t.state !== "off" : e === "media_player" ? [
		"playing",
		"paused",
		"buffering"
	].includes(t.state) : e === "security" ? ![
		"off",
		"closed",
		"locked",
		"idle",
		"standby"
	].includes(t.state) : t.state === "home";
}
function lt({ hass: e, areaEntities: t, open: n, snapshot: r, onOpen: i }) {
	let a = Object.keys(e?.states || {}).filter((e) => e.startsWith("person."));
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "status-carousel",
		"aria-label": "מצב הבית",
		children: Object.keys(L).map((o) => {
			let s = o === "person" ? a : t[o], c = s.filter((t) => ct(o, e?.states[t])), l = c.length, u = n ? r[o] ?? l : l, d = L[o];
			return /* @__PURE__ */ (0, x.jsxs)("button", {
				className: `status-card status-${o} ${u ? "active" : "idle"}`,
				onClick: () => i(o, o === "person" ? s : c),
				children: [
					/* @__PURE__ */ (0, x.jsxs)("span", {
						className: "status-card-icon",
						children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: d.icon }), /* @__PURE__ */ (0, x.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: d.label }), /* @__PURE__ */ (0, x.jsx)("strong", { children: u ? `${u} ${d.active}` : d.empty })] }),
					/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:chevron-left" })
				]
			}, o);
		})
	});
}
function ut({ domain: e, hass: t, entityIds: n, onClose: r }) {
	if (!e) return null;
	let i = n, a = L[e];
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "status-dialog-layer",
		onMouseDown: (e) => e.target === e.currentTarget && r(),
		children: /* @__PURE__ */ (0, x.jsxs)("section", {
			className: `status-dialog status-${e}`,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": a.label,
			children: [
				/* @__PURE__ */ (0, x.jsxs)("header", { children: [
					/* @__PURE__ */ (0, x.jsx)("span", {
						className: "status-dialog-icon",
						children: /* @__PURE__ */ (0, x.jsx)(I, { icon: a.icon })
					}),
					/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "מצב הבית בזמן אמת" }), /* @__PURE__ */ (0, x.jsx)("h2", { children: a.label })] }),
					/* @__PURE__ */ (0, x.jsx)("button", {
						onClick: r,
						"aria-label": "סגירה",
						children: /* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:close" })
					})
				] }),
				/* @__PURE__ */ (0, x.jsx)("div", {
					className: "status-entity-list",
					children: i.length ? i.map((n) => {
						let r = t?.states[n], i = ct(e, r), o = e === "person" ? String(r?.state === "home" ? "בבית" : r?.state === "not_home" ? "מחוץ לבית" : r?.state || "לא ידוע") : "";
						return /* @__PURE__ */ (0, x.jsxs)("article", {
							className: i ? "active" : "idle",
							children: [
								/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(I, { icon: e === "person" ? "mdi:account" : a.icon }) }),
								/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: String(r?.attributes.friendly_name || n) }), /* @__PURE__ */ (0, x.jsx)("small", { children: !r || ["unknown", "unavailable"].includes(r.state) ? "לא זמין" : e === "person" ? o : i ? "פעיל עכשיו" : "כבוי" })] }),
								e === "person" ? /* @__PURE__ */ (0, x.jsx)("button", {
									disabled: !r,
									onClick: () => window.dispatchEvent(new CustomEvent("hass-more-info", {
										detail: { entityId: n },
										bubbles: !0,
										composed: !0
									})),
									"aria-label": `הצגת ${String(r?.attributes.friendly_name || n)} במפה`,
									children: /* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:map-marker-radius-outline" })
								}) : /* @__PURE__ */ (0, x.jsx)("button", {
									disabled: !r || ["unknown", "unavailable"].includes(r.state),
									onClick: () => t?.callService("homeassistant", "toggle", {}, { entity_id: n }),
									"aria-label": `${i ? "כיבוי" : "הדלקה"} ${String(r?.attributes.friendly_name || n)}`,
									children: /* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:power" })
								})
							]
						}, n);
					}) : /* @__PURE__ */ (0, x.jsxs)("div", {
						className: "status-empty",
						children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:check-circle-outline" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: a.empty })]
					})
				}),
				/* @__PURE__ */ (0, x.jsxs)("footer", { children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: "mdi:information-outline" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "המספר בכרטיס יתעדכן לאחר סגירת החלון" })] })
			]
		})
	});
}
function dt({ onCinema: e, onClimate: t, onAway: n }) {
	let [r, i] = (0, _.useState)(!1);
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: `flow-launcher ${r ? "open" : ""}`,
		children: [/* @__PURE__ */ (0, x.jsxs)("button", {
			className: "flow-trigger glass-soft",
			onClick: () => i((e) => !e),
			"aria-expanded": r,
			children: [
				/* @__PURE__ */ (0, x.jsx)(S, { name: "cinema" }),
				/* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: "HOMEii Flow" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: "מה עושים עכשיו?" })] }),
				/* @__PURE__ */ (0, x.jsx)(I, { icon: r ? "mdi:chevron-down" : "mdi:chevron-up" })
			]
		}), r && /* @__PURE__ */ (0, x.jsxs)("nav", {
			className: "intent-dock glass-soft",
			"aria-label": "מה תרצו לעשות",
			children: [
				/* @__PURE__ */ (0, x.jsxs)("button", {
					onClick: e,
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(S, { name: "cinema" }) }),
						/* @__PURE__ */ (0, x.jsx)("b", { children: "צפייה" }),
						/* @__PURE__ */ (0, x.jsx)("small", { children: "מדיה ואווירה" })
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("button", {
					onClick: t,
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(S, { name: "climate" }) }),
						/* @__PURE__ */ (0, x.jsx)("b", { children: "נוחות" }),
						/* @__PURE__ */ (0, x.jsx)("small", { children: "אקלים בחדר" })
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("button", {
					onClick: n,
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(S, { name: "away" }) }),
						/* @__PURE__ */ (0, x.jsx)("b", { children: "יוצאים" }),
						/* @__PURE__ */ (0, x.jsx)("small", { children: "בדיקת הבית" })
					]
				})
			]
		})]
	});
}
function ft({ title: e, subtitle: t }) {
	return /* @__PURE__ */ (0, x.jsx)("header", {
		className: "section-heading",
		children: /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: e }), /* @__PURE__ */ (0, x.jsx)("p", { children: t })] })
	});
}
function pt({ icon: e, label: t, value: n, active: r = !1 }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: `status ${r ? "active" : ""}`,
		children: [/* @__PURE__ */ (0, x.jsx)(I, { icon: e }), /* @__PURE__ */ (0, x.jsxs)("span", { children: [/* @__PURE__ */ (0, x.jsx)("small", { children: t }), /* @__PURE__ */ (0, x.jsx)("strong", { children: n })] })]
	});
}
function mt({ icon: e, label: t, active: n = !1, onClick: r }) {
	return /* @__PURE__ */ (0, x.jsxs)("button", {
		className: `action-button ${n ? "active" : ""}`,
		onClick: r,
		children: [/* @__PURE__ */ (0, x.jsx)("span", { children: /* @__PURE__ */ (0, x.jsx)(I, { icon: e }) }), /* @__PURE__ */ (0, x.jsx)("strong", { children: t })]
	});
}
function ht({ icon: e, label: t, value: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "context-row",
		children: [
			/* @__PURE__ */ (0, x.jsx)("span", {
				className: "context-icon",
				children: /* @__PURE__ */ (0, x.jsx)(I, { icon: e })
			}),
			/* @__PURE__ */ (0, x.jsx)("span", { children: t }),
			/* @__PURE__ */ (0, x.jsx)("strong", { children: n })
		]
	});
}
//#endregion
//#region src/styles.css?inline
var gt = "@import \"/local/fonts.css?v=1\";:host,.homeiios-mount{min-height:100%;display:block}*{box-sizing:border-box}button{font:inherit}.app{--bg:#090e17;--surface-alpha:.64;--tile-alpha:.58;--glass-blur:24px;--panel-radius:26px;--surface:rgb(17 24 37/var(--surface-alpha));--surface-strong:#0c121dd1;--line:#ffffff24;--text:#f7f8fb;--muted:#ebf0f89e;--accent:#f6bd72;--cool:#a8ceff;--section-color:#111825;--tile-color:#202a3a;--background-dim:.22;--state-success:#5ed6a3;--state-danger:#ff7474;width:100%;min-height:100vh;color:var(--text);background-color:var(--bg);background-image:linear-gradient(135deg,rgb(5 9 15/var(--background-dim)),rgb(7 11 18/var(--background-dim))),var(--app-background-image),radial-gradient(circle at 20% 0%,#172235 0,transparent 32%);padding:max(18px, env(safe-area-inset-top)) max(18px, env(safe-area-inset-right)) max(18px, env(safe-area-inset-bottom)) max(18px, env(safe-area-inset-left));direction:rtl;background-position:50%;background-size:cover;background-attachment:fixed;font-family:Heebo,Arial,sans-serif;overflow-x:clip}.theme-dark{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}.theme-light{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;--bg:#e8edf3;--text:#142033;--muted:#1420339e;--line:#14203324;--surface:#eef3f8;--surface-strong:#f0f5fadb}.theme-light.app{background-image:linear-gradient(135deg,rgb(255 255 255/var(--background-dim)),rgb(225 233 241/var(--background-dim))),var(--app-background-image)}.theme-light .room-hero,.theme-light .hero{color:#fff}.theme-light .light-control{background:linear-gradient(145deg,color-mix(in srgb,var(--tile-color) 18%,#ffffffe0),color-mix(in srgb,var(--tile-color) 10%,#ffffffc2));border-color:#1420331a}.theme-light .glass-soft{background:#f5f8fc8c;border-color:#ffffffb8}.high-contrast{--muted:#ffffffd1;--line:#ffffff57}.theme-light.high-contrast{--muted:#08111ec7;--line:#08111e47}.high-contrast .light-control,.high-contrast .room-view .glass{border-width:2px}.density-compact{--panel-radius:20px}.density-compact .device-panel,.density-compact .thermostat,.density-compact .media-control,.density-compact .scene-panel{padding:14px}.density-compact .light-control{min-height:96px}.glass{isolation:isolate;background:rgb(from var(--section-color) r g b / var(--surface-alpha));border:1px solid var(--line);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(155%) brightness(1.04);position:relative;box-shadow:inset 0 1px #ffffff21,inset 0 -1px #ffffff09,0 22px 64px #0000003d}.glass:before{content:\"\";z-index:0;pointer-events:none;border-radius:inherit;opacity:.72;background:linear-gradient(125deg,#ffffff29,#0000 22% 68%,#ffffff0e),radial-gradient(circle at 22% -15%,#ffffff2b,#0000 34%);position:absolute;inset:0}.glass-soft{background:color-mix(in srgb,var(--section-color) 42%,transparent);-webkit-backdrop-filter:blur(16px);border:1px solid #ffffff21}.content-shell{width:min(1460px,100% - 236px);margin-inline:220px 0}.topbar{justify-content:space-between;align-items:center;height:58px;margin-block-end:16px;display:flex}.brand,.topbar-actions{align-items:center;gap:11px;display:flex}.brand{color:var(--text);letter-spacing:-.2px;cursor:pointer;background:0 0;border:0;padding:0;font-size:17px;font-weight:600}.brand-mark,.icon-button{place-items:center;display:grid}.brand-mark{width:40px;height:40px;color:var(--accent);transform-style:preserve-3d;background:#f6bd7214;border:1px solid #ffffff1a;border-radius:13px}.brand-mark img{object-fit:contain;filter:drop-shadow(0 0 8px #23d2e63d);width:31px;height:31px}.brand-mark.is-spinning{animation:.72s cubic-bezier(.2,.78,.2,1) homeiios-logo-spin}@keyframes homeiios-logo-spin{0%{transform:rotateY(0)scale(1)}48%{transform:rotateY(180deg)scale(.92)}to{transform:rotateY(360deg)scale(1)}}.connection{color:var(--muted);font-size:12px}.connection:before{content:\"\";background:#e67373;border-radius:50%;width:7px;height:7px;margin-inline-end:6px;display:inline-block}.connection.online:before{background:#6ed5a5;box-shadow:0 0 10px #6ed5a58c}.icon-button{border:1px solid var(--line);width:38px;height:38px;color:var(--text);cursor:pointer;background:#ffffff0f;border-radius:13px}.desktop-rail{inset-block:max(18px, env(safe-area-inset-top)) max(18px, env(safe-area-inset-bottom));z-index:20;border-radius:28px;flex-direction:column;gap:6px;width:202px;padding:12px;display:flex;position:fixed;inset-inline-start:max(18px, env(safe-area-inset-right))}.desktop-rail:after,.mobile-nav:after,.room-zones:after{content:\"\";pointer-events:none;border-radius:inherit;position:absolute;inset:1px;box-shadow:inset 10px 8px 22px #ffffff0b,inset -8px -10px 18px #0000001a}.desktop-rail button{width:100%;color:var(--muted);text-align:start;cursor:pointer;background:0 0;border:0;border-radius:16px;grid-template-columns:38px minmax(0,1fr);align-items:center;gap:10px;min-height:52px;padding:8px;transition:background .2s,color .2s,transform .2s;display:grid}.desktop-rail button:hover{color:var(--text);background:#ffffff14;transform:translate(-2px)}.desktop-rail button:active,.room-zones button:active,.mobile-nav button:active{transition:transform .14s cubic-bezier(.2,.8,.2,1);transform:scale(.96)}.desktop-rail button ha-icon{justify-self:center}.desktop-rail button span{white-space:nowrap;text-overflow:ellipsis;font-size:14px;font-weight:500;overflow:hidden}.desktop-rail .active{color:#dcecff;background:linear-gradient(135deg,#73adf638,#ffffff0f);border:1px solid #97c7ff33}.rail-divider{background:var(--line);height:1px;margin:7px 8px}.rail-label{color:#ffffff61;padding:5px 10px;font-size:11px;font-weight:600}.rail-rooms{scrollbar-width:none;flex-direction:column;gap:3px;min-height:0;display:flex;overflow-y:auto}.rail-more{margin-block-start:auto}.hero{isolation:isolate;background-image:var(--hero-image);background-position:50%;background-size:cover;border:1px solid #ffffff29;border-radius:32px;grid-template-rows:1fr auto;grid-template-columns:1fr auto;min-height:clamp(360px,50vh,590px);padding:clamp(24px,4vw,52px);display:grid;position:relative;overflow:hidden;box-shadow:0 28px 90px #0000004d}.hero-overlay{z-index:-1;background:linear-gradient(90deg,#04070cdb 0%,#060a1194 36%,#060a111f 78%),linear-gradient(#0000 52%,#05080d85);position:absolute;inset:0}.hero-copy{align-self:start;min-width:0}.eyebrow{color:#ffffffad;margin-block-end:5px;font-size:clamp(14px,1.4vw,17px);font-weight:500;display:block}.hero h1{letter-spacing:-2.2px;text-wrap:balance;max-width:12ch;margin:0;font-size:clamp(36px,5vw,68px);font-weight:600;line-height:1.02}.hero p{color:var(--muted);margin:12px 0 0;font-size:15px}.hero-time{text-align:end;flex-direction:column;align-items:flex-end;display:flex}.hero-time time{letter-spacing:-2px;font-variant-numeric:tabular-nums;font-size:clamp(38px,5vw,66px);font-weight:400;line-height:1}.hero-time span{color:#ffffffc2;align-items:center;gap:6px;margin-block-start:8px;display:flex}.hero-status{border-radius:20px;grid-column:1/-1;align-self:end;gap:2px;width:-moz-fit-content;width:fit-content;max-width:100%;padding:6px;display:flex}.status{border-radius:15px;align-items:center;gap:10px;min-width:128px;padding:9px 12px;display:flex}.status>ha-icon{color:var(--cool);--mdc-icon-size:21px}.status.active>ha-icon{color:var(--accent)}.status span{flex-direction:column;min-width:0;display:flex}.status small{color:var(--muted);font-size:10px}.status strong{text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;overflow:hidden}.control-grid{grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr);gap:16px;margin-block-start:16px;display:grid}.quick-panel,.context-panel{border-radius:var(--panel-radius);min-width:0;padding:22px}.section-heading h2{margin:0;font-size:19px;font-weight:600;line-height:1.2}.section-heading p{color:var(--muted);margin:3px 0 0;font-size:12px}.quick-actions{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-block-start:18px;display:grid}.action-button{background:color-mix(in srgb,var(--tile-color) 48%,transparent);min-width:0;min-height:108px;color:var(--text);cursor:pointer;border:1px solid #ffffff1a;border-radius:18px;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:13px;transition:transform .18s,background .18s,border-color .18s;display:flex}.action-button:hover{background:#ffffff14;border-color:#ffffff2e;transform:translateY(-2px)}.action-button span{width:38px;height:38px;color:var(--cool);background:#a8ceff1a;border-radius:13px;place-items:center;display:grid}.action-button strong{white-space:normal;text-align:start;max-width:100%;font-size:13px;font-weight:600;line-height:1.25}.action-button.active{background:linear-gradient(145deg,#f6bd722e,#ffffff0d);border-color:#f6bd724d}.action-button.active span{color:var(--accent);background:#f6bd721f}.context-list{margin-block-start:12px}.context-row{border-bottom:1px solid #ffffff14;grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:10px;min-height:54px;font-size:13px;display:grid}.context-row:last-child{border-bottom:0}.context-row>span:nth-child(2){color:var(--muted);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.context-row strong{font-variant-numeric:tabular-nums;font-size:14px;font-weight:600}.context-icon{color:var(--cool);place-items:center;display:grid}.admin-menu{z-index:50;border-radius:20px;width:min(360px,100vw - 32px);max-height:calc(100vh - 96px);padding:18px;position:fixed;inset-block-start:76px;inset-inline-end:236px;overflow-y:auto}.admin-menu p{color:var(--muted);font-size:12px;line-height:1.55}.admin-menu button{border:1px solid var(--line);width:100%;color:var(--text);cursor:pointer;background:#ffffff0f;border-radius:12px;margin-block-start:7px;padding:10px}.appearance-editor{border-block-start:1px solid var(--line);margin-block-start:18px;padding-block-start:14px}.appearance-editor h3{margin:0 0 10px;font-size:15px}.appearance-segments{gap:5px;margin-block:8px;display:flex}.appearance-segments button{flex:1;min-width:0;font-size:10px;margin:0!important;padding:7px!important}.appearance-segments button.selected{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent);background:color-mix(in srgb,var(--accent) 12%,transparent)}.contrast-toggle{justify-content:space-between;align-items:center;grid-template-columns:none!important;display:flex!important}.contrast-toggle input{width:18px;height:18px;accent-color:var(--accent)}.appearance-editor>label,.color-fields label{color:var(--muted);gap:5px;margin-block:10px;font-size:11px;display:grid}.color-fields{grid-template-columns:1fr 1fr;gap:10px;display:grid}.color-fields input[type=color]{border:1px solid var(--line);background:0 0;border-radius:9px;width:100%;height:34px;padding:2px}.appearance-editor input[type=range]{width:100%;accent-color:var(--accent)}.text-input{border:1px solid var(--line);width:100%;color:var(--text);direction:ltr;background:#ffffff0f;border-radius:10px;padding:9px}.appearance-editor>small{color:var(--muted);margin-block-start:9px;font-size:10px;line-height:1.45;display:block}.background-presets{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-block:10px;display:grid}.background-presets button{align-items:flex-end;display:flex;position:relative;overflow:hidden;text-align:start!important;background-position:50%!important;background-size:cover!important;min-height:64px!important;margin:0!important;padding:8px!important}.background-presets button:first-child{background:linear-gradient(145deg,#202a39,#111722)!important}.background-presets button span{z-index:1;text-shadow:0 1px 8px #000;font-size:10px;position:relative}.background-presets button.selected{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}.workspace-view{grid-template-rows:auto minmax(0,1fr);gap:12px;min-height:calc(100vh - 92px);display:grid}.workspace-header{border-radius:22px;justify-content:space-between;align-items:center;min-height:72px;padding:10px 14px;display:flex}.workspace-title{align-items:center;gap:12px;min-width:0;display:flex}.workspace-title>span{width:43px;height:43px;color:var(--cool);background:#a8ceff1a;border-radius:14px;place-items:center;display:grid}.workspace-title div{min-width:0}.workspace-title small{color:var(--muted);font-size:10px}.workspace-title h1{white-space:nowrap;text-overflow:ellipsis;margin:0;font-size:21px;line-height:1.15;overflow:hidden}.home-return{border:1px solid var(--line);color:var(--text);cursor:pointer;background:#ffffff0f;border-radius:14px;align-items:center;gap:7px;padding:10px 13px;display:flex}.workspace-frame{border-radius:var(--panel-radius);min-height:720px;overflow:hidden}.workspace-frame iframe{background:#090e17;border:0;width:100%;height:max(720px,100vh - 178px);display:block}.room-view{gap:16px;display:grid}.feedback-island{z-index:95;color:#fff;-webkit-backdrop-filter:blur(24px)saturate(170%);backdrop-filter:blur(24px)saturate(170%);background:#121924b8;border:1px solid #fff3;border-radius:24px;align-items:center;gap:10px;max-width:min(90vw,420px);min-height:48px;padding:8px 15px 8px 10px;animation:.3s cubic-bezier(.2,.85,.2,1) feedback-in;display:flex;position:fixed;inset-block-start:24px;inset-inline-start:50%;transform:translate(50%);box-shadow:inset 0 1px #ffffff29,0 18px 48px #00000047}.feedback-island.success{background:color-mix(in srgb,var(--state-success) 28%,#121924c7)}.feedback-island.error{background:color-mix(in srgb,var(--state-danger) 34%,#121924c7)}.feedback-symbol{background:#ffffff1f;border-radius:50%;justify-content:center;align-items:center;gap:2px;width:32px;height:32px;display:flex}.feedback-symbol i{background:#fff;border-radius:50%;width:3px;height:3px;animation:.7s ease-in-out infinite alternate feedback-dot}.feedback-symbol i:nth-child(2){animation-delay:-.23s}.feedback-symbol i:nth-child(3){animation-delay:-.46s}.feedback-island strong{font-size:14px;font-weight:500}@keyframes feedback-in{0%{opacity:0;transform:translate(-50%,8px)}}@keyframes feedback-dot{to{opacity:.35;transform:translateY(-4px)}}.app:before{content:\"\";pointer-events:none;z-index:0;background:radial-gradient(circle at 72% 12%,#ffffff12,#0000 30%),linear-gradient(#0000 56%,#04070c2e);position:fixed;inset:0}.app>.desktop-rail,.app>.mobile-nav{z-index:20}.app>.content-shell{z-index:1;position:relative}.room-view .glass{background:linear-gradient(145deg,color-mix(in srgb,var(--section-color) 72%,transparent),color-mix(in srgb,var(--section-color) 50%,transparent));-webkit-backdrop-filter:blur(calc(var(--glass-blur) + 5px)) saturate(155%);backdrop-filter:blur(calc(var(--glass-blur) + 5px)) saturate(155%);border-color:#ffffff26;box-shadow:inset 0 1px #ffffff12,0 18px 50px #0000002e}.room-hero{isolation:isolate;background-color:#121a2333;background-image:var(--hero-image);background-blend-mode:soft-light;background-position:50%;background-size:cover;border:1px solid #ffffff29;border-radius:30px;flex-direction:column;justify-content:space-between;align-items:flex-start;min-height:300px;padding:24px;display:flex;position:relative;overflow:hidden;box-shadow:0 25px 72px #00000047}.room-hero-shade{z-index:-1;background:linear-gradient(90deg,#04070ce0,#04070c85 42%,#04070c14 78%),linear-gradient(#0000 42%,#04070c73);position:absolute;inset:0}.room-back{color:var(--text);cursor:pointer;border-radius:14px;align-items:center;gap:7px;padding:9px 12px;display:flex}.room-identity h1{letter-spacing:-1.8px;margin:4px 0;font-size:clamp(38px,5vw,64px);font-weight:600;line-height:1}.room-identity p{color:var(--muted);margin:0}.room-metrics{border-radius:18px;gap:4px;padding:5px;display:flex;position:absolute;inset-block-end:22px;inset-inline-end:22px}.room-metrics span{align-items:center;gap:8px;min-width:92px;padding:9px 12px;display:flex}.room-metrics ha-icon{color:var(--cool);--mdc-icon-size:20px}.room-metrics strong{font-variant-numeric:tabular-nums;font-size:18px}.room-zones{display:none}.room-layout{grid-template-columns:minmax(270px,.68fr) minmax(0,1.32fr);grid-template-areas:\"climate lights\"\"media lights\"\"media scenes\";align-items:stretch;gap:12px;display:grid}.room-zone-climate{grid-area:climate}.room-zone-lights{grid-area:lights}.room-zone-media{grid-area:media}.room-zone-scenes{grid-area:scenes}.room-zone-climate .thermostat,.room-zone-media .media-control{height:100%}.device-panel,.thermostat,.curtain-panel,.media-control,.scene-panel{border-radius:var(--panel-radius);min-width:0;padding:20px}.widget-heading{grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:10px;margin-block-end:10px;display:grid}.widget-glyph{width:44px;height:44px;color:var(--mode-color,var(--cool));background:color-mix(in srgb,var(--mode-color,var(--cool)) 13%,transparent);border-radius:15px;place-items:center;display:grid;box-shadow:inset 0 1px #ffffff1a}.widget-heading small{color:var(--muted);font-size:11px;display:block}.widget-heading h2{margin:0;font-size:18px;font-weight:600;line-height:1.2}.state-pill{min-height:30px;color:var(--muted);background:color-mix(in srgb,var(--tile-color) 48%,transparent);border-radius:15px;align-items:center;gap:6px;padding:5px 9px;font-size:11px;display:flex}.state-pill i{background:currentColor;border-radius:50%;width:7px;height:7px}.state-pill.active{color:var(--mode-color,var(--state-success))}.state-pill.active i{animation:1.8s ease-in-out infinite alternate state-breathe;box-shadow:0 0 12px}@keyframes state-breathe{to{opacity:.45;transform:scale(.72)}}.device-panel{min-height:0}.panel-title{align-items:center;gap:11px;margin-block-end:17px;display:flex}.panel-title>span{width:40px;height:40px;color:var(--cool);background:#a8ceff1a;border-radius:13px;place-items:center;display:grid}.panel-title h2{margin:0;font-size:18px;font-weight:600}.panel-title p{color:var(--muted);margin:2px 0 0;font-size:11px}.light-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;display:grid}.light-control{touch-action:none;-webkit-user-select:none;user-select:none;isolation:isolate;background:linear-gradient(145deg,color-mix(in srgb,var(--tile-color) 64%,transparent),color-mix(in srgb,var(--tile-color) 35%,transparent));border:1px solid #ffffff1c;border-radius:19px;min-width:0;min-height:112px;padding:10px;transition:background .25s,border-color .25s,transform .2s,box-shadow .25s;position:relative;overflow:hidden}.light-control:before{content:\"\";z-index:-1;inline-size:var(--light-percent);opacity:0;background:linear-gradient(90deg,#f6bb6c40,#ffdaa61a);border-inline-end:1px solid #ffdaa642;transition:inline-size .12s linear,opacity .22s;position:absolute;inset:0}.light-control.active:before{opacity:1}.light-control.active{border-color:#ffd39752;box-shadow:inset 0 1px #ffffff1a,0 9px 32px #e7a7571c}.light-control:active{transform:scale(.975)}.light-control.binary.active:before{inline-size:100%}.light-widget-glyph,.device-panel .state-pill.active{--mode-color:var(--accent)}.light-main{width:100%;min-height:72px;color:var(--text);text-align:start;cursor:pointer;pointer-events:none;background:0 0;border:0;grid-template-columns:42px minmax(0,1fr) 24px;align-items:center;gap:9px;padding:0;display:grid}.light-main:disabled,.curtain-control:disabled{opacity:.45;cursor:default}.light-main>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.light-main strong{white-space:normal;font-size:13px;line-height:1.25}.light-main small{color:var(--muted);font-size:10px}.light-main>ha-icon{color:var(--muted);--mdc-icon-size:18px}.light-orb{width:38px;height:38px;color:var(--cool);background:#a8ceff14;border-radius:13px;place-items:center;transition:all .25s;display:grid}.light-control.active .light-orb{color:var(--accent);filter:drop-shadow(0 0 calc(4px + var(--light-level) * 11px) #f6bd728c);background:#f6bd721f}.swipe-hint{color:#ffffff61;opacity:.68;justify-content:space-between;align-items:center;height:20px;font-size:9px;display:flex}.swipe-hint ha-icon{--mdc-icon-size:16px}.light-control.active .swipe-hint{color:#ffe1b9ad}.homeii-glyph{width:24px;height:24px;overflow:visible}.light-orb .homeii-glyph{width:25px;height:25px}.glyph-glow{opacity:.35}.light-control.active .glyph-glow{opacity:1;filter:drop-shadow(0 0 5px)}.light-control.active .glyph-motion{animation:1.8s ease-in-out infinite alternate glyph-breathe}@keyframes glyph-breathe{to{opacity:.35;transform:translateY(1.5px)}}.thermostat-stage{aspect-ratio:1;background:conic-gradient(from 20deg,var(--cool) var(--thermo-progress),#ffffff14 0);border-radius:50%;place-items:center;width:min(178px,52vw);margin:2px auto 8px;display:grid;position:relative;box-shadow:0 16px 50px #0000003d}.thermostat-stage:before{content:\"\";border-radius:inherit;background:#0a0f18e6;border:1px solid #ffffff1f;position:absolute;inset:7px}.thermostat{--mode-color:#8391a5;transition:background .35s,border-color .35s;position:relative;overflow:hidden}.thermostat.mode-auto,.thermostat.mode-heat_cool{--mode-color:#f0c678}.thermostat:after{content:\"\";z-index:-1;background:radial-gradient(circle,color-mix(in srgb,var(--mode-color) 23%,transparent),transparent 68%);height:72%;transition:background .35s;position:absolute;inset:-35% -20% auto}.thermostat.active{border-color:color-mix(in srgb,var(--mode-color) 36%,transparent)}.thermostat.active .thermostat-stage{background:conic-gradient(from 20deg,var(--mode-color) var(--thermo-progress),#ffffff14 0);box-shadow:0 18px 54px color-mix(in srgb,var(--mode-color) 16%,transparent)}.thermostat .mode-row button.active{color:var(--mode-color);background:color-mix(in srgb,var(--mode-color) 13%,transparent);border-color:color-mix(in srgb,var(--mode-color) 28%,transparent)}.thermostat-dial{z-index:1;flex-direction:column;align-items:center;display:flex}.thermostat-dial small,.thermostat-dial span{color:var(--muted);font-size:10px}.thermostat-dial strong{letter-spacing:-2px;font-variant-numeric:tabular-nums;font-size:44px;font-weight:500;line-height:1.08}.temperature-history{height:64px;margin:4px 0 8px;position:relative}.temperature-history header{color:var(--muted);justify-content:space-between;align-items:center;font-size:10px;display:flex}.temperature-history header strong{color:var(--mode-color);font-weight:500}.temperature-history svg{width:100%;height:44px;display:block;overflow:visible}.temperature-history.empty{height:42px;color:var(--muted);background:color-mix(in srgb,var(--tile-color) 30%,transparent);border-radius:12px;align-items:center;gap:7px;padding:8px;font-size:10px;display:flex}.temperature-history.empty ha-icon{--mdc-icon-size:17px;color:var(--mode-color)}.airflow{opacity:0;border-radius:50%;position:absolute;inset:13%;overflow:hidden}.thermostat.active .airflow{opacity:.6}.airflow i{border:1px solid #a8ceff59;border-radius:50%;width:45%;height:45%;animation:4s linear infinite air-orbit;position:absolute}.airflow i:first-child{inset:5%}.airflow i:nth-child(2){animation-delay:-1.3s;inset:28%}.airflow i:nth-child(3){animation-delay:-2.6s;inset:50%}@keyframes air-orbit{to{opacity:.15;transform:rotate(360deg)scale(1.08)}}.temperature-stepper{grid-template-columns:42px 1fr 42px;align-items:center;gap:8px;display:grid}.temperature-stepper button,.transport button{aspect-ratio:1;border:1px solid var(--line);color:var(--text);background:color-mix(in srgb,var(--tile-color) 52%,transparent);cursor:pointer;border-radius:50%;place-items:center;display:grid}.temperature-stepper span{text-align:center;color:var(--muted);font-size:11px}.mode-row{scrollbar-width:none;gap:6px;margin-block-start:14px;display:flex;overflow-x:auto}.mode-row button{min-width:58px;color:var(--muted);background:color-mix(in srgb,var(--tile-color) 42%,transparent);cursor:pointer;border:1px solid #ffffff14;border-radius:13px;flex-direction:column;flex:1;align-items:center;gap:3px;padding:8px 6px;display:flex}.mode-row button span{white-space:nowrap;font-size:9px}.mode-row button.active{color:var(--accent);background:#f6bd721a;border-color:#f6bd7240}.curtain-control{width:100%;min-height:130px;color:var(--text);text-align:start;cursor:pointer;background:#ffffff09;border:1px solid #ffffff1a;border-radius:18px;grid-template-columns:130px 1fr 30px;align-items:center;gap:15px;padding:13px;display:grid}.curtain-window{background:linear-gradient(#8bbfe9,#f6d49b);border:4px solid #ffffff1f;border-radius:13px;place-items:center;height:98px;display:grid;position:relative;overflow:hidden}.curtain-window i{background:linear-gradient(90deg,#66594f,#a9998c);width:52%;transition:transform .75s cubic-bezier(.2,.8,.2,1);position:absolute;inset-block:0}.curtain-window i:first-child{inset-inline-start:0}.curtain-window i:nth-child(2){inset-inline-end:0}.curtain-control.open .curtain-window i:first-child{transform:translate(-82%)}.curtain-control.open .curtain-window i:nth-child(2){transform:translate(82%)}.curtain-window b{color:#ffffffe6;filter:drop-shadow(0 0 10px #fff)}.curtain-control>span:nth-child(2){flex-direction:column;display:flex}.curtain-control small{color:var(--muted)}.media-control{--mode-color:#9dc6ff;position:relative;overflow:hidden}.media-control.playing{--mode-color:#f4bd78;border-color:color-mix(in srgb,var(--mode-color) 28%,transparent)}.media-control:after{content:\"\";z-index:-1;background:radial-gradient(circle,color-mix(in srgb,var(--mode-color) 18%,transparent),transparent 68%);height:78%;position:absolute;inset:auto -25% -45%}.now-playing{grid-template-columns:68px minmax(0,1fr) 36px;align-items:center;gap:12px;min-height:82px;display:grid}.album-art{width:68px;height:68px;color:var(--cool);background:linear-gradient(145deg,#a8ceff2e,#f6bd721a) 50%/cover;border-radius:19px;place-items:center;transition:transform .35s;display:grid;box-shadow:inset 0 1px #ffffff24,0 12px 28px #0003}.media-control.playing .album-art{animation:4s ease-in-out infinite alternate album-float}@keyframes album-float{to{transform:translateY(-3px)rotate(.5deg)}}.now-playing>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.now-playing strong,.now-playing small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.now-playing small{color:var(--muted)}.equalizer{justify-content:center;align-items:flex-end;gap:3px;height:28px;display:flex}.equalizer i{background:var(--mode-color);opacity:.38;border-radius:5px;width:3px;height:20%}.media-control.playing .equalizer i{opacity:1;animation:.8s ease-in-out infinite alternate eq}.media-control.playing .equalizer i:nth-child(2){animation-delay:-.3s}.media-control.playing .equalizer i:nth-child(3){animation-delay:-.55s}.media-control.playing .equalizer i:nth-child(4){animation-delay:-.17s}@keyframes eq{to{height:95%}}.transport{justify-content:center;align-items:center;gap:12px;margin-block-start:12px;display:flex}.transport button{width:40px}.transport .play{color:#101723;background:var(--accent);border:0;width:52px}.media-progress{background:color-mix(in srgb,var(--tile-color) 55%,transparent);border-radius:6px;height:4px;margin-block-start:10px;overflow:hidden}.media-progress i{border-radius:inherit;background:var(--mode-color);height:100%;box-shadow:0 0 12px color-mix(in srgb,var(--mode-color) 45%,transparent);transition:width .4s linear;display:block}.media-times{color:var(--muted);font-variant-numeric:tabular-nums;justify-content:space-between;margin-block-start:4px;font-size:9px;display:flex}.volume-control{color:var(--muted);grid-template-columns:22px minmax(0,1fr) 34px;align-items:center;gap:8px;margin-block-start:13px;display:grid}.volume-control ha-icon{--mdc-icon-size:18px}.volume-control input{width:100%;accent-color:var(--mode-color)}.volume-control strong{text-align:end;font-variant-numeric:tabular-nums;font-size:10px}.scene-row{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;display:grid}.scene-row button{min-height:62px;color:var(--text);background:color-mix(in srgb,var(--tile-color) 48%,transparent);cursor:pointer;border:1px solid #ffffff17;border-radius:16px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex}.scene-row button ha-icon{color:var(--accent)}.mobile-nav{display:none}.sheet-layer{z-index:100;background:#0104088a;justify-content:center;align-items:flex-end;padding:12px;animation:.18s fade-in;display:flex;position:fixed;inset:0}.bottom-sheet{width:min(680px,100%);max-height:min(78vh,720px);padding:10px 16px calc(18px + env(safe-area-inset-bottom));border-radius:28px;animation:.28s cubic-bezier(.2,.85,.2,1) sheet-in;overflow-y:auto}.sheet-handle{background:#ffffff3d;border-radius:9px;width:42px;height:4px;margin:2px auto 10px}.bottom-sheet header{justify-content:space-between;align-items:center;margin-block-end:12px;display:flex}.bottom-sheet h2{margin:0;font-size:21px}.sheet-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;display:grid}.sheet-item{text-align:start;background:color-mix(in srgb,var(--tile-color) 48%,transparent);min-width:0;min-height:74px;color:var(--text);cursor:pointer;border:1px solid #ffffff1a;border-radius:17px;grid-template-columns:42px minmax(0,1fr) 22px;align-items:center;gap:11px;padding:10px;display:grid}.sheet-item>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.sheet-item strong{text-overflow:ellipsis;white-space:nowrap;font-size:14px;overflow:hidden}.sheet-item small{color:var(--muted);text-overflow:ellipsis;white-space:nowrap;font-size:10px;overflow:hidden}.sheet-icon{width:42px;height:42px;color:var(--cool);background:#a8ceff1a;border-radius:14px;place-items:center;display:grid}@keyframes fade-in{0%{opacity:0}}@keyframes sheet-in{0%{opacity:0;transform:translateY(32px)}}@media (max-width:1100px) and (min-width:761px){.desktop-rail{width:78px;padding:10px}.desktop-rail button{grid-template-columns:1fr;justify-items:center;padding:8px 4px}.desktop-rail button span,.rail-label{display:none}.content-shell{width:calc(100% - 94px);margin-inline-start:94px}.control-grid{grid-template-columns:1fr}.admin-menu{inset-inline-end:104px}}@media (max-width:760px){.app{padding:max(12px, env(safe-area-inset-top)) 12px calc(92px + env(safe-area-inset-bottom))}.desktop-rail{display:none}.content-shell{width:100%;margin-inline-start:0}.topbar{height:48px;margin-block-end:10px}.brand{font-size:15px}.connection{display:none}.hero{background-position:62%;border-radius:25px;grid-template-columns:minmax(0,1fr) auto;min-height:310px;padding:22px}.hero-overlay{background:linear-gradient(90deg,#04070ce0,#060a1175 66%,#060a112e)}.hero h1{letter-spacing:-1.5px;font-size:clamp(34px,11vw,48px)}.hero-time time{font-size:clamp(31px,9vw,42px)}.hero-status{scrollbar-width:none;width:100%;overflow-x:auto}.status{min-width:112px;padding:8px}.control-grid{grid-template-columns:1fr;gap:12px;margin-block-start:12px}.quick-panel,.context-panel{border-radius:22px;padding:17px}.quick-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.action-button{min-height:92px}.mobile-nav{z-index:80;border-radius:23px;grid-template-columns:repeat(5,1fr);max-width:540px;margin:auto;padding:5px;display:grid;position:fixed;inset-block-end:max(10px, env(safe-area-inset-bottom));inset-inline:12px}.mobile-nav button{min-width:0;min-height:55px;color:var(--muted);background:0 0;border:0;border-radius:17px;flex-direction:column;justify-content:center;align-items:center;gap:2px;display:flex}.mobile-nav button ha-icon{--mdc-icon-size:21px}.mobile-nav button span{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:10px;overflow:hidden}.mobile-nav button.active{color:#dcecff;background:#82b7fa29}.sheet-grid{grid-template-columns:1fr}.admin-menu{inset-block-start:66px;inset-inline:12px}.workspace-view{min-height:calc(100vh - 154px)}.workspace-header{border-radius:19px;min-height:62px}.workspace-title>span{width:38px;height:38px}.workspace-title h1{font-size:18px}.home-return span{display:none}.workspace-frame{border-radius:20px;min-height:calc(100vh - 232px)}.workspace-frame iframe{height:calc(100vh - 232px);min-height:560px}.room-view{gap:10px}.room-hero{border-radius:24px;min-height:220px;padding:16px}.room-back span{display:none}.room-identity h1{font-size:40px}.room-metrics{inset-block-end:12px;inset-inline:12px}.room-metrics span{min-width:70px;padding:6px}.room-zones{border-radius:18px;grid-template-columns:repeat(4,1fr);padding:5px;display:grid}.room-zones button{min-width:0;min-height:52px;color:var(--muted);background:0 0;border:0;border-radius:14px;flex-direction:column;justify-content:center;align-items:center;gap:2px;display:flex}.room-zones button span{font-size:9px}.room-zones button .homeii-glyph{width:20px;height:20px}.room-zones button.active{color:var(--text);background:#ffffff1c}.room-layout{display:block}.room-zone{display:none}.room-zone.selected{animation:.24s zone-in;display:block}.light-grid,.scene-row{grid-template-columns:repeat(2,minmax(0,1fr))}.device-panel,.thermostat,.curtain-panel,.media-control,.scene-panel{border-radius:22px;padding:15px}@keyframes zone-in{0%{opacity:.4;transform:translateY(5px)}}}@media (max-width:1120px) and (min-width:761px){.room-view{gap:11px}.room-hero{min-height:210px}.room-layout{grid-template-columns:minmax(235px,.72fr) minmax(0,1.28fr);grid-template-areas:\"climate lights\"\"media lights\"\"scenes scenes\";gap:10px}.light-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.light-control{min-height:104px}.device-panel,.thermostat,.media-control,.scene-panel{padding:15px}.thermostat-stage{width:min(178px,25vw)}.thermostat-dial strong{font-size:44px}.scene-row{grid-template-columns:repeat(4,minmax(0,1fr))}}@media (max-width:390px){.hero{grid-template-columns:1fr}.hero-time{position:absolute;inset-block-start:22px;inset-inline-end:20px}.hero-copy{padding-block-start:72px}}@media (prefers-reduced-motion:reduce){*,:before,:after{transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){.glass{background:#0c121df0}.glass-soft{background:#0c121de0}}.desktop-rail.glass{-webkit-backdrop-filter:blur(34px)saturate(145%);background:linear-gradient(155deg,#191f2ae8,#0c111ad6);border-color:#ffffff2e;width:216px;padding:13px;box-shadow:inset 0 1px #ffffff29,0 28px 80px #00000057}.app{min-width:0;overflow-x:clip}.content-shell,.room-view,.room-layout,.room-zone{min-width:0}.room-zone{overflow:hidden}.content-shell{width:min(1460px,100% - 250px);margin-inline-start:234px}.desktop-rail .active{color:#fff;background:linear-gradient(135deg,#69aeff52,#5fe0cb1f);border:1px solid #9bcfff61;box-shadow:inset 0 1px #ffffff26,0 10px 28px #317eda29}.desktop-rail .active ha-icon{filter:drop-shadow(0 0 9px #7dbdff)}.rail-live{border-block:1px solid #ffffff17;gap:5px;margin-block-start:auto;padding:9px;display:grid}.rail-live span{color:#b9c4d3;grid-template-columns:25px 1fr auto;align-items:center;gap:7px;min-height:35px;display:grid}.rail-live ha-icon{--mdc-icon-size:18px;color:#8ebfff}.rail-live b{font-variant-numeric:tabular-nums;font-size:11px;font-weight:650}.rail-live small{color:#768397;font-size:9px}.rail-live .is-on ha-icon,.rail-live .is-on b{color:#ffc872}.rail-live .is-on ha-icon{animation:2s ease-in-out infinite alternate rail-glow}@keyframes rail-glow{to{filter:drop-shadow(0 0 9px #ffbd55);transform:scale(1.06)}}.desktop-rail .rail-more{background:#ffffff0e;border:1px solid #ffffff1f;grid-template-columns:1fr;align-self:center;width:44px;min-height:40px;margin-block-start:5px}.bottom-sheet.glass{-webkit-backdrop-filter:blur(38px)saturate(135%);backdrop-filter:blur(38px)saturate(135%);background:linear-gradient(150deg,#232a34f7,#10161ff7);border-color:#ffffff38;box-shadow:inset 0 1px #ffffff2e,0 35px 100px #0000008c}.sheet-layer{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);background:#03070ca8}.sheet-item{background:#fff1;border-color:#ffffff21}.admin-menu.glass{background:linear-gradient(150deg,#252b34fa,#10151dfa);border-color:#ffffff38;box-shadow:0 30px 90px #00000085}.room-view{gap:11px}.room-hero{border-radius:27px;min-height:clamp(190px,28vh,275px)}.room-hero-shade{background:linear-gradient(90deg,#05080dd1,#05080d6b 43%,#05080d29 76%),linear-gradient(#0000 40%,#04070c57)}.room-layout{grid-template-columns:minmax(320px,.82fr) minmax(0,1.18fr);grid-template-areas:\"climate lights\"\"media lights\"\"scenes scenes\";gap:10px}.room-view .glass{background:linear-gradient(150deg,#1e2631d1,#101721b8);border-color:#ffffff2e;box-shadow:inset 0 1px #ffffff21,0 16px 45px #00000038}.theme-light .room-view .glass{background:linear-gradient(150deg,#f5f9fcd1,#e0e9f0b8);border-color:#ffffffb8;box-shadow:inset 0 1px #fff,0 16px 45px #192b3c24}.widget-heading h2{font-size:19px;font-weight:700}.state-pill{border:1px solid #ffffff14;font-weight:700}.device-panel{--mode-color:#ffc36b}.light-grid{gap:9px}.light-control{background:linear-gradient(145deg,#ffffff13,#ffffff06);border-color:#ffffff1f;min-height:106px}.light-control.active{background:linear-gradient(145deg,#ffbb5245,#ff91341c);border-color:#ffcd7d94;box-shadow:inset 0 1px #fff3,0 12px 34px #ff992f2e}.light-control.active:after{content:\"\";z-index:-1;background:radial-gradient(circle at 18% 20%,#ffe0a647,#0000 42%);animation:2.4s ease-in-out infinite alternate light-alive;position:absolute;inset:0}.light-control:not(.active) .light-main small{color:#8f9aaa}.light-control.active .light-main strong,.light-control.active .light-main small{color:#fff}.light-control.active .light-main>ha-icon{color:#ffd18b;filter:drop-shadow(0 0 8px #ffbd55)}@keyframes light-alive{to{opacity:.45;transform:translate(5%)scale(1.04)}}.thermostat{--mode-color:#8795a8}.thermostat.mode-cool{--mode-color:#4aa8ff}.thermostat.mode-heat{--mode-color:#ff7a3d}.thermostat.mode-fan_only{--mode-color:#36d6bc}.thermostat.mode-dry{--mode-color:#9c7cff}.climate-verdict{color:var(--mode-color);background:color-mix(in srgb,var(--mode-color) 15%,#080d1585);border:1px solid color-mix(in srgb,var(--mode-color) 35%,transparent);border-radius:16px;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:10px;margin:0 0 10px;padding:9px 11px;display:grid}.climate-mode-icon{background:color-mix(in srgb,var(--mode-color) 18%,transparent);border-radius:13px;place-items:center;width:38px;height:38px;display:grid}.climate-mode-icon ha-icon{filter:drop-shadow(0 0 8px)}.thermostat.active .climate-mode-icon ha-icon{animation:1.8s ease-in-out infinite alternate climate-pulse}.thermostat.action-fan .climate-mode-icon ha-icon{animation:2.3s linear infinite air-orbit}.climate-verdict div{flex-direction:column;display:flex}.climate-verdict small{color:var(--muted);font-size:9px}.climate-verdict strong{color:var(--text);font-size:15px}.climate-verdict>b{color:var(--mode-color);background:color-mix(in srgb,var(--mode-color) 13%,transparent);border-radius:12px;padding:6px 9px;font-size:11px}@keyframes climate-pulse{to{filter:drop-shadow(0 0 13px);transform:scale(1.09)}}.thermostat-stage{border:2px solid color-mix(in srgb,var(--mode-color) 34%,transparent);width:min(166px,46vw);margin-block:0 6px}.thermostat-dial small{text-transform:none;font-size:10px}.thermostat-dial strong{color:#fff;font-size:48px;font-weight:650}.thermostat-dial .target-label{color:#dbe5f1;background:#ffffff14;border-radius:10px;margin-top:2px;padding:3px 8px}.thermostat-dial .target-label b{color:var(--mode-color);font-size:13px}.thermostat-dial>span:last-child{color:#aab5c5;margin-top:4px}.thermostat.action-cooling .airflow i,.thermostat.action-heating .airflow i{border-color:color-mix(in srgb,var(--mode-color) 58%,transparent)}.temperature-history{height:52px}.temperature-history svg{height:34px}.mode-row{margin-block-start:9px}.mode-row button{padding:6px 4px}.temperature-stepper button{width:38px}.temperature-stepper{grid-template-columns:38px 1fr 38px}@media (min-width:761px) and (max-height:900px){.room-hero{min-height:185px;padding:18px}.room-identity h1{font-size:44px}.device-panel,.thermostat,.media-control,.scene-panel{padding:14px}.light-control{min-height:92px}.light-main{min-height:61px}.swipe-hint{height:16px}.thermostat-stage{width:142px}.thermostat-dial strong{font-size:40px}.temperature-history{height:43px}.mode-row button{padding:5px 3px}.room-layout{gap:8px}}@media (max-width:1100px) and (min-width:761px){.desktop-rail.glass{width:80px}.content-shell{width:calc(100% - 98px);margin-inline-start:98px}.rail-live span{grid-template-columns:1fr;justify-items:center;gap:2px}.rail-live small,.rail-live b{font-size:8px}.room-layout{grid-template-columns:minmax(275px,.8fr) minmax(0,1.2fr)}.room-hero{min-height:190px}}@media (max-width:760px){.room-hero{min-height:205px}.room-view .glass{background:linear-gradient(150deg,#1b232eeb,#0e141de0)}.room-zones.glass-soft{-webkit-backdrop-filter:blur(26px);backdrop-filter:blur(26px);background:#131b26e0;border:1px solid #ffffff24}.climate-verdict{grid-template-columns:38px minmax(0,1fr) auto}.thermostat-stage{width:min(174px,48vw)}}@media (min-width:761px) and ((max-width:1366px) or (max-height:860px)){.room-view{grid-template-rows:minmax(150px,25dvh) 58px minmax(0,1fr);height:calc(100dvh - 92px);overflow:hidden}.room-zones{-webkit-backdrop-filter:blur(26px);backdrop-filter:blur(26px);background:#131b26e0;border:1px solid #ffffff24;border-radius:18px;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:5px;display:grid;position:relative}.room-zones button{min-width:0;color:var(--muted);cursor:pointer;background:0 0;border:0;border-radius:13px;justify-content:center;align-items:center;gap:7px;display:flex}.room-zones button.active{color:#fff;background:linear-gradient(135deg,#5ba5ff40,#ffffff14);box-shadow:inset 0 1px #ffffff21}.room-layout{min-height:0;display:block;overflow:hidden}.room-zone{scrollbar-width:thin;height:100%;display:none;overflow:auto}.room-zone.selected{animation:.24s zone-in;display:block}.room-zone.selected>section,.room-zone.selected.device-panel{height:auto;min-height:100%}.light-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.room-hero{height:100%;min-height:0}}@media (min-width:761px) and (max-width:980px){.light-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.room-zones button span{font-size:11px}}@media (max-width:760px){.app{min-height:100dvh}.content-shell,.room-layout,.room-zone{overflow:visible}.bottom-sheet{max-height:min(76dvh,680px)}.admin-menu{max-height:calc(100dvh - 150px)}}@media (max-width:430px){.room-hero{min-height:190px}.room-identity h1{font-size:34px}.room-metrics span{min-width:62px}.light-grid{grid-template-columns:1fr}.widget-heading{grid-template-columns:40px minmax(0,1fr) auto}.state-pill{padding:4px 7px}}@media (min-width:761px){.topbar{display:none}.rail-brand{grid-template-columns:46px 1fr!important;min-height:62px!important;padding:7px!important}.rail-brand .brand-mark{width:44px;height:44px}.rail-brand strong{letter-spacing:-.3px;font-size:17px}.rail-system{grid-template-columns:1fr 42px 42px;align-items:center;gap:6px;margin-block-start:4px;display:grid}.rail-system>span{background:#ffffff0b;border:1px solid #ffffff17;border-radius:13px;place-items:center;height:38px;display:grid}.rail-system>span i{background:#e57474;border-radius:50%;width:8px;height:8px}.rail-system>span.online i{background:#67d5a2;box-shadow:0 0 12px #67d5a2}.desktop-rail .rail-system button{background:#ffffff0b;border:1px solid #ffffff17;grid-template-columns:1fr;height:38px;min-height:38px;padding:0}}@media (max-width:1100px) and (min-width:761px){.rail-brand{grid-template-columns:1fr!important}.rail-brand strong{display:none}.rail-system{grid-template-columns:1fr}.rail-system>span{height:30px}.rail-live{padding-inline:0}}@media (max-width:760px){.topbar{display:flex}.brand span:last-child{font-size:0}.brand span:last-child:after{content:\"HOMEii\";font-size:15px}}.hero-status{display:none}.status-carousel{overscroll-behavior-inline:contain;scroll-snap-type:inline mandatory;scrollbar-width:none;z-index:2;grid-column:1/-1;align-self:end;gap:9px;width:min(100%,900px);padding:3px;display:flex;overflow-x:auto}.status-carousel::-webkit-scrollbar{display:none}.status-card{scroll-snap-align:start;color:#eef5ff;text-align:start;-webkit-backdrop-filter:blur(22px)saturate(150%);backdrop-filter:blur(22px)saturate(150%);cursor:pointer;background:#0d141ead;border:1px solid #ffffff26;border-radius:20px;flex:0 0 225px;grid-template-columns:46px minmax(0,1fr) 20px;align-items:center;gap:9px;min-height:72px;padding:10px;display:grid;box-shadow:inset 0 1px #ffffff1f,0 12px 35px #0003}.status-card-icon{color:#91a4ba;background:#ffffff12;border-radius:15px;place-items:center;width:44px;height:44px;display:grid;position:relative}.status-card-icon>i{border:1px solid #0000;border-radius:18px;position:absolute;inset:-3px}.status-card.active .status-card-icon>i{opacity:.55;border-color:currentColor;animation:2.6s linear infinite status-orbit}.status-card.active.status-person .status-card-icon{color:#5ed9ad}.status-card>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.status-card small{color:#9ba9bb;font-size:10px}.status-card strong{white-space:nowrap;text-overflow:ellipsis;font-size:13px;overflow:hidden}.status-card>ha-icon{--mdc-icon-size:18px;color:#8997aa}@keyframes status-orbit{to{transform:rotate(360deg)}}.intent-dock{z-index:3;border-radius:20px;grid-template-columns:1.15fr repeat(3,1fr);gap:5px;width:min(390px,42%);padding:6px;display:grid;position:absolute;inset-block-start:128px;inset-inline-start:clamp(22px,3vw,44px)}.intent-title{flex-direction:column;justify-content:center;padding:7px 10px;display:flex}.intent-title small{color:#ffffff8c;font-size:9px}.intent-title strong{font-size:12px}.intent-dock button{color:#fff;cursor:pointer;background:0 0;border:0;border-radius:15px;flex-direction:column;align-items:center;gap:1px;min-width:0;padding:7px 4px;display:flex}.intent-dock button:hover{background:#ffffff17}.intent-dock button span{color:#9dc6ff;background:#9dc6ff1c;border-radius:11px;place-items:center;width:30px;height:30px;display:grid}.intent-dock button b{font-size:10px}.intent-dock button small{color:#ffffff8c;white-space:nowrap;font-size:8px}.intent-dock ha-icon{--mdc-icon-size:18px}.status-dialog-layer{z-index:110;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#02060b9e;place-items:center;padding:18px;animation:.2s fade-in;display:grid;position:fixed;inset:0}.status-dialog{--status-color:#7fb6ff;color:#f4f7fb;background:linear-gradient(150deg,#232b37fa,#0d131cfa);border:1px solid #ffffff38;border-radius:30px;grid-template-rows:auto minmax(0,1fr) auto;width:min(620px,100%);max-height:min(78dvh,760px);padding:18px;animation:.3s cubic-bezier(.2,.85,.2,1) sheet-in;display:grid;overflow:hidden;box-shadow:inset 0 1px #ffffff29,0 40px 120px #00000094}.status-dialog.status-light{--status-color:#ffc264}.status-dialog.status-climate{--status-color:#58aeff}.status-dialog.status-media_player{--status-color:#ba8cff}.status-dialog.status-person{--status-color:#5ed9ad}.status-dialog>header{border-block-end:1px solid #ffffff1a;grid-template-columns:48px minmax(0,1fr) 42px;align-items:center;gap:11px;padding-block-end:14px;display:grid}.status-dialog-icon{width:46px;height:46px;color:var(--status-color);background:color-mix(in srgb,var(--status-color) 14%,transparent);border-radius:16px;place-items:center;display:grid}.status-dialog header small{color:#91a0b2;font-size:10px}.status-dialog h2{margin:0;font-size:22px}.status-dialog header button,.status-entity-list article>button{color:#fff;cursor:pointer;background:#ffffff0f;border:1px solid #ffffff1f;border-radius:14px;place-items:center;width:40px;height:40px;display:grid}.status-entity-list{gap:7px;padding-block:10px;display:grid;overflow:auto}.status-entity-list article{background:#ffffff0b;border:1px solid #ffffff14;border-radius:17px;grid-template-columns:42px minmax(0,1fr) 42px;align-items:center;gap:10px;padding:9px;display:grid}.status-entity-list article.active{background:color-mix(in srgb,var(--status-color) 11%,#ffffff0a);border-color:color-mix(in srgb,var(--status-color) 32%,transparent)}.status-entity-list article>span{color:#8795a8;background:#ffffff0e;border-radius:13px;place-items:center;width:40px;height:40px;display:grid}.status-entity-list article.active>span,.status-entity-list article.active>button{color:var(--status-color)}.status-entity-list article div{flex-direction:column;display:flex}.status-entity-list article strong{font-size:13px}.status-entity-list article small{color:#8f9caf;font-size:10px}.status-dialog footer{color:#8492a5;border-block-start:1px solid #ffffff17;align-items:center;gap:7px;padding-block-start:10px;font-size:10px;display:flex}.status-empty{min-height:180px;color:var(--status-color);flex-direction:column;justify-content:center;align-items:center;gap:10px;display:flex}.status-empty ha-icon{--mdc-icon-size:42px}.admin-menu{width:min(680px,100vw - 280px);padding:20px}.admin-menu-head{z-index:2;-webkit-backdrop-filter:blur(25px);backdrop-filter:blur(25px);background:#131922f0;border-block-end:1px solid #ffffff1a;grid-template-columns:1fr 44px;align-items:center;gap:10px;margin:-20px -20px 14px;padding:18px 20px 13px;display:grid;position:sticky;top:-20px}.admin-menu-head div{flex-direction:column;display:flex}.admin-menu-head small{color:var(--accent);font-size:9px}.admin-menu-head strong{font-size:20px}.admin-close{place-items:center;height:42px;display:grid;border-radius:14px!important;width:42px!important;margin:0!important;padding:0!important}.appearance-editor{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.appearance-group{background:#ffffff09;border:1px solid #ffffff14;border-radius:17px;min-width:0;padding:14px}.appearance-group h3{margin:0 0 10px;font-size:13px}.appearance-editor>button,.appearance-editor>small{grid-column:1/-1}.climate-verdict{display:none}.thermostat{transition:background .45s,border-color .45s;background:linear-gradient(150deg,color-mix(in srgb,var(--mode-color) 14%,#1b232ee0),#0e141dd1)!important}.thermostat-stage{box-shadow:none!important;background:0 0!important;border:0!important}.thermostat-stage:before{background:#0a0f18f0;inset:19px;box-shadow:inset 0 1px #ffffff1c,0 14px 40px #00000040}.temperature-ring{border-radius:50%;position:absolute;-webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 5px),#000 0);mask:radial-gradient(farthest-side,#0000 calc(100% - 5px),#000 0)}.target-ring{background:conic-gradient(from 210deg,var(--mode-color) var(--thermo-progress),#ffffff14 0);filter:drop-shadow(0 0 8px color-mix(in srgb,var(--mode-color) 45%,transparent));inset:0}.current-ring{background:conic-gradient(from 210deg,#f4f7fb var(--current-progress),#ffffff12 0);opacity:.72;inset:9px}.thermostat.active .target-ring{animation:2.2s ease-in-out infinite alternate ring-breathe}.thermostat.action-cooling .airflow,.thermostat.action-heating .airflow,.thermostat.action-fan .airflow{opacity:.45}@keyframes ring-breathe{to{filter:drop-shadow(0 0 14px var(--mode-color));transform:scale(1.012)}}@media (max-width:760px){.status-carousel{width:calc(100% + 6px);margin-inline:-3px}.status-card{flex-basis:205px}.intent-dock{grid-template-columns:repeat(3,1fr);width:auto;position:absolute;inset-block-start:68px;inset-inline:16px}.intent-title{display:none}.admin-menu{width:auto}.appearance-editor{grid-template-columns:1fr}.appearance-editor>button,.appearance-editor>small{grid-column:auto}.status-dialog{border-radius:25px;padding:14px}}.intent-cinema .room-layout{grid-template-columns:minmax(300px,.85fr) minmax(0,1.15fr);grid-template-areas:\"media lights\"\"scenes lights\";display:grid;overflow:hidden}.intent-cinema .room-zone-media,.intent-cinema .room-zone-lights,.intent-cinema .room-zone-scenes{display:block}.intent-cinema .room-zone-climate{display:none}.intent-cinema .room-zone-lights{overflow:auto}.intent-cinema .light-control{min-height:92px}.intent-cinema .light-main{min-height:60px}@media (max-width:760px){.intent-cinema .room-layout{display:block;overflow:visible}.intent-cinema .room-zone-media,.intent-cinema .room-zone-scenes,.intent-cinema .room-zone-lights{margin-block-end:9px;display:block}.intent-cinema .light-grid{scroll-snap-type:inline mandatory;display:flex;overflow-x:auto}.intent-cinema .light-control{scroll-snap-align:start;flex:0 0 185px}}.palette-rich-brown{--bg:#140f0d;--section-color:#241914;--tile-color:#3a2921;--text:#fff8f2;--muted:#ffeee0ad;--line:#ffe1cb29}.palette-night-blue{--bg:#070d18;--section-color:#111c2e;--tile-color:#1d2b42;--text:#f4f8ff;--muted:#dce8faa8;--line:#b9d3f726}.palette-granite{--bg:#0d0e10;--section-color:#1a1c20;--tile-color:#292c31;--text:#f5f5f4;--muted:#e8e9e8a3;--line:#ffffff24}.palette-bright-white{--bg:#f7f9fc;--section-color:#fff;--tile-color:#e9eef5;--text:#111827;--muted:#1e293ba6;--line:#1e293b1f}.palette-cream{--bg:#f5f0e7;--section-color:#fffaf1;--tile-color:#eae0d1;--text:#302820;--muted:#403327a6;--line:#4c3a2a21}.palette-ivory{--bg:#f0ede4;--section-color:#faf7ed;--tile-color:#e5dfd2;--text:#292722;--muted:#37342da3;--line:#443e3421}.palette-mocha{--bg:#e8ddd2;--section-color:#f3e9df;--tile-color:#d9c9bb;--text:#332923;--muted:#43342ba6;--line:#523d3124}.homeii-icon{flex:none;width:24px;height:24px;display:block;overflow:visible}.desktop-rail .homeii-icon{justify-self:center;width:23px;height:23px}.rail-system .homeii-icon{width:20px;height:20px}.homeii-icon .hi-motion{filter:none;animation:none;transform:none}.status-card.active.status-light .status-card-icon>i{animation:1.8s ease-in-out infinite status-light-ring}.status-card.active.status-light .status-card-icon>ha-icon{animation:1.8s ease-in-out infinite alternate status-light-icon}.status-card.active.status-climate .status-card-icon>i{border-style:dashed;animation:5s linear infinite status-climate-ring}.status-card.active.status-climate .status-card-icon>ha-icon{animation:2.2s ease-in-out infinite status-climate-icon}.status-card.active.status-media_player .status-card-icon>i{animation:1.1s cubic-bezier(.3,.7,.3,1) infinite status-media-ring}.status-card.active.status-media_player .status-card-icon>ha-icon{animation:1.1s ease-in-out infinite alternate status-media-icon}.status-card.active.status-person .status-card-icon>i{animation:2.8s ease-in-out infinite status-person-ring}.status-card.active.status-person .status-card-icon>ha-icon{animation:2.8s ease-in-out infinite alternate status-person-icon}@keyframes status-light-ring{50%{opacity:.12;transform:scale(1.11);box-shadow:0 0 18px}}@keyframes status-light-icon{to{filter:drop-shadow(0 0 9px);transform:scale(1.07)}}@keyframes status-climate-ring{to{transform:rotate(360deg)}}@keyframes status-climate-icon{50%{filter:drop-shadow(0 4px 7px);transform:translateY(-2px)}}@keyframes status-media-ring{50%{opacity:.2;transform:scale(1.07)}}@keyframes status-media-icon{to{transform:scale(1.11)}}@keyframes status-person-ring{50%{opacity:.25;transform:scale(1.05)}}@keyframes status-person-icon{to{opacity:.72;transform:scale(.97)}}.theme-light.app{background-color:var(--bg)}.theme-light .desktop-rail.glass{color:var(--text);background:linear-gradient(155deg,color-mix(in srgb,var(--section-color) 94%,white),color-mix(in srgb,var(--section-color) 82%,transparent));border-color:#ffffffbf;box-shadow:inset 0 1px #fff,0 28px 70px #362d2626}.theme-light .desktop-rail button,.theme-light .rail-live span{color:var(--muted)}.theme-light .desktop-rail .active{color:var(--text);background:linear-gradient(135deg,#5a99e533,#ffffff80);border-color:#497dbe3d}.theme-light .rail-system>span,.theme-light .desktop-rail .rail-system button{color:var(--text);background:#ffffff80;border-color:#2832411a}.theme-light .admin-menu.glass,.theme-light .bottom-sheet.glass,.theme-light .status-dialog{color:var(--text);background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 96%,white),color-mix(in srgb,var(--section-color) 88%,white));border-color:#fffc}.theme-light .admin-menu-head{background:color-mix(in srgb,var(--section-color) 95%,white)}.theme-light .appearance-group,.theme-light .status-entity-list article{background:#282d370b;border-color:#23283217}.light-control,.action-button,.scene-row button,.sheet-item,.state-pill{background:rgb(from var(--tile-color) r g b / var(--tile-alpha))}.setting-caption{color:var(--muted);margin-block-start:9px;font-size:9px;display:block}.palette-segments button{font-size:9px!important}.intent-dock{width:min(500px,39%);top:235px;left:clamp(34px,4vw,64px);right:auto}@media (max-width:760px){.intent-dock{width:auto;top:70px;left:16px;right:16px}}.room-flow{z-index:3;border-radius:18px;grid-template-columns:1.25fr repeat(3,1fr);gap:4px;width:min(430px,42%);padding:5px;display:grid;position:absolute;top:22px;left:22px;right:auto}.room-flow>span{flex-direction:column;justify-content:center;padding:6px 9px;display:flex}.room-flow small{color:#ffffff8f;font-size:8px}.room-flow strong{font-size:11px}.room-flow button{color:#fff;cursor:pointer;background:0 0;border:0;border-radius:13px;justify-content:center;align-items:center;gap:4px;padding:6px 3px;display:flex}.room-flow button:hover{background:#ffffff1a}.room-flow button b{font-size:9px}.room-flow button ha-icon{--mdc-icon-size:17px;color:#9dc6ff}.room-status-strip{z-index:3;border-radius:18px;gap:4px;padding:5px;display:flex;position:absolute;bottom:22px;left:22px;right:auto}.room-status-strip button{color:#ffffffa3;text-align:start;cursor:pointer;background:0 0;border:0;border-radius:13px;align-items:center;gap:7px;min-width:86px;padding:7px 9px;display:flex}.room-status-strip button span{flex-direction:column;display:flex}.room-status-strip b{font-size:13px}.room-status-strip small{font-size:8px}.room-status-strip ha-icon{--mdc-icon-size:19px}@media (max-width:760px){.room-flow{grid-template-columns:repeat(3,1fr);width:auto;top:58px;left:12px;right:12px}.room-flow>span{display:none}.room-status-strip{bottom:12px;left:12px}.room-status-strip button{min-width:68px;padding:6px}.room-identity{padding-block-end:48px}}.thermostat-stage{width:min(238px,58vw)!important}.temperature-ring{-webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 11px),#000 0);mask:radial-gradient(farthest-side,#0000 calc(100% - 11px),#000 0)}.current-ring{inset:15px}.thermostat-stage:before{inset:34px}.thermostat-dial strong{font-size:58px}.thermostat-dial .target-label{padding:5px 10px;font-size:12px}.thermostat-dial .target-label b{font-size:17px}@media (max-height:900px) and (min-width:761px){.thermostat-stage{width:195px!important}.thermostat-dial strong{font-size:49px}}.desktop-rail.glass{background:linear-gradient(155deg,color-mix(in srgb,var(--section-color) 94%,black),color-mix(in srgb,var(--section-color) 78%,transparent));border-color:var(--line)}.desktop-rail .active{background:linear-gradient(135deg,color-mix(in srgb,var(--rail-accent) 30%,transparent),color-mix(in srgb,var(--rail-accent) 8%,transparent));border-color:color-mix(in srgb,var(--rail-accent) 42%,transparent)}.desktop-rail button.active .homeii-icon{color:var(--rail-accent)}.room-view .glass{background:linear-gradient(150deg,rgb(from var(--section-color) r g b / var(--surface-alpha)),color-mix(in srgb,var(--section-color) 70%,transparent));border-color:var(--line)}.bottom-sheet.glass,.admin-menu.glass,.status-dialog{background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 96%,black),color-mix(in srgb,var(--section-color) 86%,black));border-color:var(--line)}.theme-light .room-view .glass{background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 92%,white),color-mix(in srgb,var(--section-color) 78%,transparent));color:var(--text)}.theme-light .thermostat{background:linear-gradient(150deg,color-mix(in srgb,var(--mode-color) 8%,var(--section-color)),color-mix(in srgb,var(--section-color) 84%,white))!important}.theme-light .thermostat-dial strong{color:var(--text)}.theme-light .thermostat-dial .target-label{color:var(--text);background:#1e242c12}.flow-launcher{z-index:6;width:270px;position:absolute;top:220px;left:clamp(34px,4vw,64px);right:auto}.flow-trigger{color:#fff;text-align:start;cursor:pointer;border-radius:20px;grid-template-columns:38px minmax(0,1fr) 20px;align-items:center;gap:9px;width:100%;min-height:58px;padding:8px 11px;display:grid}.flow-trigger>.homeii-icon{color:#a8ceff;width:26px;height:26px}.flow-trigger>span{flex-direction:column;display:flex}.flow-trigger small{color:#ffffff8f;font-size:8px}.flow-trigger strong{font-size:12px}.flow-launcher .intent-dock{grid-template-columns:repeat(3,1fr);width:100%;padding:6px;display:grid;position:absolute;top:calc(100% + 7px);left:0;right:auto}.flow-launcher .intent-dock button{min-height:68px}.flow-launcher .intent-title{display:none}.room-flow-launcher{z-index:6;width:235px;position:absolute;top:22px;left:22px;right:auto}.room-flow-trigger{color:#fff;text-align:start;cursor:pointer;border-radius:18px;grid-template-columns:34px minmax(0,1fr) 18px;align-items:center;gap:8px;width:100%;min-height:52px;padding:7px 10px;display:grid}.room-flow-trigger>.homeii-icon{color:#9dc6ff;width:23px;height:23px}.room-flow-trigger span{flex-direction:column;display:flex}.room-flow-trigger small{color:#ffffff8f;font-size:8px}.room-flow-trigger strong{font-size:10px}.room-flow-launcher .room-flow{grid-template-columns:repeat(3,1fr);width:100%;padding:6px;display:grid;position:absolute;top:calc(100% + 6px);left:0;right:auto}.room-flow-launcher .room-flow button{flex-direction:column;min-height:61px}.room-flow-launcher .room-flow .homeii-icon{color:#9dc6ff;width:20px;height:20px}@media (min-width:761px){.app{height:100dvh;min-height:0;overflow:hidden}.content-shell{height:calc(100dvh - 36px);overflow:hidden}.room-view{grid-template-rows:minmax(270px,40%) 58px minmax(0,1fr);gap:10px;height:100%;display:grid;overflow:hidden}.room-hero{height:100%;min-height:0}.room-zones{background:color-mix(in srgb,var(--section-color) 78%,transparent);border:1px solid var(--line);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);border-radius:18px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:5px;padding:5px;display:grid;position:relative}.room-zones button{min-width:0;color:var(--muted);cursor:pointer;background:0 0;border:0;border-radius:13px;justify-content:center;align-items:center;gap:7px;display:flex}.room-zones button.active{color:var(--text);background:rgb(from var(--tile-color) r g b / var(--tile-alpha));box-shadow:inset 0 1px #ffffff1f}.room-layout,.intent-cinema .room-layout{height:100%;min-height:0;display:block;overflow:hidden}.room-zone,.intent-cinema .room-zone-media,.intent-cinema .room-zone-lights,.intent-cinema .room-zone-scenes{height:100%;display:none;overflow:hidden}.room-zone.selected,.intent-cinema .room-zone.selected{animation:.22s zone-in;display:block}.room-zone.selected>section,.room-zone.selected.device-panel{height:100%;min-height:0;overflow:hidden}.device-panel,.thermostat,.media-control,.scene-panel{height:100%;padding:14px}.light-grid{grid-template-rows:repeat(3,minmax(0,1fr));grid-template-columns:repeat(3,minmax(0,1fr));align-content:stretch;height:calc(100% - 66px)}.light-control{height:100%;min-height:0}.light-main{min-height:58px}.swipe-hint{height:15px}.widget-pagination{position:absolute;inset-block-end:10px;inset-inline-end:14px}.thermostat{grid-template:\"head head\"\"dial history\"minmax(52px,1fr)\"dial step\"\"dial modes\"/minmax(300px,.9fr) minmax(360px,1.1fr);column-gap:22px;display:grid}.thermostat>.widget-heading{grid-area:head}.thermostat-stage{grid-area:dial;align-self:center}.thermostat>.temperature-history{grid-area:history;align-self:end}.thermostat>.temperature-stepper{grid-area:step}.thermostat>.mode-row{grid-area:modes}.thermostat-stage{width:min(250px,26vw)!important}.temperature-history{height:90px}.temperature-history svg{height:66px}.mode-row{overflow:hidden}.control-grid{height:calc(50% - 8px);overflow:hidden}.hero{height:50%;min-height:0}}.widget-pagination{align-items:center;gap:6px;display:flex}.widget-pagination button{border:1px solid var(--line);width:28px;height:28px;color:var(--text);background:rgb(from var(--tile-color) r g b / var(--tile-alpha));cursor:pointer;border-radius:10px;place-items:center;display:grid}.widget-pagination button:disabled{opacity:.3}.widget-pagination span{color:var(--muted);font-variant-numeric:tabular-nums;font-size:10px}.security-panel{padding:16px}.security-grid{grid-template-rows:repeat(3,minmax(0,1fr));grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;height:calc(100% - 60px);display:grid}.security-grid article{background:rgb(from var(--tile-color) r g b / var(--tile-alpha));border:1px solid var(--line);border-radius:17px;align-items:center;gap:10px;min-width:0;padding:12px;display:flex}.security-grid article>ha-icon{color:#66d2a5}.security-grid article.alert{background:#96262624;border-color:#ff6f6f6b}.security-grid article.alert>ha-icon{color:#f77}.security-grid article span{flex-direction:column;min-width:0;display:flex}.security-grid strong{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}.security-grid small{color:var(--muted);font-size:9px}.status-card.active.status-security .status-card-icon{color:#ff8585}.status-dialog.status-security{--status-color:#ff8585}@media (max-width:760px){.flow-launcher{width:auto;top:68px;left:16px;right:16px}.flow-launcher .intent-dock{width:100%}.room-flow-launcher{width:210px;top:56px;left:12px;right:auto}.room-status-strip{bottom:10px}}.hero,.room-hero{border-color:color-mix(in srgb,var(--line) 65%,transparent);box-shadow:inset 0 0 0 1px #ffffff09,0 18px 55px #0000002e}.hero:before,.room-hero:before{content:none}.room-zones button.active{color:var(--text);border:1px solid color-mix(in srgb,var(--rail-accent) 38%,transparent);background:color-mix(in srgb,var(--rail-accent) 17%,rgb(from var(--tile-color) r g b / var(--tile-alpha)))}.status-card.active.status-light .status-card-icon{color:var(--accent)}.status-card.active.status-climate .status-card-icon{color:var(--cool)}.status-card.active.status-media_player .status-card-icon{color:var(--rail-accent)}.room-status-strip button.active{color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.room-status-strip button.climate{color:var(--cool);background:color-mix(in srgb,var(--cool) 14%,transparent)}.room-status-strip button.media{color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 14%,transparent)}@media (max-width:760px){.app{height:auto;min-height:100dvh;padding:10px 10px calc(86px + env(safe-area-inset-bottom));overflow:hidden auto}.content-shell{height:auto;overflow:visible}.topbar{z-index:12;position:relative}.hero{background-position:58%;height:430px;min-height:430px;padding:18px;display:block}.hero-copy{inset-inline:18px;z-index:2;padding:0;position:absolute;top:18px}.hero-copy .eyebrow{font-size:11px}.hero-copy h1{max-width:9ch;font-size:38px}.hero-copy p{margin-top:6px;font-size:11px}.hero-time{position:absolute;top:20px;left:18px;right:auto}.hero-time time{font-size:32px}.hero-time span{font-size:11px}.flow-launcher{z-index:8;width:auto;top:145px;left:16px;right:16px}.flow-trigger{min-height:54px}.flow-launcher .intent-dock{z-index:10;top:calc(100% + 6px)}.status-carousel{z-index:4;width:auto;margin:0;padding:2px;position:absolute;bottom:12px;left:12px;right:12px}.status-card{flex-basis:190px;min-height:64px}.room-view{height:auto;display:block;overflow:visible}.room-hero{height:310px;min-height:310px;padding:14px}.room-back{z-index:8;position:absolute;top:12px;right:12px}.room-identity{padding:0;position:absolute;bottom:74px;right:16px}.room-identity h1{font-size:34px}.room-identity p{font-size:11px}.room-metrics{display:none}.room-flow-launcher{width:190px;top:12px;left:12px;right:auto}.room-flow-launcher .room-flow{z-index:10}.room-status-strip{grid-template-columns:repeat(3,minmax(0,1fr));width:auto;display:grid;bottom:10px;left:12px;right:12px}.room-status-strip button{justify-content:center;min-width:0;padding:6px}.room-status-strip button span{align-items:center}.room-status-strip small{font-size:7px}.room-zones{z-index:3;grid-template-columns:repeat(auto-fit,minmax(62px,1fr));gap:4px;margin-top:9px;padding:4px;display:grid;position:relative}.room-zones button{flex-direction:column;gap:1px;min-height:50px;padding:4px}.room-zones button span{font-size:8px}.room-layout,.intent-cinema .room-layout{height:auto;margin-top:9px;display:block;overflow:visible}.room-zone,.intent-cinema .room-zone-media,.intent-cinema .room-zone-lights,.intent-cinema .room-zone-scenes{height:auto;display:none;overflow:visible}.room-zone.selected,.intent-cinema .room-zone.selected{display:block}.room-zone.selected>section,.room-zone.selected.device-panel{height:auto;overflow:visible}.device-panel,.thermostat,.media-control,.scene-panel,.security-panel{height:auto;padding:13px}.light-grid{grid-template-rows:none;grid-template-columns:repeat(2,minmax(0,1fr));height:auto;display:grid}.light-control{height:auto;min-height:102px}.widget-pagination{justify-content:center;margin-top:8px;position:static}.thermostat{display:block}.thermostat-stage{width:min(220px,67vw)!important}.temperature-history{height:62px}.temperature-history svg{height:42px}.mode-row{overflow-x:auto}.security-grid{grid-template-rows:none;grid-template-columns:1fr;height:auto}.admin-menu{z-index:120;inset:58px 10px calc(84px + env(safe-area-inset-bottom));width:auto;max-height:none;position:fixed}.status-dialog-layer,.sheet-layer{z-index:130;padding-bottom:calc(82px + env(safe-area-inset-bottom))}.mobile-nav{z-index:100}}@media (max-width:390px){.hero{height:450px;min-height:450px}.light-grid{grid-template-columns:1fr}.room-flow-launcher{width:170px}.room-status-strip button ha-icon{--mdc-icon-size:17px}}.app.ha-narrow{width:100%!important;max-width:none!important;height:auto!important;min-height:100dvh!important;padding:10px 10px calc(86px + env(safe-area-inset-bottom))!important;overflow:hidden auto!important}.ha-narrow .desktop-rail{display:none!important}.ha-narrow .content-shell{width:100%!important;max-width:none!important;height:auto!important;margin:0!important;display:block!important;overflow:visible!important}.ha-narrow .topbar{z-index:12;position:relative;display:flex!important}.ha-narrow .mobile-nav{display:grid!important}.ha-narrow .hero{width:100%!important;height:430px!important;min-height:430px!important;padding:18px!important;display:block!important}.ha-narrow .hero-copy{inset-inline:18px;padding:0;position:absolute;top:18px}.ha-narrow .hero-copy h1{font-size:38px}.ha-narrow .hero-time{position:absolute;top:20px;left:18px;right:auto}.ha-narrow .hero-time time{font-size:32px}.ha-narrow .flow-launcher{width:auto;top:145px;left:16px;right:16px}.ha-narrow .status-carousel{width:auto;margin:0;position:absolute;bottom:12px;left:12px;right:12px}.ha-narrow .status-card{flex-basis:190px}.ha-narrow .control-grid{grid-template-columns:1fr!important;width:100%!important;height:auto!important;display:grid!important;overflow:visible!important}.ha-narrow .quick-panel,.ha-narrow .context-panel{width:100%;min-width:0}.ha-narrow .quick-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.ha-narrow .room-view{width:100%!important;height:auto!important;display:block!important;overflow:visible!important}.ha-narrow .room-hero{width:100%!important;height:310px!important;min-height:310px!important}.ha-narrow .room-metrics{display:none}.ha-narrow .room-flow-launcher{width:190px;top:12px;left:12px;right:auto}.ha-narrow .room-status-strip{grid-template-columns:repeat(3,minmax(0,1fr));width:auto;display:grid;bottom:10px;left:12px;right:12px}.ha-narrow .room-zones{margin-top:9px;grid-template-columns:repeat(auto-fit,minmax(62px,1fr))!important;display:grid!important}.ha-narrow .room-layout{width:100%!important;height:auto!important;display:block!important;overflow:visible!important}.ha-narrow .room-zone{width:100%!important;min-width:0!important;height:auto!important;display:none!important;overflow:visible!important}.ha-narrow .room-zone.selected{display:block!important}.ha-narrow .room-zone.selected>section,.ha-narrow .room-zone.selected.device-panel{display:block;width:100%!important;min-width:0!important;height:auto!important;overflow:visible!important}.ha-narrow .light-grid{grid-template-rows:none!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;height:auto!important}.ha-narrow .thermostat{grid-template-columns:none!important;display:block!important}.ha-narrow .thermostat-stage{width:min(220px,67vw)!important}.ha-narrow .security-grid{grid-template-rows:none;grid-template-columns:1fr;height:auto}.ha-narrow .admin-menu{inset:58px 10px calc(84px + env(safe-area-inset-bottom));width:auto;max-height:none;position:fixed}.room-status-settings{z-index:7;color:#fff;cursor:pointer;border-radius:13px;place-items:center;width:36px;height:36px;display:grid;position:absolute;bottom:22px;left:calc(30px + min(430px,42%))}.room-status-config{z-index:12;border-radius:18px;width:230px;padding:13px;position:absolute;bottom:68px;left:22px}.room-status-config>strong{margin-bottom:8px;font-size:12px;display:block}.room-status-config label{min-height:34px;color:var(--text);justify-content:space-between;align-items:center;font-size:11px;display:flex}.room-status-config input{accent-color:var(--rail-accent)}.ha-narrow .room-status-settings{bottom:58px;left:auto;right:12px}.ha-narrow .room-status-config{width:auto;bottom:58px;left:12px;right:12px}.app.ha-narrow,.app.ha-narrow button{font-size:17px}.app.ha-narrow{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;line-height:1.35}.app.ha-narrow small{line-height:1.35;font-size:12px!important}.app.ha-narrow button{min-height:44px}.app.ha-narrow .icon-button{width:44px;height:44px}.app.ha-narrow .homeii-icon{width:26px;height:26px}.app.ha-narrow .brand{font-size:17px}.app.ha-narrow .brand-mark{width:44px;height:44px}.app.ha-narrow .hero-copy .eyebrow,.app.ha-narrow .hero p,.app.ha-narrow .hero-time span{font-size:14px!important}.app.ha-narrow .hero-copy h1{line-height:1.05;font-size:42px!important}.app.ha-narrow .hero-time time{font-size:38px!important}.app.ha-narrow .flow-trigger{min-height:64px}.app.ha-narrow .flow-trigger strong{font-size:16px}.app.ha-narrow .intent-dock button{min-height:82px}.app.ha-narrow .intent-dock button b{font-size:14px}.app.ha-narrow .status-card{grid-template-columns:50px minmax(0,1fr) 22px;min-height:78px}.app.ha-narrow .status-card-icon{width:48px;height:48px}.app.ha-narrow .status-card-icon ha-icon{--mdc-icon-size:26px}.app.ha-narrow .status-card strong{font-size:15px}.app.ha-narrow .action-button{min-height:108px}.app.ha-narrow .action-button strong{font-size:15px}.app.ha-narrow .section-heading h2{font-size:22px}.app.ha-narrow .context-row{min-height:62px;font-size:15px}.app.ha-narrow .mobile-nav{min-height:72px}.app.ha-narrow .mobile-nav button{min-height:60px}.app.ha-narrow .mobile-nav button ha-icon{--mdc-icon-size:25px!important}.app.ha-narrow .mobile-nav button span{font-size:11px!important}.app.ha-narrow .room-identity h1{font-size:40px!important}.app.ha-narrow .room-identity p{font-size:14px!important}.app.ha-narrow .room-flow-trigger{min-height:60px}.app.ha-narrow .room-flow-trigger strong{font-size:14px}.app.ha-narrow .room-status-strip button{min-height:56px}.app.ha-narrow .room-status-strip button ha-icon{--mdc-icon-size:24px}.app.ha-narrow .room-status-strip b{font-size:16px}.app.ha-narrow .room-zones button{min-height:60px!important}.app.ha-narrow .room-zones button span{font-size:12px!important}.app.ha-narrow .widget-heading{grid-template-columns:48px minmax(0,1fr) auto}.app.ha-narrow .widget-glyph{width:46px;height:46px}.app.ha-narrow .widget-heading h2{font-size:20px}.app.ha-narrow .state-pill{min-height:36px;font-size:12px}.app.ha-narrow .light-control{min-height:124px}.app.ha-narrow .light-main{grid-template-columns:48px minmax(0,1fr) 28px;min-height:86px}.app.ha-narrow .light-orb{width:46px;height:46px}.app.ha-narrow .light-main strong{font-size:16px}.app.ha-narrow .light-main>ha-icon{--mdc-icon-size:23px}.app.ha-narrow .swipe-hint{height:24px;font-size:11px}.app.ha-narrow .thermostat-dial strong{font-size:58px}.app.ha-narrow .temperature-stepper button,.app.ha-narrow .transport button{min-width:44px;min-height:44px}.app.ha-narrow .mode-row button{min-width:68px;min-height:64px}.app.ha-narrow .now-playing strong{font-size:17px}.app.ha-narrow .scene-row button{min-height:76px;font-size:14px}.app.ha-narrow .security-grid strong{font-size:15px}@media (max-width:760px){.app{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;font-size:17px}.app small{font-size:12px!important}.app button{min-height:44px}.mobile-nav button span{font-size:11px!important}.room-zones button span{font-size:12px!important}.light-main strong{font-size:16px}.light-main small{font-size:12px!important}.widget-heading h2{font-size:20px}.widget-heading small{font-size:12px!important}}.app{--ui-surface:rgb(from var(--section-color) r g b / var(--surface-alpha));--ui-surface-strong:color-mix(in srgb,var(--section-color) 94%,var(--bg));--ui-tile:rgb(from var(--tile-color) r g b / var(--tile-alpha));--ui-tile-soft:color-mix(in srgb,var(--tile-color) 72%,transparent);--ui-selected:color-mix(in srgb,var(--rail-accent) 20%,var(--ui-tile));--ui-selected-line:color-mix(in srgb,var(--rail-accent) 48%,transparent);--ui-popup:color-mix(in srgb,var(--section-color) 96%,var(--bg));--ui-icon:var(--cool);--ui-shadow:#00000038}.glass,.room-view .glass{color:var(--text);background:linear-gradient(145deg,color-mix(in srgb,var(--ui-surface) 96%,white 4%),var(--ui-surface))!important;border-color:var(--line)!important;box-shadow:inset 0 1px color-mix(in srgb,var(--text) 12%,transparent),0 18px 48px var(--ui-shadow)!important}.glass-soft{color:var(--text);background:color-mix(in srgb,var(--section-color) 68%,transparent)!important;border-color:var(--line)!important}.theme-light .glass,.theme-light .room-view .glass{background:linear-gradient(145deg,color-mix(in srgb,var(--section-color) 94%,white),color-mix(in srgb,var(--section-color) 82%,white))!important;box-shadow:inset 0 1px #ffffffe6,0 16px 42px #2c272221!important}.theme-light .glass-soft{background:color-mix(in srgb,var(--section-color) 78%,#ffffff9e)!important}.desktop-rail.glass{background:linear-gradient(160deg,var(--ui-surface-strong),color-mix(in srgb,var(--section-color) 82%,var(--bg)))!important}.desktop-rail button{color:var(--muted)}.desktop-rail button .homeii-icon{color:var(--rail-icon)!important}.desktop-rail button.active,.room-zones button.active,.mobile-nav button.active{color:var(--text)!important;background:var(--ui-selected)!important;border-color:var(--ui-selected-line)!important}.desktop-rail button.active .homeii-icon,.room-zones button.active .homeii-glyph,.room-zones button.active>ha-icon{color:var(--rail-accent)!important}.rail-live ha-icon,.context-icon,.panel-title>span,.widget-glyph{color:var(--ui-icon)}.light-control,.action-button,.scene-row button,.sheet-item,.security-grid article,.state-pill,.mode-row button,.temperature-stepper button,.transport button{color:var(--text);border-color:var(--line);background:var(--ui-tile)!important}.light-control:not(.active){filter:none}.light-control.active,.action-button.active{background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 27%,var(--ui-tile)),color-mix(in srgb,var(--accent) 10%,var(--ui-tile)))!important;border-color:color-mix(in srgb,var(--accent) 55%,transparent)!important}.light-control.active .light-orb,.action-button.active span{color:var(--accent)}.status-card{color:var(--text);background:var(--ui-tile)!important;border-color:var(--line)!important}.status-card small,.status-entity-list article small{color:var(--muted)}.status-dialog,.bottom-sheet.glass,.admin-menu.glass,.room-status-config.glass{color:var(--text);background:linear-gradient(150deg,color-mix(in srgb,var(--ui-popup) 96%,white 4%),var(--ui-popup))!important;border-color:var(--line)!important}.theme-light .status-dialog,.theme-light .bottom-sheet.glass,.theme-light .admin-menu.glass,.theme-light .room-status-config.glass{background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 94%,white),color-mix(in srgb,var(--section-color) 84%,white))!important}.admin-menu-head{color:var(--text);background:color-mix(in srgb,var(--ui-popup) 94%,transparent)!important}.sheet-item,.status-entity-list article,.appearance-group{color:var(--text);background:var(--ui-tile)!important}.bottom-sheet h2,.admin-menu h3,.status-dialog h2,.section-heading h2,.widget-heading h2,.panel-title h2{color:var(--text)}.thermostat{background:linear-gradient(145deg,color-mix(in srgb,var(--mode-color) 13%,var(--ui-surface)),var(--ui-surface))!important}.thermostat-stage:before{background:color-mix(in srgb,var(--tile-color) 62%,var(--bg))!important}.theme-light .thermostat-stage:before{background:color-mix(in srgb,var(--tile-color) 45%,white)!important}.thermostat-dial strong,.theme-light .thermostat-dial strong{color:var(--text)}.media-control{background:linear-gradient(145deg,color-mix(in srgb,var(--mode-color) 9%,var(--ui-surface)),var(--ui-surface))!important}.hero,.room-hero{background-clip:padding-box;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 14%,transparent),0 14px 42px #00000029!important;border:0!important;outline:0!important}.hero-overlay,.room-hero-shade{border-radius:inherit;inset:1px}.room-status-strip{grid-template-columns:repeat(4,minmax(72px,1fr));gap:4px;width:auto;max-width:min(430px,100% - 90px);overflow:hidden;display:grid!important}.room-status-strip button{text-align:start;grid-template-columns:24px minmax(0,1fr);align-items:center;gap:6px;justify-content:stretch!important;width:auto!important;min-width:0!important;display:grid!important}.room-status-strip button span{min-width:0;align-items:flex-start!important}.room-status-strip button b,.room-status-strip button small{text-overflow:ellipsis;white-space:nowrap;max-width:100%;overflow:hidden}.room-status-settings{color:var(--rail-accent)}@media (max-width:760px){.room-status-strip,.ha-narrow .room-status-strip{grid-template-columns:repeat(3,minmax(0,1fr));max-width:none}.room-status-strip button{grid-template-columns:22px minmax(0,1fr)}.hero,.room-hero{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 12%,transparent),0 10px 28px #00000024!important}}.room-status-cards{z-index:4;width:min(850px,58%);max-width:calc(100% - 44px);position:absolute;bottom:22px;left:22px;right:auto}.room-status-cards .status-card{flex-basis:205px}.room-hero-actions{z-index:8;align-items:center;gap:7px;display:flex;position:relative}.room-hero-actions .room-status-settings{width:42px;height:42px;color:var(--rail-accent);cursor:pointer;border-radius:14px;place-items:center;display:grid;position:static}.room-status-config{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:16px;display:grid;width:min(520px,100% - 44px)!important;inset:76px 22px auto auto!important}.room-status-config section{background:var(--ui-tile);border-radius:14px;min-width:0;padding:10px}.room-status-config section>strong{margin-bottom:7px;font-size:13px;display:block}.room-status-config label{min-height:38px}.room-metrics{z-index:5;background:color-mix(in srgb,var(--section-color) 70%,transparent)!important}.room-metrics span{min-width:108px}.room-metrics strong{font-size:22px}.room-metrics ha-icon{--mdc-icon-size:24px;color:var(--rail-accent)}.flow-launcher .intent-dock{top:auto!important;bottom:calc(100% + 7px)!important}.flow-launcher.open{z-index:20}.rail-live span{grid-template-columns:30px minmax(0,1fr) auto;min-height:44px}.rail-live ha-icon{--mdc-icon-size:23px}.rail-live b{font-size:13px}.rail-live small{font-size:11px}.rail-weather ha-icon{animation:3s ease-in-out infinite alternate rail-weather-float}.rail-power ha-icon{animation:1.8s ease-in-out infinite alternate rail-power-pulse}.rail-lights.is-on ha-icon{animation:2s ease-in-out infinite alternate rail-glow}@keyframes rail-weather-float{to{filter:drop-shadow(0 3px 6px color-mix(in srgb,var(--cool) 45%,transparent));transform:translateY(-2px)}}@keyframes rail-power-pulse{to{opacity:.55;filter:drop-shadow(0 0 7px var(--accent))}}@media (max-width:760px){.room-status-cards,.ha-narrow .room-status-cards{width:auto;max-width:none;bottom:10px;left:12px;right:12px}.room-status-cards .status-card{flex-basis:185px}.room-hero-actions{position:absolute;top:12px;right:12px}.room-flow-launcher,.ha-narrow .room-flow-launcher{top:12px;left:12px}.room-metrics,.ha-narrow .room-metrics{padding:4px;inset:72px 12px auto auto;display:flex!important}.room-metrics span{min-width:82px;padding:7px}.room-metrics strong{font-size:17px}.room-metrics ha-icon{--mdc-icon-size:20px}.room-identity{bottom:98px!important}.room-status-config,.ha-narrow .room-status-config{grid-template-columns:1fr;max-height:220px;position:absolute;overflow:auto;width:auto!important;inset:64px 12px auto!important}.flow-launcher .intent-dock{top:calc(100% + 6px)!important;bottom:auto!important}}.room-metrics{gap:4px;width:max-content;max-width:calc(100% - 44px);padding:5px;display:flex;position:absolute!important;inset:86px 22px auto auto!important}.room-metrics span{grid-template-rows:auto auto;grid-template-columns:26px auto;align-items:center;column-gap:8px;display:grid;position:relative}.room-metrics span:before{content:attr(data-label);display:none}.room-metrics ha-icon{grid-row:1/-1}.room-metrics strong{white-space:nowrap}@media (max-width:760px){.room-metrics,.ha-narrow .room-metrics{max-width:calc(100% - 24px);inset:70px 12px auto auto!important}.room-metrics span{min-width:76px!important;padding:7px!important}.room-metrics strong{font-size:17px!important}}.special-view{grid-template-rows:auto minmax(0,1fr);gap:12px;min-width:0;height:calc(100dvh - 72px);display:grid}.special-header{border-radius:var(--panel-radius);grid-template-columns:auto 1fr auto;align-items:center;gap:16px;min-height:84px;padding:14px 20px;display:grid}.special-header>div{text-align:right}.special-header small{color:var(--muted);font-size:10px}.special-header h1{margin:2px 0 0;font-size:27px}.special-back{border:1px solid var(--line);min-height:48px;color:var(--text);background:var(--ui-tile);cursor:pointer;border-radius:16px;align-items:center;gap:7px;padding:0 14px;display:flex}.special-title-icon{width:54px;height:54px;color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 15%,var(--ui-tile));border:1px solid color-mix(in srgb,var(--rail-accent) 24%,var(--line));border-radius:18px;place-items:center;display:grid}.special-title-icon ha-icon{--mdc-icon-size:29px}.special-content{min-height:0;padding:1px 2px 5px;overflow:auto}.special-content>.glass,.special-content>div{animation:.32s cubic-bezier(.2,.8,.2,1) special-in}@keyframes special-in{0%{opacity:0;transform:translateY(8px)scale(.995)}}.special-empty{border-radius:var(--panel-radius);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:9px;height:100%;min-height:280px;display:flex}.special-empty ha-icon{--mdc-icon-size:52px;color:var(--rail-accent)}.special-empty strong{font-size:21px}.special-empty small{color:var(--muted)}.camera-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(230px,1fr);gap:12px;height:100%;display:grid}.camera-card{border-radius:var(--panel-radius);cursor:pointer;min-width:0;padding:8px;overflow:hidden}.camera-feed{border-radius:calc(var(--panel-radius) - 7px);background:#090b0f 50%/cover no-repeat;height:calc(100% - 57px);min-height:180px;position:relative;overflow:hidden}.camera-feed:after{content:\"\";background:linear-gradient(#0000 58%,#0000006b);position:absolute;inset:0}.camera-feed>ha-icon{z-index:2;color:#fff;position:absolute;bottom:14px;left:15px}.live-badge{z-index:2;color:#fff;letter-spacing:.1em;background:#080c12a6;border-radius:999px;padding:6px 9px;font-size:9px;position:absolute;top:13px;right:13px}.live-badge i{background:#6ee7a8;border-radius:50%;width:6px;height:6px;margin-left:5px;animation:1.4s infinite live-pulse;display:inline-block;box-shadow:0 0 9px #6ee7a8}@keyframes live-pulse{50%{opacity:.35}}.camera-card footer{justify-content:space-between;align-items:center;height:57px;padding:6px 10px;display:flex}.camera-card footer div{flex-direction:column;display:flex}.camera-card footer small{color:var(--muted)}.camera-card footer>ha-icon{color:var(--cool)}.weather-layout{grid-template-rows:minmax(250px,1fr) auto;gap:12px;height:100%;display:grid}.weather-now{border-radius:var(--panel-radius);grid-template-columns:auto 1fr auto;align-items:center;gap:24px;padding:28px;display:grid;background:linear-gradient(135deg,color-mix(in srgb,var(--cool) 18%,var(--ui-surface)),var(--ui-surface))!important}.weather-now>ha-icon{--mdc-icon-size:92px;color:var(--cool);filter:drop-shadow(0 14px 24px color-mix(in srgb,var(--cool) 35%,transparent));animation:4s ease-in-out infinite alternate weather-breathe}@keyframes weather-breathe{to{transform:translateY(-5px)rotate(2deg)}}.weather-now>div{flex-direction:column;display:flex}.weather-now strong{font-size:72px;line-height:1}.weather-now span,.weather-now small{color:var(--muted)}.weather-now dl{gap:10px;display:flex}.weather-now dl div{background:var(--ui-tile);text-align:center;border-radius:18px;min-width:90px;padding:14px}.weather-now dt{color:var(--muted);font-size:10px}.weather-now dd{margin:5px 0 0;font-size:18px;font-weight:700}.forecast-strip{border-radius:var(--panel-radius);grid-template-columns:repeat(5,1fr);gap:6px;padding:10px;display:grid}.forecast-strip article{background:var(--ui-tile);border-radius:17px;flex-direction:column;justify-content:center;align-items:center;gap:6px;min-height:105px;display:flex}.forecast-strip ha-icon{color:var(--cool)}.metric-grid,.special-entity-grid,.media-widget-grid,.device-widget-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;display:grid}.metric-card{border-radius:var(--panel-radius);flex-direction:column;min-height:210px;padding:20px;display:flex;overflow:hidden}.metric-card>span{width:44px;height:44px;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,var(--ui-tile));border-radius:15px;place-items:center;display:grid}.metric-card small{color:var(--muted);margin-top:16px}.metric-card strong{font-size:31px}.metric-card em{color:var(--muted);margin-right:4px;font-size:11px;font-style:normal}.metric-wave{align-items:end;gap:4px;height:45px;margin-top:auto;display:flex}.metric-wave i{background:linear-gradient(var(--cool),color-mix(in srgb,var(--cool) 15%,transparent));border-radius:5px 5px 1px 1px;flex:1;min-height:10%;animation:2.4s ease-in-out infinite alternate wave}.metric-wave i:nth-child(2n){animation-delay:-1s}@keyframes wave{to{opacity:.65;transform:scaleY(.72)}}.vacuum-widget{border-radius:var(--panel-radius);text-align:center;min-height:340px;padding:24px}.vacuum-widget.active{background:linear-gradient(145deg,color-mix(in srgb,#6ee7a8 13%,var(--ui-surface)),var(--ui-surface))!important}.vacuum-orbit{background:var(--ui-tile);width:130px;height:130px;box-shadow:inset 0 0 0 1px var(--line);border-radius:50%;place-items:center;margin:8px auto 18px;display:grid;position:relative}.vacuum-orbit ha-icon{--mdc-icon-size:65px}.vacuum-orbit i{border:2px dashed color-mix(in srgb,var(--cool) 55%,transparent);border-radius:50%;animation:9s linear infinite orbit;position:absolute;inset:-8px}@keyframes orbit{to{transform:rotate(360deg)}}.vacuum-widget p{color:var(--muted)}.widget-actions{grid-template-columns:repeat(3,1fr);gap:7px;margin-top:24px;display:grid}.widget-actions button{border:1px solid var(--line);min-height:58px;color:var(--text);background:var(--ui-tile);cursor:pointer;border-radius:16px;flex-direction:column;justify-content:center;align-items:center;gap:3px;display:flex}.widget-actions button ha-icon{color:var(--cool)}.entity-widget{border-radius:22px;min-height:105px;padding:8px}.entity-main{width:100%;color:var(--text);text-align:right;cursor:pointer;background:0 0;border:0;grid-template-columns:46px 1fr 10px;align-items:center;gap:10px;display:grid}.entity-main>span{background:var(--ui-tile);border-radius:15px;place-items:center;width:44px;height:44px;display:grid}.entity-main div{flex-direction:column;display:flex}.entity-main small{color:var(--muted)}.entity-main>i{background:var(--muted);border-radius:50%;width:7px;height:7px}.entity-widget.active{border-color:color-mix(in srgb,var(--accent) 48%,var(--line));background:linear-gradient(115deg,color-mix(in srgb,var(--accent) 18%,var(--ui-surface)),var(--ui-surface))!important}.entity-widget.active .entity-main>span,.entity-widget.active .entity-main>i{color:var(--accent);background:var(--accent);box-shadow:0 0 18px color-mix(in srgb,var(--accent) 42%,transparent)}.entity-widget input{width:calc(100% - 16px);accent-color:var(--accent);margin:8px}.media-widget-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-widget{border-radius:var(--panel-radius);grid-template-columns:92px 1fr auto;align-items:center;gap:15px;min-height:180px;padding:16px;display:grid}.media-widget.active{background:linear-gradient(145deg,color-mix(in srgb,var(--rail-accent) 15%,var(--ui-surface)),var(--ui-surface))!important}.media-cover{background:var(--ui-tile) center/cover;border-radius:23px;place-items:center;width:92px;height:92px;display:grid}.media-cover ha-icon{--mdc-icon-size:38px;color:var(--rail-accent)}.media-meta{flex-direction:column;min-width:0;display:flex}.media-meta strong,.media-meta span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.media-meta small,.media-meta span{color:var(--muted)}.media-buttons{align-items:center;gap:5px;display:flex}.media-buttons button{border:1px solid var(--line);width:42px;height:42px;color:var(--text);background:var(--ui-tile);cursor:pointer;border-radius:50%}.media-buttons .primary{color:#101318;background:var(--rail-accent);width:53px;height:53px}.resource-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;display:grid}.resource-row{cursor:pointer;border-radius:20px;grid-template-columns:40px 1fr auto;align-items:center;gap:10px;min-height:76px;padding:12px 15px;display:grid}.resource-row>ha-icon{color:var(--cool)}.resource-row div{flex-direction:column;display:flex}.resource-row small{color:var(--muted)}.resource-row b{font-variant-numeric:tabular-nums}.legacy-widget{border-radius:var(--panel-radius);height:100%;min-height:400px;padding:7px;overflow:hidden}.legacy-widget iframe{border-radius:calc(var(--panel-radius) - 7px);background:0 0;border:0;width:100%;height:100%}.intercom-layout{grid-template-columns:1.3fr .7fr;gap:12px;height:100%;display:grid}.intercom-layout .camera-grid{grid-template-columns:1fr}@media (max-width:1100px){.metric-grid,.special-entity-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-widget-grid{grid-template-columns:1fr}}@media (max-width:760px){.special-view,.ha-narrow .special-view{height:auto;min-height:calc(100dvh - 150px);display:block}.special-header{z-index:8;border-radius:20px;min-height:68px;padding:9px 12px;position:sticky;top:0}.special-header h1{font-size:22px}.special-header small{font-size:11px!important}.special-title-icon{width:46px;height:46px}.special-back{justify-content:center;width:46px;min-width:46px;padding:0}.special-back span{display:none}.special-content{margin-top:10px;padding-bottom:92px;overflow:visible}.camera-grid,.metric-grid,.special-entity-grid,.media-widget-grid,.resource-grid,.device-widget-grid{grid-template-columns:1fr}.camera-card{min-height:280px}.weather-layout{display:block}.weather-now{grid-template-columns:auto 1fr;padding:18px}.weather-now>ha-icon{--mdc-icon-size:60px}.weather-now strong{font-size:54px}.weather-now dl{grid-column:1/-1;width:100%}.forecast-strip{grid-template-columns:repeat(5,minmax(82px,1fr));margin-top:10px;overflow-x:auto}.media-widget{grid-template-columns:72px 1fr}.media-cover{width:72px;height:72px}.media-buttons{grid-column:1/-1;justify-content:center}.intercom-layout{display:block}.intercom-layout>.resource-grid{margin-top:10px}.legacy-widget{height:calc(100dvh - 240px)}}.music-flow-host{border-radius:var(--panel-radius);height:100%;min-height:520px;padding:8px;overflow:hidden}.music-flow-host>homeii-music-flow{width:100%;height:calc(100% - 54px);display:block;overflow:auto}.music-flow-intro{align-items:center;gap:10px;height:48px;padding:0 12px;display:flex}.music-flow-intro>span{width:36px;height:36px;color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 15%,var(--ui-tile));border-radius:12px;place-items:center;display:grid}.music-flow-intro div{flex-direction:column;display:flex}.music-flow-intro small{color:var(--muted);font-size:8px}.music-flow-intro strong{letter-spacing:.08em;font-size:14px}.music-flow-intro>i{background:#6ee7a8;border-radius:50%;width:7px;height:7px;margin-inline-start:auto;animation:1.4s infinite live-pulse;box-shadow:0 0 12px #6ee7a8}.energy-legacy{min-height:560px}.kiosk-exit{z-index:200;border:1px solid var(--line);min-height:44px;color:var(--text);background:var(--ui-popup);cursor:pointer;opacity:.42;border-radius:15px;align-items:center;gap:7px;padding:0 13px;transition:opacity .2s,transform .2s;display:flex;position:fixed;top:18px;left:18px}.kiosk-exit:hover,.kiosk-exit:focus-visible{opacity:1;transform:translateY(-1px)}.kiosk-mode .desktop-rail,.kiosk-mode .topbar,.kiosk-mode .mobile-nav{display:none!important}.kiosk-mode .content-shell{width:100%!important;max-width:none!important;margin:0!important;padding:14px!important}.kiosk-mode .special-view{height:calc(100dvh - 28px)}.kiosk-fab{z-index:45;border:1px solid var(--line);min-height:44px;color:var(--text);background:var(--ui-popup);cursor:pointer;border-radius:15px;align-items:center;gap:7px;padding:0 12px;display:flex;position:fixed;bottom:18px;left:18px}.advanced-camera-shell{min-height:260px;padding:7px;overflow:hidden}.advanced-camera-shell>advanced-camera-card{width:100%;height:100%;min-height:246px;display:block}@media (max-width:760px){.music-flow-host{min-height:calc(100dvh - 180px)}.music-flow-host>homeii-music-flow{height:auto;min-height:calc(100dvh - 240px)}.kiosk-exit{justify-content:center;width:44px;padding:0;top:10px;left:10px}.kiosk-exit span{display:none}.kiosk-mode .content-shell{padding:8px!important}.kiosk-mode .special-view{min-height:calc(100dvh - 16px)}.kiosk-mode .special-content{padding-bottom:8px}.kiosk-fab{left:12px;bottom:calc(86px + env(safe-area-inset-bottom));justify-content:center;width:46px;padding:0}.kiosk-fab span{display:none}.hero,.ha-narrow .hero{height:520px!important;min-height:520px!important;padding:16px!important}.hero-copy,.ha-narrow .hero-copy{width:58%;padding:0!important;top:18px!important;left:auto!important;right:18px!important}.hero-copy h1,.ha-narrow .hero-copy h1{max-width:100%!important;font-size:38px!important}.hero-time,.ha-narrow .hero-time{width:auto;text-align:left!important;align-items:flex-start!important;top:22px!important;left:18px!important;right:auto!important}.flow-launcher,.ha-narrow .flow-launcher{width:auto!important;top:154px!important;left:16px!important;right:16px!important}.status-carousel,.ha-narrow .status-carousel{width:auto!important;max-width:none!important;bottom:14px!important;left:12px!important;right:12px!important}.room-hero,.ha-narrow .room-hero{height:360px!important;min-height:360px!important}.room-flow-launcher,.ha-narrow .room-flow-launcher{width:180px!important;top:12px!important;left:12px!important}.room-metrics,.ha-narrow .room-metrics{inset:80px 12px auto auto!important}.room-identity,.ha-narrow .room-identity{max-width:calc(100% - 32px);bottom:102px!important;left:auto!important;right:16px!important}.room-status-cards,.ha-narrow .room-status-cards{bottom:12px!important;left:12px!important;right:12px!important}}.control-center{border-top:1px solid var(--line);direction:rtl;margin-top:14px;padding-top:14px}.control-center-title{align-items:center;gap:10px;margin-bottom:10px;display:flex}.control-center-title>span{width:42px;height:42px;color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 14%,var(--ui-tile));border-radius:14px;place-items:center;display:grid}.control-center-title div{flex-direction:column;display:flex}.control-center-title h3{margin:0;font-size:18px}.control-center-title small{color:var(--muted)}.control-center-tabs{background:var(--ui-tile);border-radius:16px;grid-template-columns:1fr 1fr;gap:6px;padding:5px;display:grid}.admin-menu .control-center-tabs button{background:0 0;border:0;justify-content:center;align-items:center;gap:7px;min-height:44px;margin:0;display:flex}.admin-menu .control-center-tabs button.selected{color:var(--text);background:color-mix(in srgb,var(--rail-accent) 18%,var(--ui-popup));border:1px solid color-mix(in srgb,var(--rail-accent) 30%,var(--line))}.room-picker{scrollbar-width:none;gap:6px;margin-top:10px;padding-bottom:4px;display:flex;overflow-x:auto}.admin-menu .room-picker button{min-width:92px;min-height:62px;color:var(--muted);background:var(--ui-tile);border-radius:15px;flex-direction:column;justify-content:center;align-items:center;gap:3px;margin:0;padding:7px;display:flex}.admin-menu .room-picker button.selected{color:var(--text);border-color:color-mix(in srgb,var(--rail-accent) 45%,var(--line));background:color-mix(in srgb,var(--rail-accent) 15%,var(--ui-tile))}.room-picker ha-icon{--mdc-icon-size:23px}.room-picker span{white-space:nowrap;font-size:11px}.manager-summary{background:var(--ui-tile);border-radius:16px;justify-content:space-between;align-items:center;margin-top:10px;padding:11px 13px;display:flex}.manager-summary>div{flex-direction:column;display:flex}.manager-summary small{color:var(--muted)}.admin-menu .manager-summary button{width:auto;min-height:36px;margin:0;padding:0 11px}.manager-groups{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px;display:grid}.manager-groups>section{background:var(--ui-tile);border:1px solid var(--line);border-radius:17px;min-width:0;padding:9px}.manager-groups>section>header{grid-template-columns:24px 1fr auto;align-items:center;gap:5px;padding:3px 4px 8px;display:grid}.manager-groups>section>header ha-icon{--mdc-icon-size:20px;color:var(--rail-accent)}.manager-groups>section>header small{color:var(--muted)}.manager-groups>section>div{gap:4px;display:grid}.manager-groups label,.camera-picker label{background:color-mix(in srgb,var(--ui-popup) 48%,transparent);border-radius:12px;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:8px;min-width:0;min-height:48px;padding:7px 9px;transition:opacity .2s,background .2s;display:grid}.manager-groups label.disabled,.camera-picker label.disabled{opacity:.48}.manager-groups label>span,.camera-picker label>span:not(.camera-picker-icon){flex-direction:column;min-width:0;display:flex}.manager-groups label strong,.camera-picker label strong{white-space:nowrap;text-overflow:ellipsis;font-size:11px;overflow:hidden}.manager-groups label small,.camera-picker label small{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;text-align:left;direction:ltr;overflow:hidden;font-size:8px!important}.manager-groups input,.camera-picker input{width:20px;height:20px;accent-color:var(--rail-accent)}.camera-picker{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px;display:grid}.camera-picker label{grid-template-columns:38px minmax(0,1fr) auto;min-height:62px}.camera-picker-icon{width:36px;height:36px;color:var(--cool);background:color-mix(in srgb,var(--cool) 12%,var(--ui-popup));border-radius:12px;place-items:center;display:grid!important}.manager-empty{min-height:120px;color:var(--muted);flex-direction:column;grid-column:1/-1;justify-content:center;align-items:center;gap:8px;display:flex}.manager-note{align-items:center;display:flex;gap:6px!important;margin:10px 0 0!important}.manager-note ha-icon{--mdc-icon-size:17px;color:#6ee7a8}@media (min-width:761px){.admin-menu:has(.control-center){width:min(720px,100vw - 280px)}}@media (max-width:760px){.manager-groups,.camera-picker{grid-template-columns:1fr}.control-center{padding-bottom:12px}.admin-menu .room-picker button{min-width:104px}.manager-groups label strong,.camera-picker label strong{font-size:15px}.manager-groups label small,.camera-picker label small{font-size:11px!important}}.profile-actions{grid-template-columns:1fr 1fr;gap:7px;display:grid}.admin-menu .profile-actions button{justify-content:center;align-items:center;gap:6px;display:flex}.manager-health{grid-template-columns:repeat(3,1fr);gap:5px;margin-top:8px;display:grid}.manager-health span{min-height:45px;color:var(--muted);background:var(--ui-tile);border-radius:13px;justify-content:center;align-items:center;gap:5px;padding:6px;font-size:10px;display:flex}.manager-health span.healthy ha-icon{color:#65d7a1}.manager-health span.warning ha-icon{color:var(--accent)}.manager-health span.issue ha-icon{color:#ff7f7f}.manager-health ha-icon{--mdc-icon-size:18px}.manager-search{border:1px solid var(--line);background:var(--ui-tile);border-radius:14px;grid-template-columns:24px 1fr 34px;align-items:center;height:44px;margin-top:8px;padding:0 9px;display:grid}.manager-search>ha-icon{--mdc-icon-size:19px;color:var(--muted)}.manager-search input{min-width:0;color:var(--text);font:inherit;background:0 0;border:0;outline:0}.admin-menu .manager-search button{background:0 0;border:0;width:32px;height:32px;min-height:32px;margin:0;padding:0}.manager-groups>section>header{grid-template-columns:24px 1fr auto auto}.group-bulk{gap:3px;display:flex}.admin-menu .group-bulk button{border-radius:9px;place-items:center;width:30px;height:30px;min-height:30px;margin:0;padding:0;display:grid}.group-bulk ha-icon{--mdc-icon-size:16px!important}.global-feedback{z-index:300;border:1px solid var(--line);min-width:230px;min-height:52px;color:var(--text);background:color-mix(in srgb,var(--ui-popup) 95%,transparent);-webkit-backdrop-filter:blur(26px)saturate(160%);backdrop-filter:blur(26px)saturate(160%);border-radius:17px;justify-content:center;align-items:center;gap:9px;padding:9px 15px;animation:.24s feedback-in;display:flex;position:fixed;bottom:24px;left:50%;transform:translate(-50%);box-shadow:0 18px 50px #0000004d}.global-feedback.success ha-icon{color:#65d7a1}.global-feedback.error ha-icon{color:#ff7f7f}.global-feedback.info ha-icon{color:var(--cool)}@media (max-width:760px){.manager-health{grid-template-columns:1fr}.manager-health span{justify-content:flex-start;padding-inline:12px;font-size:13px}.global-feedback{bottom:calc(92px + env(safe-area-inset-bottom));width:calc(100% - 32px)}.profile-actions{grid-template-columns:1fr}}.studio-launch{background:linear-gradient(135deg,color-mix(in srgb,var(--rail-accent) 28%,var(--ui-popup)),var(--ui-popup))!important;border-color:color-mix(in srgb,var(--rail-accent) 45%,var(--line))!important}.view-studio{background:#0b1018;padding:0}.view-studio .desktop-rail,.view-studio>.kiosk-fab,.view-studio .topbar,.view-studio>.mobile-nav{display:none}.view-studio .content-shell{width:100%;margin:0}.studio{color:#eef3fb;background:radial-gradient(circle at 10% 0,#1e314b 0,#0000 30%),#0b1018;min-height:100dvh;font-family:Heebo,Arial,sans-serif}.studio-topbar{-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);z-index:10;background:#101722e8;border-bottom:1px solid #ffffff17;grid-template-columns:240px 1fr auto;align-items:center;height:72px;padding:0 18px;display:grid;position:sticky;top:0}.studio-brand{align-items:center;gap:10px;display:flex}.studio-brand>span{color:#7ebcff;background:#7ebcff18;border-radius:14px;place-items:center;width:42px;height:42px;display:grid}.studio-brand div{flex-direction:column;display:flex}.studio-brand small{color:#8e9bad;font-size:10px}.studio-brand strong{font-size:18px}.studio-topbar nav{justify-content:center;gap:5px;display:flex}.studio button{font:inherit;color:inherit;cursor:pointer}.studio-topbar nav button,.studio-actions button,.viewport-switch button{background:0 0;border:1px solid #0000;border-radius:12px;min-height:40px;padding:0 14px}.studio-topbar nav button.active,.viewport-switch button.active{color:#a8ceff;background:#7ebcff1c;border-color:#7ebcff42}.studio-actions{gap:7px;display:flex}.studio-actions button{background:#ffffff0a;border-color:#ffffff18}.studio-actions .publish{color:#fff;background:#4f91e8;border-color:#7ebcff}.studio-body{grid-template-columns:240px minmax(0,1fr) 270px;min-height:calc(100dvh - 72px);display:grid}.studio-library,.studio-inspector{background:#101722b8;border-inline-end:1px solid #ffffff12;padding:16px;overflow:auto}.studio-inspector{border-inline-start:1px solid #ffffff12;border-inline-end:0}.studio-library h3,.studio-inspector h3{color:#8997a9;text-transform:uppercase;letter-spacing:.08em;margin:10px 0;font-size:12px}.studio-areas,.widget-library{gap:5px;display:grid}.studio-areas button,.widget-library button{text-align:start;background:#ffffff08;border:1px solid #0000;border-radius:14px;grid-template-columns:30px minmax(0,1fr);align-items:center;gap:7px;min-height:50px;padding:7px 10px;display:grid}.widget-library button{grid-template-columns:30px 1fr 20px}.studio-areas button.active{background:#7ebcff18;border-color:#7ebcff37}.studio-areas span{flex-direction:column;display:flex}.studio-areas small{color:#8290a2;font-size:10px}.studio-workspace{min-width:0;padding:16px;overflow:auto}.viewport-switch{justify-content:center;align-items:center;gap:4px;height:44px;margin-bottom:12px;display:flex}.viewport-switch span{color:#8492a5;margin-inline-start:auto;font-size:11px}.studio-device{background:#131b27;border:1px solid #ffffff1b;border-radius:26px;width:min(100%,1440px);min-height:700px;margin:auto;transition:max-width .25s;overflow:hidden;box-shadow:0 28px 90px #0008}.studio-mobile .studio-device{max-width:390px}.studio-tablet .studio-device{max-width:860px}.studio-device>header{background:linear-gradient(135deg,#21334d,#171d28) 50%/cover;flex-direction:column;justify-content:flex-end;height:190px;padding:28px;display:flex}.studio-device h1{margin:3px 0 0;font-size:34px}.studio-device small{color:#b7c5d8}.studio-grid{grid-template-columns:repeat(6,minmax(0,1fr));grid-auto-flow:dense;gap:10px;padding:14px;display:grid}.studio-widget{cursor:grab;background:linear-gradient(145deg,#ffffff10,#ffffff06);border:1px solid #ffffff18;border-radius:20px;grid-column:span 2;grid-template-columns:42px 1fr 20px;align-items:start;gap:10px;min-height:126px;padding:14px;transition:all .18s;display:grid}.studio-widget:hover{border-color:#7ebcff55;transform:translateY(-2px)}.studio-widget.selected{outline-offset:2px;outline:2px solid #7ebcff}.studio-widget.size-compact{grid-column:span 1}.studio-widget.size-expanded{grid-column:span 3;min-height:180px}.studio-widget.hidden{opacity:.38}.studio-widget>span{color:#8fc5ff;background:#7ebcff18;border-radius:14px;place-items:center;width:42px;height:42px;display:grid}.studio-widget div{flex-direction:column;display:flex}.studio-widget small,.studio-widget em{color:#8795a8;font-size:10px;font-style:normal}.studio-widget strong{margin:3px 0;font-size:15px}.studio-inspector label{color:#aab5c4;gap:6px;margin:12px 0;font-size:12px;display:grid}.studio-inspector input,.studio-inspector select,.studio-migration textarea{color:#eef3fb;width:100%;min-height:42px;font:inherit;background:#ffffff09;border:1px solid #ffffff1b;border-radius:12px;padding:8px 10px}.studio-check{align-items:center;display:flex!important}.studio-check input{width:20px;min-height:20px}.inspector-entities{gap:5px;margin:16px 0;display:grid}.inspector-entities code{text-align:left;color:#98bce9;text-overflow:ellipsis;direction:ltr;background:#ffffff08;border-radius:8px;padding:7px;font-size:10px;overflow:hidden}.studio-inspector .danger{color:#ff9a9a;background:#ff747414;border:1px solid #ff74743d;border-radius:12px;width:100%;min-height:42px}.studio-theme,.studio-migration{background:#141d2a;border:1px solid #ffffff18;border-radius:24px;max-width:760px;margin:40px auto;padding:24px}.studio-theme label{border-bottom:1px solid #ffffff10;justify-content:space-between;align-items:center;min-height:64px;display:flex}.studio-theme input{width:56px;height:38px}.studio-migration textarea{resize:vertical;text-align:left;direction:ltr;height:320px}.studio-migration button{background:#4f91e8;border:0;border-radius:12px;min-height:44px;margin-top:10px;padding:0 18px}.studio-migration pre{text-align:left;direction:ltr;background:#090e15;border-radius:14px;max-height:340px;padding:14px;font-size:11px;overflow:auto}.studio-notice{z-index:20;background:#182332e8;border:1px solid #ffffff20;border-radius:14px;align-items:center;gap:8px;padding:10px 14px;display:flex;position:fixed;bottom:18px;left:50%;transform:translate(-50%);box-shadow:0 12px 40px #0008}.studio-loading{place-items:center;min-height:80vh;display:grid}.studio-loading ha-icon{animation:1.2s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}@media (max-width:900px){.studio-topbar{grid-template-columns:1fr auto}.studio-topbar nav{display:none}.studio-body{grid-template-columns:1fr}.studio-library,.studio-inspector{display:none}.studio-workspace{padding:8px}.studio-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.studio-widget,.studio-widget.size-expanded{grid-column:span 2}.studio-widget.size-compact{grid-column:span 1}.studio-device>header{height:150px}.studio-actions button:not(.publish){display:none}}.template-library{grid-template-columns:1fr 1fr;gap:6px;display:grid}.template-library button{background:#ffffff07;border:1px solid #ffffff14;border-radius:14px;place-items:center;gap:3px;min-height:62px;display:grid}.template-library button.active{color:#a8ceff;background:#7ebcff16;border-color:#7ebcff55}.studio-widget.live{border-color:#77dba779;box-shadow:inset 0 0 30px #65d69b0b}.studio-widget.live>span{color:#7be4ad;background:#65d69b18}.entity-choice{background:#ffffff06;border-radius:10px;grid-template-columns:22px minmax(0,1fr);padding:7px;align-items:center!important;margin:0!important;display:grid!important}.entity-choice input{width:18px!important;min-height:18px!important}.entity-choice span{flex-direction:column;min-width:0;display:flex}.entity-choice b{color:#eef3fb;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.entity-choice small{text-align:left;white-space:nowrap;text-overflow:ellipsis;direction:ltr;overflow:hidden}.ha-card-config{text-align:left;direction:ltr;min-height:150px!important;font:11px/1.5 monospace!important}", _t = {
	"mdi:account": "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",
	"mdi:account-group": "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z",
	"mdi:alert-circle": "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
	"mdi:alert-circle-outline": "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",
	"mdi:arrow-right": "M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z",
	"mdi:autorenew": "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
	"mdi:bathtub": "M7 5C8.11 5 9 5.9 9 7S8.11 9 7 9 5 8.11 5 7 5.9 5 7 5M20 13V4.83C20 3.27 18.73 2 17.17 2C16.42 2 15.7 2.3 15.17 2.83L13.92 4.08C13.76 4.03 13.59 4 13.41 4C13 4 12.64 4.12 12.33 4.32L15.09 7.08C15.29 6.77 15.41 6.4 15.41 6C15.41 5.82 15.38 5.66 15.34 5.5L16.59 4.24C16.74 4.09 16.95 4 17.17 4C17.63 4 18 4.37 18 4.83V13H11.15C10.85 12.79 10.58 12.55 10.33 12.28L8.93 10.73C8.74 10.5 8.5 10.35 8.24 10.23C7.93 10.08 7.59 10 7.24 10C6 10 5 11 5 12.25V13H2V19C2 20.1 2.9 21 4 21C4 21.55 4.45 22 5 22H19C19.55 22 20 21.55 20 21C21.1 21 22 20.1 22 19V13H20Z",
	"mdi:bed-king": "M6 5C5.47 5 5 5.21 4.59 5.6S4 6.45 4 7V10C3.45 10 3 10.19 2.6 10.59S2 11.47 2 12V17H3.33L4 19H5L5.67 17H18.33L19 19H20L20.67 17H22V12C22 11.47 21.79 11 21.4 10.59C21 10.19 20.55 10 20 10V7C20 6.45 19.81 6 19.41 5.6S18.53 5 18 5M6 7H11V10H6M13 7H18V10H13Z",
	"mdi:blinds": "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z",
	"mdi:camera-off-outline": "M17 12C17 12.54 16.9 13.05 16.74 13.54L15 11.78C14.87 10.3 13.7 9.13 12.22 9L10.46 7.26C10.95 7.1 11.46 7 12 7C14.76 7 17 9.24 17 12M9.88 4H14.12L15.95 6H20V16.8L21.88 18.68C21.96 18.47 22 18.24 22 18V6C22 4.89 21.11 4 20 4H16.83L15 2H9L7.18 4L8.6 5.4L9.88 4M22.11 21.46L20.84 22.73L18.11 20H4C2.9 20 2 19.11 2 18V6C2 5.42 2.25 4.9 2.65 4.54L1.11 3L2.39 1.73L22.11 21.46M9 12C9 13.66 10.34 15 12 15C12.33 15 12.65 14.93 12.94 14.83L9.17 11.06C9.07 11.36 9 11.67 9 12M16.11 18L14.45 16.34C13.72 16.75 12.89 17 12 17C9.24 17 7 14.76 7 12C7 11.11 7.25 10.28 7.66 9.55L4.11 6H4V18H16.11Z",
	"mdi:cctv": "M6.03 12.03L8.03 15.5L5.5 18.68L2 12.62L6.03 12.03M17 18V15.29C17.88 14.9 18.5 14.03 18.5 13C18.5 12.43 18.3 11.9 17.97 11.5L19.94 10.35C20.95 9.76 21.3 8.47 20.71 7.46L19.33 5.06C18.74 4.05 17.45 3.7 16.44 4.28L8.31 9C7.36 9.53 7.03 10.75 7.58 11.71L9.08 14.31C9.63 15.26 10.86 15.59 11.81 15.04L13.69 13.96C13.94 14.55 14.41 15.03 15 15.29V18C15 19.1 15.9 20 17 20H22V18H17Z",
	"mdi:ceiling-light": "M8,9H11V4H13V9H16L20,17H4L8,9M14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18H14Z",
	"mdi:chair-rolling": "M22 10V13H19V10H22M2 13H5V10H2V13M17 5C17 3.9 16.1 3 15 3H9C7.9 3 7 3.9 7 5V13H17V5M7 15H6V17H11V18L7 22H9.8L12 19.8L14.2 22H17L13 18V17H18V15H7Z",
	"mdi:chart-line": "M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z",
	"mdi:check": "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
	"mdi:check-circle": "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z",
	"mdi:check-circle-outline": "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z",
	"mdi:check-network-outline": "M15,20A1,1 0 0,0 14,19H13V17H17A2,2 0 0,0 19,15V5A2,2 0 0,0 17,3H7A2,2 0 0,0 5,5V15A2,2 0 0,0 7,17H11V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15M7,15V5H17V15H7M8,10.37L9.24,9.13L10.93,10.83L14.76,7L16,8.5L10.93,13.57L8,10.37Z",
	"mdi:chevron-down": "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
	"mdi:chevron-left": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
	"mdi:chevron-right": "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
	"mdi:chevron-up": "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",
	"mdi:circle-outline": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
	"mdi:close": "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
	"mdi:cpu-64-bit": "M9,3V5H7A2,2 0 0,0 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11H21V9H19V7A2,2 0 0,0 17,5H15V3H13V5H11V3M8,9H11.5V10.5H8.5V11.25H10.5A1,1 0 0,1 11.5,12.25V14A1,1 0 0,1 10.5,15H8A1,1 0 0,1 7,14V10A1,1 0 0,1 8,9M12.5,9H14V11H15.5V9H17V15H15.5V12.5H12.5M8.5,12.75V13.5H10V12.75",
	"mdi:creation-outline": "M9 4L11.5 9.5L17 12L11.5 14.5L9 20L6.5 14.5L1 12L6.5 9.5L9 4M9 8.83L8 11L5.83 12L8 13L9 15.17L10 13L12.17 12L10 11L9 8.83M19 9L17.74 6.26L15 5L17.74 3.75L19 1L20.25 3.75L23 5L20.25 6.26L19 9M19 23L17.74 20.26L15 19L17.74 17.75L19 15L20.25 17.75L23 19L20.25 20.26L19 23Z",
	"mdi:curtains": "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z",
	"mdi:curtains-closed": "M23 3H1V1H23V3M2 22H11V4H2V22M22 4H13V22H22V4Z",
	"mdi:doorbell-video": "M14 15C14 16.11 13.11 17 12 17S10 16.11 10 15 10.9 13 12 13 14 13.9 14 15M18 4V20C18 21.1 17.11 22 16 22H8C6.9 22 6 21.11 6 20V4C6 2.9 6.9 2 8 2H16C17.11 2 18 2.9 18 4M10.5 7C10.5 7.83 11.17 8.5 12 8.5S13.5 7.83 13.5 7 12.83 5.5 12 5.5 10.5 6.17 10.5 7M16 10H8V20H16V10Z",
	"mdi:dots-horizontal-circle-outline": "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z",
	"mdi:drag": "M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",
	"mdi:eye-off-outline": "M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z",
	"mdi:eye-outline": "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z",
	"mdi:fan": "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",
	"mdi:fire": "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",
	"mdi:flash": "M7,2V13H10V22L17,10H13L17,2H7Z",
	"mdi:floor-lamp": "M15,2L17,9H7L9,2M11,10H13V20H16V22H8V20H11V10Z",
	"mdi:floor-plan": "M10,5V10H9V5H5V13H9V12H10V17H9V14H5V19H12V17H13V19H19V17H21V21H3V3H21V15H19V10H13V15H12V9H19V5H10Z",
	"mdi:folder-music-outline": "M22 8V11H20V8H4V18H13.78C13.38 18.59 13.13 19.26 13.04 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8M18.5 13V18.21C18.19 18.07 17.86 18 17.5 18C16.12 18 15 19.12 15 20.5S16.12 23 17.5 23 20 21.88 20 20.5V15H22V13H18.5Z",
	"mdi:fullscreen": "M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z",
	"mdi:fullscreen-exit": "M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z",
	"mdi:gesture-swipe-horizontal": "M6,1L3,4L6,7V5H9V7L12,4L9,1V3H6V1M11,8A1,1 0 0,0 10,9V19L6.8,17.28H6.58C6.3,17.28 6.03,17.39 5.84,17.6L5.1,18.37L10,22.57C10.26,22.85 10.62,23 11,23H17.5A1.5,1.5 0 0,0 19,21.5V17.14C19,16.56 18.68,16.03 18.15,15.79L13.21,13.6L12,13.47V9A1,1 0 0,0 11,8Z",
	"mdi:heart-outline": "M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z",
	"mdi:heart-pulse": "M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 9.05,6.75 9.43,7.63L11.5,13L12.09,11.58C12.22,11.25 12.57,11 13,11H21.78C21.91,10.5 22,10 22,9.5A5.5,5.5 0 0,0 16.5,4C14.64,4 13,4.93 12,6.34C11,4.93 9.36,4 7.5,4V4M3,12.5A1,1 0 0,0 2,13.5A1,1 0 0,0 3,14.5H5.44L11,20C12,20.9 12,20.9 13,20L18.56,14.5H21A1,1 0 0,0 22,13.5A1,1 0 0,0 21,12.5H13.4L12.47,14.8C12.07,15.81 10.92,15.67 10.55,14.83L8.5,9.5L7.54,11.83C7.39,12.21 7.05,12.5 6.6,12.5H3Z",
	"mdi:home-map-marker": "M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,14.5 12,18 12,18C12,18 8.2,14.5 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M12,10A1.5,1.5 0 0,0 10.5,11.5A1.5,1.5 0 0,0 12,13A1.5,1.5 0 0,0 13.5,11.5A1.5,1.5 0 0,0 12,10Z",
	"mdi:home-outline": "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22",
	"mdi:home-rounded": "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",
	"mdi:information-outline": "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
	"mdi:lamp": "M8,2H16L20,14H4L8,2M11,15H13V20H18V22H6V20H11V15Z",
	"mdi:lan-disconnect": "M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z",
	"mdi:led-strip-variant": "M2.95 3L2 6.91L19.34 11.25L20.29 7.34L2.95 3M6.09 6.89L4.16 6.41L4.64 4.46L6.57 4.94L6.09 6.89M9.94 7.86L8 7.38L8.5 5.42L10.42 5.91L9.94 7.86M13.8 8.82L11.87 8.34L12.35 6.39L14.27 6.87L13.8 8.82M17.65 9.79L15.72 9.31L16.2 7.35L18.13 7.84L17.65 9.79M4.66 12.75L3.71 16.66L21.05 21L22 17.1L4.66 12.75M7.8 16.65L5.88 16.16L6.35 14.21L8.28 14.69L7.8 16.65M11.65 17.61L9.73 17.13L10.2 15.18L12.13 15.66L11.65 17.61M15.5 18.58L13.58 18.09L14.06 16.14L16 16.62L15.5 18.58M19.36 19.54L17.43 19.06L17.91 17.11L19.84 17.59L19.36 19.54M6.25 12.11L11 10.2L17.75 11.89L13 13.8L6.25 12.11Z",
	"mdi:light-recessed": "M12 7C6.5 7 2 9.46 2 12.5S6.5 18 12 18 22 15.54 22 12.5 17.5 7 12 7M16.5 10C16.5 10.4 14.9 11.54 12 11.54S7.5 10.4 7.5 10C7.5 9.91 7.65 9.74 7.9 9.55C9.06 9.21 10.44 9 12 9S14.94 9.21 16.1 9.55C16.35 9.74 16.5 9.91 16.5 10M12 16C7.12 16 4 13.93 4 12.5C4 11.81 4.73 11 6.03 10.29C6.3 11.83 8.87 13.04 12 13.04C15.13 13.04 17.7 11.83 17.97 10.29C19.27 11 20 11.81 20 12.5C20 13.93 16.88 16 12 16Z",
	"mdi:lightbulb": "M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z",
	"mdi:lightbulb-group": "M15 14V16A1 1 0 0 1 14 17H10A1 1 0 0 1 9 16V14A5 5 0 1 1 15 14M14 18H10V19A1 1 0 0 0 11 20H13A1 1 0 0 0 14 19M7 19V18H5V19A1 1 0 0 0 6 20H7.17A2.93 2.93 0 0 1 7 19M5 10A6.79 6.79 0 0 1 5.68 7A4 4 0 0 0 4 14.45V16A1 1 0 0 0 5 17H7V14.88A6.92 6.92 0 0 1 5 10M17 18V19A2.93 2.93 0 0 1 16.83 20H18A1 1 0 0 0 19 19V18M18.32 7A6.79 6.79 0 0 1 19 10A6.92 6.92 0 0 1 17 14.88V17H19A1 1 0 0 0 20 16V14.45A4 4 0 0 0 18.32 7Z",
	"mdi:lightbulb-night": "M6 21C6 21.55 6.45 22 7 22H11C11.55 22 12 21.55 12 21V20H6V21M13 16.32V17C13 17.55 12.55 18 12 18H6C5.45 18 5 17.55 5 17V14.74C3.19 13.47 2 11.38 2 9C2 5.13 5.13 2 9 2C10.65 2 12.16 2.57 13.35 3.5C10.8 4.57 9 7.07 9 10C9 12.79 10.64 15.19 13 16.32M20.92 9.94L19.5 9.03L18.1 10L18.5 8.35L17.17 7.32L18.85 7.21L19.41 5.6L20.04 7.18L21.72 7.22L20.42 8.3L20.92 9.94M19.39 13C17.5 15.27 14.03 15.19 12.22 12.95C10 10.13 11.56 6 15 5.34C15.34 5.29 15.64 5.63 15.5 5.97C15.05 7.25 15.12 8.71 15.85 9.97C16.58 11.24 17.79 12.03 19.12 12.25C19.47 12.3 19.62 12.74 19.39 13Z",
	"mdi:lightbulb-outline": "M12,2A7,7 0 0,1 19,9C19,11.38 17.81,13.47 16,14.74V17A1,1 0 0,1 15,18H9A1,1 0 0,1 8,17V14.74C6.19,13.47 5,11.38 5,9A7,7 0 0,1 12,2M9,21V20H15V21A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21M12,4A5,5 0 0,0 7,9C7,11.05 8.23,12.81 10,13.58V16H14V13.58C15.77,12.81 17,11.05 17,9A5,5 0 0,0 12,4Z",
	"mdi:magnify": "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
	"mdi:map-marker-radius-outline": "M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z",
	"mdi:memory": "M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11M13,13H11V11H13M15,9H9V15H15V9Z",
	"mdi:minus": "M19,13H5V11H19V13Z",
	"mdi:monitor-shimmer": "M21 16H3V4H21M21 2H3C1.89 2 1 2.89 1 4V16C1 17.11 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.11 18 23 17.11 23 16V4C23 2.89 22.1 2 21 2M15 5.5L14.38 6.87L13 7.5L14.38 8.13L15 9.5L15.63 8.13L17 7.5L15.63 6.87L15 5.5M10.5 7.5L9.41 9.91L7 11L9.41 12.09L10.5 14.5L11.6 12.09L14 11L11.6 9.91L10.5 7.5",
	"mdi:movie-open-outline": "M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69C2.1 5.9 1.39 6.96 1.61 8.04L2 10L6.9 9.03L4.16 5.5M20 12V20H4V12H20M22 10H2V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10Z",
	"mdi:music": "M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z",
	"mdi:music-note": "M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z",
	"mdi:palm-tree": "M12 9C13.59 16.61 10 22 10 22H13C14.88 16.2 14 12.09 13.5 10M15.66 7.16C15.83 7.37 16 7.59 16.13 7.82C17.84 10.53 17.5 13.95 15.5 16.26C16.34 14.21 16.22 11.79 14.95 9.77C14.87 9.64 14.78 9.53 14.7 9.41C14.11 8.58 13.36 7.92 12.54 7.43C9.66 8.35 7.58 11.04 7.58 14.22C7.58 14.96 7.69 15.67 7.89 16.33C7.05 15.16 6.56 13.73 6.56 12.19C6.56 9.84 7.7 7.76 9.45 6.46C8 6.35 6.46 6.67 5.12 7.5C4.5 7.91 3.96 8.38 3.5 8.91C4.05 7.58 5 6.39 6.3 5.57C7.8 4.63 9.5 4.32 11.14 4.56C10.73 4 10.23 3.47 9.63 3C9.05 2.58 8.42 2.24 7.76 2C9.2 2.04 10.64 2.5 11.87 3.43C12.5 3.9 13 4.47 13.4 5.07C13.5 5.07 13.59 5.06 13.69 5.06C16.89 5.06 19.6 7.17 20.5 10.08C19.38 8.5 17.65 7.43 15.66 7.16Z",
	"mdi:pause": "M14,19H18V5H14M6,19H10V5H6V19Z",
	"mdi:play": "M8,5.14V19.14L19,12.14L8,5.14Z",
	"mdi:play-circle": "M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
	"mdi:play-circle-outline": "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M10,16.5L16,12L10,7.5V16.5Z",
	"mdi:plus": "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
	"mdi:power": "M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",
	"mdi:progress-clock": "M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
	"mdi:restore": "M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z",
	"mdi:robot-vacuum": "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z",
	"mdi:shield-home": "M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z",
	"mdi:shield-home-outline": "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M11,14H13V17H16V12H18L12,7L6,12H8V17H11V14",
	"mdi:shield-lock-outline": "M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,21C15.75,20 19,15.54 19,11.22V6.3L12,3.18L5,6.3V11.22C5,15.54 8.25,20 12,21M14.8,11V9.5C14.8,8.1 13.4,7 12,7C10.6,7 9.2,8.1 9.2,9.5V11C8.6,11 8,11.6 8,12.2V15.7C8,16.4 8.6,17 9.2,17H14.7C15.4,17 16,16.4 16,15.8V12.3C16,11.6 15.4,11 14.8,11M13.5,11H10.5V9.5C10.5,8.7 11.2,8.2 12,8.2C12.8,8.2 13.5,8.7 13.5,9.5V11Z",
	"mdi:silverware-fork-knife": "M11,9H9V2H7V9H5V2H3V9C3,11.12 4.66,12.84 6.75,12.97V22H9.25V12.97C11.34,12.84 13,11.12 13,9V2H11V9M16,6V14H18.5V22H21V2C18.24,2 16,4.24 16,6Z",
	"mdi:skip-next": "M16,18H18V6H16M6,18L14.5,12L6,6V18Z",
	"mdi:skip-previous": "M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z",
	"mdi:snowflake": "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",
	"mdi:snowflake-thermometer": "M14.46 9.41L11 7.38V5.12L12.71 3.41L11.29 2L10 3.29L8.71 2L7.29 3.41L9 5.12V7.38L6.5 8.82L4.5 7.69L3.92 5.36L2 5.88L2.47 7.65L.7 8.12L1.22 10.05L3.55 9.43L5.55 10.56V13.45L3.55 14.58L1.22 13.96L.7 15.89L2.47 16.36L2 18.12L3.93 18.64L4.55 16.31L6.55 15.18L9 16.62V18.88L7.29 20.59L8.71 22L10 20.71L11.29 22L12.7 20.59L11 18.88V16.62L14.46 14.61M7.5 10.56L10 9.11L12.5 10.56V13.44L10 14.89L7.5 13.44M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19S22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6",
	"mdi:sofa": "M12.5 7C12.5 5.89 13.39 5 14.5 5H18C19.1 5 20 5.9 20 7V9.16C18.84 9.57 18 10.67 18 11.97V14H12.5V7M6 11.96V14H11.5V7C11.5 5.89 10.61 5 9.5 5H6C4.9 5 4 5.9 4 7V9.15C5.16 9.56 6 10.67 6 11.96M20.66 10.03C19.68 10.19 19 11.12 19 12.12V15H5V12C5 10.9 4.11 10 3 10S1 10.9 1 12V17C1 18.1 1.9 19 3 19V21H5V19H19V21H21V19C22.1 19 23 18.1 23 17V12C23 10.79 21.91 9.82 20.66 10.03Z",
	"mdi:sofa-outline": "M21 9V7C21 5.35 19.65 4 18 4H14C13.23 4 12.53 4.3 12 4.78C11.47 4.3 10.77 4 10 4H6C4.35 4 3 5.35 3 7V9C1.35 9 0 10.35 0 12V17C0 18.65 1.35 20 3 20V22H5V20H19V22H21V20C22.65 20 24 18.65 24 17V12C24 10.35 22.65 9 21 9M14 6H18C18.55 6 19 6.45 19 7V9.78C18.39 10.33 18 11.12 18 12V14H13V7C13 6.45 13.45 6 14 6M5 7C5 6.45 5.45 6 6 6H10C10.55 6 11 6.45 11 7V14H6V12C6 11.12 5.61 10.33 5 9.78V7M22 17C22 17.55 21.55 18 21 18H3C2.45 18 2 17.55 2 17V12C2 11.45 2.45 11 3 11S4 11.45 4 12V16H20V12C20 11.45 20.45 11 21 11S22 11.45 22 12V17Z",
	"mdi:speaker-multiple": "M14,10A3,3 0 0,0 11,13A3,3 0 0,0 14,16A3,3 0 0,0 17,13A3,3 0 0,0 14,10M14,18A5,5 0 0,1 9,13A5,5 0 0,1 14,8A5,5 0 0,1 19,13A5,5 0 0,1 14,18M14,2A2,2 0 0,1 16,4A2,2 0 0,1 14,6A2,2 0 0,1 12,4A2,2 0 0,1 14,2M19,0H9A2,2 0 0,0 7,2V18A2,2 0 0,0 9,20H19A2,2 0 0,0 21,18V2A2,2 0 0,0 19,0M5,22H17V24H5A2,2 0 0,1 3,22V4H5",
	"mdi:sun-snowflake-variant": "M12.92 1.58L11.18 2.58L12.39 4.67L11.8 6.85L9 7.6L7.38 6L7.42 3.59L5.43 3.59L5.43 5.42L3.59 5.42L3.6 7.42L6 7.42L7.65 9.03L6.9 11.82L4.68 12.4L2.59 11.2L1.59 12.93L3.17 13.84L2.26 15.42L4 16.42L5.19 14.33L7.42 13.75L7.92 14.26L9.32 12.86L8.78 12.32L9.53 9.54L12.32 8.78L12.85 9.32L14.26 7.91L13.73 7.37L14.32 5.19L16.41 4L15.41 2.25L13.83 3.16L12.92 1.58M20.72 4L4 20.72L5.27 22L10.16 17.11C10.63 17.43 11.15 17.68 11.71 17.83C14.38 18.55 17.12 16.96 17.83 14.29C18.22 12.86 17.93 11.36 17.11 10.16L22 5.27L20.72 4M18.74 9C19.18 9.63 19.53 10.38 19.75 11.19C19.97 12 20.03 12.81 19.96 13.61L22.65 10.41L18.74 9M19.32 15.95C19 16.67 18.5 17.35 17.93 17.94C17.34 18.53 16.66 19 15.96 19.34L20.05 20.06L19.32 15.95M9 18.71L10.41 22.66L13.59 19.95C12.81 20 12 19.97 11.19 19.76C10.36 19.54 9.62 19.17 9 18.71Z",
	"mdi:television-ambient-light": "M3 11H0V9H3V11M3 14H0V16H3V14M5 5.12L2.88 3L1.46 4.41L3.59 6.54L5 5.12M10 5V2H8V5H10M24 9H21V11H24V9M16 5V2H14V5H16M20.41 6.54L22.54 4.42L21.12 3L19 5.12L20.41 6.54M24 14H21V16H24V14M19 9V16C19 17.1 18.1 18 17 18H15V20H9V18H7C5.9 18 5 17.1 5 16V9C5 7.9 5.9 7 7 7H17C18.1 7 19 7.9 19 9M17 9H7V16H17V9M19 19.88L21.12 22L22.54 20.59L20.41 18.47L19 19.88M3.59 18.46L1.47 20.59L2.88 22L5 19.88L3.59 18.46Z",
	"mdi:thermometer": "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
	"mdi:thermostat": "M16.95,16.95L14.83,14.83C15.55,14.1 16,13.1 16,12C16,11.26 15.79,10.57 15.43,10L17.6,7.81C18.5,9 19,10.43 19,12C19,13.93 18.22,15.68 16.95,16.95M12,5C13.57,5 15,5.5 16.19,6.4L14,8.56C13.43,8.21 12.74,8 12,8A4,4 0 0,0 8,12C8,13.1 8.45,14.1 9.17,14.83L7.05,16.95C5.78,15.68 5,13.93 5,12A7,7 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",
	"mdi:transmission-tower": "M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",
	"mdi:tray-arrow-down": "M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z",
	"mdi:tray-arrow-up": "M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 2L6.46 7.46L7.88 8.88L11 5.75V15H13V5.75L16.13 8.88L17.55 7.45L12 2Z",
	"mdi:tune-variant": "M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z",
	"mdi:tune-vertical-variant": "M8 12.14V2H6V12.14C4.28 12.59 3 14.14 3 16S4.28 19.41 6 19.86V22H8V19.86C9.72 19.41 11 17.86 11 16S9.72 12.59 8 12.14M7 14C8.1 14 9 14.9 9 16S8.1 18 7 18C5.9 18 5 17.1 5 16S5.9 14 7 14M18 2H16V4.14C14.28 4.59 13 6.14 13 8S14.28 11.41 16 11.86V22H18V11.86C19.72 11.41 21 9.86 21 8S19.72 4.59 18 4.14V2M17 6C18.1 6 19 6.9 19 8S18.1 10 17 10C15.9 10 15 9.1 15 8S15.9 6 17 6Z",
	"mdi:update": "M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z",
	"mdi:view-dashboard-outline": "M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z",
	"mdi:view-dashboard-variant-outline": "M2 5V19H22V5H2M20 12H16V7H20V12M14 10H10V7H14V10M10 12H14V17H10V12M4 7H8V17H4V7M16 17V14H20V17H16Z",
	"mdi:volume-high": "M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z",
	"mdi:volume-off": "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z",
	"mdi:wall-sconce-flat": "M5,5V11H19V5H5M5.27,13.32L3.5,15.09L4.91,16.5L6.68,14.73L5.27,13.32M18.73,13.32L17.32,14.73L19.09,16.5L20.5,15.09L18.73,13.32M11,16V19H13V16H11Z",
	"mdi:water-percent": "M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z",
	"mdi:waveform": "M22 12L20 13L19 14L18 13L17 16L16 13L15 21L14 13L13 15L12 13L11 17L10 13L9 22L8 13L7 19L6 13L5 14L4 13L2 12L4 11L5 10L6 11L7 5L8 11L9 2L10 11L11 7L12 11L13 9L14 11L15 3L16 11L17 8L18 11L19 10L20 11L22 12Z",
	"mdi:weather-night": "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",
	"mdi:weather-partly-cloudy": "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z",
	"mdi:weather-sunny": "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
	"mdi:white-balance-sunny": "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13"
}, vt = class extends HTMLElement {
	static get observedAttributes() {
		return ["icon"];
	}
	connectedCallback() {
		this.render();
	}
	attributeChangedCallback() {
		this.render();
	}
	render() {
		let e = _t[this.getAttribute("icon") || "mdi:circle-outline"] || _t["mdi:circle-outline"];
		this.setAttribute("role", this.hasAttribute("aria-label") ? "img" : "presentation"), this.style.display = "inline-grid", this.style.placeItems = "center", this.style.width = "var(--mdc-icon-size, 1.5em)", this.style.height = "var(--mdc-icon-size, 1.5em)", this.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path fill="currentColor" d="${e}"></path></svg>`;
	}
};
function yt() {
	customElements.get("ha-icon") || customElements.define("ha-icon", vt);
}
//#endregion
//#region src/panel.tsx
yt();
var bt = class extends HTMLElement {
	root;
	_hass;
	_narrow = !1;
	_route;
	_panel;
	constructor() {
		super();
		let e = document.createElement("div");
		e.className = "homeiios-mount";
		let t = this.attachShadow({ mode: "open" }), n = document.createElement("style");
		n.textContent = gt, t.append(n, e), this.root = (0, v.createRoot)(e);
	}
	set hass(e) {
		this._hass = e, this.renderPanel();
	}
	set narrow(e) {
		this._narrow = e, this.renderPanel();
	}
	set route(e) {
		this._route = e, this.renderPanel();
	}
	set panel(e) {
		this._panel = e, this.renderPanel();
	}
	connectedCallback() {
		this.upgradeProperty("hass"), this.upgradeProperty("narrow"), this.upgradeProperty("route"), this.upgradeProperty("panel"), this.renderPanel();
	}
	disconnectedCallback() {
		this.root.unmount();
	}
	upgradeProperty(e) {
		if (!Object.prototype.hasOwnProperty.call(this, e)) return;
		let t = this, n = t[e];
		delete t[e], t[e] = n;
	}
	renderPanel() {
		this.root.render(/* @__PURE__ */ (0, x.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, x.jsx)(Xe, {
			hass: this._hass,
			narrow: this._narrow,
			route: this._route,
			panel: this._panel
		}) }));
	}
};
customElements.get("homeiios-panel") || customElements.define("homeiios-panel", bt);
//#endregion
