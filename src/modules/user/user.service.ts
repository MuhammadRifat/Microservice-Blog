import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { IUser } from './schema/user.schema';
import { MysqlService } from 'src/common/services/mysql-service.common';
import { IPaginate, IPaginateMysql } from 'src/common/dtos/dto.common';
import { DB_TABLES } from 'src/common/enums/db.enum';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class UserService extends MysqlService<IUser> {

  constructor(
    @InjectConnection() private knex: Knex,
    private readonly rabbitmqService: RabbitmqService,
  ) {
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

    console.log('user created. Publishing Rabbitmq event');
    await this.rabbitmqService.publish(
      'user_management',
      'user_created',
      user,
    );
    console.log('Event published successful');
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

    const user = await this.updateById(id, updateUserDto);
    if (!user) {
      throw new InternalServerErrorException('update failed');
    }

    delete user?.password;
    console.log('user updated. Publishing Rabbitmq event');
    await this.rabbitmqService.publish(
      'user_management',
      'user_updated',
      user,
    );
    console.log('Event published successful');
    return user;
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
