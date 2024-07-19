import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './schema/comment.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { CommentListenerController } from './comment-listener.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: commentSchema }]),
    RabbitmqModule
  ],
  controllers: [CommentController, CommentListenerController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule { }
