import { LoginDto } from "./dto/auth.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    userLogin(loginDto: LoginDto): Promise<{
        access_token: string;
        data: import("../user/schema/user.schema").IUser;
    }>;
    userRegistration(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        data: import("../user/schema/user.schema").IUser;
    }>;
    bulkCreate(): Promise<number>;
    userProfile(id: number): Promise<import("../user/schema/user.schema").IUser>;
    userProfileUpdate(user: any, updateUserDto: UpdateUserDto): Promise<import("../user/schema/user.schema").IUser>;
    validateToken(token: string): Promise<import("../user/schema/user.schema").IUser>;
    private generateHash;
    private hashCompare;
    private generateToken;
    private verifyToken;
}
