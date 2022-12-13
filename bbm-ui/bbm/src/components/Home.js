import React, { useEffect, useState, useRef } from "react";
import "../css/ContactUs.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const zipcode = useRef(null);
  const reqloc = useRef(null);
  const bgroup = useRef(null);
  const navigate = useNavigate();
  const userDetails = JSON.parse(window.localStorage.getItem("userdata"));
  console.log(userDetails);

  const [users, setUsers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [notmsg, setMsg] = useState(null);
  const [effectFlag, setEffectFlag] = useState(true);
  const msg = useRef(null);

  useEffect(() => {
    if (effectFlag) {
      if (!window.localStorage.getItem("loginState")) {
        alert("You are not authorized to access this page. Login again");
        navigate("/login");
      }
    }
    setEffectFlag(false);
  });

  const handleNotify = (event) => {
    event.preventDefault();
    let numbers = [];
    users.forEach((user) => {
      numbers.push(user["phone"]);
    });
    var data = JSON.stringify({
      message: reqloc.current.value,
      number: numbers,
    });
    var config = {
      method: "post",
      url: "https://us-central1-cloudcomputing-370711.cloudfunctions.net/send-notification",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    const user_data = {};
    user_data["fullname"] = userDetails["fullname"];
    user_data["phone"] = userDetails["phone"];
    user_data["email"] = userDetails["email"];
    user_data["zipcode"] = zipcode.current.value;
    user_data["bgroup"] = bgroup.current.value;

    axios
      .post("http://34.70.53.123:8080/req", user_data, options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        if (response.status == 200) {
          setUsers(response.data.users);
          setBanks(response.data.banks);
        }
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <div className="container">
        <h1>BBM</h1>
        <div className="row">
          <div className="left-con">
            <h3>
              <u>Nearest Donors</u>
            </h3>
            <p>{notmsg}</p>
            {users.length > 0 && (
              <button className="register-" onClick={handleNotify}>
                Notify Users
              </button>
            )}
            <br />
            {users.map((user) => {
              return (
                <div>
                  <b>{user["fullname"]}</b>
                  <p>
                    BG - {user["bgroup"]}
                    <br />
                    Ph - {user["phone"]}
                    <br />
                    Zipcode - {user["zipcode"]}
                  </p>
                </div>
              );
            })}
            <h3>
              <u>Nearest Blood Banks</u>
            </h3>
            {banks.map((bank) => {
              return (
                <div>
                  <b>{bank["name"]}</b>
                  <p>Zipcode - {bank["zipcode"]}</p>
                </div>
              );
            })}
          </div>
          <div className="right-con">
            <form onSubmit={handleSubmit}>
              <label htmlFor="zipcode">Find donors by ZipCode</label>
              <input
                ref={zipcode}
                type="number"
                id="zipcode"
                name="zipcode"
                placeholder="76013"
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
              <label htmlFor="zipcode">Requestor Location</label>
              <input
                ref={reqloc}
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="Arlington Hospital"
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
