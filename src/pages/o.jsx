import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
const ScanFailed = () => {
  const navigate = useNavigate();
  const mainCanvasRef = useRef(null);
  const [frames, setFrames] = useState([]);

  // 1) On mount, load the frames from localStorage
  useEffect(() => {
    const storedFrames = localStorage.getItem("fail_frames");
    if (storedFrames) {
      setFrames(JSON.parse(storedFrames));
    }
  }, []);

  // 2) Stream live video in the main canvas
  useEffect(() => {
    const canvas = mainCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const fetchFrame = async () => {
      try {
        const res = await fetch("http://localhost:8000/single_frame");
        if (!res.ok) throw new Error("Failed to fetch live frame");

        const data = await res.json();
        const img = new Image();
        // The endpoint returns just base64 without "data:image/jpeg;base64," prefix
        // We add that prefix before using it in `img.src`
        img.src = `data:image/jpeg;base64,${data.base64_image}`;

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      } catch (error) {
        console.error("Error fetching live frame:", error);
      }
    };

    const intervalId = setInterval(fetchFrame, 200); // ~5 FPS
    return () => clearInterval(intervalId);
  }, []);

  // 3) Capture current frame, add to localStorage and preview
  const handleCapture = async () => {
    try {
      const res = await fetch("http://localhost:8000/single_frame");
      if (!res.ok) throw new Error("Failed to fetch live frame");

      const data = await res.json();
      const newImage = `data:image/jpeg;base64,${data.base64_image}`;

      const updatedFrames = [...frames, newImage];
      setFrames(updatedFrames);
      localStorage.setItem("fail_frames", JSON.stringify(updatedFrames));
    } catch (error) {
      console.error("Error capturing frame:", error);
    }
  };

  // 4) Delete a single frame (from state and localStorage)
  const handleDeleteFrame = (index) => {
    const updatedFrames = frames.filter((_, idx) => idx !== index);
    setFrames(updatedFrames);
    localStorage.setItem("fail_frames", JSON.stringify(updatedFrames));
  };

  // 5) If user clicks Save, POST frames to /save_frames
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8000/save_frames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: frames }),
      });
      if (!res.ok) throw new Error("Failed to save frames to NAS");
      const data = await res.json();
      console.log("Frames saved to NAS:", data);
      alert("Frames successfully saved to NAS!");

      // Clear localStorage after successful save if desired
      localStorage.removeItem("fail_frames");
      setFrames([]);
    } catch (error) {
      console.error("Error saving frames:", error);
    }
  };

  // 6) Retake: Clear all images from state & localStorage
  const handleRetake = () => {
    console.log("Retake clicked");
    localStorage.removeItem("fail_frames");
    setFrames([]);
  };
  const handleNavigateToScanningPage = () => {
    navigate("/ScanningPage");
  };
  return (
    <div style={styles.scannerContainer}>
      <nav style={styles.navbar}>
        <a href="/" style={styles.brand}>VMS</a>
        <button style={styles.navButton} onClick={handleNavigateToScanningPage}>
          Go to Scanning Page
        </button>
      </nav>

      <div style={styles.contentWrapper}>
        <div style={styles.mainSection}>
          <div style={styles.scannerBox}>
            {/* Main streaming canvas */}
            <canvas
              ref={mainCanvasRef}
              style={styles.canvas}
              width={1000}
              height={600}
            />
          </div>
          <div style={styles.pastRecords}>
            <span style={styles.recordsText}>Past Records</span>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.captureWrapper}>
            <button style={styles.captureButton} onClick={handleCapture}>
              <span style={styles.captureIcon}>
                <FontAwesomeIcon icon={faCamera} />
              </span>
              Capture
            </button>
          </div>

          <div style={styles.previewSection}>
            <p style={styles.previewText}>
              Preview
            </p>
            <div style={styles.previewGrid}>
              {frames.map((imgSrc, idx) => (
                <div key={idx} style={styles.previewItem}>
                  <img
                    src={imgSrc}
                    alt={`Fail Frame ${idx + 1}`}
                    style={styles.previewBox}
                  />
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteFrame(idx)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.actionButtons}>
            <button style={styles.retakeBtn} onClick={handleRetake}>
              Retake
            </button>
            <button style={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  scannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  navbar: {
    position: 'fixed',
    fontSize: '25px',
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    background: 'rgb(225,225,225)',
    padding: '1rem',
    zIndex: 1000,
  },
  navButton: {
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  brand: {
    fontWeight: 'bold',
    color: 'blue',
    textDecoration: 'none',
  },
  contentWrapper: {
    display: 'flex',
    gap: '30px',
    flex: 1,
    marginTop: '80px',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)',
    overflow: 'hidden',
  },
  mainSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  scannerBox: {
    padding: '15px',
    background: '#fff',
    width: '100%',
    maxWidth: '1000px',
    height: '85%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f8f8',
    border: '2px solid #ff6b4a',
  },
  pastRecords: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  recordsText: {
    fontSize: '14px',
    color: '#666',
  },
  rightPanel: {
    width: '300px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
  },
  captureWrapper: {
    border: '1px dashed #ccc',
    borderRadius: '4px',
    padding: '10px',
  },
  captureButton: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ff6b4a',
    borderRadius: '4px',
    color: '#ff6b4a',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    cursor: 'pointer',
  },
  captureIcon: {
    color: '#ff6b4a',
    fontSize: '12px',
  },
  previewSection: {
    marginTop: '10px',
  },
  previewText: {
    color: '#333',
    fontSize: '14px',
    marginBottom: '10px',
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  previewItem: {
    position: 'relative',
    width: '100%',
    height: '100px',
    overflow: 'hidden',
  },
  previewBox: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  deleteButton: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    background: 'rgba(255, 255, 255, 0.6)',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  retakeBtn: {
    flex: 1,
    padding: '10px',
    border: '1px solid #0066ff',
    borderRadius: '4px',
    color: '#0066ff',
    cursor: 'pointer',
    background: 'none',
  },
  saveBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    background: '#0066ff',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default ScanFailed;
