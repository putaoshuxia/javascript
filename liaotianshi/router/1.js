const express = require('express');
const mysql = require('mysql');
var db=mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: '20181127'});
//跨域

var router = express.Router();
module.exports = function(){
    router.all('*',function(req,res,next){
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
router.get('/',function(req,res){
    res.sendFile('./index.html');
})
router.use("/sendadmin",(req,res)=>{
    console.log('jhgcf');
    var name = req.body.name;
    var password = req.body.password;
    console.log(password);
    if(name !="undefined"){
        db.query(`select * from admin_table where name=${name}`,(err,data)=>{
            console.log(password);
            console.log("a"+data+"b",data!="");
            if(data!=""){
                console.log(data.password==password);
                if(data.password==password){
                    res.send({msg:'登录成功'}).end();
                }else{
                    res.send({msg:'密码错误'}).end();
                }
            }else{
                db.query(`INSERT INTO admin_table (name,password)
                VALUE('${name}','${password}')`,(err,data)=>{
                if(err){
                    res.send('database error').end();
                }else{
                    res.send({msg:'登录成功'}).end();
                }
            });
            }
            
        });
        // db.query(`INSERT INTO admin_table (name,password)
        //     VALUE('${name}','${password}')`,(err,data)=>{
        //         if(err){
        //             res.send('database error').end();
        //         }else{
        //             res.send(data).end();
        //         }
        //     });
    }
});
router.use("/getadmin",(req,res)=>{
   db.query("select * from admin_table",(err,data)=>{
        if(err){
            console.log(err);
            res.static(500).send("database error").end();
        }else{
            res.send(data).end();
        }
    });   
})
router.use('/sendmsg',(req,res)=>{
    var name1 = req.body.name;
    var msg = req.body.message;
    var pass = req.body.password;
    var data = gettime();
    db.query(`INSERT INTO msg_table (name,message,password,data)
            VALUE('${name1}','${msg}','${pass}','${data}')`,(err,data)=>{
                if(err){
                    res.send('database error').end();
                }else{
                    res.send(data).end();
                }
            });
})
router.use("/getmsg",(req,res)=>{
    db.query("select * from msg_table",(err,data)=>{
         if(err){
             console.log(err);
             res.static(500).send("database error").end();
         }else{
             res.send(data).end();
         }
     });   
 })





















    return router;
}
function gettime(){
    var myDate = new Date();
    var hour = myDate.getHours();
    var minutes = myDate.getMinutes();
    var second = myDate.getSeconds();
    if(hour>=1&&hour<=9){
        hour = "0"+hour;
    }
    if(minutes>=1&&minutes<=9){
        minutes = "0"+minutes;
    }
    if(second>=1&&second<=9){
        second = "0"+second;
    }
    return hour+"-"+minutes+"-"+second;
}