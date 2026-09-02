import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CandidateEntity } from '../candidates/entities/candidate.entity';
import { Candidate } from '../candidates/models/candidate.model';
import { RegisterCandidateDto } from './dto/register.dto';
import { LoginCandidateDto } from './dto/login.dto';
import { AuthResponse } from './models/auth-response.model';
import { JwtPayload } from './utils/auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(CandidateEntity)
    private readonly candidateRepo: Repository<CandidateEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterCandidateDto): Promise<AuthResponse> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    // Check if candidate with email already exists
    const existing = await this.candidateRepo.findOne({
      where: { email: normalizedEmail },
      withDeleted: true,
    });

    if (existing) {
      throw new ConflictException(
        `An account with email '${normalizedEmail}' already exists. Please log in or use another email.`,
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // Create Candidate domain class instance
    const candidateModel = Candidate.createFromRegistration(dto, passwordHash);

    // Map to TypeORM entity using class method
    const candidateEntity = CandidateEntity.fromModel(candidateModel);

    // Persist to PostgreSQL
    const savedEntity = await this.candidateRepo.save(candidateEntity);
    this.logger.log(`Candidate registered successfully with ID: ${savedEntity.id} (${savedEntity.email})`);

    // Reconstruct domain model from persisted entity
    const persistedCandidate = Candidate.fromEntity(savedEntity);

    // Generate JWT token
    const token = this.generateToken(persistedCandidate);

    return AuthResponse.create(
      persistedCandidate,
      token,
      'Candidate registration completed successfully.',
    );
  }

  async login(dto: LoginCandidateDto): Promise<AuthResponse> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    // Find candidate including passwordHash
    const entity = await this.candidateRepo
      .createQueryBuilder('candidate')
      .addSelect('candidate.passwordHash')
      .where('LOWER(candidate.email) = :email', { email: normalizedEmail })
      .getOne();

    if (!entity || !entity.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(dto.password, entity.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const candidateModel = Candidate.fromEntity(entity);
    const token = this.generateToken(candidateModel);

    this.logger.log(`Candidate login successful for: ${candidateModel.id} (${candidateModel.email})`);

    return AuthResponse.create(
      candidateModel,
      token,
      'Candidate authentication successful.',
    );
  }

  async getCandidateProfile(candidateId: string): Promise<Candidate> {
    const entity = await this.candidateRepo.findOne({
      where: { id: candidateId },
    });

    if (!entity) {
      throw new NotFoundException(`Candidate with ID '${candidateId}' not found.`);
    }

    return Candidate.fromEntity(entity);
  }

  private generateToken(candidate: Candidate): string {
    const payload: JwtPayload = {
      sub: candidate.id,
      email: candidate.email,
      fullName: candidate.fullName,
      role: candidate.role,
    };

    return this.jwtService.sign(payload);
  }
}
