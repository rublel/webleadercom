import { DataSource } from 'typeorm';
import { DWC_MYSQL_CONNECTION, TASK_REPOSITORY } from '../constants';
import { Task } from './task.dwc.entity';

export const taskProviders = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: [DWC_MYSQL_CONNECTION],
  },
];
