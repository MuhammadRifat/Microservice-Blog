import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller()
export class LikeListenerController {
    constructor(private readonly likeService: LikeService) { }

    // update author when user updated
    @RabbitSubscribe({
        exchange: 'user_management',
        routingKey: 'user_updated',
    })
    public async userUpdatedListener(user) {
        try {
            console.log('user updated event captured: ', user);
            await this.likeService.updateUser(user);
        } catch (error) {
            console.log(error);
        }
    }
}