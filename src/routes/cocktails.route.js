const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
    getCocktails,
    newCocktail,
    editCocktail,
    deleteCocktail,
} = require("../controllers/cocktails.controller");

router.get("/", authenticate, getCocktails);
router.post("/", authenticate, newCocktail);
router.put("/:id", authenticate, editCocktail);
router.delete("/:id", authenticate, deleteCocktail);

module.exports = router;
