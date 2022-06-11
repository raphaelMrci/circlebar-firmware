const db = require("../config/db");

function getAvailableCocktails(req, res) {
    var availableCocktails = [];

    console.log("GET /");

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
            return res.status(200).json(availableCocktails);
        });
    });
}

module.exports = {
    getAvailableCocktails,
};
