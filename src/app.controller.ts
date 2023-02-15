import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Cron('0 * * * * *')
  @Get()
  @ApiResponse({ type: Object, description: 'Hello World!', status: 200 })
  ping(): string {
    return this.appService.ping();
  }
}
