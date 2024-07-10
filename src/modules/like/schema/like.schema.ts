import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CommonSchema } from 'src/common/schemas/schema.common';
import { User, UserSchema } from './user.schema';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like extends CommonSchema {
    @Prop({ type: Number, required: true, index: true })
    userId: number;

    @Prop({ type: UserSchema, required: true })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true, index: true })
    blogId: Types.ObjectId;
}

export const likeSchema = SchemaFactory.createForClass(Like);
