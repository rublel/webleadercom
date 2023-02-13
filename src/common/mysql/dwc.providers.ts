import { DataSource } from 'typeorm';

const SYNC_MODE = false;
export const dwcProviders = [
  {
    provide: 'DWC_MYSQL_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '51.91.236.48',
        port: 3306,
        username: 'localhost',
        password: '',
        database: 'DWC',
        synchronize: SYNC_MODE,
        entities: ['./dist/**/*.entity.js'],
        logging: true,
      });
      return dataSource.initialize();
    },
  },
];
