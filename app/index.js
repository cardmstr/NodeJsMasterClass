/*
* Primary File for the API
*/

var http = require('http');
var https = require('https');
var url = require('url');
var config = require('./config');
var StringDecoder = require('string_decoder').StringDecoder;
var fs = require('fs');

var httpServer = http.createServer(function(req,res){
  unifiedServer(req,res);
});
server.listen(config.httpPort, function(){
  console.log('server running on port '+config.httpPort+' in ' + config.envName);
});


var httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function(){
  unifiedServer(req,res);
});
server.listen(config.httpsPort, function(){
  console.log('server running on port '+config.httpsPort+' in ' + config.envName);
});


var unifiedServer = function(req,res){
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

    var currHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    currHandler(data,function(statusCode, payload){
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      payload = typeof(payload) == 'object' ? payload : {};
      var payloadString = JSON.stringify(payload);
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('response',statusCode,payloadString);
    });

  });
};

var handlers = {};
handlers.rabbit = function(data,callback){
  callback(406,{'name' : 'follow the white rabbit'});
};
handlers.notFound = function(data,callback){
  callback(404);
};

var router = {
  'rabbit' : handlers.rabbit
}
