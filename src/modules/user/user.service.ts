import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { IUser } from './schema/user.schema';
import { MysqlService } from 'src/common/services/mysql-service.common';
import { IPaginate, IPaginateMysql } from 'src/common/dtos/dto.common';
import { DB_TABLES } from 'src/common/enums/db.enum';

@Injectable()
export class UserService extends MysqlService<IUser> {
  constructor(@InjectConnection() private knex: Knex) {
    super(knex, DB_TABLES.USER);
  }

  // create one
  async create(createUserDto: CreateUserDto) {
    const [isExitUser] = await this.knex.table(DB_TABLES.USER)
      .where({ email: createUserDto.email });

    if (isExitUser) {
      throw new BadRequestException('user already exist.');
    }

    const user = await this.createOne(createUserDto);
    delete user?.password;
    return user;
  }

  // find all by paginate
  async findAll(paginate: IPaginateMysql) {
    return await this.findWithPaginate(paginate);
  }

  async findOneUserByQuery(query: object) {
    return await this.findOneByQuery(query);
  }

  // find one by id
  async findOne(id: number) {
    const data = await this.findOneById(id);

    if (!data) {
      throw new NotFoundException('user not found');
    }

    return data;
  }

  // update user by id
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!Object.keys(updateUserDto).length) {
      throw new BadRequestException('must have a property');
    }

    const data = await this.updateById(id, updateUserDto);

    if (!data) {
      throw new InternalServerErrorException('update failed');
    }

    return data;
  }

  // delete user by id
  async remove(id: number) {
    const data = await this.removeById(id);

    if (!data) {
      throw new InternalServerErrorException('delete failed');
    }

    return data;
  }
}
