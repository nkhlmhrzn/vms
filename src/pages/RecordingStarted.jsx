import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VMSInterface = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState("00:00:00");
  const canvasRef = useRef(null);

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const navbarStyle = {
    fontSize: "25px",
    position: "fixed",
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

  const mainContentStyle = {
    marginTop: "60px",
    width: "800px",
    margin: "60px auto 0",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 450;

    ctx.fillStyle = "#EBEBEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '24px "digital-clock-font"';
    ctx.fillStyle = "#ff6b6b";
    ctx.fillText(time, 20, 40);
  }, [time]);

  useEffect(() => {
    let [hours, minutes, seconds] = [0, 0, 0];

    const timerInterval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
          if (hours === 100) {
            clearInterval(timerInterval);
          }
        }
      }

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div style={containerStyle}>
      <nav style={navbarStyle}>
        <a href="/" style={brandStyle}>
          VMS
        </a>
      </nav>

      <div style={mainContentStyle}>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={() => navigate("/successPage")}>
            Scan AWB to stop
          </button>
        </div>
        <canvas
          ref={canvasRef}
          style={{
            border: "2px solid #ff6b6b",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
};

export default VMSInterface;
