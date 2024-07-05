import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from './schema/like.schema';
import { BlogModule } from '../blog/blog.module';

@Module({imports: [
  MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }]),
  BlogModule
],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
