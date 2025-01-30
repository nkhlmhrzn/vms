import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VMSStartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Show toast notification if navigated from "recordingStarted"
  useEffect(() => {
    if (location.state?.fromRecordingStarted) {
      toast.success('Video is captured', {
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

  const containerStyle = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 120px)",
    marginTop: "60px",
  };

  const startButtonStyle = {
    backgroundColor: "#c2fbd7",
    borderRadius: "100px",
    boxShadow: "rgba(115, 178, 245, 0.2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(34, 16, 232, 0.15) 0 4px 8px, rgba(126, 7, 245, 0.15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px",
    color: "#B62222",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif",
    padding: "7px 20px",
    textAlign: "center",
    textDecoration: "none",
    transition: "all 250ms",
    border: "0",
    fontSize: "16px",
    userSelect: "none",
    webkitUserSelect: "none",
    touchAction: "manipulation",
  };

  const startButtonHoverStyle = {
    boxShadow: "rgba(44, 187, 99, .35) 0 -25px 18px -14px inset, rgba(44, 187, 99, .25) 0 1px 2px, rgba(44, 187, 99, .25) 0 2px 4px, rgba(44, 187, 99, .25) 0 4px 8px, rgba(44, 187, 99, .25) 0 8px 16px, rgba(44, 187, 99, .25) 0 16px 32px",
    transform: "scale(1.05) rotate(-1deg)"
  };

  const dotStyle = {
    width: "12px",
    height: "12px",
    backgroundColor: "#ff6b6b",
    borderRadius: "50%",
  };

  const changeButtonStyle = {
    position: "absolute",
    bottom: "90px",
    right: "40px",
    padding: "12px 24px",
    backgroundColor: "#00f2fe",
    border: "none",
    borderRadius: "4px",
    color: "black",
    cursor: "pointer",
    fontSize: "15px",
  };

  return (
    <div style={containerStyle}>
      <nav style={navbarStyle}>
        <a href="/" style={brandStyle}>
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
      <div style={mainContentStyle}>
        <button
          style={startButtonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, startButtonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, startButtonStyle)}
          onClick={() =>
            navigate("/recordingStarted", { state: { fromRecordingStarted: true } })
          }
        >
          <span style={dotStyle}></span>
          Start recording
        </button>
      </div>

      <button style={changeButtonStyle} onClick={() => navigate("/OP")}>
        Change
      </button>
    </div>
  );
};

export default VMSStartPage;
