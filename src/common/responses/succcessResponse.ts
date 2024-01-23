import { Logger } from '@nestjs/common';

const AppLogger = new Logger();

export class SuccessResponse<T> {
  success?: boolean;
  message = 'success';
  data: T | null = null;

  constructor(messageOrData: string | T = 'successful', data: T = null) {
    if (typeof messageOrData !== 'string') {
      this.data = messageOrData;
      return;
    }

    this.message = messageOrData;
    this.data = data;
  }

  toJSON() {
    AppLogger.log({
      message: `(LOGS) Success - ${this.message}`,
    });

    if (this.data) {
      return {
        status: 'success',
        message: this.message,
        data: this.data,
      };
    }

    return {
      status: 'success',
      message: this.message,
    };
  }
}
