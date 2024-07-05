import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './modules/blog/blog.module';
import { LikeModule } from './modules/like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    BlogModule,
    LikeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
