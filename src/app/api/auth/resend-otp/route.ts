import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import OTP from '@/models/OTP';
import { generateOTP, sendOTPEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found. Please register first.' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { success: false, message: 'Email is already verified. Please login.' },
        { status: 400 }
      );
    }

    await OTP.deleteMany({ email: email.toLowerCase() });

    const otp = generateOTP();
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    const emailSent = await sendOTPEmail(email, otp, user.name);

    return NextResponse.json({
      success: true,
      message: emailSent 
        ? 'New OTP sent to your email!'
        : 'New OTP: ' + otp + ' (Email service unavailable)',
    });
  } catch (error: unknown) {
    console.error('Resend OTP error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to resend OTP';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
