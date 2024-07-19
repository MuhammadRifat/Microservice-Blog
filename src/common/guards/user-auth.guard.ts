
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(

        private readonly rabbitmqService: RabbitmqService,
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const user = await this.rabbitmqService.request(
                'user_management',
                'validate_token_rpc',
                { token }
            );

            // const payload = await axios.post(`${process.env.AUTH_URL}/auth/user/validate-token`, {
            //     token
            // });

            if (!user) {
                throw new UnauthorizedException();
            }

            request['user'] = user;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
