import { Controller, Get, Post, Put, Param, Query, Body, UsePipes } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { AuthService } from '../auth/auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  RegisterCandidateSchema,
  RegisterCandidateDto,
} from '../auth/dto/register.dto';
import { ApplicationStatus } from './utils/candidate.types';

@Controller('api/v1/admin/membership-applications')
export class AdminCandidatesController {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly authService: AuthService,
  ) {}

  @Get('candidates')
  async getCandidates(
    @Query('branch') branch?: string,
    @Query('search') search?: string,
  ) {
    const list = await this.candidatesService.getCandidates(branch, search);
    return list.map((c) => c.toSanitizedJson());
  }

  @Get('candidates/:id')
  async getCandidateById(@Param('id') id: string) {
    const candidate = await this.candidatesService.getCandidateById(id);
    return candidate.toSanitizedJson();
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterCandidateSchema))
  async registerCandidate(@Body() payload: RegisterCandidateDto) {
    const dto = RegisterCandidateDto.fromPayload(payload);
    return await this.authService.register(dto);
  }

  @Put('candidates/:id/verify')
  async verifyCandidate(@Param('id') id: string, @Body('verified') verified: boolean) {
    const candidate = await this.candidatesService.verifyCandidate(id, verified);
    return candidate.toSanitizedJson();
  }

  @Get()
  async getApplications(
    @Query('status') status?: string,
    @Query('projectId') projectId?: string,
  ) {
    return await this.candidatesService.getApplications(status, projectId);
  }

  @Put(':id/status')
  async updateApplicationStatus(
    @Param('id') id: string,
    @Body() dto: { status: ApplicationStatus; adminNotes?: string },
  ) {
    return await this.candidatesService.updateApplicationStatus(id, dto.status, dto.adminNotes);
  }
}

@Controller('api/v1/candidates')
export class PublicCandidatesController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterCandidateSchema))
  async register(@Body() payload: RegisterCandidateDto) {
    const dto = RegisterCandidateDto.fromPayload(payload);
    return await this.authService.register(dto);
  }
}
