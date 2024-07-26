import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './schema/comment.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

describe('CommentController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:  [
        MongooseModule.forFeature([{ name: Comment.name, schema: commentSchema }]),
        RabbitmqModule
      ],
      controllers: [CommentController],
      providers: [CommentService],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
