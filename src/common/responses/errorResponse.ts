import {
  BadRequestException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

export const AppLogger = new Logger('LOGS');

export const throwHttpError = (
  code: number,
  success = false,
  message = '',
  importantInfo = '',
) => {
  const status = 'error';

  let exception = new BadRequestException({
    status,
    success,
    message,
  });

  switch (code) {
    case 406:
      message = message || 'Not Found';
      exception = new NotAcceptableException({
        status,
        success,
        message,
      });
      break;

    case 404:
      message = message || 'Not Found';
      exception = new NotFoundException({
        status,
        success,
        message,
      });
      break;

    case 403:
      message = message || 'Not Authorized';
      exception = new UnauthorizedException({
        status,
        success,
        message,
      });
      break;

    case 401:
      message = message || 'Not Authorized';
      exception = new UnauthorizedException({
        status,
        success,
        message,
      });
      break;

    case 400:
      message = message || 'Bad Request';
      exception = new BadRequestException({
        status,
        success,
        message,
      });
      break;

    case 500:
      message = message || 'Unable to process this action';
      exception = new InternalServerErrorException({
        status,
        success,
        message,
      });
      break;

    default:
      message = message || 'Bad Request';
      exception = new BadRequestException({
        status,
        success,
        message,
      });
  }

  const logMessage = `(EXCEPTION) - ${code} - ${importantInfo ? importantInfo : message}`;
  AppLogger.error(logMessage);

  throw exception;
};
