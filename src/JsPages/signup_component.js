import React, { Component, useState } from "react";
import "../index.css";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    if (userType == "Admin" && secretKey != "AdarshT") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(fname, lname, email, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status == "ok") {
            alert("Registration Successful");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="top-div d-flex justify-content-center align-items-top" style={{ minHeight: '100vh' }}>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit} className="auth-inner rounded-form"  >
            <h3>Register</h3>
            <div>
              
              <div >
                <label className="me-2">Register As  </label>
                <input className="me-2"
                  type="radio"
                  name="UserType"
                  value="User"
                  onChange={(e) => setUserType(e.target.value)}
                />
                User
                <input className="me-2"
                  type="radio"
                  name="UserType"
                  value="Admin"
                  onChange={(e) => setUserType(e.target.value)}
                />

                Admin </div>
            </div>
            {userType == "Admin" ? (
              <div className="mb-3 row align-items-center">
                <label className="col-4 col-form-label">Secret Key</label>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Secret Key"
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                </div>
              </div>
            ) : null}

            <div className="mb-3">
              <div className="row align-items-center">
                <label className="col-4 col-form-label">First name</label>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row align-items-center">
                <label className="col-4 col-form-label">Last name</label>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row align-items-center">
                <label className="col-4 col-form-label">Email address</label>
                <div className="col-8">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row align-items-center">
                <label className="col-4 col-form-label">Password</label>
                <div className="col-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/login">Login?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
