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

  // @Get('bulk-create')
  // async bulkCreate() {
  //   try {
  //     return await this.blogService.createAll();

  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  @Get()
  async findAll(@Query() queryBlogDto: QueryBlogDto) {
    try {
      return await this.blogService.findAll(queryBlogDto);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('search')
  async search(@Body('search') search: string) {
    try {
      return await this.blogService.search(search);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.blogService.findAll({ _id: id });

      // increment views  
      this.blogService.incrementViews(id);
      return {
        success: true,
        data: data.data?.[0]
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  @UseGuards(UserAuthGuard)
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
  @UseGuards(UserAuthGuard)
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
