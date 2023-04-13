import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../interceptors/logger.interceptor';
import { SendinblueService } from './sendinblue.service';
import { emailDto } from 'src/models/email/email.dto';

@ApiTags('Sendinblue')
@UseInterceptors(LoggingInterceptor)
@Controller()
export class SendinblueController {
  constructor(private readonly sendinblueService: SendinblueService) {}

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: String,
  })
  @Get()
  sendMail(
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('template_id') templateId: string,
    @Query('params') params: { month: string; year: string; amount: number },
  ) {
    const emailDto: emailDto = {
      to: [{ email, name }],
      templateId,
      params,
    };
    return this.sendinblueService.sendMail(emailDto);
  }
}
