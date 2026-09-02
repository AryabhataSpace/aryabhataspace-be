import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
});

export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;

export class ForgotPasswordDto {
  readonly email: string;

  constructor(payload: ForgotPasswordPayload) {
    this.email = payload.email;
  }

  static fromPayload(payload: ForgotPasswordPayload): ForgotPasswordDto {
    return new ForgotPasswordDto(payload);
  }
}

export const ResetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, 'Password reset token is required'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(128),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;

export class ResetPasswordDto {
  readonly token: string;
  readonly password: string;
  readonly confirmPassword: string;

  constructor(payload: ResetPasswordPayload) {
    this.token = payload.token;
    this.password = payload.password;
    this.confirmPassword = payload.confirmPassword;
  }

  static fromPayload(payload: ResetPasswordPayload): ResetPasswordDto {
    return new ResetPasswordDto(payload);
  }
}
