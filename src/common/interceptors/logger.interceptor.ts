import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ClsService } from 'src/utils/cls/cls.service';
import { WinstonLogger } from 'src/utils/looger/logger/winston.logger';
import {
  REQUEST_START_TIMESTAMP,
  TRACE_ID,
} from '../middlewares/clsNamespace.constants';
import { performance } from 'perf_hooks';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  count = 0;
  constructor(private logger: WinstonLogger) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const requestId = ClsService.get(TRACE_ID);
    const req = context.getArgByIndex(0);

    this.logger.http(
      `${req.method} ${req.url}

REQUEST: ${requestId}
URL: ${req.method} ${req.originalUrl}
timestamp:${new Date().toISOString()} 
query: ${JSON.stringify(req.query)} 
body: ${JSON.stringify(req.body) !== '{}' ? JSON.stringify(req.body) : '{}'}
`,
    );

    return next.handle().pipe(
      tap((data) => {
        setTimeout(() => {
          this.logger.http(
            `Duration: ${Number(
              (
                performance.now() - ClsService.get(REQUEST_START_TIMESTAMP)
              ).toFixed(3),
            )} ms

${JSON.stringify(data, null, 2)}`,
          );
        });
      }),
    );
  }
}
