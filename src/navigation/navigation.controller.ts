import { Controller, Get, Put, Body } from '@nestjs/common';
import { NavigationService, NavigationMenu } from './navigation.service';

@Controller('api/v1/navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  getNavigation() {
    return this.navigationService.getNavigation();
  }
}

@Controller('api/v1/admin/navigation')
export class AdminNavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  getAdminNavigation() {
    return this.navigationService.getNavigation();
  }

  @Put()
  updateNavigation(@Body() dto: Partial<NavigationMenu>) {
    return this.navigationService.updateNavigation(dto);
  }
}
