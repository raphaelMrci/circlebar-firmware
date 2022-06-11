const express = require("express");
const router = express.Router();

const { getAvailableCocktails } = require("../controllers/root.controller");

const admin = require("./admin.route");
const login = require("./login.route");
const drinks = require("./drinks.route");
const cocktails = require("./cocktails.route");
const slots = require("./slots.route");

router.get("/", getAvailableCocktails);
router.get("/test", (req, res) => res.send("CIRCLEBAR"));

router.use("/login", login);
router.use("/admin", admin);
router.use("/drinks", drinks);
router.use("/cocktails", cocktails);
router.use("/slots", slots);

module.exports = router;
