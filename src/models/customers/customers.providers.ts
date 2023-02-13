import { DataSource } from 'typeorm';
import { Customer } from './customers.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: ['DATA_SOURCE'],
  },
];
