import { useState } from "react";
import axios from "axios";

function Signup({ switchToLogin }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:8080/signup", data);
      alert(res.data);
      switchToLogin();
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>StayEase</h1>
        <p className="auth-subtitle">Create your account and start booking</p>

        <input
          type="text"
          placeholder="Enter first name"
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enter last name"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enter phone number"
          value={data.phoneNo}
          onChange={(e) => setData({ ...data, phoneNo: e.target.value })}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="primary-btn" onClick={signup}>Signup</button>

        <p className="switch-text">
          Already have an account? <span onClick={switchToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;