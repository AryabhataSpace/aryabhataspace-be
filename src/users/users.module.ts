import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { UserAddressEntity } from './entities/user-address.entity';
import { UserRefreshTokenEntity } from './entities/user-refresh-token.entity';
import { CandidateProfileEntity } from './entities/candidate-profile.entity';
import { AdminProfileEntity } from './entities/admin-profile.entity';
import { CandidateEducationEntity } from './entities/candidate-education.entity';
import { CandidateExperienceEntity } from './entities/candidate-experience.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      PermissionEntity,
      UserAddressEntity,
      UserRefreshTokenEntity,
      CandidateProfileEntity,
      AdminProfileEntity,
      CandidateEducationEntity,
      CandidateExperienceEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
