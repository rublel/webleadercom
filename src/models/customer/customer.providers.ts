import { DataSource } from 'typeorm';
import { CUSTOMER_REPOSITORY, PROXI_MYSQL_CONNECTION } from '../constants';
import { Customer } from './customer.proxi.entity';

export const customerProviders = [
  {
    provide: CUSTOMER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: [PROXI_MYSQL_CONNECTION],
  },
];
