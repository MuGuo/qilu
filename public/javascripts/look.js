/**
 * Created by Guo on 2015/9/19.
 */
(function(){
    var danmu = $('#danmu');
    //初始化
    danmu.danmu({});

    //再添加三个弹幕
    danmu.danmu("addDanmu",[
        { text:"这是滚动弹幕" ,color:"white",size:1,position:0,time:2}
        ,{ text:"这是顶部弹幕" ,color:"yellow" ,size:1,position:1,time:2}
    ]);
    //一个定时器，监视弹幕时间并更新到页面上
    starter();
    function starter(){
        danmu.danmu('danmuStart');
    }
    function pauser(){
        danmu.danmu('danmuPause');
    }
    function resumer(){
        danmu.danmu('danmuResume');
    }
    function stoper(){
        danmu.danmu('danmuStop');
    }
    function getime(){
        alert($('#danmu').data("nowTime"));
    }
    function getpaused(){
        alert($('#danmu').data("paused"));
    }

    //发送弹幕，使用了文档README.md第7节中推荐的方法
    $('#send').click(function(){
        var text = document.getElementById('text').value;
        var color = document.getElementById('color').value;
        var position = document.getElementById('position').value;
        var time = $('#danmu').data("nowTime")+1;
        var size =document.getElementById('text_size').value;
        //var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+'}';
        //$.post("stone.php",{danmu:text_obj});
//        var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+',"isnew":""}';
        var text_obj = {
            text: text,
            color: color,
            size: size,
            position: position,
            time: danmu.data("nowTime") + 1
        };

//        text_obj = { text:"这是底部弹幕" , color:"red" ,size:1,position:2,time:2};
//        var new_obj=eval('('+text_obj+')');


//



        //stoper();
        danmu.danmu("addDanmu", text_obj);
        resumer();
        document.getElementById('text').value='';
    });
    //调整透明度函数
    function op(){
        var op=document.getElementById('op').value;
        $('#danmu').danmu("setOpacity",op/100);
    }

    //调隐藏 显示
    function changehide() {
        var op = document.getElementById('op').value;
        op = op / 100;
        if (document.getElementById("ishide").checked) {
            $("#danmu").danmu("setOpacity",1)
        } else {
            $("#danmu").danmu("setOpacity",0)

        }
    }

    //设置弹幕时间
    function settime(){
        var t=document.getElementById("set_time").value;
        t=parseInt(t)
        $('#danmu').danmu("setTime",t);
        starter();
    }
//    var danmu = $('#danmu');
//    function pauser(){
//        danmu.danmu('danmuPause');
//    }
//    function resumer(){
//        danmu.danmu('danmuResume');
//    }
//    function stoper(){
//        danmu.danmu('danmuStop');
//    }
//    function getime(){
//        alert(danmu.data("nowTime"));
//    }
//    function getpaused(){
//        alert(danmu.data("paused"));
//    }
//
////发送弹幕，使用了文档README.md第7节中推荐的方法
//    function send(){
//        var text = document.getElementById('text').value;
//        var color = document.getElementById('color').value;
//        var position = document.getElementById('position').value;
//        var time = danmu.data("nowTime")+1;
//        var size =document.getElementById('text_size').value;
//        //var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+'}';
//        //$.post("stone.php",{danmu:text_obj});
//        var text_obj='{ "text":"'+text+'","color":"'+color+'","size":"'+size+'","position":"'+position+'","time":'+time+',"isnew":""}';
//        var new_obj=eval('('+text_obj+')');
//        danmu.danmu("addAanmu", new_obj);
//        document.getElementById('text').value='';
//    }
////调整透明度函数
//    function op(){
//        var op=document.getElementById('op').value;
//        danmu.danmu("setOpacity",op/100);
//    }
//
////调隐藏 显示
//    function changehide() {
//        var op = document.getElementById('op').value;
//        op = op / 100;
//        if (document.getElementById("ishide").checked) {
//            $("#danmu").danmu("setOpacity",1)
//        } else {
//            $("#danmu").danmu("setOpacity",0)
//
//        }
//    }
//    danmu.danmu({});
//    danmu.danmu('addDanmu', {
//        text: '底部',
//        color: 'red',
//        size: 1,
//        position: 2,
//        time: 2
//    });
////设置弹幕时间
//    function settime(){
//        var t=document.getElementById("set_time").value;
//        t=parseInt(t)
//        danmu.danmu("setTime",t);
//    }
//
//    $("#send").click(function(){
//alert('--');
//        danmu.danmu('addDanmu', {
//            text: '底部',
//            color: 'red',
//            size: 1,
//            position: 2,
//            time: 2
//        })
//    });
})();
