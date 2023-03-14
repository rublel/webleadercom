import { DataSource } from 'typeorm';
import { DWC_MYSQL_CONNECTION, IMPAYE_REPOSITORY } from '../constants';
import { Impaye } from './impayes.dwc.entity';

export const impayeProviders = [
  {
    provide: IMPAYE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Impaye),
    inject: [DWC_MYSQL_CONNECTION],
  },
];
