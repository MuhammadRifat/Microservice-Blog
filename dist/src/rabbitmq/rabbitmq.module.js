"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqModule = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const rabbitmq_service_1 = require("./rabbitmq.service");
dotenv.config();
let RabbitmqModule = class RabbitmqModule {
};
exports.RabbitmqModule = RabbitmqModule;
exports.RabbitmqModule = RabbitmqModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
                exchanges: [
                    {
                        name: 'user_management',
                        type: 'topic',
                    },
                    {
                        name: 'blog_management',
                        type: 'topic',
                    },
                ],
                uri: process.env.RMQ_URL,
                connectionInitOptions: {
                    wait: false,
                },
                enableControllerDiscovery: true,
            }),
        ],
        exports: [nestjs_rabbitmq_1.RabbitMQModule, rabbitmq_service_1.RabbitmqService],
        providers: [rabbitmq_service_1.RabbitmqService],
    })
], RabbitmqModule);
//# sourceMappingURL=rabbitmq.module.js.map