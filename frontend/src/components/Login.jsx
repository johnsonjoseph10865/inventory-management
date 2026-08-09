import { useState } from "react";
import {
  FaBoxes,
  FaUser,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";

import { loginUser } from "../services/api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        username,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        onLogin(user);
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your username and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}

        <div className="login-logo">
          <FaBoxes />
        </div>


        {/* Title */}

        <h1>
          Inventory Management
        </h1>

        <p className="login-subtitle">
          Sign in to access your inventory dashboard
        </p>


        {/* Error */}

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}


        {/* Login Form */}

        <form onSubmit={handleSubmit}>

          {/* Username */}

          <div className="login-input">

            <FaUser />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              autoComplete="username"
              required
            />

          </div>


          {/* Password */}

          <div className="login-input">

            <FaLock />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            <FaSignInAlt />

            {loading
              ? "Signing in..."
              : "Sign In"}

          </button>

        </form>


        {/* Footer */}

        <div className="login-footer">
          Inventory Management System
        </div>

      </div>

    </div>
  );
}

export default Login;