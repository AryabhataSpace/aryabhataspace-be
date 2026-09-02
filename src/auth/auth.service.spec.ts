import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CandidateEntity } from '../candidates/entities/candidate.entity';
import { RegisterCandidateDto } from './dto/register.dto';
import { LoginCandidateDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let candidateRepo: any;
  let jwtService: any;

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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should successfully register a new candidate, hash password, save entity, and return AuthResponse', async () => {
      candidateRepo.findOne.mockResolvedValue(null);
      candidateRepo.save.mockImplementation((entity: CandidateEntity) => {
        return Promise.resolve({
          ...entity,
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
      expect(result.token).toBe('mock-jwt-token-12345');
      expect(result.candidate.email).toBe('aarav.sharma@iitd.ac.in');
      expect(result.candidate.fullName).toBe('Aarav Sharma');
      expect(result.candidate.courseStatus).toBe('4th Year');
      expect((result.candidate as any).passwordHash).toBeUndefined();
      expect(candidateRepo.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if candidate with email already exists', async () => {
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
      expect(candidateRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should authenticate candidate with valid credentials and return AuthResponse', async () => {
      const passwordHash = await bcrypt.hash('Password123', 10);
      const mockQueryBuilder = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({
          id: 'cand-101',
          firstName: 'Aarav',
          lastName: 'Sharma',
          fullName: 'Aarav Sharma',
          email: 'aarav.sharma@iitd.ac.in',
          engineeringGraduationCourse: 'Mechanical Engineering',
          courseStatus: '4th Year',
          passwordHash,
          role: 'candidate',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };
      candidateRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const dto = new LoginCandidateDto({
        email: 'aarav.sharma@iitd.ac.in',
        password: 'Password123',
      });

      const result = await service.login(dto);

      expect(result.success).toBe(true);
      expect(result.token).toBe('mock-jwt-token-12345');
      expect(result.candidate.email).toBe('aarav.sharma@iitd.ac.in');
    });

    it('should throw UnauthorizedException if candidate not found', async () => {
      const mockQueryBuilder = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };
      candidateRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const dto = new LoginCandidateDto({
        email: 'unknown@example.com',
        password: 'Password123',
      });

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      const passwordHash = await bcrypt.hash('CorrectPassword', 10);
      const mockQueryBuilder = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({
          id: 'cand-101',
          email: 'aarav.sharma@iitd.ac.in',
          passwordHash,
        }),
      };
      candidateRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const dto = new LoginCandidateDto({
        email: 'aarav.sharma@iitd.ac.in',
        password: 'WrongPassword',
      });

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
