import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { crmApiRoutes } from './config/router/routes';
import { ApiModule } from './api/api.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClsCRMMiddleware } from './common/middlewares/cslNamespace.middleware';

@Module({
  imports: [
    RouterModule.forRoutes(crmApiRoutes),
    ScheduleModule.forRoot(),
    // ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClsCRMMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
