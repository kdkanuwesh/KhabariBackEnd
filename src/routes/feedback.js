const express = require("express");
const router = express.Router();

const { feedbackController } = require("../controllers");

router.post("/", feedbackController.add);
router.get("/", feedbackController.feedbacks);

 
module.exports = router;