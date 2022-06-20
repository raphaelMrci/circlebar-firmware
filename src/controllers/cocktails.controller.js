const db = require("../config/db");

function getCocktails(req, res) {
    db.query("SELECT * FROM cocktails", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error getting cocktails" });
        } else {
            res.json(results);
        }
    });
}

function newCocktail(req, res) {
    var { name, icon, recipe } = req.body;

    if (!name || !icon || !recipe) {
        return res
            .status(400)
            .json({ msg: "Please enter a name, icon and recipe" });
    }
    db.query(
        "INSERT INTO cocktails (name, icon, recipe) VALUES (?, ?, ?)",
        [name, icon, JSON.stringify(recipe)],
        (err) => {
            if (err) {
                res.status(500).json({ msg: "Error adding cocktail" });
            } else {
                res.json({ msg: "Cocktail added" });
            }
        }
    );
}

function editCocktail(req, res) {
    var { name, icon, recipe } = req.body;

    console.log("PUT /COCKTAILS");

    if (!name || !icon || !recipe) {
        return res
            .status(400)
            .json({ msg: "Please enter a name, icon and recipe" });
    }
    db.query(
        "UPDATE cocktails SET name = ?, icon = ?, recipe = ? WHERE id = ?",
        [name, icon, JSON.stringify(recipe), req.params.id],
        (err, results) => {
            if (err) {
                res.status(500).json({ msg: "Error editing cocktail" });
            } else {
                res.json({ msg: "Cocktail edited" });
            }
        }
    );
}

function deleteCocktail(req, res) {
    db.query(
        "DELETE FROM cocktails WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                res.status(500).json({ msg: "Error deleting cocktail" });
            } else {
                res.json({ msg: "Cocktail deleted" });
            }
        }
    );
}

module.exports = {
    getCocktails,
    newCocktail,
    editCocktail,
    deleteCocktail,
};
