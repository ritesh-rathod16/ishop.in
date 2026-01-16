import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'ishopindia.verify@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTPEmail = async (email: string, otp: string, name: string): Promise<boolean> => {
  const mailOptions = {
    from: '"iShop.in" <noreply@ishop.in>',
    to: email,
    subject: 'Verify your iShop.in account - OTP Code',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tr>
            <td style="background-color: #131921; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
                iShop<span style="color: #febd69;">.in</span>
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #0F1111; margin: 0 0 20px;">Hello ${name}!</h2>
              <p style="color: #565959; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Thank you for registering with iShop.in. To complete your registration, please use the following OTP code:
              </p>
              <div style="background-color: #f7f7f7; border: 2px dashed #febd69; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <span style="font-size: 36px; font-weight: bold; color: #131921; letter-spacing: 8px;">${otp}</span>
              </div>
              <p style="color: #565959; font-size: 14px; line-height: 1.5; margin: 20px 0 0;">
                This code will expire in <strong>10 minutes</strong>. If you didn't request this code, please ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #232f3e; padding: 20px; text-align: center;">
              <p style="color: #cccccc; font-size: 12px; margin: 0;">
                © 2024 iShop.in. All rights reserved.<br>
                This is an automated message, please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  const mailOptions = {
    from: '"iShop.in" <noreply@ishop.in>',
    to: email,
    subject: 'Welcome to iShop.in! Your account is verified',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <tr>
            <td style="background-color: #131921; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">
                iShop<span style="color: #febd69;">.in</span>
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #0F1111; margin: 0 0 20px;">Welcome, ${name}!</h2>
              <p style="color: #565959; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Congratulations! Your iShop.in account has been successfully verified. You can now enjoy all the features of our platform.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="/" style="background-color: #febd69; color: #0F1111; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                  Start Shopping
                </a>
              </div>
              <p style="color: #565959; font-size: 14px; line-height: 1.5;">
                With your new account, you can:
              </p>
              <ul style="color: #565959; font-size: 14px; line-height: 1.8;">
                <li>Browse millions of products</li>
                <li>Track your orders in real-time</li>
                <li>Save items to your wishlist</li>
                <li>Get personalized recommendations</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="background-color: #232f3e; padding: 20px; text-align: center;">
              <p style="color: #cccccc; font-size: 12px; margin: 0;">
                © 2024 iShop.in. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
