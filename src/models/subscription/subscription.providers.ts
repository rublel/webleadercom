import { DataSource } from 'typeorm';
import { Subscription } from './subscription.dwc.entity';

export const subscriptionProviders = [
  {
    provide: 'SUBSCRIPTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Subscription),
    inject: ['DWC_MYSQL_CONNECTION'],
  },
];
