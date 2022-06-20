const Queue = require("../utils/Queue");

function cupRemoved() {
    var socket = this;

    if (Queue.queue[0].socket_id != socket.id || !Queue.waitRemovingCup) {
        socket.emit("unauthorized");
        return;
    }
    Queue.waitRemovingCup = false;
    console.log("Cup removed");
    socket.emit("finished");
    Queue.dequeue();
    if (Queue.queue.length > 0) {
        Queue.waitingCup = true;
        socket.broadcast.to(Queue.queue[0].socket_id).emit("ready");
    } else {
        Queue.isWorking = false;
    }
}

module.exports = cupRemoved;
