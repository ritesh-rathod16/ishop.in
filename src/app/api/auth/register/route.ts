import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { generateOTP, sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { success: false, message: 'Email already registered. Please login.' },
          { status: 400 }
        );
      } else {
        await User.deleteOne({ _id: existingUser._id });
      }
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      isVerified: false,
    });

    await OTP.deleteMany({ email: email.toLowerCase() });

    const otp = generateOTP();
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    const emailSent = await sendOTPEmail(email, otp, name);

    return NextResponse.json({
      success: true,
      message: emailSent 
        ? 'Registration successful! Please check your email for OTP verification.'
        : 'Registration successful! OTP: ' + otp + ' (Email service unavailable)',
      userId: user._id.toString(),
      email: user.email,
    });
  } catch (error: unknown) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
