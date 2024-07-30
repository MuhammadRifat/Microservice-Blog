import { Knex } from "knex";
import { IPaginateMysql } from "../dtos/dto.common";
export declare class MysqlService<TDoc> {
    private readonly knexModel;
    private readonly tableName;
    private DEFAULT_LIMIT;
    private DEFAULT_PAGE;
    constructor(knexModel: Knex, tableName: string);
    protected pagination({ currentPage, perPage }: IPaginateMysql): {
        skip: number;
        perPage: number;
        currentPage: number;
    };
    protected paginateResponse<Doc>({ perPage, currentPage, total, data }: {
        data?: Doc[];
        perPage: number;
        currentPage: number;
        total: number;
    }): {
        perPage: number;
        currentPage: number;
        totalPage: number;
        totalResult: number;
        data: Doc[];
    };
    protected createOne(createDataDto: object): Promise<TDoc>;
    createMany(createDataDto: object[]): Promise<void>;
    findByQuery(query: object): Promise<TDoc[]>;
    protected findWithPaginate(paginate?: IPaginateMysql, query?: object): Promise<{
        perPage: number;
        currentPage: number;
        totalPage: number;
        totalResult: number;
        data: TDoc[];
    }>;
    findOneById(id: number): Promise<TDoc>;
    findOneByQuery(query: object): Promise<TDoc>;
    protected updateById(id: number, updateDataDto: object): Promise<TDoc>;
    protected updateByQuery(query: object, updateDataDto: object): Promise<TDoc[]>;
    protected removeById(id: number): Promise<any>;
    protected removeByQuery(query: object): Promise<false | any[]>;
    protected generateSlug(str: string): string;
}
