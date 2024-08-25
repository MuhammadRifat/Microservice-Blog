import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Req, UseGuards, BadRequestException, BadGatewayException } from '@nestjs/common';
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
      const data = await this.blogService.create(req.user, createBlogDto);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('bulk-create')
  async bulkCreate(@Query() query) {
    try {
      const { start, end } = query;
      if (!start || !end) {
        throw new BadGatewayException('star, end required');
      }
      return await this.blogService.bulkCreate(Number(start), Number(end));

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(@Query() queryBlogDto: QueryBlogDto) {
    try {
      return await this.blogService.findAll(queryBlogDto);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('search')
  async search(@Query('q') q: string) {
    try {
      const data = await this.blogService.search(q);

      return {
        success: true,
        data
      }

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('auth/search')
  @UseGuards(UserAuthGuard)
  async authSearch(@Query('q') q: string, @Req() req) {
    try {
      return await this.blogService.search(q, req.user.id);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.blogService.findOne(id);

      // increment views  
      this.blogService.incrementViews(id);
      return {
        success: true,
        data
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