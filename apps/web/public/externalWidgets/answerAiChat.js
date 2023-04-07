(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [117],
  {
    5881: function (e, t, r) {
      'use strict';
      r.r(t);
      var n = r(1317),
        o = r(9119),
        i = r(4220);
      let s = (e) => {
        let { src: t } = e;
        return (0, i.jsxs)('div', {
          style: {
            position: 'fixed',
            top: 0,
            right: 0,
            width: '20vw',
            height: '100vh',
            zIndex: 9998,
            display: 'flex',
            borderLeft: 'solid 1px #fff'
          },
          children: [
            'hello worlds',
            (0, i.jsx)('iframe', {
              src: t,
              width: '100%',
              height: '100%',
              style: { border: 'none' }
            })
          ]
        });
      };
      !(function () {
        console.log('Testing renderExternalChatWidget.ts');
        let e = n.createElement(s, { src: 'http://localhost:3000/widgets/chat' }),
          t = document.createElement('div');
        t.setAttribute('id', 'iframe-container'),
          document.body.appendChild(t),
          alert('hellos'),
          o.render(e, t);
      })();
    },
    8046: function (e, t, r) {
      'use strict';
      /**
       * @license React
       * react-jsx-runtime.production.min.js
       *
       * Copyright (c) Meta Platforms, Inc. and affiliates.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */ var n = r(1317),
        o = Symbol.for('react.element'),
        i = (Symbol.for('react.fragment'), Object.prototype.hasOwnProperty),
        s = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        l = { key: !0, ref: !0, __self: !0, __source: !0 };
      function f(e, t, r) {
        var n,
          f = {},
          c = null,
          d = null;
        for (n in (void 0 !== r && (c = '' + r),
        void 0 !== t.key && (c = '' + t.key),
        void 0 !== t.ref && (d = t.ref),
        t))
          i.call(t, n) && !l.hasOwnProperty(n) && (f[n] = t[n]);
        if (e && e.defaultProps) for (n in (t = e.defaultProps)) void 0 === f[n] && (f[n] = t[n]);
        return { $$typeof: o, type: e, key: c, ref: d, props: f, _owner: s.current };
      }
      (t.jsx = f), (t.jsxs = f);
    },
    4220: function (e, t, r) {
      'use strict';
      e.exports = r(8046);
    }
  },
  function (e) {
    var t = function (t) {
      return e((e.s = t));
    };
    e.O(0, [774, 179], function () {
      return t(2983), t(3730), t(5881);
    }),
      (_N_E = e.O());
  }
]);
