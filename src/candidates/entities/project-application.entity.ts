import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import type { ProjectApplication } from '../models/project-application.model';

@Entity('project_applications')
export class ProjectApplicationEntity {
  @PrimaryColumn()
  id: string;

  @Index('IDX_project_apps_project_id')
  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'project_title' })
  projectTitle: string;

  @Index('IDX_project_apps_candidate_id')
  @Column({ name: 'candidate_id' })
  candidateId: string;

  @Column({ name: 'candidate_name', nullable: true })
  candidateName: string;

  @Column({ name: 'candidate_branch', nullable: true })
  candidateBranch: string;

  @Index('IDX_project_apps_status')
  @Column({ default: 'submitted' })
  status: string;

  @CreateDateColumn({ name: 'applied_at' })
  appliedAt: Date;

  @Column({ name: 'cover_note', type: 'text', nullable: true })
  coverNote: string;

  @Column({ name: 'admin_notes', type: 'text', nullable: true })
  adminNotes: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static fromModel(model: ProjectApplication): ProjectApplicationEntity {
    const entity = new ProjectApplicationEntity();
    entity.id = model.id;
    entity.projectId = model.projectId;
    entity.projectTitle = model.projectTitle;
    entity.candidateId = model.candidateId;
    entity.candidateName = model.candidateName as string;
    entity.candidateBranch = model.candidateBranch as string;
    entity.status = model.status;
    entity.appliedAt = model.appliedAt;
    entity.coverNote = model.coverNote as string;
    entity.adminNotes = model.adminNotes as string;
    entity.updatedAt = model.updatedAt;
    return entity;
  }
}
