const db = require("../config/db");

function getDrinks(req, res) {
    console.log("GET /drinks");
    db.query("SELECT * FROM drinks", (err, results) => {
        if (err) {
            res.status(500).json({ msg: "Error getting drinks" });
        } else {
            res.json(results);
        }
    });
}

function newDrink(req, res) {
    var { name, icon } = req.body;

    if (!name || !icon) {
        return res.status(400).json({ msg: "Please enter a name and icon" });
    }
    db.query(
        "INSERT INTO drinks (name, icon) VALUES (?, ?)",
        [name, icon],
        (err, results) => {
            if (err) {
                res.status(500).json({ msg: "Error adding drink" });
            } else {
                res.json({ msg: "Drink added" });
            }
        }
    );
}

function editDrink(req, res) {
    var { name, icon } = req.body;

    if (!name || !icon) {
        return res.status(400).json({ msg: "Please enter a name and icon" });
    }
    db.query(
        "UPDATE drinks SET name = ?, icon = ? WHERE id = ?",
        [name, icon, req.params.id],
        (err, results) => {
            if (err) {
                res.status(500).json({ msg: "Error editing drink" });
            } else {
                res.json({ msg: "Drink edited" });
            }
        }
    );
}

function deleteDrink(req, res) {
    console.log("DELETE /drinks/" + req.params.id);
    db.query("SELECT * FROM cocktails", [], (err, cocktails) => {
        if (err) {
            console.log("Internal error: " + err);
            res.status(500).json({ msg: "Error getting cocktails" });
            return;
        }

        var canBeDeleted = true;

        cocktails.forEach((cocktail) => {
            cocktail.recipe.forEach((drink) => {
                if (drink.drink_id == req.params.id && canBeDeleted) {
                    res.status(400).json({
                        msg: "Cannot delete drink, it is used in a cocktail",
                    });
                    canBeDeleted = false;
                }
            });
        });
        if (canBeDeleted) {
            db.query(
                "DELETE FROM drinks WHERE id = ?",
                [req.params.id],
                (err, results) => {
                    if (err) {
                        res.status(500).json({
                            msg: "Error deleting drink",
                        });
                    } else {
                        console.log("Drink deleted");
                        res.json({ msg: "Drink deleted" });
                    }
                }
            );
        }
    });
}

module.exports = {
    getDrinks,
    newDrink,
    editDrink,
    deleteDrink,
};
