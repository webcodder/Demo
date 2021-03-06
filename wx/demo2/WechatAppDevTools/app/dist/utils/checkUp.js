"use strict";

function init() {
    function e(e) { g.notifications("有新版本", "新版本 " + e + " 已经准备好，立刻重启更新？", [{ title: "重启" }], function(e) { 0 === e && (v.unRegister(), chrome.runtime.reload()) }) }

    function n() {
        var e = j ? "darwin" : "x64" === process.arch ? "x64" : "ia32";
        g.notifications("有新版本", "发现新版本 " + q + " 前往下载更新？", [{ title: "下载" }], function(n) { nw.Shell.openExternal(k + "&type=" + e) })
    }

    function r(r, i) {
        function o(e) {
            var n = { url: k + "&type=" + i, needToken: 0, encoding: null };
            c.info("checkUp.js begin fetch new version " + n.url), a(n, function(n, r, i) { e(n, i) })
        }

        function s(e, n) { d.gunzip(e, function(e, r) { n(e, r) }) }

        function g(e, n) { l.writeFile(w, e, function(e) { n(e, w) }) }

        function v(e, n) {
            var i = u.join(x, r.toString());
            f.sync(i);
            var o = j ? u.join(i, "app.nw") : u.join(i, "package.nw");
            p.extractAll(e, o);
            var t = u.join(o, "package.json"),
                s = JSON.parse(l.readFileSync(t, "utf8"));
            j ? (s.window.frame = !0, s["chromium-args"] = "-ignore-certificate-errors -load-extension=/Applications/wechatwebdevtools.app/Contents/Resources/app.nw/app/dist/extensions/") : s["chromium-args"] = "-ignore-certificate-errors -load-extension=./package.nw/app/dist/extensions/", l.writeFileSync(t, JSON.stringify(s), "utf8"), localStorage.setItem("new-version", r), n(null, r)
        }
        if (clearInterval(t), "app" === i) return void n();
        var w = u.join(x, "" + i + r);
        if (l.existsSync(w)) return c.info("checkUp.js " + w + " is existsSync"), localStorage.setItem("new-version", r), void e(r);
        var m = [];
        m.push(o), m.push(s), m.push(g), m.push(v), h.waterfall(m, function(n, r) {
            return n ? void c.error("checkUp.js async.waterfall " + n.toString()) : void e(r)
        })
    }

    function i(e) {
        var n = e.split("."),
            r = parseInt(n[0]),
            i = parseInt(n[1]),
            o = parseInt(n[2]);
        return r > _ ? "app" : i > C ? "big_code" : o > b && "small_code"
    }

    function o(e) {
        var n = i(e.last_ide);
        n ? (c.info("checkUp.js find new version " + e.last_ide + " and current version is " + S), r(e.last_ide, n)) : (t && clearInterval(t), t = setInterval(function() {
            var e = { method: "post", url: w.LOADCONFIG_URL + "?type=checkup", needToken: 0, body: JSON.stringify({ type: 7, version: nw.App.manifest.version }) };
            a(e, function(e, n, r) {
                e ? c.info("checkUp.js onLineCheck error: " + e.toString()) : ! function() {
                    var e = JSON.parse(r),
                        n = e.client_list,
                        i = {};
                    n.forEach(function(e) { i[e.key] = e.value }), o(i), m.check(i)
                }()
            })
        }, s))
    }
    var t, s = 6e5,
        a = require("../common/request/request.js"),
        c = require("../common/log/log.js"),
        p = require("asar"),
        u = require("path"),
        l = require("fs"),
        f = require("mkdir-p"),
        d = require("zlib"),
        g = (require("rmdir"), require("./tools.js")),
        v = require("../common/shortCut/shortCut.js"),
        h = (d.createGunzip(), require("async")),
        w = require("../config/urlConfig.js"),
        m = require("../weapp/utils/vendorManager.js"),
        j = "darwin" === process.platform,
        k = w.downloadRedirectURL + (j ? "?os=darwin" : "?os=win"),
        q = global.appVersion,
        y = (nw.App.getDataPath(), w.LOADCONFIG_URL, require("../config/dirConfig.js")),
        x = y.WeappApplication,
        S = (u.join(x, "uplog.json"), global.appVersion),
        I = S.split("."),
        _ = parseInt(I[0]),
        C = parseInt(I[1]),
        b = parseInt(I[2]);
    _exports = function(e) { global.appConfig.isDev || (o(e), m.check(e)) }
}
var _exports;
init(), module.exports = _exports;
