const PORT = 4000;

var fs = require('fs');
var http = require('http');
var server = new http.Server(handleRequest);
var io = require('socket.io')(server);
var counter = 0;

io.on('connection', function(socket) {
  var color = 'gray';
  counter++;
  socket.on('message', function(data) {
    io.emit('message', {message: data, color: color})
  });
  console.log("User #" + counter);
  socket.on('color', function(newColor) {
    color = newColor;
  });
  socket.emit('welcome', {message: "Welcome User "+counter});
});

function handleRequest(req, res) {
  switch(req.url) {
    case '/':
    case '/index.html':
      fs.readFile('public/index.html', function(err, data){
        if(err){
          console.error(err);
          res.statusCode = 500;
          res.end("Server Error");
          return;
        }
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
      break;
    case '/simple-server.css':
      fs.readFile('public/simple-server.css', function(err, data){
        if(err){
          return;
        }
        res.setHeader("Content-Type", "text/css");
        res.end(data);
      });
      break;
    case '/simple-server.js':
      fs.readFile('public/simple-server.js', function(err, data){
        if(err){
          return;
        }
        res.setHeader("Content-Type", "text/js");
        res.end(data);
      });
      break;
  }
}

server.listen(PORT, function(){
  console.log(PORT);
});
