import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '51.91.236.48',
        port: 3306,
        username: 'localhost',
        password: '',
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
