import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CandidateProfileEntity } from './candidate-profile.entity';

@Entity('candidate_educations')
export class CandidateEducationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'candidate_profile_id' })
  candidateProfileId: string;

  @ManyToOne(() => CandidateProfileEntity, (profile) => profile.educations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_profile_id' })
  candidateProfile: CandidateProfileEntity;

  @Column({ length: 255 })
  institution: string;

  @Column({ length: 150 })
  degree: string;

  @Column({ name: 'field_of_study', length: 150 })
  fieldOfStudy: string;

  @Column({ name: 'start_year', type: 'int' })
  startYear: number;

  @Column({ name: 'end_year', type: 'int', nullable: true })
  endYear?: number;

  @Column({ name: 'grade_or_cgpa', length: 20, nullable: true })
  gradeOrCgpa?: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
