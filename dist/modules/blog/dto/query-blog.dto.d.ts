import mongoose from "mongoose";
import { BLOG_STATUS } from "../enums/blog.enum";
import { IPaginate } from "src/common/dtos/dto.common";
export declare class QueryBlogDto extends IPaginate {
    title?: string;
    authorId?: mongoose.Types.ObjectId;
    _id?: mongoose.Types.ObjectId;
    tags?: string[];
    status?: BLOG_STATUS;
}
