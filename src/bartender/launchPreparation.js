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

    if (Queue.queue[0].socket_id != socket.id) {
        socket.emit("unauthorized");
        return;
    }
    socket.emit("preparing");
    prepareCocktail(socket).then(() => {
        console.log("Preparation finished");
        socket.emit("get-cup");
        waitCupRemoved().then(() => {
            console.log("Cup removed");
            socket.emit("finished");
            Queue.dequeue();
            if (Queue.queue.length > 0) {
                socket.broadcast.to(Queue.queue[0].socket_id).emit("ready");
            } else {
                Queue.isWorking = false;
            }
        });
    });
}

module.exports = launchPreparation;
