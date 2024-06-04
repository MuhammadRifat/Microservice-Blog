import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Service } from 'src/common/services/service.common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPaginate } from 'src/common/dtos/dto.common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends Service<User> {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {
    super(userModel);
  }

  // user register
  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByQuery({ email: createUserDto.email });
    if (user) {
      throw new BadRequestException('email already exist');
    }

    createUserDto.password = await this.generateHash(createUserDto.password);
    return await this.createOne(createUserDto);
  }

  // find all by paginate
  async findAll(paginate: IPaginate) {
    return await this.findAllByQuery({}, paginate);
  }

  // find user by id
  async findOne(id: Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException('user not found');
    }

    return data;
  }

  // find user by any query
  async findUserByQuery(query: object) {
    const data = await this.findOneByQuery(query);
    return data;
  }

  // update user by id
  async update(id: Types.ObjectId, updateUserDto: UpdateUserDto) {
    const data = await this.updateById(id, updateUserDto);

    if (!data) {
      throw new BadRequestException('update failed.');
    }

    return data;
  }

  // remove user by id
  async remove(id: Types.ObjectId) {
    const data = await this.removeById(id);

    if (!data) {
      throw new BadRequestException('delete failed.');
    }

    return data;
  }

  private async generateHash(plainPassword: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(plainPassword, salt);
  }
}
