import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CandidateEntity } from '../candidates/entities/candidate.entity';
import { RegisterCandidateDto } from './dto/register.dto';
import { LoginCandidateDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password-reset.dto';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let candidateRepo: any;
  let jwtService: any;
  let mailService: any;

  beforeEach(async () => {
    candidateRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mock-jwt-token-12345'),
      verify: jest.fn(),
    };

    mailService = {
      sendVerificationEmail: jest.fn().mockResolvedValue(true),
      sendPasswordResetEmail: jest.fn().mockResolvedValue(true),
      sendPasswordChangedAlert: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(CandidateEntity),
          useValue: candidateRepo,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
        {
          provide: MailService,
          useValue: mailService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register candidate, save unverified entity, and dispatch verification email', async () => {
      candidateRepo.findOne.mockResolvedValue(null);
      candidateRepo.save.mockImplementation((entity: CandidateEntity) => {
        return Promise.resolve({
          ...entity,
          id: 'cand-123',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      const dto = new RegisterCandidateDto({
        firstName: 'Aarav',
        lastName: 'Sharma',
        email: 'aarav.sharma@iitd.ac.in',
        pincode: '110016',
        engineeringGraduationCourse: 'Mechanical Engineering',
        courseStatus: '4th Year',
        password: 'Password123',
      });

      const result = await service.register(dto);

      expect(result.success).toBe(true);
      expect(result.requiresVerification).toBe(true);
      expect(result.token).toBeNull();
      expect(result.candidate?.email).toBe('aarav.sharma@iitd.ac.in');
      expect(result.candidate?.verified).toBe(false);
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        'aarav.sharma@iitd.ac.in',
        'Aarav Sharma',
        expect.any(String),
      );
    });

    it('should throw ConflictException if email already registered', async () => {
      candidateRepo.findOne.mockResolvedValue({ id: 'cand-101', email: 'aarav.sharma@iitd.ac.in' });

      const dto = new RegisterCandidateDto({
        firstName: 'Aarav',
        lastName: 'Sharma',
        email: 'aarav.sharma@iitd.ac.in',
        pincode: '110016',
        engineeringGraduationCourse: 'Mechanical Engineering',
        courseStatus: '4th Year',
        password: 'Password123',
      });

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should throw ForbiddenException if candidate is unverified', async () => {
      const passwordHash = await bcrypt.hash('Password123', 10);
      const mockQueryBuilder = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({
          id: 'cand-101',
          email: 'unverified@example.com',
          fullName: 'Unverified Candidate',
          passwordHash,
          verified: false,
        }),
      };
      candidateRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const dto = new LoginCandidateDto({
        email: 'unverified@example.com',
        password: 'Password123',
      });

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
    });

    it('should authenticate verified candidate and return JWT session', async () => {
      const passwordHash = await bcrypt.hash('Password123', 10);
      const mockQueryBuilder = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({
          id: 'cand-101',
          email: 'verified@example.com',
          fullName: 'Verified Candidate',
          engineeringGraduationCourse: 'Mechanical Engineering',
          courseStatus: '4th Year',
          passwordHash,
          verified: true,
          role: 'candidate',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };
      candidateRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const dto = new LoginCandidateDto({
        email: 'verified@example.com',
        password: 'Password123',
      });

      const result = await service.login(dto);

      expect(result.success).toBe(true);
      expect(result.token).toBe('mock-jwt-token-12345');
      expect(result.candidate?.verified).toBe(true);
    });
  });

  describe('verifyEmail', () => {
    it('should verify candidate and activate account with valid token', async () => {
      const mockEntity = {
        id: 'cand-101',
        email: 'cadet@example.com',
        fullName: 'Cadet Candidate',
        engineeringGraduationCourse: 'Aerospace Engineering',
        courseStatus: 'Graduated',
        emailVerificationToken: 'valid-token-123',
        emailVerificationExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
        verified: false,
      };
      candidateRepo.findOne.mockResolvedValue(mockEntity);
      candidateRepo.save.mockImplementation((e: any) => Promise.resolve(e));

      const result = await service.verifyEmail(new VerifyEmailDto({ token: 'valid-token-123' }));

      expect(result.success).toBe(true);
      expect(result.token).toBe('mock-jwt-token-12345');
      expect(result.candidate?.verified).toBe(true);
      expect(candidateRepo.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException if token is invalid or expired', async () => {
      candidateRepo.findOne.mockResolvedValue(null);

      await expect(
        service.verifyEmail(new VerifyEmailDto({ token: 'invalid-token' })),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('forgotPassword & resetPassword', () => {
    it('should generate reset token and dispatch password reset email', async () => {
      const mockCandidate = {
        id: 'cand-101',
        email: 'cadet@example.com',
        fullName: 'Cadet Candidate',
      };
      candidateRepo.findOne.mockResolvedValue(mockCandidate);
      candidateRepo.save.mockImplementation((e: any) => Promise.resolve(e));

      const result = await service.forgotPassword(
        new ForgotPasswordDto({ email: 'cadet@example.com' }),
      );

      expect(result.success).toBe(true);
      expect(mailService.sendPasswordResetEmail).toHaveBeenCalled();
    });

    it('should reset password with valid token and update passwordHash', async () => {
      const mockCandidate = {
        id: 'cand-101',
        email: 'cadet@example.com',
        fullName: 'Cadet Candidate',
        passwordResetToken: 'valid-reset-token',
        passwordResetExpiresAt: new Date(Date.now() + 1000 * 60 * 30),
      };
      candidateRepo.findOne.mockResolvedValue(mockCandidate);
      candidateRepo.save.mockImplementation((e: any) => Promise.resolve(e));

      const result = await service.resetPassword(
        new ResetPasswordDto({
          token: 'valid-reset-token',
          password: 'NewStrongPassword123',
          confirmPassword: 'NewStrongPassword123',
        }),
      );

      expect(result.success).toBe(true);
      expect(candidateRepo.save).toHaveBeenCalled();
      expect(mailService.sendPasswordChangedAlert).toHaveBeenCalled();
    });
  });
});
