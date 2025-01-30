import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function LoginPage({ handleLogin }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Toggle visibility of the password
  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  // When user clicks "Log in", call the passed-down handleLogin function
  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password, navigate);
    // Clear fields after attempt
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          .forgot-password a {
            color: #4040ff;
            text-decoration: none;
            font-size: .9rem;
            text-align: end;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #ffffff;
          }
          .login-container {
            background: white;
            padding: 20px 80px;
            border: 3px solid blue;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
          }
          .login-header {
            margin-bottom: 1.5rem;
          }
          .login-header h1 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 0.5rem;
          }
          .new-user {
            font-size: 0.9rem;
            color: #666;
          }
          .new-user a {
            color: #4040ff;
            text-decoration: none;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-size: 0.9rem;
          }
          .input-group {
            position: relative;
          }
          input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }
          input:focus {
            outline: none;
            border-color: #4040ff;
          }
          .toggle-password {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #666;
            background: none;
            border: none;
            padding: 0;
          }
          .header {
            width: 100%;
            background: rgb(225, 225, 225);
            padding: 10px 20px;
            height: 50px;
            text-align: left;
            font-size: 20px;
            font-weight: bold;
            color: #007bff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            left: 0;
          }
          .login-btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #4040ff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            margin-bottom: 1rem;
          }
          .login-btn:hover {
            background-color: #3333cc;
          }
          .forgot-password {
            text-align: center;
          }
        `}
      </style>

      <div className="header">VMS</div>

      <div className="login-container">
        <div className="login-header">
          <h1>Log in</h1>
          <div className="new-user">
            New user? <a href="/register">Create an account</a>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Log in
          </button>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
