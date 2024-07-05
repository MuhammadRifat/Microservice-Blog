import { InternalServerErrorException } from "@nestjs/common";
import { Knex } from "knex";
import { IPaginateMysql } from "../dtos/dto.common";

export class MysqlService<TDoc> {
    private DEFAULT_LIMIT = 10;
    private DEFAULT_PAGE = 1;


    constructor(
        private readonly knexModel: Knex,
        private readonly tableName: string
    ) { }


    // generate pagination
    protected pagination({ currentPage = this.DEFAULT_PAGE, perPage = this.DEFAULT_LIMIT }: IPaginateMysql) {
        perPage = perPage && perPage > 0 ? +perPage : 10;
        currentPage = currentPage && currentPage > 0 ? +currentPage - 1 : 0;

        return {
            skip: currentPage * perPage,
            perPage,
            currentPage
        }
    }

    // return paginate response
    protected paginateResponse<Doc>({
        perPage,
        currentPage,
        total,
        data
    }: {
        data?: Doc[],
        perPage: number,
        currentPage: number,
        total: number,
    }) {
        return {
            perPage: perPage,
            currentPage: currentPage + 1,
            totalPage: total && Math.ceil(total / perPage),
            totalResult: total,
            data
        };
    }

    // create new
    protected async createOne(createDataDto: object) {
        const [insertedId] = await this.knexModel.table(this.tableName).insert(createDataDto);

        if (!insertedId) {
            throw new InternalServerErrorException('insert failed');
        }
        const [data] = <TDoc[]>await this.knexModel.table(this.tableName).where('id', insertedId);

        return data;
    }

    // create many
    protected async createMany(createDataDto: object[]) {
        const insertedIds = await this.knexModel.table(this.tableName).insert(createDataDto);
        if (!insertedIds.length) {
            throw new InternalServerErrorException('insert failed');
        }

        const data = <TDoc[]>await this.knexModel.table(this.tableName).whereIn('id', insertedIds);

        return data;
    }

    // find all documents by query
    public async findByQuery(query: object) {
        const data: TDoc[] = <TDoc[]>await this.knexModel.table(this.tableName).where({ ...query, deletedAt: null });
        return data;
    }

    // find all by paginate
    protected async findWithPaginate(paginate?: IPaginateMysql, query: object = {}) {
        const { skip, currentPage, perPage } = this.pagination(paginate);


        const [{ total }] = await this.knexModel.table(this.tableName).where({ ...query, deletedAt: null }).count("* as total");

        const data = <TDoc[]>await this.knexModel.table(this.tableName)
            .where({ ...query, deletedAt: null })
            .offset(skip)
            .limit(perPage)
            .orderBy("id", "desc");


        return this.paginateResponse<TDoc>({ currentPage, perPage, total, data });
    }

    // find one document
    public async findOneById(id: number) {
        const [data] = <TDoc[]>await this.knexModel.table(this.tableName).where({ id, deletedAt: null });
        return data;
    }

    // find one document
    public async findOneByQuery(query: object) {
        const [data] = <TDoc[]>await this.knexModel.table(this.tableName).where({ ...query, deletedAt: null });
        return data;
    }

    // update one document
    protected async updateById(id: number, updateDataDto: object) {
        await this.knexModel.table(this.tableName).update(updateDataDto).where({ id });

        const data = await this.findOneById(id);
        return data;
    }

    // update one document by query
    protected async updateByQuery(query: object, updateDataDto: object) {
        await this.knexModel.table(this.tableName).update(updateDataDto).where(query);

        const data = await this.findByQuery(query);
        return data;
    }

    // delete one by id
    protected async removeById(id: number) {
        const updated = await this.knexModel.table(this.tableName).update({ deletedAt: new Date() }).where({ id }).andWhere('deletedAt', null);

        if (!updated) {
            return false;
        }
        const [data] = await this.knexModel.table(this.tableName).where({ id });
        return data;
    }

    // delete by query
    protected async removeByQuery(query: object) {
        const updated = await this.knexModel.table(this.tableName).update({ deletedAt: new Date() }).where(query).andWhere('deletedAt', null);

        if (!updated) {
            return false;
        }
        const data = await this.knexModel.table(this.tableName).where(query);
        return data;
    }

    // generate slug from string
    protected generateSlug(str: string) {
        return str
            .toString()
            .normalize('NFD') // split an accented letter in the base letter and the acent
            .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
            .replace(/\s+/g, '-');
    };
}