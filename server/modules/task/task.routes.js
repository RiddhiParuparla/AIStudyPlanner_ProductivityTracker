const router = require("express").Router();
const { auth } = require("../../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  deleteTask,
  completeTask
} = require("./task.controller");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.delete("/:id", auth, deleteTask);
router.patch("/:id/complete", auth, completeTask);

module.exports = router;
