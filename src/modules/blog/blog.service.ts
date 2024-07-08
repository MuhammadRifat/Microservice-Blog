import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Service } from 'src/common/services/service.common';
import { Blog } from './schema/blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage, Types } from 'mongoose';
import { QueryBlogDto } from './dto/query-blog.dto';
import amqp from 'amqplib/callback_api';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
@Injectable()
export class BlogService extends Service<Blog> {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private rabbitMQService: RabbitMQService
  ) {
    super(blogModel);
  }

  // blog register
  async create(user, createBlogDto: CreateBlogDto) {

    createBlogDto.authorId = user.id;
    createBlogDto.author = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      image: user.image || null
    };
    return await this.createOne(createBlogDto);
  }

  // async createAll() {
  //   const users = await this.userService.findAllByQuery({}, { page: 1, limit: 1000000 }, { ...this.userService.notSelect, email: 0, isActive: 0, isVerified: 0 });
  //   const blogs: CreateBlogDto[] = users.data?.map((user, index) => {
  //     return {
  //       title: `2nd phase auto generated blogs ${index}`,
  //       content: "2nd phase auto generated blogs",
  //       authorId: user._id,
  //       image: "default.png",
  //     }
  //   });

  //   this.createMany(blogs);
  //   return blogs.length;
  // }

  // find all by paginate
  async findAll(queryBlogDto: QueryBlogDto) {
    const { page, limit, ...restQuery } = queryBlogDto;

    if (restQuery.authorId) {
      restQuery.authorId = new mongoose.Types.ObjectId(restQuery.authorId);
    }

    if (restQuery._id) {
      restQuery._id = new mongoose.Types.ObjectId(restQuery._id);
    }

    const blogs = await this.findAllByQuery(restQuery, { page, limit });
    await this.rabbitMQService.sendNotification("test");
    return blogs;
    // const userIds = blogs?.data?.map(blog => blog.authorId);
    // const users = await this.userService.findIn(userIds, this.userService.notSelect);


    // return this.generateOneToOneRelation(
    //   {
    //     rootData: blogs,
    //     foreignData: users,
    //     rootField: 'authorId',
    //     foreignField: '_id',
    //     targetField: 'author'
    //   }
    // );

  }


  async search(title: string) {
    return await this.searchByAnyCharacter({ title: title });
  }

  async findAllWithPopulate(queryBlogDto: QueryBlogDto) {
    const { page, limit, ...restQuery } = queryBlogDto;

    if (restQuery.authorId) {
      restQuery.authorId = new mongoose.Types.ObjectId(restQuery.authorId);
    }

    const lookupStages: PipelineStage[] = [];
    lookupStages.push(
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
    );

    return await this.findByQueryFilterAndPopulate({
      query: restQuery,
      paginate: { page, limit },
      lookupStages
    });
  }

  // find blog by id
  async findOne(id: Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException('blog not found');
    }

    return data;
  }

  // find blog by any query
  async findBlogByQuery(query: object) {
    const data = await this.findOneByQuery(query);
    if (!data) {
      throw new NotFoundException('blog not found');
    }

    return data;
  }

  // update blog by id
  async update(id: Types.ObjectId, updateBlogDto: UpdateBlogDto) {
    const data = await this.updateById(id, updateBlogDto);

    if (!data) {
      throw new BadRequestException('update failed.');
    }

    return data;
  }

  // increments views
  async incrementViews(id: Types.ObjectId) {
    try {
      await this.updateById(id, { $inc: { views: 1 } });
    } catch (error) {
      console.log(error);
    }
  }

  // increments views
  async incrementLikes(id: Types.ObjectId) {
    try {
      await this.updateById(id, { $inc: { likes: 1 } });
    } catch (error) {
      console.log(error);
    }
  }

  async decrementLikes(id: Types.ObjectId) {
    try {
      await this.updateById(id, { $inc: { likes: -1 } });
    } catch (error) {
      console.log(error);
    }
  }

  // remove blog by id
  async remove(id: Types.ObjectId) {
    const data = await this.removeById(id);

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    return data;
  }
}
