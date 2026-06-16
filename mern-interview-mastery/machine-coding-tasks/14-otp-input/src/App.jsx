import { useState, useEffect, useRef } from 'react';
import './App.css';

const MOCK_VALID_OTP = '202616';

function App() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [status, setStatus] = useState('idle'); // idle | checking | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = useRef([]);

  // Focus initial digit input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Expiry Countdown timer
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    // Only accept numeric inputs
    if (value && isNaN(value)) return;

    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setErrorMessage('');

    // Auto focus next input block
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Detect Backspace event to shift focus left
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').trim();
    
    // Check if pasted value is numeric and fits length
    if (data.length === 6 && !isNaN(data)) {
      const splitDigits = data.split('');
      setOtp(splitDigits);
      // Focus the last input element
      inputRefs.current[5].focus();
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    const joined = otp.join('');
    
    if (joined.length < 6) {
      setErrorMessage('Please enter all 6 verification digits.');
      return;
    }

    setStatus('checking');
    setTimeout(() => {
      if (joined === MOCK_VALID_OTP) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Verification failed. Invalid OTP code entered.');
      }
    }, 1500); // 1.5s verification delay
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(60);
    setStatus('idle');
    setErrorMessage('');
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return (
    <div className="otp-container">
      <header className="otp-header">
        <div className="brand">
          <span className="logo-icon">🔑</span>
          <div>
            <h1>SecureAuth OTP</h1>
            <p className="subtitle">MERN Level - 6-Digit OTP Form, Clipboard Capture & Key Event Triggers</p>
          </div>
        </div>
      </header>

      <div className="otp-card card">
        <h2>Enter Verification Code</h2>
        <p className="description-text">We sent a verification code to your email. Enter the digits below to establish session credentials.</p>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {status === 'success' && <div className="alert alert-success">OTP Verified! Access granted to dashboard dashboard system.</div>}

        <form onSubmit={verifyOTP} className="otp-form">
          <div className="otp-inputs-row" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                ref={el => inputRefs.current[idx] = el}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`otp-digit-input ${status === 'error' ? 'error-state' : ''}`}
                disabled={status === 'checking' || status === 'success'}
              />
            ))}
          </div>

          <div className="timer-row">
            {timeLeft > 0 ? (
              <span className="expiry-timer">Code expires in: <strong>{timeLeft}s</strong></span>
            ) : (
              <div className="resend-wrapper">
                <span className="expiry-timer red">Code expired</span>
                <button type="button" className="resend-btn" onClick={handleResend}>Resend Code</button>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block submit-otp-btn"
            disabled={status === 'checking' || status === 'success' || timeLeft === 0}
          >
            {status === 'checking' ? 'Validating Digits...' : 'Verify OTP Code'}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>Demo OTP Code</h4>
          <p>Standard Validation Key: <code>202616</code></p>
        </div>
      </div>
    </div>
  );
}

export default App;
