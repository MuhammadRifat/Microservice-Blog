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
    this.amqpConnection.publish(exchange, routingKey, msg, options || { persistent: true });
  }

  async request(
    exchange: string,
    routingKey: string,
    payload: object,
    timeout = 3000, // optional timeout for how long the request
  ) {
    return this.amqpConnection.request({ exchange, routingKey, payload, timeout });
  }
}