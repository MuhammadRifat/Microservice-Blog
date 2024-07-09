import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller()
export class BlogListenerController {
    // constructor(private readonly userService: BlogService) { }

    @RabbitSubscribe({
        exchange: 'user_management',
        routingKey: 'user_created_routing_key',
    })
    public async userCreatedListener(msg) {
        try {
            // const { id, type, ...rest } = msg;
            // const userDto: BlogDto = { ...rest, user_id: id };
            console.log('user created event captured: ', msg);
            // await this.userService.createBlog(userDto);
        } catch (error) {
            console.log(error);
        }
    }
}