var http = require('http');
var https = require('https');
var final_response = '' ;
var data = '' ;    
http.createServer(function(request, response1) {     
console.log("***********started");
var auth_url = 'accounts.google.com' ;
// var auth_url = 'www.google.co.in' ;
var auth_uri='/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2F&access_type=offline';
var options_get = {
    host : auth_url, // here only the domain name
    // family: 6 ,
    // (no http/https !)
    port : 443,
    path : auth_uri,
    method : 'GET' // do GET
};
console.info('*********Do the GET call');
var req = https.get(options_get, function(response) {
    console.log("*************statusCode: ", response.statusCode);
    // uncomment it for header details
            body = [];
           // request(res.headers.location);
		   console.log('********redirect url:'+response.headers.location);
		   data= response.headers.location ;	
			response1.setHeader('Access-Control-Allow-Origin', '*');
			response1.writeHead(200, {'Content-Type': 'text/plain'});
	
			response1.write(data);
			response1.end();
			});
			
	
}).listen(3113);

// https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2F&access_type=offline
