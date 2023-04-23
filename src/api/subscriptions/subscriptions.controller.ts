import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import {
  SubscriptionDto,
  MergedSubscriptions,
} from 'src/models/subscription/subscription.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logger.interceptor';

@ApiTags('Subscriptions')
@UseInterceptors(LoggingInterceptor)
@Controller()
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MergedSubscriptions,
  })
  async createSubscription(@Body() createSubscriptionDto: SubscriptionDto) {
    return this.subscriptionsService.createSubscription(createSubscriptionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [MergedSubscriptions],
  })
  async getSubscriptions(
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('activity') activity?: string,
  ) {
    return this.subscriptionsService.findByPeriod(month, year, activity);
  }

  @Delete(':date/:customer_id/:action')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: String,
  })
  async deleteSubscription(
    @Param('date') date: string,
    @Param('customer_id') customer_id: string,
    @Param('action') action: string,
  ) {
    return this.subscriptionsService.deleteSubscription(
      date,
      customer_id,
      action,
    );
  }
}
