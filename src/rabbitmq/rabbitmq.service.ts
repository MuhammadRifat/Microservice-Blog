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
    try {
      await this.amqpConnection.publish(exchange, routingKey, msg, { persistent: true });
    } catch (error) {
      console.log(error.message);
    }
  }
}