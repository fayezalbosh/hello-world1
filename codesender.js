
var Service = require('node-windows').Service;
const {codes,options}=require("./codes.js")
const http= require('http');
// //********************* secure connection ******************* */
// const http= require('https');
// options.port=8443;
// //*********************************************************** */
//options.port=1111;//call the registerd sevice
options.port=8088;//call JsExecutor.js
const postData = JSON.stringify({'code': codes.consolelog});

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
//req.setHeader("content-type","application/json")
req.setHeader("content-length", Buffer.byteLength(postData));
req.setHeader("x","hhhhhhhhhhhhhhhh")
req.write(postData)
req.end();