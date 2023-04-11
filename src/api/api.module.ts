import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activitites.module';
import { CustomersModule } from './customers/customers.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ImpayesModule } from './impayes/impayes.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    CustomersModule,
    ActivitiesModule,
    SubscriptionsModule,
    ImpayesModule,
    TasksModule,
  ],
})
export class ApiModule {}
