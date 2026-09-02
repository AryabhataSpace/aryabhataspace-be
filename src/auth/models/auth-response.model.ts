import { Candidate } from '../../candidates/models/candidate.model';

export interface AuthResponseProps {
  success: boolean;
  message: string;
  token: string;
  candidate: ReturnType<Candidate['toSanitizedJson']>;
}

export class AuthResponse {
  readonly success: boolean;
  readonly message: string;
  readonly token: string;
  readonly candidate: ReturnType<Candidate['toSanitizedJson']>;

  constructor(props: AuthResponseProps) {
    this.success = props.success;
    this.message = props.message;
    this.token = props.token;
    this.candidate = props.candidate;
  }

  static create(candidate: Candidate, token: string, message = 'Authentication successful'): AuthResponse {
    return new AuthResponse({
      success: true,
      message,
      token,
      candidate: candidate.toSanitizedJson(),
    });
  }
}
