const Analytics = require("./analytics.model");
const { updateGamification } = require("../gamification/gamification.controller");
const { logAction } = require("../admin/admin.controller");

exports.addLog = async (req, res) => {
  const { study_time, completed_tasks, focus_score, date } = req.body;
  
  const log = await Analytics.create({
    user_id: req.user.id,
    date: date || new Date(),
    study_time,
    completed_tasks,
    focus_score
  });

  // Automatically trigger gamification tracking
  const gamificationUpdate = await updateGamification(req.user.id, study_time, completed_tasks);

  await logAction(req.user.id, `User studied for ${study_time} mins and completed ${completed_tasks} tasks.`);

  res.json({ log, gamification: gamificationUpdate });
};

exports.getStats = async (req, res) => {
  const logs = await Analytics.find({ user_id: req.user.id }).sort({ date: 1 });
  res.json(logs);
};
