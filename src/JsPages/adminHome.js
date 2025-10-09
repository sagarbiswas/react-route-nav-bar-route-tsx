import React, { useEffect, useState } from "react";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
export default function AdminHome({ }) {
  //setting state
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    console.log("userType", window.sessionStorage.getItem("userType"));
    console.log("email", window.sessionStorage.getItem("email"));
    console.log("token", window.localStorage.getItem("token"));
    // MOCK
    if (window.sessionStorage.getItem("email").toLowerCase().indexOf("mock") >= 0) {
      const mockData = [
        { _id: "1", fname: "John Doe", email: "john@mock.com", userType: "User" },
        { _id: "2", fname: "Jane Smith", email: "jane@mock.com", userType: "Admin" },
        { _id: "3", fname: "Bob Wilson", email: "bob@mock.com", userType: "User" }
      ];
      setData(mockData);
    }
    else {
      getAllUser();
    }
  }, [searchQuery]);

  //fetching all user
  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  //deleting user
  const deleteUser = (id, name) => {
    console.log(id, name);

    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      if (window.sessionStorage.getItem("email").toLowerCase().indexOf("mock") < 0) {
        fetch("http://localhost:5000/deleteUser", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userid: id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            //alert(data.data);
            getAllUser();
          });
      }
      else {
        let dataToUpdate = [...data];
        dataToUpdate = data.filter((i) => i._id !== id);
        setData(dataToUpdate);
      }
    } else {

    }
  };
  function handleSearch(e) {
    setSearchQuery(e.target.value)

  }

  return (
    <div className="d-flex justify-content-center align-items-top centered-div" style={{ minHeight: '100vh' }}>
      <div className="auth-wrapper centered-div" style={{ height: "auto", marginTop: 50 }}>
        <div className="auth-inner centered-div" style={{ width: "fit-content" }}>
          <h3>Welcome Admin</h3>
          <div className="rounded-form" style={{ position: "relative", marginBottom: 10 }}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{ position: "absolute", left: 10, top: 13, color: "black" }}
            />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              style={{
                padding: "8px 32px 8px 32px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{ position: "absolute", right: 10, top: 8, color: "#aaa" }}
            >
              {searchQuery.length > 0 ? `Records Found ${data.length}` : `Total Records ${data.length}`}
            </span>
          </div>
          <table style={{ width: 700 }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => {
                return (
                  <tr key={i._id} style={{ textAlign: "center" }}>
                    <td>{i.fname}</td>
                    <td>{i.email}</td>
                    <td>{i.userType}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteUser(i._id, i.fname)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={logOut}
            className="btn btn-primary"
            style={{ marginTop: 10 }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
