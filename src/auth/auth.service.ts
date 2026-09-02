import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { CandidateEntity } from '../candidates/entities/candidate.entity';
import { Candidate } from '../candidates/models/candidate.model';
import { RegisterCandidateDto } from './dto/register.dto';
import { LoginCandidateDto } from './dto/login.dto';
import { VerifyEmailDto, ResendVerificationDto } from './dto/verify-email.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password-reset.dto';
import { AuthResponse } from './models/auth-response.model';
import { JwtPayload } from './utils/auth.types';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(CandidateEntity)
    private readonly candidateRepo: Repository<CandidateEntity>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

    // Generate secure email verification token (24-hour expiration)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Create Candidate domain class instance (unverified by default)
    const candidateModel = Candidate.createFromRegistration(
      dto,
      passwordHash,
      verificationToken,
      verificationExpiresAt,
    );

    // Map to TypeORM entity using class method
    const candidateEntity = CandidateEntity.fromModel(candidateModel);

    // Persist to PostgreSQL
    const savedEntity = await this.candidateRepo.save(candidateEntity);
    this.logger.log(`Candidate registered with ID: ${savedEntity.id} (${savedEntity.email})`);

    // Dispatch verification email via Gmail (Nodemailer)
    await this.mailService.sendVerificationEmail(
      savedEntity.email,
      savedEntity.fullName,
      verificationToken,
    );

    const persistedCandidate = Candidate.fromEntity(savedEntity);

    return AuthResponse.createRegistrationNotice(
      persistedCandidate,
      `Registration successful! A verification email has been sent to ${savedEntity.email}. Please verify your email before logging in.`,
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

    // Check if candidate email is verified
    if (!entity.verified) {
      throw new ForbiddenException({
        statusCode: 403,
        error: 'Forbidden',
        message:
          'Your email address has not been verified yet. Please check your inbox or request a new verification email.',
        isUnverified: true,
        email: entity.email,
      });
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

  async verifyEmail(dto: VerifyEmailDto): Promise<AuthResponse> {
    const token = dto.token.trim();

    const entity = await this.candidateRepo.findOne({
      where: { emailVerificationToken: token },
    });

    if (!entity) {
      throw new BadRequestException('Verification link is invalid or has expired.');
    }

    if (
      entity.emailVerificationExpiresAt &&
      new Date(entity.emailVerificationExpiresAt) < new Date()
    ) {
      throw new BadRequestException(
        'Verification link has expired. Please request a new verification email.',
      );
    }

    // Activate candidate account
    entity.verified = true;
    entity.status = 'active';
    entity.emailVerifiedAt = new Date();
    entity.emailVerificationToken = undefined;
    entity.emailVerificationExpiresAt = undefined;

    const saved = await this.candidateRepo.save(entity);
    this.logger.log(`Email verified successfully for candidate: ${saved.id} (${saved.email})`);

    const candidateModel = Candidate.fromEntity(saved);
    const jwtToken = this.generateToken(candidateModel);

    return AuthResponse.create(
      candidateModel,
      jwtToken,
      'Your email has been verified successfully! Welcome to Aryabhata Space.',
    );
  }

  async resendVerification(dto: ResendVerificationDto): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    const entity = await this.candidateRepo.findOne({
      where: { email: normalizedEmail },
    });

    if (!entity) {
      // Return success to avoid email enumeration
      return {
        success: true,
        message: 'If an account exists with this email, a verification link has been sent.',
      };
    }

    if (entity.verified) {
      return {
        success: true,
        message: 'This email is already verified. You can log in directly.',
      };
    }

    const newToken = crypto.randomBytes(32).toString('hex');
    entity.emailVerificationToken = newToken;
    entity.emailVerificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.candidateRepo.save(entity);

    await this.mailService.sendVerificationEmail(entity.email, entity.fullName, newToken);

    return {
      success: true,
      message: `A new verification email has been sent to ${entity.email}. Please check your inbox.`,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ success: boolean; message: string }> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    const entity = await this.candidateRepo.findOne({
      where: { email: normalizedEmail },
    });

    if (entity) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      entity.passwordResetToken = resetToken;
      entity.passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1-hour expiration

      await this.candidateRepo.save(entity);

      await this.mailService.sendPasswordResetEmail(entity.email, entity.fullName, resetToken);
    }

    return {
      success: true,
      message:
        'If an account with that email exists, a password reset link has been sent to your inbox.',
    };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ success: boolean; message: string }> {
    const token = dto.token.trim();

    const entity = await this.candidateRepo.findOne({
      where: { passwordResetToken: token },
    });

    if (!entity) {
      throw new BadRequestException('Password reset link is invalid or has expired.');
    }

    if (entity.passwordResetExpiresAt && new Date(entity.passwordResetExpiresAt) < new Date()) {
      throw new BadRequestException(
        'Password reset link has expired. Please request a new password reset.',
      );
    }

    // Hash new password
    const saltRounds = 10;
    entity.passwordHash = await bcrypt.hash(dto.password, saltRounds);
    entity.passwordResetToken = undefined;
    entity.passwordResetExpiresAt = undefined;

    await this.candidateRepo.save(entity);
    this.logger.log(`Password reset completed for candidate: ${entity.id} (${entity.email})`);

    // Send security notification
    await this.mailService.sendPasswordChangedAlert(entity.email, entity.fullName);

    return {
      success: true,
      message: 'Your password has been reset successfully. You can now log in with your new password.',
    };
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
