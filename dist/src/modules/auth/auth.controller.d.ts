import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        data: import("../user/schema/user.schema").IUser;
        success: boolean;
    }>;
    bulkCreate(): Promise<{
        success: boolean;
        data: number;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        data: import("../user/schema/user.schema").IUser;
        success: boolean;
    }>;
    validateToken(token: string): Promise<{
        success: boolean;
        data: import("../user/schema/user.schema").IUser;
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        data: import("../user/schema/user.schema").IUser;
    }>;
    userUpdateProfile(updateUserDto: UpdateUserDto, req: any): Promise<{
        success: boolean;
        data: import("../user/schema/user.schema").IUser;
    }>;
}
