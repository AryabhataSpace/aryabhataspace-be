import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import type { Candidate } from '../models/candidate.model';

@Entity('candidates')
export class CandidateEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Index('IDX_candidates_email', { unique: true })
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ nullable: true })
  phone: string;

  @Index('IDX_candidates_engineering_course')
  @Column({ name: 'engineering_graduation_course', nullable: true })
  engineeringGraduationCourse: string;

  @Column({ name: 'engineering_branch', nullable: true })
  engineeringBranch: string;

  @Index('IDX_candidates_course_status')
  @Column({ name: 'course_status', nullable: true })
  courseStatus: string;

  @Column({ nullable: true })
  institution: string;

  @Column({ name: 'graduation_year', nullable: true })
  graduationYear: number;

  @Column({ name: 'degree_level', nullable: true })
  degreeLevel: string;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'github_url', nullable: true })
  githubUrl: string;

  @Column({ name: 'linkedin_url', nullable: true })
  linkedinUrl: string;

  @Column({ name: 'portfolio_url', nullable: true })
  portfolioUrl: string;

  @Column({ default: 'India' })
  location: string;

  @Column({ name: 'profile_completion_percentage', default: 70 })
  profileCompletionPercentage: number;

  @Column({ default: false })
  verified: boolean;

  @Column({ name: 'password_hash', select: false, nullable: true })
  passwordHash?: string;

  @Column({ default: 'candidate' })
  role: string;

  @Column({ default: 'active' })
  status: string;

  @Column('jsonb', { nullable: true, default: [] })
  documents: { id: string; name: string; type: string; uploadedAt: string }[];

  @Column('jsonb', { nullable: true, default: [] })
  experience: { role: string; organization: string; duration: string; description: string }[];

  @Column('jsonb', { nullable: true, default: [] })
  education: { degree: string; fieldOfStudy: string; institution: string; startYear: number; endYear: number }[];

  @Index('IDX_candidates_created_at')
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  static fromModel(model: Candidate): CandidateEntity {
    const entity = new CandidateEntity();
    entity.id = model.id;
    entity.firstName = model.firstName;
    entity.lastName = model.lastName;
    entity.fullName = model.fullName;
    entity.email = model.email;
    entity.pincode = model.pincode;
    entity.phone = model.phone;
    entity.engineeringGraduationCourse = model.engineeringGraduationCourse;
    entity.engineeringBranch = model.engineeringBranch;
    entity.courseStatus = model.courseStatus;
    entity.institution = model.institution;
    entity.graduationYear = model.graduationYear as number;
    entity.degreeLevel = model.degreeLevel as string;
    entity.skills = model.skills;
    entity.bio = model.bio;
    entity.githubUrl = model.githubUrl as string;
    entity.linkedinUrl = model.linkedinUrl as string;
    entity.portfolioUrl = model.portfolioUrl as string;
    entity.location = model.location;
    entity.profileCompletionPercentage = model.profileCompletionPercentage;
    entity.verified = model.verified;
    entity.passwordHash = model.passwordHash;
    entity.role = model.role;
    entity.status = model.status;
    entity.documents = model.documents;
    entity.experience = model.experience;
    entity.education = model.education;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    return entity;
  }
}
