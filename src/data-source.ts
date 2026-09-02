import { DataSource } from 'typeorm';
import { CandidateEntity } from './candidates/entities/candidate.entity';
import { ProjectApplicationEntity } from './candidates/entities/project-application.entity';
import { InitialMigration1725270000000 } from './migrations/1725270000000-InitialMigration';

// Load .env if present
try {
  process.loadEnvFile?.();
} catch {
  // Ignored
}

const databaseUrl =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/aryabhataspace_db';

const useSsl =
  process.env.DB_SSL === 'true' ||
  databaseUrl.includes('sslmode=require');

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
  entities: [CandidateEntity, ProjectApplicationEntity],
  migrations: [InitialMigration1725270000000],
  migrationsRun: false,
});
