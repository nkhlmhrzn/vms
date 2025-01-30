import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VMSInterface = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [batchNo, setBatchNo] = useState("");
  const [time, setTime] = useState(0);

  // -------------------------------
  // 1) Start recording on mount
  // -------------------------------
  useEffect(() => {
    const startRecording = async () => {
      try {
        await fetch("http://localhost:8000/start_record", { method: "POST" });
        console.log("Recording started (backend)...");
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    };
    startRecording();
  }, []);

  // -------------------------------
  // 2) Timer logic
  // -------------------------------
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Helper to format timer as HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // -------------------------------
  // 3) Repeatedly fetch frames (~10FPS)
  //    and draw them onto the canvas
  // -------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    async function fetchFrame() {
      try {
        const response = await fetch("http://localhost:8000/single_frame");
        if (!response.ok) throw new Error("Failed to fetch frame");

        const data = await response.json();
        const img = new Image();
        img.src = `data:image/jpeg;base64,${data.base64_image}`;

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      } catch (error) {
        console.error("Error fetching frame:", error);
      }
    }

    const frameInterval = setInterval(fetchFrame, 100);
    return () => clearInterval(frameInterval);
  }, []);

  // -------------------------------
  // 4) Periodically check the batchNo
  // -------------------------------
  useEffect(() => {
    const checkInputValue = async () => {
      if (batchNo.trim() !== "") {
        // If user typed something, reset & navigate
        setBatchNo("");
        await stopRecordingAndNavigate();
      }
    };
    const intervalId = setInterval(checkInputValue, 1000);
    return () => clearInterval(intervalId);
  }, [batchNo]);

  // Stop recording & navigate
  const stopRecordingAndNavigate = async () => {
    try {
      await fetch("http://localhost:8000/stop_record", { method: "POST" });
      console.log("Recording stopped (backend).");
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
    navigate("/startRecording", { state: { fromRecordingStarted: true } });
  };

  // -------------------------------
  // 5) STYLES (matching PassFail)
  // -------------------------------
  const styles = {
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

    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f7fc",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },

    inputRow: {
      margin: "80px 0 20px", // push below navbar, add spacing
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    label: {
      fontWeight: "bold",
    },
    input: {
      padding: "8px",
      border: "1px solid #ddd",
      borderRadius: "3px",
    },

    // Viewing screen: same idea as in PassFail
    viewingScreen: {
      width: "800px",
      height: "500px",
      backgroundColor: "#e9e9e9",
      borderRadius: "3px",
      margin: "20px auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      position: "relative", // so the canvas & border can be abs positioned
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
    canvasStyle: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
      width: "800px",
      height: "500px",
      // Internally, the canvas is 640×480.
      // This width/height is just for display scaling
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
      fontFamily: "digital-clock-font, sans-serif",
      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
      zIndex: 3,
    },
  };

  return (
    <>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <a href="/" style={styles.brand}>
          VMS
        </a>
      </nav>

      {/* MAIN CONTAINER */}
      <div style={styles.container}>
        {/* BatchNo Input Row */}
        <div style={styles.inputRow}>
          <label htmlFor="batchNo" style={styles.label}>
            Batch No:
          </label>
          <input
            id="batchNo"
            type="text"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
            placeholder="Enter your batch number here"
            style={styles.input}
          />
        </div>

        {/* VIEWING SCREEN (Canvas + Red Border + Timer) */}
        <div style={styles.viewingScreen}>
          <div style={styles.innerRedBorder}></div>

          {/* Canvas for live video */}
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            style={styles.canvasStyle}
          />

          {/* Timer in top-left corner (HTML overlay) */}
          <div style={styles.timestamp}>{formatTime(time)}</div>
        </div>
      </div>
    </>
  );
};

export default VMSInterface;
