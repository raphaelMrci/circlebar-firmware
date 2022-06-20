const { waitCupRemoved } = require("./waitCup");
const Queue = require("../utils/Queue");

async function prepareCocktail(socket) {
    return new Promise((resolve, reject) => {
        console.log("Launching preparation");
        setTimeout(() => {
            resolve();
        }, 5000);
    });
}

function launchPreparation() {
    var socket = this;

    if (Queue.queue[0].socket_id != socket.id || !Queue.waitingCup) {
        socket.emit("unauthorized");
        return;
    }
    Queue.waitingCup = false;
    socket.emit("preparing");
    prepareCocktail(socket).then(() => {
        console.log("Preparation finished");
        socket.emit("get-cup");
        Queue.waitRemovingCup = true;
    });
}

module.exports = launchPreparation;
