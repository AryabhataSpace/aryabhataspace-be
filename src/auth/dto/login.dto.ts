import { z } from 'zod';

export const LoginCandidateSchema = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginCandidatePayload = z.infer<typeof LoginCandidateSchema>;

export class LoginCandidateDto {
  readonly email: string;
  readonly password: string;

  constructor(payload: LoginCandidatePayload) {
    this.email = payload.email;
    this.password = payload.password;
  }

  static fromPayload(payload: LoginCandidatePayload): LoginCandidateDto {
    return new LoginCandidateDto(payload);
  }
}
