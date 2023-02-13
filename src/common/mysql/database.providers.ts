import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: 'webleadercomprd',
        password: 'JHDYSkxhe845xsUE',
        database: 'DWC',
        synchronize: false,
        entities: ['./dist/**/*.entity.js'],
        logging: true,
        logger: 'file',
      });

      return dataSource.initialize();
    },
  },
];
