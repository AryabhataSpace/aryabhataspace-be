import { ApplicationStatus } from '../utils/candidate.types';
import type { ProjectApplicationEntity } from '../entities/project-application.entity';

export interface ProjectApplicationProps {
  id: string;
  projectId: string;
  projectTitle: string;
  candidateId: string;
  candidateName?: string;
  candidateBranch?: string;
  status: ApplicationStatus;
  appliedAt: Date;
  coverNote?: string;
  adminNotes?: string;
  updatedAt?: Date;
}

export class ProjectApplication {
  readonly id: string;
  readonly projectId: string;
  readonly projectTitle: string;
  readonly candidateId: string;
  readonly candidateName?: string;
  readonly candidateBranch?: string;
  readonly status: ApplicationStatus;
  readonly appliedAt: Date;
  readonly coverNote?: string;
  readonly adminNotes?: string;
  readonly updatedAt: Date;

  constructor(props: ProjectApplicationProps) {
    this.id = props.id;
    this.projectId = props.projectId;
    this.projectTitle = props.projectTitle;
    this.candidateId = props.candidateId;
    this.candidateName = props.candidateName;
    this.candidateBranch = props.candidateBranch;
    this.status = props.status;
    this.appliedAt = props.appliedAt || new Date();
    this.coverNote = props.coverNote;
    this.adminNotes = props.adminNotes;
    this.updatedAt = props.updatedAt || new Date();
  }

  static fromEntity(entity: ProjectApplicationEntity): ProjectApplication {
    return new ProjectApplication({
      id: entity.id,
      projectId: entity.projectId,
      projectTitle: entity.projectTitle,
      candidateId: entity.candidateId,
      candidateName: entity.candidateName,
      candidateBranch: entity.candidateBranch,
      status: (entity.status || 'submitted') as ApplicationStatus,
      appliedAt: entity.appliedAt,
      coverNote: entity.coverNote,
      adminNotes: entity.adminNotes,
      updatedAt: entity.updatedAt,
    });
  }

  static copy(existing: ProjectApplication, overrides?: Partial<ProjectApplicationProps>): ProjectApplication {
    return new ProjectApplication({
      id: existing.id,
      projectId: existing.projectId,
      projectTitle: existing.projectTitle,
      candidateId: existing.candidateId,
      candidateName: existing.candidateName,
      candidateBranch: existing.candidateBranch,
      status: existing.status,
      appliedAt: existing.appliedAt,
      coverNote: existing.coverNote,
      adminNotes: existing.adminNotes,
      updatedAt: existing.updatedAt,
      ...overrides,
    });
  }
}
