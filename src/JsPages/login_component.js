import React, { Component, useState } from "react";
import "../App.css";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    debugger;
    // MOCK
    if (email.toLowerCase().indexOf("mock")>=0){
            // Mock userType based on email for demonstration
        let userType = email === "admin@mock.com" ? "Admin" : "User";
        // Simulate a successful login response
        window.sessionStorage.setItem("token", "mock-token");
        window.sessionStorage.setItem("userType", userType);
        window.sessionStorage.setItem("loggedIn", true);

        if (userType === "Admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/userDetails";
        }
       // return;
   }
    console.log(email, password);
     window.sessionStorage.setItem("email", email);
    if (email.toLowerCase().indexOf("mock")<0){
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          console.log(data.userType);
         // alert("login successful");
          window.sessionStorage.setItem("token", data.data);
          window.sessionStorage.setItem("userType", data.userType);
          window.sessionStorage.setItem("loggedIn", true);
          
          if (data.userType == "Admin") {
            
            return (window.location.href = "./admin-dashboard");
          } else {
            window.location.href = "./userDetails";
          }
        }
      });
    }
  }

  return (
     <div className="d-flex justify-content-center align-items-top" style={{ minHeight: '100vh'}}>
   
    <div className="auth-wrapper">
      <div className="auth-inner" >
        <form onSubmit={handleSubmit} className="rounded-form">
            <h3>Login <span
              className="help-icon"
              title="Use admin@mock.com or user@mock.com for demo login"
              style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '16px', color: '#007bff' }}
            >
              ?
            </span>
            </h3>


          <div className="mb-3 row align-items-center">
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

          <div className="mb-3 row align-items-center">
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

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
     </div>
  );
}
