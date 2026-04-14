const router = require("express").Router();
const { auth } = require("../../middleware/authMiddleware");
const { addLog, getStats } = require("./analytics.controller");

router.post("/add", auth, addLog);
router.get("/stats", auth, getStats);

module.exports = router;
