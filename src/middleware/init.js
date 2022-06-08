const db = require("../config/db");

function initSlots() {
    db.query("SELECT * FROM slots", (err, result) => {
        if (err) {
            return console.log("Error getting slots");
        }
        for (let i = result.length; i < 7; i++) {
            db.query("INSERT INTO slots (id, drink_id) VALUES (?, ?)", [
                i + 1,
                null,
            ]);
        }
    });
}

module.exports = {
    initSlots,
};
