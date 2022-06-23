const Queue = require("../utils/Queue");
const db = require("../config/db");
const Pumps = require("./initGpio");

const prepareCocktail = (index, recipe) => {
    return new Promise((resolve) => {
        if (index < recipe.length) {
            db.query(
                "SELECT * FROM slots WHERE drink_id = ?",
                [recipe[index].drink_id],
                (err, slots) => {
                    if (err) {
                        return;
                    }
                    console.log(slots[0]);
                    Pumps[slots[0].id - 1].writeSync(1);
                    setTimeout(() => {
                        Pumps[slots[0].id - 1].writeSync(0);
                        return resolve(prepareCocktail(++index, recipe));
                    }, recipe[index].qty);
                }
            );
        } else return resolve();
    });
};

function launchPreparation() {
    var socket = this;

    if (Queue.queue[0].socket_id != socket.id || !Queue.waitingCup) {
        socket.emit("unauthorized");
        return;
    }
    Queue.waitingCup = false;
    socket.emit("preparing");
    db.query(
        "SELECT * FROM cocktails WHERE id = ?",
        [Queue.queue[0].cocktail_id],
        (err, cocktails) => {
            if (err) {
                return;
            }
            var cocktail = cocktails[0];
            var recipe = JSON.parse(cocktail.recipe);
            prepareCocktail(0, recipe).then(() => {
                console.log("Preparation finished");
                socket.emit("get-cup");
                Queue.waitRemovingCup = true;
            });
            console.log(cocktail);
        }
    );
}

module.exports = launchPreparation;
