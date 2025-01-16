import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const VideoCapturedNotification = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5", // light background
  };

  const navbarStyle = {
    position: "fixed",
    fontSize: "25px",
    top: 0,
    left: 0,
    right: 0,
    background: "rgb(225,225,225)",
    padding: "1rem",
    zIndex: 1000,
  };

  const brandStyle = {
    fontWeight: "bold",
    color: "blue",
    textDecoration: "none",
  };

  const titleStyle = {
    fontSize: "24px",
    color: "blue", // title color
    marginBottom: "20px",
  };

  const notificationBoxStyle = {
    display: "flex",
    flexDirection: "column", // Stack icon and text vertically
    alignItems: "center",
    backgroundColor: "white",
    border: "2px solid #0BDA51", // border color
    borderRadius: "8px",
    padding: "50px", // Adjust padding
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  const checkIconStyle = {
    fontSize: "48px", // Increase icon size
    color: "lightgreen", // Check icon color
    marginBottom: "10px", // Space between icon and text
  };

  const messageStyle = {
    fontSize: "18px",
    textAlign: "center", // Center align the text
  };

  return (
    <div style={containerStyle}>
      <nav style={navbarStyle}>
        <a href="/" style={brandStyle}>
          VMS
        </a>
      </nav>

      <div style={notificationBoxStyle}>
        <div style={checkIconStyle}>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div style={messageStyle}>
          <b>Video Captured successfully</b>
        </div>
      </div>
    </div>
  );
};

export default VideoCapturedNotification;
