var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var message = "Hello World";

// body-parserの設定：json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// サーバ起動
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", function(req,res){
    res.send('hello world');
});

// /sampleのPOSTメソッド処理
function samplePOST(req,res){
    let result = "success";
    try{
        console.log(req.body);
        message = req.body.message;
        result = "success : " + req.body.message;
    }
    catch(error){
        result = error.toString();
    }
    finally{
        res.json({
            message:result
        });
    }
}

// /sampleのGETメソッド処理
function sampleGET(req,res){
    let buf = Buffer.alloc(10);
    for(let i=0;i<10;i++){
        buf[i] = 48+i;
    }
    res.json({
        message:message,
        bin:buf
    });
}

app.post("/sample", function(req,res){
    samplePOST(req,res);
});

// サンプルデータ応答
app.get("/sample", function(req,res){
    sampleGET(req,res);
});
