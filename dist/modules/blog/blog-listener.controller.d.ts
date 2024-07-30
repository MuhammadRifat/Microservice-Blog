import { Nack } from '@golevelup/nestjs-rabbitmq';
import { BlogService } from './blog.service';
export declare class BlogListenerController {
    private readonly blogService;
    constructor(blogService: BlogService);
    userUpdatedListener(user: any): Promise<Nack>;
    incrementLikes(like: any): Promise<void>;
    decrementLikes(like: any): Promise<void>;
    incrementComments(comment: any, amqpMsg: any, amqpChannel: any): Promise<void>;
    decrementComments(comment: any): Promise<void>;
}
