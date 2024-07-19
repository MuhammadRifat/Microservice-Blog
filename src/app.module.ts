import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ImageLibraryModule } from './modules/image-library/image-library.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    RabbitmqModule,
    MongooseModule.forRoot(process.env.DB_URL),
    ImageLibraryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
