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
exports.blogSchema = exports.Blog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_common_1 = require("../../../common/schemas/schema.common");
const author_schema_1 = require("./author.schema");
let Blog = class Blog extends schema_common_1.CommonSchema {
};
exports.Blog = Blog;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, index: true }),
    __metadata("design:type", Number)
], Blog.prototype, "authorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: author_schema_1.AuthorSchema, required: true }),
    __metadata("design:type", author_schema_1.Author)
], Blog.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'draft' }),
    __metadata("design:type", String)
], Blog.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Blog.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }),
    __metadata("design:type", Number)
], Blog.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }),
    __metadata("design:type", Number)
], Blog.prototype, "views", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }),
    __metadata("design:type", Number)
], Blog.prototype, "comments", void 0);
exports.Blog = Blog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Blog);
exports.blogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
//# sourceMappingURL=blog.schema.js.map