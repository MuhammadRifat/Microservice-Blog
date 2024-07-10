import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from './modules/like/like.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    RabbitmqModule,
    MongooseModule.forRoot(process.env.DB_URL),
    LikeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
