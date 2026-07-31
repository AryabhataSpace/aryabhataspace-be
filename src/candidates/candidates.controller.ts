import { Controller, Get, Put, Param, Query, Body } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('api/v1/admin/membership-applications')
export class AdminCandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get('candidates')
  getCandidates(
    @Query('branch') branch?: string,
    @Query('search') search?: string,
  ) {
    return this.candidatesService.getCandidates(branch, search);
  }

  @Get('candidates/:id')
  getCandidateById(@Param('id') id: string) {
    return this.candidatesService.getCandidateById(id);
  }

  @Put('candidates/:id/verify')
  verifyCandidate(@Param('id') id: string, @Body('verified') verified: boolean) {
    return this.candidatesService.verifyCandidate(id, verified);
  }

  @Get()
  getApplications(
    @Query('status') status?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.candidatesService.getApplications(status, projectId);
  }

  @Put(':id/status')
  updateApplicationStatus(
    @Param('id') id: string,
    @Body() dto: { status: 'submitted' | 'under-review' | 'shortlisted' | 'accepted' | 'declined'; adminNotes?: string },
  ) {
    return this.candidatesService.updateApplicationStatus(id, dto.status, dto.adminNotes);
  }
}
