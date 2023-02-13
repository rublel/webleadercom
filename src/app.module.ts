import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { crmApiRoutes } from './config/router/routes';
import { ApiModule } from './api/api.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    RouterModule.forRoutes(crmApiRoutes),
    ScheduleModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
