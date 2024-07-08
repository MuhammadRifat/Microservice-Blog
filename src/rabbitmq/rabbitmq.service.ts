// src/rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RMQ_URL}`],
        queue: 'notification',
      },
    });
  }

  async sendNotification(notification: any) {
    return await this.client
      .emit('notification_queue', notification)
      .toPromise();
  }
}