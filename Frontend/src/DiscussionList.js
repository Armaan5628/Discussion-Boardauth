import React from "react";

function DiscussionList({ discussions, onSelectDiscussion, onLike, onDislike }) {
  return (
    <div>
      <h2>Discussions</h2>
      <ul>
        {discussions.map((d) => (
          <li
            key={d.id}
            style={{
              marginBottom: "15px",
              padding: "10px",
              background: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <span
              style={{ cursor: "pointer", color: "#007bff", fontWeight: "bold" }}
              onClick={() => onSelectDiscussion(d)}
            >
              {d.title}
            </span>
            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => onLike(d.id)}
                style={{
                  marginRight: "10px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                👍 {d.likes}
              </button>
              <button
                onClick={() => onDislike(d.id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                👎 {d.dislikes}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiscussionList;