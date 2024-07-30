export declare class MongoCommonSchema {
    isActive: boolean;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class MysqlCommonSchema {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
