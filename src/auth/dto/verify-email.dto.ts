import { z } from 'zod';

export const VerifyEmailSchema = z.object({
  token: z.string().trim().min(1, 'Verification token is required'),
});

export type VerifyEmailPayload = z.infer<typeof VerifyEmailSchema>;

export class VerifyEmailDto {
  readonly token: string;

  constructor(payload: VerifyEmailPayload) {
    this.token = payload.token;
  }

  static fromPayload(payload: VerifyEmailPayload): VerifyEmailDto {
    return new VerifyEmailDto(payload);
  }
}

export const ResendVerificationSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
});

export type ResendVerificationPayload = z.infer<typeof ResendVerificationSchema>;

export class ResendVerificationDto {
  readonly email: string;

  constructor(payload: ResendVerificationPayload) {
    this.email = payload.email;
  }

  static fromPayload(payload: ResendVerificationPayload): ResendVerificationDto {
    return new ResendVerificationDto(payload);
  }
}
