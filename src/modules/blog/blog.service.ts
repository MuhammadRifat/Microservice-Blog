import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Service } from 'src/common/services/service.common';
import { Blog } from './schema/blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PipelineStage, Types } from 'mongoose';
import { QueryBlogDto } from './dto/query-blog.dto';
@Injectable()
export class BlogService extends Service<Blog> {

  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
  ) {
    super(blogModel);
  }

  // blog register
  async create(user, createBlogDto: CreateBlogDto) {

    createBlogDto.authorId = user.id;
    createBlogDto.author = {
      id: user.id,
      name: `${user.firstName || ''} ${user.lastName || ''}`,
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

    if (restQuery._id) {
      restQuery._id = new mongoose.Types.ObjectId(restQuery._id);
    }

    const blogs = await this.findAllByQuery(restQuery, { page, limit });
    return blogs;

  }


  async search(title: string, authorId?: number) {
    const staticQuery = authorId ? { authorId } : {};
    return await this.searchByAnyCharacter({ title: title }, staticQuery);
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

  async updateAuthor(author) {
    const result = await this.blogModel.updateMany(
      { authorId: author.id },
      {
        $set: {
          'author.name': author.firstName + ' ' + author.lastName,
          'author.image': author.image,
          updatedAt: new Date(),
        },
      },
    );

    return result;
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

  // increments views
  async incrementComments(id: Types.ObjectId) {
    try {
      await this.updateById(id, { $inc: { comments: 1 } });
    } catch (error) {
      console.log(error);
    }
  }

  async decrementComments(id: Types.ObjectId) {
    try {
      await this.updateById(id, { $inc: { comments: -1 } });
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
