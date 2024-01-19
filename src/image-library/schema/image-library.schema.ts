import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CommonSchema } from "src/common/schema.common";

@Schema({ timestamps: true })
export class ImageLibrary extends CommonSchema {
    @Prop()
    name: string;
}

export const imageLibrarySchema = SchemaFactory.createForClass(ImageLibrary);