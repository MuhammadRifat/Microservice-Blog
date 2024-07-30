import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Knex } from 'knex';
import { MysqlService } from 'src/common/services/mysql-service.common';
import { IPaginateMysql } from 'src/common/dtos/dto.common';
import { IPayment } from './schema/payment.schema';
export declare class PaymentService extends MysqlService<IPayment> {
    private knex;
    constructor(knex: Knex<any, IPayment[]>);
    create(createPaymentDto: CreatePaymentDto): Promise<IPayment>;
    bulkCreate(): Promise<any>;
    findAll(paginate: IPaginateMysql): Promise<{
        perPage: number;
        currentPage: number;
        totalPage: number;
        totalResult: number;
        data: IPayment[];
    }>;
    getAllWithUser(): Promise<IPayment[]>;
    findOnePaymentByQuery(query: object): Promise<IPayment>;
    findOne(id: number): Promise<IPayment>;
    update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<IPayment>;
    remove(id: number): Promise<any>;
}
