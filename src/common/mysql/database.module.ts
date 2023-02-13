import { Module } from '@nestjs/common';
import { dwcProviders } from './dwc.providers';
import { proxiProviders } from './proxi.providers';

@Module({
  providers: [...dwcProviders, ...proxiProviders],
  exports: [...dwcProviders, ...proxiProviders],
})
export class DatabaseModule {}
