

var express = require("express");
var http = require("http")

var app = express();
var server = http.Server(app);
var io = require("socket.io")(server);
var users = [];

server.listen(3333, function() {
    console.log("Server running at PORT 3333.");
});

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/styles/index.css", function(req,res) {
    res.sendFile(__dirname + "/styles/index.css");
});


io.on("connection" , function(socket) {

    var name = "" ;

    socket.on("Has connected" , function(username) {
        name = username;
        users.push(username);
        io.emit("Has connected" , {username: username, usersList: users});
    });

    socket.on("disconnect", function() {
        users.splice(users.indexOf(name) , 1);
        io.emit("Has disconnected" , {username: name, usersList: users});
    });

    socket.on("new message" , function(message) {
        io.emit("new message" , message);
    });


});