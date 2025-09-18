import React, { useState } from "react";
import "./Auth.css";

function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");

  // ✅ password validation
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(pwd);
  };

  const handleAuth = async () => {
    if (mode === "signup") {
      if (!email || !username || !phone || !password) {
        setError("⚠️ All fields are required for sign up");
        return;
      }
      if (!validatePassword(password)) {
        setError("⚠️ Password must be 8+ chars, include uppercase, lowercase, and special char");
        return;
      }
    } else {
      if (!email || !password) {
        setError("⚠️ Email and password are required");
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login"
            ? { email, password } // ✅ login by email
            : { email, username, phone, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "❌ Something went wrong");
        return;
      }

      onLogin(data.user.username); // still show username after login

      // reset
      setEmail("");
      setUsername("");
      setPhone("");
      setPassword("");
      setError("");
    } catch (err) {
      setError("❌ Server error, please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>

      {error && <p className="error-msg">{error}</p>}

      {mode === "signup" && (
        <>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </>
      )}

      {/* ✅ Always ask for email */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="auth-buttons">
        <button onClick={handleAuth}>
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        {/* ✅ Cancel → google.ca */}
        <button
          type="button"
          onClick={() => (window.location.href = "https://www.google.ca")}
        >
          Cancel
        </button>
      </div>

      <div className="toggle">
        {mode === "login" ? (
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setMode("signup")}>Sign Up</button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setMode("login")}>Login</button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;
