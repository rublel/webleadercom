import { Module } from '@nestjs/common';
import { SendinblueService } from './sendinblue.service';
import { SendinblueController } from './sendinblue.controller';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';
import { templateProviders } from 'src/models/template/template.provider';
import { DatabaseModule } from '../mysql/database.module';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [SendinblueController],
  providers: [SendinblueService, ...templateProviders],
})
export class SendinblueModule {}
