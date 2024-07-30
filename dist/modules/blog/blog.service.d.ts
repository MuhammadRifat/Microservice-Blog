import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Service } from 'src/common/services/service.common';
import { Blog } from './schema/blog.schema';
import mongoose, { Model, Types } from 'mongoose';
import { QueryBlogDto } from './dto/query-blog.dto';
export declare class BlogService extends Service<Blog> {
    private blogModel;
    constructor(blogModel: Model<Blog>);
    create(user: any, createBlogDto: CreateBlogDto): Promise<mongoose.FlattenMaps<Blog & {
        _id: Types.ObjectId;
    }>>;
    bulkCreate(): Promise<number>;
    findAll(queryBlogDto: QueryBlogDto): Promise<{
        page: {
            totalIndex: number;
            totalPage: number;
            currentPage: number;
            nextPage: number;
            previousPage: number;
            startingIndex: number;
            endingIndex: number;
            itemsOnCurrentPage: number;
            limit: number;
            sortBy: string;
            sortOrder: number;
        };
        data: any[];
    }>;
    search(title: string, authorId?: number): Promise<{
        page: {
            totalIndex: number;
            totalPage: number;
            currentPage: number;
            nextPage: number;
            previousPage: number;
            startingIndex: number;
            endingIndex: number;
            itemsOnCurrentPage: number;
            limit: number;
            sortBy: string;
            sortOrder: number;
        };
        data: any[];
    }>;
    findOne(id: Types.ObjectId): Promise<mongoose.FlattenMaps<Blog & {
        _id: Types.ObjectId;
    }>>;
    findBlogByQuery(query: object): Promise<mongoose.FlattenMaps<Blog & {
        _id: Types.ObjectId;
    }>>;
    update(id: Types.ObjectId, updateBlogDto: UpdateBlogDto): Promise<mongoose.FlattenMaps<Blog & {
        _id: Types.ObjectId;
    }>>;
    updateAuthor(author: any): Promise<mongoose.UpdateWriteOpResult>;
    incrementViews(id: Types.ObjectId): Promise<void>;
    incrementLikes(id: Types.ObjectId): Promise<void>;
    decrementLikes(id: Types.ObjectId): Promise<void>;
    incrementComments(id: Types.ObjectId): Promise<void>;
    decrementComments(id: Types.ObjectId): Promise<void>;
    remove(id: Types.ObjectId): Promise<mongoose.FlattenMaps<Blog & {
        _id: Types.ObjectId;
    }>>;
}
