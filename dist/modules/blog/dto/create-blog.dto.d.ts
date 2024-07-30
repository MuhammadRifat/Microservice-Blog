import mongoose from "mongoose";
import { Author } from "../schema/author.schema";
export declare class CreateBlogDto {
    title: string;
    content: string;
    authorId?: mongoose.Types.ObjectId;
    author?: Author;
    tags?: string[];
    image?: string;
}
