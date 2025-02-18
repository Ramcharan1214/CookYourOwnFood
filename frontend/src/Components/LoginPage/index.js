import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiUser, CiMail } from "react-icons/ci";

import "./index.css";

const LoginPage = () => {
  const [isNew, setIsNew] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "", email: "" });
  const [registerErrMsg, setRegisterErrMsg] = useState("");
  const [loginErrMsg, setLoginErrMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (event, setData, key) => {
    setData((prevData) => ({ ...prevData, [key]: event.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!loginData.username || !loginData.password) {
      setLoginErrMsg("Username and password are required.");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:3006/login", loginData);
      if (response.status === 200) {
        Cookies.set('jwt_token', response.data.jwtToken, { expires: 1, path: '/' });
        localStorage.setItem("isAuthenticated", "true");
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed", error);
      setLoginErrMsg(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!registerData.username || !registerData.password || !registerData.email) {
      setRegisterErrMsg("Username, password, and email are required.");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:3006/register", registerData);
      if (response.status === 200) {
        setRegisterErrMsg("Registration Successful");
        setIsNew(true); // Switch to login form after successful registration
      }
    } catch (error) {
      console.error("Registration failed", error);
      setRegisterErrMsg(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  if (isLoggedIn || localStorage.getItem("isAuthenticated") === "true") {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="loginPage-background">
      <div className="login-container">
        {isNew ? (
          <form className="newUsersignup" onSubmit={handleLogin}>
            <h1>Log In</h1>
            {loginErrMsg && <p className="error-message">{loginErrMsg}</p>}
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <div className="username_input">
              <input
                type="text"
                id="username"
                className="password-input-field"
                value={loginData.username}
                autoComplete="given-name"
                onChange={(e) => handleInputChange(e, setLoginData, "username")}
              />
              <CiUser className="pass-icon" />
            </div>
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="username_input">
              <input
                type="password"
                id="password"
                className="password-input-field"
                autoComplete="password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, setLoginData, "password")}
              />
              <RiLockPasswordLine className="pass-icon" />
            </div>
            <button type="submit" className="login_button">Log In</button>
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsNew(false);
                  setLoginErrMsg("");
                }}
                style={{ color: "black" }}
              >
                Sign Up
              </span>
            </p>
          </form>
        ) : (
          <form className="newUsersignup" onSubmit={handleRegister}>
            <h1>Sign Up</h1>
            {registerErrMsg && <p className="error-message">{registerErrMsg}</p>}
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <div className="username_input">
              <input
                type="text"
                id="username"
                className="password-input-field"
                value={registerData.username}
                autoComplete="given-name"
                onChange={(e) => handleInputChange(e, setRegisterData, "username")}
              />
              <CiUser className="pass-icon" />
            </div>
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="username_input">
              <input
                type="password"
                id="password"
                className="password-input-field"
                autoComplete="password"
                value={registerData.password}
                onChange={(e) => handleInputChange(e, setRegisterData, "password")}
              />
              <RiLockPasswordLine className="pass-icon" />
            </div>
            <label className="input-label" htmlFor="email">
              E Mail
            </label>
            <div className="username_input">
              <input
                type="text"
                id="email"
                className="password-input-field"
                autoComplete="email"
                value={registerData.email}
                onChange={(e) => handleInputChange(e, setRegisterData, "email")}
              />
              <CiMail className="pass-icon" />
            </div>
            <button type="submit" className="login_button">Sign Up</button>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsNew(true);
                  setRegisterErrMsg("");
                }}
                style={{ color: "black" }}
              >
                Log In
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;