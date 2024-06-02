import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class CommonSchema {
    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: null })
    createdBy: mongoose.Schema.Types.ObjectId;

    @Prop({ default: null })
    deletedAt: Date;
}