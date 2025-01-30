import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import MainRoute from "./navigation/MainRoute";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  // Handle login with admin or employee credentials
  const handleLogin = (email, password, navigate) => {
    // Admin credentials
    if (email === "admin@me.com" && password === "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
      navigate("/OP"); // Navigate to OptionPage
      return;
    }

    // Employee credentials (check from context array)
    if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            role: "employee",
            data: employee,
          })
        );
        navigate("/OP"); // Navigate to OptionPage
        return;
      }
    }

    // If none of the above succeed, invalid credentials
    alert("Invalid Credentials");
  };

  return (
    <>
      {/*
        We pass `handleLogin` and `user` down to the routing component,
        so that the Login page can call `handleLogin` to authenticate.
      */}
      <MainRoute handleLogin={handleLogin} user={user} />
    </>
  );
};

export default App;
