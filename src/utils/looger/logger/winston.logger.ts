import { LoggerService, Injectable, Scope, Optional } from '@nestjs/common';
import { TransformableInfo } from 'logform';
import { createLogger, format } from 'winston';
import * as clc from 'cli-color';
import { getLogTransporters } from './transporters.winston';
import { AllowedNodeEnvs, AllowedLogLevels } from './config';
import { MESSAGE } from 'triple-beam';

export type CustomLoggingLevels<K extends string> = {
  levels: {
    [key in K]: number;
  };
  colors: {
    [key in K]: clc.Format;
  };
};

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger implements LoggerService {
  private colorizeOutput: boolean = true;
  private static lastTimestamp?: number;
  public static customLoggingLevels: CustomLoggingLevels<AllowedLogLevels> = {
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      HTTP: 3,
      VERBOSE: 4,
      DEBUG: 5,
      SILLY: 6,
    },
    colors: {
      ERROR: clc.red,
      WARN: clc.yellow,
      INFO: clc.green,
      HTTP: clc.white,
      VERBOSE: clc.cyan,
      DEBUG: clc.blue,
      SILLY: clc.magenta,
    },
  };

  customFormatting = format((info: TransformableInfo, options) => {
    const stringifiedRest = JSON.stringify(
      Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined,
      }),
      null,
      options.colorizeOutput ? 2 : 0, // Indent if colorizeOutput enabled, otherwise don't
    );

    const localeStringOptions /*: DateTimeFormatOptions */ = {
      //year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    } as const;

    const formattedInfo = {
      level: `[${info.level.toLowerCase()}]`,
      pid: `${process.pid}   - `,
      context: this.context ? `[${this.context}] ` : '',
    };

    const padding = this.getPadding(info);
    const timestamp = new Date(Date.now()).toLocaleString(
      undefined,
      localeStringOptions,
    );
    const timestampDiff = WinstonLogger.updateAndGetTimestampDiff(
      this.isTimestampEnabled,
      options.colorizeOutput,
    );

    let messageFormat: string;

    if (options.colorizeOutput) {
      const colorizedInfo = {
        level: this.colorizeByCustomLevel(info.level, formattedInfo.level),
        pid: clc.green(formattedInfo.pid),
        context: clc.yellow(formattedInfo.context),
      };
      messageFormat = `${colorizedInfo.level}${padding}${colorizedInfo.pid}${timestamp}   ${colorizedInfo.context}${info.message}`;
    } else {
      messageFormat = `${formattedInfo.level}${padding}${formattedInfo.pid}${timestamp}   ${formattedInfo.context}${info.message}`;
    }

    if (stringifiedRest !== '{}') {
      info[MESSAGE] = messageFormat + ` ${stringifiedRest}${timestampDiff}`;
    } else {
      info[MESSAGE] = messageFormat + timestampDiff;
    }

    return info;
  });

  constructor(
    @Optional() protected context?: string,
    @Optional() private isTimestampEnabled = false,
  ) {}

  logger = createLogger({
    levels: WinstonLogger.customLoggingLevels.levels,
    format: this.customFormatting({ colorizeOutput: this.colorizeOutput }),
    transports: getLogTransporters(),
  });

  log(message: string, ...meta: any[]) {
    this.info(message, ...meta);
  }

  error(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.ERROR, message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.WARN, message, ...meta);
  }

  info(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.INFO, message, ...meta);
  }

  http(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.HTTP, message, ...meta);
  }

  verbose(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.VERBOSE, message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.DEBUG, message, ...meta);
  }

  silly(message: string, ...meta: any[]) {
    this.printMessage(AllowedLogLevels.SILLY, message, ...meta);
  }

  printMessage(
    level: keyof CustomLoggingLevels<AllowedLogLevels>['levels'],
    message: string,
    ...meta: any[]
  ) {
    this.logger.log({ level, message, ...meta });
  }

  setContext(context: string) {
    this.context = context;
  }

  setIsTimestampEnabled(isTimestampEnabled: boolean) {
    this.isTimestampEnabled = isTimestampEnabled;
  }

  getPadding(currentInfo: TransformableInfo) {
    const maxLevelLengthPlusOne =
      Math.max(
        ...Object.keys(WinstonLogger.customLoggingLevels.levels).map(
          (level) => level.length,
        ),
      ) + 1;
    const numOfspaces = maxLevelLengthPlusOne - currentInfo.level.length;
    return '.'.repeat(numOfspaces);
  }

  colorizeByCustomLevel(level: string, toFormat: string): string {
    const colorFunc =
      WinstonLogger.customLoggingLevels.colors[level] ?? clc.white;
    return colorFunc(toFormat);
  }

  private static updateAndGetTimestampDiff(
    isTimeDiffEnabled?: boolean,
    colorize?: boolean,
  ): string {
    const includeTimestamp = WinstonLogger.lastTimestamp && isTimeDiffEnabled;
    const formattedTimestamp = ` +${
      Date.now() - WinstonLogger.lastTimestamp
    }ms`;
    const result = includeTimestamp
      ? colorize
        ? clc.yellow(formattedTimestamp)
        : formattedTimestamp
      : '';
    WinstonLogger.lastTimestamp = Date.now();
    return result;
  }
}
