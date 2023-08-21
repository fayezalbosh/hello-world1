var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var Service = require('node-windows').Service;
const vm = require('node:vm');
var privateKey  = fs.readFileSync('D:\\AirShower\\key.pem', 'utf8');
var certificate = fs.readFileSync('D:\\AirShower\\cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

var app = express();

app.use(express.json()) //Notice express.json middleware



const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var contextObject ={};// {animal: 'cat',};
app.get('/', (req, res) => {
    res.sendFile("D:\\Apps\\index.html")
    //res.send('Now using https..');
 });
 app.post('/code', (req, res) => {
    console.log(req.headers)    
    console.log(req.body.code)
    try{
    vm.runInNewContext(req.body.code,contextObject)(require);
    }catch(error){console.log(error.message)}

    res.setHeader("x","kkkkkkkkk")
    res.send(contextObject);
  })

httpServer.listen(8088);
httpsServer.listen(8443);
app.listen(2222)