import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        let response: any;
        if (data?.forceRaw) {
          response = data.rawData;
        } else if (Array.isArray(data)) {
          response = {
            totalSize: data.length,
            records: data,
          };
        } else if (Array.isArray(data?.records)) {
          response = {
            totalSize: data.records.length,
            ...data,
          };
        } else {
          response = {
            record: data || null,
          };
        }
        return response;
      }),
    );
  }
}
