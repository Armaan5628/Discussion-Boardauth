import React from "react";

function PostList({ posts }) {
  return (
    <div>
      <h3>Posts</h3>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
