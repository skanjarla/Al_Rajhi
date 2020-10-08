!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(require("jquery"))
    : "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : e((t = "undefined" != typeof globalThis ? globalThis : t || self).jQuery);
})(this, function (k) {
  "use strict";
  function s(t, e) {
    for (var i = 0; i < e.length; i++) {
      var a = e[i];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        "value" in a && (a.writable = !0),
        Object.defineProperty(t, a.key, a);
    }
  }
  k = k && k.hasOwnProperty("default") ? k.default : k;
  var n = {
      autoShow: !1,
      autoHide: !1,
      autoPick: !1,
      inline: !1,
      container: null,
      trigger: null,
      language: "",
      format: "mm/dd/yyyy",
      date: null,
      startDate: null,
      endDate: null,
      startView: 0,
      weekStart: 0,
      yearFirst: !1,
      yearSuffix: "",
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      itemTag: "li",
      mutedClass: "muted",
      pickedClass: "picked",
      disabledClass: "disabled",
      highlightedClass: "highlighted",
      template:
        '<div class="datepicker-container"><div class="datepicker-panel" data-view="years picker"><ul><li data-view="years prev">&lsaquo;</li><li data-view="years current"></li><li data-view="years next">&rsaquo;</li></ul><ul data-view="years"></ul></div><div class="datepicker-panel" data-view="months picker"><ul><li data-view="year prev">&lsaquo;</li><li data-view="year current"></li><li data-view="year next">&rsaquo;</li></ul><ul data-view="months"></ul></div><div class="datepicker-panel" data-view="days picker"><ul><li data-view="month prev">&lsaquo;</li><li data-view="month current"></li><li data-view="month next">&rsaquo;</li></ul><ul data-view="week"></ul><ul data-view="days"></ul></div></div>',
      offset: 10,
      zIndex: 1e3,
      filter: null,
      show: null,
      hide: null,
      pick: null,
    },
    t = "undefined" != typeof window,
    e = t ? window : {},
    i = t && "ontouchstart" in e.document.documentElement,
    l = "datepicker",
    r = "click.".concat(l),
    h = "focus.".concat(l),
    o = "hide.".concat(l),
    c = "keyup.".concat(l),
    d = "pick.".concat(l),
    a = "resize.".concat(l),
    u = "scroll.".concat(l),
    p = "show.".concat(l),
    f = "touchstart.".concat(l),
    g = "".concat(l, "-hide"),
    y = {},
    m = 0,
    v = 1,
    w = 2,
    D = Object.prototype.toString;
  function b(t) {
    return "string" == typeof t;
  }
  var C = Number.isNaN || e.isNaN;
  function $(t) {
    return "number" == typeof t && !C(t);
  }
  function x(t) {
    return void 0 === t;
  }
  function F(t) {
    return (
      "date" === ((e = t), D.call(e).slice(8, -1).toLowerCase()) &&
      !C(t.getTime())
    );
    var e;
  }
  function M(a, s) {
    for (
      var t = arguments.length, n = new Array(2 < t ? t - 2 : 0), e = 2;
      e < t;
      e++
    )
      n[e - 2] = arguments[e];
    return function () {
      for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
        e[i] = arguments[i];
      return a.apply(s, n.concat(e));
    };
  }
  function Y(t) {
    return '[data-view="'.concat(t, '"]');
  }
  function O(t, e) {
    return [
      31,
      ((t = t) % 4 == 0 && t % 100 != 0) || t % 400 == 0 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][e];
  }
  function V(t, e, i) {
    return Math.min(i, O(t, e));
  }
  var T = /(y|m|d)+/g;
  function I(t, e) {
    var i = 1 < arguments.length && void 0 !== e ? e : 1,
      e = String(Math.abs(t)),
      a = e.length,
      s = "";
    for (t < 0 && (s += "-"); a < i; ) (a += 1), (s += "0");
    return s + e;
  }
  var S,
    P = /\d+/g,
    N = {
      show: function () {
        this.built || this.build(),
          this.shown ||
            this.trigger(p).isDefaultPrevented() ||
            ((this.shown = !0),
            this.$picker.removeClass(g).on(r, k.proxy(this.click, this)),
            this.showView(this.options.startView),
            this.inline ||
              (this.$scrollParent.on(u, k.proxy(this.place, this)),
              k(window).on(a, (this.onResize = M(this.place, this))),
              k(document).on(
                r,
                (this.onGlobalClick = M(this.globalClick, this))
              ),
              k(document).on(
                c,
                (this.onGlobalKeyup = M(this.globalKeyup, this))
              ),
              i &&
                k(document).on(
                  f,
                  (this.onTouchStart = M(this.touchstart, this))
                ),
              this.place()));
      },
      hide: function () {
        this.shown &&
          (this.trigger(o).isDefaultPrevented() ||
            ((this.shown = !1),
            this.$picker.addClass(g).off(r, this.click),
            this.inline ||
              (this.$scrollParent.off(u, this.place),
              k(window).off(a, this.onResize),
              k(document).off(r, this.onGlobalClick),
              k(document).off(c, this.onGlobalKeyup),
              i && k(document).off(f, this.onTouchStart))));
      },
      toggle: function () {
        this.shown ? this.hide() : this.show();
      },
      update: function () {
        var t = this.getValue();
        t !== this.oldValue && (this.setDate(t, !0), (this.oldValue = t));
      },
      pick: function (t) {
        var e = this.$element,
          i = this.date;
        this.trigger(d, { view: t || "", date: i }).isDefaultPrevented() ||
          ((i = this.formatDate(this.date)),
          this.setValue(i),
          this.isInput && (e.trigger("input"), e.trigger("change")));
      },
      reset: function () {
        this.setDate(this.initialDate, !0),
          this.setValue(this.initialValue),
          this.shown && this.showView(this.options.startView);
      },
      getMonthName: function (t, e) {
        var i = this.options,
          a = i.monthsShort,
          i = i.months;
        return (
          k.isNumeric(t) ? (t = Number(t)) : x(e) && (e = t),
          !0 === e && (i = a),
          i[$(t) ? t : this.date.getMonth()]
        );
      },
      getDayName: function (t, e, i) {
        var a = this.options,
          s = a.days;
        return (
          k.isNumeric(t) ? (t = Number(t)) : (x(i) && (i = e), x(e) && (e = t)),
          i ? (s = a.daysMin) : e && (s = a.daysShort),
          s[$(t) ? t : this.date.getDay()]
        );
      },
      getDate: function (t) {
        var e = this.date;
        return t ? this.formatDate(e) : new Date(e);
      },
      setDate: function (t, e) {
        var i = this.options.filter;
        if (F(t) || b(t)) {
          if (
            ((t = this.parseDate(t)),
            k.isFunction(i) && !1 === i.call(this.$element, t, "day"))
          )
            return;
          (this.date = t),
            (this.viewDate = new Date(t)),
            e || this.pick(),
            this.built && this.render();
        }
      },
      setStartDate: function (t) {
        F(t) || b(t)
          ? (this.startDate = this.parseDate(t))
          : (this.startDate = null),
          this.built && this.render();
      },
      setEndDate: function (t) {
        F(t) || b(t)
          ? (this.endDate = this.parseDate(t))
          : (this.endDate = null),
          this.built && this.render();
      },
      parseDate: function (a) {
        var s = this.format,
          t = [];
        return (
          F(a) ||
            (b(a) && (t = a.match(P) || []),
            F((a = a ? new Date(a) : new Date())) || (a = new Date()),
            t.length === s.parts.length &&
              (k.each(t, function (t, e) {
                var i = parseInt(e, 10);
                switch (s.parts[t]) {
                  case "yy":
                    a.setFullYear(2e3 + i);
                    break;
                  case "yyyy":
                    a.setFullYear(2 === e.length ? 2e3 + i : i);
                    break;
                  case "mm":
                  case "m":
                    a.setMonth(i - 1);
                }
              }),
              k.each(t, function (t, e) {
                e = parseInt(e, 10);
                switch (s.parts[t]) {
                  case "dd":
                  case "d":
                    a.setDate(e);
                }
              }))),
          new Date(a.getFullYear(), a.getMonth(), a.getDate())
        );
      },
      formatDate: function (t) {
        var e,
          i,
          a,
          s = this.format,
          n = "";
        return (
          F(t) &&
            ((e = t.getFullYear()),
            (i = t.getMonth()),
            (t = t.getDate()),
            (a = {
              d: t,
              dd: I(t, 2),
              m: i + 1,
              mm: I(i + 1, 2),
              yy: String(e).substring(2),
              yyyy: I(e, 4),
            }),
            (n = s.source),
            k.each(s.parts, function (t, e) {
              n = n.replace(e, a[e]);
            })),
          n
        );
      },
      destroy: function () {
        this.unbind(), this.unbuild(), this.$element.removeData(l);
      },
    },
    j = {
      click: function (t) {
        var e = k(t.target),
          i = this.options,
          a = this.date,
          s = this.viewDate,
          n = this.format;
        if (
          (t.stopPropagation(), t.preventDefault(), !e.hasClass("disabled"))
        ) {
          var r = e.data("view"),
            h = s.getFullYear(),
            o = s.getMonth(),
            t = s.getDate();
          switch (r) {
            case "years prev":
            case "years next":
              (h = "years prev" === r ? h - 10 : h + 10),
                s.setFullYear(h),
                s.setDate(V(h, o, t)),
                this.renderYears();
              break;
            case "year prev":
            case "year next":
              (h = "year prev" === r ? h - 1 : h + 1),
                s.setFullYear(h),
                s.setDate(V(h, o, t)),
                this.renderMonths();
              break;
            case "year current":
              n.hasYear && this.showView(w);
              break;
            case "year picked":
              n.hasMonth
                ? this.showView(v)
                : (e
                    .siblings(".".concat(i.pickedClass))
                    .removeClass(i.pickedClass)
                    .data("view", "year"),
                  this.hideView()),
                this.pick("year");
              break;
            case "year":
              (h = parseInt(e.text(), 10)),
                a.setDate(V(h, o, t)),
                a.setFullYear(h),
                s.setDate(V(h, o, t)),
                s.setFullYear(h),
                n.hasMonth
                  ? this.showView(v)
                  : (e
                      .addClass(i.pickedClass)
                      .data("view", "year picked")
                      .siblings(".".concat(i.pickedClass))
                      .removeClass(i.pickedClass)
                      .data("view", "year"),
                    this.hideView()),
                this.pick("year");
              break;
            case "month prev":
            case "month next":
              (o = "month prev" === r ? o - 1 : o + 1) < 0
                ? (--h, (o += 12))
                : 11 < o && ((h += 1), (o -= 12)),
                s.setFullYear(h),
                s.setDate(V(h, o, t)),
                s.setMonth(o),
                this.renderDays();
              break;
            case "month current":
              n.hasMonth && this.showView(v);
              break;
            case "month picked":
              n.hasDay
                ? this.showView(m)
                : (e
                    .siblings(".".concat(i.pickedClass))
                    .removeClass(i.pickedClass)
                    .data("view", "month"),
                  this.hideView()),
                this.pick("month");
              break;
            case "month":
              (o = k.inArray(e.text(), i.monthsShort)),
                a.setFullYear(h),
                a.setDate(V(h, o, t)),
                a.setMonth(o),
                s.setFullYear(h),
                s.setDate(V(h, o, t)),
                s.setMonth(o),
                n.hasDay
                  ? this.showView(m)
                  : (e
                      .addClass(i.pickedClass)
                      .data("view", "month picked")
                      .siblings(".".concat(i.pickedClass))
                      .removeClass(i.pickedClass)
                      .data("view", "month"),
                    this.hideView()),
                this.pick("month");
              break;
            case "day prev":
            case "day next":
            case "day":
              "day prev" === r ? --o : "day next" === r && (o += 1),
                (t = parseInt(e.text(), 10)),
                a.setDate(1),
                a.setFullYear(h),
                a.setMonth(o),
                a.setDate(t),
                s.setDate(1),
                s.setFullYear(h),
                s.setMonth(o),
                s.setDate(t),
                this.renderDays(),
                "day" === r && this.hideView(),
                this.pick("day");
              break;
            case "day picked":
              this.hideView(), this.pick("day");
          }
        }
      },
      globalClick: function (t) {
        for (
          var e = t.target, i = this.element, a = this.$trigger[0], s = !0;
          e !== document;

        ) {
          if (e === a || e === i) {
            s = !1;
            break;
          }
          e = e.parentNode;
        }
        s && this.hide();
      },
      keyup: function () {
        this.update();
      },
      globalKeyup: function (t) {
        var e = t.target,
          i = t.key,
          t = t.keyCode;
        this.isInput &&
          e !== this.element &&
          this.shown &&
          ("Tab" === i || 9 === t) &&
          this.hide();
      },
      touchstart: function (t) {
        t = t.target;
        this.isInput &&
          t !== this.element &&
          !k.contains(this.$picker[0], t) &&
          (this.hide(), this.element.blur());
      },
    },
    q = {
      render: function () {
        this.renderYears(), this.renderMonths(), this.renderDays();
      },
      renderWeek: function () {
        var i = this,
          a = [],
          t = this.options,
          e = t.weekStart,
          t = t.daysMin,
          e = parseInt(e, 10) % 7,
          t = t.slice(e).concat(t.slice(0, e));
        k.each(t, function (t, e) {
          a.push(i.createItem({ text: e }));
        }),
          this.$week.html(a.join(""));
      },
      renderYears: function () {
        for (
          var t = this.options,
            e = this.startDate,
            i = this.endDate,
            a = t.disabledClass,
            s = t.filter,
            t = t.yearSuffix,
            n = this.viewDate.getFullYear(),
            r = new Date().getFullYear(),
            h = this.date.getFullYear(),
            o = [],
            l = !1,
            c = !1,
            d = -5;
          d <= 6;
          d += 1
        ) {
          var u = new Date(n + d, 1, 1),
            p = !1;
          e && ((p = u.getFullYear() < e.getFullYear()), -5 === d && (l = p)),
            !p &&
              i &&
              ((p = u.getFullYear() > i.getFullYear()), 6 === d && (c = p)),
            !p && s && (p = !1 === s.call(this.$element, u, "year"));
          var f = n + d === h,
            g = f ? "year picked" : "year";
          o.push(
            this.createItem({
              picked: f,
              disabled: p,
              text: n + d,
              view: p ? "year disabled" : g,
              highlighted: u.getFullYear() === r,
            })
          );
        }
        this.$yearsPrev.toggleClass(a, l),
          this.$yearsNext.toggleClass(a, c),
          this.$yearsCurrent.toggleClass(a, !0).html(
            ""
              .concat(n + -5 + t, " - ")
              .concat(n + 6)
              .concat(t)
          ),
          this.$years.html(o.join(""));
      },
      renderMonths: function () {
        for (
          var t = this.options,
            e = this.startDate,
            i = this.endDate,
            a = this.viewDate,
            s = t.disabledClass || "",
            n = t.monthsShort,
            r = k.isFunction(t.filter) && t.filter,
            h = a.getFullYear(),
            a = new Date(),
            o = a.getFullYear(),
            l = a.getMonth(),
            c = this.date.getFullYear(),
            d = this.date.getMonth(),
            u = [],
            p = !1,
            f = !1,
            g = 0;
          g <= 11;
          g += 1
        ) {
          var y = new Date(h, g, 1),
            m = !1;
          e &&
            (m =
              (p = y.getFullYear() === e.getFullYear()) &&
              y.getMonth() < e.getMonth()),
            !m &&
              i &&
              (m =
                (f = y.getFullYear() === i.getFullYear()) &&
                y.getMonth() > i.getMonth()),
            !m && r && (m = !1 === r.call(this.$element, y, "month"));
          var v = h === c && g === d,
            w = v ? "month picked" : "month";
          u.push(
            this.createItem({
              disabled: m,
              picked: v,
              highlighted: h === o && y.getMonth() === l,
              index: g,
              text: n[g],
              view: m ? "month disabled" : w,
            })
          );
        }
        this.$yearPrev.toggleClass(s, p),
          this.$yearNext.toggleClass(s, f),
          this.$yearCurrent.toggleClass(s, p && f).html(h + t.yearSuffix || ""),
          this.$months.html(u.join(""));
      },
      renderDays: function () {
        var t,
          e = this.$element,
          i = this.options,
          a = this.startDate,
          s = this.endDate,
          n = this.viewDate,
          r = this.date,
          h = i.disabledClass,
          o = i.filter,
          l = i.months,
          c = i.weekStart,
          d = i.yearSuffix,
          u = n.getFullYear(),
          p = n.getMonth(),
          n = new Date(),
          f = n.getFullYear(),
          g = n.getMonth(),
          y = n.getDate(),
          m = r.getFullYear(),
          v = r.getMonth(),
          w = r.getDate(),
          k = [],
          D = u,
          b = p,
          n = !1;
        0 === p ? (--D, (b = 11)) : --b, (t = O(D, b));
        var C,
          r = new Date(u, p, 1);
        for (
          (C = r.getDay() - (parseInt(c, 10) % 7)) <= 0 && (C += 7),
            a && (n = r.getTime() <= a.getTime()),
            P = t - (C - 1);
          P <= t;
          P += 1
        ) {
          var $ = new Date(D, b, P),
            x = !1;
          a && (x = $.getTime() < a.getTime()),
            !x && o && (x = !1 === o.call(e, $, "day")),
            k.push(
              this.createItem({
                disabled: x,
                highlighted: D === f && b === g && $.getDate() === y,
                muted: !0,
                picked: D === m && b === v && P === w,
                text: P,
                view: "day prev",
              })
            );
        }
        var F = [],
          M = u,
          Y = p,
          c = !1;
        11 === p ? ((M += 1), (Y = 0)) : (Y += 1),
          (t = O(u, p)),
          (C = 42 - (k.length + t));
        r = new Date(u, p, t);
        for (s && (c = r.getTime() >= s.getTime()), P = 1; P <= C; P += 1) {
          var V = new Date(M, Y, P),
            T = M === m && Y === v && P === w,
            I = !1;
          s && (I = V.getTime() > s.getTime()),
            !I && o && (I = !1 === o.call(e, V, "day")),
            F.push(
              this.createItem({
                disabled: I,
                picked: T,
                highlighted: M === f && Y === g && V.getDate() === y,
                muted: !0,
                text: P,
                view: "day next",
              })
            );
        }
        for (var S = [], P = 1; P <= t; P += 1) {
          var N = new Date(u, p, P),
            j = !1;
          a && (j = N.getTime() < a.getTime()),
            !j && s && (j = N.getTime() > s.getTime()),
            !j && o && (j = !1 === o.call(e, N, "day"));
          var q = u === m && p === v && P === w,
            A = q ? "day picked" : "day";
          S.push(
            this.createItem({
              disabled: j,
              picked: q,
              highlighted: u === f && p === g && N.getDate() === y,
              text: P,
              view: j ? "day disabled" : A,
            })
          );
        }
        this.$monthPrev.toggleClass(h, n),
          this.$monthNext.toggleClass(h, c),
          this.$monthCurrent
            .toggleClass(h, n && c)
            .html(
              i.yearFirst
                ? "".concat(u + d, " ").concat(l[p])
                : "".concat(l[p], " ").concat(u).concat(d)
            ),
          this.$days.html(k.join("") + S.join("") + F.join(""));
      },
    },
    A = "".concat(l, "-top-left"),
    t = "".concat(l, "-top-right"),
    W = "".concat(l, "-bottom-left"),
    e = "".concat(l, "-bottom-right"),
    z = [A, t, W, e].join(" "),
    J = (function () {
      function i(t) {
        var e =
          1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, i),
          (this.$element = k(t)),
          (this.element = t),
          (this.options = k.extend(
            {},
            n,
            y[e.language],
            k.isPlainObject(e) && e
          )),
          (this.$scrollParent = (function (t, e) {
            var i = 1 < arguments.length && void 0 !== e && e,
              a = k(t),
              s = "absolute" === (e = a.css("position")),
              n = i ? /auto|scroll|hidden/ : /auto|scroll/,
              a = a
                .parents()
                .filter(function (t, e) {
                  e = k(e);
                  return (
                    (!s || "static" !== e.css("position")) &&
                    n.test(
                      e.css("overflow") +
                        e.css("overflow-y") +
                        e.css("overflow-x")
                    )
                  );
                })
                .eq(0);
            return "fixed" !== e && a.length
              ? a
              : k(t.ownerDocument || document);
          })(t, !0)),
          (this.built = !1),
          (this.shown = !1),
          (this.isInput = !1),
          (this.inline = !1),
          (this.initialValue = ""),
          (this.initialDate = null),
          (this.startDate = null),
          (this.endDate = null),
          this.init();
      }
      var t, e, a;
      return (
        (t = i),
        (a = [
          {
            key: "setDefaults",
            value: function (t) {
              t = 0 < arguments.length && void 0 !== t ? t : {};
              k.extend(n, y[t.language], k.isPlainObject(t) && t);
            },
          },
        ]),
        (e = [
          {
            key: "init",
            value: function () {
              var t = this.$element,
                e = this.options,
                i = e.startDate,
                a = e.endDate,
                s = e.date;
              (this.$trigger = k(e.trigger)),
                (this.isInput = t.is("input") || t.is("textarea")),
                (this.inline = e.inline && (e.container || !this.isInput)),
                (this.format = (function (i) {
                  var t = String(i).toLowerCase(),
                    e = t.match(T);
                  if (!e || 0 === e.length)
                    throw new Error("Invalid date format.");
                  return (
                    (i = { source: t, parts: e }),
                    k.each(e, function (t, e) {
                      switch (e) {
                        case "dd":
                        case "d":
                          i.hasDay = !0;
                          break;
                        case "mm":
                        case "m":
                          i.hasMonth = !0;
                          break;
                        case "yyyy":
                        case "yy":
                          i.hasYear = !0;
                      }
                    }),
                    i
                  );
                })(e.format));
              t = this.getValue();
              (this.initialValue = t),
                (this.oldValue = t),
                (s = this.parseDate(s || t)),
                i &&
                  ((i = this.parseDate(i)),
                  s.getTime() < i.getTime() && (s = new Date(i)),
                  (this.startDate = i)),
                a &&
                  ((a = this.parseDate(a)),
                  i && a.getTime() < i.getTime() && (a = new Date(i)),
                  s.getTime() > a.getTime() && (s = new Date(a)),
                  (this.endDate = a)),
                (this.date = s),
                (this.viewDate = new Date(s)),
                (this.initialDate = new Date(this.date)),
                this.bind(),
                (e.autoShow || this.inline) && this.show(),
                e.autoPick && this.pick();
            },
          },
          {
            key: "build",
            value: function () {
              var t, e, i;
              this.built ||
                ((this.built = !0),
                (t = this.$element),
                (e = this.options),
                (i = k(e.template)),
                (this.$picker = i),
                (this.$week = i.find(Y("week"))),
                (this.$yearsPicker = i.find(Y("years picker"))),
                (this.$yearsPrev = i.find(Y("years prev"))),
                (this.$yearsNext = i.find(Y("years next"))),
                (this.$yearsCurrent = i.find(Y("years current"))),
                (this.$years = i.find(Y("years"))),
                (this.$monthsPicker = i.find(Y("months picker"))),
                (this.$yearPrev = i.find(Y("year prev"))),
                (this.$yearNext = i.find(Y("year next"))),
                (this.$yearCurrent = i.find(Y("year current"))),
                (this.$months = i.find(Y("months"))),
                (this.$daysPicker = i.find(Y("days picker"))),
                (this.$monthPrev = i.find(Y("month prev"))),
                (this.$monthNext = i.find(Y("month next"))),
                (this.$monthCurrent = i.find(Y("month current"))),
                (this.$days = i.find(Y("days"))),
                this.inline
                  ? k(e.container || t).append(
                      i.addClass("".concat(l, "-inline"))
                    )
                  : (k(document.body).append(
                      i.addClass("".concat(l, "-dropdown"))
                    ),
                    i.addClass(g).css({ zIndex: parseInt(e.zIndex, 10) })),
                this.renderWeek());
            },
          },
          {
            key: "unbuild",
            value: function () {
              this.built && ((this.built = !1), this.$picker.remove());
            },
          },
          {
            key: "bind",
            value: function () {
              var t = this.options,
                e = this.$element;
              k.isFunction(t.show) && e.on(p, t.show),
                k.isFunction(t.hide) && e.on(o, t.hide),
                k.isFunction(t.pick) && e.on(d, t.pick),
                this.isInput && e.on(c, k.proxy(this.keyup, this)),
                this.inline ||
                  (t.trigger
                    ? this.$trigger.on(r, k.proxy(this.toggle, this))
                    : this.isInput
                    ? e.on(h, k.proxy(this.show, this))
                    : e.on(r, k.proxy(this.show, this)));
            },
          },
          {
            key: "unbind",
            value: function () {
              var t = this.$element,
                e = this.options;
              k.isFunction(e.show) && t.off(p, e.show),
                k.isFunction(e.hide) && t.off(o, e.hide),
                k.isFunction(e.pick) && t.off(d, e.pick),
                this.isInput && t.off(c, this.keyup),
                this.inline ||
                  (e.trigger
                    ? this.$trigger.off(r, this.toggle)
                    : this.isInput
                    ? t.off(h, this.show)
                    : t.off(r, this.show));
            },
          },
          {
            key: "showView",
            value: function (t) {
              var e = this.$yearsPicker,
                i = this.$monthsPicker,
                a = this.$daysPicker,
                s = this.format;
              if (s.hasYear || s.hasMonth || s.hasDay)
                switch (Number(t)) {
                  case w:
                    i.addClass(g),
                      a.addClass(g),
                      s.hasYear
                        ? (this.renderYears(), e.removeClass(g), this.place())
                        : this.showView(m);
                    break;
                  case v:
                    e.addClass(g),
                      a.addClass(g),
                      s.hasMonth
                        ? (this.renderMonths(), i.removeClass(g), this.place())
                        : this.showView(w);
                    break;
                  default:
                    e.addClass(g),
                      i.addClass(g),
                      s.hasDay
                        ? (this.renderDays(), a.removeClass(g), this.place())
                        : this.showView(v);
                }
            },
          },
          {
            key: "hideView",
            value: function () {
              !this.inline && this.options.autoHide && this.hide();
            },
          },
          {
            key: "place",
            value: function () {
              var t, e, i, a, s, n, r, h, o, l, c;
              this.inline ||
                ((o = this.$element),
                (c = this.options),
                (t = this.$picker),
                (e = k(document).outerWidth()),
                (i = k(document).outerHeight()),
                (a = o.outerWidth()),
                (s = o.outerHeight()),
                (n = t.width()),
                (r = t.height()),
                (h = (l = o.offset()).left),
                (o = l.top),
                (l = parseFloat(c.offset)),
                (c = A),
                C(l) && (l = 10),
                r < o && i < o + s + r ? ((o -= r + l), (c = W)) : (o += s + l),
                e < h + n && ((h += a - n), (c = c.replace("left", "right"))),
                t.removeClass(z).addClass(c).css({ top: o, left: h }));
            },
          },
          {
            key: "trigger",
            value: function (t, e) {
              e = k.Event(t, e);
              return this.$element.trigger(e), e;
            },
          },
          {
            key: "createItem",
            value: function (t) {
              var e = this.options,
                i = e.itemTag,
                a = {
                  text: "",
                  view: "",
                  muted: !1,
                  picked: !1,
                  disabled: !1,
                  highlighted: !1,
                },
                s = [];
              return (
                k.extend(a, t),
                a.muted && s.push(e.mutedClass),
                a.highlighted && s.push(e.highlightedClass),
                a.picked && s.push(e.pickedClass),
                a.disabled && s.push(e.disabledClass),
                "<"
                  .concat(i, ' class="')
                  .concat(s.join(" "), '" data-view="')
                  .concat(a.view, '">')
                  .concat(a.text, "</")
                  .concat(i, ">")
              );
            },
          },
          {
            key: "getValue",
            value: function () {
              var t = this.$element;
              return this.isInput ? t.val() : t.text();
            },
          },
          {
            key: "setValue",
            value: function (t) {
              var e = 0 < arguments.length && void 0 !== t ? t : "",
                t = this.$element;
              this.isInput
                ? t.val(e)
                : (this.inline && !this.options.container) || t.text(e);
            },
          },
        ]) && s(t.prototype, e),
        a && s(t, a),
        i
      );
    })();
  k.extend && k.extend(J.prototype, q, j, N),
    k.fn &&
      ((S = k.fn.datepicker),
      (k.fn.datepicker = function (r) {
        for (
          var h, t = arguments.length, o = new Array(1 < t ? t - 1 : 0), e = 1;
          e < t;
          e++
        )
          o[e - 1] = arguments[e];
        return (
          this.each(function (t, e) {
            var i = k(e),
              a = "destroy" === r;
            if (!(n = i.data(l))) {
              if (a) return;
              var s = k.extend({}, i.data(), k.isPlainObject(r) && r),
                n = new J(e, s);
              i.data(l, n);
            }
            b(r) &&
              ((s = n[r]),
              k.isFunction(s) && ((h = s.apply(n, o)), a && i.removeData(l)));
          }),
          x(h) ? this : h
        );
      }),
      (k.fn.datepicker.Constructor = J),
      (k.fn.datepicker.languages = y),
      (k.fn.datepicker.setDefaults = J.setDefaults),
      (k.fn.datepicker.noConflict = function () {
        return (k.fn.datepicker = S), this;
      }));
});
