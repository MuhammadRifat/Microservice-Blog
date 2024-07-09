import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/auth.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    // user login 
    async userLogin(loginDto: LoginDto) {
        const user = await this.userService.findOneByQuery({ email: loginDto.email });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('password mismatch!');
        }

        delete user.password;
        const payload = { id: user.id };
        return {
            access_token: await this.generateToken(payload),
            data: user
        };
    }

    // user registration 
    async userRegistration(createUserDto: CreateUserDto) {
        createUserDto.password = await this.generateHash(createUserDto.password);
        const user = await this.userService.create(createUserDto);
        const payload = { id: user.id };

        return {
            access_token: await this.generateToken(payload),
            data: user
        };
    }

    // get user profile
    async userProfile(id: number) {
        const user = await this.userService.findOneById(id);
        delete user?.password;

        return user;
    }

    // update user profile
    async userProfileUpdate(user, updateUserDto: UpdateUserDto) {
        return await this.userService.update(user.id, updateUserDto);
    }

    async validateToken(token: string) {
        if (!token) {
            throw new BadRequestException('token is required');
        }
        const payload = await this.verifyToken(token);
        const user = await this.userService.findOneById(payload?.id);

        if (!user) {
            throw new UnauthorizedException();
        }
        delete user.password;
        return user;
    }

    // generate hash
    private async generateHash(plainPassword: string) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(plainPassword, salt);
    }

    // hash compare 
    private async hashCompare(plainPassword: string, hashPassword: string) {

        return await bcrypt.compare(plainPassword, hashPassword);
    }

    // generate jwt token
    private async generateToken(payload: any) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });
    }

    // verify token
    private async verifyToken(token: string) {
        const payload = await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.JWT_SECRET
            }
        );

        return payload;
    }
}
