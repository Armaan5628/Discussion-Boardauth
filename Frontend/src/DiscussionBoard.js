import React, { useState, useEffect } from "react";
import DiscussionForm from "./DiscussionForm";
import PostForm from "./PostForm";
import "./DiscussionBoard.css";

function DiscussionBoard({ user, onLogout }) {
  const [discussions, setDiscussions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  // ✅ Fetch discussions on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/discussions")
      .then((res) => res.json())
      .then((data) => setDiscussions(data))
      .catch((err) => console.error("Error fetching discussions:", err));
  }, []);

  const addDiscussion = async (title) => {
    try {
      const res = await fetch("http://localhost:5000/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author: user }),
      });

      const data = await res.json();
      if (res.ok) {
        setDiscussions([data, ...discussions]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectDiscussion = async (discussion) => {
    setSelectedDiscussion(discussion);
    try {
      const res = await fetch(
        `http://localhost:5000/api/discussions/${discussion._id}/posts`
      );
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addPost = async (text) => {
    if (!selectedDiscussion) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/discussions/${selectedDiscussion._id}/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, author: user }),
        }
      );
      const data = await res.json();
      if (res.ok) setPosts([data, ...posts]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDiscussion = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/discussions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDiscussions(discussions.filter((d) => d._id !== id));
        setPosts([]);
        setSelectedDiscussion(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== postId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="board-container">
      {/* Header Section */}
      <div className="board-header-section">
        <h1>Welcome, {user}</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Discussions Section */}
      <div className="discussions-section">
        <h2>All Discussions</h2>
        <DiscussionForm onAddDiscussion={addDiscussion} />
        <ul className="discussion-list">
          {discussions.map((d) => (
            <li key={d._id} className="discussion-item">
              <span
                className="discussion-title"
                onClick={() => selectDiscussion(d)}
              >
                {d.title} (by {d.author})
              </span>
              {d.author === user && (
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteDiscussion(d._id)}
                >
                  🗑 Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Posts Section */}
      {selectedDiscussion && (
        <div className="posts-section">
          <h2>Posts in "{selectedDiscussion.title}"</h2>
          <PostForm onAddPost={addPost} />
          <ul className="post-list">
            {posts.map((p) => (
              <li key={p._id} className="post-item">
                {p.text} (by {p.author})
                {p.author === user && (
                  <button
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(p._id)}
                  >
                    🗑
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DiscussionBoard;
