import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommonSchema } from "src/common/schemas/schema.common";

@Schema({ timestamps: true })
export class FileLibrary extends CommonSchema {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    directory: string;

    @Prop({ index: true })
    userId: number;

    @Prop({ required: true, index: true })
    mimetype: string;

    @Prop()
    encoding: string;

    @Prop()
    size: number;
}

export const FileLibrarySchema = SchemaFactory.createForClass(FileLibrary);