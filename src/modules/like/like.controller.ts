import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { IPaginate, MongoIdParams } from 'src/common/dtos/dto.common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { QueryLikeDto } from './dto/query-like.dto';

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
  @UseGuards(UserAuthGuard)
  async findAll(@Query() queryLikeDto: QueryLikeDto) {
    try {
      return await this.likeService.findAll(queryLikeDto);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  async remove(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.likeService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
