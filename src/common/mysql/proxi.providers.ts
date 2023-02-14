import { DataSource } from 'typeorm';
import appConfig from '../../config/app';

const SYNC_MODE = false;
if (SYNC_MODE) throw new Error('SYNC MODE IS ON');

export const proxiProviders = [
  {
    provide: 'PROXI_MYSQL_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: appConfig.mysql.proxi.host,
        port: appConfig.mysql.proxi.port,
        username: appConfig.mysql.proxi.username,
        password: appConfig.mysql.proxi.password,
        database: appConfig.mysql.proxi.database,
        synchronize: SYNC_MODE,
        entities: ['./dist/**/*.proxi.entity.js'],
        logging: SYNC_MODE,
      });
      return dataSource.initialize();
    },
  },
];
