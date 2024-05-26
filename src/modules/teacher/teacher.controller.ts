import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { IPaginate, MongoIdParams } from 'src/common/dtos/dto.common';
import { LoginDto } from './dto/login-teacher.dto';
import { TeacherAuthGuard } from 'src/modules/auth/teacher-auth.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const data = await this.teacherService.signIn(loginDto);

      return {
        success: true,
        ...data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      const data = await this.teacherService.create(createTeacherDto);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get()
  async findAll(@Query() paginate: IPaginate) {
    try {
      return await this.teacherService.findAll(paginate);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('auth')
  @UseGuards(TeacherAuthGuard)
  async findAuthTeacher(@Req() req) {
    try {
      const data = await this.teacherService.findOne(req.teacher._id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param() { id }: MongoIdParams) {
    try {
      const data = await this.teacherService.findOne(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param() { id }: MongoIdParams, @Body() updateTeacherDto: UpdateTeacherDto) {
    try {
      const data = await this.teacherService.update(id, updateTeacherDto);

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
      const data = await this.teacherService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
