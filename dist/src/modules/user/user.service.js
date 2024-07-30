"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const mysql_service_common_1 = require("../../common/services/mysql-service.common");
const db_enum_1 = require("../../common/enums/db.enum");
const rabbitmq_service_1 = require("../../rabbitmq/rabbitmq.service");
let UserService = class UserService extends mysql_service_common_1.MysqlService {
    constructor(knex, rabbitmqService) {
        super(knex, db_enum_1.DB_TABLES.USER);
        this.knex = knex;
        this.rabbitmqService = rabbitmqService;
    }
    async create(createUserDto) {
        const [isExitUser] = await this.knex.table(db_enum_1.DB_TABLES.USER)
            .where({ email: createUserDto.email });
        if (isExitUser) {
            throw new common_1.BadRequestException('user already exist.');
        }
        const user = await this.createOne(createUserDto);
        delete user?.password;
        console.log('user created. Publishing Rabbitmq event');
        await this.rabbitmqService.publish('user_management', 'user_created', user);
        console.log('Event published successful');
        return user;
    }
    async findAll(paginate) {
        return await this.findWithPaginate(paginate);
    }
    async findOneUserByQuery(query) {
        return await this.findOneByQuery(query);
    }
    async findOne(id) {
        const data = await this.findOneById(id);
        if (!data) {
            throw new common_1.NotFoundException('user not found');
        }
        return data;
    }
    async update(id, updateUserDto) {
        if (!Object.keys(updateUserDto).length) {
            throw new common_1.BadRequestException('must have a property');
        }
        const user = await this.updateById(id, updateUserDto);
        if (!user) {
            throw new common_1.InternalServerErrorException('update failed');
        }
        delete user?.password;
        console.log('user updated. Publishing Rabbitmq event');
        await this.rabbitmqService.publish('user_management', 'user_updated', user);
        console.log('Event published successful');
        return user;
    }
    async remove(id) {
        const data = await this.removeById(id);
        if (!data) {
            throw new common_1.InternalServerErrorException('delete failed');
        }
        return data;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function, rabbitmq_service_1.RabbitmqService])
], UserService);
//# sourceMappingURL=user.service.js.map