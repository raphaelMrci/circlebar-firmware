const express = require("express"); //requires express module
const socket = require("socket.io"); //requires socket.io module
const app = express();
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT); //hosts server on localhost:3000
const bodyParser = require("body-parser");

const { login, admin, drinks } = require("./routes");

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/login", login);
app.use("/admin", admin);
app.use("/drinks", drinks);

console.log("Server is running");

const io = socket(server);

var queue = [];
var connected = 0;

io.on("connection", (socket) => {
    console.log("New socket connection: " + socket.id);
    connected++;

    socket.on("command", (args) => {
        console.log(args);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        cpnnected--;
    });
});
