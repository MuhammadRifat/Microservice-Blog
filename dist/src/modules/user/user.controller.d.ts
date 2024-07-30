import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPaginateMysql } from 'src/common/dtos/dto.common';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        data: import("./schema/user.schema").IUser;
    }>;
    findAll(paginate: IPaginateMysql): Promise<{
        perPage: number;
        currentPage: number;
        totalPage: number;
        totalResult: number;
        data: import("./schema/user.schema").IUser[];
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: import("./schema/user.schema").IUser;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        data: import("./schema/user.schema").IUser;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
