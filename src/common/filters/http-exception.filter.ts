import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse();

        response
            .status(status || 500)
            .json({
                success: false,
                statusCode: status || 500,
                message: error,
                error: exception.message
                // stack: exception.stack
                // timestamp: new Date().toISOString(),
            });
    }
}