class Queue {
    static queue = [];
    static isWorking = false;
    static waitingCup = false;

    static enqueue(element) {
        Queue.queue.push(element);
    }

    static dequeue() {
        if (this.size() > 0) {
            return Queue.queue.shift();
        }
    }

    static front() {
        if (this.size() > 0) {
            return Queue.queue[0];
        }
    }

    static isEmpty() {
        return Queue.size() === 0;
    }

    static size() {
        return Queue.queue.length;
    }

    static print() {
        console.log(Queue.queue);
    }
}

module.exports = Queue;
