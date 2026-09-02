import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterCandidateUserDto, CreateAdminUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('roles')
  getRoles() {
    return this.usersService.getAllRoles();
  }

  @Get('permissions')
  getPermissions() {
    return this.usersService.getAllPermissions();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post('register/candidate')
  registerCandidate(@Body() dto: RegisterCandidateUserDto) {
    return this.usersService.registerCandidate(dto);
  }

  @Post('register/admin')
  registerAdmin(@Body() dto: CreateAdminUserDto) {
    return this.usersService.createAdmin(dto);
  }
}
