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
exports.BlogListenerController = void 0;
const openapi = require("@nestjs/swagger");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
let BlogListenerController = class BlogListenerController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async userUpdatedListener(user) {
        try {
            console.log('user updated event captured: ', user.id);
            await this.blogService.updateAuthor(user);
            return new nestjs_rabbitmq_1.Nack(false);
        }
        catch (error) {
            console.log(error);
            return new nestjs_rabbitmq_1.Nack(true);
        }
    }
    async incrementLikes(like) {
        try {
            console.log('like event captured: ', like?.blogId);
            await this.blogService.incrementLikes(like?.blogId);
        }
        catch (error) {
            console.log(error);
        }
    }
    async decrementLikes(like) {
        try {
            console.log('like event captured: ', like?.blogId);
            await this.blogService.decrementLikes(like?.blogId);
        }
        catch (error) {
            console.log(error);
        }
    }
    async incrementComments(comment, amqpMsg, amqpChannel) {
        try {
            console.log('comment create event captured: ', comment?.blogId);
            await this.blogService.incrementComments(comment?.blogId);
        }
        catch (error) {
            console.log(error);
        }
    }
    async decrementComments(comment) {
        try {
            console.log('comment delete event captured: ', comment?.blogId);
            await this.blogService.decrementComments(comment?.blogId);
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.BlogListenerController = BlogListenerController;
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: 'user_management',
        routingKey: 'user_updated',
        queue: 'blog_user_updated'
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogListenerController.prototype, "userUpdatedListener", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: 'blog_management',
        routingKey: 'like_created',
        queue: 'blog_like_created'
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogListenerController.prototype, "incrementLikes", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: 'blog_management',
        routingKey: 'like_deleted',
        queue: 'blog_like_deleted'
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogListenerController.prototype, "decrementLikes", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: 'blog_management',
        routingKey: 'comment_created',
        queue: 'blog_comment_created'
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogListenerController.prototype, "incrementComments", null);
__decorate([
    (0, nestjs_rabbitmq_1.RabbitSubscribe)({
        exchange: 'blog_management',
        routingKey: 'comment_deleted',
        queue: 'blog_comment_deleted'
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogListenerController.prototype, "decrementComments", null);
exports.BlogListenerController = BlogListenerController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogListenerController);
//# sourceMappingURL=blog-listener.controller.js.map