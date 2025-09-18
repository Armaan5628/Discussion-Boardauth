const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },  // username
  discussionId: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
