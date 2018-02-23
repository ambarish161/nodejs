var http = require('http');
var https = require('https');
var final_response = '' ;
var data = '' ;         
console.log("***********started");
var auth_url = 'accounts.google.com' ;
//var auth_url = 'www.google.co.in' ;
var auth_uri='/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2F&access_type=offline';
var options_get = {
    host : auth_url, // here only the domain name
    //family: 6 ,
    // (no http/https !)
    port : 443,
    path : auth_uri,
    method : 'GET' // do GET
};
console.info('*********Do the GET call');
var req = https.get(options_get, function(response) {
    console.log("*************statusCode: ", response.statusCode);
    // uncomment it for header details
    if (response.statusCode == 302) {
            body = [];
           // request(res.headers.location);
		   //console.log('********redirect url:'+response.headers.location);
		   var redirect_req= https.get(response.headers.location, (res) => {
		   console.log('statusCode for redirect:', res.statusCode);
			  res.on('data', (d) => {
			  data= data+d;
				//console.log('********chunk recieved');
			  });
			res.on('end', (res_redirect) => {
			  console.log('**********call ended');
			});
			});
			redirect_req.on('error', (e) => {
			  console.error(e);
			}); 
			 
     } 
	
});

http.createServer(function(request, response) {
response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(data);
  response.end();
}).listen(3113);

//https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2F&access_type=offline
