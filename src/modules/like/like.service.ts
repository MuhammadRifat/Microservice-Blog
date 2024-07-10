import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Service } from 'src/common/services/service.common';
import { Like } from './schema/like.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage, Types } from 'mongoose';
import { QueryLikeDto } from './dto/query-like.dto';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class LikeService extends Service<Like> {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    private readonly rabbitmqService: RabbitmqService,
  ) {
    super(likeModel);
  }

  // like register
  async create(user, createLikeDto: CreateLikeDto) {
    createLikeDto.userId = user.id;
    createLikeDto.user = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      image: user.image || null
    };

    const isExist = await this.findOneByQuery({ blogId: createLikeDto.blogId, userId: createLikeDto.userId });
    if (isExist) {
      throw new BadRequestException('already liked');
    }

    const like = await this.createOne(createLikeDto);
    console.log('like created. Publishing Rabbitmq event');
    await this.rabbitmqService.publish(
      'blog_management',
      'like_created',
      like,
    );
    console.log('Event published successful');

    return like;
  }

  // find all by paginate
  async findAll(queryLikeDto: QueryLikeDto) {
    const { page, limit, ...restQuery } = queryLikeDto;

    if (restQuery.userId) {
      restQuery.userId = new mongoose.Types.ObjectId(restQuery.userId);
    }

    if (restQuery.blogId) {
      restQuery.blogId = new mongoose.Types.ObjectId(restQuery.blogId);
    }

    if (restQuery._id) {
      restQuery._id = new mongoose.Types.ObjectId(restQuery._id);
    }

    const likes = await this.findAllByQuery(restQuery, { page, limit });
    return likes;
    // const userIds = likes?.data?.map(like => like.userId);
    // const users = await this.userService.findIn(userIds, this.userService.notSelect);

    // return this.generateOneToOneRelation(
    //   {
    //     rootData: likes,
    //     foreignData: users,
    //     rootField: 'userId',
    //     foreignField: '_id',
    //     targetField: 'user'
    //   }
    // );
  }


  // find like by id
  async findOne(id: Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException('like not found');
    }

    return data;
  }

  async updateUser(user) {
    const result = await this.likeModel.updateMany(
      { userId: user.id },
      {
        $set: {
          'user.name': user.firstName + ' ' + user.lastName,
          'user.image': user.image,
          updatedAt: new Date(),
        },
      },
    );

    return result;
  }

  // remove like by id
  async remove(id: Types.ObjectId) {
    const data = await this.removeById(id);

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    // this.blogService.decrementLikes(data.blogId);
    return data;
  }
}
