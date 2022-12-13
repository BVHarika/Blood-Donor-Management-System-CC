import React, { useState, useEffect } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [log, setLog] = useState(null);
  useEffect(() => {
    const loginState = JSON.parse(window.localStorage.getItem("loginState"));
    setLog(loginState);
  });
  return (
    <div>
      <ul className="navbar">
        <li>
          <a style={{ fontStyle: "italic" }}>
            <b>BBM</b>
          </a>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!log && (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        {log && (
          <li>
            <a href="/login">Logout</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
