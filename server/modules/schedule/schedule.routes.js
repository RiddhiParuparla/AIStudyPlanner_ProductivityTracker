const router = require("express").Router();
const { auth } = require("../../middleware/authMiddleware");
const { generateSchedule } = require("./schedule.controller");

router.post("/generate", auth, generateSchedule);

module.exports = router;
