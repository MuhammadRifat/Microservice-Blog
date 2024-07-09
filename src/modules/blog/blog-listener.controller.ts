import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller()
export class BlogListenerController {
    constructor(private readonly blogService: BlogService) { }

    // update author when user updated
    @RabbitSubscribe({
        exchange: 'user_management',
        routingKey: 'user_updated',
    })
    public async userUpdatedListener(user) {
        try {
            console.log('user updated event captured: ', user);
            await this.blogService.updateAuthor(user);
        } catch (error) {
            console.log(error);
        }
    }
}