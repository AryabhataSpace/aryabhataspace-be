import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('candidates')
export class CandidateEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  engineeringGraduationCourse: string;

  @Column({ nullable: true })
  engineeringBranch: string;

  @Column({ nullable: true })
  courseStatus: string;

  @Column({ nullable: true })
  institution: string;

  @Column({ nullable: true })
  graduationYear: number;

  @Column({ nullable: true })
  degreeLevel: string;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  portfolioUrl: string;

  @Column({ default: 'India' })
  location: string;

  @Column({ default: 70 })
  profileCompletionPercentage: number;

  @Column({ default: false })
  verified: boolean;

  @Column('jsonb', { nullable: true, default: [] })
  documents: { id: string; name: string; type: string; uploadedAt: string }[];

  @Column('jsonb', { nullable: true, default: [] })
  experience: { role: string; organization: string; duration: string; description: string }[];

  @Column('jsonb', { nullable: true, default: [] })
  education: { degree: string; fieldOfStudy: string; institution: string; startYear: number; endYear: number }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
