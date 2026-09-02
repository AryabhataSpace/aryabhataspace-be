import { CourseStatus, CandidateStatus, CandidateRole, DegreeLevel } from '../utils/candidate.types';
import { RegisterCandidateDto } from '../../auth/dto/register.dto';
import type { CandidateEntity } from '../entities/candidate.entity';

export interface CandidateDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export interface CandidateExperience {
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface CandidateEducation {
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startYear: number;
  endYear: number;
}

export interface CandidateProps {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  email: string;
  pincode?: string;
  phone?: string;
  engineeringGraduationCourse: string;
  engineeringBranch: string;
  courseStatus: CourseStatus;
  institution?: string;
  graduationYear?: number;
  degreeLevel?: DegreeLevel;
  skills?: string[];
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  location?: string;
  profileCompletionPercentage?: number;
  verified?: boolean;
  emailVerifiedAt?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiresAt?: Date;
  passwordResetToken?: string;
  passwordResetExpiresAt?: Date;
  role?: CandidateRole;
  status?: CandidateStatus;
  documents?: CandidateDocument[];
  experience?: CandidateExperience[];
  education?: CandidateEducation[];
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Candidate {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly email: string;
  readonly pincode: string;
  readonly phone: string;
  readonly engineeringGraduationCourse: string;
  readonly engineeringBranch: string;
  readonly courseStatus: CourseStatus;
  readonly institution: string;
  readonly graduationYear?: number;
  readonly degreeLevel?: DegreeLevel;
  readonly skills: string[];
  readonly bio: string;
  readonly githubUrl?: string;
  readonly linkedinUrl?: string;
  readonly portfolioUrl?: string;
  readonly location: string;
  readonly profileCompletionPercentage: number;
  readonly verified: boolean;
  readonly emailVerifiedAt?: Date;
  readonly emailVerificationToken?: string;
  readonly emailVerificationExpiresAt?: Date;
  readonly passwordResetToken?: string;
  readonly passwordResetExpiresAt?: Date;
  readonly role: CandidateRole;
  readonly status: CandidateStatus;
  readonly documents: CandidateDocument[];
  readonly experience: CandidateExperience[];
  readonly education: CandidateEducation[];
  readonly passwordHash?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: CandidateProps) {
    this.id = props.id;
    this.firstName = props.firstName || '';
    this.lastName = props.lastName || '';
    this.fullName = props.fullName || `${this.firstName} ${this.lastName}`.trim();
    this.email = props.email.toLowerCase().trim();
    this.pincode = props.pincode || '';
    this.phone = props.phone || '';
    this.engineeringGraduationCourse = props.engineeringGraduationCourse;
    this.engineeringBranch = props.engineeringBranch || props.engineeringGraduationCourse;
    this.courseStatus = props.courseStatus;
    this.institution = props.institution || 'Registered Engineering Candidate';
    this.graduationYear = props.graduationYear;
    this.degreeLevel = props.degreeLevel;
    this.skills = props.skills ? [...props.skills] : [props.engineeringGraduationCourse];
    this.bio = props.bio || `Engineering candidate specialized in ${props.engineeringGraduationCourse} (${props.courseStatus}).`;
    this.githubUrl = props.githubUrl;
    this.linkedinUrl = props.linkedinUrl;
    this.portfolioUrl = props.portfolioUrl;
    this.location = props.location || (props.pincode ? `India (PIN: ${props.pincode})` : 'India');
    this.profileCompletionPercentage = props.profileCompletionPercentage ?? 70;
    this.verified = props.verified ?? false;
    this.emailVerifiedAt = props.emailVerifiedAt;
    this.emailVerificationToken = props.emailVerificationToken;
    this.emailVerificationExpiresAt = props.emailVerificationExpiresAt;
    this.passwordResetToken = props.passwordResetToken;
    this.passwordResetExpiresAt = props.passwordResetExpiresAt;
    this.role = props.role || 'candidate';
    this.status = props.status || 'pending';
    this.documents = props.documents ? [...props.documents] : [];
    this.experience = props.experience ? [...props.experience] : [];
    this.education = props.education ? [...props.education] : [];
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  static createFromRegistration(
    dto: RegisterCandidateDto,
    passwordHash: string,
    emailVerificationToken?: string,
    emailVerificationExpiresAt?: Date,
  ): Candidate {
    const id = `cand-${Date.now()}`;
    const fullName = `${dto.firstName} ${dto.lastName}`.trim();
    return new Candidate({
      id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fullName,
      email: dto.email,
      pincode: dto.pincode,
      engineeringGraduationCourse: dto.engineeringGraduationCourse,
      engineeringBranch: dto.engineeringGraduationCourse,
      courseStatus: dto.courseStatus,
      location: `India (PIN: ${dto.pincode})`,
      skills: [dto.engineeringGraduationCourse, 'Space Systems Engineering'],
      profileCompletionPercentage: 75,
      verified: false,
      emailVerificationToken,
      emailVerificationExpiresAt,
      role: 'candidate',
      status: 'pending',
      passwordHash,
      documents: [],
      experience: [],
      education: [],
    });
  }

  static fromEntity(entity: CandidateEntity): Candidate {
    return new Candidate({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      fullName: entity.fullName,
      email: entity.email,
      pincode: entity.pincode,
      phone: entity.phone,
      engineeringGraduationCourse: entity.engineeringGraduationCourse,
      engineeringBranch: entity.engineeringBranch,
      courseStatus: entity.courseStatus as CourseStatus,
      institution: entity.institution,
      graduationYear: entity.graduationYear,
      degreeLevel: entity.degreeLevel as DegreeLevel,
      skills: entity.skills,
      bio: entity.bio,
      githubUrl: entity.githubUrl,
      linkedinUrl: entity.linkedinUrl,
      portfolioUrl: entity.portfolioUrl,
      location: entity.location,
      profileCompletionPercentage: entity.profileCompletionPercentage,
      verified: entity.verified,
      emailVerifiedAt: entity.emailVerifiedAt,
      emailVerificationToken: entity.emailVerificationToken,
      emailVerificationExpiresAt: entity.emailVerificationExpiresAt,
      passwordResetToken: entity.passwordResetToken,
      passwordResetExpiresAt: entity.passwordResetExpiresAt,
      role: (entity.role || 'candidate') as CandidateRole,
      status: (entity.status || 'active') as CandidateStatus,
      documents: entity.documents,
      experience: entity.experience,
      education: entity.education,
      passwordHash: entity.passwordHash,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static copy(existing: Candidate, overrides?: Partial<CandidateProps>): Candidate {
    return new Candidate({
      id: existing.id,
      firstName: existing.firstName,
      lastName: existing.lastName,
      fullName: existing.fullName,
      email: existing.email,
      pincode: existing.pincode,
      phone: existing.phone,
      engineeringGraduationCourse: existing.engineeringGraduationCourse,
      engineeringBranch: existing.engineeringBranch,
      courseStatus: existing.courseStatus,
      institution: existing.institution,
      graduationYear: existing.graduationYear,
      degreeLevel: existing.degreeLevel,
      skills: existing.skills,
      bio: existing.bio,
      githubUrl: existing.githubUrl,
      linkedinUrl: existing.linkedinUrl,
      portfolioUrl: existing.portfolioUrl,
      location: existing.location,
      profileCompletionPercentage: existing.profileCompletionPercentage,
      verified: existing.verified,
      emailVerifiedAt: existing.emailVerifiedAt,
      emailVerificationToken: existing.emailVerificationToken,
      emailVerificationExpiresAt: existing.emailVerificationExpiresAt,
      passwordResetToken: existing.passwordResetToken,
      passwordResetExpiresAt: existing.passwordResetExpiresAt,
      role: existing.role,
      status: existing.status,
      documents: existing.documents,
      experience: existing.experience,
      education: existing.education,
      passwordHash: existing.passwordHash,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
      ...overrides,
    });
  }

  toSanitizedJson(): Omit<
    CandidateProps,
    'passwordHash' | 'emailVerificationToken' | 'passwordResetToken'
  > {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      email: this.email,
      pincode: this.pincode,
      phone: this.phone,
      engineeringGraduationCourse: this.engineeringGraduationCourse,
      engineeringBranch: this.engineeringBranch,
      courseStatus: this.courseStatus,
      institution: this.institution,
      graduationYear: this.graduationYear,
      degreeLevel: this.degreeLevel,
      skills: this.skills,
      bio: this.bio,
      githubUrl: this.githubUrl,
      linkedinUrl: this.linkedinUrl,
      portfolioUrl: this.portfolioUrl,
      location: this.location,
      profileCompletionPercentage: this.profileCompletionPercentage,
      verified: this.verified,
      emailVerifiedAt: this.emailVerifiedAt,
      role: this.role,
      status: this.status,
      documents: this.documents,
      experience: this.experience,
      education: this.education,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
