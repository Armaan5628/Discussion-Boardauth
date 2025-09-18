const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { email, username, phone, password } = req.body;

    if (!email || !username || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // password regex
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!regex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 chars, include uppercase, lowercase, and special char",
      });
    }

    // check email + username uniqueness
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "✅ User created successfully",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "✅ Login successful",
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "❌ Server error" });
  }
});

module.exports = router;
