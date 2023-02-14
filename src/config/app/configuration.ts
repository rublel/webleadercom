import { validate } from 'class-validator';
import Config from './appConfig';

export default () => {
  const configObject = {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.PORT),
    logLevel: process.env.LOG_LEVEL,
    mysql: {
      dwc: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DWC_DB,
      },
      proxi: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_PROXI_DB,
      },
    },
    cache: {
      ttl: +process.env.CACHE_TTL || 900,
    },
  };

  const config = new Config(configObject);

  validate(config).then((errors) => {
    if (errors.length > 0) {
      console.log('Failed validating required environment variables.');
      console.log(errors);
      process.exit(9);
    }
  });

  return config;
};
