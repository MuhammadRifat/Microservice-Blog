import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, UseGuards, Req } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, StudentLoginDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { IPaginate, MongoIdParams } from 'src/common/dto.common';
import { StudentAuthGuard } from 'src/auth/student-auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('login')
  async login(@Body() loginDto: StudentLoginDto) {
    try {
      const data = await this.studentService.signIn(loginDto);

      return {
        success: true,
        ...data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    try {
      const data = await this.studentService.create(createStudentDto);

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
      return await this.studentService.findAll(paginate);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('auth')
  @UseGuards(StudentAuthGuard)
  async findAuthStudent(@Req() req) {
    try {
      const data = await this.studentService.findOne(req.student._id);

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
      const data = await this.studentService.findOne(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(@Param() { id }: MongoIdParams, @Body() updateStudentDto: UpdateStudentDto) {
    try {
      const data = await this.studentService.update(id, updateStudentDto);

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
      const data = await this.studentService.remove(id);

      return {
        success: true,
        data
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
