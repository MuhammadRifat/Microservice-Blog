import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Knex } from 'knex';
import { IUser } from './schema/user.schema';
import { MysqlService } from 'src/common/services/mysql-service.common';
import { IPaginateMysql } from 'src/common/dtos/dto.common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
export declare class UserService extends MysqlService<IUser> {
    private knex;
    private readonly rabbitmqService;
    constructor(knex: Knex<any, IUser[]>, rabbitmqService: RabbitmqService);
    create(createUserDto: CreateUserDto): Promise<IUser>;
    findAll(paginate: IPaginateMysql): Promise<{
        perPage: number;
        currentPage: number;
        totalPage: number;
        totalResult: number;
        data: IUser[];
    }>;
    findOneUserByQuery(query: object): Promise<IUser>;
    findOne(id: number): Promise<IUser>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<IUser>;
    remove(id: number): Promise<any>;
}
