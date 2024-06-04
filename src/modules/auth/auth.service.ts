import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/auth.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import mongoose from "mongoose";
import { BlogService } from "../blog/blog.service";



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    // user login 
    async userLogin(loginDto: LoginDto) {
        const user = await this.userService.findUserByQuery({ email: loginDto.email });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('password mismatch!');
        }

        const payload = { _id: user._id };
        return {
            access_token: await this.generateToken(payload),
            data: user
        };
    }

    // user registration 
    async userRegistration(createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        const payload = { _id: user._id };

        return {
            access_token: await this.generateToken(payload),
            data: user
        };
    }

    // get user profile
    async userProfile(id: mongoose.Types.ObjectId) {
        const user = await this.userService.findOne(id);
        delete user?.password;

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
}
