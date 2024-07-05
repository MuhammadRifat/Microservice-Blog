
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await axios.post(`${process.env.AUTH_URL}/auth/user/validate-token`, {
                token
            });
            const user = payload.data?.data;

            if(!user) {
                throw new UnauthorizedException();
            }

            // const user = await this.userService.findOne(payload._id);
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
