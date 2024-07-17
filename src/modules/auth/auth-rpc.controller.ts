import { BadRequestException, Controller, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RabbitPayload, RabbitRPC } from "@golevelup/nestjs-rabbitmq";

@Controller()
export class AuthRpcController {
    constructor(private readonly authService: AuthService) { }

    @RabbitRPC({
        routingKey: 'validate_token_rpc',
        exchange: 'user_management',
        queue: 'validate_token_queue',
    })
    async validateToken(@RabbitPayload('token') token: string) {
        try {
            if (!token) {
                throw new BadRequestException('token is required');
            }
            return await this.authService.validateToken(token);
        } catch (error) {
            return;
        };
    }

}