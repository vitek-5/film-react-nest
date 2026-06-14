import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const payload = exception.getResponse();
    const error = this.getErrorMessage(payload, exception.message);
    response.status(status).json({ error });
  }

  private getErrorMessage(payload: unknown, fallback: string): string {
    if (typeof payload === 'string' && payload.trim().length > 0) {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      const message = (payload as { message?: string | string[] }).message;
      if (Array.isArray(message) && message.length > 0) {
        return message.join(', ');
      }
      if (typeof message === 'string' && message.trim().length > 0) {
        return message;
      }
    }

    return fallback;
  }
}
