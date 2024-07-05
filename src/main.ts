import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { json } from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true
  // }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorMsg = {};
        validationErrors.forEach((error) => {
          if (error?.constraints) {
            errorMsg[error?.property] = Object.values(
              error?.constraints || {},
            )?.join(', ');
          }
        });
        return new BadRequestException(errorMsg);
      },
    }),
  );

  app.use(json({ limit: '5mb' }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Api List')
    .setDescription('Api documentation of Backend App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}

bootstrap();