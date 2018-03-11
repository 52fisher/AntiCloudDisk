// ==UserScript==
// @name         优速盘火狐兼容
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  解决优速盘火狐无法点击下载按钮的问题
// @updateURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/js/yousuwp.user.js
// @downloadURL    https://gitee.com/fisher52/Anti-CloudDisk/raw/master/js/yousuwp.user.js
// @author       fisher
// @match        http://www.yousuwp.com/file-*
// @grant        none
// ==/UserScript==

(function() {
    function down_process2(file_id,node_id){
        var e= arguments.callee.caller.arguments[0]||window.event;var ms=e.clientX+"*"+e.clientY;
        setTimeout(	function(){
            $('#down_box_tips').html("<img src=\"images/tip_alert.gif\" align=\"absmiddle\" border=\"0\" /><span class='txtred'>文件下载中...如果无法弹出下载框，请<a href='javascript:document.location.reload();'>刷新此页面</a>...</span>");
            $('#down_box_tips').show();
            $('#down_box_tips').addClass('down_box_tips');
            $('#down_box').fadeOut();
        },1230);
        $('#dform').attr('action',$('#dnode_'+node_id).attr('data-url'));
        $('#dform').submit();
        $.ajax({
            type : 'post',
            url : 'ajax.php',
            data : 'action=pc_2018010121&file_id='+file_id+'&ms='+ms+'&sc='+screen.width+'*'+screen.height,
            dataType : 'text',
            success:function(msg){
                if(msg == 'true'){
                    //getId('down_box').innerHTML = "<img src=\"images/ajax_loading.gif\" align=\"absmiddle\" border=\"0\" /><span class='txtred'>文件下载中...如果无法弹出下载框，请<a href='javascript:document.location.reload();'>刷新此页面</a>...</span>";
                }else{
                    alert(msg);
                }
                setTimeout(	function(){$('#down_box_tips').hide();$('#down_box').fadeIn();},5000);
            },
            error:function(){
            }

        });
    }
})();