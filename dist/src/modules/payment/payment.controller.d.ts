import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { IPaginateMysql } from 'src/common/dtos/dto.common';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        success: boolean;
        data: import("./schema/payment.schema").IPayment;
    }>;
    bulkCreate(): Promise<{
        success: boolean;
        data: any;
    }>;
    findAll(paginate: IPaginateMysql): Promise<{
        perPage: number;
        currentPage: number;
        totalPage: number;
        totalResult: number;
        data: import("./schema/payment.schema").IPayment[];
        success: boolean;
    }>;
    getAllWithUser(): Promise<{
        success: boolean;
        data: import("./schema/payment.schema").IPayment[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./schema/payment.schema").IPayment;
    }>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        success: boolean;
        data: import("./schema/payment.schema").IPayment;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
