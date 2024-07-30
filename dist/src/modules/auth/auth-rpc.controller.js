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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRpcController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let AuthRpcController = class AuthRpcController {
    constructor(authService) {
        this.authService = authService;
    }
    async validateToken(token) {
        try {
            if (!token) {
                throw new common_1.BadRequestException('token is required');
            }
            return await this.authService.validateToken(token);
        }
        catch (error) {
            return;
        }
        ;
    }
};
exports.AuthRpcController = AuthRpcController;
__decorate([
    (0, nestjs_rabbitmq_1.RabbitRPC)({
        routingKey: 'validate_token_rpc',
        exchange: 'user_management',
        queue: 'validate_token_queue',
    }),
    openapi.ApiResponse({ status: 200, type: require("../user/schema/user.schema").IUser }),
    __param(0, (0, nestjs_rabbitmq_1.RabbitPayload)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthRpcController.prototype, "validateToken", null);
exports.AuthRpcController = AuthRpcController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthRpcController);
//# sourceMappingURL=auth-rpc.controller.js.map