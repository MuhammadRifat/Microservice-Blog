import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async publish(
    exchange: string,
    routingKey: string,
    msg: object,
    options?: object,
  ) {
    this.amqpConnection.publish(exchange, routingKey, msg,  { persistent: true });
  }
}