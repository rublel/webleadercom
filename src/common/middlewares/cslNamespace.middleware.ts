import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { createNamespace } from 'cls-hooked';
import { TRACE_STORAGE_CLIENTELING_APP } from './/clsNamespace.constants';
import { NestMiddleware } from '@nestjs/common';
import { performance } from 'perf_hooks';
import { REQUEST_START_TIMESTAMP, TRACE_ID } from './/clsNamespace.constants';

const traceStorage = createNamespace(TRACE_STORAGE_CLIENTELING_APP);

export class ClsCRMMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    traceStorage.bindEmitter(req);
    traceStorage.bindEmitter(res);

    const reqId = uuid();

    traceStorage.run(() => {
      traceStorage.set(TRACE_ID, reqId);
      traceStorage.set(REQUEST_START_TIMESTAMP, performance.now());
      next();
    });
  }
}
