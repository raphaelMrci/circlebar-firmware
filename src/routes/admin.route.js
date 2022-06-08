const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { editAdmin, getAdmin } = require("../controllers/admin.controller");

router.get("/", authenticate, getAdmin);
router.put("/", authenticate, editAdmin);

module.exports = router;
