import { DWC_MYSQL_CONNECTION } from 'src/models/constants';
import { DataSource } from 'typeorm';
import appConfig from '../../config/app/';

const SYNC_MODE = false;
if (SYNC_MODE) throw new Error('SYNC MODE IS ON');

export const dwcProviders = [
  {
    provide: DWC_MYSQL_CONNECTION,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: appConfig.mysql.dwc.host,
        port: appConfig.mysql.dwc.port,
        username: appConfig.mysql.dwc.username,
        password: appConfig.mysql.dwc.password,
        database: appConfig.mysql.dwc.database,
        synchronize: SYNC_MODE,
        entities: ['./dist/**/*.dwc.entity.js'],
        logging: SYNC_MODE,
      });
      return dataSource.initialize();
    },
  },
];
