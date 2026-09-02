import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from './zod-validation.pipe';
import { RegisterCandidateSchema } from '../../auth/dto/register.dto';

describe('ZodValidationPipe', () => {
  let pipe: ZodValidationPipe;

  beforeEach(() => {
    pipe = new ZodValidationPipe(RegisterCandidateSchema);
  });

  it('should validate and transform valid candidate registration payload', () => {
    const validPayload = {
      firstName: '  Priya  ',
      lastName: 'Venkatesh',
      email: '  PRIYA@EXAMPLE.COM  ',
      pincode: '560059',
      engineeringGraduationCourse: 'Electronics & Communication',
      courseStatus: 'Graduated',
      password: 'StrongPassword123',
    };

    const transformed = pipe.transform(validPayload);

    expect(transformed.firstName).toBe('Priya');
    expect(transformed.email).toBe('priya@example.com');
    expect(transformed.pincode).toBe('560059');
  });

  it('should throw BadRequestException on invalid email format', () => {
    const invalidPayload = {
      firstName: 'Priya',
      lastName: 'Venkatesh',
      email: 'invalid-email',
      pincode: '560059',
      engineeringGraduationCourse: 'Electronics & Communication',
      courseStatus: 'Graduated',
      password: 'StrongPassword123',
    };

    expect(() => pipe.transform(invalidPayload)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException on invalid PIN code', () => {
    const invalidPayload = {
      firstName: 'Priya',
      lastName: 'Venkatesh',
      email: 'priya@example.com',
      pincode: '0123', // invalid PIN code
      engineeringGraduationCourse: 'Electronics & Communication',
      courseStatus: 'Graduated',
      password: 'StrongPassword123',
    };

    expect(() => pipe.transform(invalidPayload)).toThrow(BadRequestException);
  });

  it('should throw BadRequestException on short password', () => {
    const invalidPayload = {
      firstName: 'Priya',
      lastName: 'Venkatesh',
      email: 'priya@example.com',
      pincode: '560059',
      engineeringGraduationCourse: 'Electronics & Communication',
      courseStatus: 'Graduated',
      password: '123', // less than 6 chars
    };

    expect(() => pipe.transform(invalidPayload)).toThrow(BadRequestException);
  });
});
