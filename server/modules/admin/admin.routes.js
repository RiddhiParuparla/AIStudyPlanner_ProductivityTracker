const router = require("express").Router();
const { auth, authorizeRoles } = require("../../middleware/authMiddleware");
const { getUsers, deleteUser, toggleUser, getSystemStats } = require("./admin.controller");

router.get("/users", auth, authorizeRoles("admin"), getUsers);
router.delete("/users/:id", auth, authorizeRoles("admin"), deleteUser);
router.put("/users/:id/toggle", auth, authorizeRoles("admin"), toggleUser);
router.get("/stats", auth, authorizeRoles("admin"), getSystemStats);

module.exports = router;
