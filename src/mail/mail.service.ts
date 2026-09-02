import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly fromAddress: string;
  private readonly appUrl: string;
  private readonly isConfigured: boolean;

  constructor(private readonly config: ConfigService) {
    const user = this.config.get<string>('GMAIL_USER');
    const pass = this.config.get<string>('GMAIL_APP_PASSWORD');
    this.fromAddress = this.config.get<string>(
      'GMAIL_FROM',
      '"Aryabhata Space Platform" <no-reply@aryabhataspace.org>',
    );
    this.appUrl = this.config.get<string>('APP_URL', 'http://localhost:3000').replace(/\/$/, '');

    if (user && pass && user !== 'aryabhataspace.org@gmail.com' && pass !== 'your_16_digit_app_password') {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass,
        },
      });
      this.isConfigured = true;
      this.logger.log(`Gmail SMTP transport initialized for user: ${user}`);
    } else {
      this.isConfigured = false;
      this.logger.warn(
        'Gmail credentials not configured or using placeholders. Emails will be logged to console in development mode.',
      );
    }
  }

  async sendVerificationEmail(toEmail: string, candidateName: string, token: string): Promise<boolean> {
    const verificationUrl = `${this.appUrl}/verify-email?token=${encodeURIComponent(token)}`;
    const subject = 'Verify Your Aryabhata Space Candidate Account';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #0b0f19; border: 1px solid #1f293d; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0b1528 0%, #1e1b4b 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #1f293d; }
    .logo { font-size: 24px; font-weight: 800; letter-spacing: 0.05em; color: #38bdf8; text-transform: uppercase; margin: 0; }
    .subtitle { color: #94a3b8; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 6px; }
    .content { padding: 36px 32px; line-height: 1.6; color: #e2e8f0; }
    .greeting { font-size: 18px; font-weight: 600; color: #ffffff; margin-bottom: 16px; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff !important; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 8px; text-decoration: none; letter-spacing: 0.02em; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4); }
    .alt-link { background: #030712; border: 1px solid #1f2937; border-radius: 6px; padding: 12px; word-break: break-all; font-family: monospace; font-size: 12px; color: #38bdf8; margin-top: 16px; }
    .footer { background: #050811; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #111827; }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin-bottom: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">National Space Talent Platform</div>
      <h1 class="logo">Aryabhata Space</h1>
      <div class="subtitle">Cadet Engineering Registry</div>
    </div>
    <div class="content">
      <p class="greeting">Welcome aboard, ${candidateName || 'Cadet'}!</p>
      <p>Thank you for enrolling in the Aryabhata Space platform. To activate your candidate account, access mission tracks, and unlock the Candidate Dashboard, please verify your email address.</p>
      <div class="btn-container">
        <a href="${verificationUrl}" class="btn" target="_blank">Verify Email Address</a>
      </div>
      <p style="font-size: 13px; color: #94a3b8;">This verification link will remain active for <strong>24 hours</strong>. If you cannot click the button above, copy and paste this link into your browser:</p>
      <div class="alt-link">${verificationUrl}</div>
    </div>
    <div class="footer">
      <p>© 2026 Aryabhata Space Platform. All rights reserved.</p>
      <p>If you did not create this account, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;

    const textContent = `Welcome to Aryabhata Space, ${candidateName}!\n\nPlease verify your email address by visiting this link:\n${verificationUrl}\n\nThis link expires in 24 hours.\n\nIf you did not register, please ignore this message.`;

    return await this.sendMail(toEmail, subject, textContent, htmlContent);
  }

  async sendPasswordResetEmail(toEmail: string, candidateName: string, token: string): Promise<boolean> {
    const resetUrl = `${this.appUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const subject = 'Reset Your Aryabhata Space Password';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #0b0f19; border: 1px solid #1f293d; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0b1528 0%, #1e1b4b 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid #1f293d; }
    .logo { font-size: 24px; font-weight: 800; letter-spacing: 0.05em; color: #f59e0b; text-transform: uppercase; margin: 0; }
    .subtitle { color: #94a3b8; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 6px; }
    .content { padding: 36px 32px; line-height: 1.6; color: #e2e8f0; }
    .greeting { font-size: 18px; font-weight: 600; color: #ffffff; margin-bottom: 16px; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: #ffffff !important; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 8px; text-decoration: none; letter-spacing: 0.02em; }
    .alt-link { background: #030712; border: 1px solid #1f2937; border-radius: 6px; padding: 12px; word-break: break-all; font-family: monospace; font-size: 12px; color: #fbbf24; margin-top: 16px; }
    .footer { background: #050811; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #111827; }
    .alert-box { background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; color: #fde68a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">Aryabhata Space</h1>
      <div class="subtitle">Security Operations — Password Reset</div>
    </div>
    <div class="content">
      <p class="greeting">Hello, ${candidateName || 'Cadet'}</p>
      <div class="alert-box">
        We received a request to reset your Aryabhata Space platform password.
      </div>
      <p>Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.</p>
      <div class="btn-container">
        <a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
      </div>
      <p style="font-size: 13px; color: #94a3b8;">If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
      <div class="alt-link">${resetUrl}</div>
    </div>
    <div class="footer">
      <p>© 2026 Aryabhata Space Platform. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

    const textContent = `Hello ${candidateName},\n\nYou requested a password reset for your Aryabhata Space account.\nReset link:\n${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you did not request this, please ignore.`;

    return await this.sendMail(toEmail, subject, textContent, htmlContent);
  }

  async sendPasswordChangedAlert(toEmail: string, candidateName: string): Promise<boolean> {
    const subject = 'Security Alert: Aryabhata Space Password Changed';
    const textContent = `Hello ${candidateName},\n\nYour Aryabhata Space account password was successfully updated. If you did not make this change, please contact platform administrators immediately.`;
    const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #030712; color: #f3f4f6; padding: 30px;">
  <div style="max-width: 500px; margin: 0 auto; background: #0b0f19; border: 1px solid #1f2937; border-radius: 8px; padding: 24px;">
    <h2 style="color: #10b981; margin-top: 0;">Password Successfully Updated</h2>
    <p>Hello <strong>${candidateName}</strong>,</p>
    <p>Your Aryabhata Space platform password was changed successfully on ${new Date().toUTCString()}.</p>
    <p style="color: #ef4444; font-size: 13px;">If you did not authorize this change, please contact security support immediately.</p>
  </div>
</body>
</html>
`;

    return await this.sendMail(toEmail, subject, textContent, htmlContent);
  }

  private async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<boolean> {
    if (this.isConfigured && this.transporter) {
      try {
        await this.transporter.sendMail({
          from: this.fromAddress,
          to,
          subject,
          text,
          html,
        });
        this.logger.log(`Email '${subject}' successfully sent to: ${to}`);
        return true;
      } catch (err: any) {
        this.logger.error(`Failed to send email to ${to}: ${err.message}`);
        // Fallback log to console so development is unblocked
        this.logEmailToConsole(to, subject, text);
        return false;
      }
    } else {
      this.logEmailToConsole(to, subject, text);
      return true;
    }
  }

  private logEmailToConsole(to: string, subject: string, text: string): void {
    this.logger.log(
      `\n==================== [DEV EMAIL DISPATCH] ====================\nTO: ${to}\nSUBJECT: ${subject}\n\n${text}\n==============================================================\n`,
    );
  }
}
