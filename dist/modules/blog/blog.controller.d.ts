import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { MongoIdParams } from 'src/common/dtos/dto.common';
import { QueryBlogDto } from './dto/query-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto, req: any): Promise<{
        success: boolean;
        data: import("mongoose").FlattenMaps<import("./schema/blog.schema").Blog & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
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
    search(q: string): Promise<{
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
    authSearch(q: string, req: any): Promise<{
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
    findOne({ id }: MongoIdParams): Promise<{
        success: boolean;
        data: import("mongoose").FlattenMaps<import("./schema/blog.schema").Blog & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update({ id }: MongoIdParams, updateBlogDto: UpdateBlogDto): Promise<{
        success: boolean;
        data: import("mongoose").FlattenMaps<import("./schema/blog.schema").Blog & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    remove({ id }: MongoIdParams): Promise<{
        success: boolean;
        data: import("mongoose").FlattenMaps<import("./schema/blog.schema").Blog & {
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
