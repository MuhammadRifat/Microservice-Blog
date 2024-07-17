import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller()
export class BlogListenerController {
    constructor(private readonly blogService: BlogService) { }

    // update author when user updated
    @RabbitSubscribe({
        exchange: 'user_management',
        routingKey: 'user_updated',
        queue: 'blog_user_updated'
    })
    public async userUpdatedListener(user) {
        try {
            console.log('user updated event captured: ', user);
            await this.blogService.updateAuthor(user);

            return new Nack(false);
        } catch (error) {
            console.log(error);
            return new Nack(true);
        }
    }

    // update total like when like created
    @RabbitSubscribe({
        exchange: 'blog_management',
        routingKey: 'like_created',
        queue: 'blog_like_created'
    })
    public async incrementLikes(like) {
        try {
            console.log('like event captured: ', like?.blogId);
            await this.blogService.incrementLikes(like?.blogId);
        } catch (error) {
            console.log(error);
        }
    }

    // update total like when like created
    @RabbitSubscribe({
        exchange: 'blog_management',
        routingKey: 'like_deleted',
        queue: 'blog_like_deleted'
    })
    public async decrementLikes(like) {
        try {
            console.log('like event captured: ', like?.blogId);
            await this.blogService.decrementLikes(like?.blogId);
        } catch (error) {
            console.log(error);
        }
    }

    // update total comments when comment created
    @RabbitSubscribe({
        exchange: 'blog_management',
        routingKey: 'comment_created',
        queue: 'blog_comment_created'
    })
    public async incrementComments(comment, amqpMsg, amqpChannel) {
        try {
            console.log('comment create event captured: ', comment?.blogId);
            await this.blogService.incrementComments(comment?.blogId);
        } catch (error) {
            console.log(error);
        }
    }

    // update total comments when comment deleted
    @RabbitSubscribe({
        exchange: 'blog_management',
        routingKey: 'comment_deleted',
        queue: 'blog_comment_deleted'
    })
    public async decrementComments(comment) {
        try {
            console.log('comment delete event captured: ', comment?.blogId);
            await this.blogService.decrementComments(comment?.blogId);
        } catch (error) {
            console.log(error);
        }
    }
}