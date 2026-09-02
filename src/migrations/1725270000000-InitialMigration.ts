import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class InitialMigration1725270000000 implements MigrationInterface {
  name = 'InitialMigration1725270000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create candidates table
    await queryRunner.createTable(
      new Table({
        name: 'candidates',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'pincode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'engineering_graduation_course',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'engineering_branch',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'course_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'institution',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'graduation_year',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'degree_level',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'skills',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'github_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'linkedin_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'portfolio_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            default: "'India'",
          },
          {
            name: 'profile_completion_percentage',
            type: 'int',
            default: 70,
          },
          {
            name: 'verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'password_hash',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            default: "'candidate'",
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'active'",
          },
          {
            name: 'documents',
            type: 'jsonb',
            isNullable: true,
            default: "'[]'::jsonb",
          },
          {
            name: 'experience',
            type: 'jsonb',
            isNullable: true,
            default: "'[]'::jsonb",
          },
          {
            name: 'education',
            type: 'jsonb',
            isNullable: true,
            default: "'[]'::jsonb",
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Indices for candidates table
    await queryRunner.createIndices('candidates', [
      new TableIndex({
        name: 'IDX_candidates_email',
        columnNames: ['email'],
        isUnique: true,
      }),
      new TableIndex({
        name: 'IDX_candidates_engineering_course',
        columnNames: ['engineering_graduation_course'],
      }),
      new TableIndex({
        name: 'IDX_candidates_course_status',
        columnNames: ['course_status'],
      }),
      new TableIndex({
        name: 'IDX_candidates_created_at',
        columnNames: ['created_at'],
      }),
    ]);

    // 2. Create project_applications table
    await queryRunner.createTable(
      new Table({
        name: 'project_applications',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'project_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'project_title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'candidate_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'candidate_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'candidate_branch',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'submitted'",
          },
          {
            name: 'applied_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'cover_note',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'admin_notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Indices for project_applications table
    await queryRunner.createIndices('project_applications', [
      new TableIndex({
        name: 'IDX_project_apps_project_id',
        columnNames: ['project_id'],
      }),
      new TableIndex({
        name: 'IDX_project_apps_candidate_id',
        columnNames: ['candidate_id'],
      }),
      new TableIndex({
        name: 'IDX_project_apps_status',
        columnNames: ['status'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_applications', true);
    await queryRunner.dropTable('candidates', true);
  }
}
