import { z } from 'zod';
import { COURSE_STATUS_OPTIONS, CourseStatus } from '../../candidates/utils/candidate.types';

export const RegisterCandidateSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().toLowerCase().email('Invalid email address'),
  pincode: z.string().trim().regex(/^[1-9][0-9]{5}$/, 'PIN code must be a valid 6-digit Indian postal PIN code'),
  engineeringGraduationCourse: z.string().trim().min(1, 'Engineering graduation course is required'),
  courseStatus: z.enum(COURSE_STATUS_OPTIONS, {
    message: 'Invalid course status selected',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters').max(128),
});

export type RegisterCandidatePayload = z.infer<typeof RegisterCandidateSchema>;

export class RegisterCandidateDto {
  firstName: string;
  lastName: string;
  email: string;
  pincode: string;
  engineeringGraduationCourse: string;
  courseStatus: CourseStatus;
  password: string;

  constructor(payload: RegisterCandidatePayload) {
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.pincode = payload.pincode;
    this.engineeringGraduationCourse = payload.engineeringGraduationCourse;
    this.courseStatus = payload.courseStatus;
    this.password = payload.password;
  }

  static fromPayload(payload: RegisterCandidatePayload): RegisterCandidateDto {
    return new RegisterCandidateDto(payload);
  }
}
