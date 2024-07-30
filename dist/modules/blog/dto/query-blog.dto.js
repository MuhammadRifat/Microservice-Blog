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
exports.QueryBlogDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const blog_enum_1 = require("../enums/blog.enum");
const dto_common_1 = require("../../../common/dtos/dto.common");
class QueryBlogDto extends dto_common_1.IPaginate {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String }, authorId: { required: false, type: () => require("mongoose").Types.ObjectId }, _id: { required: false, type: () => require("mongoose").Types.ObjectId }, tags: { required: false, type: () => [String] }, status: { required: false, enum: require("../enums/blog.enum").BLOG_STATUS } };
    }
}
exports.QueryBlogDto = QueryBlogDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryBlogDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], QueryBlogDto.prototype, "authorId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], QueryBlogDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], QueryBlogDto.prototype, "tags", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(blog_enum_1.BLOG_STATUS),
    __metadata("design:type", String)
], QueryBlogDto.prototype, "status", void 0);
//# sourceMappingURL=query-blog.dto.js.map