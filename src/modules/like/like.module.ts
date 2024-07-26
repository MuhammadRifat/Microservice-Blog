import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from './schema/like.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { LikeListenerController } from './like-listener.controller';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }]),
  RabbitmqModule
],
  controllers: [LikeController, LikeListenerController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
