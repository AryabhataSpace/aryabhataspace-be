import { CreateUserAddressDto } from './create-address.dto';
import { DegreeLevel } from '../entities/candidate-profile.entity';

export class RegisterCandidateUserDto {
  email: string;
  password?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  engineeringGraduationCourse: string;
  courseStatus: string;
  institution?: string;
  graduationYear?: number;
  degreeLevel?: DegreeLevel;
  skills?: string[];
  bio?: string;
  address?: CreateUserAddressDto;
}

export class CreateAdminUserDto {
  email: string;
  password?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  department: string;
  designation: string;
  employeeCode?: string;
}
