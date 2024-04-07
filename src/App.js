import React, { useState } from 'react';
import './App.css';

function FormValidation() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Weak';
    } else if (!/(?=.*[a-z])/.test(password) || !/(?=.*[A-Z])/.test(password) || !/(?=.*\d)/.test(password)) {
      return 'Medium';
    } else {
      return 'Strong';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log('Form is valid, submitting...');
      setSubmissionStatus('success');
    } else {
      console.log('Form has errors, cannot submit');
      setSubmissionStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="background">
      <div className="form-container">
        <h1>Form Validation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
            {passwordStrength && <p className={`password-strength ${passwordStrength.toLowerCase()}`}>Password Strength: {passwordStrength}</p>}
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className={`submit-button ${submissionStatus === 'success' ? 'success-button' : submissionStatus === 'error' ? 'error-button' : ''}`}>
            Submit
          </button>

        </form>
        {submissionStatus === 'success' && <p className="success-message">Form submitted successfully!</p>}
        {submissionStatus === 'error' && <p className="error-message">Form submission failed. Please check the form.</p>}
      </div>
    </div>
  );
}

export default FormValidation;
