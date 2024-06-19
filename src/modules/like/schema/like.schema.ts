import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CommonSchema } from 'src/common/schemas/schema.common';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like extends CommonSchema {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
    userId: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true, index: true })
    blogId: Types.ObjectId;
}

export const likeSchema = SchemaFactory.createForClass(Like);
