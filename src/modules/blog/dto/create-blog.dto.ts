import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";
import { BLOG_STATUS } from "../enums/blog.enum";
import { Author } from "../schema/author.schema";

export class CreateBlogDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    authorId?: mongoose.Types.ObjectId;
    author?: Author;

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsString()
    image?: string;
}
