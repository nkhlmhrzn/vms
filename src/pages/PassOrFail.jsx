import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PassFail = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  
  // Reference to a <canvas> where we draw the video
  const canvasRef = useRef(null);

  // -------------------------------
  // 1) Timer
  // -------------------------------
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isScanning) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isScanning]);

  // -------------------------------
  // 2) Display live video
  // -------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    async function fetchFrame() {
      try {
        const res = await fetch("http://localhost:8000/single_frame");
        if (!res.ok) throw new Error("Failed to fetch frame");
        const data = await res.json();
        
        // Convert base64 to an <img> source
        const img = new Image();
        img.src = `data:image/jpeg;base64,${data.base64_image}`;

        img.onload = () => {
          // Clear canvas and draw the new frame
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      } catch (error) {
        console.error("Error fetching frame:", error);
      }
    }

    // Fetch ~10 times a second
    const intervalId = setInterval(fetchFrame, 100);

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  // -------------------------------
  // 3) Click Handlers
  // -------------------------------
  const handlePass = () => {
    setIsScanning(false);
    console.log("Pass button clicked");
    navigate("/scanningPage");
  };

  const handleFail = async () => {
    setIsScanning(false);
    console.log("Fail button clicked");

    // 1) Capture 6 frames from the backend
   /* const frames = [];
    for (let i = 0; i < 6; i++) {
      try {
        const res = await fetch("http://localhost:8000/single_frame");
        if (!res.ok) throw new Error("Failed to fetch frame");
        const data = await res.json();
        frames.push(`data:image/jpeg;base64,${data.base64_image}`);
      } catch (error) {
        console.error("Error capturing frame:", error);
      }
    }

    // 2) Save these frames in localStorage
    localStorage.setItem("fail_frames", JSON.stringify(frames));

    // 3) Navigate to /scanFailed*/
    navigate("/scanFailed");
  };

  // -------------------------------
  // 4) Timer Formatting
  // -------------------------------
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
          <button onClick={handlePass} style={styles.passButton}>
            <b>Pass</b>
          </button>

          <div style={styles.viewingScreen}>
            <div style={styles.innerRedBorder}></div>
            {/* The Canvas for Live Video */}
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
            <div style={styles.timestamp}>{formatTime(timer)}</div>
          </div>

          <button onClick={handleFail} style={styles.failButton}>
            <b>Fail</b>
          </button>
        </div>
      </div>
    </div>
  );
};

// Same styles as before...
const styles = {
  scannerContainer: {},
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
    color: "black",
    padding: "12px 45px",
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
    color: "black",
    padding: "12px 45px",
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
    zIndex: 2,
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
    zIndex: 3,
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
