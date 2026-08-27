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
	var ee = Array.isArray;
	function te() {}
	var S = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ne = Object.prototype.hasOwnProperty;
	function C(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function re(e, t) {
		return C(e.type, t, e.props);
	}
	function w(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function T(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var E = /\/+/g;
	function D(e, t) {
		return typeof e == "object" && e && e.key != null ? T("" + e.key) : t.toString(36);
	}
	function O(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(te, te) : (e.status = "pending", e.then(function(t) {
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
	function k(e, r, i, a, o) {
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
				case d: return c = e._init, k(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + D(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(E, "$&/") + "/"), k(o, r, i, "", function(e) {
			return e;
		})) : o != null && (w(o) && (o = re(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(E, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + D(a, u), c += k(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + D(a, u++), c += k(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return k(O(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ie(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return k(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ae(e) {
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
	var A = typeof reportError == "function" ? reportError : function(e) {
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
	}, j = {
		map: ie,
		forEach: function(e, t, n) {
			ie(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ie(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ie(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!w(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = j, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return S.H.useMemoCache(e);
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
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ne.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return C(e.type, i, r);
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
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ne.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return C(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = w, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ae
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = S.T, n = {};
		S.T = n;
		try {
			var r = e(), i = S.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(te, A);
		} catch (e) {
			A(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), S.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return S.H.useCacheRefresh();
	}, e.use = function(e) {
		return S.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return S.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return S.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return S.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return S.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return S.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return S.H.useEffectEvent(e);
	}, e.useId = function() {
		return S.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return S.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return S.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return S.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return S.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return S.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return S.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return S.H.useRef(e);
	}, e.useState = function(e) {
		return S.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return S.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return S.H.useTransition();
	}, e.version = "19.2.8";
})), u = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function n(e, t) {
			Object.defineProperty(a.prototype, e, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
			} });
		}
		function r(e) {
			return typeof e != "object" || !e ? null : (e = ge && e[ge] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function i(e, t) {
			e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
			var n = e + "." + t;
			_e[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), _e[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = ye, this.updater = n || ve;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = ye, this.updater = n || ve;
		}
		function c() {}
		function l(e) {
			return "" + e;
		}
		function u(e) {
			try {
				l(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, r = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", r), l(e);
			}
		}
		function d(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Se ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case j: return "Fragment";
				case se: return "Profiler";
				case oe: return "StrictMode";
				case de: return "Suspense";
				case fe: return "SuspenseList";
				case he: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case A: return "Portal";
				case le: return e.displayName || "Context";
				case ce: return (e._context.displayName || "Context") + ".Consumer";
				case ue:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case pe: return t = e.displayName || null, t === null ? d(e.type) || "Memo" : t;
				case me:
					t = e._payload, e = e._init;
					try {
						return d(e(t));
					} catch {}
			}
			return null;
		}
		function f(e) {
			if (e === j) return "<>";
			if (typeof e == "object" && e && e.$$typeof === me) return "<...>";
			try {
				var t = d(e);
				return t ? "<" + t + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function p() {
			var e = N.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (Ce.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				Te || (Te = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return De[e] || (De[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function v(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: ae,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: _
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function y(e, t) {
			return t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask), e._store && (t._store.validated = e._store.validated), t;
		}
		function b(e) {
			x(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === me && (e._payload.status === "fulfilled" ? x(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function x(e) {
			return typeof e == "object" && !!e && e.$$typeof === ae;
		}
		function ee(e) {
			var t = {
				"=": "=0",
				":": "=2"
			};
			return "$" + e.replace(/[=:]/g, function(e) {
				return t[e];
			});
		}
		function te(e, t) {
			return typeof e == "object" && e && e.key != null ? (u(e.key), ee("" + e.key)) : t.toString(36);
		}
		function S(e) {
			switch (e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
				default: switch (typeof e.status == "string" ? e.then(c, c) : (e.status = "pending", e.then(function(t) {
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
		function ne(e, t, n, i, a) {
			var o = typeof e;
			(o === "undefined" || o === "boolean") && (e = null);
			var s = !1;
			if (e === null) s = !0;
			else switch (o) {
				case "bigint":
				case "string":
				case "number":
					s = !0;
					break;
				case "object": switch (e.$$typeof) {
					case ae:
					case A:
						s = !0;
						break;
					case me: return s = e._init, ne(s(e._payload), t, n, i, a);
				}
			}
			if (s) {
				s = e, a = a(s);
				var c = i === "" ? "." + te(s, 0) : i;
				return xe(a) ? (n = "", c != null && (n = c.replace(je, "$&/") + "/"), ne(a, t, n, "", function(e) {
					return e;
				})) : a != null && (x(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(je, "$&/") + "/") + c), i !== "" && s != null && x(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", xe(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + te(i, l), s += ne(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (Ae || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ae = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + te(i, l++), s += ne(i, t, n, o, a);
			else if (o === "object") {
				if (typeof e.then == "function") return ne(S(e), t, n, i, a);
				throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
			}
			return s;
		}
		function C(e, t, n) {
			if (e == null) return e;
			var r = [], i = 0;
			return ne(e, r, "", "", function(e) {
				return t.call(n, e, i++);
			}), r;
		}
		function re(e) {
			if (e._status === -1) {
				var t = e._ioInfo;
				t != null && (t.start = t.end = performance.now()), t = e._result;
				var n = t();
				if (n.then(function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 1, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "fulfilled", n.value = t);
					}
				}, function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 2, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "rejected", n.reason = t);
					}
				}), t = e._ioInfo, t != null) {
					t.value = n;
					var r = n.displayName;
					typeof r == "string" && (t.name = r);
				}
				e._status === -1 && (e._status = 0, e._result = n);
			}
			if (e._status === 1) return t = e._result, t === void 0 && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", t), "default" in t || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", t), t.default;
			throw e._result;
		}
		function w() {
			var e = N.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function T() {
			N.asyncTransitions--;
		}
		function E(e) {
			if (Pe === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				Pe = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				Pe = function(e) {
					!1 === Ne && (Ne = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return Pe(e);
		}
		function D(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function O(e, t) {
			t !== Fe - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Fe = t;
		}
		function k(e, t, n) {
			var r = N.actQueue;
			if (r !== null) {
				if (r.length !== 0) try {
					ie(r), E(function() {
						return k(e, t, n);
					});
					return;
				} catch (e) {
					N.thrownErrors.push(e);
				}
				else N.actQueue = null;
			}
			0 < N.thrownErrors.length ? (r = D(N.thrownErrors), N.thrownErrors.length = 0, n(r)) : t(e);
		}
		function ie(e) {
			if (!Le) {
				Le = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							N.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (N.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), N.thrownErrors.push(n);
				} finally {
					Le = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var ae = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), oe = Symbol.for("react.strict_mode"), se = Symbol.for("react.profiler"), ce = Symbol.for("react.consumer"), le = Symbol.for("react.context"), ue = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), fe = Symbol.for("react.suspense_list"), pe = Symbol.for("react.memo"), me = Symbol.for("react.lazy"), he = Symbol.for("react.activity"), ge = Symbol.iterator, _e = {}, ve = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(e) {
				i(e, "forceUpdate");
			},
			enqueueReplaceState: function(e) {
				i(e, "replaceState");
			},
			enqueueSetState: function(e) {
				i(e, "setState");
			}
		}, M = Object.assign, ye = {};
		Object.freeze(ye), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var be = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (ze in be) be.hasOwnProperty(ze) && n(ze, be[ze]);
		o.prototype = a.prototype, be = s.prototype = new o(), be.constructor = s, M(be, a.prototype), be.isPureReactComponent = !0;
		var xe = Array.isArray, Se = Symbol.for("react.client.reference"), N = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, Ce = Object.prototype.hasOwnProperty, we = console.createTask ? console.createTask : function() {
			return null;
		};
		be = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var Te, Ee, De = {}, Oe = be.react_stack_bottom_frame.bind(be, m)(), ke = we(f(m)), Ae = !1, je = /\/+/g, Me = typeof reportError == "function" ? reportError : function(e) {
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
		}, Ne = !1, Pe = null, Fe = 0, Ie = !1, Le = !1, Re = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : E;
		be = Object.freeze({
			__proto__: null,
			c: function(e) {
				return w().useMemoCache(e);
			}
		});
		var ze = {
			map: C,
			forEach: function(e, t, n) {
				C(e, function() {
					t.apply(this, arguments);
				}, n);
			},
			count: function(e) {
				var t = 0;
				return C(e, function() {
					t++;
				}), t;
			},
			toArray: function(e) {
				return C(e, function(e) {
					return e;
				}) || [];
			},
			only: function(e) {
				if (!x(e)) throw Error("React.Children.only expected to receive a single React element child.");
				return e;
			}
		};
		e.Activity = he, e.Children = ze, e.Component = a, e.Fragment = j, e.Profiler = se, e.PureComponent = s, e.StrictMode = oe, e.Suspense = de, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = N, e.__COMPILER_RUNTIME = be, e.act = function(e) {
			var t = N.actQueue, n = Fe;
			Fe++;
			var r = N.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				N.thrownErrors.push(e);
			}
			if (0 < N.thrownErrors.length) throw O(t, n), e = D(N.thrownErrors), N.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return Re(function() {
					i || Ie || (Ie = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (O(t, n), n === 0) {
							try {
								ie(r), E(function() {
									return k(i, e, a);
								});
							} catch (e) {
								N.thrownErrors.push(e);
							}
							if (0 < N.thrownErrors.length) {
								var o = D(N.thrownErrors);
								N.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						O(t, n), 0 < N.thrownErrors.length ? (e = D(N.thrownErrors), N.thrownErrors.length = 0, a(e)) : a(e);
					});
				} };
			}
			var s = a;
			if (O(t, n), n === 0 && (ie(r), r.length !== 0 && Re(function() {
				i || Ie || (Ie = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), N.actQueue = null), 0 < N.thrownErrors.length) throw e = D(N.thrownErrors), N.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (N.actQueue = r, E(function() {
					return k(s, e, t);
				})) : e(s);
			} };
		}, e.cache = function(e) {
			return function() {
				return e.apply(null, arguments);
			};
		}, e.cacheSignal = function() {
			return null;
		}, e.captureOwnerStack = function() {
			var e = N.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = M({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (Ce.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !Ce.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
			}
			var s = arguments.length - 2;
			if (s === 1) r.children = n;
			else if (1 < s) {
				o = Array(s);
				for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
				r.children = o;
			}
			for (r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2; i < arguments.length; i++) b(arguments[i]);
			return r;
		}, e.createContext = function(e) {
			return e = {
				$$typeof: le,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			}, e.Provider = e, e.Consumer = {
				$$typeof: ce,
				_context: e
			}, e._currentRenderer = null, e._currentRenderer2 = null, e;
		}, e.createElement = function(e, t, n) {
			for (var r = 2; r < arguments.length; r++) b(arguments[r]);
			r = {};
			var i = null;
			if (t != null) for (c in Ee || !("__self" in t) || "key" in t || (Ee = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), i = "" + t.key), t) Ce.call(t, c) && c !== "key" && c !== "__self" && c !== "__source" && (r[c] = t[c]);
			var a = arguments.length - 2;
			if (a === 1) r.children = n;
			else if (1 < a) {
				for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
				Object.freeze && Object.freeze(o), r.children = o;
			}
			if (e && e.defaultProps) for (c in a = e.defaultProps, a) r[c] === void 0 && (r[c] = a[c]);
			i && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e);
			var c = 1e4 > N.recentlyCreatedOwnerStacks++;
			return v(e, i, r, p(), c ? Error("react-stack-top-frame") : Oe, c ? we(f(e)) : ke);
		}, e.createRef = function() {
			var e = { current: null };
			return Object.seal(e), e;
		}, e.forwardRef = function(e) {
			e != null && e.$$typeof === pe ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e == "function" ? e.length !== 0 && e.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.") : console.error("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e), e != null && e.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var t = {
				$$typeof: ue,
				render: e
			}, n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.isValidElement = x, e.lazy = function(e) {
			e = {
				_status: -1,
				_result: e
			};
			var t = {
				$$typeof: me,
				_payload: e,
				_init: re
			}, n = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			return e._ioInfo = n, t._debugInfo = [{ awaited: n }], t;
		}, e.memo = function(e, t) {
			e ?? console.error("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e), t = {
				$$typeof: pe,
				type: e,
				compare: t === void 0 ? null : t
			};
			var n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.startTransition = function(e) {
			var t = N.T, n = {};
			n._updatedFibers = /* @__PURE__ */ new Set(), N.T = n;
			try {
				var r = e(), i = N.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (N.asyncTransitions++, r.then(T, T), r.then(c, Me));
			} catch (e) {
				Me(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), N.T = t;
			}
		}, e.unstable_useCacheRefresh = function() {
			return w().useCacheRefresh();
		}, e.use = function(e) {
			return w().use(e);
		}, e.useActionState = function(e, t, n) {
			return w().useActionState(e, t, n);
		}, e.useCallback = function(e, t) {
			return w().useCallback(e, t);
		}, e.useContext = function(e) {
			var t = w();
			return e.$$typeof === ce && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"), t.useContext(e);
		}, e.useDebugValue = function(e, t) {
			return w().useDebugValue(e, t);
		}, e.useDeferredValue = function(e, t) {
			return w().useDeferredValue(e, t);
		}, e.useEffect = function(e, t) {
			return e ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"), w().useEffect(e, t);
		}, e.useEffectEvent = function(e) {
			return w().useEffectEvent(e);
		}, e.useId = function() {
			return w().useId();
		}, e.useImperativeHandle = function(e, t, n) {
			return w().useImperativeHandle(e, t, n);
		}, e.useInsertionEffect = function(e, t) {
			return e ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"), w().useInsertionEffect(e, t);
		}, e.useLayoutEffect = function(e, t) {
			return e ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"), w().useLayoutEffect(e, t);
		}, e.useMemo = function(e, t) {
			return w().useMemo(e, t);
		}, e.useOptimistic = function(e, t) {
			return w().useOptimistic(e, t);
		}, e.useReducer = function(e, t, n) {
			return w().useReducer(e, t, n);
		}, e.useRef = function(e) {
			return w().useRef(e);
		}, e.useState = function(e) {
			return w().useState(e);
		}, e.useSyncExternalStore = function(e, t, n) {
			return w().useSyncExternalStore(e, t, n);
		}, e.useTransition = function() {
			return w().useTransition();
		}, e.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? l() : u();
})), f = /* @__PURE__ */ o(((e) => {
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
			if (n(c) !== null) m = !0, ee || (ee = !0, w());
			else {
				var t = n(l);
				t !== null && D(x, t.startTime - e);
			}
		}
	}
	var ee = !1, te = -1, S = 5, ne = -1;
	function C() {
		return g ? !0 : !(e.unstable_now() - ne < S);
	}
	function re() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			ne = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(te), te = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && C());) {
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
								u !== null && D(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? w() : ee = !1;
			}
		}
	}
	var w;
	if (typeof y == "function") w = function() {
		y(re);
	};
	else if (typeof MessageChannel < "u") {
		var T = new MessageChannel(), E = T.port2;
		T.port1.onmessage = re, w = function() {
			E.postMessage(null);
		};
	} else w = function() {
		_(re, 0);
	};
	function D(t, n) {
		te = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, D(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, w()))), r;
	}, e.unstable_shouldYield = C, e.unstable_wrapCallback = function(e) {
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
})), p = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (x = !1, ne) {
				var t = e.unstable_now();
				w = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, te(C), C = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
						n = void 0;
					}
				} finally {
					n ? T() : ne = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) {
				if (r(p) !== null) y = !0, ne || (ne = !0, T());
				else {
					var t = r(m);
					t !== null && l(s, t.startTime - e);
				}
			}
		}
		function c() {
			return x ? !0 : !(e.unstable_now() - w < re);
		}
		function l(t, n) {
			C = ee(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, x = !1, ee = typeof setTimeout == "function" ? setTimeout : null, te = typeof clearTimeout == "function" ? clearTimeout : null, S = typeof setImmediate < "u" ? setImmediate : null, ne = !1, C = -1, re = 5, w = -1;
		if (typeof S == "function") var T = function() {
			S(t);
		};
		else if (typeof MessageChannel < "u") {
			var E = new MessageChannel(), D = E.port2;
			E.port1.onmessage = t, T = function() {
				D.postMessage(null);
			};
		} else T = function() {
			ee(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : re = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			x = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (te(C), C = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, ne || (ne = !0, T()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), m = /* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? f() : p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = d();
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
})), g = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function r(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			try {
				n(i);
				var a = !1;
			} catch {
				a = !0;
			}
			return a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), {
				$$typeof: u,
				key: i == null ? null : "" + i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function i(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function a(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function o(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function s() {
			var e = f.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var c = d(), l = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, u = Symbol.for("react.portal"), f = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return r(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = f.T, n = l.p;
			try {
				if (f.T = null, l.p = 2, e) return e();
			} finally {
				f.T = t, l.p = n, l.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", o(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", a(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, l.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t));
			}
			typeof e == "string" && l.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", o(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", o(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = i(n, t.crossOrigin), s = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? l.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c
				}) : n === "script" && l.d.X(e, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + o(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = o(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = i(t.as, t.crossOrigin), l.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			})) : t ?? l.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + a(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = i(n, t.crossOrigin);
				l.d.L(e, n, {
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
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = i(t.as, t.crossOrigin), l.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			})) : l.d.m(e));
		}, e.requestFormReset = function(e) {
			l.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return s().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return s().useHostTransitionStatus();
		}, e.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), _ = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = h()) : t.exports = g();
})), v = /* @__PURE__ */ o(((e) => {
	var t = m(), n = d(), r = _();
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
	function u(e) {
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
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var p = Object.assign, h = Symbol.for("react.element"), g = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), T = Symbol.for("react.activity"), E = Symbol.for("react.memo_cache_sentinel"), D = Symbol.iterator;
	function O(e) {
		return typeof e != "object" || !e ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var k = Symbol.for("react.client.reference");
	function ie(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ne: return "Suspense";
			case C: return "SuspenseList";
			case T: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case te: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case S:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case re: return t = e.displayName || null, t === null ? ie(e.type) || "Memo" : t;
			case w:
				t = e._payload, e = e._init;
				try {
					return ie(e(t));
				} catch {}
		}
		return null;
	}
	var ae = Array.isArray, A = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, se = [], ce = -1;
	function le(e) {
		return { current: e };
	}
	function ue(e) {
		0 > ce || (e.current = se[ce], se[ce] = null, ce--);
	}
	function de(e, t) {
		ce++, se[ce] = e.current, e.current = t;
	}
	var fe = le(null), pe = le(null), me = le(null), he = le(null);
	function ge(e, t) {
		switch (de(me, t), de(pe, e), de(fe, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? ef(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = ef(t), e = tf(t, e);
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
		ue(fe), de(fe, e);
	}
	function _e() {
		ue(fe), ue(pe), ue(me);
	}
	function ve(e) {
		e.memoizedState !== null && de(he, e);
		var t = fe.current, n = tf(t, e.type);
		t !== n && (de(pe, e), de(fe, n));
	}
	function M(e) {
		pe.current === e && (ue(fe), ue(pe)), he.current === e && (ue(he), lp._currentValue = oe);
	}
	var ye, be;
	function xe(e) {
		if (ye === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ye = t && t[1] || "", be = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ye + e + be;
	}
	var Se = !1;
	function N(e, t) {
		if (!e || Se) return "";
		Se = !0;
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
			Se = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? xe(n) : "";
	}
	function Ce(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return xe(e.type);
			case 16: return xe("Lazy");
			case 13: return e.child !== t && t !== null ? xe("Suspense Fallback") : xe("Suspense");
			case 19: return xe("SuspenseList");
			case 0:
			case 15: return N(e.type, !1);
			case 11: return N(e.type.render, !1);
			case 1: return N(e.type, !0);
			case 31: return xe("Activity");
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
	var Te = Object.prototype.hasOwnProperty, Ee = t.unstable_scheduleCallback, De = t.unstable_cancelCallback, Oe = t.unstable_shouldYield, ke = t.unstable_requestPaint, Ae = t.unstable_now, je = t.unstable_getCurrentPriorityLevel, Me = t.unstable_ImmediatePriority, Ne = t.unstable_UserBlockingPriority, Pe = t.unstable_NormalPriority, Fe = t.unstable_LowPriority, Ie = t.unstable_IdlePriority, Le = t.log, Re = t.unstable_setDisableYieldValue, ze = null, Be = null;
	function Ve(e) {
		if (typeof Le == "function" && Re(e), Be && typeof Be.setStrictMode == "function") try {
			Be.setStrictMode(ze, e);
		} catch {}
	}
	var He = Math.clz32 ? Math.clz32 : P, Ue = Math.log, We = Math.LN2;
	function P(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ue(e) / We | 0) | 0;
	}
	var Ge = 256, Ke = 262144, qe = 4194304;
	function Je(e) {
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
	function Ye(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Je(n))) : i = Je(o) : i = Je(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Je(n))) : i = Je(o)) : i = Je(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Xe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ze(e, t) {
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
	function Qe() {
		var e = qe;
		return qe <<= 1, !(qe & 62914560) && (qe = 4194304), e;
	}
	function $e(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function et(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function tt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - He(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && nt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function nt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - He(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function rt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - He(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function it(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : at(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function at(e) {
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
	function ot(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function st() {
		var e = j.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Tp(e.type)) : e;
	}
	function ct(e, t) {
		var n = j.p;
		try {
			return j.p = e, t();
		} finally {
			j.p = n;
		}
	}
	var lt = Math.random().toString(36).slice(2), ut = "__reactFiber$" + lt, dt = "__reactProps$" + lt, ft = "__reactContainer$" + lt, pt = "__reactEvents$" + lt, mt = "__reactListeners$" + lt, ht = "__reactHandles$" + lt, gt = "__reactResources$" + lt, _t = "__reactMarker$" + lt;
	function vt(e) {
		delete e[ut], delete e[dt], delete e[pt], delete e[mt], delete e[ht];
	}
	function yt(e) {
		var t = e[ut];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ft] || n[ut]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = wf(e); e !== null;) {
					if (n = e[ut]) return n;
					e = wf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function bt(e) {
		if (e = e[ut] || e[ft]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function xt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function St(e) {
		var t = e[gt];
		return t ||= e[gt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ct(e) {
		e[_t] = !0;
	}
	var wt = /* @__PURE__ */ new Set(), Tt = {};
	function Et(e, t) {
		Dt(e, t), Dt(e + "Capture", t);
	}
	function Dt(e, t) {
		for (Tt[e] = t, e = 0; e < t.length; e++) wt.add(t[e]);
	}
	var Ot = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), kt = {}, At = {};
	function jt(e) {
		return Te.call(At, e) ? !0 : Te.call(kt, e) ? !1 : Ot.test(e) ? At[e] = !0 : (kt[e] = !0, !1);
	}
	function Mt(e, t, n) {
		if (jt(t)) {
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
	function Nt(e, t, n) {
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
	function Pt(e, t, n, r) {
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
	function Ft(e) {
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
	function It(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Lt(e, t, n) {
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
	function Rt(e) {
		if (!e._valueTracker) {
			var t = It(e) ? "checked" : "value";
			e._valueTracker = Lt(e, t, "" + e[t]);
		}
	}
	function zt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = It(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Bt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Vt = /[\n"\\]/g;
	function Ht(e) {
		return e.replace(Vt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Ut(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ft(t)) : e.value !== "" + Ft(t) && (e.value = "" + Ft(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Gt(e, o, Ft(n)) : Gt(e, o, Ft(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ft(s) : e.removeAttribute("name");
	}
	function Wt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Rt(e);
				return;
			}
			n = n == null ? "" : "" + Ft(n), t = t == null ? n : "" + Ft(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Rt(e);
	}
	function Gt(e, t, n) {
		t === "number" && Bt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Kt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ft(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function qt(e, t, n) {
		if (t != null && (t = "" + Ft(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Ft(n);
	}
	function Jt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ae(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ft(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Rt(e);
	}
	function Yt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Xt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Zt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Xt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Qt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Zt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Zt(e, o, t[o]);
	}
	function $t(e) {
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
	var en = /* @__PURE__ */ new Map([
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
	]), tn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function nn(e) {
		return tn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function rn() {}
	var an = null;
	function on(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var sn = null, cn = null;
	function ln(e) {
		var t = bt(e);
		if (t && (e = t.stateNode)) {
			var n = e[dt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Ut(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ht("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[dt] || null;
								if (!a) throw Error(i(90));
								Ut(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && zt(r);
					}
					break a;
				case "textarea":
					qt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Kt(e, !!n.multiple, t, !1);
			}
		}
	}
	var un = !1;
	function dn(e, t, n) {
		if (un) return e(t, n);
		un = !0;
		try {
			return e(t);
		} finally {
			if (un = !1, (sn !== null || cn !== null) && (ju(), sn && (t = sn, e = cn, cn = sn = null, ln(t), e))) for (t = 0; t < e.length; t++) ln(e[t]);
		}
	}
	function fn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[dt] || null;
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
	var pn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), mn = !1;
	if (pn) try {
		var hn = {};
		Object.defineProperty(hn, "passive", { get: function() {
			mn = !0;
		} }), window.addEventListener("test", hn, hn), window.removeEventListener("test", hn, hn);
	} catch {
		mn = !1;
	}
	var gn = null, _n = null, vn = null;
	function yn() {
		if (vn) return vn;
		var e, t = _n, n = t.length, r, i = "value" in gn ? gn.value : gn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return vn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function bn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function xn() {
		return !0;
	}
	function Sn() {
		return !1;
	}
	function Cn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? xn : Sn, this.isPropagationStopped = Sn, this;
		}
		return p(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = xn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = xn);
			},
			persist: function() {},
			isPersistent: xn
		}), t;
	}
	var wn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Tn = Cn(wn), En = p({}, wn, {
		view: 0,
		detail: 0
	}), Dn = Cn(En), On, kn, An, jn = p({}, En, {
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
		getModifierState: Hn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== An && (An && e.type === "mousemove" ? (On = e.screenX - An.screenX, kn = e.screenY - An.screenY) : kn = On = 0, An = e), On);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : kn;
		}
	}), Mn = Cn(jn), Nn = Cn(p({}, jn, { dataTransfer: 0 })), Pn = Cn(p({}, En, { relatedTarget: 0 })), Fn = Cn(p({}, wn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), In = Cn(p({}, wn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Ln = Cn(p({}, wn, { data: 0 })), Rn = {
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
	}, zn = {
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
	}, Bn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Vn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Bn[e]) ? !!t[e] : !1;
	}
	function Hn() {
		return Vn;
	}
	var Un = Cn(p({}, En, {
		key: function(e) {
			if (e.key) {
				var t = Rn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = bn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? zn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Hn,
		charCode: function(e) {
			return e.type === "keypress" ? bn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? bn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Wn = Cn(p({}, jn, {
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
	})), Gn = Cn(p({}, En, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Hn
	})), Kn = Cn(p({}, wn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), qn = Cn(p({}, jn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Jn = Cn(p({}, wn, {
		newState: 0,
		oldState: 0
	})), Yn = [
		9,
		13,
		27,
		32
	], Xn = pn && "CompositionEvent" in window, Zn = null;
	pn && "documentMode" in document && (Zn = document.documentMode);
	var Qn = pn && "TextEvent" in window && !Zn, $n = pn && (!Xn || Zn && 8 < Zn && 11 >= Zn), er = " ", tr = !1;
	function nr(e, t) {
		switch (e) {
			case "keyup": return Yn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function rr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var ir = !1;
	function ar(e, t) {
		switch (e) {
			case "compositionend": return rr(t);
			case "keypress": return t.which === 32 ? (tr = !0, er) : null;
			case "textInput": return e = t.data, e === er && tr ? null : e;
			default: return null;
		}
	}
	function or(e, t) {
		if (ir) return e === "compositionend" || !Xn && nr(e, t) ? (e = yn(), vn = _n = gn = null, ir = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return $n && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var sr = {
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
	function cr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!sr[e.type] : t === "textarea";
	}
	function lr(e, t, n, r) {
		sn ? cn ? cn.push(r) : cn = [r] : sn = r, t = Rd(t, "onChange"), 0 < t.length && (n = new Tn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var ur = null, dr = null;
	function fr(e) {
		jd(e, 0);
	}
	function pr(e) {
		if (zt(xt(e))) return e;
	}
	function mr(e, t) {
		if (e === "change") return t;
	}
	var hr = !1;
	if (pn) {
		var gr;
		if (pn) {
			var _r = "oninput" in document;
			if (!_r) {
				var vr = document.createElement("div");
				vr.setAttribute("oninput", "return;"), _r = typeof vr.oninput == "function";
			}
			gr = _r;
		} else gr = !1;
		hr = gr && (!document.documentMode || 9 < document.documentMode);
	}
	function yr() {
		ur && (ur.detachEvent("onpropertychange", br), dr = ur = null);
	}
	function br(e) {
		if (e.propertyName === "value" && pr(dr)) {
			var t = [];
			lr(t, dr, e, on(e)), dn(fr, t);
		}
	}
	function xr(e, t, n) {
		e === "focusin" ? (yr(), ur = t, dr = n, ur.attachEvent("onpropertychange", br)) : e === "focusout" && yr();
	}
	function Sr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return pr(dr);
	}
	function Cr(e, t) {
		if (e === "click") return pr(t);
	}
	function wr(e, t) {
		if (e === "input" || e === "change") return pr(t);
	}
	function Tr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Er = typeof Object.is == "function" ? Object.is : Tr;
	function Dr(e, t) {
		if (Er(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Te.call(t, i) || !Er(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Or(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function kr(e, t) {
		var n = Or(e);
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
			n = Or(n);
		}
	}
	function Ar(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ar(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function jr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Bt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Bt(e.document);
		}
		return t;
	}
	function Mr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Nr = pn && "documentMode" in document && 11 >= document.documentMode, Pr = null, Fr = null, Ir = null, Lr = !1;
	function Rr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Lr || Pr == null || Pr !== Bt(r) || (r = Pr, "selectionStart" in r && Mr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ir && Dr(Ir, r) || (Ir = r, r = Rd(Fr, "onSelect"), 0 < r.length && (t = new Tn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Pr)));
	}
	function zr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Br = {
		animationend: zr("Animation", "AnimationEnd"),
		animationiteration: zr("Animation", "AnimationIteration"),
		animationstart: zr("Animation", "AnimationStart"),
		transitionrun: zr("Transition", "TransitionRun"),
		transitionstart: zr("Transition", "TransitionStart"),
		transitioncancel: zr("Transition", "TransitionCancel"),
		transitionend: zr("Transition", "TransitionEnd")
	}, Vr = {}, Hr = {};
	pn && (Hr = document.createElement("div").style, "AnimationEvent" in window || (delete Br.animationend.animation, delete Br.animationiteration.animation, delete Br.animationstart.animation), "TransitionEvent" in window || delete Br.transitionend.transition);
	function Ur(e) {
		if (Vr[e]) return Vr[e];
		if (!Br[e]) return e;
		var t = Br[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Hr) return Vr[e] = t[n];
		return e;
	}
	var Wr = Ur("animationend"), Gr = Ur("animationiteration"), Kr = Ur("animationstart"), qr = Ur("transitionrun"), Jr = Ur("transitionstart"), Yr = Ur("transitioncancel"), Xr = Ur("transitionend"), Zr = /* @__PURE__ */ new Map(), Qr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Qr.push("scrollEnd");
	function $r(e, t) {
		Zr.set(e, t), Et(t, [e]);
	}
	var ei = typeof reportError == "function" ? reportError : function(e) {
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
	}, ti = [], ni = 0, ri = 0;
	function ii() {
		for (var e = ni, t = ri = ni = 0; t < e;) {
			var n = ti[t];
			ti[t++] = null;
			var r = ti[t];
			ti[t++] = null;
			var i = ti[t];
			ti[t++] = null;
			var a = ti[t];
			if (ti[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ci(n, i, a);
		}
	}
	function ai(e, t, n, r) {
		ti[ni++] = e, ti[ni++] = t, ti[ni++] = n, ti[ni++] = r, ri |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function oi(e, t, n, r) {
		return ai(e, t, n, r), li(e);
	}
	function si(e, t) {
		return ai(e, null, null, t), li(e);
	}
	function ci(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - He(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function li(e) {
		if (50 < Su) throw Su = 0, Cu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ui = {};
	function di(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function fi(e, t, n, r) {
		return new di(e, t, n, r);
	}
	function pi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function mi(e, t) {
		var n = e.alternate;
		return n === null ? (n = fi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function hi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function gi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") pi(e) && (s = 1);
		else if (typeof e == "string") s = ep(e, n, fe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case T: return e = fi(31, n, t, a), e.elementType = T, e.lanes = o, e;
			case y: return _i(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = fi(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ne: return e = fi(13, n, t, a), e.elementType = ne, e.lanes = o, e;
			case C: return e = fi(19, n, t, a), e.elementType = C, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case te:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case S:
						s = 11;
						break a;
					case re:
						s = 14;
						break a;
					case w:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = fi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function _i(e, t, n, r) {
		return e = fi(7, e, r, t), e.lanes = n, e;
	}
	function vi(e, t, n) {
		return e = fi(6, e, null, t), e.lanes = n, e;
	}
	function yi(e) {
		var t = fi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function bi(e, t, n) {
		return t = fi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var xi = /* @__PURE__ */ new WeakMap();
	function Si(e, t) {
		if (typeof e == "object" && e) {
			var n = xi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: we(t)
			}, xi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: we(t)
		};
	}
	var Ci = [], wi = 0, Ti = null, Ei = 0, Di = [], Oi = 0, ki = null, Ai = 1, ji = "";
	function Mi(e, t) {
		Ci[wi++] = Ei, Ci[wi++] = Ti, Ti = e, Ei = t;
	}
	function Ni(e, t, n) {
		Di[Oi++] = Ai, Di[Oi++] = ji, Di[Oi++] = ki, ki = e;
		var r = Ai;
		e = ji;
		var i = 32 - He(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - He(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ai = 1 << 32 - He(t) + i | n << i | r, ji = a + e;
		} else Ai = 1 << a | n << i | r, ji = e;
	}
	function Pi(e) {
		e.return !== null && (Mi(e, 1), Ni(e, 1, 0));
	}
	function Fi(e) {
		for (; e === Ti;) Ti = Ci[--wi], Ci[wi] = null, Ei = Ci[--wi], Ci[wi] = null;
		for (; e === ki;) ki = Di[--Oi], Di[Oi] = null, ji = Di[--Oi], Di[Oi] = null, Ai = Di[--Oi], Di[Oi] = null;
	}
	function Ii(e, t) {
		Di[Oi++] = Ai, Di[Oi++] = ji, Di[Oi++] = ki, Ai = t.id, ji = t.overflow, ki = e;
	}
	var Li = null, Ri = null, zi = !1, Bi = null, Vi = !1, Hi = Error(i(519));
	function Ui(e) {
		throw Yi(Si(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Hi;
	}
	function Wi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ut] = e, t[dt] = r, n) {
			case "dialog":
				B("cancel", t), B("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				B("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < kd.length; n++) B(kd[n], t);
				break;
			case "source":
				B("error", t);
				break;
			case "img":
			case "image":
			case "link":
				B("error", t), B("load", t);
				break;
			case "details":
				B("toggle", t);
				break;
			case "input":
				B("invalid", t), Wt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				B("invalid", t);
				break;
			case "textarea": B("invalid", t), Jt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Wd(t.textContent, n) ? (r.popover != null && (B("beforetoggle", t), B("toggle", t)), r.onScroll != null && B("scroll", t), r.onScrollEnd != null && B("scrollend", t), r.onClick != null && (t.onclick = rn), t = !0) : t = !1, t || Ui(e, !0);
	}
	function Gi(e) {
		for (Li = e.return; Li;) switch (Li.tag) {
			case 5:
			case 31:
			case 13:
				Vi = !1;
				return;
			case 27:
			case 3:
				Vi = !0;
				return;
			default: Li = Li.return;
		}
	}
	function Ki(e) {
		if (e !== Li) return !1;
		if (!zi) return Gi(e), zi = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || nf(e.type, e.memoizedProps)), n = !n), n && Ri && Ui(e), Gi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ri = Cf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ri = Cf(e);
		} else t === 27 ? (t = Ri, df(e.type) ? (e = Sf, Sf = null, Ri = e) : Ri = t) : Ri = Li ? xf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function qi() {
		Ri = Li = null, zi = !1;
	}
	function Ji() {
		var e = Bi;
		return e !== null && (cu === null ? cu = e : cu.push.apply(cu, e), Bi = null), e;
	}
	function Yi(e) {
		Bi === null ? Bi = [e] : Bi.push(e);
	}
	var Xi = le(null), Zi = null, Qi = null;
	function $i(e, t, n) {
		de(Xi, t._currentValue), t._currentValue = n;
	}
	function ea(e) {
		e._currentValue = Xi.current, ue(Xi);
	}
	function ta(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function na(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ta(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), ta(s, n, e), s = null;
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
	function ra(e, t, n, r) {
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
					Er(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === he.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [lp] : e.push(lp));
			}
			a = a.return;
		}
		e !== null && na(t, e, n, r), t.flags |= 262144;
	}
	function ia(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Er(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function aa(e) {
		Zi = e, Qi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function oa(e) {
		return ca(Zi, e);
	}
	function sa(e, t) {
		return Zi === null && aa(e), ca(e, t);
	}
	function ca(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Qi === null) {
			if (e === null) throw Error(i(308));
			Qi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Qi = Qi.next = t;
		return n;
	}
	var la = typeof AbortController < "u" ? AbortController : function() {
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
	}, ua = t.unstable_scheduleCallback, da = t.unstable_NormalPriority, fa = {
		$$typeof: te,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function pa() {
		return {
			controller: new la(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ma(e) {
		e.refCount--, e.refCount === 0 && ua(da, function() {
			e.controller.abort();
		});
	}
	var ha = null, F = 0, I = 0, ga = null;
	function _a(e, t) {
		if (ha === null) {
			var n = ha = [];
			F = 0, I = Cd(), ga = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return F++, t.then(va, va), t;
	}
	function va() {
		if (--F === 0 && ha !== null) {
			ga !== null && (ga.status = "fulfilled");
			var e = ha;
			ha = null, I = 0, ga = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ya(e, t) {
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
	var ba = A.S;
	A.S = function(e, t) {
		du = Ae(), typeof t == "object" && t && typeof t.then == "function" && _a(e, t), ba !== null && ba(e, t);
	};
	var xa = le(null);
	function Sa() {
		var e = xa.current;
		return e === null ? Jl.pooledCache : e;
	}
	function Ca(e, t) {
		t === null ? de(xa, xa.current) : de(xa, t.pool);
	}
	function wa() {
		var e = Sa();
		return e === null ? null : {
			parent: fa._currentValue,
			pool: e
		};
	}
	var Ta = Error(i(460)), Ea = Error(i(474)), Da = Error(i(542)), Oa = { then: function() {} };
	function ka(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Aa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(rn, rn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Pa(e), e;
			default:
				if (typeof t.status == "string") t.then(rn, rn);
				else {
					if (e = Jl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Pa(e), e;
				}
				throw Ma = t, Ta;
		}
	}
	function ja(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ma = e, Ta) : e;
		}
	}
	var Ma = null;
	function Na() {
		if (Ma === null) throw Error(i(459));
		var e = Ma;
		return Ma = null, e;
	}
	function Pa(e) {
		if (e === Ta || e === Da) throw Error(i(483));
	}
	var Fa = null, Ia = 0;
	function La(e) {
		var t = Ia;
		return Ia += 1, Fa === null && (Fa = []), Aa(Fa, e, t);
	}
	function Ra(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function za(e, t) {
		throw t.$$typeof === h ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ba(e) {
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
			return e = mi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = vi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === w && ja(i) === t.type) ? (t = a(t, n.props), Ra(t, n), t.return = e, t) : (t = gi(n.type, n.key, n.props, null, e.mode, r), Ra(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = bi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = _i(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = vi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case g: return n = gi(t.type, t.key, t.props, null, e.mode, n), Ra(n, t), n.return = e, n;
					case v: return t = bi(t, e.mode, n), t.return = e, t;
					case w: return t = ja(t), f(e, t, n);
				}
				if (ae(t) || O(t)) return t = _i(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, La(t), n);
				if (t.$$typeof === te) return f(e, sa(e, t), n);
				za(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case g: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case w: return n = ja(n), p(e, t, n, r);
				}
				if (ae(n) || O(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, La(n), r);
				if (n.$$typeof === te) return p(e, t, sa(e, n), r);
				za(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case g: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case w: return r = ja(r), m(e, t, n, r, i);
				}
				if (ae(r) || O(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, La(r), i);
				if (r.$$typeof === te) return m(e, t, n, sa(t, r), i);
				za(t, r);
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
			if (h === s.length) return n(i, d), zi && Mi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return zi && Mi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), zi && Mi(i, h), l;
		}
		function _(a, s, c, l) {
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
			if (v.done) return n(a, h), zi && Mi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return zi && Mi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), zi && Mi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case g:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === w && ja(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ra(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = _i(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = gi(o.type, o.key, o.props, null, e.mode, c), Ra(c, o), c.return = e, e = c);
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
							c = bi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case w: return o = ja(o), b(e, r, o, c);
				}
				if (ae(o)) return h(e, r, o, c);
				if (O(o)) {
					if (l = O(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), _(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, La(o), c);
				if (o.$$typeof === te) return b(e, r, sa(e, o), c);
				za(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = vi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ia = 0;
				var i = b(e, t, n, r);
				return Fa = null, i;
			} catch (t) {
				if (t === Ta || t === Da) throw t;
				var a = fi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Va = Ba(!0), Ha = Ba(!1), Ua = !1;
	function Wa(e) {
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
	function Ga(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ka(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function qa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, ql & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = li(e), ci(e, null, n), t;
		}
		return ai(e, r, t, n), li(e);
	}
	function Ja(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	function Ya(e, t) {
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
	var Xa = !1;
	function Za() {
		if (Xa) {
			var e = ga;
			if (e !== null) throw e;
		}
	}
	function Qa(e, t, n, r) {
		Xa = !1;
		var i = e.updateQueue;
		Ua = !1;
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
				var f = s.lane & -536870913, m = f !== s.lane;
				if (m ? (Yl & f) === f : (r & f) === f) {
					f !== 0 && f === I && (Xa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, f);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, f = typeof h == "function" ? h.call(_, d, f) : h, f == null) break a;
								d = p({}, d, f);
								break a;
							case 2: Ua = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [f] : m.push(f));
				} else m = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = m, c = d) : u = u.next = m, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), ru |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function $a(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function eo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) $a(n[e], t);
	}
	var to = le(null), no = le(0);
	function ro(e, t) {
		e = tu, de(no, e), de(to, t), tu = e | t.baseLanes;
	}
	function io() {
		de(no, tu), de(to, to.current);
	}
	function ao() {
		tu = no.current, ue(to), ue(no);
	}
	var oo = le(null), so = null;
	function co(e) {
		var t = e.alternate;
		de(mo, mo.current & 1), de(oo, e), so === null && (t === null || to.current !== null || t.memoizedState !== null) && (so = e);
	}
	function lo(e) {
		de(mo, mo.current), de(oo, e), so === null && (so = e);
	}
	function uo(e) {
		e.tag === 22 ? (de(mo, mo.current), de(oo, e), so === null && (so = e)) : fo(e);
	}
	function fo() {
		de(mo, mo.current), de(oo, oo.current);
	}
	function po(e) {
		ue(oo), so === e && (so = null), ue(mo);
	}
	var mo = le(0);
	function ho(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || vf(n) || yf(n))) return t;
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
	var go = 0, L = null, _o = null, vo = null, yo = !1, bo = !1, xo = !1, So = 0, Co = 0, wo = null, To = 0;
	function Eo() {
		throw Error(i(321));
	}
	function Do(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Er(e[n], t[n])) return !1;
		return !0;
	}
	function Oo(e, t, n, r, i, a) {
		return go = a, L = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? Gs : Ks, xo = !1, a = n(r, i), xo = !1, bo && (a = Ao(t, n, r, i)), ko(e), a;
	}
	function ko(e) {
		A.H = Ws;
		var t = _o !== null && _o.next !== null;
		if (go = 0, vo = _o = L = null, yo = !1, Co = 0, wo = null, t) throw Error(i(300));
		e === null || lc || (e = e.dependencies, e !== null && ia(e) && (lc = !0));
	}
	function Ao(e, t, n, r) {
		L = e;
		var a = 0;
		do {
			if (bo && (wo = null), Co = 0, bo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, vo = _o = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			A.H = qs, o = t(n, r);
		} while (bo);
		return o;
	}
	function jo() {
		var e = A.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ro(t) : t, e = e.useState()[0], (_o === null ? null : _o.memoizedState) !== e && (L.flags |= 1024), t;
	}
	function Mo() {
		var e = So !== 0;
		return So = 0, e;
	}
	function No(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Po(e) {
		if (yo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			yo = !1;
		}
		go = 0, vo = _o = L = null, bo = !1, Co = So = 0, wo = null;
	}
	function Fo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return vo === null ? L.memoizedState = vo = e : vo = vo.next = e, vo;
	}
	function Io() {
		if (_o === null) {
			var e = L.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = _o.next;
		var t = vo === null ? L.memoizedState : vo.next;
		if (t !== null) vo = t, _o = e;
		else {
			if (e === null) throw L.alternate === null ? Error(i(467)) : Error(i(310));
			_o = e, e = {
				memoizedState: _o.memoizedState,
				baseState: _o.baseState,
				baseQueue: _o.baseQueue,
				queue: _o.queue,
				next: null
			}, vo === null ? L.memoizedState = vo = e : vo = vo.next = e;
		}
		return vo;
	}
	function Lo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ro(e) {
		var t = Co;
		return Co += 1, wo === null && (wo = []), e = Aa(wo, e, t), t = L, (vo === null ? t.memoizedState : vo.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? Gs : Ks), e;
	}
	function zo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ro(e);
			if (e.$$typeof === te) return oa(e);
		}
		throw Error(i(438, String(e)));
	}
	function Bo(e) {
		var t = null, n = L.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = L.alternate;
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
		}, n === null && (n = Lo(), L.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = E;
		return t.index++, n;
	}
	function Vo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ho(e) {
		return Uo(Io(), _o, e);
	}
	function Uo(e, t, n) {
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
				if (f === u.lane ? (go & f) === f : (Yl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === I && (d = !0);
					else if ((go & p) === p) {
						u = u.next, p === I && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, L.lanes |= p, ru |= p;
					f = u.action, xo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, L.lanes |= f, ru |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Er(o, e.memoizedState) && (lc = !0, d && (n = ga, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Wo(e) {
		var t = Io(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Er(o, t.memoizedState) || (lc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Go(e, t, n) {
		var r = L, a = Io(), o = zi;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Er((_o || a).memoizedState, n);
		if (s && (a.memoizedState = n, lc = !0), a = a.queue, gs(Jo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || vo !== null && vo.memoizedState.tag & 1) {
			if (r.flags |= 2048, ds(9, { destroy: void 0 }, qo.bind(null, r, a, n, t), null), Jl === null) throw Error(i(349));
			o || go & 127 || Ko(r, t, n);
		}
		return n;
	}
	function Ko(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = L.updateQueue, t === null ? (t = Lo(), L.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function qo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Yo(t) && Xo(e);
	}
	function Jo(e, t, n) {
		return n(function() {
			Yo(t) && Xo(e);
		});
	}
	function Yo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Er(e, n);
		} catch {
			return !0;
		}
	}
	function Xo(e) {
		var t = si(e, 2);
		t !== null && Eu(t, e, 2);
	}
	function Zo(e) {
		var t = Fo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), xo) {
				Ve(!0);
				try {
					n();
				} finally {
					Ve(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Vo,
			lastRenderedState: e
		}, t;
	}
	function Qo(e, t, n, r) {
		return e.baseState = n, Uo(e, _o, typeof r == "function" ? r : Vo);
	}
	function $o(e, t, n, r, a) {
		if (Vs(e)) throw Error(i(485));
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
			A.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, es(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function es(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = A.T, o = {};
			A.T = o;
			try {
				var s = n(i, r), c = A.S;
				c !== null && c(o, s), ts(e, t, s);
			} catch (n) {
				rs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), A.T = a;
			}
		} else try {
			a = n(i, r), ts(e, t, a);
		} catch (n) {
			rs(e, t, n);
		}
	}
	function ts(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ns(e, t, n);
		}, function(n) {
			return rs(e, t, n);
		}) : ns(e, t, n);
	}
	function ns(e, t, n) {
		t.status = "fulfilled", t.value = n, is(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, es(e, n)));
	}
	function rs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, is(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function is(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function as(e, t) {
		return t;
	}
	function os(e, t) {
		if (zi) {
			var n = Jl.formState;
			if (n !== null) {
				a: {
					var r = L;
					if (zi) {
						if (Ri) {
							b: {
								for (var i = Ri, a = Vi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = xf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Ri = xf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ui(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Fo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: as,
			lastRenderedState: t
		}, n.queue = r, n = Rs.bind(null, L, r), r.dispatch = n, r = Zo(!1), a = Bs.bind(null, L, !1, r.queue), r = Fo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = $o.bind(null, L, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ss(e) {
		return cs(Io(), _o, e);
	}
	function cs(e, t, n) {
		if (t = Uo(e, t, as)[0], e = Ho(Vo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ro(t);
		} catch (e) {
			throw e === Ta ? Da : e;
		}
		else r = t;
		t = Io();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (L.flags |= 2048, ds(9, { destroy: void 0 }, ls.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ls(e, t) {
		e.action = t;
	}
	function us(e) {
		var t = Io(), n = _o;
		if (n !== null) return cs(t, n, e);
		Io(), t = t.memoizedState, n = Io();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ds(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = L.updateQueue, t === null && (t = Lo(), L.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function fs() {
		return Io().memoizedState;
	}
	function ps(e, t, n, r) {
		var i = Fo();
		L.flags |= e, i.memoizedState = ds(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ms(e, t, n, r) {
		var i = Io();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		_o !== null && r !== null && Do(r, _o.memoizedState.deps) ? i.memoizedState = ds(t, a, n, r) : (L.flags |= e, i.memoizedState = ds(1 | t, a, n, r));
	}
	function hs(e, t) {
		ps(8390656, 8, e, t);
	}
	function gs(e, t) {
		ms(2048, 8, e, t);
	}
	function _s(e) {
		L.flags |= 4;
		var t = L.updateQueue;
		if (t === null) t = Lo(), L.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function vs(e) {
		var t = Io().memoizedState;
		return _s({
			ref: t,
			nextImpl: e
		}), function() {
			if (ql & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ys(e, t) {
		return ms(4, 2, e, t);
	}
	function bs(e, t) {
		return ms(4, 4, e, t);
	}
	function xs(e, t) {
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
	function Ss(e, t, n) {
		n = n == null ? null : n.concat([e]), ms(4, 4, xs.bind(null, t, e), n);
	}
	function Cs() {}
	function ws(e, t) {
		var n = Io();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Do(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Ts(e, t) {
		var n = Io();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Do(t, r[1])) return r[0];
		if (r = e(), xo) {
			Ve(!0);
			try {
				e();
			} finally {
				Ve(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Es(e, t, n) {
		return n === void 0 || go & 1073741824 && !(Yl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Tu(), L.lanes |= e, ru |= e, n);
	}
	function Ds(e, t, n, r) {
		return Er(n, t) ? n : to.current === null ? !(go & 42) || go & 1073741824 && !(Yl & 261930) ? (lc = !0, e.memoizedState = n) : (e = Tu(), L.lanes |= e, ru |= e, t) : (e = Es(e, n, r), Er(e, t) || (lc = !0), e);
	}
	function Os(e, t, n, r, i) {
		var a = j.p;
		j.p = a !== 0 && 8 > a ? a : 8;
		var o = A.T, s = {};
		A.T = s, Bs(e, !1, t, n);
		try {
			var c = i(), l = A.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? zs(e, t, ya(c, r), wu(e)) : zs(e, t, r, wu(e));
		} catch (n) {
			zs(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, wu());
		} finally {
			j.p = a, o !== null && s.types !== null && (o.types = s.types), A.T = o;
		}
	}
	function ks() {}
	function As(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = js(e).queue;
		Os(e, a, t, oe, n === null ? ks : function() {
			return Ms(e), n(r);
		});
	}
	function js(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: oe,
			baseState: oe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Vo,
				lastRenderedState: oe
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
				lastRenderedReducer: Vo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ms(e) {
		var t = js(e);
		t.next === null && (t = e.alternate.memoizedState), zs(e, t.next.queue, {}, wu());
	}
	function Ns() {
		return oa(lp);
	}
	function Ps() {
		return Io().memoizedState;
	}
	function Fs() {
		return Io().memoizedState;
	}
	function Is(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = wu();
					e = Ka(n);
					var r = qa(t, e, n);
					r !== null && (Eu(r, t, n), Ja(r, t, n)), t = { cache: pa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ls(e, t, n) {
		var r = wu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Vs(e) ? Hs(t, n) : (n = oi(e, t, n, r), n !== null && (Eu(n, e, r), Us(n, t, r)));
	}
	function Rs(e, t, n) {
		zs(e, t, n, wu());
	}
	function zs(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Vs(e)) Hs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Er(s, o)) return ai(e, t, i, 0), Jl === null && ii(), !1;
			} catch {}
			if (n = oi(e, t, i, r), n !== null) return Eu(n, e, r), Us(n, t, r), !0;
		}
		return !1;
	}
	function Bs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Cd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Vs(e)) {
			if (t) throw Error(i(479));
		} else t = oi(e, n, r, 2), t !== null && Eu(t, e, 2);
	}
	function Vs(e) {
		var t = e.alternate;
		return e === L || t !== null && t === L;
	}
	function Hs(e, t) {
		bo = yo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Us(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	var Ws = {
		readContext: oa,
		use: zo,
		useCallback: Eo,
		useContext: Eo,
		useEffect: Eo,
		useImperativeHandle: Eo,
		useLayoutEffect: Eo,
		useInsertionEffect: Eo,
		useMemo: Eo,
		useReducer: Eo,
		useRef: Eo,
		useState: Eo,
		useDebugValue: Eo,
		useDeferredValue: Eo,
		useTransition: Eo,
		useSyncExternalStore: Eo,
		useId: Eo,
		useHostTransitionStatus: Eo,
		useFormState: Eo,
		useActionState: Eo,
		useOptimistic: Eo,
		useMemoCache: Eo,
		useCacheRefresh: Eo
	};
	Ws.useEffectEvent = Eo;
	var Gs = {
		readContext: oa,
		use: zo,
		useCallback: function(e, t) {
			return Fo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: oa,
		useEffect: hs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ps(4194308, 4, xs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ps(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ps(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Fo();
			t = t === void 0 ? null : t;
			var r = e();
			if (xo) {
				Ve(!0);
				try {
					e();
				} finally {
					Ve(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Fo();
			if (n !== void 0) {
				var i = n(t);
				if (xo) {
					Ve(!0);
					try {
						n(t);
					} finally {
						Ve(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ls.bind(null, L, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Fo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Zo(e);
			var t = e.queue, n = Rs.bind(null, L, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Cs,
		useDeferredValue: function(e, t) {
			return Es(Fo(), e, t);
		},
		useTransition: function() {
			var e = Zo(!1);
			return e = Os.bind(null, L, e.queue, !0, !1), Fo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = L, a = Fo();
			if (zi) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Jl === null) throw Error(i(349));
				Yl & 127 || Ko(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, hs(Jo.bind(null, r, o, e), [e]), r.flags |= 2048, ds(9, { destroy: void 0 }, qo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Fo(), t = Jl.identifierPrefix;
			if (zi) {
				var n = ji, r = Ai;
				n = (r & ~(1 << 32 - He(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = So++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = To++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ns,
		useFormState: os,
		useActionState: os,
		useOptimistic: function(e) {
			var t = Fo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Bs.bind(null, L, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Bo,
		useCacheRefresh: function() {
			return Fo().memoizedState = Is.bind(null, L);
		},
		useEffectEvent: function(e) {
			var t = Fo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (ql & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ks = {
		readContext: oa,
		use: zo,
		useCallback: ws,
		useContext: oa,
		useEffect: gs,
		useImperativeHandle: Ss,
		useInsertionEffect: ys,
		useLayoutEffect: bs,
		useMemo: Ts,
		useReducer: Ho,
		useRef: fs,
		useState: function() {
			return Ho(Vo);
		},
		useDebugValue: Cs,
		useDeferredValue: function(e, t) {
			return Ds(Io(), _o.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ho(Vo)[0], t = Io().memoizedState;
			return [typeof e == "boolean" ? e : Ro(e), t];
		},
		useSyncExternalStore: Go,
		useId: Ps,
		useHostTransitionStatus: Ns,
		useFormState: ss,
		useActionState: ss,
		useOptimistic: function(e, t) {
			return Qo(Io(), _o, e, t);
		},
		useMemoCache: Bo,
		useCacheRefresh: Fs
	};
	Ks.useEffectEvent = vs;
	var qs = {
		readContext: oa,
		use: zo,
		useCallback: ws,
		useContext: oa,
		useEffect: gs,
		useImperativeHandle: Ss,
		useInsertionEffect: ys,
		useLayoutEffect: bs,
		useMemo: Ts,
		useReducer: Wo,
		useRef: fs,
		useState: function() {
			return Wo(Vo);
		},
		useDebugValue: Cs,
		useDeferredValue: function(e, t) {
			var n = Io();
			return _o === null ? Es(n, e, t) : Ds(n, _o.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Wo(Vo)[0], t = Io().memoizedState;
			return [typeof e == "boolean" ? e : Ro(e), t];
		},
		useSyncExternalStore: Go,
		useId: Ps,
		useHostTransitionStatus: Ns,
		useFormState: us,
		useActionState: us,
		useOptimistic: function(e, t) {
			var n = Io();
			return _o === null ? (n.baseState = e, [e, n.queue.dispatch]) : Qo(n, _o, e, t);
		},
		useMemoCache: Bo,
		useCacheRefresh: Fs
	};
	qs.useEffectEvent = vs;
	function Js(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : p({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ys = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = wu(), i = Ka(r);
			i.payload = t, n != null && (i.callback = n), t = qa(e, i, r), t !== null && (Eu(t, e, r), Ja(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = wu(), i = Ka(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = qa(e, i, r), t !== null && (Eu(t, e, r), Ja(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = wu(), r = Ka(n);
			r.tag = 2, t != null && (r.callback = t), t = qa(e, r, n), t !== null && (Eu(t, e, n), Ja(t, e, n));
		}
	};
	function Xs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Dr(n, r) || !Dr(i, a) : !0;
	}
	function Zs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ys.enqueueReplaceState(t, t.state, null);
	}
	function Qs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = p({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function $s(e) {
		ei(e);
	}
	function ec(e) {
		console.error(e);
	}
	function tc(e) {
		ei(e);
	}
	function nc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function rc(e, t, n) {
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
	function ic(e, t, n) {
		return n = Ka(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			nc(e, t);
		}, n;
	}
	function ac(e) {
		return e = Ka(e), e.tag = 3, e;
	}
	function oc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				rc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			rc(t, n, r), typeof i != "function" && (mu === null ? mu = /* @__PURE__ */ new Set([this]) : mu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function sc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ra(t, n, a, !0), n = oo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return so === null ? Ru() : n.alternate === null && nu === 0 && (nu = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Oa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), rd(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Oa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), rd(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return rd(e, r, a), Ru(), !1;
		}
		if (zi) return t = oo.current, t === null ? (r !== Hi && (t = Error(i(423), { cause: r }), Yi(Si(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Si(r, n), a = ic(e.stateNode, r, a), Ya(e, a), nu !== 4 && (nu = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Hi && (e = Error(i(422), { cause: r }), Yi(Si(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Si(o, n), z === null ? z = [o] : z.push(o), nu !== 4 && (nu = 2), t === null) return !0;
		r = Si(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = ic(n.stateNode, r, e), Ya(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (mu === null || !mu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = ac(a), oc(a, e, n, r), Ya(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var cc = Error(i(461)), lc = !1;
	function uc(e, t, n, r) {
		t.child = e === null ? Ha(t, null, n, r) : Va(t, e.child, n, r);
	}
	function dc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return aa(t), r = Oo(e, t, n, o, a, i), s = Mo(), e !== null && !lc ? (No(e, t, i), Fc(e, t, i)) : (zi && s && Pi(t), t.flags |= 1, uc(e, t, r, i), t.child);
	}
	function fc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !pi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, pc(e, t, a, r, i)) : (e = gi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ic(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Dr : n, n(o, r) && e.ref === t.ref) return Fc(e, t, i);
		}
		return t.flags |= 1, e = mi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function pc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Dr(a, r) && e.ref === t.ref) {
				if (lc = !1, t.pendingProps = r = a, Ic(e, i)) e.flags & 131072 && (lc = !0);
				else return t.lanes = e.lanes, Fc(e, t, i);
			}
		}
		return xc(e, t, n, r, i);
	}
	function mc(e, t, n, r) {
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
				return gc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ca(t, a === null ? null : a.cachePool), a === null ? io() : ro(t, a), uo(t);
			else return r = t.lanes = 536870912, gc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ca(t, null), io(), fo(t)) : (Ca(t, a.cachePool), ro(t, a), fo(t), t.memoizedState = null);
		return uc(e, t, i, n), t.child;
	}
	function hc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function gc(e, t, n, r, i) {
		var a = Sa();
		return a = a === null ? null : {
			parent: fa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ca(t, null), io(), uo(t), e !== null && ra(e, t, r, !0), t.childLanes = i, null;
	}
	function _c(e, t) {
		return t = Ac({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function vc(e, t, n) {
		return Va(t, e.child, null, n), e = _c(t, t.pendingProps), e.flags |= 2, po(t), t.memoizedState = null, e;
	}
	function yc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (zi) {
				if (r.mode === "hidden") return e = _c(t, r), t.lanes = 536870912, hc(null, e);
				if (lo(t), (e = Ri) ? (e = _f(e, Vi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ki === null ? null : {
						id: Ai,
						overflow: ji
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = yi(e), n.return = t, t.child = n, Li = t, Ri = null)) : e = null, e === null) throw Ui(t);
				return t.lanes = 536870912, null;
			}
			return _c(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (lo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = vc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (lc || ra(e, t, n, !1), a = (n & e.childLanes) !== 0, lc || a) {
				if (r = Jl, r !== null && (s = it(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, si(e, s), Eu(r, e, s), cc;
				Ru(), t = vc(e, t, n);
			} else e = o.treeContext, Ri = xf(s.nextSibling), Li = t, zi = !0, Bi = null, Vi = !1, e !== null && Ii(t, e), t = _c(t, r), t.flags |= 4096;
			return t;
		}
		return e = mi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function bc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function xc(e, t, n, r, i) {
		return aa(t), n = Oo(e, t, n, r, void 0, i), r = Mo(), e !== null && !lc ? (No(e, t, i), Fc(e, t, i)) : (zi && r && Pi(t), t.flags |= 1, uc(e, t, n, i), t.child);
	}
	function Sc(e, t, n, r, i, a) {
		return aa(t), t.updateQueue = null, n = Ao(t, r, n, i), ko(e), r = Mo(), e !== null && !lc ? (No(e, t, a), Fc(e, t, a)) : (zi && r && Pi(t), t.flags |= 1, uc(e, t, n, a), t.child);
	}
	function Cc(e, t, n, r, i) {
		if (aa(t), t.stateNode === null) {
			var a = ui, o = n.contextType;
			typeof o == "object" && o && (a = oa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ys, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Wa(t), o = n.contextType, a.context = typeof o == "object" && o ? oa(o) : ui, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Js(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ys.enqueueReplaceState(a, a.state, null), Qa(t, r, a, i), Za(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Qs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ui, typeof u == "object" && u && (o = oa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Zs(t, a, r, o), Ua = !1;
			var f = t.memoizedState;
			a.state = f, Qa(t, r, a, i), Za(), l = t.memoizedState, s || f !== l || Ua ? (typeof d == "function" && (Js(t, n, d, r), l = t.memoizedState), (c = Ua || Xs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ga(e, t), o = t.memoizedProps, u = Qs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ui, typeof l == "object" && l && (c = oa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Zs(t, a, r, c), Ua = !1, f = t.memoizedState, a.state = f, Qa(t, r, a, i), Za();
			var p = t.memoizedState;
			o !== d || f !== p || Ua || e !== null && e.dependencies !== null && ia(e.dependencies) ? (typeof s == "function" && (Js(t, n, s, r), p = t.memoizedState), (u = Ua || Xs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ia(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, bc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Va(t, e.child, null, i), t.child = Va(t, null, n, i)) : uc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Fc(e, t, i), e;
	}
	function wc(e, t, n, r) {
		return qi(), t.flags |= 256, uc(e, t, n, r), t.child;
	}
	var Tc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Ec(e) {
		return {
			baseLanes: e,
			cachePool: wa()
		};
	}
	function Dc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= ou), e;
	}
	function Oc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(mo.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (zi) {
				if (a ? co(t) : fo(t), (e = Ri) ? (e = _f(e, Vi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: ki === null ? null : {
						id: Ai,
						overflow: ji
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = yi(e), n.return = t, t.child = n, Li = t, Ri = null)) : e = null, e === null) throw Ui(t);
				return yf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (fo(t), a = t.mode, c = Ac({
				mode: "hidden",
				children: c
			}, a), r = _i(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = Ec(n), r.childLanes = Dc(e, s, n), t.memoizedState = Tc, hc(null, r)) : (co(t), kc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (co(t), t.flags &= -257, t = jc(e, t, n)) : t.memoizedState === null ? (fo(t), c = r.fallback, a = t.mode, r = Ac({
				mode: "visible",
				children: r.children
			}, a), c = _i(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Va(t, e.child, null, n), r = t.child, r.memoizedState = Ec(n), r.childLanes = Dc(e, s, n), t.memoizedState = Tc, t = hc(null, r)) : (fo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (co(t), yf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Yi({
					value: r,
					source: null,
					stack: null
				}), t = jc(e, t, n);
			} else if (lc || ra(e, t, n, !1), s = (n & e.childLanes) !== 0, lc || s) {
				if (s = Jl, s !== null && (r = it(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, si(e, r), Eu(s, e, r), cc;
				vf(c) || Ru(), t = jc(e, t, n);
			} else vf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ri = xf(c.nextSibling), Li = t, zi = !0, Bi = null, Vi = !1, e !== null && Ii(t, e), t = kc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (fo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = mi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = _i(c, a, n, null), c.flags |= 2) : c = mi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, hc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = Ec(n) : (a = c.cachePool, a === null ? a = wa() : (l = fa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Dc(e, s, n), t.memoizedState = Tc, hc(e.child, r)) : (co(t), n = e.child, e = n.sibling, n = mi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function kc(e, t) {
		return t = Ac({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Ac(e, t) {
		return e = fi(22, e, null, t), e.lanes = 0, e;
	}
	function jc(e, t, n) {
		return Va(t, e.child, null, n), e = kc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Mc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ta(e.return, t, n);
	}
	function Nc(e, t, n, r, i, a) {
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
	function Pc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = mo.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, de(mo, o), uc(e, t, r, n), r = zi ? Ei : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Mc(e, n, t);
			else if (e.tag === 19) Mc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ho(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Nc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ho(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Nc(t, !0, n, null, a, r);
				break;
			case "together":
				Nc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Fc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), ru |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ra(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = mi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = mi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ic(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ia(e)));
	}
	function Lc(e, t, n) {
		switch (t.tag) {
			case 3:
				ge(t, t.stateNode.containerInfo), $i(t, fa, e.memoizedState.cache), qi();
				break;
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge(t, t.stateNode.containerInfo);
				break;
			case 10:
				$i(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, lo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (co(t), e = Fc(e, t, n), e === null ? null : e.sibling) : Oc(e, t, n) : (co(t), t.flags |= 128, null);
				co(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (ra(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Pc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), de(mo, mo.current), r) break;
				return null;
			case 22: return t.lanes = 0, mc(e, t, n, t.pendingProps);
			case 24: $i(t, fa, e.memoizedState.cache);
		}
		return Fc(e, t, n);
	}
	function Rc(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) lc = !0;
			else {
				if (!Ic(e, n) && !(t.flags & 128)) return lc = !1, Lc(e, t, n);
				lc = !!(e.flags & 131072);
			}
		} else lc = !1, zi && t.flags & 1048576 && Ni(t, Ei, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ja(t.elementType), t.type = e, typeof e == "function") pi(e) ? (r = Qs(e, r), t.tag = 1, t = Cc(null, t, e, r, n)) : (t.tag = 0, t = xc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === S) {
								t.tag = 11, t = dc(null, t, e, r, n);
								break a;
							}
							if (a === re) {
								t.tag = 14, t = fc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ie(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return xc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Qs(r, t.pendingProps), Cc(e, t, r, a, n);
			case 3:
				a: {
					if (ge(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ga(e, t), Qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, $i(t, fa, r), r !== o.cache && na(t, [fa], n, !0), Za(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = wc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Si(Error(i(424)), t), Yi(a), t = wc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ri = xf(e.firstChild), Li = t, zi = !0, Bi = null, Vi = !0, n = Ha(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (qi(), r === a) {
							t = Fc(e, t, n);
							break a;
						}
						uc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return bc(e, t), e === null ? (n = Vf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : zi || (n = t.type, e = t.pendingProps, r = $d(me.current).createElement(n), r[ut] = t, r[dt] = e, qd(r, n, e), Ct(r), t.stateNode = r) : t.memoizedState = Vf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ve(t), e === null && zi && (r = t.stateNode = Tf(t.type, t.pendingProps, me.current), Li = t, Vi = !0, a = Ri, df(t.type) ? (Sf = a, Ri = xf(r.firstChild)) : Ri = a), uc(e, t, t.pendingProps.children, n), bc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && zi && ((a = r = Ri) && (r = hf(r, t.type, t.pendingProps, Vi), r === null ? a = !1 : (t.stateNode = r, Li = t, Ri = xf(r.firstChild), Vi = !1, a = !0)), a || Ui(t)), ve(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, nf(a, o) ? r = null : s !== null && nf(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Oo(e, t, jo, null, null, n), lp._currentValue = a), bc(e, t), uc(e, t, r, n), t.child;
			case 6: return e === null && zi && ((e = n = Ri) && (n = gf(n, t.pendingProps, Vi), n === null ? e = !1 : (t.stateNode = n, Li = t, Ri = null, e = !0)), e || Ui(t)), null;
			case 13: return Oc(e, t, n);
			case 4: return ge(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Va(t, null, r, n) : uc(e, t, r, n), t.child;
			case 11: return dc(e, t, t.type, t.pendingProps, n);
			case 7: return uc(e, t, t.pendingProps, n), t.child;
			case 8: return uc(e, t, t.pendingProps.children, n), t.child;
			case 12: return uc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, $i(t, t.type, r.value), uc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, aa(t), a = oa(a), r = r(a), t.flags |= 1, uc(e, t, r, n), t.child;
			case 14: return fc(e, t, t.type, t.pendingProps, n);
			case 15: return pc(e, t, t.type, t.pendingProps, n);
			case 19: return Pc(e, t, n);
			case 31: return yc(e, t, n);
			case 22: return mc(e, t, n, t.pendingProps);
			case 24: return aa(t), r = oa(fa), e === null ? (a = Sa(), a === null && (a = Jl, o = pa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Wa(t), $i(t, fa, a)) : ((e.lanes & n) !== 0 && (Ga(e, t), Qa(t, null, null, n), Za()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, $i(t, fa, r), r !== a.cache && na(t, [fa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), $i(t, fa, r))), uc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function zc(e) {
		e.flags |= 4;
	}
	function Bc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Fu()) e.flags |= 8192;
				else throw Ma = Oa, Ea;
			}
		} else e.flags &= -16777217;
	}
	function Vc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !tp(t)) {
			if (Fu()) e.flags |= 8192;
			else throw Ma = Oa, Ea;
		}
	}
	function Hc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Qe(), e.lanes |= t, su |= t);
	}
	function Uc(e, t) {
		if (!zi) switch (e.tailMode) {
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
	function Wc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Gc(e, t, n) {
		var r = t.pendingProps;
		switch (Fi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Wc(t), null;
			case 1: return Wc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), ea(fa), _e(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ki(t) ? zc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ji())), Wc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (zc(t), o === null ? (Wc(t), Bc(t, a, null, r, n)) : (Wc(t), Vc(t, o))) : o ? o === e.memoizedState ? (Wc(t), t.flags &= -16777217) : (zc(t), Wc(t), Vc(t, o)) : (e = e.memoizedProps, e !== r && zc(t), Wc(t), Bc(t, a, e, r, n)), null;
			case 27:
				if (M(t), n = me.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Wc(t), null;
					}
					e = fe.current, Ki(t) ? Wi(t, e) : (e = Tf(a, r, n), t.stateNode = e, zc(t));
				}
				return Wc(t), null;
			case 5:
				if (M(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Wc(t), null;
					}
					if (o = fe.current, Ki(t)) Wi(t, o);
					else {
						var s = $d(me.current);
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
						o[ut] = t, o[dt] = r;
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
						a: switch (qd(o, a, r), a) {
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
						r && zc(t);
					}
				}
				return Wc(t), Bc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && zc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = me.current, Ki(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Li, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ut] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Wd(e.nodeValue, n)), e || Ui(t, !0);
					} else e = $d(e).createTextNode(r), e[ut] = t, t.stateNode = e;
				}
				return Wc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ki(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ut] = t;
						} else qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Wc(t), e = !1;
					} else n = Ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (po(t), t) : (po(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Wc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ki(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ut] = t;
						} else qi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Wc(t), a = !1;
					} else a = Ji(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (po(t), t) : (po(t), null);
				}
				return po(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Hc(t, t.updateQueue), Wc(t), null);
			case 4: return _e(), e === null && Pd(t.stateNode.containerInfo), Wc(t), null;
			case 10: return ea(t.type), Wc(t), null;
			case 19:
				if (ue(mo), r = t.memoizedState, r === null) return Wc(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) Uc(r, !1);
					else {
						if (nu !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = ho(e), o !== null) {
								for (t.flags |= 128, Uc(r, !1), e = o.updateQueue, t.updateQueue = e, Hc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) hi(n, e), n = n.sibling;
								return de(mo, mo.current & 1 | 2), zi && Mi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ae() > fu && (t.flags |= 128, a = !0, Uc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = ho(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Hc(t, e), Uc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !zi) return Wc(t), null;
						} else 2 * Ae() - r.renderingStartTime > fu && n !== 536870912 && (t.flags |= 128, a = !0, Uc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Wc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ae(), e.sibling = null, n = mo.current, de(mo, a ? n & 1 | 2 : n & 1), zi && Mi(t, r.treeForkCount), e);
			case 22:
			case 23: return po(t), ao(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Wc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Wc(t), n = t.updateQueue, n !== null && Hc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ue(xa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ea(fa), Wc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Kc(e, t) {
		switch (Fi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return ea(fa), _e(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return M(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (po(t), t.alternate === null) throw Error(i(340));
					qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (po(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					qi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return ue(mo), null;
			case 4: return _e(), null;
			case 10: return ea(t.type), null;
			case 22:
			case 23: return po(t), ao(), e !== null && ue(xa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return ea(fa), null;
			case 25: return null;
			default: return null;
		}
	}
	function qc(e, t) {
		switch (Fi(t), t.tag) {
			case 3:
				ea(fa), _e();
				break;
			case 26:
			case 27:
			case 5:
				M(t);
				break;
			case 4:
				_e();
				break;
			case 31:
				t.memoizedState !== null && po(t);
				break;
			case 13:
				po(t);
				break;
			case 19:
				ue(mo);
				break;
			case 10:
				ea(t.type);
				break;
			case 22:
			case 23:
				po(t), ao(), e !== null && ue(xa);
				break;
			case 24: ea(fa);
		}
	}
	function Jc(e, t) {
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
			nd(t, t.return, e);
		}
	}
	function Yc(e, t, n) {
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
								nd(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			nd(t, t.return, e);
		}
	}
	function Xc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				eo(t, n);
			} catch (t) {
				nd(e, e.return, t);
			}
		}
	}
	function Zc(e, t, n) {
		n.props = Qs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			nd(e, t, n);
		}
	}
	function Qc(e, t) {
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
			nd(e, t, n);
		}
	}
	function $c(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				nd(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				nd(e, t, n);
			}
			else n.current = null;
		}
	}
	function el(e) {
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
			nd(e, e.return, t);
		}
	}
	function tl(e, t, n) {
		try {
			var r = e.stateNode;
			Jd(r, e.type, n, t), r[dt] = t;
		} catch (t) {
			nd(e, e.return, t);
		}
	}
	function nl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && df(e.type) || e.tag === 4;
	}
	function rl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || nl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && df(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function il(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = rn));
		else if (r !== 4 && (r === 27 && df(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (il(e, t, n), e = e.sibling; e !== null;) il(e, t, n), e = e.sibling;
	}
	function al(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && df(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (al(e, t, n), e = e.sibling; e !== null;) al(e, t, n), e = e.sibling;
	}
	function ol(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			qd(t, r, n), t[ut] = e, t[dt] = n;
		} catch (t) {
			nd(e, e.return, t);
		}
	}
	var sl = !1, cl = !1, ll = !1, ul = typeof WeakSet == "function" ? WeakSet : Set, dl = null;
	function fl(e, t) {
		if (e = e.containerInfo, Zd = vp, e = jr(e), Mr(e)) {
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
		for (Qd = {
			focusedElem: e,
			selectionRange: n
		}, vp = !1, dl = t; dl !== null;) if (t = dl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, dl = e;
		else for (; dl !== null;) {
			switch (t = dl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Qs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							nd(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) mf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								mf(e);
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
				e.return = t.return, dl = e;
				break;
			}
			dl = t.return;
		}
	}
	function pl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Ol(e, n), r & 4 && Jc(5, n);
				break;
			case 1:
				if (Ol(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						nd(n, n.return, e);
					}
					else {
						var i = Qs(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							nd(n, n.return, e);
						}
					}
				}
				r & 64 && Xc(n), r & 512 && Qc(n, n.return);
				break;
			case 3:
				if (Ol(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						eo(e, t);
					} catch (e) {
						nd(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && ol(n);
			case 26:
			case 5:
				Ol(e, n), t === null && r & 4 && el(n), r & 512 && Qc(n, n.return);
				break;
			case 12:
				Ol(e, n);
				break;
			case 31:
				Ol(e, n), r & 4 && yl(e, n);
				break;
			case 13:
				Ol(e, n), r & 4 && bl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = od.bind(null, n), bf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || sl, !r) {
					t = t !== null && t.memoizedState !== null || cl, i = sl;
					var a = cl;
					sl = r, (cl = t) && !a ? Al(e, n, !!(n.subtreeFlags & 8772)) : Ol(e, n), sl = i, cl = a;
				}
				break;
			case 30: break;
			default: Ol(e, n);
		}
	}
	function ml(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, ml(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && vt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var hl = null, gl = !1;
	function _l(e, t, n) {
		for (n = n.child; n !== null;) vl(e, t, n), n = n.sibling;
	}
	function vl(e, t, n) {
		if (Be && typeof Be.onCommitFiberUnmount == "function") try {
			Be.onCommitFiberUnmount(ze, n);
		} catch {}
		switch (n.tag) {
			case 26:
				cl || $c(n, t), _l(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				cl || $c(n, t);
				var r = hl, i = gl;
				df(n.type) && (hl = n.stateNode, gl = !1), _l(e, t, n), Ef(n.stateNode), hl = r, gl = i;
				break;
			case 5: cl || $c(n, t);
			case 6:
				if (r = hl, i = gl, hl = null, _l(e, t, n), hl = r, gl = i, hl !== null) {
					if (gl) try {
						(hl.nodeType === 9 ? hl.body : hl.nodeName === "HTML" ? hl.ownerDocument.body : hl).removeChild(n.stateNode);
					} catch (e) {
						nd(n, t, e);
					}
					else try {
						hl.removeChild(n.stateNode);
					} catch (e) {
						nd(n, t, e);
					}
				}
				break;
			case 18:
				hl !== null && (gl ? (e = hl, ff(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Wp(e)) : ff(hl, n.stateNode));
				break;
			case 4:
				r = hl, i = gl, hl = n.stateNode.containerInfo, gl = !0, _l(e, t, n), hl = r, gl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Yc(2, n, t), cl || Yc(4, n, t), _l(e, t, n);
				break;
			case 1:
				cl || ($c(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Zc(n, t, r)), _l(e, t, n);
				break;
			case 21:
				_l(e, t, n);
				break;
			case 22:
				cl = (r = cl) || n.memoizedState !== null, _l(e, t, n), cl = r;
				break;
			default: _l(e, t, n);
		}
	}
	function yl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Wp(e);
			} catch (e) {
				nd(t, t.return, e);
			}
		}
	}
	function bl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Wp(e);
		} catch (e) {
			nd(t, t.return, e);
		}
	}
	function xl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new ul()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ul()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Sl(e, t) {
		var n = xl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = sd.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function Cl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (df(c.type)) {
							hl = c.stateNode, gl = !1;
							break a;
						}
						break;
					case 5:
						hl = c.stateNode, gl = !1;
						break a;
					case 3:
					case 4:
						hl = c.stateNode.containerInfo, gl = !0;
						break a;
				}
				c = c.return;
			}
			if (hl === null) throw Error(i(160));
			vl(o, s, a), hl = null, gl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Tl(t, e), t = t.sibling;
	}
	var wl = null;
	function Tl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				Cl(t, e), El(e), r & 4 && (Yc(3, e, e.return), Jc(3, e), Yc(5, e, e.return));
				break;
			case 1:
				Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), r & 64 && sl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = wl;
				if (Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
									b: switch (r) {
										case "title":
											o = a.getElementsByTagName("title")[0], (!o || o[_t] || o[ut] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), qd(o, r, n), o[ut] = e, Ct(o), r = o;
											break a;
										case "link":
											var s = Qf("link", "href", a).get(r + (n.href || ""));
											if (s) {
												for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), qd(o, r, n), a.head.appendChild(o);
											break;
										case "meta":
											if (s = Qf("meta", "content", a).get(r + (n.content || ""))) {
												for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), qd(o, r, n), a.head.appendChild(o);
											break;
										default: throw Error(i(468, r));
									}
									o[ut] = e, Ct(o), r = o;
								}
								e.stateNode = r;
							} else $f(a, e.type, e.stateNode);
						} else e.stateNode = qf(a, r, e.memoizedProps);
					} else o === r ? r === null && e.stateNode !== null && tl(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? $f(a, e.type, e.stateNode) : qf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), n !== null && r & 4 && tl(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (Cl(t, e), El(e), r & 512 && (cl || n === null || $c(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Yt(a, "");
					} catch (t) {
						nd(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, tl(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (ll = !0);
				break;
			case 6:
				if (Cl(t, e), El(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						nd(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Zf = null, a = wl, wl = V(t.containerInfo), Cl(t, e), wl = a, El(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Wp(t.containerInfo);
				} catch (t) {
					nd(e, e.return, t);
				}
				ll && (ll = !1, Dl(e));
				break;
			case 4:
				r = wl, wl = V(e.stateNode.containerInfo), Cl(t, e), El(e), wl = r;
				break;
			case 12:
				Cl(t, e), El(e);
				break;
			case 31:
				Cl(t, e), El(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 13:
				Cl(t, e), El(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (uu = Ae()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = sl, d = cl;
				if (sl = u || a, cl = d || l, Cl(t, e), cl = d, sl = u, El(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || sl || cl || kl(e)), n = null, t = e;;) {
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
								nd(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								nd(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? pf(m, !0) : pf(l.stateNode, !1);
							} catch (e) {
								nd(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, Sl(e, n))));
				break;
			case 19:
				Cl(t, e), El(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Sl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: Cl(t, e), El(e);
		}
	}
	function El(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (nl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						al(e, rl(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Yt(o, ""), n.flags &= -33), al(e, rl(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						il(e, rl(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				nd(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Dl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Dl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) pl(e, t.alternate, t), t = t.sibling;
	}
	function kl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Yc(4, t, t.return), kl(t);
					break;
				case 1:
					$c(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Zc(t, t.return, n), kl(t);
					break;
				case 27: Ef(t.stateNode);
				case 26:
				case 5:
					$c(t, t.return), kl(t);
					break;
				case 22:
					t.memoizedState === null && kl(t);
					break;
				case 30:
					kl(t);
					break;
				default: kl(t);
			}
			e = e.sibling;
		}
	}
	function Al(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Al(i, a, n), Jc(4, a);
					break;
				case 1:
					if (Al(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						nd(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) $a(c[i], s);
						} catch (e) {
							nd(r, r.return, e);
						}
					}
					n && o & 64 && Xc(a), Qc(a, a.return);
					break;
				case 27: ol(a);
				case 26:
				case 5:
					Al(i, a, n), n && r === null && o & 4 && el(a), Qc(a, a.return);
					break;
				case 12:
					Al(i, a, n);
					break;
				case 31:
					Al(i, a, n), n && o & 4 && yl(i, a);
					break;
				case 13:
					Al(i, a, n), n && o & 4 && bl(i, a);
					break;
				case 22:
					a.memoizedState === null && Al(i, a, n), Qc(a, a.return);
					break;
				case 30: break;
				default: Al(i, a, n);
			}
			t = t.sibling;
		}
	}
	function jl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ma(n));
	}
	function Ml(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ma(e));
	}
	function Nl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Pl(e, t, n, r), t = t.sibling;
	}
	function Pl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e, t, n, r), i & 2048 && Jc(9, t);
				break;
			case 1:
				Nl(e, t, n, r);
				break;
			case 3:
				Nl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ma(e)));
				break;
			case 12:
				if (i & 2048) {
					Nl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						nd(t, t.return, e);
					}
				} else Nl(e, t, n, r);
				break;
			case 31:
				Nl(e, t, n, r);
				break;
			case 13:
				Nl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Nl(e, t, n, r) : (a._visibility |= 2, Fl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? Nl(e, t, n, r) : Il(e, t), i & 2048 && jl(o, t);
				break;
			case 24:
				Nl(e, t, n, r), i & 2048 && Ml(t.alternate, t);
				break;
			default: Nl(e, t, n, r);
		}
	}
	function Fl(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Fl(a, o, s, c, i), Jc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Fl(a, o, s, c, i)) : u._visibility & 2 ? Fl(a, o, s, c, i) : Il(a, o), i && l & 2048 && jl(o.alternate, o);
					break;
				case 24:
					Fl(a, o, s, c, i), i && l & 2048 && Ml(o.alternate, o);
					break;
				default: Fl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Il(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Il(n, r), i & 2048 && jl(r.alternate, r);
					break;
				case 24:
					Il(n, r), i & 2048 && Ml(r.alternate, r);
					break;
				default: Il(n, r);
			}
			t = t.sibling;
		}
	}
	var Ll = 8192;
	function Rl(e, t, n) {
		if (e.subtreeFlags & Ll) for (e = e.child; e !== null;) zl(e, t, n), e = e.sibling;
	}
	function zl(e, t, n) {
		switch (e.tag) {
			case 26:
				Rl(e, t, n), e.flags & Ll && e.memoizedState !== null && np(n, wl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Rl(e, t, n);
				break;
			case 3:
			case 4:
				var r = wl;
				wl = V(e.stateNode.containerInfo), Rl(e, t, n), wl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ll, Ll = 16777216, Rl(e, t, n), Ll = r) : Rl(e, t, n));
				break;
			default: Rl(e, t, n);
		}
	}
	function Bl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Vl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				dl = r, Wl(r, e);
			}
			Bl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Hl(e), e = e.sibling;
	}
	function Hl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Vl(e), e.flags & 2048 && Yc(9, e, e.return);
				break;
			case 3:
				Vl(e);
				break;
			case 12:
				Vl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ul(e)) : Vl(e);
				break;
			default: Vl(e);
		}
	}
	function Ul(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				dl = r, Wl(r, e);
			}
			Bl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Yc(8, t, t.return), Ul(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ul(t));
					break;
				default: Ul(t);
			}
			e = e.sibling;
		}
	}
	function Wl(e, t) {
		for (; dl !== null;) {
			var n = dl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Yc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ma(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, dl = r;
			else a: for (n = e; dl !== null;) {
				r = dl;
				var i = r.sibling, a = r.return;
				if (ml(r), r === n) {
					dl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, dl = i;
					break a;
				}
				dl = a;
			}
		}
	}
	var Gl = {
		getCacheForType: function(e) {
			var t = oa(fa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return oa(fa).controller.signal;
		}
	}, Kl = typeof WeakMap == "function" ? WeakMap : Map, ql = 0, Jl = null, R = null, Yl = 0, Xl = 0, Zl = null, Ql = !1, $l = !1, eu = !1, tu = 0, nu = 0, ru = 0, iu = 0, au = 0, ou = 0, su = 0, z = null, cu = null, lu = !1, uu = 0, du = 0, fu = Infinity, pu = null, mu = null, hu = 0, gu = null, _u = null, vu = 0, yu = 0, bu = null, xu = null, Su = 0, Cu = null;
	function wu() {
		return ql & 2 && Yl !== 0 ? Yl & -Yl : A.T === null ? st() : Cd();
	}
	function Tu() {
		if (ou === 0) {
			if (!(Yl & 536870912) || zi) {
				var e = Ke;
				Ke <<= 1, !(Ke & 3932160) && (Ke = 262144), ou = e;
			} else ou = 536870912;
		}
		return e = oo.current, e !== null && (e.flags |= 32), ou;
	}
	function Eu(e, t, n) {
		(e === Jl && (Xl === 2 || Xl === 9) || e.cancelPendingCommit !== null) && (Nu(e, 0), Au(e, Yl, ou, !1)), et(e, n), (!(ql & 2) || e !== Jl) && (e === Jl && (!(ql & 2) && (iu |= n), nu === 4 && Au(e, Yl, ou, !1)), hd(e));
	}
	function Du(e, t, n) {
		if (ql & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Xe(e, t), a = r ? Vu(e, t) : zu(e, t, !0), o = r;
		do {
			if (a === 0) {
				$l && !r && Au(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !ku(n)) {
				a = zu(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = z;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Nu(c, s).flags |= 256), s = zu(c, s, !1), s !== 2) {
							if (eu && !l) {
								c.errorRecoveryDisabledLanes |= o, iu |= o, a = 4;
								break a;
							}
							o = cu, cu = a, o !== null && (cu === null ? cu = o : cu.push.apply(cu, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Nu(e, 0), Au(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						Au(r, t, ou, !Ql);
						break a;
					case 2:
						cu = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = uu + 300 - Ae(), 10 < a)) {
					if (Au(r, t, ou, !Ql), Ye(r, 0, !0) !== 0) break a;
					vu = t, r.timeoutHandle = of(Ou.bind(null, r, n, cu, pu, lu, t, ou, iu, su, Ql, o, "Throttled", -0, 0), a);
					break a;
				}
				Ou(r, n, cu, pu, lu, t, ou, iu, su, Ql, o, null, -0, 0);
			}
			break;
		} while (1);
		hd(e);
	}
	function Ou(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: rn
			}, zl(t, a, d);
			var m = (a & 62914560) === a ? uu - Ae() : (a & 4194048) === a ? du - Ae() : 0;
			if (m = ip(d, m), m !== null) {
				vu = a, e.cancelPendingCommit = m(Ju.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), Au(e, a, o, !l);
				return;
			}
		}
		Ju(e, t, a, n, r, i, o, s, c);
	}
	function ku(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Er(a(), i)) return !1;
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
	function Au(e, t, n, r) {
		t &= ~au, t &= ~iu, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - He(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && nt(e, n, t);
	}
	function ju() {
		return ql & 6 ? !0 : (gd(0, !1), !1);
	}
	function Mu() {
		if (R !== null) {
			if (Xl === 0) var e = R.return;
			else e = R, Qi = Zi = null, Po(e), Fa = null, Ia = 0, e = R;
			for (; e !== null;) qc(e.alternate, e), e = e.return;
			R = null;
		}
	}
	function Nu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, sf(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), vu = 0, Mu(), Jl = e, R = n = mi(e.current, null), Yl = t, Xl = 0, Zl = null, Ql = !1, $l = Xe(e, t), eu = !1, su = ou = au = iu = ru = nu = 0, cu = z = null, lu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - He(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return tu = t, ii(), n;
	}
	function Pu(e, t) {
		L = null, A.H = Ws, t === Ta || t === Da ? (t = Na(), Xl = 3) : t === Ea ? (t = Na(), Xl = 4) : Xl = t === cc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Zl = t, R === null && (nu = 1, nc(e, Si(t, e.current)));
	}
	function Fu() {
		var e = oo.current;
		return e === null ? !0 : (Yl & 4194048) === Yl ? so === null : (Yl & 62914560) === Yl || Yl & 536870912 ? e === so : !1;
	}
	function Iu() {
		var e = A.H;
		return A.H = Ws, e === null ? Ws : e;
	}
	function Lu() {
		var e = A.A;
		return A.A = Gl, e;
	}
	function Ru() {
		nu = 4, Ql || (Yl & 4194048) !== Yl && oo.current !== null || ($l = !0), !(ru & 134217727) && !(iu & 134217727) || Jl === null || Au(Jl, Yl, ou, !1);
	}
	function zu(e, t, n) {
		var r = ql;
		ql |= 2;
		var i = Iu(), a = Lu();
		(Jl !== e || Yl !== t) && (pu = null, Nu(e, t)), t = !1;
		var o = nu;
		a: do
			try {
				if (Xl !== 0 && R !== null) {
					var s = R, c = Zl;
					switch (Xl) {
						case 8:
							Mu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							oo.current === null && (t = !0);
							var l = Xl;
							if (Xl = 0, Zl = null, Gu(e, s, c, l), n && $l) {
								o = 0;
								break a;
							}
							break;
						default: l = Xl, Xl = 0, Zl = null, Gu(e, s, c, l);
					}
				}
				Bu(), o = nu;
				break;
			} catch (t) {
				Pu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Qi = Zi = null, ql = r, A.H = i, A.A = a, R === null && (Jl = null, Yl = 0, ii()), o;
	}
	function Bu() {
		for (; R !== null;) Uu(R);
	}
	function Vu(e, t) {
		var n = ql;
		ql |= 2;
		var r = Iu(), a = Lu();
		Jl !== e || Yl !== t ? (pu = null, fu = Ae() + 500, Nu(e, t)) : $l = Xe(e, t);
		a: do
			try {
				if (Xl !== 0 && R !== null) {
					t = R;
					var o = Zl;
					b: switch (Xl) {
						case 1:
							Xl = 0, Zl = null, Gu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ka(o)) {
								Xl = 0, Zl = null, Wu(t);
								break;
							}
							t = function() {
								Xl !== 2 && Xl !== 9 || Jl !== e || (Xl = 7), hd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Xl = 7;
							break a;
						case 4:
							Xl = 5;
							break a;
						case 7:
							ka(o) ? (Xl = 0, Zl = null, Wu(t)) : (Xl = 0, Zl = null, Gu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (R.tag) {
								case 26: s = R.memoizedState;
								case 5:
								case 27:
									var c = R;
									if (s ? tp(s) : c.stateNode.complete) {
										Xl = 0, Zl = null;
										var l = c.sibling;
										if (l !== null) R = l;
										else {
											var u = c.return;
											u === null ? R = null : (R = u, Ku(u));
										}
										break b;
									}
							}
							Xl = 0, Zl = null, Gu(e, t, o, 5);
							break;
						case 6:
							Xl = 0, Zl = null, Gu(e, t, o, 6);
							break;
						case 8:
							Mu(), nu = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Hu();
				break;
			} catch (t) {
				Pu(e, t);
			}
		while (1);
		return Qi = Zi = null, A.H = r, A.A = a, ql = n, R === null ? (Jl = null, Yl = 0, ii(), nu) : 0;
	}
	function Hu() {
		for (; R !== null && !Oe();) Uu(R);
	}
	function Uu(e) {
		var t = Rc(e.alternate, e, tu);
		e.memoizedProps = e.pendingProps, t === null ? Ku(e) : R = t;
	}
	function Wu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Sc(n, t, t.pendingProps, t.type, void 0, Yl);
				break;
			case 11:
				t = Sc(n, t, t.pendingProps, t.type.render, t.ref, Yl);
				break;
			case 5: Po(t);
			default: qc(n, t), t = R = hi(t, tu), t = Rc(n, t, tu);
		}
		e.memoizedProps = e.pendingProps, t === null ? Ku(e) : R = t;
	}
	function Gu(e, t, n, r) {
		Qi = Zi = null, Po(t), Fa = null, Ia = 0;
		var i = t.return;
		try {
			if (sc(e, i, t, n, Yl)) {
				nu = 1, nc(e, Si(n, e.current)), R = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw R = i, t;
			nu = 1, nc(e, Si(n, e.current)), R = null;
			return;
		}
		t.flags & 32768 ? (zi || r === 1 ? e = !0 : $l || Yl & 536870912 ? e = !1 : (Ql = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = oo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), qu(t, e)) : Ku(t);
	}
	function Ku(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				qu(t, Ql);
				return;
			}
			e = t.return;
			var n = Gc(t.alternate, t, tu);
			if (n !== null) {
				R = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				R = t;
				return;
			}
			R = t = e;
		} while (t !== null);
		nu === 0 && (nu = 5);
	}
	function qu(e, t) {
		do {
			var n = Kc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, R = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				R = e;
				return;
			}
			R = e = n;
		} while (e !== null);
		nu = 6, R = null;
	}
	function Ju(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			$u();
		while (hu !== 0);
		if (ql & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ri, tt(e, n, o, s, c, l), e === Jl && (R = Jl = null, Yl = 0), _u = t, gu = e, vu = n, yu = o, bu = a, xu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, cd(Pe, function() {
				return ed(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = A.T, A.T = null, a = j.p, j.p = 2, s = ql, ql |= 4;
				try {
					fl(e, t, n);
				} finally {
					ql = s, j.p = a, A.T = r;
				}
			}
			hu = 1, Yu(), Xu(), Zu();
		}
	}
	function Yu() {
		if (hu === 1) {
			hu = 0;
			var e = gu, t = _u, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = ql;
				ql |= 4;
				try {
					Tl(t, e);
					var a = Qd, o = jr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Ar(s.ownerDocument.documentElement, s)) {
						if (c !== null && Mr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = kr(s, h), v = kr(s, g);
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
					vp = !!Zd, Qd = Zd = null;
				} finally {
					ql = i, j.p = r, A.T = n;
				}
			}
			e.current = t, hu = 2;
		}
	}
	function Xu() {
		if (hu === 2) {
			hu = 0;
			var e = gu, t = _u, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = ql;
				ql |= 4;
				try {
					pl(e, t.alternate, t);
				} finally {
					ql = i, j.p = r, A.T = n;
				}
			}
			hu = 3;
		}
	}
	function Zu() {
		if (hu === 4 || hu === 3) {
			hu = 0, ke();
			var e = gu, t = _u, n = vu, r = xu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? hu = 5 : (hu = 0, _u = gu = null, Qu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (mu = null), ot(n), t = t.stateNode, Be && typeof Be.onCommitFiberRoot == "function") try {
				Be.onCommitFiberRoot(ze, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = A.T, i = j.p, j.p = 2, A.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					A.T = t, j.p = i;
				}
			}
			vu & 3 && $u(), hd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === Cu ? Su++ : (Su = 0, Cu = e) : Su = 0, gd(0, !1);
		}
	}
	function Qu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ma(t)));
	}
	function $u() {
		return Yu(), Xu(), Zu(), ed();
	}
	function ed() {
		if (hu !== 5) return !1;
		var e = gu, t = yu;
		yu = 0;
		var n = ot(vu), r = A.T, a = j.p;
		try {
			j.p = 32 > n ? 32 : n, A.T = null, n = bu, bu = null;
			var o = gu, s = vu;
			if (hu = 0, _u = gu = null, vu = 0, ql & 6) throw Error(i(331));
			var c = ql;
			if (ql |= 4, Hl(o.current), Pl(o, o.current, s, n), ql = c, gd(0, !1), Be && typeof Be.onPostCommitFiberRoot == "function") try {
				Be.onPostCommitFiberRoot(ze, o);
			} catch {}
			return !0;
		} finally {
			j.p = a, A.T = r, Qu(e, t);
		}
	}
	function td(e, t, n) {
		t = Si(n, t), t = ic(e.stateNode, t, 2), e = qa(e, t, 2), e !== null && (et(e, 2), hd(e));
	}
	function nd(e, t, n) {
		if (e.tag === 3) td(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				td(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mu === null || !mu.has(r))) {
					e = Si(n, e), n = ac(2), r = qa(t, n, 2), r !== null && (oc(n, r, t, e), et(r, 2), hd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function rd(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Kl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (eu = !0, i.add(n), e = id.bind(null, e, t, n), t.then(e, e));
	}
	function id(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Jl === e && (Yl & n) === n && (nu === 4 || nu === 3 && (Yl & 62914560) === Yl && 300 > Ae() - uu ? !(ql & 2) && Nu(e, 0) : au |= n, su === Yl && (su = 0)), hd(e);
	}
	function ad(e, t) {
		t === 0 && (t = Qe()), e = si(e, t), e !== null && (et(e, t), hd(e));
	}
	function od(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), ad(e, n);
	}
	function sd(e, t) {
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
		r !== null && r.delete(t), ad(e, n);
	}
	function cd(e, t) {
		return Ee(e, t);
	}
	var ld = null, ud = null, dd = !1, fd = !1, pd = !1, md = 0;
	function hd(e) {
		e !== ud && e.next === null && (ud === null ? ld = ud = e : ud = ud.next = e), fd = !0, dd || (dd = !0, Sd());
	}
	function gd(e, t) {
		if (!pd && fd) {
			pd = !0;
			do
				for (var n = !1, r = ld; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - He(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, xd(r, a));
						} else a = Yl, a = Ye(r, r === Jl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Xe(r, a) || (n = !0, xd(r, a));
					}
					r = r.next;
				}
			while (n);
			pd = !1;
		}
	}
	function _d() {
		vd();
	}
	function vd() {
		fd = dd = !1;
		var e = 0;
		md !== 0 && af() && (e = md);
		for (var t = Ae(), n = null, r = ld; r !== null;) {
			var i = r.next, a = yd(r, t);
			a === 0 ? (r.next = null, n === null ? ld = i : n.next = i, i === null && (ud = n)) : (n = r, (e !== 0 || a & 3) && (fd = !0)), r = i;
		}
		hu !== 0 && hu !== 5 || gd(e, !1), md !== 0 && (md = 0);
	}
	function yd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - He(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Jl, n = Yl, n = Ye(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Xl === 2 || Xl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && De(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Xe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && De(r), ot(n)) {
				case 2:
				case 8:
					n = Ne;
					break;
				case 32:
					n = Pe;
					break;
				case 268435456:
					n = Ie;
					break;
				default: n = Pe;
			}
			return r = bd.bind(null, e), n = Ee(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && De(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function bd(e, t) {
		if (hu !== 0 && hu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if ($u() && e.callbackNode !== n) return null;
		var r = Yl;
		return r = Ye(e, e === Jl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Du(e, r, t), yd(e, Ae()), e.callbackNode != null && e.callbackNode === n ? bd.bind(null, e) : null);
	}
	function xd(e, t) {
		if ($u()) return null;
		Du(e, t, !0);
	}
	function Sd() {
		lf(function() {
			ql & 6 ? Ee(Me, _d) : vd();
		});
	}
	function Cd() {
		if (md === 0) {
			var e = I;
			e === 0 && (e = Ge, Ge <<= 1, !(Ge & 261888) && (Ge = 256)), md = e;
		}
		return md;
	}
	function wd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : nn("" + e);
	}
	function Td(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Ed(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = wd((i[dt] || null).action), o = r.submitter;
			o && (t = (t = o[dt] || null) ? wd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Tn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (md !== 0) {
								var e = o ? Td(i, o) : new FormData(i);
								As(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Td(i, o) : new FormData(i), As(n, {
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
	for (var Dd = 0; Dd < Qr.length; Dd++) {
		var Od = Qr[Dd];
		$r(Od.toLowerCase(), "on" + (Od[0].toUpperCase() + Od.slice(1)));
	}
	$r(Wr, "onAnimationEnd"), $r(Gr, "onAnimationIteration"), $r(Kr, "onAnimationStart"), $r("dblclick", "onDoubleClick"), $r("focusin", "onFocus"), $r("focusout", "onBlur"), $r(qr, "onTransitionRun"), $r(Jr, "onTransitionStart"), $r(Yr, "onTransitionCancel"), $r(Xr, "onTransitionEnd"), Dt("onMouseEnter", ["mouseout", "mouseover"]), Dt("onMouseLeave", ["mouseout", "mouseover"]), Dt("onPointerEnter", ["pointerout", "pointerover"]), Dt("onPointerLeave", ["pointerout", "pointerover"]), Et("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Et("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Et("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Et("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var kd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ad = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(kd));
	function jd(e, t) {
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
						ei(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ei(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function B(e, t) {
		var n = t[pt];
		n === void 0 && (n = t[pt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Fd(t, e, 2, !1), n.add(r));
	}
	function Md(e, t, n) {
		var r = 0;
		t && (r |= 4), Fd(n, e, r, t);
	}
	var Nd = "_reactListening" + Math.random().toString(36).slice(2);
	function Pd(e) {
		if (!e[Nd]) {
			e[Nd] = !0, wt.forEach(function(t) {
				t !== "selectionchange" && (Ad.has(t) || Md(t, !1, e), Md(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Nd] || (t[Nd] = !0, Md("selectionchange", !1, t));
		}
	}
	function Fd(e, t, n, r) {
		switch (Tp(t)) {
			case 2:
				var i = yp;
				break;
			case 8:
				i = bp;
				break;
			default: i = xp;
		}
		n = i.bind(null, t, n, e), i = void 0, !mn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Id(e, t, n, r, i) {
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
					if (s = yt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		dn(function() {
			var r = a, i = on(n), s = [];
			a: {
				var c = Zr.get(e);
				if (c !== void 0) {
					var l = Tn, u = e;
					switch (e) {
						case "keypress": if (bn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Un;
							break;
						case "focusin":
							u = "focus", l = Pn;
							break;
						case "focusout":
							u = "blur", l = Pn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Pn;
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
							l = Mn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Nn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Gn;
							break;
						case Wr:
						case Gr:
						case Kr:
							l = Fn;
							break;
						case Xr:
							l = Kn;
							break;
						case "scroll":
						case "scrollend":
							l = Dn;
							break;
						case "wheel":
							l = qn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = In;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Wn;
							break;
						case "toggle":
						case "beforetoggle": l = Jn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = fn(m, p), g != null && d.push(Ld(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== an && (u = n.relatedTarget || n.fromElement) && (yt(u) || u[ft])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? yt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Mn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Wn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : xt(l), h = u == null ? c : xt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, yt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = zd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Bd(s, c, l, d, !1), u !== null && f !== null && Bd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? xt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = mr;
					else if (cr(c)) {
						if (hr) v = wr;
						else {
							v = Sr;
							var y = xr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && $t(r.elementType) && (v = mr) : v = Cr;
					if (v &&= v(e, r)) {
						lr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Gt(c, "number", c.value);
				}
				switch (y = r ? xt(r) : window, e) {
					case "focusin":
						(cr(y) || y.contentEditable === "true") && (Pr = y, Fr = r, Ir = null);
						break;
					case "focusout":
						Ir = Fr = Pr = null;
						break;
					case "mousedown":
						Lr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Lr = !1, Rr(s, n, i);
						break;
					case "selectionchange": if (Nr) break;
					case "keydown":
					case "keyup": Rr(s, n, i);
				}
				var b;
				if (Xn) b: {
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
				else ir ? nr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && ($n && n.locale !== "ko" && (ir || x !== "onCompositionStart" ? x === "onCompositionEnd" && ir && (b = yn()) : (gn = i, _n = "value" in gn ? gn.value : gn.textContent, ir = !0)), y = Rd(r, x), 0 < y.length && (x = new Ln(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = rr(n), b !== null && (x.data = b)))), (b = Qn ? ar(e, n) : or(e, n)) && (x = Rd(r, "onBeforeInput"), 0 < x.length && (y = new Ln("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), Ed(s, e, r, n, i);
			}
			jd(s, t);
		});
	}
	function Ld(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Rd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = fn(e, n), i != null && r.unshift(Ld(e, i, a)), i = fn(e, t), i != null && r.push(Ld(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function zd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Bd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = fn(n, a), l != null && o.unshift(Ld(n, l, c))) : i || (l = fn(n, a), l != null && o.push(Ld(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Vd = /\r\n?/g, Hd = /\u0000|\uFFFD/g;
	function Ud(e) {
		return (typeof e == "string" ? e : "" + e).replace(Vd, "\n").replace(Hd, "");
	}
	function Wd(e, t) {
		return t = Ud(t), Ud(e) === t;
	}
	function Gd(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Yt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Yt(e, "" + r);
				break;
			case "className":
				Nt(e, "class", r);
				break;
			case "tabIndex":
				Nt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Nt(e, n, r);
				break;
			case "style":
				Qt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Nt(e, "data", r);
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
				r = nn("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && Gd(e, t, "name", a.name, a, null), Gd(e, t, "formEncType", a.formEncType, a, null), Gd(e, t, "formMethod", a.formMethod, a, null), Gd(e, t, "formTarget", a.formTarget, a, null)) : (Gd(e, t, "encType", a.encType, a, null), Gd(e, t, "method", a.method, a, null), Gd(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = nn("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = rn);
				break;
			case "onScroll":
				r != null && B("scroll", e);
				break;
			case "onScrollEnd":
				r != null && B("scrollend", e);
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
				n = nn("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				B("beforetoggle", e), B("toggle", e), Mt(e, "popover", r);
				break;
			case "xlinkActuate":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Mt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = en.get(n) || n, Mt(e, n, r));
		}
	}
	function Kd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Qt(e, r, o);
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
				typeof r == "string" ? Yt(e, r) : (typeof r == "number" || typeof r == "bigint") && Yt(e, "" + r);
				break;
			case "onScroll":
				r != null && B("scroll", e);
				break;
			case "onScrollEnd":
				r != null && B("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = rn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Tt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[dt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Mt(e, n, r);
			}
		}
	}
	function qd(e, t, n) {
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
				B("error", e), B("load", e);
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
						default: Gd(e, t, o, s, n, null);
					}
				}
				a && Gd(e, t, "srcSet", n.srcSet, n, null), r && Gd(e, t, "src", n.src, n, null);
				return;
			case "input":
				B("invalid", e);
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
						default: Gd(e, t, r, d, n, null);
					}
				}
				Wt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in B("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Gd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Kt(e, !!r, n, !0) : Kt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in B("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: Gd(e, t, s, c, n, null);
				}
				Jt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Gd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				B("beforetoggle", e), B("toggle", e), B("cancel", e), B("close", e);
				break;
			case "iframe":
			case "object":
				B("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < kd.length; r++) B(kd[r], e);
				break;
			case "image":
				B("error", e), B("load", e);
				break;
			case "details":
				B("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": B("error", e), B("load", e);
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
					default: Gd(e, t, u, r, n, null);
				}
				return;
			default: if ($t(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Kd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Gd(e, t, c, r, n, null));
	}
	function Jd(e, t, n, r) {
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
						default: r.hasOwnProperty(m) || Gd(e, t, m, null, r, f);
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
						default: m !== f && Gd(e, t, p, m, r, f);
					}
				}
				Ut(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Gd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Gd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Kt(e, !!n, n ? [] : "", !1) : Kt(e, !!n, t, !0)) : Kt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Gd(e, t, c, null, r, a);
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
					default: a !== o && Gd(e, t, s, a, r, o);
				}
				qt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Gd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Gd(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Gd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Gd(e, t, u, p, r, m);
				}
				return;
			default: if ($t(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Kd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Kd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Gd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Gd(e, t, f, p, r, m);
	}
	function Yd(e) {
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
	function Xd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Yd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Yd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Zd = null, Qd = null;
	function $d(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function ef(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function tf(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function nf(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var rf = null;
	function af() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== rf && (rf = e, !0) : (rf = null, !1);
	}
	var of = typeof setTimeout == "function" ? setTimeout : void 0, sf = typeof clearTimeout == "function" ? clearTimeout : void 0, cf = typeof Promise == "function" ? Promise : void 0, lf = typeof queueMicrotask == "function" ? queueMicrotask : cf === void 0 ? of : function(e) {
		return cf.resolve(null).then(e).catch(uf);
	};
	function uf(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function df(e) {
		return e === "head";
	}
	function ff(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Wp(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") Ef(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, Ef(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[_t] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && Ef(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Wp(t);
	}
	function pf(e, t) {
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
	function mf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					mf(n), vt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function hf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[_t]) switch (t) {
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
			if (e = xf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function gf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = xf(e.nextSibling), e === null)) return null;
		return e;
	}
	function _f(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = xf(e.nextSibling), e === null)) return null;
		return e;
	}
	function vf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function yf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function bf(e, t) {
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
	function xf(e) {
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
	var Sf = null;
	function Cf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return xf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function wf(e) {
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
	function Tf(e, t, n) {
		switch (t = $d(n), e) {
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
	function Ef(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		vt(e);
	}
	var Df = /* @__PURE__ */ new Map(), Of = /* @__PURE__ */ new Set();
	function V(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var kf = j.d;
	j.d = {
		f: Af,
		r: jf,
		D: Pf,
		C: Ff,
		L: If,
		m: Lf,
		X: zf,
		S: Rf,
		M: Bf
	};
	function Af() {
		var e = kf.f(), t = ju();
		return e || t;
	}
	function jf(e) {
		var t = bt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ms(t) : kf.r(e);
	}
	var Mf = typeof document > "u" ? null : document;
	function Nf(e, t, n) {
		var r = Mf;
		if (r && typeof t == "string" && t) {
			var i = Ht(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Of.has(i) || (Of.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), qd(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Pf(e) {
		kf.D(e), Nf("dns-prefetch", e, null);
	}
	function Ff(e, t) {
		kf.C(e, t), Nf("preconnect", e, t);
	}
	function If(e, t, n) {
		kf.L(e, t, n);
		var r = Mf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Ht(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ht(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ht(n.imageSizes) + "\"]")) : i += "[href=\"" + Ht(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Hf(e);
					break;
				case "script": a = Kf(e);
			}
			Df.has(a) || (e = p({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Df.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Uf(a)) || t === "script" && r.querySelector(H(a)) || (t = r.createElement("link"), qd(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Lf(e, t) {
		kf.m(e, t);
		var n = Mf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ht(r) + "\"][href=\"" + Ht(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Kf(e);
			}
			if (!Df.has(a) && (e = p({
				rel: "modulepreload",
				href: e
			}, t), Df.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(H(a))) return;
				}
				r = n.createElement("link"), qd(r, "link", e), Ct(r), n.head.appendChild(r);
			}
		}
	}
	function Rf(e, t, n) {
		kf.S(e, t, n);
		var r = Mf;
		if (r && e) {
			var i = St(r).hoistableStyles, a = Hf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Uf(a))) s.loading = 5;
				else {
					e = p({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Df.get(a)) && Yf(e, n);
					var c = o = r.createElement("link");
					Ct(c), qd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Jf(o, t, r);
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
	function zf(e, t) {
		kf.X(e, t);
		var n = Mf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = Kf(e), a = r.get(i);
			a || (a = n.querySelector(H(i)), a || (e = p({
				src: e,
				async: !0
			}, t), (t = Df.get(i)) && Xf(e, t), a = n.createElement("script"), Ct(a), qd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Bf(e, t) {
		kf.M(e, t);
		var n = Mf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = Kf(e), a = r.get(i);
			a || (a = n.querySelector(H(i)), a || (e = p({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Df.get(i)) && Xf(e, t), a = n.createElement("script"), Ct(a), qd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Vf(e, t, n, r) {
		var a = (a = me.current) ? V(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Hf(n.href), n = St(a).hoistableStyles, r = n.get(t), r || (r = {
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
					e = Hf(n.href);
					var o = St(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Uf(e))) && !o._p && (s.instance = o, s.state.loading = 5), Df.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Df.set(e, n), o || Gf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Kf(n), n = St(a).hoistableScripts, r = n.get(t), r || (r = {
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
	function Hf(e) {
		return "href=\"" + Ht(e) + "\"";
	}
	function Uf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Wf(e) {
		return p({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Gf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), qd(t, "link", n), Ct(t), e.head.appendChild(t));
	}
	function Kf(e) {
		return "[src=\"" + Ht(e) + "\"]";
	}
	function H(e) {
		return "script[async]" + e;
	}
	function qf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ht(n.href) + "\"]");
				if (r) return t.instance = r, Ct(r), r;
				var a = p({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ct(r), qd(r, "style", a), Jf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Hf(n.href);
				var o = e.querySelector(Uf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ct(o), o;
				r = Wf(n), (a = Df.get(a)) && Yf(r, a), o = (e.ownerDocument || e).createElement("link"), Ct(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), qd(o, "link", r), t.state.loading |= 4, Jf(o, n.precedence, e), t.instance = o;
			case "script": return o = Kf(n.src), (a = e.querySelector(H(o))) ? (t.instance = a, Ct(a), a) : (r = n, (a = Df.get(o)) && (r = p({}, n), Xf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ct(a), qd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Jf(r, n.precedence, e));
		return t.instance;
	}
	function Jf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Yf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Xf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Zf = null;
	function Qf(e, t, n) {
		if (Zf === null) {
			var r = /* @__PURE__ */ new Map(), i = Zf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Zf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[_t] || a[ut] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function $f(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function ep(e, t, n) {
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
	function tp(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function np(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Hf(r.href), a = t.querySelector(Uf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = ap.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ct(a);
					return;
				}
				a = t.ownerDocument || t, r = Wf(r), (i = Df.get(i)) && Yf(r, i), a = a.createElement("link"), Ct(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), qd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = ap.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var rp = 0;
	function ip(e, t) {
		return e.stylesheets && e.count === 0 && sp(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && sp(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && rp === 0 && (rp = 62500 * Xd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && sp(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > rp ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function ap() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) sp(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var op = null;
	function sp(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, op = /* @__PURE__ */ new Map(), t.forEach(cp, e), op = null, ap.call(e));
	}
	function cp(e, t) {
		if (!(t.state.loading & 4)) {
			var n = op.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), op.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = ap.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var lp = {
		$$typeof: te,
		Provider: null,
		Consumer: null,
		_currentValue: oe,
		_currentValue2: oe,
		_threadCount: 0
	};
	function up(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $e(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $e(0), this.hiddenUpdates = $e(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function dp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new up(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = fi(3, null, null, t), e.current = a, a.stateNode = e, t = pa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Wa(a), e;
	}
	function fp(e) {
		return e ? (e = ui, e) : ui;
	}
	function pp(e, t, n, r, i, a) {
		i = fp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ka(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = qa(e, r, t), n !== null && (Eu(n, e, t), Ja(n, e, t));
	}
	function mp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function hp(e, t) {
		mp(e, t), (e = e.alternate) && mp(e, t);
	}
	function gp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = si(e, 67108864);
			t !== null && Eu(t, e, 67108864), hp(e, 67108864);
		}
	}
	function _p(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = wu();
			t = at(t);
			var n = si(e, t);
			n !== null && Eu(n, e, t), hp(e, t);
		}
	}
	var vp = !0;
	function yp(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 2, xp(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function bp(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 8, xp(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function xp(e, t, n, r) {
		if (vp) {
			var i = Sp(r);
			if (i === null) Id(e, t, r, Cp, n), Pp(e, r);
			else if (Ip(i, e, t, n, r)) r.stopPropagation();
			else if (Pp(e, r), t & 4 && -1 < Np.indexOf(e)) {
				for (; i !== null;) {
					var a = bt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Je(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - He(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									hd(a), !(ql & 6) && (fu = Ae() + 500, gd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = si(a, 2), s !== null && Eu(s, a, 2), ju(), hp(a, 2);
					}
					if (a = Sp(r), a === null && Id(e, t, r, Cp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Id(e, t, r, null, n);
		}
	}
	function Sp(e) {
		return e = on(e), wp(e);
	}
	var Cp = null;
	function wp(e) {
		if (Cp = null, e = yt(e), e !== null) {
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
		return Cp = e, null;
	}
	function Tp(e) {
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
			case "message": switch (je()) {
				case Me: return 2;
				case Ne: return 8;
				case Pe:
				case Fe: return 32;
				case Ie: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Ep = !1, Dp = null, Op = null, kp = null, Ap = /* @__PURE__ */ new Map(), jp = /* @__PURE__ */ new Map(), Mp = [], Np = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Pp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Dp = null;
				break;
			case "dragenter":
			case "dragleave":
				Op = null;
				break;
			case "mouseover":
			case "mouseout":
				kp = null;
				break;
			case "pointerover":
			case "pointerout":
				Ap.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": jp.delete(t.pointerId);
		}
	}
	function Fp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = bt(t), t !== null && gp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ip(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Dp = Fp(Dp, e, t, n, r, i), !0;
			case "dragenter": return Op = Fp(Op, e, t, n, r, i), !0;
			case "mouseover": return kp = Fp(kp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Ap.set(a, Fp(Ap.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, jp.set(a, Fp(jp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Lp(e) {
		var t = yt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							_p(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							_p(n);
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
	function Rp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = Sp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				an = r, n.target.dispatchEvent(r), an = null;
			} else return t = bt(n), t !== null && gp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function zp(e, t, n) {
		Rp(e) && n.delete(t);
	}
	function Bp() {
		Ep = !1, Dp !== null && Rp(Dp) && (Dp = null), Op !== null && Rp(Op) && (Op = null), kp !== null && Rp(kp) && (kp = null), Ap.forEach(zp), jp.forEach(zp);
	}
	function Vp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Ep || (Ep = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Bp)));
	}
	var Hp = null;
	function Up(e) {
		Hp !== e && (Hp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Hp === e && (Hp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (wp(r || n) === null) continue;
					break;
				}
				var a = bt(n);
				a !== null && (e.splice(t, 3), t -= 3, As(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Wp(e) {
		function t(t) {
			return Vp(t, e);
		}
		Dp !== null && Vp(Dp, e), Op !== null && Vp(Op, e), kp !== null && Vp(kp, e), Ap.forEach(t), jp.forEach(t);
		for (var n = 0; n < Mp.length; n++) {
			var r = Mp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Mp.length && (n = Mp[0], n.blockedOn === null);) Lp(n), n.blockedOn === null && Mp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[dt] || null;
			if (typeof a == "function") o || Up(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[dt] || null) s = o.formAction;
					else if (wp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Up(n);
			}
		}
	}
	function Gp() {
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
	function Kp(e) {
		this._internalRoot = e;
	}
	qp.prototype.render = Kp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		pp(n, wu(), e, t, null, null);
	}, qp.prototype.unmount = Kp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			pp(e.current, 2, null, e, null, null), ju(), t[ft] = null;
		}
	};
	function qp(e) {
		this._internalRoot = e;
	}
	qp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = st();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Mp.length && t !== 0 && t < Mp[n].priority; n++);
			Mp.splice(n, 0, e), n === 0 && Lp(e);
		}
	};
	var Jp = n.version;
	if (Jp !== "19.2.8") throw Error(i(527, Jp, "19.2.8"));
	j.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var Yp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: A,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Xp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Xp.isDisabled && Xp.supportsFiber) try {
			ze = Xp.inject(Yp), Be = Xp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = $s, s = ec, c = tc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = dp(e, 1, !1, null, null, n, r, null, o, s, c, Gp), e[ft] = t.current, Pd(e), new Kp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = $s, c = ec, l = tc, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = dp(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Gp), t.context = fp(null), n = t.current, r = wu(), r = at(r), o = Ka(r), o.callback = null, qa(n, o, r), n = r, t.current.lanes = n, et(t, n), hd(t), e[ft] = t.current, Pd(e), new qp(t);
	}, e.version = "19.2.8";
})), y = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Kf(e) ? e.slice() : V({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function r(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return i(e, t, n, 0);
			}
		}
		function i(e, t, n, r) {
			var a = t[r], o = Kf(e) ? e.slice() : V({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[a], Kf(o) ? o.splice(a, 1) : delete o[a]) : o[a] = i(e[a], t, n, r + 1), o;
		}
		function a(e, t, n) {
			var r = t[n], i = Kf(e) ? e.slice() : V({}, e);
			return n + 1 === t.length ? (Kf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = a(e[r], t, n + 1), i);
		}
		function o() {
			return !1;
		}
		function s() {
			return null;
		}
		function c() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function l() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function u() {}
		function f() {}
		function p(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function h(e, t, n, r) {
			return new _r(e, t, n, r);
		}
		function g(e, t) {
			e.context === Ng && ($d(e.current, 2, t, e, null, null), ol());
		}
		function v(e, t) {
			if (Pg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Ml(), gr(e.current, t, n), ol();
			}
		}
		function y(e) {
			Pg = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function x(e) {
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
		function ee(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function S(e) {
			if (x(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function ne(e) {
			var t = e.alternate;
			if (!t) {
				if (t = x(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return S(i), e;
						if (a === r) return S(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function C(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = C(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function re(e) {
			return typeof e != "object" || !e ? null : (e = Wf && e[Wf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function w(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Gf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Mf: return "Fragment";
				case Pf: return "Profiler";
				case Nf: return "StrictMode";
				case Rf: return "Suspense";
				case zf: return "SuspenseList";
				case Hf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case jf: return "Portal";
				case If: return e.displayName || "Context";
				case Ff: return (e._context.displayName || "Context") + ".Consumer";
				case Lf:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Bf: return t = e.displayName || null, t === null ? w(e.type) || "Memo" : t;
				case Vf:
					t = e._payload, e = e._init;
					try {
						return w(e(t));
					} catch {}
			}
			return null;
		}
		function T(e) {
			return typeof e.tag == "number" ? E(e) : typeof e.name == "string" ? e.name : null;
		}
		function E(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return w(t);
				case 8: return t === Nf ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return E(e.return);
			}
			return null;
		}
		function D(e) {
			return { current: e };
		}
		function O(e, t) {
			0 > Zf ? console.error("Unexpected pop.") : (t !== Xf[Zf] && console.error("Unexpected Fiber popped."), e.current = Yf[Zf], Yf[Zf] = null, Xf[Zf] = null, Zf--);
		}
		function k(e, t, n) {
			Zf++, Yf[Zf] = e.current, Xf[Zf] = n, e.current = t;
		}
		function ie(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function ae(e, t) {
			k(ep, t, e), k($f, e, e), k(Qf, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Bu(t) : US;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Bu(t), t = Vu(t, n);
				else switch (n) {
					case "svg":
						t = WS;
						break;
					case "math":
						t = GS;
						break;
					default: t = US;
				}
			}
			n = n.toLowerCase(), n = zt(null, n), n = {
				context: t,
				ancestorInfo: n
			}, O(Qf, e), k(Qf, n, e);
		}
		function A(e) {
			O(Qf, e), O($f, e), O(ep, e);
		}
		function j() {
			return ie(Qf.current);
		}
		function oe(e) {
			e.memoizedState !== null && k(tp, e, e);
			var t = ie(Qf.current), n = e.type, r = Vu(t.context, n);
			n = zt(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (k($f, e, e), k(Qf, r, e));
		}
		function se(e) {
			$f.current === e && (O(Qf, e), O($f, e)), tp.current === e && (O(tp, e), bC._currentValue = yC);
		}
		function ce() {}
		function le() {
			if (np === 0) {
				rp = console.log, ip = console.info, ap = console.warn, op = console.error, sp = console.group, cp = console.groupCollapsed, lp = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: ce,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			np++;
		}
		function ue() {
			if (np--, np === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: V({}, e, { value: rp }),
					info: V({}, e, { value: ip }),
					warn: V({}, e, { value: ap }),
					error: V({}, e, { value: op }),
					group: V({}, e, { value: sp }),
					groupCollapsed: V({}, e, { value: cp }),
					groupEnd: V({}, e, { value: lp })
				});
			}
			0 > np && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function de(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function fe(e) {
			if (up === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				up = t && t[1] || "", dp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + up + e + dp;
		}
		function pe(e, t) {
			if (!e || fp) return "";
			var n = pp.get(e);
			if (n !== void 0) return n;
			fp = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = H.H, H.H = null, le();
			try {
				var i = { DetermineComponentFrameRoot: function() {
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
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && pp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				fp = !1, H.H = r, ue(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? fe(l) : "", typeof e == "function" && pp.set(e, l), l;
		}
		function me(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return fe(e.type);
				case 16: return fe("Lazy");
				case 13: return e.child !== t && t !== null ? fe("Suspense Fallback") : fe("Suspense");
				case 19: return fe("SuspenseList");
				case 0:
				case 15: return pe(e.type, !1);
				case 11: return pe(e.type.render, !1);
				case 1: return pe(e.type, !0);
				case 31: return fe("Activity");
				default: return "";
			}
		}
		function he(e) {
			try {
				var t = "", n = null;
				do {
					t += me(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = de(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = fe(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function ge(e) {
			return (e = e ? e.displayName || e.name : "") ? fe(e) : "";
		}
		function _e() {
			if (mp === null) return null;
			var e = mp._debugOwner;
			return e == null ? null : T(e);
		}
		function ve() {
			if (mp === null) return "";
			var e = mp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += fe(e.type);
						break;
					case 13:
						t += fe("Suspense");
						break;
					case 19:
						t += fe("SuspenseList");
						break;
					case 31:
						t += fe("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += ge(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += ge(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = de(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + de(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function M(e, t, n, r, i, a, o) {
			var s = mp;
			ye(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				ye(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function ye(e) {
			H.getCurrentStack = e === null ? null : ve, hp = !1, mp = e;
		}
		function be(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function xe(e) {
			try {
				return Se(e), !1;
			} catch {
				return !0;
			}
		}
		function Se(e) {
			return "" + e;
		}
		function N(e, t) {
			if (xe(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, be(e)), Se(e);
		}
		function Ce(e, t) {
			if (xe(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, be(e)), Se(e);
		}
		function we(e) {
			if (xe(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", be(e)), Se(e);
		}
		function Te(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				Ap = t.inject(e), jp = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Ee(e) {
			if (typeof Op == "function" && kp(e), jp && typeof jp.setStrictMode == "function") try {
				jp.setStrictMode(Ap, e);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function De(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Fp(e) / Ip | 0) | 0;
		}
		function Oe(e) {
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
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function ke(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Oe(n))) : i = Oe(o) : i = Oe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Oe(n))) : i = Oe(o)) : i = Oe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Ae(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function je(e, t) {
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
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Me() {
			var e = zp;
			return zp <<= 1, !(zp & 62914560) && (zp = 4194304), e;
		}
		function Ne(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Pe(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Fe(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Pp(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && Ie(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function Ie(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Pp(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function Le(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Pp(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Re(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : ze(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function ze(e) {
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
		function Be(e, t, n) {
			if (Np) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Pp(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function Ve(e, t) {
			if (Np) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Pp(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function He(e) {
			return e &= -e, Bp !== 0 && Bp < e ? Vp !== 0 && Vp < e ? e & 134217727 ? Hp : Up : Vp : Bp;
		}
		function Ue() {
			var e = qf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Hp : df(e.type)) : e;
		}
		function We(e, t) {
			var n = qf.p;
			try {
				return qf.p = e, t();
			} finally {
				qf.p = n;
			}
		}
		function P(e) {
			delete e[Gp], delete e[Kp], delete e[Jp], delete e[Yp], delete e[Xp];
		}
		function Ge(e) {
			var t = e[Gp];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[qp] || n[Gp]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = xd(e); e !== null;) {
						if (n = e[Gp]) return n;
						e = xd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function Ke(e) {
			if (e = e[Gp] || e[qp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function qe(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function Je(e) {
			var t = e[Zp];
			return t ||= e[Zp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function Ye(e) {
			e[Qp] = !0;
		}
		function Xe(e, t) {
			Ze(e, t), Ze(e + "Capture", t);
		}
		function Ze(e, t) {
			em[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), em[e] = t;
			var n = e.toLowerCase();
			for (tm[n] = e, e === "onDoubleClick" && (tm.ondblclick = e), e = 0; e < t.length; e++) $p.add(t[e]);
		}
		function Qe(e, t) {
			nm[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function $e(e) {
			return gp.call(am, e) ? !0 : gp.call(im, e) ? !1 : rm.test(e) ? am[e] = !0 : (im[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function et(e, t, n) {
			if ($e(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n || (N(n, t), e === "" + n ? n : e);
			}
		}
		function tt(e, t, n) {
			if ($e(t)) {
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
					N(n, t), e.setAttribute(t, "" + n);
				}
			}
		}
		function nt(e, t, n) {
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
				N(n, t), e.setAttribute(t, "" + n);
			}
		}
		function rt(e, t, n, r) {
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
				N(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function it(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return we(e), e;
				default: return "";
			}
		}
		function at(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function ot(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						we(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						we(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function st(e) {
			if (!e._valueTracker) {
				var t = at(e) ? "checked" : "value";
				e._valueTracker = ot(e, t, "" + e[t]);
			}
		}
		function ct(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = at(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
		}
		function lt(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function ut(e) {
			return e.replace(om, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function dt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || cm || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", _e() || "A component", t.type), cm = !0), t.value === void 0 || t.defaultValue === void 0 || sm || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", _e() || "A component", t.type), sm = !0);
		}
		function ft(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (N(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + it(t)) : e.value !== "" + it(t) && (e.value = "" + it(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : mt(e, o, it(n)) : mt(e, o, it(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (N(s, "name"), e.name = "" + it(s)) : e.removeAttribute("name");
		}
		function pt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (N(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					st(e);
					return;
				}
				n = n == null ? "" : "" + it(n), t = t == null ? n : "" + it(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (N(o, "name"), e.name = o), st(e);
		}
		function mt(e, t, n) {
			t === "number" && lt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function ht(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Df.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || um || (um = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || dm || (dm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || lm || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), lm = !0);
		}
		function gt() {
			var e = _e();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function _t(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + it(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function vt(e, t) {
			for (e = 0; e < pm.length; e++) {
				var n = pm[e];
				if (t[n] != null) {
					var r = Kf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, gt()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, gt());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || fm || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), fm = !0);
		}
		function yt(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || mm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", _e() || "A component"), mm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function bt(e, t, n) {
			if (t != null && (t = "" + it(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + it(n);
		}
		function xt(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (Kf(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = it(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), st(e);
		}
		function St(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? St(e.children[0], t) : e;
		}
		function Ct(e) {
			return "  " + "  ".repeat(e);
		}
		function wt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Tt(e) {
			return "- " + "  ".repeat(e);
		}
		function Et(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function Dt(e, t) {
			return hm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function Ot(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return wt(n) + Dt(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), wt(n) + Dt(e, r) + "\n" + Tt(n) + Dt(t, r) + "\n";
			}
			return Ct(n) + Dt(e, r) + "\n";
		}
		function kt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function At(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Kf(e)) return "[...]";
					if (e.$$typeof === Af) return (t = w(e.type)) ? "<" + t + ">" : "<...>";
					var n = kt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = At(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function jt(e, t) {
			return typeof e != "string" || hm.test(e) ? "{" + At(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Mt(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = jt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function Nt(e, t, n) {
			var r = "", i = V({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = At(e[a], o);
				t.hasOwnProperty(a) ? (o = At(t[a], o), r += wt(n) + a + ": " + s + "\n", r += Tt(n) + a + ": " + o + "\n") : r += wt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = At(i[c], 120 - 2 * n - c.length - 2), r += Tt(n) + c + ": " + e + "\n");
			return r;
		}
		function Pt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Mt(e, t, Ct(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = jt(l, s);
						s = jt(c, s), typeof l == "object" && l && typeof c == "object" && c && kt(l) === "Object" && kt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Ct(r + 1) + o + "={{\n" + Nt(l, c, r + 2) + Ct(r + 1) + "}}\n" : (i += wt(r + 1) + o + "=" + u + "\n", i += Tt(r + 1) + o + "=" + s + "\n");
					} else i += Ct(r + 1) + o + "=" + jt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Tt(r + 1) + e + "=" + jt(n[e], t) + "\n";
					}
				}), i = i === "" ? Ct(r) + "<" + e + ">\n" : Ct(r) + "<" + e + "\n" + i + Ct(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += Ot(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + Ot("" + t, null, r + 1) : i + Ot("" + t, void 0, r + 1)), i;
		}
		function Ft(e, t) {
			var n = Et(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Ft(e, t), e = e.sibling;
				return n;
			}
			return Ct(t) + "<" + n + ">\n";
		}
		function It(e, t) {
			var n = St(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Ct(t) + "...\n" + It(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Ct(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = Ot(i, e.serverProps, t), t++;
			else if (a = Et(e.fiber), a !== null) {
				if (e.serverProps === void 0) {
					r = t;
					var o = 120 - 2 * r - a.length - 2, s = "";
					for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
						var c = jt(i[l], 15);
						if (o -= l.length + c.length + 2, 0 > o) {
							s += " ...";
							break;
						}
						s += " " + l + "=" + c;
					}
					r = Ct(r) + "<" + a + s + ">\n", t++;
				} else e.serverProps === null ? (r = Mt(a, i, wt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Pt(a, i, e.serverProps, t), t++);
			}
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += It(o, t), a++) : l += Ft(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Ct(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Tt(t) + Dt(a, 120 - 2 * t) + "\n") : l + Mt(a.type, a.props, Tt(t));
			return n + r + l;
		}
		function Lt(e) {
			try {
				return "\n\n" + It(e, 0);
			} catch {
				return "";
			}
		}
		function Rt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Lt(i).replaceAll(/^[+-]/gm, ">");
		}
		function zt(e, t) {
			var n = V({}, e || bm), r = { tag: t };
			return _m.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), vm.indexOf(t) !== -1 && (n.pTagInButtonScope = null), gm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function Bt(e, t, n) {
			switch (t) {
				case "select": return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
				case "optgroup": return e === "option" || e === "#text";
				case "option": return e === "#text";
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return ym.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function Vt(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function Ht(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function Ut(e, t) {
			t ||= bm;
			var n = t.current;
			if (t = (n = Bt(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Vt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, xm[t]) return !1;
			xm[t] = !0;
			var i = (t = mp) ? Ht(t.return, r) : null, a = t !== null && i !== null ? Rt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || M(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function Wt(e, t, n) {
			if (n || Bt("#text", t, !1)) return !0;
			if (n = "#text|" + t, xm[n]) return !1;
			xm[n] = !0;
			var r = (n = mp) ? Ht(n, t) : null;
			return n = n !== null && r !== null ? Rt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function Gt(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function Kt(e) {
			return e.replace(Dm, function(e, t) {
				return t.toUpperCase();
			});
		}
		function qt(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? km.hasOwnProperty(t) && km[t] || (km[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, Kt(t.replace(Em, "ms-")))) : Tm.test(t) ? km.hasOwnProperty(t) && km[t] || (km[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Om.test(n) || Am.hasOwnProperty(n) && Am[n] || (Am[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Om, ""))), typeof n == "number" && (isNaN(n) ? jm || (jm = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Mm || (Mm = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Nm.has(t) ? t === "float" ? e.cssFloat = n : (Ce(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function Jt(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = Sm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = Sm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = Sm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "");
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && qt(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && qt(e, r, t[r]);
		}
		function Yt(e) {
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
		function Xt(e) {
			return Im.get(e) || e;
		}
		function Zt(e, t) {
			if (gp.call(zm, t) && zm[t]) return !0;
			if (Vm.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = Rm.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), zm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), zm[t] = !0;
			}
			if (Bm.test(t)) {
				if (e = t.toLowerCase(), e = Rm.hasOwnProperty(e) ? e : null, e == null) return zm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), zm[t] = !0);
			}
			return !0;
		}
		function Qt(e, t) {
			var n = [], r;
			for (r in t) Zt(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function $t(e, t, n, r) {
			if (gp.call(Um, t) && Um[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Um[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Um[t] = !0;
				if (Wm.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Um[t] = !0;
			} else if (Wm.test(t)) return Gm.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Um[t] = !0;
			if (Km.test(t) || qm.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Um[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Um[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Um[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Um[t] = !0;
			if (Lm.hasOwnProperty(i)) {
				if (i = Lm[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Um[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Um[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
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
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" || (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Um[t] = !0);
				}
				case "function":
				case "symbol": return Um[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
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
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Um[t] = !0;
				}
			}
			return !0;
		}
		function en(e, t, n) {
			var r = [], i;
			for (i in t) $t(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function tn(e) {
			return Jm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function nn() {}
		function rn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function an(e) {
			var t = Ke(e);
			if (t && (e = t.stateNode)) {
				var n = e[Kp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (ft(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (N(t, "name"), n = n.querySelectorAll("input[name=\"" + ut("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Kp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									ft(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && ct(r);
						}
						break a;
					case "textarea":
						bt(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && _t(e, !!n.multiple, t, !1);
				}
			}
		}
		function on(e, t, n) {
			if (Qm) return e(t, n);
			Qm = !0;
			try {
				return e(t);
			} finally {
				if (Qm = !1, (Xm !== null || Zm !== null) && (ol(), Xm && (t = Xm, e = Zm, Zm = Xm = null, an(t), e))) for (t = 0; t < e.length; t++) an(e[t]);
			}
		}
		function sn(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Kp] || null;
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
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function cn() {
			if (ih) return ih;
			var e, t = rh, n = t.length, r, i = "value" in nh ? nh.value : nh.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return ih = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function ln(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function un() {
			return !0;
		}
		function dn() {
			return !1;
		}
		function fn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? un : dn, this.isPropagationStopped = dn, this;
			}
			return V(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = un);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = un);
				},
				persist: function() {},
				isPersistent: un
			}), t;
		}
		function pn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = Sh[e]) ? !!t[e] : !1;
		}
		function mn() {
			return pn;
		}
		function hn(e, t) {
			switch (e) {
				case "keyup": return kh.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== Ah;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function gn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function _n(e, t) {
			switch (e) {
				case "compositionend": return gn(t);
				case "keypress": return t.which === Fh ? (Lh = !0, Ih) : null;
				case "textInput": return e = t.data, e === Ih && Lh ? null : e;
				default: return null;
			}
		}
		function vn(e, t) {
			if (Rh) return e === "compositionend" || !jh && hn(e, t) ? (e = cn(), ih = rh = nh = null, Rh = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Ph && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function yn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!zh[e.type] : t === "textarea";
		}
		function bn(e) {
			if (!$m) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function xn(e, t, n, r) {
			Xm ? Zm ? Zm.push(r) : Zm = [r] : Xm = r, t = pu(t, "onChange"), 0 < t.length && (n = new oh("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function Sn(e) {
			su(e, 0);
		}
		function Cn(e) {
			if (ct(qe(e))) return e;
		}
		function wn(e, t) {
			if (e === "change") return t;
		}
		function Tn() {
			Bh && (Bh.detachEvent("onpropertychange", En), Vh = Bh = null);
		}
		function En(e) {
			if (e.propertyName === "value" && Cn(Vh)) {
				var t = [];
				xn(t, Vh, e, rn(e)), on(Sn, t);
			}
		}
		function Dn(e, t, n) {
			e === "focusin" ? (Tn(), Bh = t, Vh = n, Bh.attachEvent("onpropertychange", En)) : e === "focusout" && Tn();
		}
		function On(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return Cn(Vh);
		}
		function kn(e, t) {
			if (e === "click") return Cn(t);
		}
		function An(e, t) {
			if (e === "input" || e === "change") return Cn(t);
		}
		function jn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Mn(e, t) {
			if (Uh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!gp.call(t, i) || !Uh(e[i], t[i])) return !1;
			}
			return !0;
		}
		function Nn(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Pn(e, t) {
			var n = Nn(e);
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
				n = Nn(n);
			}
		}
		function Fn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Fn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function In(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = lt(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = lt(e.document);
			}
			return t;
		}
		function Ln(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Rn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			Jh || Gh == null || Gh !== lt(r) || (r = Gh, "selectionStart" in r && Ln(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), qh && Mn(qh, r) || (qh = r, r = pu(Kh, "onSelect"), 0 < r.length && (t = new oh("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Gh)));
		}
		function zn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function Bn(e) {
			if (Xh[e]) return Xh[e];
			if (!Yh[e]) return e;
			var t = Yh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Zh) return Xh[e] = t[n];
			return e;
		}
		function Vn(e, t) {
			ag.set(e, t), Xe(t, [e]);
		}
		function Hn(e) {
			for (var t = pg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) {
					if (Kf(r) && r.length === 2 && typeof r[0] == "string") {
						if (t !== pg && t !== gg) return mg;
						t = gg;
					} else return mg;
				} else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== pg && t !== hg) return mg;
					t = hg;
				}
			}
			return t;
		}
		function Un(e, t, n, r) {
			for (var i in e) gp.call(e, i) && i[0] !== "_" && Wn(i, e[i], t, n, r);
		}
		function Wn(e, t, n, r, i) {
			switch (typeof t) {
				case "object":
					if (t === null) {
						t = "null";
						break;
					}
					if (t.$$typeof === Af) {
						var a = w(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && Wn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!Kf(t.children) || 0 < t.children.length) && (e = !0) : gp.call(t, l) && l[0] !== "_" && Wn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Hn(t), l === hg || l === pg) {
							t = JSON.stringify(t);
							break;
						}
						if (l === gg) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], Wn(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, Wn(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, Wn(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Un(t, n, r + 1, i);
					return;
				case "function":
					t = t.name === "" ? "() => {}" : t.name + "() {}";
					break;
				case "string":
					t = t === fg ? "…" : JSON.stringify(t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function Gn(e, t, n, r) {
			var i = !0;
			for (o in e) o in t || (n.push([_g + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([_g + i, "…"], [vg + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) {
								if (s.$$typeof === Af) {
									if (o.type === s.type && o.key === s.key) {
										o = w(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([_g + i, o], [vg + i, o]), i = !1;
										continue;
									}
								} else {
									var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
									if (c === l && (l === "[object Object]" || l === "[object Array]")) {
										c = [yg + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, Gn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
										continue;
									}
								}
							} else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([yg + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						Wn(a, o, n, r, _g), Wn(a, s, n, r, vg);
					}
					i = !1;
				}
			} else n.push([vg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function Kn(e) {
			W = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function qn(e, t, n, r) {
			bg && (wg.start = t, wg.end = n, Cg.color = "warning", Cg.tooltipText = r, Cg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, wg)) : performance.measure(r, wg));
		}
		function Jn(e, t, n) {
			qn(e, t, n, "Reconnect");
		}
		function Yn(e, t, n, r, i) {
			var a = E(e);
			if (a !== null && bg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Tg], l = Gn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Sg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Sg = !0, c[0] = Dg, Cg.color = "warning", Cg.tooltipText = Eg) : (Cg.color = r, Cg.tooltipText = a), Cg.properties = c, wg.start = t, wg.end = n, s == null ? performance.measure("​" + a, wg) : s.run(performance.measure.bind(performance, "​" + a, wg)))) : s == null ? console.timeStamp(a, t, n, xg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, xg, void 0, r));
			}
		}
		function Xn(e, t, n, r) {
			if (bg) {
				var i = E(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && Wn("key", e.key, o, 0, ""), e.memoizedProps !== null && Un(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: xg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function Zn(e, t, n, r, i) {
			if (i !== null) {
				if (bg) {
					var a = E(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && Wn("key", e.key, r, 0, ""), e.memoizedProps !== null && Un(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: xg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = E(e), a !== null && bg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, xg, void 0, i)) : console.timeStamp(a, t, n, xg, void 0, i));
		}
		function Qn(e, t, n, r) {
			if (bg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, W, U, i)) : console.timeStamp(n, e, t, W, U, i);
			}
		}
		function $n(e, t, n, r) {
			!bg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, W, U, n)) : console.timeStamp("Prewarm", e, t, W, U, n));
		}
		function er(e, t, n, r) {
			!bg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, W, U, n)) : console.timeStamp("Suspended", e, t, W, U, n));
		}
		function tr(e, t, n, r, i, a) {
			if (bg && !(t <= e)) {
				n = [];
				for (var o = 0; o < r.length; o++) {
					var s = r[o].value;
					n.push(["Recoverable Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "primary-dark",
						track: W,
						trackGroup: U,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function nr(e, t, n, r) {
			!bg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, W, U, "error")) : console.timeStamp("Errored", e, t, W, U, "error"));
		}
		function rr(e, t, n, r) {
			!bg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, W, U, "secondary-light")) : console.timeStamp(n, e, t, W, U, "secondary-light"));
		}
		function ir(e, t, n, r, i) {
			if (bg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: W,
						trackGroup: U,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function ar(e, t, n) {
			!bg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, W, U, "secondary-dark")) : console.timeStamp("Animating", e, t, W, U, "secondary-dark"));
		}
		function or() {
			for (var e = jg, t = Mg = jg = 0; t < e;) {
				var n = Ag[t];
				Ag[t++] = null;
				var r = Ag[t];
				Ag[t++] = null;
				var i = Ag[t];
				Ag[t++] = null;
				var a = Ag[t];
				if (Ag[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && ur(n, i, a);
			}
		}
		function sr(e, t, n, r) {
			Ag[jg++] = e, Ag[jg++] = t, Ag[jg++] = n, Ag[jg++] = r, Mg |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function cr(e, t, n, r) {
			return sr(e, t, n, r), dr(e);
		}
		function lr(e, t) {
			return sr(e, null, null, t), dr(e);
		}
		function ur(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Og || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Pp(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function dr(e) {
			if (Kx > Gx) throw Zx = Kx = 0, Qx = qx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Zx > Xx && (Zx = 0, Qx = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Wl(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Wl(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function fr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e : t.current;
		}
		function pr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = fr(e.render), e.render !== t) ? (t = {
				$$typeof: Lf,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function mr(e, t) {
			if (Pg === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === Vf) && (r = !0);
					break;
				case 11:
					(i === Lf || i === Vf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === Bf || i === Vf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Pg(n), e !== void 0 && e === Pg(t)));
		}
		function hr(e) {
			Pg !== null && typeof WeakSet == "function" && (Fg === null && (Fg = /* @__PURE__ */ new WeakSet()), Fg.add(e));
		}
		function gr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag;
				r = r.type;
				var c = null;
				switch (s) {
					case 0:
					case 15:
					case 1:
						c = r;
						break;
					case 11: c = r.render;
				}
				if (Pg === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Pg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Fg !== null && (Fg.has(e) || i !== null && Fg.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = lr(e, 2), i !== null && tl(i, e, 2)), a === null || r || gr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function _r(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Bg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function vr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function yr(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = h(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = fr(e.type);
					break;
				case 1:
					n.type = fr(e.type);
					break;
				case 11: n.type = pr(e.type);
			}
			return n;
		}
		function br(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function xr(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") vr(e) && (o = 1), s = fr(s);
			else if (typeof e == "string") o = j(), o = Ud(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Hf: return t = h(31, n, t, i), t.elementType = Hf, t.lanes = a, t;
				case Mf: return Cr(n.children, i, a, t);
				case Nf:
					o = 8, i |= Lg, i |= Rg;
					break;
				case Pf: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = h(12, e, t, r | K), t.elementType = Pf, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case Rf: return t = h(13, n, t, i), t.elementType = Rf, t.lanes = a, t;
				case zf: return t = h(19, n, t, i), t.elementType = zf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case If:
							o = 10;
							break a;
						case Ff:
							o = 9;
							break a;
						case Lf:
							o = 11, s = pr(s);
							break a;
						case Bf:
							o = 14;
							break a;
						case Vf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Kf(e) ? n = "array" : e !== void 0 && e.$$typeof === Af ? (n = "<" + (w(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? T(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = h(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function Sr(e, t, n) {
			return t = xr(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Cr(e, t, n, r) {
			return e = h(7, e, r, t), e.lanes = n, e;
		}
		function wr(e, t, n) {
			return e = h(6, e, null, t), e.lanes = n, e;
		}
		function Tr(e) {
			var t = h(18, null, null, G);
			return t.stateNode = e, t;
		}
		function Er(e, t, n) {
			return t = h(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Dr(e, t) {
			if (typeof e == "object" && e) {
				var n = Vg.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: he(t)
				}, Vg.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: he(t)
			};
		}
		function Or(e, t) {
			Pr(), Hg[Ug++] = Gg, Hg[Ug++] = Wg, Wg = e, Gg = t;
		}
		function kr(e, t, n) {
			Pr(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Jg = e;
			var r = Yg;
			e = Xg;
			var i = 32 - Pp(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Pp(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Yg = 1 << 32 - Pp(t) + i | n << i | r, Xg = a + e;
			} else Yg = 1 << a | n << i | r, Xg = e;
		}
		function Ar(e) {
			Pr(), e.return !== null && (Or(e, 1), kr(e, 1, 0));
		}
		function jr(e) {
			for (; e === Wg;) Wg = Hg[--Ug], Hg[Ug] = null, Gg = Hg[--Ug], Hg[Ug] = null;
			for (; e === Jg;) Jg = Kg[--qg], Kg[qg] = null, Xg = Kg[--qg], Kg[qg] = null, Yg = Kg[--qg], Kg[qg] = null;
		}
		function Mr() {
			return Pr(), Jg === null ? null : {
				id: Yg,
				overflow: Xg
			};
		}
		function Nr(e, t) {
			Pr(), Kg[qg++] = Yg, Kg[qg++] = Xg, Kg[qg++] = Jg, Yg = t.id, Xg = t.overflow, Jg = e;
		}
		function Pr() {
			$g || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Fr(e, t) {
			if (e.return === null) {
				if (t_ === null) t_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (t_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					t_.distanceFromLeaf > t && (t_.distanceFromLeaf = t);
				}
				return t_;
			}
			var n = Fr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function Ir() {
			$g && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Lr(e, t) {
			e_ || (e = Fr(e, 0), e.serverProps = null, t !== null && (t = vd(t), e.serverTail.push(t)));
		}
		function Rr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 && arguments[1], n = "", r = t_;
			throw r !== null && (t_ = null, n = Lt(r)), Wr(Dr(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), i_;
		}
		function zr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Gp] = e, t[Kp] = r, gu(n, r), n) {
				case "dialog":
					z("cancel", t), z("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					z("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < fS.length; n++) z(fS[n], t);
					break;
				case "source":
					z("error", t);
					break;
				case "img":
				case "image":
				case "link":
					z("error", t), z("load", t);
					break;
				case "details":
					z("toggle", t);
					break;
				case "input":
					Qe("input", r), z("invalid", t), dt(t, r), pt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					ht(t, r);
					break;
				case "select":
					Qe("select", r), z("invalid", t), vt(t, r);
					break;
				case "textarea": Qe("textarea", r), z("invalid", t), yt(t, r), xt(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Su(t.textContent, n) ? (r.popover != null && (z("beforetoggle", t), z("toggle", t)), r.onScroll != null && z("scroll", t), r.onScrollEnd != null && z("scrollend", t), r.onClick != null && (t.onclick = nn), t = !0) : t = !1, t || Rr(e, !0);
		}
		function Br(e) {
			for (Zg = e.return; Zg;) switch (Zg.tag) {
				case 5:
				case 31:
				case 13:
					r_ = !1;
					return;
				case 27:
				case 3:
					r_ = !0;
					return;
				default: Zg = Zg.return;
			}
		}
		function Vr(e) {
			if (e !== Zg) return !1;
			if (!$g) return Br(e), $g = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Hu(e.type, e.memoizedProps)), n = !n), n && Qg) {
				for (n = Qg; n;) {
					var r = Fr(e, 0), i = vd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? bd(n) : _d(n.nextSibling);
				}
				Rr(e);
			}
			if (Br(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = bd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				Qg = bd(e);
			} else t === 27 ? (t = Qg, $u(e.type) ? (e = nC, nC = null, Qg = e) : Qg = t) : Qg = Zg ? _d(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Hr() {
			Qg = Zg = null, e_ = $g = !1;
		}
		function Ur() {
			var e = n_;
			return e !== null && (mx === null ? mx = e : mx.push.apply(mx, e), n_ = null), e;
		}
		function Wr(e) {
			n_ === null ? n_ = [e] : n_.push(e);
		}
		function Gr() {
			var e = t_;
			if (e !== null) {
				t_ = null;
				for (var t = Lt(e); 0 < e.children.length;) e = e.children[0];
				M(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function Kr() {
			l_ = c_ = null, u_ = !1;
		}
		function qr(e, t, n) {
			k(a_, t._currentValue, e), t._currentValue = n, k(o_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== s_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = s_;
		}
		function Jr(e, t) {
			e._currentValue = a_.current;
			var n = o_.current;
			O(o_, t), e._currentRenderer = n, O(a_, t);
		}
		function Yr(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function Xr(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Yr(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Yr(o, n, e), o = null;
				} else o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function Zr(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						Uh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === tp.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [bC] : e.push(bC));
				}
				i = i.return;
			}
			e !== null && Xr(t, e, n, r), t.flags |= 262144;
		}
		function Qr(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Uh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function $r(e) {
			c_ = e, l_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function ei(e) {
			return u_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), ni(c_, e);
		}
		function ti(e, t) {
			return c_ === null && $r(e), ni(e, t);
		}
		function ni(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, l_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				l_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else l_ = l_.next = t;
			return n;
		}
		function ri() {
			return {
				controller: new d_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function ii(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function ai(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && f_(p_, function() {
				e.controller.abort();
			});
		}
		function oi(e, t, n) {
			e & 127 ? 0 > k_ && (k_ = h_(), A_ = g_(t), M_ = t, n != null && (N_ = E(n)), (Ub & (Pb | Fb)) !== Nb && (D_ = !0, j_ = __), e = Gu(), t = Wu(), e !== I_ || t !== F_ ? I_ = -1.1 : t !== null && (j_ = __), P_ = e, F_ = t) : e & 4194048 && 0 > B_ && (B_ = h_(), H_ = g_(t), U_ = t, n != null && (W_ = E(n)), 0 > z_) && (e = Gu(), t = Wu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function si(e) {
			if (0 > k_) {
				k_ = h_(), A_ = e._debugTask == null ? null : e._debugTask, (Ub & (Pb | Fb)) !== Nb && (j_ = __);
				var t = Gu(), n = Wu();
				t !== I_ || n !== F_ ? I_ = -1.1 : n !== null && (j_ = __), P_ = t, F_ = n;
			}
			0 > B_ && (B_ = h_(), H_ = e._debugTask == null ? null : e._debugTask, 0 > z_) && (e = Gu(), t = Wu(), (e !== q_ || t !== K_) && (q_ = -1.1), G_ = e, K_ = t);
		}
		function ci() {
			var e = w_;
			return w_ = 0, e;
		}
		function li(e) {
			var t = w_;
			return w_ = e, t;
		}
		function ui(e) {
			var t = w_;
			return w_ += e, t;
		}
		function di() {
			J = q = -1.1;
		}
		function fi() {
			var e = q;
			return q = -1.1, e;
		}
		function pi(e) {
			0 <= e && (q = e);
		}
		function mi() {
			var e = T_;
			return T_ = -0, e;
		}
		function hi(e) {
			0 <= e && (T_ = e);
		}
		function gi() {
			var e = E_;
			return E_ = null, e;
		}
		function _i() {
			var e = D_;
			return D_ = !1, e;
		}
		function vi(e) {
			C_ = h_(), 0 > e.actualStartTime && (e.actualStartTime = C_);
		}
		function yi(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, e.selfBaseDuration = t, C_ = -1;
			}
		}
		function bi(e) {
			if (0 <= C_) {
				var t = h_() - C_;
				e.actualDuration += t, C_ = -1;
			}
		}
		function xi() {
			if (0 <= C_) {
				var e = h_(), t = e - C_;
				C_ = -1, w_ += t, T_ += t, J = e;
			}
		}
		function Si(e) {
			E_ === null && (E_ = []), E_.push(e), S_ === null && (S_ = []), S_.push(e);
		}
		function Ci() {
			C_ = h_(), 0 > q && (q = C_);
		}
		function wi(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Ti(e, t) {
			if (rv === null) {
				var n = rv = [];
				iv = 0, av = nu(), ov = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return iv++, t.then(Ei, Ei), t;
		}
		function Ei() {
			if (--iv === 0 && (-1 < B_ || (z_ = -1.1), rv !== null)) {
				ov !== null && (ov.status = "fulfilled");
				var e = rv;
				rv = null, av = 0, ov = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Di(e, t) {
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
		function Oi() {
			var e = cv.current;
			return e === null ? Wb.pooledCache : e;
		}
		function ki(e, t) {
			t === null ? k(cv, cv.current, e) : k(cv, t.pool, e);
		}
		function Ai() {
			var e = Oi();
			return e === null ? null : {
				parent: m_._currentValue,
				pool: e
			};
		}
		function ji() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Mi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Ni(e, t, n) {
			H.actQueue !== null && (H.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(nn, nn), t = n), t._debugInfo === void 0) {
				e = performance.now(), r = t.displayName;
				var i = {
					name: typeof r == "string" ? r : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: i }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					i.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw e = t.reason, Ii(e), e;
				default:
					if (typeof t.status == "string") t.then(nn, nn);
					else {
						if (e = Wb, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
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
						case "rejected": throw e = t.reason, Ii(e), e;
					}
					throw Vv = t, Hv = !0, Lv;
			}
		}
		function Pi(e) {
			try {
				return Iv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Vv = e, Hv = !0, Lv) : e;
			}
		}
		function Fi() {
			if (Vv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Vv;
			return Vv = null, Hv = !1, e;
		}
		function Ii(e) {
			if (e === Lv || e === zv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function Li(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function Ri() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function zi(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = Sr(e, n.mode, 0), t._debugInfo = Y, t.return = n), M(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Bi(e) {
			var t = Wv;
			return Wv += 1, Uv === null && (Uv = ji()), Ni(Uv, e, t);
		}
		function Vi(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function Hi(e, t) {
			throw t.$$typeof === kf ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Ui(e, t) {
			var n = Ri();
			n === null ? Hi(e, t) : n.run(Hi.bind(null, e, t));
		}
		function Wi(e, t) {
			var n = E(e) || "Component";
			Jv[n] || (Jv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function Gi(e, t) {
			var n = Ri();
			n === null ? Wi(e, t) : n.run(Wi.bind(null, e, t));
		}
		function Ki(e, t) {
			var n = E(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function qi(e, t) {
			var n = Ri();
			n === null ? Ki(e, t) : n.run(Ki.bind(null, e, t));
		}
		function Ji(e) {
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
			function i(e, t) {
				return e = yr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = wr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Mf ? (t = u(e, t, n.props.children, r, n.key), zi(n, t, e), t) : t !== null && (t.elementType === a || mr(t, n) || typeof a == "object" && a && a.$$typeof === Vf && Pi(a) === t.type) ? (t = i(t, n.props), Vi(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = Sr(n, e.mode, r), Vi(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Er(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Cr(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = wr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Af: return n = Sr(t, e.mode, n), Vi(n, t), n.return = e, e = Li(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case jf: return t = Er(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case Vf:
							var r = Li(t._debugInfo);
							return t = Pi(t), e = d(e, t, n), Y = r, e;
					}
					if (Kf(t) || re(t)) return n = Cr(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = Li(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = Li(t._debugInfo), e = d(e, Bi(t), n), Y = r, e;
					if (t.$$typeof === If) return d(e, ti(e, t), n);
					Ui(e, t);
				}
				return typeof t == "function" && Gi(e, t), typeof t == "symbol" && qi(e, t), null;
			}
			function p(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Af: return n.key === i ? (i = Li(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case jf: return n.key === i ? l(e, t, n, r) : null;
						case Vf: return i = Li(n._debugInfo), n = Pi(n), e = p(e, t, n, r), Y = i, e;
					}
					if (Kf(n) || re(n)) return i === null ? (i = Li(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = Li(n._debugInfo), e = p(e, t, Bi(n), r), Y = i, e;
					if (n.$$typeof === If) return p(e, t, ti(e, n), r);
					Ui(e, n);
				}
				return typeof n == "function" && Gi(e, n), typeof n == "symbol" && qi(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Af: return n = e.get(r.key === null ? n : r.key) || null, e = Li(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case jf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case Vf:
							var a = Li(r._debugInfo);
							return r = Pi(r), t = m(e, t, n, r, i), Y = a, t;
					}
					if (Kf(r) || re(r)) return n = e.get(n) || null, e = Li(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = Li(r._debugInfo), t = m(e, t, n, Bi(r), i), Y = a, t;
					if (r.$$typeof === If) return m(e, t, n, ti(t, r), i);
					Ui(t, r);
				}
				return typeof r == "function" && Gi(t, r), typeof r == "symbol" && qi(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Af:
					case jf:
						f(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						M(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case Vf: n = Pi(n), g(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, f = null, h = o, _ = o = 0, v = null; h !== null && _ < s.length; _++) {
					h.index > _ ? (v = h, h = null) : v = h.sibling;
					var y = p(i, h, s[_], c);
					if (y === null) {
						h === null && (h = v);
						break;
					}
					l = g(i, y, s[_], l), e && h && y.alternate === null && t(i, h), o = a(y, o, _), f === null ? u = y : f.sibling = y, f = y, h = v;
				}
				if (_ === s.length) return n(i, h), $g && Or(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), f === null ? u = h : f.sibling = h, f = h);
					return $g && Or(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && v.alternate !== null && h.delete(v.key === null ? _ : v.key), o = a(v, o, _), f === null ? u = v : f.sibling = v, f = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), $g && Or(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, f = o, h = o = 0, _ = null, v = null, y = s.next(); f !== null && !y.done; h++, y = s.next()) {
					f.index > h ? (_ = f, f = null) : _ = f.sibling;
					var b = p(i, f, y.value, c);
					if (b === null) {
						f === null && (f = _);
						break;
					}
					v = g(i, b, y.value, v), e && f && b.alternate === null && t(i, f), o = a(b, o, h), u === null ? l = b : u.sibling = b, u = b, f = _;
				}
				if (y.done) return n(i, f), $g && Or(i, h), l;
				if (f === null) {
					for (; !y.done; h++, y = s.next()) f = d(i, y.value, c), f !== null && (v = g(i, f, y.value, v), o = a(f, o, h), u === null ? l = f : u.sibling = f, u = f);
					return $g && Or(i, h), l;
				}
				for (f = r(f); !y.done; h++, y = s.next()) _ = m(f, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && _.alternate !== null && f.delete(_.key === null ? h : _.key), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && f.forEach(function(e) {
					return t(i, e);
				}), $g && Or(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Mf && a.key === null && (zi(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Af:
							var c = Li(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Mf) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, zi(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || mr(r, a) || typeof l == "object" && l && l.$$typeof === Vf && Pi(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Vi(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								a.type === Mf ? (s = Cr(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, zi(a, s, e), e = s) : (s = Sr(a, e.mode, s), Vi(s, a), s.return = e, s._debugInfo = Y, e = s);
							}
							return e = o(e), Y = c, e;
						case jf:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) {
										if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
											n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
											break a;
										}
										n(e, r);
										break;
									}
									t(e, r), r = r.sibling;
								}
								s = Er(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case Vf: return c = Li(a._debugInfo), a = Pi(a), e = y(e, r, a, s), Y = c, e;
					}
					if (Kf(a)) return c = Li(a._debugInfo), e = _(e, r, a, s), Y = c, e;
					if (re(a)) {
						if (c = Li(a._debugInfo), l = re(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (Kv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), Kv = !0) : a.entries !== l || Gv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Gv = !0), e = v(e, r, u, s), Y = c, e;
					}
					if (typeof a.then == "function") return c = Li(a._debugInfo), e = y(e, r, Bi(a), s), Y = c, e;
					if (a.$$typeof === If) return y(e, r, ti(e, a), s);
					Ui(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = wr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && Gi(e, a), typeof a == "symbol" && qi(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Y;
				Y = null;
				try {
					Wv = 0;
					var a = y(e, t, n, r);
					return Uv = null, a;
				} catch (t) {
					if (t === Lv || t === zv) throw t;
					var o = h(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Y;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Y = i;
				}
			};
		}
		function Yi(e, t) {
			var n = Kf(e);
			return e = !n && typeof re(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function Xi(e) {
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
		function Zi(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function Qi(e) {
			return {
				lane: e,
				tag: Qv,
				payload: null,
				callback: null,
				next: null
			};
		}
		function $i(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, iy === r && !ry) {
				var i = E(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), ry = !0;
			}
			return (Ub & Pb) === Nb ? (sr(e, r, t, n), dr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = dr(e), ur(e, null, n), t);
		}
		function ea(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Le(e, n);
			}
		}
		function ta(e, t) {
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
		function na() {
			if (ay) {
				var e = ov;
				if (e !== null) throw e;
			}
		}
		function ra(e, t, n, r) {
			ay = !1;
			var i = e.updateQueue;
			ny = !1, iy = i.shared;
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
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === av && (ay = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case $v:
									if (m = m.payload, typeof m == "function") {
										u_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Lg) {
											Ee(!0);
											try {
												m.call(g, d, h);
											} finally {
												Ee(!1);
											}
										}
										u_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ty: f.flags = f.flags & -65537 | 128;
								case Qv:
									if (_ = m.payload, typeof _ == "function") {
										if (u_ = !0, m = _.call(g, d, h), f.mode & Lg) {
											Ee(!0);
											try {
												_.call(g, d, h);
											} finally {
												Ee(!1);
											}
										}
										u_ = !1;
									} else m = _;
									if (m == null) break a;
									d = V({}, d, m);
									break a;
								case ey: ny = !0;
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
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), cx |= o, e.lanes = o, e.memoizedState = d;
			}
			iy = null;
		}
		function ia(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function aa(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) ia(n[e], t);
		}
		function oa(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) ia(n[e], t);
		}
		function sa(e, t) {
			var n = ox;
			k(sy, n, e), k(oy, t, e), ox = n | t.baseLanes;
		}
		function ca(e) {
			k(sy, ox, e), k(oy, oy.current, e);
		}
		function la(e) {
			ox = sy.current, O(oy, e), O(sy, e);
		}
		function ua(e) {
			var t = e.alternate;
			k(fy, fy.current & uy, e), k(cy, e, e), ly === null && (t === null || oy.current !== null || t.memoizedState !== null) && (ly = e);
		}
		function da(e) {
			k(fy, fy.current, e), k(cy, e, e), ly === null && (ly = e);
		}
		function fa(e) {
			e.tag === 22 ? (k(fy, fy.current, e), k(cy, e, e), ly === null && (ly = e)) : pa(e);
		}
		function pa(e) {
			k(fy, fy.current, e), k(cy, cy.current, e);
		}
		function ma(e) {
			O(cy, e), ly === e && (ly = null), O(fy, e);
		}
		function ha(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || md(n) || hd(n))) return t;
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
		function F() {
			var e = Z;
			Py === null ? Py = [e] : Py.push(e);
		}
		function I() {
			var e = Z;
			if (Py !== null && (Fy++, Py[Fy] !== e)) {
				var t = E(X);
				if (!yy.has(t) && (yy.add(t), Py !== null)) {
					for (var n = "", r = 0; r <= Fy; r++) {
						var i = Py[r], a = r === Fy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function ga(e) {
			e == null || Kf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function _a() {
			var e = E(X);
			Sy.has(e) || (Sy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function va() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function ya(e, t) {
			if (Iy) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Uh(e[n], t[n])) return !1;
			return !0;
		}
		function ba(e, t, n, r, i, a) {
			Cy = a, X = t, Py = e === null ? null : e._debugHookTypes, Fy = -1, Iy = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = E(X), xy.has(a) || (xy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, H.H = e !== null && e.memoizedState !== null ? By : Py === null ? Ry : zy, Oy = a = (t.mode & Lg) !== G;
			var o = bv(n, r, i);
			if (Oy = !1, Dy && (o = Sa(t, n, r, i)), a) {
				Ee(!0);
				try {
					o = Sa(t, n, r, i);
				} finally {
					Ee(!1);
				}
			}
			return xa(e, t), o;
		}
		function xa(e, t) {
			t._debugHookTypes = Py, t.dependencies === null ? jy !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: jy
			}) : t.dependencies._debugThenableState = jy, H.H = Ly;
			var n = wy !== null && wy.next !== null;
			if (Cy = 0, Py = Z = Ty = wy = X = null, Fy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Ey = !1, Ay = 0, jy = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || ob || (e = e.dependencies, e !== null && Qr(e) && (ob = !0)), Hv ? (Hv = !1, e = !0) : e = !1, e && (t = E(t) || "Unknown", by.has(t) || xy.has(t) || (by.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Sa(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Dy && (jy = null), Ay = 0, Dy = !1, i >= Ny) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Iy = !1, Ty = wy = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Fy = -1, H.H = Vy, a = bv(t, n, r);
			} while (Dy);
			return a;
		}
		function Ca() {
			var e = H.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Aa(t) : t, e = e.useState()[0], (wy === null ? null : wy.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function wa() {
			var e = ky !== 0;
			return ky = 0, e;
		}
		function Ta(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Rg) === G ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function Ea(e) {
			if (Ey) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Ey = !1;
			}
			Cy = 0, Py = Ty = wy = X = null, Fy = -1, Z = null, Dy = !1, Ay = ky = 0, jy = null;
		}
		function Da() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e, Ty;
		}
		function Oa() {
			if (wy === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = wy.next;
			var t = Ty === null ? X.memoizedState : Ty.next;
			if (t !== null) Ty = t, wy = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				wy = e, e = {
					memoizedState: wy.memoizedState,
					baseState: wy.baseState,
					baseQueue: wy.baseQueue,
					queue: wy.queue,
					next: null
				}, Ty === null ? X.memoizedState = Ty = e : Ty = Ty.next = e;
			}
			return Ty;
		}
		function ka() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Aa(e) {
			var t = Ay;
			return Ay += 1, jy === null && (jy = ji()), e = Ni(jy, e, t), t = X, (Ty === null ? t.memoizedState : Ty.next) === null && (t = t.alternate, H.H = t !== null && t.memoizedState !== null ? By : Ry), e;
		}
		function ja(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Aa(e);
				if (e.$$typeof === If) return ei(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Ma(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
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
			}, n === null && (n = ka(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Iy) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Uf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Na(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Pa(e, t, n) {
			var r = Da();
			if (n !== void 0) {
				var i = n(t);
				if (Oy) {
					Ee(!0);
					try {
						n(t);
					} finally {
						Ee(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ho.bind(null, X, e), [r.memoizedState, e];
		}
		function Fa(e) {
			return Ia(Oa(), wy, e);
		}
		function Ia(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (Cy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === av && (u = !0);
						else if ((Cy & f) === f) {
							l = l.next, f === av && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, cx |= f;
						d = l.action, Oy && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, cx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Uh(a, e.memoizedState) && (ob = !0, u && (n = ov, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function La(e) {
			var t = Oa(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Uh(a, t.memoizedState) || (ob = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function Ra(e, t, n) {
			var r = X, i = Da();
			if ($g) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				vy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), vy = !0);
			} else {
				if (a = t(), vy || (n = t(), Uh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0)), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Ba(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, mo(Ha.bind(null, r, n, e), [e]), r.flags |= 2048, lo(my | _y, { destroy: void 0 }, Va.bind(null, r, n, a, t), null), a;
		}
		function za(e, t, n) {
			var r = X, i = Oa(), a = $g;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !vy) {
				var o = t();
				Uh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), vy = !0);
			}
			if ((o = !Uh((wy || i).memoizedState, n)) && (i.memoizedState = n, ob = !0), i = i.queue, po(2048, _y, Ha.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ty !== null && Ty.memoizedState.tag & my) {
				if (r.flags |= 2048, lo(my | _y, { destroy: void 0 }, Va.bind(null, r, i, n, t), null), Wb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || Cy & 127 || Ba(r, t, n);
			}
			return n;
		}
		function Ba(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = ka(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Va(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Ua(t) && Wa(e);
		}
		function Ha(e, t, n) {
			return n(function() {
				Ua(t) && (oi(2, "updateSyncExternalStore()", e), Wa(e));
			});
		}
		function Ua(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Uh(e, n);
			} catch {
				return !0;
			}
		}
		function Wa(e) {
			var t = lr(e, 2);
			t !== null && tl(t, e, 2);
		}
		function Ga(e) {
			var t = Da();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), Oy) {
					Ee(!0);
					try {
						n();
					} finally {
						Ee(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Na,
				lastRenderedState: e
			}, t;
		}
		function Ka(e) {
			e = Ga(e);
			var t = e.queue, n = Uo.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function qa(e) {
			var t = Da();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Go.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function Ja(e, t) {
			return Ya(Oa(), wy, e, t);
		}
		function Ya(e, t, n, r) {
			return e.baseState = n, Ia(e, wy, typeof r == "function" ? r : Na);
		}
		function Xa(e, t) {
			var n = Oa();
			return wy === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ya(n, wy, e, t);
		}
		function Za(e, t, n, r, i) {
			if (Ko(e)) throw Error("Cannot update form state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				H.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, Qa(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function Qa(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = H.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), H.T = o;
				try {
					var s = n(i, r), c = H.S;
					c !== null && c(o, s), $a(e, t, s);
				} catch (n) {
					to(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), H.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), $a(e, t, o);
			} catch (n) {
				to(e, t, n);
			}
		}
		function $a(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (H.asyncTransitions++, n.then(Ao, Ao), n.then(function(n) {
				eo(e, t, n);
			}, function(n) {
				return to(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : eo(e, t, n);
		}
		function eo(e, t, n) {
			t.status = "fulfilled", t.value = n, no(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Qa(e, n)));
		}
		function to(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, no(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function no(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function ro(e, t) {
			return t;
		}
		function io(e, t) {
			if ($g) {
				var n = Wb.formState;
				if (n !== null) {
					a: {
						var r = X;
						if ($g) {
							if (Qg) {
								b: {
									for (var i = Qg, a = r_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = _d(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === zS || a === BS ? i : null;
								}
								if (i) {
									Qg = _d(i.nextSibling), r = i.data === zS;
									break a;
								}
							}
							Rr(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Da(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ro,
				lastRenderedState: t
			}, n.queue = r, n = Uo.bind(null, X, r), r.dispatch = n, r = Ga(!1), a = Go.bind(null, X, !1, r.queue), r = Da(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = Za.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function ao(e) {
			return oo(Oa(), wy, e);
		}
		function oo(e, t, n) {
			if (t = Ia(e, t, ro)[0], e = Fa(Na)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Aa(t);
			} catch (e) {
				throw e === Lv ? zv : e;
			}
			else r = t;
			t = Oa();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, lo(my | _y, { destroy: void 0 }, so.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function so(e, t) {
			e.action = t;
		}
		function co(e) {
			var t = Oa(), n = wy;
			if (n !== null) return oo(t, n, e);
			Oa(), t = t.memoizedState, n = Oa();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function lo(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = ka(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function uo(e) {
			var t = Da();
			return e = { current: e }, t.memoizedState = e;
		}
		function fo(e, t, n, r) {
			var i = Da();
			X.flags |= e, i.memoizedState = lo(my | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function po(e, t, n, r) {
			var i = Oa();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			wy !== null && r !== null && ya(r, wy.memoizedState.deps) ? i.memoizedState = lo(t, a, n, r) : (X.flags |= e, i.memoizedState = lo(my | t, a, n, r));
		}
		function mo(e, t) {
			(X.mode & Rg) === G ? fo(8390656, _y, e, t) : fo(276826112, _y, e, t);
		}
		function ho(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = ka(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function go(e) {
			var t = Da(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function L(e) {
			var t = Oa().memoizedState;
			return ho({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Ub & Pb) !== Nb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function _o(e, t) {
			var n = 4194308;
			return (X.mode & Rg) !== G && (n |= 134217728), fo(n, gy, e, t);
		}
		function vo(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function yo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Rg) !== G && (r |= 134217728), fo(r, gy, vo.bind(null, t, e), n);
		}
		function bo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), po(4, gy, vo.bind(null, t, e), n);
		}
		function xo(e, t) {
			return Da().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function So(e, t) {
			var n = Oa();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && ya(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function Co(e, t) {
			var n = Da();
			t = t === void 0 ? null : t;
			var r = e();
			if (Oy) {
				Ee(!0);
				try {
					e();
				} finally {
					Ee(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function wo(e, t) {
			var n = Oa();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && ya(t, r[1])) return r[0];
			if (r = e(), Oy) {
				Ee(!0);
				try {
					e();
				} finally {
					Ee(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function To(e, t) {
			return Oo(Da(), e, t);
		}
		function Eo(e, t) {
			return ko(Oa(), wy.memoizedState, e, t);
		}
		function Do(e, t) {
			var n = Oa();
			return wy === null ? Oo(n, e, t) : ko(n, wy.memoizedState, e, t);
		}
		function Oo(e, t, n) {
			return n === void 0 || Cy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = el(), X.lanes |= e, cx |= e, n);
		}
		function ko(e, t, n, r) {
			return Uh(n, t) ? n : oy.current === null ? !(Cy & 42) || Cy & 1073741824 && !($ & 261930) ? (ob = !0, e.memoizedState = n) : (e = el(), X.lanes |= e, cx |= e, t) : (e = Oo(e, n, r), Uh(e, t) || (ob = !0), e);
		}
		function Ao() {
			H.asyncTransitions--;
		}
		function jo(e, t, n, r, i) {
			var a = qf.p;
			qf.p = a !== 0 && a < Vp ? a : Vp;
			var o = H.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), H.T = s, Go(e, !1, t, n);
			try {
				var c = i(), l = H.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					H.asyncTransitions++, c.then(Ao, Ao);
					var u = Di(c, r);
					Wo(e, t, u, $c(e));
				} else Wo(e, t, r, $c(e));
			} catch (n) {
				Wo(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, $c(e));
			} finally {
				qf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), H.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function Mo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = No(e).queue;
			si(e), jo(e, i, t, yC, n === null ? u : function() {
				return Po(e), n(r);
			});
		}
		function No(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: yC,
				baseState: yC,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Na,
					lastRenderedState: yC
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
					lastRenderedReducer: Na,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function Po(e) {
			H.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = No(e);
			t.next === null && (t = e.alternate.memoizedState), Wo(e, t.next.queue, {}, $c(e));
		}
		function Fo() {
			var e = Ga(!1);
			return e = jo.bind(null, X, e.queue, !0, !1), Da().memoizedState = e, [!1, e];
		}
		function Io() {
			var e = Fa(Na)[0], t = Oa().memoizedState;
			return [typeof e == "boolean" ? e : Aa(e), t];
		}
		function Lo() {
			var e = La(Na)[0], t = Oa().memoizedState;
			return [typeof e == "boolean" ? e : Aa(e), t];
		}
		function Ro() {
			return ei(bC);
		}
		function zo() {
			var e = Da(), t = Wb.identifierPrefix;
			if ($g) {
				var n = Xg, r = Yg;
				n = (r & ~(1 << 32 - Pp(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ky++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = My++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function Bo() {
			return Da().memoizedState = Vo.bind(null, X);
		}
		function Vo(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = $c(n), i = Qi(r), a = $i(n, i, r);
						a !== null && (oi(r, "refresh()", e), tl(a, n, r), ea(a, n, r)), e = ri(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function Ho(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = $c(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			Ko(e) ? qo(t, i) : (i = cr(e, t, i, r), i !== null && (oi(r, "dispatch()", e), tl(i, e, r), Jo(i, t, r)));
		}
		function Uo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = $c(e), Wo(e, t, n, r) && oi(r, "setState()", e);
		}
		function Wo(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (Ko(e)) qo(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = H.H;
					H.H = Uy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Uh(c, s)) return sr(e, t, i, 0), Wb === null && or(), !1;
					} catch {} finally {
						H.H = o;
					}
				}
				if (n = cr(e, t, i, r), n !== null) return tl(n, e, r), Jo(n, t, r), !0;
			}
			return !1;
		}
		function Go(e, t, n, r) {
			if (H.T === null && av === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: nu(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, Ko(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = cr(e, n, r, 2), t !== null && (oi(2, "setOptimistic()", e), tl(t, e, 2));
		}
		function Ko(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function qo(e, t) {
			Dy = Ey = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function Jo(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, Le(e, n);
			}
		}
		function Yo(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				tb.has(t) || (tb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Xo(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Lg) {
				Ee(!0);
				try {
					a = n(r, i);
				} finally {
					Ee(!1);
				}
			}
			a === void 0 && (t = w(t) || "Component", Zy.has(t) || (Zy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : V({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Zo(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Lg) {
					Ee(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Ee(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", w(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Mn(n, r) || !Mn(i, a) : !0;
		}
		function Qo(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = E(e) || "Component", Ky.has(e) || (Ky.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), nb.enqueueReplaceState(t, t.state, null));
		}
		function $o(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = V({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function es(e) {
			dg(e), console.warn("%s\n\n%s\n", rb ? "An error occurred in the <" + rb + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function ts(e) {
			var t = rb ? "The above error occurred in the <" + rb + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ib || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, xC + " " + e[0], SC, wC + r + wC, CC) : e.splice(0, 0, xC, SC, wC + r + wC, CC), e.unshift(console), r = TC.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function ns(e) {
			dg(e);
		}
		function rs(e, t) {
			try {
				rb = t.source ? E(t.source) : null, ib = null;
				var n = t.value;
				if (H.actQueue !== null) H.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function is(e, t, n) {
			try {
				rb = n.source ? E(n.source) : null, ib = E(t);
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
		function as(e, t, n) {
			return n = Qi(n), n.tag = ty, n.payload = { element: null }, n.callback = function() {
				M(t.source, rs, e, t);
			}, n;
		}
		function os(e) {
			return e = Qi(e), e.tag = ty, e;
		}
		function ss(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					hr(n), M(r.source, is, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				hr(n), M(r.source, is, t, n, r), typeof i != "function" && (Cx === null ? Cx = /* @__PURE__ */ new Set([this]) : Cx.add(this)), Ov(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", E(n) || "Unknown");
			});
		}
		function cs(e, t, n, r, i) {
			if (n.flags |= 32768, Np && Gl(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && Zr(t, n, i, !0), $g && (e_ = !0), n = cy.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return ly === null ? hl() : n.alternate === null && sx === Ib && (sx = zb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Il(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Bv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Il(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Il(e, r, i), hl(), !1;
			}
			if ($g) return e_ = !0, t = cy.current, t === null ? (r !== i_ && Wr(Dr(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Dr(r, n), i = as(e.stateNode, r, i), ta(e, i), sx !== Bb && (sx = Rb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== i_ && Wr(Dr(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Dr(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (px === null ? px = [a] : px.push(a), sx !== Bb && (sx = Rb), t === null) return !0;
			r = Dr(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = as(n.stateNode, r, e), ta(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Cx === null || !Cx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = os(i), ss(i, e, n, r), ta(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function ls(e, t, n, r) {
			t.child = e === null ? Zv(t, null, n, r) : Xv(t, e.child, n, r);
		}
		function us(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return $r(t), r = ba(e, t, n, o, a, i), s = wa(), e !== null && !ob ? (Ta(e, t, i), Ps(e, t, i)) : ($g && s && Ar(t), t.flags |= 1, ls(e, t, r, i), t.child);
		}
		function ds(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !vr(a) && a.defaultProps === void 0 && n.compare === null ? (n = fr(a), t.tag = 15, t.type = n, ws(t, a), fs(e, t, n, r, i)) : (e = xr(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Fs(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Mn : n, n(o, r) && e.ref === t.ref) return Ps(e, t, i);
			}
			return t.flags |= 1, e = yr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function fs(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Mn(a, r) && e.ref === t.ref && t.type === e.type) {
					if (ob = !1, t.pendingProps = r = a, Fs(e, i)) e.flags & 131072 && (ob = !0);
					else return t.lanes = e.lanes, Ps(e, t, i);
				}
			}
			return bs(e, t, n, r, i);
		}
		function ps(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return hs(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && ki(t, a === null ? null : a.cachePool), a === null ? ca(t) : sa(t, a), fa(t);
				else return r = t.lanes = 536870912, hs(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && ki(t, null), ca(t), pa(t)) : (ki(t, a.cachePool), sa(t, a), pa(t), t.memoizedState = null);
			return ls(e, t, i, n), t.child;
		}
		function ms(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function hs(e, t, n, r, i) {
			var a = Oi();
			return a = a === null ? null : {
				parent: m_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && ki(t, null), ca(t), fa(t), e !== null && Zr(e, t, r, !0), t.childLanes = i, null;
		}
		function gs(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = ks({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function _s(e, t, n) {
			return Xv(t, e.child, null, n), e = gs(t, t.pendingProps), e.flags |= 2, ma(t), t.memoizedState = null, e;
		}
		function vs(e, t, n) {
			var r = t.pendingProps, i = !!(t.flags & 128);
			if (t.flags &= -129, e === null) {
				if ($g) {
					if (r.mode === "hidden") return e = gs(t, r), t.lanes = 536870912, ms(null, e);
					if (da(t), (e = Qg) ? (n = pd(e, r_), n = n !== null && n.data === kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Mr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Tr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Lr(t, e), Rr(t);
					return t.lanes = 536870912, null;
				}
				return gs(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (da(t), i) {
					if (t.flags & 256) t.flags &= -257, t = _s(e, t, n);
					else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
					else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				} else if (Ir(), n & 536870912 && ml(t), ob || Zr(e, t, n, !1), i = (n & e.childLanes) !== 0, ob || i) {
					if (r = Wb, r !== null && (o = Re(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, lr(e, o), tl(r, e, o), ab;
					hl(), t = _s(e, t, n);
				} else e = a.treeContext, Qg = _d(o.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Nr(t, e), t = gs(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && ml(t), e = yr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function ys(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function bs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = w(n) || "Unknown";
				sb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), sb[a] = !0);
			}
			return t.mode & Lg && lv.recordLegacyContextWarning(t, null), e === null && (ws(t, t.type), n.contextTypes && (a = w(n) || "Unknown", lb[a] || (lb[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), $r(t), n = ba(e, t, n, r, void 0, i), r = wa(), e !== null && !ob ? (Ta(e, t, i), Ps(e, t, i)) : ($g && r && Ar(t), t.flags |= 1, ls(e, t, n, i), t.child);
		}
		function xs(e, t, n, r, i, a) {
			return $r(t), Fy = -1, Iy = e !== null && e.type !== t.type, t.updateQueue = null, n = Sa(t, r, n, i), xa(e, t), r = wa(), e !== null && !ob ? (Ta(e, t, a), Ps(e, t, a)) : ($g && r && Ar(t), t.flags |= 1, ls(e, t, n, a), t.child);
		}
		function Ss(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = Wb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = os(c), ss(c, o, t, Dr(a, t)), ta(t, c);
			}
			if ($r(t), t.stateNode === null) {
				if (o = Ng, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== If) && !eb.has(n) && (eb.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Ff ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", w(n) || "Component", c)), typeof a == "object" && a && (o = ei(a)), a = new n(r, o), t.mode & Lg) {
					Ee(!0);
					try {
						a = new n(r, o);
					} finally {
						Ee(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = nb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Gy, typeof n.getDerivedStateFromProps == "function" && o === null && (o = w(n) || "Component", qy.has(o) || (qy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var l = c = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? c = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (c = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? l = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (l = "UNSAFE_componentWillUpdate"), o !== null || c !== null || l !== null) {
						a = w(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Yy.has(a) || (Yy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, c === null ? "" : "\n  " + c, l === null ? "" : "\n  " + l));
					}
				}
				a = t.stateNode, o = w(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !Qy.has(n) && (Qy.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", w(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Jy.has(n) || (Jy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", w(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || Kf(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Xi(t), o = n.contextType, a.context = typeof o == "object" && o ? ei(o) : Ng, a.state === r && (o = w(n) || "Component", Xy.has(o) || (Xy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Lg && lv.recordLegacyContextWarning(t, a), lv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Xo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", E(t) || "Component"), nb.enqueueReplaceState(a, a.state, null)), ra(t, r, a, i), na(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = $o(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Ng, typeof l == "object" && l && (o = ei(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && Qo(t, a, r, o), ny = !1;
				var p = t.memoizedState;
				a.state = p, ra(t, r, a, i), na(), f = t.memoizedState, d || p !== f || ny ? (typeof u == "function" && (Xo(t, n, u, r), f = t.memoizedState), (c = ny || Zo(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, Zi(e, t), o = t.memoizedProps, l = $o(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Ng, typeof f == "object" && f && (c = ei(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && Qo(t, a, r, c), ny = !1, p = t.memoizedState, a.state = p, ra(t, r, a, i), na();
				var m = t.memoizedState;
				o !== u || p !== m || ny || e !== null && e.dependencies !== null && Qr(e.dependencies) ? (typeof d == "function" && (Xo(t, n, d, r), m = t.memoizedState), (l = ny || Zo(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && Qr(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, ys(e, t), o = !!(t.flags & 128), c || o) {
				if (c = t.stateNode, ye(t), o && typeof n.getDerivedStateFromError != "function") n = null, C_ = -1;
				else if (n = Sv(c), t.mode & Lg) {
					Ee(!0);
					try {
						Sv(c);
					} finally {
						Ee(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Xv(t, e.child, null, i), t.child = Xv(t, null, n, i)) : ls(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = Ps(e, t, i);
			return i = t.stateNode, a && i.props !== r && (db || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", E(t) || "a component"), db = !0), e;
		}
		function Cs(e, t, n, r) {
			return Hr(), t.flags |= 256, ls(e, t, n, r), t.child;
		}
		function ws(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = w(t) || "Unknown", ub[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), ub[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = w(t) || "Unknown", cb[t] || (console.error("%s: Function components do not support contextType.", t), cb[t] = !0));
		}
		function Ts(e) {
			return {
				baseLanes: e,
				cachePool: Ai()
			};
		}
		function Es(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= dx), e;
		}
		function Ds(e, t, n) {
			var r, i = t.pendingProps;
			o(t) && (t.flags |= 128);
			var a = !1, s = !!(t.flags & 128);
			if ((r = s) || (r = e !== null && e.memoizedState === null ? !1 : (fy.current & dy) !== 0), r && (a = !0, t.flags &= -129), r = !!(t.flags & 32), t.flags &= -33, e === null) {
				if ($g) {
					if (a ? ua(t) : pa(t), (e = Qg) ? (n = pd(e, r_), n = n !== null && n.data !== kS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Mr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Tr(n), r.return = t, t.child = r, Zg = t, Qg = null)) : n = null, n === null) throw Lr(t, e), Rr(t);
					return hd(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var c = i.children;
				if (i = i.fallback, a) {
					pa(t);
					var l = t.mode;
					return c = ks({
						mode: "hidden",
						children: c
					}, l), i = Cr(i, l, n, null), c.return = t, i.return = t, c.sibling = i, t.child = c, i = t.child, i.memoizedState = Ts(n), i.childLanes = Es(e, r, n), t.memoizedState = mb, ms(null, i);
				}
				return ua(t), Os(t, c);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (s) t.flags & 256 ? (ua(t), t.flags &= -257, t = As(e, t, n)) : t.memoizedState === null ? (pa(t), c = i.fallback, l = t.mode, i = ks({
						mode: "visible",
						children: i.children
					}, l), c = Cr(c, l, n, null), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, Xv(t, e.child, null, n), i = t.child, i.memoizedState = Ts(n), i.childLanes = Es(e, r, n), t.memoizedState = mb, t = ms(null, i)) : (pa(t), t.child = e.child, t.flags |= 128, t = null);
					else if (ua(t), Ir(), n & 536870912 && ml(t), hd(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							c = r.dgst;
							var f = r.msg;
							l = r.stck;
							var p = r.cstck;
						}
						a = f, r = c, i = l, d = p, c = a, l = d, c = Error(c || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), c.stack = i || "", c.digest = r, r = l === void 0 ? null : l, i = {
							value: c,
							source: null,
							stack: r
						}, typeof r == "string" && Vg.set(c, i), Wr(i), t = As(e, t, n);
					} else if (ob || Zr(e, t, n, !1), r = (n & e.childLanes) !== 0, ob || r) {
						if (r = Wb, r !== null && (i = Re(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, lr(e, i), tl(r, e, i), ab;
						md(d) || hl(), t = As(e, t, n);
					} else md(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, Qg = _d(d.nextSibling), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !1, e !== null && Nr(t, e), t = Os(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (pa(t), c = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = yr(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (c = Cr(c, l, n, null), c.flags |= 2) : c = yr(d, c), c.return = t, i.return = t, i.sibling = c, t.child = i, ms(null, i), i = t.child, c = e.child.memoizedState, c === null ? c = Ts(n) : (l = c.cachePool, l === null ? l = Ai() : (p = m_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), c = {
				baseLanes: c.baseLanes | n,
				cachePool: l
			}), i.memoizedState = c, i.childLanes = Es(e, r, n), t.memoizedState = mb, ms(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && ml(t), ua(t), n = e.child, e = n.sibling, n = yr(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Os(e, t) {
			return t = ks({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function ks(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function As(e, t, n) {
			return Xv(t, e.child, null, n), e = Os(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function js(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), Yr(e.return, t, n);
		}
		function Ms(e, t, n, r, i, a) {
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
		function Ns(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = fy.current;
			if ((r = (s & dy) !== 0) ? (s = s & uy | dy, t.flags |= 128) : s &= uy, k(fy, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !fb[s]) {
				if (fb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
				else if (i === "backwards") console.error("The rendering order of <SuspenseList revealOrder=\"backwards\"> is changing. To be future compatible you must specify revealOrder=\"legacy_unstable-backwards\" instead.");
				else if (typeof i == "string") switch (i.toLowerCase()) {
					case "together":
					case "forwards":
					case "backwards":
					case "independent":
						console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
						break;
					case "forward":
					case "backward":
						console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
						break;
					default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
				}
				else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			s = a ?? "null", pb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (pb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (pb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (pb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) {
				if (Kf(o)) {
					for (s = 0; s < o.length; s++) if (!Yi(o[s], s)) break a;
				} else if (s = re(o), typeof s == "function") {
					if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
						if (!Yi(c.value, l)) break a;
						l++;
					}
				} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			}
			if (ls(e, t, o, n), $g ? (Pr(), o = Gg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && js(e, n, t);
				else if (e.tag === 19) js(e, n, t);
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
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ha(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ms(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ha(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					Ms(t, !0, n, null, a, o);
					break;
				case "together":
					Ms(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Ps(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), C_ = -1, cx |= t.lanes, (n & t.childLanes) === 0) {
				if (e !== null) {
					if (Zr(e, t, n, !1), (n & t.childLanes) === 0) return null;
				} else return null;
			}
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = yr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = yr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Fs(e, t) {
			return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Qr(e)));
		}
		function Is(e, t, n) {
			switch (t.tag) {
				case 3:
					ae(t, t.stateNode.containerInfo), qr(t, m_, e.memoizedState.cache), Hr();
					break;
				case 27:
				case 5:
					oe(t);
					break;
				case 4:
					ae(t, t.stateNode.containerInfo);
					break;
				case 10:
					qr(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, da(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ua(t), e = Ps(e, t, n), e === null ? null : e.sibling) : Ds(e, t, n) : (ua(t), t.flags |= 128, null);
					ua(t);
					break;
				case 19:
					var i = !!(e.flags & 128);
					if (r = (n & t.childLanes) !== 0, r ||= (Zr(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return Ns(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), k(fy, fy.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, ps(e, t, n, t.pendingProps);
				case 24: qr(t, m_, e.memoizedState.cache);
			}
			return Ps(e, t, n);
		}
		function Ls(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = xr(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 2, n;
			}
			if (e !== null) {
				if (e.memoizedProps !== t.pendingProps || t.type !== e.type) ob = !0;
				else {
					if (!Fs(e, n) && !(t.flags & 128)) return ob = !1, Is(e, t, n);
					ob = !!(e.flags & 131072);
				}
			} else ob = !1, (r = $g) && (Pr(), r = !!(t.flags & 1048576)), r && (r = t.index, Pr(), kr(t, Gg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Pi(t.elementType), t.type = e, typeof e == "function") vr(e) ? (r = $o(e, r), t.tag = 1, t.type = e = fr(e), t = Ss(null, t, e, r, n)) : (t.tag = 0, ws(t, e), t.type = e = fr(e), t = bs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Lf) {
								t.tag = 11, t.type = e = pr(e), t = us(null, t, e, r, n);
								break a;
							}
							if (i === Bf) {
								t.tag = 14, t = ds(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === Vf && (t = " Did you wrap a component in React.lazy() more than once?"), n = w(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return bs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = $o(r, t.pendingProps), Ss(e, t, r, i, n);
				case 3:
					a: {
						if (ae(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, Zi(e, t), ra(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, qr(t, m_, r), r !== a.cache && Xr(t, [m_], n, !0), na(), r = o.element, a.isDehydrated) {
							if (a = {
								element: r,
								isDehydrated: !1,
								cache: o.cache
							}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
								t = Cs(e, t, r, n);
								break a;
							}
							if (r !== i) {
								i = Dr(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), Wr(i), t = Cs(e, t, r, n);
								break a;
							}
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for (Qg = _d(e.firstChild), Zg = t, $g = !0, n_ = null, e_ = !1, t_ = null, r_ = !0, n = Zv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						} else {
							if (Hr(), r === i) {
								t = Ps(e, t, n);
								break a;
							}
							ls(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return ys(e, t), e === null ? (n = Ad(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : $g || (n = t.type, e = t.pendingProps, r = ie(ep.current), r = zu(r).createElement(n), r[Gp] = t, r[Kp] = e, Tu(r, n, e), Ye(r), t.stateNode = r) : t.memoizedState = Ad(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return oe(t), e === null && $g && (r = ie(ep.current), i = j(), r = t.stateNode = Td(t.type, t.pendingProps, r, i, !1), e_ || (i = Fu(r, t.type, t.pendingProps, i), i !== null && (Fr(t, 0).serverProps = i)), Zg = t, r_ = !0, i = Qg, $u(t.type) ? (nC = i, Qg = _d(r.firstChild)) : Qg = i), ls(e, t, t.pendingProps.children, n), ys(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && $g && (a = j(), r = Ut(t.type, a.ancestorInfo), i = Qg, (o = !i) || (o = dd(i, t.type, t.pendingProps, r_), o === null ? a = !1 : (t.stateNode = o, e_ || (a = Fu(o, t.type, t.pendingProps, a), a !== null && (Fr(t, 0).serverProps = a)), Zg = t, Qg = _d(o.firstChild), r_ = !1, a = !0), o = !a), o && (r && Lr(t, i), Rr(t))), oe(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Hu(i, a) ? r = null : o !== null && Hu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = ba(e, t, Ca, null, null, n), bC._currentValue = i), ys(e, t), ls(e, t, r, n), t.child;
				case 6: return e === null && $g && (n = t.pendingProps, e = j(), r = e.ancestorInfo.current, n = r == null || Wt(n, r.tag, e.ancestorInfo.implicitRootScope), e = Qg, (r = !e) || (r = fd(e, t.pendingProps, r_), r === null ? r = !1 : (t.stateNode = r, Zg = t, Qg = null, r = !0), r = !r), r && (n && Lr(t, e), Rr(t))), null;
				case 13: return Ds(e, t, n);
				case 4: return ae(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Xv(t, null, r, n) : ls(e, t, r, n), t.child;
				case 11: return us(e, t, t.type, t.pendingProps, n);
				case 7: return ls(e, t, t.pendingProps, n), t.child;
				case 8: return ls(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, ls(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || hb || (hb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), qr(t, r, a), ls(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), $r(t), i = ei(i), r = bv(r, i, void 0), t.flags |= 1, ls(e, t, r, n), t.child;
				case 14: return ds(e, t, t.type, t.pendingProps, n);
				case 15: return fs(e, t, t.type, t.pendingProps, n);
				case 19: return Ns(e, t, n);
				case 31: return vs(e, t, n);
				case 22: return ps(e, t, n, t.pendingProps);
				case 24: return $r(t), r = ei(m_), e === null ? (i = Oi(), i === null && (i = Wb, a = ri(), i.pooledCache = a, ii(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, Xi(t), qr(t, m_, i)) : ((e.lanes & n) !== 0 && (Zi(e, t), ra(t, null, null, n), na()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, qr(t, m_, r), r !== i.cache && Xr(t, [m_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), qr(t, m_, r))), ls(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Rs(e) {
			e.flags |= 4;
		}
		function zs(e, t, n, r, i) {
			if ((t = (e.mode & zg) !== G) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) {
					if (e.stateNode.complete) e.flags |= 8192;
					else if (dl()) e.flags |= 8192;
					else throw Vv = Bv, Rv;
				}
			} else e.flags &= -16777217;
		}
		function Bs(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & sC) !== rC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Wd(t)) {
				if (dl()) e.flags |= 8192;
				else throw Vv = Bv, Rv;
			}
		}
		function Vs(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Me(), e.lanes |= t, fx |= t);
		}
		function Hs(e, t) {
			if (!$g) switch (e.tailMode) {
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
		function Us(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) {
				if ((e.mode & K) !== G) {
					for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
					e.treeBaseDuration = i;
				} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			} else if ((e.mode & K) !== G) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Ws(e, t, n) {
			var r = t.pendingProps;
			switch (jr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return Us(t), null;
				case 1: return Us(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Jr(m_, t), A(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Vr(t) ? (Gr(), Rs(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ur())), Us(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Rs(t), a === null ? (Us(t), zs(t, i, null, r, n)) : (Us(t), Bs(t, a))) : a ? a === e.memoizedState ? (Us(t), t.flags &= -16777217) : (Rs(t), Us(t), Bs(t, a)) : (e = e.memoizedProps, e !== r && Rs(t), Us(t), zs(t, i, e, r, n)), null;
				case 27:
					if (se(t), n = ie(ep.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Us(t), null;
						}
						e = j(), Vr(t) ? zr(t, e) : (e = Td(i, r, n, e, !0), t.stateNode = e, Rs(t));
					}
					return Us(t), null;
				case 5:
					if (se(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Us(t), null;
						}
						var o = j();
						if (Vr(t)) zr(t, o);
						else {
							switch (a = ie(ep.current), Ut(i, o.ancestorInfo), o = o.context, a = zu(a), o) {
								case WS:
									a = a.createElementNS(Fm, i);
									break;
								case GS:
									a = a.createElementNS(Pm, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Fm, i);
										break;
									case "math":
										a = a.createElementNS(Pm, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || gp.call(JS, i) || (JS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Gp] = t, a[Kp] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (Tu(a, i, r), i) {
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
							r && Rs(t);
						}
					}
					return Us(t), zs(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && Rs(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = ie(ep.current), n = j(), Vr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !e_, r = null, a = Zg, a !== null) switch (a.tag) {
								case 3:
									i && (i = yd(e, n, r), i !== null && (Fr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = yd(e, n, r), i !== null && (Fr(t, 0).serverProps = i));
							}
							e[Gp] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Su(e.nodeValue, n)), e || Rr(t, !0);
						} else i = n.ancestorInfo.current, i != null && Wt(r, i.tag, n.ancestorInfo.implicitRootScope), e = zu(e).createTextNode(r), e[Gp] = t, t.stateNode = e;
					}
					return Us(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Vr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Gp] = t, Us(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else Gr(), Hr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Us(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Ur(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ma(t), t) : (ma(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Us(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Vr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Gp] = t, Us(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else Gr(), Hr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Us(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Ur(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ma(t), t) : (ma(t), null);
					}
					return ma(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && wi(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Vs(t, t.updateQueue), Us(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return A(t), e === null && lu(t.stateNode.containerInfo), Us(t), null;
				case 10: return Jr(t.type, t), Us(t), null;
				case 19:
					if (O(fy, t), r = t.memoizedState, r === null) return Us(t), null;
					if (i = !!(t.flags & 128), a = r.rendering, a === null) {
						if (i) Hs(r, !1);
						else {
							if (sx !== Ib || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
								if (a = ha(e), a !== null) {
									for (t.flags |= 128, Hs(r, !1), e = a.updateQueue, t.updateQueue = e, Vs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) br(n, e), n = n.sibling;
									return k(fy, fy.current & uy | dy, t), $g && Or(t, r.treeForkCount), t.child;
								}
								e = e.sibling;
							}
							r.tail !== null && xp() > yx && (t.flags |= 128, i = !0, Hs(r, !1), t.lanes = 4194304);
						}
					} else {
						if (!i) {
							if (e = ha(a), e !== null) {
								if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Vs(t, e), Hs(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !$g) return Us(t), null;
							} else 2 * xp() - r.renderingStartTime > yx && n !== 536870912 && (t.flags |= 128, i = !0, Hs(r, !1), t.lanes = 4194304);
						}
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Us(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = xp(), e.sibling = null, n = fy.current, n = i ? n & uy | dy : n & uy, k(fy, n, t), $g && Or(t, r.treeForkCount), e);
				case 22:
				case 23: return ma(t), la(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Us(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Us(t), n = t.updateQueue, n !== null && Vs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && O(cv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Jr(m_, t), Us(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Gs(e, t) {
			switch (jr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 3: return Jr(m_, t), A(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return se(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ma(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Hr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 13:
					if (ma(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Hr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 19: return O(fy, t), null;
				case 4: return A(t), null;
				case 10: return Jr(t.type, t), null;
				case 22:
				case 23: return ma(t), la(t), e !== null && O(cv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && wi(t), t) : null;
				case 24: return Jr(m_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Ks(e, t) {
			switch (jr(t), t.tag) {
				case 3:
					Jr(m_, t), A(t);
					break;
				case 26:
				case 27:
				case 5:
					se(t);
					break;
				case 4:
					A(t);
					break;
				case 31:
					t.memoizedState !== null && ma(t);
					break;
				case 13:
					ma(t);
					break;
				case 19:
					O(fy, t);
					break;
				case 10:
					Jr(t.type, t);
					break;
				case 22:
				case 23:
					ma(t), la(t), e !== null && O(cv, t);
					break;
				case 24: Jr(m_, t);
			}
		}
		function qs(e) {
			return (e.mode & K) !== G;
		}
		function Js(e, t) {
			qs(e) ? (Ci(), Xs(t, e), xi()) : Xs(t, e);
		}
		function Ys(e, t, n) {
			qs(e) ? (Ci(), Zs(n, e, t), xi()) : Zs(n, e, t);
		}
		function Xs(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & hy) !== py && ($x = !0), r = M(t, Mv, n), (e & hy) !== py && ($x = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & gy) === 0 ? (n.tag & hy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, M(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Zs(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & hy) !== py && ($x = !0), i = t, M(i, Pv, i, n, s), (e & hy) !== py && ($x = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Qs(e, t) {
			qs(e) ? (Ci(), Xs(t, e), xi()) : Xs(t, e);
		}
		function $s(e, t, n) {
			qs(e) ? (Ci(), Zs(n, e, t), xi()) : Zs(n, e, t);
		}
		function ec(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || db || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(e) || "instance"));
				try {
					M(e, oa, t, n);
				} catch (t) {
					Fl(e, e.return, t);
				}
			}
		}
		function tc(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function nc(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || db || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(e) || "instance"));
			try {
				var i = $o(e.type, n), a = M(e, tc, t, i, r);
				n = gb, a !== void 0 || n.has(e.type) || (n.add(e.type), M(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", E(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function rc(e, t, n) {
			n.props = $o(e.type, e.memoizedProps), n.state = e.memoizedState, qs(e) ? (Ci(), M(e, Av, e, t, n), xi()) : M(e, Av, e, t, n);
		}
		function ic(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") {
					if (qs(e)) try {
						Ci(), e.refCleanup = t(n);
					} finally {
						xi();
					}
					else e.refCleanup = t(n);
				} else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", E(e)), t.current = n;
			}
		}
		function ac(e, t) {
			try {
				M(e, ic, e);
			} catch (n) {
				Fl(e, t, n);
			}
		}
		function oc(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) {
				if (typeof r == "function") try {
					if (qs(e)) try {
						Ci(), M(e, r);
					} finally {
						xi(e);
					}
					else M(e, r);
				} catch (n) {
					Fl(e, t, n);
				} finally {
					e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
				}
				else if (typeof n == "function") try {
					if (qs(e)) try {
						Ci(), M(e, n, null);
					} finally {
						xi(e);
					}
					else M(e, n, null);
				} catch (n) {
					Fl(e, t, n);
				}
				else n.current = null;
			}
		}
		function sc(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function cc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", tv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function lc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				M(e, qu, r, t, n, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function uc(e, t, n) {
			try {
				M(e, Yu, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function dc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && $u(e.type) || e.tag === 4;
		}
		function fc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || dc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && $u(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function pc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? (Qu(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : (Qu(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = nn));
			else if (r !== 4 && (r === 27 && $u(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (pc(e, t, n), e = e.sibling; e !== null;) pc(e, t, n), e = e.sibling;
		}
		function mc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && $u(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (mc(e, t, n), e = e.sibling; e !== null;) mc(e, t, n), e = e.sibling;
		}
		function hc(e) {
			for (var t, n = e.return; n !== null;) {
				if (dc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = fc(e), mc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Xu(n), t.flags &= -33), t = fc(e), mc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = fc(e), pc(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function gc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				M(e, Ed, e.type, n, t, e);
			} catch (t) {
				Fl(e, e.return, t);
			}
		}
		function _c(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 && e.memoizedState.isDehydrated && !(t.flags & 256);
		}
		function vc(e, t) {
			if (e = e.containerInfo, KS = LC, e = In(e), Ln(e)) {
				if ("selectionStart" in e) var n = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					n = (n = e.ownerDocument) && n.defaultView || window;
					var r = n.getSelection && n.getSelection();
					if (r && r.rangeCount !== 0) {
						n = r.anchorNode;
						var i = r.anchorOffset, a = r.focusNode;
						r = r.focusOffset;
						try {
							n.nodeType, a.nodeType;
						} catch {
							n = null;
							break a;
						}
						var o = 0, s = -1, c = -1, l = 0, u = 0, d = e, f = null;
						b: for (;;) {
							for (var p; d !== n || i !== 0 && d.nodeType !== 3 || (s = o + i), d !== a || r !== 0 && d.nodeType !== 3 || (c = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;) f = d, d = p;
							for (;;) {
								if (d === e) break b;
								if (f === n && ++l === i && (s = o), f === a && ++u === r && (c = o), (p = d.nextSibling) !== null) break;
								d = f, f = d.parentNode;
							}
							d = p;
						}
						n = s === -1 || c === -1 ? null : {
							start: s,
							end: c
						};
					} else n = null;
				}
				n ||= {
					start: 0,
					end: 0
				};
			} else n = null;
			for (qS = {
				focusedElem: e,
				selectionRange: n
			}, LC = !1, xb = t; xb !== null;) if (t = xb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, xb = e;
			else for (; xb !== null;) {
				switch (e = t = xb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && nc(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) ud(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									ud(e);
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
					default: if (i & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (e = t.sibling, e !== null) {
					e.return = t.return, xb = e;
					break;
				}
				xb = t.return;
			}
		}
		function yc(e, t, n) {
			var r = fi(), i = mi(), a = gi(), o = _i(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					jc(e, n), s & 4 && Js(n, gy | my);
					break;
				case 1:
					if (jc(e, n), s & 4) {
						if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(n) || "instance")), qs(n) ? (Ci(), M(n, wv, n, e), xi()) : M(n, wv, n, e);
						else {
							var c = $o(n.type, t.memoizedProps);
							t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || db || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", E(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", E(n) || "instance")), qs(n) ? (Ci(), M(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), xi()) : M(n, Ev, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
						}
					}
					s & 64 && ec(n), s & 512 && ac(n, n.return);
					break;
				case 3:
					if (t = ci(), jc(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							M(n, oa, s, c);
						} catch (e) {
							Fl(n, n.return, e);
						}
					}
					e.effectDuration += li(t);
					break;
				case 27: t === null && s & 4 && gc(n);
				case 26:
				case 5:
					if (jc(e, n), t === null) {
						if (s & 4) lc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								M(n, Ju, c, e, t, n);
							} catch (e) {
								Fl(n, n.return, e);
							}
						}
					}
					s & 512 && ac(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = ci(), jc(e, n), e = n.stateNode, e.effectDuration += ui(s);
						try {
							M(n, sc, n, t, b_, e.effectDuration);
						} catch (e) {
							Fl(n, n.return, e);
						}
					} else jc(e, n);
					break;
				case 31:
					jc(e, n), s & 4 && Cc(e, n);
					break;
				case 13:
					jc(e, n), s & 4 && wc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = zl.bind(null, n), gd(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || _b, !s) {
						t = t !== null && t.memoizedState !== null || vb, c = _b;
						var l = vb;
						_b = s, (vb = t) && !l ? (Fc(e, n, !!(n.subtreeFlags & 8772)), (n.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Jn(n, q, J)) : jc(e, n), _b = c, vb = l;
					}
					break;
				case 30: break;
				default: jc(e, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && Zn(n, q, J, T_, E_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (_c(n.return.alternate, n.return) || qn(n, q, J, "Mount"))), pi(r), hi(i), E_ = a, D_ = o;
		}
		function bc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, bc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && P(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function xc(e, t, n) {
			for (n = n.child; n !== null;) Sc(e, t, n), n = n.sibling;
		}
		function Sc(e, t, n) {
			if (jp && typeof jp.onCommitFiberUnmount == "function") try {
				jp.onCommitFiberUnmount(Ap, n);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = fi(), i = mi(), a = gi(), o = _i();
			switch (n.tag) {
				case 26:
					vb || oc(n, t), xc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					vb || oc(n, t);
					var s = wb, c = Tb;
					$u(n.type) && (wb = n.stateNode, Tb = !1), xc(e, t, n), M(n, Dd, n.stateNode), wb = s, Tb = c;
					break;
				case 5: vb || oc(n, t);
				case 6:
					if (s = wb, c = Tb, wb = null, xc(e, t, n), wb = s, Tb = c, wb !== null) {
						if (Tb) try {
							M(n, td, wb, n.stateNode);
						} catch (e) {
							Fl(n, t, e);
						}
						else try {
							M(n, ed, wb, n.stateNode);
						} catch (e) {
							Fl(n, t, e);
						}
					}
					break;
				case 18:
					wb !== null && (Tb ? (e = wb, nd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), xf(e)) : nd(wb, n.stateNode));
					break;
				case 4:
					s = wb, c = Tb, wb = n.stateNode.containerInfo, Tb = !0, xc(e, t, n), wb = s, Tb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					Zs(hy, n, t), vb || Ys(n, t, gy), xc(e, t, n);
					break;
				case 1:
					vb || (oc(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && rc(n, t, s)), xc(e, t, n);
					break;
				case 21:
					xc(e, t, n);
					break;
				case 22:
					vb = (s = vb) || n.memoizedState !== null, xc(e, t, n), vb = s;
					break;
				default: xc(e, t, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(n, q, J, T_, E_), pi(r), hi(i), E_ = a, D_ = o;
		}
		function Cc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					M(t, Cd, e);
				} catch (e) {
					Fl(t, t.return, e);
				}
			}
		}
		function wc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				M(t, wd, e);
			} catch (e) {
				Fl(t, t.return, e);
			}
		}
		function Tc(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new bb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function Ec(e, t) {
			var n = Tc(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), Np) {
						if (Sb !== null && Cb !== null) Gl(Cb, Sb);
						else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					}
					var r = Bl.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function Dc(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = fi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if ($u(c.type)) {
								wb = c.stateNode, Tb = !1;
								break a;
							}
							break;
						case 5:
							wb = c.stateNode, Tb = !1;
							break a;
						case 3:
						case 4:
							wb = c.stateNode.containerInfo, Tb = !0;
							break a;
					}
					c = c.return;
				}
				if (wb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				Sc(i, a, o), wb = null, Tb = !1, (o.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(o, q, J, "Unmount"), pi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Oc(t, e), t = t.sibling;
		}
		function Oc(e, t) {
			var n = fi(), r = mi(), i = gi(), a = _i(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Dc(t, e), kc(e), s & 4 && (Zs(hy | my, e, e.return), Xs(hy | my, e), Ys(e, e.return, gy | my));
					break;
				case 1:
					if (Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), s & 64 && _b && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Eb, Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) {
							if (s === null) {
								if (e.stateNode === null) {
									a: {
										s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
										b: switch (s) {
											case "title":
												l = c.getElementsByTagName("title")[0], (!l || l[Qp] || l[Gp] || l.namespaceURI === Fm || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Tu(l, s, o), l[Gp] = e, Ye(l), s = l;
												break a;
											case "link":
												var u = Vd("link", "href", c).get(s + (o.href || ""));
												if (u) {
													for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
														u.splice(d, 1);
														break b;
													}
												}
												l = c.createElement(s), Tu(l, s, o), c.head.appendChild(l);
												break;
											case "meta":
												if (u = Vd("meta", "content", c).get(s + (o.content || ""))) {
													for (d = 0; d < u.length; d++) if (l = u[d], N(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
														u.splice(d, 1);
														break b;
													}
												}
												l = c.createElement(s), Tu(l, s, o), c.head.appendChild(l);
												break;
											default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
										}
										l[Gp] = e, Ye(l), s = l;
									}
									e.stateNode = s;
								} else Hd(c, e.type, e.stateNode);
							} else e.stateNode = Ld(c, s, e.memoizedProps);
						} else l === s ? s === null && e.stateNode !== null && uc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Hd(c, e.type, e.stateNode) : Ld(c, s, e.memoizedProps));
					}
					break;
				case 27:
					Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), o !== null && s & 4 && uc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (Dc(t, e), kc(e), s & 512 && (vb || o === null || oc(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							M(e, Xu, c);
						} catch (t) {
							Fl(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, uc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (yb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (Dc(t, e), kc(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							M(e, Zu, c, o, s);
						} catch (t) {
							Fl(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = ci(), fC = null, l = Eb, Eb = Od(t.containerInfo), Dc(t, e), Eb = l, kc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						M(e, Sd, t.containerInfo);
					} catch (t) {
						Fl(e, e.return, t);
					}
					yb && (yb = !1, Ac(e)), t.effectDuration += li(c);
					break;
				case 4:
					s = Eb, Eb = Od(e.stateNode.containerInfo), Dc(t, e), kc(e), Eb = s;
					break;
				case 12:
					s = ci(), Dc(t, e), kc(e), e.stateNode.effectDuration += ui(s);
					break;
				case 31:
					Dc(t, e), kc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ec(e, s)));
					break;
				case 13:
					Dc(t, e), kc(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (gx = xp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ec(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = _b, m = vb;
					if (_b = p || c, vb = m || f, Dc(t, e), vb = m, _b = p, f && !c && !p && !m && (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Jn(e, q, J), kc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~Og : t._visibility | Og, !c || o === null || f || _b || vb || (Nc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(e, q, J, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? M(f, ad, l) : M(f, cd, f.stateNode, f.memoizedProps);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? M(f, od, u) : M(f, ld, u, f.memoizedProps);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? M(f, id, d) : M(f, sd, f.stateNode);
								} catch (e) {
									Fl(f, f.return, e);
								}
							}
						} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
							t.child.return = t, t = t.child;
							continue;
						}
						if (t === e) break a;
						for (; t.sibling === null;) {
							if (t.return === null || t.return === e) break a;
							o === t && (o = null), t = t.return;
						}
						o === t && (o = null), t.sibling.return = t.return, t = t.sibling;
					}
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, Ec(e, o))));
					break;
				case 19:
					Dc(t, e), kc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, Ec(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: Dc(t, e), kc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && ((D_ || .05 < T_) && Zn(e, q, J, T_, E_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (_c(e.return.alternate, e.return) || qn(e, q, J, "Mount"))), pi(n), hi(r), E_ = i, D_ = a;
		}
		function kc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					M(e, hc, e);
				} catch (t) {
					Fl(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function Ac(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				Ac(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function jc(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) yc(e, t.alternate, t), t = t.sibling;
		}
		function Mc(e) {
			var t = fi(), n = mi(), r = gi(), i = _i();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Ys(e, e.return, gy), Nc(e);
					break;
				case 1:
					oc(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && rc(e, e.return, a), Nc(e);
					break;
				case 27: M(e, Dd, e.stateNode);
				case 26:
				case 5:
					oc(e, e.return), Nc(e);
					break;
				case 22:
					e.memoizedState === null && Nc(e);
					break;
				case 30:
					Nc(e);
					break;
				default: Nc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(e, q, J, T_, E_), pi(t), hi(n), E_ = r, D_ = i;
		}
		function Nc(e) {
			for (e = e.child; e !== null;) Mc(e), e = e.sibling;
		}
		function Pc(e, t, n, r) {
			var i = fi(), a = mi(), o = gi(), s = _i(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(e, n, r), Js(n, gy);
					break;
				case 1:
					if (Fc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && M(n, wv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							M(n, aa, t, e);
						} catch (e) {
							Fl(n, n.return, e);
						}
					}
					r && c & 64 && ec(n), ac(n, n.return);
					break;
				case 27: gc(n);
				case 26:
				case 5:
					Fc(e, n, r), r && t === null && c & 4 && lc(n), ac(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = ci(), Fc(e, n, r), r = n.stateNode, r.effectDuration += ui(c);
						try {
							M(n, sc, n, t, b_, r.effectDuration);
						} catch (e) {
							Fl(n, n.return, e);
						}
					} else Fc(e, n, r);
					break;
				case 31:
					Fc(e, n, r), r && c & 4 && Cc(e, n);
					break;
				case 13:
					Fc(e, n, r), r && c & 4 && wc(e, n);
					break;
				case 22:
					n.memoizedState === null && Fc(e, n, r), ac(n, n.return);
					break;
				case 30: break;
				default: Fc(e, n, r);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(n, q, J, T_, E_), pi(i), hi(a), E_ = o, D_ = s;
		}
		function Fc(e, t, n) {
			for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) Pc(e, t.alternate, t, n), t = t.sibling;
		}
		function Ic(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && ii(e), n != null && ai(n));
		}
		function Lc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (ii(t), e != null && ai(e));
		}
		function Rc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				zc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function zc(e, t, n, r, i) {
			var a = fi(), o = mi(), s = gi(), c = _i(), l = Sg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && Yn(t, t.actualStartTime, i, Db, n), Rc(e, t, n, r, i), u & 2048 && Qs(t, _y | my);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? Xn(t, t.actualStartTime, i, []) : t.flags & 1 && Yn(t, t.actualStartTime, i, Db, n)), Rc(e, t, n, r, i);
					break;
				case 3:
					var d = ci(), f = Db;
					Db = t.alternate !== null && t.alternate.memoizedState.isDehydrated && !(t.flags & 256), Rc(e, t, n, r, i), Db = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (ii(r), n != null && ai(n))), e.passiveEffectDuration += li(d);
					break;
				case 12:
					if (u & 2048) {
						u = ci(), Rc(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += ui(u);
						try {
							M(t, cc, t, t.alternate, b_, e.passiveEffectDuration);
						} catch (e) {
							Fl(t, t.return, e);
						}
					} else Rc(e, t, n, r, i);
					break;
				case 31:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && Xn(t, t.actualStartTime, i, d)) : Db = !0) : Db = !1, Rc(e, t, n, r, i), Db = u;
					break;
				case 13:
					u = Db, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Db = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Db = !1, d = d.hydrationErrors, d !== null && Xn(t, t.actualStartTime, i, d)) : Db = !0), Rc(e, t, n, r, i), Db = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & kg ? Rc(e, t, n, r, i) : (f._visibility |= kg, Bc(e, t, n, r, !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || Db || (e = t.actualStartTime, 0 <= e && .05 < i - e && Jn(t, e, i), 0 <= q && 0 <= J && .05 < J - q && Jn(t, q, J))) : f._visibility & kg ? Rc(e, t, n, r, i) : Hc(e, t, n, r, i), u & 2048 && Ic(d, t);
					break;
				case 24:
					Rc(e, t, n, r, i), u & 2048 && Lc(t.alternate, t);
					break;
				default: Rc(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !Db && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && qn(t, n, i, "Mount")), 0 <= q && 0 <= J && ((D_ || .05 < T_) && Zn(t, q, J, T_, E_), e && .05 < J - q && qn(t, q, J, "Mount"))), pi(a), hi(o), E_ = s, D_ = c, Sg = l;
		}
		function Bc(e, t, n, r, i, a) {
			for (i &&= !!(t.subtreeFlags & 10256) || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				Vc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function Vc(e, t, n, r, i, a) {
			var o = fi(), s = mi(), c = gi(), l = _i(), u = Sg;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && Yn(t, t.actualStartTime, a, Db, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Bc(e, t, n, r, i, a), Qs(t, _y);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= kg, Bc(e, t, n, r, i, a)) : f._visibility & kg ? Bc(e, t, n, r, i, a) : Hc(e, t, n, r, a), i && d & 2048 && Ic(t.alternate, t);
					break;
				case 24:
					Bc(e, t, n, r, i, a), i && d & 2048 && Lc(t.alternate, t);
					break;
				default: Bc(e, t, n, r, i, a);
			}
			(t.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(t, q, J, T_, E_), pi(o), hi(s), E_ = c, D_ = l, Sg = u;
		}
		function Hc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Sg;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && Yn(a, a.actualStartTime, l, Db, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Hc(o, a, s, c, l), d & 2048 && Ic(a.alternate, a);
						break;
					case 24:
						Hc(o, a, s, c, l), d & 2048 && Lc(a.alternate, a);
						break;
					default: Hc(o, a, s, c, l);
				}
				Sg = u, a = t;
			}
		}
		function Uc(e, t, n) {
			if (e.subtreeFlags & Ob) for (e = e.child; e !== null;) Wc(e, t, n), e = e.sibling;
		}
		function Wc(e, t, n) {
			switch (e.tag) {
				case 26:
					Uc(e, t, n), e.flags & Ob && e.memoizedState !== null && Gd(n, Eb, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					Uc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Eb;
					Eb = Od(e.stateNode.containerInfo), Uc(e, t, n), Eb = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ob, Ob = 16777216, Uc(e, t, n), Ob = r) : Uc(e, t, n));
					break;
				default: Uc(e, t, n);
			}
		}
		function Gc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Kc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = fi();
					xb = r, Xc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(r, q, J, "Unmount"), pi(i);
				}
				Gc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) qc(e), e = e.sibling;
		}
		function qc(e) {
			var t = fi(), n = mi(), r = gi(), i = _i();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Kc(e), e.flags & 2048 && $s(e, e.return, _y | my);
					break;
				case 3:
					var a = ci();
					Kc(e), e.stateNode.passiveEffectDuration += li(a);
					break;
				case 12:
					a = ci(), Kc(e), e.stateNode.passiveEffectDuration += ui(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & kg && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~kg, Jc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(e, q, J, "Disconnect")) : Kc(e);
					break;
				default: Kc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(e, q, J, T_, E_), pi(t), hi(n), D_ = i, E_ = r;
		}
		function Jc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = fi();
					xb = r, Xc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && qn(r, q, J, "Unmount"), pi(i);
				}
				Gc(e);
			}
			for (e = e.child; e !== null;) Yc(e), e = e.sibling;
		}
		function Yc(e) {
			var t = fi(), n = mi(), r = gi(), i = _i();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					$s(e, e.return, _y), Jc(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & kg && (a._visibility &= ~kg, Jc(e));
					break;
				default: Jc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(e, q, J, T_, E_), pi(t), hi(n), D_ = i, E_ = r;
		}
		function Xc(e, t) {
			for (; xb !== null;) {
				var n = xb, r = n, i = t, a = fi(), o = mi(), s = gi(), c = _i();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						$s(r, i, _y);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && ii(i));
						break;
					case 24: ai(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= q && 0 <= J && (D_ || .05 < T_) && Zn(r, q, J, T_, E_), pi(a), hi(o), D_ = c, E_ = s, r = n.child, r !== null) r.return = n, xb = r;
				else a: for (n = e; xb !== null;) {
					if (r = xb, a = r.sibling, o = r.return, bc(r), r === n) {
						xb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, xb = a;
						break a;
					}
					xb = o;
				}
			}
		}
		function Zc() {
			jb.forEach(function(e) {
				return e();
			});
		}
		function Qc() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || H.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function $c(e) {
			if ((Ub & Pb) !== Nb && $ !== 0) return $ & -$;
			var t = H.T;
			return t === null ? Ue() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), nu());
		}
		function el() {
			if (dx === 0) {
				if (!($ & 536870912) || $g) {
					var e = Rp;
					Rp <<= 1, !(Rp & 3932160) && (Rp = 262144), dx = e;
				} else dx = 536870912;
			}
			return e = cy.current, e !== null && (e.flags |= 32), dx;
		}
		function tl(e, t, n) {
			if ($x && console.error("useInsertionEffect must not schedule updates."), Jx && (Yx = !0), (e === Wb && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) && (ll(e, 0), al(e, $, dx, !1)), Pe(e, n), (Ub & Pb) !== Nb && e === Wb) {
				if (hp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && E(Q) || "Unknown", nS.has(e) || (nS.add(e), t = E(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: tS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else Np && Be(e, t, n), ql(t), e === Wb && ((Ub & Pb) === Nb && (lx |= n), sx === Bb && al(e, $, dx, !1)), Jl(e);
		}
		function nl(e, t, n) {
			if ((Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = xp();
				switch ($_) {
					case Jb:
					case qb:
						var a = ev;
						bg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, xg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, xg, void 0, "primary-light"));
						break;
					case ex:
						a = ev, bg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, xg, void 0, "primary-light")) : console.timeStamp("Action", a, i, xg, void 0, "primary-light"));
						break;
					default: bg && (r = i - ev, 3 > r || console.timeStamp("Blocked", ev, i, xg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Ae(e, t)) ? vl(e, t) : gl(e, t, !0);
			var o = n;
			do {
				if (a === Ib) {
					ix && !n && al(e, t, 0, !1), t = tx, ev = h_(), $_ = t;
					break;
				}
				if (r = xp(), i = e.current.alternate, o && !il(i)) {
					Kn(t), i = y_, a = r, !bg || a <= i || (Sx ? Sx.run(console.timeStamp.bind(console, "Teared Render", i, a, W, U, "error")) : console.timeStamp("Teared Render", i, a, W, U, "error")), cl(t, r), a = gl(e, t, !1), o = !1;
					continue;
				}
				if (a === Rb) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						Kn(t), nr(y_, r, t, Sx), cl(t, r), t = s;
						a: {
							r = e, a = o, o = px;
							var c = r.current.memoizedState.isDehydrated;
							if (c && (ll(r, s).flags |= 256), s = gl(r, s, !1), s !== Rb) {
								if (ax && !c) {
									r.errorRecoveryDisabledLanes |= a, lx |= a, a = Bb;
									break a;
								}
								r = mx, mx = o, r !== null && (mx === null ? mx = r : mx.push.apply(mx, r));
							}
							a = s;
						}
						if (o = !1, a !== Rb) continue;
						r = xp();
					}
				}
				if (a === Lb) {
					Kn(t), nr(y_, r, t, Sx), cl(t, r), ll(e, 0), al(e, t, 0, !0);
					break;
				}
				a: {
					switch (n = e, a) {
						case Ib:
						case Lb: throw Error("Root did not complete. This is a bug in React.");
						case Bb: if ((t & 4194048) !== t) break;
						case Vb:
							Kn(t), $n(y_, r, t, Sx), cl(t, r), i = t, i & 127 ? L_ = r : i & 4194048 && (J_ = r), al(n, t, dx, !rx);
							break a;
						case Rb:
							mx = null;
							break;
						case zb:
						case Hb: break;
						default: throw Error("Unknown root exit status.");
					}
					if (H.actQueue !== null) El(n, i, t, mx, xx, hx, dx, lx, fx, a, null, null, y_, r);
					else {
						if ((t & 62914560) === t && (o = gx + vx - xp(), 10 < o)) {
							if (al(n, t, dx, !rx), ke(n, 0, !0) !== 0) break a;
							Lx = t, n.timeoutHandle = ZS(rl.bind(null, n, i, mx, xx, hx, t, dx, lx, fx, rx, a, "Throttled", y_, r), o);
							break a;
						}
						rl(n, i, mx, xx, hx, t, dx, lx, fx, rx, a, null, y_, r);
					}
				}
				break;
			} while (1);
			Jl(e);
		}
		function rl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = $S;
			var m = t.subtreeFlags, h = null;
			if ((m & 8192 || (m & 16785408) == 16785408) && (h = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: nn
			}, Wc(t, a, h), m = (a & 62914560) === a ? gx - xp() : (a & 4194048) === a ? _x - xp() : 0, m = Kd(h, m), m !== null)) {
				Lx = a, e.cancelPendingCommit = m(El.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), al(e, a, o, !l);
				return;
			}
			El(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function il(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Uh(a(), i)) return !1;
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
		function al(e, t, n, r) {
			t &= ~ux, t &= ~lx, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Pp(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && Ie(e, n, t);
		}
		function ol() {
			return (Ub & (Pb | Fb)) !== Nb || (R(0, !1), !1);
		}
		function sl() {
			if (Q !== null) {
				if (tx === Gb) var e = Q.return;
				else e = Q, Kr(), Ea(e), Uv = null, Wv = 0, e = Q;
				for (; e !== null;) Ks(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function cl(e, t) {
			e & 127 && (O_ = t), e & 4194048 && (R_ = t), e & 62914560 && (Y_ = t), e & 2080374784 && (X_ = t);
		}
		function ll(e, t) {
			bg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", U, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", U, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", U, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", U, "primary-light"));
			var n = y_;
			if (y_ = h_(), $ !== 0 && 0 < n) {
				if (Kn($), sx === zb || sx === Bb) $n(n, y_, t, Sx);
				else {
					var r = y_, i = Sx;
					if (bg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, W, U, a)) : console.timeStamp(o, n, r, W, U, a);
					}
				}
				cl($, y_);
			}
			if (n = Sx, Sx = null, t & 127) {
				Sx = A_, i = 0 <= k_ && k_ < O_ ? O_ : k_, r = 0 <= P_ && P_ < O_ ? O_ : P_, a = 0 <= r ? r : 0 <= i ? i : y_, 0 <= L_ ? (Kn(2), er(L_, a, t, n)) : Z_ & 127 && (Kn(2), ar(O_, a, Q_)), n = i;
				var s = r, c = F_, l = 0 < I_, u = j_ === __, d = j_ === v_;
				if (i = y_, r = A_, a = M_, o = N_, bg) {
					if (W = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, W, U, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, W, U, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: W,
							trackGroup: U,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				k_ = -1.1, j_ = 0, N_ = M_ = null, L_ = -1.1, I_ = P_, P_ = -1.1, O_ = h_();
			}
			if (t & 4194048 && (Sx = H_, i = 0 <= z_ && z_ < R_ ? R_ : z_, n = 0 <= B_ && B_ < R_ ? R_ : B_, r = 0 <= G_ && G_ < R_ ? R_ : G_, a = 0 <= r ? r : 0 <= n ? n : y_, 0 <= J_ ? (Kn(256), er(J_, a, t, Sx)) : Z_ & 4194048 && (Kn(256), ar(R_, a, Q_)), d = r, s = K_, c = 0 < q_, l = V_ === v_, a = y_, r = H_, o = U_, u = W_, bg && (W = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, W, U, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, W, U, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, W, U, "primary-dark")) : console.timeStamp("Action", i, n, W, U, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: W,
					trackGroup: U,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), B_ = z_ = -1.1, V_ = 0, J_ = -1.1, q_ = G_, G_ = -1.1, R_ = h_()), t & 62914560 && Z_ & 62914560 && (Kn(4194304), ar(Y_, y_, Q_)), t & 2080374784 && Z_ & 2080374784 && (Kn(268435456), ar(X_, y_, Q_)), n = e.timeoutHandle, n !== $S && (e.timeoutHandle = $S, QS(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Lx = 0, sl(), Wb = e, Q = n = yr(e.current, null), $ = t, tx = Gb, nx = null, rx = !1, ix = Ae(e, t), ax = !1, sx = Ib, fx = dx = ux = lx = cx = 0, mx = px = null, hx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Pp(r), a = 1 << i, t |= e[i], r &= ~a;
			return ox = t, or(), e = lg(), 1e3 < e - sg && (H.recentlyCreatedOwnerStacks = 0, sg = e), lv.discardPendingWarnings(), n;
		}
		function ul(e, t) {
			X = null, H.H = Ly, H.getCurrentStack = null, hp = !1, mp = null, t === Lv || t === zv ? (t = Fi(), tx = Jb) : t === Rv ? (t = Fi(), tx = Yb) : tx = t === ab ? $b : typeof t == "object" && t && typeof t.then == "function" ? Zb : Kb, nx = t;
			var n = Q;
			n === null ? (sx = Lb, rs(e, Dr(t, e.current))) : n.mode & K && yi(n);
		}
		function dl() {
			var e = cy.current;
			return e === null ? !0 : ($ & 4194048) === $ ? ly === null : ($ & 62914560) === $ || $ & 536870912 ? e === ly : !1;
		}
		function fl() {
			var e = H.H;
			return H.H = Ly, e === null ? Ly : e;
		}
		function pl() {
			var e = H.A;
			return H.A = kb, e;
		}
		function ml(e) {
			Sx === null && (Sx = e._debugTask == null ? null : e._debugTask);
		}
		function hl() {
			sx = Bb, rx || ($ & 4194048) !== $ && cy.current !== null || (ix = !0), !(cx & 134217727) && !(lx & 134217727) || Wb === null || al(Wb, $, dx, !1);
		}
		function gl(e, t, n) {
			var r = Ub;
			Ub |= Pb;
			var i = fl(), a = pl();
			if (Wb !== e || $ !== t) {
				if (Np) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Gl(e, $), o.clear()), Ve(e, t);
				}
				xx = null, ll(e, t);
			}
			t = !1, o = sx;
			a: do
				try {
					if (tx !== Gb && Q !== null) {
						var s = Q, c = nx;
						switch (tx) {
							case $b:
								sl(), o = Vb;
								break a;
							case Jb:
							case qb:
							case ex:
							case Zb:
								cy.current === null && (t = !0);
								var l = tx;
								if (tx = Gb, nx = null, Cl(e, s, c, l), n && ix) {
									o = Ib;
									break a;
								}
								break;
							default: l = tx, tx = Gb, nx = null, Cl(e, s, c, l);
						}
					}
					_l(), o = sx;
					break;
				} catch (t) {
					ul(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, Kr(), Ub = r, H.H = i, H.A = a, Q === null && (Wb = null, $ = 0, or()), o;
		}
		function _l() {
			for (; Q !== null;) bl(Q);
		}
		function vl(e, t) {
			var n = Ub;
			Ub |= Pb;
			var r = fl(), i = pl();
			if (Wb !== e || $ !== t) {
				if (Np) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Gl(e, $), a.clear()), Ve(e, t);
				}
				xx = null, yx = xp() + bx, ll(e, t);
			} else ix = Ae(e, t);
			a: do
				try {
					if (tx !== Gb && Q !== null) b: switch (t = Q, a = nx, tx) {
						case Kb:
							tx = Gb, nx = null, Cl(e, t, a, Kb);
							break;
						case qb:
						case ex:
							if (Mi(a)) {
								tx = Gb, nx = null, xl(t);
								break;
							}
							t = function() {
								tx !== qb && tx !== ex || Wb !== e || (tx = Qb), Jl(e);
							}, a.then(t, t);
							break a;
						case Jb:
							tx = Qb;
							break a;
						case Yb:
							tx = Xb;
							break a;
						case Qb:
							Mi(a) ? (tx = Gb, nx = null, xl(t)) : (tx = Gb, nx = null, Cl(e, t, a, Qb));
							break;
						case Xb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Wd(o) : s.stateNode.complete) {
										tx = Gb, nx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, wl(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							tx = Gb, nx = null, Cl(e, t, a, Xb);
							break;
						case Zb:
							tx = Gb, nx = null, Cl(e, t, a, Zb);
							break;
						case $b:
							sl(), sx = Vb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					H.actQueue === null ? yl() : _l();
					break;
				} catch (t) {
					ul(e, t);
				}
			while (1);
			return Kr(), H.H = r, H.A = i, Ub = n, Q === null ? (Wb = null, $ = 0, or(), sx) : Ib;
		}
		function yl() {
			for (; Q !== null && !yp();) bl(Q);
		}
		function bl(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = M(e, Ls, t, e, ox) : (vi(e), t = M(e, Ls, t, e, ox), yi(e)), e.memoizedProps = e.pendingProps, t === null ? wl(e) : Q = t;
		}
		function xl(e) {
			var t = M(e, Sl, e);
			e.memoizedProps = e.pendingProps, t === null ? wl(e) : Q = t;
		}
		function Sl(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && vi(e), e.tag) {
				case 15:
				case 0:
					t = xs(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = xs(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: Ea(e);
				default: Ks(t, e), e = Q = br(e, ox), t = Ls(t, e, ox);
			}
			return n && yi(e), t;
		}
		function Cl(e, t, n, r) {
			Kr(), Ea(t), Uv = null, Wv = 0;
			var i = t.return;
			try {
				if (cs(e, i, t, n, $)) {
					sx = Lb, rs(e, Dr(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				sx = Lb, rs(e, Dr(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? ($g || r === Kb ? e = !0 : ix || $ & 536870912 ? e = !1 : (rx = e = !0, (r === qb || r === ex || r === Jb || r === Zb) && (r = cy.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Tl(t, e)) : wl(t);
		}
		function wl(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					Tl(t, rx);
					return;
				}
				var n = t.alternate;
				if (e = t.return, vi(t), n = M(t, Ws, n, t, ox), (t.mode & K) !== G && bi(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			sx === Ib && (sx = Hb);
		}
		function Tl(e, t) {
			do {
				var n = Gs(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & K) !== G) {
					bi(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			sx = Vb, Q = null;
		}
		function El(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				Ml();
			while (Px !== Ox);
			if (lv.flushLegacyContextWarning(), lv.flushPendingUnsafeLifecycleWarnings(), (Ub & (Pb | Fb)) !== Nb) throw Error("Should not already be working.");
			if (Kn(n), l === Rb ? nr(f, p, n, Sx) : r === null ? Qn(f, p, n, Sx) : tr(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && !!(t.flags & 256), Sx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Mg, Fe(e, n, a, o, s, c), e === Wb && (Q = Wb = null, $ = 0), Ix = t, Fx = e, Lx = n, Rx = a, Bx = i, Vx = r, zx = p, Hx = d, Ux = wx, Wx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Kl(Tp, function() {
					return XS = window.event, Ux === wx && (Ux = Ex), Nl(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), S_ = null, b_ = h_(), d !== null && rr(p, b_, d, Sx), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
					r = H.T, H.T = null, i = qf.p, qf.p = Bp, o = Ub, Ub |= Fb;
					try {
						vc(e, t, n);
					} finally {
						Ub = o, qf.p = i, H.T = r;
					}
				}
				Px = kx, Dl(), Ol(), kl();
			}
		}
		function Dl() {
			if (Px === kx) {
				Px = Ox;
				var e = Fx, t = Ix, n = Lx, r = !!(t.flags & 13878);
				if (t.subtreeFlags & 13878 || r) {
					r = H.T, H.T = null;
					var i = qf.p;
					qf.p = Bp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, di(), Oc(t, e), Cb = Sb = null, n = qS;
						var o = In(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Fn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Ln(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Pn(s, h), v = Pn(s, g);
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
						LC = !!KS, qS = KS = null;
					} finally {
						Ub = a, qf.p = i, H.T = r;
					}
				}
				e.current = t, Px = Ax;
			}
		}
		function Ol() {
			if (Px === Ax) {
				Px = Ox;
				var e = Wx;
				if (e !== null) {
					b_ = h_();
					var t = x_, n = b_;
					!bg || n <= t || (Q_ ? Q_.run(console.timeStamp.bind(console, e, t, n, W, U, "secondary-light")) : console.timeStamp(e, t, n, W, U, "secondary-light"));
				}
				e = Fx, t = Ix, n = Lx;
				var r = !!(t.flags & 8772);
				if (t.subtreeFlags & 8772 || r) {
					r = H.T, H.T = null;
					var i = qf.p;
					qf.p = Bp;
					var a = Ub;
					Ub |= Fb;
					try {
						Sb = n, Cb = e, di(), yc(e, t.alternate, t), Cb = Sb = null;
					} finally {
						Ub = a, qf.p = i, H.T = r;
					}
				}
				e = zx, t = Hx, x_ = h_(), e = t === null ? e : b_, t = x_, n = Ux === Tx, r = Sx, S_ === null ? !bg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, W, U, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, W, U, n ? "error" : "secondary-dark")) : ir(e, t, S_, !1, r), Px = jx;
			}
		}
		function kl() {
			if (Px === Mx || Px === jx) {
				if (Px === Mx) {
					var e = x_;
					x_ = h_();
					var t = x_, n = Ux === Tx;
					!bg || t <= e || (Q_ ? Q_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, W, U, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, W, U, n ? " error" : "secondary-light")), Ux !== Tx && (Ux = Dx);
				}
				Px = Ox, bp(), e = Fx;
				var r = Ix;
				t = Lx, n = Vx;
				var i = r.actualDuration !== 0 || !!(r.subtreeFlags & 10256) || !!(r.flags & 10256);
				i ? Px = Nx : (Px = Ox, Ix = Fx = null, jl(e, e.pendingLanes), Zx = 0, Qx = null);
				var a = e.pendingLanes;
				if (a === 0 && (Cx = null), i || Ul(e), a = He(t), r = r.stateNode, jp && typeof jp.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case Bp:
							var s = Cp;
							break;
						case Vp:
							s = wp;
							break;
						case Hp:
							s = Tp;
							break;
						case Up:
							s = Dp;
							break;
						default: s = Tp;
					}
					jp.onCommitFiberRoot(Ap, r, s, o);
				} catch (e) {
					Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (Np && e.memoizedUpdaters.clear(), Zc(), n !== null) {
					o = H.T, s = qf.p, qf.p = Bp, H.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = Al(l.stack);
							M(l.source, c, l.value, u);
						}
					} finally {
						H.T = o, qf.p = s;
					}
				}
				Lx & 3 && Ml(), Jl(e), a = e.pendingLanes, t & 261930 && a & 42 ? (nv = !0, e === qx ? Kx++ : (Kx = 0, qx = e)) : Kx = 0, i || cl(t, x_), R(0, !1);
			}
		}
		function Al(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function jl(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ai(t)));
		}
		function Ml() {
			return Dl(), Ol(), kl(), Nl();
		}
		function Nl() {
			if (Px !== Nx) return !1;
			var e = Fx, t = Rx;
			Rx = 0;
			var n = He(Lx), r = Hp === 0 || Hp > n ? Hp : n;
			n = H.T;
			var i = qf.p;
			try {
				qf.p = r, H.T = null;
				var a = Bx;
				Bx = null, r = Fx;
				var o = Lx;
				if (Px = Ox, Ix = Fx = null, Lx = 0, (Ub & (Pb | Fb)) !== Nb) throw Error("Cannot flush passive effects while already rendering.");
				Kn(o), Jx = !0, Yx = !1;
				var s = 0;
				if (S_ = null, s = xp(), Ux === Dx) ar(x_, s, Q_);
				else {
					var c = x_, l = s, u = Ux === Ex;
					!bg || l <= c || (Sx ? Sx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, W, U, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, W, U, "secondary-light"));
				}
				c = Ub, Ub |= Fb;
				var d = r.current;
				di(), qc(d);
				var f = r.current;
				d = zx, di(), zc(r, f, o, a, d), Ul(r), Ub = c;
				var p = xp();
				if (f = s, d = Sx, S_ === null ? !bg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, W, U, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, W, U, "secondary-dark")) : ir(f, p, S_, !0, d), cl(o, p), R(0, !1), Yx ? r === Qx ? Zx++ : (Zx = 0, Qx = r) : Zx = 0, Yx = Jx = !1, jp && typeof jp.onPostCommitFiberRoot == "function") try {
					jp.onPostCommitFiberRoot(Ap, r);
				} catch (e) {
					Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				qf.p = i, H.T = n, jl(e, t);
			}
		}
		function Pl(e, t, n) {
			t = Dr(n, t), Si(t), t = as(e.stateNode, t, 2), e = $i(e, t, 2), e !== null && (Pe(e, 2), Jl(e));
		}
		function Fl(e, t, n) {
			if ($x = !1, e.tag === 3) Pl(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Pl(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Cx === null || !Cx.has(r))) {
							e = Dr(n, e), Si(e), n = os(2), r = $i(t, n, 2), r !== null && (ss(n, r, t, e), Pe(r, 2), Jl(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Il(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Mb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ax = !0, i.add(n), r = Ll.bind(null, e, t, n), Np && Gl(e, n), t.then(r, r));
		}
		function Ll(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > k_ && (O_ = k_ = h_(), A_ = g_("Promise Resolved"), j_ = v_) : n & 4194048 && 0 > B_ && (R_ = B_ = h_(), H_ = g_("Promise Resolved"), V_ = v_), Qc() && H.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Wb === e && ($ & n) === n && (sx === Bb || sx === zb && ($ & 62914560) === $ && xp() - gx < vx ? (Ub & Pb) === Nb && ll(e, 0) : ux |= n, fx === $ && (fx = 0)), Jl(e);
		}
		function Rl(e, t) {
			t === 0 && (t = Me()), e = lr(e, t), e !== null && (Pe(e, t), Jl(e));
		}
		function zl(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Rl(e, n);
		}
		function Bl(e, t) {
			var n = 0;
			switch (e.tag) {
				case 31:
				case 13:
					var r = e.stateNode, i = e.memoizedState;
					i !== null && (n = i.retryLane);
					break;
				case 19:
					r = e.stateNode;
					break;
				case 22:
					r = e.stateNode._retryCache;
					break;
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), Rl(e, n);
		}
		function Vl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === Nf;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? M(i, Hl, r, i) : i.subtreeFlags & 67108864 && M(i, Vl, r, i, a)) : i.flags & 67108864 ? a && M(i, Hl, r, i) : Vl(r, i, a), t = t.sibling;
			}
		}
		function Hl(e, t) {
			Ee(!0);
			try {
				Mc(t), Yc(t), Pc(e, t.alternate, t, !1), Vc(e, t, 0, null, !1, 0);
			} finally {
				Ee(!1);
			}
		}
		function Ul(e) {
			var t = !0;
			e.current.mode & (Lg | Rg) || (t = !1), Vl(e, e.current, t);
		}
		function Wl(e) {
			if ((Ub & Pb) === Nb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = E(e) || "ReactComponent", eS !== null) {
						if (eS.has(t)) return;
						eS.add(t);
					} else eS = /* @__PURE__ */ new Set([t]);
					M(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Gl(e, t) {
			Np && e.memoizedUpdaters.forEach(function(n) {
				Be(e, n, t);
			});
		}
		function Kl(e, t) {
			var n = H.actQueue;
			return n === null ? _p(e, t) : (n.push(t), rS);
		}
		function ql(e) {
			Qc() && H.actQueue === null && M(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", E(e));
			});
		}
		function Jl(e) {
			e !== aS && e.next === null && (aS === null ? iS = aS = e : aS = aS.next = e), cS = !0, H.actQueue === null ? oS || (oS = !0, tu()) : sS || (sS = !0, tu());
		}
		function R(e, t) {
			if (!lS && cS) {
				lS = !0;
				do
					for (var n = !1, r = iS; r !== null;) {
						if (!t) {
							if (e !== 0) {
								var i = r.pendingLanes;
								if (i === 0) var a = 0;
								else {
									var o = r.suspendedLanes, s = r.pingedLanes;
									a = (1 << 31 - Pp(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
								}
								a !== 0 && (n = !0, $l(r, a));
							} else a = $, a = ke(r, r === Wb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== $S), !(a & 3) || Ae(r, a) || (n = !0, $l(r, a));
						}
						r = r.next;
					}
				while (n);
				lS = !1;
			}
		}
		function Yl() {
			XS = window.event, Xl();
		}
		function Xl() {
			cS = sS = oS = !1;
			var e = 0;
			uS !== 0 && Uu() && (e = uS);
			for (var t = xp(), n = null, r = iS; r !== null;) {
				var i = r.next, a = Zl(r, t);
				a === 0 ? (r.next = null, n === null ? iS = i : n.next = i, i === null && (aS = n)) : (n = r, (e !== 0 || a & 3) && (cS = !0)), r = i;
			}
			Px !== Ox && Px !== Nx || R(e, !1), uS !== 0 && (uS = 0);
		}
		function Zl(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Pp(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = je(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Wb, n = $, n = ke(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r = e.callbackNode, n === 0 || e === t && (tx === qb || tx === ex) || e.cancelPendingCommit !== null) return r !== null && eu(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Ae(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || H.actQueue !== null && r !== dS) eu(r);
				else return t;
				switch (He(n)) {
					case Bp:
					case Vp:
						n = wp;
						break;
					case Hp:
						n = Tp;
						break;
					case Up:
						n = Dp;
						break;
					default: n = Tp;
				}
				return r = Ql.bind(null, e), H.actQueue === null ? n = _p(n, r) : (H.actQueue.push(r), n = dS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && eu(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function Ql(e, t) {
			if (nv = tv = !1, XS = window.event, Px !== Ox && Px !== Nx) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Ux === wx && (Ux = Ex), Ml() && e.callbackNode !== n) return null;
			var r = $;
			return r = ke(e, e === Wb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== $S), r === 0 ? null : (nl(e, r, t), Zl(e, xp()), e.callbackNode != null && e.callbackNode === n ? Ql.bind(null, e) : null);
		}
		function $l(e, t) {
			if (Ml()) return null;
			tv = nv, nv = !1, nl(e, t, !0);
		}
		function eu(e) {
			e !== dS && e !== null && vp(e);
		}
		function tu() {
			H.actQueue !== null && H.actQueue.push(function() {
				return Xl(), null;
			}), tC(function() {
				(Ub & (Pb | Fb)) === Nb ? Xl() : _p(Cp, Yl);
			});
		}
		function nu() {
			if (uS === 0) {
				var e = av;
				e === 0 && (e = Lp, Lp <<= 1, !(Lp & 261888) && (Lp = 256)), uS = e;
			}
			return uS;
		}
		function ru(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (N(e, "action"), tn("" + e));
		}
		function iu(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function au(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = ru((i[Kp] || null).action), o = r.submitter;
				o && (t = (t = o[Kp] || null) ? ru(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new oh("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (uS !== 0) {
									var e = o ? iu(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), Mo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? iu(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), Mo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function ou(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				dg(e);
			}
			e.currentTarget = null;
		}
		function su(e, t) {
			t = !!(t & 4);
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? ou(a, s, l) : M(c, ou, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? ou(a, s, l) : M(c, ou, a, s, l), i = c;
					}
				}
			}
		}
		function z(e, t) {
			pS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Jp];
			n === void 0 && (n = t[Jp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (uu(t, e, 2, !1), n.add(r));
		}
		function cu(e, t, n) {
			pS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), uu(n, e, r, t);
		}
		function lu(e) {
			if (!e[mS]) {
				e[mS] = !0, $p.forEach(function(t) {
					t !== "selectionchange" && (pS.has(t) || cu(t, !1, e), cu(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[mS] || (t[mS] = !0, cu("selectionchange", !1, t));
			}
		}
		function uu(e, t, n, r) {
			switch (df(t)) {
				case Bp:
					var i = of;
					break;
				case Vp:
					i = sf;
					break;
				default: i = cf;
			}
			n = i.bind(null, t, n, e), i = void 0, !eh || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function du(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = Ge(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			on(function() {
				var r = a, i = rn(n), o = [];
				a: {
					var s = ag.get(e);
					if (s !== void 0) {
						var c = oh, l = e;
						switch (e) {
							case "keypress": if (ln(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = Ch;
								break;
							case "focusin":
								l = "focus", c = hh;
								break;
							case "focusout":
								l = "blur", c = hh;
								break;
							case "beforeblur":
							case "afterblur":
								c = hh;
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
								c = ph;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = mh;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = Th;
								break;
							case Qh:
							case $h:
							case eg:
								c = gh;
								break;
							case ig:
								c = Eh;
								break;
							case "scroll":
							case "scrollend":
								c = ch;
								break;
							case "wheel":
								c = Dh;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = _h;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = wh;
								break;
							case "toggle":
							case "beforetoggle": c = Oh;
						}
						var u = !!(t & 4), d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = sn(p, f), h != null && u.push(fu(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Ym && (l = n.relatedTarget || n.fromElement) && (Ge(l) || l[qp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Ge(l) : null, l !== null && (d = x(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = ph, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = wh, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : qe(c), m = l == null ? s : qe(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Ge(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = mu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
								h = 0;
								for (var g = p; g; g = u(g)) h++;
								for (; 0 < m - h;) f = u(f), m--;
								for (; 0 < h - m;) p = u(p), h--;
								for (; m--;) {
									if (f === p || p !== null && f === p.alternate) {
										u = f;
										break b;
									}
									f = u(f), p = u(p);
								}
								u = null;
							}
							else u = null;
							c !== null && hu(o, s, c, u, !1), l !== null && d !== null && hu(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? qe(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = wn;
						else if (yn(s)) {
							if (Hh) _ = An;
							else {
								_ = On;
								var v = Dn;
							}
						} else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && Yt(r.elementType) && (_ = wn) : _ = kn;
						if (_ &&= _(e, r)) {
							xn(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && mt(s, "number", s.value);
					}
					switch (v = r ? qe(r) : window, e) {
						case "focusin":
							(yn(v) || v.contentEditable === "true") && (Gh = v, Kh = r, qh = null);
							break;
						case "focusout":
							qh = Kh = Gh = null;
							break;
						case "mousedown":
							Jh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							Jh = !1, Rn(o, n, i);
							break;
						case "selectionchange": if (Wh) break;
						case "keydown":
						case "keyup": Rn(o, n, i);
					}
					var y;
					if (jh) b: {
						switch (e) {
							case "compositionstart":
								var b = "onCompositionStart";
								break b;
							case "compositionend":
								b = "onCompositionEnd";
								break b;
							case "compositionupdate":
								b = "onCompositionUpdate";
								break b;
						}
						b = void 0;
					}
					else Rh ? hn(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === Ah && (b = "onCompositionStart");
					b && (Ph && n.locale !== "ko" && (Rh || b !== "onCompositionStart" ? b === "onCompositionEnd" && Rh && (y = cn()) : (nh = i, rh = "value" in nh ? nh.value : nh.textContent, Rh = !0)), v = pu(r, b), 0 < v.length && (b = new vh(b, e, null, n, i), o.push({
						event: b,
						listeners: v
					}), y ? b.data = y : (y = gn(n), y !== null && (b.data = y)))), (y = Nh ? _n(e, n) : vn(e, n)) && (b = pu(r, "onBeforeInput"), 0 < b.length && (v = new yh("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: b
					}), v.data = y)), au(o, e, r, n, i);
				}
				su(o, t);
			});
		}
		function fu(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function pu(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = sn(e, n), i != null && r.unshift(fu(e, i, a)), i = sn(e, t), i != null && r.push(fu(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function mu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function hu(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = sn(n, a), l != null && o.unshift(fu(n, l, c))) : i || (l = sn(n, a), l != null && o.push(fu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function gu(e, t) {
			Qt(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Hm || (Hm = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: em,
				possibleRegistrationNames: tm
			};
			Yt(e) || typeof t.is == "string" || en(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function _u(e, t, n, r) {
			t !== n && (n = xu(n), xu(t) !== n && (r[e] = t));
		}
		function vu(e, t, n) {
			t.forEach(function(t) {
				n[Du(t)] = t === "style" ? Ou(e) : e.getAttribute(t);
			});
		}
		function yu(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function bu(e, t) {
			return e = e.namespaceURI === Pm || e.namespaceURI === Fm ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function xu(e) {
			return xe(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", be(e)), Se(e)), (typeof e == "string" ? e : "" + e).replace(CS, "\n").replace(wS, "");
		}
		function Su(e, t) {
			return t = xu(t), xu(e) === t;
		}
		function Cu(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? (Wt(r, t, !1), t === "body" || t === "textarea" && r === "" || Gt(e, r)) : (typeof r == "number" || typeof r == "bigint") && (Wt("" + r, t, !1), t !== "body" && Gt(e, "" + r));
					break;
				case "className":
					nt(e, "class", r);
					break;
				case "tabIndex":
					nt(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					nt(e, n, r);
					break;
				case "style":
					Jt(e, r, a);
					break;
				case "data": if (t !== "object") {
					nt(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					N(r, n), r = tn("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || bS || (bS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || yS || (yS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || _S ? t !== "button" || i.type == null || i.type === "submit" || _S ? typeof r == "function" && (i.name == null || vS || (vS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || bS || (bS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || yS || (yS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (_S = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (_S = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					}
					if (typeof a == "function" && (n === "formAction" ? (t !== "input" && Cu(e, t, "name", i.name, i, null), Cu(e, t, "formEncType", i.formEncType, i, null), Cu(e, t, "formMethod", i.formMethod, i, null), Cu(e, t, "formTarget", i.formTarget, i, null)) : (Cu(e, t, "encType", i.encType, i, null), Cu(e, t, "method", i.method, i, null), Cu(e, t, "target", i.target, i, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					N(r, n), r = tn("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && yu(n, r), e.onclick = nn);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && yu(n, r), z("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && yu(n, r), z("scrollend", e));
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
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
					N(r, n), n = tn("" + r), e.setAttributeNS(TS, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (N(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || SS[n] || (SS[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
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
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (N(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (N(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (N(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					z("beforetoggle", e), z("toggle", e), tt(e, "popover", r);
					break;
				case "xlinkActuate":
					rt(e, TS, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					rt(e, TS, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					rt(e, TS, "xlink:role", r);
					break;
				case "xlinkShow":
					rt(e, TS, "xlink:show", r);
					break;
				case "xlinkTitle":
					rt(e, TS, "xlink:title", r);
					break;
				case "xlinkType":
					rt(e, TS, "xlink:type", r);
					break;
				case "xmlBase":
					rt(e, ES, "xml:base", r);
					break;
				case "xmlLang":
					rt(e, ES, "xml:lang", r);
					break;
				case "xmlSpace":
					rt(e, ES, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), tt(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": xS || typeof r != "object" || !r || (xS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = Xt(n), tt(e, n, r)) : em.hasOwnProperty(n) && r != null && typeof r != "function" && yu(n, r);
			}
		}
		function wu(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					Jt(e, r, a);
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "children":
					typeof r == "string" ? Gt(e, r) : (typeof r == "number" || typeof r == "bigint") && Gt(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && yu(n, r), z("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && yu(n, r), z("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && yu(n, r), e.onclick = nn);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if (em.hasOwnProperty(n)) r != null && typeof r != "function" && yu(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[Kp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : tt(e, n, r);
				}
			}
		}
		function Tu(e, t, n) {
			switch (gu(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					z("error", e), z("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: Cu(e, t, a, o, n, null);
						}
					}
					i && Cu(e, t, "srcSet", n.srcSet, n, null), r && Cu(e, t, "src", n.src, n, null);
					return;
				case "input":
					Qe("input", n), z("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: Cu(e, t, r, u, n, null);
						}
					}
					dt(e, n), pt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in Qe("select", n), z("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: Cu(e, t, i, s, n, null);
					}
					vt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && _t(e, !!r, n, !0) : _t(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in Qe("textarea", n), z("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: Cu(e, t, o, s, n, null);
					}
					yt(e, n), xt(e, r, i, a);
					return;
				case "option":
					for (c in ht(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: Cu(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					z("beforetoggle", e), z("toggle", e), z("cancel", e), z("close", e);
					break;
				case "iframe":
				case "object":
					z("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < fS.length; r++) z(fS[r], e);
					break;
				case "image":
					z("error", e), z("load", e);
					break;
				case "details":
					z("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": z("error", e), z("load", e);
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
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: Cu(e, t, l, r, n, null);
					}
					return;
				default: if (Yt(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && wu(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && Cu(e, t, s, r, n, null));
		}
		function Eu(e, t, n, r) {
			switch (gu(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || Cu(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								a = p;
								break;
							case "name":
								i = p;
								break;
							case "checked":
								l = p;
								break;
							case "defaultChecked":
								u = p;
								break;
							case "value":
								o = p;
								break;
							case "defaultValue":
								s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && Cu(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || gS || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), !t || r || hS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), hS = !0), ft(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || Cu(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && Cu(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? _t(e, !!t, t ? [] : "", !1) : _t(e, !!t, r, !0)) : _t(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: Cu(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							f = i;
							break;
						case "defaultValue":
							p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && Cu(e, t, o, i, r, a);
					}
					bt(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: Cu(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: Cu(e, t, c, f, r, p);
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
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && Cu(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: Cu(e, t, l, f, r, p);
					}
					return;
				default: if (Yt(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && wu(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || wu(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && Cu(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || Cu(e, t, d, f, r, p);
		}
		function Du(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Ou(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function ku(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Ce(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || Nm.has(a) ? (Ce(o, a), r += i + a.replace(Cm, "-$1").toLowerCase().replace(wm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(Cm, "-$1").toLowerCase().replace(wm, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = xu(r), xu(t) !== r && (n.style = Ou(e)));
			}
		}
		function Au(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (N(r, t), e === "" + r) return;
			}
			_u(t, e, r, a);
		}
		function ju(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			_u(t, e, r, a);
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (N(r, n), e === "" + r) return;
			}
			_u(t, e, r, a);
		}
		function Nu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (N(r, t), e === "" + r)) return;
			}
			_u(t, e, r, a);
		}
		function Pu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (N(r, t), n = tn("" + r), e === n) return;
			}
			_u(t, e, r, a);
		}
		function Fu(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				default: a.add(o[s].name);
			}
			if (Yt(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (em.hasOwnProperty(c)) typeof l != "function" && yu(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || _u("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = bu(e, l), _u(c, o, l, i));
								continue;
							case "style":
								a.delete(c), ku(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = et(e, "class", l), _u("className", o, l, i);
								continue;
							default: r.context === US && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = et(e, c, l), _u(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (em.hasOwnProperty(l)) typeof c != "function" && yu(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || _u("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = bu(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Au(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Au(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), ku(e, c, i);
						continue;
					case "multiple":
						a.delete(l), _u(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), _u(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), _u(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), _u(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Pu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						}
						if (o === DS) {
							a.delete(l.toLowerCase()), _u(l, "function", c, i);
							continue;
						}
						Pu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Pu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Mu(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Mu(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Mu(e, l, l, c, a, i);
						continue;
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
						ju(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (N(c, o), s === "" + c) break a;
							}
							_u(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (N(c, o), s === "" + c)) break a;
							}
							_u(o, s, c, d);
						}
						continue;
					case "rowSpan":
						Nu(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						Nu(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Au(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Au(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Au(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Au(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Au(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Au(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Au(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Au(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Au(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Au(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || SS[l] || (SS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), ju(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = Xt(l), o = !1, r.context === US && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Lm.hasOwnProperty(u) && Lm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, $e(d)) {
							if (u.hasAttribute(d)) u = u.getAttribute(d), N(s, d), s = u === "" + s ? s : u;
							else {
								switch (typeof s) {
									case "function":
									case "symbol": break a;
									case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
								}
								s = s === void 0 ? void 0 : null;
							}
						} else s = void 0;
						o || _u(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && vu(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Iu(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Lu(e) {
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
		function Ru() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Lu(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Lu(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function zu(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Bu(e) {
			switch (e) {
				case Fm: return WS;
				case Pm: return GS;
				default: return US;
			}
		}
		function Vu(e, t) {
			if (e === US) switch (t) {
				case "svg": return WS;
				case "math": return GS;
				default: return US;
			}
			return e === WS && t === "foreignObject" ? US : e;
		}
		function Hu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Uu() {
			var e = window.event;
			return e && e.type === "popstate" ? e !== YS && (YS = e, !0) : (YS = null, !1);
		}
		function Wu() {
			var e = window.event;
			return e && e !== XS ? e.type : null;
		}
		function Gu() {
			var e = window.event;
			return e && e !== XS ? e.timeStamp : -1.1;
		}
		function Ku(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function qu(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function Ju() {}
		function Yu(e, t, n, r) {
			Eu(e, t, n, r), e[Kp] = r;
		}
		function Xu(e) {
			Gt(e, "");
		}
		function Zu(e, t, n) {
			e.nodeValue = n;
		}
		function Qu(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Kp] || null;
				if (t !== null) {
					var n = Ke(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, M(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, M(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function $u(e) {
			return e === "head";
		}
		function ed(e, t) {
			e.removeChild(t);
		}
		function td(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function nd(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) {
					if (n = i.data, n === MS || n === AS) {
						if (r === 0) {
							e.removeChild(i), xf(t);
							return;
						}
						r--;
					} else if (n === jS || n === NS || n === PS || n === FS || n === kS) r++;
					else if (n === IS) Dd(e.ownerDocument.documentElement);
					else if (n === RS) {
						n = e.ownerDocument.head, Dd(n);
						for (var a = n.firstChild; a;) {
							var o = a.nextSibling, s = a.nodeName;
							a[Qp] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
						}
					} else n === LS && Dd(e.ownerDocument.body);
				}
				n = i;
			} while (n);
			xf(t);
		}
		function rd(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
					if (n = r.data, n === MS) {
						if (e === 0) break;
						e--;
					} else n !== jS && n !== NS && n !== PS && n !== FS || e++;
				}
				n = r;
			} while (n);
		}
		function id(e) {
			rd(e, !0);
		}
		function ad(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function od(e) {
			e.nodeValue = "";
		}
		function sd(e) {
			rd(e, !1);
		}
		function cd(e, t) {
			t = t[HS], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function ld(e, t) {
			e.nodeValue = t;
		}
		function ud(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						ud(n), P(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function dd(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) {
					if (t === "input" && e.type === "hidden") {
						N(i.name, "name");
						var a = i.name == null ? null : "" + i.name;
						if (i.type === "hidden" && e.getAttribute("name") === a) return e;
					} else return e;
				} else if (!e[Qp]) switch (t) {
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
				if (e = _d(e.nextSibling), e === null) break;
			}
			return null;
		}
		function fd(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = _d(e.nextSibling), e === null)) return null;
			return e;
		}
		function pd(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = _d(e.nextSibling), e === null)) return null;
			return e;
		}
		function md(e) {
			return e.data === NS || e.data === PS;
		}
		function hd(e) {
			return e.data === FS || e.data === NS && e.ownerDocument.readyState !== VS;
		}
		function gd(e, t) {
			var n = e.ownerDocument;
			if (e.data === PS) e._reactRetry = t;
			else if (e.data !== NS || n.readyState !== VS) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function _d(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === jS || t === FS || t === NS || t === PS || t === kS || t === zS || t === BS) break;
					if (t === MS || t === AS) return null;
				}
			}
			return e;
		}
		function vd(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Du(a.name)] = a.name.toLowerCase() === "style" ? Ou(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === kS ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function yd(e, t, n) {
			return n === null || !0 !== n[OS] ? (e.nodeValue === t ? e = null : (t = xu(t), e = xu(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function bd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === AS) {
						if (t === 0) return _d(e.nextSibling);
						t--;
					} else n !== jS && n !== FS && n !== NS && n !== PS && n !== kS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function xd(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === jS || n === FS || n === NS || n === PS || n === kS) {
						if (t === 0) return e;
						t--;
					} else n !== MS && n !== AS || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function Sd(e) {
			xf(e);
		}
		function Cd(e) {
			xf(e);
		}
		function wd(e) {
			xf(e);
		}
		function Td(e, t, n, r, i) {
			switch (i && Ut(e, r.ancestorInfo), t = zu(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function Ed(e, t, n, r) {
			if (!n[qp] && Ke(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Tu(n, e, t), n[Gp] = r, n[Kp] = t;
		}
		function Dd(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			P(e);
		}
		function Od(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function kd(e, t, n) {
			var r = dC;
			if (r && typeof t == "string" && t) {
				var i = ut(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), lC.has(i) || (lC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Tu(t, "link", e), Ye(t), r.head.appendChild(t)));
			}
		}
		function Ad(e, t, n, r) {
			var i = (i = ep.current) ? Od(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = B(n.href), t = Je(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = B(n.href);
						var a = Je(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: rC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Md(e))) && !a._p && (o.instance = a, o.state.loading = iC | sC), !cC.has(e))) {
							var s = {
								rel: "preload",
								as: "style",
								href: n.href,
								crossOrigin: n.crossOrigin,
								integrity: n.integrity,
								media: n.media,
								hrefLang: n.hrefLang,
								referrerPolicy: n.referrerPolicy
							};
							cC.set(e, s), a || Pd(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + jd(t) + "\n  + " + jd(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + jd(t) + "\n  + " + jd(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Fd(n), t = Je(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function jd(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : gp.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : gp.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : gp.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function B(e) {
			return "href=\"" + ut(e) + "\"";
		}
		function Md(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function Nd(e) {
			return V({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Pd(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = iC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= iC;
			}), t.addEventListener("error", function() {
				return r.loading |= aC;
			}), Tu(t, "link", n), Ye(t), e.head.appendChild(t));
		}
		function Fd(e) {
			return "[src=\"" + ut(e) + "\"]";
		}
		function Id(e) {
			return "script[async]" + e;
		}
		function Ld(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + ut(n.href) + "\"]");
					if (r) return t.instance = r, Ye(r), r;
					var i = V({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), Ye(r), Tu(r, "style", i), Rd(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = B(n.href);
					var a = e.querySelector(Md(i));
					if (a) return t.state.loading |= sC, t.instance = a, Ye(a), a;
					r = Nd(n), (i = cC.get(i)) && zd(r, i), a = (e.ownerDocument || e).createElement("link"), Ye(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Tu(a, "link", r), t.state.loading |= sC, Rd(a, n.precedence, e), t.instance = a;
				case "script": return a = Fd(n.src), (i = e.querySelector(Id(a))) ? (t.instance = i, Ye(i), i) : (r = n, (i = cC.get(a)) && (r = V({}, n), Bd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), Ye(i), Tu(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & sC) === rC && (r = t.instance, t.state.loading |= sC, Rd(r, n.precedence, e));
			return t.instance;
		}
		function Rd(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function zd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Bd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function Vd(e, t, n) {
			if (fC === null) {
				var r = /* @__PURE__ */ new Map(), i = fC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = fC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[Qp] || a[Gp] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Fm) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Hd(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Ud(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === WS || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Iu(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Wd(e) {
			return e.type !== "stylesheet" || (e.state.loading & oC) !== rC;
		}
		function Gd(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & sC) === rC) {
				if (n.instance === null) {
					var i = B(r.href), a = t.querySelector(Md(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = qd.bind(e), t.then(e, e)), n.state.loading |= sC, n.instance = a, Ye(a);
						return;
					}
					a = t.ownerDocument || t, r = Nd(r), (i = cC.get(i)) && zd(r, i), a = a.createElement("link"), Ye(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Tu(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & oC) === rC && (e.count++, n = qd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Kd(e, t) {
			return e.stylesheets && e.count === 0 && Jd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Jd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, pC + t);
				0 < e.imgBytes && gC === 0 && (gC = 125 * Ru() * hC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Jd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > gC ? 50 : mC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function qd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) Jd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function Jd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, vC = /* @__PURE__ */ new Map(), t.forEach(Yd, e), vC = null, qd.call(e));
		}
		function Yd(e, t) {
			if (!(t.state.loading & sC)) {
				var n = vC.get(e);
				if (n) var r = n.get(_C);
				else {
					n = /* @__PURE__ */ new Map(), vC.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(_C, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(_C, i), n.set(o, i), this.count++, r = qd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= sC;
			}
		}
		function Xd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = $S, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ne(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ne(0), this.hiddenUpdates = Ne(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Zd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Xd(e, t, n, o, c, l, u, d, s), t = Ig, !0 === a && (t |= Lg | Rg), t |= K, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = ri(), ii(t), e.pooledCache = t, ii(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, Xi(a), e;
		}
		function Qd(e) {
			return e ? (e = Ng, e) : Ng;
		}
		function $d(e, t, n, r, i, a) {
			if (jp && typeof jp.onScheduleFiberRoot == "function") try {
				jp.onScheduleFiberRoot(Ap, r, n);
			} catch (e) {
				Mp || (Mp = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = Qd(i), r.context === null ? r.context = i : r.pendingContext = i, hp && mp !== null && !EC && (EC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", E(mp) || "Unknown")), r = Qi(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = $i(e, r, t), n !== null && (oi(t, "root.render()", null), tl(n, e, t), ea(n, e, t));
		}
		function ef(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function tf(e, t) {
			ef(e, t), (e = e.alternate) && ef(e, t);
		}
		function nf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = lr(e, 67108864);
				t !== null && tl(t, e, 67108864), tf(e, 67108864);
			}
		}
		function rf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = $c(e);
				t = ze(t);
				var n = lr(e, t);
				n !== null && tl(n, e, t), tf(e, t);
			}
		}
		function af() {
			return mp;
		}
		function of(e, t, n, r) {
			var i = H.T;
			H.T = null;
			var a = qf.p;
			try {
				qf.p = Bp, cf(e, t, n, r);
			} finally {
				qf.p = a, H.T = i;
			}
		}
		function sf(e, t, n, r) {
			var i = H.T;
			H.T = null;
			var a = qf.p;
			try {
				qf.p = Vp, cf(e, t, n, r);
			} finally {
				qf.p = a, H.T = i;
			}
		}
		function cf(e, t, n, r) {
			if (LC) {
				var i = lf(r);
				if (i === null) du(e, t, r, RC, n), ff(e, r);
				else if (mf(i, e, t, n, r)) r.stopPropagation();
				else if (ff(e, r), t & 4 && -1 < KC.indexOf(e)) {
					for (; i !== null;) {
						var a = Ke(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Oe(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Pp(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										Jl(a), (Ub & (Pb | Fb)) === Nb && (yx = xp() + bx, R(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = lr(a, 2), s !== null && tl(s, a, 2), ol(), tf(a, 2);
						}
						if (a = lf(r), a === null && du(e, t, r, RC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else du(e, t, r, null, n);
			}
		}
		function lf(e) {
			return e = rn(e), uf(e);
		}
		function uf(e) {
			if (RC = null, e = Ge(e), e !== null) {
				var t = x(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = te(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return RC = e, null;
		}
		function df(e) {
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
				case "selectstart": return Bp;
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
				case "pointerleave": return Vp;
				case "message": switch (Sp()) {
					case Cp: return Bp;
					case wp: return Vp;
					case Tp:
					case Ep: return Hp;
					case Dp: return Up;
					default: return Hp;
				}
				default: return Hp;
			}
		}
		function ff(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					BC = null;
					break;
				case "dragenter":
				case "dragleave":
					VC = null;
					break;
				case "mouseover":
				case "mouseout":
					HC = null;
					break;
				case "pointerover":
				case "pointerout":
					UC.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": WC.delete(t.pointerId);
			}
		}
		function pf(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = Ke(t), t !== null && nf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function mf(e, t, n, r, i) {
			switch (t) {
				case "focusin": return BC = pf(BC, e, t, n, r, i), !0;
				case "dragenter": return VC = pf(VC, e, t, n, r, i), !0;
				case "mouseover": return HC = pf(HC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return UC.set(a, pf(UC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, WC.set(a, pf(WC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function hf(e) {
			var t = Ge(e.target);
			if (t !== null) {
				var n = x(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, We(e.priority, function() {
								rf(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, We(e.priority, function() {
								rf(n);
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
		function gf(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = lf(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					Ym !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Ym = i, n.target.dispatchEvent(r), Ym === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Ym = null;
				} else return t = Ke(n), t !== null && nf(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function _f(e, t, n) {
			gf(e) && n.delete(t);
		}
		function vf() {
			zC = !1, BC !== null && gf(BC) && (BC = null), VC !== null && gf(VC) && (VC = null), HC !== null && gf(HC) && (HC = null), UC.forEach(_f), WC.forEach(_f);
		}
		function yf(e, t) {
			e.blockedOn === t && (e.blockedOn = null, zC || (zC = !0, Ef.unstable_scheduleCallback(Ef.unstable_NormalPriority, vf)));
		}
		function bf(e) {
			qC !== e && (qC = e, Ef.unstable_scheduleCallback(Ef.unstable_NormalPriority, function() {
				qC === e && (qC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (uf(r || n) === null) continue;
						break;
					}
					var a = Ke(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), Mo(a, n, r, i));
				}
			}));
		}
		function xf(e) {
			function t(t) {
				return yf(t, e);
			}
			BC !== null && yf(BC, e), VC !== null && yf(VC, e), HC !== null && yf(HC, e), UC.forEach(t), WC.forEach(t);
			for (var n = 0; n < GC.length; n++) {
				var r = GC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < GC.length && (n = GC[0], n.blockedOn === null);) hf(n), n.blockedOn === null && GC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Kp] || null;
				if (typeof a == "function") o || bf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Kp] || null) s = o.formAction;
						else if (uf(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), bf(n);
				}
			}
		}
		function Sf() {
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
		function Cf(e) {
			this._internalRoot = e;
		}
		function wf(e) {
			this._internalRoot = e;
		}
		function Tf(e) {
			e[qp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var Ef = m(), Df = d(), Of = _(), V = Object.assign, kf = Symbol.for("react.element"), Af = Symbol.for("react.transitional.element"), jf = Symbol.for("react.portal"), Mf = Symbol.for("react.fragment"), Nf = Symbol.for("react.strict_mode"), Pf = Symbol.for("react.profiler"), Ff = Symbol.for("react.consumer"), If = Symbol.for("react.context"), Lf = Symbol.for("react.forward_ref"), Rf = Symbol.for("react.suspense"), zf = Symbol.for("react.suspense_list"), Bf = Symbol.for("react.memo"), Vf = Symbol.for("react.lazy"), Hf = Symbol.for("react.activity"), Uf = Symbol.for("react.memo_cache_sentinel"), Wf = Symbol.iterator, Gf = Symbol.for("react.client.reference"), Kf = Array.isArray, H = Df.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, qf = Of.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Jf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), Yf = [], Xf = [], Zf = -1, Qf = D(null), $f = D(null), ep = D(null), tp = D(null), np = 0, rp, ip, ap, op, sp, cp, lp;
		ce.__reactDisabledLog = !0;
		var up, dp, fp = !1, pp = new (typeof WeakMap == "function" ? WeakMap : Map)(), mp = null, hp = !1, gp = Object.prototype.hasOwnProperty, _p = Ef.unstable_scheduleCallback, vp = Ef.unstable_cancelCallback, yp = Ef.unstable_shouldYield, bp = Ef.unstable_requestPaint, xp = Ef.unstable_now, Sp = Ef.unstable_getCurrentPriorityLevel, Cp = Ef.unstable_ImmediatePriority, wp = Ef.unstable_UserBlockingPriority, Tp = Ef.unstable_NormalPriority, Ep = Ef.unstable_LowPriority, Dp = Ef.unstable_IdlePriority, Op = Ef.log, kp = Ef.unstable_setDisableYieldValue, Ap = null, jp = null, Mp = !1, Np = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Pp = Math.clz32 ? Math.clz32 : De, Fp = Math.log, Ip = Math.LN2, Lp = 256, Rp = 262144, zp = 4194304, Bp = 2, Vp = 8, Hp = 32, Up = 268435456, Wp = Math.random().toString(36).slice(2), Gp = "__reactFiber$" + Wp, Kp = "__reactProps$" + Wp, qp = "__reactContainer$" + Wp, Jp = "__reactEvents$" + Wp, Yp = "__reactListeners$" + Wp, Xp = "__reactHandles$" + Wp, Zp = "__reactResources$" + Wp, Qp = "__reactMarker$" + Wp, $p = /* @__PURE__ */ new Set(), em = {}, tm = {}, nm = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, rm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), im = {}, am = {}, om = /[\n"\\]/g, sm = !1, cm = !1, lm = !1, um = !1, dm = !1, fm = !1, pm = ["value", "defaultValue"], mm = !1, hm = /["'&<>\n\t]|^\s|\s$/, gm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), _m = "applet caption html table td th marquee object template foreignObject desc title".split(" "), vm = _m.concat(["button"]), ym = "dd dt li option optgroup p rp rt".split(" "), bm = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, xm = {}, Sm = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			transition: [
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			wordWrap: ["overflowWrap"]
		}, Cm = /([A-Z])/g, wm = /^ms-/, Tm = /^(?:webkit|moz|o)[A-Z]/, Em = /^-ms-/, Dm = /-(.)/g, Om = /;\s*$/, km = {}, Am = {}, jm = !1, Mm = !1, Nm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Pm = "http://www.w3.org/1998/Math/MathML", Fm = "http://www.w3.org/2000/svg", Im = /* @__PURE__ */ new Map([
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
		]), Lm = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, Rm = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, zm = {}, Bm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Vm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Hm = !1, Um = {}, Wm = /^on./, Gm = /^on[^A-Z]/, Km = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), qm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, Ym = null, Xm = null, Zm = null, Qm = !1, $m = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), eh = !1;
		if ($m) try {
			var th = {};
			Object.defineProperty(th, "passive", { get: function() {
				eh = !0;
			} }), window.addEventListener("test", th, th), window.removeEventListener("test", th, th);
		} catch {
			eh = !1;
		}
		var nh = null, rh = null, ih = null, ah = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, oh = fn(ah), sh = V({}, ah, {
			view: 0,
			detail: 0
		}), ch = fn(sh), lh, uh, dh, fh = V({}, sh, {
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
			getModifierState: mn,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== dh && (dh && e.type === "mousemove" ? (lh = e.screenX - dh.screenX, uh = e.screenY - dh.screenY) : uh = lh = 0, dh = e), lh);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : uh;
			}
		}), ph = fn(fh), mh = fn(V({}, fh, { dataTransfer: 0 })), hh = fn(V({}, sh, { relatedTarget: 0 })), gh = fn(V({}, ah, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), _h = fn(V({}, ah, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), vh = fn(V({}, ah, { data: 0 })), yh = vh, bh = {
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
		}, xh = {
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
		}, Sh = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, Ch = fn(V({}, sh, {
			key: function(e) {
				if (e.key) {
					var t = bh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = ln(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? xh[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: mn,
			charCode: function(e) {
				return e.type === "keypress" ? ln(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? ln(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), wh = fn(V({}, fh, {
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
		})), Th = fn(V({}, sh, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: mn
		})), Eh = fn(V({}, ah, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Dh = fn(V({}, fh, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), Oh = fn(V({}, ah, {
			newState: 0,
			oldState: 0
		})), kh = [
			9,
			13,
			27,
			32
		], Ah = 229, jh = $m && "CompositionEvent" in window, Mh = null;
		$m && "documentMode" in document && (Mh = document.documentMode);
		var Nh = $m && "TextEvent" in window && !Mh, Ph = $m && (!jh || Mh && 8 < Mh && 11 >= Mh), Fh = 32, Ih = String.fromCharCode(Fh), Lh = !1, Rh = !1, zh = {
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
		}, Bh = null, Vh = null, Hh = !1;
		$m && (Hh = bn("input") && (!document.documentMode || 9 < document.documentMode));
		var Uh = typeof Object.is == "function" ? Object.is : jn, Wh = $m && "documentMode" in document && 11 >= document.documentMode, Gh = null, Kh = null, qh = null, Jh = !1, Yh = {
			animationend: zn("Animation", "AnimationEnd"),
			animationiteration: zn("Animation", "AnimationIteration"),
			animationstart: zn("Animation", "AnimationStart"),
			transitionrun: zn("Transition", "TransitionRun"),
			transitionstart: zn("Transition", "TransitionStart"),
			transitioncancel: zn("Transition", "TransitionCancel"),
			transitionend: zn("Transition", "TransitionEnd")
		}, Xh = {}, Zh = {};
		$m && (Zh = document.createElement("div").style, "AnimationEvent" in window || (delete Yh.animationend.animation, delete Yh.animationiteration.animation, delete Yh.animationstart.animation), "TransitionEvent" in window || delete Yh.transitionend.transition);
		var Qh = Bn("animationend"), $h = Bn("animationiteration"), eg = Bn("animationstart"), tg = Bn("transitionrun"), ng = Bn("transitionstart"), rg = Bn("transitioncancel"), ig = Bn("transitionend"), ag = /* @__PURE__ */ new Map(), og = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		og.push("scrollEnd");
		var sg = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var cg = performance, lg = function() {
			return cg.now();
		};
		else {
			var ug = Date;
			lg = function() {
				return ug.now();
			};
		}
		var dg = typeof reportError == "function" ? reportError : function(e) {
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
		}, fg = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", pg = 0, mg = 1, hg = 2, gg = 3, _g = "–\xA0", vg = "+\xA0", yg = " \xA0", bg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", xg = "Components ⚛", U = "Scheduler ⚛", W = "Blocking", Sg = !1, Cg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: xg
		}, wg = {
			start: -0,
			end: -0,
			detail: { devtools: Cg }
		}, Tg = ["Changed Props", ""], Eg = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Dg = ["Changed Props", Eg], Og = 1, kg = 2, Ag = [], jg = 0, Mg = 0, Ng = {};
		Object.freeze(Ng);
		var Pg = null, Fg = null, G = 0, Ig = 1, K = 2, Lg = 8, Rg = 16, zg = 32, Bg = !1;
		try {
			Object.preventExtensions({});
		} catch {
			Bg = !0;
		}
		var Vg = /* @__PURE__ */ new WeakMap(), Hg = [], Ug = 0, Wg = null, Gg = 0, Kg = [], qg = 0, Jg = null, Yg = 1, Xg = "", Zg = null, Qg = null, $g = !1, e_ = !1, t_ = null, n_ = null, r_ = !1, i_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), a_ = D(null), o_ = D(null), s_ = {}, c_ = null, l_ = null, u_ = !1, d_ = typeof AbortController < "u" ? AbortController : function() {
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
		}, f_ = Ef.unstable_scheduleCallback, p_ = Ef.unstable_NormalPriority, m_ = {
			$$typeof: If,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, h_ = Ef.unstable_now, g_ = console.createTask ? console.createTask : function() {
			return null;
		}, __ = 1, v_ = 2, y_ = -0, b_ = -0, x_ = -0, S_ = null, C_ = -1.1, w_ = -0, T_ = -0, q = -1.1, J = -1.1, E_ = null, D_ = !1, O_ = -0, k_ = -1.1, A_ = null, j_ = 0, M_ = null, N_ = null, P_ = -1.1, F_ = null, I_ = -1.1, L_ = -1.1, R_ = -0, z_ = -1.1, B_ = -1.1, V_ = 0, H_ = null, U_ = null, W_ = null, G_ = -1.1, K_ = null, q_ = -1.1, J_ = -1.1, Y_ = -0, X_ = -0, Z_ = 0, Q_ = null, $_ = 0, ev = -1.1, tv = !1, nv = !1, rv = null, iv = 0, av = 0, ov = null, sv = H.S;
		H.S = function(e, t) {
			if (_x = xp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > z_ && 0 > B_) {
					z_ = h_();
					var n = Gu(), r = Wu();
					(n !== q_ || r !== K_) && (q_ = -1.1), G_ = n, K_ = r;
				}
				Ti(e, t);
			}
			sv !== null && sv(e, t);
		};
		var cv = D(null), lv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], gv = /* @__PURE__ */ new Set();
		lv.recordUnsafeLifecycleWarnings = function(e, t) {
			gv.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && uv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillMount == "function" && dv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && fv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillReceiveProps == "function" && pv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && mv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillUpdate == "function" && hv.push(e));
		}, lv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < uv.length && (uv.forEach(function(t) {
				e.add(E(t) || "Component"), gv.add(t.type);
			}), uv = []);
			var t = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(e) {
				t.add(E(e) || "Component"), gv.add(e.type);
			}), dv = []);
			var n = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				n.add(E(e) || "Component"), gv.add(e.type);
			}), fv = []);
			var r = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				r.add(E(e) || "Component"), gv.add(e.type);
			}), pv = []);
			var i = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				i.add(E(e) || "Component"), gv.add(e.type);
			}), mv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < hv.length && (hv.forEach(function(e) {
				a.add(E(e) || "Component"), gv.add(e.type);
			}), hv = []), 0 < t.size) {
				var o = p(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = p(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = p(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = p(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = p(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = p(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var _v = /* @__PURE__ */ new Map(), vv = /* @__PURE__ */ new Set();
		lv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Lg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !vv.has(e.type) && (r = _v.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], _v.set(n, r)), r.push(e));
		}, lv.flushLegacyContextWarning = function() {
			_v.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(E(e) || "Component"), vv.add(e.type);
					});
					var r = p(n);
					M(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, lv.discardPendingWarnings = function() {
			uv = [], dv = [], fv = [], pv = [], mv = [], hv = [], _v = /* @__PURE__ */ new Map();
		};
		var yv = { react_stack_bottom_frame: function(e, t, n) {
			var r = hp;
			hp = !0;
			try {
				return e(t, n);
			} finally {
				hp = r;
			}
		} }, bv = yv.react_stack_bottom_frame.bind(yv), xv = { react_stack_bottom_frame: function(e) {
			var t = hp;
			hp = !0;
			try {
				return e.render();
			} finally {
				hp = t;
			}
		} }, Sv = xv.react_stack_bottom_frame.bind(xv), Cv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Fl(e, e.return, t);
			}
		} }, wv = Cv.react_stack_bottom_frame.bind(Cv), Tv = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Fl(e, e.return, t);
			}
		} }, Ev = Tv.react_stack_bottom_frame.bind(Tv), Dv = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, Ov = Dv.react_stack_bottom_frame.bind(Dv), kv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Fl(e, t, n);
			}
		} }, Av = kv.react_stack_bottom_frame.bind(kv), jv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Mv = jv.react_stack_bottom_frame.bind(jv), Nv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Fl(e, t, n);
			}
		} }, Pv = Nv.react_stack_bottom_frame.bind(Nv), Fv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Iv = Fv.react_stack_bottom_frame.bind(Fv), Lv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), Rv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), zv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Bv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Vv = null, Hv = !1, Uv = null, Wv = 0, Y = null, Gv, Kv = Gv = !1, qv = {}, Jv = {}, Yv = {};
		f = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = E(e), i = r || "null";
				if (!qv[i]) {
					qv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = E(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = E(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), M(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Xv = Ji(!0), Zv = Ji(!1), Qv = 0, $v = 1, ey = 2, ty = 3, ny = !1, ry = !1, iy = null, ay = !1, oy = D(null), sy = D(0), cy = D(null), ly = null, uy = 1, dy = 2, fy = D(0), py = 0, my = 1, hy = 2, gy = 4, _y = 8, vy, yy = /* @__PURE__ */ new Set(), by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = 0, X = null, wy = null, Ty = null, Ey = !1, Dy = !1, Oy = !1, ky = 0, Ay = 0, jy = null, My = 0, Ny = 25, Z = null, Py = null, Fy = -1, Iy = !1, Ly = {
			readContext: ei,
			use: ja,
			useCallback: va,
			useContext: va,
			useEffect: va,
			useImperativeHandle: va,
			useLayoutEffect: va,
			useInsertionEffect: va,
			useMemo: va,
			useReducer: va,
			useRef: va,
			useState: va,
			useDebugValue: va,
			useDeferredValue: va,
			useTransition: va,
			useSyncExternalStore: va,
			useId: va,
			useHostTransitionStatus: va,
			useFormState: va,
			useActionState: va,
			useOptimistic: va,
			useMemoCache: va,
			useCacheRefresh: va
		};
		Ly.useEffectEvent = va;
		var Ry = null, zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null;
		Ry = {
			readContext: function(e) {
				return ei(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), ga(t), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ei(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", F(), ga(t), mo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), ga(n), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", F(), ga(t), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), ga(t), _o(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F(), ga(t);
				var n = H.H;
				H.H = Hy;
				try {
					return Co(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = H.H;
				H.H = Hy;
				try {
					return Pa(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", F(), uo(e);
			},
			useState: function(e) {
				Z = "useState", F();
				var t = H.H;
				H.H = Hy;
				try {
					return Ka(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), zo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", F(), _a(), io(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", F(), io(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", F(), qa(e);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), Bo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), go(e);
			}
		}, zy = {
			readContext: function(e) {
				return ei(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", I(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", I(), ei(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", I(), mo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", I(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", I(), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", I(), _o(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", I();
				var n = H.H;
				H.H = Hy;
				try {
					return Co(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", I();
				var r = H.H;
				H.H = Hy;
				try {
					return Pa(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", I(), uo(e);
			},
			useState: function(e) {
				Z = "useState", I();
				var t = H.H;
				H.H = Hy;
				try {
					return Ka(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", I(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", I(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", I(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", I(), zo();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", I(), io(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", I(), _a(), io(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", I(), qa(e);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), Bo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", I(), go(e);
			}
		}, By = {
			readContext: function(e) {
				return ei(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", I(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", I(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", I(), po(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", I(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", I(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", I(), po(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", I();
				var n = H.H;
				H.H = Uy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", I();
				var r = H.H;
				H.H = Uy;
				try {
					return Fa(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", I(), Oa().memoizedState;
			},
			useState: function() {
				Z = "useState", I();
				var e = H.H;
				H.H = Uy;
				try {
					return Fa(Na);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", I(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", I(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", I(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", I(), Oa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", I(), _a(), ao(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", I(), ao(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", I(), Ja(e, t);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), Oa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", I(), L(e);
			}
		}, Vy = {
			readContext: function(e) {
				return ei(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", I(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", I(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", I(), po(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", I(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", I(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", I(), po(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", I();
				var n = H.H;
				H.H = Wy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", I();
				var r = H.H;
				H.H = Wy;
				try {
					return La(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", I(), Oa().memoizedState;
			},
			useState: function() {
				Z = "useState", I();
				var e = H.H;
				H.H = Wy;
				try {
					return La(Na);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", I(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", I(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", I(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", I(), Oa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", I(), _a(), co(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", I(), co(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", I(), Xa(e, t);
			},
			useHostTransitionStatus: Ro,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), Oa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", I(), L(e);
			}
		}, Hy = {
			readContext: function(e) {
				return l(), ei(e);
			},
			use: function(e) {
				return c(), ja(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), F(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), F(), ei(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", c(), F(), mo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), F(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", c(), F(), fo(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), F(), _o(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), F();
				var n = H.H;
				H.H = Hy;
				try {
					return Co(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), F();
				var r = H.H;
				H.H = Hy;
				try {
					return Pa(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", c(), F(), uo(e);
			},
			useState: function(e) {
				Z = "useState", c(), F();
				var t = H.H;
				H.H = Hy;
				try {
					return Ka(e);
				} finally {
					H.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), F(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), F(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), F(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), F(), zo();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", c(), F(), io(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", c(), F(), io(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", c(), F(), qa(e);
			},
			useMemoCache: function(e) {
				return c(), Ma(e);
			},
			useHostTransitionStatus: Ro,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), Bo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), F(), go(e);
			}
		}, Uy = {
			readContext: function(e) {
				return l(), ei(e);
			},
			use: function(e) {
				return c(), ja(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), I(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), I(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), I(), po(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), I(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), I(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), I(), po(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), I();
				var n = H.H;
				H.H = Uy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), I();
				var r = H.H;
				H.H = Uy;
				try {
					return Fa(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), I(), Oa().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), I();
				var e = H.H;
				H.H = Uy;
				try {
					return Fa(Na);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), I(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), I(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), I(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), I(), Oa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), I(), ao(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), I(), ao(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), I(), Ja(e, t);
			},
			useMemoCache: function(e) {
				return c(), Ma(e);
			},
			useHostTransitionStatus: Ro,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), Oa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), I(), L(e);
			}
		}, Wy = {
			readContext: function(e) {
				return l(), ei(e);
			},
			use: function(e) {
				return c(), ja(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), I(), So(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), I(), ei(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), I(), po(2048, _y, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), I(), bo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), I(), po(4, hy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), I(), po(4, gy, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), I();
				var n = H.H;
				H.H = Uy;
				try {
					return wo(e, t);
				} finally {
					H.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), I();
				var r = H.H;
				H.H = Uy;
				try {
					return La(e, t, n);
				} finally {
					H.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), I(), Oa().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), I();
				var e = H.H;
				H.H = Uy;
				try {
					return La(Na);
				} finally {
					H.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), I();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), I(), Do(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), I(), Lo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), I(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), I(), Oa().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), I(), co(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), I(), co(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), I(), Xa(e, t);
			},
			useMemoCache: function(e) {
				return c(), Ma(e);
			},
			useHostTransitionStatus: Ro,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", I(), Oa().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), I(), L(e);
			}
		};
		var Gy = {}, Ky = /* @__PURE__ */ new Set(), qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set();
		Object.freeze(Gy);
		var nb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = $c(e), i = Qi(r);
				i.payload = t, n != null && (Yo(n), i.callback = n), t = $i(e, i, r), t !== null && (oi(r, "this.setState()", e), tl(t, e, r), ea(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = $c(e), i = Qi(r);
				i.tag = $v, i.payload = t, n != null && (Yo(n), i.callback = n), t = $i(e, i, r), t !== null && (oi(r, "this.replaceState()", e), tl(t, e, r), ea(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = $c(e), r = Qi(n);
				r.tag = ey, t != null && (Yo(t), r.callback = t), t = $i(e, r, n), t !== null && (oi(n, "this.forceUpdate()", e), tl(t, e, n), ea(t, e, n));
			}
		}, rb = null, ib = null, ab = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), ob = !1, sb = {}, cb = {}, lb = {}, ub = {}, db = !1, fb = {}, pb = {}, mb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, hb = !1, gb = null;
		gb = /* @__PURE__ */ new Set();
		var _b = !1, vb = !1, yb = !1, bb = typeof WeakSet == "function" ? WeakSet : Set, xb = null, Sb = null, Cb = null, wb = null, Tb = !1, Eb = null, Db = !1, Ob = 8192, kb = {
			getCacheForType: function(e) {
				var t = ei(m_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return ei(m_).controller.signal;
			},
			getOwner: function() {
				return mp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var Ab = Symbol.for;
			Ab("selector.component"), Ab("selector.has_pseudo_class"), Ab("selector.role"), Ab("selector.test_id"), Ab("selector.text");
		}
		var jb = [], Mb = typeof WeakMap == "function" ? WeakMap : Map, Nb = 0, Pb = 2, Fb = 4, Ib = 0, Lb = 1, Rb = 2, zb = 3, Bb = 4, Vb = 6, Hb = 5, Ub = Nb, Wb = null, Q = null, $ = 0, Gb = 0, Kb = 1, qb = 2, Jb = 3, Yb = 4, Xb = 5, Zb = 6, Qb = 7, $b = 8, ex = 9, tx = Gb, nx = null, rx = !1, ix = !1, ax = !1, ox = 0, sx = Ib, cx = 0, lx = 0, ux = 0, dx = 0, fx = 0, px = null, mx = null, hx = !1, gx = 0, _x = 0, vx = 300, yx = Infinity, bx = 500, xx = null, Sx = null, Cx = null, wx = 0, Tx = 1, Ex = 2, Dx = 3, Ox = 0, kx = 1, Ax = 2, jx = 3, Mx = 4, Nx = 5, Px = 0, Fx = null, Ix = null, Lx = 0, Rx = 0, zx = -0, Bx = null, Vx = null, Hx = null, Ux = wx, Wx = null, Gx = 50, Kx = 0, qx = null, Jx = !1, Yx = !1, Xx = 50, Zx = 0, Qx = null, $x = !1, eS = null, tS = !1, nS = /* @__PURE__ */ new Set(), rS = {}, iS = null, aS = null, oS = !1, sS = !1, cS = !1, lS = !1, uS = 0, dS = {};
		(function() {
			for (var e = 0; e < og.length; e++) {
				var t = og[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Vn(n, "on" + t);
			}
			Vn(Qh, "onAnimationEnd"), Vn($h, "onAnimationIteration"), Vn(eg, "onAnimationStart"), Vn("dblclick", "onDoubleClick"), Vn("focusin", "onFocus"), Vn("focusout", "onBlur"), Vn(tg, "onTransitionRun"), Vn(ng, "onTransitionStart"), Vn(rg, "onTransitionCancel"), Vn(ig, "onTransitionEnd");
		})(), Ze("onMouseEnter", ["mouseout", "mouseover"]), Ze("onMouseLeave", ["mouseout", "mouseover"]), Ze("onPointerEnter", ["pointerout", "pointerover"]), Ze("onPointerLeave", ["pointerout", "pointerover"]), Xe("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Xe("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Xe("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), Xe("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Xe("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Xe("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var fS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), pS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fS)), mS = "_reactListening" + Math.random().toString(36).slice(2), hS = !1, gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = {}, CS = /\r\n?/g, wS = /\u0000|\uFFFD/g, TS = "http://www.w3.org/1999/xlink", ES = "http://www.w3.org/XML/1998/namespace", DS = "javascript:throw new Error('React form unexpectedly submitted.')", OS = "suppressHydrationWarning", kS = "&", AS = "/&", jS = "$", MS = "/$", NS = "$?", PS = "$~", FS = "$!", IS = "html", LS = "body", RS = "head", zS = "F!", BS = "F", VS = "loading", HS = "style", US = 0, WS = 1, GS = 2, KS = null, qS = null, JS = {
			dialog: !0,
			webview: !0
		}, YS = null, XS = void 0, ZS = typeof setTimeout == "function" ? setTimeout : void 0, QS = typeof clearTimeout == "function" ? clearTimeout : void 0, $S = -1, eC = typeof Promise == "function" ? Promise : void 0, tC = typeof queueMicrotask == "function" ? queueMicrotask : eC === void 0 ? ZS : function(e) {
			return eC.resolve(null).then(e).catch(Ku);
		}, nC = null, rC = 0, iC = 1, aC = 2, oC = 3, sC = 4, cC = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set(), uC = qf.d;
		qf.d = {
			f: function() {
				var e = uC.f(), t = ol();
				return e || t;
			},
			r: function(e) {
				var t = Ke(e);
				t !== null && t.tag === 5 && t.type === "form" ? Po(t) : uC.r(e);
			},
			D: function(e) {
				uC.D(e), kd("dns-prefetch", e, null);
			},
			C: function(e, t) {
				uC.C(e, t), kd("preconnect", e, t);
			},
			L: function(e, t, n) {
				uC.L(e, t, n);
				var r = dC;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + ut(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + ut(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + ut(n.imageSizes) + "\"]")) : i += "[href=\"" + ut(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = B(e);
							break;
						case "script": a = Fd(e);
					}
					cC.has(a) || (e = V({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), cC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Md(a)) || t === "script" && r.querySelector(Id(a)) || (t = r.createElement("link"), Tu(t, "link", e), Ye(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				uC.m(e, t);
				var n = dC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + ut(r) + "\"][href=\"" + ut(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Fd(e);
					}
					if (!cC.has(a) && (e = V({
						rel: "modulepreload",
						href: e
					}, t), cC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Id(a))) return;
						}
						r = n.createElement("link"), Tu(r, "link", e), Ye(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				uC.X(e, t);
				var n = dC;
				if (n && e) {
					var r = Je(n).hoistableScripts, i = Fd(e), a = r.get(i);
					a || (a = n.querySelector(Id(i)), a || (e = V({
						src: e,
						async: !0
					}, t), (t = cC.get(i)) && Bd(e, t), a = n.createElement("script"), Ye(a), Tu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				uC.S(e, t, n);
				var r = dC;
				if (r && e) {
					var i = Je(r).hoistableStyles, a = B(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: rC,
							preload: null
						};
						if (o = r.querySelector(Md(a))) s.loading = iC | sC;
						else {
							e = V({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = cC.get(a)) && zd(e, n);
							var c = o = r.createElement("link");
							Ye(c), Tu(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= iC;
							}), c.addEventListener("error", function() {
								s.loading |= aC;
							}), s.loading |= sC, Rd(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				uC.M(e, t);
				var n = dC;
				if (n && e) {
					var r = Je(n).hoistableScripts, i = Fd(e), a = r.get(i);
					a || (a = n.querySelector(Id(i)), a || (e = V({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = cC.get(i)) && Bd(e, t), a = n.createElement("script"), Ye(a), Tu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var dC = typeof document > "u" ? null : document, fC = null, pC = 6e4, mC = 800, hC = 500, gC = 0, _C = null, vC = null, yC = Jf, bC = {
			$$typeof: If,
			Provider: null,
			Consumer: null,
			_currentValue: yC,
			_currentValue2: yC,
			_threadCount: 0
		}, xC = "%c%s%c", SC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", CC = "", wC = " ", TC = Function.prototype.bind, EC = !1, DC = null, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null;
		DC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = V({}, e.memoizedProps), i = lr(e, 2), i !== null && tl(i, e, 2));
		}, OC = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = V({}, e.memoizedProps), r = lr(e, 2), r !== null && tl(r, e, 2));
		}, kC = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = V({}, e.memoizedProps), i = lr(e, 2), i !== null && tl(i, e, 2));
		}, AC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = lr(e, 2), t !== null && tl(t, e, 2);
		}, jC = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = lr(e, 2), t !== null && tl(t, e, 2);
		}, MC = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = lr(e, 2), t !== null && tl(t, e, 2);
		}, NC = function(e) {
			var t = lr(e, 2);
			t !== null && tl(t, e, 2);
		}, PC = function(e) {
			var t = Me(), n = lr(e, t);
			n !== null && tl(n, e, t);
		}, FC = function(e) {
			s = e;
		}, IC = function(e) {
			o = e;
		};
		var LC = !0, RC = null, zC = !1, BC = null, VC = null, HC = null, UC = /* @__PURE__ */ new Map(), WC = /* @__PURE__ */ new Map(), GC = [], KC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), qC = null;
		if (wf.prototype.render = Cf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			$d(r, $c(r), n, t, null, null);
		}, wf.prototype.unmount = Cf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Ub & (Pb | Fb)) !== Nb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $d(e.current, 2, null, e, null, null), ol(), t[qp] = null;
			}
		}, wf.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Ue();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < GC.length && t !== 0 && t < GC[n].priority; n++);
				GC.splice(n, 0, e), n === 0 && hf(e);
			}
		}, (function() {
			var e = Df.version;
			if (e !== "19.2.8") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.8\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), qf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = ne(t), e = e === null ? null : C(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.8",
				rendererPackageName: "react-dom",
				currentDispatcherRef: H,
				reconcilerVersion: "19.2.8"
			};
			return e.overrideHookState = DC, e.overrideHookStateDeletePath = OC, e.overrideHookStateRenamePath = kC, e.overrideProps = AC, e.overridePropsDeletePath = jC, e.overridePropsRenamePath = MC, e.scheduleUpdate = NC, e.scheduleRetry = PC, e.setErrorHandler = FC, e.setSuspenseHandler = IC, e.scheduleRefresh = v, e.scheduleRoot = g, e.setRefreshHandler = y, e.getCurrentFiber = af, Te(e);
		})() && $m && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var JC = window.location.protocol;
			/^(https?|file):$/.test(JC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (JC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Tf(e);
			var n = !1, r = "", i = es, a = ts, o = ns;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Af && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Zd(e, 1, !1, null, null, n, r, null, i, a, o, Sf), e[qp] = t.current, lu(e), new Cf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Tf(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = es, o = ts, s = ns, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Zd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, Sf), t.context = Qd(null), n = t.current, r = $c(n), r = ze(r), i = Qi(r), i.callback = null, $i(n, i, r), oi(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Pe(t, n), Jl(t), e[qp] = t.current, lu(e), new wf(t);
		}, e.version = "19.2.8", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), b = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = v()) : t.exports = y();
})), x = /* @__PURE__ */ c(d(), 1), ee = b(), te = {
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
}, S = /* @__PURE__ */ o(((e) => {
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
})), ne = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === T ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case S: return "Suspense";
				case ne: return "SuspenseList";
				case w: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case ee: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case te:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case C: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case re:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === re) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = E.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (D.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				ie || (ie = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function l() {
			var e = t(this.type);
			return ae[e] || (ae[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function u(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: l
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, d) {
			var f = n.children;
			if (f !== void 0) {
				if (o) {
					if (O(f)) {
						for (o = 0; o < f.length; o++) p(f[o]);
						Object.freeze && Object.freeze(f);
					} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				} else p(f);
			}
			if (D.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", oe[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), oe[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), u(e, f, i, a(), l, d);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === re && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = d(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), w = Symbol.for("react.activity"), T = Symbol.for("react.client.reference"), E = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, O = Array.isArray, k = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var ie, ae = {}, A = h.react_stack_bottom_frame.bind(h, o)(), j = k(i(o)), oe = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : A, r ? k(i(e)) : j);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > E.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : A, r ? k(i(e)) : j);
		};
	})();
})), C = (/* @__PURE__ */ o(((e, t) => {
	t.exports = process.env.NODE_ENV === "production" ? S() : ne();
})))();
function re({ name: e, className: t = "" }) {
	let n = {
		home: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "m4 11 8-6.5 8 6.5" }), /* @__PURE__ */ (0, C.jsx)("path", { d: "M6.5 10v9h11v-9M10 19v-5h4v5" })] }),
		living: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M5 12V9.5a2.5 2.5 0 0 1 5 0V12h4V9.5a2.5 2.5 0 0 1 5 0V12" }), /* @__PURE__ */ (0, C.jsx)("path", { d: "M4 12h16v6H4zM6 18v2M18 18v2" })] }),
		dining: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M7 4v7M4.5 4v4.5A2.5 2.5 0 0 0 7 11v9M9.5 4v4.5A2.5 2.5 0 0 1 7 11" }), /* @__PURE__ */ (0, C.jsx)("path", { d: "M16 4v16M16 4c3 1.5 4 5 0 8" })] }),
		bedroom: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M4 12h16v6H4zM5 12V7h6a3 3 0 0 1 3 3v2M4 18v2M20 18v2" }), /* @__PURE__ */ (0, C.jsx)("path", { d: "M7 9h3" })] }),
		office: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("rect", {
			x: "5",
			y: "5",
			width: "14",
			height: "9",
			rx: "2"
		}), /* @__PURE__ */ (0, C.jsx)("path", { d: "M12 14v3M8 19h8M8 17h8" })] }),
		bath: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM7 19v1M17 19v1" }), /* @__PURE__ */ (0, C.jsx)("path", { d: "M7 11V6a2 2 0 0 1 4 0" })] }),
		outdoor: /* @__PURE__ */ (0, C.jsx)(C.Fragment, { children: /* @__PURE__ */ (0, C.jsx)("path", { d: "M12 4v16M5 9c2-4 5-4 7 0M19 9c-2-4-5-4-7 0M6 14c2-3 4-3 6 0M18 14c-2-3-4-3-6 0" }) }),
		light: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M8 14a6 6 0 1 1 8 0c-1.2.9-1.5 1.7-1.5 2.5h-5C9.5 15.7 9.2 15 8 14Z" }), /* @__PURE__ */ (0, C.jsx)("path", { d: "M9.5 19h5M10.5 21h3" })] }),
		climate: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M7 9h10M9 6h6" }), /* @__PURE__ */ (0, C.jsx)("path", {
			className: "hi-motion",
			d: "M6 14c1.5 0 1.5 2 3 2s1.5-2 3-2 1.5 2 3 2 1.5-2 3-2"
		})] }),
		media: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("rect", {
			x: "4",
			y: "6",
			width: "16",
			height: "12",
			rx: "3"
		}), /* @__PURE__ */ (0, C.jsx)("path", { d: "m10 10 5 2-5 2v-4Z" })] }),
		people: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "9",
				cy: "9",
				r: "3"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "17",
				cy: "10",
				r: "2"
			}),
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M3.5 19c.5-4 10.5-4 11 0M14 16c3-1 6 .5 6.5 3" })
		] }),
		settings: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M5 7h14M5 17h14M5 12h14" }),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "9",
				cy: "7",
				r: "2"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "15",
				cy: "12",
				r: "2"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "11",
				cy: "17",
				r: "2"
			})
		] }),
		more: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "6",
				cy: "6",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "12",
				cy: "6",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "18",
				cy: "6",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "6",
				cy: "12",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "18",
				cy: "12",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "6",
				cy: "18",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "12",
				cy: "18",
				r: "1.5"
			}),
			/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "1.5"
			})
		] }),
		cinema: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("rect", {
			x: "4",
			y: "7",
			width: "16",
			height: "12",
			rx: "3"
		}), /* @__PURE__ */ (0, C.jsx)("path", { d: "m10 11 5 2-5 2v-4ZM6 4l2 3M12 4l2 3M18 4l2 3" })] }),
		away: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "m3.5 11 8-6.5 8 6.5M6 10v9h7" }), /* @__PURE__ */ (0, C.jsx)("path", {
			className: "hi-motion",
			d: "M12 15h8m-3-3 3 3-3 3"
		})] })
	};
	return /* @__PURE__ */ (0, C.jsx)("svg", {
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
function w(e, t) {
	let n = `${e} ${t}`.toLowerCase();
	return /living|סלון/.test(n) ? "living" : /dining|kitchen|מטבח|אוכל/.test(n) ? "dining" : /bed|שינה|אגם|ליעד/.test(n) ? "bedroom" : /office|משרד/.test(n) ? "office" : /bath|מקלחת|אמבט/.test(n) ? "bath" : /out|חוץ|מרפסת|גג/.test(n) ? "outdoor" : "home";
}
//#endregion
//#region src/ui/RoomView.tsx
var T = ({ icon: e }) => x.createElement("ha-icon", { icon: e });
function E({ name: e }) {
	let t = {
		climate: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("path", { d: "M7 10.5h10M9 7.5h6M10.5 4.5h3" }), /* @__PURE__ */ (0, C.jsx)("path", {
			className: "glyph-motion",
			d: "M8 14c1.4 0 1.4 2 2.8 2s1.4-2 2.8-2 1.4 2 2.8 2"
		})] }),
		ceiling: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M5 11h14L16 6H8l-3 5Z" }),
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M8 14c1.5 1.4 2.8 2 4 2s2.5-.6 4-2" }),
			/* @__PURE__ */ (0, C.jsx)("path", {
				className: "glyph-glow",
				d: "M7 19h10"
			})
		] }),
		floor: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M12 4v15M8 20h8" }),
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M8 5h8l-2 6h-4L8 5Z" }),
			/* @__PURE__ */ (0, C.jsx)("path", {
				className: "glyph-glow",
				d: "M9.5 13.5h5"
			})
		] }),
		lamp: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M7 12h10l-2-7H9l-2 7Z" }),
			/* @__PURE__ */ (0, C.jsx)("path", { d: "M12 12v7M8.5 20h7" }),
			/* @__PURE__ */ (0, C.jsx)("path", {
				className: "glyph-glow",
				d: "M9 14.5h6"
			})
		] }),
		ambient: /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsx)("rect", {
			x: "4",
			y: "5",
			width: "16",
			height: "12",
			rx: "3"
		}), /* @__PURE__ */ (0, C.jsx)("path", {
			className: "glyph-glow",
			d: "M8 20h8M8 10h8"
		})] }),
		media: /* @__PURE__ */ (0, C.jsx)(C.Fragment, { children: /* @__PURE__ */ (0, C.jsx)("path", { d: "M5 9v6M9 6v12M13 4v16M17 7v10M21 10v4" }) })
	};
	return /* @__PURE__ */ (0, C.jsx)("svg", {
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
var D = (e, t) => t ? e?.states[t] : void 0, O = (e, t = 0) => typeof e == "number" ? e : Number(e) || t, k = (e) => !!(e && !["unknown", "unavailable"].includes(e.state));
function ie({ room: e, definition: t, areaEntities: n, hass: r, isAdmin: i, intent: a, onHome: o }) {
	let [s, c] = (0, x.useState)(a === "cinema" && t.media ? "media" : t.climate ? "climate" : "lights"), [l, u] = (0, x.useState)(null), [d, f] = (0, x.useState)(!1), [p, m] = (0, x.useState)(0), [h, g] = (0, x.useState)(!1), [_, v] = (0, x.useState)(null), [y, b] = (0, x.useState)([]), [ee, te] = (0, x.useState)(() => {
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
	}), [S, ne] = (0, x.useState)(() => {
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
	}), w = (0, x.useRef)(void 0), O = (e, t = "working") => {
		window.clearTimeout(w.current), u({
			message: e,
			tone: t
		}), w.current = window.setTimeout(() => u(null), t === "error" ? 3600 : 1900);
	};
	(0, x.useEffect)(() => () => window.clearTimeout(w.current), []), (0, x.useEffect)(() => {
		a === "cinema" && t.media && c("media"), a === "climate" && t.climate && c("climate");
	}, [
		a,
		t.climate,
		t.media
	]);
	let ie = D(r, t.temperature), A = D(r, t.humidity), j = D(r, t.climate), pe = n || {
		light: t.lights.map((e) => e.entity),
		climate: t.climate ? [t.climate] : [],
		media_player: t.media ? [t.media] : [],
		security: [],
		person: []
	}, me = pe.light.filter((e) => D(r, e)?.state === "on").length;
	pe.climate.filter((e) => {
		let t = D(r, e);
		return k(t) && t?.state !== "off";
	}).length, pe.media_player.filter((e) => [
		"playing",
		"paused",
		"buffering"
	].includes(D(r, e)?.state || "")).length;
	let he = pe.security.filter((e) => {
		let t = D(r, e), n = e.split(".", 1)[0], i = String(t?.attributes.device_class || "");
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
	}), ge = Math.max(1, Math.ceil(t.lights.length / 9)), _e = t.lights.slice(p * 9, (p + 1) * 9), ve = new Set(ee), M = (t) => {
		let n = ee.includes(t) ? ee.filter((e) => e !== t) : [...ee, t];
		te(n), localStorage.setItem(`homeii-status-${e.id}`, JSON.stringify(n));
	}, ye = (t) => {
		let n = S.includes(t) ? S.filter((e) => e !== t) : [...S, t];
		ne(n), localStorage.setItem(`homeii-zones-${e.id}`, JSON.stringify(n));
	}, be = async (e) => {
		O(`מפעיל אווירת ${e.name}`);
		try {
			await r?.callService("scene", "turn_on", {}, { entity_id: e.entity }), O(`אווירת ${e.name} הופעלה`, "success");
		} catch {
			O(`הפעלת ${e.name} נכשלה`, "error");
		}
	};
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: `room-view ${a ? `intent-${a}` : ""}`,
		children: [
			/* @__PURE__ */ (0, C.jsxs)("header", {
				className: "room-hero",
				children: [
					/* @__PURE__ */ (0, C.jsx)("div", { className: "room-hero-shade" }),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "room-hero-actions",
						children: [/* @__PURE__ */ (0, C.jsxs)("button", {
							className: "room-back glass-soft",
							onClick: o,
							children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:arrow-right" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "מסך הבית" })]
						}), i && /* @__PURE__ */ (0, C.jsx)("button", {
							className: "room-status-settings glass-soft",
							onClick: () => g((e) => !e),
							"aria-label": "הגדרת החדר",
							children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:tune-variant" })
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "room-identity",
						children: [/* @__PURE__ */ (0, C.jsx)("h1", { children: e.name }), /* @__PURE__ */ (0, C.jsx)("p", { children: e.subtitle })]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "room-metrics glass-soft",
						children: [/* @__PURE__ */ (0, C.jsx)(ae, {
							icon: "mdi:thermometer",
							value: ie?.state || String(j?.attributes.current_temperature ?? "—"),
							suffix: "°"
						}), /* @__PURE__ */ (0, C.jsx)(ae, {
							icon: "mdi:water-percent",
							value: A?.state || "—",
							suffix: "%"
						})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: `room-flow-launcher ${d ? "open" : ""}`,
						children: [/* @__PURE__ */ (0, C.jsxs)("button", {
							className: "room-flow-trigger glass-soft",
							onClick: () => f((e) => !e),
							children: [
								/* @__PURE__ */ (0, C.jsx)(re, { name: "cinema" }),
								/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEii Flow" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: "מה עושים בחדר?" })] }),
								/* @__PURE__ */ (0, C.jsx)(T, { icon: d ? "mdi:chevron-up" : "mdi:chevron-down" })
							]
						}), d && /* @__PURE__ */ (0, C.jsxs)("nav", {
							className: "room-flow glass-soft",
							"aria-label": "פעולות בחדר",
							children: [
								t.media && /* @__PURE__ */ (0, C.jsxs)("button", {
									onClick: () => {
										c("media"), f(!1);
									},
									children: [/* @__PURE__ */ (0, C.jsx)(re, { name: "cinema" }), /* @__PURE__ */ (0, C.jsx)("b", { children: "צפייה" })]
								}),
								t.climate && /* @__PURE__ */ (0, C.jsxs)("button", {
									onClick: () => {
										c("climate"), f(!1);
									},
									children: [/* @__PURE__ */ (0, C.jsx)(re, { name: "climate" }), /* @__PURE__ */ (0, C.jsx)("b", { children: "נוחות" })]
								}),
								/* @__PURE__ */ (0, C.jsxs)("button", {
									onClick: () => {
										c("lights"), f(!1);
									},
									children: [/* @__PURE__ */ (0, C.jsx)(re, { name: "light" }), /* @__PURE__ */ (0, C.jsx)("b", { children: "תאורה" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, C.jsx)(oe, {
						domains: ve,
						entities: pe,
						securityEntities: he,
						hass: r,
						onOpen: (e, t) => {
							v(e), b(t);
						}
					}),
					h && /* @__PURE__ */ (0, C.jsxs)("div", {
						className: "room-status-config glass",
						children: [/* @__PURE__ */ (0, C.jsxs)("section", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: "מה יוצג ב־Status?" }), [
							["light", "תאורה"],
							["climate", "אקלים"],
							["media_player", "מדיה"],
							["security", "ביטחון"]
						].map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: t }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "checkbox",
							checked: ee.includes(e),
							onChange: () => M(e)
						})] }, e))] }), /* @__PURE__ */ (0, C.jsxs)("section", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: "דומיינים בבורר החדר" }), [
							["lights", "תאורה"],
							["climate", "אקלים"],
							["media", "מדיה"],
							["security", "ביטחון"],
							["scenes", "אווירה"]
						].map(([e, t]) => /* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: t }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "checkbox",
							checked: S.includes(e),
							onChange: () => ye(e)
						})] }, e))] })]
					})
				]
			}),
			l && /* @__PURE__ */ (0, C.jsxs)("div", {
				className: `feedback-island ${l.tone}`,
				role: "status",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, C.jsx)("span", {
					className: "feedback-symbol",
					children: l.tone === "working" ? /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
						/* @__PURE__ */ (0, C.jsx)("i", {}),
						/* @__PURE__ */ (0, C.jsx)("i", {}),
						/* @__PURE__ */ (0, C.jsx)("i", {})
					] }) : /* @__PURE__ */ (0, C.jsx)(T, { icon: l.tone === "success" ? "mdi:check" : "mdi:alert-circle-outline" })
				}), /* @__PURE__ */ (0, C.jsx)("strong", { children: l.message })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("nav", {
				className: "room-zones glass-soft",
				"aria-label": "אזורי שליטה בחדר",
				children: [
					S.includes("lights") && /* @__PURE__ */ (0, C.jsxs)("button", {
						className: s === "lights" ? "active" : "",
						onClick: () => c("lights"),
						children: [/* @__PURE__ */ (0, C.jsx)(E, { name: "ceiling" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "תאורה" })]
					}),
					S.includes("climate") && t.climate && /* @__PURE__ */ (0, C.jsxs)("button", {
						className: s === "climate" ? "active" : "",
						onClick: () => c("climate"),
						children: [/* @__PURE__ */ (0, C.jsx)(E, { name: "climate" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "אקלים" })]
					}),
					S.includes("media") && t.media && /* @__PURE__ */ (0, C.jsxs)("button", {
						className: s === "media" ? "active" : "",
						onClick: () => c("media"),
						children: [/* @__PURE__ */ (0, C.jsx)(E, { name: "media" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "מדיה" })]
					}),
					S.includes("security") && !!he.length && /* @__PURE__ */ (0, C.jsxs)("button", {
						className: s === "security" ? "active" : "",
						onClick: () => c("security"),
						children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:shield-home-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "ביטחון" })]
					}),
					S.includes("scenes") && !!t.scenes?.length && /* @__PURE__ */ (0, C.jsxs)("button", {
						className: s === "scenes" ? "active" : "",
						onClick: () => c("scenes"),
						children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:creation-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "אווירה" })]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: `room-layout zone-${s}`,
				children: [
					t.climate && /* @__PURE__ */ (0, C.jsx)("div", {
						className: `room-zone room-zone-climate ${s === "climate" ? "selected" : ""}`,
						children: /* @__PURE__ */ (0, C.jsx)(le, {
							entityId: t.climate,
							temperatureEntity: t.temperature,
							hass: r,
							onFeedback: O
						})
					}),
					/* @__PURE__ */ (0, C.jsxs)("section", {
						className: `room-zone room-zone-lights device-panel glass ${s === "lights" ? "selected" : ""}`,
						children: [
							/* @__PURE__ */ (0, C.jsxs)("header", {
								className: "widget-heading",
								children: [
									/* @__PURE__ */ (0, C.jsx)("span", {
										className: "widget-glyph light-widget-glyph",
										children: /* @__PURE__ */ (0, C.jsx)(E, { name: "ceiling" })
									}),
									/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "תאורה בחדר" }), /* @__PURE__ */ (0, C.jsx)("h2", { children: me ? `${me} מוקדים פעילים` : "כל התאורה כבויה" })] }),
									/* @__PURE__ */ (0, C.jsxs)("span", {
										className: `state-pill ${me ? "active" : "off"}`,
										children: [/* @__PURE__ */ (0, C.jsx)("i", {}), me ? "פעילה" : "כבויה"]
									})
								]
							}),
							/* @__PURE__ */ (0, C.jsx)("div", {
								className: "light-grid",
								children: _e.map((e) => /* @__PURE__ */ (0, C.jsx)(ue, {
									device: e,
									hass: r,
									onFeedback: O
								}, e.entity))
							}),
							ge > 1 && /* @__PURE__ */ (0, C.jsxs)("nav", {
								className: "widget-pagination",
								"aria-label": "עמודי תאורה",
								children: [
									/* @__PURE__ */ (0, C.jsx)("button", {
										disabled: p === 0,
										onClick: () => m((e) => e - 1),
										children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:chevron-right" })
									}),
									/* @__PURE__ */ (0, C.jsxs)("span", { children: [
										p + 1,
										" / ",
										ge
									] }),
									/* @__PURE__ */ (0, C.jsx)("button", {
										disabled: p >= ge - 1,
										onClick: () => m((e) => e + 1),
										children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:chevron-left" })
									})
								]
							})
						]
					}),
					!!t.curtains?.length && /* @__PURE__ */ (0, C.jsxs)("section", {
						className: "curtain-panel glass",
						children: [/* @__PURE__ */ (0, C.jsx)(ce, {
							title: "וילונות",
							subtitle: "שליטה חזותית במצב הפתיחה",
							icon: "mdi:curtains"
						}), t.curtains.map((e) => /* @__PURE__ */ (0, C.jsx)(de, {
							device: e,
							hass: r
						}, e.entity))]
					}),
					t.media && /* @__PURE__ */ (0, C.jsx)("div", {
						className: `room-zone room-zone-media ${s === "media" ? "selected" : ""}`,
						children: /* @__PURE__ */ (0, C.jsx)(fe, {
							entityId: t.media,
							hass: r,
							onFeedback: O
						})
					}),
					!!he.length && /* @__PURE__ */ (0, C.jsxs)("section", {
						className: `room-zone room-zone-security security-panel glass ${s === "security" ? "selected" : ""}`,
						children: [/* @__PURE__ */ (0, C.jsx)(ce, {
							title: "ביטחון",
							subtitle: "חיישנים ומצב האזור",
							icon: "mdi:shield-home-outline"
						}), /* @__PURE__ */ (0, C.jsx)("div", {
							className: "security-grid",
							children: he.slice(0, 9).map((e) => {
								let t = D(r, e), n = k(t) && ![
									"off",
									"closed",
									"locked",
									"idle",
									"standby"
								].includes(t?.state || "");
								return /* @__PURE__ */ (0, C.jsxs)("article", {
									className: n ? "alert" : "safe",
									children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: n ? "mdi:alert-circle-outline" : "mdi:check-circle-outline" }), /* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: String(t?.attributes.friendly_name || e) }), /* @__PURE__ */ (0, C.jsx)("small", { children: k(t) ? n ? "דורש בדיקה" : "תקין" : "לא זמין" })] })]
								}, e);
							})
						})]
					}),
					!!t.scenes?.length && /* @__PURE__ */ (0, C.jsxs)("section", {
						className: `room-zone room-zone-scenes scene-panel glass ${s === "scenes" ? "selected" : ""}`,
						children: [/* @__PURE__ */ (0, C.jsx)(ce, {
							title: "אווירה",
							subtitle: "סצנות מוכנות בלחיצה אחת",
							icon: "mdi:creation-outline"
						}), /* @__PURE__ */ (0, C.jsx)("div", {
							className: "scene-row",
							children: t.scenes.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
								onClick: () => be(e),
								children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: e.icon }), /* @__PURE__ */ (0, C.jsx)("span", { children: e.name })]
							}, e.entity))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)(se, {
				domain: _,
				ids: y,
				hass: r,
				onClose: () => v(null)
			})
		]
	});
}
function ae({ icon: e, value: t, suffix: n }) {
	return /* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: e }), /* @__PURE__ */ (0, C.jsxs)("strong", { children: [t, t === "—" ? "" : n] })] });
}
var A = {
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
function j(e, t) {
	return k(t) ? e === "light" ? t?.state === "on" : e === "climate" ? t?.state !== "off" : e === "media_player" ? [
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
function oe({ domains: e, entities: t, securityEntities: n, hass: r, onOpen: i }) {
	return /* @__PURE__ */ (0, C.jsx)("div", {
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
			let o = a.filter((t) => j(e, D(r, t))), s = A[e];
			return /* @__PURE__ */ (0, C.jsxs)("button", {
				className: `status-card status-${e} ${o.length ? "active" : "idle"}`,
				onClick: () => i(e, o),
				children: [
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "status-card-icon",
						children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: s.icon }), /* @__PURE__ */ (0, C.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: s.label }), /* @__PURE__ */ (0, C.jsx)("strong", { children: o.length ? `${o.length} ${s.active}` : s.empty })] }),
					/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:chevron-left" })
				]
			}, e);
		})
	});
}
function se({ domain: e, ids: t, hass: n, onClose: r }) {
	if (!e) return null;
	let i = A[e];
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "status-dialog-layer",
		onMouseDown: (e) => e.target === e.currentTarget && r(),
		children: /* @__PURE__ */ (0, C.jsxs)("section", {
			className: `status-dialog status-${e}`,
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ (0, C.jsxs)("header", { children: [
				/* @__PURE__ */ (0, C.jsx)("span", {
					className: "status-dialog-icon",
					children: /* @__PURE__ */ (0, C.jsx)(T, { icon: i.icon })
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "פעיל כעת בחדר" }), /* @__PURE__ */ (0, C.jsx)("h2", { children: i.label })] }),
				/* @__PURE__ */ (0, C.jsx)("button", {
					onClick: r,
					"aria-label": "סגירה",
					children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:close" })
				})
			] }), /* @__PURE__ */ (0, C.jsx)("div", {
				className: "status-entity-list",
				children: t.length ? t.map((e) => {
					let t = D(n, e);
					return /* @__PURE__ */ (0, C.jsxs)("article", {
						className: "active",
						children: [
							/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(T, { icon: i.icon }) }),
							/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: String(t?.attributes.friendly_name || e) }), /* @__PURE__ */ (0, C.jsx)("small", { children: "פעיל עכשיו" })] }),
							/* @__PURE__ */ (0, C.jsx)("button", {
								onClick: () => n?.callService("homeassistant", "toggle", {}, { entity_id: e }),
								"aria-label": "שינוי מצב",
								children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:power" })
							})
						]
					}, e);
				}) : /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "status-empty",
					children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:check-circle-outline" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: i.empty })]
				})
			})]
		})
	});
}
function ce({ title: e, subtitle: t, icon: n }) {
	return /* @__PURE__ */ (0, C.jsxs)("header", {
		className: "panel-title",
		children: [/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(T, { icon: n }) }), /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: e }), /* @__PURE__ */ (0, C.jsx)("p", { children: t })] })]
	});
}
function le({ entityId: e, temperatureEntity: t, hass: n, onFeedback: r }) {
	let i = D(n, e), a = O(i?.attributes.temperature, 24), o = O(i?.attributes.current_temperature, a), s = O(i?.attributes.min_temp, 16), c = O(i?.attributes.max_temp, 30), l = k(i) && i?.state !== "off", u = String(i?.attributes.hvac_action || (l ? "idle" : "off")), d = u === "cooling" ? "cool" : u === "heating" ? "heat" : u === "drying" ? "dry" : u === "fan" ? "fan_only" : i?.state || "off", f = ge(u, i?.state || "off"), p = M(n, t || e, !!t), m = Array.isArray(i?.attributes.hvac_modes) ? i.attributes.hvac_modes : [
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
		r(`מעביר למצב ${pe(t)}`);
		try {
			await n?.callService("climate", "set_hvac_mode", { hvac_mode: t }, { entity_id: e }), r(`מצב ${pe(t)} הופעל`, "success");
		} catch {
			r("שינוי מצב המזגן נכשל", "error");
		}
	}, _ = Math.max(0, Math.min(1, (a - s) / (c - s))), v = Math.max(0, Math.min(1, (o - s) / (c - s)));
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: `thermostat widget-shell glass mode-${d} action-${u} ${l ? "active" : ""}`,
		children: [
			/* @__PURE__ */ (0, C.jsxs)("header", {
				className: "widget-heading",
				children: [
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "widget-glyph",
						children: /* @__PURE__ */ (0, C.jsx)(T, { icon: me(d) })
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "אקלים בחדר" }), /* @__PURE__ */ (0, C.jsx)("h2", { children: f })] }),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: `state-pill ${l ? "active" : "off"}`,
						children: [/* @__PURE__ */ (0, C.jsx)("i", {}), l ? pe(i?.state || "") : "כבוי"]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "thermostat-stage",
				style: {
					"--thermo-progress": `${_ * 360}deg`,
					"--current-progress": `${v * 360}deg`
				},
				children: [
					/* @__PURE__ */ (0, C.jsx)("i", { className: "temperature-ring target-ring" }),
					/* @__PURE__ */ (0, C.jsx)("i", { className: "temperature-ring current-ring" }),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "airflow",
						children: [
							/* @__PURE__ */ (0, C.jsx)("i", {}),
							/* @__PURE__ */ (0, C.jsx)("i", {}),
							/* @__PURE__ */ (0, C.jsx)("i", {})
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "thermostat-dial",
						children: [
							/* @__PURE__ */ (0, C.jsx)("small", { children: "בחדר" }),
							/* @__PURE__ */ (0, C.jsxs)("strong", { children: [o.toFixed(1), "°"] }),
							/* @__PURE__ */ (0, C.jsxs)("span", {
								className: "target-label",
								children: ["יעד ", /* @__PURE__ */ (0, C.jsxs)("b", { children: [a.toFixed(1), "°"] })]
							}),
							/* @__PURE__ */ (0, C.jsx)("span", { children: _e(o, a) })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)(ye, { values: p }),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "temperature-stepper",
				children: [
					/* @__PURE__ */ (0, C.jsx)("button", {
						"aria-label": "הורדת טמפרטורה",
						disabled: !k(i) || a <= s,
						onClick: () => h(a - .5),
						children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:minus" })
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						s,
						"°—",
						c,
						"°"
					] }),
					/* @__PURE__ */ (0, C.jsx)("button", {
						"aria-label": "העלאת טמפרטורה",
						disabled: !k(i) || a >= c,
						onClick: () => h(a + .5),
						children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:plus" })
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)("div", {
				className: "mode-row",
				children: m.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
					className: i?.state === e ? "active" : "",
					onClick: () => g(e),
					children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: me(e) }), /* @__PURE__ */ (0, C.jsx)("span", { children: pe(e) })]
				}, e))
			})
		]
	});
}
function ue({ device: e, hass: t, onFeedback: n }) {
	let r = D(t, e.entity), i = r?.state === "on", a = Math.round(O(r?.attributes.brightness, i ? 255 : 0) / 2.55), o = (Array.isArray(r?.attributes.supported_color_modes) ? r.attributes.supported_color_modes : []).some((e) => e !== "onoff") || typeof r?.attributes.brightness == "number", [s, c] = (0, x.useState)(null), [l, u] = (0, x.useState)(null), d = (0, x.useRef)({
		startX: 0,
		moved: !1
	}), f = s ?? i, p = l ?? (s === !0 && !i ? 100 : a);
	(0, x.useEffect)(() => {
		c(null), u(null);
	}, [r?.state, r?.attributes.brightness]);
	let m = async () => {
		if (!(!t || !k(r))) {
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
	return /* @__PURE__ */ (0, C.jsxs)("article", {
		className: `light-control ${f ? "active" : ""} ${o ? "dimmable" : "binary"}`,
		style: {
			"--light-level": p / 100,
			"--light-percent": `${p}%`
		},
		onPointerDown: (e) => {
			!o || !k(r) || (d.current = {
				startX: e.clientX,
				moved: !1
			}, e.currentTarget.setPointerCapture(e.pointerId));
		},
		onPointerMove: (e) => {
			!o || !e.currentTarget.hasPointerCapture(e.pointerId) || (Math.abs(e.clientX - d.current.startX) > 5 && (d.current.moved = !0), d.current.moved && (c(!0), u(h(e))));
		},
		onPointerUp: async (i) => {
			if (!o || !k(r) || !d.current.moved) return m();
			let a = h(i);
			c(!0), u(a), n(`${e.name} · ${a}%`);
			try {
				await t?.callService("light", "turn_on", { brightness_pct: a }, { entity_id: e.entity }), n(`עוצמת ${e.name} עודכנה`, "success");
			} catch {
				c(null), u(null), n(`עדכון ${e.name} נכשל`, "error");
			}
		},
		children: [/* @__PURE__ */ (0, C.jsxs)("button", {
			className: "light-main",
			onClick: (e) => {
				e.preventDefault();
			},
			disabled: !k(r),
			"aria-pressed": f,
			children: [
				/* @__PURE__ */ (0, C.jsx)("span", {
					className: "light-orb",
					children: /* @__PURE__ */ (0, C.jsx)(E, { name: he(e) })
				}),
				/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, C.jsx)("small", { children: k(r) ? f ? o ? `פעילה · ${p}%` : "פעילה" : "כבויה" : "לא זמין" })] }),
				/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:power" })
			]
		}), o && /* @__PURE__ */ (0, C.jsxs)("div", {
			className: "swipe-hint",
			children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "החלק לעמעום" }), /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:gesture-swipe-horizontal" })]
		})]
	});
}
function de({ device: e, hass: t }) {
	let n = D(t, e.entity), r = n?.state === "on";
	return /* @__PURE__ */ (0, C.jsxs)("button", {
		className: `curtain-control ${r ? "open" : "closed"}`,
		disabled: !k(n),
		onClick: () => t?.callService("homeassistant", "toggle", {}, { entity_id: e.entity }),
		children: [
			/* @__PURE__ */ (0, C.jsxs)("span", {
				className: "curtain-window",
				children: [
					/* @__PURE__ */ (0, C.jsx)("i", {}),
					/* @__PURE__ */ (0, C.jsx)("i", {}),
					/* @__PURE__ */ (0, C.jsx)("b", { children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:weather-sunny" }) })
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, C.jsx)("small", { children: k(n) ? r ? "פתוח" : "סגור" : "לא זמין" })] }),
			/* @__PURE__ */ (0, C.jsx)(T, { icon: r ? "mdi:curtains" : "mdi:curtains-closed" })
		]
	});
}
function fe({ entityId: e, hass: t, onFeedback: n }) {
	let r = D(t, e), i = r?.state === "playing", a = String(r?.attributes.media_title || r?.attributes.friendly_name || "נגן מדיה"), o = String(r?.attributes.media_artist || (k(r) ? r?.state : "לא זמין")), s = typeof r?.attributes.entity_picture == "string" ? r.attributes.entity_picture : "", c = O(r?.attributes.media_position, 0), l = O(r?.attributes.media_duration, 0), u = l > 0 ? Math.min(100, c / l * 100) : 0, d = Math.round(O(r?.attributes.volume_level, 0) * 100), f = async (r, i) => {
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
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: `media-control widget-shell glass media-${r?.state || "unavailable"} ${i ? "playing" : ""}`,
		children: [
			/* @__PURE__ */ (0, C.jsxs)("header", {
				className: "widget-heading",
				children: [
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "widget-glyph",
						children: /* @__PURE__ */ (0, C.jsx)(E, { name: "media" })
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "מדיה בחדר" }), /* @__PURE__ */ (0, C.jsx)("h2", { children: i ? "מתנגן עכשיו" : r?.state === "paused" ? "הנגינה מושהית" : r?.state === "off" ? "הנגן כבוי" : "הנגן מוכן" })] }),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: `state-pill ${i ? "active" : "off"}`,
						children: [/* @__PURE__ */ (0, C.jsx)("i", {}), i ? "מנגן" : r?.state === "paused" ? "מושהה" : "לא פעיל"]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "now-playing",
				children: [
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "album-art",
						style: s ? { backgroundImage: `linear-gradient(rgba(4,7,12,.05),rgba(4,7,12,.18)),url(${s})` } : void 0,
						children: !s && /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:music" })
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: a }), /* @__PURE__ */ (0, C.jsx)("small", { children: o })] }),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "equalizer",
						children: [
							/* @__PURE__ */ (0, C.jsx)("i", {}),
							/* @__PURE__ */ (0, C.jsx)("i", {}),
							/* @__PURE__ */ (0, C.jsx)("i", {}),
							/* @__PURE__ */ (0, C.jsx)("i", {})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)("div", {
				className: "media-progress",
				"aria-label": "התקדמות הנגינה",
				children: /* @__PURE__ */ (0, C.jsx)("i", { style: { width: `${u}%` } })
			}),
			l > 0 && /* @__PURE__ */ (0, C.jsxs)("div", {
				className: "media-times",
				children: [/* @__PURE__ */ (0, C.jsx)("span", { children: ve(c) }), /* @__PURE__ */ (0, C.jsx)("span", { children: ve(l) })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "transport",
				children: [
					/* @__PURE__ */ (0, C.jsx)("button", {
						onClick: () => f("media_previous_track", "חוזר לרצועה הקודמת"),
						children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:skip-previous" })
					}),
					/* @__PURE__ */ (0, C.jsx)("button", {
						className: "play",
						onClick: () => f("media_play_pause", i ? "משהה את הנגינה" : "מתחיל לנגן"),
						children: /* @__PURE__ */ (0, C.jsx)(T, { icon: i ? "mdi:pause" : "mdi:play" })
					}),
					/* @__PURE__ */ (0, C.jsx)("button", {
						onClick: () => f("media_next_track", "עובר לרצועה הבאה"),
						children: /* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:skip-next" })
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("label", {
				className: "volume-control",
				children: [
					/* @__PURE__ */ (0, C.jsx)(T, { icon: d === 0 ? "mdi:volume-off" : "mdi:volume-high" }),
					/* @__PURE__ */ (0, C.jsx)("input", {
						type: "range",
						min: "0",
						max: "100",
						value: d,
						disabled: !k(r),
						onChange: (e) => p(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, C.jsxs)("strong", { children: [d, "%"] })
				]
			})
		]
	});
}
function pe(e) {
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
function me(e) {
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
function he(e) {
	let t = `${e.entity} ${e.name}`.toLowerCase();
	return t.includes("floor") || t.includes("רצפה") ? "floor" : t.includes("tv") || t.includes("screen") || t.includes("מסך") || t.includes("וילון") ? "ambient" : t.includes("ceiling") || t.includes("תקרה") || t.includes("ראשית") || t.includes("מרכז") ? "ceiling" : "lamp";
}
function ge(e, t) {
	return {
		cooling: "מקרר עכשיו",
		heating: "מחמם עכשיו",
		drying: "מייבש את האוויר",
		fan: "מאוורר את החדר",
		idle: t === "off" ? "המזגן כבוי" : "ממתין לטמפרטורת היעד",
		off: "המזגן כבוי"
	}[e] || pe(t);
}
function _e(e, t) {
	let n = e - t;
	return Math.abs(n) < .2 ? "בדיוק ביעד" : `${Math.abs(n).toFixed(1)}° ${n > 0 ? "מעל היעד" : "מתחת ליעד"}`;
}
function ve(e) {
	let t = Math.max(0, Math.floor(e));
	return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function M(e, t, n) {
	let [r, i] = (0, x.useState)([]);
	return (0, x.useEffect)(() => {
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
function ye({ values: e }) {
	if (e.length < 2) return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "temperature-history empty",
		children: [/* @__PURE__ */ (0, C.jsx)(T, { icon: "mdi:chart-line" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "גרף הטמפרטורה יופיע כשנתוני ההיסטוריה זמינים" })]
	});
	let t = Math.min(...e), n = Math.max(...e), r = Math.max(.5, n - t), i = e.map((n, i) => `${i / (e.length - 1) * 100},${32 - (n - t) / r * 26}`).join(" ");
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "temperature-history",
		children: [/* @__PURE__ */ (0, C.jsxs)("header", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "6 שעות אחרונות" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: e.at(-1) >= e[0] ? "מגמת עלייה" : "מגמת ירידה" })] }), /* @__PURE__ */ (0, C.jsxs)("svg", {
			viewBox: "0 0 100 36",
			preserveAspectRatio: "none",
			role: "img",
			"aria-label": "גרף טמפרטורה בשש השעות האחרונות",
			children: [
				/* @__PURE__ */ (0, C.jsx)("defs", { children: /* @__PURE__ */ (0, C.jsxs)("linearGradient", {
					id: "temp-area",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, C.jsx)("stop", {
						offset: "0",
						stopColor: "var(--mode-color)",
						stopOpacity: ".34"
					}), /* @__PURE__ */ (0, C.jsx)("stop", {
						offset: "1",
						stopColor: "var(--mode-color)",
						stopOpacity: "0"
					})]
				}) }),
				/* @__PURE__ */ (0, C.jsx)("polygon", {
					points: `0,36 ${i} 100,36`,
					fill: "url(#temp-area)"
				}),
				/* @__PURE__ */ (0, C.jsx)("polyline", {
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
var be = ({ icon: e }) => x.createElement("ha-icon", { icon: e }), xe = (e) => e.split(".", 1)[0], Se = (e) => String(e.attributes.friendly_name || e.entity_id), N = (e) => !["unknown", "unavailable"].includes(e.state), Ce = (e, t) => Object.values(e?.states || {}).filter((e) => t.includes(xe(e.entity_id)) && N(e)), we = (e) => window.dispatchEvent(new CustomEvent("hass-more-info", {
	detail: { entityId: e },
	bubbles: !0,
	composed: !0
})), Te = (e, t = "info") => window.dispatchEvent(new CustomEvent("homeii-feedback", { detail: {
	message: e,
	type: t
} }));
async function Ee(e, t, n, r, i) {
	if (!e) {
		Te("אין חיבור ל־Home Assistant", "error");
		return;
	}
	Te("מבצע פעולה…");
	try {
		await e.callService(t, n, r, { entity_id: i }), Te("הפעולה בוצעה", "success");
	} catch {
		Te("הפעולה נכשלה", "error");
	}
}
var De = class extends x.Component {
	state = { failed: !1 };
	static getDerivedStateFromError() {
		return { failed: !0 };
	}
	componentDidCatch(e) {
		console.error("HOMEii widget failed", e);
	}
	render() {
		return this.state.failed ? /* @__PURE__ */ (0, C.jsx)(Ae, {
			icon: "mdi:alert-circle-outline",
			text: "הרכיב לא הצליח להיטען"
		}) : this.props.children;
	}
};
function Oe({ item: e, hass: t, legacyDashboardPath: n, cameraSelection: r, onHome: i }) {
	let a = ke(e, t, n, r);
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: `special-view special-${e.id}`,
		children: [/* @__PURE__ */ (0, C.jsxs)("header", {
			className: "special-header glass",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("button", {
					className: "special-back",
					onClick: i,
					children: [/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:arrow-right" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "מסך הבית" })]
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEii Collection" }), /* @__PURE__ */ (0, C.jsx)("h1", { children: e.name })] }),
				/* @__PURE__ */ (0, C.jsx)("span", {
					className: "special-title-icon",
					children: /* @__PURE__ */ (0, C.jsx)(be, { icon: e.icon })
				})
			]
		}), /* @__PURE__ */ (0, C.jsx)("div", {
			className: "special-content",
			children: /* @__PURE__ */ (0, C.jsx)(De, { children: a })
		})]
	});
}
function ke(e, t, n, r) {
	return e.id === "security" ? /* @__PURE__ */ (0, C.jsx)(je, {
		hass: t,
		cameraSelection: r
	}) : e.id === "intercom" ? /* @__PURE__ */ (0, C.jsx)(Be, { hass: t }) : e.id === "weather" ? /* @__PURE__ */ (0, C.jsx)(Ne, { hass: t }) : e.id === "power" ? /* @__PURE__ */ (0, C.jsx)(Pe, {
		item: e,
		legacyPath: n
	}) : e.id === "vacuum" ? /* @__PURE__ */ (0, C.jsx)(Ie, { hass: t }) : e.id === "lights" ? /* @__PURE__ */ (0, C.jsx)(Le, { hass: t }) : e.id === "resources" ? /* @__PURE__ */ (0, C.jsx)(ze, { hass: t }) : e.id === "media" ? /* @__PURE__ */ (0, C.jsx)(Fe, { hass: t }) : ["media-players", "advanced-media"].includes(e.id) ? /* @__PURE__ */ (0, C.jsx)(Re, { hass: t }) : /* @__PURE__ */ (0, C.jsx)("section", {
		className: "legacy-widget glass",
		children: /* @__PURE__ */ (0, C.jsx)("iframe", {
			title: e.name,
			src: `${n}/${e.legacyPath}?kiosk`,
			allow: "autoplay; fullscreen; microphone"
		})
	});
}
function Ae({ icon: e, text: t }) {
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "special-empty glass",
		children: [
			/* @__PURE__ */ (0, C.jsx)(be, { icon: e }),
			/* @__PURE__ */ (0, C.jsx)("strong", { children: t }),
			/* @__PURE__ */ (0, C.jsx)("small", { children: "הכרטיס יופיע אוטומטית כשישות מתאימה תהיה זמינה ב־HA" })
		]
	});
}
function je({ hass: e, cameraSelection: t }) {
	let n = [
		"camera.intercom",
		"camera.entrance",
		"camera.a8105_e_0"
	], r = Ce(e, ["camera"]), i = [...n.filter((t) => e?.states[t]), ...r.map((e) => e.entity_id).filter((e) => !n.includes(e))], a = t == null ? i : t.filter((t) => e?.states[t]);
	return a.length ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "camera-grid",
		children: a.map((t) => /* @__PURE__ */ (0, C.jsx)(Me, {
			entityId: t,
			hass: e
		}, t))
	}) : /* @__PURE__ */ (0, C.jsx)(Ae, {
		icon: "mdi:cctv",
		text: "לא נבחרו מצלמות להצגה"
	});
}
function Me({ entityId: e, hass: t }) {
	let n = (0, x.useRef)(null);
	return (0, x.useEffect)(() => {
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
	}, [e, t]), /* @__PURE__ */ (0, C.jsx)("article", {
		className: "camera-card advanced-camera-shell glass",
		children: x.createElement("advanced-camera-card", { ref: n })
	});
}
function Ne({ hass: e }) {
	let t = Ce(e, ["weather"])[0];
	if (!t) return /* @__PURE__ */ (0, C.jsx)(Ae, {
		icon: "mdi:weather-partly-cloudy",
		text: "אין נתוני מזג אוויר"
	});
	let n = Array.isArray(t.attributes.forecast) ? t.attributes.forecast.slice(0, 5) : [];
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "weather-layout",
		children: [/* @__PURE__ */ (0, C.jsxs)("article", {
			className: "weather-now glass",
			children: [
				/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:weather-partly-cloudy" }),
				/* @__PURE__ */ (0, C.jsxs)("div", { children: [
					/* @__PURE__ */ (0, C.jsx)("small", { children: Se(t) }),
					/* @__PURE__ */ (0, C.jsxs)("strong", { children: [String(t.attributes.temperature ?? "—"), "°"] }),
					/* @__PURE__ */ (0, C.jsx)("span", { children: t.state })
				] }),
				/* @__PURE__ */ (0, C.jsxs)("dl", { children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("dt", { children: "לחות" }), /* @__PURE__ */ (0, C.jsxs)("dd", { children: [String(t.attributes.humidity ?? "—"), "%"] })] }), /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("dt", { children: "רוח" }), /* @__PURE__ */ (0, C.jsx)("dd", { children: String(t.attributes.wind_speed ?? "—") })] })] })
			]
		}), /* @__PURE__ */ (0, C.jsx)("section", {
			className: "forecast-strip glass",
			children: n.length ? n.map((e, t) => /* @__PURE__ */ (0, C.jsxs)("article", { children: [
				/* @__PURE__ */ (0, C.jsx)("small", { children: new Date(String(e.datetime)).toLocaleDateString("he-IL", { weekday: "short" }) }),
				/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:weather-partly-cloudy" }),
				/* @__PURE__ */ (0, C.jsxs)("strong", { children: [String(e.temperature ?? "—"), "°"] })
			] }, t)) : /* @__PURE__ */ (0, C.jsx)("span", { children: "תחזית תוצג כאשר האינטגרציה תספק נתונים" })
		})]
	});
}
function Pe({ item: e, legacyPath: t }) {
	return /* @__PURE__ */ (0, C.jsx)("section", {
		className: "legacy-widget energy-legacy glass",
		children: /* @__PURE__ */ (0, C.jsx)("iframe", {
			title: e.name,
			src: `${t}/${e.legacyPath}?kiosk`,
			allow: "fullscreen"
		})
	});
}
function Fe({ hass: e }) {
	let t = (0, x.useRef)(null);
	return (0, x.useEffect)(() => {
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
	}, [e]), /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "music-flow-host glass",
		children: [/* @__PURE__ */ (0, C.jsxs)("div", {
			className: "music-flow-intro",
			children: [
				/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:waveform" }) }),
				/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEii" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: "MUSIC FLOW" })] }),
				/* @__PURE__ */ (0, C.jsx)("i", {})
			]
		}), x.createElement("homeii-music-flow", { ref: t })]
	});
}
function Ie({ hass: e }) {
	let t = Ce(e, ["vacuum"]);
	return t.length ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "device-widget-grid",
		children: t.map((t) => {
			let n = ["cleaning", "returning"].includes(t.state);
			return /* @__PURE__ */ (0, C.jsxs)("article", {
				className: `vacuum-widget glass ${n ? "active" : ""}`,
				children: [
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "vacuum-orbit",
						children: [/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:robot-vacuum" }), /* @__PURE__ */ (0, C.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, C.jsx)("h2", { children: Se(t) }),
					/* @__PURE__ */ (0, C.jsx)("p", { children: n ? "מנקה עכשיו" : t.state === "docked" ? "בעמדת הטעינה" : t.state }),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "widget-actions",
						children: [
							/* @__PURE__ */ (0, C.jsxs)("button", {
								onClick: () => Ee(e, "vacuum", "start", {}, t.entity_id),
								children: [/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:play" }), "ניקוי"]
							}),
							/* @__PURE__ */ (0, C.jsxs)("button", {
								onClick: () => Ee(e, "vacuum", "pause", {}, t.entity_id),
								children: [/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:pause" }), "השהיה"]
							}),
							/* @__PURE__ */ (0, C.jsxs)("button", {
								onClick: () => Ee(e, "vacuum", "return_to_base", {}, t.entity_id),
								children: [/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:home-map-marker" }), "חזרה"]
							})
						]
					})
				]
			}, t.entity_id);
		})
	}) : /* @__PURE__ */ (0, C.jsx)(Ae, {
		icon: "mdi:robot-vacuum",
		text: "לא נמצא שואב"
	});
}
function Le({ hass: e }) {
	let t = Ce(e, ["light"]);
	return t.length ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "special-entity-grid",
		children: t.map((t) => {
			let n = t.state === "on", r = Math.round(Number(t.attributes.brightness || 0) / 2.55);
			return /* @__PURE__ */ (0, C.jsxs)("article", {
				className: `entity-widget glass ${n ? "active" : ""}`,
				children: [/* @__PURE__ */ (0, C.jsxs)("button", {
					className: "entity-main",
					onClick: () => Ee(e, "light", n ? "turn_off" : "turn_on", {}, t.entity_id),
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:lightbulb" }) }),
						/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: Se(t) }), /* @__PURE__ */ (0, C.jsx)("small", { children: n ? `${r || 100}% · דולקת` : "כבויה" })] }),
						/* @__PURE__ */ (0, C.jsx)("i", {})
					]
				}), n && t.attributes.brightness !== void 0 && /* @__PURE__ */ (0, C.jsx)("input", {
					"aria-label": `עוצמת ${Se(t)}`,
					type: "range",
					min: "1",
					max: "100",
					value: r || 1,
					onChange: (n) => Ee(e, "light", "turn_on", { brightness_pct: Number(n.target.value) }, t.entity_id)
				})]
			}, t.entity_id);
		})
	}) : /* @__PURE__ */ (0, C.jsx)(Ae, {
		icon: "mdi:lightbulb-group",
		text: "לא נמצאה תאורה"
	});
}
function Re({ hass: e }) {
	let t = Ce(e, ["media_player"]);
	return t.length ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "media-widget-grid",
		children: t.map((t) => {
			let n = t.state === "playing";
			return /* @__PURE__ */ (0, C.jsxs)("article", {
				className: `media-widget glass ${n ? "active" : ""}`,
				children: [
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "media-cover",
						style: t.attributes.entity_picture ? { backgroundImage: `url(${String(t.attributes.entity_picture)})` } : void 0,
						children: /* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:music-note" })
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "media-meta",
						children: [
							/* @__PURE__ */ (0, C.jsx)("small", { children: Se(t) }),
							/* @__PURE__ */ (0, C.jsx)("strong", { children: String(t.attributes.media_title || t.state) }),
							/* @__PURE__ */ (0, C.jsx)("span", { children: String(t.attributes.media_artist || "") })
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "media-buttons",
						children: [
							/* @__PURE__ */ (0, C.jsx)("button", {
								onClick: () => Ee(e, "media_player", "media_previous_track", {}, t.entity_id),
								children: /* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:skip-previous" })
							}),
							/* @__PURE__ */ (0, C.jsx)("button", {
								className: "primary",
								onClick: () => Ee(e, "media_player", "media_play_pause", {}, t.entity_id),
								children: /* @__PURE__ */ (0, C.jsx)(be, { icon: n ? "mdi:pause" : "mdi:play" })
							}),
							/* @__PURE__ */ (0, C.jsx)("button", {
								onClick: () => Ee(e, "media_player", "media_next_track", {}, t.entity_id),
								children: /* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:skip-next" })
							})
						]
					})
				]
			}, t.entity_id);
		})
	}) : /* @__PURE__ */ (0, C.jsx)(Ae, {
		icon: "mdi:speaker-multiple",
		text: "לא נמצאו נגני מדיה"
	});
}
function ze({ hass: e }) {
	let t = /(processor|memory|disk|cpu|storage|uptime|temperature)/i, n = Ce(e, ["sensor", "update"]).filter((e) => t.test(`${e.entity_id} ${e.attributes.friendly_name || ""} ${e.attributes.device_class || ""}`)).slice(0, 12);
	return n.length ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "resource-grid",
		children: n.map((e) => /* @__PURE__ */ (0, C.jsxs)("article", {
			className: "resource-row glass",
			onClick: () => we(e.entity_id),
			children: [
				/* @__PURE__ */ (0, C.jsx)(be, { icon: xe(e.entity_id) === "update" ? "mdi:update" : "mdi:memory" }),
				/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: Se(e) }), /* @__PURE__ */ (0, C.jsx)("small", { children: xe(e.entity_id) === "update" ? "רכיב מערכת" : "מדד חי" })] }),
				/* @__PURE__ */ (0, C.jsxs)("b", { children: [
					e.state,
					" ",
					String(e.attributes.unit_of_measurement || "")
				] })
			]
		}, e.entity_id))
	}) : /* @__PURE__ */ (0, C.jsx)(Ae, {
		icon: "mdi:cpu-64-bit",
		text: "לא נמצאו חיישני מערכת"
	});
}
function Be({ hass: e }) {
	let t = [
		"camera.intercom",
		"camera.entrance",
		"sensor.intercom_person_count",
		"binary_sensor.intercom_motion"
	], n = [...t.map((t) => e?.states[t]).filter(Boolean), ...Object.values(e?.states || {}).filter((e) => /(doorbell|intercom|כניסה|פעמון)/i.test(`${e.entity_id} ${e.attributes.friendly_name || ""}`) && !t.includes(e.entity_id))], r = n.filter((e) => xe(e.entity_id) === "camera");
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "intercom-layout",
		children: [r.length ? /* @__PURE__ */ (0, C.jsx)(je, { hass: {
			...e,
			states: Object.fromEntries(r.map((e) => [e.entity_id, e]))
		} }) : /* @__PURE__ */ (0, C.jsx)(Ae, {
			icon: "mdi:doorbell-video",
			text: "לא נמצאה מצלמת אינטרקום"
		}), /* @__PURE__ */ (0, C.jsx)("div", {
			className: "resource-grid",
			children: n.filter((e) => xe(e.entity_id) !== "camera").slice(0, 8).map((e) => /* @__PURE__ */ (0, C.jsxs)("article", {
				className: "resource-row glass",
				onClick: () => we(e.entity_id),
				children: [
					/* @__PURE__ */ (0, C.jsx)(be, { icon: "mdi:doorbell-video" }),
					/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: Se(e) }), /* @__PURE__ */ (0, C.jsx)("small", { children: "אינטרקום" })] }),
					/* @__PURE__ */ (0, C.jsx)("b", { children: e.state })
				]
			}, e.entity_id))
		})]
	});
}
//#endregion
//#region src/ui/ControlCenter.tsx
var Ve = ({ icon: e }) => x.createElement("ha-icon", { icon: e }), He = [
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
], Ue = (e, t) => String(e?.attributes.friendly_name || t);
function We({ hass: e, rooms: t, roomEntities: n, hiddenByRoom: r, cameraSelection: i, onHiddenChange: a, onCameraChange: o }) {
	let [s, c] = (0, x.useState)(t[0]?.id || ""), [l, u] = (0, x.useState)("rooms"), [d, f] = (0, x.useState)(""), p = t.find((e) => e.id === s), m = new Set(r[s] || []), h = Object.keys(e?.states || {}).filter((e) => e.startsWith("camera.")), g = new Set(i === null ? h : i), _ = Object.values(e?.states || {}).filter((e) => ["unknown", "unavailable"].includes(e.state)).length, v = (t) => !d.trim() || `${t} ${Ue(e?.states[t], t)}`.toLocaleLowerCase("he").includes(d.trim().toLocaleLowerCase("he")), y = (e) => {
		let t = new Set(m);
		t.has(e) ? t.delete(e) : t.add(e), a(s, [...t]);
	}, b = (e) => {
		let t = new Set(g);
		t.has(e) ? t.delete(e) : t.add(e), o([...t]);
	};
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "control-center",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("header", {
				className: "control-center-title",
				children: [/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:tune-vertical-variant" }) }), /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEii Control Center" }), /* @__PURE__ */ (0, C.jsx)("h3", { children: "ניהול תוכן" })] })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "control-center-tabs",
				children: [/* @__PURE__ */ (0, C.jsxs)("button", {
					className: l === "rooms" ? "selected" : "",
					onClick: () => u("rooms"),
					children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:floor-plan" }), "חדרים"]
				}), /* @__PURE__ */ (0, C.jsxs)("button", {
					className: l === "cameras" ? "selected" : "",
					onClick: () => u("cameras"),
					children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:cctv" }), "מצלמות"]
				})]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "manager-health",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: e ? "healthy" : "issue",
						children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: e ? "mdi:check-network-outline" : "mdi:lan-disconnect" }), /* @__PURE__ */ (0, C.jsx)("b", { children: e ? "HA מחובר" : "מנותק" })]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: _ ? "warning" : "healthy",
						children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:heart-pulse" }), /* @__PURE__ */ (0, C.jsxs)("b", { children: [_, " לא זמינות"] })]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:home-map-marker" }), /* @__PURE__ */ (0, C.jsxs)("b", { children: [t.length, " חדרים"] })] })
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("label", {
				className: "manager-search",
				children: [
					/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:magnify" }),
					/* @__PURE__ */ (0, C.jsx)("input", {
						value: d,
						onChange: (e) => f(e.target.value),
						placeholder: "חיפוש ישות בשם או Entity ID"
					}),
					/* @__PURE__ */ (0, C.jsx)("button", {
						onClick: () => f(""),
						"aria-label": "ניקוי",
						children: /* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:close" })
					})
				]
			}),
			l === "rooms" ? /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [
				/* @__PURE__ */ (0, C.jsx)("div", {
					className: "room-picker",
					"aria-label": "בחירת חדר",
					children: t.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
						className: e.id === s ? "selected" : "",
						onClick: () => c(e.id),
						children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: e.icon }), /* @__PURE__ */ (0, C.jsx)("span", { children: e.name })]
					}, e.id))
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "manager-summary",
					children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: p?.name }), /* @__PURE__ */ (0, C.jsxs)("small", { children: [Object.values(n[s] || {}).flat().length - m.size, " ישויות מוצגות"] })] }), /* @__PURE__ */ (0, C.jsx)("button", {
						onClick: () => a(s, []),
						children: "הצג הכול"
					})]
				}),
				/* @__PURE__ */ (0, C.jsx)("div", {
					className: "manager-groups",
					children: He.map((t) => {
						let r = n[s]?.[t.id] || [], i = r.filter(v);
						return i.length ? /* @__PURE__ */ (0, C.jsxs)("section", { children: [/* @__PURE__ */ (0, C.jsxs)("header", { children: [
							/* @__PURE__ */ (0, C.jsx)(Ve, { icon: t.icon }),
							/* @__PURE__ */ (0, C.jsx)("strong", { children: t.label }),
							/* @__PURE__ */ (0, C.jsxs)("small", { children: [
								r.filter((e) => !m.has(e)).length,
								"/",
								r.length
							] }),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "group-bulk",
								children: [/* @__PURE__ */ (0, C.jsx)("button", {
									onClick: () => a(s, [...m].filter((e) => !r.includes(e))),
									"aria-label": `הצגת כל ${t.label}`,
									children: /* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:eye-outline" })
								}), /* @__PURE__ */ (0, C.jsx)("button", {
									onClick: () => a(s, [.../* @__PURE__ */ new Set([...m, ...r])]),
									"aria-label": `הסתרת כל ${t.label}`,
									children: /* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:eye-off-outline" })
								})]
							})
						] }), /* @__PURE__ */ (0, C.jsx)("div", { children: i.map((t) => /* @__PURE__ */ (0, C.jsxs)("label", {
							className: m.has(t) ? "disabled" : "enabled",
							children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: Ue(e?.states[t], t) }), /* @__PURE__ */ (0, C.jsx)("small", { children: t })] }), /* @__PURE__ */ (0, C.jsx)("input", {
								type: "checkbox",
								checked: !m.has(t),
								onChange: () => y(t)
							})]
						}, t)) })] }, t.id) : null;
					})
				})
			] }) : /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "manager-summary",
				children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: "מצלמות בפאנל" }), /* @__PURE__ */ (0, C.jsxs)("small", { children: [
					g.size,
					" מתוך ",
					h.length,
					" מוצגות"
				] })] }), /* @__PURE__ */ (0, C.jsx)("button", {
					onClick: () => o(h),
					children: "הצג הכול"
				})]
			}), /* @__PURE__ */ (0, C.jsx)("div", {
				className: "camera-picker",
				children: h.length ? h.filter(v).map((t) => /* @__PURE__ */ (0, C.jsxs)("label", {
					className: g.has(t) ? "enabled" : "disabled",
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", {
							className: "camera-picker-icon",
							children: /* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:cctv" })
						}),
						/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: Ue(e?.states[t], t) }), /* @__PURE__ */ (0, C.jsx)("small", { children: t })] }),
						/* @__PURE__ */ (0, C.jsx)("input", {
							type: "checkbox",
							checked: g.has(t),
							onChange: () => b(t)
						})
					]
				}, t)) : /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "manager-empty",
					children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:camera-off-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "לא נמצאו ישויות camera ב־HA" })]
				})
			})] }),
			/* @__PURE__ */ (0, C.jsxs)("p", {
				className: "manager-note",
				children: [/* @__PURE__ */ (0, C.jsx)(Ve, { icon: "mdi:shield-lock-outline" }), "ההגדרות זמינות למנהל בלבד ומוחלות מיד על HOMEii."]
			})
		]
	});
}
//#endregion
//#region src/ui/HomeOSApp.tsx
var P = ({ icon: e }) => x.createElement("ha-icon", { icon: e });
function Ge(e) {
	return e < 5 ? "לילה טוב" : e < 12 ? "בוקר טוב" : e < 17 ? "צהריים טובים" : e < 21 ? "ערב טוב" : "לילה טוב";
}
function Ke(e, t) {
	return t ? e?.states[t] : void 0;
}
function qe(e, t = "") {
	return !e || ["unknown", "unavailable"].includes(e.state) ? "—" : `${e.state}${t}`;
}
async function Je() {
	try {
		let e = location.pathname.includes("/api/hassio_ingress/"), t = location.port === "5173" ? "/config.json" : e ? "./assets/config.json" : "/local/homeiios-app/config.json", n = await fetch(`${t}?t=${Date.now()}`, { cache: "no-store" });
		if (!n.ok) throw Error(String(n.status));
		let r = await n.json();
		if (e) {
			let e = (e) => e.replace(/^\/local\/homeiios(?:-app)?\//, "./assets/");
			r.branding.logo = e(r.branding.logo), Object.keys(r.backgrounds).forEach((t) => r.backgrounds[t] = e(r.backgrounds[t])), Object.keys(r.timeBackgrounds).forEach((t) => r.timeBackgrounds[t] = e(r.timeBackgrounds[t])), r.backgroundPresets.forEach((t) => t.image = e(t.image));
		}
		return {
			...te,
			...r
		};
	} catch {
		return te;
	}
}
function Ye({ hass: e, narrow: t }) {
	let [n, r] = (0, x.useState)(te), [i, a] = (0, x.useState)(null), [o, s] = (0, x.useState)(/* @__PURE__ */ new Date()), [c, l] = (0, x.useState)(!1), [u, d] = (0, x.useState)("home"), [f, p] = (0, x.useState)(te.appearance), [m, h] = (0, x.useState)(!1), [g, _] = (0, x.useState)(null), [v, y] = (0, x.useState)({}), [b, ee] = (0, x.useState)({}), [S, ne] = (0, x.useState)(null), [re, w] = (0, x.useState)({}), [T, E] = (0, x.useState)({}), [D, O] = (0, x.useState)(null), [k, ae] = (0, x.useState)(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? !0), [A, j] = (0, x.useState)(() => new URLSearchParams(location.search).has("kiosk")), [oe, se] = (0, x.useState)(() => {
		try {
			return JSON.parse(localStorage.getItem("homeii-hidden-by-room") || "{}");
		} catch {
			return {};
		}
	}), [ce, le] = (0, x.useState)(() => {
		try {
			let e = localStorage.getItem("homeii-camera-selection");
			return e === null ? null : JSON.parse(e);
		} catch {
			return null;
		}
	}), [ue, de] = (0, x.useState)(null);
	(0, x.useEffect)(() => {
		Je().then((e) => {
			r(e);
			let t = localStorage.getItem("homeiios-appearance");
			p(t ? {
				...e.appearance,
				...JSON.parse(t)
			} : e.appearance);
		});
	}, []), (0, x.useEffect)(() => {
		let e = window.matchMedia("(prefers-color-scheme: dark)"), t = () => ae(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []), (0, x.useEffect)(() => {
		let e = window.setInterval(() => s(/* @__PURE__ */ new Date()), 3e4);
		return () => window.clearInterval(e);
	}, []), (0, x.useEffect)(() => {
		let e = () => {
			!document.fullscreenElement && A && j(!1);
		};
		return document.addEventListener("fullscreenchange", e), () => document.removeEventListener("fullscreenchange", e);
	}, [A]), (0, x.useEffect)(() => {
		let e = 0, t = (t) => {
			let n = t.detail;
			de(n), window.clearTimeout(e), e = window.setTimeout(() => de(null), 2600);
		};
		return window.addEventListener("homeii-feedback", t), () => {
			window.removeEventListener("homeii-feedback", t), window.clearTimeout(e);
		};
	}, []), (0, x.useEffect)(() => {
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
			}), ne(s);
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
			}), w(d), E(f);
		}).catch(() => ne(null)), () => {
			t = !0;
		};
	}, [e?.callWS, n.rooms]);
	let fe = !!e?.user?.is_admin, pe = o.getHours(), me = pe < 6 ? "night" : pe < 12 ? "morning" : pe < 18 ? "day" : "evening", he = Ke(e, n.entities.temperature), ge = Ke(e, n.entities.power), _e = Ke(e, n.entities.intercomCount), ve = Ke(e, n.entities.nightMode), M = Ke(e, n.entities.allLights), ye = e?.user?.name?.split(" ")[0] || "", be = n.timeBackgrounds?.[me], xe = (u === "home" || u === "livingroom") && be || n.backgrounds[u] || n.backgrounds.home || te.backgrounds.home, Se = location.port === "5173" ? `/homeiios-livingroom-${me}.png` : xe, N = f.background || Se, Ce = (t) => {
		a(null), e?.navigate ? e.navigate(t) : history.pushState(null, "", t), window.dispatchEvent(new Event("location-changed"));
	}, we = (e) => {
		O(null), d(e), a(null), l(!1), window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, Te = (e) => {
		p(e), localStorage.setItem("homeiios-appearance", JSON.stringify(e));
	}, Ee = (e, t) => se((n) => {
		let r = {
			...n,
			[e]: t
		};
		return localStorage.setItem("homeii-hidden-by-room", JSON.stringify(r)), r;
	}), De = (e) => {
		le(e), localStorage.setItem("homeii-camera-selection", JSON.stringify(e));
	}, ke = () => {
		let e = {
			schema: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			appearance: f,
			hiddenByRoom: oe,
			cameraSelection: ce,
			roomStatus: Object.fromEntries(n.rooms.map((e) => [e.id, {
				status: JSON.parse(localStorage.getItem(`homeii-status-${e.id}`) || "null"),
				zones: JSON.parse(localStorage.getItem(`homeii-zones-${e.id}`) || "null")
			}]))
		}, t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), r = URL.createObjectURL(t), i = document.createElement("a");
		i.href = r, i.download = `homeii-profile-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, i.click(), URL.revokeObjectURL(r);
	}, Ae = () => {
		let e = document.createElement("input");
		e.type = "file", e.accept = "application/json", e.onchange = async () => {
			let t = e.files?.[0];
			if (t) try {
				let e = JSON.parse(await t.text());
				if (e.schema !== 1 || typeof e.hiddenByRoom != "object") throw Error("invalid");
				e.appearance && Te({
					...f,
					...e.appearance
				}), se(e.hiddenByRoom), localStorage.setItem("homeii-hidden-by-room", JSON.stringify(e.hiddenByRoom)), Array.isArray(e.cameraSelection) && De(e.cameraSelection), e.roomStatus && Object.entries(e.roomStatus).forEach(([e, t]) => {
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
	}, je = async () => {
		let t = n.branding || te.branding;
		t.animation === "spin" && (h(!1), requestAnimationFrame(() => h(!0)), window.setTimeout(() => h(!1), 720));
		let r = t.action;
		if (r.type === "view" && we(r.target), r.type === "navigate" && Ce(r.target), r.type === "service" && e) {
			let [t, n] = r.target.split(".", 2);
			t && n && await e.callService(t, n, r.data || {}, r.entityId ? { entity_id: r.entityId } : void 0);
		}
	}, Me = async () => {
		if (A) {
			j(!1), document.fullscreenElement && await document.exitFullscreen?.();
			return;
		}
		j(!0);
		try {
			await document.documentElement.requestFullscreen?.();
		} catch {}
	}, Ne = async (t) => {
		!e || !t || await e.callService("homeassistant", "toggle", {}, { entity_id: t });
	}, Pe = async () => {
		!e || !n.entities.restoreScene || await e.callService("scene", "turn_on", {}, { entity_id: n.entities.restoreScene });
	}, Fe = (0, x.useMemo)(() => n.secondary.filter((e) => ["media"].includes(e.id)), [n]), Ie = (0, x.useMemo)(() => n.secondary.filter((e) => ["security", "intercom"].includes(e.id)), [n]), Le = (0, x.useMemo)(() => n.secondary.filter((e) => e.id !== "media"), [n]), Re = n.rooms.find((e) => e.id === u), ze = n.secondary.find((e) => e.id === u), Be = Re || ze, Ve = f.themeMode === "system" ? k ? "dark" : "light" : f.themeMode, He = (0, x.useMemo)(() => rt(n.roomDefinitions || {}), [n.roomDefinitions]), Ue = S || He, Ye = Re ? it(re[Re.id], oe[Re.id] || []) : void 0, st = Re ? n.roomDefinitions?.[Re.id] || ot(re[Re.id], T[Re.id], e) : void 0, ct = Re && st ? at(st, oe[Re.id] || []) : void 0;
	return /* @__PURE__ */ (0, C.jsxs)("main", {
		className: `app ${A ? "kiosk-mode" : ""} theme-${Ve} palette-${Ve === "dark" ? f.darkPalette : f.lightPalette} density-${f.densityMode} ${f.highContrast ? "high-contrast" : ""} view-${u} period-${me} ${t ? "ha-narrow" : ""}`,
		dir: "rtl",
		style: {
			"--hero-image": `url(${Se})`,
			"--app-background-image": `url(${N})`,
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
			/* @__PURE__ */ (0, C.jsx)(Xe, {
				rooms: n.rooms,
				activeView: u,
				temperature: qe(he, "°"),
				power: qe(ge, " W"),
				lightsActive: M?.state === "on",
				connected: !!e,
				isAdmin: fe,
				logo: (n.branding || te.branding).logo,
				spinning: m,
				onBrand: je,
				onSettings: () => l(!0),
				onRoom: (e) => we(e.id),
				onHome: () => we("home"),
				onMore: () => a("more")
			}),
			!A && /* @__PURE__ */ (0, C.jsxs)("button", {
				className: "kiosk-fab glass-soft",
				onClick: Me,
				"aria-label": "מצב מסך מלא",
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:fullscreen" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "מסך מלא" })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "content-shell",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("header", {
						className: "topbar",
						children: [/* @__PURE__ */ (0, C.jsxs)("button", {
							className: "brand",
							onClick: je,
							"aria-label": "HOMEii",
							children: [/* @__PURE__ */ (0, C.jsx)("span", {
								className: `brand-mark ${m ? "is-spinning" : ""}`,
								children: /* @__PURE__ */ (0, C.jsx)("img", {
									src: (n.branding || te.branding).logo,
									alt: ""
								})
							}), /* @__PURE__ */ (0, C.jsx)("span", { children: "HOMEii" })]
						}), /* @__PURE__ */ (0, C.jsxs)("div", {
							className: "topbar-actions",
							children: [
								/* @__PURE__ */ (0, C.jsx)("button", {
									className: "icon-button kiosk-toggle",
									"aria-label": A ? "ביטול קיוסק" : "מצב מסך מלא",
									onClick: Me,
									children: /* @__PURE__ */ (0, C.jsx)(P, { icon: A ? "mdi:fullscreen-exit" : "mdi:fullscreen" })
								}),
								/* @__PURE__ */ (0, C.jsx)("span", {
									className: `connection ${e ? "online" : "offline"}`,
									children: e ? "מחובר" : "ממתין ל־HA"
								}),
								fe && /* @__PURE__ */ (0, C.jsx)("button", {
									className: "icon-button admin-only",
									"aria-label": "ניהול",
									onClick: () => l((e) => !e),
									children: /* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:tune-variant" })
								})
							]
						})]
					}),
					A && /* @__PURE__ */ (0, C.jsxs)("button", {
						className: "kiosk-exit glass-soft",
						onClick: Me,
						"aria-label": "יציאה ממצב קיוסק",
						children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:fullscreen-exit" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "יציאה מקיוסק" })]
					}),
					c && fe && /* @__PURE__ */ (0, C.jsxs)("aside", {
						className: "admin-menu glass",
						"aria-label": "כלי מנהל",
						children: [
							/* @__PURE__ */ (0, C.jsxs)("header", {
								className: "admin-menu-head",
								children: [/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEii Studio" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: "הגדרות הממשק" })] }), /* @__PURE__ */ (0, C.jsx)("button", {
									className: "admin-close",
									onClick: () => l(!1),
									"aria-label": "סגירת הגדרות",
									children: /* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:close" })
								})]
							}),
							/* @__PURE__ */ (0, C.jsx)("p", { children: "עריכת המבנה נעשית בקובץ config.json. משתמשים רגילים אינם רואים תפריט זה." }),
							/* @__PURE__ */ (0, C.jsx)("button", {
								onClick: () => Ce("/config/dashboard"),
								children: "ניהול דשבורדים"
							}),
							/* @__PURE__ */ (0, C.jsx)("button", {
								onClick: () => Je().then(r),
								children: "טעינה מחדש של התצורה"
							}),
							/* @__PURE__ */ (0, C.jsxs)("button", {
								onClick: Me,
								children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:fullscreen" }), " מצב מסך מלא · Kiosk"]
							}),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "profile-actions",
								children: [/* @__PURE__ */ (0, C.jsxs)("button", {
									onClick: ke,
									children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:tray-arrow-down" }), "ייצוא פרופיל"]
								}), /* @__PURE__ */ (0, C.jsxs)("button", {
									onClick: Ae,
									children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:tray-arrow-up" }), "ייבוא פרופיל"]
								})]
							}),
							/* @__PURE__ */ (0, C.jsx)(nt, {
								value: f,
								presets: n.backgroundPresets || te.backgroundPresets || [],
								onChange: Te
							}),
							/* @__PURE__ */ (0, C.jsx)(We, {
								hass: e,
								rooms: n.rooms,
								roomEntities: re,
								hiddenByRoom: oe,
								cameraSelection: ce,
								onHiddenChange: Ee,
								onCameraChange: De
							})
						]
					}),
					u === "home" ? /* @__PURE__ */ (0, C.jsxs)(C.Fragment, { children: [/* @__PURE__ */ (0, C.jsxs)("section", {
						className: "hero",
						"aria-label": "מצב הבית",
						children: [
							/* @__PURE__ */ (0, C.jsx)("div", { className: "hero-overlay" }),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "hero-copy",
								children: [
									/* @__PURE__ */ (0, C.jsxs)("span", {
										className: "eyebrow",
										children: [Ge(pe), ye ? `, ${ye}` : ""]
									}),
									/* @__PURE__ */ (0, C.jsx)("h1", { children: n.homeTitle }),
									/* @__PURE__ */ (0, C.jsx)("p", { children: new Intl.DateTimeFormat("he-IL", {
										weekday: "long",
										day: "numeric",
										month: "long"
									}).format(o) })
								]
							}),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "hero-time",
								children: [/* @__PURE__ */ (0, C.jsx)("time", { children: new Intl.DateTimeFormat("he-IL", {
									hour: "2-digit",
									minute: "2-digit",
									hour12: !1
								}).format(o) }), /* @__PURE__ */ (0, C.jsxs)("span", { children: [
									/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:weather-partly-cloudy" }),
									" ",
									qe(he, "°")
								] })]
							}),
							/* @__PURE__ */ (0, C.jsxs)("div", {
								className: "hero-status glass-soft",
								children: [
									/* @__PURE__ */ (0, C.jsx)(pt, {
										icon: "mdi:lightbulb-group",
										label: "תאורה",
										value: M?.state === "on" ? "פעילה" : "כבויה",
										active: M?.state === "on"
									}),
									/* @__PURE__ */ (0, C.jsx)(pt, {
										icon: "mdi:flash",
										label: "צריכה",
										value: qe(ge, " W")
									}),
									/* @__PURE__ */ (0, C.jsx)(pt, {
										icon: "mdi:doorbell-video",
										label: "כניסה",
										value: qe(_e)
									})
								]
							}),
							/* @__PURE__ */ (0, C.jsx)(lt, {
								hass: e,
								areaEntities: Ue,
								open: g,
								snapshot: v,
								onOpen: (e, t) => {
									y((n) => ({
										...n,
										[e]: t.length
									})), ee((n) => ({
										...n,
										[e]: t
									})), _(e);
								}
							}),
							/* @__PURE__ */ (0, C.jsx)(dt, {
								onCinema: () => {
									O("cinema"), d("livingroom");
								},
								onClimate: () => {
									O("climate"), d("livingroom");
								},
								onAway: () => a("security")
							})
						]
					}), /* @__PURE__ */ (0, C.jsxs)("section", {
						className: "control-grid",
						children: [/* @__PURE__ */ (0, C.jsxs)("section", {
							className: "quick-panel glass",
							children: [/* @__PURE__ */ (0, C.jsx)(ft, {
								title: "פעולות מהירות",
								subtitle: "הפעולות היומיומיות במקום אחד"
							}), /* @__PURE__ */ (0, C.jsxs)("div", {
								className: "quick-actions",
								children: [
									/* @__PURE__ */ (0, C.jsx)(mt, {
										icon: "mdi:weather-night",
										label: "מצב לילה",
										active: ve?.state === "on",
										onClick: () => Ne(n.entities.nightMode)
									}),
									/* @__PURE__ */ (0, C.jsx)(mt, {
										icon: "mdi:lightbulb-group",
										label: "כל התאורה",
										active: M?.state === "on",
										onClick: () => Ne(n.entities.allLights)
									}),
									/* @__PURE__ */ (0, C.jsx)(mt, {
										icon: "mdi:restore",
										label: "שחזור",
										onClick: Pe
									}),
									/* @__PURE__ */ (0, C.jsx)(mt, {
										icon: "mdi:cctv",
										label: "מצלמות",
										onClick: () => a("security")
									})
								]
							})]
						}), /* @__PURE__ */ (0, C.jsxs)("section", {
							className: "context-panel glass",
							children: [/* @__PURE__ */ (0, C.jsx)(ft, {
								title: "עכשיו בבית",
								subtitle: "מידע שדורש תשומת לב"
							}), /* @__PURE__ */ (0, C.jsxs)("div", {
								className: "context-list",
								children: [
									/* @__PURE__ */ (0, C.jsx)(ht, {
										icon: "mdi:thermometer",
										label: "טמפרטורה בחוץ",
										value: qe(he, "°")
									}),
									/* @__PURE__ */ (0, C.jsx)(ht, {
										icon: "mdi:flash",
										label: "צריכה נוכחית",
										value: qe(ge, " W")
									}),
									/* @__PURE__ */ (0, C.jsx)(ht, {
										icon: "mdi:doorbell-video",
										label: "זוהו בכניסה",
										value: qe(_e)
									})
								]
							})]
						})]
					})] }) : Re && ct ? /* @__PURE__ */ (0, C.jsx)(ie, {
						room: Re,
						definition: ct,
						areaEntities: Ye,
						hass: e,
						isAdmin: fe,
						intent: D,
						onHome: () => we("home")
					}) : Be ? ze ? /* @__PURE__ */ (0, C.jsx)(Oe, {
						item: ze,
						hass: e,
						legacyDashboardPath: n.legacyDashboardPath,
						cameraSelection: ce,
						onHome: () => we("home")
					}) : /* @__PURE__ */ (0, C.jsx)(tt, {
						item: Be,
						legacyDashboardPath: n.legacyDashboardPath,
						onHome: () => we("home")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, C.jsx)(Ze, {
				activeView: u,
				onHome: () => we("home"),
				onSelect: a
			}),
			/* @__PURE__ */ (0, C.jsxs)(Qe, {
				title: i === "rooms" ? "חדרים" : i === "media" ? "מדיה" : i === "security" ? "אבטחה" : "עוד",
				open: i !== null,
				onClose: () => a(null),
				children: [
					i === "rooms" && /* @__PURE__ */ (0, C.jsx)($e, {
						rooms: n.rooms,
						onSelect: (e) => we(e.id)
					}),
					i === "media" && /* @__PURE__ */ (0, C.jsx)(et, {
						links: Fe,
						onSelect: (e) => we(e.id)
					}),
					i === "security" && /* @__PURE__ */ (0, C.jsx)(et, {
						links: Ie,
						onSelect: (e) => we(e.id)
					}),
					i === "more" && /* @__PURE__ */ (0, C.jsx)(et, {
						links: Le,
						onSelect: (e) => we(e.id)
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)(ut, {
				domain: g,
				hass: e,
				entityIds: g && b[g] || [],
				onClose: () => _(null)
			}),
			ue && /* @__PURE__ */ (0, C.jsxs)("div", {
				className: `global-feedback ${ue.type}`,
				role: "status",
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: ue.type === "success" ? "mdi:check-circle" : ue.type === "error" ? "mdi:alert-circle" : "mdi:progress-clock" }), /* @__PURE__ */ (0, C.jsx)("span", { children: ue.message })]
			})
		]
	});
}
function Xe({ rooms: e, activeView: t, temperature: n, power: r, lightsActive: i, connected: a, isAdmin: o, logo: s, spinning: c, onBrand: l, onSettings: u, onRoom: d, onHome: f, onMore: p }) {
	return /* @__PURE__ */ (0, C.jsxs)("nav", {
		className: "desktop-rail glass",
		"aria-label": "ניווט ראשי",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("button", {
				className: `rail-brand ${t === "home" ? "active" : ""}`,
				onClick: () => {
					f(), l();
				},
				"aria-label": "HOMEii · מסך הבית",
				children: [/* @__PURE__ */ (0, C.jsx)("span", {
					className: `brand-mark ${c ? "is-spinning" : ""}`,
					children: /* @__PURE__ */ (0, C.jsx)("img", {
						src: s,
						alt: ""
					})
				}), /* @__PURE__ */ (0, C.jsx)("strong", { children: "HOMEii" })]
			}),
			/* @__PURE__ */ (0, C.jsx)("div", { className: "rail-divider" }),
			/* @__PURE__ */ (0, C.jsx)("span", {
				className: "rail-label",
				children: "חדרים"
			}),
			/* @__PURE__ */ (0, C.jsx)("div", {
				className: "rail-rooms",
				children: e.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
					className: t === e.id ? "active" : "",
					onClick: () => d(e),
					title: e.subtitle,
					children: [/* @__PURE__ */ (0, C.jsx)(re, { name: w(e.id, e.name) }), /* @__PURE__ */ (0, C.jsx)("span", { children: e.name })]
				}, e.id))
			}),
			/* @__PURE__ */ (0, C.jsxs)("section", {
				className: "rail-live",
				"aria-label": "מצב הבית עכשיו",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "rail-weather",
						children: [
							/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:weather-partly-cloudy" }),
							/* @__PURE__ */ (0, C.jsx)("b", { children: n }),
							/* @__PURE__ */ (0, C.jsx)("small", { children: "בחוץ" })
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "rail-power",
						children: [
							/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:flash" }),
							/* @__PURE__ */ (0, C.jsx)("b", { children: r }),
							/* @__PURE__ */ (0, C.jsx)("small", { children: "צריכה" })
						]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: `rail-lights ${i ? "is-on" : ""}`,
						children: [
							/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:lightbulb-group" }),
							/* @__PURE__ */ (0, C.jsx)("b", { children: i ? "פעיל" : "כבוי" }),
							/* @__PURE__ */ (0, C.jsx)("small", { children: "תאורה" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "rail-system",
				children: [
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: a ? "online" : "offline",
						title: a ? "מחובר" : "לא מחובר",
						children: /* @__PURE__ */ (0, C.jsx)("i", {})
					}),
					o && /* @__PURE__ */ (0, C.jsx)("button", {
						onClick: u,
						"aria-label": "הגדרות",
						children: /* @__PURE__ */ (0, C.jsx)(re, { name: "settings" })
					}),
					/* @__PURE__ */ (0, C.jsx)("button", {
						onClick: p,
						"aria-label": "אפשרויות נוספות",
						children: /* @__PURE__ */ (0, C.jsx)(re, { name: "more" })
					})
				]
			})
		]
	});
}
function Ze({ activeView: e, onHome: t, onSelect: n }) {
	return /* @__PURE__ */ (0, C.jsxs)("nav", {
		className: "mobile-nav glass",
		"aria-label": "ניווט לנייד",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("button", {
				className: e === "home" ? "active" : "",
				onClick: t,
				children: [/* @__PURE__ */ (0, C.jsx)(re, { name: "home" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "בית" })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("button", {
				onClick: () => n("rooms"),
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:floor-plan" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "חדרים" })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("button", {
				onClick: () => n("media"),
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:play-circle-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "מדיה" })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("button", {
				onClick: () => n("security"),
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:shield-home-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "אבטחה" })]
			}),
			/* @__PURE__ */ (0, C.jsxs)("button", {
				onClick: () => n("more"),
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:dots-horizontal-circle-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "עוד" })]
			})
		]
	});
}
function Qe({ title: e, open: t, onClose: n, children: r }) {
	return t ? /* @__PURE__ */ (0, C.jsx)("div", {
		className: "sheet-layer",
		role: "presentation",
		onMouseDown: (e) => e.target === e.currentTarget && n(),
		children: /* @__PURE__ */ (0, C.jsxs)("section", {
			className: "bottom-sheet glass",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": e,
			children: [
				/* @__PURE__ */ (0, C.jsx)("div", { className: "sheet-handle" }),
				/* @__PURE__ */ (0, C.jsxs)("header", { children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: e }), /* @__PURE__ */ (0, C.jsx)("button", {
					className: "icon-button",
					onClick: n,
					"aria-label": "סגירה",
					children: /* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:close" })
				})] }),
				r
			]
		})
	}) : null;
}
function $e({ rooms: e, onSelect: t }) {
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "sheet-grid",
		children: e.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
			className: "sheet-item",
			onClick: () => t(e),
			children: [
				/* @__PURE__ */ (0, C.jsx)("span", {
					className: "sheet-icon",
					children: /* @__PURE__ */ (0, C.jsx)(P, { icon: e.icon })
				}),
				/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, C.jsx)("small", { children: e.subtitle })] }),
				/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:chevron-left" })
			]
		}, e.id))
	});
}
function et({ links: e, onSelect: t }) {
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "sheet-grid",
		children: e.map((e) => /* @__PURE__ */ (0, C.jsxs)("button", {
			className: "sheet-item",
			onClick: () => t(e),
			children: [
				/* @__PURE__ */ (0, C.jsx)("span", {
					className: "sheet-icon",
					children: /* @__PURE__ */ (0, C.jsx)(P, { icon: e.icon })
				}),
				/* @__PURE__ */ (0, C.jsx)("strong", { children: e.name }),
				/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:chevron-left" })
			]
		}, e.id))
	});
}
function tt({ item: e, legacyDashboardPath: t, onHome: n }) {
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "workspace-view",
		children: [/* @__PURE__ */ (0, C.jsxs)("header", {
			className: "workspace-header glass",
			children: [/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "workspace-title",
				children: [/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(P, { icon: e.icon }) }), /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEiiOS" }), /* @__PURE__ */ (0, C.jsx)("h1", { children: e.name })] })]
			}), /* @__PURE__ */ (0, C.jsxs)("button", {
				className: "home-return",
				onClick: n,
				children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:home-rounded" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "חזרה לבית" })]
			})]
		}), /* @__PURE__ */ (0, C.jsx)("div", {
			className: "workspace-frame glass",
			children: /* @__PURE__ */ (0, C.jsx)("iframe", {
				title: e.name,
				src: `${t}/${e.legacyPath}?kiosk`,
				loading: "lazy",
				allow: "autoplay; fullscreen; microphone"
			})
		})]
	});
}
function nt({ value: e, presets: t, onChange: n }) {
	let r = (t, r) => n({
		...e,
		[t]: r
	});
	return /* @__PURE__ */ (0, C.jsxs)("section", {
		className: "appearance-editor",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "appearance-group",
				children: [
					/* @__PURE__ */ (0, C.jsx)("h3", { children: "תצוגה ונגישות" }),
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "appearance-segments",
						"aria-label": "ערכת צבע",
						children: [
							"system",
							"dark",
							"light"
						].map((t) => /* @__PURE__ */ (0, C.jsx)("button", {
							className: e.themeMode === t ? "selected" : "",
							onClick: () => r("themeMode", t),
							children: t === "system" ? "מערכת" : t === "dark" ? "כהה" : "בהירה"
						}, t))
					}),
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "setting-caption",
						children: "גווני ערכה כהה"
					}),
					/* @__PURE__ */ (0, C.jsx)("div", {
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
						].map(([t, r, i, a, o, s, c, l]) => /* @__PURE__ */ (0, C.jsx)("button", {
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
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "setting-caption",
						children: "גווני ערכה בהירה"
					}),
					/* @__PURE__ */ (0, C.jsx)("div", {
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
						].map(([t, r, i, a, o, s, c, l]) => /* @__PURE__ */ (0, C.jsx)("button", {
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
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "appearance-segments",
						"aria-label": "צפיפות",
						children: ["comfort", "compact"].map((t) => /* @__PURE__ */ (0, C.jsx)("button", {
							className: e.densityMode === t ? "selected" : "",
							onClick: () => r("densityMode", t),
							children: t === "comfort" ? "נוחה" : "קומפקטית"
						}, t))
					}),
					/* @__PURE__ */ (0, C.jsxs)("label", {
						className: "contrast-toggle",
						children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "ניגודיות מוגברת" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "checkbox",
							checked: e.highContrast,
							onChange: (e) => r("highContrast", e.target.checked)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "appearance-group",
				children: [/* @__PURE__ */ (0, C.jsx)("h3", { children: "צבעי הממשק" }), /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "color-fields",
					children: [
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "צבע חם" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.accent,
							onChange: (e) => r("accent", e.target.value)
						})] }),
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "צבע משני" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.coolAccent,
							onChange: (e) => r("coolAccent", e.target.value)
						})] }),
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "רקע Sections" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.sectionColor,
							onChange: (e) => r("sectionColor", e.target.value)
						})] }),
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "צבע אריחים" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.tileColor,
							onChange: (e) => r("tileColor", e.target.value)
						})] }),
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "צבע טקסט" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.textColor,
							onChange: (e) => r("textColor", e.target.value)
						})] }),
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "הדגשה בסרגל" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.sidebarAccent,
							onChange: (e) => r("sidebarAccent", e.target.value)
						})] }),
						/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "אייקונים בסרגל" }), /* @__PURE__ */ (0, C.jsx)("input", {
							type: "color",
							value: e.sidebarIconColor,
							onChange: (e) => r("sidebarIconColor", e.target.value)
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "appearance-group",
				children: [
					/* @__PURE__ */ (0, C.jsx)("h3", { children: "זכוכית ומשטחים" }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"שקיפות משטחים · ",
						e.surfaceOpacity,
						"%"
					] }), /* @__PURE__ */ (0, C.jsx)("input", {
						type: "range",
						min: "20",
						max: "96",
						value: e.surfaceOpacity,
						onChange: (e) => r("surfaceOpacity", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"שקיפות אריחים · ",
						e.tileOpacity,
						"%"
					] }), /* @__PURE__ */ (0, C.jsx)("input", {
						type: "range",
						min: "12",
						max: "100",
						value: e.tileOpacity,
						onChange: (e) => r("tileOpacity", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"כהות רקע הממשק · ",
						e.backgroundDim,
						"%"
					] }), /* @__PURE__ */ (0, C.jsx)("input", {
						type: "range",
						min: "0",
						max: "80",
						value: e.backgroundDim,
						onChange: (e) => r("backgroundDim", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"טשטוש · ",
						e.blur,
						"px"
					] }), /* @__PURE__ */ (0, C.jsx)("input", {
						type: "range",
						min: "0",
						max: "40",
						value: e.blur,
						onChange: (e) => r("blur", Number(e.target.value))
					})] }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"עיגול פינות · ",
						e.radius,
						"px"
					] }), /* @__PURE__ */ (0, C.jsx)("input", {
						type: "range",
						min: "8",
						max: "38",
						value: e.radius,
						onChange: (e) => r("radius", Number(e.target.value))
					})] })
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "appearance-group",
				children: [
					/* @__PURE__ */ (0, C.jsx)("h3", { children: "רקע המערכת" }),
					/* @__PURE__ */ (0, C.jsxs)("label", { children: [/* @__PURE__ */ (0, C.jsx)("span", { children: "תמונת רקע או נתיב `/local`" }), /* @__PURE__ */ (0, C.jsx)("input", {
						className: "text-input",
						type: "text",
						value: e.background,
						placeholder: "/local/homeiios/my-background.webp",
						onChange: (e) => r("background", e.target.value)
					})] }),
					/* @__PURE__ */ (0, C.jsx)("div", {
						className: "background-presets",
						"aria-label": "רקעים מוכנים",
						children: t.map((t) => /* @__PURE__ */ (0, C.jsx)("button", {
							className: e.background === t.image ? "selected" : "",
							style: t.image ? { backgroundImage: `linear-gradient(rgba(4,7,12,.18),rgba(4,7,12,.35)),url(${t.image})` } : void 0,
							onClick: () => r("background", t.image),
							children: /* @__PURE__ */ (0, C.jsx)("span", { children: t.name })
						}, t.id))
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)("button", {
				onClick: () => n(te.appearance),
				children: "איפוס עיצוב במכשיר זה"
			}),
			/* @__PURE__ */ (0, C.jsx)("small", { children: "השינויים נשמרים מקומית בדפדפן. שמירה מערכתית תתווסף לעורך המרכזי." })
		]
	});
}
function rt(e) {
	let t = (e) => [...new Set(e.filter(Boolean))], n = Object.values(e);
	return {
		light: t(n.flatMap((e) => e.lights.map((e) => e.entity))),
		climate: t(n.map((e) => e.climate)),
		media_player: t(n.map((e) => e.media)),
		security: [],
		person: []
	};
}
function it(e, t) {
	if (!e) return;
	let n = new Set(t);
	return Object.fromEntries(Object.keys(e).map((t) => [t, e[t].filter((e) => !n.has(e))]));
}
function at(e, t) {
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
function ot(e, t, n) {
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
var st = {
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
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "status-carousel",
		"aria-label": "מצב הבית",
		children: Object.keys(st).map((o) => {
			let s = o === "person" ? a : t[o], c = s.filter((t) => ct(o, e?.states[t])), l = c.length, u = n ? r[o] ?? l : l, d = st[o];
			return /* @__PURE__ */ (0, C.jsxs)("button", {
				className: `status-card status-${o} ${u ? "active" : "idle"}`,
				onClick: () => i(o, o === "person" ? s : c),
				children: [
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "status-card-icon",
						children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: d.icon }), /* @__PURE__ */ (0, C.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: d.label }), /* @__PURE__ */ (0, C.jsx)("strong", { children: u ? `${u} ${d.active}` : d.empty })] }),
					/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:chevron-left" })
				]
			}, o);
		})
	});
}
function ut({ domain: e, hass: t, entityIds: n, onClose: r }) {
	if (!e) return null;
	let i = n, a = st[e];
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: "status-dialog-layer",
		onMouseDown: (e) => e.target === e.currentTarget && r(),
		children: /* @__PURE__ */ (0, C.jsxs)("section", {
			className: `status-dialog status-${e}`,
			role: "dialog",
			"aria-modal": "true",
			"aria-label": a.label,
			children: [
				/* @__PURE__ */ (0, C.jsxs)("header", { children: [
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "status-dialog-icon",
						children: /* @__PURE__ */ (0, C.jsx)(P, { icon: a.icon })
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "מצב הבית בזמן אמת" }), /* @__PURE__ */ (0, C.jsx)("h2", { children: a.label })] }),
					/* @__PURE__ */ (0, C.jsx)("button", {
						onClick: r,
						"aria-label": "סגירה",
						children: /* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:close" })
					})
				] }),
				/* @__PURE__ */ (0, C.jsx)("div", {
					className: "status-entity-list",
					children: i.length ? i.map((n) => {
						let r = t?.states[n], i = ct(e, r), o = e === "person" ? String(r?.state === "home" ? "בבית" : r?.state === "not_home" ? "מחוץ לבית" : r?.state || "לא ידוע") : "";
						return /* @__PURE__ */ (0, C.jsxs)("article", {
							className: i ? "active" : "idle",
							children: [
								/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(P, { icon: e === "person" ? "mdi:account" : a.icon }) }),
								/* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("strong", { children: String(r?.attributes.friendly_name || n) }), /* @__PURE__ */ (0, C.jsx)("small", { children: !r || ["unknown", "unavailable"].includes(r.state) ? "לא זמין" : e === "person" ? o : i ? "פעיל עכשיו" : "כבוי" })] }),
								e === "person" ? /* @__PURE__ */ (0, C.jsx)("button", {
									disabled: !r,
									onClick: () => window.dispatchEvent(new CustomEvent("hass-more-info", {
										detail: { entityId: n },
										bubbles: !0,
										composed: !0
									})),
									"aria-label": `הצגת ${String(r?.attributes.friendly_name || n)} במפה`,
									children: /* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:map-marker-radius-outline" })
								}) : /* @__PURE__ */ (0, C.jsx)("button", {
									disabled: !r || ["unknown", "unavailable"].includes(r.state),
									onClick: () => t?.callService("homeassistant", "toggle", {}, { entity_id: n }),
									"aria-label": `${i ? "כיבוי" : "הדלקה"} ${String(r?.attributes.friendly_name || n)}`,
									children: /* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:power" })
								})
							]
						}, n);
					}) : /* @__PURE__ */ (0, C.jsxs)("div", {
						className: "status-empty",
						children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:check-circle-outline" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: a.empty })]
					})
				}),
				/* @__PURE__ */ (0, C.jsxs)("footer", { children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: "mdi:information-outline" }), /* @__PURE__ */ (0, C.jsx)("span", { children: "המספר בכרטיס יתעדכן לאחר סגירת החלון" })] })
			]
		})
	});
}
function dt({ onCinema: e, onClimate: t, onAway: n }) {
	let [r, i] = (0, x.useState)(!1);
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: `flow-launcher ${r ? "open" : ""}`,
		children: [/* @__PURE__ */ (0, C.jsxs)("button", {
			className: "flow-trigger glass-soft",
			onClick: () => i((e) => !e),
			"aria-expanded": r,
			children: [
				/* @__PURE__ */ (0, C.jsx)(re, { name: "cinema" }),
				/* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: "HOMEii Flow" }), /* @__PURE__ */ (0, C.jsx)("strong", { children: "מה עושים עכשיו?" })] }),
				/* @__PURE__ */ (0, C.jsx)(P, { icon: r ? "mdi:chevron-down" : "mdi:chevron-up" })
			]
		}), r && /* @__PURE__ */ (0, C.jsxs)("nav", {
			className: "intent-dock glass-soft",
			"aria-label": "מה תרצו לעשות",
			children: [
				/* @__PURE__ */ (0, C.jsxs)("button", {
					onClick: e,
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(re, { name: "cinema" }) }),
						/* @__PURE__ */ (0, C.jsx)("b", { children: "צפייה" }),
						/* @__PURE__ */ (0, C.jsx)("small", { children: "מדיה ואווירה" })
					]
				}),
				/* @__PURE__ */ (0, C.jsxs)("button", {
					onClick: t,
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(re, { name: "climate" }) }),
						/* @__PURE__ */ (0, C.jsx)("b", { children: "נוחות" }),
						/* @__PURE__ */ (0, C.jsx)("small", { children: "אקלים בחדר" })
					]
				}),
				/* @__PURE__ */ (0, C.jsxs)("button", {
					onClick: n,
					children: [
						/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(re, { name: "away" }) }),
						/* @__PURE__ */ (0, C.jsx)("b", { children: "יוצאים" }),
						/* @__PURE__ */ (0, C.jsx)("small", { children: "בדיקת הבית" })
					]
				})
			]
		})]
	});
}
function ft({ title: e, subtitle: t }) {
	return /* @__PURE__ */ (0, C.jsx)("header", {
		className: "section-heading",
		children: /* @__PURE__ */ (0, C.jsxs)("div", { children: [/* @__PURE__ */ (0, C.jsx)("h2", { children: e }), /* @__PURE__ */ (0, C.jsx)("p", { children: t })] })
	});
}
function pt({ icon: e, label: t, value: n, active: r = !1 }) {
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: `status ${r ? "active" : ""}`,
		children: [/* @__PURE__ */ (0, C.jsx)(P, { icon: e }), /* @__PURE__ */ (0, C.jsxs)("span", { children: [/* @__PURE__ */ (0, C.jsx)("small", { children: t }), /* @__PURE__ */ (0, C.jsx)("strong", { children: n })] })]
	});
}
function mt({ icon: e, label: t, active: n = !1, onClick: r }) {
	return /* @__PURE__ */ (0, C.jsxs)("button", {
		className: `action-button ${n ? "active" : ""}`,
		onClick: r,
		children: [/* @__PURE__ */ (0, C.jsx)("span", { children: /* @__PURE__ */ (0, C.jsx)(P, { icon: e }) }), /* @__PURE__ */ (0, C.jsx)("strong", { children: t })]
	});
}
function ht({ icon: e, label: t, value: n }) {
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "context-row",
		children: [
			/* @__PURE__ */ (0, C.jsx)("span", {
				className: "context-icon",
				children: /* @__PURE__ */ (0, C.jsx)(P, { icon: e })
			}),
			/* @__PURE__ */ (0, C.jsx)("span", { children: t }),
			/* @__PURE__ */ (0, C.jsx)("strong", { children: n })
		]
	});
}
//#endregion
//#region src/styles.css?inline
var gt = "@import \"/local/fonts.css?v=1\";:host,.homeiios-mount{min-height:100%;display:block}*{box-sizing:border-box}button{font:inherit}.app{--bg:#090e17;--surface-alpha:.64;--tile-alpha:.58;--glass-blur:24px;--panel-radius:26px;--surface:rgb(17 24 37/var(--surface-alpha));--surface-strong:#0c121dd1;--line:#ffffff24;--text:#f7f8fb;--muted:#ebf0f89e;--accent:#f6bd72;--cool:#a8ceff;--section-color:#111825;--tile-color:#202a3a;--background-dim:.22;--state-success:#5ed6a3;--state-danger:#ff7474;width:100%;min-height:100vh;color:var(--text);background-color:var(--bg);background-image:linear-gradient(135deg,rgb(5 9 15/var(--background-dim)),rgb(7 11 18/var(--background-dim))),var(--app-background-image),radial-gradient(circle at 20% 0%,#172235 0,transparent 32%);padding:max(18px, env(safe-area-inset-top)) max(18px, env(safe-area-inset-right)) max(18px, env(safe-area-inset-bottom)) max(18px, env(safe-area-inset-left));direction:rtl;background-position:50%;background-size:cover;background-attachment:fixed;font-family:Heebo,Arial,sans-serif;overflow-x:clip}.theme-dark{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}.theme-light{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;--bg:#e8edf3;--text:#142033;--muted:#1420339e;--line:#14203324;--surface:#eef3f8;--surface-strong:#f0f5fadb}.theme-light.app{background-image:linear-gradient(135deg,rgb(255 255 255/var(--background-dim)),rgb(225 233 241/var(--background-dim))),var(--app-background-image)}.theme-light .room-hero,.theme-light .hero{color:#fff}.theme-light .light-control{background:linear-gradient(145deg,color-mix(in srgb,var(--tile-color) 18%,#ffffffe0),color-mix(in srgb,var(--tile-color) 10%,#ffffffc2));border-color:#1420331a}.theme-light .glass-soft{background:#f5f8fc8c;border-color:#ffffffb8}.high-contrast{--muted:#ffffffd1;--line:#ffffff57}.theme-light.high-contrast{--muted:#08111ec7;--line:#08111e47}.high-contrast .light-control,.high-contrast .room-view .glass{border-width:2px}.density-compact{--panel-radius:20px}.density-compact .device-panel,.density-compact .thermostat,.density-compact .media-control,.density-compact .scene-panel{padding:14px}.density-compact .light-control{min-height:96px}.glass{isolation:isolate;background:rgb(from var(--section-color) r g b / var(--surface-alpha));border:1px solid var(--line);-webkit-backdrop-filter:blur(var(--glass-blur)) saturate(155%) brightness(1.04);position:relative;box-shadow:inset 0 1px #ffffff21,inset 0 -1px #ffffff09,0 22px 64px #0000003d}.glass:before{content:\"\";z-index:0;pointer-events:none;border-radius:inherit;opacity:.72;background:linear-gradient(125deg,#ffffff29,#0000 22% 68%,#ffffff0e),radial-gradient(circle at 22% -15%,#ffffff2b,#0000 34%);position:absolute;inset:0}.glass-soft{background:color-mix(in srgb,var(--section-color) 42%,transparent);-webkit-backdrop-filter:blur(16px);border:1px solid #ffffff21}.content-shell{width:min(1460px,100% - 236px);margin-inline:220px 0}.topbar{justify-content:space-between;align-items:center;height:58px;margin-block-end:16px;display:flex}.brand,.topbar-actions{align-items:center;gap:11px;display:flex}.brand{color:var(--text);letter-spacing:-.2px;cursor:pointer;background:0 0;border:0;padding:0;font-size:17px;font-weight:600}.brand-mark,.icon-button{place-items:center;display:grid}.brand-mark{width:40px;height:40px;color:var(--accent);transform-style:preserve-3d;background:#f6bd7214;border:1px solid #ffffff1a;border-radius:13px}.brand-mark img{object-fit:contain;filter:drop-shadow(0 0 8px #23d2e63d);width:31px;height:31px}.brand-mark.is-spinning{animation:.72s cubic-bezier(.2,.78,.2,1) homeiios-logo-spin}@keyframes homeiios-logo-spin{0%{transform:rotateY(0)scale(1)}48%{transform:rotateY(180deg)scale(.92)}to{transform:rotateY(360deg)scale(1)}}.connection{color:var(--muted);font-size:12px}.connection:before{content:\"\";background:#e67373;border-radius:50%;width:7px;height:7px;margin-inline-end:6px;display:inline-block}.connection.online:before{background:#6ed5a5;box-shadow:0 0 10px #6ed5a58c}.icon-button{border:1px solid var(--line);width:38px;height:38px;color:var(--text);cursor:pointer;background:#ffffff0f;border-radius:13px}.desktop-rail{inset-block:max(18px, env(safe-area-inset-top)) max(18px, env(safe-area-inset-bottom));z-index:20;border-radius:28px;flex-direction:column;gap:6px;width:202px;padding:12px;display:flex;position:fixed;inset-inline-start:max(18px, env(safe-area-inset-right))}.desktop-rail:after,.mobile-nav:after,.room-zones:after{content:\"\";pointer-events:none;border-radius:inherit;position:absolute;inset:1px;box-shadow:inset 10px 8px 22px #ffffff0b,inset -8px -10px 18px #0000001a}.desktop-rail button{width:100%;color:var(--muted);text-align:start;cursor:pointer;background:0 0;border:0;border-radius:16px;grid-template-columns:38px minmax(0,1fr);align-items:center;gap:10px;min-height:52px;padding:8px;transition:background .2s,color .2s,transform .2s;display:grid}.desktop-rail button:hover{color:var(--text);background:#ffffff14;transform:translate(-2px)}.desktop-rail button:active,.room-zones button:active,.mobile-nav button:active{transition:transform .14s cubic-bezier(.2,.8,.2,1);transform:scale(.96)}.desktop-rail button ha-icon{justify-self:center}.desktop-rail button span{white-space:nowrap;text-overflow:ellipsis;font-size:14px;font-weight:500;overflow:hidden}.desktop-rail .active{color:#dcecff;background:linear-gradient(135deg,#73adf638,#ffffff0f);border:1px solid #97c7ff33}.rail-divider{background:var(--line);height:1px;margin:7px 8px}.rail-label{color:#ffffff61;padding:5px 10px;font-size:11px;font-weight:600}.rail-rooms{scrollbar-width:none;flex-direction:column;gap:3px;min-height:0;display:flex;overflow-y:auto}.rail-more{margin-block-start:auto}.hero{isolation:isolate;background-image:var(--hero-image);background-position:50%;background-size:cover;border:1px solid #ffffff29;border-radius:32px;grid-template-rows:1fr auto;grid-template-columns:1fr auto;min-height:clamp(360px,50vh,590px);padding:clamp(24px,4vw,52px);display:grid;position:relative;overflow:hidden;box-shadow:0 28px 90px #0000004d}.hero-overlay{z-index:-1;background:linear-gradient(90deg,#04070cdb 0%,#060a1194 36%,#060a111f 78%),linear-gradient(#0000 52%,#05080d85);position:absolute;inset:0}.hero-copy{align-self:start;min-width:0}.eyebrow{color:#ffffffad;margin-block-end:5px;font-size:clamp(14px,1.4vw,17px);font-weight:500;display:block}.hero h1{letter-spacing:-2.2px;text-wrap:balance;max-width:12ch;margin:0;font-size:clamp(36px,5vw,68px);font-weight:600;line-height:1.02}.hero p{color:var(--muted);margin:12px 0 0;font-size:15px}.hero-time{text-align:end;flex-direction:column;align-items:flex-end;display:flex}.hero-time time{letter-spacing:-2px;font-variant-numeric:tabular-nums;font-size:clamp(38px,5vw,66px);font-weight:400;line-height:1}.hero-time span{color:#ffffffc2;align-items:center;gap:6px;margin-block-start:8px;display:flex}.hero-status{border-radius:20px;grid-column:1/-1;align-self:end;gap:2px;width:-moz-fit-content;width:fit-content;max-width:100%;padding:6px;display:flex}.status{border-radius:15px;align-items:center;gap:10px;min-width:128px;padding:9px 12px;display:flex}.status>ha-icon{color:var(--cool);--mdc-icon-size:21px}.status.active>ha-icon{color:var(--accent)}.status span{flex-direction:column;min-width:0;display:flex}.status small{color:var(--muted);font-size:10px}.status strong{text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;overflow:hidden}.control-grid{grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr);gap:16px;margin-block-start:16px;display:grid}.quick-panel,.context-panel{border-radius:var(--panel-radius);min-width:0;padding:22px}.section-heading h2{margin:0;font-size:19px;font-weight:600;line-height:1.2}.section-heading p{color:var(--muted);margin:3px 0 0;font-size:12px}.quick-actions{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-block-start:18px;display:grid}.action-button{background:color-mix(in srgb,var(--tile-color) 48%,transparent);min-width:0;min-height:108px;color:var(--text);cursor:pointer;border:1px solid #ffffff1a;border-radius:18px;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:13px;transition:transform .18s,background .18s,border-color .18s;display:flex}.action-button:hover{background:#ffffff14;border-color:#ffffff2e;transform:translateY(-2px)}.action-button span{width:38px;height:38px;color:var(--cool);background:#a8ceff1a;border-radius:13px;place-items:center;display:grid}.action-button strong{white-space:normal;text-align:start;max-width:100%;font-size:13px;font-weight:600;line-height:1.25}.action-button.active{background:linear-gradient(145deg,#f6bd722e,#ffffff0d);border-color:#f6bd724d}.action-button.active span{color:var(--accent);background:#f6bd721f}.context-list{margin-block-start:12px}.context-row{border-bottom:1px solid #ffffff14;grid-template-columns:36px minmax(0,1fr) auto;align-items:center;gap:10px;min-height:54px;font-size:13px;display:grid}.context-row:last-child{border-bottom:0}.context-row>span:nth-child(2){color:var(--muted);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.context-row strong{font-variant-numeric:tabular-nums;font-size:14px;font-weight:600}.context-icon{color:var(--cool);place-items:center;display:grid}.admin-menu{z-index:50;border-radius:20px;width:min(360px,100vw - 32px);max-height:calc(100vh - 96px);padding:18px;position:fixed;inset-block-start:76px;inset-inline-end:236px;overflow-y:auto}.admin-menu p{color:var(--muted);font-size:12px;line-height:1.55}.admin-menu button{border:1px solid var(--line);width:100%;color:var(--text);cursor:pointer;background:#ffffff0f;border-radius:12px;margin-block-start:7px;padding:10px}.appearance-editor{border-block-start:1px solid var(--line);margin-block-start:18px;padding-block-start:14px}.appearance-editor h3{margin:0 0 10px;font-size:15px}.appearance-segments{gap:5px;margin-block:8px;display:flex}.appearance-segments button{flex:1;min-width:0;font-size:10px;margin:0!important;padding:7px!important}.appearance-segments button.selected{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent);background:color-mix(in srgb,var(--accent) 12%,transparent)}.contrast-toggle{justify-content:space-between;align-items:center;grid-template-columns:none!important;display:flex!important}.contrast-toggle input{width:18px;height:18px;accent-color:var(--accent)}.appearance-editor>label,.color-fields label{color:var(--muted);gap:5px;margin-block:10px;font-size:11px;display:grid}.color-fields{grid-template-columns:1fr 1fr;gap:10px;display:grid}.color-fields input[type=color]{border:1px solid var(--line);background:0 0;border-radius:9px;width:100%;height:34px;padding:2px}.appearance-editor input[type=range]{width:100%;accent-color:var(--accent)}.text-input{border:1px solid var(--line);width:100%;color:var(--text);direction:ltr;background:#ffffff0f;border-radius:10px;padding:9px}.appearance-editor>small{color:var(--muted);margin-block-start:9px;font-size:10px;line-height:1.45;display:block}.background-presets{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-block:10px;display:grid}.background-presets button{align-items:flex-end;display:flex;position:relative;overflow:hidden;text-align:start!important;background-position:50%!important;background-size:cover!important;min-height:64px!important;margin:0!important;padding:8px!important}.background-presets button:first-child{background:linear-gradient(145deg,#202a39,#111722)!important}.background-presets button span{z-index:1;text-shadow:0 1px 8px #000;font-size:10px;position:relative}.background-presets button.selected{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}.workspace-view{grid-template-rows:auto minmax(0,1fr);gap:12px;min-height:calc(100vh - 92px);display:grid}.workspace-header{border-radius:22px;justify-content:space-between;align-items:center;min-height:72px;padding:10px 14px;display:flex}.workspace-title{align-items:center;gap:12px;min-width:0;display:flex}.workspace-title>span{width:43px;height:43px;color:var(--cool);background:#a8ceff1a;border-radius:14px;place-items:center;display:grid}.workspace-title div{min-width:0}.workspace-title small{color:var(--muted);font-size:10px}.workspace-title h1{white-space:nowrap;text-overflow:ellipsis;margin:0;font-size:21px;line-height:1.15;overflow:hidden}.home-return{border:1px solid var(--line);color:var(--text);cursor:pointer;background:#ffffff0f;border-radius:14px;align-items:center;gap:7px;padding:10px 13px;display:flex}.workspace-frame{border-radius:var(--panel-radius);min-height:720px;overflow:hidden}.workspace-frame iframe{background:#090e17;border:0;width:100%;height:max(720px,100vh - 178px);display:block}.room-view{gap:16px;display:grid}.feedback-island{z-index:95;color:#fff;-webkit-backdrop-filter:blur(24px)saturate(170%);backdrop-filter:blur(24px)saturate(170%);background:#121924b8;border:1px solid #fff3;border-radius:24px;align-items:center;gap:10px;max-width:min(90vw,420px);min-height:48px;padding:8px 15px 8px 10px;animation:.3s cubic-bezier(.2,.85,.2,1) feedback-in;display:flex;position:fixed;inset-block-start:24px;inset-inline-start:50%;transform:translate(50%);box-shadow:inset 0 1px #ffffff29,0 18px 48px #00000047}.feedback-island.success{background:color-mix(in srgb,var(--state-success) 28%,#121924c7)}.feedback-island.error{background:color-mix(in srgb,var(--state-danger) 34%,#121924c7)}.feedback-symbol{background:#ffffff1f;border-radius:50%;justify-content:center;align-items:center;gap:2px;width:32px;height:32px;display:flex}.feedback-symbol i{background:#fff;border-radius:50%;width:3px;height:3px;animation:.7s ease-in-out infinite alternate feedback-dot}.feedback-symbol i:nth-child(2){animation-delay:-.23s}.feedback-symbol i:nth-child(3){animation-delay:-.46s}.feedback-island strong{font-size:14px;font-weight:500}@keyframes feedback-in{0%{opacity:0;transform:translate(-50%,8px)}}@keyframes feedback-dot{to{opacity:.35;transform:translateY(-4px)}}.app:before{content:\"\";pointer-events:none;z-index:0;background:radial-gradient(circle at 72% 12%,#ffffff12,#0000 30%),linear-gradient(#0000 56%,#04070c2e);position:fixed;inset:0}.app>.desktop-rail,.app>.mobile-nav{z-index:20}.app>.content-shell{z-index:1;position:relative}.room-view .glass{background:linear-gradient(145deg,color-mix(in srgb,var(--section-color) 72%,transparent),color-mix(in srgb,var(--section-color) 50%,transparent));-webkit-backdrop-filter:blur(calc(var(--glass-blur) + 5px)) saturate(155%);backdrop-filter:blur(calc(var(--glass-blur) + 5px)) saturate(155%);border-color:#ffffff26;box-shadow:inset 0 1px #ffffff12,0 18px 50px #0000002e}.room-hero{isolation:isolate;background-color:#121a2333;background-image:var(--hero-image);background-blend-mode:soft-light;background-position:50%;background-size:cover;border:1px solid #ffffff29;border-radius:30px;flex-direction:column;justify-content:space-between;align-items:flex-start;min-height:300px;padding:24px;display:flex;position:relative;overflow:hidden;box-shadow:0 25px 72px #00000047}.room-hero-shade{z-index:-1;background:linear-gradient(90deg,#04070ce0,#04070c85 42%,#04070c14 78%),linear-gradient(#0000 42%,#04070c73);position:absolute;inset:0}.room-back{color:var(--text);cursor:pointer;border-radius:14px;align-items:center;gap:7px;padding:9px 12px;display:flex}.room-identity h1{letter-spacing:-1.8px;margin:4px 0;font-size:clamp(38px,5vw,64px);font-weight:600;line-height:1}.room-identity p{color:var(--muted);margin:0}.room-metrics{border-radius:18px;gap:4px;padding:5px;display:flex;position:absolute;inset-block-end:22px;inset-inline-end:22px}.room-metrics span{align-items:center;gap:8px;min-width:92px;padding:9px 12px;display:flex}.room-metrics ha-icon{color:var(--cool);--mdc-icon-size:20px}.room-metrics strong{font-variant-numeric:tabular-nums;font-size:18px}.room-zones{display:none}.room-layout{grid-template-columns:minmax(270px,.68fr) minmax(0,1.32fr);grid-template-areas:\"climate lights\"\"media lights\"\"media scenes\";align-items:stretch;gap:12px;display:grid}.room-zone-climate{grid-area:climate}.room-zone-lights{grid-area:lights}.room-zone-media{grid-area:media}.room-zone-scenes{grid-area:scenes}.room-zone-climate .thermostat,.room-zone-media .media-control{height:100%}.device-panel,.thermostat,.curtain-panel,.media-control,.scene-panel{border-radius:var(--panel-radius);min-width:0;padding:20px}.widget-heading{grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:10px;margin-block-end:10px;display:grid}.widget-glyph{width:44px;height:44px;color:var(--mode-color,var(--cool));background:color-mix(in srgb,var(--mode-color,var(--cool)) 13%,transparent);border-radius:15px;place-items:center;display:grid;box-shadow:inset 0 1px #ffffff1a}.widget-heading small{color:var(--muted);font-size:11px;display:block}.widget-heading h2{margin:0;font-size:18px;font-weight:600;line-height:1.2}.state-pill{min-height:30px;color:var(--muted);background:color-mix(in srgb,var(--tile-color) 48%,transparent);border-radius:15px;align-items:center;gap:6px;padding:5px 9px;font-size:11px;display:flex}.state-pill i{background:currentColor;border-radius:50%;width:7px;height:7px}.state-pill.active{color:var(--mode-color,var(--state-success))}.state-pill.active i{animation:1.8s ease-in-out infinite alternate state-breathe;box-shadow:0 0 12px}@keyframes state-breathe{to{opacity:.45;transform:scale(.72)}}.device-panel{min-height:0}.panel-title{align-items:center;gap:11px;margin-block-end:17px;display:flex}.panel-title>span{width:40px;height:40px;color:var(--cool);background:#a8ceff1a;border-radius:13px;place-items:center;display:grid}.panel-title h2{margin:0;font-size:18px;font-weight:600}.panel-title p{color:var(--muted);margin:2px 0 0;font-size:11px}.light-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;display:grid}.light-control{touch-action:none;-webkit-user-select:none;user-select:none;isolation:isolate;background:linear-gradient(145deg,color-mix(in srgb,var(--tile-color) 64%,transparent),color-mix(in srgb,var(--tile-color) 35%,transparent));border:1px solid #ffffff1c;border-radius:19px;min-width:0;min-height:112px;padding:10px;transition:background .25s,border-color .25s,transform .2s,box-shadow .25s;position:relative;overflow:hidden}.light-control:before{content:\"\";z-index:-1;inline-size:var(--light-percent);opacity:0;background:linear-gradient(90deg,#f6bb6c40,#ffdaa61a);border-inline-end:1px solid #ffdaa642;transition:inline-size .12s linear,opacity .22s;position:absolute;inset:0}.light-control.active:before{opacity:1}.light-control.active{border-color:#ffd39752;box-shadow:inset 0 1px #ffffff1a,0 9px 32px #e7a7571c}.light-control:active{transform:scale(.975)}.light-control.binary.active:before{inline-size:100%}.light-widget-glyph,.device-panel .state-pill.active{--mode-color:var(--accent)}.light-main{width:100%;min-height:72px;color:var(--text);text-align:start;cursor:pointer;pointer-events:none;background:0 0;border:0;grid-template-columns:42px minmax(0,1fr) 24px;align-items:center;gap:9px;padding:0;display:grid}.light-main:disabled,.curtain-control:disabled{opacity:.45;cursor:default}.light-main>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.light-main strong{white-space:normal;font-size:13px;line-height:1.25}.light-main small{color:var(--muted);font-size:10px}.light-main>ha-icon{color:var(--muted);--mdc-icon-size:18px}.light-orb{width:38px;height:38px;color:var(--cool);background:#a8ceff14;border-radius:13px;place-items:center;transition:all .25s;display:grid}.light-control.active .light-orb{color:var(--accent);filter:drop-shadow(0 0 calc(4px + var(--light-level) * 11px) #f6bd728c);background:#f6bd721f}.swipe-hint{color:#ffffff61;opacity:.68;justify-content:space-between;align-items:center;height:20px;font-size:9px;display:flex}.swipe-hint ha-icon{--mdc-icon-size:16px}.light-control.active .swipe-hint{color:#ffe1b9ad}.homeii-glyph{width:24px;height:24px;overflow:visible}.light-orb .homeii-glyph{width:25px;height:25px}.glyph-glow{opacity:.35}.light-control.active .glyph-glow{opacity:1;filter:drop-shadow(0 0 5px)}.light-control.active .glyph-motion{animation:1.8s ease-in-out infinite alternate glyph-breathe}@keyframes glyph-breathe{to{opacity:.35;transform:translateY(1.5px)}}.thermostat-stage{aspect-ratio:1;background:conic-gradient(from 20deg,var(--cool) var(--thermo-progress),#ffffff14 0);border-radius:50%;place-items:center;width:min(178px,52vw);margin:2px auto 8px;display:grid;position:relative;box-shadow:0 16px 50px #0000003d}.thermostat-stage:before{content:\"\";border-radius:inherit;background:#0a0f18e6;border:1px solid #ffffff1f;position:absolute;inset:7px}.thermostat{--mode-color:#8391a5;transition:background .35s,border-color .35s;position:relative;overflow:hidden}.thermostat.mode-auto,.thermostat.mode-heat_cool{--mode-color:#f0c678}.thermostat:after{content:\"\";z-index:-1;background:radial-gradient(circle,color-mix(in srgb,var(--mode-color) 23%,transparent),transparent 68%);height:72%;transition:background .35s;position:absolute;inset:-35% -20% auto}.thermostat.active{border-color:color-mix(in srgb,var(--mode-color) 36%,transparent)}.thermostat.active .thermostat-stage{background:conic-gradient(from 20deg,var(--mode-color) var(--thermo-progress),#ffffff14 0);box-shadow:0 18px 54px color-mix(in srgb,var(--mode-color) 16%,transparent)}.thermostat .mode-row button.active{color:var(--mode-color);background:color-mix(in srgb,var(--mode-color) 13%,transparent);border-color:color-mix(in srgb,var(--mode-color) 28%,transparent)}.thermostat-dial{z-index:1;flex-direction:column;align-items:center;display:flex}.thermostat-dial small,.thermostat-dial span{color:var(--muted);font-size:10px}.thermostat-dial strong{letter-spacing:-2px;font-variant-numeric:tabular-nums;font-size:44px;font-weight:500;line-height:1.08}.temperature-history{height:64px;margin:4px 0 8px;position:relative}.temperature-history header{color:var(--muted);justify-content:space-between;align-items:center;font-size:10px;display:flex}.temperature-history header strong{color:var(--mode-color);font-weight:500}.temperature-history svg{width:100%;height:44px;display:block;overflow:visible}.temperature-history.empty{height:42px;color:var(--muted);background:color-mix(in srgb,var(--tile-color) 30%,transparent);border-radius:12px;align-items:center;gap:7px;padding:8px;font-size:10px;display:flex}.temperature-history.empty ha-icon{--mdc-icon-size:17px;color:var(--mode-color)}.airflow{opacity:0;border-radius:50%;position:absolute;inset:13%;overflow:hidden}.thermostat.active .airflow{opacity:.6}.airflow i{border:1px solid #a8ceff59;border-radius:50%;width:45%;height:45%;animation:4s linear infinite air-orbit;position:absolute}.airflow i:first-child{inset:5%}.airflow i:nth-child(2){animation-delay:-1.3s;inset:28%}.airflow i:nth-child(3){animation-delay:-2.6s;inset:50%}@keyframes air-orbit{to{opacity:.15;transform:rotate(360deg)scale(1.08)}}.temperature-stepper{grid-template-columns:42px 1fr 42px;align-items:center;gap:8px;display:grid}.temperature-stepper button,.transport button{aspect-ratio:1;border:1px solid var(--line);color:var(--text);background:color-mix(in srgb,var(--tile-color) 52%,transparent);cursor:pointer;border-radius:50%;place-items:center;display:grid}.temperature-stepper span{text-align:center;color:var(--muted);font-size:11px}.mode-row{scrollbar-width:none;gap:6px;margin-block-start:14px;display:flex;overflow-x:auto}.mode-row button{min-width:58px;color:var(--muted);background:color-mix(in srgb,var(--tile-color) 42%,transparent);cursor:pointer;border:1px solid #ffffff14;border-radius:13px;flex-direction:column;flex:1;align-items:center;gap:3px;padding:8px 6px;display:flex}.mode-row button span{white-space:nowrap;font-size:9px}.mode-row button.active{color:var(--accent);background:#f6bd721a;border-color:#f6bd7240}.curtain-control{width:100%;min-height:130px;color:var(--text);text-align:start;cursor:pointer;background:#ffffff09;border:1px solid #ffffff1a;border-radius:18px;grid-template-columns:130px 1fr 30px;align-items:center;gap:15px;padding:13px;display:grid}.curtain-window{background:linear-gradient(#8bbfe9,#f6d49b);border:4px solid #ffffff1f;border-radius:13px;place-items:center;height:98px;display:grid;position:relative;overflow:hidden}.curtain-window i{background:linear-gradient(90deg,#66594f,#a9998c);width:52%;transition:transform .75s cubic-bezier(.2,.8,.2,1);position:absolute;inset-block:0}.curtain-window i:first-child{inset-inline-start:0}.curtain-window i:nth-child(2){inset-inline-end:0}.curtain-control.open .curtain-window i:first-child{transform:translate(-82%)}.curtain-control.open .curtain-window i:nth-child(2){transform:translate(82%)}.curtain-window b{color:#ffffffe6;filter:drop-shadow(0 0 10px #fff)}.curtain-control>span:nth-child(2){flex-direction:column;display:flex}.curtain-control small{color:var(--muted)}.media-control{--mode-color:#9dc6ff;position:relative;overflow:hidden}.media-control.playing{--mode-color:#f4bd78;border-color:color-mix(in srgb,var(--mode-color) 28%,transparent)}.media-control:after{content:\"\";z-index:-1;background:radial-gradient(circle,color-mix(in srgb,var(--mode-color) 18%,transparent),transparent 68%);height:78%;position:absolute;inset:auto -25% -45%}.now-playing{grid-template-columns:68px minmax(0,1fr) 36px;align-items:center;gap:12px;min-height:82px;display:grid}.album-art{width:68px;height:68px;color:var(--cool);background:linear-gradient(145deg,#a8ceff2e,#f6bd721a) 50%/cover;border-radius:19px;place-items:center;transition:transform .35s;display:grid;box-shadow:inset 0 1px #ffffff24,0 12px 28px #0003}.media-control.playing .album-art{animation:4s ease-in-out infinite alternate album-float}@keyframes album-float{to{transform:translateY(-3px)rotate(.5deg)}}.now-playing>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.now-playing strong,.now-playing small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.now-playing small{color:var(--muted)}.equalizer{justify-content:center;align-items:flex-end;gap:3px;height:28px;display:flex}.equalizer i{background:var(--mode-color);opacity:.38;border-radius:5px;width:3px;height:20%}.media-control.playing .equalizer i{opacity:1;animation:.8s ease-in-out infinite alternate eq}.media-control.playing .equalizer i:nth-child(2){animation-delay:-.3s}.media-control.playing .equalizer i:nth-child(3){animation-delay:-.55s}.media-control.playing .equalizer i:nth-child(4){animation-delay:-.17s}@keyframes eq{to{height:95%}}.transport{justify-content:center;align-items:center;gap:12px;margin-block-start:12px;display:flex}.transport button{width:40px}.transport .play{color:#101723;background:var(--accent);border:0;width:52px}.media-progress{background:color-mix(in srgb,var(--tile-color) 55%,transparent);border-radius:6px;height:4px;margin-block-start:10px;overflow:hidden}.media-progress i{border-radius:inherit;background:var(--mode-color);height:100%;box-shadow:0 0 12px color-mix(in srgb,var(--mode-color) 45%,transparent);transition:width .4s linear;display:block}.media-times{color:var(--muted);font-variant-numeric:tabular-nums;justify-content:space-between;margin-block-start:4px;font-size:9px;display:flex}.volume-control{color:var(--muted);grid-template-columns:22px minmax(0,1fr) 34px;align-items:center;gap:8px;margin-block-start:13px;display:grid}.volume-control ha-icon{--mdc-icon-size:18px}.volume-control input{width:100%;accent-color:var(--mode-color)}.volume-control strong{text-align:end;font-variant-numeric:tabular-nums;font-size:10px}.scene-row{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;display:grid}.scene-row button{min-height:62px;color:var(--text);background:color-mix(in srgb,var(--tile-color) 48%,transparent);cursor:pointer;border:1px solid #ffffff17;border-radius:16px;flex-direction:column;justify-content:center;align-items:center;gap:5px;display:flex}.scene-row button ha-icon{color:var(--accent)}.mobile-nav{display:none}.sheet-layer{z-index:100;background:#0104088a;justify-content:center;align-items:flex-end;padding:12px;animation:.18s fade-in;display:flex;position:fixed;inset:0}.bottom-sheet{width:min(680px,100%);max-height:min(78vh,720px);padding:10px 16px calc(18px + env(safe-area-inset-bottom));border-radius:28px;animation:.28s cubic-bezier(.2,.85,.2,1) sheet-in;overflow-y:auto}.sheet-handle{background:#ffffff3d;border-radius:9px;width:42px;height:4px;margin:2px auto 10px}.bottom-sheet header{justify-content:space-between;align-items:center;margin-block-end:12px;display:flex}.bottom-sheet h2{margin:0;font-size:21px}.sheet-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;display:grid}.sheet-item{text-align:start;background:color-mix(in srgb,var(--tile-color) 48%,transparent);min-width:0;min-height:74px;color:var(--text);cursor:pointer;border:1px solid #ffffff1a;border-radius:17px;grid-template-columns:42px minmax(0,1fr) 22px;align-items:center;gap:11px;padding:10px;display:grid}.sheet-item>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.sheet-item strong{text-overflow:ellipsis;white-space:nowrap;font-size:14px;overflow:hidden}.sheet-item small{color:var(--muted);text-overflow:ellipsis;white-space:nowrap;font-size:10px;overflow:hidden}.sheet-icon{width:42px;height:42px;color:var(--cool);background:#a8ceff1a;border-radius:14px;place-items:center;display:grid}@keyframes fade-in{0%{opacity:0}}@keyframes sheet-in{0%{opacity:0;transform:translateY(32px)}}@media (max-width:1100px) and (min-width:761px){.desktop-rail{width:78px;padding:10px}.desktop-rail button{grid-template-columns:1fr;justify-items:center;padding:8px 4px}.desktop-rail button span,.rail-label{display:none}.content-shell{width:calc(100% - 94px);margin-inline-start:94px}.control-grid{grid-template-columns:1fr}.admin-menu{inset-inline-end:104px}}@media (max-width:760px){.app{padding:max(12px, env(safe-area-inset-top)) 12px calc(92px + env(safe-area-inset-bottom))}.desktop-rail{display:none}.content-shell{width:100%;margin-inline-start:0}.topbar{height:48px;margin-block-end:10px}.brand{font-size:15px}.connection{display:none}.hero{background-position:62%;border-radius:25px;grid-template-columns:minmax(0,1fr) auto;min-height:310px;padding:22px}.hero-overlay{background:linear-gradient(90deg,#04070ce0,#060a1175 66%,#060a112e)}.hero h1{letter-spacing:-1.5px;font-size:clamp(34px,11vw,48px)}.hero-time time{font-size:clamp(31px,9vw,42px)}.hero-status{scrollbar-width:none;width:100%;overflow-x:auto}.status{min-width:112px;padding:8px}.control-grid{grid-template-columns:1fr;gap:12px;margin-block-start:12px}.quick-panel,.context-panel{border-radius:22px;padding:17px}.quick-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.action-button{min-height:92px}.mobile-nav{z-index:80;border-radius:23px;grid-template-columns:repeat(5,1fr);max-width:540px;margin:auto;padding:5px;display:grid;position:fixed;inset-block-end:max(10px, env(safe-area-inset-bottom));inset-inline:12px}.mobile-nav button{min-width:0;min-height:55px;color:var(--muted);background:0 0;border:0;border-radius:17px;flex-direction:column;justify-content:center;align-items:center;gap:2px;display:flex}.mobile-nav button ha-icon{--mdc-icon-size:21px}.mobile-nav button span{text-overflow:ellipsis;white-space:nowrap;max-width:100%;font-size:10px;overflow:hidden}.mobile-nav button.active{color:#dcecff;background:#82b7fa29}.sheet-grid{grid-template-columns:1fr}.admin-menu{inset-block-start:66px;inset-inline:12px}.workspace-view{min-height:calc(100vh - 154px)}.workspace-header{border-radius:19px;min-height:62px}.workspace-title>span{width:38px;height:38px}.workspace-title h1{font-size:18px}.home-return span{display:none}.workspace-frame{border-radius:20px;min-height:calc(100vh - 232px)}.workspace-frame iframe{height:calc(100vh - 232px);min-height:560px}.room-view{gap:10px}.room-hero{border-radius:24px;min-height:220px;padding:16px}.room-back span{display:none}.room-identity h1{font-size:40px}.room-metrics{inset-block-end:12px;inset-inline:12px}.room-metrics span{min-width:70px;padding:6px}.room-zones{border-radius:18px;grid-template-columns:repeat(4,1fr);padding:5px;display:grid}.room-zones button{min-width:0;min-height:52px;color:var(--muted);background:0 0;border:0;border-radius:14px;flex-direction:column;justify-content:center;align-items:center;gap:2px;display:flex}.room-zones button span{font-size:9px}.room-zones button .homeii-glyph{width:20px;height:20px}.room-zones button.active{color:var(--text);background:#ffffff1c}.room-layout{display:block}.room-zone{display:none}.room-zone.selected{animation:.24s zone-in;display:block}.light-grid,.scene-row{grid-template-columns:repeat(2,minmax(0,1fr))}.device-panel,.thermostat,.curtain-panel,.media-control,.scene-panel{border-radius:22px;padding:15px}@keyframes zone-in{0%{opacity:.4;transform:translateY(5px)}}}@media (max-width:1120px) and (min-width:761px){.room-view{gap:11px}.room-hero{min-height:210px}.room-layout{grid-template-columns:minmax(235px,.72fr) minmax(0,1.28fr);grid-template-areas:\"climate lights\"\"media lights\"\"scenes scenes\";gap:10px}.light-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.light-control{min-height:104px}.device-panel,.thermostat,.media-control,.scene-panel{padding:15px}.thermostat-stage{width:min(178px,25vw)}.thermostat-dial strong{font-size:44px}.scene-row{grid-template-columns:repeat(4,minmax(0,1fr))}}@media (max-width:390px){.hero{grid-template-columns:1fr}.hero-time{position:absolute;inset-block-start:22px;inset-inline-end:20px}.hero-copy{padding-block-start:72px}}@media (prefers-reduced-motion:reduce){*,:before,:after{transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}@supports not ((-webkit-backdrop-filter:blur(1px)) or (backdrop-filter:blur(1px))){.glass{background:#0c121df0}.glass-soft{background:#0c121de0}}.desktop-rail.glass{-webkit-backdrop-filter:blur(34px)saturate(145%);background:linear-gradient(155deg,#191f2ae8,#0c111ad6);border-color:#ffffff2e;width:216px;padding:13px;box-shadow:inset 0 1px #ffffff29,0 28px 80px #00000057}.app{min-width:0;overflow-x:clip}.content-shell,.room-view,.room-layout,.room-zone{min-width:0}.room-zone{overflow:hidden}.content-shell{width:min(1460px,100% - 250px);margin-inline-start:234px}.desktop-rail .active{color:#fff;background:linear-gradient(135deg,#69aeff52,#5fe0cb1f);border:1px solid #9bcfff61;box-shadow:inset 0 1px #ffffff26,0 10px 28px #317eda29}.desktop-rail .active ha-icon{filter:drop-shadow(0 0 9px #7dbdff)}.rail-live{border-block:1px solid #ffffff17;gap:5px;margin-block-start:auto;padding:9px;display:grid}.rail-live span{color:#b9c4d3;grid-template-columns:25px 1fr auto;align-items:center;gap:7px;min-height:35px;display:grid}.rail-live ha-icon{--mdc-icon-size:18px;color:#8ebfff}.rail-live b{font-variant-numeric:tabular-nums;font-size:11px;font-weight:650}.rail-live small{color:#768397;font-size:9px}.rail-live .is-on ha-icon,.rail-live .is-on b{color:#ffc872}.rail-live .is-on ha-icon{animation:2s ease-in-out infinite alternate rail-glow}@keyframes rail-glow{to{filter:drop-shadow(0 0 9px #ffbd55);transform:scale(1.06)}}.desktop-rail .rail-more{background:#ffffff0e;border:1px solid #ffffff1f;grid-template-columns:1fr;align-self:center;width:44px;min-height:40px;margin-block-start:5px}.bottom-sheet.glass{-webkit-backdrop-filter:blur(38px)saturate(135%);backdrop-filter:blur(38px)saturate(135%);background:linear-gradient(150deg,#232a34f7,#10161ff7);border-color:#ffffff38;box-shadow:inset 0 1px #ffffff2e,0 35px 100px #0000008c}.sheet-layer{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);background:#03070ca8}.sheet-item{background:#fff1;border-color:#ffffff21}.admin-menu.glass{background:linear-gradient(150deg,#252b34fa,#10151dfa);border-color:#ffffff38;box-shadow:0 30px 90px #00000085}.room-view{gap:11px}.room-hero{border-radius:27px;min-height:clamp(190px,28vh,275px)}.room-hero-shade{background:linear-gradient(90deg,#05080dd1,#05080d6b 43%,#05080d29 76%),linear-gradient(#0000 40%,#04070c57)}.room-layout{grid-template-columns:minmax(320px,.82fr) minmax(0,1.18fr);grid-template-areas:\"climate lights\"\"media lights\"\"scenes scenes\";gap:10px}.room-view .glass{background:linear-gradient(150deg,#1e2631d1,#101721b8);border-color:#ffffff2e;box-shadow:inset 0 1px #ffffff21,0 16px 45px #00000038}.theme-light .room-view .glass{background:linear-gradient(150deg,#f5f9fcd1,#e0e9f0b8);border-color:#ffffffb8;box-shadow:inset 0 1px #fff,0 16px 45px #192b3c24}.widget-heading h2{font-size:19px;font-weight:700}.state-pill{border:1px solid #ffffff14;font-weight:700}.device-panel{--mode-color:#ffc36b}.light-grid{gap:9px}.light-control{background:linear-gradient(145deg,#ffffff13,#ffffff06);border-color:#ffffff1f;min-height:106px}.light-control.active{background:linear-gradient(145deg,#ffbb5245,#ff91341c);border-color:#ffcd7d94;box-shadow:inset 0 1px #fff3,0 12px 34px #ff992f2e}.light-control.active:after{content:\"\";z-index:-1;background:radial-gradient(circle at 18% 20%,#ffe0a647,#0000 42%);animation:2.4s ease-in-out infinite alternate light-alive;position:absolute;inset:0}.light-control:not(.active) .light-main small{color:#8f9aaa}.light-control.active .light-main strong,.light-control.active .light-main small{color:#fff}.light-control.active .light-main>ha-icon{color:#ffd18b;filter:drop-shadow(0 0 8px #ffbd55)}@keyframes light-alive{to{opacity:.45;transform:translate(5%)scale(1.04)}}.thermostat{--mode-color:#8795a8}.thermostat.mode-cool{--mode-color:#4aa8ff}.thermostat.mode-heat{--mode-color:#ff7a3d}.thermostat.mode-fan_only{--mode-color:#36d6bc}.thermostat.mode-dry{--mode-color:#9c7cff}.climate-verdict{color:var(--mode-color);background:color-mix(in srgb,var(--mode-color) 15%,#080d1585);border:1px solid color-mix(in srgb,var(--mode-color) 35%,transparent);border-radius:16px;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:10px;margin:0 0 10px;padding:9px 11px;display:grid}.climate-mode-icon{background:color-mix(in srgb,var(--mode-color) 18%,transparent);border-radius:13px;place-items:center;width:38px;height:38px;display:grid}.climate-mode-icon ha-icon{filter:drop-shadow(0 0 8px)}.thermostat.active .climate-mode-icon ha-icon{animation:1.8s ease-in-out infinite alternate climate-pulse}.thermostat.action-fan .climate-mode-icon ha-icon{animation:2.3s linear infinite air-orbit}.climate-verdict div{flex-direction:column;display:flex}.climate-verdict small{color:var(--muted);font-size:9px}.climate-verdict strong{color:var(--text);font-size:15px}.climate-verdict>b{color:var(--mode-color);background:color-mix(in srgb,var(--mode-color) 13%,transparent);border-radius:12px;padding:6px 9px;font-size:11px}@keyframes climate-pulse{to{filter:drop-shadow(0 0 13px);transform:scale(1.09)}}.thermostat-stage{border:2px solid color-mix(in srgb,var(--mode-color) 34%,transparent);width:min(166px,46vw);margin-block:0 6px}.thermostat-dial small{text-transform:none;font-size:10px}.thermostat-dial strong{color:#fff;font-size:48px;font-weight:650}.thermostat-dial .target-label{color:#dbe5f1;background:#ffffff14;border-radius:10px;margin-top:2px;padding:3px 8px}.thermostat-dial .target-label b{color:var(--mode-color);font-size:13px}.thermostat-dial>span:last-child{color:#aab5c5;margin-top:4px}.thermostat.action-cooling .airflow i,.thermostat.action-heating .airflow i{border-color:color-mix(in srgb,var(--mode-color) 58%,transparent)}.temperature-history{height:52px}.temperature-history svg{height:34px}.mode-row{margin-block-start:9px}.mode-row button{padding:6px 4px}.temperature-stepper button{width:38px}.temperature-stepper{grid-template-columns:38px 1fr 38px}@media (min-width:761px) and (max-height:900px){.room-hero{min-height:185px;padding:18px}.room-identity h1{font-size:44px}.device-panel,.thermostat,.media-control,.scene-panel{padding:14px}.light-control{min-height:92px}.light-main{min-height:61px}.swipe-hint{height:16px}.thermostat-stage{width:142px}.thermostat-dial strong{font-size:40px}.temperature-history{height:43px}.mode-row button{padding:5px 3px}.room-layout{gap:8px}}@media (max-width:1100px) and (min-width:761px){.desktop-rail.glass{width:80px}.content-shell{width:calc(100% - 98px);margin-inline-start:98px}.rail-live span{grid-template-columns:1fr;justify-items:center;gap:2px}.rail-live small,.rail-live b{font-size:8px}.room-layout{grid-template-columns:minmax(275px,.8fr) minmax(0,1.2fr)}.room-hero{min-height:190px}}@media (max-width:760px){.room-hero{min-height:205px}.room-view .glass{background:linear-gradient(150deg,#1b232eeb,#0e141de0)}.room-zones.glass-soft{-webkit-backdrop-filter:blur(26px);backdrop-filter:blur(26px);background:#131b26e0;border:1px solid #ffffff24}.climate-verdict{grid-template-columns:38px minmax(0,1fr) auto}.thermostat-stage{width:min(174px,48vw)}}@media (min-width:761px) and ((max-width:1366px) or (max-height:860px)){.room-view{grid-template-rows:minmax(150px,25dvh) 58px minmax(0,1fr);height:calc(100dvh - 92px);overflow:hidden}.room-zones{-webkit-backdrop-filter:blur(26px);backdrop-filter:blur(26px);background:#131b26e0;border:1px solid #ffffff24;border-radius:18px;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;padding:5px;display:grid;position:relative}.room-zones button{min-width:0;color:var(--muted);cursor:pointer;background:0 0;border:0;border-radius:13px;justify-content:center;align-items:center;gap:7px;display:flex}.room-zones button.active{color:#fff;background:linear-gradient(135deg,#5ba5ff40,#ffffff14);box-shadow:inset 0 1px #ffffff21}.room-layout{min-height:0;display:block;overflow:hidden}.room-zone{scrollbar-width:thin;height:100%;display:none;overflow:auto}.room-zone.selected{animation:.24s zone-in;display:block}.room-zone.selected>section,.room-zone.selected.device-panel{height:auto;min-height:100%}.light-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.room-hero{height:100%;min-height:0}}@media (min-width:761px) and (max-width:980px){.light-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.room-zones button span{font-size:11px}}@media (max-width:760px){.app{min-height:100dvh}.content-shell,.room-layout,.room-zone{overflow:visible}.bottom-sheet{max-height:min(76dvh,680px)}.admin-menu{max-height:calc(100dvh - 150px)}}@media (max-width:430px){.room-hero{min-height:190px}.room-identity h1{font-size:34px}.room-metrics span{min-width:62px}.light-grid{grid-template-columns:1fr}.widget-heading{grid-template-columns:40px minmax(0,1fr) auto}.state-pill{padding:4px 7px}}@media (min-width:761px){.topbar{display:none}.rail-brand{grid-template-columns:46px 1fr!important;min-height:62px!important;padding:7px!important}.rail-brand .brand-mark{width:44px;height:44px}.rail-brand strong{letter-spacing:-.3px;font-size:17px}.rail-system{grid-template-columns:1fr 42px 42px;align-items:center;gap:6px;margin-block-start:4px;display:grid}.rail-system>span{background:#ffffff0b;border:1px solid #ffffff17;border-radius:13px;place-items:center;height:38px;display:grid}.rail-system>span i{background:#e57474;border-radius:50%;width:8px;height:8px}.rail-system>span.online i{background:#67d5a2;box-shadow:0 0 12px #67d5a2}.desktop-rail .rail-system button{background:#ffffff0b;border:1px solid #ffffff17;grid-template-columns:1fr;height:38px;min-height:38px;padding:0}}@media (max-width:1100px) and (min-width:761px){.rail-brand{grid-template-columns:1fr!important}.rail-brand strong{display:none}.rail-system{grid-template-columns:1fr}.rail-system>span{height:30px}.rail-live{padding-inline:0}}@media (max-width:760px){.topbar{display:flex}.brand span:last-child{font-size:0}.brand span:last-child:after{content:\"HOMEii\";font-size:15px}}.hero-status{display:none}.status-carousel{overscroll-behavior-inline:contain;scroll-snap-type:inline mandatory;scrollbar-width:none;z-index:2;grid-column:1/-1;align-self:end;gap:9px;width:min(100%,900px);padding:3px;display:flex;overflow-x:auto}.status-carousel::-webkit-scrollbar{display:none}.status-card{scroll-snap-align:start;color:#eef5ff;text-align:start;-webkit-backdrop-filter:blur(22px)saturate(150%);backdrop-filter:blur(22px)saturate(150%);cursor:pointer;background:#0d141ead;border:1px solid #ffffff26;border-radius:20px;flex:0 0 225px;grid-template-columns:46px minmax(0,1fr) 20px;align-items:center;gap:9px;min-height:72px;padding:10px;display:grid;box-shadow:inset 0 1px #ffffff1f,0 12px 35px #0003}.status-card-icon{color:#91a4ba;background:#ffffff12;border-radius:15px;place-items:center;width:44px;height:44px;display:grid;position:relative}.status-card-icon>i{border:1px solid #0000;border-radius:18px;position:absolute;inset:-3px}.status-card.active .status-card-icon>i{opacity:.55;border-color:currentColor;animation:2.6s linear infinite status-orbit}.status-card.active.status-person .status-card-icon{color:#5ed9ad}.status-card>span:nth-child(2){flex-direction:column;min-width:0;display:flex}.status-card small{color:#9ba9bb;font-size:10px}.status-card strong{white-space:nowrap;text-overflow:ellipsis;font-size:13px;overflow:hidden}.status-card>ha-icon{--mdc-icon-size:18px;color:#8997aa}@keyframes status-orbit{to{transform:rotate(360deg)}}.intent-dock{z-index:3;border-radius:20px;grid-template-columns:1.15fr repeat(3,1fr);gap:5px;width:min(390px,42%);padding:6px;display:grid;position:absolute;inset-block-start:128px;inset-inline-start:clamp(22px,3vw,44px)}.intent-title{flex-direction:column;justify-content:center;padding:7px 10px;display:flex}.intent-title small{color:#ffffff8c;font-size:9px}.intent-title strong{font-size:12px}.intent-dock button{color:#fff;cursor:pointer;background:0 0;border:0;border-radius:15px;flex-direction:column;align-items:center;gap:1px;min-width:0;padding:7px 4px;display:flex}.intent-dock button:hover{background:#ffffff17}.intent-dock button span{color:#9dc6ff;background:#9dc6ff1c;border-radius:11px;place-items:center;width:30px;height:30px;display:grid}.intent-dock button b{font-size:10px}.intent-dock button small{color:#ffffff8c;white-space:nowrap;font-size:8px}.intent-dock ha-icon{--mdc-icon-size:18px}.status-dialog-layer{z-index:110;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:#02060b9e;place-items:center;padding:18px;animation:.2s fade-in;display:grid;position:fixed;inset:0}.status-dialog{--status-color:#7fb6ff;color:#f4f7fb;background:linear-gradient(150deg,#232b37fa,#0d131cfa);border:1px solid #ffffff38;border-radius:30px;grid-template-rows:auto minmax(0,1fr) auto;width:min(620px,100%);max-height:min(78dvh,760px);padding:18px;animation:.3s cubic-bezier(.2,.85,.2,1) sheet-in;display:grid;overflow:hidden;box-shadow:inset 0 1px #ffffff29,0 40px 120px #00000094}.status-dialog.status-light{--status-color:#ffc264}.status-dialog.status-climate{--status-color:#58aeff}.status-dialog.status-media_player{--status-color:#ba8cff}.status-dialog.status-person{--status-color:#5ed9ad}.status-dialog>header{border-block-end:1px solid #ffffff1a;grid-template-columns:48px minmax(0,1fr) 42px;align-items:center;gap:11px;padding-block-end:14px;display:grid}.status-dialog-icon{width:46px;height:46px;color:var(--status-color);background:color-mix(in srgb,var(--status-color) 14%,transparent);border-radius:16px;place-items:center;display:grid}.status-dialog header small{color:#91a0b2;font-size:10px}.status-dialog h2{margin:0;font-size:22px}.status-dialog header button,.status-entity-list article>button{color:#fff;cursor:pointer;background:#ffffff0f;border:1px solid #ffffff1f;border-radius:14px;place-items:center;width:40px;height:40px;display:grid}.status-entity-list{gap:7px;padding-block:10px;display:grid;overflow:auto}.status-entity-list article{background:#ffffff0b;border:1px solid #ffffff14;border-radius:17px;grid-template-columns:42px minmax(0,1fr) 42px;align-items:center;gap:10px;padding:9px;display:grid}.status-entity-list article.active{background:color-mix(in srgb,var(--status-color) 11%,#ffffff0a);border-color:color-mix(in srgb,var(--status-color) 32%,transparent)}.status-entity-list article>span{color:#8795a8;background:#ffffff0e;border-radius:13px;place-items:center;width:40px;height:40px;display:grid}.status-entity-list article.active>span,.status-entity-list article.active>button{color:var(--status-color)}.status-entity-list article div{flex-direction:column;display:flex}.status-entity-list article strong{font-size:13px}.status-entity-list article small{color:#8f9caf;font-size:10px}.status-dialog footer{color:#8492a5;border-block-start:1px solid #ffffff17;align-items:center;gap:7px;padding-block-start:10px;font-size:10px;display:flex}.status-empty{min-height:180px;color:var(--status-color);flex-direction:column;justify-content:center;align-items:center;gap:10px;display:flex}.status-empty ha-icon{--mdc-icon-size:42px}.admin-menu{width:min(680px,100vw - 280px);padding:20px}.admin-menu-head{z-index:2;-webkit-backdrop-filter:blur(25px);backdrop-filter:blur(25px);background:#131922f0;border-block-end:1px solid #ffffff1a;grid-template-columns:1fr 44px;align-items:center;gap:10px;margin:-20px -20px 14px;padding:18px 20px 13px;display:grid;position:sticky;top:-20px}.admin-menu-head div{flex-direction:column;display:flex}.admin-menu-head small{color:var(--accent);font-size:9px}.admin-menu-head strong{font-size:20px}.admin-close{place-items:center;height:42px;display:grid;border-radius:14px!important;width:42px!important;margin:0!important;padding:0!important}.appearance-editor{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.appearance-group{background:#ffffff09;border:1px solid #ffffff14;border-radius:17px;min-width:0;padding:14px}.appearance-group h3{margin:0 0 10px;font-size:13px}.appearance-editor>button,.appearance-editor>small{grid-column:1/-1}.climate-verdict{display:none}.thermostat{transition:background .45s,border-color .45s;background:linear-gradient(150deg,color-mix(in srgb,var(--mode-color) 14%,#1b232ee0),#0e141dd1)!important}.thermostat-stage{box-shadow:none!important;background:0 0!important;border:0!important}.thermostat-stage:before{background:#0a0f18f0;inset:19px;box-shadow:inset 0 1px #ffffff1c,0 14px 40px #00000040}.temperature-ring{border-radius:50%;position:absolute;-webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 5px),#000 0);mask:radial-gradient(farthest-side,#0000 calc(100% - 5px),#000 0)}.target-ring{background:conic-gradient(from 210deg,var(--mode-color) var(--thermo-progress),#ffffff14 0);filter:drop-shadow(0 0 8px color-mix(in srgb,var(--mode-color) 45%,transparent));inset:0}.current-ring{background:conic-gradient(from 210deg,#f4f7fb var(--current-progress),#ffffff12 0);opacity:.72;inset:9px}.thermostat.active .target-ring{animation:2.2s ease-in-out infinite alternate ring-breathe}.thermostat.action-cooling .airflow,.thermostat.action-heating .airflow,.thermostat.action-fan .airflow{opacity:.45}@keyframes ring-breathe{to{filter:drop-shadow(0 0 14px var(--mode-color));transform:scale(1.012)}}@media (max-width:760px){.status-carousel{width:calc(100% + 6px);margin-inline:-3px}.status-card{flex-basis:205px}.intent-dock{grid-template-columns:repeat(3,1fr);width:auto;position:absolute;inset-block-start:68px;inset-inline:16px}.intent-title{display:none}.admin-menu{width:auto}.appearance-editor{grid-template-columns:1fr}.appearance-editor>button,.appearance-editor>small{grid-column:auto}.status-dialog{border-radius:25px;padding:14px}}.intent-cinema .room-layout{grid-template-columns:minmax(300px,.85fr) minmax(0,1.15fr);grid-template-areas:\"media lights\"\"scenes lights\";display:grid;overflow:hidden}.intent-cinema .room-zone-media,.intent-cinema .room-zone-lights,.intent-cinema .room-zone-scenes{display:block}.intent-cinema .room-zone-climate{display:none}.intent-cinema .room-zone-lights{overflow:auto}.intent-cinema .light-control{min-height:92px}.intent-cinema .light-main{min-height:60px}@media (max-width:760px){.intent-cinema .room-layout{display:block;overflow:visible}.intent-cinema .room-zone-media,.intent-cinema .room-zone-scenes,.intent-cinema .room-zone-lights{margin-block-end:9px;display:block}.intent-cinema .light-grid{scroll-snap-type:inline mandatory;display:flex;overflow-x:auto}.intent-cinema .light-control{scroll-snap-align:start;flex:0 0 185px}}.palette-rich-brown{--bg:#140f0d;--section-color:#241914;--tile-color:#3a2921;--text:#fff8f2;--muted:#ffeee0ad;--line:#ffe1cb29}.palette-night-blue{--bg:#070d18;--section-color:#111c2e;--tile-color:#1d2b42;--text:#f4f8ff;--muted:#dce8faa8;--line:#b9d3f726}.palette-granite{--bg:#0d0e10;--section-color:#1a1c20;--tile-color:#292c31;--text:#f5f5f4;--muted:#e8e9e8a3;--line:#ffffff24}.palette-bright-white{--bg:#f7f9fc;--section-color:#fff;--tile-color:#e9eef5;--text:#111827;--muted:#1e293ba6;--line:#1e293b1f}.palette-cream{--bg:#f5f0e7;--section-color:#fffaf1;--tile-color:#eae0d1;--text:#302820;--muted:#403327a6;--line:#4c3a2a21}.palette-ivory{--bg:#f0ede4;--section-color:#faf7ed;--tile-color:#e5dfd2;--text:#292722;--muted:#37342da3;--line:#443e3421}.palette-mocha{--bg:#e8ddd2;--section-color:#f3e9df;--tile-color:#d9c9bb;--text:#332923;--muted:#43342ba6;--line:#523d3124}.homeii-icon{flex:none;width:24px;height:24px;display:block;overflow:visible}.desktop-rail .homeii-icon{justify-self:center;width:23px;height:23px}.rail-system .homeii-icon{width:20px;height:20px}.homeii-icon .hi-motion{filter:none;animation:none;transform:none}.status-card.active.status-light .status-card-icon>i{animation:1.8s ease-in-out infinite status-light-ring}.status-card.active.status-light .status-card-icon>ha-icon{animation:1.8s ease-in-out infinite alternate status-light-icon}.status-card.active.status-climate .status-card-icon>i{border-style:dashed;animation:5s linear infinite status-climate-ring}.status-card.active.status-climate .status-card-icon>ha-icon{animation:2.2s ease-in-out infinite status-climate-icon}.status-card.active.status-media_player .status-card-icon>i{animation:1.1s cubic-bezier(.3,.7,.3,1) infinite status-media-ring}.status-card.active.status-media_player .status-card-icon>ha-icon{animation:1.1s ease-in-out infinite alternate status-media-icon}.status-card.active.status-person .status-card-icon>i{animation:2.8s ease-in-out infinite status-person-ring}.status-card.active.status-person .status-card-icon>ha-icon{animation:2.8s ease-in-out infinite alternate status-person-icon}@keyframes status-light-ring{50%{opacity:.12;transform:scale(1.11);box-shadow:0 0 18px}}@keyframes status-light-icon{to{filter:drop-shadow(0 0 9px);transform:scale(1.07)}}@keyframes status-climate-ring{to{transform:rotate(360deg)}}@keyframes status-climate-icon{50%{filter:drop-shadow(0 4px 7px);transform:translateY(-2px)}}@keyframes status-media-ring{50%{opacity:.2;transform:scale(1.07)}}@keyframes status-media-icon{to{transform:scale(1.11)}}@keyframes status-person-ring{50%{opacity:.25;transform:scale(1.05)}}@keyframes status-person-icon{to{opacity:.72;transform:scale(.97)}}.theme-light.app{background-color:var(--bg)}.theme-light .desktop-rail.glass{color:var(--text);background:linear-gradient(155deg,color-mix(in srgb,var(--section-color) 94%,white),color-mix(in srgb,var(--section-color) 82%,transparent));border-color:#ffffffbf;box-shadow:inset 0 1px #fff,0 28px 70px #362d2626}.theme-light .desktop-rail button,.theme-light .rail-live span{color:var(--muted)}.theme-light .desktop-rail .active{color:var(--text);background:linear-gradient(135deg,#5a99e533,#ffffff80);border-color:#497dbe3d}.theme-light .rail-system>span,.theme-light .desktop-rail .rail-system button{color:var(--text);background:#ffffff80;border-color:#2832411a}.theme-light .admin-menu.glass,.theme-light .bottom-sheet.glass,.theme-light .status-dialog{color:var(--text);background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 96%,white),color-mix(in srgb,var(--section-color) 88%,white));border-color:#fffc}.theme-light .admin-menu-head{background:color-mix(in srgb,var(--section-color) 95%,white)}.theme-light .appearance-group,.theme-light .status-entity-list article{background:#282d370b;border-color:#23283217}.light-control,.action-button,.scene-row button,.sheet-item,.state-pill{background:rgb(from var(--tile-color) r g b / var(--tile-alpha))}.setting-caption{color:var(--muted);margin-block-start:9px;font-size:9px;display:block}.palette-segments button{font-size:9px!important}.intent-dock{width:min(500px,39%);top:235px;left:clamp(34px,4vw,64px);right:auto}@media (max-width:760px){.intent-dock{width:auto;top:70px;left:16px;right:16px}}.room-flow{z-index:3;border-radius:18px;grid-template-columns:1.25fr repeat(3,1fr);gap:4px;width:min(430px,42%);padding:5px;display:grid;position:absolute;top:22px;left:22px;right:auto}.room-flow>span{flex-direction:column;justify-content:center;padding:6px 9px;display:flex}.room-flow small{color:#ffffff8f;font-size:8px}.room-flow strong{font-size:11px}.room-flow button{color:#fff;cursor:pointer;background:0 0;border:0;border-radius:13px;justify-content:center;align-items:center;gap:4px;padding:6px 3px;display:flex}.room-flow button:hover{background:#ffffff1a}.room-flow button b{font-size:9px}.room-flow button ha-icon{--mdc-icon-size:17px;color:#9dc6ff}.room-status-strip{z-index:3;border-radius:18px;gap:4px;padding:5px;display:flex;position:absolute;bottom:22px;left:22px;right:auto}.room-status-strip button{color:#ffffffa3;text-align:start;cursor:pointer;background:0 0;border:0;border-radius:13px;align-items:center;gap:7px;min-width:86px;padding:7px 9px;display:flex}.room-status-strip button span{flex-direction:column;display:flex}.room-status-strip b{font-size:13px}.room-status-strip small{font-size:8px}.room-status-strip ha-icon{--mdc-icon-size:19px}@media (max-width:760px){.room-flow{grid-template-columns:repeat(3,1fr);width:auto;top:58px;left:12px;right:12px}.room-flow>span{display:none}.room-status-strip{bottom:12px;left:12px}.room-status-strip button{min-width:68px;padding:6px}.room-identity{padding-block-end:48px}}.thermostat-stage{width:min(238px,58vw)!important}.temperature-ring{-webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 11px),#000 0);mask:radial-gradient(farthest-side,#0000 calc(100% - 11px),#000 0)}.current-ring{inset:15px}.thermostat-stage:before{inset:34px}.thermostat-dial strong{font-size:58px}.thermostat-dial .target-label{padding:5px 10px;font-size:12px}.thermostat-dial .target-label b{font-size:17px}@media (max-height:900px) and (min-width:761px){.thermostat-stage{width:195px!important}.thermostat-dial strong{font-size:49px}}.desktop-rail.glass{background:linear-gradient(155deg,color-mix(in srgb,var(--section-color) 94%,black),color-mix(in srgb,var(--section-color) 78%,transparent));border-color:var(--line)}.desktop-rail .active{background:linear-gradient(135deg,color-mix(in srgb,var(--rail-accent) 30%,transparent),color-mix(in srgb,var(--rail-accent) 8%,transparent));border-color:color-mix(in srgb,var(--rail-accent) 42%,transparent)}.desktop-rail button.active .homeii-icon{color:var(--rail-accent)}.room-view .glass{background:linear-gradient(150deg,rgb(from var(--section-color) r g b / var(--surface-alpha)),color-mix(in srgb,var(--section-color) 70%,transparent));border-color:var(--line)}.bottom-sheet.glass,.admin-menu.glass,.status-dialog{background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 96%,black),color-mix(in srgb,var(--section-color) 86%,black));border-color:var(--line)}.theme-light .room-view .glass{background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 92%,white),color-mix(in srgb,var(--section-color) 78%,transparent));color:var(--text)}.theme-light .thermostat{background:linear-gradient(150deg,color-mix(in srgb,var(--mode-color) 8%,var(--section-color)),color-mix(in srgb,var(--section-color) 84%,white))!important}.theme-light .thermostat-dial strong{color:var(--text)}.theme-light .thermostat-dial .target-label{color:var(--text);background:#1e242c12}.flow-launcher{z-index:6;width:270px;position:absolute;top:220px;left:clamp(34px,4vw,64px);right:auto}.flow-trigger{color:#fff;text-align:start;cursor:pointer;border-radius:20px;grid-template-columns:38px minmax(0,1fr) 20px;align-items:center;gap:9px;width:100%;min-height:58px;padding:8px 11px;display:grid}.flow-trigger>.homeii-icon{color:#a8ceff;width:26px;height:26px}.flow-trigger>span{flex-direction:column;display:flex}.flow-trigger small{color:#ffffff8f;font-size:8px}.flow-trigger strong{font-size:12px}.flow-launcher .intent-dock{grid-template-columns:repeat(3,1fr);width:100%;padding:6px;display:grid;position:absolute;top:calc(100% + 7px);left:0;right:auto}.flow-launcher .intent-dock button{min-height:68px}.flow-launcher .intent-title{display:none}.room-flow-launcher{z-index:6;width:235px;position:absolute;top:22px;left:22px;right:auto}.room-flow-trigger{color:#fff;text-align:start;cursor:pointer;border-radius:18px;grid-template-columns:34px minmax(0,1fr) 18px;align-items:center;gap:8px;width:100%;min-height:52px;padding:7px 10px;display:grid}.room-flow-trigger>.homeii-icon{color:#9dc6ff;width:23px;height:23px}.room-flow-trigger span{flex-direction:column;display:flex}.room-flow-trigger small{color:#ffffff8f;font-size:8px}.room-flow-trigger strong{font-size:10px}.room-flow-launcher .room-flow{grid-template-columns:repeat(3,1fr);width:100%;padding:6px;display:grid;position:absolute;top:calc(100% + 6px);left:0;right:auto}.room-flow-launcher .room-flow button{flex-direction:column;min-height:61px}.room-flow-launcher .room-flow .homeii-icon{color:#9dc6ff;width:20px;height:20px}@media (min-width:761px){.app{height:100dvh;min-height:0;overflow:hidden}.content-shell{height:calc(100dvh - 36px);overflow:hidden}.room-view{grid-template-rows:minmax(270px,40%) 58px minmax(0,1fr);gap:10px;height:100%;display:grid;overflow:hidden}.room-hero{height:100%;min-height:0}.room-zones{background:color-mix(in srgb,var(--section-color) 78%,transparent);border:1px solid var(--line);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);border-radius:18px;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:5px;padding:5px;display:grid;position:relative}.room-zones button{min-width:0;color:var(--muted);cursor:pointer;background:0 0;border:0;border-radius:13px;justify-content:center;align-items:center;gap:7px;display:flex}.room-zones button.active{color:var(--text);background:rgb(from var(--tile-color) r g b / var(--tile-alpha));box-shadow:inset 0 1px #ffffff1f}.room-layout,.intent-cinema .room-layout{height:100%;min-height:0;display:block;overflow:hidden}.room-zone,.intent-cinema .room-zone-media,.intent-cinema .room-zone-lights,.intent-cinema .room-zone-scenes{height:100%;display:none;overflow:hidden}.room-zone.selected,.intent-cinema .room-zone.selected{animation:.22s zone-in;display:block}.room-zone.selected>section,.room-zone.selected.device-panel{height:100%;min-height:0;overflow:hidden}.device-panel,.thermostat,.media-control,.scene-panel{height:100%;padding:14px}.light-grid{grid-template-rows:repeat(3,minmax(0,1fr));grid-template-columns:repeat(3,minmax(0,1fr));align-content:stretch;height:calc(100% - 66px)}.light-control{height:100%;min-height:0}.light-main{min-height:58px}.swipe-hint{height:15px}.widget-pagination{position:absolute;inset-block-end:10px;inset-inline-end:14px}.thermostat{grid-template:\"head head\"\"dial history\"minmax(52px,1fr)\"dial step\"\"dial modes\"/minmax(300px,.9fr) minmax(360px,1.1fr);column-gap:22px;display:grid}.thermostat>.widget-heading{grid-area:head}.thermostat-stage{grid-area:dial;align-self:center}.thermostat>.temperature-history{grid-area:history;align-self:end}.thermostat>.temperature-stepper{grid-area:step}.thermostat>.mode-row{grid-area:modes}.thermostat-stage{width:min(250px,26vw)!important}.temperature-history{height:90px}.temperature-history svg{height:66px}.mode-row{overflow:hidden}.control-grid{height:calc(50% - 8px);overflow:hidden}.hero{height:50%;min-height:0}}.widget-pagination{align-items:center;gap:6px;display:flex}.widget-pagination button{border:1px solid var(--line);width:28px;height:28px;color:var(--text);background:rgb(from var(--tile-color) r g b / var(--tile-alpha));cursor:pointer;border-radius:10px;place-items:center;display:grid}.widget-pagination button:disabled{opacity:.3}.widget-pagination span{color:var(--muted);font-variant-numeric:tabular-nums;font-size:10px}.security-panel{padding:16px}.security-grid{grid-template-rows:repeat(3,minmax(0,1fr));grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;height:calc(100% - 60px);display:grid}.security-grid article{background:rgb(from var(--tile-color) r g b / var(--tile-alpha));border:1px solid var(--line);border-radius:17px;align-items:center;gap:10px;min-width:0;padding:12px;display:flex}.security-grid article>ha-icon{color:#66d2a5}.security-grid article.alert{background:#96262624;border-color:#ff6f6f6b}.security-grid article.alert>ha-icon{color:#f77}.security-grid article span{flex-direction:column;min-width:0;display:flex}.security-grid strong{white-space:nowrap;text-overflow:ellipsis;font-size:12px;overflow:hidden}.security-grid small{color:var(--muted);font-size:9px}.status-card.active.status-security .status-card-icon{color:#ff8585}.status-dialog.status-security{--status-color:#ff8585}@media (max-width:760px){.flow-launcher{width:auto;top:68px;left:16px;right:16px}.flow-launcher .intent-dock{width:100%}.room-flow-launcher{width:210px;top:56px;left:12px;right:auto}.room-status-strip{bottom:10px}}.hero,.room-hero{border-color:color-mix(in srgb,var(--line) 65%,transparent);box-shadow:inset 0 0 0 1px #ffffff09,0 18px 55px #0000002e}.hero:before,.room-hero:before{content:none}.room-zones button.active{color:var(--text);border:1px solid color-mix(in srgb,var(--rail-accent) 38%,transparent);background:color-mix(in srgb,var(--rail-accent) 17%,rgb(from var(--tile-color) r g b / var(--tile-alpha)))}.status-card.active.status-light .status-card-icon{color:var(--accent)}.status-card.active.status-climate .status-card-icon{color:var(--cool)}.status-card.active.status-media_player .status-card-icon{color:var(--rail-accent)}.room-status-strip button.active{color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,transparent)}.room-status-strip button.climate{color:var(--cool);background:color-mix(in srgb,var(--cool) 14%,transparent)}.room-status-strip button.media{color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 14%,transparent)}@media (max-width:760px){.app{height:auto;min-height:100dvh;padding:10px 10px calc(86px + env(safe-area-inset-bottom));overflow:hidden auto}.content-shell{height:auto;overflow:visible}.topbar{z-index:12;position:relative}.hero{background-position:58%;height:430px;min-height:430px;padding:18px;display:block}.hero-copy{inset-inline:18px;z-index:2;padding:0;position:absolute;top:18px}.hero-copy .eyebrow{font-size:11px}.hero-copy h1{max-width:9ch;font-size:38px}.hero-copy p{margin-top:6px;font-size:11px}.hero-time{position:absolute;top:20px;left:18px;right:auto}.hero-time time{font-size:32px}.hero-time span{font-size:11px}.flow-launcher{z-index:8;width:auto;top:145px;left:16px;right:16px}.flow-trigger{min-height:54px}.flow-launcher .intent-dock{z-index:10;top:calc(100% + 6px)}.status-carousel{z-index:4;width:auto;margin:0;padding:2px;position:absolute;bottom:12px;left:12px;right:12px}.status-card{flex-basis:190px;min-height:64px}.room-view{height:auto;display:block;overflow:visible}.room-hero{height:310px;min-height:310px;padding:14px}.room-back{z-index:8;position:absolute;top:12px;right:12px}.room-identity{padding:0;position:absolute;bottom:74px;right:16px}.room-identity h1{font-size:34px}.room-identity p{font-size:11px}.room-metrics{display:none}.room-flow-launcher{width:190px;top:12px;left:12px;right:auto}.room-flow-launcher .room-flow{z-index:10}.room-status-strip{grid-template-columns:repeat(3,minmax(0,1fr));width:auto;display:grid;bottom:10px;left:12px;right:12px}.room-status-strip button{justify-content:center;min-width:0;padding:6px}.room-status-strip button span{align-items:center}.room-status-strip small{font-size:7px}.room-zones{z-index:3;grid-template-columns:repeat(auto-fit,minmax(62px,1fr));gap:4px;margin-top:9px;padding:4px;display:grid;position:relative}.room-zones button{flex-direction:column;gap:1px;min-height:50px;padding:4px}.room-zones button span{font-size:8px}.room-layout,.intent-cinema .room-layout{height:auto;margin-top:9px;display:block;overflow:visible}.room-zone,.intent-cinema .room-zone-media,.intent-cinema .room-zone-lights,.intent-cinema .room-zone-scenes{height:auto;display:none;overflow:visible}.room-zone.selected,.intent-cinema .room-zone.selected{display:block}.room-zone.selected>section,.room-zone.selected.device-panel{height:auto;overflow:visible}.device-panel,.thermostat,.media-control,.scene-panel,.security-panel{height:auto;padding:13px}.light-grid{grid-template-rows:none;grid-template-columns:repeat(2,minmax(0,1fr));height:auto;display:grid}.light-control{height:auto;min-height:102px}.widget-pagination{justify-content:center;margin-top:8px;position:static}.thermostat{display:block}.thermostat-stage{width:min(220px,67vw)!important}.temperature-history{height:62px}.temperature-history svg{height:42px}.mode-row{overflow-x:auto}.security-grid{grid-template-rows:none;grid-template-columns:1fr;height:auto}.admin-menu{z-index:120;inset:58px 10px calc(84px + env(safe-area-inset-bottom));width:auto;max-height:none;position:fixed}.status-dialog-layer,.sheet-layer{z-index:130;padding-bottom:calc(82px + env(safe-area-inset-bottom))}.mobile-nav{z-index:100}}@media (max-width:390px){.hero{height:450px;min-height:450px}.light-grid{grid-template-columns:1fr}.room-flow-launcher{width:170px}.room-status-strip button ha-icon{--mdc-icon-size:17px}}.app.ha-narrow{width:100%!important;max-width:none!important;height:auto!important;min-height:100dvh!important;padding:10px 10px calc(86px + env(safe-area-inset-bottom))!important;overflow:hidden auto!important}.ha-narrow .desktop-rail{display:none!important}.ha-narrow .content-shell{width:100%!important;max-width:none!important;height:auto!important;margin:0!important;display:block!important;overflow:visible!important}.ha-narrow .topbar{z-index:12;position:relative;display:flex!important}.ha-narrow .mobile-nav{display:grid!important}.ha-narrow .hero{width:100%!important;height:430px!important;min-height:430px!important;padding:18px!important;display:block!important}.ha-narrow .hero-copy{inset-inline:18px;padding:0;position:absolute;top:18px}.ha-narrow .hero-copy h1{font-size:38px}.ha-narrow .hero-time{position:absolute;top:20px;left:18px;right:auto}.ha-narrow .hero-time time{font-size:32px}.ha-narrow .flow-launcher{width:auto;top:145px;left:16px;right:16px}.ha-narrow .status-carousel{width:auto;margin:0;position:absolute;bottom:12px;left:12px;right:12px}.ha-narrow .status-card{flex-basis:190px}.ha-narrow .control-grid{grid-template-columns:1fr!important;width:100%!important;height:auto!important;display:grid!important;overflow:visible!important}.ha-narrow .quick-panel,.ha-narrow .context-panel{width:100%;min-width:0}.ha-narrow .quick-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.ha-narrow .room-view{width:100%!important;height:auto!important;display:block!important;overflow:visible!important}.ha-narrow .room-hero{width:100%!important;height:310px!important;min-height:310px!important}.ha-narrow .room-metrics{display:none}.ha-narrow .room-flow-launcher{width:190px;top:12px;left:12px;right:auto}.ha-narrow .room-status-strip{grid-template-columns:repeat(3,minmax(0,1fr));width:auto;display:grid;bottom:10px;left:12px;right:12px}.ha-narrow .room-zones{margin-top:9px;grid-template-columns:repeat(auto-fit,minmax(62px,1fr))!important;display:grid!important}.ha-narrow .room-layout{width:100%!important;height:auto!important;display:block!important;overflow:visible!important}.ha-narrow .room-zone{width:100%!important;min-width:0!important;height:auto!important;display:none!important;overflow:visible!important}.ha-narrow .room-zone.selected{display:block!important}.ha-narrow .room-zone.selected>section,.ha-narrow .room-zone.selected.device-panel{display:block;width:100%!important;min-width:0!important;height:auto!important;overflow:visible!important}.ha-narrow .light-grid{grid-template-rows:none!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;height:auto!important}.ha-narrow .thermostat{grid-template-columns:none!important;display:block!important}.ha-narrow .thermostat-stage{width:min(220px,67vw)!important}.ha-narrow .security-grid{grid-template-rows:none;grid-template-columns:1fr;height:auto}.ha-narrow .admin-menu{inset:58px 10px calc(84px + env(safe-area-inset-bottom));width:auto;max-height:none;position:fixed}.room-status-settings{z-index:7;color:#fff;cursor:pointer;border-radius:13px;place-items:center;width:36px;height:36px;display:grid;position:absolute;bottom:22px;left:calc(30px + min(430px,42%))}.room-status-config{z-index:12;border-radius:18px;width:230px;padding:13px;position:absolute;bottom:68px;left:22px}.room-status-config>strong{margin-bottom:8px;font-size:12px;display:block}.room-status-config label{min-height:34px;color:var(--text);justify-content:space-between;align-items:center;font-size:11px;display:flex}.room-status-config input{accent-color:var(--rail-accent)}.ha-narrow .room-status-settings{bottom:58px;left:auto;right:12px}.ha-narrow .room-status-config{width:auto;bottom:58px;left:12px;right:12px}.app.ha-narrow,.app.ha-narrow button{font-size:17px}.app.ha-narrow{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;line-height:1.35}.app.ha-narrow small{line-height:1.35;font-size:12px!important}.app.ha-narrow button{min-height:44px}.app.ha-narrow .icon-button{width:44px;height:44px}.app.ha-narrow .homeii-icon{width:26px;height:26px}.app.ha-narrow .brand{font-size:17px}.app.ha-narrow .brand-mark{width:44px;height:44px}.app.ha-narrow .hero-copy .eyebrow,.app.ha-narrow .hero p,.app.ha-narrow .hero-time span{font-size:14px!important}.app.ha-narrow .hero-copy h1{line-height:1.05;font-size:42px!important}.app.ha-narrow .hero-time time{font-size:38px!important}.app.ha-narrow .flow-trigger{min-height:64px}.app.ha-narrow .flow-trigger strong{font-size:16px}.app.ha-narrow .intent-dock button{min-height:82px}.app.ha-narrow .intent-dock button b{font-size:14px}.app.ha-narrow .status-card{grid-template-columns:50px minmax(0,1fr) 22px;min-height:78px}.app.ha-narrow .status-card-icon{width:48px;height:48px}.app.ha-narrow .status-card-icon ha-icon{--mdc-icon-size:26px}.app.ha-narrow .status-card strong{font-size:15px}.app.ha-narrow .action-button{min-height:108px}.app.ha-narrow .action-button strong{font-size:15px}.app.ha-narrow .section-heading h2{font-size:22px}.app.ha-narrow .context-row{min-height:62px;font-size:15px}.app.ha-narrow .mobile-nav{min-height:72px}.app.ha-narrow .mobile-nav button{min-height:60px}.app.ha-narrow .mobile-nav button ha-icon{--mdc-icon-size:25px!important}.app.ha-narrow .mobile-nav button span{font-size:11px!important}.app.ha-narrow .room-identity h1{font-size:40px!important}.app.ha-narrow .room-identity p{font-size:14px!important}.app.ha-narrow .room-flow-trigger{min-height:60px}.app.ha-narrow .room-flow-trigger strong{font-size:14px}.app.ha-narrow .room-status-strip button{min-height:56px}.app.ha-narrow .room-status-strip button ha-icon{--mdc-icon-size:24px}.app.ha-narrow .room-status-strip b{font-size:16px}.app.ha-narrow .room-zones button{min-height:60px!important}.app.ha-narrow .room-zones button span{font-size:12px!important}.app.ha-narrow .widget-heading{grid-template-columns:48px minmax(0,1fr) auto}.app.ha-narrow .widget-glyph{width:46px;height:46px}.app.ha-narrow .widget-heading h2{font-size:20px}.app.ha-narrow .state-pill{min-height:36px;font-size:12px}.app.ha-narrow .light-control{min-height:124px}.app.ha-narrow .light-main{grid-template-columns:48px minmax(0,1fr) 28px;min-height:86px}.app.ha-narrow .light-orb{width:46px;height:46px}.app.ha-narrow .light-main strong{font-size:16px}.app.ha-narrow .light-main>ha-icon{--mdc-icon-size:23px}.app.ha-narrow .swipe-hint{height:24px;font-size:11px}.app.ha-narrow .thermostat-dial strong{font-size:58px}.app.ha-narrow .temperature-stepper button,.app.ha-narrow .transport button{min-width:44px;min-height:44px}.app.ha-narrow .mode-row button{min-width:68px;min-height:64px}.app.ha-narrow .now-playing strong{font-size:17px}.app.ha-narrow .scene-row button{min-height:76px;font-size:14px}.app.ha-narrow .security-grid strong{font-size:15px}@media (max-width:760px){.app{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;text-size-adjust:100%;font-size:17px}.app small{font-size:12px!important}.app button{min-height:44px}.mobile-nav button span{font-size:11px!important}.room-zones button span{font-size:12px!important}.light-main strong{font-size:16px}.light-main small{font-size:12px!important}.widget-heading h2{font-size:20px}.widget-heading small{font-size:12px!important}}.app{--ui-surface:rgb(from var(--section-color) r g b / var(--surface-alpha));--ui-surface-strong:color-mix(in srgb,var(--section-color) 94%,var(--bg));--ui-tile:rgb(from var(--tile-color) r g b / var(--tile-alpha));--ui-tile-soft:color-mix(in srgb,var(--tile-color) 72%,transparent);--ui-selected:color-mix(in srgb,var(--rail-accent) 20%,var(--ui-tile));--ui-selected-line:color-mix(in srgb,var(--rail-accent) 48%,transparent);--ui-popup:color-mix(in srgb,var(--section-color) 96%,var(--bg));--ui-icon:var(--cool);--ui-shadow:#00000038}.glass,.room-view .glass{color:var(--text);background:linear-gradient(145deg,color-mix(in srgb,var(--ui-surface) 96%,white 4%),var(--ui-surface))!important;border-color:var(--line)!important;box-shadow:inset 0 1px color-mix(in srgb,var(--text) 12%,transparent),0 18px 48px var(--ui-shadow)!important}.glass-soft{color:var(--text);background:color-mix(in srgb,var(--section-color) 68%,transparent)!important;border-color:var(--line)!important}.theme-light .glass,.theme-light .room-view .glass{background:linear-gradient(145deg,color-mix(in srgb,var(--section-color) 94%,white),color-mix(in srgb,var(--section-color) 82%,white))!important;box-shadow:inset 0 1px #ffffffe6,0 16px 42px #2c272221!important}.theme-light .glass-soft{background:color-mix(in srgb,var(--section-color) 78%,#ffffff9e)!important}.desktop-rail.glass{background:linear-gradient(160deg,var(--ui-surface-strong),color-mix(in srgb,var(--section-color) 82%,var(--bg)))!important}.desktop-rail button{color:var(--muted)}.desktop-rail button .homeii-icon{color:var(--rail-icon)!important}.desktop-rail button.active,.room-zones button.active,.mobile-nav button.active{color:var(--text)!important;background:var(--ui-selected)!important;border-color:var(--ui-selected-line)!important}.desktop-rail button.active .homeii-icon,.room-zones button.active .homeii-glyph,.room-zones button.active>ha-icon{color:var(--rail-accent)!important}.rail-live ha-icon,.context-icon,.panel-title>span,.widget-glyph{color:var(--ui-icon)}.light-control,.action-button,.scene-row button,.sheet-item,.security-grid article,.state-pill,.mode-row button,.temperature-stepper button,.transport button{color:var(--text);border-color:var(--line);background:var(--ui-tile)!important}.light-control:not(.active){filter:none}.light-control.active,.action-button.active{background:linear-gradient(145deg,color-mix(in srgb,var(--accent) 27%,var(--ui-tile)),color-mix(in srgb,var(--accent) 10%,var(--ui-tile)))!important;border-color:color-mix(in srgb,var(--accent) 55%,transparent)!important}.light-control.active .light-orb,.action-button.active span{color:var(--accent)}.status-card{color:var(--text);background:var(--ui-tile)!important;border-color:var(--line)!important}.status-card small,.status-entity-list article small{color:var(--muted)}.status-dialog,.bottom-sheet.glass,.admin-menu.glass,.room-status-config.glass{color:var(--text);background:linear-gradient(150deg,color-mix(in srgb,var(--ui-popup) 96%,white 4%),var(--ui-popup))!important;border-color:var(--line)!important}.theme-light .status-dialog,.theme-light .bottom-sheet.glass,.theme-light .admin-menu.glass,.theme-light .room-status-config.glass{background:linear-gradient(150deg,color-mix(in srgb,var(--section-color) 94%,white),color-mix(in srgb,var(--section-color) 84%,white))!important}.admin-menu-head{color:var(--text);background:color-mix(in srgb,var(--ui-popup) 94%,transparent)!important}.sheet-item,.status-entity-list article,.appearance-group{color:var(--text);background:var(--ui-tile)!important}.bottom-sheet h2,.admin-menu h3,.status-dialog h2,.section-heading h2,.widget-heading h2,.panel-title h2{color:var(--text)}.thermostat{background:linear-gradient(145deg,color-mix(in srgb,var(--mode-color) 13%,var(--ui-surface)),var(--ui-surface))!important}.thermostat-stage:before{background:color-mix(in srgb,var(--tile-color) 62%,var(--bg))!important}.theme-light .thermostat-stage:before{background:color-mix(in srgb,var(--tile-color) 45%,white)!important}.thermostat-dial strong,.theme-light .thermostat-dial strong{color:var(--text)}.media-control{background:linear-gradient(145deg,color-mix(in srgb,var(--mode-color) 9%,var(--ui-surface)),var(--ui-surface))!important}.hero,.room-hero{background-clip:padding-box;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 14%,transparent),0 14px 42px #00000029!important;border:0!important;outline:0!important}.hero-overlay,.room-hero-shade{border-radius:inherit;inset:1px}.room-status-strip{grid-template-columns:repeat(4,minmax(72px,1fr));gap:4px;width:auto;max-width:min(430px,100% - 90px);overflow:hidden;display:grid!important}.room-status-strip button{text-align:start;grid-template-columns:24px minmax(0,1fr);align-items:center;gap:6px;justify-content:stretch!important;width:auto!important;min-width:0!important;display:grid!important}.room-status-strip button span{min-width:0;align-items:flex-start!important}.room-status-strip button b,.room-status-strip button small{text-overflow:ellipsis;white-space:nowrap;max-width:100%;overflow:hidden}.room-status-settings{color:var(--rail-accent)}@media (max-width:760px){.room-status-strip,.ha-narrow .room-status-strip{grid-template-columns:repeat(3,minmax(0,1fr));max-width:none}.room-status-strip button{grid-template-columns:22px minmax(0,1fr)}.hero,.room-hero{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--text) 12%,transparent),0 10px 28px #00000024!important}}.room-status-cards{z-index:4;width:min(850px,58%);max-width:calc(100% - 44px);position:absolute;bottom:22px;left:22px;right:auto}.room-status-cards .status-card{flex-basis:205px}.room-hero-actions{z-index:8;align-items:center;gap:7px;display:flex;position:relative}.room-hero-actions .room-status-settings{width:42px;height:42px;color:var(--rail-accent);cursor:pointer;border-radius:14px;place-items:center;display:grid;position:static}.room-status-config{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:16px;display:grid;width:min(520px,100% - 44px)!important;inset:76px 22px auto auto!important}.room-status-config section{background:var(--ui-tile);border-radius:14px;min-width:0;padding:10px}.room-status-config section>strong{margin-bottom:7px;font-size:13px;display:block}.room-status-config label{min-height:38px}.room-metrics{z-index:5;background:color-mix(in srgb,var(--section-color) 70%,transparent)!important}.room-metrics span{min-width:108px}.room-metrics strong{font-size:22px}.room-metrics ha-icon{--mdc-icon-size:24px;color:var(--rail-accent)}.flow-launcher .intent-dock{top:auto!important;bottom:calc(100% + 7px)!important}.flow-launcher.open{z-index:20}.rail-live span{grid-template-columns:30px minmax(0,1fr) auto;min-height:44px}.rail-live ha-icon{--mdc-icon-size:23px}.rail-live b{font-size:13px}.rail-live small{font-size:11px}.rail-weather ha-icon{animation:3s ease-in-out infinite alternate rail-weather-float}.rail-power ha-icon{animation:1.8s ease-in-out infinite alternate rail-power-pulse}.rail-lights.is-on ha-icon{animation:2s ease-in-out infinite alternate rail-glow}@keyframes rail-weather-float{to{filter:drop-shadow(0 3px 6px color-mix(in srgb,var(--cool) 45%,transparent));transform:translateY(-2px)}}@keyframes rail-power-pulse{to{opacity:.55;filter:drop-shadow(0 0 7px var(--accent))}}@media (max-width:760px){.room-status-cards,.ha-narrow .room-status-cards{width:auto;max-width:none;bottom:10px;left:12px;right:12px}.room-status-cards .status-card{flex-basis:185px}.room-hero-actions{position:absolute;top:12px;right:12px}.room-flow-launcher,.ha-narrow .room-flow-launcher{top:12px;left:12px}.room-metrics,.ha-narrow .room-metrics{padding:4px;inset:72px 12px auto auto;display:flex!important}.room-metrics span{min-width:82px;padding:7px}.room-metrics strong{font-size:17px}.room-metrics ha-icon{--mdc-icon-size:20px}.room-identity{bottom:98px!important}.room-status-config,.ha-narrow .room-status-config{grid-template-columns:1fr;max-height:220px;position:absolute;overflow:auto;width:auto!important;inset:64px 12px auto!important}.flow-launcher .intent-dock{top:calc(100% + 6px)!important;bottom:auto!important}}.room-metrics{gap:4px;width:max-content;max-width:calc(100% - 44px);padding:5px;display:flex;position:absolute!important;inset:86px 22px auto auto!important}.room-metrics span{grid-template-rows:auto auto;grid-template-columns:26px auto;align-items:center;column-gap:8px;display:grid;position:relative}.room-metrics span:before{content:attr(data-label);display:none}.room-metrics ha-icon{grid-row:1/-1}.room-metrics strong{white-space:nowrap}@media (max-width:760px){.room-metrics,.ha-narrow .room-metrics{max-width:calc(100% - 24px);inset:70px 12px auto auto!important}.room-metrics span{min-width:76px!important;padding:7px!important}.room-metrics strong{font-size:17px!important}}.special-view{grid-template-rows:auto minmax(0,1fr);gap:12px;min-width:0;height:calc(100dvh - 72px);display:grid}.special-header{border-radius:var(--panel-radius);grid-template-columns:auto 1fr auto;align-items:center;gap:16px;min-height:84px;padding:14px 20px;display:grid}.special-header>div{text-align:right}.special-header small{color:var(--muted);font-size:10px}.special-header h1{margin:2px 0 0;font-size:27px}.special-back{border:1px solid var(--line);min-height:48px;color:var(--text);background:var(--ui-tile);cursor:pointer;border-radius:16px;align-items:center;gap:7px;padding:0 14px;display:flex}.special-title-icon{width:54px;height:54px;color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 15%,var(--ui-tile));border:1px solid color-mix(in srgb,var(--rail-accent) 24%,var(--line));border-radius:18px;place-items:center;display:grid}.special-title-icon ha-icon{--mdc-icon-size:29px}.special-content{min-height:0;padding:1px 2px 5px;overflow:auto}.special-content>.glass,.special-content>div{animation:.32s cubic-bezier(.2,.8,.2,1) special-in}@keyframes special-in{0%{opacity:0;transform:translateY(8px)scale(.995)}}.special-empty{border-radius:var(--panel-radius);text-align:center;flex-direction:column;justify-content:center;align-items:center;gap:9px;height:100%;min-height:280px;display:flex}.special-empty ha-icon{--mdc-icon-size:52px;color:var(--rail-accent)}.special-empty strong{font-size:21px}.special-empty small{color:var(--muted)}.camera-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(230px,1fr);gap:12px;height:100%;display:grid}.camera-card{border-radius:var(--panel-radius);cursor:pointer;min-width:0;padding:8px;overflow:hidden}.camera-feed{border-radius:calc(var(--panel-radius) - 7px);background:#090b0f 50%/cover no-repeat;height:calc(100% - 57px);min-height:180px;position:relative;overflow:hidden}.camera-feed:after{content:\"\";background:linear-gradient(#0000 58%,#0000006b);position:absolute;inset:0}.camera-feed>ha-icon{z-index:2;color:#fff;position:absolute;bottom:14px;left:15px}.live-badge{z-index:2;color:#fff;letter-spacing:.1em;background:#080c12a6;border-radius:999px;padding:6px 9px;font-size:9px;position:absolute;top:13px;right:13px}.live-badge i{background:#6ee7a8;border-radius:50%;width:6px;height:6px;margin-left:5px;animation:1.4s infinite live-pulse;display:inline-block;box-shadow:0 0 9px #6ee7a8}@keyframes live-pulse{50%{opacity:.35}}.camera-card footer{justify-content:space-between;align-items:center;height:57px;padding:6px 10px;display:flex}.camera-card footer div{flex-direction:column;display:flex}.camera-card footer small{color:var(--muted)}.camera-card footer>ha-icon{color:var(--cool)}.weather-layout{grid-template-rows:minmax(250px,1fr) auto;gap:12px;height:100%;display:grid}.weather-now{border-radius:var(--panel-radius);grid-template-columns:auto 1fr auto;align-items:center;gap:24px;padding:28px;display:grid;background:linear-gradient(135deg,color-mix(in srgb,var(--cool) 18%,var(--ui-surface)),var(--ui-surface))!important}.weather-now>ha-icon{--mdc-icon-size:92px;color:var(--cool);filter:drop-shadow(0 14px 24px color-mix(in srgb,var(--cool) 35%,transparent));animation:4s ease-in-out infinite alternate weather-breathe}@keyframes weather-breathe{to{transform:translateY(-5px)rotate(2deg)}}.weather-now>div{flex-direction:column;display:flex}.weather-now strong{font-size:72px;line-height:1}.weather-now span,.weather-now small{color:var(--muted)}.weather-now dl{gap:10px;display:flex}.weather-now dl div{background:var(--ui-tile);text-align:center;border-radius:18px;min-width:90px;padding:14px}.weather-now dt{color:var(--muted);font-size:10px}.weather-now dd{margin:5px 0 0;font-size:18px;font-weight:700}.forecast-strip{border-radius:var(--panel-radius);grid-template-columns:repeat(5,1fr);gap:6px;padding:10px;display:grid}.forecast-strip article{background:var(--ui-tile);border-radius:17px;flex-direction:column;justify-content:center;align-items:center;gap:6px;min-height:105px;display:flex}.forecast-strip ha-icon{color:var(--cool)}.metric-grid,.special-entity-grid,.media-widget-grid,.device-widget-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;display:grid}.metric-card{border-radius:var(--panel-radius);flex-direction:column;min-height:210px;padding:20px;display:flex;overflow:hidden}.metric-card>span{width:44px;height:44px;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,var(--ui-tile));border-radius:15px;place-items:center;display:grid}.metric-card small{color:var(--muted);margin-top:16px}.metric-card strong{font-size:31px}.metric-card em{color:var(--muted);margin-right:4px;font-size:11px;font-style:normal}.metric-wave{align-items:end;gap:4px;height:45px;margin-top:auto;display:flex}.metric-wave i{background:linear-gradient(var(--cool),color-mix(in srgb,var(--cool) 15%,transparent));border-radius:5px 5px 1px 1px;flex:1;min-height:10%;animation:2.4s ease-in-out infinite alternate wave}.metric-wave i:nth-child(2n){animation-delay:-1s}@keyframes wave{to{opacity:.65;transform:scaleY(.72)}}.vacuum-widget{border-radius:var(--panel-radius);text-align:center;min-height:340px;padding:24px}.vacuum-widget.active{background:linear-gradient(145deg,color-mix(in srgb,#6ee7a8 13%,var(--ui-surface)),var(--ui-surface))!important}.vacuum-orbit{background:var(--ui-tile);width:130px;height:130px;box-shadow:inset 0 0 0 1px var(--line);border-radius:50%;place-items:center;margin:8px auto 18px;display:grid;position:relative}.vacuum-orbit ha-icon{--mdc-icon-size:65px}.vacuum-orbit i{border:2px dashed color-mix(in srgb,var(--cool) 55%,transparent);border-radius:50%;animation:9s linear infinite orbit;position:absolute;inset:-8px}@keyframes orbit{to{transform:rotate(360deg)}}.vacuum-widget p{color:var(--muted)}.widget-actions{grid-template-columns:repeat(3,1fr);gap:7px;margin-top:24px;display:grid}.widget-actions button{border:1px solid var(--line);min-height:58px;color:var(--text);background:var(--ui-tile);cursor:pointer;border-radius:16px;flex-direction:column;justify-content:center;align-items:center;gap:3px;display:flex}.widget-actions button ha-icon{color:var(--cool)}.entity-widget{border-radius:22px;min-height:105px;padding:8px}.entity-main{width:100%;color:var(--text);text-align:right;cursor:pointer;background:0 0;border:0;grid-template-columns:46px 1fr 10px;align-items:center;gap:10px;display:grid}.entity-main>span{background:var(--ui-tile);border-radius:15px;place-items:center;width:44px;height:44px;display:grid}.entity-main div{flex-direction:column;display:flex}.entity-main small{color:var(--muted)}.entity-main>i{background:var(--muted);border-radius:50%;width:7px;height:7px}.entity-widget.active{border-color:color-mix(in srgb,var(--accent) 48%,var(--line));background:linear-gradient(115deg,color-mix(in srgb,var(--accent) 18%,var(--ui-surface)),var(--ui-surface))!important}.entity-widget.active .entity-main>span,.entity-widget.active .entity-main>i{color:var(--accent);background:var(--accent);box-shadow:0 0 18px color-mix(in srgb,var(--accent) 42%,transparent)}.entity-widget input{width:calc(100% - 16px);accent-color:var(--accent);margin:8px}.media-widget-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-widget{border-radius:var(--panel-radius);grid-template-columns:92px 1fr auto;align-items:center;gap:15px;min-height:180px;padding:16px;display:grid}.media-widget.active{background:linear-gradient(145deg,color-mix(in srgb,var(--rail-accent) 15%,var(--ui-surface)),var(--ui-surface))!important}.media-cover{background:var(--ui-tile) center/cover;border-radius:23px;place-items:center;width:92px;height:92px;display:grid}.media-cover ha-icon{--mdc-icon-size:38px;color:var(--rail-accent)}.media-meta{flex-direction:column;min-width:0;display:flex}.media-meta strong,.media-meta span{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.media-meta small,.media-meta span{color:var(--muted)}.media-buttons{align-items:center;gap:5px;display:flex}.media-buttons button{border:1px solid var(--line);width:42px;height:42px;color:var(--text);background:var(--ui-tile);cursor:pointer;border-radius:50%}.media-buttons .primary{color:#101318;background:var(--rail-accent);width:53px;height:53px}.resource-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;display:grid}.resource-row{cursor:pointer;border-radius:20px;grid-template-columns:40px 1fr auto;align-items:center;gap:10px;min-height:76px;padding:12px 15px;display:grid}.resource-row>ha-icon{color:var(--cool)}.resource-row div{flex-direction:column;display:flex}.resource-row small{color:var(--muted)}.resource-row b{font-variant-numeric:tabular-nums}.legacy-widget{border-radius:var(--panel-radius);height:100%;min-height:400px;padding:7px;overflow:hidden}.legacy-widget iframe{border-radius:calc(var(--panel-radius) - 7px);background:0 0;border:0;width:100%;height:100%}.intercom-layout{grid-template-columns:1.3fr .7fr;gap:12px;height:100%;display:grid}.intercom-layout .camera-grid{grid-template-columns:1fr}@media (max-width:1100px){.metric-grid,.special-entity-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.media-widget-grid{grid-template-columns:1fr}}@media (max-width:760px){.special-view,.ha-narrow .special-view{height:auto;min-height:calc(100dvh - 150px);display:block}.special-header{z-index:8;border-radius:20px;min-height:68px;padding:9px 12px;position:sticky;top:0}.special-header h1{font-size:22px}.special-header small{font-size:11px!important}.special-title-icon{width:46px;height:46px}.special-back{justify-content:center;width:46px;min-width:46px;padding:0}.special-back span{display:none}.special-content{margin-top:10px;padding-bottom:92px;overflow:visible}.camera-grid,.metric-grid,.special-entity-grid,.media-widget-grid,.resource-grid,.device-widget-grid{grid-template-columns:1fr}.camera-card{min-height:280px}.weather-layout{display:block}.weather-now{grid-template-columns:auto 1fr;padding:18px}.weather-now>ha-icon{--mdc-icon-size:60px}.weather-now strong{font-size:54px}.weather-now dl{grid-column:1/-1;width:100%}.forecast-strip{grid-template-columns:repeat(5,minmax(82px,1fr));margin-top:10px;overflow-x:auto}.media-widget{grid-template-columns:72px 1fr}.media-cover{width:72px;height:72px}.media-buttons{grid-column:1/-1;justify-content:center}.intercom-layout{display:block}.intercom-layout>.resource-grid{margin-top:10px}.legacy-widget{height:calc(100dvh - 240px)}}.music-flow-host{border-radius:var(--panel-radius);height:100%;min-height:520px;padding:8px;overflow:hidden}.music-flow-host>homeii-music-flow{width:100%;height:calc(100% - 54px);display:block;overflow:auto}.music-flow-intro{align-items:center;gap:10px;height:48px;padding:0 12px;display:flex}.music-flow-intro>span{width:36px;height:36px;color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 15%,var(--ui-tile));border-radius:12px;place-items:center;display:grid}.music-flow-intro div{flex-direction:column;display:flex}.music-flow-intro small{color:var(--muted);font-size:8px}.music-flow-intro strong{letter-spacing:.08em;font-size:14px}.music-flow-intro>i{background:#6ee7a8;border-radius:50%;width:7px;height:7px;margin-inline-start:auto;animation:1.4s infinite live-pulse;box-shadow:0 0 12px #6ee7a8}.energy-legacy{min-height:560px}.kiosk-exit{z-index:200;border:1px solid var(--line);min-height:44px;color:var(--text);background:var(--ui-popup);cursor:pointer;opacity:.42;border-radius:15px;align-items:center;gap:7px;padding:0 13px;transition:opacity .2s,transform .2s;display:flex;position:fixed;top:18px;left:18px}.kiosk-exit:hover,.kiosk-exit:focus-visible{opacity:1;transform:translateY(-1px)}.kiosk-mode .desktop-rail,.kiosk-mode .topbar,.kiosk-mode .mobile-nav{display:none!important}.kiosk-mode .content-shell{width:100%!important;max-width:none!important;margin:0!important;padding:14px!important}.kiosk-mode .special-view{height:calc(100dvh - 28px)}.kiosk-fab{z-index:45;border:1px solid var(--line);min-height:44px;color:var(--text);background:var(--ui-popup);cursor:pointer;border-radius:15px;align-items:center;gap:7px;padding:0 12px;display:flex;position:fixed;bottom:18px;left:18px}.advanced-camera-shell{min-height:260px;padding:7px;overflow:hidden}.advanced-camera-shell>advanced-camera-card{width:100%;height:100%;min-height:246px;display:block}@media (max-width:760px){.music-flow-host{min-height:calc(100dvh - 180px)}.music-flow-host>homeii-music-flow{height:auto;min-height:calc(100dvh - 240px)}.kiosk-exit{justify-content:center;width:44px;padding:0;top:10px;left:10px}.kiosk-exit span{display:none}.kiosk-mode .content-shell{padding:8px!important}.kiosk-mode .special-view{min-height:calc(100dvh - 16px)}.kiosk-mode .special-content{padding-bottom:8px}.kiosk-fab{left:12px;bottom:calc(86px + env(safe-area-inset-bottom));justify-content:center;width:46px;padding:0}.kiosk-fab span{display:none}.hero,.ha-narrow .hero{height:520px!important;min-height:520px!important;padding:16px!important}.hero-copy,.ha-narrow .hero-copy{width:58%;padding:0!important;top:18px!important;left:auto!important;right:18px!important}.hero-copy h1,.ha-narrow .hero-copy h1{max-width:100%!important;font-size:38px!important}.hero-time,.ha-narrow .hero-time{width:auto;text-align:left!important;align-items:flex-start!important;top:22px!important;left:18px!important;right:auto!important}.flow-launcher,.ha-narrow .flow-launcher{width:auto!important;top:154px!important;left:16px!important;right:16px!important}.status-carousel,.ha-narrow .status-carousel{width:auto!important;max-width:none!important;bottom:14px!important;left:12px!important;right:12px!important}.room-hero,.ha-narrow .room-hero{height:360px!important;min-height:360px!important}.room-flow-launcher,.ha-narrow .room-flow-launcher{width:180px!important;top:12px!important;left:12px!important}.room-metrics,.ha-narrow .room-metrics{inset:80px 12px auto auto!important}.room-identity,.ha-narrow .room-identity{max-width:calc(100% - 32px);bottom:102px!important;left:auto!important;right:16px!important}.room-status-cards,.ha-narrow .room-status-cards{bottom:12px!important;left:12px!important;right:12px!important}}.control-center{border-top:1px solid var(--line);direction:rtl;margin-top:14px;padding-top:14px}.control-center-title{align-items:center;gap:10px;margin-bottom:10px;display:flex}.control-center-title>span{width:42px;height:42px;color:var(--rail-accent);background:color-mix(in srgb,var(--rail-accent) 14%,var(--ui-tile));border-radius:14px;place-items:center;display:grid}.control-center-title div{flex-direction:column;display:flex}.control-center-title h3{margin:0;font-size:18px}.control-center-title small{color:var(--muted)}.control-center-tabs{background:var(--ui-tile);border-radius:16px;grid-template-columns:1fr 1fr;gap:6px;padding:5px;display:grid}.admin-menu .control-center-tabs button{background:0 0;border:0;justify-content:center;align-items:center;gap:7px;min-height:44px;margin:0;display:flex}.admin-menu .control-center-tabs button.selected{color:var(--text);background:color-mix(in srgb,var(--rail-accent) 18%,var(--ui-popup));border:1px solid color-mix(in srgb,var(--rail-accent) 30%,var(--line))}.room-picker{scrollbar-width:none;gap:6px;margin-top:10px;padding-bottom:4px;display:flex;overflow-x:auto}.admin-menu .room-picker button{min-width:92px;min-height:62px;color:var(--muted);background:var(--ui-tile);border-radius:15px;flex-direction:column;justify-content:center;align-items:center;gap:3px;margin:0;padding:7px;display:flex}.admin-menu .room-picker button.selected{color:var(--text);border-color:color-mix(in srgb,var(--rail-accent) 45%,var(--line));background:color-mix(in srgb,var(--rail-accent) 15%,var(--ui-tile))}.room-picker ha-icon{--mdc-icon-size:23px}.room-picker span{white-space:nowrap;font-size:11px}.manager-summary{background:var(--ui-tile);border-radius:16px;justify-content:space-between;align-items:center;margin-top:10px;padding:11px 13px;display:flex}.manager-summary>div{flex-direction:column;display:flex}.manager-summary small{color:var(--muted)}.admin-menu .manager-summary button{width:auto;min-height:36px;margin:0;padding:0 11px}.manager-groups{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px;display:grid}.manager-groups>section{background:var(--ui-tile);border:1px solid var(--line);border-radius:17px;min-width:0;padding:9px}.manager-groups>section>header{grid-template-columns:24px 1fr auto;align-items:center;gap:5px;padding:3px 4px 8px;display:grid}.manager-groups>section>header ha-icon{--mdc-icon-size:20px;color:var(--rail-accent)}.manager-groups>section>header small{color:var(--muted)}.manager-groups>section>div{gap:4px;display:grid}.manager-groups label,.camera-picker label{background:color-mix(in srgb,var(--ui-popup) 48%,transparent);border-radius:12px;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:8px;min-width:0;min-height:48px;padding:7px 9px;transition:opacity .2s,background .2s;display:grid}.manager-groups label.disabled,.camera-picker label.disabled{opacity:.48}.manager-groups label>span,.camera-picker label>span:not(.camera-picker-icon){flex-direction:column;min-width:0;display:flex}.manager-groups label strong,.camera-picker label strong{white-space:nowrap;text-overflow:ellipsis;font-size:11px;overflow:hidden}.manager-groups label small,.camera-picker label small{color:var(--muted);white-space:nowrap;text-overflow:ellipsis;text-align:left;direction:ltr;overflow:hidden;font-size:8px!important}.manager-groups input,.camera-picker input{width:20px;height:20px;accent-color:var(--rail-accent)}.camera-picker{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:8px;display:grid}.camera-picker label{grid-template-columns:38px minmax(0,1fr) auto;min-height:62px}.camera-picker-icon{width:36px;height:36px;color:var(--cool);background:color-mix(in srgb,var(--cool) 12%,var(--ui-popup));border-radius:12px;place-items:center;display:grid!important}.manager-empty{min-height:120px;color:var(--muted);flex-direction:column;grid-column:1/-1;justify-content:center;align-items:center;gap:8px;display:flex}.manager-note{align-items:center;display:flex;gap:6px!important;margin:10px 0 0!important}.manager-note ha-icon{--mdc-icon-size:17px;color:#6ee7a8}@media (min-width:761px){.admin-menu:has(.control-center){width:min(720px,100vw - 280px)}}@media (max-width:760px){.manager-groups,.camera-picker{grid-template-columns:1fr}.control-center{padding-bottom:12px}.admin-menu .room-picker button{min-width:104px}.manager-groups label strong,.camera-picker label strong{font-size:15px}.manager-groups label small,.camera-picker label small{font-size:11px!important}}.profile-actions{grid-template-columns:1fr 1fr;gap:7px;display:grid}.admin-menu .profile-actions button{justify-content:center;align-items:center;gap:6px;display:flex}.manager-health{grid-template-columns:repeat(3,1fr);gap:5px;margin-top:8px;display:grid}.manager-health span{min-height:45px;color:var(--muted);background:var(--ui-tile);border-radius:13px;justify-content:center;align-items:center;gap:5px;padding:6px;font-size:10px;display:flex}.manager-health span.healthy ha-icon{color:#65d7a1}.manager-health span.warning ha-icon{color:var(--accent)}.manager-health span.issue ha-icon{color:#ff7f7f}.manager-health ha-icon{--mdc-icon-size:18px}.manager-search{border:1px solid var(--line);background:var(--ui-tile);border-radius:14px;grid-template-columns:24px 1fr 34px;align-items:center;height:44px;margin-top:8px;padding:0 9px;display:grid}.manager-search>ha-icon{--mdc-icon-size:19px;color:var(--muted)}.manager-search input{min-width:0;color:var(--text);font:inherit;background:0 0;border:0;outline:0}.admin-menu .manager-search button{background:0 0;border:0;width:32px;height:32px;min-height:32px;margin:0;padding:0}.manager-groups>section>header{grid-template-columns:24px 1fr auto auto}.group-bulk{gap:3px;display:flex}.admin-menu .group-bulk button{border-radius:9px;place-items:center;width:30px;height:30px;min-height:30px;margin:0;padding:0;display:grid}.group-bulk ha-icon{--mdc-icon-size:16px!important}.global-feedback{z-index:300;border:1px solid var(--line);min-width:230px;min-height:52px;color:var(--text);background:color-mix(in srgb,var(--ui-popup) 95%,transparent);-webkit-backdrop-filter:blur(26px)saturate(160%);backdrop-filter:blur(26px)saturate(160%);border-radius:17px;justify-content:center;align-items:center;gap:9px;padding:9px 15px;animation:.24s feedback-in;display:flex;position:fixed;bottom:24px;left:50%;transform:translate(-50%);box-shadow:0 18px 50px #0000004d}.global-feedback.success ha-icon{color:#65d7a1}.global-feedback.error ha-icon{color:#ff7f7f}.global-feedback.info ha-icon{color:var(--cool)}@media (max-width:760px){.manager-health{grid-template-columns:1fr}.manager-health span{justify-content:flex-start;padding-inline:12px;font-size:13px}.global-feedback{bottom:calc(92px + env(safe-area-inset-bottom));width:calc(100% - 32px)}.profile-actions{grid-template-columns:1fr}}", _t = class extends HTMLElement {
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
		n.textContent = gt, t.append(n, e), this.root = (0, ee.createRoot)(e);
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
		this.root.render(/* @__PURE__ */ (0, C.jsx)(x.StrictMode, { children: /* @__PURE__ */ (0, C.jsx)(Ye, {
			hass: this._hass,
			narrow: this._narrow,
			route: this._route,
			panel: this._panel
		}) }));
	}
};
customElements.get("homeiios-panel") || customElements.define("homeiios-panel", _t);
//#endregion
