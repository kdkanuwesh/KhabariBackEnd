const express = require("express");
const router = express.Router();

const { contactController } = require('../controllers');

router.post("/", contactController.add);
router.get("/contact/:id", contactController.showContacts);
router.delete("/:id", contactController.delete);

module.exports = router;