const express = require("express");
const router = express.Router();

const { formController } = require("../controllers");

router.post("/", formController.add);
router.get("/past", formController.pastincidents);
router.get("/past/:id", formController.singleincident);
router.get("/userpast/:id", formController.pastincidentById);
router.delete("/:id", formController.delete);
router.get("/allforms", formController.todaysForm);
router.get("/responders", formController.respondersList);
router.delete("/responders/:id", formController.deleteResponders);
router.put("/past/:id", formController.updateStatus);
 
module.exports = router;
