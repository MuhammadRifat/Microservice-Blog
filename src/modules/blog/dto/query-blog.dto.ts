import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { BLOG_STATUS } from "../enums/blog.enum";
import { IPaginate } from "src/common/dtos/dto.common";

export class QueryBlogDto extends IPaginate {

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    authorId?: mongoose.Types.ObjectId;

    @IsOptional()
    @IsString()
    _id?: mongoose.Types.ObjectId;

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsEnum(BLOG_STATUS)
    status?: BLOG_STATUS;
}
