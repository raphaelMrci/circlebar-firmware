const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
    getSlots,
    editSlot,
    deleteSlot,
} = require("../controllers/slots.controller");

router.get("/", authenticate, getSlots);
router.put("/:id", authenticate, editSlot);
router.delete("/:id", authenticate, deleteSlot);

module.exports = router;
