import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserAddressEntity } from './user-address.entity';
import { UserRefreshTokenEntity } from './user-refresh-token.entity';
import { CandidateProfileEntity } from './candidate-profile.entity';
import { AdminProfileEntity } from './admin-profile.entity';

export type UserStatus = 'pending' | 'active' | 'suspended' | 'archived';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255, nullable: true })
  passwordHash?: string;

  @Index()
  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 30, default: 'active' })
  status: UserStatus;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @Column({ name: 'is_phone_verified', default: false })
  isPhoneVerified: boolean;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt?: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true, eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @OneToMany(() => UserAddressEntity, (address) => address.user, { cascade: true })
  addresses: UserAddressEntity[];

  @OneToMany(() => UserRefreshTokenEntity, (token) => token.user, { cascade: true })
  refreshTokens: UserRefreshTokenEntity[];

  @OneToOne(() => CandidateProfileEntity, (cand) => cand.user, { cascade: true })
  candidateProfile?: CandidateProfileEntity;

  @OneToOne(() => AdminProfileEntity, (admin) => admin.user, { cascade: true })
  adminProfile?: AdminProfileEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
