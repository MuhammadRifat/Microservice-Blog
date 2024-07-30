"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseService = void 0;
const common_1 = require("@nestjs/common");
class MongooseService {
    constructor(model) {
        this.model = model;
        this.DEFAULT_LIMIT = 10;
        this.DEFAULT_PAGE = 1;
        this.GLOBAL_NOT_SELECT = {
            deletedAt: 0,
            __v: 0,
            createdBy: 0
        };
    }
    async createOne(createDataDto) {
        const newData = new this.model(createDataDto);
        return (await newData.save())?.toJSON();
    }
    async createMany(createDataDto) {
        return await this.model.insertMany(createDataDto);
    }
    async findIn(ids, notSelect) {
        return await this.model.find({ _id: { $in: ids } }).select({ ...notSelect, ...this.GLOBAL_NOT_SELECT });
    }
    async findAllByQuery(query, paginate, notSelect) {
        const page = Math.abs(Number(paginate?.page || 0) || this.DEFAULT_PAGE);
        const limit = Math.abs(Number(paginate?.limit || 0) || this.DEFAULT_LIMIT);
        let totalIndexPromise;
        let totalDeletedIndexPromise;
        if (Object.keys(query).length) {
            totalIndexPromise = this.model.countDocuments({ ...query, deletedAt: null });
        }
        else {
            totalIndexPromise = this.model.estimatedDocumentCount();
            totalDeletedIndexPromise = this.model.countDocuments({ deletedAt: { $ne: null } });
        }
        const dataPromise = this.model.find({ ...query, deletedAt: null })
            .sort({ createdAt: -1 })
            .skip(limit * (page - 1))
            .limit(limit)
            .select({ ...notSelect, ...this.GLOBAL_NOT_SELECT })
            .exec();
        const promiseArray = [dataPromise, totalIndexPromise];
        if (totalDeletedIndexPromise) {
            promiseArray.push(totalDeletedIndexPromise);
        }
        const [data, totalNotDeletedIndex, totalDeletedIndex] = await Promise.all(promiseArray);
        const totalIndex = totalNotDeletedIndex - (totalDeletedIndex || 0);
        const totalPage = Math.ceil(totalIndex / limit);
        const paginationInfo = {
            totalIndex,
            totalPage,
            currentPage: page,
            nextPage: totalPage > page ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null,
            startingIndex: limit * (page - 1) + 1,
            endingIndex: limit * page,
            itemsOnCurrentPage: Math.min(limit, totalIndex - limit * (page - 1)),
            limit,
            sortBy: 'createdAt',
            sortOrder: -1
        };
        const responseData = data;
        return {
            page: paginationInfo,
            data: responseData,
        };
    }
    async findOneById(id, notSelect) {
        return (await this.model.findOne({ _id: id, deletedAt: null })
            .select({ ...notSelect, ...this.GLOBAL_NOT_SELECT }))?.toJSON();
    }
    async findOneByQuery(query, notSelect) {
        return (await this.model.findOne({ ...query, deletedAt: null })
            .select({ ...notSelect, ...this.GLOBAL_NOT_SELECT }))?.toJSON();
    }
    async searchByAnyCharacter(query) {
        let modifiedQuery = {};
        Object.keys(query).map(key => {
            const newValue = { $regex: query[key], $options: "si" };
            modifiedQuery[key] = newValue;
        });
        return await this.findAllByQuery({ ...modifiedQuery, deletedAt: null });
    }
    async updateById(id, updateDataDto) {
        const data = (await this.model.findByIdAndUpdate(id, updateDataDto, { new: true }))?.toJSON();
        return data;
    }
    async updateByQuery(query, updateDataDto) {
        const data = await this.model.findOneAndUpdate(query, updateDataDto, { new: true });
        return data;
    }
    async removeById(id) {
        return (await this.model.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() }, { new: true }))?.toJSON();
    }
    async removeByQuery(query) {
        return await this.model.updateMany({ ...query, deletedAt: null }, { deletedAt: new Date() });
    }
    async pushItemToArrayByQuery(query, item) {
        const data = await this.model
            .findOneAndUpdate(query, {
            $push: item,
        }, {
            new: true,
        });
        return data;
    }
    ;
    async removeItemFromArrayByQuery(query, item) {
        const data = await this.model
            .findOneAndUpdate(query, {
            $pull: item,
        }, {
            new: true,
        });
        return data;
    }
    ;
    async findByPaginate(query = {}, paginate, lookupStages = []) {
        const page = Math.abs(Number(paginate?.page || 0) || this.DEFAULT_PAGE);
        const limit = Math.abs(Number(paginate?.limit || 0) || this.DEFAULT_LIMIT);
        const data = await this.model.aggregate([
            {
                $match: { ...query, deletedAt: null }
            },
            {
                $facet: {
                    "page": [
                        {
                            $count: "totalIndex"
                        },
                        {
                            $addFields: {
                                totalPage: { $ceil: { $divide: ["$totalIndex", limit] } },
                                currentPage: page,
                                nextPage: { $cond: { if: { $gt: ["$totalPage", page] }, then: page + 1, else: null } },
                                previousPage: { $cond: { if: { $gt: [page, 1] }, then: page - 1, else: null } },
                                startingIndex: limit * (page - 1) + 1,
                                endingIndex: limit * page,
                                itemsOnCurrentPage: { $cond: { if: { $gte: [limit, "$totalIndex"] }, then: "$totalIndex", else: limit } },
                                limit: limit,
                                sortBy: 'createdAt',
                                sortOrder: -1
                            }
                        }
                    ],
                    "data": [
                        {
                            $sort: {
                                createdAt: -1
                            }
                        },
                        {
                            $skip: limit * (page - 1)
                        },
                        {
                            $limit: limit
                        },
                        ...lookupStages,
                    ]
                }
            }
        ]);
        return {
            page: data?.[0]?.page?.[0],
            data: data?.[0]?.data
        };
    }
    async findByQueryFilterAndPopulate({ query, paginate, sort, lookupStages = [] }) {
        const page = Math.abs(Number(paginate?.page || 0) || this.DEFAULT_PAGE);
        const limit = Math.abs(Number(paginate?.limit || 0) || this.DEFAULT_LIMIT);
        const sortModified = {};
        if (sort && sort.sortBy && sort.sortOrder) {
            if (!(sort.sortOrder == 1 || sort.sortOrder == -1)) {
                throw new common_1.BadRequestException('sortOrder must 1 or -1');
            }
            sortModified[sort.sortBy] = Number(sort.sortOrder);
        }
        else {
            sortModified['createdAt'] = -1;
        }
        const data = await this.model.aggregate([
            {
                $match: { ...query, deletedAt: null }
            },
            {
                $facet: {
                    "page": [
                        {
                            $count: "totalIndex"
                        },
                        {
                            $addFields: {
                                totalPage: { $ceil: { $divide: ["$totalIndex", limit] } },
                                currentPage: page,
                                nextPage: { $cond: { if: { $gt: ["$totalPage", page] }, then: page + 1, else: null } },
                                previousPage: { $cond: { if: { $gt: [page, 1] }, then: page - 1, else: null } },
                                startingIndex: limit * (page - 1) + 1,
                                endingIndex: limit * page,
                                itemsOnCurrentPage: { $cond: { if: { $gte: [limit, "$totalIndex"] }, then: "$totalIndex", else: limit } },
                                limit: limit,
                                sortBy: Object.keys(sortModified)[0],
                                sortOrder: sortModified[Object.keys(sortModified)[0]]
                            }
                        }
                    ],
                    "data": [
                        {
                            $sort: { ...sortModified }
                        },
                        {
                            $skip: limit * (page - 1)
                        },
                        {
                            $limit: limit
                        },
                        ...lookupStages,
                    ]
                }
            }
        ]);
        return {
            page: data?.[0]?.page?.[0],
            data: data?.[0]?.data
        };
    }
    generateSlug(str) {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    ;
    generateOneToOneRelation({ rootData, foreignData, targetField, rootField, foreignField }) {
        const subMap = new Map(foreignData?.map(item => [String(item[foreignField]), item]));
        const response = rootData?.data?.map(item => {
            const target = subMap.get(String(item[rootField]));
            return {
                ...item.toJSON(),
                [targetField]: target
            };
        });
        return {
            page: rootData.page,
            data: response
        };
    }
}
exports.MongooseService = MongooseService;
//# sourceMappingURL=mongoose-service.common.js.map