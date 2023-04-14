import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/mysql/database.module';
import { LoggerModule } from 'src/utils/looger/logger/logger.module';
import { TemplateService } from './template.service';
import { templateProviders } from 'src/models/template/template.provider';
import { TemplateController } from './template.controller';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [TemplateController],
  providers: [TemplateService, ...templateProviders],
})
export class TemplateModule {}
