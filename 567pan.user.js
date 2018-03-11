// ==UserScript==
// @name         567网盘直接下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  无需验证码以及等待时间,直接跳转至下载页面。注意：还是无法实现会员功能
// @updateURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/js/567pan.user.js
// @downloadURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/js/567pan.user.js
// @author       fisher
// @match        http://www.567pan.com/*
// @grant        none
// ==/UserScript==

(function() {
    var url = location.href,
        rota = url.match(/567pan\.com\/(.*?)-(\d+)/),
    urlRota = ["file","down","down2"],
    path  = urlRota.indexOf(rota[1]),
        num = rota[2];
    if(path != -1){
        if(urlRota[path]=="file"){
            window.location.href = "/down-"+num +".html";
        }else if(urlRota[path]){
            document.getElementsByClassName("viplist")[0].style.display="none";
            document.getElementById("down_box").style.display="block";
        }
    }
})();