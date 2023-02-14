import { DataSource } from 'typeorm';
import { Activity } from './activity.dwc.entity';

export const activityProviders = [
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Activity),
    inject: ['DWC_MYSQL_CONNECTION'],
  },
];
