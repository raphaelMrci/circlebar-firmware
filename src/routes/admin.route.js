const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { editAdmin } = require("../controllers/admin.controller");

// router.get("/", authenticate);
router.put("/", authenticate, editAdmin);

module.exports = router;
