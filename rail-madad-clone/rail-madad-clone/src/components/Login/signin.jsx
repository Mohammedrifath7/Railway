import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import './LoginForm.css';

function Signin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        handleSendOtp();
      },
    }, auth);
  };

  const handleSendOtp = async () => {
    setError('');
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOtp = async () => {
    setError('');
    try {
      const result = await window.confirmationResult.confirm(otp);
      navigate('/grievance');
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <div className="input-box">
        <input
          type="tel"
          placeholder="+1234567890"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      {isOtpSent && (
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {!isOtpSent ? (
        <button type="button" onClick={handleSendOtp} className="signin-btn">Send OTP</button>
      ) : (
        <button type="button" onClick={verifyOtp} className="signin-btn">Verify OTP</button>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Signin;
