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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const nest_knexjs_1 = require("nest-knexjs");
const knex_1 = require("knex");
const mysql_service_common_1 = require("../../common/services/mysql-service.common");
const db_enum_1 = require("../../common/enums/db.enum");
const mongoose_1 = require("mongoose");
let PaymentService = class PaymentService extends mysql_service_common_1.MysqlService {
    constructor(knex) {
        super(knex, db_enum_1.DB_TABLES.PAYMENT);
        this.knex = knex;
    }
    async create(createPaymentDto) {
        const payment = await this.createOne(createPaymentDto);
        return payment;
    }
    async bulkCreate() {
        const payments = [];
        for (let i = 1; i <= 300000; i++) {
            payments.push({
                userId: i,
                blogId: new mongoose_1.default.Types.ObjectId().toString(),
                transactionId: Math.floor((Math.random() * 10000000)).toString(),
                paymentStatus: 'pending',
            });
        }
        await this.createMany(payments);
        return payments[0];
    }
    async findAll(paginate) {
        return await this.findWithPaginate(paginate);
    }
    async getAllWithUser() {
        const payments = await this.knex.table(db_enum_1.DB_TABLES.PAYMENT)
            .leftJoin('user', 'user.id', 'payment.userId')
            .orderBy('payment.id', 'desc')
            .limit(10);
        return payments;
    }
    async findOnePaymentByQuery(query) {
        return await this.findOneByQuery(query);
    }
    async findOne(id) {
        const data = await this.findOneById(id);
        if (!data) {
            throw new common_1.NotFoundException('payment not found');
        }
        return data;
    }
    async update(id, updatePaymentDto) {
        if (!Object.keys(updatePaymentDto).length) {
            throw new common_1.BadRequestException('must have a property');
        }
        const payment = await this.updateById(id, updatePaymentDto);
        if (!payment) {
            throw new common_1.InternalServerErrorException('update failed');
        }
        return payment;
    }
    async remove(id) {
        const data = await this.removeById(id);
        if (!data) {
            throw new common_1.InternalServerErrorException('delete failed');
        }
        return data;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function])
], PaymentService);
//# sourceMappingURL=payment.service.js.map