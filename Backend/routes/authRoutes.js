const express = require("express");
const router = express.Router();
const User = require("../models/User");  // make sure this path is correct
const bcrypt = require("bcrypt");

// ✅ Password validation function
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  return regex.test(password);
};

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { email, username, phone, password } = req.body;

    if (!email || !username || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 chars, include uppercase, lowercase, and special char",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "✅ User created successfully",
      user: { username: newUser.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({
      message: "✅ Login successful",
      user: { username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
