import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { CandidateProfileEntity } from './entities/candidate-profile.entity';
import { AdminProfileEntity } from './entities/admin-profile.entity';
import { UserAddressEntity } from './entities/user-address.entity';
import { CandidateEducationEntity } from './entities/candidate-education.entity';
import { CandidateExperienceEntity } from './entities/candidate-experience.entity';
import { RegisterCandidateUserDto, CreateAdminUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    @InjectRepository(CandidateProfileEntity)
    private readonly candidateProfileRepo: Repository<CandidateProfileEntity>,
    @InjectRepository(AdminProfileEntity)
    private readonly adminProfileRepo: Repository<AdminProfileEntity>,
    @InjectRepository(UserAddressEntity)
    private readonly addressRepo: Repository<UserAddressEntity>,
    @InjectRepository(CandidateEducationEntity)
    private readonly educationRepo: Repository<CandidateEducationEntity>,
    @InjectRepository(CandidateExperienceEntity)
    private readonly experienceRepo: Repository<CandidateExperienceEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.seedPermissionsAndRoles();
    } catch (err: any) {
      this.logger.warn(`UsersService seed note: ${err.message}`);
    }
  }

  private async seedPermissionsAndRoles(): Promise<void> {
    const defaultPermissions = [
      // Auth & User Management
      { code: 'users:read', module: 'users', name: 'View Users', description: 'Read user accounts' },
      { code: 'users:manage_roles', module: 'users', name: 'Manage User Roles', description: 'Assign and revoke roles' },
      // Candidates
      { code: 'candidate:profile_manage_self', module: 'candidates', name: 'Manage Own Profile', description: 'Update self candidate profile' },
      { code: 'candidate:verify_profile', module: 'candidates', name: 'Verify Candidate', description: 'Approve & verify candidate profile' },
      { code: 'candidate:view_all', module: 'candidates', name: 'View All Candidates', description: 'Browse full candidate talent directory' },
      // Assessments
      { code: 'assessment:attempt', module: 'assessments', name: 'Attempt Assessment', description: 'Start and submit skill assessment' },
      { code: 'assessment:evaluate', module: 'assessments', name: 'Evaluate Assessment', description: 'Score candidate assessments' },
      // CMS
      { code: 'cms:edit_draft', module: 'cms', name: 'Edit CMS Drafts', description: 'Modify page content drafts' },
      { code: 'cms:publish', module: 'cms', name: 'Publish CMS Content', description: 'Publish stage-gated portal content' },
      // Audit
      { code: 'audit_logs:view', module: 'audit', name: 'View Audit Logs', description: 'Inspect system audit trail' },
    ];

    for (const p of defaultPermissions) {
      const exists = await this.permissionRepo.findOne({ where: { code: p.code } });
      if (!exists) {
        await this.permissionRepo.save(this.permissionRepo.create(p));
      }
    }

    const allPerms = await this.permissionRepo.find();
    const permMap = new Map(allPerms.map((p) => [p.code, p]));

    // 1. Role: Candidate
    let candidateRole = await this.roleRepo.findOne({ where: { code: 'candidate' } });
    if (!candidateRole) {
      candidateRole = this.roleRepo.create({
        code: 'candidate',
        name: 'Engineering Candidate',
        description: 'Candidate pursuing space engineering talent lifecycle & opportunities',
        isSystem: true,
        permissions: [
          permMap.get('candidate:profile_manage_self')!,
          permMap.get('assessment:attempt')!,
        ].filter(Boolean),
      });
      await this.roleRepo.save(candidateRole);
    }

    // 2. Role: Admin
    let adminRole = await this.roleRepo.findOne({ where: { code: 'admin' } });
    if (!adminRole) {
      adminRole = this.roleRepo.create({
        code: 'admin',
        name: 'Platform Administrator',
        description: 'Full administrative control over content, candidates, evaluations, and audit logs',
        isSystem: true,
        permissions: allPerms,
      });
      await this.roleRepo.save(adminRole);
    }

    this.logger.log('Initial Roles and Permissions initialized successfully.');
  }

  async registerCandidate(dto: RegisterCandidateUserDto): Promise<UserEntity> {
    const candidateRole = await this.roleRepo.findOne({ where: { code: 'candidate' } });
    const fullName = `${dto.firstName} ${dto.lastName}`.trim();

    const user = this.userRepo.create({
      email: dto.email.toLowerCase(),
      phone: dto.phone,
      passwordHash: dto.password, // In real auth, hash with bcrypt/argon2
      status: 'active',
      roles: candidateRole ? [candidateRole] : [],
    });

    const savedUser = await this.userRepo.save(user);

    const profile = this.candidateProfileRepo.create({
      userId: savedUser.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fullName: fullName,
      engineeringGraduationCourse: dto.engineeringGraduationCourse,
      engineeringBranch: dto.engineeringGraduationCourse,
      courseStatus: dto.courseStatus,
      institution: dto.institution || 'Registered Engineering Institution',
      graduationYear: dto.graduationYear || new Date().getFullYear(),
      degreeLevel: dto.degreeLevel || 'Bachelor',
      skills: dto.skills || [dto.engineeringGraduationCourse],
      bio: dto.bio,
      profileCompletionPercentage: 70,
      isVerified: false,
    });

    await this.candidateProfileRepo.save(profile);

    if (dto.address) {
      const address = this.addressRepo.create({
        userId: savedUser.id,
        addressType: dto.address.addressType || 'current',
        isPrimary: dto.address.isPrimary !== undefined ? dto.address.isPrimary : true,
        doorNo: dto.address.doorNo,
        street: dto.address.street,
        district: dto.address.district,
        state: dto.address.state,
        country: dto.address.country || 'India',
        pincode: dto.address.pincode,
        latitude: dto.address.latitude,
        longitude: dto.address.longitude,
      });
      await this.addressRepo.save(address);
    }

    return this.getUserById(savedUser.id);
  }

  async createAdmin(dto: CreateAdminUserDto): Promise<UserEntity> {
    const adminRole = await this.roleRepo.findOne({ where: { code: 'admin' } });
    const fullName = `${dto.firstName} ${dto.lastName}`.trim();

    const user = this.userRepo.create({
      email: dto.email.toLowerCase(),
      phone: dto.phone,
      passwordHash: dto.password,
      status: 'active',
      roles: adminRole ? [adminRole] : [],
    });

    const savedUser = await this.userRepo.save(user);

    const adminProfile = this.adminProfileRepo.create({
      userId: savedUser.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      fullName: fullName,
      department: dto.department,
      designation: dto.designation,
      employeeCode: dto.employeeCode,
    });

    await this.adminProfileRepo.save(adminProfile);

    return this.getUserById(savedUser.id);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: {
        roles: {
          permissions: true,
        },
        addresses: true,
        candidateProfile: {
          educations: true,
          experiences: true,
        },
        adminProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepo.find({
      relations: {
        roles: true,
        addresses: true,
        candidateProfile: true,
        adminProfile: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllRoles(): Promise<RoleEntity[]> {
    return this.roleRepo.find({
      relations: {
        permissions: true,
      },
      order: { name: 'ASC' },
    });
  }

  async getAllPermissions(): Promise<PermissionEntity[]> {
    return this.permissionRepo.find({
      order: { module: 'ASC', code: 'ASC' },
    });
  }
}
