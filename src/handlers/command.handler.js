const db = require("../config/db");
const Queue = require("../utils/Queue");

var nCommand = 0;

function commandHandler(msg) {
    var socket = this;
    var availableCocktails = [];
    var isAlreadyCommand = false;

    console.log("socketid: " + socket.id, "args: " + msg);
    Queue.queue.forEach((item) => {
        if (item.socket_id == socket.id) {
            isAlreadyCommand = true;
        }
    });
    if (Queue.queue[0] && Queue.queue[0].socket_id == socket.id) {
        socket.emit("ready");
        return;
    }
    if (isAlreadyCommand) {
        socket.emit("unauthorized");
        return;
    }

    db.query("SELECT * FROM slots", (err, slots) => {
        if (err) {
            return;
        }
        db.query("SELECT * FROM cocktails", (err, cocktails) => {
            if (err) {
                return;
            }
            cocktails.forEach((cocktail) => {
                let isAvailable = true;

                cocktail.recipe.forEach((drink) => {
                    let isInStock = false;

                    slots.forEach((slot) => {
                        if (slot.drink_id == drink.drink_id) {
                            isInStock = true;
                        }
                    });
                    if (!isInStock) {
                        isAvailable = false;
                    }
                });
                if (isAvailable) {
                    availableCocktails.push(cocktail);
                }
            });
            var isAvailable = false;
            availableCocktails.forEach((cocktail) => {
                if (cocktail.id == msg) {
                    isAvailable = true;
                }
            });
            if (!isAvailable) {
                console.log("Cocktail not available");
                socket.emit("unavailable");
                return;
            }
            console.log(`Cocktail ${msg} added to queue`);
            Queue.enqueue({
                socket_id: socket.id,
                command_id: nCommand++,
                cocktail_id: msg,
            });
            socket.emit("command", nCommand);
            if (nCommand >= 255) {
                nCommand = 0;
            }
            if (!Queue.isWorking) {
                Queue.isWorking = true;
                Queue.waitingCup = true;
                socket.emit("ready");
                console.log("First command: Waiting for user to be ready");
            }
        });
    });
}

module.exports = commandHandler;
