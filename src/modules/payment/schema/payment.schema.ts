import { MysqlCommonSchema } from "src/common/schemas/schema.common";

export class IPayment extends MysqlCommonSchema {
    userId: number;
    blogId: string;
    transactionId: string;
    paymentStatus: string;
    paymentGateway: string;
    paymentGatewayResponse: object;
}