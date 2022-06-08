const db = require("../config/db");

function initSlots() {
    db.query("SELECT * FROM slots", (err, result) => {
        for (let i = result.length; i < 7; i++) {
            db.query("INSERT INTO slots (drink_id) VALUES (?)", [null]);
        }
    });
}

module.exports = {
    initSlots,
};
