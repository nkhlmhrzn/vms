import React from 'react';

const VMSStartPage = () => {
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    overflow: 'hidden',  // Prevent scrolling
    position: 'relative'  // Make the button part of the container
  };

  const navbarStyle = {
    fontSize: '25px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgb(225,225,225)',
    padding: '1rem',
    zIndex: 1000,
  };

  const brandStyle = {
    fontWeight: 'bold',
    color: 'blue',
    textDecoration: 'none',
  };

  const mainContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 120px)', // Account for navbar and padding
    marginTop: '60px'
  };

  const startButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',  // Bigger padding for a larger button
    backgroundColor: 'white',
    border: '2px solid #ff6b6b',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',  // Bigger font size
    fontWeight: 'bold',  // Bold text
    color: '#ff6b6b'
  };

  const dotStyle = {
    width: '12px',
    height: '12px',
    backgroundColor: '#ff6b6b',
    borderRadius: '50%'
  };

  const changeButtonStyle = {
    position: 'absolute',
    bottom: '90px', 
    right: '40px', 
    padding: '12px 24px',  
    backgroundColor: '#00f2fe',
    border: 'none',
    borderRadius: '4px',
    color: 'black',  
    cursor: 'pointer',
    fontSize: '15px', 
  };

  return (
    <div style={containerStyle}>
      <nav style={navbarStyle}>
        <a href="/" style={brandStyle}>VMS</a>
      </nav>
      
      <div style={mainContentStyle}>
        <button style={startButtonStyle}>
          <span style={dotStyle}></span>
          Start recording
        </button>
      </div>

      <button style={changeButtonStyle}>Change</button>
    </div>
  );
};

export default VMSStartPage;