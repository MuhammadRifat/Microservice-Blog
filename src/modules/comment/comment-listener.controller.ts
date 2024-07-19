import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller()
export class CommentListenerController {
    constructor(private readonly commentService: CommentService) { }

    // update author when user updated
    @RabbitSubscribe({
        exchange: 'user_management',
        routingKey: 'user_updated',
        queue: 'comment_user_updated'
    })
    public async userUpdatedListener(user, amqpMsg) {
        try {
            console.log('user updated event captured: ', user);
            await this.commentService.updateUser(user);

            return new Nack(false);
        } catch (error) {
            console.log(error);
            return new Nack(true);
        }
    }
}