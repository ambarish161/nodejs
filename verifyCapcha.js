var NodeCache = require( "node-cache" );
var myCache1 = new NodeCache();
exports.verify = function (id, text) {	
	var status='';
	myCache1.keys( function( err, mykeys ){
  if( !err ){
    console.log( "keys are: " + mykeys );
   // [ "all", "my", "keys", "foo", "bar" ] 
  }
});
	var value=myCache1.get("mykey");
	console.log( "cache get: "+ value);
	if(value != null || value != undefined){
		//if( temp != text){
			status='not verified';
		//}else{		
		//	status='verified';
		//}
	}else{
	console.log("no value found in cache");
	status= 'not verified';
	}
	console.log( "captcha verification completed" );
	return status ;
}