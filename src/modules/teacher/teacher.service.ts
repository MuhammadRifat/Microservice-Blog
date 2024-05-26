import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Service } from 'src/common/services/service.common';
import { Teacher } from './schema/teacher.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPaginate } from 'src/common/dtos/dto.common';
import { LoginDto } from './dto/login-teacher.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService extends Service<Teacher> {
  constructor(
    @InjectModel(Teacher.name) teacherModel: Model<Teacher>,
    private jwtService: JwtService
  ) {
    super(teacherModel);
  }

  // teacher register
  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = await this.findOneByQuery({ email: createTeacherDto.email });
    if (teacher) {
      throw new BadRequestException('mail already exist');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createTeacherDto.password, salt);
    createTeacherDto.password = hash;
    createTeacherDto.slug = this.generateSlug(createTeacherDto.first_name + " " + createTeacherDto.last_name + " " + new Date().getTime());

    return await this.createOne(createTeacherDto);
  }

  // teacher login 
  async signIn(loginDto: LoginDto) {
    const teacher = await this.findOneByQuery({ email: loginDto.email });
    const isMatch = await bcrypt.compare(loginDto.password, teacher.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { _id: teacher._id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_TEACHER_SECRET,
      }),
      data: teacher
    };
  }

  // find all by paginate
  async findAll(paginate: IPaginate) {
    return await this.findByPaginate({}, paginate);
  }

  // find teacher by id
  async findOne(id: Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException('teacher not found');
    }

    return data;
  }

  // find teacher by any query
  async findTeacherByQuery(query: object) {
    const data = await this.findOneByQuery(query);
    if (!data) {
      throw new NotFoundException('teacher not found');
    }

    return data;
  }

  // update teacher by id
  async update(id: Types.ObjectId, updateTeacherDto: UpdateTeacherDto) {
    const data = await this.updateById(id, updateTeacherDto);

    if (!data) {
      throw new BadRequestException('update failed.');
    }

    return data;
  }

  // remove teacher by id
  async remove(id: Types.ObjectId) {
    const data = await this.removeById(id);

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    return data;
  }
}
