import React, { useState } from "react";

function PostForm({ onAddPost }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddPost(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a post"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Post</button>
    </form>
  );
}

export default PostForm;
