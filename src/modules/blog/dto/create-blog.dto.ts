import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { BLOG_STATUS } from "../enums/blog.enum";

export class CreateBlogDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    authorId: mongoose.Types.ObjectId;

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsString()
    image?: string;
}
