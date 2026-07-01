import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: unknown, ...optionalParams: unknown[]) {
    const messageStr =
      typeof message === 'string'
        ? message
        : message instanceof Error
          ? message.stack || message.message
          : JSON.stringify(message);

    const messageTskv = `message=${messageStr
      .replace(/\t/g, '')
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/\\/g, '\\\\')}`;

    const levelTskv = `level=${level}`;

    const optionalTskv =
      optionalParams.length > 0
        ? `optionalParams=${JSON.stringify(optionalParams)}`
        : '';

    return [levelTskv, messageTskv, optionalTskv]
      .filter((data) => data)
      .join('\t');
  }

  log(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  fatal(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}
