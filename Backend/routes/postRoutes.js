const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// ✅ Get posts for a discussion
router.get("/discussions/:id/posts", async (req, res) => {
  try {
    const posts = await Post.find({ discussionId: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch posts" });
  }
});

// ✅ Add post to a discussion
router.post("/discussions/:id/posts", async (req, res) => {
  try {
    const { text, author } = req.body;
    if (!text || !author) {
      return res.status(400).json({ message: "Text and author required" });
    }

    const newPost = new Post({
      text,
      author,
      discussionId: req.params.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to create post" });
  }
});

// ✅ Delete a post
router.delete("/posts/:postId", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "✅ Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to delete post" });
  }
});

module.exports = router;
