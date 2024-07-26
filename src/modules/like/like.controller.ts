import { Controller, Get, Post, Body, Delete, HttpException, Query, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { QueryLikeDto } from './dto/query-like.dto';
import mongoose from 'mongoose';

@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }

  @Post()
  @UseGuards(UserAuthGuard)
  async create(
    @Body() createLikeDto: CreateLikeDto,
    @Req() req
  ) {
    try {
      const data = await this.likeService.create(req.user, createLikeDto);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(@Query() queryLikeDto: QueryLikeDto) {
    try {
      return await this.likeService.findAll(queryLikeDto);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('is-liked')
  @UseGuards(UserAuthGuard)
  async isLiked(
    @Query('blogId') blogId: mongoose.Types.ObjectId,
    @Req() req
  ) {
    try {
      const data = await this.likeService.findOneByQuery({
        blogId,
        userId: req.user.id
      });

      return {
        success: true,
        isLiked: data ? true : false
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete()
  @UseGuards(UserAuthGuard)
  async remove(
    @Body('blogId') blogId: mongoose.Types.ObjectId,
    @Req() req
  ) {
    try {
      const data = await this.likeService.remove(blogId, req.user.id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
