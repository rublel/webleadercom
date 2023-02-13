import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activitites.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [CustomersModule, ActivitiesModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
