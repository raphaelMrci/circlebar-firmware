const Queue = require("../utils/Queue");

function startNewCommand(socket) {
    Queue.isWorking = true;
    Queue.waitingCup = true;
    socket.emit("ready");
    Queue.waitRemovingCup = false;
}

function cancelCommand(index, io) {
    Queue.queue.splice(index, 1);
    if (index == 0 && Queue.size() > 0) {
        startNewCommand(io.sockets.to(Queue.queue[0].socket_id));
    }
}

module.exports = {
    startNewCommand,
    cancelCommand,
};
