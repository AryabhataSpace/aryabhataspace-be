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
import { AuditLogsModule } from './audit-logs/audit-logs.module';

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
          autoLoadEntities: true,
          synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
          logging: config.get<string>('DB_LOGGING', 'true') === 'true',
        };
      },
    }),
    DocumentsModule,
    PostsModule,
    ProjectsModule,
    NavigationModule,
    CandidatesModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
