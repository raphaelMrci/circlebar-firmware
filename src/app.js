const express = require("express"); //requires express module
const socket = require("socket.io"); //requires socket.io module
const app = express();
var PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const { initSlots } = require("./middleware/init");

const { login, admin, drinks, cocktails, slots } = require("./routes");

initSlots();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/login", login);
app.use("/admin", admin);
app.use("/drinks", drinks);
app.use("/cocktails", cocktails);
app.use("/slots", slots);

const server = app.listen(PORT); //hosts server on localhost:3000
const io = socket(server);

console.log("Server is running");

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
