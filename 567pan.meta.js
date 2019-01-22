// ==UserScript==
// @name         多网盘直接下载
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  无需验证码以及等待时间,直接跳转至下载页面。注意：还是无法实现会员功能
// @author       fisher
// @match        http://www.567pan.com/*
// @match        http://www.520file.com/*
// @grant        none
// ==/UserScript==
//  //     var url = location.pathname,
//         rota = url.match(/([A-z]+)-(\d+)/),
//         urlRota = ["file", "down", "down2"],
//         path = urlRota.indexOf(rota[1]),
//         num = rota[2];
//     if (path != -1) {
//         if (urlRota[path] == "file") {
//             window.location.href = "/down-" + num + ".html";
//         } else if (urlRota[path]) {
//             switch (location.host) {
//                 case "www.520file.com":
//                     try {
//                         document.getElementsByClassName("viplist")[0].style.display = "none";
//                         document.getElementById("down_box").style.display = "block";
//                     } catch (e) {
//                         console.log(e.message);
//                     }
//                     break;
//                     break;
//                 case "www.520file.com":
//                     $("#down_link a").attr('onclick', "abox('downbox.php?file_id=" + num + "','文件下载',480,350);")
//                     break;
//                 case "www.567pan.com":
//                     try {
//                         document.getElementsByClassName("viplist")[0].style.display = "none";
//                         document.getElementById("down_box").style.display = "block";
//                     } catch (e) {
//                         console.log(e.message);
//                     }
//                     break;
//                 default:
//                     ;
//             }
//         }
//     }