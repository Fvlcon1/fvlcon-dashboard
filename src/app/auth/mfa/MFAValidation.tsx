'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MFAValidation() {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Extract email from query params

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email is missing. Please retry.');
      return;
    }

    try {
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push('/dashboard/home');
      } else {
        setError(data.message || 'Invalid verification code. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setTimer(30);
    try {
      await fetch('/api/auth/resend-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      setError('Failed to resend verification code.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-lg rounded-lg"
      >
        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 space-y-6"
          aria-labelledby="mfa-header"
        >
          <h2
            id="mfa-header"
            className="text-2xl font-semibold text-center text-gray-800"
          >
            Two-Factor Authentication
          </h2>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm"
            >
              {error}
            </motion.p>
          )}
          <p className="text-gray-600 text-sm text-center">
            We've sent a verification code to your email. Enter it below.
          </p>
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-gray-700 text-sm font-medium"
            >
              Verification Code
            </label>
            <div className="relative mt-1">
              <input
                id="verificationCode"
                type="text"
                className="w-full py-2 px-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                aria-describedby="codeHelpText"
              />
              <Mail className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            </div>
            <p id="codeHelpText" className="mt-2 text-xs text-gray-500">
              Enter the 6-digit code sent to your email.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className={`text-sm flex items-center ${
                canResend
                  ? 'text-indigo-600 hover:text-indigo-800'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleResendCode}
              disabled={!canResend}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {canResend ? 'Resend Code' : `Resend in ${timer}s`}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Verify
          </button>
        </form>
        <p className="text-center text-gray-500 text-xs py-4">
          &copy;2024 Blvck Sapphire. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
