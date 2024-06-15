import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Service } from 'src/common/services/service.common';
import { Blog } from './schema/blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage, Types } from 'mongoose';
import { QueryBlogDto } from './dto/query-blog.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class BlogService extends Service<Blog> {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private userService: UserService
  ) {
    super(blogModel);
  }

  // blog register
  async create(createBlogDto: CreateBlogDto) {

    return await this.createOne(createBlogDto);
  }

  async createAll(createBlogDto: CreateBlogDto[]) {

    return await this.createMany(createBlogDto);
  }

  // find all by paginate
  async findAll(queryBlogDto: QueryBlogDto) {
    const { page, limit, ...restQuery } = queryBlogDto;

    if (restQuery.authorId) {
      restQuery.authorId = new mongoose.Types.ObjectId(restQuery.authorId);
    }

    const blogs = await this.findAllByQuery(restQuery, { page, limit });
    const userIds = blogs?.data?.map(blog => blog.authorId);
    const users = await this.userService.findIn(userIds, this.userService.notSelect);


    return this.generateRelationalResponse(blogs, users, 'author');
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

  // remove blog by id
  async remove(id: Types.ObjectId) {
    const data = await this.removeById(id);

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    return data;
  }
}
