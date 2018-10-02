// ==UserScript==
// @name         多网盘直接下载
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  无需验证码以及等待时间,直接跳转至下载页面。注意：还是无法实现会员功能
// @author       fisher
// @updateURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/567pan.meta.js
// @downloadUR   https://gitee.com/fisher52/Anti-CloudDisk/raw/master/567pan.user.js
// @match        http://www.567pan.com/*
// @match        http://www.520file.com/*
// @grant        none
// ==/UserScript==

(function() {
    var url = location.href,
        rota = url.match(/\/([A-z]+)-(\d+)/),
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