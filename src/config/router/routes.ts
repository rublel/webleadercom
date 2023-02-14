import { Routes } from '@nestjs/core';
import { ActivitiesModule } from 'src/api/activities/activitites.module';
import { ApiModule } from 'src/api/api.module';
import { CustomersModule } from 'src/api/customers/customers.module';
import { SubscriptionsModule } from 'src/api/subscriptions/subscriptions.module';

export const crmApiRoutes: Routes = [
  {
    path: '/api/crm/v1',
    module: ApiModule,
    children: [
      {
        path: '/customers',
        module: CustomersModule,
      },
      {
        path: '/activities',
        module: ActivitiesModule,
      },
      {
        path: '/subscriptions',
        module: SubscriptionsModule,
      },
    ],
  },
];
