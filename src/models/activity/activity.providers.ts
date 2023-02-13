import { DataSource } from 'typeorm';
import { Activity } from './activity.entity';

export const activityProviders = [
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Activity),
    inject: ['DWC_MYSQL_CONNECTION'],
  },
];
