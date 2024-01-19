import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto, StudentLoginDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Service } from 'src/common/service.common';
import { Student } from './schema/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IPaginate } from 'src/common/dto.common';

@Injectable()
export class StudentService extends Service<Student> {
  constructor(
    @InjectModel(Student.name) studentModel: Model<Student>,
    private jwtService: JwtService
  ) {
    super(studentModel);
  }

  // student register
  async create(createStudentDto: CreateStudentDto) {
    const student = await this.findOneByQuery({ student_id: createStudentDto.student_id });
    if (student) {
      throw new BadRequestException('student_id already exist');
    }

    if (!createStudentDto.password) {
      createStudentDto.password = this.generatePassword(6);
    }
    createStudentDto.slug = this.generateSlug(createStudentDto.first_name + " " + createStudentDto.last_name + " " + new Date().getTime());

    return await this.createOne(createStudentDto);
  }

  // student login 
  async signIn(loginDto: StudentLoginDto) {
    const student = await this.findOneByQuery({ student_id: loginDto.student_id });
    if (loginDto.password != student.password) {
      throw new UnauthorizedException();
    }

    const payload = { _id: student._id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_STUDENT_SECRET,
      }),
      data: student
    };
  }

  // find all by paginate
  async findAll(paginate: IPaginate) {
    return await this.findByPaginate({}, paginate);
  }

  // find student by id
  async findOne(id: mongoose.Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException('student not found');
    }

    return data;
  }

  // find student by any query
  async findStudentByQuery(query: object) {
    const data = await this.findOneByQuery(query);
    if (!data) {
      throw new NotFoundException('student not found');
    }

    return data;
  }

  // update student by id
  async update(id: mongoose.Types.ObjectId, updateStudentDto: UpdateStudentDto) {
    const data = await this.updateById(id, updateStudentDto);

    if (!data) {
      throw new BadRequestException('update failed.');
    }

    return data;
  }

  // remove student by id
  async remove(id: mongoose.Types.ObjectId) {
    const data = await this.removeById(id);

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    return data;
  }
}
