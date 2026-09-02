import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateEntity } from './entities/candidate.entity';
import { ProjectApplicationEntity } from './entities/project-application.entity';
import { CandidatesService } from './candidates.service';
import { AdminCandidatesController, PublicCandidatesController } from './candidates.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateEntity, ProjectApplicationEntity]),
    AuthModule,
  ],
  controllers: [AdminCandidatesController, PublicCandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}
