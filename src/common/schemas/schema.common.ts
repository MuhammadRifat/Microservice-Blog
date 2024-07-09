import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class MongoCommonSchema {
    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: null })
    deletedAt: Date;

    createdAt: Date;
    updatedAt: Date;
}

export class MysqlCommonSchema {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}