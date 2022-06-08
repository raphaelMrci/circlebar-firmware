const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
    getDrinks,
    newDrink,
    editDrink,
    deleteDrink,
} = require("../controllers/drinks.controller");

router.get("/", authenticate, getDrinks);
router.post("/", authenticate, newDrink);
router.put("/:id", authenticate, editDrink);
router.delete("/:id", authenticate, deleteDrink);

module.exports = router;
