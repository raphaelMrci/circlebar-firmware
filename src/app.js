const express = require("express"); //requires express module
const socket = require("socket.io"); //requires socket.io module
const app = express();
var PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const { initSlots } = require("./middleware/init");

const router = require("./routes");

initSlots();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/", router);

const server = app.listen(PORT); //hosts server on localhost:3000
const io = socket(server);

console.log("Server is running");

var connected = 0;

const commandHandler = require("./handlers/command.handler");

io.sockets.on("connection", (socket) => {
    console.log("New socket connection: " + socket.id);
    connected++;

    socket.on("command", commandHandler);

    socket.on("disconnect", (socket) => {
        console.log("User disconnected: " + socket.id);
        connected--;
    });
});

// socket.broadcast.to(socketid).emit("command"); to send to an individual client
