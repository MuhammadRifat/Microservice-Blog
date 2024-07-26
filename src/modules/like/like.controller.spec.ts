import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from './schema/like.schema';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

describe('LikeController', () => {
  let controller: LikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }]),
        RabbitmqModule
      ],
      controllers: [LikeController],
      providers: [LikeService],
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
