import configProcess from './configuration';
import * as dotenv from 'dotenv';

if (process.argv.length > 2) {
  const env = process.argv[2];
  process.env.NODE_ENV = env;
}

dotenv.config({
  path: `${__dirname}/../../../env/${process.env.NODE_ENV}.env`,
});

export default configProcess();
