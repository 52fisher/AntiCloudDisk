// ==UserScript==
// @name         多网盘直接下载
// @namespace    https://github.com/52fisher
// @version      2.1
// @description  国内的一些并不出名网盘靠着xx服务赚钱，但是有时总是太过分.本脚本对一些网盘的功能进行重写，使得用户可以达到直接跳转下载页面、跳过验证码、免等待时间、兼容常见浏览器等功能.注意：无法实现会员下载，加速请支持正版
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
    var url = location.pathname,
        rota = url.match(/(\w+)-(\d+)/),
        urlRota = ["file", "down", "down2"],
        path = urlRota.indexOf(rota[1]),
        num = rota[2];
    if (path == -1) {
        console.log('当前方案未匹配');
        return;
    }
    var disk = {
        zV2Public: function() {
            if (urlRota[path] == "file") {
                redirectDownPage();
            }
            return this;
        },
        pdzpublic: function() {
            if (urlRota[path] == "file") {
                window.location.href = "/down-" + num + ".html";
            }
            $(".viplist:eq(0)").hide()
            $("#down_box").show()
            return this;
        },
        hookClick: function() {
            $("#down_link a[onclick]").attr('onclick', function() {
                return $(this).attr('onclick').split(';')[1]
            })
        },
        hookDP2: function() {
            eval(down_process2.toString().replace('var e=event||window.event;var ms=e.clientX+"*"+e.clientY;', 'try{var e=window.event||arguments.callee.caller.arguments[0]||event;var ms=e.clientX+"*"+e.clientY;}catch(e){console.log(e)}'));
        }
    };
    var urlLists = {
        'www.eos-53.com': function() {
            disk.zV2Public().hookClick();
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