'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { message } from 'antd';
import { formatTime } from '@/utils/formatTime';
import theme from '@styles/theme';
import InfinityLoader from '@components/loaders/infinityLoader';

export default function MFAValidation({
  email,
  onSuccess,
  timer,
  setTimer,
  resendHandler
}: {
  email?: string;
  onSuccess: () => void;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  resendHandler: () => void;
}) {
  const [code, setCode] = useState(Array(6).fill(''));
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

  const handleChange = async (index: number, value: string) => {
    if (!value) {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      return;
    }

    // Handle paste of full code
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      const newCode = value.split('');
      setCode(newCode);
      await handleSubmit(undefined, newCode);
      return;
    }

    // Single digit input
    if (!/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    if (index === 5) {
      await handleSubmit(undefined, newCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = e;

    if (key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }

    if (key === 'ArrowRight' && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    if (key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e?: any, codeParam?: string[]) => {
    e?.preventDefault();
    setMessage(null);
    const fullCode = codeParam?.join('') ?? code.join('');

    if (fullCode.length !== 6) {
      setMessage('Please enter a 6-digit code.');
      message.warning('Please enter a 6-digit code.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode })
      });

      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        message.success('Login Successful');
        onSuccess();
      } else {
        setMessage(data.message || 'Invalid verification code. Please try again.');
        message.error(data.message || 'Invalid verification code. Please try again.');
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      setMessage('Something went wrong. Please try again.');
      message.error('Something went wrong. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setIsResending(true);
    try {
      await resendHandler();
      setIsResending(false);
      setTimer(5 * 60);
    } catch {
      setIsResending(false);
      setMessage('Failed to resend verification code.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="bg-bg-secondary">
        <div style={styles.outerContainer}>
          <div
            style={styles.container}
            className="shadow-xl rounded-[14px] p-6 border-solid border-[1px] border-bg-alt1"
          >
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
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData('Text');
                    e.preventDefault();
                    handleChange(index, pasted);
                  }}
                  className="outline-bg-tetiary"
                  maxLength={1}
                  style={styles.input}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button className="hidden" style={styles.button} onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>

            {isLoading && (
              <div className="flex w-full justify-center items-center">
                <InfinityLoader size={40} />
              </div>
            )}

            <button
              style={styles.linkButton}
              onClick={handleResendCode}
              disabled={isResending}
              type="button"
            >
              {isResending ? 'Resending...' : 'Resend code'}
            </button>

            {errMessage && <p style={styles.message}>{errMessage}</p>}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#ffffff'
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '400px',
    backgroundColor: theme.colors.bg.quantinary,
    width: '100%',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    color: '#ffffff',
    textAlign: 'center' as const
  },
  instruction: {
    fontSize: '14px',
    color: '#b0b0b0',
    textAlign: 'center' as const,
    marginBottom: '10px'
  },
  timer: {
    fontSize: '14px',
    color: '#ff5722',
    textAlign: 'center' as const,
    marginBottom: '20px'
  },
  codeContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    width: '40px',
    height: '40px',
    textAlign: 'center' as const,
    fontSize: '18px',
    border: `1px solid ${theme.colors.bg.alt1}`,
    borderRadius: '5px',
    backgroundColor: theme.colors.bg.secondary,
    color: '#ffffff'
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: theme.colors.main.primary,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  linkButton: {
    color: theme.colors.main.primary,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
    marginTop: '10px'
  },
  message: {
    color: '#ff5722',
    fontSize: '14px',
    textAlign: 'center' as const,
    marginTop: '10px'
  }
};
