import { Model, Types } from "mongoose";
import { IPaginate } from "../dtos/dto.common";
export declare class Service<TDoc> {
    private readonly model;
    private DEFAULT_LIMIT;
    private DEFAULT_PAGE;
    private GLOBAL_NOT_SELECT;
    constructor(model: Model<TDoc>);
    createOne(createDataDto: object): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    createMany(createDataDto: object[]): Promise<void>;
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
    searchByAnyCharacter(query: object, staticQuery?: object): Promise<{
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
    updateById(id: Types.ObjectId, updateDataDto: object): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    updateByQuery(query: object, updateDataDto: object): Promise<import("mongoose").IfAny<TDoc, any, import("mongoose").Document<unknown, {}, TDoc> & import("mongoose").Require_id<TDoc>>>;
    removeById(id: Types.ObjectId): Promise<import("mongoose").FlattenMaps<import("mongoose").Require_id<TDoc>>>;
    removeByQuery(query: object): Promise<import("mongoose").UpdateWriteOpResult>;
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
