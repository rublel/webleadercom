import { Routes } from '@nestjs/core';
import { ApiModule } from 'src/api/api.module';
import { CustomersModule } from 'src/api/customers/customers.module';

export const crmApiRoutes: Routes = [
  {
    path: '/api/crm/v1',
    module: ApiModule,
    children: [
      {
        path: '/customers',
        module: CustomersModule,
      },
    ],
  },
];
