import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ProjectsService, Project } from './projects.service';

@Controller('api/v1/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects(
    @Query('category') category?: string,
    @Query('branch') branch?: string,
    @Query('search') search?: string,
  ) {
    return this.projectsService.findAll(category, branch, search);
  }

  @Get(':slug')
  getProjectBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }
}

@Controller('api/v1/admin/projects')
export class AdminProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAdminProjects() {
    return this.projectsService.findAll();
  }

  @Post()
  createProject(@Body() dto: Partial<Project>) {
    return this.projectsService.create(dto);
  }

  @Put(':id')
  updateProject(@Param('id') id: string, @Body() dto: Partial<Project>) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
