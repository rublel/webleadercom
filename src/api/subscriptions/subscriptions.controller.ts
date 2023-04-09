import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import {
  CreateSubscriptionDto,
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
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
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
}
