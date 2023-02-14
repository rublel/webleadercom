import { DataSource } from 'typeorm';
import { Customer } from './customer.proxi.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: ['PROXI_MYSQL_CONNECTION'],
  },
];
