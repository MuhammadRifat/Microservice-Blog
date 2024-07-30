"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async userLogin(loginDto) {
        const user = await this.userService.findOneByQuery({ email: loginDto.email });
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('password mismatch!');
        }
        delete user.password;
        const payload = { id: user.id };
        return {
            access_token: await this.generateToken(payload),
            data: user
        };
    }
    async userRegistration(createUserDto) {
        createUserDto.password = await this.generateHash(createUserDto.password);
        const user = await this.userService.create(createUserDto);
        const payload = { id: user.id };
        return {
            access_token: await this.generateToken(payload),
            data: user
        };
    }
    async bulkCreate() {
        const users = [];
        const password = await this.generateHash('123456');
        return users.length;
    }
    async userProfile(id) {
        const user = await this.userService.findOneById(id);
        delete user?.password;
        return user;
    }
    async userProfileUpdate(user, updateUserDto) {
        return await this.userService.update(user.id, updateUserDto);
    }
    async validateToken(token) {
        if (!token) {
            throw new common_1.BadRequestException('token is required');
        }
        const payload = await this.verifyToken(token);
        const user = await this.userService.findOneById(payload?.id);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        delete user.password;
        return user;
    }
    async generateHash(plainPassword) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(plainPassword, salt);
    }
    async hashCompare(plainPassword, hashPassword) {
        return await bcrypt.compare(plainPassword, hashPassword);
    }
    async generateToken(payload) {
        return await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET,
        });
    }
    async verifyToken(token) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
        });
        return payload;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map