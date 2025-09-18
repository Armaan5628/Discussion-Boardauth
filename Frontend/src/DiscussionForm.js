import React, { useState } from "react";

function DiscussionForm({ onAddDiscussion }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddDiscussion(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="New discussion title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Discussion</button>
    </form>
  );
}

export default DiscussionForm;