"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlService = void 0;
const common_1 = require("@nestjs/common");
class MysqlService {
    constructor(knexModel, tableName) {
        this.knexModel = knexModel;
        this.tableName = tableName;
        this.DEFAULT_LIMIT = 10;
        this.DEFAULT_PAGE = 1;
    }
    pagination({ currentPage = this.DEFAULT_PAGE, perPage = this.DEFAULT_LIMIT }) {
        perPage = perPage && perPage > 0 ? +perPage : 10;
        currentPage = currentPage && currentPage > 0 ? +currentPage - 1 : 0;
        return {
            skip: currentPage * perPage,
            perPage,
            currentPage
        };
    }
    paginateResponse({ perPage, currentPage, total, data }) {
        return {
            perPage: perPage,
            currentPage: currentPage + 1,
            totalPage: total && Math.ceil(total / perPage),
            totalResult: total,
            data
        };
    }
    async createOne(createDataDto) {
        const [insertedId] = await this.knexModel.table(this.tableName).insert(createDataDto);
        if (!insertedId) {
            throw new common_1.InternalServerErrorException('insert failed');
        }
        const [data] = await this.knexModel.table(this.tableName).where('id', insertedId);
        return data;
    }
    async createMany(createDataDto) {
        const insertedIds = await this.knexModel.table(this.tableName).insert(createDataDto);
    }
    async findByQuery(query) {
        const data = await this.knexModel.table(this.tableName).where({ ...query, deletedAt: null });
        return data;
    }
    async findWithPaginate(paginate, query = {}) {
        const { skip, currentPage, perPage } = this.pagination(paginate);
        const [{ total }] = await this.knexModel.table(this.tableName).where({ ...query, deletedAt: null }).count("id as total");
        const data = await this.knexModel.table(this.tableName)
            .where({ ...query, deletedAt: null })
            .offset(skip)
            .limit(perPage)
            .orderBy("id", "desc");
        return this.paginateResponse({ currentPage, perPage, total, data });
    }
    async findOneById(id) {
        const [data] = await this.knexModel.table(this.tableName).where({ id, deletedAt: null });
        return data;
    }
    async findOneByQuery(query) {
        const [data] = await this.knexModel.table(this.tableName).where({ ...query, deletedAt: null });
        return data;
    }
    async updateById(id, updateDataDto) {
        await this.knexModel.table(this.tableName).update(updateDataDto).where({ id });
        const data = await this.findOneById(id);
        return data;
    }
    async updateByQuery(query, updateDataDto) {
        await this.knexModel.table(this.tableName).update(updateDataDto).where(query);
        const data = await this.findByQuery(query);
        return data;
    }
    async removeById(id) {
        const updated = await this.knexModel.table(this.tableName).update({ deletedAt: new Date() }).where({ id }).andWhere('deletedAt', null);
        if (!updated) {
            return false;
        }
        const [data] = await this.knexModel.table(this.tableName).where({ id });
        return data;
    }
    async removeByQuery(query) {
        const updated = await this.knexModel.table(this.tableName).update({ deletedAt: new Date() }).where(query).andWhere('deletedAt', null);
        if (!updated) {
            return false;
        }
        const data = await this.knexModel.table(this.tableName).where(query);
        return data;
    }
    generateSlug(str) {
        return str
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-');
    }
    ;
}
exports.MysqlService = MysqlService;
//# sourceMappingURL=mysql-service.common.js.map