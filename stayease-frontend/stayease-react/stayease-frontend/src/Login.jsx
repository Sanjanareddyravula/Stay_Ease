import { useState } from "react";
import axios from "axios";

function Login({ setUser, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8080/login", {
        email,
        password
      });

      if (res.data) {
        setUser(res.data);
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>StayEase</h1>
        <p className="auth-subtitle">Login to continue your booking journey</p>

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

        <button className="primary-btn" onClick={login}>Login</button>

        <p className="switch-text">
          New user? <span onClick={switchToSignup}>Create account</span>
        </p>
      </div>
    </div>
  );
}

export default Login;