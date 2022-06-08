const db = require("../config/db");

function getAvailableCocktails(req, res) {
    var availableCocktails = [];

    db.query("SELECT * FROM slots", (err, slots) => {
        if (err) {
            return res.status(500).json({ msg: "Error getting slots" });
        }
        db.query("SELECT * FROM cocktails", (err, cocktails) => {
            if (err) {
                return res.status(500).json({ msg: "Error getting cocktails" });
            }
            cocktails.forEach((cocktail) => {
                let isAvailable = true;

                cocktail.recipe.forEach((drink) => {
                    if (!slots.includes((slot) => slot.drink_id == drink.id)) {
                        isAvailable = false;
                    }
                });
                if (isAvailable) {
                    availableCocktails.push(cocktail);
                }
            });
        });
    });
    res.json(availableCocktails);
}

module.exports = {
    getAvailableCocktails,
};
