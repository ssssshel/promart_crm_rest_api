import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseError, UniqueConstraintError } from 'sequelize';
import { ResponseDto } from 'src/controller/user/dto/response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ResponseDto>>();

    let message = 'Internal server error'
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR

    // if (exception instanceof BadRequestException) {
    //   const exceptionResponse = exception.getResponse();
    //   const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || 'Validation error'
    //   Logger.error(exception, 'ValidationException')
    //   return response.status(HttpStatus.BAD_REQUEST).json({
    //     success: false,
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message,
    //   })
    // }

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse()
      statusCode = exception.getStatus()
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || 'Validation error'

      Logger.error(exception, 'HttpExceptionFilter')
      return response.status(statusCode).json({
        success: false,
        statusCode,
        message
      })
    }

    if (exception instanceof DatabaseError || exception instanceof UniqueConstraintError) {
      statusCode = HttpStatus.BAD_REQUEST
      message = exception.message

      Logger.error(exception, 'SequelizeExceptionFilter');
      return response.status(statusCode).json({
        success: false,
        statusCode,
        message,
      })
    }

    Logger.error(exception, 'Unhandled exception');
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: statusCode,
      message: message
    })
  }
}
