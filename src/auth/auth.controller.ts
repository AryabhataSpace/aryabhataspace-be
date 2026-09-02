import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  RegisterCandidateSchema,
  RegisterCandidateDto,
} from './dto/register.dto';
import {
  LoginCandidateSchema,
  LoginCandidateDto,
} from './dto/login.dto';
import { AuthResponse } from './models/auth-response.model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './utils/auth.types';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterCandidateSchema))
  async register(@Body() payload: RegisterCandidateDto): Promise<AuthResponse> {
    const dto = RegisterCandidateDto.fromPayload(payload);
    return await this.authService.register(dto);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginCandidateSchema))
  async login(@Body() payload: LoginCandidateDto): Promise<AuthResponse> {
    const dto = LoginCandidateDto.fromPayload(payload);
    return await this.authService.login(dto);
  }

  @Get('me')
  async getProfile(@Headers('authorization') authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or malformed.');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      const candidate = await this.authService.getCandidateProfile(payload.sub);
      return {
        success: true,
        candidate: candidate.toSanitizedJson(),
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
