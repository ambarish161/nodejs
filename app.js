/**
 * Captcha PNG img generator
 * @Author: George Chan
 * @Email: gchan@21cn.com
 * @Version: 1.0
 * @Date: 2013-08-18
 * @license http://www.opensource.org/licenses/bsd-license.php BSD License
 */

var http = require('http');
var url = require('url');
var captchapng = require('./captchapng.js');
var verifyCapcha = require('./verifyCapcha.js');


http.createServer(function (request, response) {  
		console.log(request.url) ;
		var input_uri = request.url ;
		var pathName = url.parse(input_uri).pathname;
		var generate = /\/generate/;
		var verify = /\/verify/;
		console.log("input_uri: " + input_uri);
		if(generate.test(request.url)) {
			var p = captchapng.captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
			p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
			p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

			var img = p.getBase64();
			var imgbase64 = new Buffer(img,'base64');


			console.log("verifying");
			var return_status = verifyCapcha.verify("2172","2172");
			return_status= return_status.toString();
			console.log(return_status);


			response.writeHead(200, {
				'Content-Type': 'image/png'
			});
			response.end(imgbase64);			
		}
		if(verify.test(request.url)) {
			var queryData = url.parse(request.url, true).query;
			var id = queryData.id ;
			var text = queryData.id ;
			console.log("input is " + id + " " + text) ;
			console.log("verifying");
			var return_status = verifyCapcha.verify(id,text);
			return_status= return_status.toString();
			console.log(return_status);
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.end(return_status);
		}
}).listen(8182);

console.log('Web server started.\n http://127.0.0.1:8182/generate');