"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const blog_controller_1 = require("./blog.controller");
const mongoose_1 = require("@nestjs/mongoose");
const blog_schema_1 = require("./schema/blog.schema");
const rabbitmq_module_1 = require("../../rabbitmq/rabbitmq.module");
const blog_listener_controller_1 = require("./blog-listener.controller");
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: blog_schema_1.Blog.name, schema: blog_schema_1.blogSchema }]),
            rabbitmq_module_1.RabbitmqModule
        ],
        controllers: [blog_controller_1.BlogController, blog_listener_controller_1.BlogListenerController],
        providers: [blog_service_1.BlogService],
        exports: [blog_service_1.BlogService]
    })
], BlogModule);
//# sourceMappingURL=blog.module.js.map