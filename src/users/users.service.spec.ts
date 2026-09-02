import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { CandidateProfileEntity } from './entities/candidate-profile.entity';
import { AdminProfileEntity } from './entities/admin-profile.entity';
import { UserAddressEntity } from './entities/user-address.entity';
import { CandidateEducationEntity } from './entities/candidate-education.entity';
import { CandidateExperienceEntity } from './entities/candidate-experience.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepo = () => ({
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((entity) => Promise.resolve({ id: 'uuid-123', ...entity })),
    count: jest.fn().mockResolvedValue(0),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(UserEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(RoleEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(PermissionEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(CandidateProfileEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(AdminProfileEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(UserAddressEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(CandidateEducationEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(CandidateExperienceEntity), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list permissions and roles', async () => {
    const perms = await service.getAllPermissions();
    expect(Array.isArray(perms)).toBe(true);

    const roles = await service.getAllRoles();
    expect(Array.isArray(roles)).toBe(true);
  });
});
