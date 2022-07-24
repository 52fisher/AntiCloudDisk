// ==UserScript==
// @name         多网盘直接下载
// @namespace    https://github.com/52fisher
// @version      2.7
// @description  对一些网盘的功能进行重写，使得用户可以达到直接跳转下载页面、跳过验证码、免等待时间、兼容常见浏览器等功能.注意：无法实现会员下载，加速请支持正版
// @author       fisher
// @updateURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/yunpan.meta.js
// @downloadURL  https://gitee.com/fisher52/Anti-CloudDisk/raw/master/yunpan.user.js
// @match        https://www.567file.com/*
// @match        http://www.xun-niu.com/*
// @match        http://www.xiguapan.com/*
// @match        http://www.520file.com/*
// @match        http://www.eos-53.com/*
// @match        https://www.eos-53.com/*
// @match        http://www.ccchoo.com/*
// @match        http://page2.dfpan.com/*
// @match        http://www.mm222.cn/*
// @match        http://www.dufile.com/file/*
// @match        http://dufile.com/file/*
// @grant        none
// ==/UserScript==
(function() {
    try {
        var url = location.pathname,
            rota = url.match(/(\w+)-(\d+)/) || url.match(/(files?)\/(\w+)/),
            urlRota = ["file", "down", "down2"],
            path = urlRota.indexOf(rota[1]),
            num = rota[2];
    } catch (e) {
        console.warn('当前方案未匹配');
    }
    if (path == -1) {
        console.warn('当前方案未匹配');
        return;
    }
    var disk = {
        zV2Public: function() {
            if (urlRota[path] == "file") {
                redirectDownPage();
            }
            return this;
        },
        pdzpublic: function(s = '-') {
            if (urlRota[path] == "file") {
                window.location.href = "/down" + s + num + ".html";
            }
            $(".viplist:eq(0)").hide();
            $("#down_box,#down_link,#down_boxc").show();
            return this;
        },
        hookClick: function() {
            $("#down_link a[onclick]").attr('onclick', function() {
                return $(this).attr('onclick').split(';')[1]
            })
        },
        hookDP2: function() {
            eval(down_process2.toString().replace('var e=event||window.event;var ms=e.clientX+"*"+e.clientY;', 'try{var e=window.event||arguments.callee.caller.arguments[0]||event;var ms=e.clientX+"*"+e.clientY;}catch(e){console.log(e)}'));
        },
        hookTimer: function() {
            var _timer = window.setTimeout;
            window.setTimeout = function(a, timer) {
                timer = 0;
                _timer(a, 0);
            }
        }
    };
    var urlLists = {
        'www.eos-53.com': function() { //520盘
            disk.zV2Public().hookClick();
        },
        'www.567file.com': function() { //567盘 自动跳转https
            location.protocol == 'http:' ? location.href = 'https:' + location.href.substring(window.location.protocol.length) : null;
            disk.hookTimer();
            disk.pdzpublic();
        },
        'www.ccchoo.com': function() { //彩虹云
            disk.pdzpublic();
        },
        'page2.dfpan.com': function() { //yunfile
            disk.pdzpublic();
        },
        'www.xun-niu.com': function() { //讯牛
            disk.pdzpublic();
        },
        'www.mm222.cn': function() { //彩虹云别称
            disk.pdzpublic();
        },
        'www.wodech.com': function() { //彩虹云别称
            disk.pdzpublic();
        },
        'fourpan.com': function() { //yunfile别名强制跳转
            location.href = 'http://page2.dfpan.com/' + location.pathname;
        },
        'www.xiguapan.com': function() { //西瓜盘
            disk.pdzpublic();
        },
        'www.dufile.com': function() {
            disk.zV2Public();
        },
        'dufile.com': function() { //DF盘允许根域名解析
            disk.zV2Public();
        },
    }

    var domain = location.host;
    if (!urlLists.hasOwnProperty(domain)) {
        console.warn('当前网站暂不支持');
        return;
    }
    urlLists[domain]();
})();