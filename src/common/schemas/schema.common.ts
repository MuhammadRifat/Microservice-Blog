import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class CommonSchema {
    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: null })
    deletedAt: Date;

    createdAt: Date;
    updatedAt: Date;
}