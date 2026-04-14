const Gamification = require("./gamification.model");
const Analytics = require("../analytics/analytics.model");

exports.updateGamification = async (userId, studyTime, completedTasks) => {
  let gState = await Gamification.findOne({ user_id: userId });
  
  if (!gState) {
    gState = await Gamification.create({ user_id: userId, last_active: new Date() });
  }

  // Update Streak
  const today = new Date();
  today.setHours(0,0,0,0);
  const lastActive = gState.last_active ? new Date(gState.last_active) : new Date(0);
  lastActive.setHours(0,0,0,0);

  const diffDays = Math.ceil((today - lastActive) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    gState.streak += 1;
  } else if (diffDays > 1) {
    gState.streak = 1; // broken streak
  } else if (gState.streak === 0) {
    gState.streak = 1; // start new streak
  }

  gState.last_active = new Date();

  // Update Points & Level
  gState.points += Math.floor(studyTime * 2);
  gState.level = Math.floor(gState.points / 100) + 1; // Ensure level 1 start instead of 0

  // Evaluate Badges
  if (gState.streak >= 7 && !gState.badges.includes("Consistent Learner")) {
    gState.badges.push("Consistent Learner");
  }

  // Task Master Check (Sum over Analytics)
  const allLogs = await Analytics.find({ user_id: userId });
  const totalTasksEver = allLogs.reduce((acc, curr) => acc + (curr.completed_tasks || 0), 0) + completedTasks;
  
  if (totalTasksEver >= 100 && !gState.badges.includes("Task Master")) {
    gState.badges.push("Task Master");
  }

  await gState.save();
  return gState;
};

exports.getStats = async (req, res) => {
  const gState = await Gamification.findOne({ user_id: req.user.id });
  res.json(gState || { streak: 0, points: 0, level: 1, badges: [] });
};
