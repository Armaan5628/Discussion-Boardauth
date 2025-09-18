import React, { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      console.log("Feedback submitted:", feedback);
      setSubmitted(true);
      setFeedback("");
    }
  };

  return (
    <div>
      {submitted ? (
        <p>✅ Thanks for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <br />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
