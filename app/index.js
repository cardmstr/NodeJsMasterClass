/*
* Primary File for the API
*/

var http = require('http');
var url = require('url');

var server = http.createServer(function(req,res){
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  res.end('Hello World!\n');

  console.log('request received on this path: '+trimmedPath);
});

server.listen(3000, function(){
  console.log('server running on port 3000');
});
