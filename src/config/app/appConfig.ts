import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class MysqlConfig {
  @IsNotEmpty() host: string;
  @IsNotEmpty() port: number;
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() database: string;
}

export enum MysqlDatabase {
  DWC = 'dwc',
  PROXI = 'proxi',
}

export class CacheConfig {
  @IsNotEmpty() ttl: number;
}

export class SendInBlueConfig {
  @IsNotEmpty() apiKey: string;
}

export default class Config {
  @IsNotEmpty() env: string;
  @IsNotEmpty() port: number;
  @IsNotEmpty() logLevel: string;
  @IsNotEmptyObject() mysql: { [key in MysqlDatabase]: MysqlConfig };
  @IsNotEmptyObject() sendInBlue: SendInBlueConfig;
  @IsNotEmpty() cache: CacheConfig;

  public constructor(partial: Partial<Config>) {
    Object.assign(this, partial);
  }
}
