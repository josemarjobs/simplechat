
/**
 * Module dependencies.
 */
require("coffee-script");
var express = require('express');
var http = require('http');
var path = require('path');
var clients = [];
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: "KioxIqpvdyfMXOHjVkUQmGLwEAtB0SZ9cTuNgaWFJYsbzerCDn"
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// production only
if ('production' == app.get('env')) {
  console.log("Production Env");
}

require("./apps/auth/routes")(app);

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/simplechat');
var User = require("./models/user");

var server = http.createServer(app);
var io = require("socket.io").listen(server);
io.sockets.on("connection", function(socket) {

	socket.on("setName", function(name){
		socket.set('nickname', name);
		socket.emit('ready', name);
	});

	socket.on("ready", function(name) {
		new User({username: name}).save(function(err, doc) {
			if (err) {console.log(err);}
		});
	});

	socket.on("disconnect", function() {
		socket.get("nickname", function(err, name) {
			User.findOneAndRemove({username: name}, function(err) {
				console.log(name+" has disconnected");
			});
		});
	});

	clients.push(socket);
	socket.on("msg", function(data) {
		console.log(data);
		clients.forEach(function(client) {
			client.emit("getMsg", data);
		});
	});
});
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
