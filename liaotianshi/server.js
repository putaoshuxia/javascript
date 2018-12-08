const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser=require('body-parser');

//建立服务
var server = express();
server.use(express.static('./'));
//解析post数据
server.use(bodyParser.urlencoded({extended: false}));
//跨域
server.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    //为了方便返回json
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS"){
        //让options请求快速返回
        res.sendStatus(200);
    }else{
        next();
    }
});
//session
server.use(cookieParser());
(function(){
    var keys = [];
    for(var i = 0;i<100000;i++){
        keys[i]='a_'+Math.random();
    }
    server.use(cookieSession({
        name:'sess_id',
        keys:keys,
        maxAge:20*60*1000
    }));
})();
server.use('/',require('./router/mysql.js')());
// server.post('/msg/',function(req,res){
//     console.log('jhhgf');
//     console.log(req.body);
//     res.send('nkjbvk');
// })
server.listen(8080,function(){
    console.log("已监听8080");
});