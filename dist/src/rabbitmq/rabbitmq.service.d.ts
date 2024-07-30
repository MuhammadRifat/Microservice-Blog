import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
export declare class RabbitmqService {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    publish(exchange: string, routingKey: string, msg: object, options?: object): Promise<void>;
}
