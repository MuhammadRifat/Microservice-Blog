import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
export declare class UserAuthGuard implements CanActivate {
    private readonly rabbitmqService;
    constructor(rabbitmqService: RabbitmqService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
