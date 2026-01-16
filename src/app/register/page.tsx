"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
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
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('verifyEmail', formData.email);
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
            <h1 className="text-[28px] font-normal text-[#0F1111] mb-5">Create account</h1>

            {error && (
              <div className="mb-4 p-3 bg-[#FCF4F4] border border-[#C40000] rounded text-[#C40000] text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">
                  Your name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First and last name"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-[#a6a6a6] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">
                  Mobile number (optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="w-full pl-10 pr-3 py-2 border border-[#a6a6a6] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
                  />
                </div>
              </div>

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

              <div className="mb-4">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
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
                <p className="text-[12px] text-[#2B2B2B] mt-1">
                  Passwords must be at least 6 characters.
                </p>
              </div>

              <div className="mb-5">
                <label className="block text-[13px] font-bold text-[#0F1111] mb-1">
                  Re-enter password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-[#a6a6a6] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded text-[14px] text-[#0F1111] font-normal hover:from-[#f5d78e] hover:to-[#eeb933] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Continue'}
              </button>
            </form>

            <p className="text-[12px] text-[#0F1111] mt-5">
              By creating an account, you agree to iShop&apos;s{' '}
              <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                Privacy Notice
              </a>
              .
            </p>

            <div className="mt-5 pt-5 border-t border-[#e7e7e7]">
              <p className="text-[13px] text-[#0F1111]">
                Already have an account?{' '}
                <Link href="/login" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                  Sign in
                </Link>
              </p>
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
