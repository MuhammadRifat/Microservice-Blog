import { AuthService } from "./auth.service";
export declare class AuthRpcController {
    private readonly authService;
    constructor(authService: AuthService);
    validateToken(token: string): Promise<import("../user/schema/user.schema").IUser>;
}
