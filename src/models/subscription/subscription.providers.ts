import { DataSource } from 'typeorm';
import { DWC_MYSQL_CONNECTION, SUBSCRIPTION_REPOSITORY } from '../constants';
import { Subscription } from './subscription.dwc.entity';

export const subscriptionProviders = [
  {
    provide: SUBSCRIPTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Subscription),
    inject: [DWC_MYSQL_CONNECTION],
  },
];
