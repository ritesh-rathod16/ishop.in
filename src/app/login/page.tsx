"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        login(data.user, data.token);
        router.push('/');
      } else if (data.needsVerification) {
        localStorage.setItem('verifyEmail', data.email);
        router.push('/verify-otp');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
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
        <div className="w-full max-w-[350px]">
          <div className="bg-white p-6 rounded-lg border border-[#ddd]">
            <h1 className="text-[28px] font-normal text-[#0F1111] mb-5">Sign in</h1>

            {error && (
              <div className="mb-4 p-3 bg-[#FCF4F4] border border-[#C40000] rounded text-[#C40000] text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-[#a6a6a6] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
                  />
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[13px] font-bold text-[#0F1111]">
                    Password
                  </label>
                  <a href="#" className="text-[12px] text-[#007185] hover:text-[#c7511f] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-2 border border-[#a6a6a6] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded text-[14px] text-[#0F1111] font-normal hover:from-[#f5d78e] hover:to-[#eeb933] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-[12px] text-[#0F1111] mt-5">
              By continuing, you agree to iShop&apos;s{' '}
              <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                Privacy Notice
              </a>
              .
            </p>
          </div>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e7e7e7]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#E3E6E6] text-[#767676] text-[12px]">New to iShop.in?</span>
              </div>
            </div>
            <Link
              href="/register"
              className="mt-3 block w-full py-2 px-4 bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] border border-[#adb1b8] rounded text-[13px] text-[#0F1111] text-center hover:from-[#e7eaf0] hover:to-[#d9dce1]"
            >
              Create your iShop account
            </Link>
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
