import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Scanning = () => {
  const navigate = useNavigate();
  const [awb, setAwb] = useState("");
  const location = useLocation();

  // Show toast notification if navigated from "recordingStarted"
  useEffect(() => {
    if (location.state?.fromRecordingStarted) {
      toast.success('Frames successfully saved ', {
        position: "top-right",
        autoClose: 1995,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        //transition: Bounce,
        });
      // Reset state to prevent duplicate toasts
      navigate(location.pathname, { state: { fromRecordingStarted: false } });
      console.log("Toast triggered");
    }
  }, [location.state, location.pathname, navigate]);
  const handleScan = () => {
    console.log("Scanning initiated");
  };

  const handleChange = () => {
    console.log("Change button clicked");
  };

  return (
    <div style={styles.scannerContainer}>
      <nav style={styles.navbar}>
        <a href="/" style={styles.brand}>
          VMS
        </a>
      </nav>
      <ToastContainer
      position="top-right"
      autoClose={1995}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      //transition={Bounce}
      />
      <div style={styles.container}>
        <button
          style={styles.clearButton}
          onClick={() => navigate("/passOrFail")}
        >
          Scan AWB
        </button>
        <button onClick={() => navigate("/OP")} style={styles.changeButton}>
          Change
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  clearButton: {
    padding: "20px 120px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "3px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    cursor: "pointer",
  },
  changeButton: {
    padding: "20px 60px",
    backgroundColor: "cyan",
    color: "#000",
    border: "none",
    borderRadius: "3px",
    position: "absolute",
    bottom: "70px",
    right: "70px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    cursor: "pointer",
  },
  navbar: {
    position: "fixed",
    fontSize: "25px",
    top: 0,
    left: 0,
    right: 0,
    background: "rgb(225,225,225)",
    padding: "1rem",
    zIndex: 1000,
  },
  brand: {
    fontWeight: "bold",
    color: "blue",
    textDecoration: "none",
  },
};

export default Scanning;
