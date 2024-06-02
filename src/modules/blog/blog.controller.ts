import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IPaginate, MongoIdParams } from 'src/common/dtos/dto.common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { QueryBlogDto } from './dto/query-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @UseGuards(UserAuthGuard)
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @Req() req
    ) {
    try {
      createBlogDto.authorId = req.user._id;
      const data = await this.blogService.create(createBlogDto);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  @UseGuards(UserAuthGuard)
  async findAll(@Query() queryBlogDto: QueryBlogDto) {
    try {
      return await this.blogService.findAll(queryBlogDto);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.blogService.findOne(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param() { id }: MongoIdParams, @Body() updateBlogDto: UpdateBlogDto) {
    try {
      const data = await this.blogService.update(id, updateBlogDto);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.blogService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
