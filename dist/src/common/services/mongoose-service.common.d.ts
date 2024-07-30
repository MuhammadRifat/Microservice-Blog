/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model, Types } from "mongoose";
import { IPaginate } from "../dtos/dto.common";
export declare class MongooseService<TDoc> {
    private readonly model;
    private DEFAULT_LIMIT;
    private DEFAULT_PAGE;
    private GLOBAL_NOT_SELECT;
    constructor(model: Model<TDoc>);
    protected createOne(createDataDto: object): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    protected createMany(createDataDto: object[]): Promise<import("mongoose").MergeType<import("mongoose").IfAny<TDoc, any, import("mongoose").Document<unknown, {}, TDoc> & import("mongoose").Require_id<TDoc>>, Omit<object, "_id">>[]>;
    findIn(ids: Types.ObjectId[], notSelect?: object): Promise<import("mongoose").IfAny<TDoc, any, import("mongoose").Document<unknown, {}, TDoc> & import("mongoose").Require_id<TDoc>>[]>;
    findAllByQuery(query: object, paginate?: IPaginate, notSelect?: object): Promise<{
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
    findOneById(id: Types.ObjectId, notSelect?: object): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    findOneByQuery(query: object, notSelect?: object): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    searchByAnyCharacter(query: object): Promise<{
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
    protected updateById(id: Types.ObjectId, updateDataDto: object): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    protected updateByQuery(query: object, updateDataDto: object): Promise<import("mongoose").IfAny<TDoc, any, import("mongoose").Document<unknown, {}, TDoc> & import("mongoose").Require_id<TDoc>>>;
    protected removeById(id: Types.ObjectId): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    protected removeByQuery(query: object): Promise<import("mongoose").UpdateWriteOpResult>;
    protected pushItemToArrayByQuery(query: object, item: object): Promise<import("mongoose").IfAny<TDoc, any, import("mongoose").Document<unknown, {}, TDoc> & import("mongoose").Require_id<TDoc>>>;
    protected removeItemFromArrayByQuery(query: object, item: object): Promise<import("mongoose").IfAny<TDoc, any, import("mongoose").Document<unknown, {}, TDoc> & import("mongoose").Require_id<TDoc>>>;
    findByPaginate(query?: object, paginate?: IPaginate, lookupStages?: any[]): Promise<{
        page: any;
        data: any;
    }>;
    findByQueryFilterAndPopulate({ query, paginate, sort, lookupStages }: {
        query: object;
        paginate?: IPaginate;
        sort?: {
            sortBy: string;
            sortOrder: number;
        };
        lookupStages?: any[];
    }): Promise<{
        page: any;
        data: any;
    }>;
    protected generateSlug(str: string): string;
    protected generateOneToOneRelation({ rootData, foreignData, targetField, rootField, foreignField }: {
        rootData: {
            page: any;
            data: any[];
        };
        foreignData: any[];
        rootField: string;
        foreignField: string;
        targetField: string;
    }): {
        page: any;
        data: any[];
    };
}
