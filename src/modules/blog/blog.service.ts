import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Service } from 'src/common/services/service.common';
import { Blog } from './schema/blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { IPaginate } from 'src/common/dtos/dto.common';
import { QueryBlogDto } from './dto/query-blog.dto';

@Injectable()
export class BlogService extends Service<Blog> {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
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

    return await this.findByPaginate(restQuery, { page, limit });
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
