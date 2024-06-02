import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Req, UseGuards } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginate, MongoIdParams } from 'src/common/dtos/dto.common';
import { LoginDto } from './dto/login-user.dto';
import { UserAuthGuard } from 'src/common/guards/user-auth.guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(@Query() paginate: IPaginate) {
    try {
      return await this.userService.findAll(paginate);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.userService.findOne(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param() { id }: MongoIdParams, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userService.update(id, updateUserDto);

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
      const data = await this.userService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
