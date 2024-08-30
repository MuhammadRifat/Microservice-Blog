import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './modules/blog/blog.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { UniqueGeneratorModule } from './modules/unique-generator/unique-generator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    RabbitmqModule,
    MongooseModule.forRoot(process.env.DB_URL),
    BlogModule,
    UniqueGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
