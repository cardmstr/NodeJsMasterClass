/*
* Primary File for the API
*/

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function(req,res){
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  var queryStringObject = parsedUrl.query; //handles query string parameters like /?fizz=buzz

  var method = req.method.toLowerCase();//http method
  var headers = req.headers;//headers as object
  var decoder = new StringDecoder('utf-8'); // payload handling
  var buffer = '';
  req.on('data',function(data){
    buffer += decoder.write(data);
  });
  req.on('end',function(){
    buffer += decoder.end();

    res.end('Hello World!\n');

    console.log('path: '+trimmedPath);
    console.log(' method: '+method);
    console.log(' query string parameters:',queryStringObject);
    console.log('headers: ',headers);
    console.log('payload: ',buffer);
  });
});

server.listen(3000, function(){
  console.log('server running on port 3000');
});
