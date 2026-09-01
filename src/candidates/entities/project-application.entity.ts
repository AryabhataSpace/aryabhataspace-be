import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('project_applications')
export class ProjectApplicationEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  projectId: string;

  @Column()
  projectTitle: string;

  @Column()
  candidateId: string;

  @Column({ nullable: true })
  candidateName: string;

  @Column({ nullable: true })
  candidateBranch: string;

  @Column({ default: 'submitted' })
  status: string;

  @CreateDateColumn()
  appliedAt: Date;

  @Column({ type: 'text', nullable: true })
  coverNote: string;

  @Column({ type: 'text', nullable: true })
  adminNotes: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
