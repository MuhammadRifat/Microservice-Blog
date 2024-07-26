import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { MysqlService } from 'src/common/services/mysql-service.common';
import { IPaginateMysql } from 'src/common/dtos/dto.common';
import { DB_TABLES } from 'src/common/enums/db.enum';
import { IPayment } from './schema/payment.schema';
import mongoose from 'mongoose';

@Injectable()
export class PaymentService extends MysqlService<IPayment> {

  constructor(
    @InjectConnection() private knex: Knex<any, IPayment[]>,
  ) {
    super(knex, DB_TABLES.PAYMENT);
  }

  // create one
  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.createOne(createPaymentDto);

    return payment;
  }

  // bulk create
  async bulkCreate() {
    const payments = [];

    for (let i = 1; i <= 300000; i++) {
      payments.push({
        userId: i,
        blogId: new mongoose.Types.ObjectId().toString(),
        transactionId: Math.floor((Math.random() * 10000000)).toString(),
        paymentStatus: 'pending',
      });
    }

    await this.createMany(payments);
    return payments[0];
  }

  // find all by paginate
  async findAll(paginate: IPaginateMysql) {
    return await this.findWithPaginate(paginate);
  }

  async getAllWithUser() {
    const payments = await this.knex.table(DB_TABLES.PAYMENT)
      .leftJoin(
        'user',
        'user.id',
        'payment.userId'
      )
      .orderBy('payment.id', 'desc')
      .limit(10);

      return payments;
  }

  async findOnePaymentByQuery(query: object) {
    return await this.findOneByQuery(query);
  }

  // find one by id
  async findOne(id: number) {
    const data = await this.findOneById(id);

    if (!data) {
      throw new NotFoundException('payment not found');
    }

    return data;
  }

  // update payment by id
  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    if (!Object.keys(updatePaymentDto).length) {
      throw new BadRequestException('must have a property');
    }

    const payment = await this.updateById(id, updatePaymentDto);
    if (!payment) {
      throw new InternalServerErrorException('update failed');
    }

    return payment;
  }

  // delete payment by id
  async remove(id: number) {
    const data = await this.removeById(id);

    if (!data) {
      throw new InternalServerErrorException('delete failed');
    }

    return data;
  }
}
