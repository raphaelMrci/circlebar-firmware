const express = require("express"); //requires express module
const socket = require("socket.io"); //requires socket.io module
const app = express();
var PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const { initSlots } = require("./middleware/init");
const commandHandler = require("./handlers/command.handler");
const launchPreparation = require("./bartender/launchPreparation");
const cupRemoved = require("./handlers/cupRemoved.handler");

const server = app.listen(PORT); //hosts server on localhost:3000
server.maxConnections = 20;
const io = socket(server);

const router = require("./routes");
const Queue = require("./utils/Queue");
const { startNewCommand, cancelCommand } = require("./middleware/commands");

initSlots();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/", router);

console.log("Server is running");

io.sockets.on("connection", (socket) => {
    console.log("New socket connection: " + socket.id);

    socket.on("command", commandHandler);
    socket.on("ready", launchPreparation);
    socket.on("removed", cupRemoved);

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        Queue.queue.forEach((item, index) => {
            if (item.socket_id == socket.id) {
                cancelCommand(index, io);
            }
        });
        // TODO: remove user commands from queue
    });
});

// socket.broadcast.to(socketid).emit("command"); to send to an individual client
