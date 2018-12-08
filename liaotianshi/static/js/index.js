//取消页面默认事件
document.oncontextmenu = function(){
    　　    return false;
};
let button = document.getElementsByClassName('login-button')[0];
let login = document.getElementsByClassName('login')[0];
let jdt = document.getElementsByClassName('right_up')[0];
let demo = document.getElementsByClassName('demo')[0];
let left = document.getElementsByClassName('left')[0];
var m,name,pa,flag = 1;
// button.addEventListener('click',function(){
//     login.style.display = "none";
//     demo.style.dispaly = "block";
// });
$('.login-button').click(function(){
    if($(".login-input").eq(0).val()){
        name = $(".login-input").eq(0).val();
        pa = $(".login-input").eq(1).val();
        sendadmin();
        if(flag){
            getadmin();
            $('.login').css("display","none");
            $('.demo').css("display","block");
            $('.name1').html(name);
            getmsg();
            setInterval(wenzi,500)
            // setInterval(getmsg,2000)
        }
        
    }else{
        $(".err").css('opacity',"1")
        setTimeout(time,1000);
    }
})
$('.button').click(function(){
    if($('.input').val()){
        sendmess();
        getmsg();
        $('.input').val("");
    }
})
//防抖
function debounce(handler,delay){
    var timer = null;
    return function(){
        var _self = this,_arg = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            handler.apply(_self,_arg);
        },delay);
    }
}
function wenzi(){
    console.log($('.right_up').scrollTop(),$('.right_up').height(),
    $('.right_up')[0].scrollHeight-20);
    console.log($('.right_up').scrollTop()+$('.right_up').height()>=($('.right_up')[0].scrollHeight-20));
    if($('.right_up').scrollTop()+$('.right_up').height()>=($('.right_up')[0].scrollHeight-20)){
        getmsg();
    }
}
function time(){
    m = 100;
    var a =  setInterval(function(){
        m-=10;
        if(m==0){
            clearInterval(a);
        }
        $(".err").css('opacity',m/100)
    },100)
}
// jdt.addEventListener("mouseout",function(){
//     setTimeout("jdt.style.overflowY = 'hidden'",1000);
// });
// jdt.addEventListener("mouseover",function(){
//     jdt.style.overflowY = 'auto';
// });

//交互
function sendadmin(){
    $.ajax({
        url:"http://localhost:8080/sendadmin",
        type:"POST",
        dataType:"json",
        async:false,
        data:{
            name:$(".login-input").eq(0).val(),
            password:$(".login-input").eq(1).val()
            },
        success:function(data){
            alert(data.msg);
            if(data.msg=='密码错误'){
                flag=0;
            }
        },
        error:function(res){
            console.log(res);
        }
    })
}
function getadmin(){
    $.ajax({
        url:"http://localhost:8080/getadmin",
        type:"POST",
        dataType:"json",
        async:false,
        success:function(data){
            // console.log(data);
            for(var i = 0;i<data.length;i++){
                $('.left_namelist').append(`
                    <div class="names">
                        <div class="tupian">
                            <img src="http://q.qlogo.cn/headimg_dl?dst_uin=705597001&spec=100" alt class="img">
                        </div>
                        <h3>${data[i].name}</h3>
                    </div>
            `)
            }
        },
        error:function(res){
            console.log(res);
        }
    })
}

function sendmess(){
    $.ajax({
        url:"http://localhost:8080/sendmsg",
        type:"POST",
        datatype:'json',
        async:false,
        data:{message:$(".input").val(),name:$(".login-input").eq(0).val(),password:$(".login-input").eq(1).val()},
        success:function(data){
            console.log(data);
        },
        error:function(res){
            console.log('err');
            console.log(res);
        }

    })
}
function getmsg(){
    $.ajax({
        url:"http://localhost:8080/getmsg",
        type:"POST",
        datatype:'json',
        async:false,
        success:function(data){
            $('.right_up').html("");
            for(var i = 0;i<data.length;i++){
                if(data[i].name ==name&&pa==data[i].password){
                    $('.right_up').append(`
                    <div class="chat_right">
                    <div class="chat_right_photo">
                        <img src="http://q.qlogo.cn/headimg_dl?dst_uin=705597001&amp;spec=100" alt="">
                    </div>
                    <div class="chat_right_font">
                        <div class="time_right">
                            <span>${data[i].data}</span>
                            ${data[i].name}
                        </div>
                        <div class="font_right">${data[i].message}</div>
                    </div>
                </div>
                    `)
                }else{
                    $('.right_up').append(`
                    <div class="chat_left">
                    <div class="chat_left_photo">
                        <img src="http://q.qlogo.cn/headimg_dl?dst_uin=705597001&amp;spec=100" alt="">
                    </div>
                    <div class="chat_left_font">
                        <div class="time_left">
                            <span>${data[i].data}</span>
                            ${data[i].name}
                        </div>
                        <div class="font_left">${data[i].message}</div>
                    </div>
                </div>
                    `)
                }
                $('.right_up').scrollTop($('.right_up').scrollTop()+1000);
            }
        },
        error:function(res){
            console.log(res);
        }

    })
}
