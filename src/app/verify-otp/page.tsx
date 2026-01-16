"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function VerifyOTPPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('verifyEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      router.push('/register');
    }
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.user, data.token);
        localStorage.removeItem('verifyEmail');
        setSuccess('Email verified successfully! Redirecting...');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setResending(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setCountdown(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E3E6E6] flex flex-col">
      <div className="bg-[#131921] py-4 px-6">
        <Link href="/" className="text-white text-2xl font-bold">
          iShop<span className="text-[#febd69]">.in</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[400px]">
          <div className="bg-white p-6 rounded-lg border border-[#ddd]">
            <h1 className="text-[28px] font-normal text-[#0F1111] mb-2">Verify your email</h1>
            <p className="text-[14px] text-[#565959] mb-5">
              We&apos;ve sent a 6-digit verification code to <strong>{email}</strong>
            </p>

            {error && (
              <div className="mb-4 p-3 bg-[#FCF4F4] border border-[#C40000] rounded text-[#C40000] text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-[#F0FFF0] border border-[#067D62] rounded text-[#067D62] text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleVerify}>
              <div className="mb-5">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-2">
                  Enter OTP
                </label>
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-[#a6a6a6] rounded focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full py-3 px-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded text-[14px] text-[#0F1111] font-bold hover:from-[#f5d78e] hover:to-[#eeb933] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-[#e7e7e7] text-center">
              <p className="text-[13px] text-[#565959] mb-2">
                Didn&apos;t receive the code?
              </p>
              <button
                onClick={handleResendOTP}
                disabled={resending || countdown > 0}
                className="text-[14px] text-[#007185] hover:text-[#c7511f] hover:underline disabled:text-[#565959] disabled:no-underline disabled:cursor-not-allowed"
              >
                {resending
                  ? 'Sending...'
                  : countdown > 0
                  ? `Resend OTP in ${countdown}s`
                  : 'Resend OTP'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <Link href="/register" className="text-[13px] text-[#007185] hover:text-[#c7511f] hover:underline">
                Change email address
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-transparent via-[#f7f7f7] to-[#f7f7f7] py-8">
        <div className="text-center text-[12px] text-[#555]">
          <div className="flex justify-center gap-5 mb-2">
            <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Conditions of Use
            </a>
            <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Privacy Notice
            </a>
            <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Help
            </a>
          </div>
          <p>© 1996-2024, iShop.in, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
}
