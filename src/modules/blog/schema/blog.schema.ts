import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CommonSchema } from 'src/common/schemas/schema.common';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog extends CommonSchema {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
    authorId: Types.ObjectId;

    @Prop([String])
    tags: string[];

    @Prop({ default: 'draft' })
    status: string;

    @Prop({ default: null })
    image: string;

    @Prop({ default: 0 })
    likes: number;
    
    @Prop({ default: 0 })
    views: number;
}

export const blogSchema = SchemaFactory.createForClass(Blog);
