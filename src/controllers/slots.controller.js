const db = require("../config/db");

function getSlots(req, res) {
    db.query("SELECT * FROM slots", (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Error getting slots" });
        }
        res.json(result);
    });
}

function editSlot(req, res) {
    if (!req.body.drink_id) {
        return res.status(400).json({ msg: "Please enter a drink id" });
    }
    db.query(
        "UPDATE slots SET drink_id = ? WHERE id = ?",
        [req.body.drink_id.toString(), req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ msg: "Error editing slot" });
            }
            res.json(result);
        }
    );
}

function deleteSlot(req, res) {
    db.query(
        "UPDATE slots SET drink_id = NULL WHERE id = ?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ msg: "Error deleting slot" });
            }
            res.json(result);
        }
    );
}

module.exports = {
    getSlots,
    editSlot,
    deleteSlot,
};
