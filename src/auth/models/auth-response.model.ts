import { Candidate } from '../../candidates/models/candidate.model';

export interface AuthResponseProps {
  success: boolean;
  message: string;
  token?: string | null;
  candidate?: ReturnType<Candidate['toSanitizedJson']> | null;
  requiresVerification?: boolean;
}

export class AuthResponse {
  readonly success: boolean;
  readonly message: string;
  readonly token: string | null;
  readonly candidate: ReturnType<Candidate['toSanitizedJson']> | null;
  readonly requiresVerification: boolean;

  constructor(props: AuthResponseProps) {
    this.success = props.success;
    this.message = props.message;
    this.token = props.token ?? null;
    this.candidate = props.candidate ?? null;
    this.requiresVerification = props.requiresVerification ?? false;
  }

  static create(
    candidate: Candidate,
    token: string,
    message = 'Authentication successful',
  ): AuthResponse {
    return new AuthResponse({
      success: true,
      message,
      token,
      candidate: candidate.toSanitizedJson(),
      requiresVerification: false,
    });
  }

  static createRegistrationNotice(
    candidate: Candidate,
    message = 'Registration successful! Please check your email to verify your account.',
  ): AuthResponse {
    return new AuthResponse({
      success: true,
      message,
      token: null,
      candidate: candidate.toSanitizedJson(),
      requiresVerification: true,
    });
  }
}
