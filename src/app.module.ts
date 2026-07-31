import { Module } from '@nestjs/common';
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
