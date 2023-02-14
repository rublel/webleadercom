import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activitites.module';
import { CustomersModule } from './customers/customers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [CustomersModule, ActivitiesModule, SubscriptionsModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
