import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CommonSchema } from 'src/common/schemas/schema.common';
import { Author, AuthorSchema } from './author.schema';

export type BlogDocument = Blog & Document;


@Schema({ timestamps: true })
export class Blog extends CommonSchema {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: Number, required: true, index: true })
    authorId: number;

    @Prop({ type: AuthorSchema, required: true })
    author: Author;

    @Prop([String])
    tags: string[];

    @Prop({ default: 'draft' })
    status: string;

    @Prop({ default: null })
    image: string;

    @Prop({
        default: 0, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    })
    likes: number;

    @Prop({
        default: 0, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    })
    views: number;

    @Prop({
        default: 0, validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    })
    comments: number;
}

export const blogSchema = SchemaFactory.createForClass(Blog);