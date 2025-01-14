import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="register-page" style={styles.registerPage}>
      <nav className="navbar" style={styles.navbar}>
        <a href="/" className="logo" style={styles.logo}>VMS</a>
      </nav>

      <div className="register-container" style={styles.registerContainer}>
        <div className="header" style={styles.header}>
          <h1 style={styles.headerTitle}>Register</h1>
          <div className="have-account">
            Already have an account? <a href="/login" style={styles.link}>Login</a>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className="input-group" style={styles.inputGroup}>
              <input
                type={showPassword.password ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('password')}
                style={styles.togglePassword}
              >
                <FontAwesomeIcon icon={faEyeSlash} />

              </button>
            </div>
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-group" style={styles.inputGroup}>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                placeholder="Enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                style={styles.togglePassword}
              >
                <FontAwesomeIcon icon={faEyeSlash} />
              </button>
            </div>
          </div>

          <button type="submit" className="register-btn" style={styles.registerBtn}>Register</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  registerPage: {
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column'
  },
  navbar: {
    background: 'rgba(225,225,225)',
    padding: '1rem',
    width: '100%'
  },
  logo: {
    color: '#4040ff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textDecoration: 'none'
  },
  registerContainer: {
    background: 'white',
    padding: '20px 50px',
    border: '3px solid blue',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '4rem auto'
  },
  header: {
    marginBottom: '1.5rem'
  },
  headerTitle: {
    fontSize: '1.5rem',
    color: '#333'
  },
  link: {
    color: '#4040ff'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  inputGroup: {
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  togglePassword: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    cursor: 'pointer'
  },
  registerBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4040ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Register;