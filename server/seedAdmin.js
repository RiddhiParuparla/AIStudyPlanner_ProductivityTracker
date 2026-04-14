const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./modules/auth/auth.model");

mongoose.connect("mongodb://localhost:27017/ai-study-planner")
  .then(async () => {
    console.log("DB Connected for Seeding");
    const adminExists = await User.findOne({ email: "admin@study.com" });
    if (!adminExists) {
      const hashed = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@study.com",
        password: hashed,
        role: "admin",
        isActive: true
      });
      console.log("Admin account created! (admin@study.com / admin123)");
    } else {
      console.log("Admin account already exists.");
    }
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
