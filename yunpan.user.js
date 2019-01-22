// ==UserScript==
// @name         多网盘直接下载
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  无需验证码以及等待时间,直接跳转至下载页面。注意：还是无法实现会员功能
// @author       fisher
// @updateURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/yunpan.user.js
// @downloadURL  https://gitee.com/fisher52/Anti-CloudDisk/raw/master/yunpan.user.js
// @match        http://www.567pan.com/*
// @match        http://www.xun-niu.com/*
// @match        http://www.520file.com/*
// @match        http://www.eos-53.com/*
// @match        http://www.ccchoo.com/*
// @match        http://page2.dfpan.com/*
// @grant        none
// ==/UserScript==
(function() {
    var disk = {
        zV2Public: function() {
            redirectDownPage();
        },
        pdzpublic: function() {
            var url = location.pathname,
                rota = url.match(/(\w+)-(\d+)/),
                urlRota = ["file", "down", "down2"],
                path = urlRota.indexOf(rota[1]),
                num = rota[2];
            if (path == -1) {
                console.log('当前方案未匹配');
                return;
            }
            if (urlRota[path] == "file") {
                window.location.href = "/down-" + num + ".html";
            }
            $(".viplist:eq(0)").hide()
            $("#down_box").show()
        },
    };
    var urlLists = {
        'www.eos-53.com': function() {
            disk.zV2Public();
        },
        'www.567pan.com': function() {
            disk.pdzpublic();
        },
        'www.ccchoo.com': function() {
            disk.pdzpublic();
        },
        'page2.dfpan.com': function() {
            disk.pdzpublic();
        },
        'www.xun-niu.com': function() {
            disk.pdzpublic();
        }
    }
    var domain = location.host;
    if (!urlLists.hasOwnProperty(domain)) {
        console.log('当前网站暂不支持');
        return;
    }
    urlLists[domain]();
})();