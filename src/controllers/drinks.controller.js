const db = require("../config/db");

function getDrinks(req, res) {
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
    db.query(
        "DELETE FROM drinks WHERE id = ?",
        [req.params.id],
        (err, results) => {
            if (err) {
                res.status(500).json({ msg: "Error deleting drink" });
            } else {
                res.json({ msg: "Drink deleted" });
            }
        }
    );
}

module.exports = {
    getDrinks,
    newDrink,
    editDrink,
    deleteDrink,
};
