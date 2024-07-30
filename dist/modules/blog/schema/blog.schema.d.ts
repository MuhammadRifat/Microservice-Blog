import mongoose, { Document } from 'mongoose';
import { CommonSchema } from 'src/common/schemas/schema.common';
import { Author } from './author.schema';
export type BlogDocument = Blog & Document;
export declare class Blog extends CommonSchema {
    title: string;
    content: string;
    authorId: number;
    author: Author;
    tags: string[];
    status: string;
    image: string;
    likes: number;
    views: number;
    comments: number;
}
export declare const blogSchema: mongoose.Schema<Blog, mongoose.Model<Blog, any, any, any, mongoose.Document<unknown, any, Blog> & Blog & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Blog, mongoose.Document<unknown, {}, mongoose.FlatRecord<Blog>> & mongoose.FlatRecord<Blog> & {
    _id: Types.ObjectId;
}>;
