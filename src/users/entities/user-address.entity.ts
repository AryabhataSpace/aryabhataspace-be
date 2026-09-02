import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity } from './user.entity';

export type AddressType = 'current' | 'permanent' | 'institution' | 'office';

@Entity('user_addresses')
@Index(['state', 'district'])
@Index(['pincode'])
@Index(['latitude', 'longitude'])
export class UserAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'address_type', length: 30, default: 'current' })
  addressType: AddressType;

  @Column({ name: 'is_primary', default: true })
  isPrimary: boolean;

  @Column({ name: 'door_no', length: 50 })
  doorNo: string;

  @Column({ length: 255 })
  street: string;

  @Index()
  @Column({ length: 100 })
  district: string;

  @Index()
  @Column({ length: 100 })
  state: string;

  @Index()
  @Column({ length: 100, default: 'India' })
  country: string;

  @Index()
  @Column({ length: 10 })
  pincode: string;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
