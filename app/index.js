/*
* Primary File for the API
*/

//Internal NodeJS dependencies
var http = require('http');

// the Server should respond to all requests with a string
var server = http.createServer(function(req,res){
  res.end('Hello World!\n');
});

// start the server and have it listen on port 3000
server.listen(3000, function(){
  console.log('server running on port 3000');
});
