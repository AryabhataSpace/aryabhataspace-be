import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AuditLogsService, AuditLog } from './audit-logs.service';

@Controller('api/v1/admin/audit-logs')
export class AdminAuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  getLogs(
    @Query('category') category?: string,
    @Query('action') action?: string,
    @Query('search') search?: string,
  ) {
    return this.auditLogsService.findAll(category, action, search);
  }

  @Post()
  createLog(@Body() dto: Partial<AuditLog>) {
    return this.auditLogsService.logEvent(dto);
  }
}
