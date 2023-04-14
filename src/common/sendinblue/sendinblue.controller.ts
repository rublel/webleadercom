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
    @Query('subject') subject: string,
    @Query('htmlContent') htmlContent: string,
  ) {
    const emailDto: emailDto = {
      to: [{ email, name }],
      subject,
      htmlContent,
    };
    return this.sendinblueService.sendMail(emailDto);
  }
}
