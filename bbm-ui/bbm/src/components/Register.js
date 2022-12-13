import React, { useEffect, useState, useRef } from "react";
import "../css/Register.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const fullname = useRef(null);
  const phone = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const address = useRef(null);
  const zipcode = useRef(null);
  const bgroup = useRef(null);
  const gender = useRef(null);
  const donor = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    var re =
      /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-][a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (re.test(email.current.value) == false) {
      let info = "Please ensure email id is entered in desired format";
      alert(info);
      return;
    }

    var re =
      /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#@%]*[!@$&#%])[A-Za-z0-9!@$&#%]{8,32}$/;
    if (re.test(password.current.value) == false) {
      let info =
        "First letter of the password should be capital. Password  must  contain  a  special  character  (@,  $,  !,  &, etc). Password length must be greater than 8 characters ";
      alert(info);
      return;
    }

    var re = /^[0-9]{10}$/;
    if (re.test(phone.current.value) == false) {
      let info = "Enter phone number in valid format, 10 numbers";
      alert(info);
      return;
    }

    const user_data = {};
    user_data["fullname"] = fullname.current.value;
    user_data["phone"] = phone.current.value;
    user_data["email"] = email.current.value;
    user_data["password"] = password.current.value;
    user_data["address"] = address.current.value;
    user_data["zipcode"] = zipcode.current.value;
    user_data["bgroup"] = bgroup.current.value;

    axios
      .post("http://34.70.53.123:8080/register", user_data, options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        if (response.status == 200) {
          alert("Registration success, please login");
          navigate("/login");
        }
      });

    event.target.reset();
  };

  return (
    <div>
      <div className="margin"></div>
      <div className="left-reg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <b>Fullname</b>
          </label>
          <input
            ref={fullname}
            type="text"
            placeholder="Enter Full Name"
            name="username"
            required
          />
          <label htmlFor="bloodgroup">
            <b>Blood Group</b>
          </label>
          <select ref={bgroup} name="bloodgroup" id="bloodgroup">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <label htmlFor="bloodgroup">
            <b>Gender</b>
          </label>
          <select ref={gender} name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label htmlFor="phone">
            <b>Phone</b>
          </label>
          <input
            ref={phone}
            type="text"
            placeholder="Enter Phone Number"
            name="phone"
            required
          />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            ref={email}
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            ref={password}
            placeholder="Enter Password"
            name="password"
            required
          />
          <label htmlFor="c-password">
            <b>Address</b>
          </label>
          <input
            type="text"
            ref={address}
            placeholder="Enter Address"
            name="c-password"
            required
          />
          <label htmlFor="dept">
            <b>ZipCode</b>
          </label>
          <input
            type="number"
            ref={zipcode}
            placeholder="Enter ZipCode"
            name="dept"
            required
          />
          <label htmlFor="donor">
            <b>Do you agree below disclaimer to donate blood?</b>
          </label>
          <input type="checkbox" ref={donor} name="donor" />
          <br />
          <br />
          <button className="register-" type="submit">
            Register
          </button>
          <br />
        </form>
        <p style={{ color: "red" }}>
          <b>DISCLAIMER:</b>
          <ul>
            <li>
              To donate blood, you should be in good health, at least 17 years
              old, and not have an active blood infection.
            </li>
            <li>
              You will be asked questions about your health and travel history
              before you donate blood. Your blood will also be tested to make
              sure it's safe for donation.
            </li>
            <li>
              Donor blood is used to save the lives of countless people. Trauma
              victims, mothers in childbirth, surgical patients, and people with
              cancer are just some of many people who may need donor blood.
            </li>
          </ul>
        </p>
      </div>

      <div className="right-reg">
        <h3>Already have an Account?</h3>

        <Link to="/login">
          <button className="login" type="submit">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
