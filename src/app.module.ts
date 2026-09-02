import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './documents/documents.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { NavigationModule } from './navigation/navigation.module';
import { CandidatesModule } from './candidates/candidates.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { CandidateEntity } from './candidates/entities/candidate.entity';
import { ProjectApplicationEntity } from './candidates/entities/project-application.entity';
import { InitialMigration1725270000000 } from './migrations/1725270000000-InitialMigration';
import { AddEmailVerificationAndTokens1725280000000 } from './migrations/1725280000000-AddEmailVerificationAndTokens';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>(
          'DATABASE_URL',
          'postgresql://postgres:postgres@localhost:5432/aryabhataspace_db',
        );
        const dbSsl = config.get<string>('DB_SSL');
        const useSsl =
          dbSsl === 'true' ||
          (databaseUrl && databaseUrl.includes('sslmode=require'));

        return {
          type: 'postgres',
          url: databaseUrl,
          ssl: useSsl ? { rejectUnauthorized: false } : false,
          entities: [CandidateEntity, ProjectApplicationEntity],
          migrations: [
            InitialMigration1725270000000,
            AddEmailVerificationAndTokens1725280000000,
          ],
          // Explicitly set synchronize to false to ensure all schema updates go through migrations
          synchronize: false,
          // Run pending migrations automatically when connecting to database
          migrationsRun: config.get<string>('DB_MIGRATIONS_RUN', 'true') === 'true',
          logging: config.get<string>('DB_LOGGING', 'false') === 'true',
        };
      },
    }),
    AuthModule,
    MailModule,
    CandidatesModule,
    DocumentsModule,
    PostsModule,
    ProjectsModule,
    NavigationModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
