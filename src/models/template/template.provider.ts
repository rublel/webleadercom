import { DataSource } from 'typeorm';
import { DWC_MYSQL_CONNECTION, TEMPLATE_REPOSITORY } from '../constants';
import { Template } from './template.dwc.entity';

export const templateProviders = [
  {
    provide: TEMPLATE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Template),
    inject: [DWC_MYSQL_CONNECTION],
  },
];
