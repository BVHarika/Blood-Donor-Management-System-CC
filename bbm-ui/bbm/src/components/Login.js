import React, { useRef, useState, useEffect } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loginState, setLoginState] = useState([]);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  window.localStorage.setItem("loginState", false);

  useEffect(() => {
    window.localStorage.removeItem("userdata");
    window.localStorage.removeItem("loginState");
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    const user_data = {};
    user_data["email"] = email.current.value;
    user_data["password"] = password.current.value;

    axios
      .post("http://34.70.53.123:8080/login", user_data, options)
      .then(function (response) {
        window.localStorage.setItem("loginState", true);
        window.localStorage.setItem("userdata", JSON.stringify(response.data));
        navigate("/");
      });
    event.target.reset();
  };

  return (
    <div>
      <div className="margin"></div>
      <div className="left-log">
        {loginState == "false" && (
          <p style={{ textAlign: "center", color: "red" }}>
            Login Failed. Please try again.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <b>Username</b>
          </label>
          <input
            ref={email}
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          />
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            ref={password}
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
          <button className="login" type="submit">
            Login
          </button>
        </form>
        <br />
        <label>
          <input type="checkbox" name="remember" /> Remember me
        </label>
        <br />
        <Link to="/forgot-password">Forgot password</Link>
      </div>
      <div className="right-log">
        <h3>Don't have an Account?</h3>
        <Link to="/register">
          <button className="register-" type="submit">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
