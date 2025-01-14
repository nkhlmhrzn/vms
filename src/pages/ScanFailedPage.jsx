import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const ScanFailed = () => {
  return (
    <div style={styles.scannerContainer}>
      <nav style={styles.navbar}>
        <a href="/" style={styles.brand}>VMS</a>
      </nav>

      <div style={styles.contentWrapper}>
        
        <div style={styles.mainSection}>
          <div style={styles.scannerBox}>
            <canvas style={styles.canvas}></canvas>
          </div>

          <div style={styles.pastRecords}>
            <span style={styles.recordsText}>Past Records</span>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.captureWrapper}>
            <button style={styles.captureButton}>
              <span style={styles.captureIcon}><FontAwesomeIcon icon={faCamera} /></span> Capture
            </button>
          </div>

          <div style={styles.previewSection}>
            <p style={styles.previewText}>Preview<hr /></p>
            <div style={styles.previewGrid}>
              {[...Array(6)].map((_, index) => (
                <canvas key={index} style={styles.previewBox}></canvas>
              ))}
            </div>
          </div>

          <div style={styles.actionButtons}>
            <button style={styles.retakeBtn}>Retake</button>
            <button style={styles.saveBtn}>Save</button>
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
    background: 'rgb(225,225,225)',
    padding: '1rem',
    zIndex: 1000,
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
  previewBox: {
    backgroundColor: '#eee',
    width: '100%',
    height: '100px',
    borderRadius: '4px',
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
