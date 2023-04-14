import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/common/interceptors/logger.interceptor';
import { TemplateService } from './template.service';
import { Template } from 'src/models/template/template.dwc.entity';

@ApiTags('Template')
@UseInterceptors(LoggingInterceptor)
@Controller()
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @Get('/:name')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Template],
  })
  getTemplate(@Param('name') name: string) {
    return this.templateService.getTemplate(name);
  }
}
