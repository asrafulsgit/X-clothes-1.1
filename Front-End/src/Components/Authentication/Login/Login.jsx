import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import { apiRequiestWithCredentials } from "../../../utils/ApiCall";
const Login = () => {
  const [message, setMessage] = useState("");
  const [errorField, setErrorField] = useState("");
  // login settings
  const navigate = useNavigate();
  const [seePassword, setSeePassword] = useState(false);
  const initialValue = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialValue);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === errorField) {
      setMessage("");
      setErrorField("");
    }
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      setMessage("password Must be 6 digits!");
      setErrorField("password");
      return;
    }
    // login
    try {
      await apiRequiestWithCredentials("post", "/login", user);
      window.location.replace(`${import.meta.env.VITE_FRONTEND_URL}`);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.errors[0].message);
      setErrorField(error.response?.data?.errors[0].field);
    }
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setSeePassword(!seePassword);
  };
  return (
    <>
      <Nav />
      <div className="login-section">
        <form onSubmit={handleSubmit}>
          <div className="email-fild">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
            <p className="message">{errorField === "email" && message}</p>
          </div>
          <div className="password-div">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                type={seePassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
                required
                autoComplete="off"
              />
              {user.password.length > 0 && (
                <button
                  type="button"
                  onClick={handlePassword}
                  className="seePassword-btn"
                >
                  <i
                    className={`fa-solid fa-eye${seePassword ? "" : "-slash"}`}
                  ></i>
                </button>
              )}
            </div>
            <p className="message">{errorField === "password" && message}</p>
          </div>
          <button type="submit" className="login-btn">
            LogIn
          </button>
          <div className="forgot_singup">
            <Link to="/find-user" className="forgot_password">
              Forgot Password
            </Link>
            <Link to="/signup" className="sing_up">
              Sing Up
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
