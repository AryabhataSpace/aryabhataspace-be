import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CandidateEducationEntity } from './candidate-education.entity';
import { CandidateExperienceEntity } from './candidate-experience.entity';

export type DegreeLevel = 'Bachelor' | 'Master' | 'PhD' | 'Diploma';

@Entity('candidate_profiles')
export class CandidateProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.candidateProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ name: 'full_name', length: 200 })
  fullName: string;

  @Index()
  @Column({ name: 'engineering_graduation_course', length: 150 })
  engineeringGraduationCourse: string;

  @Column({ name: 'engineering_branch', length: 150, nullable: true })
  engineeringBranch?: string;

  @Index()
  @Column({ name: 'course_status', length: 50 })
  courseStatus: string;

  @Index()
  @Column({ length: 255, nullable: true })
  institution?: string;

  @Column({ name: 'graduation_year', type: 'int', nullable: true })
  graduationYear?: number;

  @Column({ name: 'degree_level', length: 50, nullable: true })
  degreeLevel?: DegreeLevel;

  @Column('simple-array', { nullable: true, default: '' })
  skills: string[];

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'github_url', length: 255, nullable: true })
  githubUrl?: string;

  @Column({ name: 'linkedin_url', length: 255, nullable: true })
  linkedinUrl?: string;

  @Column({ name: 'portfolio_url', length: 255, nullable: true })
  portfolioUrl?: string;

  @Column({ name: 'profile_completion_percentage', type: 'int', default: 70 })
  profileCompletionPercentage: number;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'verified_at', type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  @Column('uuid', { name: 'verified_by', nullable: true })
  verifiedBy?: string;

  @OneToMany(() => CandidateEducationEntity, (edu) => edu.candidateProfile, { cascade: true })
  educations: CandidateEducationEntity[];

  @OneToMany(() => CandidateExperienceEntity, (exp) => exp.candidateProfile, { cascade: true })
  experiences: CandidateExperienceEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
