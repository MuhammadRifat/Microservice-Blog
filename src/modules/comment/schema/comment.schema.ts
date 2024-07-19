import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CommonSchema } from 'src/common/schemas/schema.common';
import { User, UserSchema } from './user.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment extends CommonSchema {
    @Prop({ type: Number, required: true, index: true })
    userId: number;

    @Prop({ type: UserSchema, required: true })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true, index: true })
    blogId: Types.ObjectId;

    @Prop({ type: String, required: true })
    comment: string;
}

export const commentSchema = SchemaFactory.createForClass(Comment);
