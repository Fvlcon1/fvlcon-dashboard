'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { message } from 'antd';

export default function MFAValidation({
  email,
  onSuccess,
  timer,
  setTimer,
  resendHandler
} : {
  email? : string
  onSuccess : ()=>void
  timer : number
  setTimer: Dispatch<SetStateAction<number>>
  resendHandler : ()=>void
}) {
  const [verificationCode, setVerificationCode] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState<string | null>(null);
  const [errMessage, setMessage] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const formatTime = (timeInSeconds : number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Format with leading zero for seconds
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        } else if (!value && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setMessage('Email is missing. Please retry.');
      message.warning('Email is missing. Please retry.');
      return;
    }

    const fullCode = code.join('');
      if (fullCode.length !== 6) {
          setMessage("Please enter a 6-digit code.");
          message.warning("Please enter a 6-digit code.");
          setIsLoading(false);
          return;
      }

    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code : code.join("") }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsLoading(false)
        message.success("Login Successful")
        onSuccess()
      } else {
        setMessage(data.message || 'Invalid verification code. Please try again.');
        message.error(data.message || 'Invalid verification code. Please try again.');
        setIsLoading(false)
      }
    } catch {
      setIsLoading(false)
      setMessage('Something went wrong. Please try again.');
      message.error('Something went wrong. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setIsResending(true)
    try {
      await resendHandler()
      setIsResending(false)
      setTimer(5 * 60)
    } catch {
      setIsResending(false)
      setError('Failed to resend verification code.');
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
          <h2 style={styles.title}>Verify Your Email Address</h2>
          <p style={styles.instruction}>
              A verification code has been sent to <strong>{email}</strong>
          </p>
          <p style={styles.timer}>The code will expire in {formatTime(timer)}.</p>

          <div style={styles.codeContainer}>
              {code.map((digit, index) => (
                  <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      maxLength={1}
                      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                      style={styles.input}
                  />
              ))}
          </div>

          <button style={styles.button} onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <button
              style={styles.linkButton}
              onClick={handleResendCode}
              disabled={isResending}
          >
              {isResending ? 'Resending...' : 'Resend code'}
          </button>

          {errMessage && <p style={styles.message}>{errMessage}</p>}
      </div>
  </div>
  );
}

const styles = {
  outerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#121212',
      color: '#ffffff',
  },
  container: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      maxWidth: '400px',
      width: '100%',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  },
  title: {
      fontSize: '18px',
      fontWeight: 'bold' as 'bold',
      color: '#ffffff',
      textAlign: 'center' as 'center',
  },
  instruction: {
      fontSize: '14px',
      color: '#b0b0b0',
      textAlign: 'center' as 'center',
      marginBottom: '10px',
  },
  timer: {
      fontSize: '14px',
      color: '#ff5722',
      textAlign: 'center' as 'center',
      marginBottom: '20px',
  },
  codeContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
  },
  input: {
      width: '40px',
      height: '40px',
      textAlign: 'center' as 'center',
      fontSize: '18px',
      border: '1px solid #555',
      borderRadius: '5px',
      backgroundColor: '#333',
      color: '#ffffff',
  },
  button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#4CAF50',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '20px',
  },
  linkButton: {
      color: '#4CAF50',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '14px',
      marginTop: '10px',
  },
  message: {
      color: '#ff5722',
      fontSize: '14px',
      textAlign: 'center' as 'center',
      marginTop: '10px',
  },
};