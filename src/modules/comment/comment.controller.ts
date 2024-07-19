import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IPaginate, MongoIdParams } from 'src/common/dtos/dto.common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { QueryCommentDto } from './dto/query-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @UseGuards(UserAuthGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req
  ) {
    try {
      const data = await this.commentService.create(req.user, createCommentDto);
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
  async findAll(@Query() queryCommentDto: QueryCommentDto) {
    try {
      return await this.commentService.findAll(queryCommentDto);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  async remove(@Param() { id }: MongoIdParams, @Req() req) {
    try {
      const data = await this.commentService.remove(id, req.user.id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
