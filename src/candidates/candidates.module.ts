import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminCandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import { CandidateEntity } from './entities/candidate.entity';
import { ProjectApplicationEntity } from './entities/project-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateEntity, ProjectApplicationEntity])],
  controllers: [AdminCandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService],
})
export class CandidatesModule {}
