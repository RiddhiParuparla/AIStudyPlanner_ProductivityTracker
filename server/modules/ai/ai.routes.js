const router = require("express").Router();
const { auth } = require("../../middleware/authMiddleware");
const { getChatResponse, getSmartInsights } = require("./ai.controller");

router.post("/chat", auth, getChatResponse);
router.get("/insights", auth, getSmartInsights);

module.exports = router;
