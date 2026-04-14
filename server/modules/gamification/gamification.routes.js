const router = require("express").Router();
const { auth } = require("../../middleware/authMiddleware");
const { getStats } = require("./gamification.controller");

router.get("/stats", auth, getStats);

module.exports = router;
