import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ type: Object, description: 'Hello World!', status: 200 })
  ping(): { message: string } {
    return { message: 'Hello World!' };
  }
}
