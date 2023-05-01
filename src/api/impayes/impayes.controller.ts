import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/common/interceptors/logger.interceptor';
import { Customer } from 'src/models/customer/customer.proxi.entity';
import { CreateImpayeDto, UpdateImpayeDto } from 'src/models/impaye/impaye.dto';
import { ImpayesService } from './impayes.service';
import { SubscriptionDto } from 'src/models/subscription/subscription.dto';
import { log } from 'console';
import { Subscription } from 'src/models/subscription/subscription.dwc.entity';

@ApiTags('Imapyes')
@UseInterceptors(LoggingInterceptor)
@Controller()
export class ImpayesController {
  constructor(private readonly impayesService: ImpayesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Customer],
  })
  getImpayes(@Query('month') month: string, @Query('year') year: string) {
    return this.impayesService.findByPeriod(month, year);
  }

  @Get('/:subscription_id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Subscription],
  })
  getImpaye(@Param('subscription_id') subscription_id: string) {
    return this.impayesService.findById(subscription_id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Customer],
  })
  create(@Body() body: SubscriptionDto) {
    return this.impayesService.create(body);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Customer],
  })
  update(
    @Query('subscription_id') subscription_id: string,
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('amount') monthly_price: number,
  ) {
    return this.impayesService.updateImpayeStatus({
      subscription_id,
      year,
      month,
      monthly_price,
    });
  }
}
