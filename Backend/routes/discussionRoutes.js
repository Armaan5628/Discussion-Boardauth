const express = require("express");
const router = express.Router();
const Discussion = require("../models/Discussion");

// GET all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch discussions" });
  }
});

// POST new discussion
router.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "Title and author required" });
    }

    const newDiscussion = new Discussion({ title, author });
    await newDiscussion.save();

    res.status(201).json(newDiscussion);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to create discussion" });
  }
});

// DELETE a discussion
router.delete("/:id", async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Discussion deleted" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete discussion" });
  }
});

module.exports = router;
