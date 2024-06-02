import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CommonSchema } from "src/common/schemas/schema.common";

@Schema({ timestamps: true })
export class User extends CommonSchema {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true, index: true })
    email: string;

    @Prop()
    slug: string;

    @Prop()
    password: string;

    @Prop({ default: false })
    isVerified: string;
}

export const userSchema = SchemaFactory.createForClass(User);