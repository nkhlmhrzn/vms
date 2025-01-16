import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PassFail = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isScanning) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isScanning]);

  const handlePass = () => {
    setIsScanning(false);
    console.log("Pass button clicked");
  };

  const handleFail = () => {
    setIsScanning(false);
    console.log("Fail button clicked");
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.scannerContainer}>
      <nav style={styles.navbar}>
        <a href="/" style={styles.brand}>
          VMS
        </a>
      </nav>

      <div style={styles.container}>
        <div style={styles.buttons}>
          <button
            onClick={() => navigate("/scanningPage")}
            style={styles.passButton}
          >
            <b>Pass</b>
          </button>
          <div style={styles.viewingScreen}>
            <div style={styles.innerRedBorder}></div>
            <div style={styles.timestamp}>{formatTime(timer)}</div>
          </div>
          <button
            onClick={() => navigate("/scanFailed")}
            style={styles.failButton}
          >
            <b>Fail</b>
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f7fc",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 30px",
    alignItems: "center",
  },
  passButton: {
    backgroundColor: "limegreen",
    color: "black", // Changed to black text
    padding: "12px 45px", // Increased padding
    border: "none",
    borderRadius: "3px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, box-shadow 0.3s",
    marginLeft: 0,
  },
  failButton: {
    backgroundColor: "#f44336",
    color: "black", // Changed to black text
    padding: "12px 45px", // Increased padding
    border: "none",
    borderRadius: "3px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, box-shadow 0.3s",
    marginRight: 0,
  },
  viewingScreen: {
    width: "800px",
    height: "500px",
    backgroundColor: "#e9e9e9",
    borderRadius: "3px",
    margin: "0 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  innerRedBorder: {
    position: "absolute",
    top: "10px",
    left: "10px",
    right: "10px",
    bottom: "10px",
    border: "3px solid red",
    pointerEvents: "none",
  },
  timestamp: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "transparent",
    color: "red",
    padding: "5px 10px",
    fontSize: "30px",
    fontWeight: "bold",
    fontFamily: "digital-clock-font",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  navbar: {
    position: "fixed",
    fontSize: "25px",
    top: 0,
    left: 0,
    right: 0,
    background: "#f0f0f0",
    padding: "1rem",
    zIndex: 1000,
  },
  brand: {
    fontWeight: "bold",
    color: "blue",
    textDecoration: "none",
  },
};

export default PassFail;
