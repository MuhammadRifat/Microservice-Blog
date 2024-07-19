import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RabbitmqService } from './rabbitmq.service';
dotenv.config();

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user_management',
          type: 'topic',
        },
        {
          name: 'blog_management',
          type: 'topic',
        },
      ],
      uri: process.env.RMQ_URL,
      connectionInitOptions: {
        wait: false,
      },
      enableControllerDiscovery: true,
      queues: []
    }),
  ],
  exports: [RabbitMQModule, RabbitmqService],
  providers: [RabbitmqService],
})
export class RabbitmqModule { }