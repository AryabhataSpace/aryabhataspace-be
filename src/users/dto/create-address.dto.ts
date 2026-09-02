import { AddressType } from '../entities/user-address.entity';

export class CreateUserAddressDto {
  addressType?: AddressType;
  isPrimary?: boolean;
  doorNo: string;
  street: string;
  district: string;
  state: string;
  country?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
}
