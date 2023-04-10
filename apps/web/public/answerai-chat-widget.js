import _p, { useState as Vb } from "react";
var Om = {}, Bb = {
  get exports() {
    return Om;
  },
  set exports(Y) {
    Om = Y;
  }
}, xp = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var I1;
function Pb() {
  if (I1)
    return xp;
  I1 = 1;
  var Y = _p, Re = Symbol.for("react.element"), M = Symbol.for("react.fragment"), Jt = Object.prototype.hasOwnProperty, en = Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, qe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(Ft, se, ce) {
    var nt, te = {}, de = null, le = null;
    ce !== void 0 && (de = "" + ce), se.key !== void 0 && (de = "" + se.key), se.ref !== void 0 && (le = se.ref);
    for (nt in se)
      Jt.call(se, nt) && !qe.hasOwnProperty(nt) && (te[nt] = se[nt]);
    if (Ft && Ft.defaultProps)
      for (nt in se = Ft.defaultProps, se)
        te[nt] === void 0 && (te[nt] = se[nt]);
    return { $$typeof: Re, type: Ft, key: de, ref: le, props: te, _owner: en.current };
  }
  return xp.Fragment = M, xp.jsx = S, xp.jsxs = S, xp;
}
var wp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G1;
function Yb() {
  return G1 || (G1 = 1, process.env.NODE_ENV !== "production" && function() {
    var Y = _p, Re = Symbol.for("react.element"), M = Symbol.for("react.portal"), Jt = Symbol.for("react.fragment"), en = Symbol.for("react.strict_mode"), qe = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), Ft = Symbol.for("react.context"), se = Symbol.for("react.forward_ref"), ce = Symbol.for("react.suspense"), nt = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), de = Symbol.for("react.lazy"), le = Symbol.for("react.offscreen"), Ue = Symbol.iterator, ut = "@@iterator";
    function vt(E) {
      if (E === null || typeof E != "object")
        return null;
      var j = Ue && E[Ue] || E[ut];
      return typeof j == "function" ? j : null;
    }
    var cn = Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Ke(E) {
      {
        for (var j = arguments.length, W = new Array(j > 1 ? j - 1 : 0), ge = 1; ge < j; ge++)
          W[ge - 1] = arguments[ge];
        je("error", E, W);
      }
    }
    function je(E, j, W) {
      {
        var ge = cn.ReactDebugCurrentFrame, Ne = ge.getStackAddendum();
        Ne !== "" && (j += "%s", W = W.concat([Ne]));
        var We = W.map(function(ze) {
          return String(ze);
        });
        We.unshift("Warning: " + j), Function.prototype.apply.call(console[E], console, We);
      }
    }
    var ht = !1, Ve = !1, Tt = !1, Ae = !1, Rn = !1, Fn;
    Fn = Symbol.for("react.module.reference");
    function jt(E) {
      return !!(typeof E == "string" || typeof E == "function" || E === Jt || E === qe || Rn || E === en || E === ce || E === nt || Ae || E === le || ht || Ve || Tt || typeof E == "object" && E !== null && (E.$$typeof === de || E.$$typeof === te || E.$$typeof === S || E.$$typeof === Ft || E.$$typeof === se || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      E.$$typeof === Fn || E.getModuleId !== void 0));
    }
    function ct(E, j, W) {
      var ge = E.displayName;
      if (ge)
        return ge;
      var Ne = j.displayName || j.name || "";
      return Ne !== "" ? W + "(" + Ne + ")" : W;
    }
    function xn(E) {
      return E.displayName || "Context";
    }
    function ke(E) {
      if (E == null)
        return null;
      if (typeof E.tag == "number" && Ke("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof E == "function")
        return E.displayName || E.name || null;
      if (typeof E == "string")
        return E;
      switch (E) {
        case Jt:
          return "Fragment";
        case M:
          return "Portal";
        case qe:
          return "Profiler";
        case en:
          return "StrictMode";
        case ce:
          return "Suspense";
        case nt:
          return "SuspenseList";
      }
      if (typeof E == "object")
        switch (E.$$typeof) {
          case Ft:
            var j = E;
            return xn(j) + ".Consumer";
          case S:
            var W = E;
            return xn(W._context) + ".Provider";
          case se:
            return ct(E, E.render, "ForwardRef");
          case te:
            var ge = E.displayName || null;
            return ge !== null ? ge : ke(E.type) || "Memo";
          case de: {
            var Ne = E, We = Ne._payload, ze = Ne._init;
            try {
              return ke(ze(We));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var $e = Object.assign, fn = 0, Rt, Kn, $, ye, Z, Ze, rt;
    function wn() {
    }
    wn.__reactDisabledLog = !0;
    function Zn() {
      {
        if (fn === 0) {
          Rt = console.log, Kn = console.info, $ = console.warn, ye = console.error, Z = console.group, Ze = console.groupCollapsed, rt = console.groupEnd;
          var E = {
            configurable: !0,
            enumerable: !0,
            value: wn,
            writable: !0
          };
          Object.defineProperties(console, {
            info: E,
            log: E,
            warn: E,
            error: E,
            group: E,
            groupCollapsed: E,
            groupEnd: E
          });
        }
        fn++;
      }
    }
    function La() {
      {
        if (fn--, fn === 0) {
          var E = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $e({}, E, {
              value: Rt
            }),
            info: $e({}, E, {
              value: Kn
            }),
            warn: $e({}, E, {
              value: $
            }),
            error: $e({}, E, {
              value: ye
            }),
            group: $e({}, E, {
              value: Z
            }),
            groupCollapsed: $e({}, E, {
              value: Ze
            }),
            groupEnd: $e({}, E, {
              value: rt
            })
          });
        }
        fn < 0 && Ke("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var tn = cn.ReactCurrentDispatcher, $r;
    function jn(E, j, W) {
      {
        if ($r === void 0)
          try {
            throw Error();
          } catch (Ne) {
            var ge = Ne.stack.trim().match(/\n( *(at )?)/);
            $r = ge && ge[1] || "";
          }
        return `
` + $r + E;
      }
    }
    var cr = !1, Ma;
    {
      var fr = typeof WeakMap == "function" ? WeakMap : Map;
      Ma = new fr();
    }
    function Qr(E, j) {
      if (!E || cr)
        return "";
      {
        var W = Ma.get(E);
        if (W !== void 0)
          return W;
      }
      var ge;
      cr = !0;
      var Ne = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var We;
      We = tn.current, tn.current = null, Zn();
      try {
        if (j) {
          var ze = function() {
            throw Error();
          };
          if (Object.defineProperty(ze.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ze, []);
            } catch (Je) {
              ge = Je;
            }
            Reflect.construct(E, [], ze);
          } else {
            try {
              ze.call();
            } catch (Je) {
              ge = Je;
            }
            E.call(ze.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Je) {
            ge = Je;
          }
          E();
        }
      } catch (Je) {
        if (Je && ge && typeof Je.stack == "string") {
          for (var Ee = Je.stack.split(`
`), vn = ge.stack.split(`
`), _t = Ee.length - 1, Ot = vn.length - 1; _t >= 1 && Ot >= 0 && Ee[_t] !== vn[Ot]; )
            Ot--;
          for (; _t >= 1 && Ot >= 0; _t--, Ot--)
            if (Ee[_t] !== vn[Ot]) {
              if (_t !== 1 || Ot !== 1)
                do
                  if (_t--, Ot--, Ot < 0 || Ee[_t] !== vn[Ot]) {
                    var Jn = `
` + Ee[_t].replace(" at new ", " at ");
                    return E.displayName && Jn.includes("<anonymous>") && (Jn = Jn.replace("<anonymous>", E.displayName)), typeof E == "function" && Ma.set(E, Jn), Jn;
                  }
                while (_t >= 1 && Ot >= 0);
              break;
            }
        }
      } finally {
        cr = !1, tn.current = We, La(), Error.prepareStackTrace = Ne;
      }
      var ki = E ? E.displayName || E.name : "", vs = ki ? jn(ki) : "";
      return typeof E == "function" && Ma.set(E, vs), vs;
    }
    function dn(E, j, W) {
      return Qr(E, !1);
    }
    function Vn(E) {
      var j = E.prototype;
      return !!(j && j.isReactComponent);
    }
    function Dn(E, j, W) {
      if (E == null)
        return "";
      if (typeof E == "function")
        return Qr(E, Vn(E));
      if (typeof E == "string")
        return jn(E);
      switch (E) {
        case ce:
          return jn("Suspense");
        case nt:
          return jn("SuspenseList");
      }
      if (typeof E == "object")
        switch (E.$$typeof) {
          case se:
            return dn(E.render);
          case te:
            return Dn(E.type, j, W);
          case de: {
            var ge = E, Ne = ge._payload, We = ge._init;
            try {
              return Dn(We(Ne), j, W);
            } catch {
            }
          }
        }
      return "";
    }
    var Bn = Object.prototype.hasOwnProperty, Pn = {}, Ir = cn.ReactDebugCurrentFrame;
    function ha(E) {
      if (E) {
        var j = E._owner, W = Dn(E.type, E._source, j ? j.type : null);
        Ir.setExtraStackFrame(W);
      } else
        Ir.setExtraStackFrame(null);
    }
    function qa(E, j, W, ge, Ne) {
      {
        var We = Function.call.bind(Bn);
        for (var ze in E)
          if (We(E, ze)) {
            var Ee = void 0;
            try {
              if (typeof E[ze] != "function") {
                var vn = Error((ge || "React class") + ": " + W + " type `" + ze + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[ze] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw vn.name = "Invariant Violation", vn;
              }
              Ee = E[ze](j, ze, ge, W, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_t) {
              Ee = _t;
            }
            Ee && !(Ee instanceof Error) && (ha(Ne), Ke("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ge || "React class", W, ze, typeof Ee), ha(null)), Ee instanceof Error && !(Ee.message in Pn) && (Pn[Ee.message] = !0, ha(Ne), Ke("Failed %s type: %s", W, Ee.message), ha(null));
          }
      }
    }
    var Na = Array.isArray;
    function ma(E) {
      return Na(E);
    }
    function br(E) {
      {
        var j = typeof Symbol == "function" && Symbol.toStringTag, W = j && E[Symbol.toStringTag] || E.constructor.name || "Object";
        return W;
      }
    }
    function za(E) {
      try {
        return kr(E), !1;
      } catch {
        return !0;
      }
    }
    function kr(E) {
      return "" + E;
    }
    function ya(E) {
      if (za(E))
        return Ke("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", br(E)), kr(E);
    }
    var Gt = cn.ReactCurrentOwner, _r = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, wi, ga, G;
    G = {};
    function ve(E) {
      if (Bn.call(E, "ref")) {
        var j = Object.getOwnPropertyDescriptor(E, "ref").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return E.ref !== void 0;
    }
    function He(E) {
      if (Bn.call(E, "key")) {
        var j = Object.getOwnPropertyDescriptor(E, "key").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return E.key !== void 0;
    }
    function ot(E, j) {
      if (typeof E.ref == "string" && Gt.current && j && Gt.current.stateNode !== j) {
        var W = ke(Gt.current.type);
        G[W] || (Ke('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ke(Gt.current.type), E.ref), G[W] = !0);
      }
    }
    function Nt(E, j) {
      {
        var W = function() {
          wi || (wi = !0, Ke("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        W.isReactWarning = !0, Object.defineProperty(E, "key", {
          get: W,
          configurable: !0
        });
      }
    }
    function pn(E, j) {
      {
        var W = function() {
          ga || (ga = !0, Ke("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        W.isReactWarning = !0, Object.defineProperty(E, "ref", {
          get: W,
          configurable: !0
        });
      }
    }
    var Yt = function(E, j, W, ge, Ne, We, ze) {
      var Ee = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: Re,
        // Built-in properties that belong on the element
        type: E,
        key: j,
        ref: W,
        props: ze,
        // Record the component responsible for creating this element.
        _owner: We
      };
      return Ee._store = {}, Object.defineProperty(Ee._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Ee, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ge
      }), Object.defineProperty(Ee, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ne
      }), Object.freeze && (Object.freeze(Ee.props), Object.freeze(Ee)), Ee;
    };
    function dr(E, j, W, ge, Ne) {
      {
        var We, ze = {}, Ee = null, vn = null;
        W !== void 0 && (ya(W), Ee = "" + W), He(j) && (ya(j.key), Ee = "" + j.key), ve(j) && (vn = j.ref, ot(j, Ne));
        for (We in j)
          Bn.call(j, We) && !_r.hasOwnProperty(We) && (ze[We] = j[We]);
        if (E && E.defaultProps) {
          var _t = E.defaultProps;
          for (We in _t)
            ze[We] === void 0 && (ze[We] = _t[We]);
        }
        if (Ee || vn) {
          var Ot = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
          Ee && Nt(ze, Ot), vn && pn(ze, Ot);
        }
        return Yt(E, Ee, vn, Ne, ge, Gt.current, ze);
      }
    }
    var Et = cn.ReactCurrentOwner, Or = cn.ReactDebugCurrentFrame;
    function mt(E) {
      if (E) {
        var j = E._owner, W = Dn(E.type, E._source, j ? j.type : null);
        Or.setExtraStackFrame(W);
      } else
        Or.setExtraStackFrame(null);
    }
    var Ct;
    Ct = !1;
    function tu(E) {
      return typeof E == "object" && E !== null && E.$$typeof === Re;
    }
    function sl() {
      {
        if (Et.current) {
          var E = ke(Et.current.type);
          if (E)
            return `

Check the render method of \`` + E + "`.";
        }
        return "";
      }
    }
    function nu(E) {
      {
        if (E !== void 0) {
          var j = E.fileName.replace(/^.*[\\\/]/, ""), W = E.lineNumber;
          return `

Check your code at ` + j + ":" + W + ".";
        }
        return "";
      }
    }
    var ro = {};
    function ps(E) {
      {
        var j = sl();
        if (!j) {
          var W = typeof E == "string" ? E : E.displayName || E.name;
          W && (j = `

Check the top-level render call using <` + W + ">.");
        }
        return j;
      }
    }
    function cl(E, j) {
      {
        if (!E._store || E._store.validated || E.key != null)
          return;
        E._store.validated = !0;
        var W = ps(j);
        if (ro[W])
          return;
        ro[W] = !0;
        var ge = "";
        E && E._owner && E._owner !== Et.current && (ge = " It was passed a child from " + ke(E._owner.type) + "."), mt(E), Ke('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', W, ge), mt(null);
      }
    }
    function ru(E, j) {
      {
        if (typeof E != "object")
          return;
        if (ma(E))
          for (var W = 0; W < E.length; W++) {
            var ge = E[W];
            tu(ge) && cl(ge, j);
          }
        else if (tu(E))
          E._store && (E._store.validated = !0);
        else if (E) {
          var Ne = vt(E);
          if (typeof Ne == "function" && Ne !== E.entries)
            for (var We = Ne.call(E), ze; !(ze = We.next()).done; )
              tu(ze.value) && cl(ze.value, j);
        }
      }
    }
    function fl(E) {
      {
        var j = E.type;
        if (j == null || typeof j == "string")
          return;
        var W;
        if (typeof j == "function")
          W = j.propTypes;
        else if (typeof j == "object" && (j.$$typeof === se || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        j.$$typeof === te))
          W = j.propTypes;
        else
          return;
        if (W) {
          var ge = ke(j);
          qa(W, E.props, "prop", ge, E);
        } else if (j.PropTypes !== void 0 && !Ct) {
          Ct = !0;
          var Ne = ke(j);
          Ke("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ne || "Unknown");
        }
        typeof j.getDefaultProps == "function" && !j.getDefaultProps.isReactClassApproved && Ke("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function au(E) {
      {
        for (var j = Object.keys(E.props), W = 0; W < j.length; W++) {
          var ge = j[W];
          if (ge !== "children" && ge !== "key") {
            mt(E), Ke("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ge), mt(null);
            break;
          }
        }
        E.ref !== null && (mt(E), Ke("Invalid attribute `ref` supplied to `React.Fragment`."), mt(null));
      }
    }
    function Ua(E, j, W, ge, Ne, We) {
      {
        var ze = jt(E);
        if (!ze) {
          var Ee = "";
          (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (Ee += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var vn = nu(Ne);
          vn ? Ee += vn : Ee += sl();
          var _t;
          E === null ? _t = "null" : ma(E) ? _t = "array" : E !== void 0 && E.$$typeof === Re ? (_t = "<" + (ke(E.type) || "Unknown") + " />", Ee = " Did you accidentally export a JSX literal instead of a component?") : _t = typeof E, Ke("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _t, Ee);
        }
        var Ot = dr(E, j, W, Ne, We);
        if (Ot == null)
          return Ot;
        if (ze) {
          var Jn = j.children;
          if (Jn !== void 0)
            if (ge)
              if (ma(Jn)) {
                for (var ki = 0; ki < Jn.length; ki++)
                  ru(Jn[ki], E);
                Object.freeze && Object.freeze(Jn);
              } else
                Ke("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ru(Jn, E);
        }
        return E === Jt ? au(Ot) : fl(Ot), Ot;
      }
    }
    function Di(E, j, W) {
      return Ua(E, j, W, !0);
    }
    function Lr(E, j, W) {
      return Ua(E, j, W, !1);
    }
    var Sa = Lr, bi = Di;
    wp.Fragment = Jt, wp.jsx = Sa, wp.jsxs = bi;
  }()), wp;
}
(function(Y) {
  process.env.NODE_ENV === "production" ? Y.exports = Pb() : Y.exports = Yb();
})(Bb);
const kp = Om.jsx, $b = Om.jsxs;
var bp = {}, f0 = {}, Qb = {
  get exports() {
    return f0;
  },
  set exports(Y) {
    f0 = Y;
  }
}, pa = {}, Lm = {}, Ib = {
  get exports() {
    return Lm;
  },
  set exports(Y) {
    Lm = Y;
  }
}, s0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var W1;
function Gb() {
  return W1 || (W1 = 1, function(Y) {
    function Re($, ye) {
      var Z = $.length;
      $.push(ye);
      e:
        for (; 0 < Z; ) {
          var Ze = Z - 1 >>> 1, rt = $[Ze];
          if (0 < en(rt, ye))
            $[Ze] = ye, $[Z] = rt, Z = Ze;
          else
            break e;
        }
    }
    function M($) {
      return $.length === 0 ? null : $[0];
    }
    function Jt($) {
      if ($.length === 0)
        return null;
      var ye = $[0], Z = $.pop();
      if (Z !== ye) {
        $[0] = Z;
        e:
          for (var Ze = 0, rt = $.length, wn = rt >>> 1; Ze < wn; ) {
            var Zn = 2 * (Ze + 1) - 1, La = $[Zn], tn = Zn + 1, $r = $[tn];
            if (0 > en(La, Z))
              tn < rt && 0 > en($r, La) ? ($[Ze] = $r, $[tn] = Z, Ze = tn) : ($[Ze] = La, $[Zn] = Z, Ze = Zn);
            else if (tn < rt && 0 > en($r, Z))
              $[Ze] = $r, $[tn] = Z, Ze = tn;
            else
              break e;
          }
      }
      return ye;
    }
    function en($, ye) {
      var Z = $.sortIndex - ye.sortIndex;
      return Z !== 0 ? Z : $.id - ye.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var qe = performance;
      Y.unstable_now = function() {
        return qe.now();
      };
    } else {
      var S = Date, Ft = S.now();
      Y.unstable_now = function() {
        return S.now() - Ft;
      };
    }
    var se = [], ce = [], nt = 1, te = null, de = 3, le = !1, Ue = !1, ut = !1, vt = typeof setTimeout == "function" ? setTimeout : null, cn = typeof clearTimeout == "function" ? clearTimeout : null, Ke = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function je($) {
      for (var ye = M(ce); ye !== null; ) {
        if (ye.callback === null)
          Jt(ce);
        else if (ye.startTime <= $)
          Jt(ce), ye.sortIndex = ye.expirationTime, Re(se, ye);
        else
          break;
        ye = M(ce);
      }
    }
    function ht($) {
      if (ut = !1, je($), !Ue)
        if (M(se) !== null)
          Ue = !0, Rt(Ve);
        else {
          var ye = M(ce);
          ye !== null && Kn(ht, ye.startTime - $);
        }
    }
    function Ve($, ye) {
      Ue = !1, ut && (ut = !1, cn(Rn), Rn = -1), le = !0;
      var Z = de;
      try {
        for (je(ye), te = M(se); te !== null && (!(te.expirationTime > ye) || $ && !ct()); ) {
          var Ze = te.callback;
          if (typeof Ze == "function") {
            te.callback = null, de = te.priorityLevel;
            var rt = Ze(te.expirationTime <= ye);
            ye = Y.unstable_now(), typeof rt == "function" ? te.callback = rt : te === M(se) && Jt(se), je(ye);
          } else
            Jt(se);
          te = M(se);
        }
        if (te !== null)
          var wn = !0;
        else {
          var Zn = M(ce);
          Zn !== null && Kn(ht, Zn.startTime - ye), wn = !1;
        }
        return wn;
      } finally {
        te = null, de = Z, le = !1;
      }
    }
    var Tt = !1, Ae = null, Rn = -1, Fn = 5, jt = -1;
    function ct() {
      return !(Y.unstable_now() - jt < Fn);
    }
    function xn() {
      if (Ae !== null) {
        var $ = Y.unstable_now();
        jt = $;
        var ye = !0;
        try {
          ye = Ae(!0, $);
        } finally {
          ye ? ke() : (Tt = !1, Ae = null);
        }
      } else
        Tt = !1;
    }
    var ke;
    if (typeof Ke == "function")
      ke = function() {
        Ke(xn);
      };
    else if (typeof MessageChannel < "u") {
      var $e = new MessageChannel(), fn = $e.port2;
      $e.port1.onmessage = xn, ke = function() {
        fn.postMessage(null);
      };
    } else
      ke = function() {
        vt(xn, 0);
      };
    function Rt($) {
      Ae = $, Tt || (Tt = !0, ke());
    }
    function Kn($, ye) {
      Rn = vt(function() {
        $(Y.unstable_now());
      }, ye);
    }
    Y.unstable_IdlePriority = 5, Y.unstable_ImmediatePriority = 1, Y.unstable_LowPriority = 4, Y.unstable_NormalPriority = 3, Y.unstable_Profiling = null, Y.unstable_UserBlockingPriority = 2, Y.unstable_cancelCallback = function($) {
      $.callback = null;
    }, Y.unstable_continueExecution = function() {
      Ue || le || (Ue = !0, Rt(Ve));
    }, Y.unstable_forceFrameRate = function($) {
      0 > $ || 125 < $ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Fn = 0 < $ ? Math.floor(1e3 / $) : 5;
    }, Y.unstable_getCurrentPriorityLevel = function() {
      return de;
    }, Y.unstable_getFirstCallbackNode = function() {
      return M(se);
    }, Y.unstable_next = function($) {
      switch (de) {
        case 1:
        case 2:
        case 3:
          var ye = 3;
          break;
        default:
          ye = de;
      }
      var Z = de;
      de = ye;
      try {
        return $();
      } finally {
        de = Z;
      }
    }, Y.unstable_pauseExecution = function() {
    }, Y.unstable_requestPaint = function() {
    }, Y.unstable_runWithPriority = function($, ye) {
      switch ($) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          $ = 3;
      }
      var Z = de;
      de = $;
      try {
        return ye();
      } finally {
        de = Z;
      }
    }, Y.unstable_scheduleCallback = function($, ye, Z) {
      var Ze = Y.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? Ze + Z : Ze) : Z = Ze, $) {
        case 1:
          var rt = -1;
          break;
        case 2:
          rt = 250;
          break;
        case 5:
          rt = 1073741823;
          break;
        case 4:
          rt = 1e4;
          break;
        default:
          rt = 5e3;
      }
      return rt = Z + rt, $ = { id: nt++, callback: ye, priorityLevel: $, startTime: Z, expirationTime: rt, sortIndex: -1 }, Z > Ze ? ($.sortIndex = Z, Re(ce, $), M(se) === null && $ === M(ce) && (ut ? (cn(Rn), Rn = -1) : ut = !0, Kn(ht, Z - Ze))) : ($.sortIndex = rt, Re(se, $), Ue || le || (Ue = !0, Rt(Ve))), $;
    }, Y.unstable_shouldYield = ct, Y.unstable_wrapCallback = function($) {
      var ye = de;
      return function() {
        var Z = de;
        de = ye;
        try {
          return $.apply(this, arguments);
        } finally {
          de = Z;
        }
      };
    };
  }(s0)), s0;
}
var c0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var X1;
function Wb() {
  return X1 || (X1 = 1, function(Y) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var Re = !1, M = !1, Jt = 5;
      function en(G, ve) {
        var He = G.length;
        G.push(ve), Ft(G, ve, He);
      }
      function qe(G) {
        return G.length === 0 ? null : G[0];
      }
      function S(G) {
        if (G.length === 0)
          return null;
        var ve = G[0], He = G.pop();
        return He !== ve && (G[0] = He, se(G, He, 0)), ve;
      }
      function Ft(G, ve, He) {
        for (var ot = He; ot > 0; ) {
          var Nt = ot - 1 >>> 1, pn = G[Nt];
          if (ce(pn, ve) > 0)
            G[Nt] = ve, G[ot] = pn, ot = Nt;
          else
            return;
        }
      }
      function se(G, ve, He) {
        for (var ot = He, Nt = G.length, pn = Nt >>> 1; ot < pn; ) {
          var Yt = (ot + 1) * 2 - 1, dr = G[Yt], Et = Yt + 1, Or = G[Et];
          if (ce(dr, ve) < 0)
            Et < Nt && ce(Or, dr) < 0 ? (G[ot] = Or, G[Et] = ve, ot = Et) : (G[ot] = dr, G[Yt] = ve, ot = Yt);
          else if (Et < Nt && ce(Or, ve) < 0)
            G[ot] = Or, G[Et] = ve, ot = Et;
          else
            return;
        }
      }
      function ce(G, ve) {
        var He = G.sortIndex - ve.sortIndex;
        return He !== 0 ? He : G.id - ve.id;
      }
      var nt = 1, te = 2, de = 3, le = 4, Ue = 5;
      function ut(G, ve) {
      }
      var vt = typeof performance == "object" && typeof performance.now == "function";
      if (vt) {
        var cn = performance;
        Y.unstable_now = function() {
          return cn.now();
        };
      } else {
        var Ke = Date, je = Ke.now();
        Y.unstable_now = function() {
          return Ke.now() - je;
        };
      }
      var ht = 1073741823, Ve = -1, Tt = 250, Ae = 5e3, Rn = 1e4, Fn = ht, jt = [], ct = [], xn = 1, ke = null, $e = de, fn = !1, Rt = !1, Kn = !1, $ = typeof setTimeout == "function" ? setTimeout : null, ye = typeof clearTimeout == "function" ? clearTimeout : null, Z = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function Ze(G) {
        for (var ve = qe(ct); ve !== null; ) {
          if (ve.callback === null)
            S(ct);
          else if (ve.startTime <= G)
            S(ct), ve.sortIndex = ve.expirationTime, en(jt, ve);
          else
            return;
          ve = qe(ct);
        }
      }
      function rt(G) {
        if (Kn = !1, Ze(G), !Rt)
          if (qe(jt) !== null)
            Rt = !0, ya(wn);
          else {
            var ve = qe(ct);
            ve !== null && Gt(rt, ve.startTime - G);
          }
      }
      function wn(G, ve) {
        Rt = !1, Kn && (Kn = !1, _r()), fn = !0;
        var He = $e;
        try {
          var ot;
          if (!M)
            return Zn(G, ve);
        } finally {
          ke = null, $e = He, fn = !1;
        }
      }
      function Zn(G, ve) {
        var He = ve;
        for (Ze(He), ke = qe(jt); ke !== null && !Re && !(ke.expirationTime > He && (!G || ha())); ) {
          var ot = ke.callback;
          if (typeof ot == "function") {
            ke.callback = null, $e = ke.priorityLevel;
            var Nt = ke.expirationTime <= He, pn = ot(Nt);
            He = Y.unstable_now(), typeof pn == "function" ? ke.callback = pn : ke === qe(jt) && S(jt), Ze(He);
          } else
            S(jt);
          ke = qe(jt);
        }
        if (ke !== null)
          return !0;
        var Yt = qe(ct);
        return Yt !== null && Gt(rt, Yt.startTime - He), !1;
      }
      function La(G, ve) {
        switch (G) {
          case nt:
          case te:
          case de:
          case le:
          case Ue:
            break;
          default:
            G = de;
        }
        var He = $e;
        $e = G;
        try {
          return ve();
        } finally {
          $e = He;
        }
      }
      function tn(G) {
        var ve;
        switch ($e) {
          case nt:
          case te:
          case de:
            ve = de;
            break;
          default:
            ve = $e;
            break;
        }
        var He = $e;
        $e = ve;
        try {
          return G();
        } finally {
          $e = He;
        }
      }
      function $r(G) {
        var ve = $e;
        return function() {
          var He = $e;
          $e = ve;
          try {
            return G.apply(this, arguments);
          } finally {
            $e = He;
          }
        };
      }
      function jn(G, ve, He) {
        var ot = Y.unstable_now(), Nt;
        if (typeof He == "object" && He !== null) {
          var pn = He.delay;
          typeof pn == "number" && pn > 0 ? Nt = ot + pn : Nt = ot;
        } else
          Nt = ot;
        var Yt;
        switch (G) {
          case nt:
            Yt = Ve;
            break;
          case te:
            Yt = Tt;
            break;
          case Ue:
            Yt = Fn;
            break;
          case le:
            Yt = Rn;
            break;
          case de:
          default:
            Yt = Ae;
            break;
        }
        var dr = Nt + Yt, Et = {
          id: xn++,
          callback: ve,
          priorityLevel: G,
          startTime: Nt,
          expirationTime: dr,
          sortIndex: -1
        };
        return Nt > ot ? (Et.sortIndex = Nt, en(ct, Et), qe(jt) === null && Et === qe(ct) && (Kn ? _r() : Kn = !0, Gt(rt, Nt - ot))) : (Et.sortIndex = dr, en(jt, Et), !Rt && !fn && (Rt = !0, ya(wn))), Et;
      }
      function cr() {
      }
      function Ma() {
        !Rt && !fn && (Rt = !0, ya(wn));
      }
      function fr() {
        return qe(jt);
      }
      function Qr(G) {
        G.callback = null;
      }
      function dn() {
        return $e;
      }
      var Vn = !1, Dn = null, Bn = -1, Pn = Jt, Ir = -1;
      function ha() {
        var G = Y.unstable_now() - Ir;
        return !(G < Pn);
      }
      function qa() {
      }
      function Na(G) {
        if (G < 0 || G > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        G > 0 ? Pn = Math.floor(1e3 / G) : Pn = Jt;
      }
      var ma = function() {
        if (Dn !== null) {
          var G = Y.unstable_now();
          Ir = G;
          var ve = !0, He = !0;
          try {
            He = Dn(ve, G);
          } finally {
            He ? br() : (Vn = !1, Dn = null);
          }
        } else
          Vn = !1;
      }, br;
      if (typeof Z == "function")
        br = function() {
          Z(ma);
        };
      else if (typeof MessageChannel < "u") {
        var za = new MessageChannel(), kr = za.port2;
        za.port1.onmessage = ma, br = function() {
          kr.postMessage(null);
        };
      } else
        br = function() {
          $(ma, 0);
        };
      function ya(G) {
        Dn = G, Vn || (Vn = !0, br());
      }
      function Gt(G, ve) {
        Bn = $(function() {
          G(Y.unstable_now());
        }, ve);
      }
      function _r() {
        ye(Bn), Bn = -1;
      }
      var wi = qa, ga = null;
      Y.unstable_IdlePriority = Ue, Y.unstable_ImmediatePriority = nt, Y.unstable_LowPriority = le, Y.unstable_NormalPriority = de, Y.unstable_Profiling = ga, Y.unstable_UserBlockingPriority = te, Y.unstable_cancelCallback = Qr, Y.unstable_continueExecution = Ma, Y.unstable_forceFrameRate = Na, Y.unstable_getCurrentPriorityLevel = dn, Y.unstable_getFirstCallbackNode = fr, Y.unstable_next = tn, Y.unstable_pauseExecution = cr, Y.unstable_requestPaint = wi, Y.unstable_runWithPriority = La, Y.unstable_scheduleCallback = jn, Y.unstable_shouldYield = ha, Y.unstable_wrapCallback = $r, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(c0)), c0;
}
var q1;
function J1() {
  return q1 || (q1 = 1, function(Y) {
    process.env.NODE_ENV === "production" ? Y.exports = Gb() : Y.exports = Wb();
  }(Ib)), Lm;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var K1;
function Xb() {
  if (K1)
    return pa;
  K1 = 1;
  var Y = _p, Re = J1();
  function M(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++)
      r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Jt = /* @__PURE__ */ new Set(), en = {};
  function qe(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (en[n] = r, n = 0; n < r.length; n++)
      Jt.add(r[n]);
  }
  var Ft = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), se = Object.prototype.hasOwnProperty, ce = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, nt = {}, te = {};
  function de(n) {
    return se.call(te, n) ? !0 : se.call(nt, n) ? !1 : ce.test(n) ? te[n] = !0 : (nt[n] = !0, !1);
  }
  function le(n, r, l, o) {
    if (l !== null && l.type === 0)
      return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Ue(n, r, l, o) {
    if (r === null || typeof r > "u" || le(n, r, l, o))
      return !0;
    if (o)
      return !1;
    if (l !== null)
      switch (l.type) {
        case 3:
          return !r;
        case 4:
          return r === !1;
        case 5:
          return isNaN(r);
        case 6:
          return isNaN(r) || 1 > r;
      }
    return !1;
  }
  function ut(n, r, l, o, c, d, h) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = h;
  }
  var vt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    vt[n] = new ut(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    vt[r] = new ut(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    vt[n] = new ut(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    vt[n] = new ut(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    vt[n] = new ut(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    vt[n] = new ut(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    vt[n] = new ut(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    vt[n] = new ut(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    vt[n] = new ut(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var cn = /[\-:]([a-z])/g;
  function Ke(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      cn,
      Ke
    );
    vt[r] = new ut(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(cn, Ke);
    vt[r] = new ut(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(cn, Ke);
    vt[r] = new ut(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    vt[n] = new ut(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), vt.xlinkHref = new ut("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    vt[n] = new ut(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function je(n, r, l, o) {
    var c = vt.hasOwnProperty(r) ? vt[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Ue(r, l, c, o) && (l = null), o || c === null ? de(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var ht = Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ve = Symbol.for("react.element"), Tt = Symbol.for("react.portal"), Ae = Symbol.for("react.fragment"), Rn = Symbol.for("react.strict_mode"), Fn = Symbol.for("react.profiler"), jt = Symbol.for("react.provider"), ct = Symbol.for("react.context"), xn = Symbol.for("react.forward_ref"), ke = Symbol.for("react.suspense"), $e = Symbol.for("react.suspense_list"), fn = Symbol.for("react.memo"), Rt = Symbol.for("react.lazy"), Kn = Symbol.for("react.offscreen"), $ = Symbol.iterator;
  function ye(n) {
    return n === null || typeof n != "object" ? null : (n = $ && n[$] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var Z = Object.assign, Ze;
  function rt(n) {
    if (Ze === void 0)
      try {
        throw Error();
      } catch (l) {
        var r = l.stack.trim().match(/\n( *(at )?)/);
        Ze = r && r[1] || "";
      }
    return `
` + Ze + n;
  }
  var wn = !1;
  function Zn(n, r) {
    if (!n || wn)
      return "";
    wn = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r)
        if (r = function() {
          throw Error();
        }, Object.defineProperty(r.prototype, "props", { set: function() {
          throw Error();
        } }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(r, []);
          } catch (L) {
            var o = L;
          }
          Reflect.construct(n, [], r);
        } else {
          try {
            r.call();
          } catch (L) {
            o = L;
          }
          n.call(r.prototype);
        }
      else {
        try {
          throw Error();
        } catch (L) {
          o = L;
        }
        n();
      }
    } catch (L) {
      if (L && o && typeof L.stack == "string") {
        for (var c = L.stack.split(`
`), d = o.stack.split(`
`), h = c.length - 1, g = d.length - 1; 1 <= h && 0 <= g && c[h] !== d[g]; )
          g--;
        for (; 1 <= h && 0 <= g; h--, g--)
          if (c[h] !== d[g]) {
            if (h !== 1 || g !== 1)
              do
                if (h--, g--, 0 > g || c[h] !== d[g]) {
                  var C = `
` + c[h].replace(" at new ", " at ");
                  return n.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", n.displayName)), C;
                }
              while (1 <= h && 0 <= g);
            break;
          }
      }
    } finally {
      wn = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? rt(n) : "";
  }
  function La(n) {
    switch (n.tag) {
      case 5:
        return rt(n.type);
      case 16:
        return rt("Lazy");
      case 13:
        return rt("Suspense");
      case 19:
        return rt("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Zn(n.type, !1), n;
      case 11:
        return n = Zn(n.type.render, !1), n;
      case 1:
        return n = Zn(n.type, !0), n;
      default:
        return "";
    }
  }
  function tn(n) {
    if (n == null)
      return null;
    if (typeof n == "function")
      return n.displayName || n.name || null;
    if (typeof n == "string")
      return n;
    switch (n) {
      case Ae:
        return "Fragment";
      case Tt:
        return "Portal";
      case Fn:
        return "Profiler";
      case Rn:
        return "StrictMode";
      case ke:
        return "Suspense";
      case $e:
        return "SuspenseList";
    }
    if (typeof n == "object")
      switch (n.$$typeof) {
        case ct:
          return (n.displayName || "Context") + ".Consumer";
        case jt:
          return (n._context.displayName || "Context") + ".Provider";
        case xn:
          var r = n.render;
          return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
        case fn:
          return r = n.displayName || null, r !== null ? r : tn(n.type) || "Memo";
        case Rt:
          r = n._payload, n = n._init;
          try {
            return tn(n(r));
          } catch {
          }
      }
    return null;
  }
  function $r(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return tn(r);
      case 8:
        return r === Rn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function")
          return r.displayName || r.name || null;
        if (typeof r == "string")
          return r;
    }
    return null;
  }
  function jn(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function cr(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Ma(n) {
    var r = cr(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(h) {
        o = "" + h, d.call(this, h);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(h) {
        o = "" + h;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function fr(n) {
    n._valueTracker || (n._valueTracker = Ma(n));
  }
  function Qr(n) {
    if (!n)
      return !1;
    var r = n._valueTracker;
    if (!r)
      return !0;
    var l = r.getValue(), o = "";
    return n && (o = cr(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function dn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u")
      return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Vn(n, r) {
    var l = r.checked;
    return Z({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Dn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = jn(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Bn(n, r) {
    r = r.checked, r != null && je(n, "checked", r, !1);
  }
  function Pn(n, r) {
    Bn(n, r);
    var l = jn(r.value), o = r.type;
    if (l != null)
      o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? ha(n, r.type, l) : r.hasOwnProperty("defaultValue") && ha(n, r.type, jn(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Ir(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null))
        return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function ha(n, r, l) {
    (r !== "number" || dn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var qa = Array.isArray;
  function Na(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++)
        r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++)
        c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + jn(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function ma(n, r) {
    if (r.dangerouslySetInnerHTML != null)
      throw Error(M(91));
    return Z({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function br(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null)
          throw Error(M(92));
        if (qa(l)) {
          if (1 < l.length)
            throw Error(M(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: jn(l) };
  }
  function za(n, r) {
    var l = jn(r.value), o = jn(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function kr(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function ya(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Gt(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? ya(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var _r, wi = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n)
      n.innerHTML = r;
    else {
      for (_r = _r || document.createElement("div"), _r.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = _r.firstChild; n.firstChild; )
        n.removeChild(n.firstChild);
      for (; r.firstChild; )
        n.appendChild(r.firstChild);
    }
  });
  function ga(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var G = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, ve = ["Webkit", "ms", "Moz", "O"];
  Object.keys(G).forEach(function(n) {
    ve.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), G[r] = G[n];
    });
  });
  function He(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || G.hasOwnProperty(n) && G[n] ? ("" + r).trim() : r + "px";
  }
  function ot(n, r) {
    n = n.style;
    for (var l in r)
      if (r.hasOwnProperty(l)) {
        var o = l.indexOf("--") === 0, c = He(l, r[l], o);
        l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
      }
  }
  var Nt = Z({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function pn(n, r) {
    if (r) {
      if (Nt[n] && (r.children != null || r.dangerouslySetInnerHTML != null))
        throw Error(M(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null)
          throw Error(M(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML))
          throw Error(M(61));
      }
      if (r.style != null && typeof r.style != "object")
        throw Error(M(62));
    }
  }
  function Yt(n, r) {
    if (n.indexOf("-") === -1)
      return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var dr = null;
  function Et(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Or = null, mt = null, Ct = null;
  function tu(n) {
    if (n = Do(n)) {
      if (typeof Or != "function")
        throw Error(M(280));
      var r = n.stateNode;
      r && (r = he(r), Or(n.stateNode, n.type, r));
    }
  }
  function sl(n) {
    mt ? Ct ? Ct.push(n) : Ct = [n] : mt = n;
  }
  function nu() {
    if (mt) {
      var n = mt, r = Ct;
      if (Ct = mt = null, tu(n), r)
        for (n = 0; n < r.length; n++)
          tu(r[n]);
    }
  }
  function ro(n, r) {
    return n(r);
  }
  function ps() {
  }
  var cl = !1;
  function ru(n, r, l) {
    if (cl)
      return n(r, l);
    cl = !0;
    try {
      return ro(n, r, l);
    } finally {
      cl = !1, (mt !== null || Ct !== null) && (ps(), nu());
    }
  }
  function fl(n, r) {
    var l = n.stateNode;
    if (l === null)
      return null;
    var o = he(l);
    if (o === null)
      return null;
    l = o[r];
    e:
      switch (r) {
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
          (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
          break e;
        default:
          n = !1;
      }
    if (n)
      return null;
    if (l && typeof l != "function")
      throw Error(M(231, r, typeof l));
    return l;
  }
  var au = !1;
  if (Ft)
    try {
      var Ua = {};
      Object.defineProperty(Ua, "passive", { get: function() {
        au = !0;
      } }), window.addEventListener("test", Ua, Ua), window.removeEventListener("test", Ua, Ua);
    } catch {
      au = !1;
    }
  function Di(n, r, l, o, c, d, h, g, C) {
    var L = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, L);
    } catch (F) {
      this.onError(F);
    }
  }
  var Lr = !1, Sa = null, bi = !1, E = null, j = { onError: function(n) {
    Lr = !0, Sa = n;
  } };
  function W(n, r, l, o, c, d, h, g, C) {
    Lr = !1, Sa = null, Di.apply(j, arguments);
  }
  function ge(n, r, l, o, c, d, h, g, C) {
    if (W.apply(this, arguments), Lr) {
      if (Lr) {
        var L = Sa;
        Lr = !1, Sa = null;
      } else
        throw Error(M(198));
      bi || (bi = !0, E = L);
    }
  }
  function Ne(n) {
    var r = n, l = n;
    if (n.alternate)
      for (; r.return; )
        r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function We(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null)
        return r.dehydrated;
    }
    return null;
  }
  function ze(n) {
    if (Ne(n) !== n)
      throw Error(M(188));
  }
  function Ee(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Ne(n), r === null)
        throw Error(M(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null)
        break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l)
            return ze(c), n;
          if (d === o)
            return ze(c), r;
          d = d.sibling;
        }
        throw Error(M(188));
      }
      if (l.return !== o.return)
        l = c, o = d;
      else {
        for (var h = !1, g = c.child; g; ) {
          if (g === l) {
            h = !0, l = c, o = d;
            break;
          }
          if (g === o) {
            h = !0, o = c, l = d;
            break;
          }
          g = g.sibling;
        }
        if (!h) {
          for (g = d.child; g; ) {
            if (g === l) {
              h = !0, l = d, o = c;
              break;
            }
            if (g === o) {
              h = !0, o = d, l = c;
              break;
            }
            g = g.sibling;
          }
          if (!h)
            throw Error(M(189));
        }
      }
      if (l.alternate !== o)
        throw Error(M(190));
    }
    if (l.tag !== 3)
      throw Error(M(188));
    return l.stateNode.current === l ? n : r;
  }
  function vn(n) {
    return n = Ee(n), n !== null ? _t(n) : null;
  }
  function _t(n) {
    if (n.tag === 5 || n.tag === 6)
      return n;
    for (n = n.child; n !== null; ) {
      var r = _t(n);
      if (r !== null)
        return r;
      n = n.sibling;
    }
    return null;
  }
  var Ot = Re.unstable_scheduleCallback, Jn = Re.unstable_cancelCallback, ki = Re.unstable_shouldYield, vs = Re.unstable_requestPaint, Je = Re.unstable_now, Mm = Re.unstable_getCurrentPriorityLevel, Ka = Re.unstable_ImmediatePriority, Be = Re.unstable_UserBlockingPriority, _i = Re.unstable_NormalPriority, Op = Re.unstable_LowPriority, of = Re.unstable_IdlePriority, ao = null, Ea = null;
  function Lp(n) {
    if (Ea && typeof Ea.onCommitFiberRoot == "function")
      try {
        Ea.onCommitFiberRoot(ao, n, void 0, (n.current.flags & 128) === 128);
      } catch {
      }
  }
  var Gr = Math.clz32 ? Math.clz32 : Nm, Mp = Math.log, Np = Math.LN2;
  function Nm(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Mp(n) / Np | 0) | 0;
  }
  var hs = 64, iu = 4194304;
  function dl(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
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
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Ca(n, r) {
    var l = n.pendingLanes;
    if (l === 0)
      return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, h = l & 268435455;
    if (h !== 0) {
      var g = h & ~c;
      g !== 0 ? o = dl(g) : (d &= h, d !== 0 && (o = dl(d)));
    } else
      h = l & ~c, h !== 0 ? o = dl(h) : d !== 0 && (o = dl(d));
    if (o === 0)
      return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0))
      return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0)
      for (n = n.entanglements, r &= o; 0 < r; )
        l = 31 - Gr(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function sf(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
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
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ms(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var h = 31 - Gr(d), g = 1 << h, C = c[h];
      C === -1 ? (!(g & l) || g & o) && (c[h] = sf(g, r)) : C <= r && (n.expiredLanes |= g), d &= ~g;
    }
  }
  function cf(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function ys() {
    var n = hs;
    return hs <<= 1, !(hs & 4194240) && (hs = 64), n;
  }
  function ff(n) {
    for (var r = [], l = 0; 31 > l; l++)
      r.push(n);
    return r;
  }
  function pl(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Gr(r), n[r] = l;
  }
  function zm(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Gr(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function io(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Gr(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var st = 0;
  function df(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var zp, gs, yt, Up, pf, Oe = !1, lo = [], Wt = null, Wr = null, Xr = null, uo = /* @__PURE__ */ new Map(), nn = /* @__PURE__ */ new Map(), ft = [], Um = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Ta(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Wt = null;
        break;
      case "dragenter":
      case "dragleave":
        Wr = null;
        break;
      case "mouseover":
      case "mouseout":
        Xr = null;
        break;
      case "pointerover":
      case "pointerout":
        uo.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        nn.delete(r.pointerId);
    }
  }
  function Yn(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = Do(r), r !== null && gs(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Oi(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Wt = Yn(Wt, n, r, l, o, c), !0;
      case "dragenter":
        return Wr = Yn(Wr, n, r, l, o, c), !0;
      case "mouseover":
        return Xr = Yn(Xr, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return uo.set(d, Yn(uo.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, nn.set(d, Yn(nn.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Ap(n) {
    var r = Kr(n.target);
    if (r !== null) {
      var l = Ne(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = We(l), r !== null) {
            n.blockedOn = r, pf(n.priority, function() {
              yt(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function lu(n) {
    if (n.blockedOn !== null)
      return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Cs(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        dr = o, l.target.dispatchEvent(o), dr = null;
      } else
        return r = Do(l), r !== null && gs(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function vf(n, r, l) {
    lu(n) && l.delete(r);
  }
  function Hp() {
    Oe = !1, Wt !== null && lu(Wt) && (Wt = null), Wr !== null && lu(Wr) && (Wr = null), Xr !== null && lu(Xr) && (Xr = null), uo.forEach(vf), nn.forEach(vf);
  }
  function oo(n, r) {
    n.blockedOn === r && (n.blockedOn = null, Oe || (Oe = !0, Re.unstable_scheduleCallback(Re.unstable_NormalPriority, Hp)));
  }
  function so(n) {
    function r(c) {
      return oo(c, n);
    }
    if (0 < lo.length) {
      oo(lo[0], n);
      for (var l = 1; l < lo.length; l++) {
        var o = lo[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Wt !== null && oo(Wt, n), Wr !== null && oo(Wr, n), Xr !== null && oo(Xr, n), uo.forEach(r), nn.forEach(r), l = 0; l < ft.length; l++)
      o = ft[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < ft.length && (l = ft[0], l.blockedOn === null); )
      Ap(l), l.blockedOn === null && ft.shift();
  }
  var uu = ht.ReactCurrentBatchConfig, vl = !0;
  function Fp(n, r, l, o) {
    var c = st, d = uu.transition;
    uu.transition = null;
    try {
      st = 1, Es(n, r, l, o);
    } finally {
      st = c, uu.transition = d;
    }
  }
  function Ss(n, r, l, o) {
    var c = st, d = uu.transition;
    uu.transition = null;
    try {
      st = 4, Es(n, r, l, o);
    } finally {
      st = c, uu.transition = d;
    }
  }
  function Es(n, r, l, o) {
    if (vl) {
      var c = Cs(n, r, l, o);
      if (c === null)
        Ns(n, r, o, co, l), Ta(n, o);
      else if (Oi(c, n, r, l, o))
        o.stopPropagation();
      else if (Ta(n, o), r & 4 && -1 < Um.indexOf(n)) {
        for (; c !== null; ) {
          var d = Do(c);
          if (d !== null && zp(d), d = Cs(n, r, l, o), d === null && Ns(n, r, o, co, l), d === c)
            break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else
        Ns(n, r, o, null, l);
    }
  }
  var co = null;
  function Cs(n, r, l, o) {
    if (co = null, n = Et(o), n = Kr(n), n !== null)
      if (r = Ne(n), r === null)
        n = null;
      else if (l = r.tag, l === 13) {
        if (n = We(r), n !== null)
          return n;
        n = null;
      } else if (l === 3) {
        if (r.stateNode.current.memoizedState.isDehydrated)
          return r.tag === 3 ? r.stateNode.containerInfo : null;
        n = null;
      } else
        r !== n && (n = null);
    return co = n, null;
  }
  function hf(n) {
    switch (n) {
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
      case "selectstart":
        return 1;
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
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Mm()) {
          case Ka:
            return 1;
          case Be:
            return 4;
          case _i:
          case Op:
            return 16;
          case of:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Za = null, fo = null, po = null;
  function mf() {
    if (po)
      return po;
    var n, r = fo, l = r.length, o, c = "value" in Za ? Za.value : Za.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++)
      ;
    var h = l - n;
    for (o = 1; o <= h && r[l - o] === c[d - o]; o++)
      ;
    return po = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function ou(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function vo() {
    return !0;
  }
  function jp() {
    return !1;
  }
  function Mr(n) {
    function r(l, o, c, d, h) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = h, this.currentTarget = null;
      for (var g in n)
        n.hasOwnProperty(g) && (l = n[g], this[g] = l ? l(d) : d[g]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? vo : jp, this.isPropagationStopped = jp, this;
    }
    return Z(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = vo);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = vo);
    }, persist: function() {
    }, isPersistent: vo }), r;
  }
  var Li = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ts = Mr(Li), su = Z({}, Li, { view: 0, detail: 0 }), Vp = Mr(su), Rs, yf, ho, hn = Z({}, su, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Cf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== ho && (ho && n.type === "mousemove" ? (Rs = n.screenX - ho.screenX, yf = n.screenY - ho.screenY) : yf = Rs = 0, ho = n), Rs);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : yf;
  } }), xs = Mr(hn), Bp = Z({}, hn, { dataTransfer: 0 }), Pp = Mr(Bp), Am = Z({}, su, { relatedTarget: 0 }), Mi = Mr(Am), gf = Z({}, Li, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Yp = Mr(gf), Hm = Z({}, Li, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Fm = Mr(Hm), jm = Z({}, Li, { data: 0 }), Sf = Mr(jm), Ef = {
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
  }, $p = {
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
  }, Qp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Ip(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Qp[n]) ? !!r[n] : !1;
  }
  function Cf() {
    return Ip;
  }
  var Ja = Z({}, su, { key: function(n) {
    if (n.key) {
      var r = Ef[n.key] || n.key;
      if (r !== "Unidentified")
        return r;
    }
    return n.type === "keypress" ? (n = ou(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? $p[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Cf, charCode: function(n) {
    return n.type === "keypress" ? ou(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? ou(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Vm = Mr(Ja), Tf = Z({}, hn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ws = Mr(Tf), Rf = Z({}, su, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Cf }), Bm = Mr(Rf), Ds = Z({}, Li, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Gp = Mr(Ds), pr = Z({}, hn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ei = Mr(pr), Xt = [9, 13, 27, 32], Ra = Ft && "CompositionEvent" in window, hl = null;
  Ft && "documentMode" in document && (hl = document.documentMode);
  var bs = Ft && "TextEvent" in window && !hl, Wp = Ft && (!Ra || hl && 8 < hl && 11 >= hl), cu = String.fromCharCode(32), Xp = !1;
  function qp(n, r) {
    switch (n) {
      case "keyup":
        return Xt.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ks(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var fu = !1;
  function Pm(n, r) {
    switch (n) {
      case "compositionend":
        return ks(r);
      case "keypress":
        return r.which !== 32 ? null : (Xp = !0, cu);
      case "textInput":
        return n = r.data, n === cu && Xp ? null : n;
      default:
        return null;
    }
  }
  function Ym(n, r) {
    if (fu)
      return n === "compositionend" || !Ra && qp(n, r) ? (n = mf(), po = fo = Za = null, fu = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length)
            return r.char;
          if (r.which)
            return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Wp && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Kp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Zp(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Kp[n.type] : r === "textarea";
  }
  function Jp(n, r, l, o) {
    sl(o), r = Ro(r, "onChange"), 0 < r.length && (l = new Ts("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var mo = null, du = null;
  function pu(n) {
    Ms(n, 0);
  }
  function vu(n) {
    var r = mu(n);
    if (Qr(r))
      return n;
  }
  function ev(n, r) {
    if (n === "change")
      return r;
  }
  var xf = !1;
  if (Ft) {
    var wf;
    if (Ft) {
      var Df = "oninput" in document;
      if (!Df) {
        var tv = document.createElement("div");
        tv.setAttribute("oninput", "return;"), Df = typeof tv.oninput == "function";
      }
      wf = Df;
    } else
      wf = !1;
    xf = wf && (!document.documentMode || 9 < document.documentMode);
  }
  function nv() {
    mo && (mo.detachEvent("onpropertychange", rv), du = mo = null);
  }
  function rv(n) {
    if (n.propertyName === "value" && vu(du)) {
      var r = [];
      Jp(r, du, n, Et(n)), ru(pu, r);
    }
  }
  function $m(n, r, l) {
    n === "focusin" ? (nv(), mo = r, du = l, mo.attachEvent("onpropertychange", rv)) : n === "focusout" && nv();
  }
  function Qm(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown")
      return vu(du);
  }
  function Im(n, r) {
    if (n === "click")
      return vu(r);
  }
  function av(n, r) {
    if (n === "input" || n === "change")
      return vu(r);
  }
  function Gm(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var qr = typeof Object.is == "function" ? Object.is : Gm;
  function yo(n, r) {
    if (qr(n, r))
      return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null)
      return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length)
      return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!se.call(r, c) || !qr(n[c], r[c]))
        return !1;
    }
    return !0;
  }
  function iv(n) {
    for (; n && n.firstChild; )
      n = n.firstChild;
    return n;
  }
  function lv(n, r) {
    var l = iv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r)
          return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = iv(l);
    }
  }
  function uv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? uv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function _s() {
    for (var n = window, r = dn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l)
        n = r.contentWindow;
      else
        break;
      r = dn(n.document);
    }
    return r;
  }
  function ti(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function Os(n) {
    var r = _s(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && uv(l.ownerDocument.documentElement, l)) {
      if (o !== null && ti(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l)
          l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = lv(l, d);
          var h = lv(
            l,
            o
          );
          c && h && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== h.node || n.focusOffset !== h.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(h.node, h.offset)) : (r.setEnd(h.node, h.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; )
        n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++)
        n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ov = Ft && "documentMode" in document && 11 >= document.documentMode, xa = null, bf = null, go = null, kf = !1;
  function sv(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    kf || xa == null || xa !== dn(o) || (o = xa, "selectionStart" in o && ti(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), go && yo(go, o) || (go = o, o = Ro(bf, "onSelect"), 0 < o.length && (r = new Ts("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = xa)));
  }
  function Ls(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var ml = { animationend: Ls("Animation", "AnimationEnd"), animationiteration: Ls("Animation", "AnimationIteration"), animationstart: Ls("Animation", "AnimationStart"), transitionend: Ls("Transition", "TransitionEnd") }, _f = {}, Of = {};
  Ft && (Of = document.createElement("div").style, "AnimationEvent" in window || (delete ml.animationend.animation, delete ml.animationiteration.animation, delete ml.animationstart.animation), "TransitionEvent" in window || delete ml.transitionend.transition);
  function mn(n) {
    if (_f[n])
      return _f[n];
    if (!ml[n])
      return n;
    var r = ml[n], l;
    for (l in r)
      if (r.hasOwnProperty(l) && l in Of)
        return _f[n] = r[l];
    return n;
  }
  var Lf = mn("animationend"), cv = mn("animationiteration"), fv = mn("animationstart"), dv = mn("transitionend"), pv = /* @__PURE__ */ new Map(), vv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ni(n, r) {
    pv.set(n, r), qe(r, [n]);
  }
  for (var So = 0; So < vv.length; So++) {
    var yl = vv[So], Wm = yl.toLowerCase(), Eo = yl[0].toUpperCase() + yl.slice(1);
    ni(Wm, "on" + Eo);
  }
  ni(Lf, "onAnimationEnd"), ni(cv, "onAnimationIteration"), ni(fv, "onAnimationStart"), ni("dblclick", "onDoubleClick"), ni("focusin", "onFocus"), ni("focusout", "onBlur"), ni(dv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), qe("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), qe("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), qe("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), qe("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), qe("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), qe("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Co = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Xm = new Set("cancel close invalid load scroll toggle".split(" ").concat(Co));
  function hv(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, ge(o, r, void 0, n), n.currentTarget = null;
  }
  function Ms(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r)
          for (var h = o.length - 1; 0 <= h; h--) {
            var g = o[h], C = g.instance, L = g.currentTarget;
            if (g = g.listener, C !== d && c.isPropagationStopped())
              break e;
            hv(c, g, L), d = C;
          }
        else
          for (h = 0; h < o.length; h++) {
            if (g = o[h], C = g.instance, L = g.currentTarget, g = g.listener, C !== d && c.isPropagationStopped())
              break e;
            hv(c, g, L), d = C;
          }
      }
    }
    if (bi)
      throw n = E, bi = !1, E = null, n;
  }
  function gt(n, r) {
    var l = r[Ff];
    l === void 0 && (l = r[Ff] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (mv(r, n, 2, !1), l.add(o));
  }
  function Ni(n, r, l) {
    var o = 0;
    r && (o |= 4), mv(l, n, o, r);
  }
  var ri = "_reactListening" + Math.random().toString(36).slice(2);
  function hu(n) {
    if (!n[ri]) {
      n[ri] = !0, Jt.forEach(function(l) {
        l !== "selectionchange" && (Xm.has(l) || Ni(l, !1, n), Ni(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[ri] || (r[ri] = !0, Ni("selectionchange", !1, r));
    }
  }
  function mv(n, r, l, o) {
    switch (hf(r)) {
      case 1:
        var c = Fp;
        break;
      case 4:
        c = Ss;
        break;
      default:
        c = Es;
    }
    l = c.bind(null, r, l, n), c = void 0, !au || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function Ns(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null)
      e:
        for (; ; ) {
          if (o === null)
            return;
          var h = o.tag;
          if (h === 3 || h === 4) {
            var g = o.stateNode.containerInfo;
            if (g === c || g.nodeType === 8 && g.parentNode === c)
              break;
            if (h === 4)
              for (h = o.return; h !== null; ) {
                var C = h.tag;
                if ((C === 3 || C === 4) && (C = h.stateNode.containerInfo, C === c || C.nodeType === 8 && C.parentNode === c))
                  return;
                h = h.return;
              }
            for (; g !== null; ) {
              if (h = Kr(g), h === null)
                return;
              if (C = h.tag, C === 5 || C === 6) {
                o = d = h;
                continue e;
              }
              g = g.parentNode;
            }
          }
          o = o.return;
        }
    ru(function() {
      var L = d, F = Et(l), V = [];
      e: {
        var H = pv.get(n);
        if (H !== void 0) {
          var q = Ts, re = n;
          switch (n) {
            case "keypress":
              if (ou(l) === 0)
                break e;
            case "keydown":
            case "keyup":
              q = Vm;
              break;
            case "focusin":
              re = "focus", q = Mi;
              break;
            case "focusout":
              re = "blur", q = Mi;
              break;
            case "beforeblur":
            case "afterblur":
              q = Mi;
              break;
            case "click":
              if (l.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = xs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = Pp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = Bm;
              break;
            case Lf:
            case cv:
            case fv:
              q = Yp;
              break;
            case dv:
              q = Gp;
              break;
            case "scroll":
              q = Vp;
              break;
            case "wheel":
              q = ei;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = Fm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = ws;
          }
          var ue = (r & 4) !== 0, Qt = !ue && n === "scroll", w = ue ? H !== null ? H + "Capture" : null : H;
          ue = [];
          for (var R = L, k; R !== null; ) {
            k = R;
            var P = k.stateNode;
            if (k.tag === 5 && P !== null && (k = P, w !== null && (P = fl(R, w), P != null && ue.push(To(R, P, k)))), Qt)
              break;
            R = R.return;
          }
          0 < ue.length && (H = new q(H, re, null, l, F), V.push({ event: H, listeners: ue }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (H = n === "mouseover" || n === "pointerover", q = n === "mouseout" || n === "pointerout", H && l !== dr && (re = l.relatedTarget || l.fromElement) && (Kr(re) || re[ai]))
            break e;
          if ((q || H) && (H = F.window === F ? F : (H = F.ownerDocument) ? H.defaultView || H.parentWindow : window, q ? (re = l.relatedTarget || l.toElement, q = L, re = re ? Kr(re) : null, re !== null && (Qt = Ne(re), re !== Qt || re.tag !== 5 && re.tag !== 6) && (re = null)) : (q = null, re = L), q !== re)) {
            if (ue = xs, P = "onMouseLeave", w = "onMouseEnter", R = "mouse", (n === "pointerout" || n === "pointerover") && (ue = ws, P = "onPointerLeave", w = "onPointerEnter", R = "pointer"), Qt = q == null ? H : mu(q), k = re == null ? H : mu(re), H = new ue(P, R + "leave", q, l, F), H.target = Qt, H.relatedTarget = k, P = null, Kr(F) === L && (ue = new ue(w, R + "enter", re, l, F), ue.target = k, ue.relatedTarget = Qt, P = ue), Qt = P, q && re)
              t: {
                for (ue = q, w = re, R = 0, k = ue; k; k = gl(k))
                  R++;
                for (k = 0, P = w; P; P = gl(P))
                  k++;
                for (; 0 < R - k; )
                  ue = gl(ue), R--;
                for (; 0 < k - R; )
                  w = gl(w), k--;
                for (; R--; ) {
                  if (ue === w || w !== null && ue === w.alternate)
                    break t;
                  ue = gl(ue), w = gl(w);
                }
                ue = null;
              }
            else
              ue = null;
            q !== null && Mf(V, H, q, ue, !1), re !== null && Qt !== null && Mf(V, Qt, re, ue, !0);
          }
        }
        e: {
          if (H = L ? mu(L) : window, q = H.nodeName && H.nodeName.toLowerCase(), q === "select" || q === "input" && H.type === "file")
            var oe = ev;
          else if (Zp(H))
            if (xf)
              oe = av;
            else {
              oe = Qm;
              var ae = $m;
            }
          else
            (q = H.nodeName) && q.toLowerCase() === "input" && (H.type === "checkbox" || H.type === "radio") && (oe = Im);
          if (oe && (oe = oe(n, L))) {
            Jp(V, oe, l, F);
            break e;
          }
          ae && ae(n, H, L), n === "focusout" && (ae = H._wrapperState) && ae.controlled && H.type === "number" && ha(H, "number", H.value);
        }
        switch (ae = L ? mu(L) : window, n) {
          case "focusin":
            (Zp(ae) || ae.contentEditable === "true") && (xa = ae, bf = L, go = null);
            break;
          case "focusout":
            go = bf = xa = null;
            break;
          case "mousedown":
            kf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            kf = !1, sv(V, l, F);
            break;
          case "selectionchange":
            if (ov)
              break;
          case "keydown":
          case "keyup":
            sv(V, l, F);
        }
        var pe;
        if (Ra)
          e: {
            switch (n) {
              case "compositionstart":
                var De = "onCompositionStart";
                break e;
              case "compositionend":
                De = "onCompositionEnd";
                break e;
              case "compositionupdate":
                De = "onCompositionUpdate";
                break e;
            }
            De = void 0;
          }
        else
          fu ? qp(n, l) && (De = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (De = "onCompositionStart");
        De && (Wp && l.locale !== "ko" && (fu || De !== "onCompositionStart" ? De === "onCompositionEnd" && fu && (pe = mf()) : (Za = F, fo = "value" in Za ? Za.value : Za.textContent, fu = !0)), ae = Ro(L, De), 0 < ae.length && (De = new Sf(De, n, null, l, F), V.push({ event: De, listeners: ae }), pe ? De.data = pe : (pe = ks(l), pe !== null && (De.data = pe)))), (pe = bs ? Pm(n, l) : Ym(n, l)) && (L = Ro(L, "onBeforeInput"), 0 < L.length && (F = new Sf("onBeforeInput", "beforeinput", null, l, F), V.push({ event: F, listeners: L }), F.data = pe));
      }
      Ms(V, r);
    });
  }
  function To(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function Ro(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = fl(n, l), d != null && o.unshift(To(n, d, c)), d = fl(n, r), d != null && o.push(To(n, d, c))), n = n.return;
    }
    return o;
  }
  function gl(n) {
    if (n === null)
      return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Mf(n, r, l, o, c) {
    for (var d = r._reactName, h = []; l !== null && l !== o; ) {
      var g = l, C = g.alternate, L = g.stateNode;
      if (C !== null && C === o)
        break;
      g.tag === 5 && L !== null && (g = L, c ? (C = fl(l, d), C != null && h.unshift(To(l, C, g))) : c || (C = fl(l, d), C != null && h.push(To(l, C, g)))), l = l.return;
    }
    h.length !== 0 && n.push({ event: r, listeners: h });
  }
  var Nf = /\r\n?/g, qm = /\u0000|\uFFFD/g;
  function zf(n) {
    return (typeof n == "string" ? n : "" + n).replace(Nf, `
`).replace(qm, "");
  }
  function zs(n, r, l) {
    if (r = zf(r), zf(n) !== r && l)
      throw Error(M(425));
  }
  function Us() {
  }
  var Uf = null, Sl = null;
  function xo(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var El = typeof setTimeout == "function" ? setTimeout : void 0, yv = typeof clearTimeout == "function" ? clearTimeout : void 0, Af = typeof Promise == "function" ? Promise : void 0, Hf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Af < "u" ? function(n) {
    return Af.resolve(null).then(n).catch(Km);
  } : El;
  function Km(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function zi(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8)
        if (l = c.data, l === "/$") {
          if (o === 0) {
            n.removeChild(c), so(r);
            return;
          }
          o--;
        } else
          l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    so(r);
  }
  function wa(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3)
        break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?")
          break;
        if (r === "/$")
          return null;
      }
    }
    return n;
  }
  function wo(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0)
            return n;
          r--;
        } else
          l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Ui = Math.random().toString(36).slice(2), Aa = "__reactFiber$" + Ui, Cl = "__reactProps$" + Ui, ai = "__reactContainer$" + Ui, Ff = "__reactEvents$" + Ui, Zm = "__reactListeners$" + Ui, jf = "__reactHandles$" + Ui;
  function Kr(n) {
    var r = n[Aa];
    if (r)
      return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[ai] || l[Aa]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null)
          for (n = wo(n); n !== null; ) {
            if (l = n[Aa])
              return l;
            n = wo(n);
          }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Do(n) {
    return n = n[Aa] || n[ai], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function mu(n) {
    if (n.tag === 5 || n.tag === 6)
      return n.stateNode;
    throw Error(M(33));
  }
  function he(n) {
    return n[Cl] || null;
  }
  var Ai = [], xt = -1;
  function Le(n) {
    return { current: n };
  }
  function at(n) {
    0 > xt || (n.current = Ai[xt], Ai[xt] = null, xt--);
  }
  function it(n, r) {
    xt++, Ai[xt] = n.current, n.current = r;
  }
  var Ha = {}, we = Le(Ha), Vt = Le(!1), vr = Ha;
  function Zr(n, r) {
    var l = n.type.contextTypes;
    if (!l)
      return Ha;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r)
      return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l)
      c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Lt(n) {
    return n = n.childContextTypes, n != null;
  }
  function Jr() {
    at(Vt), at(we);
  }
  function Hi(n, r, l) {
    if (we.current !== Ha)
      throw Error(M(168));
    it(we, r), it(Vt, l);
  }
  function bo(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function")
      return l;
    o = o.getChildContext();
    for (var c in o)
      if (!(c in r))
        throw Error(M(108, $r(n) || "Unknown", c));
    return Z({}, l, o);
  }
  function As(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ha, vr = we.current, it(we, n), it(Vt, Vt.current), !0;
  }
  function gv(n, r, l) {
    var o = n.stateNode;
    if (!o)
      throw Error(M(169));
    l ? (n = bo(n, r, vr), o.__reactInternalMemoizedMergedChildContext = n, at(Vt), at(we), it(we, n)) : at(Vt), it(Vt, l);
  }
  var Nr = null, yn = !1, ko = !1;
  function Vf(n) {
    Nr === null ? Nr = [n] : Nr.push(n);
  }
  function Bf(n) {
    yn = !0, Vf(n);
  }
  function hr() {
    if (!ko && Nr !== null) {
      ko = !0;
      var n = 0, r = st;
      try {
        var l = Nr;
        for (st = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Nr = null, yn = !1;
      } catch (c) {
        throw Nr !== null && (Nr = Nr.slice(n + 1)), Ot(Ka, hr), c;
      } finally {
        st = r, ko = !1;
      }
    }
    return null;
  }
  var Fi = [], mr = 0, Tl = null, yu = 0, yr = [], $n = 0, ea = null, bn = 1, ii = "";
  function zr(n, r) {
    Fi[mr++] = yu, Fi[mr++] = Tl, Tl = n, yu = r;
  }
  function Pf(n, r, l) {
    yr[$n++] = bn, yr[$n++] = ii, yr[$n++] = ea, ea = n;
    var o = bn;
    n = ii;
    var c = 32 - Gr(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - Gr(r) + c;
    if (30 < d) {
      var h = c - c % 5;
      d = (o & (1 << h) - 1).toString(32), o >>= h, c -= h, bn = 1 << 32 - Gr(r) + c | l << c | o, ii = d + n;
    } else
      bn = 1 << d | l << c | o, ii = n;
  }
  function Hs(n) {
    n.return !== null && (zr(n, 1), Pf(n, 1, 0));
  }
  function Yf(n) {
    for (; n === Tl; )
      Tl = Fi[--mr], Fi[mr] = null, yu = Fi[--mr], Fi[mr] = null;
    for (; n === ea; )
      ea = yr[--$n], yr[$n] = null, ii = yr[--$n], yr[$n] = null, bn = yr[--$n], yr[$n] = null;
  }
  var Ur = null, gr = null, wt = !1, ta = null;
  function $f(n, r) {
    var l = ua(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Sv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Ur = n, gr = wa(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Ur = n, gr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = ea !== null ? { id: bn, overflow: ii } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = ua(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Ur = n, gr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Fs(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function js(n) {
    if (wt) {
      var r = gr;
      if (r) {
        var l = r;
        if (!Sv(n, r)) {
          if (Fs(n))
            throw Error(M(418));
          r = wa(l.nextSibling);
          var o = Ur;
          r && Sv(n, r) ? $f(o, l) : (n.flags = n.flags & -4097 | 2, wt = !1, Ur = n);
        }
      } else {
        if (Fs(n))
          throw Error(M(418));
        n.flags = n.flags & -4097 | 2, wt = !1, Ur = n;
      }
    }
  }
  function Ev(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; )
      n = n.return;
    Ur = n;
  }
  function Vs(n) {
    if (n !== Ur)
      return !1;
    if (!wt)
      return Ev(n), wt = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !xo(n.type, n.memoizedProps)), r && (r = gr)) {
      if (Fs(n))
        throw Cv(), Error(M(418));
      for (; r; )
        $f(n, r), r = wa(r.nextSibling);
    }
    if (Ev(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n)
        throw Error(M(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                gr = wa(n.nextSibling);
                break e;
              }
              r--;
            } else
              l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        gr = null;
      }
    } else
      gr = Ur ? wa(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Cv() {
    for (var n = gr; n; )
      n = wa(n.nextSibling);
  }
  function zt() {
    gr = Ur = null, wt = !1;
  }
  function Qf(n) {
    ta === null ? ta = [n] : ta.push(n);
  }
  var Bs = ht.ReactCurrentBatchConfig;
  function Ar(n, r) {
    if (n && n.defaultProps) {
      r = Z({}, r), n = n.defaultProps;
      for (var l in n)
        r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  var Fa = Le(null), Ps = null, ji = null, If = null;
  function Gf() {
    If = ji = Ps = null;
  }
  function Vi(n) {
    var r = Fa.current;
    at(Fa), n._currentValue = r;
  }
  function gn(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l)
        break;
      n = n.return;
    }
  }
  function Q(n, r) {
    Ps = n, If = ji = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (qt = !0), n.firstContext = null);
  }
  function $t(n) {
    var r = n._currentValue;
    if (If !== n)
      if (n = { context: n, memoizedValue: r, next: null }, ji === null) {
        if (Ps === null)
          throw Error(M(308));
        ji = n, Ps.dependencies = { lanes: 0, firstContext: n };
      } else
        ji = ji.next = n;
    return r;
  }
  var kn = null;
  function Wf(n) {
    kn === null ? kn = [n] : kn.push(n);
  }
  function Tv(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Wf(r)) : (l.next = c.next, c.next = l), r.interleaved = l, li(n, o);
  }
  function li(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; )
      n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Bi = !1;
  function Xf(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function rn(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function ui(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Pi(n, r, l) {
    var o = n.updateQueue;
    if (o === null)
      return null;
    if (o = o.shared, Pe & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, li(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Wf(o)) : (r.next = c.next, c.next = r), o.interleaved = r, li(n, l);
  }
  function Ys(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, io(n, l);
    }
  }
  function qf(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var h = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = h : d = d.next = h, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else
        c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function Yi(n, r, l, o) {
    var c = n.updateQueue;
    Bi = !1;
    var d = c.firstBaseUpdate, h = c.lastBaseUpdate, g = c.shared.pending;
    if (g !== null) {
      c.shared.pending = null;
      var C = g, L = C.next;
      C.next = null, h === null ? d = L : h.next = L, h = C;
      var F = n.alternate;
      F !== null && (F = F.updateQueue, g = F.lastBaseUpdate, g !== h && (g === null ? F.firstBaseUpdate = L : g.next = L, F.lastBaseUpdate = C));
    }
    if (d !== null) {
      var V = c.baseState;
      h = 0, F = L = C = null, g = d;
      do {
        var H = g.lane, q = g.eventTime;
        if ((o & H) === H) {
          F !== null && (F = F.next = {
            eventTime: q,
            lane: 0,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null
          });
          e: {
            var re = n, ue = g;
            switch (H = r, q = l, ue.tag) {
              case 1:
                if (re = ue.payload, typeof re == "function") {
                  V = re.call(q, V, H);
                  break e;
                }
                V = re;
                break e;
              case 3:
                re.flags = re.flags & -65537 | 128;
              case 0:
                if (re = ue.payload, H = typeof re == "function" ? re.call(q, V, H) : re, H == null)
                  break e;
                V = Z({}, V, H);
                break e;
              case 2:
                Bi = !0;
            }
          }
          g.callback !== null && g.lane !== 0 && (n.flags |= 64, H = c.effects, H === null ? c.effects = [g] : H.push(g));
        } else
          q = { eventTime: q, lane: H, tag: g.tag, payload: g.payload, callback: g.callback, next: null }, F === null ? (L = F = q, C = V) : F = F.next = q, h |= H;
        if (g = g.next, g === null) {
          if (g = c.shared.pending, g === null)
            break;
          H = g, g = H.next, H.next = null, c.lastBaseUpdate = H, c.shared.pending = null;
        }
      } while (1);
      if (F === null && (C = V), c.baseState = C, c.firstBaseUpdate = L, c.lastBaseUpdate = F, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          h |= c.lane, c = c.next;
        while (c !== r);
      } else
        d === null && (c.shared.lanes = 0);
      fi |= h, n.lanes = h, n.memoizedState = V;
    }
  }
  function Rl(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null)
      for (r = 0; r < n.length; r++) {
        var o = n[r], c = o.callback;
        if (c !== null) {
          if (o.callback = null, o = l, typeof c != "function")
            throw Error(M(191, c));
          c.call(o);
        }
      }
  }
  var Rv = new Y.Component().refs;
  function Kf(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : Z({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var $s = { isMounted: function(n) {
    return (n = n._reactInternals) ? Ne(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = Wn(), c = Kt(n), d = ui(o, c);
    d.payload = r, l != null && (d.callback = l), r = Pi(n, d, c), r !== null && (Xn(r, n, c, o), Ys(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = Wn(), c = Kt(n), d = ui(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Pi(n, d, c), r !== null && (Xn(r, n, c, o), Ys(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Wn(), o = Kt(n), c = ui(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Pi(n, c, o), r !== null && (Xn(r, n, o, l), Ys(r, n, o));
  } };
  function xv(n, r, l, o, c, d, h) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, h) : r.prototype && r.prototype.isPureReactComponent ? !yo(l, o) || !yo(c, d) : !0;
  }
  function wv(n, r, l) {
    var o = !1, c = Ha, d = r.contextType;
    return typeof d == "object" && d !== null ? d = $t(d) : (c = Lt(r) ? vr : we.current, o = r.contextTypes, d = (o = o != null) ? Zr(n, c) : Ha), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = $s, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Dv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && $s.enqueueReplaceState(r, r.state, null);
  }
  function Qs(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = Rv, Xf(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = $t(d) : (d = Lt(r) ? vr : we.current, c.context = Zr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Kf(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && $s.enqueueReplaceState(c, c.state, null), Yi(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function gu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1)
            throw Error(M(309));
          var o = l.stateNode;
        }
        if (!o)
          throw Error(M(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(h) {
          var g = c.refs;
          g === Rv && (g = c.refs = {}), h === null ? delete g[d] : g[d] = h;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string")
        throw Error(M(284));
      if (!l._owner)
        throw Error(M(290, n));
    }
    return n;
  }
  function Is(n, r) {
    throw n = Object.prototype.toString.call(r), Error(M(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function bv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function kv(n) {
    function r(w, R) {
      if (n) {
        var k = w.deletions;
        k === null ? (w.deletions = [R], w.flags |= 16) : k.push(R);
      }
    }
    function l(w, R) {
      if (!n)
        return null;
      for (; R !== null; )
        r(w, R), R = R.sibling;
      return null;
    }
    function o(w, R) {
      for (w = /* @__PURE__ */ new Map(); R !== null; )
        R.key !== null ? w.set(R.key, R) : w.set(R.index, R), R = R.sibling;
      return w;
    }
    function c(w, R) {
      return w = Ki(w, R), w.index = 0, w.sibling = null, w;
    }
    function d(w, R, k) {
      return w.index = k, n ? (k = w.alternate, k !== null ? (k = k.index, k < R ? (w.flags |= 2, R) : k) : (w.flags |= 2, R)) : (w.flags |= 1048576, R);
    }
    function h(w) {
      return n && w.alternate === null && (w.flags |= 2), w;
    }
    function g(w, R, k, P) {
      return R === null || R.tag !== 6 ? (R = Go(k, w.mode, P), R.return = w, R) : (R = c(R, k), R.return = w, R);
    }
    function C(w, R, k, P) {
      var oe = k.type;
      return oe === Ae ? F(w, R, k.props.children, P, k.key) : R !== null && (R.elementType === oe || typeof oe == "object" && oe !== null && oe.$$typeof === Rt && bv(oe) === R.type) ? (P = c(R, k.props), P.ref = gu(w, R, k), P.return = w, P) : (P = xc(k.type, k.key, k.props, null, w.mode, P), P.ref = gu(w, R, k), P.return = w, P);
    }
    function L(w, R, k, P) {
      return R === null || R.tag !== 4 || R.stateNode.containerInfo !== k.containerInfo || R.stateNode.implementation !== k.implementation ? (R = Pl(k, w.mode, P), R.return = w, R) : (R = c(R, k.children || []), R.return = w, R);
    }
    function F(w, R, k, P, oe) {
      return R === null || R.tag !== 7 ? (R = Bl(k, w.mode, P, oe), R.return = w, R) : (R = c(R, k), R.return = w, R);
    }
    function V(w, R, k) {
      if (typeof R == "string" && R !== "" || typeof R == "number")
        return R = Go("" + R, w.mode, k), R.return = w, R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case Ve:
            return k = xc(R.type, R.key, R.props, null, w.mode, k), k.ref = gu(w, null, R), k.return = w, k;
          case Tt:
            return R = Pl(R, w.mode, k), R.return = w, R;
          case Rt:
            var P = R._init;
            return V(w, P(R._payload), k);
        }
        if (qa(R) || ye(R))
          return R = Bl(R, w.mode, k, null), R.return = w, R;
        Is(w, R);
      }
      return null;
    }
    function H(w, R, k, P) {
      var oe = R !== null ? R.key : null;
      if (typeof k == "string" && k !== "" || typeof k == "number")
        return oe !== null ? null : g(w, R, "" + k, P);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Ve:
            return k.key === oe ? C(w, R, k, P) : null;
          case Tt:
            return k.key === oe ? L(w, R, k, P) : null;
          case Rt:
            return oe = k._init, H(
              w,
              R,
              oe(k._payload),
              P
            );
        }
        if (qa(k) || ye(k))
          return oe !== null ? null : F(w, R, k, P, null);
        Is(w, k);
      }
      return null;
    }
    function q(w, R, k, P, oe) {
      if (typeof P == "string" && P !== "" || typeof P == "number")
        return w = w.get(k) || null, g(R, w, "" + P, oe);
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case Ve:
            return w = w.get(P.key === null ? k : P.key) || null, C(R, w, P, oe);
          case Tt:
            return w = w.get(P.key === null ? k : P.key) || null, L(R, w, P, oe);
          case Rt:
            var ae = P._init;
            return q(w, R, k, ae(P._payload), oe);
        }
        if (qa(P) || ye(P))
          return w = w.get(k) || null, F(R, w, P, oe, null);
        Is(R, P);
      }
      return null;
    }
    function re(w, R, k, P) {
      for (var oe = null, ae = null, pe = R, De = R = 0, Cn = null; pe !== null && De < k.length; De++) {
        pe.index > De ? (Cn = pe, pe = null) : Cn = pe.sibling;
        var Xe = H(w, pe, k[De], P);
        if (Xe === null) {
          pe === null && (pe = Cn);
          break;
        }
        n && pe && Xe.alternate === null && r(w, pe), R = d(Xe, R, De), ae === null ? oe = Xe : ae.sibling = Xe, ae = Xe, pe = Cn;
      }
      if (De === k.length)
        return l(w, pe), wt && zr(w, De), oe;
      if (pe === null) {
        for (; De < k.length; De++)
          pe = V(w, k[De], P), pe !== null && (R = d(pe, R, De), ae === null ? oe = pe : ae.sibling = pe, ae = pe);
        return wt && zr(w, De), oe;
      }
      for (pe = o(w, pe); De < k.length; De++)
        Cn = q(pe, w, De, k[De], P), Cn !== null && (n && Cn.alternate !== null && pe.delete(Cn.key === null ? De : Cn.key), R = d(Cn, R, De), ae === null ? oe = Cn : ae.sibling = Cn, ae = Cn);
      return n && pe.forEach(function(Zi) {
        return r(w, Zi);
      }), wt && zr(w, De), oe;
    }
    function ue(w, R, k, P) {
      var oe = ye(k);
      if (typeof oe != "function")
        throw Error(M(150));
      if (k = oe.call(k), k == null)
        throw Error(M(151));
      for (var ae = oe = null, pe = R, De = R = 0, Cn = null, Xe = k.next(); pe !== null && !Xe.done; De++, Xe = k.next()) {
        pe.index > De ? (Cn = pe, pe = null) : Cn = pe.sibling;
        var Zi = H(w, pe, Xe.value, P);
        if (Zi === null) {
          pe === null && (pe = Cn);
          break;
        }
        n && pe && Zi.alternate === null && r(w, pe), R = d(Zi, R, De), ae === null ? oe = Zi : ae.sibling = Zi, ae = Zi, pe = Cn;
      }
      if (Xe.done)
        return l(
          w,
          pe
        ), wt && zr(w, De), oe;
      if (pe === null) {
        for (; !Xe.done; De++, Xe = k.next())
          Xe = V(w, Xe.value, P), Xe !== null && (R = d(Xe, R, De), ae === null ? oe = Xe : ae.sibling = Xe, ae = Xe);
        return wt && zr(w, De), oe;
      }
      for (pe = o(w, pe); !Xe.done; De++, Xe = k.next())
        Xe = q(pe, w, De, Xe.value, P), Xe !== null && (n && Xe.alternate !== null && pe.delete(Xe.key === null ? De : Xe.key), R = d(Xe, R, De), ae === null ? oe = Xe : ae.sibling = Xe, ae = Xe);
      return n && pe.forEach(function(gy) {
        return r(w, gy);
      }), wt && zr(w, De), oe;
    }
    function Qt(w, R, k, P) {
      if (typeof k == "object" && k !== null && k.type === Ae && k.key === null && (k = k.props.children), typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case Ve:
            e: {
              for (var oe = k.key, ae = R; ae !== null; ) {
                if (ae.key === oe) {
                  if (oe = k.type, oe === Ae) {
                    if (ae.tag === 7) {
                      l(w, ae.sibling), R = c(ae, k.props.children), R.return = w, w = R;
                      break e;
                    }
                  } else if (ae.elementType === oe || typeof oe == "object" && oe !== null && oe.$$typeof === Rt && bv(oe) === ae.type) {
                    l(w, ae.sibling), R = c(ae, k.props), R.ref = gu(w, ae, k), R.return = w, w = R;
                    break e;
                  }
                  l(w, ae);
                  break;
                } else
                  r(w, ae);
                ae = ae.sibling;
              }
              k.type === Ae ? (R = Bl(k.props.children, w.mode, P, k.key), R.return = w, w = R) : (P = xc(k.type, k.key, k.props, null, w.mode, P), P.ref = gu(w, R, k), P.return = w, w = P);
            }
            return h(w);
          case Tt:
            e: {
              for (ae = k.key; R !== null; ) {
                if (R.key === ae)
                  if (R.tag === 4 && R.stateNode.containerInfo === k.containerInfo && R.stateNode.implementation === k.implementation) {
                    l(w, R.sibling), R = c(R, k.children || []), R.return = w, w = R;
                    break e;
                  } else {
                    l(w, R);
                    break;
                  }
                else
                  r(w, R);
                R = R.sibling;
              }
              R = Pl(k, w.mode, P), R.return = w, w = R;
            }
            return h(w);
          case Rt:
            return ae = k._init, Qt(w, R, ae(k._payload), P);
        }
        if (qa(k))
          return re(w, R, k, P);
        if (ye(k))
          return ue(w, R, k, P);
        Is(w, k);
      }
      return typeof k == "string" && k !== "" || typeof k == "number" ? (k = "" + k, R !== null && R.tag === 6 ? (l(w, R.sibling), R = c(R, k), R.return = w, w = R) : (l(w, R), R = Go(k, w.mode, P), R.return = w, w = R), h(w)) : l(w, R);
    }
    return Qt;
  }
  var Su = kv(!0), _v = kv(!1), _o = {}, Da = Le(_o), Oo = Le(_o), Eu = Le(_o);
  function xl(n) {
    if (n === _o)
      throw Error(M(174));
    return n;
  }
  function Zf(n, r) {
    switch (it(Eu, r), it(Oo, n), it(Da, _o), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Gt(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Gt(r, n);
    }
    at(Da), it(Da, r);
  }
  function $i() {
    at(Da), at(Oo), at(Eu);
  }
  function Se(n) {
    xl(Eu.current);
    var r = xl(Da.current), l = Gt(r, n.type);
    r !== l && (it(Oo, n), it(Da, l));
  }
  function Fe(n) {
    Oo.current === n && (at(Da), at(Oo));
  }
  var Ce = Le(0);
  function Ut(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!"))
          return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128)
          return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n)
        break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n)
          return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var na = [];
  function Gs() {
    for (var n = 0; n < na.length; n++)
      na[n]._workInProgressVersionPrimary = null;
    na.length = 0;
  }
  var Ws = ht.ReactCurrentDispatcher, Jf = ht.ReactCurrentBatchConfig, wl = 0, Dt = null, U = null, Qe = null, Te = !1, ja = !1, Hr = 0, Dl = 0;
  function bt() {
    throw Error(M(321));
  }
  function bl(n, r) {
    if (r === null)
      return !1;
    for (var l = 0; l < r.length && l < n.length; l++)
      if (!qr(n[l], r[l]))
        return !1;
    return !0;
  }
  function Qi(n, r, l, o, c, d) {
    if (wl = d, Dt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Ws.current = n === null || n.memoizedState === null ? ey : ty, n = l(o, c), ja) {
      d = 0;
      do {
        if (ja = !1, Hr = 0, 25 <= d)
          throw Error(M(301));
        d += 1, Qe = U = null, r.updateQueue = null, Ws.current = td, n = l(o, c);
      } while (ja);
    }
    if (Ws.current = cc, r = U !== null && U.next !== null, wl = 0, Qe = U = Dt = null, Te = !1, r)
      throw Error(M(300));
    return n;
  }
  function kl() {
    var n = Hr !== 0;
    return Hr = 0, n;
  }
  function ra() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Qe === null ? Dt.memoizedState = Qe = n : Qe = Qe.next = n, Qe;
  }
  function Sr() {
    if (U === null) {
      var n = Dt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else
      n = U.next;
    var r = Qe === null ? Dt.memoizedState : Qe.next;
    if (r !== null)
      Qe = r, U = n;
    else {
      if (n === null)
        throw Error(M(310));
      U = n, n = { memoizedState: U.memoizedState, baseState: U.baseState, baseQueue: U.baseQueue, queue: U.queue, next: null }, Qe === null ? Dt.memoizedState = Qe = n : Qe = Qe.next = n;
    }
    return Qe;
  }
  function _l(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Lo(n) {
    var r = Sr(), l = r.queue;
    if (l === null)
      throw Error(M(311));
    l.lastRenderedReducer = n;
    var o = U, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var h = c.next;
        c.next = d.next, d.next = h;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var g = h = null, C = null, L = d;
      do {
        var F = L.lane;
        if ((wl & F) === F)
          C !== null && (C = C.next = { lane: 0, action: L.action, hasEagerState: L.hasEagerState, eagerState: L.eagerState, next: null }), o = L.hasEagerState ? L.eagerState : n(o, L.action);
        else {
          var V = {
            lane: F,
            action: L.action,
            hasEagerState: L.hasEagerState,
            eagerState: L.eagerState,
            next: null
          };
          C === null ? (g = C = V, h = o) : C = C.next = V, Dt.lanes |= F, fi |= F;
        }
        L = L.next;
      } while (L !== null && L !== d);
      C === null ? h = o : C.next = g, qr(o, r.memoizedState) || (qt = !0), r.memoizedState = o, r.baseState = h, r.baseQueue = C, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Dt.lanes |= d, fi |= d, c = c.next;
      while (c !== n);
    } else
      c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Mo(n) {
    var r = Sr(), l = r.queue;
    if (l === null)
      throw Error(M(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var h = c = c.next;
      do
        d = n(d, h.action), h = h.next;
      while (h !== c);
      qr(d, r.memoizedState) || (qt = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Xs() {
  }
  function qs(n, r) {
    var l = Dt, o = Sr(), c = r(), d = !qr(o.memoizedState, c);
    if (d && (o.memoizedState = c, qt = !0), o = o.queue, No(Js.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Qe !== null && Qe.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ol(9, Zs.bind(null, l, o, c, r), void 0, null), At === null)
        throw Error(M(349));
      wl & 30 || Ks(l, r, c);
    }
    return c;
  }
  function Ks(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Dt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Dt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Zs(n, r, l, o) {
    r.value = l, r.getSnapshot = o, ec(r) && tc(n);
  }
  function Js(n, r, l) {
    return l(function() {
      ec(r) && tc(n);
    });
  }
  function ec(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !qr(n, l);
    } catch {
      return !0;
    }
  }
  function tc(n) {
    var r = li(n, 1);
    r !== null && Xn(r, n, 1, -1);
  }
  function nc(n) {
    var r = ra();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: _l, lastRenderedState: n }, r.queue = n, n = n.dispatch = sc.bind(null, Dt, n), [r.memoizedState, n];
  }
  function Ol(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Dt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Dt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function rc() {
    return Sr().memoizedState;
  }
  function Ll(n, r, l, o) {
    var c = ra();
    Dt.flags |= n, c.memoizedState = Ol(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function oi(n, r, l, o) {
    var c = Sr();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (U !== null) {
      var h = U.memoizedState;
      if (d = h.destroy, o !== null && bl(o, h.deps)) {
        c.memoizedState = Ol(r, l, d, o);
        return;
      }
    }
    Dt.flags |= n, c.memoizedState = Ol(1 | r, l, d, o);
  }
  function ac(n, r) {
    return Ll(8390656, 8, n, r);
  }
  function No(n, r) {
    return oi(2048, 8, n, r);
  }
  function ic(n, r) {
    return oi(4, 2, n, r);
  }
  function lc(n, r) {
    return oi(4, 4, n, r);
  }
  function ed(n, r) {
    if (typeof r == "function")
      return n = n(), r(n), function() {
        r(null);
      };
    if (r != null)
      return n = n(), r.current = n, function() {
        r.current = null;
      };
  }
  function Cu(n, r, l) {
    return l = l != null ? l.concat([n]) : null, oi(4, 4, ed.bind(null, r, n), l);
  }
  function uc() {
  }
  function Tu(n, r) {
    var l = Sr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && bl(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Ii(n, r) {
    var l = Sr();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && bl(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Er(n, r, l) {
    return wl & 21 ? (qr(l, r) || (l = ys(), Dt.lanes |= l, fi |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, qt = !0), n.memoizedState = l);
  }
  function Jm(n, r) {
    var l = st;
    st = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Jf.transition;
    Jf.transition = {};
    try {
      n(!1), r();
    } finally {
      st = l, Jf.transition = o;
    }
  }
  function St() {
    return Sr().memoizedState;
  }
  function oc(n, r, l) {
    var o = Kt(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Ru(n))
      zo(r, l);
    else if (l = Tv(n, r, l, o), l !== null) {
      var c = Wn();
      Xn(l, n, o, c), Ov(l, r, o);
    }
  }
  function sc(n, r, l) {
    var o = Kt(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Ru(n))
      zo(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null))
        try {
          var h = r.lastRenderedState, g = d(h, l);
          if (c.hasEagerState = !0, c.eagerState = g, qr(g, h)) {
            var C = r.interleaved;
            C === null ? (c.next = c, Wf(r)) : (c.next = C.next, C.next = c), r.interleaved = c;
            return;
          }
        } catch {
        } finally {
        }
      l = Tv(n, r, c, o), l !== null && (c = Wn(), Xn(l, n, o, c), Ov(l, r, o));
    }
  }
  function Ru(n) {
    var r = n.alternate;
    return n === Dt || r !== null && r === Dt;
  }
  function zo(n, r) {
    ja = Te = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Ov(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, io(n, l);
    }
  }
  var cc = { readContext: $t, useCallback: bt, useContext: bt, useEffect: bt, useImperativeHandle: bt, useInsertionEffect: bt, useLayoutEffect: bt, useMemo: bt, useReducer: bt, useRef: bt, useState: bt, useDebugValue: bt, useDeferredValue: bt, useTransition: bt, useMutableSource: bt, useSyncExternalStore: bt, useId: bt, unstable_isNewReconciler: !1 }, ey = { readContext: $t, useCallback: function(n, r) {
    return ra().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: $t, useEffect: ac, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Ll(
      4194308,
      4,
      ed.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Ll(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Ll(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = ra();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = ra();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = oc.bind(null, Dt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = ra();
    return n = { current: n }, r.memoizedState = n;
  }, useState: nc, useDebugValue: uc, useDeferredValue: function(n) {
    return ra().memoizedState = n;
  }, useTransition: function() {
    var n = nc(!1), r = n[0];
    return n = Jm.bind(null, n[1]), ra().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Dt, c = ra();
    if (wt) {
      if (l === void 0)
        throw Error(M(407));
      l = l();
    } else {
      if (l = r(), At === null)
        throw Error(M(349));
      wl & 30 || Ks(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, ac(Js.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Ol(9, Zs.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = ra(), r = At.identifierPrefix;
    if (wt) {
      var l = ii, o = bn;
      l = (o & ~(1 << 32 - Gr(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Hr++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else
      l = Dl++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, ty = {
    readContext: $t,
    useCallback: Tu,
    useContext: $t,
    useEffect: No,
    useImperativeHandle: Cu,
    useInsertionEffect: ic,
    useLayoutEffect: lc,
    useMemo: Ii,
    useReducer: Lo,
    useRef: rc,
    useState: function() {
      return Lo(_l);
    },
    useDebugValue: uc,
    useDeferredValue: function(n) {
      var r = Sr();
      return Er(r, U.memoizedState, n);
    },
    useTransition: function() {
      var n = Lo(_l)[0], r = Sr().memoizedState;
      return [n, r];
    },
    useMutableSource: Xs,
    useSyncExternalStore: qs,
    useId: St,
    unstable_isNewReconciler: !1
  }, td = { readContext: $t, useCallback: Tu, useContext: $t, useEffect: No, useImperativeHandle: Cu, useInsertionEffect: ic, useLayoutEffect: lc, useMemo: Ii, useReducer: Mo, useRef: rc, useState: function() {
    return Mo(_l);
  }, useDebugValue: uc, useDeferredValue: function(n) {
    var r = Sr();
    return U === null ? r.memoizedState = n : Er(r, U.memoizedState, n);
  }, useTransition: function() {
    var n = Mo(_l)[0], r = Sr().memoizedState;
    return [n, r];
  }, useMutableSource: Xs, useSyncExternalStore: qs, useId: St, unstable_isNewReconciler: !1 };
  function xu(n, r) {
    try {
      var l = "", o = r;
      do
        l += La(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Uo(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function fc(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var ny = typeof WeakMap == "function" ? WeakMap : Map;
  function Lv(n, r, l) {
    l = ui(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      gc || (gc = !0, Al = o), fc(n, r);
    }, l;
  }
  function Ao(n, r, l) {
    l = ui(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        fc(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      fc(n, r), typeof o != "function" && (Pa === null ? Pa = /* @__PURE__ */ new Set([this]) : Pa.add(this));
      var h = r.stack;
      this.componentDidCatch(r.value, { componentStack: h !== null ? h : "" });
    }), l;
  }
  function Mv(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new ny();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else
      c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = sy.bind(null, n, r, l), r.then(n, n));
  }
  function nd(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r)
        return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function rd(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ui(-1, 1), r.tag = 2, Pi(l, r, 1))), l.lanes |= 1), n);
  }
  var ry = ht.ReactCurrentOwner, qt = !1;
  function an(n, r, l, o) {
    r.child = n === null ? _v(r, null, l, o) : Su(r, n.child, l, o);
  }
  function Gi(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return Q(r, c), o = Qi(n, r, l, o, d, c), l = kl(), n !== null && !qt ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, _n(n, r, c)) : (wt && l && Hs(r), r.flags |= 1, an(n, r, o, c), r.child);
  }
  function dc(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Td(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, Cr(n, r, d, o, c)) : (n = xc(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var h = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : yo, l(h, o) && n.ref === r.ref)
        return _n(n, r, c);
    }
    return r.flags |= 1, n = Ki(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Cr(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (yo(d, o) && n.ref === r.ref)
        if (qt = !1, r.pendingProps = o = d, (n.lanes & c) !== 0)
          n.flags & 131072 && (qt = !0);
        else
          return r.lanes = n.lanes, _n(n, r, c);
    }
    return wu(n, r, l, o, c);
  }
  function Ml(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden")
      if (!(r.mode & 1))
        r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, it(Lu, Fr), Fr |= l;
      else {
        if (!(l & 1073741824))
          return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, it(Lu, Fr), Fr |= n, null;
        r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, it(Lu, Fr), Fr |= o;
      }
    else
      d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, it(Lu, Fr), Fr |= o;
    return an(n, r, c, l), r.child;
  }
  function Me(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function wu(n, r, l, o, c) {
    var d = Lt(l) ? vr : we.current;
    return d = Zr(r, d), Q(r, c), l = Qi(n, r, l, o, d, c), o = kl(), n !== null && !qt ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, _n(n, r, c)) : (wt && o && Hs(r), r.flags |= 1, an(n, r, l, c), r.child);
  }
  function ad(n, r, l, o, c) {
    if (Lt(l)) {
      var d = !0;
      As(r);
    } else
      d = !1;
    if (Q(r, c), r.stateNode === null)
      Qn(n, r), wv(r, l, o), Qs(r, l, o, c), o = !0;
    else if (n === null) {
      var h = r.stateNode, g = r.memoizedProps;
      h.props = g;
      var C = h.context, L = l.contextType;
      typeof L == "object" && L !== null ? L = $t(L) : (L = Lt(l) ? vr : we.current, L = Zr(r, L));
      var F = l.getDerivedStateFromProps, V = typeof F == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      V || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (g !== o || C !== L) && Dv(r, h, o, L), Bi = !1;
      var H = r.memoizedState;
      h.state = H, Yi(r, o, h, c), C = r.memoizedState, g !== o || H !== C || Vt.current || Bi ? (typeof F == "function" && (Kf(r, l, F, o), C = r.memoizedState), (g = Bi || xv(r, l, g, o, H, C, L)) ? (V || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = C), h.props = o, h.state = C, h.context = L, o = g) : (typeof h.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      h = r.stateNode, rn(n, r), g = r.memoizedProps, L = r.type === r.elementType ? g : Ar(r.type, g), h.props = L, V = r.pendingProps, H = h.context, C = l.contextType, typeof C == "object" && C !== null ? C = $t(C) : (C = Lt(l) ? vr : we.current, C = Zr(r, C));
      var q = l.getDerivedStateFromProps;
      (F = typeof q == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (g !== V || H !== C) && Dv(r, h, o, C), Bi = !1, H = r.memoizedState, h.state = H, Yi(r, o, h, c);
      var re = r.memoizedState;
      g !== V || H !== re || Vt.current || Bi ? (typeof q == "function" && (Kf(r, l, q, o), re = r.memoizedState), (L = Bi || xv(r, l, L, o, H, re, C) || !1) ? (F || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, re, C), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, re, C)), typeof h.componentDidUpdate == "function" && (r.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || g === n.memoizedProps && H === n.memoizedState || (r.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || g === n.memoizedProps && H === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = re), h.props = o, h.state = re, h.context = C, o = L) : (typeof h.componentDidUpdate != "function" || g === n.memoizedProps && H === n.memoizedState || (r.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || g === n.memoizedProps && H === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Nv(n, r, l, o, d, c);
  }
  function Nv(n, r, l, o, c, d) {
    Me(n, r);
    var h = (r.flags & 128) !== 0;
    if (!o && !h)
      return c && gv(r, l, !1), _n(n, r, d);
    o = r.stateNode, ry.current = r;
    var g = h && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && h ? (r.child = Su(r, n.child, null, d), r.child = Su(r, null, g, d)) : an(n, r, g, d), r.memoizedState = o.state, c && gv(r, l, !0), r.child;
  }
  function zv(n) {
    var r = n.stateNode;
    r.pendingContext ? Hi(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Hi(n, r.context, !1), Zf(n, r.containerInfo);
  }
  function pc(n, r, l, o, c) {
    return zt(), Qf(c), r.flags |= 256, an(n, r, l, o), r.child;
  }
  var Nl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function id(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function ld(n, r, l) {
    var o = r.pendingProps, c = Ce.current, d = !1, h = (r.flags & 128) !== 0, g;
    if ((g = h) || (g = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), g ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), it(Ce, c & 1), n === null)
      return js(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (h = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, h = { mode: "hidden", children: h }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = h) : d = Io(h, o, 0, null), n = Bl(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = id(l), r.memoizedState = Nl, n) : ud(r, h));
    if (c = n.memoizedState, c !== null && (g = c.dehydrated, g !== null))
      return ay(n, r, h, o, g, c, l);
    if (d) {
      d = o.fallback, h = r.mode, c = n.child, g = c.sibling;
      var C = { mode: "hidden", children: o.children };
      return !(h & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = C, r.deletions = null) : (o = Ki(c, C), o.subtreeFlags = c.subtreeFlags & 14680064), g !== null ? d = Ki(g, d) : (d = Bl(d, h, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, h = n.child.memoizedState, h = h === null ? id(l) : { baseLanes: h.baseLanes | l, cachePool: null, transitions: h.transitions }, d.memoizedState = h, d.childLanes = n.childLanes & ~l, r.memoizedState = Nl, o;
    }
    return d = n.child, n = d.sibling, o = Ki(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function ud(n, r) {
    return r = Io({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Du(n, r, l, o) {
    return o !== null && Qf(o), Su(r, n.child, null, l), n = ud(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function ay(n, r, l, o, c, d, h) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Uo(Error(M(422))), Du(n, r, h, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Io({ mode: "visible", children: o.children }, c, 0, null), d = Bl(d, c, h, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && Su(r, n.child, null, h), r.child.memoizedState = id(h), r.memoizedState = Nl, d);
    if (!(r.mode & 1))
      return Du(n, r, h, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o)
        var g = o.dgst;
      return o = g, d = Error(M(419)), o = Uo(d, o, void 0), Du(n, r, h, o);
    }
    if (g = (h & n.childLanes) !== 0, qt || g) {
      if (o = At, o !== null) {
        switch (h & -h) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
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
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | h) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, li(n, c), Xn(o, n, c, -1));
      }
      return Sd(), o = Uo(Error(M(421))), Du(n, r, h, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = cy.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, gr = wa(c.nextSibling), Ur = r, wt = !0, ta = null, n !== null && (yr[$n++] = bn, yr[$n++] = ii, yr[$n++] = ea, bn = n.id, ii = n.overflow, ea = r), r = ud(r, o.children), r.flags |= 4096, r);
  }
  function od(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), gn(n.return, r, l);
  }
  function vc(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function sd(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (an(n, r, o.children, l), o = Ce.current, o & 2)
      o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128)
        e:
          for (n = r.child; n !== null; ) {
            if (n.tag === 13)
              n.memoizedState !== null && od(n, l, r);
            else if (n.tag === 19)
              od(n, l, r);
            else if (n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === r)
              break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === r)
                break e;
              n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
          }
      o &= 1;
    }
    if (it(Ce, o), !(r.mode & 1))
      r.memoizedState = null;
    else
      switch (c) {
        case "forwards":
          for (l = r.child, c = null; l !== null; )
            n = l.alternate, n !== null && Ut(n) === null && (c = l), l = l.sibling;
          l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), vc(r, !1, c, l, d);
          break;
        case "backwards":
          for (l = null, c = r.child, r.child = null; c !== null; ) {
            if (n = c.alternate, n !== null && Ut(n) === null) {
              r.child = c;
              break;
            }
            n = c.sibling, c.sibling = l, l = c, c = n;
          }
          vc(r, !0, l, null, d);
          break;
        case "together":
          vc(r, !1, null, null, void 0);
          break;
        default:
          r.memoizedState = null;
      }
    return r.child;
  }
  function Qn(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function _n(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), fi |= r.lanes, !(l & r.childLanes))
      return null;
    if (n !== null && r.child !== n.child)
      throw Error(M(153));
    if (r.child !== null) {
      for (n = r.child, l = Ki(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; )
        n = n.sibling, l = l.sibling = Ki(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function si(n, r, l) {
    switch (r.tag) {
      case 3:
        zv(r), zt();
        break;
      case 5:
        Se(r);
        break;
      case 1:
        Lt(r.type) && As(r);
        break;
      case 4:
        Zf(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        it(Fa, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (it(Ce, Ce.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? ld(n, r, l) : (it(Ce, Ce.current & 1), n = _n(n, r, l), n !== null ? n.sibling : null);
        it(Ce, Ce.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o)
            return sd(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), it(Ce, Ce.current), o)
          break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Ml(n, r, l);
    }
    return _n(n, r, l);
  }
  var Ho, zl, aa, ln;
  Ho = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6)
        n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r)
        break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r)
          return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, zl = function() {
  }, aa = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, xl(Da.current);
      var d = null;
      switch (l) {
        case "input":
          c = Vn(n, c), o = Vn(n, o), d = [];
          break;
        case "select":
          c = Z({}, c, { value: void 0 }), o = Z({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = ma(n, c), o = ma(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = Us);
      }
      pn(l, o);
      var h;
      l = null;
      for (L in c)
        if (!o.hasOwnProperty(L) && c.hasOwnProperty(L) && c[L] != null)
          if (L === "style") {
            var g = c[L];
            for (h in g)
              g.hasOwnProperty(h) && (l || (l = {}), l[h] = "");
          } else
            L !== "dangerouslySetInnerHTML" && L !== "children" && L !== "suppressContentEditableWarning" && L !== "suppressHydrationWarning" && L !== "autoFocus" && (en.hasOwnProperty(L) ? d || (d = []) : (d = d || []).push(L, null));
      for (L in o) {
        var C = o[L];
        if (g = c != null ? c[L] : void 0, o.hasOwnProperty(L) && C !== g && (C != null || g != null))
          if (L === "style")
            if (g) {
              for (h in g)
                !g.hasOwnProperty(h) || C && C.hasOwnProperty(h) || (l || (l = {}), l[h] = "");
              for (h in C)
                C.hasOwnProperty(h) && g[h] !== C[h] && (l || (l = {}), l[h] = C[h]);
            } else
              l || (d || (d = []), d.push(
                L,
                l
              )), l = C;
          else
            L === "dangerouslySetInnerHTML" ? (C = C ? C.__html : void 0, g = g ? g.__html : void 0, C != null && g !== C && (d = d || []).push(L, C)) : L === "children" ? typeof C != "string" && typeof C != "number" || (d = d || []).push(L, "" + C) : L !== "suppressContentEditableWarning" && L !== "suppressHydrationWarning" && (en.hasOwnProperty(L) ? (C != null && L === "onScroll" && gt("scroll", n), d || g === C || (d = [])) : (d = d || []).push(L, C));
      }
      l && (d = d || []).push("style", l);
      var L = d;
      (r.updateQueue = L) && (r.flags |= 4);
    }
  }, ln = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function Fo(n, r) {
    if (!wt)
      switch (n.tailMode) {
        case "hidden":
          r = n.tail;
          for (var l = null; r !== null; )
            r.alternate !== null && (l = r), r = r.sibling;
          l === null ? n.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = n.tail;
          for (var o = null; l !== null; )
            l.alternate !== null && (o = l), l = l.sibling;
          o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
      }
  }
  function In(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r)
      for (var c = n.child; c !== null; )
        l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else
      for (c = n.child; c !== null; )
        l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function iy(n, r, l) {
    var o = r.pendingProps;
    switch (Yf(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return In(r), null;
      case 1:
        return Lt(r.type) && Jr(), In(r), null;
      case 3:
        return o = r.stateNode, $i(), at(Vt), at(we), Gs(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (Vs(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, ta !== null && (Qo(ta), ta = null))), zl(n, r), In(r), null;
      case 5:
        Fe(r);
        var c = xl(Eu.current);
        if (l = r.type, n !== null && r.stateNode != null)
          aa(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null)
              throw Error(M(166));
            return In(r), null;
          }
          if (n = xl(Da.current), Vs(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Aa] = r, o[Cl] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                gt("cancel", o), gt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                gt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < Co.length; c++)
                  gt(Co[c], o);
                break;
              case "source":
                gt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                gt(
                  "error",
                  o
                ), gt("load", o);
                break;
              case "details":
                gt("toggle", o);
                break;
              case "input":
                Dn(o, d), gt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, gt("invalid", o);
                break;
              case "textarea":
                br(o, d), gt("invalid", o);
            }
            pn(l, d), c = null;
            for (var h in d)
              if (d.hasOwnProperty(h)) {
                var g = d[h];
                h === "children" ? typeof g == "string" ? o.textContent !== g && (d.suppressHydrationWarning !== !0 && zs(o.textContent, g, n), c = ["children", g]) : typeof g == "number" && o.textContent !== "" + g && (d.suppressHydrationWarning !== !0 && zs(
                  o.textContent,
                  g,
                  n
                ), c = ["children", "" + g]) : en.hasOwnProperty(h) && g != null && h === "onScroll" && gt("scroll", o);
              }
            switch (l) {
              case "input":
                fr(o), Ir(o, d, !0);
                break;
              case "textarea":
                fr(o), kr(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = Us);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            h = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = ya(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = h.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = h.createElement(l, { is: o.is }) : (n = h.createElement(l), l === "select" && (h = n, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : n = h.createElementNS(n, l), n[Aa] = r, n[Cl] = o, Ho(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (h = Yt(l, o), l) {
                case "dialog":
                  gt("cancel", n), gt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  gt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < Co.length; c++)
                    gt(Co[c], n);
                  c = o;
                  break;
                case "source":
                  gt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  gt(
                    "error",
                    n
                  ), gt("load", n), c = o;
                  break;
                case "details":
                  gt("toggle", n), c = o;
                  break;
                case "input":
                  Dn(n, o), c = Vn(n, o), gt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = Z({}, o, { value: void 0 }), gt("invalid", n);
                  break;
                case "textarea":
                  br(n, o), c = ma(n, o), gt("invalid", n);
                  break;
                default:
                  c = o;
              }
              pn(l, c), g = c;
              for (d in g)
                if (g.hasOwnProperty(d)) {
                  var C = g[d];
                  d === "style" ? ot(n, C) : d === "dangerouslySetInnerHTML" ? (C = C ? C.__html : void 0, C != null && wi(n, C)) : d === "children" ? typeof C == "string" ? (l !== "textarea" || C !== "") && ga(n, C) : typeof C == "number" && ga(n, "" + C) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (en.hasOwnProperty(d) ? C != null && d === "onScroll" && gt("scroll", n) : C != null && je(n, d, C, h));
                }
              switch (l) {
                case "input":
                  fr(n), Ir(n, o, !1);
                  break;
                case "textarea":
                  fr(n), kr(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + jn(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Na(n, !!o.multiple, d, !1) : o.defaultValue != null && Na(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Us);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return In(r), null;
      case 6:
        if (n && r.stateNode != null)
          ln(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null)
            throw Error(M(166));
          if (l = xl(Eu.current), xl(Da.current), Vs(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Aa] = r, (d = o.nodeValue !== l) && (n = Ur, n !== null))
              switch (n.tag) {
                case 3:
                  zs(o.nodeValue, l, (n.mode & 1) !== 0);
                  break;
                case 5:
                  n.memoizedProps.suppressHydrationWarning !== !0 && zs(o.nodeValue, l, (n.mode & 1) !== 0);
              }
            d && (r.flags |= 4);
          } else
            o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Aa] = r, r.stateNode = o;
        }
        return In(r), null;
      case 13:
        if (at(Ce), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (wt && gr !== null && r.mode & 1 && !(r.flags & 128))
            Cv(), zt(), r.flags |= 98560, d = !1;
          else if (d = Vs(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d)
                throw Error(M(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d)
                throw Error(M(317));
              d[Aa] = r;
            } else
              zt(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            In(r), d = !1;
          } else
            ta !== null && (Qo(ta), ta = null), d = !0;
          if (!d)
            return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || Ce.current & 1 ? on === 0 && (on = 3) : Sd())), r.updateQueue !== null && (r.flags |= 4), In(r), null);
      case 4:
        return $i(), zl(n, r), n === null && hu(r.stateNode.containerInfo), In(r), null;
      case 10:
        return Vi(r.type._context), In(r), null;
      case 17:
        return Lt(r.type) && Jr(), In(r), null;
      case 19:
        if (at(Ce), d = r.memoizedState, d === null)
          return In(r), null;
        if (o = (r.flags & 128) !== 0, h = d.rendering, h === null)
          if (o)
            Fo(d, !1);
          else {
            if (on !== 0 || n !== null && n.flags & 128)
              for (n = r.child; n !== null; ) {
                if (h = Ut(n), h !== null) {
                  for (r.flags |= 128, Fo(d, !1), o = h.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; )
                    d = l, n = o, d.flags &= 14680066, h = d.alternate, h === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = h.childLanes, d.lanes = h.lanes, d.child = h.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = h.memoizedProps, d.memoizedState = h.memoizedState, d.updateQueue = h.updateQueue, d.type = h.type, n = h.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
                  return it(Ce, Ce.current & 1 | 2), r.child;
                }
                n = n.sibling;
              }
            d.tail !== null && Je() > Nu && (r.flags |= 128, o = !0, Fo(d, !1), r.lanes = 4194304);
          }
        else {
          if (!o)
            if (n = Ut(h), n !== null) {
              if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Fo(d, !0), d.tail === null && d.tailMode === "hidden" && !h.alternate && !wt)
                return In(r), null;
            } else
              2 * Je() - d.renderingStartTime > Nu && l !== 1073741824 && (r.flags |= 128, o = !0, Fo(d, !1), r.lanes = 4194304);
          d.isBackwards ? (h.sibling = r.child, r.child = h) : (l = d.last, l !== null ? l.sibling = h : r.child = h, d.last = h);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Je(), r.sibling = null, l = Ce.current, it(Ce, o ? l & 1 | 2 : l & 1), r) : (In(r), null);
      case 22:
      case 23:
        return gd(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? Fr & 1073741824 && (In(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : In(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(M(156, r.tag));
  }
  function cd(n, r) {
    switch (Yf(r), r.tag) {
      case 1:
        return Lt(r.type) && Jr(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return $i(), at(Vt), at(we), Gs(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Fe(r), null;
      case 13:
        if (at(Ce), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null)
            throw Error(M(340));
          zt();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return at(Ce), null;
      case 4:
        return $i(), null;
      case 10:
        return Vi(r.type._context), null;
      case 22:
      case 23:
        return gd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var jo = !1, un = !1, Uv = typeof WeakSet == "function" ? WeakSet : Set, ne = null;
  function bu(n, r) {
    var l = n.ref;
    if (l !== null)
      if (typeof l == "function")
        try {
          l(null);
        } catch (o) {
          Pt(n, r, o);
        }
      else
        l.current = null;
  }
  function Vo(n, r, l) {
    try {
      l();
    } catch (o) {
      Pt(n, r, o);
    }
  }
  var Av = !1;
  function Hv(n, r) {
    if (Uf = vl, n = _s(), ti(n)) {
      if ("selectionStart" in n)
        var l = { start: n.selectionStart, end: n.selectionEnd };
      else
        e: {
          l = (l = n.ownerDocument) && l.defaultView || window;
          var o = l.getSelection && l.getSelection();
          if (o && o.rangeCount !== 0) {
            l = o.anchorNode;
            var c = o.anchorOffset, d = o.focusNode;
            o = o.focusOffset;
            try {
              l.nodeType, d.nodeType;
            } catch {
              l = null;
              break e;
            }
            var h = 0, g = -1, C = -1, L = 0, F = 0, V = n, H = null;
            t:
              for (; ; ) {
                for (var q; V !== l || c !== 0 && V.nodeType !== 3 || (g = h + c), V !== d || o !== 0 && V.nodeType !== 3 || (C = h + o), V.nodeType === 3 && (h += V.nodeValue.length), (q = V.firstChild) !== null; )
                  H = V, V = q;
                for (; ; ) {
                  if (V === n)
                    break t;
                  if (H === l && ++L === c && (g = h), H === d && ++F === o && (C = h), (q = V.nextSibling) !== null)
                    break;
                  V = H, H = V.parentNode;
                }
                V = q;
              }
            l = g === -1 || C === -1 ? null : { start: g, end: C };
          } else
            l = null;
        }
      l = l || { start: 0, end: 0 };
    } else
      l = null;
    for (Sl = { focusedElem: n, selectionRange: l }, vl = !1, ne = r; ne !== null; )
      if (r = ne, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null)
        n.return = r, ne = n;
      else
        for (; ne !== null; ) {
          r = ne;
          try {
            var re = r.alternate;
            if (r.flags & 1024)
              switch (r.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (re !== null) {
                    var ue = re.memoizedProps, Qt = re.memoizedState, w = r.stateNode, R = w.getSnapshotBeforeUpdate(r.elementType === r.type ? ue : Ar(r.type, ue), Qt);
                    w.__reactInternalSnapshotBeforeUpdate = R;
                  }
                  break;
                case 3:
                  var k = r.stateNode.containerInfo;
                  k.nodeType === 1 ? k.textContent = "" : k.nodeType === 9 && k.documentElement && k.removeChild(k.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(M(163));
              }
          } catch (P) {
            Pt(r, r.return, P);
          }
          if (n = r.sibling, n !== null) {
            n.return = r.return, ne = n;
            break;
          }
          ne = r.return;
        }
    return re = Av, Av = !1, re;
  }
  function Bo(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && Vo(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Po(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function fd(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function dd(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, dd(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Aa], delete r[Cl], delete r[Ff], delete r[Zm], delete r[jf])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Fv(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function hc(n) {
    e:
      for (; ; ) {
        for (; n.sibling === null; ) {
          if (n.return === null || Fv(n.return))
            return null;
          n = n.return;
        }
        for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
          if (n.flags & 2 || n.child === null || n.tag === 4)
            continue e;
          n.child.return = n, n = n.child;
        }
        if (!(n.flags & 2))
          return n.stateNode;
      }
  }
  function ku(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6)
      n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Us));
    else if (o !== 4 && (n = n.child, n !== null))
      for (ku(n, r, l), n = n.sibling; n !== null; )
        ku(n, r, l), n = n.sibling;
  }
  function Va(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6)
      n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null))
      for (Va(n, r, l), n = n.sibling; n !== null; )
        Va(n, r, l), n = n.sibling;
  }
  var Mt = null, Sn = !1;
  function ia(n, r, l) {
    for (l = l.child; l !== null; )
      _u(n, r, l), l = l.sibling;
  }
  function _u(n, r, l) {
    if (Ea && typeof Ea.onCommitFiberUnmount == "function")
      try {
        Ea.onCommitFiberUnmount(ao, l);
      } catch {
      }
    switch (l.tag) {
      case 5:
        un || bu(l, r);
      case 6:
        var o = Mt, c = Sn;
        Mt = null, ia(n, r, l), Mt = o, Sn = c, Mt !== null && (Sn ? (n = Mt, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : Mt.removeChild(l.stateNode));
        break;
      case 18:
        Mt !== null && (Sn ? (n = Mt, l = l.stateNode, n.nodeType === 8 ? zi(n.parentNode, l) : n.nodeType === 1 && zi(n, l), so(n)) : zi(Mt, l.stateNode));
        break;
      case 4:
        o = Mt, c = Sn, Mt = l.stateNode.containerInfo, Sn = !0, ia(n, r, l), Mt = o, Sn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!un && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, h = d.destroy;
            d = d.tag, h !== void 0 && (d & 2 || d & 4) && Vo(l, r, h), c = c.next;
          } while (c !== o);
        }
        ia(n, r, l);
        break;
      case 1:
        if (!un && (bu(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function"))
          try {
            o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
          } catch (g) {
            Pt(l, r, g);
          }
        ia(n, r, l);
        break;
      case 21:
        ia(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (un = (o = un) || l.memoizedState !== null, ia(n, r, l), un = o) : ia(n, r, l);
        break;
      default:
        ia(n, r, l);
    }
  }
  function ci(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new Uv()), r.forEach(function(o) {
        var c = fy.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ba(n, r) {
    var l = r.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var c = l[o];
        try {
          var d = n, h = r, g = h;
          e:
            for (; g !== null; ) {
              switch (g.tag) {
                case 5:
                  Mt = g.stateNode, Sn = !1;
                  break e;
                case 3:
                  Mt = g.stateNode.containerInfo, Sn = !0;
                  break e;
                case 4:
                  Mt = g.stateNode.containerInfo, Sn = !0;
                  break e;
              }
              g = g.return;
            }
          if (Mt === null)
            throw Error(M(160));
          _u(d, h, c), Mt = null, Sn = !1;
          var C = c.alternate;
          C !== null && (C.return = null), c.return = null;
        } catch (L) {
          Pt(c, r, L);
        }
      }
    if (r.subtreeFlags & 12854)
      for (r = r.child; r !== null; )
        jv(r, n), r = r.sibling;
  }
  function jv(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ba(r, n), Ba(n), o & 4) {
          try {
            Bo(3, n, n.return), Po(3, n);
          } catch (ue) {
            Pt(n, n.return, ue);
          }
          try {
            Bo(5, n, n.return);
          } catch (ue) {
            Pt(n, n.return, ue);
          }
        }
        break;
      case 1:
        ba(r, n), Ba(n), o & 512 && l !== null && bu(l, l.return);
        break;
      case 5:
        if (ba(r, n), Ba(n), o & 512 && l !== null && bu(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            ga(c, "");
          } catch (ue) {
            Pt(n, n.return, ue);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, h = l !== null ? l.memoizedProps : d, g = n.type, C = n.updateQueue;
          if (n.updateQueue = null, C !== null)
            try {
              g === "input" && d.type === "radio" && d.name != null && Bn(c, d), Yt(g, h);
              var L = Yt(g, d);
              for (h = 0; h < C.length; h += 2) {
                var F = C[h], V = C[h + 1];
                F === "style" ? ot(c, V) : F === "dangerouslySetInnerHTML" ? wi(c, V) : F === "children" ? ga(c, V) : je(c, F, V, L);
              }
              switch (g) {
                case "input":
                  Pn(c, d);
                  break;
                case "textarea":
                  za(c, d);
                  break;
                case "select":
                  var H = c._wrapperState.wasMultiple;
                  c._wrapperState.wasMultiple = !!d.multiple;
                  var q = d.value;
                  q != null ? Na(c, !!d.multiple, q, !1) : H !== !!d.multiple && (d.defaultValue != null ? Na(
                    c,
                    !!d.multiple,
                    d.defaultValue,
                    !0
                  ) : Na(c, !!d.multiple, d.multiple ? [] : "", !1));
              }
              c[Cl] = d;
            } catch (ue) {
              Pt(n, n.return, ue);
            }
        }
        break;
      case 6:
        if (ba(r, n), Ba(n), o & 4) {
          if (n.stateNode === null)
            throw Error(M(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (ue) {
            Pt(n, n.return, ue);
          }
        }
        break;
      case 3:
        if (ba(r, n), Ba(n), o & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            so(r.containerInfo);
          } catch (ue) {
            Pt(n, n.return, ue);
          }
        break;
      case 4:
        ba(r, n), Ba(n);
        break;
      case 13:
        ba(r, n), Ba(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (hd = Je())), o & 4 && ci(n);
        break;
      case 22:
        if (F = l !== null && l.memoizedState !== null, n.mode & 1 ? (un = (L = un) || F, ba(r, n), un = L) : ba(r, n), Ba(n), o & 8192) {
          if (L = n.memoizedState !== null, (n.stateNode.isHidden = L) && !F && n.mode & 1)
            for (ne = n, F = n.child; F !== null; ) {
              for (V = ne = F; ne !== null; ) {
                switch (H = ne, q = H.child, H.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Bo(4, H, H.return);
                    break;
                  case 1:
                    bu(H, H.return);
                    var re = H.stateNode;
                    if (typeof re.componentWillUnmount == "function") {
                      o = H, l = H.return;
                      try {
                        r = o, re.props = r.memoizedProps, re.state = r.memoizedState, re.componentWillUnmount();
                      } catch (ue) {
                        Pt(o, l, ue);
                      }
                    }
                    break;
                  case 5:
                    bu(H, H.return);
                    break;
                  case 22:
                    if (H.memoizedState !== null) {
                      pd(V);
                      continue;
                    }
                }
                q !== null ? (q.return = H, ne = q) : pd(V);
              }
              F = F.sibling;
            }
          e:
            for (F = null, V = n; ; ) {
              if (V.tag === 5) {
                if (F === null) {
                  F = V;
                  try {
                    c = V.stateNode, L ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (g = V.stateNode, C = V.memoizedProps.style, h = C != null && C.hasOwnProperty("display") ? C.display : null, g.style.display = He("display", h));
                  } catch (ue) {
                    Pt(n, n.return, ue);
                  }
                }
              } else if (V.tag === 6) {
                if (F === null)
                  try {
                    V.stateNode.nodeValue = L ? "" : V.memoizedProps;
                  } catch (ue) {
                    Pt(n, n.return, ue);
                  }
              } else if ((V.tag !== 22 && V.tag !== 23 || V.memoizedState === null || V === n) && V.child !== null) {
                V.child.return = V, V = V.child;
                continue;
              }
              if (V === n)
                break e;
              for (; V.sibling === null; ) {
                if (V.return === null || V.return === n)
                  break e;
                F === V && (F = null), V = V.return;
              }
              F === V && (F = null), V.sibling.return = V.return, V = V.sibling;
            }
        }
        break;
      case 19:
        ba(r, n), Ba(n), o & 4 && ci(n);
        break;
      case 21:
        break;
      default:
        ba(
          r,
          n
        ), Ba(n);
    }
  }
  function Ba(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Fv(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(M(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (ga(c, ""), o.flags &= -33);
            var d = hc(n);
            Va(n, d, c);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, g = hc(n);
            ku(n, g, h);
            break;
          default:
            throw Error(M(161));
        }
      } catch (C) {
        Pt(n, n.return, C);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function Vv(n, r, l) {
    ne = n, Ou(n);
  }
  function Ou(n, r, l) {
    for (var o = (n.mode & 1) !== 0; ne !== null; ) {
      var c = ne, d = c.child;
      if (c.tag === 22 && o) {
        var h = c.memoizedState !== null || jo;
        if (!h) {
          var g = c.alternate, C = g !== null && g.memoizedState !== null || un;
          g = jo;
          var L = un;
          if (jo = h, (un = C) && !L)
            for (ne = c; ne !== null; )
              h = ne, C = h.child, h.tag === 22 && h.memoizedState !== null ? Pv(c) : C !== null ? (C.return = h, ne = C) : Pv(c);
          for (; d !== null; )
            ne = d, Ou(d), d = d.sibling;
          ne = c, jo = g, un = L;
        }
        Bv(n);
      } else
        c.subtreeFlags & 8772 && d !== null ? (d.return = c, ne = d) : Bv(n);
    }
  }
  function Bv(n) {
    for (; ne !== null; ) {
      var r = ne;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772)
            switch (r.tag) {
              case 0:
              case 11:
              case 15:
                un || Po(5, r);
                break;
              case 1:
                var o = r.stateNode;
                if (r.flags & 4 && !un)
                  if (l === null)
                    o.componentDidMount();
                  else {
                    var c = r.elementType === r.type ? l.memoizedProps : Ar(r.type, l.memoizedProps);
                    o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
                  }
                var d = r.updateQueue;
                d !== null && Rl(r, d, o);
                break;
              case 3:
                var h = r.updateQueue;
                if (h !== null) {
                  if (l = null, r.child !== null)
                    switch (r.child.tag) {
                      case 5:
                        l = r.child.stateNode;
                        break;
                      case 1:
                        l = r.child.stateNode;
                    }
                  Rl(r, h, l);
                }
                break;
              case 5:
                var g = r.stateNode;
                if (l === null && r.flags & 4) {
                  l = g;
                  var C = r.memoizedProps;
                  switch (r.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      C.autoFocus && l.focus();
                      break;
                    case "img":
                      C.src && (l.src = C.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (r.memoizedState === null) {
                  var L = r.alternate;
                  if (L !== null) {
                    var F = L.memoizedState;
                    if (F !== null) {
                      var V = F.dehydrated;
                      V !== null && so(V);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(M(163));
            }
          un || r.flags & 512 && fd(r);
        } catch (H) {
          Pt(r, r.return, H);
        }
      }
      if (r === n) {
        ne = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, ne = l;
        break;
      }
      ne = r.return;
    }
  }
  function pd(n) {
    for (; ne !== null; ) {
      var r = ne;
      if (r === n) {
        ne = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, ne = l;
        break;
      }
      ne = r.return;
    }
  }
  function Pv(n) {
    for (; ne !== null; ) {
      var r = ne;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Po(4, r);
            } catch (C) {
              Pt(r, l, C);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (C) {
                Pt(r, c, C);
              }
            }
            var d = r.return;
            try {
              fd(r);
            } catch (C) {
              Pt(r, d, C);
            }
            break;
          case 5:
            var h = r.return;
            try {
              fd(r);
            } catch (C) {
              Pt(r, h, C);
            }
        }
      } catch (C) {
        Pt(r, r.return, C);
      }
      if (r === n) {
        ne = null;
        break;
      }
      var g = r.sibling;
      if (g !== null) {
        g.return = r.return, ne = g;
        break;
      }
      ne = r.return;
    }
  }
  var mc = Math.ceil, Yo = ht.ReactCurrentDispatcher, vd = ht.ReactCurrentOwner, Gn = ht.ReactCurrentBatchConfig, Pe = 0, At = null, Bt = null, En = 0, Fr = 0, Lu = Le(0), on = 0, $o = null, fi = 0, yc = 0, Mu = 0, Ul = null, er = null, hd = 0, Nu = 1 / 0, di = null, gc = !1, Al = null, Pa = null, Wi = !1, Xi = null, Sc = 0, zu = 0, Ec = null, Hl = -1, Fl = 0;
  function Wn() {
    return Pe & 6 ? Je() : Hl !== -1 ? Hl : Hl = Je();
  }
  function Kt(n) {
    return n.mode & 1 ? Pe & 2 && En !== 0 ? En & -En : Bs.transition !== null ? (Fl === 0 && (Fl = ys()), Fl) : (n = st, n !== 0 || (n = window.event, n = n === void 0 ? 16 : hf(n.type)), n) : 1;
  }
  function Xn(n, r, l, o) {
    if (50 < zu)
      throw zu = 0, Ec = null, Error(M(185));
    pl(n, l, o), (!(Pe & 2) || n !== At) && (n === At && (!(Pe & 2) && (yc |= l), on === 4 && la(n, En)), qn(n, o), l === 1 && Pe === 0 && !(r.mode & 1) && (Nu = Je() + 500, yn && hr()));
  }
  function qn(n, r) {
    var l = n.callbackNode;
    ms(n, r);
    var o = Ca(n, n === At ? En : 0);
    if (o === 0)
      l !== null && Jn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && Jn(l), r === 1)
        n.tag === 0 ? Bf(Yv.bind(null, n)) : Vf(Yv.bind(null, n)), Hf(function() {
          !(Pe & 6) && hr();
        }), l = null;
      else {
        switch (df(o)) {
          case 1:
            l = Ka;
            break;
          case 4:
            l = Be;
            break;
          case 16:
            l = _i;
            break;
          case 536870912:
            l = of;
            break;
          default:
            l = _i;
        }
        l = Cd(l, Uu.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function Uu(n, r) {
    if (Hl = -1, Fl = 0, Pe & 6)
      throw Error(M(327));
    var l = n.callbackNode;
    if (Hu() && n.callbackNode !== l)
      return null;
    var o = Ca(n, n === At ? En : 0);
    if (o === 0)
      return null;
    if (o & 30 || o & n.expiredLanes || r)
      r = Tc(n, o);
    else {
      r = o;
      var c = Pe;
      Pe |= 2;
      var d = Cc();
      (At !== n || En !== r) && (di = null, Nu = Je() + 500, jl(n, r));
      do
        try {
          uy();
          break;
        } catch (g) {
          $v(n, g);
        }
      while (1);
      Gf(), Yo.current = d, Pe = c, Bt !== null ? r = 0 : (At = null, En = 0, r = on);
    }
    if (r !== 0) {
      if (r === 2 && (c = cf(n), c !== 0 && (o = c, r = md(n, c))), r === 1)
        throw l = $o, jl(n, 0), la(n, o), qn(n, Je()), l;
      if (r === 6)
        la(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !yd(c) && (r = Tc(n, o), r === 2 && (d = cf(n), d !== 0 && (o = d, r = md(n, d))), r === 1))
          throw l = $o, jl(n, 0), la(n, o), qn(n, Je()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(M(345));
          case 2:
            Vl(n, er, di);
            break;
          case 3:
            if (la(n, o), (o & 130023424) === o && (r = hd + 500 - Je(), 10 < r)) {
              if (Ca(n, 0) !== 0)
                break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                Wn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = El(Vl.bind(null, n, er, di), r);
              break;
            }
            Vl(n, er, di);
            break;
          case 4:
            if (la(n, o), (o & 4194240) === o)
              break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var h = 31 - Gr(o);
              d = 1 << h, h = r[h], h > c && (c = h), o &= ~d;
            }
            if (o = c, o = Je() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * mc(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = El(Vl.bind(null, n, er, di), o);
              break;
            }
            Vl(n, er, di);
            break;
          case 5:
            Vl(n, er, di);
            break;
          default:
            throw Error(M(329));
        }
      }
    }
    return qn(n, Je()), n.callbackNode === l ? Uu.bind(null, n) : null;
  }
  function md(n, r) {
    var l = Ul;
    return n.current.memoizedState.isDehydrated && (jl(n, r).flags |= 256), n = Tc(n, r), n !== 2 && (r = er, er = l, r !== null && Qo(r)), n;
  }
  function Qo(n) {
    er === null ? er = n : er.push.apply(er, n);
  }
  function yd(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null))
          for (var o = 0; o < l.length; o++) {
            var c = l[o], d = c.getSnapshot;
            c = c.value;
            try {
              if (!qr(d(), c))
                return !1;
            } catch {
              return !1;
            }
          }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null)
        l.return = r, r = l;
      else {
        if (r === n)
          break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n)
            return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function la(n, r) {
    for (r &= ~Mu, r &= ~yc, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Gr(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Yv(n) {
    if (Pe & 6)
      throw Error(M(327));
    Hu();
    var r = Ca(n, 0);
    if (!(r & 1))
      return qn(n, Je()), null;
    var l = Tc(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = cf(n);
      o !== 0 && (r = o, l = md(n, o));
    }
    if (l === 1)
      throw l = $o, jl(n, 0), la(n, r), qn(n, Je()), l;
    if (l === 6)
      throw Error(M(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Vl(n, er, di), qn(n, Je()), null;
  }
  function Au(n, r) {
    var l = Pe;
    Pe |= 1;
    try {
      return n(r);
    } finally {
      Pe = l, Pe === 0 && (Nu = Je() + 500, yn && hr());
    }
  }
  function qi(n) {
    Xi !== null && Xi.tag === 0 && !(Pe & 6) && Hu();
    var r = Pe;
    Pe |= 1;
    var l = Gn.transition, o = st;
    try {
      if (Gn.transition = null, st = 1, n)
        return n();
    } finally {
      st = o, Gn.transition = l, Pe = r, !(Pe & 6) && hr();
    }
  }
  function gd() {
    Fr = Lu.current, at(Lu);
  }
  function jl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, yv(l)), Bt !== null)
      for (l = Bt.return; l !== null; ) {
        var o = l;
        switch (Yf(o), o.tag) {
          case 1:
            o = o.type.childContextTypes, o != null && Jr();
            break;
          case 3:
            $i(), at(Vt), at(we), Gs();
            break;
          case 5:
            Fe(o);
            break;
          case 4:
            $i();
            break;
          case 13:
            at(Ce);
            break;
          case 19:
            at(Ce);
            break;
          case 10:
            Vi(o.type._context);
            break;
          case 22:
          case 23:
            gd();
        }
        l = l.return;
      }
    if (At = n, Bt = n = Ki(n.current, null), En = Fr = r, on = 0, $o = null, Mu = yc = fi = 0, er = Ul = null, kn !== null) {
      for (r = 0; r < kn.length; r++)
        if (l = kn[r], o = l.interleaved, o !== null) {
          l.interleaved = null;
          var c = o.next, d = l.pending;
          if (d !== null) {
            var h = d.next;
            d.next = c, o.next = h;
          }
          l.pending = o;
        }
      kn = null;
    }
    return n;
  }
  function $v(n, r) {
    do {
      var l = Bt;
      try {
        if (Gf(), Ws.current = cc, Te) {
          for (var o = Dt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Te = !1;
        }
        if (wl = 0, Qe = U = Dt = null, ja = !1, Hr = 0, vd.current = null, l === null || l.return === null) {
          on = 1, $o = r, Bt = null;
          break;
        }
        e: {
          var d = n, h = l.return, g = l, C = r;
          if (r = En, g.flags |= 32768, C !== null && typeof C == "object" && typeof C.then == "function") {
            var L = C, F = g, V = F.tag;
            if (!(F.mode & 1) && (V === 0 || V === 11 || V === 15)) {
              var H = F.alternate;
              H ? (F.updateQueue = H.updateQueue, F.memoizedState = H.memoizedState, F.lanes = H.lanes) : (F.updateQueue = null, F.memoizedState = null);
            }
            var q = nd(h);
            if (q !== null) {
              q.flags &= -257, rd(q, h, g, d, r), q.mode & 1 && Mv(d, L, r), r = q, C = L;
              var re = r.updateQueue;
              if (re === null) {
                var ue = /* @__PURE__ */ new Set();
                ue.add(C), r.updateQueue = ue;
              } else
                re.add(C);
              break e;
            } else {
              if (!(r & 1)) {
                Mv(d, L, r), Sd();
                break e;
              }
              C = Error(M(426));
            }
          } else if (wt && g.mode & 1) {
            var Qt = nd(h);
            if (Qt !== null) {
              !(Qt.flags & 65536) && (Qt.flags |= 256), rd(Qt, h, g, d, r), Qf(xu(C, g));
              break e;
            }
          }
          d = C = xu(C, g), on !== 4 && (on = 2), Ul === null ? Ul = [d] : Ul.push(d), d = h;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var w = Lv(d, C, r);
                qf(d, w);
                break e;
              case 1:
                g = C;
                var R = d.type, k = d.stateNode;
                if (!(d.flags & 128) && (typeof R.getDerivedStateFromError == "function" || k !== null && typeof k.componentDidCatch == "function" && (Pa === null || !Pa.has(k)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var P = Ao(d, g, r);
                  qf(d, P);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Ed(l);
      } catch (oe) {
        r = oe, Bt === l && l !== null && (Bt = l = l.return);
        continue;
      }
      break;
    } while (1);
  }
  function Cc() {
    var n = Yo.current;
    return Yo.current = cc, n === null ? cc : n;
  }
  function Sd() {
    (on === 0 || on === 3 || on === 2) && (on = 4), At === null || !(fi & 268435455) && !(yc & 268435455) || la(At, En);
  }
  function Tc(n, r) {
    var l = Pe;
    Pe |= 2;
    var o = Cc();
    (At !== n || En !== r) && (di = null, jl(n, r));
    do
      try {
        ly();
        break;
      } catch (c) {
        $v(n, c);
      }
    while (1);
    if (Gf(), Pe = l, Yo.current = o, Bt !== null)
      throw Error(M(261));
    return At = null, En = 0, on;
  }
  function ly() {
    for (; Bt !== null; )
      Qv(Bt);
  }
  function uy() {
    for (; Bt !== null && !ki(); )
      Qv(Bt);
  }
  function Qv(n) {
    var r = Gv(n.alternate, n, Fr);
    n.memoizedProps = n.pendingProps, r === null ? Ed(n) : Bt = r, vd.current = null;
  }
  function Ed(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = cd(l, r), l !== null) {
          l.flags &= 32767, Bt = l;
          return;
        }
        if (n !== null)
          n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          on = 6, Bt = null;
          return;
        }
      } else if (l = iy(l, r, Fr), l !== null) {
        Bt = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Bt = r;
        return;
      }
      Bt = r = n;
    } while (r !== null);
    on === 0 && (on = 5);
  }
  function Vl(n, r, l) {
    var o = st, c = Gn.transition;
    try {
      Gn.transition = null, st = 1, oy(n, r, l, o);
    } finally {
      Gn.transition = c, st = o;
    }
    return null;
  }
  function oy(n, r, l, o) {
    do
      Hu();
    while (Xi !== null);
    if (Pe & 6)
      throw Error(M(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null)
      return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current)
      throw Error(M(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (zm(n, d), n === At && (Bt = At = null, En = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Wi || (Wi = !0, Cd(_i, function() {
      return Hu(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = Gn.transition, Gn.transition = null;
      var h = st;
      st = 1;
      var g = Pe;
      Pe |= 4, vd.current = null, Hv(n, l), jv(l, n), Os(Sl), vl = !!Uf, Sl = Uf = null, n.current = l, Vv(l), vs(), Pe = g, st = h, Gn.transition = d;
    } else
      n.current = l;
    if (Wi && (Wi = !1, Xi = n, Sc = c), d = n.pendingLanes, d === 0 && (Pa = null), Lp(l.stateNode), qn(n, Je()), r !== null)
      for (o = n.onRecoverableError, l = 0; l < r.length; l++)
        c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (gc)
      throw gc = !1, n = Al, Al = null, n;
    return Sc & 1 && n.tag !== 0 && Hu(), d = n.pendingLanes, d & 1 ? n === Ec ? zu++ : (zu = 0, Ec = n) : zu = 0, hr(), null;
  }
  function Hu() {
    if (Xi !== null) {
      var n = df(Sc), r = Gn.transition, l = st;
      try {
        if (Gn.transition = null, st = 16 > n ? 16 : n, Xi === null)
          var o = !1;
        else {
          if (n = Xi, Xi = null, Sc = 0, Pe & 6)
            throw Error(M(331));
          var c = Pe;
          for (Pe |= 4, ne = n.current; ne !== null; ) {
            var d = ne, h = d.child;
            if (ne.flags & 16) {
              var g = d.deletions;
              if (g !== null) {
                for (var C = 0; C < g.length; C++) {
                  var L = g[C];
                  for (ne = L; ne !== null; ) {
                    var F = ne;
                    switch (F.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Bo(8, F, d);
                    }
                    var V = F.child;
                    if (V !== null)
                      V.return = F, ne = V;
                    else
                      for (; ne !== null; ) {
                        F = ne;
                        var H = F.sibling, q = F.return;
                        if (dd(F), F === L) {
                          ne = null;
                          break;
                        }
                        if (H !== null) {
                          H.return = q, ne = H;
                          break;
                        }
                        ne = q;
                      }
                  }
                }
                var re = d.alternate;
                if (re !== null) {
                  var ue = re.child;
                  if (ue !== null) {
                    re.child = null;
                    do {
                      var Qt = ue.sibling;
                      ue.sibling = null, ue = Qt;
                    } while (ue !== null);
                  }
                }
                ne = d;
              }
            }
            if (d.subtreeFlags & 2064 && h !== null)
              h.return = d, ne = h;
            else
              e:
                for (; ne !== null; ) {
                  if (d = ne, d.flags & 2048)
                    switch (d.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Bo(9, d, d.return);
                    }
                  var w = d.sibling;
                  if (w !== null) {
                    w.return = d.return, ne = w;
                    break e;
                  }
                  ne = d.return;
                }
          }
          var R = n.current;
          for (ne = R; ne !== null; ) {
            h = ne;
            var k = h.child;
            if (h.subtreeFlags & 2064 && k !== null)
              k.return = h, ne = k;
            else
              e:
                for (h = R; ne !== null; ) {
                  if (g = ne, g.flags & 2048)
                    try {
                      switch (g.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Po(9, g);
                      }
                    } catch (oe) {
                      Pt(g, g.return, oe);
                    }
                  if (g === h) {
                    ne = null;
                    break e;
                  }
                  var P = g.sibling;
                  if (P !== null) {
                    P.return = g.return, ne = P;
                    break e;
                  }
                  ne = g.return;
                }
          }
          if (Pe = c, hr(), Ea && typeof Ea.onPostCommitFiberRoot == "function")
            try {
              Ea.onPostCommitFiberRoot(ao, n);
            } catch {
            }
          o = !0;
        }
        return o;
      } finally {
        st = l, Gn.transition = r;
      }
    }
    return !1;
  }
  function Iv(n, r, l) {
    r = xu(l, r), r = Lv(n, r, 1), n = Pi(n, r, 1), r = Wn(), n !== null && (pl(n, 1, r), qn(n, r));
  }
  function Pt(n, r, l) {
    if (n.tag === 3)
      Iv(n, n, l);
    else
      for (; r !== null; ) {
        if (r.tag === 3) {
          Iv(r, n, l);
          break;
        } else if (r.tag === 1) {
          var o = r.stateNode;
          if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Pa === null || !Pa.has(o))) {
            n = xu(l, n), n = Ao(r, n, 1), r = Pi(r, n, 1), n = Wn(), r !== null && (pl(r, 1, n), qn(r, n));
            break;
          }
        }
        r = r.return;
      }
  }
  function sy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = Wn(), n.pingedLanes |= n.suspendedLanes & l, At === n && (En & l) === l && (on === 4 || on === 3 && (En & 130023424) === En && 500 > Je() - hd ? jl(n, 0) : Mu |= l), qn(n, r);
  }
  function Rc(n, r) {
    r === 0 && (n.mode & 1 ? (r = iu, iu <<= 1, !(iu & 130023424) && (iu = 4194304)) : r = 1);
    var l = Wn();
    n = li(n, r), n !== null && (pl(n, r, l), qn(n, l));
  }
  function cy(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Rc(n, l);
  }
  function fy(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(M(314));
    }
    o !== null && o.delete(r), Rc(n, l);
  }
  var Gv;
  Gv = function(n, r, l) {
    if (n !== null)
      if (n.memoizedProps !== r.pendingProps || Vt.current)
        qt = !0;
      else {
        if (!(n.lanes & l) && !(r.flags & 128))
          return qt = !1, si(n, r, l);
        qt = !!(n.flags & 131072);
      }
    else
      qt = !1, wt && r.flags & 1048576 && Pf(r, yu, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Qn(n, r), n = r.pendingProps;
        var c = Zr(r, we.current);
        Q(r, l), c = Qi(null, r, o, n, c, l);
        var d = kl();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Lt(o) ? (d = !0, As(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Xf(r), c.updater = $s, r.stateNode = c, c._reactInternals = r, Qs(r, o, n, l), r = Nv(null, r, o, !0, d, l)) : (r.tag = 0, wt && d && Hs(r), an(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Qn(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = py(o), n = Ar(o, n), c) {
            case 0:
              r = wu(null, r, o, n, l);
              break e;
            case 1:
              r = ad(null, r, o, n, l);
              break e;
            case 11:
              r = Gi(null, r, o, n, l);
              break e;
            case 14:
              r = dc(null, r, o, Ar(o.type, n), l);
              break e;
          }
          throw Error(M(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Ar(o, c), wu(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Ar(o, c), ad(n, r, o, c, l);
      case 3:
        e: {
          if (zv(r), n === null)
            throw Error(M(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, rn(n, r), Yi(r, o, null, l);
          var h = r.memoizedState;
          if (o = h.element, d.isDehydrated)
            if (d = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
              c = xu(Error(M(423)), r), r = pc(n, r, o, l, c);
              break e;
            } else if (o !== c) {
              c = xu(Error(M(424)), r), r = pc(n, r, o, l, c);
              break e;
            } else
              for (gr = wa(r.stateNode.containerInfo.firstChild), Ur = r, wt = !0, ta = null, l = _v(r, null, o, l), r.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (zt(), o === c) {
              r = _n(n, r, l);
              break e;
            }
            an(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Se(r), n === null && js(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, h = c.children, xo(o, c) ? h = null : d !== null && xo(o, d) && (r.flags |= 32), Me(n, r), an(n, r, h, l), r.child;
      case 6:
        return n === null && js(r), null;
      case 13:
        return ld(n, r, l);
      case 4:
        return Zf(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Su(r, null, o, l) : an(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Ar(o, c), Gi(n, r, o, c, l);
      case 7:
        return an(n, r, r.pendingProps, l), r.child;
      case 8:
        return an(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return an(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, h = c.value, it(Fa, o._currentValue), o._currentValue = h, d !== null)
            if (qr(d.value, h)) {
              if (d.children === c.children && !Vt.current) {
                r = _n(n, r, l);
                break e;
              }
            } else
              for (d = r.child, d !== null && (d.return = r); d !== null; ) {
                var g = d.dependencies;
                if (g !== null) {
                  h = d.child;
                  for (var C = g.firstContext; C !== null; ) {
                    if (C.context === o) {
                      if (d.tag === 1) {
                        C = ui(-1, l & -l), C.tag = 2;
                        var L = d.updateQueue;
                        if (L !== null) {
                          L = L.shared;
                          var F = L.pending;
                          F === null ? C.next = C : (C.next = F.next, F.next = C), L.pending = C;
                        }
                      }
                      d.lanes |= l, C = d.alternate, C !== null && (C.lanes |= l), gn(
                        d.return,
                        l,
                        r
                      ), g.lanes |= l;
                      break;
                    }
                    C = C.next;
                  }
                } else if (d.tag === 10)
                  h = d.type === r.type ? null : d.child;
                else if (d.tag === 18) {
                  if (h = d.return, h === null)
                    throw Error(M(341));
                  h.lanes |= l, g = h.alternate, g !== null && (g.lanes |= l), gn(h, l, r), h = d.sibling;
                } else
                  h = d.child;
                if (h !== null)
                  h.return = d;
                else
                  for (h = d; h !== null; ) {
                    if (h === r) {
                      h = null;
                      break;
                    }
                    if (d = h.sibling, d !== null) {
                      d.return = h.return, h = d;
                      break;
                    }
                    h = h.return;
                  }
                d = h;
              }
          an(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, Q(r, l), c = $t(c), o = o(c), r.flags |= 1, an(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = Ar(o, r.pendingProps), c = Ar(o.type, c), dc(n, r, o, c, l);
      case 15:
        return Cr(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Ar(o, c), Qn(n, r), r.tag = 1, Lt(o) ? (n = !0, As(r)) : n = !1, Q(r, l), wv(r, o, c), Qs(r, o, c, l), Nv(null, r, o, !0, n, l);
      case 19:
        return sd(n, r, l);
      case 22:
        return Ml(n, r, l);
    }
    throw Error(M(156, r.tag));
  };
  function Cd(n, r) {
    return Ot(n, r);
  }
  function dy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ua(n, r, l, o) {
    return new dy(n, r, l, o);
  }
  function Td(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function py(n) {
    if (typeof n == "function")
      return Td(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === xn)
        return 11;
      if (n === fn)
        return 14;
    }
    return 2;
  }
  function Ki(n, r) {
    var l = n.alternate;
    return l === null ? (l = ua(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function xc(n, r, l, o, c, d) {
    var h = 2;
    if (o = n, typeof n == "function")
      Td(n) && (h = 1);
    else if (typeof n == "string")
      h = 5;
    else
      e:
        switch (n) {
          case Ae:
            return Bl(l.children, c, d, r);
          case Rn:
            h = 8, c |= 8;
            break;
          case Fn:
            return n = ua(12, l, r, c | 2), n.elementType = Fn, n.lanes = d, n;
          case ke:
            return n = ua(13, l, r, c), n.elementType = ke, n.lanes = d, n;
          case $e:
            return n = ua(19, l, r, c), n.elementType = $e, n.lanes = d, n;
          case Kn:
            return Io(l, c, d, r);
          default:
            if (typeof n == "object" && n !== null)
              switch (n.$$typeof) {
                case jt:
                  h = 10;
                  break e;
                case ct:
                  h = 9;
                  break e;
                case xn:
                  h = 11;
                  break e;
                case fn:
                  h = 14;
                  break e;
                case Rt:
                  h = 16, o = null;
                  break e;
              }
            throw Error(M(130, n == null ? n : typeof n, ""));
        }
    return r = ua(h, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Bl(n, r, l, o) {
    return n = ua(7, n, o, r), n.lanes = l, n;
  }
  function Io(n, r, l, o) {
    return n = ua(22, n, o, r), n.elementType = Kn, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Go(n, r, l) {
    return n = ua(6, n, null, r), n.lanes = l, n;
  }
  function Pl(n, r, l) {
    return r = ua(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function vy(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ff(0), this.expirationTimes = ff(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ff(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function wc(n, r, l, o, c, d, h, g, C) {
    return n = new vy(n, r, l, g, C), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = ua(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Xf(d), n;
  }
  function Wv(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Tt, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Rd(n) {
    if (!n)
      return Ha;
    n = n._reactInternals;
    e: {
      if (Ne(n) !== n || n.tag !== 1)
        throw Error(M(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Lt(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(M(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Lt(l))
        return bo(n, l, r);
    }
    return r;
  }
  function Xv(n, r, l, o, c, d, h, g, C) {
    return n = wc(l, o, !0, n, c, d, h, g, C), n.context = Rd(null), l = n.current, o = Wn(), c = Kt(l), d = ui(o, c), d.callback = r ?? null, Pi(l, d, c), n.current.lanes = c, pl(n, c, o), qn(n, o), n;
  }
  function Wo(n, r, l, o) {
    var c = r.current, d = Wn(), h = Kt(c);
    return l = Rd(l), r.context === null ? r.context = l : r.pendingContext = l, r = ui(d, h), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Pi(c, r, h), n !== null && (Xn(n, c, h, d), Ys(n, c, h)), h;
  }
  function Dc(n) {
    if (n = n.current, !n.child)
      return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function qv(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function xd(n, r) {
    qv(n, r), (n = n.alternate) && qv(n, r);
  }
  function Kv() {
    return null;
  }
  var wd = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function bc(n) {
    this._internalRoot = n;
  }
  pi.prototype.render = bc.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null)
      throw Error(M(409));
    Wo(n, r, null, null);
  }, pi.prototype.unmount = bc.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      qi(function() {
        Wo(null, n, null, null);
      }), r[ai] = null;
    }
  };
  function pi(n) {
    this._internalRoot = n;
  }
  pi.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Up();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < ft.length && r !== 0 && r < ft[l].priority; l++)
        ;
      ft.splice(l, 0, n), l === 0 && Ap(n);
    }
  };
  function Dd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function kc(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Zv() {
  }
  function hy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var L = Dc(h);
          d.call(L);
        };
      }
      var h = Xv(r, o, n, 0, null, !1, !1, "", Zv);
      return n._reactRootContainer = h, n[ai] = h.current, hu(n.nodeType === 8 ? n.parentNode : n), qi(), h;
    }
    for (; c = n.lastChild; )
      n.removeChild(c);
    if (typeof o == "function") {
      var g = o;
      o = function() {
        var L = Dc(C);
        g.call(L);
      };
    }
    var C = wc(n, 0, !1, null, null, !1, !1, "", Zv);
    return n._reactRootContainer = C, n[ai] = C.current, hu(n.nodeType === 8 ? n.parentNode : n), qi(function() {
      Wo(r, C, l, o);
    }), C;
  }
  function _c(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var h = d;
      if (typeof c == "function") {
        var g = c;
        c = function() {
          var C = Dc(h);
          g.call(C);
        };
      }
      Wo(r, h, n, c);
    } else
      h = hy(l, r, n, c, o);
    return Dc(h);
  }
  zp = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = dl(r.pendingLanes);
          l !== 0 && (io(r, l | 1), qn(r, Je()), !(Pe & 6) && (Nu = Je() + 500, hr()));
        }
        break;
      case 13:
        qi(function() {
          var o = li(n, 1);
          if (o !== null) {
            var c = Wn();
            Xn(o, n, 1, c);
          }
        }), xd(n, 1);
    }
  }, gs = function(n) {
    if (n.tag === 13) {
      var r = li(n, 134217728);
      if (r !== null) {
        var l = Wn();
        Xn(r, n, 134217728, l);
      }
      xd(n, 134217728);
    }
  }, yt = function(n) {
    if (n.tag === 13) {
      var r = Kt(n), l = li(n, r);
      if (l !== null) {
        var o = Wn();
        Xn(l, n, r, o);
      }
      xd(n, r);
    }
  }, Up = function() {
    return st;
  }, pf = function(n, r) {
    var l = st;
    try {
      return st = n, r();
    } finally {
      st = l;
    }
  }, Or = function(n, r, l) {
    switch (r) {
      case "input":
        if (Pn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; )
            l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = he(o);
              if (!c)
                throw Error(M(90));
              Qr(o), Pn(o, c);
            }
          }
        }
        break;
      case "textarea":
        za(n, l);
        break;
      case "select":
        r = l.value, r != null && Na(n, !!l.multiple, r, !1);
    }
  }, ro = Au, ps = qi;
  var my = { usingClientEntryPoint: !1, Events: [Do, mu, he, sl, nu, Au] }, Fu = { findFiberByHostInstance: Kr, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" }, yy = { bundleType: Fu.bundleType, version: Fu.version, rendererPackageName: Fu.rendererPackageName, rendererConfig: Fu.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ht.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = vn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Fu.findFiberByHostInstance || Kv, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Oc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Oc.isDisabled && Oc.supportsFiber)
      try {
        ao = Oc.inject(yy), Ea = Oc;
      } catch {
      }
  }
  return pa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = my, pa.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Dd(r))
      throw Error(M(200));
    return Wv(n, r, null, l);
  }, pa.createRoot = function(n, r) {
    if (!Dd(n))
      throw Error(M(299));
    var l = !1, o = "", c = wd;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = wc(n, 1, !1, null, null, l, !1, o, c), n[ai] = r.current, hu(n.nodeType === 8 ? n.parentNode : n), new bc(r);
  }, pa.findDOMNode = function(n) {
    if (n == null)
      return null;
    if (n.nodeType === 1)
      return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(M(188)) : (n = Object.keys(n).join(","), Error(M(268, n)));
    return n = vn(r), n = n === null ? null : n.stateNode, n;
  }, pa.flushSync = function(n) {
    return qi(n);
  }, pa.hydrate = function(n, r, l) {
    if (!kc(r))
      throw Error(M(200));
    return _c(null, n, r, !0, l);
  }, pa.hydrateRoot = function(n, r, l) {
    if (!Dd(n))
      throw Error(M(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", h = wd;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (h = l.onRecoverableError)), r = Xv(r, null, n, 1, l ?? null, c, !1, d, h), n[ai] = r.current, hu(n), o)
      for (n = 0; n < o.length; n++)
        l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
          l,
          c
        );
    return new pi(r);
  }, pa.render = function(n, r, l) {
    if (!kc(r))
      throw Error(M(200));
    return _c(null, n, r, !1, l);
  }, pa.unmountComponentAtNode = function(n) {
    if (!kc(n))
      throw Error(M(40));
    return n._reactRootContainer ? (qi(function() {
      _c(null, null, n, !1, function() {
        n._reactRootContainer = null, n[ai] = null;
      });
    }), !0) : !1;
  }, pa.unstable_batchedUpdates = Au, pa.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!kc(l))
      throw Error(M(200));
    if (n == null || n._reactInternals === void 0)
      throw Error(M(38));
    return _c(n, r, l, !1, o);
  }, pa.version = "18.2.0-next-9e3b772b8-20220608", pa;
}
var va = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Z1;
function qb() {
  return Z1 || (Z1 = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var Y = _p, Re = J1(), M = Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Jt = !1;
    function en(e) {
      Jt = e;
    }
    function qe(e) {
      if (!Jt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Ft("warn", e, a);
      }
    }
    function S(e) {
      if (!Jt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Ft("error", e, a);
      }
    }
    function Ft(e, t, a) {
      {
        var i = M.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var se = 0, ce = 1, nt = 2, te = 3, de = 4, le = 5, Ue = 6, ut = 7, vt = 8, cn = 9, Ke = 10, je = 11, ht = 12, Ve = 13, Tt = 14, Ae = 15, Rn = 16, Fn = 17, jt = 18, ct = 19, xn = 21, ke = 22, $e = 23, fn = 24, Rt = 25, Kn = !0, $ = !1, ye = !1, Z = !1, Ze = !1, rt = !0, wn = !1, Zn = !1, La = !0, tn = !0, $r = !0, jn = /* @__PURE__ */ new Set(), cr = {}, Ma = {};
    function fr(e, t) {
      Qr(e, t), Qr(e + "Capture", t);
    }
    function Qr(e, t) {
      cr[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), cr[e] = t;
      {
        var a = e.toLowerCase();
        Ma[a] = e, e === "onDoubleClick" && (Ma.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        jn.add(t[i]);
    }
    var dn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Vn = Object.prototype.hasOwnProperty;
    function Dn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Bn(e) {
      try {
        return Pn(e), !1;
      } catch {
        return !0;
      }
    }
    function Pn(e) {
      return "" + e;
    }
    function Ir(e, t) {
      if (Bn(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), Pn(e);
    }
    function ha(e) {
      if (Bn(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Dn(e)), Pn(e);
    }
    function qa(e, t) {
      if (Bn(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), Pn(e);
    }
    function Na(e, t) {
      if (Bn(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), Pn(e);
    }
    function ma(e) {
      if (Bn(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Dn(e)), Pn(e);
    }
    function br(e) {
      if (Bn(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Dn(e)), Pn(e);
    }
    var za = 0, kr = 1, ya = 2, Gt = 3, _r = 4, wi = 5, ga = 6, G = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ve = G + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", He = new RegExp("^[" + G + "][" + ve + "]*$"), ot = {}, Nt = {};
    function pn(e) {
      return Vn.call(Nt, e) ? !0 : Vn.call(ot, e) ? !1 : He.test(e) ? (Nt[e] = !0, !0) : (ot[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function Yt(e, t, a) {
      return t !== null ? t.type === za : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function dr(e, t, a, i) {
      if (a !== null && a.type === za)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Et(e, t, a, i) {
      if (t === null || typeof t > "u" || dr(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Gt:
            return !t;
          case _r:
            return t === !1;
          case wi:
            return isNaN(t);
          case ga:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Or(e) {
      return Ct.hasOwnProperty(e) ? Ct[e] : null;
    }
    function mt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === ya || t === Gt || t === _r, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var Ct = {}, tu = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    tu.forEach(function(e) {
      Ct[e] = new mt(
        e,
        za,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      Ct[t] = new mt(
        t,
        kr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Ct[e] = new mt(
        e,
        ya,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Ct[e] = new mt(
        e,
        ya,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Ct[e] = new mt(
        e,
        Gt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Ct[e] = new mt(
        e,
        Gt,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Ct[e] = new mt(
        e,
        _r,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Ct[e] = new mt(
        e,
        ga,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Ct[e] = new mt(
        e,
        wi,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var sl = /[\-\:]([a-z])/g, nu = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(sl, nu);
      Ct[t] = new mt(
        t,
        kr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(sl, nu);
      Ct[t] = new mt(
        t,
        kr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(sl, nu);
      Ct[t] = new mt(
        t,
        kr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Ct[e] = new mt(
        e,
        kr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ro = "xlinkHref";
    Ct[ro] = new mt(
      "xlinkHref",
      kr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Ct[e] = new mt(
        e,
        kr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var ps = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, cl = !1;
    function ru(e) {
      !cl && ps.test(e) && (cl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function fl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Ir(a, t), i.sanitizeURL && ru("" + a);
        var s = i.attributeName, f = null;
        if (i.type === _r) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Et(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Et(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === Gt)
            return a;
          f = e.getAttribute(s);
        }
        return Et(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function au(e, t, a, i) {
      {
        if (!pn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Ir(a, t), u === "" + a ? a : u;
      }
    }
    function Ua(e, t, a, i) {
      var u = Or(t);
      if (!Yt(t, u, i)) {
        if (Et(t, a, u, i) && (a = null), i || u === null) {
          if (pn(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Ir(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === Gt ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var m = u.attributeName, y = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(m);
        else {
          var x = u.type, T;
          x === Gt || x === _r && a === !0 ? T = "" : (Ir(a, m), T = "" + a, u.sanitizeURL && ru(T.toString())), y ? e.setAttributeNS(y, m, T) : e.setAttribute(m, T);
        }
      }
    }
    var Di = Symbol.for("react.element"), Lr = Symbol.for("react.portal"), Sa = Symbol.for("react.fragment"), bi = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), W = Symbol.for("react.context"), ge = Symbol.for("react.forward_ref"), Ne = Symbol.for("react.suspense"), We = Symbol.for("react.suspense_list"), ze = Symbol.for("react.memo"), Ee = Symbol.for("react.lazy"), vn = Symbol.for("react.scope"), _t = Symbol.for("react.debug_trace_mode"), Ot = Symbol.for("react.offscreen"), Jn = Symbol.for("react.legacy_hidden"), ki = Symbol.for("react.cache"), vs = Symbol.for("react.tracing_marker"), Je = Symbol.iterator, Mm = "@@iterator";
    function Ka(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Je && e[Je] || e[Mm];
      return typeof t == "function" ? t : null;
    }
    var Be = Object.assign, _i = 0, Op, of, ao, Ea, Lp, Gr, Mp;
    function Np() {
    }
    Np.__reactDisabledLog = !0;
    function Nm() {
      {
        if (_i === 0) {
          Op = console.log, of = console.info, ao = console.warn, Ea = console.error, Lp = console.group, Gr = console.groupCollapsed, Mp = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Np,
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
        _i++;
      }
    }
    function hs() {
      {
        if (_i--, _i === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Be({}, e, {
              value: Op
            }),
            info: Be({}, e, {
              value: of
            }),
            warn: Be({}, e, {
              value: ao
            }),
            error: Be({}, e, {
              value: Ea
            }),
            group: Be({}, e, {
              value: Lp
            }),
            groupCollapsed: Be({}, e, {
              value: Gr
            }),
            groupEnd: Be({}, e, {
              value: Mp
            })
          });
        }
        _i < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var iu = M.ReactCurrentDispatcher, dl;
    function Ca(e, t, a) {
      {
        if (dl === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            dl = i && i[1] || "";
          }
        return `
` + dl + e;
      }
    }
    var sf = !1, ms;
    {
      var cf = typeof WeakMap == "function" ? WeakMap : Map;
      ms = new cf();
    }
    function ys(e, t) {
      if (!e || sf)
        return "";
      {
        var a = ms.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      sf = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = iu.current, iu.current = null, Nm();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (O) {
              i = O;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (O) {
              i = O;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (O) {
            i = O;
          }
          e();
        }
      } catch (O) {
        if (O && i && typeof O.stack == "string") {
          for (var p = O.stack.split(`
`), v = i.stack.split(`
`), m = p.length - 1, y = v.length - 1; m >= 1 && y >= 0 && p[m] !== v[y]; )
            y--;
          for (; m >= 1 && y >= 0; m--, y--)
            if (p[m] !== v[y]) {
              if (m !== 1 || y !== 1)
                do
                  if (m--, y--, y < 0 || p[m] !== v[y]) {
                    var x = `
` + p[m].replace(" at new ", " at ");
                    return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && ms.set(e, x), x;
                  }
                while (m >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        sf = !1, iu.current = s, hs(), Error.prepareStackTrace = u;
      }
      var T = e ? e.displayName || e.name : "", _ = T ? Ca(T) : "";
      return typeof e == "function" && ms.set(e, _), _;
    }
    function ff(e, t, a) {
      return ys(e, !0);
    }
    function pl(e, t, a) {
      return ys(e, !1);
    }
    function zm(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function io(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ys(e, zm(e));
      if (typeof e == "string")
        return Ca(e);
      switch (e) {
        case Ne:
          return Ca("Suspense");
        case We:
          return Ca("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ge:
            return pl(e.render);
          case ze:
            return io(e.type, t, a);
          case Ee: {
            var i = e, u = i._payload, s = i._init;
            try {
              return io(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function st(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case le:
          return Ca(e.type);
        case Rn:
          return Ca("Lazy");
        case Ve:
          return Ca("Suspense");
        case ct:
          return Ca("SuspenseList");
        case se:
        case nt:
        case Ae:
          return pl(e.type);
        case je:
          return pl(e.type.render);
        case ce:
          return ff(e.type);
        default:
          return "";
      }
    }
    function df(e) {
      try {
        var t = "", a = e;
        do
          t += st(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function zp(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function gs(e) {
      return e.displayName || "Context";
    }
    function yt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Sa:
          return "Fragment";
        case Lr:
          return "Portal";
        case E:
          return "Profiler";
        case bi:
          return "StrictMode";
        case Ne:
          return "Suspense";
        case We:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case W:
            var t = e;
            return gs(t) + ".Consumer";
          case j:
            var a = e;
            return gs(a._context) + ".Provider";
          case ge:
            return zp(e, e.render, "ForwardRef");
          case ze:
            var i = e.displayName || null;
            return i !== null ? i : yt(e.type) || "Memo";
          case Ee: {
            var u = e, s = u._payload, f = u._init;
            try {
              return yt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Up(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function pf(e) {
      return e.displayName || "Context";
    }
    function Oe(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case fn:
          return "Cache";
        case cn:
          var i = a;
          return pf(i) + ".Consumer";
        case Ke:
          var u = a;
          return pf(u._context) + ".Provider";
        case jt:
          return "DehydratedFragment";
        case je:
          return Up(a, a.render, "ForwardRef");
        case ut:
          return "Fragment";
        case le:
          return a;
        case de:
          return "Portal";
        case te:
          return "Root";
        case Ue:
          return "Text";
        case Rn:
          return yt(a);
        case vt:
          return a === bi ? "StrictMode" : "Mode";
        case ke:
          return "Offscreen";
        case ht:
          return "Profiler";
        case xn:
          return "Scope";
        case Ve:
          return "Suspense";
        case ct:
          return "SuspenseList";
        case Rt:
          return "TracingMarker";
        case ce:
        case se:
        case Fn:
        case nt:
        case Tt:
        case Ae:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var lo = M.ReactDebugCurrentFrame, Wt = null, Wr = !1;
    function Xr() {
      {
        if (Wt === null)
          return null;
        var e = Wt._debugOwner;
        if (e !== null && typeof e < "u")
          return Oe(e);
      }
      return null;
    }
    function uo() {
      return Wt === null ? "" : df(Wt);
    }
    function nn() {
      lo.getCurrentStack = null, Wt = null, Wr = !1;
    }
    function ft(e) {
      lo.getCurrentStack = e === null ? null : uo, Wt = e, Wr = !1;
    }
    function Um() {
      return Wt;
    }
    function Ta(e) {
      Wr = e;
    }
    function Yn(e) {
      return "" + e;
    }
    function Oi(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return br(e), e;
        default:
          return "";
      }
    }
    var Ap = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function lu(e, t) {
      Ap[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function vf(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Hp(e) {
      return e._valueTracker;
    }
    function oo(e) {
      e._valueTracker = null;
    }
    function so(e) {
      var t = "";
      return e && (vf(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function uu(e) {
      var t = vf(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      br(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            br(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            br(p), i = "" + p;
          },
          stopTracking: function() {
            oo(e), delete e[t];
          }
        };
        return f;
      }
    }
    function vl(e) {
      Hp(e) || (e._valueTracker = uu(e));
    }
    function Fp(e) {
      if (!e)
        return !1;
      var t = Hp(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = so(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Ss(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Es = !1, co = !1, Cs = !1, hf = !1;
    function Za(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function fo(e, t) {
      var a = e, i = t.checked, u = Be({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function po(e, t) {
      lu("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !co && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Xr() || "A component", t.type), co = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Es && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Xr() || "A component", t.type), Es = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Oi(t.value != null ? t.value : i),
        controlled: Za(t)
      };
    }
    function mf(e, t) {
      var a = e, i = t.checked;
      i != null && Ua(a, "checked", i, !1);
    }
    function ou(e, t) {
      var a = e;
      {
        var i = Za(t);
        !a._wrapperState.controlled && i && !hf && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), hf = !0), a._wrapperState.controlled && !i && !Cs && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Cs = !0);
      }
      mf(e, t);
      var u = Oi(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Yn(u)) : a.value !== Yn(u) && (a.value = Yn(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Li(a, t.type, u) : t.hasOwnProperty("defaultValue") && Li(a, t.type, Oi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function vo(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Yn(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function jp(e, t) {
      var a = e;
      ou(a, t), Mr(a, t);
    }
    function Mr(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Ir(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = hh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Fp(f), ou(f, p);
          }
        }
      }
    }
    function Li(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Ss(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Yn(e._wrapperState.initialValue) : e.defaultValue !== Yn(a) && (e.defaultValue = Yn(a)));
    }
    var Ts = !1, su = !1, Vp = !1;
    function Rs(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? Y.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || su || (su = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Vp || (Vp = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ts && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ts = !0);
    }
    function yf(e, t) {
      t.value != null && e.setAttribute("value", Yn(Oi(t.value)));
    }
    var ho = Array.isArray;
    function hn(e) {
      return ho(e);
    }
    var xs;
    xs = !1;
    function Bp() {
      var e = Xr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Pp = ["value", "defaultValue"];
    function Am(e) {
      {
        lu("select", e);
        for (var t = 0; t < Pp.length; t++) {
          var a = Pp[t];
          if (e[a] != null) {
            var i = hn(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Bp()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Bp());
          }
        }
      }
    }
    function Mi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var m = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== m && (u[v].selected = m), m && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var y = Yn(Oi(a)), x = null, T = 0; T < u.length; T++) {
          if (u[T].value === y) {
            u[T].selected = !0, i && (u[T].defaultSelected = !0);
            return;
          }
          x === null && !u[T].disabled && (x = u[T]);
        }
        x !== null && (x.selected = !0);
      }
    }
    function gf(e, t) {
      return Be({}, t, {
        value: void 0
      });
    }
    function Yp(e, t) {
      var a = e;
      Am(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !xs && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), xs = !0);
    }
    function Hm(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Mi(a, !!t.multiple, i, !1) : t.defaultValue != null && Mi(a, !!t.multiple, t.defaultValue, !0);
    }
    function Fm(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Mi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Mi(a, !!t.multiple, t.defaultValue, !0) : Mi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function jm(e, t) {
      var a = e, i = t.value;
      i != null && Mi(a, !!t.multiple, i, !1);
    }
    var Sf = !1;
    function Ef(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = Be({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Yn(a._wrapperState.initialValue)
      });
      return i;
    }
    function $p(e, t) {
      var a = e;
      lu("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Sf && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Xr() || "A component"), Sf = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (hn(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Oi(i)
      };
    }
    function Qp(e, t) {
      var a = e, i = Oi(t.value), u = Oi(t.defaultValue);
      if (i != null) {
        var s = Yn(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = Yn(u));
    }
    function Ip(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Cf(e, t) {
      Qp(e, t);
    }
    var Ja = "http://www.w3.org/1999/xhtml", Vm = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
    function ws(e) {
      switch (e) {
        case "svg":
          return Tf;
        case "math":
          return Vm;
        default:
          return Ja;
      }
    }
    function Rf(e, t) {
      return e == null || e === Ja ? ws(t) : e === Tf && t === "foreignObject" ? Ja : e;
    }
    var Bm = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, Ds, Gp = Bm(function(e, t) {
      if (e.namespaceURI === Tf && !("innerHTML" in e)) {
        Ds = Ds || document.createElement("div"), Ds.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Ds.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), pr = 1, ei = 3, Xt = 8, Ra = 9, hl = 11, bs = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === ei) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Wp = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, cu = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Xp(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var qp = ["Webkit", "ms", "Moz", "O"];
    Object.keys(cu).forEach(function(e) {
      qp.forEach(function(t) {
        cu[Xp(t, e)] = cu[e];
      });
    });
    function ks(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(cu.hasOwnProperty(e) && cu[e]) ? t + "px" : (Na(t, e), ("" + t).trim());
    }
    var fu = /([A-Z])/g, Pm = /^ms-/;
    function Ym(e) {
      return e.replace(fu, "-$1").toLowerCase().replace(Pm, "-ms-");
    }
    var Kp = function() {
    };
    {
      var Zp = /^(?:webkit|moz|o)[A-Z]/, Jp = /^-ms-/, mo = /-(.)/g, du = /;\s*$/, pu = {}, vu = {}, ev = !1, xf = !1, wf = function(e) {
        return e.replace(mo, function(t, a) {
          return a.toUpperCase();
        });
      }, Df = function(e) {
        pu.hasOwnProperty(e) && pu[e] || (pu[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          wf(e.replace(Jp, "ms-"))
        ));
      }, tv = function(e) {
        pu.hasOwnProperty(e) && pu[e] || (pu[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, nv = function(e, t) {
        vu.hasOwnProperty(t) && vu[t] || (vu[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(du, "")));
      }, rv = function(e, t) {
        ev || (ev = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, $m = function(e, t) {
        xf || (xf = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Kp = function(e, t) {
        e.indexOf("-") > -1 ? Df(e) : Zp.test(e) ? tv(e) : du.test(t) && nv(e, t), typeof t == "number" && (isNaN(t) ? rv(e, t) : isFinite(t) || $m(e, t));
      };
    }
    var Qm = Kp;
    function Im(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : Ym(i)) + ":", t += ks(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function av(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || Qm(i, t[i]);
          var s = ks(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Gm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function qr(e) {
      var t = {};
      for (var a in e)
        for (var i = Wp[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function yo(e, t) {
      {
        if (!t)
          return;
        var a = qr(e), i = qr(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Gm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var iv = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, lv = Be({
      menuitem: !0
    }, iv), uv = "__html";
    function _s(e, t) {
      if (t) {
        if (lv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(uv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function ti(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Os = {
      // HTML
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
      // SVG
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
    }, ov = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
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
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
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
      "aria-setsize": 0
    }, xa = {}, bf = new RegExp("^(aria)-[" + ve + "]*$"), go = new RegExp("^(aria)[A-Z][" + ve + "]*$");
    function kf(e, t) {
      {
        if (Vn.call(xa, t) && xa[t])
          return !0;
        if (go.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = ov.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), xa[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), xa[t] = !0, !0;
        }
        if (bf.test(t)) {
          var u = t.toLowerCase(), s = ov.hasOwnProperty(u) ? u : null;
          if (s == null)
            return xa[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), xa[t] = !0, !0;
        }
      }
      return !0;
    }
    function sv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = kf(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function Ls(e, t) {
      ti(e, t) || sv(e, t);
    }
    var ml = !1;
    function _f(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !ml && (ml = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Of = function() {
    };
    {
      var mn = {}, Lf = /^on./, cv = /^on[^A-Z]/, fv = new RegExp("^(aria)-[" + ve + "]*$"), dv = new RegExp("^(aria)[A-Z][" + ve + "]*$");
      Of = function(e, t, a, i) {
        if (Vn.call(mn, t) && mn[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), mn[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), mn[t] = !0, !0;
          if (Lf.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), mn[t] = !0, !0;
        } else if (Lf.test(t))
          return cv.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), mn[t] = !0, !0;
        if (fv.test(t) || dv.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), mn[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), mn[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), mn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), mn[t] = !0, !0;
        var v = Or(t), m = v !== null && v.type === za;
        if (Os.hasOwnProperty(u)) {
          var y = Os[u];
          if (y !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, y), mn[t] = !0, !0;
        } else if (!m && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), mn[t] = !0, !0;
        return typeof a == "boolean" && dr(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), mn[t] = !0, !0) : m ? !0 : dr(t, a, v, !1) ? (mn[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Gt && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), mn[t] = !0), !0);
      };
    }
    var pv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = Of(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function vv(e, t, a) {
      ti(e, t) || pv(e, t, a);
    }
    var ni = 1, So = 1 << 1, yl = 1 << 2, Wm = ni | So | yl, Eo = null;
    function Co(e) {
      Eo !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Eo = e;
    }
    function Xm() {
      Eo === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Eo = null;
    }
    function hv(e) {
      return e === Eo;
    }
    function Ms(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ei ? t.parentNode : t;
    }
    var gt = null, Ni = null, ri = null;
    function hu(e) {
      var t = Bu(e);
      if (t) {
        if (typeof gt != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = hh(a);
          gt(t.stateNode, t.type, i);
        }
      }
    }
    function mv(e) {
      gt = e;
    }
    function Ns(e) {
      Ni ? ri ? ri.push(e) : ri = [e] : Ni = e;
    }
    function To() {
      return Ni !== null || ri !== null;
    }
    function Ro() {
      if (Ni) {
        var e = Ni, t = ri;
        if (Ni = null, ri = null, hu(e), t)
          for (var a = 0; a < t.length; a++)
            hu(t[a]);
      }
    }
    var gl = function(e, t) {
      return e(t);
    }, Mf = function() {
    }, Nf = !1;
    function qm() {
      var e = To();
      e && (Mf(), Ro());
    }
    function zf(e, t, a) {
      if (Nf)
        return e(t, a);
      Nf = !0;
      try {
        return gl(e, t, a);
      } finally {
        Nf = !1, qm();
      }
    }
    function zs(e, t, a) {
      gl = e, Mf = a;
    }
    function Us(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Uf(e, t, a) {
      switch (e) {
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
          return !!(a.disabled && Us(t));
        default:
          return !1;
      }
    }
    function Sl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = hh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Uf(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var xo = !1;
    if (dn)
      try {
        var El = {};
        Object.defineProperty(El, "passive", {
          get: function() {
            xo = !0;
          }
        }), window.addEventListener("test", El, El), window.removeEventListener("test", El, El);
      } catch {
        xo = !1;
      }
    function yv(e, t, a, i, u, s, f, p, v) {
      var m = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, m);
      } catch (y) {
        this.onError(y);
      }
    }
    var Af = yv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Hf = document.createElement("react");
      Af = function(t, a, i, u, s, f, p, v, m) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var y = document.createEvent("Event"), x = !1, T = !0, _ = window.event, O = Object.getOwnPropertyDescriptor(window, "event");
        function N() {
          Hf.removeEventListener(z, me, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = _);
        }
        var J = Array.prototype.slice.call(arguments, 3);
        function me() {
          x = !0, N(), a.apply(i, J), T = !1;
        }
        var fe, Ge = !1, Ye = !1;
        function D(b) {
          if (fe = b.error, Ge = !0, fe === null && b.colno === 0 && b.lineno === 0 && (Ye = !0), b.defaultPrevented && fe != null && typeof fe == "object")
            try {
              fe._suppressLogging = !0;
            } catch {
            }
        }
        var z = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", D), Hf.addEventListener(z, me, !1), y.initEvent(z, !1, !1), Hf.dispatchEvent(y), O && Object.defineProperty(window, "event", O), x && T && (Ge ? Ye && (fe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : fe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(fe)), window.removeEventListener("error", D), !x)
          return N(), yv.apply(this, arguments);
      };
    }
    var Km = Af, zi = !1, wa = null, wo = !1, Ui = null, Aa = {
      onError: function(e) {
        zi = !0, wa = e;
      }
    };
    function Cl(e, t, a, i, u, s, f, p, v) {
      zi = !1, wa = null, Km.apply(Aa, arguments);
    }
    function ai(e, t, a, i, u, s, f, p, v) {
      if (Cl.apply(this, arguments), zi) {
        var m = jf();
        wo || (wo = !0, Ui = m);
      }
    }
    function Ff() {
      if (wo) {
        var e = Ui;
        throw wo = !1, Ui = null, e;
      }
    }
    function Zm() {
      return zi;
    }
    function jf() {
      if (zi) {
        var e = wa;
        return zi = !1, wa = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Kr(e) {
      return e._reactInternals;
    }
    function Do(e) {
      return e._reactInternals !== void 0;
    }
    function mu(e, t) {
      e._reactInternals = t;
    }
    var he = (
      /*                      */
      0
    ), Ai = (
      /*                */
      1
    ), xt = (
      /*                    */
      2
    ), Le = (
      /*                       */
      4
    ), at = (
      /*                */
      16
    ), it = (
      /*                 */
      32
    ), Ha = (
      /*                     */
      64
    ), we = (
      /*                   */
      128
    ), Vt = (
      /*            */
      256
    ), vr = (
      /*                          */
      512
    ), Zr = (
      /*                     */
      1024
    ), Lt = (
      /*                      */
      2048
    ), Jr = (
      /*                    */
      4096
    ), Hi = (
      /*                   */
      8192
    ), bo = (
      /*             */
      16384
    ), As = Lt | Le | Ha | vr | Zr | bo, gv = (
      /*               */
      32767
    ), Nr = (
      /*                   */
      32768
    ), yn = (
      /*                */
      65536
    ), ko = (
      /* */
      131072
    ), Vf = (
      /*                       */
      1048576
    ), Bf = (
      /*                    */
      2097152
    ), hr = (
      /*                 */
      4194304
    ), Fi = (
      /*                */
      8388608
    ), mr = (
      /*               */
      16777216
    ), Tl = (
      /*              */
      33554432
    ), yu = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Le | Zr | 0
    ), yr = xt | Le | at | it | vr | Jr | Hi, $n = Le | Ha | vr | Hi, ea = Lt | at, bn = hr | Fi | Bf, ii = M.ReactCurrentOwner;
    function zr(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (xt | Jr)) !== he && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === te ? a : null;
    }
    function Pf(e) {
      if (e.tag === Ve) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Hs(e) {
      return e.tag === te ? e.stateNode.containerInfo : null;
    }
    function Yf(e) {
      return zr(e) === e;
    }
    function Ur(e) {
      {
        var t = ii.current;
        if (t !== null && t.tag === ce) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Oe(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = Kr(e);
      return u ? zr(u) === u : !1;
    }
    function gr(e) {
      if (zr(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function wt(e) {
      var t = e.alternate;
      if (!t) {
        var a = zr(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return gr(s), e;
            if (v === u)
              return gr(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var m = !1, y = s.child; y; ) {
            if (y === i) {
              m = !0, i = s, u = f;
              break;
            }
            if (y === u) {
              m = !0, u = s, i = f;
              break;
            }
            y = y.sibling;
          }
          if (!m) {
            for (y = f.child; y; ) {
              if (y === i) {
                m = !0, i = f, u = s;
                break;
              }
              if (y === u) {
                m = !0, u = f, i = s;
                break;
              }
              y = y.sibling;
            }
            if (!m)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== te)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function ta(e) {
      var t = wt(e);
      return t !== null ? $f(t) : null;
    }
    function $f(e) {
      if (e.tag === le || e.tag === Ue)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = $f(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Sv(e) {
      var t = wt(e);
      return t !== null ? Fs(t) : null;
    }
    function Fs(e) {
      if (e.tag === le || e.tag === Ue)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== de) {
          var a = Fs(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var js = Re.unstable_scheduleCallback, Ev = Re.unstable_cancelCallback, Vs = Re.unstable_shouldYield, Cv = Re.unstable_requestPaint, zt = Re.unstable_now, Qf = Re.unstable_getCurrentPriorityLevel, Bs = Re.unstable_ImmediatePriority, Ar = Re.unstable_UserBlockingPriority, Fa = Re.unstable_NormalPriority, Ps = Re.unstable_LowPriority, ji = Re.unstable_IdlePriority, If = Re.unstable_yieldValue, Gf = Re.unstable_setDisableYieldValue, Vi = null, gn = null, Q = null, $t = !1, kn = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Wf(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        La && (e = Be({}, e, {
          getLaneLabelMap: Pi,
          injectProfilingHooks: ui
        })), Vi = t.inject(e), gn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Tv(e, t) {
      if (gn && typeof gn.onScheduleFiberRoot == "function")
        try {
          gn.onScheduleFiberRoot(Vi, e, t);
        } catch (a) {
          $t || ($t = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function li(e, t) {
      if (gn && typeof gn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & we) === we;
          if (tn) {
            var i;
            switch (t) {
              case Qn:
                i = Bs;
                break;
              case _n:
                i = Ar;
                break;
              case si:
                i = Fa;
                break;
              case Ho:
                i = ji;
                break;
              default:
                i = Fa;
                break;
            }
            gn.onCommitFiberRoot(Vi, e, i, a);
          }
        } catch (u) {
          $t || ($t = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Bi(e) {
      if (gn && typeof gn.onPostCommitFiberRoot == "function")
        try {
          gn.onPostCommitFiberRoot(Vi, e);
        } catch (t) {
          $t || ($t = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Xf(e) {
      if (gn && typeof gn.onCommitFiberUnmount == "function")
        try {
          gn.onCommitFiberUnmount(Vi, e);
        } catch (t) {
          $t || ($t = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function rn(e) {
      if (typeof If == "function" && (Gf(e), en(e)), gn && typeof gn.setStrictMode == "function")
        try {
          gn.setStrictMode(Vi, e);
        } catch (t) {
          $t || ($t = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function ui(e) {
      Q = e;
    }
    function Pi() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Dt; a++) {
          var i = Jm(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ys(e) {
      Q !== null && typeof Q.markCommitStarted == "function" && Q.markCommitStarted(e);
    }
    function qf() {
      Q !== null && typeof Q.markCommitStopped == "function" && Q.markCommitStopped();
    }
    function Yi(e) {
      Q !== null && typeof Q.markComponentRenderStarted == "function" && Q.markComponentRenderStarted(e);
    }
    function Rl() {
      Q !== null && typeof Q.markComponentRenderStopped == "function" && Q.markComponentRenderStopped();
    }
    function Rv(e) {
      Q !== null && typeof Q.markComponentPassiveEffectMountStarted == "function" && Q.markComponentPassiveEffectMountStarted(e);
    }
    function Kf() {
      Q !== null && typeof Q.markComponentPassiveEffectMountStopped == "function" && Q.markComponentPassiveEffectMountStopped();
    }
    function $s(e) {
      Q !== null && typeof Q.markComponentPassiveEffectUnmountStarted == "function" && Q.markComponentPassiveEffectUnmountStarted(e);
    }
    function xv() {
      Q !== null && typeof Q.markComponentPassiveEffectUnmountStopped == "function" && Q.markComponentPassiveEffectUnmountStopped();
    }
    function wv(e) {
      Q !== null && typeof Q.markComponentLayoutEffectMountStarted == "function" && Q.markComponentLayoutEffectMountStarted(e);
    }
    function Dv() {
      Q !== null && typeof Q.markComponentLayoutEffectMountStopped == "function" && Q.markComponentLayoutEffectMountStopped();
    }
    function Qs(e) {
      Q !== null && typeof Q.markComponentLayoutEffectUnmountStarted == "function" && Q.markComponentLayoutEffectUnmountStarted(e);
    }
    function gu() {
      Q !== null && typeof Q.markComponentLayoutEffectUnmountStopped == "function" && Q.markComponentLayoutEffectUnmountStopped();
    }
    function Is(e, t, a) {
      Q !== null && typeof Q.markComponentErrored == "function" && Q.markComponentErrored(e, t, a);
    }
    function bv(e, t, a) {
      Q !== null && typeof Q.markComponentSuspended == "function" && Q.markComponentSuspended(e, t, a);
    }
    function kv(e) {
      Q !== null && typeof Q.markLayoutEffectsStarted == "function" && Q.markLayoutEffectsStarted(e);
    }
    function Su() {
      Q !== null && typeof Q.markLayoutEffectsStopped == "function" && Q.markLayoutEffectsStopped();
    }
    function _v(e) {
      Q !== null && typeof Q.markPassiveEffectsStarted == "function" && Q.markPassiveEffectsStarted(e);
    }
    function _o() {
      Q !== null && typeof Q.markPassiveEffectsStopped == "function" && Q.markPassiveEffectsStopped();
    }
    function Da(e) {
      Q !== null && typeof Q.markRenderStarted == "function" && Q.markRenderStarted(e);
    }
    function Oo() {
      Q !== null && typeof Q.markRenderYielded == "function" && Q.markRenderYielded();
    }
    function Eu() {
      Q !== null && typeof Q.markRenderStopped == "function" && Q.markRenderStopped();
    }
    function xl(e) {
      Q !== null && typeof Q.markRenderScheduled == "function" && Q.markRenderScheduled(e);
    }
    function Zf(e, t) {
      Q !== null && typeof Q.markForceUpdateScheduled == "function" && Q.markForceUpdateScheduled(e, t);
    }
    function $i(e, t) {
      Q !== null && typeof Q.markStateUpdateScheduled == "function" && Q.markStateUpdateScheduled(e, t);
    }
    var Se = (
      /*                         */
      0
    ), Fe = (
      /*                 */
      1
    ), Ce = (
      /*                    */
      2
    ), Ut = (
      /*               */
      8
    ), na = (
      /*              */
      16
    ), Gs = Math.clz32 ? Math.clz32 : wl, Ws = Math.log, Jf = Math.LN2;
    function wl(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Ws(t) / Jf | 0) | 0;
    }
    var Dt = 31, U = (
      /*                        */
      0
    ), Qe = (
      /*                          */
      0
    ), Te = (
      /*                        */
      1
    ), ja = (
      /*    */
      2
    ), Hr = (
      /*             */
      4
    ), Dl = (
      /*            */
      8
    ), bt = (
      /*                     */
      16
    ), bl = (
      /*                */
      32
    ), Qi = (
      /*                       */
      4194240
    ), kl = (
      /*                        */
      64
    ), ra = (
      /*                        */
      128
    ), Sr = (
      /*                        */
      256
    ), _l = (
      /*                        */
      512
    ), Lo = (
      /*                        */
      1024
    ), Mo = (
      /*                        */
      2048
    ), Xs = (
      /*                        */
      4096
    ), qs = (
      /*                        */
      8192
    ), Ks = (
      /*                        */
      16384
    ), Zs = (
      /*                       */
      32768
    ), Js = (
      /*                       */
      65536
    ), ec = (
      /*                       */
      131072
    ), tc = (
      /*                       */
      262144
    ), nc = (
      /*                       */
      524288
    ), Ol = (
      /*                       */
      1048576
    ), rc = (
      /*                       */
      2097152
    ), Ll = (
      /*                            */
      130023424
    ), oi = (
      /*                             */
      4194304
    ), ac = (
      /*                             */
      8388608
    ), No = (
      /*                             */
      16777216
    ), ic = (
      /*                             */
      33554432
    ), lc = (
      /*                             */
      67108864
    ), ed = oi, Cu = (
      /*          */
      134217728
    ), uc = (
      /*                          */
      268435455
    ), Tu = (
      /*               */
      268435456
    ), Ii = (
      /*                        */
      536870912
    ), Er = (
      /*                   */
      1073741824
    );
    function Jm(e) {
      {
        if (e & Te)
          return "Sync";
        if (e & ja)
          return "InputContinuousHydration";
        if (e & Hr)
          return "InputContinuous";
        if (e & Dl)
          return "DefaultHydration";
        if (e & bt)
          return "Default";
        if (e & bl)
          return "TransitionHydration";
        if (e & Qi)
          return "Transition";
        if (e & Ll)
          return "Retry";
        if (e & Cu)
          return "SelectiveHydration";
        if (e & Tu)
          return "IdleHydration";
        if (e & Ii)
          return "Idle";
        if (e & Er)
          return "Offscreen";
      }
    }
    var St = -1, oc = kl, sc = oi;
    function Ru(e) {
      switch (qt(e)) {
        case Te:
          return Te;
        case ja:
          return ja;
        case Hr:
          return Hr;
        case Dl:
          return Dl;
        case bt:
          return bt;
        case bl:
          return bl;
        case kl:
        case ra:
        case Sr:
        case _l:
        case Lo:
        case Mo:
        case Xs:
        case qs:
        case Ks:
        case Zs:
        case Js:
        case ec:
        case tc:
        case nc:
        case Ol:
        case rc:
          return e & Qi;
        case oi:
        case ac:
        case No:
        case ic:
        case lc:
          return e & Ll;
        case Cu:
          return Cu;
        case Tu:
          return Tu;
        case Ii:
          return Ii;
        case Er:
          return Er;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function zo(e, t) {
      var a = e.pendingLanes;
      if (a === U)
        return U;
      var i = U, u = e.suspendedLanes, s = e.pingedLanes, f = a & uc;
      if (f !== U) {
        var p = f & ~u;
        if (p !== U)
          i = Ru(p);
        else {
          var v = f & s;
          v !== U && (i = Ru(v));
        }
      } else {
        var m = a & ~u;
        m !== U ? i = Ru(m) : s !== U && (i = Ru(s));
      }
      if (i === U)
        return U;
      if (t !== U && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === U) {
        var y = qt(i), x = qt(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          y >= x || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          y === bt && (x & Qi) !== U
        )
          return t;
      }
      (i & Hr) !== U && (i |= a & bt);
      var T = e.entangledLanes;
      if (T !== U)
        for (var _ = e.entanglements, O = i & T; O > 0; ) {
          var N = Gi(O), J = 1 << N;
          i |= _[N], O &= ~J;
        }
      return i;
    }
    function Ov(e, t) {
      for (var a = e.eventTimes, i = St; t > 0; ) {
        var u = Gi(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function cc(e, t) {
      switch (e) {
        case Te:
        case ja:
        case Hr:
          return t + 250;
        case Dl:
        case bt:
        case bl:
        case kl:
        case ra:
        case Sr:
        case _l:
        case Lo:
        case Mo:
        case Xs:
        case qs:
        case Ks:
        case Zs:
        case Js:
        case ec:
        case tc:
        case nc:
        case Ol:
        case rc:
          return t + 5e3;
        case oi:
        case ac:
        case No:
        case ic:
        case lc:
          return St;
        case Cu:
        case Tu:
        case Ii:
        case Er:
          return St;
        default:
          return S("Should have found matching lanes. This is a bug in React."), St;
      }
    }
    function ey(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Gi(f), v = 1 << p, m = s[p];
        m === St ? ((v & i) === U || (v & u) !== U) && (s[p] = cc(v, t)) : m <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function ty(e) {
      return Ru(e.pendingLanes);
    }
    function td(e) {
      var t = e.pendingLanes & ~Er;
      return t !== U ? t : t & Er ? Er : U;
    }
    function xu(e) {
      return (e & Te) !== U;
    }
    function Uo(e) {
      return (e & uc) !== U;
    }
    function fc(e) {
      return (e & Ll) === e;
    }
    function ny(e) {
      var t = Te | Hr | bt;
      return (e & t) === U;
    }
    function Lv(e) {
      return (e & Qi) === e;
    }
    function Ao(e, t) {
      var a = ja | Hr | Dl | bt;
      return (t & a) !== U;
    }
    function Mv(e, t) {
      return (t & e.expiredLanes) !== U;
    }
    function nd(e) {
      return (e & Qi) !== U;
    }
    function rd() {
      var e = oc;
      return oc <<= 1, (oc & Qi) === U && (oc = kl), e;
    }
    function ry() {
      var e = sc;
      return sc <<= 1, (sc & Ll) === U && (sc = oi), e;
    }
    function qt(e) {
      return e & -e;
    }
    function an(e) {
      return qt(e);
    }
    function Gi(e) {
      return 31 - Gs(e);
    }
    function dc(e) {
      return Gi(e);
    }
    function Cr(e, t) {
      return (e & t) !== U;
    }
    function Ml(e, t) {
      return (e & t) === t;
    }
    function Me(e, t) {
      return e | t;
    }
    function wu(e, t) {
      return e & ~t;
    }
    function ad(e, t) {
      return e & t;
    }
    function Nv(e) {
      return e;
    }
    function zv(e, t) {
      return e !== Qe && e < t ? e : t;
    }
    function pc(e) {
      for (var t = [], a = 0; a < Dt; a++)
        t.push(e);
      return t;
    }
    function Nl(e, t, a) {
      e.pendingLanes |= t, t !== Ii && (e.suspendedLanes = U, e.pingedLanes = U);
      var i = e.eventTimes, u = dc(t);
      i[u] = a;
    }
    function id(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Gi(i), s = 1 << u;
        a[u] = St, i &= ~s;
      }
    }
    function ld(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function ud(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = U, e.pingedLanes = U, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Gi(f), v = 1 << p;
        i[p] = U, u[p] = St, s[p] = St, f &= ~v;
      }
    }
    function Du(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Gi(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function ay(e, t) {
      var a = qt(t), i;
      switch (a) {
        case Hr:
          i = ja;
          break;
        case bt:
          i = Dl;
          break;
        case kl:
        case ra:
        case Sr:
        case _l:
        case Lo:
        case Mo:
        case Xs:
        case qs:
        case Ks:
        case Zs:
        case Js:
        case ec:
        case tc:
        case nc:
        case Ol:
        case rc:
        case oi:
        case ac:
        case No:
        case ic:
        case lc:
          i = bl;
          break;
        case Ii:
          i = Tu;
          break;
        default:
          i = Qe;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Qe ? Qe : i;
    }
    function od(e, t, a) {
      if (kn)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = dc(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function vc(e, t) {
      if (kn)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = dc(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function sd(e, t) {
      return null;
    }
    var Qn = Te, _n = Hr, si = bt, Ho = Ii, zl = Qe;
    function aa() {
      return zl;
    }
    function ln(e) {
      zl = e;
    }
    function Fo(e, t) {
      var a = zl;
      try {
        return zl = e, t();
      } finally {
        zl = a;
      }
    }
    function In(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function iy(e, t) {
      return e === 0 || e > t ? e : t;
    }
    function cd(e, t) {
      return e !== 0 && e < t;
    }
    function jo(e) {
      var t = qt(e);
      return cd(Qn, t) ? cd(_n, t) ? Uo(t) ? si : Ho : _n : Qn;
    }
    function un(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Uv;
    function ne(e) {
      Uv = e;
    }
    function bu(e) {
      Uv(e);
    }
    var Vo;
    function Av(e) {
      Vo = e;
    }
    var Hv;
    function Bo(e) {
      Hv = e;
    }
    var Po;
    function fd(e) {
      Po = e;
    }
    var dd;
    function Fv(e) {
      dd = e;
    }
    var hc = !1, ku = [], Va = null, Mt = null, Sn = null, ia = /* @__PURE__ */ new Map(), _u = /* @__PURE__ */ new Map(), ci = [], ba = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function jv(e) {
      return ba.indexOf(e) > -1;
    }
    function Ba(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Vv(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Va = null;
          break;
        case "dragenter":
        case "dragleave":
          Mt = null;
          break;
        case "mouseover":
        case "mouseout":
          Sn = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          ia.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          _u.delete(i);
          break;
        }
      }
    }
    function Ou(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = Ba(t, a, i, u, s);
        if (t !== null) {
          var p = Bu(t);
          p !== null && Vo(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function Bv(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Va = Ou(Va, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return Mt = Ou(Mt, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Sn = Ou(Sn, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, m = v.pointerId;
          return ia.set(m, Ou(ia.get(m) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var y = u, x = y.pointerId;
          return _u.set(x, Ou(_u.get(x) || null, e, t, a, i, y)), !0;
        }
      }
      return !1;
    }
    function pd(e) {
      var t = Ko(e.target);
      if (t !== null) {
        var a = zr(t);
        if (a !== null) {
          var i = a.tag;
          if (i === Ve) {
            var u = Pf(a);
            if (u !== null) {
              e.blockedOn = u, dd(e.priority, function() {
                Hv(a);
              });
              return;
            }
          } else if (i === te) {
            var s = a.stateNode;
            if (un(s)) {
              e.blockedOn = Hs(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Pv(e) {
      for (var t = Po(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < ci.length && cd(t, ci[i].priority); i++)
        ;
      ci.splice(i, 0, a), i === 0 && pd(a);
    }
    function mc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Ul(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          Co(s), u.target.dispatchEvent(s), Xm();
        } else {
          var f = Bu(i);
          return f !== null && Vo(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Yo(e, t, a) {
      mc(e) && a.delete(t);
    }
    function vd() {
      hc = !1, Va !== null && mc(Va) && (Va = null), Mt !== null && mc(Mt) && (Mt = null), Sn !== null && mc(Sn) && (Sn = null), ia.forEach(Yo), _u.forEach(Yo);
    }
    function Gn(e, t) {
      e.blockedOn === t && (e.blockedOn = null, hc || (hc = !0, Re.unstable_scheduleCallback(Re.unstable_NormalPriority, vd)));
    }
    function Pe(e) {
      if (ku.length > 0) {
        Gn(ku[0], e);
        for (var t = 1; t < ku.length; t++) {
          var a = ku[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Va !== null && Gn(Va, e), Mt !== null && Gn(Mt, e), Sn !== null && Gn(Sn, e);
      var i = function(p) {
        return Gn(p, e);
      };
      ia.forEach(i), _u.forEach(i);
      for (var u = 0; u < ci.length; u++) {
        var s = ci[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; ci.length > 0; ) {
        var f = ci[0];
        if (f.blockedOn !== null)
          break;
        pd(f), f.blockedOn === null && ci.shift();
      }
    }
    var At = M.ReactCurrentBatchConfig, Bt = !0;
    function En(e) {
      Bt = !!e;
    }
    function Fr() {
      return Bt;
    }
    function Lu(e, t, a) {
      var i = er(t), u;
      switch (i) {
        case Qn:
          u = on;
          break;
        case _n:
          u = $o;
          break;
        case si:
        default:
          u = fi;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function on(e, t, a, i) {
      var u = aa(), s = At.transition;
      At.transition = null;
      try {
        ln(Qn), fi(e, t, a, i);
      } finally {
        ln(u), At.transition = s;
      }
    }
    function $o(e, t, a, i) {
      var u = aa(), s = At.transition;
      At.transition = null;
      try {
        ln(_n), fi(e, t, a, i);
      } finally {
        ln(u), At.transition = s;
      }
    }
    function fi(e, t, a, i) {
      Bt && yc(e, t, a, i);
    }
    function yc(e, t, a, i) {
      var u = Ul(e, t, a, i);
      if (u === null) {
        wy(e, t, i, Mu, a), Vv(e, i);
        return;
      }
      if (Bv(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Vv(e, i), t & yl && jv(e)) {
        for (; u !== null; ) {
          var s = Bu(u);
          s !== null && bu(s);
          var f = Ul(e, t, a, i);
          if (f === null && wy(e, t, i, Mu, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      wy(e, t, i, null, a);
    }
    var Mu = null;
    function Ul(e, t, a, i) {
      Mu = null;
      var u = Ms(i), s = Ko(u);
      if (s !== null) {
        var f = zr(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === Ve) {
            var v = Pf(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === te) {
            var m = f.stateNode;
            if (un(m))
              return Hs(f);
            s = null;
          } else
            f !== s && (s = null);
        }
      }
      return Mu = s, null;
    }
    function er(e) {
      switch (e) {
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
        case "selectstart":
          return Qn;
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
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return _n;
        case "message": {
          var t = Qf();
          switch (t) {
            case Bs:
              return Qn;
            case Ar:
              return _n;
            case Fa:
            case Ps:
              return si;
            case ji:
              return Ho;
            default:
              return si;
          }
        }
        default:
          return si;
      }
    }
    function hd(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function Nu(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function di(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function gc(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Al = null, Pa = null, Wi = null;
    function Xi(e) {
      return Al = e, Pa = Ec(), !0;
    }
    function Sc() {
      Al = null, Pa = null, Wi = null;
    }
    function zu() {
      if (Wi)
        return Wi;
      var e, t = Pa, a = t.length, i, u = Ec(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Wi = u.slice(e, p), Wi;
    }
    function Ec() {
      return "value" in Al ? Al.value : Al.textContent;
    }
    function Hl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Fl() {
      return !0;
    }
    function Wn() {
      return !1;
    }
    function Kt(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var m = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return m ? this.isDefaultPrevented = Fl : this.isDefaultPrevented = Wn, this.isPropagationStopped = Wn, this;
      }
      return Be(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Fl);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Fl);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Fl
      }), t;
    }
    var Xn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, qn = Kt(Xn), Uu = Be({}, Xn, {
      view: 0,
      detail: 0
    }), md = Kt(Uu), Qo, yd, la;
    function Yv(e) {
      e !== la && (la && e.type === "mousemove" ? (Qo = e.screenX - la.screenX, yd = e.screenY - la.screenY) : (Qo = 0, yd = 0), la = e);
    }
    var Au = Be({}, Uu, {
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
      getModifierState: Rc,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Yv(e), Qo);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : yd;
      }
    }), qi = Kt(Au), gd = Be({}, Au, {
      dataTransfer: 0
    }), jl = Kt(gd), $v = Be({}, Uu, {
      relatedTarget: 0
    }), Cc = Kt($v), Sd = Be({}, Xn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Tc = Kt(Sd), ly = Be({}, Xn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), uy = Kt(ly), Qv = Be({}, Xn, {
      data: 0
    }), Ed = Kt(Qv), Vl = Ed, oy = {
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
    }, Hu = {
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
    };
    function Iv(e) {
      if (e.key) {
        var t = oy[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Hl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Hu[e.keyCode] || "Unidentified" : "";
    }
    var Pt = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function sy(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Pt[e];
      return i ? !!a[i] : !1;
    }
    function Rc(e) {
      return sy;
    }
    var cy = Be({}, Uu, {
      key: Iv,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Rc,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Hl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Hl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), fy = Kt(cy), Gv = Be({}, Au, {
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
    }), Cd = Kt(Gv), dy = Be({}, Uu, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Rc
    }), ua = Kt(dy), Td = Be({}, Xn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), py = Kt(Td), Ki = Be({}, Au, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), xc = Kt(Ki), Bl = [9, 13, 27, 32], Io = 229, Go = dn && "CompositionEvent" in window, Pl = null;
    dn && "documentMode" in document && (Pl = document.documentMode);
    var vy = dn && "TextEvent" in window && !Pl, wc = dn && (!Go || Pl && Pl > 8 && Pl <= 11), Wv = 32, Rd = String.fromCharCode(Wv);
    function Xv() {
      fr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), fr("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), fr("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), fr("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Wo = !1;
    function Dc(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function qv(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function xd(e, t) {
      return e === "keydown" && t.keyCode === Io;
    }
    function Kv(e, t) {
      switch (e) {
        case "keyup":
          return Bl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Io;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function wd(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function bc(e) {
      return e.locale === "ko";
    }
    var pi = !1;
    function Dd(e, t, a, i, u) {
      var s, f;
      if (Go ? s = qv(t) : pi ? Kv(t, i) && (s = "onCompositionEnd") : xd(t, i) && (s = "onCompositionStart"), !s)
        return null;
      wc && !bc(i) && (!pi && s === "onCompositionStart" ? pi = Xi(u) : s === "onCompositionEnd" && pi && (f = zu()));
      var p = nh(a, s);
      if (p.length > 0) {
        var v = new Ed(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var m = wd(i);
          m !== null && (v.data = m);
        }
      }
    }
    function kc(e, t) {
      switch (e) {
        case "compositionend":
          return wd(t);
        case "keypress":
          var a = t.which;
          return a !== Wv ? null : (Wo = !0, Rd);
        case "textInput":
          var i = t.data;
          return i === Rd && Wo ? null : i;
        default:
          return null;
      }
    }
    function Zv(e, t) {
      if (pi) {
        if (e === "compositionend" || !Go && Kv(e, t)) {
          var a = zu();
          return Sc(), pi = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Dc(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return wc && !bc(t) ? null : t.data;
        default:
          return null;
      }
    }
    function hy(e, t, a, i, u) {
      var s;
      if (vy ? s = kc(t, i) : s = Zv(t, i), !s)
        return null;
      var f = nh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new Vl("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function _c(e, t, a, i, u, s, f) {
      Dd(e, t, a, i, u), hy(e, t, a, i, u);
    }
    var my = {
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
    function Fu(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!my[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function yy(e) {
      if (!dn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Oc() {
      fr("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function n(e, t, a, i) {
      Ns(i);
      var u = nh(t, "onChange");
      if (u.length > 0) {
        var s = new qn("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var r = null, l = null;
    function o(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function c(e) {
      var t = [];
      n(t, l, e, Ms(e)), zf(d, t);
    }
    function d(e) {
      x0(e, 0);
    }
    function h(e) {
      var t = Ac(e);
      if (Fp(t))
        return e;
    }
    function g(e, t) {
      if (e === "change")
        return t;
    }
    var C = !1;
    dn && (C = yy("input") && (!document.documentMode || document.documentMode > 9));
    function L(e, t) {
      r = e, l = t, r.attachEvent("onpropertychange", V);
    }
    function F() {
      r && (r.detachEvent("onpropertychange", V), r = null, l = null);
    }
    function V(e) {
      e.propertyName === "value" && h(l) && c(e);
    }
    function H(e, t, a) {
      e === "focusin" ? (F(), L(t, a)) : e === "focusout" && F();
    }
    function q(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return h(l);
    }
    function re(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function ue(e, t) {
      if (e === "click")
        return h(t);
    }
    function Qt(e, t) {
      if (e === "input" || e === "change")
        return h(t);
    }
    function w(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Li(e, "number", e.value);
    }
    function R(e, t, a, i, u, s, f) {
      var p = a ? Ac(a) : window, v, m;
      if (o(p) ? v = g : Fu(p) ? C ? v = Qt : (v = q, m = H) : re(p) && (v = ue), v) {
        var y = v(t, a);
        if (y) {
          n(e, y, i, u);
          return;
        }
      }
      m && m(t, p, a), t === "focusout" && w(p);
    }
    function k() {
      Qr("onMouseEnter", ["mouseout", "mouseover"]), Qr("onMouseLeave", ["mouseout", "mouseover"]), Qr("onPointerEnter", ["pointerout", "pointerover"]), Qr("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function P(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !hv(i)) {
        var m = i.relatedTarget || i.fromElement;
        if (m && (Ko(m) || Vd(m)))
          return;
      }
      if (!(!v && !p)) {
        var y;
        if (u.window === u)
          y = u;
        else {
          var x = u.ownerDocument;
          x ? y = x.defaultView || x.parentWindow : y = window;
        }
        var T, _;
        if (v) {
          var O = i.relatedTarget || i.toElement;
          if (T = a, _ = O ? Ko(O) : null, _ !== null) {
            var N = zr(_);
            (_ !== N || _.tag !== le && _.tag !== Ue) && (_ = null);
          }
        } else
          T = null, _ = a;
        if (T !== _) {
          var J = qi, me = "onMouseLeave", fe = "onMouseEnter", Ge = "mouse";
          (t === "pointerout" || t === "pointerover") && (J = Cd, me = "onPointerLeave", fe = "onPointerEnter", Ge = "pointer");
          var Ye = T == null ? y : Ac(T), D = _ == null ? y : Ac(_), z = new J(me, Ge + "leave", T, i, u);
          z.target = Ye, z.relatedTarget = D;
          var b = null, B = Ko(u);
          if (B === a) {
            var ee = new J(fe, Ge + "enter", _, i, u);
            ee.target = D, ee.relatedTarget = Ye, b = ee;
          }
          ST(e, z, b, T, _);
        }
      }
    }
    function oe(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ae = typeof Object.is == "function" ? Object.is : oe;
    function pe(e, t) {
      if (ae(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!Vn.call(t, s) || !ae(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function De(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Cn(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Xe(e, t) {
      for (var a = De(e), i = 0, u = 0; a; ) {
        if (a.nodeType === ei) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = De(Cn(a));
      }
    }
    function Zi(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return gy(e, u, s, f, p);
    }
    function gy(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, m = 0, y = e, x = null;
      e:
        for (; ; ) {
          for (var T = null; y === t && (a === 0 || y.nodeType === ei) && (f = s + a), y === i && (u === 0 || y.nodeType === ei) && (p = s + u), y.nodeType === ei && (s += y.nodeValue.length), (T = y.firstChild) !== null; )
            x = y, y = T;
          for (; ; ) {
            if (y === e)
              break e;
            if (x === t && ++v === a && (f = s), x === i && ++m === u && (p = s), (T = y.nextSibling) !== null)
              break;
            y = x, x = y.parentNode;
          }
          y = T;
        }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function eT(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var m = Xe(e, f), y = Xe(e, p);
        if (m && y) {
          if (u.rangeCount === 1 && u.anchorNode === m.node && u.anchorOffset === m.offset && u.focusNode === y.node && u.focusOffset === y.offset)
            return;
          var x = a.createRange();
          x.setStart(m.node, m.offset), u.removeAllRanges(), f > p ? (u.addRange(x), u.extend(y.node, y.offset)) : (x.setEnd(y.node, y.offset), u.addRange(x));
        }
      }
    }
    function d0(e) {
      return e && e.nodeType === ei;
    }
    function p0(e, t) {
      return !e || !t ? !1 : e === t ? !0 : d0(e) ? !1 : d0(t) ? p0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function tT(e) {
      return e && e.ownerDocument && p0(e.ownerDocument.documentElement, e);
    }
    function nT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function v0() {
      for (var e = window, t = Ss(); t instanceof e.HTMLIFrameElement; ) {
        if (nT(t))
          e = t.contentWindow;
        else
          return t;
        t = Ss(e.document);
      }
      return t;
    }
    function Sy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function rT() {
      var e = v0();
      return {
        focusedElem: e,
        selectionRange: Sy(e) ? iT(e) : null
      };
    }
    function aT(e) {
      var t = v0(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && tT(a)) {
        i !== null && Sy(a) && lT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === pr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function iT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Zi(e), t || {
        start: 0,
        end: 0
      };
    }
    function lT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : eT(e, t);
    }
    var uT = dn && "documentMode" in document && document.documentMode <= 11;
    function oT() {
      fr("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Lc = null, Ey = null, bd = null, Cy = !1;
    function sT(e) {
      if ("selectionStart" in e && Sy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function cT(e) {
      return e.window === e ? e.document : e.nodeType === Ra ? e : e.ownerDocument;
    }
    function h0(e, t, a) {
      var i = cT(a);
      if (!(Cy || Lc == null || Lc !== Ss(i))) {
        var u = sT(Lc);
        if (!bd || !pe(bd, u)) {
          bd = u;
          var s = nh(Ey, "onSelect");
          if (s.length > 0) {
            var f = new qn("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = Lc;
          }
        }
      }
    }
    function fT(e, t, a, i, u, s, f) {
      var p = a ? Ac(a) : window;
      switch (t) {
        case "focusin":
          (Fu(p) || p.contentEditable === "true") && (Lc = p, Ey = a, bd = null);
          break;
        case "focusout":
          Lc = null, Ey = null, bd = null;
          break;
        case "mousedown":
          Cy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Cy = !1, h0(e, i, u);
          break;
        case "selectionchange":
          if (uT)
            break;
        case "keydown":
        case "keyup":
          h0(e, i, u);
      }
    }
    function Jv(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Mc = {
      animationend: Jv("Animation", "AnimationEnd"),
      animationiteration: Jv("Animation", "AnimationIteration"),
      animationstart: Jv("Animation", "AnimationStart"),
      transitionend: Jv("Transition", "TransitionEnd")
    }, Ty = {}, m0 = {};
    dn && (m0 = document.createElement("div").style, "AnimationEvent" in window || (delete Mc.animationend.animation, delete Mc.animationiteration.animation, delete Mc.animationstart.animation), "TransitionEvent" in window || delete Mc.transitionend.transition);
    function eh(e) {
      if (Ty[e])
        return Ty[e];
      if (!Mc[e])
        return e;
      var t = Mc[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in m0)
          return Ty[e] = t[a];
      return e;
    }
    var y0 = eh("animationend"), g0 = eh("animationiteration"), S0 = eh("animationstart"), E0 = eh("transitionend"), C0 = /* @__PURE__ */ new Map(), T0 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function ju(e, t) {
      C0.set(e, t), fr(t, [e]);
    }
    function dT() {
      for (var e = 0; e < T0.length; e++) {
        var t = T0[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        ju(a, "on" + i);
      }
      ju(y0, "onAnimationEnd"), ju(g0, "onAnimationIteration"), ju(S0, "onAnimationStart"), ju("dblclick", "onDoubleClick"), ju("focusin", "onFocus"), ju("focusout", "onBlur"), ju(E0, "onTransitionEnd");
    }
    function pT(e, t, a, i, u, s, f) {
      var p = C0.get(t);
      if (p !== void 0) {
        var v = qn, m = t;
        switch (t) {
          case "keypress":
            if (Hl(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = fy;
            break;
          case "focusin":
            m = "focus", v = Cc;
            break;
          case "focusout":
            m = "blur", v = Cc;
            break;
          case "beforeblur":
          case "afterblur":
            v = Cc;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = qi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = jl;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = ua;
            break;
          case y0:
          case g0:
          case S0:
            v = Tc;
            break;
          case E0:
            v = py;
            break;
          case "scroll":
            v = md;
            break;
          case "wheel":
            v = xc;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = uy;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Cd;
            break;
        }
        var y = (s & yl) !== 0;
        {
          var x = !y && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", T = yT(a, p, i.type, y, x);
          if (T.length > 0) {
            var _ = new v(p, m, null, i, u);
            e.push({
              event: _,
              listeners: T
            });
          }
        }
      }
    }
    dT(), k(), Oc(), oT(), Xv();
    function vT(e, t, a, i, u, s, f) {
      pT(e, t, a, i, u, s);
      var p = (s & Wm) === 0;
      p && (P(e, t, a, i, u), R(e, t, a, i, u), fT(e, t, a, i, u), _c(e, t, a, i, u));
    }
    var kd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Ry = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(kd));
    function R0(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, ai(i, t, void 0, e), e.currentTarget = null;
    }
    function hT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          R0(e, v, p), i = f;
        }
      else
        for (var m = 0; m < t.length; m++) {
          var y = t[m], x = y.instance, T = y.currentTarget, _ = y.listener;
          if (x !== i && e.isPropagationStopped())
            return;
          R0(e, _, T), i = x;
        }
    }
    function x0(e, t) {
      for (var a = (t & yl) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        hT(s, f, a);
      }
      Ff();
    }
    function mT(e, t, a, i, u) {
      var s = Ms(a), f = [];
      vT(f, e, i, a, s, t), x0(f, t);
    }
    function Ht(e, t) {
      Ry.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = IR(t), u = ET(e, a);
      i.has(u) || (w0(t, e, So, a), i.add(u));
    }
    function xy(e, t, a) {
      Ry.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= yl), w0(a, e, i, t);
    }
    var th = "_reactListening" + Math.random().toString(36).slice(2);
    function _d(e) {
      if (!e[th]) {
        e[th] = !0, jn.forEach(function(a) {
          a !== "selectionchange" && (Ry.has(a) || xy(a, !1, e), xy(a, !0, e));
        });
        var t = e.nodeType === Ra ? e : e.ownerDocument;
        t !== null && (t[th] || (t[th] = !0, xy("selectionchange", !1, t)));
      }
    }
    function w0(e, t, a, i, u) {
      var s = Lu(e, t, a), f = void 0;
      xo && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? di(e, t, s, f) : Nu(e, t, s) : f !== void 0 ? gc(e, t, s, f) : hd(e, t, s);
    }
    function D0(e, t) {
      return e === t || e.nodeType === Xt && e.parentNode === t;
    }
    function wy(e, t, a, i, u) {
      var s = i;
      if (!(t & ni) && !(t & So)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e:
            for (; ; ) {
              if (p === null)
                return;
              var v = p.tag;
              if (v === te || v === de) {
                var m = p.stateNode.containerInfo;
                if (D0(m, f))
                  break;
                if (v === de)
                  for (var y = p.return; y !== null; ) {
                    var x = y.tag;
                    if (x === te || x === de) {
                      var T = y.stateNode.containerInfo;
                      if (D0(T, f))
                        return;
                    }
                    y = y.return;
                  }
                for (; m !== null; ) {
                  var _ = Ko(m);
                  if (_ === null)
                    return;
                  var O = _.tag;
                  if (O === le || O === Ue) {
                    p = s = _;
                    continue e;
                  }
                  m = m.parentNode;
                }
              }
              p = p.return;
            }
        }
      }
      zf(function() {
        return mT(e, t, a, s);
      });
    }
    function Od(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function yT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], m = e, y = null; m !== null; ) {
        var x = m, T = x.stateNode, _ = x.tag;
        if (_ === le && T !== null && (y = T, p !== null)) {
          var O = Sl(m, p);
          O != null && v.push(Od(m, O, y));
        }
        if (u)
          break;
        m = m.return;
      }
      return v;
    }
    function nh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === le && f !== null) {
          var v = f, m = Sl(u, a);
          m != null && i.unshift(Od(u, m, v));
          var y = Sl(u, t);
          y != null && i.push(Od(u, y, v));
        }
        u = u.return;
      }
      return i;
    }
    function Nc(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== le);
      return e || null;
    }
    function gT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = Nc(s))
        u++;
      for (var f = 0, p = i; p; p = Nc(p))
        f++;
      for (; u - f > 0; )
        a = Nc(a), u--;
      for (; f - u > 0; )
        i = Nc(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = Nc(a), i = Nc(i);
      }
      return null;
    }
    function b0(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, m = v.alternate, y = v.stateNode, x = v.tag;
        if (m !== null && m === i)
          break;
        if (x === le && y !== null) {
          var T = y;
          if (u) {
            var _ = Sl(p, s);
            _ != null && f.unshift(Od(p, _, T));
          } else if (!u) {
            var O = Sl(p, s);
            O != null && f.push(Od(p, O, T));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function ST(e, t, a, i, u) {
      var s = i && u ? gT(i, u) : null;
      i !== null && b0(e, t, i, s, !1), u !== null && a !== null && b0(e, a, u, s, !0);
    }
    function ET(e, t) {
      return e + "__" + (t ? "capture" : "bubble");
    }
    var oa = !1, Ld = "dangerouslySetInnerHTML", rh = "suppressContentEditableWarning", Vu = "suppressHydrationWarning", k0 = "autoFocus", Xo = "children", qo = "style", ah = "__html", Dy, ih, Md, _0, lh, O0, L0;
    Dy = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, ih = function(e, t) {
      Ls(e, t), _f(e, t), vv(e, t, {
        registrationNameDependencies: cr,
        possibleRegistrationNames: Ma
      });
    }, O0 = dn && !document.documentMode, Md = function(e, t, a) {
      if (!oa) {
        var i = uh(a), u = uh(t);
        u !== i && (oa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, _0 = function(e) {
      if (!oa) {
        oa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, lh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, L0 = function(e, t) {
      var a = e.namespaceURI === Ja ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var CT = /\r\n?/g, TT = /\u0000|\uFFFD/g;
    function uh(e) {
      ma(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(CT, `
`).replace(TT, "");
    }
    function oh(e, t, a, i) {
      var u = uh(t), s = uh(e);
      if (s !== u && (i && (oa || (oa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Kn))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function M0(e) {
      return e.nodeType === Ra ? e : e.ownerDocument;
    }
    function RT() {
    }
    function sh(e) {
      e.onclick = RT;
    }
    function xT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === qo)
            f && Object.freeze(f), av(t, f);
          else if (s === Ld) {
            var p = f ? f[ah] : void 0;
            p != null && Gp(t, p);
          } else if (s === Xo)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && bs(t, f);
            } else
              typeof f == "number" && bs(t, "" + f);
          else
            s === rh || s === Vu || s === k0 || (cr.hasOwnProperty(s) ? f != null && (typeof f != "function" && lh(s, f), s === "onScroll" && Ht("scroll", t)) : f != null && Ua(t, s, f, u));
        }
    }
    function wT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === qo ? av(e, f) : s === Ld ? Gp(e, f) : s === Xo ? bs(e, f) : Ua(e, s, f, i);
      }
    }
    function DT(e, t, a, i) {
      var u, s = M0(a), f, p = i;
      if (p === Ja && (p = ws(e)), p === Ja) {
        if (u = ti(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var m = v.firstChild;
          f = v.removeChild(m);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var y = f;
          t.multiple ? y.multiple = !0 : t.size && (y.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Ja && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Vn.call(Dy, e) && (Dy[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function bT(e, t) {
      return M0(t).createTextNode(e);
    }
    function kT(e, t, a, i) {
      var u = ti(t, a);
      ih(t, a);
      var s;
      switch (t) {
        case "dialog":
          Ht("cancel", e), Ht("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Ht("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < kd.length; f++)
            Ht(kd[f], e);
          s = a;
          break;
        case "source":
          Ht("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          Ht("error", e), Ht("load", e), s = a;
          break;
        case "details":
          Ht("toggle", e), s = a;
          break;
        case "input":
          po(e, a), s = fo(e, a), Ht("invalid", e);
          break;
        case "option":
          Rs(e, a), s = a;
          break;
        case "select":
          Yp(e, a), s = gf(e, a), Ht("invalid", e);
          break;
        case "textarea":
          $p(e, a), s = Ef(e, a), Ht("invalid", e);
          break;
        default:
          s = a;
      }
      switch (_s(t, s), xT(t, e, i, s, u), t) {
        case "input":
          vl(e), vo(e, a, !1);
          break;
        case "textarea":
          vl(e), Ip(e);
          break;
        case "option":
          yf(e, a);
          break;
        case "select":
          Hm(e, a);
          break;
        default:
          typeof s.onClick == "function" && sh(e);
          break;
      }
    }
    function _T(e, t, a, i, u) {
      ih(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = fo(e, a), p = fo(e, i), s = [];
          break;
        case "select":
          f = gf(e, a), p = gf(e, i), s = [];
          break;
        case "textarea":
          f = Ef(e, a), p = Ef(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && sh(e);
          break;
      }
      _s(t, p);
      var v, m, y = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === qo) {
            var x = f[v];
            for (m in x)
              x.hasOwnProperty(m) && (y || (y = {}), y[m] = "");
          } else
            v === Ld || v === Xo || v === rh || v === Vu || v === k0 || (cr.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var T = p[v], _ = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || T === _ || T == null && _ == null))
          if (v === qo)
            if (T && Object.freeze(T), _) {
              for (m in _)
                _.hasOwnProperty(m) && (!T || !T.hasOwnProperty(m)) && (y || (y = {}), y[m] = "");
              for (m in T)
                T.hasOwnProperty(m) && _[m] !== T[m] && (y || (y = {}), y[m] = T[m]);
            } else
              y || (s || (s = []), s.push(v, y)), y = T;
          else if (v === Ld) {
            var O = T ? T[ah] : void 0, N = _ ? _[ah] : void 0;
            O != null && N !== O && (s = s || []).push(v, O);
          } else
            v === Xo ? (typeof T == "string" || typeof T == "number") && (s = s || []).push(v, "" + T) : v === rh || v === Vu || (cr.hasOwnProperty(v) ? (T != null && (typeof T != "function" && lh(v, T), v === "onScroll" && Ht("scroll", e)), !s && _ !== T && (s = [])) : (s = s || []).push(v, T));
      }
      return y && (yo(y, p[qo]), (s = s || []).push(qo, y)), s;
    }
    function OT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && mf(e, u);
      var s = ti(a, i), f = ti(a, u);
      switch (wT(e, t, s, f), a) {
        case "input":
          ou(e, u);
          break;
        case "textarea":
          Qp(e, u);
          break;
        case "select":
          Fm(e, u);
          break;
      }
    }
    function LT(e) {
      {
        var t = e.toLowerCase();
        return Os.hasOwnProperty(t) && Os[t] || null;
      }
    }
    function MT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = ti(t, a), ih(t, a), t) {
        case "dialog":
          Ht("cancel", e), Ht("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Ht("load", e);
          break;
        case "video":
        case "audio":
          for (var m = 0; m < kd.length; m++)
            Ht(kd[m], e);
          break;
        case "source":
          Ht("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Ht("error", e), Ht("load", e);
          break;
        case "details":
          Ht("toggle", e);
          break;
        case "input":
          po(e, a), Ht("invalid", e);
          break;
        case "option":
          Rs(e, a);
          break;
        case "select":
          Yp(e, a), Ht("invalid", e);
          break;
        case "textarea":
          $p(e, a), Ht("invalid", e);
          break;
      }
      _s(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var y = e.attributes, x = 0; x < y.length; x++) {
          var T = y[x].name.toLowerCase();
          switch (T) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(y[x].name);
          }
        }
      }
      var _ = null;
      for (var O in a)
        if (a.hasOwnProperty(O)) {
          var N = a[O];
          if (O === Xo)
            typeof N == "string" ? e.textContent !== N && (a[Vu] !== !0 && oh(e.textContent, N, s, f), _ = [Xo, N]) : typeof N == "number" && e.textContent !== "" + N && (a[Vu] !== !0 && oh(e.textContent, N, s, f), _ = [Xo, "" + N]);
          else if (cr.hasOwnProperty(O))
            N != null && (typeof N != "function" && lh(O, N), O === "onScroll" && Ht("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var J = void 0, me = p && wn ? null : Or(O);
            if (a[Vu] !== !0) {
              if (!(O === rh || O === Vu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              O === "value" || O === "checked" || O === "selected")) {
                if (O === Ld) {
                  var fe = e.innerHTML, Ge = N ? N[ah] : void 0;
                  if (Ge != null) {
                    var Ye = L0(e, Ge);
                    Ye !== fe && Md(O, fe, Ye);
                  }
                } else if (O === qo) {
                  if (v.delete(O), O0) {
                    var D = Im(N);
                    J = e.getAttribute("style"), D !== J && Md(O, J, D);
                  }
                } else if (p && !wn)
                  v.delete(O.toLowerCase()), J = au(e, O, N), N !== J && Md(O, J, N);
                else if (!Yt(O, me, p) && !Et(O, N, me, p)) {
                  var z = !1;
                  if (me !== null)
                    v.delete(me.attributeName), J = fl(e, O, N, me);
                  else {
                    var b = i;
                    if (b === Ja && (b = ws(t)), b === Ja)
                      v.delete(O.toLowerCase());
                    else {
                      var B = LT(O);
                      B !== null && B !== O && (z = !0, v.delete(B)), v.delete(O);
                    }
                    J = au(e, O, N);
                  }
                  var ee = wn;
                  !ee && N !== J && !z && Md(O, J, N);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Vu] !== !0 && _0(v), t) {
        case "input":
          vl(e), vo(e, a, !0);
          break;
        case "textarea":
          vl(e), Ip(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && sh(e);
          break;
      }
      return _;
    }
    function NT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function by(e, t) {
      {
        if (oa)
          return;
        oa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function ky(e, t) {
      {
        if (oa)
          return;
        oa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function _y(e, t, a) {
      {
        if (oa)
          return;
        oa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Oy(e, t) {
      {
        if (t === "" || oa)
          return;
        oa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function zT(e, t, a) {
      switch (t) {
        case "input":
          jp(e, a);
          return;
        case "textarea":
          Cf(e, a);
          return;
        case "select":
          jm(e, a);
          return;
      }
    }
    var Nd = function() {
    }, zd = function() {
    };
    {
      var UT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], N0 = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], AT = N0.concat(["button"]), HT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], z0 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      zd = function(e, t) {
        var a = Be({}, e || z0), i = {
          tag: t
        };
        return N0.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), AT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), UT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var FT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return HT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, jT = function(e, t) {
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
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, U0 = {};
      Nd = function(e, t, a) {
        a = a || z0;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = FT(e, u) ? null : i, f = s ? null : jT(e, a), p = s || f;
        if (p) {
          var v = p.tag, m = !!s + "|" + e + "|" + v;
          if (!U0[m]) {
            U0[m] = !0;
            var y = e, x = "";
            if (e === "#text" ? /\S/.test(t) ? y = "Text nodes" : (y = "Whitespace text nodes", x = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : y = "<" + e + ">", s) {
              var T = "";
              v === "table" && e === "tr" && (T += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", y, v, x, T);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", y, v);
          }
        }
      };
    }
    var ch = "suppressHydrationWarning", fh = "$", dh = "/$", Ud = "$?", Ad = "$!", VT = "style", Ly = null, My = null;
    function BT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Ra:
        case hl: {
          t = i === Ra ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Rf(null, "");
          break;
        }
        default: {
          var s = i === Xt ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = Rf(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = zd(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function PT(e, t, a) {
      {
        var i = e, u = Rf(i.namespace, t), s = zd(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function Zb(e) {
      return e;
    }
    function YT(e) {
      Ly = Fr(), My = rT();
      var t = null;
      return En(!1), t;
    }
    function $T(e) {
      aT(My), En(Ly), Ly = null, My = null;
    }
    function QT(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (Nd(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = zd(f.ancestorInfo, e);
          Nd(null, p, v);
        }
        s = f.namespace;
      }
      var m = DT(e, t, a, s);
      return jd(u, m), Vy(m, t), m;
    }
    function IT(e, t) {
      e.appendChild(t);
    }
    function GT(e, t, a, i, u) {
      switch (kT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function WT(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = zd(f.ancestorInfo, t);
          Nd(null, p, v);
        }
      }
      return _T(e, t, a, i);
    }
    function Ny(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function XT(e, t, a, i) {
      {
        var u = a;
        Nd(null, e, u.ancestorInfo);
      }
      var s = bT(e, t);
      return jd(i, s), s;
    }
    function qT() {
      var e = window.event;
      return e === void 0 ? si : er(e.type);
    }
    var zy = typeof setTimeout == "function" ? setTimeout : void 0, KT = typeof clearTimeout == "function" ? clearTimeout : void 0, Uy = -1, A0 = typeof Promise == "function" ? Promise : void 0, ZT = typeof queueMicrotask == "function" ? queueMicrotask : typeof A0 < "u" ? function(e) {
      return A0.resolve(null).then(e).catch(JT);
    } : zy;
    function JT(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function eR(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function tR(e, t, a, i, u, s) {
      OT(e, t, a, i, u), Vy(e, u);
    }
    function H0(e) {
      bs(e, "");
    }
    function nR(e, t, a) {
      e.nodeValue = a;
    }
    function rR(e, t) {
      e.appendChild(t);
    }
    function aR(e, t) {
      var a;
      e.nodeType === Xt ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && sh(a);
    }
    function iR(e, t, a) {
      e.insertBefore(t, a);
    }
    function lR(e, t, a) {
      e.nodeType === Xt ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function uR(e, t) {
      e.removeChild(t);
    }
    function oR(e, t) {
      e.nodeType === Xt ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Ay(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Xt) {
          var s = u.data;
          if (s === dh)
            if (i === 0) {
              e.removeChild(u), Pe(t);
              return;
            } else
              i--;
          else
            (s === fh || s === Ud || s === Ad) && i++;
        }
        a = u;
      } while (a);
      Pe(t);
    }
    function sR(e, t) {
      e.nodeType === Xt ? Ay(e.parentNode, t) : e.nodeType === pr && Ay(e, t), Pe(e);
    }
    function cR(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function fR(e) {
      e.nodeValue = "";
    }
    function dR(e, t) {
      e = e;
      var a = t[VT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = ks("display", i);
    }
    function pR(e, t) {
      e.nodeValue = t;
    }
    function vR(e) {
      e.nodeType === pr ? e.textContent = "" : e.nodeType === Ra && e.documentElement && e.removeChild(e.documentElement);
    }
    function hR(e, t, a) {
      return e.nodeType !== pr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function mR(e, t) {
      return t === "" || e.nodeType !== ei ? null : e;
    }
    function yR(e) {
      return e.nodeType !== Xt ? null : e;
    }
    function F0(e) {
      return e.data === Ud;
    }
    function Hy(e) {
      return e.data === Ad;
    }
    function gR(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function SR(e, t) {
      e._reactRetry = t;
    }
    function ph(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === pr || t === ei)
          break;
        if (t === Xt) {
          var a = e.data;
          if (a === fh || a === Ad || a === Ud)
            break;
          if (a === dh)
            return null;
        }
      }
      return e;
    }
    function Hd(e) {
      return ph(e.nextSibling);
    }
    function ER(e) {
      return ph(e.firstChild);
    }
    function CR(e) {
      return ph(e.firstChild);
    }
    function TR(e) {
      return ph(e.nextSibling);
    }
    function RR(e, t, a, i, u, s, f) {
      jd(s, e), Vy(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var m = (s.mode & Fe) !== Se;
      return MT(e, t, a, p, i, m, f);
    }
    function xR(e, t, a, i) {
      return jd(a, e), a.mode & Fe, NT(e, t);
    }
    function wR(e, t) {
      jd(t, e);
    }
    function DR(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Xt) {
          var i = t.data;
          if (i === dh) {
            if (a === 0)
              return Hd(t);
            a--;
          } else
            (i === fh || i === Ad || i === Ud) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function j0(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Xt) {
          var i = t.data;
          if (i === fh || i === Ad || i === Ud) {
            if (a === 0)
              return t;
            a--;
          } else
            i === dh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function bR(e) {
      Pe(e);
    }
    function kR(e) {
      Pe(e);
    }
    function _R(e) {
      return e !== "head" && e !== "body";
    }
    function OR(e, t, a, i) {
      var u = !0;
      oh(t.nodeValue, a, i, u);
    }
    function LR(e, t, a, i, u, s) {
      if (t[ch] !== !0) {
        var f = !0;
        oh(i.nodeValue, u, s, f);
      }
    }
    function MR(e, t) {
      t.nodeType === pr ? by(e, t) : t.nodeType === Xt || ky(e, t);
    }
    function NR(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === pr ? by(a, t) : t.nodeType === Xt || ky(a, t));
      }
    }
    function zR(e, t, a, i, u) {
      (u || t[ch] !== !0) && (i.nodeType === pr ? by(a, i) : i.nodeType === Xt || ky(a, i));
    }
    function UR(e, t, a) {
      _y(e, t);
    }
    function AR(e, t) {
      Oy(e, t);
    }
    function HR(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && _y(i, t);
      }
    }
    function FR(e, t) {
      {
        var a = e.parentNode;
        a !== null && Oy(a, t);
      }
    }
    function jR(e, t, a, i, u, s) {
      (s || t[ch] !== !0) && _y(a, i);
    }
    function VR(e, t, a, i, u) {
      (u || t[ch] !== !0) && Oy(a, i);
    }
    function BR(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function PR(e) {
      _d(e);
    }
    var zc = Math.random().toString(36).slice(2), Uc = "__reactFiber$" + zc, Fy = "__reactProps$" + zc, Fd = "__reactContainer$" + zc, jy = "__reactEvents$" + zc, YR = "__reactListeners$" + zc, $R = "__reactHandles$" + zc;
    function QR(e) {
      delete e[Uc], delete e[Fy], delete e[jy], delete e[YR], delete e[$R];
    }
    function jd(e, t) {
      t[Uc] = e;
    }
    function vh(e, t) {
      t[Fd] = e;
    }
    function V0(e) {
      e[Fd] = null;
    }
    function Vd(e) {
      return !!e[Fd];
    }
    function Ko(e) {
      var t = e[Uc];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Fd] || a[Uc], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = j0(e); u !== null; ) {
              var s = u[Uc];
              if (s)
                return s;
              u = j0(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Bu(e) {
      var t = e[Uc] || e[Fd];
      return t && (t.tag === le || t.tag === Ue || t.tag === Ve || t.tag === te) ? t : null;
    }
    function Ac(e) {
      if (e.tag === le || e.tag === Ue)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function hh(e) {
      return e[Fy] || null;
    }
    function Vy(e, t) {
      e[Fy] = t;
    }
    function IR(e) {
      var t = e[jy];
      return t === void 0 && (t = e[jy] = /* @__PURE__ */ new Set()), t;
    }
    var B0 = {}, P0 = M.ReactDebugCurrentFrame;
    function mh(e) {
      if (e) {
        var t = e._owner, a = io(e.type, e._source, t ? t.type : null);
        P0.setExtraStackFrame(a);
      } else
        P0.setExtraStackFrame(null);
    }
    function vi(e, t, a, i, u) {
      {
        var s = Function.call.bind(Vn);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (m) {
              p = m;
            }
            p && !(p instanceof Error) && (mh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), mh(null)), p instanceof Error && !(p.message in B0) && (B0[p.message] = !0, mh(u), S("Failed %s type: %s", a, p.message), mh(null));
          }
      }
    }
    var By = [], yh;
    yh = [];
    var Yl = -1;
    function Pu(e) {
      return {
        current: e
      };
    }
    function Tr(e, t) {
      if (Yl < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== yh[Yl] && S("Unexpected Fiber popped."), e.current = By[Yl], By[Yl] = null, yh[Yl] = null, Yl--;
    }
    function Rr(e, t, a) {
      Yl++, By[Yl] = e.current, yh[Yl] = a, e.current = t;
    }
    var Py;
    Py = {};
    var ka = {};
    Object.freeze(ka);
    var $l = Pu(ka), Ji = Pu(!1), Yy = ka;
    function Hc(e, t, a) {
      return a && el(t) ? Yy : $l.current;
    }
    function Y0(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Fc(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return ka;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Oe(e) || "Unknown";
          vi(i, s, "context", p);
        }
        return u && Y0(e, t, s), s;
      }
    }
    function gh() {
      return Ji.current;
    }
    function el(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Sh(e) {
      Tr(Ji, e), Tr($l, e);
    }
    function $y(e) {
      Tr(Ji, e), Tr($l, e);
    }
    function $0(e, t, a) {
      {
        if ($l.current !== ka)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        Rr($l, t, e), Rr(Ji, a, e);
      }
    }
    function Q0(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Oe(e) || "Unknown";
            Py[s] || (Py[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Oe(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Oe(e) || "Unknown";
          vi(u, f, "child context", v);
        }
        return Be({}, a, f);
      }
    }
    function Eh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || ka;
        return Yy = $l.current, Rr($l, a, e), Rr(Ji, Ji.current, e), !0;
      }
    }
    function I0(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = Q0(e, t, Yy);
          i.__reactInternalMemoizedMergedChildContext = u, Tr(Ji, e), Tr($l, e), Rr($l, u, e), Rr(Ji, a, e);
        } else
          Tr(Ji, e), Rr(Ji, a, e);
      }
    }
    function GR(e) {
      {
        if (!Yf(e) || e.tag !== ce)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case te:
              return t.stateNode.context;
            case ce: {
              var a = t.type;
              if (el(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Yu = 0, Ch = 1, Ql = null, Qy = !1, Iy = !1;
    function G0(e) {
      Ql === null ? Ql = [e] : Ql.push(e);
    }
    function WR(e) {
      Qy = !0, G0(e);
    }
    function W0() {
      Qy && $u();
    }
    function $u() {
      if (!Iy && Ql !== null) {
        Iy = !0;
        var e = 0, t = aa();
        try {
          var a = !0, i = Ql;
          for (ln(Qn); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Ql = null, Qy = !1;
        } catch (s) {
          throw Ql !== null && (Ql = Ql.slice(e + 1)), js(Bs, $u), s;
        } finally {
          ln(t), Iy = !1;
        }
      }
      return null;
    }
    var jc = [], Vc = 0, Th = null, Rh = 0, Ya = [], $a = 0, Zo = null, Il = 1, Gl = "";
    function XR(e) {
      return es(), (e.flags & Vf) !== he;
    }
    function qR(e) {
      return es(), Rh;
    }
    function KR() {
      var e = Gl, t = Il, a = t & ~ZR(t);
      return a.toString(32) + e;
    }
    function Jo(e, t) {
      es(), jc[Vc++] = Rh, jc[Vc++] = Th, Th = e, Rh = t;
    }
    function X0(e, t, a) {
      es(), Ya[$a++] = Il, Ya[$a++] = Gl, Ya[$a++] = Zo, Zo = e;
      var i = Il, u = Gl, s = xh(i) - 1, f = i & ~(1 << s), p = a + 1, v = xh(t) + s;
      if (v > 30) {
        var m = s - s % 5, y = (1 << m) - 1, x = (f & y).toString(32), T = f >> m, _ = s - m, O = xh(t) + _, N = p << _, J = N | T, me = x + u;
        Il = 1 << O | J, Gl = me;
      } else {
        var fe = p << s, Ge = fe | f, Ye = u;
        Il = 1 << v | Ge, Gl = Ye;
      }
    }
    function Gy(e) {
      es();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Jo(e, a), X0(e, a, i);
      }
    }
    function xh(e) {
      return 32 - Gs(e);
    }
    function ZR(e) {
      return 1 << xh(e) - 1;
    }
    function Wy(e) {
      for (; e === Th; )
        Th = jc[--Vc], jc[Vc] = null, Rh = jc[--Vc], jc[Vc] = null;
      for (; e === Zo; )
        Zo = Ya[--$a], Ya[$a] = null, Gl = Ya[--$a], Ya[$a] = null, Il = Ya[--$a], Ya[$a] = null;
    }
    function JR() {
      return es(), Zo !== null ? {
        id: Il,
        overflow: Gl
      } : null;
    }
    function ex(e, t) {
      es(), Ya[$a++] = Il, Ya[$a++] = Gl, Ya[$a++] = Zo, Il = t.id, Gl = t.overflow, Zo = e;
    }
    function es() {
      nr() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var tr = null, Qa = null, hi = !1, ts = !1, Qu = null;
    function tx() {
      hi && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function q0() {
      ts = !0;
    }
    function nx() {
      return ts;
    }
    function rx(e) {
      var t = e.stateNode.containerInfo;
      return Qa = CR(t), tr = e, hi = !0, Qu = null, ts = !1, !0;
    }
    function ax(e, t, a) {
      return Qa = TR(t), tr = e, hi = !0, Qu = null, ts = !1, a !== null && ex(e, a), !0;
    }
    function K0(e, t) {
      switch (e.tag) {
        case te: {
          MR(e.stateNode.containerInfo, t);
          break;
        }
        case le: {
          var a = (e.mode & Fe) !== Se;
          zR(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case Ve: {
          var i = e.memoizedState;
          i.dehydrated !== null && NR(i.dehydrated, t);
          break;
        }
      }
    }
    function Z0(e, t) {
      K0(e, t);
      var a = ub();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= at) : i.push(a);
    }
    function Xy(e, t) {
      {
        if (ts)
          return;
        switch (e.tag) {
          case te: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case le:
                var i = t.type;
                t.pendingProps, UR(a, i);
                break;
              case Ue:
                var u = t.pendingProps;
                AR(a, u);
                break;
            }
            break;
          }
          case le: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case le: {
                var v = t.type, m = t.pendingProps, y = (e.mode & Fe) !== Se;
                jR(
                  s,
                  f,
                  p,
                  v,
                  m,
                  // TODO: Delete this argument when we remove the legacy root API.
                  y
                );
                break;
              }
              case Ue: {
                var x = t.pendingProps, T = (e.mode & Fe) !== Se;
                VR(
                  s,
                  f,
                  p,
                  x,
                  // TODO: Delete this argument when we remove the legacy root API.
                  T
                );
                break;
              }
            }
            break;
          }
          case Ve: {
            var _ = e.memoizedState, O = _.dehydrated;
            if (O !== null)
              switch (t.tag) {
                case le:
                  var N = t.type;
                  t.pendingProps, HR(O, N);
                  break;
                case Ue:
                  var J = t.pendingProps;
                  FR(O, J);
                  break;
              }
            break;
          }
          default:
            return;
        }
      }
    }
    function J0(e, t) {
      t.flags = t.flags & ~Jr | xt, Xy(e, t);
    }
    function eE(e, t) {
      switch (e.tag) {
        case le: {
          var a = e.type;
          e.pendingProps;
          var i = hR(t, a);
          return i !== null ? (e.stateNode = i, tr = e, Qa = ER(i), !0) : !1;
        }
        case Ue: {
          var u = e.pendingProps, s = mR(t, u);
          return s !== null ? (e.stateNode = s, tr = e, Qa = null, !0) : !1;
        }
        case Ve: {
          var f = yR(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: JR(),
              retryLane: Er
            };
            e.memoizedState = p;
            var v = ob(f);
            return v.return = e, e.child = v, tr = e, Qa = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function qy(e) {
      return (e.mode & Fe) !== Se && (e.flags & we) === he;
    }
    function Ky(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Zy(e) {
      if (hi) {
        var t = Qa;
        if (!t) {
          qy(e) && (Xy(tr, e), Ky()), J0(tr, e), hi = !1, tr = e;
          return;
        }
        var a = t;
        if (!eE(e, t)) {
          qy(e) && (Xy(tr, e), Ky()), t = Hd(a);
          var i = tr;
          if (!t || !eE(e, t)) {
            J0(tr, e), hi = !1, tr = e;
            return;
          }
          Z0(i, a);
        }
      }
    }
    function ix(e, t, a) {
      var i = e.stateNode, u = !ts, s = RR(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function lx(e) {
      var t = e.stateNode, a = e.memoizedProps, i = xR(t, a, e);
      if (i) {
        var u = tr;
        if (u !== null)
          switch (u.tag) {
            case te: {
              var s = u.stateNode.containerInfo, f = (u.mode & Fe) !== Se;
              OR(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case le: {
              var p = u.type, v = u.memoizedProps, m = u.stateNode, y = (u.mode & Fe) !== Se;
              LR(
                p,
                v,
                m,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                y
              );
              break;
            }
          }
      }
      return i;
    }
    function ux(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      wR(a, e);
    }
    function ox(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return DR(a);
    }
    function tE(e) {
      for (var t = e.return; t !== null && t.tag !== le && t.tag !== te && t.tag !== Ve; )
        t = t.return;
      tr = t;
    }
    function wh(e) {
      if (e !== tr)
        return !1;
      if (!hi)
        return tE(e), hi = !0, !1;
      if (e.tag !== te && (e.tag !== le || _R(e.type) && !Ny(e.type, e.memoizedProps))) {
        var t = Qa;
        if (t)
          if (qy(e))
            nE(e), Ky();
          else
            for (; t; )
              Z0(e, t), t = Hd(t);
      }
      return tE(e), e.tag === Ve ? Qa = ox(e) : Qa = tr ? Hd(e.stateNode) : null, !0;
    }
    function sx() {
      return hi && Qa !== null;
    }
    function nE(e) {
      for (var t = Qa; t; )
        K0(e, t), t = Hd(t);
    }
    function Bc() {
      tr = null, Qa = null, hi = !1, ts = !1;
    }
    function rE() {
      Qu !== null && (KC(Qu), Qu = null);
    }
    function nr() {
      return hi;
    }
    function Jy(e) {
      Qu === null ? Qu = [e] : Qu.push(e);
    }
    var cx = M.ReactCurrentBatchConfig, fx = null;
    function dx() {
      return cx.transition;
    }
    var mi = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var px = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Ut && (t = a), a = a.return;
        return t;
      }, ns = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Bd = [], Pd = [], Yd = [], $d = [], Qd = [], Id = [], rs = /* @__PURE__ */ new Set();
      mi.recordUnsafeLifecycleWarnings = function(e, t) {
        rs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Bd.push(e), e.mode & Ut && typeof t.UNSAFE_componentWillMount == "function" && Pd.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Yd.push(e), e.mode & Ut && typeof t.UNSAFE_componentWillReceiveProps == "function" && $d.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Qd.push(e), e.mode & Ut && typeof t.UNSAFE_componentWillUpdate == "function" && Id.push(e));
      }, mi.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Bd.length > 0 && (Bd.forEach(function(T) {
          e.add(Oe(T) || "Component"), rs.add(T.type);
        }), Bd = []);
        var t = /* @__PURE__ */ new Set();
        Pd.length > 0 && (Pd.forEach(function(T) {
          t.add(Oe(T) || "Component"), rs.add(T.type);
        }), Pd = []);
        var a = /* @__PURE__ */ new Set();
        Yd.length > 0 && (Yd.forEach(function(T) {
          a.add(Oe(T) || "Component"), rs.add(T.type);
        }), Yd = []);
        var i = /* @__PURE__ */ new Set();
        $d.length > 0 && ($d.forEach(function(T) {
          i.add(Oe(T) || "Component"), rs.add(T.type);
        }), $d = []);
        var u = /* @__PURE__ */ new Set();
        Qd.length > 0 && (Qd.forEach(function(T) {
          u.add(Oe(T) || "Component"), rs.add(T.type);
        }), Qd = []);
        var s = /* @__PURE__ */ new Set();
        if (Id.length > 0 && (Id.forEach(function(T) {
          s.add(Oe(T) || "Component"), rs.add(T.type);
        }), Id = []), t.size > 0) {
          var f = ns(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = ns(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = ns(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var m = ns(e);
          qe(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, m);
        }
        if (a.size > 0) {
          var y = ns(a);
          qe(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (u.size > 0) {
          var x = ns(u);
          qe(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
      };
      var Dh = /* @__PURE__ */ new Map(), aE = /* @__PURE__ */ new Set();
      mi.recordLegacyContextWarning = function(e, t) {
        var a = px(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!aE.has(e.type)) {
          var i = Dh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Dh.set(a, i)), i.push(e));
        }
      }, mi.flushLegacyContextWarning = function() {
        Dh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Oe(s) || "Component"), aE.add(s.type);
            });
            var u = ns(i);
            try {
              ft(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              nn();
            }
          }
        });
      }, mi.discardPendingWarnings = function() {
        Bd = [], Pd = [], Yd = [], $d = [], Qd = [], Id = [], Dh = /* @__PURE__ */ new Map();
      };
    }
    function yi(e, t) {
      if (e && e.defaultProps) {
        var a = Be({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var eg = Pu(null), tg;
    tg = {};
    var bh = null, Pc = null, ng = null, kh = !1;
    function _h() {
      bh = null, Pc = null, ng = null, kh = !1;
    }
    function iE() {
      kh = !0;
    }
    function lE() {
      kh = !1;
    }
    function uE(e, t, a) {
      Rr(eg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== tg && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = tg;
    }
    function rg(e, t) {
      var a = eg.current;
      Tr(eg, t), e._currentValue = a;
    }
    function ag(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (Ml(i.childLanes, t) ? u !== null && !Ml(u.childLanes, t) && (u.childLanes = Me(u.childLanes, t)) : (i.childLanes = Me(i.childLanes, t), u !== null && (u.childLanes = Me(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function vx(e, t, a) {
      hx(e, t, a);
    }
    function hx(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === ce) {
                var p = an(a), v = Wl(St, p);
                v.tag = Lh;
                var m = i.updateQueue;
                if (m !== null) {
                  var y = m.shared, x = y.pending;
                  x === null ? v.next = v : (v.next = x.next, x.next = v), y.pending = v;
                }
              }
              i.lanes = Me(i.lanes, a);
              var T = i.alternate;
              T !== null && (T.lanes = Me(T.lanes, a)), ag(i.return, a, e), s.lanes = Me(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === Ke)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === jt) {
          var _ = i.return;
          if (_ === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          _.lanes = Me(_.lanes, a);
          var O = _.alternate;
          O !== null && (O.lanes = Me(O.lanes, a)), ag(_, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var N = u.sibling;
            if (N !== null) {
              N.return = u.return, u = N;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function Yc(e, t) {
      bh = e, Pc = null, ng = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Cr(a.lanes, t) && lp(), a.firstContext = null);
      }
    }
    function Tn(e) {
      kh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (ng !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Pc === null) {
          if (bh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Pc = a, bh.dependencies = {
            lanes: U,
            firstContext: a
          };
        } else
          Pc = Pc.next = a;
      }
      return t;
    }
    var as = null;
    function ig(e) {
      as === null ? as = [e] : as.push(e);
    }
    function mx() {
      if (as !== null) {
        for (var e = 0; e < as.length; e++) {
          var t = as[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        as = null;
      }
    }
    function oE(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, ig(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Oh(e, i);
    }
    function yx(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, ig(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function gx(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, ig(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Oh(e, i);
    }
    function sa(e, t) {
      return Oh(e, t);
    }
    var Sx = Oh;
    function Oh(e, t) {
      e.lanes = Me(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Me(a.lanes, t)), a === null && (e.flags & (xt | Jr)) !== he && s1(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = Me(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Me(a.childLanes, t) : (u.flags & (xt | Jr)) !== he && s1(e), i = u, u = u.return;
      if (i.tag === te) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var sE = 0, cE = 1, Lh = 2, lg = 3, Mh = !1, ug, Nh;
    ug = !1, Nh = null;
    function og(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: U
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function fE(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Wl(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: sE,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Iu(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Nh === u && !ug && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), ug = !0), SD()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Sx(e, a);
      } else
        return gx(e, u, t, a);
    }
    function zh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (nd(a)) {
          var s = u.lanes;
          s = ad(s, e.pendingLanes);
          var f = Me(s, a);
          u.lanes = f, Du(e, f);
        }
      }
    }
    function sg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var m = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = m : (f.next = m, f = m), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var y = a.lastBaseUpdate;
      y === null ? a.firstBaseUpdate = t : y.next = t, a.lastBaseUpdate = t;
    }
    function Ex(e, t, a, i, u, s) {
      switch (a.tag) {
        case cE: {
          var f = a.payload;
          if (typeof f == "function") {
            iE();
            var p = f.call(s, i, u);
            {
              if (e.mode & Ut) {
                rn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  rn(!1);
                }
              }
              lE();
            }
            return p;
          }
          return f;
        }
        case lg:
          e.flags = e.flags & ~yn | we;
        case sE: {
          var v = a.payload, m;
          if (typeof v == "function") {
            iE(), m = v.call(s, i, u);
            {
              if (e.mode & Ut) {
                rn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  rn(!1);
                }
              }
              lE();
            }
          } else
            m = v;
          return m == null ? i : Be({}, i, m);
        }
        case Lh:
          return Mh = !0, i;
      }
      return i;
    }
    function Uh(e, t, a, i) {
      var u = e.updateQueue;
      Mh = !1, Nh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, m = v.next;
        v.next = null, f === null ? s = m : f.next = m, f = v;
        var y = e.alternate;
        if (y !== null) {
          var x = y.updateQueue, T = x.lastBaseUpdate;
          T !== f && (T === null ? x.firstBaseUpdate = m : T.next = m, x.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var _ = u.baseState, O = U, N = null, J = null, me = null, fe = s;
        do {
          var Ge = fe.lane, Ye = fe.eventTime;
          if (Ml(i, Ge)) {
            if (me !== null) {
              var z = {
                eventTime: Ye,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Qe,
                tag: fe.tag,
                payload: fe.payload,
                callback: fe.callback,
                next: null
              };
              me = me.next = z;
            }
            _ = Ex(e, u, fe, _, t, a);
            var b = fe.callback;
            if (b !== null && // If the update was already committed, we should not queue its
            // callback again.
            fe.lane !== Qe) {
              e.flags |= Ha;
              var B = u.effects;
              B === null ? u.effects = [fe] : B.push(fe);
            }
          } else {
            var D = {
              eventTime: Ye,
              lane: Ge,
              tag: fe.tag,
              payload: fe.payload,
              callback: fe.callback,
              next: null
            };
            me === null ? (J = me = D, N = _) : me = me.next = D, O = Me(O, Ge);
          }
          if (fe = fe.next, fe === null) {
            if (p = u.shared.pending, p === null)
              break;
            var ee = p, X = ee.next;
            ee.next = null, fe = X, u.lastBaseUpdate = ee, u.shared.pending = null;
          }
        } while (!0);
        me === null && (N = _), u.baseState = N, u.firstBaseUpdate = J, u.lastBaseUpdate = me;
        var xe = u.shared.interleaved;
        if (xe !== null) {
          var _e = xe;
          do
            O = Me(O, _e.lane), _e = _e.next;
          while (_e !== xe);
        } else
          s === null && (u.shared.lanes = U);
        gp(O), e.lanes = O, e.memoizedState = _;
      }
      Nh = null;
    }
    function Cx(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function dE() {
      Mh = !1;
    }
    function Ah() {
      return Mh;
    }
    function pE(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Cx(f, a));
        }
    }
    var cg = {}, vE = new Y.Component().refs, fg, dg, pg, vg, hg, hE, Hh, mg, yg, gg;
    {
      fg = /* @__PURE__ */ new Set(), dg = /* @__PURE__ */ new Set(), pg = /* @__PURE__ */ new Set(), vg = /* @__PURE__ */ new Set(), mg = /* @__PURE__ */ new Set(), hg = /* @__PURE__ */ new Set(), yg = /* @__PURE__ */ new Set(), gg = /* @__PURE__ */ new Set();
      var mE = /* @__PURE__ */ new Set();
      Hh = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          mE.has(a) || (mE.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, hE = function(e, t) {
        if (t === void 0) {
          var a = yt(e) || "Component";
          hg.has(a) || (hg.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(cg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(cg);
    }
    function Sg(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Ut) {
          rn(!0);
          try {
            s = a(i, u);
          } finally {
            rn(!1);
          }
        }
        hE(t, s);
      }
      var f = s == null ? u : Be({}, u, s);
      if (e.memoizedState = f, e.lanes === U) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var Eg = {
      isMounted: Ur,
      enqueueSetState: function(e, t, a) {
        var i = Kr(e), u = Br(), s = eo(i), f = Wl(u, s);
        f.payload = t, a != null && (Hh(a, "setState"), f.callback = a);
        var p = Iu(i, f, s);
        p !== null && (Hn(p, i, s, u), zh(p, i, s)), $i(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Kr(e), u = Br(), s = eo(i), f = Wl(u, s);
        f.tag = cE, f.payload = t, a != null && (Hh(a, "replaceState"), f.callback = a);
        var p = Iu(i, f, s);
        p !== null && (Hn(p, i, s, u), zh(p, i, s)), $i(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Kr(e), i = Br(), u = eo(a), s = Wl(i, u);
        s.tag = Lh, t != null && (Hh(t, "forceUpdate"), s.callback = t);
        var f = Iu(a, s, u);
        f !== null && (Hn(f, a, u, i), zh(f, a, u)), Zf(a, u);
      }
    };
    function yE(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Ut) {
            rn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              rn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", yt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !pe(a, i) || !pe(u, s) : !0;
    }
    function Tx(e, t, a) {
      var i = e.stateNode;
      {
        var u = yt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !yg.has(t) && (yg.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", yt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !pg.has(t) && (pg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", yt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || hn(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function gE(e, t) {
      t.updater = Eg, e.stateNode = t, mu(t, e), t._reactInternalInstance = cg;
    }
    function SE(e, t, a) {
      var i = !1, u = ka, s = ka, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === W && f._context === void 0
        );
        if (!p && !gg.has(t)) {
          gg.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === j ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", yt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = Tn(f);
      else {
        u = Hc(e, t, !0);
        var m = t.contextTypes;
        i = m != null, s = i ? Fc(e, u) : ka;
      }
      var y = new t(a, s);
      if (e.mode & Ut) {
        rn(!0);
        try {
          y = new t(a, s);
        } finally {
          rn(!1);
        }
      }
      var x = e.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null;
      gE(e, y);
      {
        if (typeof t.getDerivedStateFromProps == "function" && x === null) {
          var T = yt(t) || "Component";
          dg.has(T) || (dg.add(T), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", T, y.state === null ? "null" : "undefined", T));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function") {
          var _ = null, O = null, N = null;
          if (typeof y.componentWillMount == "function" && y.componentWillMount.__suppressDeprecationWarning !== !0 ? _ = "componentWillMount" : typeof y.UNSAFE_componentWillMount == "function" && (_ = "UNSAFE_componentWillMount"), typeof y.componentWillReceiveProps == "function" && y.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? O = "componentWillReceiveProps" : typeof y.UNSAFE_componentWillReceiveProps == "function" && (O = "UNSAFE_componentWillReceiveProps"), typeof y.componentWillUpdate == "function" && y.componentWillUpdate.__suppressDeprecationWarning !== !0 ? N = "componentWillUpdate" : typeof y.UNSAFE_componentWillUpdate == "function" && (N = "UNSAFE_componentWillUpdate"), _ !== null || O !== null || N !== null) {
            var J = yt(t) || "Component", me = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            vg.has(J) || (vg.add(J), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, J, me, _ !== null ? `
  ` + _ : "", O !== null ? `
  ` + O : "", N !== null ? `
  ` + N : ""));
          }
        }
      }
      return i && Y0(e, u, s), y;
    }
    function Rx(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Oe(e) || "Component"), Eg.enqueueReplaceState(t, t.state, null));
    }
    function EE(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Oe(e) || "Component";
          fg.has(s) || (fg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        Eg.enqueueReplaceState(t, t.state, null);
      }
    }
    function Cg(e, t, a, i) {
      Tx(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = vE, og(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = Tn(s);
      else {
        var f = Hc(e, t, !0);
        u.context = Fc(e, f);
      }
      {
        if (u.state === a) {
          var p = yt(t) || "Component";
          mg.has(p) || (mg.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Ut && mi.recordLegacyContextWarning(e, u), mi.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (Sg(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Rx(e, u), Uh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var m = Le;
        m |= hr, (e.mode & na) !== Se && (m |= mr), e.flags |= m;
      }
    }
    function xx(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = ka;
      if (typeof p == "object" && p !== null)
        v = Tn(p);
      else {
        var m = Hc(e, t, !0);
        v = Fc(e, m);
      }
      var y = t.getDerivedStateFromProps, x = typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !x && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && EE(e, u, a, v), dE();
      var T = e.memoizedState, _ = u.state = T;
      if (Uh(e, a, u, i), _ = e.memoizedState, s === a && T === _ && !gh() && !Ah()) {
        if (typeof u.componentDidMount == "function") {
          var O = Le;
          O |= hr, (e.mode & na) !== Se && (O |= mr), e.flags |= O;
        }
        return !1;
      }
      typeof y == "function" && (Sg(e, t, y, a), _ = e.memoizedState);
      var N = Ah() || yE(e, t, s, a, T, _, v);
      if (N) {
        if (!x && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var J = Le;
          J |= hr, (e.mode & na) !== Se && (J |= mr), e.flags |= J;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var me = Le;
          me |= hr, (e.mode & na) !== Se && (me |= mr), e.flags |= me;
        }
        e.memoizedProps = a, e.memoizedState = _;
      }
      return u.props = a, u.state = _, u.context = v, N;
    }
    function wx(e, t, a, i, u) {
      var s = t.stateNode;
      fE(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : yi(t.type, f);
      s.props = p;
      var v = t.pendingProps, m = s.context, y = a.contextType, x = ka;
      if (typeof y == "object" && y !== null)
        x = Tn(y);
      else {
        var T = Hc(t, a, !0);
        x = Fc(t, T);
      }
      var _ = a.getDerivedStateFromProps, O = typeof _ == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !O && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || m !== x) && EE(t, s, i, x), dE();
      var N = t.memoizedState, J = s.state = N;
      if (Uh(t, i, s, u), J = t.memoizedState, f === v && N === J && !gh() && !Ah() && !ye)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= Le), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= Zr), !1;
      typeof _ == "function" && (Sg(t, a, _, i), J = t.memoizedState);
      var me = Ah() || yE(t, a, p, i, N, J, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ye;
      return me ? (!O && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, J, x), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, J, x)), typeof s.componentDidUpdate == "function" && (t.flags |= Le), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Zr)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= Le), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= Zr), t.memoizedProps = i, t.memoizedState = J), s.props = i, s.state = J, s.context = x, me;
    }
    var Tg, Rg, xg, wg, Dg, CE = function(e, t) {
    };
    Tg = !1, Rg = !1, xg = {}, wg = {}, Dg = {}, CE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Oe(t) || "Component";
        wg[a] || (wg[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Gd(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Ut || Zn) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self)) {
          var u = Oe(e) || "Component";
          xg[u] || (S('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', i), xg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== ce)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          qa(i, "ref");
          var m = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === m)
            return t.ref;
          var y = function(x) {
            var T = v.refs;
            T === vE && (T = v.refs = {}), x === null ? delete T[m] : T[m] = x;
          };
          return y._stringRef = m, y;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function Fh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function jh(e) {
      {
        var t = Oe(e) || "Component";
        if (Dg[t])
          return;
        Dg[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function TE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function RE(e) {
      function t(D, z) {
        if (e) {
          var b = D.deletions;
          b === null ? (D.deletions = [z], D.flags |= at) : b.push(z);
        }
      }
      function a(D, z) {
        if (!e)
          return null;
        for (var b = z; b !== null; )
          t(D, b), b = b.sibling;
        return null;
      }
      function i(D, z) {
        for (var b = /* @__PURE__ */ new Map(), B = z; B !== null; )
          B.key !== null ? b.set(B.key, B) : b.set(B.index, B), B = B.sibling;
        return b;
      }
      function u(D, z) {
        var b = ds(D, z);
        return b.index = 0, b.sibling = null, b;
      }
      function s(D, z, b) {
        if (D.index = b, !e)
          return D.flags |= Vf, z;
        var B = D.alternate;
        if (B !== null) {
          var ee = B.index;
          return ee < z ? (D.flags |= xt, z) : ee;
        } else
          return D.flags |= xt, z;
      }
      function f(D) {
        return e && D.alternate === null && (D.flags |= xt), D;
      }
      function p(D, z, b, B) {
        if (z === null || z.tag !== Ue) {
          var ee = JS(b, D.mode, B);
          return ee.return = D, ee;
        } else {
          var X = u(z, b);
          return X.return = D, X;
        }
      }
      function v(D, z, b, B) {
        var ee = b.type;
        if (ee === Sa)
          return y(D, z, b.props.children, B, b.key);
        if (z !== null && (z.elementType === ee || // Keep this check inline so it only runs on the false path:
        p1(z, b) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ee == "object" && ee !== null && ee.$$typeof === Ee && TE(ee) === z.type)) {
          var X = u(z, b.props);
          return X.ref = Gd(D, z, b), X.return = D, X._debugSource = b._source, X._debugOwner = b._owner, X;
        }
        var xe = ZS(b, D.mode, B);
        return xe.ref = Gd(D, z, b), xe.return = D, xe;
      }
      function m(D, z, b, B) {
        if (z === null || z.tag !== de || z.stateNode.containerInfo !== b.containerInfo || z.stateNode.implementation !== b.implementation) {
          var ee = e0(b, D.mode, B);
          return ee.return = D, ee;
        } else {
          var X = u(z, b.children || []);
          return X.return = D, X;
        }
      }
      function y(D, z, b, B, ee) {
        if (z === null || z.tag !== ut) {
          var X = no(b, D.mode, B, ee);
          return X.return = D, X;
        } else {
          var xe = u(z, b);
          return xe.return = D, xe;
        }
      }
      function x(D, z, b) {
        if (typeof z == "string" && z !== "" || typeof z == "number") {
          var B = JS("" + z, D.mode, b);
          return B.return = D, B;
        }
        if (typeof z == "object" && z !== null) {
          switch (z.$$typeof) {
            case Di: {
              var ee = ZS(z, D.mode, b);
              return ee.ref = Gd(D, null, z), ee.return = D, ee;
            }
            case Lr: {
              var X = e0(z, D.mode, b);
              return X.return = D, X;
            }
            case Ee: {
              var xe = z._payload, _e = z._init;
              return x(D, _e(xe), b);
            }
          }
          if (hn(z) || Ka(z)) {
            var pt = no(z, D.mode, b, null);
            return pt.return = D, pt;
          }
          Fh(D, z);
        }
        return typeof z == "function" && jh(D), null;
      }
      function T(D, z, b, B) {
        var ee = z !== null ? z.key : null;
        if (typeof b == "string" && b !== "" || typeof b == "number")
          return ee !== null ? null : p(D, z, "" + b, B);
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case Di:
              return b.key === ee ? v(D, z, b, B) : null;
            case Lr:
              return b.key === ee ? m(D, z, b, B) : null;
            case Ee: {
              var X = b._payload, xe = b._init;
              return T(D, z, xe(X), B);
            }
          }
          if (hn(b) || Ka(b))
            return ee !== null ? null : y(D, z, b, B, null);
          Fh(D, b);
        }
        return typeof b == "function" && jh(D), null;
      }
      function _(D, z, b, B, ee) {
        if (typeof B == "string" && B !== "" || typeof B == "number") {
          var X = D.get(b) || null;
          return p(z, X, "" + B, ee);
        }
        if (typeof B == "object" && B !== null) {
          switch (B.$$typeof) {
            case Di: {
              var xe = D.get(B.key === null ? b : B.key) || null;
              return v(z, xe, B, ee);
            }
            case Lr: {
              var _e = D.get(B.key === null ? b : B.key) || null;
              return m(z, _e, B, ee);
            }
            case Ee:
              var pt = B._payload, et = B._init;
              return _(D, z, b, et(pt), ee);
          }
          if (hn(B) || Ka(B)) {
            var sn = D.get(b) || null;
            return y(z, sn, B, ee, null);
          }
          Fh(z, B);
        }
        return typeof B == "function" && jh(z), null;
      }
      function O(D, z, b) {
        {
          if (typeof D != "object" || D === null)
            return z;
          switch (D.$$typeof) {
            case Di:
            case Lr:
              CE(D, b);
              var B = D.key;
              if (typeof B != "string")
                break;
              if (z === null) {
                z = /* @__PURE__ */ new Set(), z.add(B);
                break;
              }
              if (!z.has(B)) {
                z.add(B);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", B);
              break;
            case Ee:
              var ee = D._payload, X = D._init;
              O(X(ee), z, b);
              break;
          }
        }
        return z;
      }
      function N(D, z, b, B) {
        for (var ee = null, X = 0; X < b.length; X++) {
          var xe = b[X];
          ee = O(xe, ee, D);
        }
        for (var _e = null, pt = null, et = z, sn = 0, tt = 0, Zt = null; et !== null && tt < b.length; tt++) {
          et.index > tt ? (Zt = et, et = null) : Zt = et.sibling;
          var wr = T(D, et, b[tt], B);
          if (wr === null) {
            et === null && (et = Zt);
            break;
          }
          e && et && wr.alternate === null && t(D, et), sn = s(wr, sn, tt), pt === null ? _e = wr : pt.sibling = wr, pt = wr, et = Zt;
        }
        if (tt === b.length) {
          if (a(D, et), nr()) {
            var sr = tt;
            Jo(D, sr);
          }
          return _e;
        }
        if (et === null) {
          for (; tt < b.length; tt++) {
            var Oa = x(D, b[tt], B);
            Oa !== null && (sn = s(Oa, sn, tt), pt === null ? _e = Oa : pt.sibling = Oa, pt = Oa);
          }
          if (nr()) {
            var Pr = tt;
            Jo(D, Pr);
          }
          return _e;
        }
        for (var Yr = i(D, et); tt < b.length; tt++) {
          var Dr = _(Yr, D, tt, b[tt], B);
          Dr !== null && (e && Dr.alternate !== null && Yr.delete(Dr.key === null ? tt : Dr.key), sn = s(Dr, sn, tt), pt === null ? _e = Dr : pt.sibling = Dr, pt = Dr);
        }
        if (e && Yr.forEach(function(uf) {
          return t(D, uf);
        }), nr()) {
          var eu = tt;
          Jo(D, eu);
        }
        return _e;
      }
      function J(D, z, b, B) {
        var ee = Ka(b);
        if (typeof ee != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          b[Symbol.toStringTag] === "Generator" && (Rg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rg = !0), b.entries === ee && (Tg || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Tg = !0);
          var X = ee.call(b);
          if (X)
            for (var xe = null, _e = X.next(); !_e.done; _e = X.next()) {
              var pt = _e.value;
              xe = O(pt, xe, D);
            }
        }
        var et = ee.call(b);
        if (et == null)
          throw new Error("An iterable object provided no iterator.");
        for (var sn = null, tt = null, Zt = z, wr = 0, sr = 0, Oa = null, Pr = et.next(); Zt !== null && !Pr.done; sr++, Pr = et.next()) {
          Zt.index > sr ? (Oa = Zt, Zt = null) : Oa = Zt.sibling;
          var Yr = T(D, Zt, Pr.value, B);
          if (Yr === null) {
            Zt === null && (Zt = Oa);
            break;
          }
          e && Zt && Yr.alternate === null && t(D, Zt), wr = s(Yr, wr, sr), tt === null ? sn = Yr : tt.sibling = Yr, tt = Yr, Zt = Oa;
        }
        if (Pr.done) {
          if (a(D, Zt), nr()) {
            var Dr = sr;
            Jo(D, Dr);
          }
          return sn;
        }
        if (Zt === null) {
          for (; !Pr.done; sr++, Pr = et.next()) {
            var eu = x(D, Pr.value, B);
            eu !== null && (wr = s(eu, wr, sr), tt === null ? sn = eu : tt.sibling = eu, tt = eu);
          }
          if (nr()) {
            var uf = sr;
            Jo(D, uf);
          }
          return sn;
        }
        for (var Rp = i(D, Zt); !Pr.done; sr++, Pr = et.next()) {
          var ol = _(Rp, D, sr, Pr.value, B);
          ol !== null && (e && ol.alternate !== null && Rp.delete(ol.key === null ? sr : ol.key), wr = s(ol, wr, sr), tt === null ? sn = ol : tt.sibling = ol, tt = ol);
        }
        if (e && Rp.forEach(function(jb) {
          return t(D, jb);
        }), nr()) {
          var Fb = sr;
          Jo(D, Fb);
        }
        return sn;
      }
      function me(D, z, b, B) {
        if (z !== null && z.tag === Ue) {
          a(D, z.sibling);
          var ee = u(z, b);
          return ee.return = D, ee;
        }
        a(D, z);
        var X = JS(b, D.mode, B);
        return X.return = D, X;
      }
      function fe(D, z, b, B) {
        for (var ee = b.key, X = z; X !== null; ) {
          if (X.key === ee) {
            var xe = b.type;
            if (xe === Sa) {
              if (X.tag === ut) {
                a(D, X.sibling);
                var _e = u(X, b.props.children);
                return _e.return = D, _e._debugSource = b._source, _e._debugOwner = b._owner, _e;
              }
            } else if (X.elementType === xe || // Keep this check inline so it only runs on the false path:
            p1(X, b) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof xe == "object" && xe !== null && xe.$$typeof === Ee && TE(xe) === X.type) {
              a(D, X.sibling);
              var pt = u(X, b.props);
              return pt.ref = Gd(D, X, b), pt.return = D, pt._debugSource = b._source, pt._debugOwner = b._owner, pt;
            }
            a(D, X);
            break;
          } else
            t(D, X);
          X = X.sibling;
        }
        if (b.type === Sa) {
          var et = no(b.props.children, D.mode, B, b.key);
          return et.return = D, et;
        } else {
          var sn = ZS(b, D.mode, B);
          return sn.ref = Gd(D, z, b), sn.return = D, sn;
        }
      }
      function Ge(D, z, b, B) {
        for (var ee = b.key, X = z; X !== null; ) {
          if (X.key === ee)
            if (X.tag === de && X.stateNode.containerInfo === b.containerInfo && X.stateNode.implementation === b.implementation) {
              a(D, X.sibling);
              var xe = u(X, b.children || []);
              return xe.return = D, xe;
            } else {
              a(D, X);
              break;
            }
          else
            t(D, X);
          X = X.sibling;
        }
        var _e = e0(b, D.mode, B);
        return _e.return = D, _e;
      }
      function Ye(D, z, b, B) {
        var ee = typeof b == "object" && b !== null && b.type === Sa && b.key === null;
        if (ee && (b = b.props.children), typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case Di:
              return f(fe(D, z, b, B));
            case Lr:
              return f(Ge(D, z, b, B));
            case Ee:
              var X = b._payload, xe = b._init;
              return Ye(D, z, xe(X), B);
          }
          if (hn(b))
            return N(D, z, b, B);
          if (Ka(b))
            return J(D, z, b, B);
          Fh(D, b);
        }
        return typeof b == "string" && b !== "" || typeof b == "number" ? f(me(D, z, "" + b, B)) : (typeof b == "function" && jh(D), a(D, z));
      }
      return Ye;
    }
    var $c = RE(!0), xE = RE(!1);
    function Dx(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = ds(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = ds(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function bx(e, t) {
      for (var a = e.child; a !== null; )
        nb(a, t), a = a.sibling;
    }
    var Wd = {}, Gu = Pu(Wd), Xd = Pu(Wd), Vh = Pu(Wd);
    function Bh(e) {
      if (e === Wd)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function wE() {
      var e = Bh(Vh.current);
      return e;
    }
    function bg(e, t) {
      Rr(Vh, t, e), Rr(Xd, e, e), Rr(Gu, Wd, e);
      var a = BT(t);
      Tr(Gu, e), Rr(Gu, a, e);
    }
    function Qc(e) {
      Tr(Gu, e), Tr(Xd, e), Tr(Vh, e);
    }
    function kg() {
      var e = Bh(Gu.current);
      return e;
    }
    function DE(e) {
      Bh(Vh.current);
      var t = Bh(Gu.current), a = PT(t, e.type);
      t !== a && (Rr(Xd, e, e), Rr(Gu, a, e));
    }
    function _g(e) {
      Xd.current === e && (Tr(Gu, e), Tr(Xd, e));
    }
    var kx = 0, bE = 1, kE = 1, qd = 2, gi = Pu(kx);
    function Og(e, t) {
      return (e & t) !== 0;
    }
    function Ic(e) {
      return e & bE;
    }
    function Lg(e, t) {
      return e & bE | t;
    }
    function _x(e, t) {
      return e | t;
    }
    function Wu(e, t) {
      Rr(gi, t, e);
    }
    function Gc(e) {
      Tr(gi, e);
    }
    function Ox(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Ph(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Ve) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || F0(i) || Hy(i))
              return t;
          }
        } else if (t.tag === ct && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & we) !== he;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var ca = (
      /*   */
      0
    ), On = (
      /* */
      1
    ), tl = (
      /*  */
      2
    ), Ln = (
      /*    */
      4
    ), rr = (
      /*   */
      8
    ), Mg = [];
    function Ng() {
      for (var e = 0; e < Mg.length; e++) {
        var t = Mg[e];
        t._workInProgressVersionPrimary = null;
      }
      Mg.length = 0;
    }
    function Lx(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var K = M.ReactCurrentDispatcher, Kd = M.ReactCurrentBatchConfig, zg, Wc;
    zg = /* @__PURE__ */ new Set();
    var is = U, dt = null, Mn = null, Nn = null, Yh = !1, Zd = !1, Jd = 0, Mx = 0, Nx = 25, A = null, Ia = null, Xu = -1, Ug = !1;
    function lt() {
      {
        var e = A;
        Ia === null ? Ia = [e] : Ia.push(e);
      }
    }
    function I() {
      {
        var e = A;
        Ia !== null && (Xu++, Ia[Xu] !== e && zx(e));
      }
    }
    function Xc(e) {
      e != null && !hn(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", A, typeof e);
    }
    function zx(e) {
      {
        var t = Oe(dt);
        if (!zg.has(t) && (zg.add(t), Ia !== null)) {
          for (var a = "", i = 30, u = 0; u <= Xu; u++) {
            for (var s = Ia[u], f = u === Xu ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function xr() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Ag(e, t) {
      if (Ug)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", A), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, A, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ae(e[a], t[a]))
          return !1;
      return !0;
    }
    function qc(e, t, a, i, u, s) {
      is = s, dt = t, Ia = e !== null ? e._debugHookTypes : null, Xu = -1, Ug = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = U, e !== null && e.memoizedState !== null ? K.current = qE : Ia !== null ? K.current = XE : K.current = WE;
      var f = a(i, u);
      if (Zd) {
        var p = 0;
        do {
          if (Zd = !1, Jd = 0, p >= Nx)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Ug = !1, Mn = null, Nn = null, t.updateQueue = null, Xu = -1, K.current = KE, f = a(i, u);
        } while (Zd);
      }
      K.current = nm, t._debugHookTypes = Ia;
      var v = Mn !== null && Mn.next !== null;
      if (is = U, dt = null, Mn = null, Nn = null, A = null, Ia = null, Xu = -1, e !== null && (e.flags & bn) !== (t.flags & bn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Fe) !== Se && S("Internal React error: Expected static flag was missing. Please notify the React team."), Yh = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Kc() {
      var e = Jd !== 0;
      return Jd = 0, e;
    }
    function _E(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & na) !== Se ? t.flags &= ~(Tl | mr | Lt | Le) : t.flags &= ~(Lt | Le), e.lanes = wu(e.lanes, a);
    }
    function OE() {
      if (K.current = nm, Yh) {
        for (var e = dt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Yh = !1;
      }
      is = U, dt = null, Mn = null, Nn = null, Ia = null, Xu = -1, A = null, YE = !1, Zd = !1, Jd = 0;
    }
    function nl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Nn === null ? dt.memoizedState = Nn = e : Nn = Nn.next = e, Nn;
    }
    function Ga() {
      var e;
      if (Mn === null) {
        var t = dt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = Mn.next;
      var a;
      if (Nn === null ? a = dt.memoizedState : a = Nn.next, a !== null)
        Nn = a, a = Nn.next, Mn = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Mn = e;
        var i = {
          memoizedState: Mn.memoizedState,
          baseState: Mn.baseState,
          baseQueue: Mn.baseQueue,
          queue: Mn.queue,
          next: null
        };
        Nn === null ? dt.memoizedState = Nn = i : Nn = Nn.next = i;
      }
      return Nn;
    }
    function LE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Hg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Fg(e, t, a) {
      var i = nl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: U,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Fx.bind(null, dt, s);
      return [i.memoizedState, f];
    }
    function jg(e, t, a) {
      var i = Ga(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = Mn, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, m = p.next;
          f.next = m, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var y = f.next, x = s.baseState, T = null, _ = null, O = null, N = y;
        do {
          var J = N.lane;
          if (Ml(is, J)) {
            if (O !== null) {
              var fe = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Qe,
                action: N.action,
                hasEagerState: N.hasEagerState,
                eagerState: N.eagerState,
                next: null
              };
              O = O.next = fe;
            }
            if (N.hasEagerState)
              x = N.eagerState;
            else {
              var Ge = N.action;
              x = e(x, Ge);
            }
          } else {
            var me = {
              lane: J,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            };
            O === null ? (_ = O = me, T = x) : O = O.next = me, dt.lanes = Me(dt.lanes, J), gp(J);
          }
          N = N.next;
        } while (N !== null && N !== y);
        O === null ? T = x : O.next = _, ae(x, i.memoizedState) || lp(), i.memoizedState = x, i.baseState = T, i.baseQueue = O, u.lastRenderedState = x;
      }
      var Ye = u.interleaved;
      if (Ye !== null) {
        var D = Ye;
        do {
          var z = D.lane;
          dt.lanes = Me(dt.lanes, z), gp(z), D = D.next;
        } while (D !== Ye);
      } else
        f === null && (u.lanes = U);
      var b = u.dispatch;
      return [i.memoizedState, b];
    }
    function Vg(e, t, a) {
      var i = Ga(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, m = v;
        do {
          var y = m.action;
          p = e(p, y), m = m.next;
        } while (m !== v);
        ae(p, i.memoizedState) || lp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function Jb(e, t, a) {
    }
    function ek(e, t, a) {
    }
    function Bg(e, t, a) {
      var i = dt, u = nl(), s, f = nr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Wc || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Wc = !0);
      } else {
        if (s = t(), !Wc) {
          var p = t();
          ae(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Wc = !0);
        }
        var v = Em();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ao(v, is) || ME(i, t, s);
      }
      u.memoizedState = s;
      var m = {
        value: s,
        getSnapshot: t
      };
      return u.queue = m, Wh(zE.bind(null, i, m, e), [e]), i.flags |= Lt, ep(On | rr, NE.bind(null, i, m, s, t), void 0, null), s;
    }
    function $h(e, t, a) {
      var i = dt, u = Ga(), s = t();
      if (!Wc) {
        var f = t();
        ae(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Wc = !0);
      }
      var p = u.memoizedState, v = !ae(p, s);
      v && (u.memoizedState = s, lp());
      var m = u.queue;
      if (np(zE.bind(null, i, m, e), [e]), m.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Nn !== null && Nn.memoizedState.tag & On) {
        i.flags |= Lt, ep(On | rr, NE.bind(null, i, m, s, t), void 0, null);
        var y = Em();
        if (y === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Ao(y, is) || ME(i, t, s);
      }
      return s;
    }
    function ME(e, t, a) {
      e.flags |= bo;
      var i = {
        getSnapshot: t,
        value: a
      }, u = dt.updateQueue;
      if (u === null)
        u = LE(), dt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function NE(e, t, a, i) {
      t.value = a, t.getSnapshot = i, UE(t) && AE(e);
    }
    function zE(e, t, a) {
      var i = function() {
        UE(t) && AE(e);
      };
      return a(i);
    }
    function UE(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !ae(a, i);
      } catch {
        return !0;
      }
    }
    function AE(e) {
      var t = sa(e, Te);
      t !== null && Hn(t, e, Te, St);
    }
    function Qh(e) {
      var t = nl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: U,
        dispatch: null,
        lastRenderedReducer: Hg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = jx.bind(null, dt, a);
      return [t.memoizedState, i];
    }
    function Pg(e) {
      return jg(Hg);
    }
    function Yg(e) {
      return Vg(Hg);
    }
    function ep(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = dt.updateQueue;
      if (s === null)
        s = LE(), dt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function $g(e) {
      var t = nl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Ih(e) {
      var t = Ga();
      return t.memoizedState;
    }
    function tp(e, t, a, i) {
      var u = nl(), s = i === void 0 ? null : i;
      dt.flags |= e, u.memoizedState = ep(On | t, a, void 0, s);
    }
    function Gh(e, t, a, i) {
      var u = Ga(), s = i === void 0 ? null : i, f = void 0;
      if (Mn !== null) {
        var p = Mn.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (Ag(s, v)) {
            u.memoizedState = ep(t, a, f, s);
            return;
          }
        }
      }
      dt.flags |= e, u.memoizedState = ep(On | t, a, f, s);
    }
    function Wh(e, t) {
      return (dt.mode & na) !== Se ? tp(Tl | Lt | Fi, rr, e, t) : tp(Lt | Fi, rr, e, t);
    }
    function np(e, t) {
      return Gh(Lt, rr, e, t);
    }
    function Qg(e, t) {
      return tp(Le, tl, e, t);
    }
    function Xh(e, t) {
      return Gh(Le, tl, e, t);
    }
    function Ig(e, t) {
      var a = Le;
      return a |= hr, (dt.mode & na) !== Se && (a |= mr), tp(a, Ln, e, t);
    }
    function qh(e, t) {
      return Gh(Le, Ln, e, t);
    }
    function HE(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Gg(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = Le;
      return u |= hr, (dt.mode & na) !== Se && (u |= mr), tp(u, Ln, HE.bind(null, t, e), i);
    }
    function Kh(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Gh(Le, Ln, HE.bind(null, t, e), i);
    }
    function Ux(e, t) {
    }
    var Zh = Ux;
    function Wg(e, t) {
      var a = nl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function Jh(e, t) {
      var a = Ga(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (Ag(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Xg(e, t) {
      var a = nl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function em(e, t) {
      var a = Ga(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (Ag(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function qg(e) {
      var t = nl();
      return t.memoizedState = e, e;
    }
    function FE(e) {
      var t = Ga(), a = Mn, i = a.memoizedState;
      return VE(t, i, e);
    }
    function jE(e) {
      var t = Ga();
      if (Mn === null)
        return t.memoizedState = e, e;
      var a = Mn.memoizedState;
      return VE(t, a, e);
    }
    function VE(e, t, a) {
      var i = !ny(is);
      if (i) {
        if (!ae(a, t)) {
          var u = rd();
          dt.lanes = Me(dt.lanes, u), gp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, lp()), e.memoizedState = a, a;
    }
    function Ax(e, t, a) {
      var i = aa();
      ln(In(i, _n)), e(!0);
      var u = Kd.transition;
      Kd.transition = {};
      var s = Kd.transition;
      Kd.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (ln(i), Kd.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && qe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Kg() {
      var e = Qh(!1), t = e[0], a = e[1], i = Ax.bind(null, a), u = nl();
      return u.memoizedState = i, [t, i];
    }
    function BE() {
      var e = Pg(), t = e[0], a = Ga(), i = a.memoizedState;
      return [t, i];
    }
    function PE() {
      var e = Yg(), t = e[0], a = Ga(), i = a.memoizedState;
      return [t, i];
    }
    var YE = !1;
    function Hx() {
      return YE;
    }
    function Zg() {
      var e = nl(), t = Em(), a = t.identifierPrefix, i;
      if (nr()) {
        var u = KR();
        i = ":" + a + "R" + u;
        var s = Jd++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Mx++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function tm() {
      var e = Ga(), t = e.memoizedState;
      return t;
    }
    function Fx(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = eo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if ($E(e))
        QE(t, u);
      else {
        var s = oE(e, t, u, i);
        if (s !== null) {
          var f = Br();
          Hn(s, e, i, f), IE(s, t, i);
        }
      }
      GE(e, i);
    }
    function jx(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = eo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if ($E(e))
        QE(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === U && (s === null || s.lanes === U)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = K.current, K.current = Si;
            try {
              var v = t.lastRenderedState, m = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = m, ae(m, v)) {
                yx(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              K.current = p;
            }
          }
        }
        var y = oE(e, t, u, i);
        if (y !== null) {
          var x = Br();
          Hn(y, e, i, x), IE(y, t, i);
        }
      }
      GE(e, i);
    }
    function $E(e) {
      var t = e.alternate;
      return e === dt || t !== null && t === dt;
    }
    function QE(e, t) {
      Zd = Yh = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function IE(e, t, a) {
      if (nd(a)) {
        var i = t.lanes;
        i = ad(i, e.pendingLanes);
        var u = Me(i, a);
        t.lanes = u, Du(e, u);
      }
    }
    function GE(e, t, a) {
      $i(e, t);
    }
    var nm = {
      readContext: Tn,
      useCallback: xr,
      useContext: xr,
      useEffect: xr,
      useImperativeHandle: xr,
      useInsertionEffect: xr,
      useLayoutEffect: xr,
      useMemo: xr,
      useReducer: xr,
      useRef: xr,
      useState: xr,
      useDebugValue: xr,
      useDeferredValue: xr,
      useTransition: xr,
      useMutableSource: xr,
      useSyncExternalStore: xr,
      useId: xr,
      unstable_isNewReconciler: $
    }, WE = null, XE = null, qE = null, KE = null, rl = null, Si = null, rm = null;
    {
      var Jg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, be = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      WE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", lt(), Xc(t), Wg(e, t);
        },
        useContext: function(e) {
          return A = "useContext", lt(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", lt(), Xc(t), Wh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", lt(), Xc(a), Gg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", lt(), Xc(t), Qg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", lt(), Xc(t), Ig(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", lt(), Xc(t);
          var a = K.current;
          K.current = rl;
          try {
            return Xg(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", lt();
          var i = K.current;
          K.current = rl;
          try {
            return Fg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", lt(), $g(e);
        },
        useState: function(e) {
          A = "useState", lt();
          var t = K.current;
          K.current = rl;
          try {
            return Qh(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", lt(), void 0;
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", lt(), qg(e);
        },
        useTransition: function() {
          return A = "useTransition", lt(), Kg();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", lt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", lt(), Bg(e, t, a);
        },
        useId: function() {
          return A = "useId", lt(), Zg();
        },
        unstable_isNewReconciler: $
      }, XE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", I(), Wg(e, t);
        },
        useContext: function(e) {
          return A = "useContext", I(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", I(), Wh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", I(), Gg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", I(), Qg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", I(), Ig(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", I();
          var a = K.current;
          K.current = rl;
          try {
            return Xg(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", I();
          var i = K.current;
          K.current = rl;
          try {
            return Fg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", I(), $g(e);
        },
        useState: function(e) {
          A = "useState", I();
          var t = K.current;
          K.current = rl;
          try {
            return Qh(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", I(), void 0;
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", I(), qg(e);
        },
        useTransition: function() {
          return A = "useTransition", I(), Kg();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", I(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", I(), Bg(e, t, a);
        },
        useId: function() {
          return A = "useId", I(), Zg();
        },
        unstable_isNewReconciler: $
      }, qE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", I(), Jh(e, t);
        },
        useContext: function(e) {
          return A = "useContext", I(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", I(), np(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", I(), Kh(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", I(), Xh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", I(), qh(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", I();
          var a = K.current;
          K.current = Si;
          try {
            return em(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", I();
          var i = K.current;
          K.current = Si;
          try {
            return jg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", I(), Ih();
        },
        useState: function(e) {
          A = "useState", I();
          var t = K.current;
          K.current = Si;
          try {
            return Pg(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", I(), Zh();
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", I(), FE(e);
        },
        useTransition: function() {
          return A = "useTransition", I(), BE();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", I(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", I(), $h(e, t);
        },
        useId: function() {
          return A = "useId", I(), tm();
        },
        unstable_isNewReconciler: $
      }, KE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", I(), Jh(e, t);
        },
        useContext: function(e) {
          return A = "useContext", I(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", I(), np(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", I(), Kh(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", I(), Xh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", I(), qh(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", I();
          var a = K.current;
          K.current = rm;
          try {
            return em(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", I();
          var i = K.current;
          K.current = rm;
          try {
            return Vg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", I(), Ih();
        },
        useState: function(e) {
          A = "useState", I();
          var t = K.current;
          K.current = rm;
          try {
            return Yg(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", I(), Zh();
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", I(), jE(e);
        },
        useTransition: function() {
          return A = "useTransition", I(), PE();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", I(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", I(), $h(e, t);
        },
        useId: function() {
          return A = "useId", I(), tm();
        },
        unstable_isNewReconciler: $
      }, rl = {
        readContext: function(e) {
          return Jg(), Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", be(), lt(), Wg(e, t);
        },
        useContext: function(e) {
          return A = "useContext", be(), lt(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", be(), lt(), Wh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", be(), lt(), Gg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", be(), lt(), Qg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", be(), lt(), Ig(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", be(), lt();
          var a = K.current;
          K.current = rl;
          try {
            return Xg(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", be(), lt();
          var i = K.current;
          K.current = rl;
          try {
            return Fg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", be(), lt(), $g(e);
        },
        useState: function(e) {
          A = "useState", be(), lt();
          var t = K.current;
          K.current = rl;
          try {
            return Qh(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", be(), lt(), void 0;
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", be(), lt(), qg(e);
        },
        useTransition: function() {
          return A = "useTransition", be(), lt(), Kg();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", be(), lt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", be(), lt(), Bg(e, t, a);
        },
        useId: function() {
          return A = "useId", be(), lt(), Zg();
        },
        unstable_isNewReconciler: $
      }, Si = {
        readContext: function(e) {
          return Jg(), Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", be(), I(), Jh(e, t);
        },
        useContext: function(e) {
          return A = "useContext", be(), I(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", be(), I(), np(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", be(), I(), Kh(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", be(), I(), Xh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", be(), I(), qh(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", be(), I();
          var a = K.current;
          K.current = Si;
          try {
            return em(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", be(), I();
          var i = K.current;
          K.current = Si;
          try {
            return jg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", be(), I(), Ih();
        },
        useState: function(e) {
          A = "useState", be(), I();
          var t = K.current;
          K.current = Si;
          try {
            return Pg(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", be(), I(), Zh();
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", be(), I(), FE(e);
        },
        useTransition: function() {
          return A = "useTransition", be(), I(), BE();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", be(), I(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", be(), I(), $h(e, t);
        },
        useId: function() {
          return A = "useId", be(), I(), tm();
        },
        unstable_isNewReconciler: $
      }, rm = {
        readContext: function(e) {
          return Jg(), Tn(e);
        },
        useCallback: function(e, t) {
          return A = "useCallback", be(), I(), Jh(e, t);
        },
        useContext: function(e) {
          return A = "useContext", be(), I(), Tn(e);
        },
        useEffect: function(e, t) {
          return A = "useEffect", be(), I(), np(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return A = "useImperativeHandle", be(), I(), Kh(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return A = "useInsertionEffect", be(), I(), Xh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return A = "useLayoutEffect", be(), I(), qh(e, t);
        },
        useMemo: function(e, t) {
          A = "useMemo", be(), I();
          var a = K.current;
          K.current = Si;
          try {
            return em(e, t);
          } finally {
            K.current = a;
          }
        },
        useReducer: function(e, t, a) {
          A = "useReducer", be(), I();
          var i = K.current;
          K.current = Si;
          try {
            return Vg(e, t, a);
          } finally {
            K.current = i;
          }
        },
        useRef: function(e) {
          return A = "useRef", be(), I(), Ih();
        },
        useState: function(e) {
          A = "useState", be(), I();
          var t = K.current;
          K.current = Si;
          try {
            return Yg(e);
          } finally {
            K.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return A = "useDebugValue", be(), I(), Zh();
        },
        useDeferredValue: function(e) {
          return A = "useDeferredValue", be(), I(), jE(e);
        },
        useTransition: function() {
          return A = "useTransition", be(), I(), PE();
        },
        useMutableSource: function(e, t, a) {
          return A = "useMutableSource", be(), I(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return A = "useSyncExternalStore", be(), I(), $h(e, t);
        },
        useId: function() {
          return A = "useId", be(), I(), tm();
        },
        unstable_isNewReconciler: $
      };
    }
    var qu = Re.unstable_now, ZE = 0, am = -1, rp = -1, im = -1, eS = !1, lm = !1;
    function JE() {
      return eS;
    }
    function Vx() {
      lm = !0;
    }
    function Bx() {
      eS = !1, lm = !1;
    }
    function Px() {
      eS = lm, lm = !1;
    }
    function eC() {
      return ZE;
    }
    function tC() {
      ZE = qu();
    }
    function tS(e) {
      rp = qu(), e.actualStartTime < 0 && (e.actualStartTime = qu());
    }
    function nC(e) {
      rp = -1;
    }
    function um(e, t) {
      if (rp >= 0) {
        var a = qu() - rp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), rp = -1;
      }
    }
    function al(e) {
      if (am >= 0) {
        var t = qu() - am;
        am = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case te:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case ht:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function nS(e) {
      if (im >= 0) {
        var t = qu() - im;
        im = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case te:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case ht:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function il() {
      am = qu();
    }
    function rS() {
      im = qu();
    }
    function aS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ls(e, t) {
      return {
        value: e,
        source: t,
        stack: df(t),
        digest: null
      };
    }
    function iS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Yx(e, t) {
      return !0;
    }
    function lS(e, t) {
      try {
        var a = Yx(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === ce)
            return;
          console.error(i);
        }
        var p = u ? Oe(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", m;
        if (e.tag === te)
          m = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var y = Oe(e) || "Anonymous";
          m = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + y + ".");
        }
        var x = v + `
` + f + `

` + ("" + m);
        console.error(x);
      } catch (T) {
        setTimeout(function() {
          throw T;
        });
      }
    }
    var $x = typeof WeakMap == "function" ? WeakMap : Map;
    function rC(e, t, a) {
      var i = Wl(St, a);
      i.tag = lg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        AD(u), lS(e, t);
      }, i;
    }
    function uS(e, t, a) {
      var i = Wl(St, a);
      i.tag = lg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          v1(e), lS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        v1(e), lS(e, t), typeof u != "function" && zD(this);
        var v = t.value, m = t.stack;
        this.componentDidCatch(v, {
          componentStack: m !== null ? m : ""
        }), typeof u != "function" && (Cr(e.lanes, Te) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Oe(e) || "Unknown"));
      }), i;
    }
    function aC(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new $x(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = HD.bind(null, e, t, a);
        kn && Sp(e, a), t.then(s, s);
      }
    }
    function Qx(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function Ix(e, t) {
      var a = e.tag;
      if ((e.mode & Fe) === Se && (a === se || a === je || a === Ae)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function iC(e) {
      var t = e;
      do {
        if (t.tag === Ve && Ox(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function lC(e, t, a, i, u) {
      if ((e.mode & Fe) === Se) {
        if (e === t)
          e.flags |= yn;
        else {
          if (e.flags |= we, a.flags |= ko, a.flags &= ~(As | Nr), a.tag === ce) {
            var s = a.alternate;
            if (s === null)
              a.tag = Fn;
            else {
              var f = Wl(St, Te);
              f.tag = Lh, Iu(a, f, Te);
            }
          }
          a.lanes = Me(a.lanes, Te);
        }
        return e;
      }
      return e.flags |= yn, e.lanes = u, e;
    }
    function Gx(e, t, a, i, u) {
      if (a.flags |= Nr, kn && Sp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        Ix(a), nr() && a.mode & Fe && q0();
        var f = iC(t);
        if (f !== null) {
          f.flags &= ~Vt, lC(f, t, a, e, u), f.mode & Fe && aC(e, s, u), Qx(f, e, s);
          return;
        } else {
          if (!xu(u)) {
            aC(e, s, u), VS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (nr() && a.mode & Fe) {
        q0();
        var v = iC(t);
        if (v !== null) {
          (v.flags & yn) === he && (v.flags |= Vt), lC(v, t, a, e, u), Jy(ls(i, a));
          return;
        }
      }
      i = ls(i, a), DD(i);
      var m = t;
      do {
        switch (m.tag) {
          case te: {
            var y = i;
            m.flags |= yn;
            var x = an(u);
            m.lanes = Me(m.lanes, x);
            var T = rC(m, y, x);
            sg(m, T);
            return;
          }
          case ce:
            var _ = i, O = m.type, N = m.stateNode;
            if ((m.flags & we) === he && (typeof O.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && !i1(N))) {
              m.flags |= yn;
              var J = an(u);
              m.lanes = Me(m.lanes, J);
              var me = uS(m, _, J);
              sg(m, me);
              return;
            }
            break;
        }
        m = m.return;
      } while (m !== null);
    }
    function Wx() {
      return null;
    }
    var ap = M.ReactCurrentOwner, Ei = !1, oS, ip, sS, cS, fS, us, dS, om;
    oS = {}, ip = {}, sS = {}, cS = {}, fS = {}, us = !1, dS = {}, om = {};
    function jr(e, t, a, i) {
      e === null ? t.child = xE(t, null, a, i) : t.child = $c(t, e.child, a, i);
    }
    function Xx(e, t, a, i) {
      t.child = $c(t, e.child, null, i), t.child = $c(t, null, a, i);
    }
    function uC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && vi(
          s,
          i,
          // Resolved props
          "prop",
          yt(a)
        );
      }
      var f = a.render, p = t.ref, v, m;
      Yc(t, u), Yi(t);
      {
        if (ap.current = t, Ta(!0), v = qc(e, t, f, i, p, u), m = Kc(), t.mode & Ut) {
          rn(!0);
          try {
            v = qc(e, t, f, i, p, u), m = Kc();
          } finally {
            rn(!1);
          }
        }
        Ta(!1);
      }
      return Rl(), e !== null && !Ei ? (_E(e, t, u), Xl(e, t, u)) : (nr() && m && Gy(t), t.flags |= Ai, jr(e, t, v, u), t.child);
    }
    function oC(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (eb(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = lf(s), t.tag = Ae, t.type = f, hS(t, s), sC(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          p && vi(
            p,
            i,
            // Resolved props
            "prop",
            yt(s)
          );
        }
        var v = KS(a.type, null, i, t, t.mode, u);
        return v.ref = t.ref, v.return = t, t.child = v, v;
      }
      {
        var m = a.type, y = m.propTypes;
        y && vi(
          y,
          i,
          // Resolved props
          "prop",
          yt(m)
        );
      }
      var x = e.child, T = CS(e, u);
      if (!T) {
        var _ = x.memoizedProps, O = a.compare;
        if (O = O !== null ? O : pe, O(_, i) && e.ref === t.ref)
          return Xl(e, t, u);
      }
      t.flags |= Ai;
      var N = ds(x, i);
      return N.ref = t.ref, N.return = t, t.child = N, N;
    }
    function sC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Ee) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var m = s && s.propTypes;
          m && vi(
            m,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            yt(s)
          );
        }
      }
      if (e !== null) {
        var y = e.memoizedProps;
        if (pe(y, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (Ei = !1, t.pendingProps = i = y, CS(e, u))
            (e.flags & ko) !== he && (Ei = !0);
          else
            return t.lanes = e.lanes, Xl(e, t, u);
      }
      return pS(e, t, a, i, u);
    }
    function cC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || Z)
        if ((t.mode & Fe) === Se) {
          var f = {
            baseLanes: U,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Cm(t, a);
        } else if (Cr(a, Er)) {
          var x = {
            baseLanes: U,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = x;
          var T = s !== null ? s.baseLanes : a;
          Cm(t, T);
        } else {
          var p = null, v;
          if (s !== null) {
            var m = s.baseLanes;
            v = Me(m, a);
          } else
            v = a;
          t.lanes = t.childLanes = Er;
          var y = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = y, t.updateQueue = null, Cm(t, v), null;
        }
      else {
        var _;
        s !== null ? (_ = Me(s.baseLanes, a), t.memoizedState = null) : _ = a, Cm(t, _);
      }
      return jr(e, t, u, a), t.child;
    }
    function qx(e, t, a) {
      var i = t.pendingProps;
      return jr(e, t, i, a), t.child;
    }
    function Kx(e, t, a) {
      var i = t.pendingProps.children;
      return jr(e, t, i, a), t.child;
    }
    function Zx(e, t, a) {
      {
        t.flags |= Le;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return jr(e, t, s, a), t.child;
    }
    function fC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= vr, t.flags |= Bf);
    }
    function pS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && vi(
          s,
          i,
          // Resolved props
          "prop",
          yt(a)
        );
      }
      var f;
      {
        var p = Hc(t, a, !0);
        f = Fc(t, p);
      }
      var v, m;
      Yc(t, u), Yi(t);
      {
        if (ap.current = t, Ta(!0), v = qc(e, t, a, i, f, u), m = Kc(), t.mode & Ut) {
          rn(!0);
          try {
            v = qc(e, t, a, i, f, u), m = Kc();
          } finally {
            rn(!1);
          }
        }
        Ta(!1);
      }
      return Rl(), e !== null && !Ei ? (_E(e, t, u), Xl(e, t, u)) : (nr() && m && Gy(t), t.flags |= Ai, jr(e, t, v, u), t.child);
    }
    function dC(e, t, a, i, u) {
      {
        switch (hb(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= we, t.flags |= yn;
            var m = new Error("Simulated error coming from DevTools"), y = an(u);
            t.lanes = Me(t.lanes, y);
            var x = uS(t, ls(m, t), y);
            sg(t, x);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var T = a.propTypes;
          T && vi(
            T,
            i,
            // Resolved props
            "prop",
            yt(a)
          );
        }
      }
      var _;
      el(a) ? (_ = !0, Eh(t)) : _ = !1, Yc(t, u);
      var O = t.stateNode, N;
      O === null ? (cm(e, t), SE(t, a, i), Cg(t, a, i, u), N = !0) : e === null ? N = xx(t, a, i, u) : N = wx(e, t, a, i, u);
      var J = vS(e, t, a, N, _, u);
      {
        var me = t.stateNode;
        N && me.props !== i && (us || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Oe(t) || "a component"), us = !0);
      }
      return J;
    }
    function vS(e, t, a, i, u, s) {
      fC(e, t);
      var f = (t.flags & we) !== he;
      if (!i && !f)
        return u && I0(t, a, !1), Xl(e, t, s);
      var p = t.stateNode;
      ap.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, nC();
      else {
        Yi(t);
        {
          if (Ta(!0), v = p.render(), t.mode & Ut) {
            rn(!0);
            try {
              p.render();
            } finally {
              rn(!1);
            }
          }
          Ta(!1);
        }
        Rl();
      }
      return t.flags |= Ai, e !== null && f ? Xx(e, t, v, s) : jr(e, t, v, s), t.memoizedState = p.state, u && I0(t, a, !0), t.child;
    }
    function pC(e) {
      var t = e.stateNode;
      t.pendingContext ? $0(e, t.pendingContext, t.pendingContext !== t.context) : t.context && $0(e, t.context, !1), bg(e, t.containerInfo);
    }
    function Jx(e, t, a) {
      if (pC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      fE(e, t), Uh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, m = t.updateQueue;
        if (m.baseState = v, t.memoizedState = v, t.flags & Vt) {
          var y = ls(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return vC(e, t, p, a, y);
        } else if (p !== s) {
          var x = ls(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return vC(e, t, p, a, x);
        } else {
          rx(t);
          var T = xE(t, null, p, a);
          t.child = T;
          for (var _ = T; _; )
            _.flags = _.flags & ~xt | Jr, _ = _.sibling;
        }
      } else {
        if (Bc(), p === s)
          return Xl(e, t, a);
        jr(e, t, p, a);
      }
      return t.child;
    }
    function vC(e, t, a, i, u) {
      return Bc(), Jy(u), t.flags |= Vt, jr(e, t, a, i), t.child;
    }
    function ew(e, t, a) {
      DE(t), e === null && Zy(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Ny(i, u);
      return p ? f = null : s !== null && Ny(i, s) && (t.flags |= it), fC(e, t), jr(e, t, f, a), t.child;
    }
    function tw(e, t) {
      return e === null && Zy(t), null;
    }
    function nw(e, t, a, i) {
      cm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var m = t.tag = tb(v), y = yi(v, u), x;
      switch (m) {
        case se:
          return hS(t, v), t.type = v = lf(v), x = pS(null, t, v, y, i), x;
        case ce:
          return t.type = v = QS(v), x = dC(null, t, v, y, i), x;
        case je:
          return t.type = v = IS(v), x = uC(null, t, v, y, i), x;
        case Tt: {
          if (t.type !== t.elementType) {
            var T = v.propTypes;
            T && vi(
              T,
              y,
              // Resolved for outer only
              "prop",
              yt(v)
            );
          }
          return x = oC(
            null,
            t,
            v,
            yi(v.type, y),
            // The inner type can have defaults too
            i
          ), x;
        }
      }
      var _ = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Ee && (_ = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + _));
    }
    function rw(e, t, a, i, u) {
      cm(e, t), t.tag = ce;
      var s;
      return el(a) ? (s = !0, Eh(t)) : s = !1, Yc(t, u), SE(t, a, i), Cg(t, a, i, u), vS(null, t, a, !0, s, u);
    }
    function aw(e, t, a, i) {
      cm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Hc(t, a, !1);
        s = Fc(t, f);
      }
      Yc(t, i);
      var p, v;
      Yi(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var m = yt(a) || "Unknown";
          oS[m] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", m, m), oS[m] = !0);
        }
        t.mode & Ut && mi.recordLegacyContextWarning(t, null), Ta(!0), ap.current = t, p = qc(null, t, a, u, s, i), v = Kc(), Ta(!1);
      }
      if (Rl(), t.flags |= Ai, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var y = yt(a) || "Unknown";
        ip[y] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", y, y, y), ip[y] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var x = yt(a) || "Unknown";
          ip[x] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), ip[x] = !0);
        }
        t.tag = ce, t.memoizedState = null, t.updateQueue = null;
        var T = !1;
        return el(a) ? (T = !0, Eh(t)) : T = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, og(t), gE(t, p), Cg(t, a, u, i), vS(null, t, a, !0, T, i);
      } else {
        if (t.tag = se, t.mode & Ut) {
          rn(!0);
          try {
            p = qc(null, t, a, u, s, i), v = Kc();
          } finally {
            rn(!1);
          }
        }
        return nr() && v && Gy(t), jr(null, t, p, i), hS(t, a), t.child;
      }
    }
    function hS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Xr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), fS[u] || (fS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var f = yt(t) || "Unknown";
          cS[f] || (S("%s: Function components do not support getDerivedStateFromProps.", f), cS[f] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var p = yt(t) || "Unknown";
          sS[p] || (S("%s: Function components do not support contextType.", p), sS[p] = !0);
        }
      }
    }
    var mS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Qe
    };
    function yS(e) {
      return {
        baseLanes: e,
        cachePool: Wx(),
        transitions: null
      };
    }
    function iw(e, t) {
      var a = null;
      return {
        baseLanes: Me(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function lw(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Og(e, qd);
    }
    function uw(e, t) {
      return wu(e.childLanes, t);
    }
    function hC(e, t, a) {
      var i = t.pendingProps;
      mb(t) && (t.flags |= we);
      var u = gi.current, s = !1, f = (t.flags & we) !== he;
      if (f || lw(u, e) ? (s = !0, t.flags &= ~we) : (e === null || e.memoizedState !== null) && (u = _x(u, kE)), u = Ic(u), Wu(t, u), e === null) {
        Zy(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return dw(t, v);
        }
        var m = i.children, y = i.fallback;
        if (s) {
          var x = ow(t, m, y, a), T = t.child;
          return T.memoizedState = yS(a), t.memoizedState = mS, x;
        } else
          return gS(t, m);
      } else {
        var _ = e.memoizedState;
        if (_ !== null) {
          var O = _.dehydrated;
          if (O !== null)
            return pw(e, t, f, i, O, _, a);
        }
        if (s) {
          var N = i.fallback, J = i.children, me = cw(e, t, J, N, a), fe = t.child, Ge = e.child.memoizedState;
          return fe.memoizedState = Ge === null ? yS(a) : iw(Ge, a), fe.childLanes = uw(e, a), t.memoizedState = mS, me;
        } else {
          var Ye = i.children, D = sw(e, t, Ye, a);
          return t.memoizedState = null, D;
        }
      }
    }
    function gS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = SS(u, i);
      return s.return = e, e.child = s, s;
    }
    function ow(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & Fe) === Se && s !== null ? (p = s, p.childLanes = U, p.pendingProps = f, e.mode & Ce && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = no(a, u, i, null)) : (p = SS(f, u), v = no(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function SS(e, t, a) {
      return m1(e, t, U, null);
    }
    function mC(e, t) {
      return ds(e, t);
    }
    function sw(e, t, a, i) {
      var u = e.child, s = u.sibling, f = mC(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Fe) === Se && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= at) : p.push(s);
      }
      return t.child = f, f;
    }
    function cw(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, m;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & Fe) === Se && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var y = t.child;
        m = y, m.childLanes = U, m.pendingProps = v, t.mode & Ce && (m.actualDuration = 0, m.actualStartTime = -1, m.selfBaseDuration = f.selfBaseDuration, m.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        m = mC(f, v), m.subtreeFlags = f.subtreeFlags & bn;
      var x;
      return p !== null ? x = ds(p, i) : (x = no(i, s, u, null), x.flags |= xt), x.return = t, m.return = t, m.sibling = x, t.child = m, x;
    }
    function sm(e, t, a, i) {
      i !== null && Jy(i), $c(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = gS(t, s);
      return f.flags |= xt, t.memoizedState = null, f;
    }
    function fw(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = SS(f, s), v = no(i, s, u, null);
      return v.flags |= xt, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & Fe) !== Se && $c(t, e.child, null, u), v;
    }
    function dw(e, t, a) {
      return (e.mode & Fe) === Se ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Te) : Hy(t) ? e.lanes = Dl : e.lanes = Er, null;
    }
    function pw(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Vt) {
          t.flags &= ~Vt;
          var D = iS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return sm(e, t, f, D);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= we, null;
          var z = i.children, b = i.fallback, B = fw(e, t, z, b, f), ee = t.child;
          return ee.memoizedState = yS(f), t.memoizedState = mS, B;
        }
      else {
        if (tx(), (t.mode & Fe) === Se)
          return sm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Hy(u)) {
          var p, v, m;
          {
            var y = gR(u);
            p = y.digest, v = y.message, m = y.stack;
          }
          var x;
          v ? x = new Error(v) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var T = iS(x, p, m);
          return sm(e, t, f, T);
        }
        var _ = Cr(f, e.childLanes);
        if (Ei || _) {
          var O = Em();
          if (O !== null) {
            var N = ay(O, f);
            if (N !== Qe && N !== s.retryLane) {
              s.retryLane = N;
              var J = St;
              sa(e, N), Hn(O, e, N, J);
            }
          }
          VS();
          var me = iS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return sm(e, t, f, me);
        } else if (F0(u)) {
          t.flags |= we, t.child = e.child;
          var fe = FD.bind(null, e);
          return SR(u, fe), null;
        } else {
          ax(t, u, s.treeContext);
          var Ge = i.children, Ye = gS(t, Ge);
          return Ye.flags |= Jr, Ye;
        }
      }
    }
    function yC(e, t, a) {
      e.lanes = Me(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Me(i.lanes, t)), ag(e.return, t, a);
    }
    function vw(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Ve) {
          var u = i.memoizedState;
          u !== null && yC(i, a, e);
        } else if (i.tag === ct)
          yC(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function hw(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Ph(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function mw(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !dS[e])
        if (dS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function yw(e, t) {
      e !== void 0 && !om[e] && (e !== "collapsed" && e !== "hidden" ? (om[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (om[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function gC(e, t) {
      {
        var a = hn(e), i = !a && typeof Ka(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function gw(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (hn(e)) {
          for (var a = 0; a < e.length; a++)
            if (!gC(e[a], a))
              return;
        } else {
          var i = Ka(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!gC(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function ES(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function SC(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      mw(u), yw(s, u), gw(f, u), jr(e, t, f, a);
      var p = gi.current, v = Og(p, qd);
      if (v)
        p = Lg(p, qd), t.flags |= we;
      else {
        var m = e !== null && (e.flags & we) !== he;
        m && vw(t, t.child, a), p = Ic(p);
      }
      if (Wu(t, p), (t.mode & Fe) === Se)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var y = hw(t.child), x;
            y === null ? (x = t.child, t.child = null) : (x = y.sibling, y.sibling = null), ES(
              t,
              !1,
              // isBackwards
              x,
              y,
              s
            );
            break;
          }
          case "backwards": {
            var T = null, _ = t.child;
            for (t.child = null; _ !== null; ) {
              var O = _.alternate;
              if (O !== null && Ph(O) === null) {
                t.child = _;
                break;
              }
              var N = _.sibling;
              _.sibling = T, T = _, _ = N;
            }
            ES(
              t,
              !0,
              // isBackwards
              T,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            ES(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Sw(e, t, a) {
      bg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = $c(t, null, i, a) : jr(e, t, i, a), t.child;
    }
    var EC = !1;
    function Ew(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || EC || (EC = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && vi(v, s, "prop", "Context.Provider");
      }
      if (uE(t, u, p), f !== null) {
        var m = f.value;
        if (ae(m, p)) {
          if (f.children === s.children && !gh())
            return Xl(e, t, a);
        } else
          vx(t, u, a);
      }
      var y = s.children;
      return jr(e, t, y, a), t.child;
    }
    var CC = !1;
    function Cw(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (CC || (CC = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Yc(t, a);
      var f = Tn(i);
      Yi(t);
      var p;
      return ap.current = t, Ta(!0), p = s(f), Ta(!1), Rl(), t.flags |= Ai, jr(e, t, p, a), t.child;
    }
    function lp() {
      Ei = !0;
    }
    function cm(e, t) {
      (t.mode & Fe) === Se && e !== null && (e.alternate = null, t.alternate = null, t.flags |= xt);
    }
    function Xl(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), nC(), gp(t.lanes), Cr(a, t.childLanes) ? (Dx(e, t), t.child) : null;
    }
    function Tw(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= at) : s.push(e), a.flags |= xt, a;
      }
    }
    function CS(e, t) {
      var a = e.lanes;
      return !!Cr(a, t);
    }
    function Rw(e, t, a) {
      switch (t.tag) {
        case te:
          pC(t), t.stateNode, Bc();
          break;
        case le:
          DE(t);
          break;
        case ce: {
          var i = t.type;
          el(i) && Eh(t);
          break;
        }
        case de:
          bg(t, t.stateNode.containerInfo);
          break;
        case Ke: {
          var u = t.memoizedProps.value, s = t.type._context;
          uE(t, s, u);
          break;
        }
        case ht:
          {
            var f = Cr(a, t.childLanes);
            f && (t.flags |= Le);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case Ve: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Wu(t, Ic(gi.current)), t.flags |= we, null;
            var m = t.child, y = m.childLanes;
            if (Cr(a, y))
              return hC(e, t, a);
            Wu(t, Ic(gi.current));
            var x = Xl(e, t, a);
            return x !== null ? x.sibling : null;
          } else
            Wu(t, Ic(gi.current));
          break;
        }
        case ct: {
          var T = (e.flags & we) !== he, _ = Cr(a, t.childLanes);
          if (T) {
            if (_)
              return SC(e, t, a);
            t.flags |= we;
          }
          var O = t.memoizedState;
          if (O !== null && (O.rendering = null, O.tail = null, O.lastEffect = null), Wu(t, gi.current), _)
            break;
          return null;
        }
        case ke:
        case $e:
          return t.lanes = U, cC(e, t, a);
      }
      return Xl(e, t, a);
    }
    function TC(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Tw(e, t, KS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || gh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Ei = !0;
        else {
          var s = CS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & we) === he)
            return Ei = !1, Rw(e, t, a);
          (e.flags & ko) !== he ? Ei = !0 : Ei = !1;
        }
      } else if (Ei = !1, nr() && XR(t)) {
        var f = t.index, p = qR();
        X0(t, p, f);
      }
      switch (t.lanes = U, t.tag) {
        case nt:
          return aw(e, t, t.type, a);
        case Rn: {
          var v = t.elementType;
          return nw(e, t, v, a);
        }
        case se: {
          var m = t.type, y = t.pendingProps, x = t.elementType === m ? y : yi(m, y);
          return pS(e, t, m, x, a);
        }
        case ce: {
          var T = t.type, _ = t.pendingProps, O = t.elementType === T ? _ : yi(T, _);
          return dC(e, t, T, O, a);
        }
        case te:
          return Jx(e, t, a);
        case le:
          return ew(e, t, a);
        case Ue:
          return tw(e, t);
        case Ve:
          return hC(e, t, a);
        case de:
          return Sw(e, t, a);
        case je: {
          var N = t.type, J = t.pendingProps, me = t.elementType === N ? J : yi(N, J);
          return uC(e, t, N, me, a);
        }
        case ut:
          return qx(e, t, a);
        case vt:
          return Kx(e, t, a);
        case ht:
          return Zx(e, t, a);
        case Ke:
          return Ew(e, t, a);
        case cn:
          return Cw(e, t, a);
        case Tt: {
          var fe = t.type, Ge = t.pendingProps, Ye = yi(fe, Ge);
          if (t.type !== t.elementType) {
            var D = fe.propTypes;
            D && vi(
              D,
              Ye,
              // Resolved for outer only
              "prop",
              yt(fe)
            );
          }
          return Ye = yi(fe.type, Ye), oC(e, t, fe, Ye, a);
        }
        case Ae:
          return sC(e, t, t.type, t.pendingProps, a);
        case Fn: {
          var z = t.type, b = t.pendingProps, B = t.elementType === z ? b : yi(z, b);
          return rw(e, t, z, B, a);
        }
        case ct:
          return SC(e, t, a);
        case xn:
          break;
        case ke:
          return cC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Zc(e) {
      e.flags |= Le;
    }
    function RC(e) {
      e.flags |= vr, e.flags |= Bf;
    }
    var xC, TS, wC, DC;
    xC = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === le || u.tag === Ue)
          IT(e, u.stateNode);
        else if (u.tag !== de) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, TS = function(e, t) {
    }, wC = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = kg(), v = WT(f, a, s, i, u, p);
        t.updateQueue = v, v && Zc(t);
      }
    }, DC = function(e, t, a, i) {
      a !== i && Zc(t);
    };
    function up(e, t) {
      if (!nr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function ar(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = U, i = he;
      if (t) {
        if ((e.mode & Ce) !== Se) {
          for (var v = e.selfBaseDuration, m = e.child; m !== null; )
            a = Me(a, Me(m.lanes, m.childLanes)), i |= m.subtreeFlags & bn, i |= m.flags & bn, v += m.treeBaseDuration, m = m.sibling;
          e.treeBaseDuration = v;
        } else
          for (var y = e.child; y !== null; )
            a = Me(a, Me(y.lanes, y.childLanes)), i |= y.subtreeFlags & bn, i |= y.flags & bn, y.return = e, y = y.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ce) !== Se) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Me(a, Me(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = Me(a, Me(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function xw(e, t, a) {
      if (sx() && (t.mode & Fe) !== Se && (t.flags & we) === he)
        return nE(t), Bc(), t.flags |= Vt | Nr | yn, !1;
      var i = wh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (ux(t), ar(t), (t.mode & Ce) !== Se) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Bc(), (t.flags & we) === he && (t.memoizedState = null), t.flags |= Le, ar(t), (t.mode & Ce) !== Se) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return rE(), !0;
    }
    function bC(e, t, a) {
      var i = t.pendingProps;
      switch (Wy(t), t.tag) {
        case nt:
        case Rn:
        case Ae:
        case se:
        case je:
        case ut:
        case vt:
        case ht:
        case cn:
        case Tt:
          return ar(t), null;
        case ce: {
          var u = t.type;
          return el(u) && Sh(t), ar(t), null;
        }
        case te: {
          var s = t.stateNode;
          if (Qc(t), $y(t), Ng(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = wh(t);
            if (f)
              Zc(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Vt) !== he) && (t.flags |= Zr, rE());
            }
          }
          return TS(e, t), ar(t), null;
        }
        case le: {
          _g(t);
          var v = wE(), m = t.type;
          if (e !== null && t.stateNode != null)
            wC(e, t, m, i, v), e.ref !== t.ref && RC(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return ar(t), null;
            }
            var y = kg(), x = wh(t);
            if (x)
              ix(t, v, y) && Zc(t);
            else {
              var T = QT(m, i, v, y, t);
              xC(T, t, !1, !1), t.stateNode = T, GT(T, m, i, v) && Zc(t);
            }
            t.ref !== null && RC(t);
          }
          return ar(t), null;
        }
        case Ue: {
          var _ = i;
          if (e && t.stateNode != null) {
            var O = e.memoizedProps;
            DC(e, t, O, _);
          } else {
            if (typeof _ != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var N = wE(), J = kg(), me = wh(t);
            me ? lx(t) && Zc(t) : t.stateNode = XT(_, N, J, t);
          }
          return ar(t), null;
        }
        case Ve: {
          Gc(t);
          var fe = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Ge = xw(e, t, fe);
            if (!Ge)
              return t.flags & yn ? t : null;
          }
          if ((t.flags & we) !== he)
            return t.lanes = a, (t.mode & Ce) !== Se && aS(t), t;
          var Ye = fe !== null, D = e !== null && e.memoizedState !== null;
          if (Ye !== D && Ye) {
            var z = t.child;
            if (z.flags |= Hi, (t.mode & Fe) !== Se) {
              var b = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !Ze);
              b || Og(gi.current, kE) ? wD() : VS();
            }
          }
          var B = t.updateQueue;
          if (B !== null && (t.flags |= Le), ar(t), (t.mode & Ce) !== Se && Ye) {
            var ee = t.child;
            ee !== null && (t.treeBaseDuration -= ee.treeBaseDuration);
          }
          return null;
        }
        case de:
          return Qc(t), TS(e, t), e === null && PR(t.stateNode.containerInfo), ar(t), null;
        case Ke:
          var X = t.type._context;
          return rg(X, t), ar(t), null;
        case Fn: {
          var xe = t.type;
          return el(xe) && Sh(t), ar(t), null;
        }
        case ct: {
          Gc(t);
          var _e = t.memoizedState;
          if (_e === null)
            return ar(t), null;
          var pt = (t.flags & we) !== he, et = _e.rendering;
          if (et === null)
            if (pt)
              up(_e, !1);
            else {
              var sn = bD() && (e === null || (e.flags & we) === he);
              if (!sn)
                for (var tt = t.child; tt !== null; ) {
                  var Zt = Ph(tt);
                  if (Zt !== null) {
                    pt = !0, t.flags |= we, up(_e, !1);
                    var wr = Zt.updateQueue;
                    return wr !== null && (t.updateQueue = wr, t.flags |= Le), t.subtreeFlags = he, bx(t, a), Wu(t, Lg(gi.current, qd)), t.child;
                  }
                  tt = tt.sibling;
                }
              _e.tail !== null && zt() > WC() && (t.flags |= we, pt = !0, up(_e, !1), t.lanes = ed);
            }
          else {
            if (!pt) {
              var sr = Ph(et);
              if (sr !== null) {
                t.flags |= we, pt = !0;
                var Oa = sr.updateQueue;
                if (Oa !== null && (t.updateQueue = Oa, t.flags |= Le), up(_e, !0), _e.tail === null && _e.tailMode === "hidden" && !et.alternate && !nr())
                  return ar(t), null;
              } else
                // The time it took to render last row is greater than the remaining
                // time we have to render. So rendering one more row would likely
                // exceed it.
                zt() * 2 - _e.renderingStartTime > WC() && a !== Er && (t.flags |= we, pt = !0, up(_e, !1), t.lanes = ed);
            }
            if (_e.isBackwards)
              et.sibling = t.child, t.child = et;
            else {
              var Pr = _e.last;
              Pr !== null ? Pr.sibling = et : t.child = et, _e.last = et;
            }
          }
          if (_e.tail !== null) {
            var Yr = _e.tail;
            _e.rendering = Yr, _e.tail = Yr.sibling, _e.renderingStartTime = zt(), Yr.sibling = null;
            var Dr = gi.current;
            return pt ? Dr = Lg(Dr, qd) : Dr = Ic(Dr), Wu(t, Dr), Yr;
          }
          return ar(t), null;
        }
        case xn:
          break;
        case ke:
        case $e: {
          jS(t);
          var eu = t.memoizedState, uf = eu !== null;
          if (e !== null) {
            var Rp = e.memoizedState, ol = Rp !== null;
            ol !== uf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !Z && (t.flags |= Hi);
          }
          return !uf || (t.mode & Fe) === Se ? ar(t) : Cr(ul, Er) && (ar(t), t.subtreeFlags & (xt | Le) && (t.flags |= Hi)), null;
        }
        case fn:
          return null;
        case Rt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function ww(e, t, a) {
      switch (Wy(t), t.tag) {
        case ce: {
          var i = t.type;
          el(i) && Sh(t);
          var u = t.flags;
          return u & yn ? (t.flags = u & ~yn | we, (t.mode & Ce) !== Se && aS(t), t) : null;
        }
        case te: {
          t.stateNode, Qc(t), $y(t), Ng();
          var s = t.flags;
          return (s & yn) !== he && (s & we) === he ? (t.flags = s & ~yn | we, t) : null;
        }
        case le:
          return _g(t), null;
        case Ve: {
          Gc(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Bc();
          }
          var p = t.flags;
          return p & yn ? (t.flags = p & ~yn | we, (t.mode & Ce) !== Se && aS(t), t) : null;
        }
        case ct:
          return Gc(t), null;
        case de:
          return Qc(t), null;
        case Ke:
          var v = t.type._context;
          return rg(v, t), null;
        case ke:
        case $e:
          return jS(t), null;
        case fn:
          return null;
        default:
          return null;
      }
    }
    function kC(e, t, a) {
      switch (Wy(t), t.tag) {
        case ce: {
          var i = t.type.childContextTypes;
          i != null && Sh(t);
          break;
        }
        case te: {
          t.stateNode, Qc(t), $y(t), Ng();
          break;
        }
        case le: {
          _g(t);
          break;
        }
        case de:
          Qc(t);
          break;
        case Ve:
          Gc(t);
          break;
        case ct:
          Gc(t);
          break;
        case Ke:
          var u = t.type._context;
          rg(u, t);
          break;
        case ke:
        case $e:
          jS(t);
          break;
      }
    }
    var _C = null;
    _C = /* @__PURE__ */ new Set();
    var fm = !1, ir = !1, Dw = typeof WeakSet == "function" ? WeakSet : Set, ie = null, Jc = null, ef = null;
    function bw(e) {
      Cl(null, function() {
        throw e;
      }), jf();
    }
    var kw = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ce)
        try {
          il(), t.componentWillUnmount();
        } finally {
          al(e);
        }
      else
        t.componentWillUnmount();
    };
    function OC(e, t) {
      try {
        Ku(Ln, e);
      } catch (a) {
        kt(e, t, a);
      }
    }
    function RS(e, t, a) {
      try {
        kw(e, a);
      } catch (i) {
        kt(e, t, i);
      }
    }
    function _w(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        kt(e, t, i);
      }
    }
    function LC(e, t) {
      try {
        NC(e);
      } catch (a) {
        kt(e, t, a);
      }
    }
    function tf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (tn && $r && e.mode & Ce)
              try {
                il(), i = a(null);
              } finally {
                al(e);
              }
            else
              i = a(null);
          } catch (u) {
            kt(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Oe(e));
        } else
          a.current = null;
    }
    function dm(e, t, a) {
      try {
        a();
      } catch (i) {
        kt(e, t, i);
      }
    }
    var MC = !1;
    function Ow(e, t) {
      YT(e.containerInfo), ie = t, Lw();
      var a = MC;
      return MC = !1, a;
    }
    function Lw() {
      for (; ie !== null; ) {
        var e = ie, t = e.child;
        (e.subtreeFlags & yu) !== he && t !== null ? (t.return = e, ie = t) : Mw();
      }
    }
    function Mw() {
      for (; ie !== null; ) {
        var e = ie;
        ft(e);
        try {
          Nw(e);
        } catch (a) {
          kt(e, e.return, a);
        }
        nn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ie = t;
          return;
        }
        ie = e.return;
      }
    }
    function Nw(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Zr) !== he) {
        switch (ft(e), e.tag) {
          case se:
          case je:
          case Ae:
            break;
          case ce: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !us && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Oe(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Oe(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : yi(e.type, i), u);
              {
                var p = _C;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Oe(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case te: {
            {
              var v = e.stateNode;
              vR(v.containerInfo);
            }
            break;
          }
          case le:
          case Ue:
          case de:
          case Fn:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        nn();
      }
    }
    function Ci(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & rr) !== ca ? $s(t) : (e & Ln) !== ca && Qs(t), (e & tl) !== ca && Ep(!0), dm(t, a, p), (e & tl) !== ca && Ep(!1), (e & rr) !== ca ? xv() : (e & Ln) !== ca && gu());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Ku(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & rr) !== ca ? Rv(t) : (e & Ln) !== ca && wv(t);
            var f = s.create;
            (e & tl) !== ca && Ep(!0), s.destroy = f(), (e & tl) !== ca && Ep(!1), (e & rr) !== ca ? Kf() : (e & Ln) !== ca && Dv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & Ln) !== he ? v = "useLayoutEffect" : (s.tag & tl) !== he ? v = "useInsertionEffect" : v = "useEffect";
                var m = void 0;
                p === null ? m = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? m = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : m = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, m);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function zw(e, t) {
      if ((t.flags & Le) !== he)
        switch (t.tag) {
          case ht: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = eC(), p = t.alternate === null ? "mount" : "update";
            JE() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e:
              for (; v !== null; ) {
                switch (v.tag) {
                  case te:
                    var m = v.stateNode;
                    m.passiveEffectDuration += a;
                    break e;
                  case ht:
                    var y = v.stateNode;
                    y.passiveEffectDuration += a;
                    break e;
                }
                v = v.return;
              }
            break;
          }
        }
    }
    function Uw(e, t, a, i) {
      if ((a.flags & $n) !== he)
        switch (a.tag) {
          case se:
          case je:
          case Ae: {
            if (!ir)
              if (a.mode & Ce)
                try {
                  il(), Ku(Ln | On, a);
                } finally {
                  al(a);
                }
              else
                Ku(Ln | On, a);
            break;
          }
          case ce: {
            var u = a.stateNode;
            if (a.flags & Le && !ir)
              if (t === null)
                if (a.type === a.elementType && !us && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Oe(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Oe(a) || "instance")), a.mode & Ce)
                  try {
                    il(), u.componentDidMount();
                  } finally {
                    al(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : yi(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !us && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Oe(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Oe(a) || "instance")), a.mode & Ce)
                  try {
                    il(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    al(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !us && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Oe(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Oe(a) || "instance")), pE(a, p, u));
            break;
          }
          case te: {
            var v = a.updateQueue;
            if (v !== null) {
              var m = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case le:
                    m = a.child.stateNode;
                    break;
                  case ce:
                    m = a.child.stateNode;
                    break;
                }
              pE(a, v, m);
            }
            break;
          }
          case le: {
            var y = a.stateNode;
            if (t === null && a.flags & Le) {
              var x = a.type, T = a.memoizedProps;
              eR(y, x, T);
            }
            break;
          }
          case Ue:
            break;
          case de:
            break;
          case ht: {
            {
              var _ = a.memoizedProps, O = _.onCommit, N = _.onRender, J = a.stateNode.effectDuration, me = eC(), fe = t === null ? "mount" : "update";
              JE() && (fe = "nested-update"), typeof N == "function" && N(a.memoizedProps.id, fe, a.actualDuration, a.treeBaseDuration, a.actualStartTime, me);
              {
                typeof O == "function" && O(a.memoizedProps.id, fe, J, me), MD(a);
                var Ge = a.return;
                e:
                  for (; Ge !== null; ) {
                    switch (Ge.tag) {
                      case te:
                        var Ye = Ge.stateNode;
                        Ye.effectDuration += J;
                        break e;
                      case ht:
                        var D = Ge.stateNode;
                        D.effectDuration += J;
                        break e;
                    }
                    Ge = Ge.return;
                  }
              }
            }
            break;
          }
          case Ve: {
            Yw(e, a);
            break;
          }
          case ct:
          case Fn:
          case xn:
          case ke:
          case $e:
          case Rt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      ir || a.flags & vr && NC(a);
    }
    function Aw(e) {
      switch (e.tag) {
        case se:
        case je:
        case Ae: {
          if (e.mode & Ce)
            try {
              il(), OC(e, e.return);
            } finally {
              al(e);
            }
          else
            OC(e, e.return);
          break;
        }
        case ce: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && _w(e, e.return, t), LC(e, e.return);
          break;
        }
        case le: {
          LC(e, e.return);
          break;
        }
      }
    }
    function Hw(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === le) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? cR(u) : dR(i.stateNode, i.memoizedProps);
            } catch (f) {
              kt(e, e.return, f);
            }
          }
        } else if (i.tag === Ue) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? fR(s) : pR(s, i.memoizedProps);
            } catch (f) {
              kt(e, e.return, f);
            }
        } else if (!((i.tag === ke || i.tag === $e) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function NC(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case le:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Ce)
            try {
              il(), u = t(i);
            } finally {
              al(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Oe(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Oe(e)), t.current = i;
      }
    }
    function Fw(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function zC(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, zC(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === le) {
          var a = e.stateNode;
          a !== null && QR(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function jw(e) {
      for (var t = e.return; t !== null; ) {
        if (UC(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function UC(e) {
      return e.tag === le || e.tag === te || e.tag === de;
    }
    function AC(e) {
      var t = e;
      e:
        for (; ; ) {
          for (; t.sibling === null; ) {
            if (t.return === null || UC(t.return))
              return null;
            t = t.return;
          }
          for (t.sibling.return = t.return, t = t.sibling; t.tag !== le && t.tag !== Ue && t.tag !== jt; ) {
            if (t.flags & xt || t.child === null || t.tag === de)
              continue e;
            t.child.return = t, t = t.child;
          }
          if (!(t.flags & xt))
            return t.stateNode;
        }
    }
    function Vw(e) {
      var t = jw(e);
      switch (t.tag) {
        case le: {
          var a = t.stateNode;
          t.flags & it && (H0(a), t.flags &= ~it);
          var i = AC(e);
          wS(e, i, a);
          break;
        }
        case te:
        case de: {
          var u = t.stateNode.containerInfo, s = AC(e);
          xS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function xS(e, t, a) {
      var i = e.tag, u = i === le || i === Ue;
      if (u) {
        var s = e.stateNode;
        t ? lR(a, s, t) : aR(a, s);
      } else if (i !== de) {
        var f = e.child;
        if (f !== null) {
          xS(f, t, a);
          for (var p = f.sibling; p !== null; )
            xS(p, t, a), p = p.sibling;
        }
      }
    }
    function wS(e, t, a) {
      var i = e.tag, u = i === le || i === Ue;
      if (u) {
        var s = e.stateNode;
        t ? iR(a, s, t) : rR(a, s);
      } else if (i !== de) {
        var f = e.child;
        if (f !== null) {
          wS(f, t, a);
          for (var p = f.sibling; p !== null; )
            wS(p, t, a), p = p.sibling;
        }
      }
    }
    var lr = null, Ti = !1;
    function Bw(e, t, a) {
      {
        var i = t;
        e:
          for (; i !== null; ) {
            switch (i.tag) {
              case le: {
                lr = i.stateNode, Ti = !1;
                break e;
              }
              case te: {
                lr = i.stateNode.containerInfo, Ti = !0;
                break e;
              }
              case de: {
                lr = i.stateNode.containerInfo, Ti = !0;
                break e;
              }
            }
            i = i.return;
          }
        if (lr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        HC(e, t, a), lr = null, Ti = !1;
      }
      Fw(a);
    }
    function Zu(e, t, a) {
      for (var i = a.child; i !== null; )
        HC(e, t, i), i = i.sibling;
    }
    function HC(e, t, a) {
      switch (Xf(a), a.tag) {
        case le:
          ir || tf(a, t);
        case Ue: {
          {
            var i = lr, u = Ti;
            lr = null, Zu(e, t, a), lr = i, Ti = u, lr !== null && (Ti ? oR(lr, a.stateNode) : uR(lr, a.stateNode));
          }
          return;
        }
        case jt: {
          lr !== null && (Ti ? sR(lr, a.stateNode) : Ay(lr, a.stateNode));
          return;
        }
        case de: {
          {
            var s = lr, f = Ti;
            lr = a.stateNode.containerInfo, Ti = !0, Zu(e, t, a), lr = s, Ti = f;
          }
          return;
        }
        case se:
        case je:
        case Tt:
        case Ae: {
          if (!ir) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var m = v.next, y = m;
                do {
                  var x = y, T = x.destroy, _ = x.tag;
                  T !== void 0 && ((_ & tl) !== ca ? dm(a, t, T) : (_ & Ln) !== ca && (Qs(a), a.mode & Ce ? (il(), dm(a, t, T), al(a)) : dm(a, t, T), gu())), y = y.next;
                } while (y !== m);
              }
            }
          }
          Zu(e, t, a);
          return;
        }
        case ce: {
          if (!ir) {
            tf(a, t);
            var O = a.stateNode;
            typeof O.componentWillUnmount == "function" && RS(a, t, O);
          }
          Zu(e, t, a);
          return;
        }
        case xn: {
          Zu(e, t, a);
          return;
        }
        case ke: {
          if (
            // TODO: Remove this dead flag
            a.mode & Fe
          ) {
            var N = ir;
            ir = N || a.memoizedState !== null, Zu(e, t, a), ir = N;
          } else
            Zu(e, t, a);
          break;
        }
        default: {
          Zu(e, t, a);
          return;
        }
      }
    }
    function Pw(e) {
      e.memoizedState;
    }
    function Yw(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && kR(s);
          }
        }
      }
    }
    function FC(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Dw()), t.forEach(function(i) {
          var u = jD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), kn)
              if (Jc !== null && ef !== null)
                Sp(ef, Jc);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function $w(e, t, a) {
      Jc = a, ef = e, ft(t), jC(t, e), ft(t), Jc = null, ef = null;
    }
    function Ri(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Bw(e, t, s);
          } catch (v) {
            kt(s, t, v);
          }
        }
      var f = Um();
      if (t.subtreeFlags & yr)
        for (var p = t.child; p !== null; )
          ft(p), jC(p, e), p = p.sibling;
      ft(f);
    }
    function jC(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case se:
        case je:
        case Tt:
        case Ae: {
          if (Ri(t, e), ll(e), u & Le) {
            try {
              Ci(tl | On, e, e.return), Ku(tl | On, e);
            } catch (xe) {
              kt(e, e.return, xe);
            }
            if (e.mode & Ce) {
              try {
                il(), Ci(Ln | On, e, e.return);
              } catch (xe) {
                kt(e, e.return, xe);
              }
              al(e);
            } else
              try {
                Ci(Ln | On, e, e.return);
              } catch (xe) {
                kt(e, e.return, xe);
              }
          }
          return;
        }
        case ce: {
          Ri(t, e), ll(e), u & vr && i !== null && tf(i, i.return);
          return;
        }
        case le: {
          Ri(t, e), ll(e), u & vr && i !== null && tf(i, i.return);
          {
            if (e.flags & it) {
              var s = e.stateNode;
              try {
                H0(s);
              } catch (xe) {
                kt(e, e.return, xe);
              }
            }
            if (u & Le) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, m = e.type, y = e.updateQueue;
                if (e.updateQueue = null, y !== null)
                  try {
                    tR(f, y, m, v, p, e);
                  } catch (xe) {
                    kt(e, e.return, xe);
                  }
              }
            }
          }
          return;
        }
        case Ue: {
          if (Ri(t, e), ll(e), u & Le) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var x = e.stateNode, T = e.memoizedProps, _ = i !== null ? i.memoizedProps : T;
            try {
              nR(x, _, T);
            } catch (xe) {
              kt(e, e.return, xe);
            }
          }
          return;
        }
        case te: {
          if (Ri(t, e), ll(e), u & Le && i !== null) {
            var O = i.memoizedState;
            if (O.isDehydrated)
              try {
                bR(t.containerInfo);
              } catch (xe) {
                kt(e, e.return, xe);
              }
          }
          return;
        }
        case de: {
          Ri(t, e), ll(e);
          return;
        }
        case Ve: {
          Ri(t, e), ll(e);
          var N = e.child;
          if (N.flags & Hi) {
            var J = N.stateNode, me = N.memoizedState, fe = me !== null;
            if (J.isHidden = fe, fe) {
              var Ge = N.alternate !== null && N.alternate.memoizedState !== null;
              Ge || xD();
            }
          }
          if (u & Le) {
            try {
              Pw(e);
            } catch (xe) {
              kt(e, e.return, xe);
            }
            FC(e);
          }
          return;
        }
        case ke: {
          var Ye = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Fe
          ) {
            var D = ir;
            ir = D || Ye, Ri(t, e), ir = D;
          } else
            Ri(t, e);
          if (ll(e), u & Hi) {
            var z = e.stateNode, b = e.memoizedState, B = b !== null, ee = e;
            if (z.isHidden = B, B && !Ye && (ee.mode & Fe) !== Se) {
              ie = ee;
              for (var X = ee.child; X !== null; )
                ie = X, Iw(X), X = X.sibling;
            }
            Hw(ee, B);
          }
          return;
        }
        case ct: {
          Ri(t, e), ll(e), u & Le && FC(e);
          return;
        }
        case xn:
          return;
        default: {
          Ri(t, e), ll(e);
          return;
        }
      }
    }
    function ll(e) {
      var t = e.flags;
      if (t & xt) {
        try {
          Vw(e);
        } catch (a) {
          kt(e, e.return, a);
        }
        e.flags &= ~xt;
      }
      t & Jr && (e.flags &= ~Jr);
    }
    function Qw(e, t, a) {
      Jc = a, ef = t, ie = e, VC(e, t, a), Jc = null, ef = null;
    }
    function VC(e, t, a) {
      for (var i = (e.mode & Fe) !== Se; ie !== null; ) {
        var u = ie, s = u.child;
        if (u.tag === ke && i) {
          var f = u.memoizedState !== null, p = f || fm;
          if (p) {
            DS(e, t, a);
            continue;
          } else {
            var v = u.alternate, m = v !== null && v.memoizedState !== null, y = m || ir, x = fm, T = ir;
            fm = p, ir = y, ir && !T && (ie = u, Gw(u));
            for (var _ = s; _ !== null; )
              ie = _, VC(
                _,
                // New root; bubble back up to here and stop.
                t,
                a
              ), _ = _.sibling;
            ie = u, fm = x, ir = T, DS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & $n) !== he && s !== null ? (s.return = u, ie = s) : DS(e, t, a);
      }
    }
    function DS(e, t, a) {
      for (; ie !== null; ) {
        var i = ie;
        if ((i.flags & $n) !== he) {
          var u = i.alternate;
          ft(i);
          try {
            Uw(t, u, i, a);
          } catch (f) {
            kt(i, i.return, f);
          }
          nn();
        }
        if (i === e) {
          ie = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, ie = s;
          return;
        }
        ie = i.return;
      }
    }
    function Iw(e) {
      for (; ie !== null; ) {
        var t = ie, a = t.child;
        switch (t.tag) {
          case se:
          case je:
          case Tt:
          case Ae: {
            if (t.mode & Ce)
              try {
                il(), Ci(Ln, t, t.return);
              } finally {
                al(t);
              }
            else
              Ci(Ln, t, t.return);
            break;
          }
          case ce: {
            tf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && RS(t, t.return, i);
            break;
          }
          case le: {
            tf(t, t.return);
            break;
          }
          case ke: {
            var u = t.memoizedState !== null;
            if (u) {
              BC(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, ie = a) : BC(e);
      }
    }
    function BC(e) {
      for (; ie !== null; ) {
        var t = ie;
        if (t === e) {
          ie = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ie = a;
          return;
        }
        ie = t.return;
      }
    }
    function Gw(e) {
      for (; ie !== null; ) {
        var t = ie, a = t.child;
        if (t.tag === ke) {
          var i = t.memoizedState !== null;
          if (i) {
            PC(e);
            continue;
          }
        }
        a !== null ? (a.return = t, ie = a) : PC(e);
      }
    }
    function PC(e) {
      for (; ie !== null; ) {
        var t = ie;
        ft(t);
        try {
          Aw(t);
        } catch (i) {
          kt(t, t.return, i);
        }
        if (nn(), t === e) {
          ie = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ie = a;
          return;
        }
        ie = t.return;
      }
    }
    function Ww(e, t, a, i) {
      ie = t, Xw(t, e, a, i);
    }
    function Xw(e, t, a, i) {
      for (; ie !== null; ) {
        var u = ie, s = u.child;
        (u.subtreeFlags & ea) !== he && s !== null ? (s.return = u, ie = s) : qw(e, t, a, i);
      }
    }
    function qw(e, t, a, i) {
      for (; ie !== null; ) {
        var u = ie;
        if ((u.flags & Lt) !== he) {
          ft(u);
          try {
            Kw(t, u, a, i);
          } catch (f) {
            kt(u, u.return, f);
          }
          nn();
        }
        if (u === e) {
          ie = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, ie = s;
          return;
        }
        ie = u.return;
      }
    }
    function Kw(e, t, a, i) {
      switch (t.tag) {
        case se:
        case je:
        case Ae: {
          if (t.mode & Ce) {
            rS();
            try {
              Ku(rr | On, t);
            } finally {
              nS(t);
            }
          } else
            Ku(rr | On, t);
          break;
        }
      }
    }
    function Zw(e) {
      ie = e, Jw();
    }
    function Jw() {
      for (; ie !== null; ) {
        var e = ie, t = e.child;
        if ((ie.flags & at) !== he) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              ie = u, nD(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            ie = e;
          }
        }
        (e.subtreeFlags & ea) !== he && t !== null ? (t.return = e, ie = t) : eD();
      }
    }
    function eD() {
      for (; ie !== null; ) {
        var e = ie;
        (e.flags & Lt) !== he && (ft(e), tD(e), nn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ie = t;
          return;
        }
        ie = e.return;
      }
    }
    function tD(e) {
      switch (e.tag) {
        case se:
        case je:
        case Ae: {
          e.mode & Ce ? (rS(), Ci(rr | On, e, e.return), nS(e)) : Ci(rr | On, e, e.return);
          break;
        }
      }
    }
    function nD(e, t) {
      for (; ie !== null; ) {
        var a = ie;
        ft(a), aD(a, t), nn();
        var i = a.child;
        i !== null ? (i.return = a, ie = i) : rD(e);
      }
    }
    function rD(e) {
      for (; ie !== null; ) {
        var t = ie, a = t.sibling, i = t.return;
        if (zC(t), t === e) {
          ie = null;
          return;
        }
        if (a !== null) {
          a.return = i, ie = a;
          return;
        }
        ie = i;
      }
    }
    function aD(e, t) {
      switch (e.tag) {
        case se:
        case je:
        case Ae: {
          e.mode & Ce ? (rS(), Ci(rr, e, t), nS(e)) : Ci(rr, e, t);
          break;
        }
      }
    }
    function iD(e) {
      switch (e.tag) {
        case se:
        case je:
        case Ae: {
          try {
            Ku(Ln | On, e);
          } catch (a) {
            kt(e, e.return, a);
          }
          break;
        }
        case ce: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            kt(e, e.return, a);
          }
          break;
        }
      }
    }
    function lD(e) {
      switch (e.tag) {
        case se:
        case je:
        case Ae: {
          try {
            Ku(rr | On, e);
          } catch (t) {
            kt(e, e.return, t);
          }
          break;
        }
      }
    }
    function uD(e) {
      switch (e.tag) {
        case se:
        case je:
        case Ae: {
          try {
            Ci(Ln | On, e, e.return);
          } catch (a) {
            kt(e, e.return, a);
          }
          break;
        }
        case ce: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && RS(e, e.return, t);
          break;
        }
      }
    }
    function oD(e) {
      switch (e.tag) {
        case se:
        case je:
        case Ae:
          try {
            Ci(rr | On, e, e.return);
          } catch (t) {
            kt(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var op = Symbol.for;
      op("selector.component"), op("selector.has_pseudo_class"), op("selector.role"), op("selector.test_id"), op("selector.text");
    }
    var sD = [];
    function cD() {
      sD.forEach(function(e) {
        return e();
      });
    }
    var fD = M.ReactCurrentActQueue;
    function dD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function YC() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && fD.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var pD = Math.ceil, bS = M.ReactCurrentDispatcher, kS = M.ReactCurrentOwner, ur = M.ReactCurrentBatchConfig, xi = M.ReactCurrentActQueue, zn = (
      /*             */
      0
    ), $C = (
      /*               */
      1
    ), or = (
      /*                */
      2
    ), Wa = (
      /*                */
      4
    ), ql = 0, sp = 1, os = 2, pm = 3, cp = 4, QC = 5, _S = 6, Ie = zn, Vr = null, It = null, Un = U, ul = U, OS = Pu(U), An = ql, fp = null, vm = U, dp = U, hm = U, pp = null, fa = null, LS = 0, IC = 500, GC = 1 / 0, vD = 500, Kl = null;
    function vp() {
      GC = zt() + vD;
    }
    function WC() {
      return GC;
    }
    var mm = !1, MS = null, nf = null, ss = !1, Ju = null, hp = U, NS = [], zS = null, hD = 50, mp = 0, US = null, AS = !1, ym = !1, mD = 50, rf = 0, gm = null, yp = St, Sm = U, XC = !1;
    function Em() {
      return Vr;
    }
    function Br() {
      return (Ie & (or | Wa)) !== zn ? zt() : (yp !== St || (yp = zt()), yp);
    }
    function eo(e) {
      var t = e.mode;
      if ((t & Fe) === Se)
        return Te;
      if ((Ie & or) !== zn && Un !== U)
        return an(Un);
      var a = dx() !== fx;
      if (a) {
        if (ur.transition !== null) {
          var i = ur.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Sm === Qe && (Sm = rd()), Sm;
      }
      var u = aa();
      if (u !== Qe)
        return u;
      var s = qT();
      return s;
    }
    function yD(e) {
      var t = e.mode;
      return (t & Fe) === Se ? Te : ry();
    }
    function Hn(e, t, a, i) {
      BD(), XC && S("useInsertionEffect must not schedule updates."), AS && (ym = !0), Nl(e, a, i), (Ie & or) !== U && e === Vr ? $D(t) : (kn && od(e, t, a), QD(t), e === Vr && ((Ie & or) === zn && (dp = Me(dp, a)), An === cp && to(e, Un)), da(e, i), a === Te && Ie === zn && (t.mode & Fe) === Se && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !xi.isBatchingLegacy && (vp(), W0()));
    }
    function gD(e, t, a) {
      var i = e.current;
      i.lanes = t, Nl(e, t, a), da(e, a);
    }
    function SD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Ie & or) !== zn
      );
    }
    function da(e, t) {
      var a = e.callbackNode;
      ey(e, t);
      var i = zo(e, e === Vr ? Un : U);
      if (i === U) {
        a !== null && f1(a), e.callbackNode = null, e.callbackPriority = Qe;
        return;
      }
      var u = qt(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(xi.current !== null && a !== YS)) {
        a == null && s !== Te && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && f1(a);
      var f;
      if (u === Te)
        e.tag === Yu ? (xi.isBatchingLegacy !== null && (xi.didScheduleLegacyUpdate = !0), WR(ZC.bind(null, e))) : G0(ZC.bind(null, e)), xi.current !== null ? xi.current.push($u) : ZT(function() {
          (Ie & (or | Wa)) === zn && $u();
        }), f = null;
      else {
        var p;
        switch (jo(i)) {
          case Qn:
            p = Bs;
            break;
          case _n:
            p = Ar;
            break;
          case si:
            p = Fa;
            break;
          case Ho:
            p = ji;
            break;
          default:
            p = Fa;
            break;
        }
        f = $S(p, qC.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function qC(e, t) {
      if (Bx(), yp = St, Sm = U, (Ie & (or | Wa)) !== zn)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Jl();
      if (i && e.callbackNode !== a)
        return null;
      var u = zo(e, e === Vr ? Un : U);
      if (u === U)
        return null;
      var s = !Ao(e, u) && !Mv(e, u) && !t, f = s ? _D(e, u) : Tm(e, u);
      if (f !== ql) {
        if (f === os) {
          var p = td(e);
          p !== U && (u = p, f = HS(e, p));
        }
        if (f === sp) {
          var v = fp;
          throw cs(e, U), to(e, u), da(e, zt()), v;
        }
        if (f === _S)
          to(e, u);
        else {
          var m = !Ao(e, u), y = e.current.alternate;
          if (m && !CD(y)) {
            if (f = Tm(e, u), f === os) {
              var x = td(e);
              x !== U && (u = x, f = HS(e, x));
            }
            if (f === sp) {
              var T = fp;
              throw cs(e, U), to(e, u), da(e, zt()), T;
            }
          }
          e.finishedWork = y, e.finishedLanes = u, ED(e, f, u);
        }
      }
      return da(e, zt()), e.callbackNode === a ? qC.bind(null, e) : null;
    }
    function HS(e, t) {
      var a = pp;
      if (un(e)) {
        var i = cs(e, t);
        i.flags |= Vt, BR(e.containerInfo);
      }
      var u = Tm(e, t);
      if (u !== os) {
        var s = fa;
        fa = a, s !== null && KC(s);
      }
      return u;
    }
    function KC(e) {
      fa === null ? fa = e : fa.push.apply(fa, e);
    }
    function ED(e, t, a) {
      switch (t) {
        case ql:
        case sp:
          throw new Error("Root did not complete. This is a bug in React.");
        case os: {
          fs(e, fa, Kl);
          break;
        }
        case pm: {
          if (to(e, a), fc(a) && // do not delay if we're inside an act() scope
          !d1()) {
            var i = LS + IC - zt();
            if (i > 10) {
              var u = zo(e, U);
              if (u !== U)
                break;
              var s = e.suspendedLanes;
              if (!Ml(s, a)) {
                Br(), ld(e, s);
                break;
              }
              e.timeoutHandle = zy(fs.bind(null, e, fa, Kl), i);
              break;
            }
          }
          fs(e, fa, Kl);
          break;
        }
        case cp: {
          if (to(e, a), Lv(a))
            break;
          if (!d1()) {
            var f = Ov(e, a), p = f, v = zt() - p, m = VD(v) - v;
            if (m > 10) {
              e.timeoutHandle = zy(fs.bind(null, e, fa, Kl), m);
              break;
            }
          }
          fs(e, fa, Kl);
          break;
        }
        case QC: {
          fs(e, fa, Kl);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function CD(e) {
      for (var t = e; ; ) {
        if (t.flags & bo) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!ae(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & bo && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function to(e, t) {
      t = wu(t, hm), t = wu(t, dp), id(e, t);
    }
    function ZC(e) {
      if (Px(), (Ie & (or | Wa)) !== zn)
        throw new Error("Should not already be working.");
      Jl();
      var t = zo(e, U);
      if (!Cr(t, Te))
        return da(e, zt()), null;
      var a = Tm(e, t);
      if (e.tag !== Yu && a === os) {
        var i = td(e);
        i !== U && (t = i, a = HS(e, i));
      }
      if (a === sp) {
        var u = fp;
        throw cs(e, U), to(e, t), da(e, zt()), u;
      }
      if (a === _S)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, fs(e, fa, Kl), da(e, zt()), null;
    }
    function TD(e, t) {
      t !== U && (Du(e, Me(t, Te)), da(e, zt()), (Ie & (or | Wa)) === zn && (vp(), $u()));
    }
    function FS(e, t) {
      var a = Ie;
      Ie |= $C;
      try {
        return e(t);
      } finally {
        Ie = a, Ie === zn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !xi.isBatchingLegacy && (vp(), W0());
      }
    }
    function RD(e, t, a, i, u) {
      var s = aa(), f = ur.transition;
      try {
        return ur.transition = null, ln(Qn), e(t, a, i, u);
      } finally {
        ln(s), ur.transition = f, Ie === zn && vp();
      }
    }
    function Zl(e) {
      Ju !== null && Ju.tag === Yu && (Ie & (or | Wa)) === zn && Jl();
      var t = Ie;
      Ie |= $C;
      var a = ur.transition, i = aa();
      try {
        return ur.transition = null, ln(Qn), e ? e() : void 0;
      } finally {
        ln(i), ur.transition = a, Ie = t, (Ie & (or | Wa)) === zn && $u();
      }
    }
    function JC() {
      return (Ie & (or | Wa)) !== zn;
    }
    function Cm(e, t) {
      Rr(OS, ul, e), ul = Me(ul, t);
    }
    function jS(e) {
      ul = OS.current, Tr(OS, e);
    }
    function cs(e, t) {
      e.finishedWork = null, e.finishedLanes = U;
      var a = e.timeoutHandle;
      if (a !== Uy && (e.timeoutHandle = Uy, KT(a)), It !== null)
        for (var i = It.return; i !== null; ) {
          var u = i.alternate;
          kC(u, i), i = i.return;
        }
      Vr = e;
      var s = ds(e.current, null);
      return It = s, Un = ul = t, An = ql, fp = null, vm = U, dp = U, hm = U, pp = null, fa = null, mx(), mi.discardPendingWarnings(), s;
    }
    function e1(e, t) {
      do {
        var a = It;
        try {
          if (_h(), OE(), nn(), kS.current = null, a === null || a.return === null) {
            An = sp, fp = t, It = null;
            return;
          }
          if (tn && a.mode & Ce && um(a, !0), La)
            if (Rl(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              bv(a, i, Un);
            } else
              Is(a, t, Un);
          Gx(e, a.return, a, t, Un), a1(a);
        } catch (u) {
          t = u, It === a && a !== null ? (a = a.return, It = a) : a = It;
          continue;
        }
        return;
      } while (!0);
    }
    function t1() {
      var e = bS.current;
      return bS.current = nm, e === null ? nm : e;
    }
    function n1(e) {
      bS.current = e;
    }
    function xD() {
      LS = zt();
    }
    function gp(e) {
      vm = Me(e, vm);
    }
    function wD() {
      An === ql && (An = pm);
    }
    function VS() {
      (An === ql || An === pm || An === os) && (An = cp), Vr !== null && (Uo(vm) || Uo(dp)) && to(Vr, Un);
    }
    function DD(e) {
      An !== cp && (An = os), pp === null ? pp = [e] : pp.push(e);
    }
    function bD() {
      return An === ql;
    }
    function Tm(e, t) {
      var a = Ie;
      Ie |= or;
      var i = t1();
      if (Vr !== e || Un !== t) {
        if (kn) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Sp(e, Un), u.clear()), vc(e, t);
        }
        Kl = sd(), cs(e, t);
      }
      Da(t);
      do
        try {
          kD();
          break;
        } catch (s) {
          e1(e, s);
        }
      while (!0);
      if (_h(), Ie = a, n1(i), It !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Eu(), Vr = null, Un = U, An;
    }
    function kD() {
      for (; It !== null; )
        r1(It);
    }
    function _D(e, t) {
      var a = Ie;
      Ie |= or;
      var i = t1();
      if (Vr !== e || Un !== t) {
        if (kn) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Sp(e, Un), u.clear()), vc(e, t);
        }
        Kl = sd(), vp(), cs(e, t);
      }
      Da(t);
      do
        try {
          OD();
          break;
        } catch (s) {
          e1(e, s);
        }
      while (!0);
      return _h(), n1(i), Ie = a, It !== null ? (Oo(), ql) : (Eu(), Vr = null, Un = U, An);
    }
    function OD() {
      for (; It !== null && !Vs(); )
        r1(It);
    }
    function r1(e) {
      var t = e.alternate;
      ft(e);
      var a;
      (e.mode & Ce) !== Se ? (tS(e), a = BS(t, e, ul), um(e, !0)) : a = BS(t, e, ul), nn(), e.memoizedProps = e.pendingProps, a === null ? a1(e) : It = a, kS.current = null;
    }
    function a1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Nr) === he) {
          ft(t);
          var u = void 0;
          if ((t.mode & Ce) === Se ? u = bC(a, t, ul) : (tS(t), u = bC(a, t, ul), um(t, !1)), nn(), u !== null) {
            It = u;
            return;
          }
        } else {
          var s = ww(a, t);
          if (s !== null) {
            s.flags &= gv, It = s;
            return;
          }
          if ((t.mode & Ce) !== Se) {
            um(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= Nr, i.subtreeFlags = he, i.deletions = null;
          else {
            An = _S, It = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          It = v;
          return;
        }
        t = i, It = t;
      } while (t !== null);
      An === ql && (An = QC);
    }
    function fs(e, t, a) {
      var i = aa(), u = ur.transition;
      try {
        ur.transition = null, ln(Qn), LD(e, t, a, i);
      } finally {
        ur.transition = u, ln(i);
      }
      return null;
    }
    function LD(e, t, a, i) {
      do
        Jl();
      while (Ju !== null);
      if (PD(), (Ie & (or | Wa)) !== zn)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ys(s), u === null)
        return qf(), null;
      if (s === U && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = U, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Qe;
      var f = Me(u.lanes, u.childLanes);
      ud(e, f), e === Vr && (Vr = null, It = null, Un = U), ((u.subtreeFlags & ea) !== he || (u.flags & ea) !== he) && (ss || (ss = !0, zS = a, $S(Fa, function() {
        return Jl(), null;
      })));
      var p = (u.subtreeFlags & (yu | yr | $n | ea)) !== he, v = (u.flags & (yu | yr | $n | ea)) !== he;
      if (p || v) {
        var m = ur.transition;
        ur.transition = null;
        var y = aa();
        ln(Qn);
        var x = Ie;
        Ie |= Wa, kS.current = null, Ow(e, u), tC(), $w(e, u, s), $T(e.containerInfo), e.current = u, kv(s), Qw(u, e, s), Su(), Cv(), Ie = x, ln(y), ur.transition = m;
      } else
        e.current = u, tC();
      var T = ss;
      if (ss ? (ss = !1, Ju = e, hp = s) : (rf = 0, gm = null), f = e.pendingLanes, f === U && (nf = null), T || o1(e.current, !1), li(u.stateNode, i), kn && e.memoizedUpdaters.clear(), cD(), da(e, zt()), t !== null)
        for (var _ = e.onRecoverableError, O = 0; O < t.length; O++) {
          var N = t[O], J = N.stack, me = N.digest;
          _(N.value, {
            componentStack: J,
            digest: me
          });
        }
      if (mm) {
        mm = !1;
        var fe = MS;
        throw MS = null, fe;
      }
      return Cr(hp, Te) && e.tag !== Yu && Jl(), f = e.pendingLanes, Cr(f, Te) ? (Vx(), e === US ? mp++ : (mp = 0, US = e)) : mp = 0, $u(), qf(), null;
    }
    function Jl() {
      if (Ju !== null) {
        var e = jo(hp), t = iy(si, e), a = ur.transition, i = aa();
        try {
          return ur.transition = null, ln(t), ND();
        } finally {
          ln(i), ur.transition = a;
        }
      }
      return !1;
    }
    function MD(e) {
      NS.push(e), ss || (ss = !0, $S(Fa, function() {
        return Jl(), null;
      }));
    }
    function ND() {
      if (Ju === null)
        return !1;
      var e = zS;
      zS = null;
      var t = Ju, a = hp;
      if (Ju = null, hp = U, (Ie & (or | Wa)) !== zn)
        throw new Error("Cannot flush passive effects while already rendering.");
      AS = !0, ym = !1, _v(a);
      var i = Ie;
      Ie |= Wa, Zw(t.current), Ww(t, t.current, a, e);
      {
        var u = NS;
        NS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          zw(t, f);
        }
      }
      _o(), o1(t.current, !0), Ie = i, $u(), ym ? t === gm ? rf++ : (rf = 0, gm = t) : rf = 0, AS = !1, ym = !1, Bi(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function i1(e) {
      return nf !== null && nf.has(e);
    }
    function zD(e) {
      nf === null ? nf = /* @__PURE__ */ new Set([e]) : nf.add(e);
    }
    function UD(e) {
      mm || (mm = !0, MS = e);
    }
    var AD = UD;
    function l1(e, t, a) {
      var i = ls(a, t), u = rC(e, i, Te), s = Iu(e, u, Te), f = Br();
      s !== null && (Nl(s, Te, f), da(s, f));
    }
    function kt(e, t, a) {
      if (bw(a), Ep(!1), e.tag === te) {
        l1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === te) {
          l1(i, e, a);
          return;
        } else if (i.tag === ce) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !i1(s)) {
            var f = ls(a, e), p = uS(i, f, Te), v = Iu(i, p, Te), m = Br();
            v !== null && (Nl(v, Te, m), da(v, m));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function HD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Br();
      ld(e, a), ID(e), Vr === e && Ml(Un, a) && (An === cp || An === pm && fc(Un) && zt() - LS < IC ? cs(e, U) : hm = Me(hm, a)), da(e, u);
    }
    function u1(e, t) {
      t === Qe && (t = yD(e));
      var a = Br(), i = sa(e, t);
      i !== null && (Nl(i, t, a), da(i, a));
    }
    function FD(e) {
      var t = e.memoizedState, a = Qe;
      t !== null && (a = t.retryLane), u1(e, a);
    }
    function jD(e, t) {
      var a = Qe, i;
      switch (e.tag) {
        case Ve:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case ct:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), u1(e, a);
    }
    function VD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : pD(e / 1960) * 1960;
    }
    function BD() {
      if (mp > hD)
        throw mp = 0, US = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      rf > mD && (rf = 0, gm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function PD() {
      mi.flushLegacyContextWarning(), mi.flushPendingUnsafeLifecycleWarnings();
    }
    function o1(e, t) {
      ft(e), Rm(e, mr, uD), t && Rm(e, Tl, oD), Rm(e, mr, iD), t && Rm(e, Tl, lD), nn();
    }
    function Rm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== he ? i = i.child : ((i.flags & t) !== he && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var xm = null;
    function s1(e) {
      {
        if ((Ie & or) !== zn || !(e.mode & Fe))
          return;
        var t = e.tag;
        if (t !== nt && t !== te && t !== ce && t !== se && t !== je && t !== Tt && t !== Ae)
          return;
        var a = Oe(e) || "ReactComponent";
        if (xm !== null) {
          if (xm.has(a))
            return;
          xm.add(a);
        } else
          xm = /* @__PURE__ */ new Set([a]);
        var i = Wt;
        try {
          ft(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? ft(e) : nn();
        }
      }
    }
    var BS;
    {
      var YD = null;
      BS = function(e, t, a) {
        var i = y1(YD, t);
        try {
          return TC(e, t, a);
        } catch (s) {
          if (nx() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (_h(), OE(), kC(e, t), y1(t, i), t.mode & Ce && tS(t), Cl(null, TC, null, e, t, a), Zm()) {
            var u = jf();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var c1 = !1, PS;
    PS = /* @__PURE__ */ new Set();
    function $D(e) {
      if (Wr && !Hx())
        switch (e.tag) {
          case se:
          case je:
          case Ae: {
            var t = It && Oe(It) || "Unknown", a = t;
            if (!PS.has(a)) {
              PS.add(a);
              var i = Oe(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case ce: {
            c1 || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), c1 = !0);
            break;
          }
        }
    }
    function Sp(e, t) {
      if (kn) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          od(e, i, t);
        });
      }
    }
    var YS = {};
    function $S(e, t) {
      {
        var a = xi.current;
        return a !== null ? (a.push(t), YS) : js(e, t);
      }
    }
    function f1(e) {
      if (e !== YS)
        return Ev(e);
    }
    function d1() {
      return xi.current !== null;
    }
    function QD(e) {
      {
        if (e.mode & Fe) {
          if (!YC())
            return;
        } else if (!dD() || Ie !== zn || e.tag !== se && e.tag !== je && e.tag !== Ae)
          return;
        if (xi.current === null) {
          var t = Wt;
          try {
            ft(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Oe(e));
          } finally {
            t ? ft(e) : nn();
          }
        }
      }
    }
    function ID(e) {
      e.tag !== Yu && YC() && xi.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Ep(e) {
      XC = e;
    }
    var Xa = null, af = null, GD = function(e) {
      Xa = e;
    };
    function lf(e) {
      {
        if (Xa === null)
          return e;
        var t = Xa(e);
        return t === void 0 ? e : t.current;
      }
    }
    function QS(e) {
      return lf(e);
    }
    function IS(e) {
      {
        if (Xa === null)
          return e;
        var t = Xa(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = lf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: ge,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function p1(e, t) {
      {
        if (Xa === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case ce: {
            typeof i == "function" && (u = !0);
            break;
          }
          case se: {
            (typeof i == "function" || s === Ee) && (u = !0);
            break;
          }
          case je: {
            (s === ge || s === Ee) && (u = !0);
            break;
          }
          case Tt:
          case Ae: {
            (s === ze || s === Ee) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Xa(a);
          if (f !== void 0 && f === Xa(i))
            return !0;
        }
        return !1;
      }
    }
    function v1(e) {
      {
        if (Xa === null || typeof WeakSet != "function")
          return;
        af === null && (af = /* @__PURE__ */ new WeakSet()), af.add(e);
      }
    }
    var WD = function(e, t) {
      {
        if (Xa === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Jl(), Zl(function() {
          GS(e.current, i, a);
        });
      }
    }, XD = function(e, t) {
      {
        if (e.context !== ka)
          return;
        Jl(), Zl(function() {
          Cp(t, e, null, null);
        });
      }
    };
    function GS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case se:
          case Ae:
          case ce:
            v = p;
            break;
          case je:
            v = p.render;
            break;
        }
        if (Xa === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var m = !1, y = !1;
        if (v !== null) {
          var x = Xa(v);
          x !== void 0 && (a.has(x) ? y = !0 : t.has(x) && (f === ce ? y = !0 : m = !0));
        }
        if (af !== null && (af.has(e) || i !== null && af.has(i)) && (y = !0), y && (e._debugNeedsRemount = !0), y || m) {
          var T = sa(e, Te);
          T !== null && Hn(T, e, Te, St);
        }
        u !== null && !y && GS(u, t, a), s !== null && GS(s, t, a);
      }
    }
    var qD = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return WS(e.current, i, a), a;
      }
    };
    function WS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case se:
          case Ae:
          case ce:
            p = f;
            break;
          case je:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? KD(e, a) : i !== null && WS(i, t, a), u !== null && WS(u, t, a);
      }
    }
    function KD(e, t) {
      {
        var a = ZD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case le:
              t.add(i.stateNode);
              return;
            case de:
              t.add(i.stateNode.containerInfo);
              return;
            case te:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function ZD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === le)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var XS;
    {
      XS = !1;
      try {
        var h1 = Object.preventExtensions({});
      } catch {
        XS = !0;
      }
    }
    function JD(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = he, this.subtreeFlags = he, this.deletions = null, this.lanes = U, this.childLanes = U, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !XS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var _a = function(e, t, a, i) {
      return new JD(e, t, a, i);
    };
    function qS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function eb(e) {
      return typeof e == "function" && !qS(e) && e.defaultProps === void 0;
    }
    function tb(e) {
      if (typeof e == "function")
        return qS(e) ? ce : se;
      if (e != null) {
        var t = e.$$typeof;
        if (t === ge)
          return je;
        if (t === ze)
          return Tt;
      }
      return nt;
    }
    function ds(e, t) {
      var a = e.alternate;
      a === null ? (a = _a(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = he, a.subtreeFlags = he, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & bn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case nt:
        case se:
        case Ae:
          a.type = lf(e.type);
          break;
        case ce:
          a.type = QS(e.type);
          break;
        case je:
          a.type = IS(e.type);
          break;
      }
      return a;
    }
    function nb(e, t) {
      e.flags &= bn | xt;
      var a = e.alternate;
      if (a === null)
        e.childLanes = U, e.lanes = t, e.child = null, e.subtreeFlags = he, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = he, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function rb(e, t, a) {
      var i;
      return e === Ch ? (i = Fe, t === !0 && (i |= Ut, i |= na)) : i = Se, kn && (i |= Ce), _a(te, null, null, i);
    }
    function KS(e, t, a, i, u, s) {
      var f = nt, p = e;
      if (typeof e == "function")
        qS(e) ? (f = ce, p = QS(p)) : p = lf(p);
      else if (typeof e == "string")
        f = le;
      else {
        e:
          switch (e) {
            case Sa:
              return no(a.children, u, s, t);
            case bi:
              f = vt, u |= Ut, (u & Fe) !== Se && (u |= na);
              break;
            case E:
              return ab(a, u, s, t);
            case Ne:
              return ib(a, u, s, t);
            case We:
              return lb(a, u, s, t);
            case Ot:
              return m1(a, u, s, t);
            case Jn:
            case vn:
            case ki:
            case vs:
            case _t:
            default: {
              if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                  case j:
                    f = Ke;
                    break e;
                  case W:
                    f = cn;
                    break e;
                  case ge:
                    f = je, p = IS(p);
                    break e;
                  case ze:
                    f = Tt;
                    break e;
                  case Ee:
                    f = Rn, p = null;
                    break e;
                }
              var v = "";
              {
                (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var m = i ? Oe(i) : null;
                m && (v += `

Check the render method of \`` + m + "`.");
              }
              throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
            }
          }
      }
      var y = _a(f, a, t, u);
      return y.elementType = e, y.type = p, y.lanes = s, y._debugOwner = i, y;
    }
    function ZS(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = KS(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function no(e, t, a, i) {
      var u = _a(ut, e, i, t);
      return u.lanes = a, u;
    }
    function ab(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = _a(ht, e, i, t | Ce);
      return u.elementType = E, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function ib(e, t, a, i) {
      var u = _a(Ve, e, i, t);
      return u.elementType = Ne, u.lanes = a, u;
    }
    function lb(e, t, a, i) {
      var u = _a(ct, e, i, t);
      return u.elementType = We, u.lanes = a, u;
    }
    function m1(e, t, a, i) {
      var u = _a(ke, e, i, t);
      u.elementType = Ot, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function JS(e, t, a) {
      var i = _a(Ue, e, null, t);
      return i.lanes = a, i;
    }
    function ub() {
      var e = _a(le, null, null, Se);
      return e.elementType = "DELETED", e;
    }
    function ob(e) {
      var t = _a(jt, null, null, Se);
      return t.stateNode = e, t;
    }
    function e0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = _a(de, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function y1(e, t) {
      return e === null && (e = _a(nt, null, null, Se)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function sb(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Uy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Qe, this.eventTimes = pc(U), this.expirationTimes = pc(St), this.pendingLanes = U, this.suspendedLanes = U, this.pingedLanes = U, this.expiredLanes = U, this.mutableReadLanes = U, this.finishedLanes = U, this.entangledLanes = U, this.entanglements = pc(U), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Dt; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Ch:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Yu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function g1(e, t, a, i, u, s, f, p, v, m) {
      var y = new sb(e, t, a, p, v), x = rb(t, s);
      y.current = x, x.stateNode = y;
      {
        var T = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        x.memoizedState = T;
      }
      return og(x), y;
    }
    var t0 = "18.2.0";
    function cb(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return ha(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Lr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var n0, r0;
    n0 = !1, r0 = {};
    function S1(e) {
      if (!e)
        return ka;
      var t = Kr(e), a = GR(t);
      if (t.tag === ce) {
        var i = t.type;
        if (el(i))
          return Q0(t, i, a);
      }
      return a;
    }
    function fb(e, t) {
      {
        var a = Kr(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = ta(a);
        if (u === null)
          return null;
        if (u.mode & Ut) {
          var s = Oe(a) || "Component";
          if (!r0[s]) {
            r0[s] = !0;
            var f = Wt;
            try {
              ft(u), a.mode & Ut ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? ft(f) : nn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function E1(e, t, a, i, u, s, f, p) {
      var v = !1, m = null;
      return g1(e, t, v, m, a, i, u, s, f);
    }
    function C1(e, t, a, i, u, s, f, p, v, m) {
      var y = !0, x = g1(a, i, y, e, u, s, f, p, v);
      x.context = S1(null);
      var T = x.current, _ = Br(), O = eo(T), N = Wl(_, O);
      return N.callback = t ?? null, Iu(T, N, O), gD(x, O, _), x;
    }
    function Cp(e, t, a, i) {
      Tv(t, e);
      var u = t.current, s = Br(), f = eo(u);
      xl(f);
      var p = S1(a);
      t.context === null ? t.context = p : t.pendingContext = p, Wr && Wt !== null && !n0 && (n0 = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Oe(Wt) || "Unknown"));
      var v = Wl(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var m = Iu(u, v, f);
      return m !== null && (Hn(m, u, f, s), zh(m, u, f)), f;
    }
    function wm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case le:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function db(e) {
      switch (e.tag) {
        case te: {
          var t = e.stateNode;
          if (un(t)) {
            var a = ty(t);
            TD(t, a);
          }
          break;
        }
        case Ve: {
          Zl(function() {
            var u = sa(e, Te);
            if (u !== null) {
              var s = Br();
              Hn(u, e, Te, s);
            }
          });
          var i = Te;
          a0(e, i);
          break;
        }
      }
    }
    function T1(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = zv(a.retryLane, t));
    }
    function a0(e, t) {
      T1(e, t);
      var a = e.alternate;
      a && T1(a, t);
    }
    function pb(e) {
      if (e.tag === Ve) {
        var t = Cu, a = sa(e, t);
        if (a !== null) {
          var i = Br();
          Hn(a, e, t, i);
        }
        a0(e, t);
      }
    }
    function vb(e) {
      if (e.tag === Ve) {
        var t = eo(e), a = sa(e, t);
        if (a !== null) {
          var i = Br();
          Hn(a, e, t, i);
        }
        a0(e, t);
      }
    }
    function R1(e) {
      var t = Sv(e);
      return t === null ? null : t.stateNode;
    }
    var x1 = function(e) {
      return null;
    };
    function hb(e) {
      return x1(e);
    }
    var w1 = function(e) {
      return !1;
    };
    function mb(e) {
      return w1(e);
    }
    var D1 = null, b1 = null, k1 = null, _1 = null, O1 = null, L1 = null, M1 = null, N1 = null, z1 = null;
    {
      var U1 = function(e, t, a) {
        var i = t[a], u = hn(e) ? e.slice() : Be({}, e);
        return a + 1 === t.length ? (hn(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = U1(e[i], t, a + 1), u);
      }, A1 = function(e, t) {
        return U1(e, t, 0);
      }, H1 = function(e, t, a, i) {
        var u = t[i], s = hn(e) ? e.slice() : Be({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], hn(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = H1(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, F1 = function(e, t, a) {
        if (t.length !== a.length) {
          qe("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              qe("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return H1(e, t, a, 0);
      }, j1 = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = hn(e) ? e.slice() : Be({}, e);
        return s[u] = j1(e[u], t, a + 1, i), s;
      }, V1 = function(e, t, a) {
        return j1(e, t, 0, a);
      }, i0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      D1 = function(e, t, a, i) {
        var u = i0(e, t);
        if (u !== null) {
          var s = V1(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Be({}, e.memoizedProps);
          var f = sa(e, Te);
          f !== null && Hn(f, e, Te, St);
        }
      }, b1 = function(e, t, a) {
        var i = i0(e, t);
        if (i !== null) {
          var u = A1(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = Be({}, e.memoizedProps);
          var s = sa(e, Te);
          s !== null && Hn(s, e, Te, St);
        }
      }, k1 = function(e, t, a, i) {
        var u = i0(e, t);
        if (u !== null) {
          var s = F1(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Be({}, e.memoizedProps);
          var f = sa(e, Te);
          f !== null && Hn(f, e, Te, St);
        }
      }, _1 = function(e, t, a) {
        e.pendingProps = V1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = sa(e, Te);
        i !== null && Hn(i, e, Te, St);
      }, O1 = function(e, t) {
        e.pendingProps = A1(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = sa(e, Te);
        a !== null && Hn(a, e, Te, St);
      }, L1 = function(e, t, a) {
        e.pendingProps = F1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = sa(e, Te);
        i !== null && Hn(i, e, Te, St);
      }, M1 = function(e) {
        var t = sa(e, Te);
        t !== null && Hn(t, e, Te, St);
      }, N1 = function(e) {
        x1 = e;
      }, z1 = function(e) {
        w1 = e;
      };
    }
    function yb(e) {
      var t = ta(e);
      return t === null ? null : t.stateNode;
    }
    function gb(e) {
      return null;
    }
    function Sb() {
      return Wt;
    }
    function Eb(e) {
      var t = e.findFiberByHostInstance, a = M.ReactCurrentDispatcher;
      return Wf({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: D1,
        overrideHookStateDeletePath: b1,
        overrideHookStateRenamePath: k1,
        overrideProps: _1,
        overridePropsDeletePath: O1,
        overridePropsRenamePath: L1,
        setErrorHandler: N1,
        setSuspenseHandler: z1,
        scheduleUpdate: M1,
        currentDispatcherRef: a,
        findHostInstanceByFiber: yb,
        findFiberByHostInstance: t || gb,
        // React Refresh
        findHostInstancesForRefresh: qD,
        scheduleRefresh: WD,
        scheduleRoot: XD,
        setRefreshHandler: GD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: Sb,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: t0
      });
    }
    var B1 = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function l0(e) {
      this._internalRoot = e;
    }
    Dm.prototype.render = l0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : bm(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Xt) {
          var i = R1(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Cp(e, t, null, null);
    }, Dm.prototype.unmount = l0.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        JC() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Zl(function() {
          Cp(null, e, null, null);
        }), V0(t);
      }
    };
    function Cb(e, t) {
      if (!bm(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      P1(e);
      var a = !1, i = !1, u = "", s = B1;
      t != null && (t.hydrate ? qe("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Di && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = E1(e, Ch, null, a, i, u, s);
      vh(f.current, e);
      var p = e.nodeType === Xt ? e.parentNode : e;
      return _d(p), new l0(f);
    }
    function Dm(e) {
      this._internalRoot = e;
    }
    function Tb(e) {
      e && Pv(e);
    }
    Dm.prototype.unstable_scheduleHydration = Tb;
    function Rb(e, t, a) {
      if (!bm(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      P1(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = B1;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var m = C1(t, null, e, Ch, i, s, f, p, v);
      if (vh(m.current, e), _d(e), u)
        for (var y = 0; y < u.length; y++) {
          var x = u[y];
          Lx(m, x);
        }
      return new Dm(m);
    }
    function bm(e) {
      return !!(e && (e.nodeType === pr || e.nodeType === Ra || e.nodeType === hl || !rt));
    }
    function Tp(e) {
      return !!(e && (e.nodeType === pr || e.nodeType === Ra || e.nodeType === hl || e.nodeType === Xt && e.nodeValue === " react-mount-point-unstable "));
    }
    function P1(e) {
      e.nodeType === pr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Vd(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var xb = M.ReactCurrentOwner, Y1;
    Y1 = function(e) {
      if (e._reactRootContainer && e.nodeType !== Xt) {
        var t = R1(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = u0(e), u = !!(i && Bu(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === pr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function u0(e) {
      return e ? e.nodeType === Ra ? e.documentElement : e.firstChild : null;
    }
    function $1() {
    }
    function wb(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var T = wm(f);
            s.call(T);
          };
        }
        var f = C1(
          t,
          i,
          e,
          Yu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          $1
        );
        e._reactRootContainer = f, vh(f.current, e);
        var p = e.nodeType === Xt ? e.parentNode : e;
        return _d(p), Zl(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var m = i;
          i = function() {
            var T = wm(y);
            m.call(T);
          };
        }
        var y = E1(
          e,
          Yu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          $1
        );
        e._reactRootContainer = y, vh(y.current, e);
        var x = e.nodeType === Xt ? e.parentNode : e;
        return _d(x), Zl(function() {
          Cp(t, y, a, i);
        }), y;
      }
    }
    function Db(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function km(e, t, a, i, u) {
      Y1(a), Db(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = wb(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = wm(f);
            p.call(v);
          };
        }
        Cp(t, f, e, u);
      }
      return wm(f);
    }
    function bb(e) {
      {
        var t = xb.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", yt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === pr ? e : fb(e, "findDOMNode");
    }
    function kb(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Tp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Vd(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return km(null, e, t, !0, a);
    }
    function _b(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Tp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Vd(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return km(null, e, t, !1, a);
    }
    function Ob(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Tp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Do(e))
        throw new Error("parentComponent must be a valid React Component");
      return km(e, t, a, !1, i);
    }
    function Lb(e) {
      if (!Tp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Vd(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = u0(e), i = a && !Bu(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Zl(function() {
          km(null, null, e, !1, function() {
            e._reactRootContainer = null, V0(e);
          });
        }), !0;
      } else {
        {
          var u = u0(e), s = !!(u && Bu(u)), f = e.nodeType === pr && Tp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    ne(db), Av(pb), Bo(vb), fd(aa), Fv(Fo), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), mv(zT), zs(FS, RD, Zl);
    function Mb(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!bm(t))
        throw new Error("Target container is not a DOM element.");
      return cb(e, t, null, a);
    }
    function Nb(e, t, a, i) {
      return Ob(e, t, a, i);
    }
    var o0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Bu, Ac, hh, Ns, Ro, FS]
    };
    function zb(e, t) {
      return o0.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Cb(e, t);
    }
    function Ub(e, t, a) {
      return o0.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Rb(e, t, a);
    }
    function Ab(e) {
      return JC() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Zl(e);
    }
    var Hb = Eb({
      findFiberByHostInstance: Ko,
      bundleType: 1,
      version: t0,
      rendererPackageName: "react-dom"
    });
    if (!Hb && dn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var Q1 = window.location.protocol;
      /^(https?|file):$/.test(Q1) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (Q1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = o0, va.createPortal = Mb, va.createRoot = zb, va.findDOMNode = bb, va.flushSync = Ab, va.hydrate = kb, va.hydrateRoot = Ub, va.render = _b, va.unmountComponentAtNode = Lb, va.unstable_batchedUpdates = FS, va.unstable_renderSubtreeIntoContainer = Nb, va.version = t0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), va;
}
(function(Y) {
  function Re() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Re);
      } catch (M) {
        console.error(M);
      }
    }
  }
  process.env.NODE_ENV === "production" ? (Re(), Y.exports = Xb()) : Y.exports = qb();
})(Qb);
var Dp = f0;
if (process.env.NODE_ENV === "production")
  bp.createRoot = Dp.createRoot, bp.hydrateRoot = Dp.hydrateRoot;
else {
  var _m = Dp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  bp.createRoot = function(Y, Re) {
    _m.usingClientEntryPoint = !0;
    try {
      return Dp.createRoot(Y, Re);
    } finally {
      _m.usingClientEntryPoint = !1;
    }
  }, bp.hydrateRoot = function(Y, Re, M) {
    _m.usingClientEntryPoint = !0;
    try {
      return Dp.hydrateRoot(Y, Re, M);
    } finally {
      _m.usingClientEntryPoint = !1;
    }
  };
}
const Kb = () => {
  const [Y, Re] = Vb(!1), M = () => Re(!Y);
  return /* @__PURE__ */ $b(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: "1vw",
        bottom: "1vw",
        width: "20vw",
        gap: "1vw",
        maxHeight: "80vh",
        height: "100%",
        justifyContent: "flex-end"
      },
      children: [
        /* @__PURE__ */ kp(
          "div",
          {
            style: {
              // position: 'fixed',
              // right: '0',
              // bottom: '0',
              display: Y ? "block" : "none",
              // width: '20vw',
              // height: '100vh',
              flexGrow: 1,
              zIndex: 9999
            },
            children: /* @__PURE__ */ kp(
              "iframe",
              {
                src: "http://localhost:3000/widgets/chat",
                style: { height: "100%", width: "100%", border: "none" }
              }
            )
          }
        ),
        /* @__PURE__ */ kp(
          "div",
          {
            style: {
              // position: 'fixed',
              // right: '0',
              // bottom: '0',
              backgroundColor: "#fff",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "2vw",
              height: "2vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 9999,
              fontSize: "1vw",
              fontWeight: 900,
              alignSelf: "flex-end"
            },
            onClick: () => M(),
            children: Y ? "-" : "+"
          }
        )
      ]
    }
  );
};
bp.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ kp(_p.StrictMode, { children: /* @__PURE__ */ kp(Kb, {}) })
);
