import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Service } from 'src/common/services/service.common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage, Types } from 'mongoose';
import { QueryCommentDto } from './dto/query-comment.dto';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentService extends Service<Comment> {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly rabbitmqService: RabbitmqService,
  ) {
    super(commentModel);
  }

  // comment register
  async create(user, createCommentDto: CreateCommentDto) {
    createCommentDto.userId = user.id;
    createCommentDto.user = {
      id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`,
      image: user.image || null
    };

    const comment = await this.createOne(createCommentDto);
    console.log('comment created. Publishing Rabbitmq event');
    await this.rabbitmqService.publish(
      'blog_management',
      'comment_created',
      comment,
    );
    console.log('Event published successful');

    return comment;
  }

  // find all by paginate
  async findAll(queryCommentDto: QueryCommentDto) {
    const { page, limit, ...restQuery } = queryCommentDto;

    if (restQuery.userId) {
      restQuery.userId = new mongoose.Types.ObjectId(restQuery.userId);
    }

    if (restQuery.blogId) {
      restQuery.blogId = new mongoose.Types.ObjectId(restQuery.blogId);
    }

    if (restQuery._id) {
      restQuery._id = new mongoose.Types.ObjectId(restQuery._id);
    }

    const comments = await this.findAllByQuery(restQuery, { page, limit });
    return comments;
  }


  // find comment by id
  async findOne(id: Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException('comment not found');
    }

    return data;
  }

  async updateUser(user) {
    const result = await this.commentModel.updateMany(
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

  // remove comment by id
  async remove(id: Types.ObjectId, userId: number) {
    const data = await this.removeByQuery({ _id: id, userId: userId });

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    console.log('comment deleted. Publishing Rabbitmq event');
    await this.rabbitmqService.publish(
      'blog_management',
      'comment_deleted',
      data,
    );
    console.log('Event published successful');
    return data;
  }
}
