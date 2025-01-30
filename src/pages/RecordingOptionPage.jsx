import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
//import MainRoute from "../navigation/MainRoute";

const OptionPage = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      height: "100%",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    navbar: {
      position: "fixed",
      fontSize: "25px",
      top: 0,
      left: 0,
      right: 0,
      background: "rgb(225,225,225)",
      padding: "1rem",
    },
    brand: {
      fontWeight: "bold",
      color: "blue",
      textDecoration: "none",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "white",
    },
    button: {
      border: "2px solid blue",
      color: "blue",
      background: "transparent",
      fontWeight: "bold",
      padding: "30px 70px",
      borderRadius: "3px",
      margin: "10px",
      cursor: "pointer",
      fontSize: "20px",
    },
    activeButton: {
      background: "blue",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <a href="/" style={styles.brand}>
          VMS
        </a>
      </nav>
      <main style={styles.main}>
        <button
          style={
            activeButton === "forward"
              ? { ...styles.button, ...styles.activeButton }
              : styles.button
          }
          onClick={() => navigate("/startRecording")}
        >
          <FontAwesomeIcon icon={faShare} />
          Forward
        </button>
        <button
          style={
            activeButton === "reverse"
              ? { ...styles.button, ...styles.activeButton }
              : styles.button
          }
          onClick={() => navigate("/scanningPage")}
        >
          <FontAwesomeIcon icon={faRetweet} /> Reverse
        </button>
      </main>
    </div>
  );
};

export default OptionPage;
