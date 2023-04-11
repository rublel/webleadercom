import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { subscriptionProviders } from 'src/models/subscription/subscription.providers';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { customerProviders } from 'src/models/customer/customer.providers';
import { taskProviders } from 'src/models/task/task.provider';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsService,
    ...subscriptionProviders,
    ...customerProviders,
    ...taskProviders,
  ],
})
export class SubscriptionsModule {}
