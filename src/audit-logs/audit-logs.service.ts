import { Injectable } from '@nestjs/common';

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    email: string;
    role: string;
  };
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'STATUS_CHANGE' | 'LOGIN' | 'EXPORT';
  category: 'PAGES' | 'PROJECTS' | 'NAVIGATION' | 'CANDIDATES' | 'POSTS' | 'SITE_SETTINGS' | 'SECURITY';
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent?: string;
  details: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditLogsService {
  private logs: AuditLog[] = [
    {
      id: 'log-1001',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      actor: { name: 'Admin Administrator', email: 'admin@aryabhataspace.in', role: 'Super Admin' },
      action: 'UPDATE',
      category: 'PROJECTS',
      resource: 'CubeSat Attitude Control (proj-1)',
      resourceId: 'proj-1',
      ipAddress: '103.21.124.8',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Updated project application deadline and mentor designation.',
      metadata: { fieldUpdated: 'applicationDeadline', newValue: '2026-08-30' },
    },
    {
      id: 'log-1002',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      actor: { name: 'Admin Administrator', email: 'admin@aryabhataspace.in', role: 'Super Admin' },
      action: 'STATUS_CHANGE',
      category: 'CANDIDATES',
      resource: 'Project Application app-501 (Priya Venkatesh)',
      resourceId: 'app-501',
      ipAddress: '103.21.124.8',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Changed application status from "under-review" to "shortlisted". Added review notes.',
      metadata: { previousStatus: 'under-review', newStatus: 'shortlisted' },
    },
    {
      id: 'log-1003',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      actor: { name: 'Admin Administrator', email: 'admin@aryabhataspace.in', role: 'Super Admin' },
      action: 'UPDATE',
      category: 'NAVIGATION',
      resource: 'Header & Footer Navigation Menu',
      ipAddress: '103.21.124.8',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Reordered header menu items and updated navigation fragment links.',
    },
    {
      id: 'log-1004',
      timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      actor: { name: 'Admin Administrator', email: 'admin@aryabhataspace.in', role: 'Super Admin' },
      action: 'PUBLISH',
      category: 'PAGES',
      resource: 'Home Page (page-home)',
      resourceId: 'page-home',
      ipAddress: '103.21.124.8',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Published CMS Home page version v1.4 with updated eligibility banner.',
    },
    {
      id: 'log-1005',
      timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      actor: { name: 'Admin Administrator', email: 'admin@aryabhataspace.in', role: 'Super Admin' },
      action: 'LOGIN',
      category: 'SECURITY',
      resource: 'Admin Portal Authenticator',
      ipAddress: '103.21.124.8',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Successful administrator JWT authentication session initialized.',
    },
  ];

  findAll(category?: string, action?: string, search?: string): AuditLog[] {
    let list = [...this.logs];
    if (category) {
      list = list.filter((l) => l.category === category);
    }
    if (action) {
      list = list.filter((l) => l.action === action);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.actor.email.toLowerCase().includes(q) ||
          l.resource.toLowerCase().includes(q) ||
          l.details.toLowerCase().includes(q) ||
          l.ipAddress.includes(q),
      );
    }
    return list;
  }

  logEvent(dto: Partial<AuditLog>): AuditLog {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: dto.actor || { name: 'Admin Administrator', email: 'admin@aryabhataspace.in', role: 'Super Admin' },
      action: dto.action || 'UPDATE',
      category: dto.category || 'SITE_SETTINGS',
      resource: dto.resource || 'System Resource',
      resourceId: dto.resourceId,
      ipAddress: dto.ipAddress || '127.0.0.1',
      userAgent: dto.userAgent,
      details: dto.details || 'System event recorded.',
      metadata: dto.metadata,
    };
    this.logs.unshift(newLog);
    return newLog;
  }
}
