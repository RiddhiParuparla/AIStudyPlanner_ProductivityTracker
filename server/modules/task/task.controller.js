const Task = require("./task.model");
const { logAction } = require("../admin/admin.controller");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user_id: req.user.id
  });
  await logAction(req.user.id, `Created task: ${task.title}`);
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.json(tasks);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};

exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json("Task not found");

    // Log completion to analytics
    const Analytics = require("../analytics/analytics.model");
    const today = new Date().toISOString().split('T')[0];
    
    let dailyLog = await Analytics.findOne({ user_id: req.user.id, date: today });
    if (dailyLog) {
      dailyLog.completed_tasks += 1;
      await dailyLog.save();
    } else {
      await Analytics.create({
        user_id: req.user.id,
        date: today,
        completed_tasks: 1,
        study_time: 0,
        focus_score: 90
      });
    }

    // Update gamification points
    const Gamification = require("../gamification/gamification.model");
    let stats = await Gamification.findOne({ user_id: req.user.id });
    if (stats) {
      stats.points += 10; // 10 points per task
      if (stats.points >= stats.level * 100) {
        stats.level += 1;
      }
      await stats.save();
    }

    await logAction(req.user.id, `Completed task: ${task.title} (+10 points)`);
    res.json({ message: "Task completed", points: 10 });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
